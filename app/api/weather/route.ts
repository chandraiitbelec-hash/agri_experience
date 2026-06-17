import { NextRequest, NextResponse } from "next/server";

const ICON_MAP: Record<string, string> = {
  "01": "sunny",
  "02": "partly_cloudy_day",
  "03": "cloud",
  "04": "cloud",
  "09": "rainy",
  "10": "rainy",
  "11": "thunderstorm",
  "13": "weather_snowy",
  "50": "foggy",
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export async function GET(req: NextRequest) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OPENWEATHER_API_KEY not configured" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const lat  = searchParams.get("lat");
  const lon  = searchParams.get("lon");
  const city = searchParams.get("city");
  const name = searchParams.get("name") ?? city ?? "Unknown";

  if (!lat && !lon && !city) {
    return NextResponse.json({ error: "Provide lat & lon or city param" }, { status: 400 });
  }

  const locationQuery = lat && lon
    ? `lat=${lat}&lon=${lon}`
    : `q=${encodeURIComponent(city!)}`;

  const [currentRes, forecastRes] = await Promise.all([
    fetch(`https://api.openweathermap.org/data/2.5/weather?${locationQuery}&units=metric&appid=${apiKey}`, { cache: "no-store" }),
    fetch(`https://api.openweathermap.org/data/2.5/forecast?${locationQuery}&units=metric&cnt=40&appid=${apiKey}`, { cache: "no-store" }),
  ]);

  if (!currentRes.ok || !forecastRes.ok) {
    const detail = await (currentRes.ok ? forecastRes : currentRes).text().catch(() => "");
    return NextResponse.json({ error: "Weather fetch failed", detail }, { status: 502 });
  }

  const current  = await currentRes.json();
  const forecast = await forecastRes.json();

  const iconCode = (current.weather[0].icon as string).slice(0, 2);
  const icon     = ICON_MAP[iconCode] ?? "sunny";

  // OWM forecast returns 3-hour slots — pick one midday slot per unique day
  const seen = new Set<string>();
  const days: { day: string; icon: string; label: string; max: number; min: number; rain: number }[] = [];

  for (const slot of forecast.list) {
    const date    = new Date(slot.dt * 1000);
    const dateStr = date.toISOString().slice(0, 10);
    const hour    = date.getUTCHours() + 5; // roughly IST midday check

    if (seen.has(dateStr) || hour < 11) continue;
    seen.add(dateStr);

    const slotIcon = ICON_MAP[(slot.weather[0].icon as string).slice(0, 2)] ?? "sunny";
    days.push({
      day:   DAYS[date.getDay()],
      icon:  slotIcon,
      label: slot.weather[0].main,
      max:   Math.round(slot.main.temp_max),
      min:   Math.round(slot.main.temp_min),
      rain:  Math.round((slot.pop ?? 0) * 100),
    });

    if (days.length === 5) break;
  }

  return NextResponse.json({
    location:   name,
    temp:       Math.round(current.main.temp),
    label:      current.weather[0].main,
    icon,
    humidity:   current.main.humidity,
    wind:       Math.round(current.wind.speed * 3.6), // m/s → km/h
    rainChance: Math.round((forecast.list[0]?.pop ?? 0) * 100),
    forecast:   days,
  });
}
