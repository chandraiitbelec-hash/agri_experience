import { NextResponse } from "next/server";

interface Article {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  image: string | null;
  source: string;
  sourcePriority: number;
}

const FEEDS = [
  {
    url: "https://feeds.feedburner.com/krishijagran/latest",
    source: "Krishi Jagran",
    priority: 1, // Indian agriculture-specific
  },
  {
    url: "https://www.thehindu.com/sci-tech/agriculture/feeder/default.rss",
    source: "The Hindu",
    priority: 2,
  },
];

function extractCdata(str: string): string {
  return str.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
}

function extractTag(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = xml.match(re);
  return m ? extractCdata(m[1]).trim() : "";
}

function extractImage(itemXml: string): string | null {
  // media:content url
  const mediaMatch = itemXml.match(/media:content[^>]+url=["']([^"']+)["']/i);
  if (mediaMatch) return mediaMatch[1];
  // enclosure
  const enclosureMatch = itemXml.match(/enclosure[^>]+url=["']([^"']+)["']/i);
  if (enclosureMatch) return enclosureMatch[1];
  // img tag in description
  const imgMatch = itemXml.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) return imgMatch[1];
  return null;
}

function parseItems(xml: string, source: string, priority: number): Article[] {
  const items: Article[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const title       = extractTag(itemXml, "title");
    const link        = extractTag(itemXml, "link") || extractTag(itemXml, "guid");
    const description = extractTag(itemXml, "description").replace(/<[^>]+>/g, "").substring(0, 160);
    const pubDate     = extractTag(itemXml, "pubDate");
    const image       = extractImage(itemXml);

    if (title && link) {
      items.push({ title, link, description, pubDate, image, source, sourcePriority: priority });
    }
  }

  return items;
}

function timeAgo(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  const diff = Date.now() - d.getTime();
  const hrs = Math.floor(diff / 3_600_000);
  if (hrs < 1) return "Just now";
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export async function GET() {
  const results = await Promise.allSettled(
    FEEDS.map((f) =>
      fetch(f.url, { cache: "no-store", signal: AbortSignal.timeout(6000) })
        .then((r) => r.text())
        .then((xml) => parseItems(xml, f.source, f.priority))
    )
  );

  const articles: Article[] = results
    .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
    .sort((a, b) => {
      // Priority source first, then recency
      if (a.sourcePriority !== b.sourcePriority) return a.sourcePriority - b.sourcePriority;
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    })
    .slice(0, 15)
    .map((a) => ({ ...a, timeAgo: timeAgo(a.pubDate) }));

  return NextResponse.json({ articles });
}
