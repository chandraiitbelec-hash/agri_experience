import BottomNav from "@/components/BottomNav";
import ChatFab from "@/components/ChatFab";
import WeatherWidget from "@/components/WeatherWidget";
import AppHeader from "@/components/AppHeader";

export default function Home() {
  return (
    <div className="bg-[#f9faf2] font-['Work_Sans'] text-[#191c18]">
      <AppHeader />

      <main className="pt-6 pb-32 px-6 space-y-8">
        {/* Live weather widget */}
        <WeatherWidget />

        {/* Seasonal Insights */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl text-[#154212] font-bold">Seasonal Insights</h2>
            <button className="text-[#755750] font-medium hover:underline text-sm flex items-center gap-1">
              More <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <div className="relative overflow-hidden rounded-[1.5rem] h-48">
            <img
              src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80"
              alt="Farm fields"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#154212]/90 via-[#154212]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <p className="font-['Work_Sans'] text-xs uppercase tracking-wider opacity-80 mb-1">Kharif Season</p>
              <p className="font-['Plus_Jakarta_Sans'] font-bold text-xl leading-tight">
                Optimal time to sow<br />Paddy & Cotton
              </p>
            </div>
          </div>
        </section>

        {/* Elan Banner */}
        <section className="bg-[#2D5A27] rounded-[1.5rem] p-6 text-white flex items-center justify-between overflow-hidden relative">
          <div className="relative z-10">
            <p className="font-['Work_Sans'] text-xs uppercase tracking-widest opacity-70 mb-1">Elan Agrochem</p>
            <p className="font-['Plus_Jakarta_Sans'] font-bold text-xl leading-tight mb-3">
              Monsoon crop protection<br />bundles now available
            </p>
            <button className="bg-white text-[#154212] font-bold text-sm px-4 py-2 rounded-full hover:bg-[#f3f4ed] transition-colors">
              Shop Now
            </button>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 opacity-10" style={{ fontSize: "9rem" }}>
            eco
          </span>
        </section>
      </main>

      <ChatFab />
      <BottomNav />
    </div>
  );
}
