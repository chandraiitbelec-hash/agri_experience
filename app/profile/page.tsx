import BottomNav from "@/components/BottomNav";
import ChatFab from "@/components/ChatFab";

const crops = [
  { icon: "grass", iconClass: "text-[#154212]", border: "border-[#154212]", name: "Paddy Rice", acres: "8.2 Acres" },
  { icon: "eco", iconClass: "text-[#755750]", border: "border-[#755750]", name: "Cotton", acres: "6.5 Acres" },
  { icon: "nutrition", iconClass: "text-[#ba1a1a]", border: "border-[#ba1a1a]", name: "Chilli", acres: "4.8 Acres" },
];

const orders = [
  {
    id: "RM-92841",
    status: "IN TRANSIT",
    statusBg: "bg-[#005484] text-white",
    note: "Estimated delivery: Tomorrow",
    icon: "local_shipping",
    iconBg: "bg-[#96ccff]/20",
    iconClass: "text-[#005484]",
    amount: "₹14,500.00",
  },
  {
    id: "RM-81102",
    status: "DELIVERED",
    statusBg: "bg-[#e2e3dc] text-[#42493e]",
    note: "Delivered on 12 Mar 2024",
    icon: "check_circle",
    iconBg: "bg-[#bcf0ae]/20",
    iconClass: "text-[#154212]",
    amount: "₹2,240.00",
  },
  {
    id: "RM-73450",
    status: "PROCESSING",
    statusBg: "bg-[#ffdad2] text-[#7a5b54]",
    note: "Placed on 10 Jun 2026",
    icon: "hourglass_top",
    iconBg: "bg-[#ffdad2]/20",
    iconClass: "text-[#755750]",
    amount: "₹3,620.00",
  },
];

export default function ProfilePage() {
  return (
    <div className="bg-[#f9faf2] font-['Work_Sans'] text-[#191c18]">
      <header className="sticky top-0 w-full z-[50] flex items-center justify-between px-6 h-16 bg-[#f9faf2]">
        <div className="flex items-center gap-3">
          <button className="material-symbols-outlined text-[#154212] hover:bg-[#e2e3dc] p-2 rounded-full transition-colors">
            menu
          </button>
          <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight text-[#154212]">
            Rythu Mitra
          </h1>
        </div>
        <button className="material-symbols-outlined text-[#154212] hover:bg-[#e2e3dc] p-2 rounded-full transition-colors">
          notifications
        </button>
      </header>

      <main className="pt-20 pb-32 px-6 max-w-5xl mx-auto">
        {/* Profile Bento */}
        <section className="flex flex-col gap-6">
          {/* User Info */}
          <div className="bg-white rounded-xl p-8 flex flex-col items-center gap-8 shadow-[0_12px_32px_rgba(25,28,24,0.02)]">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#f3f4ed]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
                  alt="Farmer profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#154212] text-white p-2 rounded-full border-4 border-white">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col gap-1 mb-4">
                <p className="font-['Work_Sans'] text-xs uppercase tracking-[0.05rem] text-[#755750]">
                  Elite Member
                </p>
                <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-[#154212]">
                  Ramesh Kumar
                </h2>
                <p className="text-[#42493e]">Member since October 2021</p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                <div className="bg-[#e2e3dc] px-4 py-2 rounded-full flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#154212] text-lg">location_on</span>
                  <span className="text-sm font-medium">Guntur, Andhra Pradesh</span>
                </div>
              </div>
            </div>
          </div>

          {/* Total Holding */}
          <div className="bg-[#154212] text-white rounded-xl p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-10">
              <span className="material-symbols-outlined" style={{ fontSize: "12rem" }}>
                agriculture
              </span>
            </div>
            <div>
              <span className="font-['Work_Sans'] text-xs uppercase tracking-widest text-white/70">
                Total Holding
              </span>
              <h3 className="font-['Plus_Jakarta_Sans'] text-5xl font-extrabold mt-2">19.5</h3>
              <p className="font-['Plus_Jakarta_Sans'] text-xl font-bold opacity-80">Acres</p>
            </div>
            <div className="mt-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-white/60">terrain</span>
              <span className="text-sm">Verified Farmland</span>
            </div>
          </div>
        </section>

        {/* Crops */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#154212]">
              Crops Grown
            </h2>
            <button className="text-[#154212] font-semibold text-sm hover:underline">
              Manage Fields
            </button>
          </div>
          <div className="grid grid-cols-1 grid-cols-1 gap-6">
            {crops.map((c) => (
              <div
                key={c.name}
                className={`bg-[#f3f4ed] rounded-xl p-6 flex items-center gap-5 border-l-4 ${c.border}`}
              >
                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center">
                  <span className={`material-symbols-outlined ${c.iconClass} text-3xl`}>
                    {c.icon}
                  </span>
                </div>
                <div>
                  <h4 className="font-['Plus_Jakarta_Sans'] text-lg font-bold">{c.name}</h4>
                  <p className="font-['Work_Sans'] text-xs uppercase text-[#755750]">{c.acres}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Orders */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#154212]">
              Recent Orders
            </h2>
            <button className="text-[#154212] font-semibold text-sm flex items-center gap-1">
              View All{" "}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <div className="space-y-4">
            {orders.map((o) => (
              <div
                key={o.id}
                className="bg-white rounded-xl p-6 flex flex-col md:items-center justify-between gap-4 shadow-[0_4px_12px_rgba(25,28,24,0.02)] group hover:bg-[#f9faf2] transition-colors"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-full ${o.iconBg} flex items-center justify-center`}>
                    <span className={`material-symbols-outlined ${o.iconClass}`}>{o.icon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-['Plus_Jakarta_Sans'] font-bold text-lg">Order #{o.id}</p>
                      <span className={`${o.statusBg} px-3 py-1 rounded-full text-[10px] font-['Work_Sans'] font-bold tracking-wider`}>
                        {o.status}
                      </span>
                    </div>
                    <p className="text-sm text-[#42493e]">{o.note}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between md:text-right gap-8">
                  <div>
                    <p className="font-['Work_Sans'] text-[10px] uppercase text-[#755750]">Amount</p>
                    <p className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#154212]">
                      {o.amount}
                    </p>
                  </div>
                  <button className="material-symbols-outlined text-[#72796e] group-hover:text-[#154212] transition-colors">
                    chevron_right
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Settings */}
        <section className="mt-12 bg-white rounded-xl p-6 shadow-[0_4px_12px_rgba(25,28,24,0.02)] space-y-1">
          {[
            { icon: "notifications", label: "Notifications" },
            { icon: "language", label: "Language (Telugu / English)" },
            { icon: "help_outline", label: "Help & Support" },
            { icon: "logout", label: "Log Out", danger: true },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#f3f4ed] transition-colors text-left ${
                item.danger ? "text-[#ba1a1a]" : "text-[#191c18]"
              }`}
            >
              <span className={`material-symbols-outlined ${item.danger ? "text-[#ba1a1a]" : "text-[#154212]"}`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
              {!item.danger && (
                <span className="material-symbols-outlined text-[#72796e] ml-auto">chevron_right</span>
              )}
            </button>
          ))}
        </section>
      </main>

      <ChatFab />
      <BottomNav />
    </div>
  );
}
