import { NextRequest, NextResponse } from "next/server";

const WMO: Record<number, { label: string; icon: string }> = {
  0:  { label: "Clear",          icon: "sunny" },
  1:  { label: "Mainly Clear",   icon: "sunny" },
  2:  { label: "Partly Cloudy",  icon: "partly_cloudy_day" },
  3:  { label: "Overcast",       icon: "cloud" },
  45: { label: "Foggy",          icon: "foggy" },
  48: { label: "Foggy",          icon: "foggy" },
  51: { label: "Drizzle",        icon: "rainy" },
  53: { label: "Drizzle",        icon: "rainy" },
  55: { label: "Drizzle",        icon: "rainy" },
  61: { label: "Rain",           icon: "rainy" },
  63: { label: "Rain",           icon: "rainy" },
  65: { label: "Heavy Rain",     icon: "thunderstorm" },
  71: { label: "Snow",           icon: "weather_snowy" },
  80: { label: "Showers",        icon: "rainy" },
  81: { label: "Showers",        icon: "rainy" },
  95: { label: "Thunderstorm",   icon: "thunderstorm" },
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat  = searchParams.get("lat")  ?? "14.48";
  const lon  = searchParams.get("lon")  ?? "78.82";
  const name = searchParams.get("name") ?? "Kadapa, AP";

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,precipitation_probability` +
    `&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max` +
    `&timezone=Asia%2FKolkata&forecast_days=5`;

  const res = await fetch(url, { next: { revalidate: 1800 } });
  if (!res.ok) return NextResponse.json({ error: "Weather fetch failed" }, { status: 502 });

  const data = await res.json();
  const cur   = data.current;
  const daily = data.daily;

  const forecast = (daily.time as string[]).map((dateStr: string, i: number) => {
    const d    = new Date(dateStr);
    const code = daily.weather_code[i] as number;
    const wmo  = WMO[code] ?? { label: "Clear", icon: "sunny" };
    return {
      day:  DAYS[d.getDay()],
      icon: wmo.icon,
      label: wmo.label,
      max:  Math.round(daily.temperature_2m_max[i]),
      min:  Math.round(daily.temperature_2m_min[i]),
      rain: daily.precipitation_probability_max[i] ?? 0,
    };
  });

  const curWmo = WMO[cur.weather_code as number] ?? { label: "Sunny", icon: "sunny" };

  return NextResponse.json({
    location:   name,
    temp:       Math.round(cur.temperature_2m),
    label:      curWmo.label,
    icon:       curWmo.icon,
    humidity:   cur.relative_humidity_2m,
    wind:       Math.round(cur.wind_speed_10m),
    rainChance: cur.precipitation_probability ?? 0,
    forecast,
  });
}
