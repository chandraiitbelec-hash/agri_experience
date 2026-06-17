import BottomNav from "@/components/BottomNav";
import ChatFab from "@/components/ChatFab";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#f9faf2] font-['Work_Sans'] text-[#191c18]">
      <header className="sticky top-0 w-full z-[50] flex items-center justify-between px-6 h-16 bg-[#f3f4ed]">
        <div className="flex items-center gap-4">
          <button className="text-[#154212] hover:bg-[#e2e3dc] transition-colors active:scale-90 p-2 rounded-full">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="font-['Plus_Jakarta_Sans'] font-black text-xl text-[#154212] tracking-tight">Rythu Mitra</h1>
        </div>
        <button className="text-[#154212] hover:bg-[#e2e3dc] transition-colors active:scale-90 p-2 rounded-full">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="pt-20 pb-32 px-6 space-y-8">
        {/* Weather Hero */}
        <section className="space-y-4">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#154212] to-[#2D5A27] p-8 text-white">
            <div className="relative z-10">
              <p className="font-['Work_Sans'] text-xs uppercase tracking-[0.15em] opacity-80 mb-2">Current Weather • Kadapa, AP</p>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-7xl tracking-tighter">32°C</span>
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-2xl opacity-90">Sunny</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: "water_drop", label: "Humidity", value: "15%" },
                  { icon: "air", label: "Wind", value: "12km/h" },
                  { icon: "umbrella", label: "Rain", value: "In 2 days" },
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
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-lg mb-4 text-[#191c18]">5-Day Forecast</h3>
            <div className="space-y-3">
              {[
                { day: "Mon", icon: "sunny", iconClass: "text-amber-500", temp: "34° / 24°" },
                { day: "Tue", icon: "sunny", iconClass: "text-amber-500", temp: "35° / 25°" },
                { day: "Wed", icon: "partly_cloudy_day", iconClass: "text-slate-400", temp: "31° / 22°" },
                { day: "Thu", icon: "rainy", iconClass: "text-[#003c60]", temp: "28° / 20°", highlight: true },
                { day: "Fri", icon: "cloud", iconClass: "text-slate-400", temp: "30° / 21°" },
              ].map((f) => (
                <div key={f.day} className={`flex items-center justify-between ${f.highlight ? "text-[#003c60]" : ""}`}>
                  <span className="font-medium text-sm w-12">{f.day}</span>
                  <span className={`material-symbols-outlined ${f.iconClass}`}>{f.icon}</span>
                  <span className="font-bold text-sm">{f.temp}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Shortcuts */}
        <section className="grid grid-cols-2 gap-4">
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
        </section>

        {/* Seasonal Insights */}
        <div className="bg-[#f3f4ed] rounded-[1.5rem] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-xl">Seasonal Insights</h3>
            <span className="material-symbols-outlined text-[#755750]">calendar_month</span>
          </div>
          <div className="relative rounded-xl overflow-hidden h-40">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80"
              alt="Rice paddy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <p className="text-white font-bold">Monsoon Rice Preparation Guide</p>
            </div>
          </div>
          <p className="text-[#42493e] text-sm leading-relaxed">
            Prepare your nursery beds for the upcoming monsoon. Focus on proper drainage and select high-yield IRRI varieties for best results this season.
          </p>
          <button className="w-full py-3 bg-[#ffd7ce] text-[#7a5b54] font-bold rounded-xl hover:opacity-90 transition-opacity">
            Read Full Report
          </button>
        </div>

        {/* Satellite Tracking */}
        <div className="bg-[#f3f4ed] rounded-[1.5rem] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-xl">Satellite Tracking</h3>
            <span className="material-symbols-outlined text-[#154212]">satellite_alt</span>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 192 192">
                <circle cx="96" cy="96" fill="transparent" r="88" stroke="#e2e3dc" strokeWidth="12" />
                <circle cx="96" cy="96" fill="transparent" r="88" stroke="#005484" strokeDasharray="552.9" strokeDashoffset="66.3" strokeWidth="12" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-['Plus_Jakarta_Sans'] font-black text-4xl text-[#003c60]">88%</span>
                <span className="font-['Work_Sans'] text-[10px] uppercase tracking-wider text-[#42493e]">Moisture</span>
              </div>
            </div>
            <div>
              <p className="font-bold text-lg">Farm Plot #42A</p>
              <div className="flex items-center justify-center gap-2 text-[#154212] font-medium text-sm">
                <span className="w-2 h-2 rounded-full bg-[#154212]" />
                Optimal Soil Conditions
              </div>
            </div>
            <div className="w-full bg-[#e2e3dc] rounded-xl p-4 flex items-center justify-between">
              <span className="text-xs font-['Work_Sans'] uppercase">Last scanned</span>
              <span className="text-xs font-bold">Today, 06:45 AM</span>
            </div>
          </div>
        </div>

        {/* Elan Promo */}
        <section className="relative bg-[#005484] text-white rounded-[2rem] p-8 overflow-hidden">
          <div className="relative z-10">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
              Elan Agrochem
            </span>
            <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl mb-3 leading-tight">
              Trusted agro-chemicals for every season.
            </h3>
            <p className="text-white/80 mb-5 text-sm">
              Fertilizers, pesticides, and growth boosters from Elan Agrochem.
            </p>
            <Link href="/marketplace" className="bg-white text-[#003c60] px-5 py-3 rounded-xl font-bold inline-flex items-center gap-2 hover:bg-[#cee5ff] transition-all text-sm">
              Shop Now
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </section>
      </main>

      <ChatFab />
      <BottomNav />
    </div>
  );
}
