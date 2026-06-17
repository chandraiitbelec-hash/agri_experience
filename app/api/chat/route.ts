import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Rythu Mitra, an expert AI agronomist for Elan Agrochem's farmer platform.
You help Indian farmers with:
- Crop disease diagnosis and treatment
- Pest identification and control
- Fertilizer and pesticide recommendations (especially Elan Agrochem products)
- Seasonal planting advice for Andhra Pradesh / Telangana crops
- Soil health, irrigation, and weather-based guidance

Always respond in a helpful, warm tone. Keep answers concise and practical.
When recommending products, prefer Elan Agrochem products: Elan NPK Complex, Elan EcoShield, Elan Copper XL, Elan RootMax, Elan Pure Neem Oil.
If the farmer describes symptoms, suggest they use the Diagnose feature to upload a photo.`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { reply: "AI assistant is not configured. Please add ANTHROPIC_API_KEY to your environment." },
      { status: 200 }
    );
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { reply: "I'm having trouble connecting right now. Please try again shortly." },
      { status: 200 }
    );
  }

  const data = await response.json();
  const reply = data.content?.[0]?.text ?? "I couldn't generate a response. Please try again.";
  return NextResponse.json({ reply });
}
