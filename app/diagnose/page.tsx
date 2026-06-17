import BottomNav from "@/components/BottomNav";
import ChatFab from "@/components/ChatFab";
import Link from "next/link";

const recentHistory = [
  {
    id: "tomato-blight",
    img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&q=80",
    title: "Tomato Early Blight",
    badge: "High Risk",
    badgeBg: "bg-[#ffdad6] text-[#93000a]",
    location: "Greenhouse B",
    time: "2 hours ago",
  },
  {
    id: "maize-healthy",
    img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=200&q=80",
    title: "Maize Healthy",
    badge: "Optimal",
    badgeBg: "bg-[#bcf0ae] text-[#002201]",
    location: "West Field Inspection",
    time: "Yesterday",
  },
  {
    id: "potato-leaf-roll",
    img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&q=80",
    title: "Potato Leaf Roll",
    badge: "Moderate",
    badgeBg: "bg-[#ffd7ce] text-[#7a5b54]",
    location: "North Hill Sector",
    time: "3 days ago",
  },
];

const tips = [
  { icon: "light_mode", title: "Good lighting", desc: "Avoid harsh shadows or dark environments." },
  { icon: "zoom_in", title: "Close-up", desc: "Ensure the affected part fills the screen." },
  { icon: "center_focus_strong", title: "Focused", desc: "Keep the camera still until it auto-focuses." },
];

export default function DiagnosePage() {
  return (
    <div className="bg-[#f9faf2] font-['Work_Sans'] text-[#191c18]">
      <nav className="sticky top-0 w-full z-[50] flex items-center justify-between px-6 h-16 bg-[#f9faf2]">
        <div className="flex items-center gap-4">
          <button className="p-2 text-[#154212] hover:bg-[#e2e3dc] transition-colors rounded-full active:scale-90">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <span className="font-['Plus_Jakarta_Sans'] font-black text-xl text-[#154212]">
            Rythu Mitra
          </span>
        </div>
        <button className="p-2 text-[#154212] hover:bg-[#e2e3dc] transition-colors rounded-full active:scale-90">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </nav>

      <main className="pt-24 pb-32 px-6 max-w-4xl mx-auto">
        {/* Editorial Header */}
        <header className="mb-10">
          <span className="text-[#154212] font-['Work_Sans'] text-[0.75rem] uppercase tracking-widest font-bold mb-2 block">
            Crop Intelligence
          </span>
          <h1 className="font-['Plus_Jakarta_Sans'] text-[#154212] text-[2.5rem] leading-none font-extrabold tracking-tight">
            Snap a photo of the problem
          </h1>
        </header>

        {/* Diagnose Bento Grid */}
        <div className="flex flex-col gap-6 mb-12">
          {/* Camera Viewfinder */}
          <section className="bg-white rounded-[1.5rem] shadow-[0_12px_32px_rgba(25,28,24,0.06)] overflow-hidden relative group">
            <div className="aspect-[4/5]  bg-[#e2e3dc] flex flex-col items-center justify-center relative border-4 border-dashed border-[#c2c9bb]/30 m-4 rounded-xl overflow-hidden">
              <img
                className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
                src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=60"
                alt="Crop leaf placeholder"
              />
              <div className="z-10 text-center px-8">
                <button className="w-20 h-20 bg-[#2d5a27] rounded-full flex items-center justify-center text-white mb-6 mx-auto active:scale-95 transition-transform hover:bg-[#154212]">
                  <span
                    className="material-symbols-outlined text-4xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    photo_camera
                  </span>
                </button>
                <p className="font-['Plus_Jakarta_Sans'] text-xl text-[#154212] font-bold mb-2">
                  Open Camera
                </p>
                <p className="text-[#42493e]">Position the leaf in the center of the frame</p>
              </div>
              {/* Viewfinder corners */}
              <div className="absolute top-8 left-8 w-8 h-8 border-t-4 border-l-4 border-[#154212] rounded-tl-lg" />
              <div className="absolute top-8 right-8 w-8 h-8 border-t-4 border-r-4 border-[#154212] rounded-tr-lg" />
              <div className="absolute bottom-8 left-8 w-8 h-8 border-b-4 border-l-4 border-[#154212] rounded-bl-lg" />
              <div className="absolute bottom-8 right-8 w-8 h-8 border-b-4 border-r-4 border-[#154212] rounded-br-lg" />
            </div>
            <div className="p-6 bg-[#f3f4ed] flex justify-between items-center">
              <button className="flex items-center gap-2 text-[#755750] font-medium hover:text-[#154212] transition-colors">
                <span className="material-symbols-outlined">image</span>
                Upload from Gallery
              </button>
              <span className="text-[#42493e] text-sm font-['Work_Sans'] uppercase tracking-wider">
                AI Analysis Ready
              </span>
            </div>
          </section>

          {/* Tips & Promo */}
          <aside className="space-y-4">
            <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_12px_32px_rgba(25,28,24,0.06)]">
              <h2 className="font-['Plus_Jakarta_Sans'] text-lg text-[#154212] mb-6 font-bold">
                Tips for best results
              </h2>
              <ul className="space-y-6">
                {tips.map((t) => (
                  <li key={t.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#005484] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[#8dc8ff]">{t.icon}</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#191c18]">{t.title}</p>
                      <p className="text-sm text-[#42493e]">{t.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#005484] p-6 rounded-[1.5rem] text-white overflow-hidden relative">
              <div className="relative z-10">
                <p className="text-sm font-['Work_Sans'] uppercase tracking-widest opacity-80 mb-2">
                  Pro Tool
                </p>
                <p className="font-['Plus_Jakarta_Sans'] text-xl font-bold leading-tight">
                  Soil pH &amp; Moisture Integration
                </p>
              </div>
              <span
                className="material-symbols-outlined absolute -bottom-4 -right-4 opacity-10"
                style={{ fontSize: "8rem" }}
              >
                monitoring
              </span>
            </div>
          </aside>
        </div>

        {/* Recent History */}
        <section className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl text-[#154212] font-bold">
              Recent History
            </h2>
            <button className="text-[#755750] font-medium flex items-center gap-1 hover:underline">
              View All
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <div className="space-y-4">
            {recentHistory.map((item) => (
              <Link
                key={item.id}
                href={`/diagnose/result/${item.id}`}
                className="bg-white p-5 rounded-[1.5rem] shadow-[0_12px_32px_rgba(25,28,24,0.04)] flex items-center gap-4 hover:bg-[#edefe7] transition-colors"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-[#191c18]">{item.title}</h3>
                    <span
                      className={`px-3 py-1 ${item.badgeBg} text-[10px] font-bold uppercase rounded-full tracking-wider`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-sm text-[#42493e] mt-1">
                    {item.location} • {item.time}
                  </p>
                </div>
                <span className="material-symbols-outlined text-[#72796e]">chevron_right</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <ChatFab />
      <BottomNav />
    </div>
  );
}
