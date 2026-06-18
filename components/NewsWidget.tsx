"use client";
import { useEffect, useState } from "react";

interface Article {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  timeAgo: string;
  image: string | null;
  source: string;
}

const SOURCE_COLORS: Record<string, string> = {
  "Krishi Jagran": "bg-[#2d5a27]/10 text-[#154212]",
  "The Hindu":     "bg-[#003c60]/10 text-[#003c60]",
};

export default function NewsWidget() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((d) => { setArticles(d.articles ?? []); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-[1.5rem] p-4 flex gap-3 animate-pulse">
            <div className="w-20 h-20 rounded-xl bg-[#e2e3dc] shrink-0" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-3 bg-[#e2e3dc] rounded w-3/4" />
              <div className="h-3 bg-[#e2e3dc] rounded w-full" />
              <div className="h-3 bg-[#e2e3dc] rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error || articles.length === 0) {
    return (
      <div className="bg-white rounded-[1.5rem] p-6 text-center text-[#42493e]">
        <span className="material-symbols-outlined block text-3xl mb-2 text-[#c2c9bb]">newspaper</span>
        <p className="text-sm">Could not load news. Try again later.</p>
      </div>
    );
  }

  // Featured article (first one)
  const [featured, ...rest] = articles;

  return (
    <div className="space-y-4">
      {/* Featured */}
      <a href={featured.link} target="_blank" rel="noopener noreferrer"
        className="block rounded-[1.5rem] overflow-hidden bg-white shadow-[0_4px_12px_rgba(25,28,24,0.06)] hover:shadow-[0_8px_24px_rgba(25,28,24,0.1)] transition-shadow active:scale-[0.99]">
        <div className="aspect-[16/9] bg-[#e2e3dc] relative overflow-hidden">
          {featured.image ? (
            <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl text-[#c2c9bb]">agriculture</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${SOURCE_COLORS[featured.source] ?? "bg-white/20 text-white"} bg-white`}>
              {featured.source}
            </span>
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-white text-base leading-tight mt-2 line-clamp-2">
              {featured.title}
            </h3>
            <p className="text-white/70 text-xs mt-1">{featured.timeAgo}</p>
          </div>
        </div>
      </a>

      {/* Article list */}
      <div className="space-y-3">
        {rest.slice(0, 6).map((article, i) => (
          <a key={i} href={article.link} target="_blank" rel="noopener noreferrer"
            className="flex gap-3 bg-white p-4 rounded-[1.5rem] shadow-[0_2px_8px_rgba(25,28,24,0.04)] hover:bg-[#f3f4ed] transition-colors active:scale-[0.99]">
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#e2e3dc]">
              {article.image ? (
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl text-[#c2c9bb]">article</span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1 ${SOURCE_COLORS[article.source] ?? "bg-[#e2e3dc] text-[#42493e]"}`}>
                {article.source}
              </span>
              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#191c18] leading-tight line-clamp-2">
                {article.title}
              </h4>
              <p className="text-[#72796e] text-xs mt-1">{article.timeAgo}</p>
            </div>
            <span className="material-symbols-outlined text-[#c2c9bb] self-center shrink-0">chevron_right</span>
          </a>
        ))}
      </div>
    </div>
  );
}
