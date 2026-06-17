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
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 });
  }

  const { imageBase64, mediaType } = await req.json();
  if (!imageBase64) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM }] },
        contents: [{
          role: "user",
          parts: [
            { inline_data: { mime_type: mediaType ?? "image/jpeg", data: imageBase64 } },
            { text: "Analyze this crop image and return the JSON diagnosis." },
          ],
        }],
        generationConfig: { maxOutputTokens: 2048 },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    return NextResponse.json({ error: "Gemini API error", detail: err }, { status: 502 });
  }

  const data = await response.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
  const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/,"").trim();

  let diagnosis: Record<string, unknown>;
  try {
    diagnosis = JSON.parse(cleaned);
  } catch {
    return NextResponse.json({ error: "Failed to parse diagnosis JSON", raw }, { status: 502 });
  }

  const category = (diagnosis.category as string) ?? "healthy";
  const products = ELAN_PRODUCTS[category] ?? ELAN_PRODUCTS.healthy;

  return NextResponse.json({ ...diagnosis, products });
}
