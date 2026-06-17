"use client";
import { useEffect, useState, useRef } from "react";
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
  const [askLocation, setAskLocation] = useState(false);
  const [cityInput, setCityInput] = useState("");
  const [cityError, setCityError] = useState("");
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function fetchByCoords(lat: number, lon: number, name: string) {
    fetch(`/api/weather?lat=${lat}&lon=${lon}&name=${encodeURIComponent(name)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setWeather(d);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setAskLocation(true);
      });
  }

  async function fetchByCity(city: string) {
    setSearching(true);
    setCityError("");
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}&name=${encodeURIComponent(city)}`);
      const d = await res.json();
      if (!res.ok || d.error) throw new Error(d.detail ?? d.error ?? "City not found");
      setWeather(d);
      setAskLocation(false);
      setLoading(false);
    } catch (err: unknown) {
      setCityError(err instanceof Error ? err.message : "City not found. Try again.");
    } finally {
      setSearching(false);
    }
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      setLoading(false);
      setAskLocation(true);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchByCoords(pos.coords.latitude, pos.coords.longitude, "Your Location"),
      () => {
        setLoading(false);
        setAskLocation(true);
      },
      { timeout: 5000 }
    );
  }, []);

  useEffect(() => {
    if (askLocation) setTimeout(() => inputRef.current?.focus(), 100);
  }, [askLocation]);

  if (loading) {
    return (
      <section className="space-y-4">
        <div className="rounded-[1.5rem] bg-gradient-to-br from-[#154212] to-[#2D5A27] p-8 animate-pulse h-52" />
        <div className="bg-[#f3f4ed] rounded-[1.5rem] p-6 animate-pulse h-40" />
      </section>
    );
  }

  if (askLocation) {
    return (
      <section className="space-y-4">
        <div className="rounded-[1.5rem] bg-gradient-to-br from-[#154212] to-[#2D5A27] p-8 text-white">
          <p className="font-['Work_Sans'] text-xs uppercase tracking-[0.15em] opacity-80 mb-2">
            Weather
          </p>
          <p className="font-['Plus_Jakarta_Sans'] font-bold text-xl mb-1">
            Where are you farming?
          </p>
          <p className="text-white/70 text-sm mb-6">
            Enter your city or district to get local weather.
          </p>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && cityInput.trim() && fetchByCity(cityInput.trim())}
              placeholder="e.g. Kadapa, Guntur, Warangal…"
              className="flex-1 bg-white/15 backdrop-blur-sm text-white placeholder-white/50 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white/25 transition-colors"
            />
            <button
              onClick={() => cityInput.trim() && fetchByCity(cityInput.trim())}
              disabled={searching || !cityInput.trim()}
              className="bg-white text-[#154212] font-bold px-4 py-3 rounded-xl disabled:opacity-50 active:scale-95 transition-all"
            >
              {searching
                ? <span className="w-4 h-4 border-2 border-[#154212] border-t-transparent rounded-full animate-spin block" />
                : <span className="material-symbols-outlined text-xl">search</span>
              }
            </button>
          </div>
          {cityError && (
            <p className="mt-3 text-[#ffdad6] text-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">error</span>
              {cityError}
            </p>
          )}

          {/* Quick suggestions */}
          <div className="flex flex-wrap gap-2 mt-4">
            {["Kadapa", "Guntur", "Warangal", "Nellore"].map((c) => (
              <button
                key={c}
                onClick={() => { setCityInput(c); fetchByCity(c); }}
                className="bg-white/15 hover:bg-white/25 text-white text-xs px-3 py-1.5 rounded-full transition-colors"
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Shortcuts still visible */}
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

  return (
    <section className="space-y-4">
      {/* Current weather */}
      <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#154212] to-[#2D5A27] p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <p className="font-['Work_Sans'] text-xs uppercase tracking-[0.15em] opacity-80">
              Current Weather • {weather!.location}
            </p>
            <button
              onClick={() => { setWeather(null); setAskLocation(true); setCityInput(""); }}
              className="opacity-60 hover:opacity-100 transition-opacity"
              title="Change location"
            >
              <span className="material-symbols-outlined text-sm">edit_location</span>
            </button>
          </div>
          <div className="flex items-baseline gap-2 mb-8">
            <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-7xl tracking-tighter">
              {weather!.temp}°C
            </span>
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-2xl opacity-90">
              {weather!.label}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "water_drop", label: "Humidity",  value: `${weather!.humidity}%` },
              { icon: "air",        label: "Wind",      value: `${weather!.wind}km/h` },
              { icon: "umbrella",   label: "Rain",      value: getRainLabel(weather!.rainChance) },
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
          {weather!.forecast.map((f, i) => (
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
