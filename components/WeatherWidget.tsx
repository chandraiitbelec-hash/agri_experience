"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface WeatherData {
  location: string;
  temp: number;
  label: string;
  icon: string;
  humidity: number;
  wind: number;
  rainChance: number;
  forecast: { day: string; icon: string; label: string; max: number; min: number; rain: number }[];
}

function getRainLabel(chance: number) {
  if (chance === 0) return "No rain";
  if (chance < 30) return "Unlikely";
  if (chance < 60) return `${chance}% chance`;
  return `${chance}% — likely`;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    function fetchWeather(lat: number, lon: number, name: string) {
      fetch(`/api/weather?lat=${lat}&lon=${lon}&name=${encodeURIComponent(name)}`)
        .then((r) => r.json())
        .then((d) => { setWeather(d); setLoading(false); })
        .catch(() => { setError(true); setLoading(false); });
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeather(pos.coords.latitude, pos.coords.longitude, "Your Location");
        },
        () => {
          // denied — fall back to Kadapa
          fetchWeather(14.48, 78.82, "Kadapa, AP");
        },
        { timeout: 5000 }
      );
    } else {
      fetchWeather(14.48, 78.82, "Kadapa, AP");
    }
  }, []);

  if (loading) {
    return (
      <section className="space-y-4">
        <div className="rounded-[1.5rem] bg-gradient-to-br from-[#154212] to-[#2D5A27] p-8 animate-pulse h-52" />
        <div className="bg-[#f3f4ed] rounded-[1.5rem] p-6 animate-pulse h-40" />
      </section>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-[#f3f4ed] rounded-[1.5rem] p-6 text-center text-[#42493e]">
        <span className="material-symbols-outlined block text-3xl mb-2">cloud_off</span>
        <p className="text-sm">Could not load weather data.</p>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      {/* Current weather */}
      <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#154212] to-[#2D5A27] p-8 text-white">
        <div className="relative z-10">
          <p className="font-['Work_Sans'] text-xs uppercase tracking-[0.15em] opacity-80 mb-2">
            Current Weather • {weather.location}
          </p>
          <div className="flex items-baseline gap-2 mb-8">
            <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-7xl tracking-tighter">
              {weather.temp}°C
            </span>
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-2xl opacity-90">
              {weather.label}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "water_drop", label: "Humidity",  value: `${weather.humidity}%` },
              { icon: "air",        label: "Wind",      value: `${weather.wind}km/h` },
              { icon: "umbrella",   label: "Rain",      value: getRainLabel(weather.rainChance) },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <span className="material-symbols-outlined block mb-1 text-xl">{item.icon}</span>
                <p className="font-['Work_Sans'] text-[10px] uppercase opacity-70">{item.label}</p>
                <p className="font-['Plus_Jakarta_Sans'] font-bold text-base leading-tight">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#755750]/20 rounded-full blur-3xl" />
      </div>

      {/* 5-Day Forecast */}
      <div className="bg-[#f3f4ed] rounded-[1.5rem] p-6">
        <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-lg mb-4 text-[#191c18]">
          5-Day Forecast
        </h3>
        <div className="space-y-3">
          {weather.forecast.map((f, i) => (
            <div key={i} className={`flex items-center justify-between ${f.rain >= 60 ? "text-[#003c60]" : ""}`}>
              <span className="font-medium text-sm w-12">{f.day}</span>
              <span className={`material-symbols-outlined ${
                f.icon === "sunny" ? "text-amber-500" :
                f.icon === "rainy" || f.icon === "thunderstorm" ? "text-[#003c60]" : "text-slate-400"
              }`}>{f.icon}</span>
              <span className="font-bold text-sm">{f.max}° / {f.min}°</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Shortcuts */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/diagnose" className="group flex items-center gap-3 bg-white p-5 rounded-[1.5rem] hover:bg-[#2d5a27] transition-all duration-300">
          <div className="w-11 h-11 rounded-full bg-[#154212]/10 group-hover:bg-white/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#154212] group-hover:text-white">medical_services</span>
          </div>
          <div className="text-left">
            <p className="font-['Plus_Jakarta_Sans'] font-bold text-base group-hover:text-white">Diagnose Crop</p>
            <p className="font-['Work_Sans'] text-[10px] uppercase tracking-wide text-[#42493e] group-hover:text-white/70">Scan for Pests</p>
          </div>
        </Link>
        <Link href="/chat" className="group flex items-center gap-3 bg-white p-5 rounded-[1.5rem] hover:bg-[#003c60] transition-all duration-300">
          <div className="w-11 h-11 rounded-full bg-[#003c60]/10 group-hover:bg-white/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#003c60] group-hover:text-white">psychology</span>
          </div>
          <div className="text-left">
            <p className="font-['Plus_Jakarta_Sans'] font-bold text-base group-hover:text-white">Ask AI Bot</p>
            <p className="font-['Work_Sans'] text-[10px] uppercase tracking-wide text-[#42493e] group-hover:text-white/70">Agri-Expert Help</p>
          </div>
        </Link>
      </div>
    </section>
  );
}
