import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

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

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { reply: "AI assistant is not configured. Please add GEMINI_API_KEY to your environment." },
      { status: 200 }
    );
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Convert messages to Gemini format; exclude the last user message — it goes as the prompt
    const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages[messages.length - 1];

    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      config: { systemInstruction: SYSTEM_PROMPT, maxOutputTokens: 512 },
      history,
    });

    const response = await chat.sendMessage({ message: lastMessage.content });
    const reply = response.text ?? "I couldn't generate a response. Please try again.";
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { reply: "I'm having trouble connecting right now. Please try again shortly." },
      { status: 200 }
    );
  }
}
