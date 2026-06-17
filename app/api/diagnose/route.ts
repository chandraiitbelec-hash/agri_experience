import { NextRequest, NextResponse } from "next/server";

const ELAN_PRODUCTS: Record<string, { name: string; price: string; tag: string }[]> = {
  fungal:    [{ name: "Elan Copper XL", price: "₹850", tag: "TOP RATED" }, { name: "Elan Pure Neem Oil", price: "₹420", tag: "ORGANIC" }],
  bacterial: [{ name: "Elan Copper XL", price: "₹850", tag: "TOP RATED" }, { name: "Elan EcoShield", price: "₹420", tag: "SAFE SPRAY" }],
  pest:      [{ name: "Elan EcoShield", price: "₹420", tag: "SAFE SPRAY" }, { name: "Elan Pure Neem Oil", price: "₹420", tag: "ORGANIC" }],
  nutrient:  [{ name: "Elan NPK Complex", price: "₹850", tag: "BESTSELLER" }, { name: "Elan RootMax", price: "₹650", tag: "ORGANIC" }],
  healthy:   [{ name: "Elan NPK Complex", price: "₹850", tag: "BESTSELLER" }, { name: "Elan RootMax", price: "₹650", tag: "ORGANIC" }],
};

const SYSTEM = `You are an expert plant pathologist AI for Rythu Mitra, Elan Agrochem's farmer platform.
Analyze crop images and return ONLY valid JSON with this exact structure:
{
  "disease": "string — common disease/condition name (e.g. 'Early Blight', 'Leaf Rust', 'Healthy', 'Nitrogen Deficiency')",
  "confidence": number between 0 and 100,
  "alertLevel": "High" | "Moderate" | "Low" | "Optimal",
  "humidityRisk": number between 0 and 100,
  "category": "fungal" | "bacterial" | "pest" | "nutrient" | "healthy",
  "crop": "string — identified crop (e.g. 'Tomato', 'Rice', 'Cotton', 'Unknown')",
  "description": "2-3 sentence plain-English explanation of what you see and why it's this condition",
  "steps": [
    { "title": "string", "desc": "string", "icon": "material symbol name like content_cut or vaccines" },
    { "title": "string", "desc": "string", "icon": "string" },
    { "title": "string", "desc": "string", "icon": "string" }
  ]
}
Return ONLY the JSON object, no markdown, no explanation.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY not configured" }, { status: 500 });
  }

  const { imageBase64, mediaType } = await req.json();
  if (!imageBase64) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: SYSTEM,
      messages: [{
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "base64", media_type: mediaType ?? "image/jpeg", data: imageBase64 },
          },
          {
            type: "text",
            text: "Analyze this crop image and return the JSON diagnosis.",
          },
        ],
      }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return NextResponse.json({ error: "Claude API error", detail: err }, { status: 502 });
  }

  const data = await response.json();
  const raw = data.content?.[0]?.text ?? "{}";

  let diagnosis: Record<string, unknown>;
  try {
    diagnosis = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Failed to parse diagnosis JSON", raw }, { status: 502 });
  }

  const category = (diagnosis.category as string) ?? "healthy";
  const products = ELAN_PRODUCTS[category] ?? ELAN_PRODUCTS.healthy;

  return NextResponse.json({ ...diagnosis, products });
}
