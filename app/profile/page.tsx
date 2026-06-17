"use client";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import ChatFab from "@/components/ChatFab";
import AppHeader from "@/components/AppHeader";
import OrderSheet from "@/components/OrderSheet";

type Sheet = "notifications" | "language" | "logout" | "fields" | null;

const crops = [
  { icon: "grass",     iconClass: "text-[#154212]", border: "border-[#154212]", name: "Paddy Rice", acres: "8.2 Acres" },
  { icon: "eco",       iconClass: "text-[#755750]", border: "border-[#755750]", name: "Cotton",     acres: "6.5 Acres" },
  { icon: "nutrition", iconClass: "text-[#ba1a1a]", border: "border-[#ba1a1a]", name: "Chilli",     acres: "4.8 Acres" },
];

const orders = [
  { id: "RM-92841", status: "IN TRANSIT",  statusBg: "bg-[#005484] text-white",       note: "Estimated delivery: Tomorrow",   icon: "local_shipping", iconBg: "bg-[#96ccff]/20",  iconClass: "text-[#005484]", amount: "₹14,500.00" },
  { id: "RM-81102", status: "DELIVERED",   statusBg: "bg-[#e2e3dc] text-[#42493e]",   note: "Delivered on 12 Mar 2024",       icon: "check_circle",   iconBg: "bg-[#bcf0ae]/20",  iconClass: "text-[#154212]", amount: "₹2,240.00" },
  { id: "RM-73450", status: "PROCESSING",  statusBg: "bg-[#ffdad2] text-[#7a5b54]",   note: "Placed on 10 Jun 2026",          icon: "hourglass_top",  iconBg: "bg-[#ffdad2]/20",  iconClass: "text-[#755750]", amount: "₹3,620.00" },
];

type Order = typeof orders[0];

export default function ProfilePage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [sheet, setSheet] = useState<Sheet>(null);
  const [notifications, setNotifications] = useState({ weather: true, orders: true, promos: false });
  const [language, setLanguage] = useState<"en" | "te">("en");

  return (
    <div className="bg-[#f9faf2] font-['Work_Sans'] text-[#191c18]">
      <AppHeader />

      <main className="pt-6 pb-32 px-6 max-w-5xl mx-auto">
        {/* Profile Card */}
        <section className="flex flex-col gap-6">
          <div className="bg-white rounded-xl p-8 flex flex-col items-center gap-8 shadow-[0_12px_32px_rgba(25,28,24,0.02)]">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#f3f4ed]">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" alt="Farmer profile" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#154212] text-white p-2 rounded-full border-4 border-white">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            </div>
            <div className="flex-1 text-center">
              <p className="font-['Work_Sans'] text-xs uppercase tracking-[0.05rem] text-[#755750]">Elite Member</p>
              <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-[#154212]">Ramesh Kumar</h2>
              <p className="text-[#42493e]">Member since October 2021</p>
              <div className="flex justify-center mt-4">
                <div className="bg-[#e2e3dc] px-4 py-2 rounded-full flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#154212] text-lg">location_on</span>
                  <span className="text-sm font-medium">Guntur, Andhra Pradesh</span>
                </div>
              </div>
            </div>
          </div>

          {/* Total Holding */}
          <div className="bg-[#154212] text-white rounded-xl p-8 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-10">
              <span className="material-symbols-outlined" style={{ fontSize: "12rem" }}>agriculture</span>
            </div>
            <span className="font-['Work_Sans'] text-xs uppercase tracking-widest text-white/70">Total Holding</span>
            <h3 className="font-['Plus_Jakarta_Sans'] text-5xl font-extrabold mt-2">19.5</h3>
            <p className="font-['Plus_Jakarta_Sans'] text-xl font-bold opacity-80">Acres</p>
            <div className="mt-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-white/60">terrain</span>
              <span className="text-sm">Verified Farmland</span>
            </div>
          </div>
        </section>

        {/* Crops */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#154212]">Crops Grown</h2>
            <button onClick={() => setSheet("fields")} className="text-[#154212] font-semibold text-sm hover:underline">Manage Fields</button>
          </div>
          <div className="space-y-4">
            {crops.map((c) => (
              <div key={c.name} className={`bg-[#f3f4ed] rounded-xl p-6 flex items-center gap-5 border-l-4 ${c.border}`}>
                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center">
                  <span className={`material-symbols-outlined ${c.iconClass} text-3xl`}>{c.icon}</span>
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
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#154212]">Recent Orders</h2>
            <button className="text-[#154212] font-semibold text-sm flex items-center gap-1">
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <div className="space-y-4">
            {orders.map((o) => (
              <button
                key={o.id}
                onClick={() => setSelectedOrder(o)}
                className="w-full bg-white rounded-xl p-6 flex flex-col justify-between gap-4 shadow-[0_4px_12px_rgba(25,28,24,0.02)] hover:bg-[#f3f4ed] transition-colors text-left active:scale-[0.98]"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-full ${o.iconBg} flex items-center justify-center shrink-0`}>
                    <span className={`material-symbols-outlined ${o.iconClass}`}>{o.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-['Plus_Jakarta_Sans'] font-bold text-lg">Order #{o.id}</p>
                      <span className={`${o.statusBg} px-3 py-1 rounded-full text-[10px] font-bold tracking-wider`}>{o.status}</span>
                    </div>
                    <p className="text-sm text-[#42493e]">{o.note}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-['Work_Sans'] text-[10px] uppercase text-[#755750]">Amount</p>
                    <p className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#154212]">{o.amount}</p>
                  </div>
                  <span className="material-symbols-outlined text-[#72796e]">chevron_right</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Settings */}
        <section className="mt-12 bg-white rounded-xl p-6 shadow-[0_4px_12px_rgba(25,28,24,0.02)] space-y-1">
          {[
            { icon: "notifications", label: "Notifications",              onClick: () => setSheet("notifications") },
            { icon: "language",      label: "Language (Telugu / English)", onClick: () => setSheet("language") },
            { icon: "help_outline",  label: "Help & Support",              onClick: () => window.open("mailto:support@elanagrochem.com") },
            { icon: "logout",        label: "Log Out", danger: true,       onClick: () => setSheet("logout") },
          ].map((item) => (
            <button key={item.label} onClick={item.onClick} className={`w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#f3f4ed] transition-colors text-left ${item.danger ? "text-[#ba1a1a]" : "text-[#191c18]"}`}>
              <span className={`material-symbols-outlined ${item.danger ? "text-[#ba1a1a]" : "text-[#154212]"}`}>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
              {!item.danger && <span className="material-symbols-outlined text-[#72796e] ml-auto">chevron_right</span>}
            </button>
          ))}
        </section>
      </main>

      <OrderSheet order={selectedOrder} onClose={() => setSelectedOrder(null)} />

      {/* Bottom sheets */}
      {sheet && (
        <>
          <div className="fixed inset-0 z-[100] bg-black/50" onClick={() => setSheet(null)} />
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[110] w-full max-w-[390px] bg-[#f9faf2] rounded-t-[2rem] shadow-2xl">
            <div className="flex justify-center pt-4 pb-2"><div className="w-10 h-1 rounded-full bg-[#c2c9bb]" /></div>

            {/* Notifications */}
            {sheet === "notifications" && (
              <div className="px-6 pb-10">
                <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-2xl text-[#154212] mb-6">Notifications</h2>
                <div className="space-y-4">
                  {([
                    { key: "weather", label: "Weather Alerts",    desc: "Rain and extreme weather warnings" },
                    { key: "orders",  label: "Order Updates",     desc: "Delivery and dispatch status" },
                    { key: "promos",  label: "Elan Offers",       desc: "Deals and seasonal promotions" },
                  ] as const).map((n) => (
                    <div key={n.key} className="bg-white rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-[#191c18]">{n.label}</p>
                        <p className="text-xs text-[#42493e]">{n.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications((prev) => ({ ...prev, [n.key]: !prev[n.key] }))}
                        className={`w-12 h-6 rounded-full transition-colors relative ${notifications[n.key] ? "bg-[#154212]" : "bg-[#c2c9bb]"}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${notifications[n.key] ? "right-1" : "left-1"}`} />
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={() => setSheet(null)} className="mt-6 w-full bg-[#154212] text-white font-bold py-4 rounded-[1.5rem]">Done</button>
              </div>
            )}

            {/* Language */}
            {sheet === "language" && (
              <div className="px-6 pb-10">
                <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-2xl text-[#154212] mb-6">Language</h2>
                <div className="space-y-3">
                  {([{ id: "en", label: "English", native: "English" }, { id: "te", label: "Telugu", native: "తెలుగు" }] as const).map((l) => (
                    <button key={l.id} onClick={() => setLanguage(l.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${language === l.id ? "border-[#154212] bg-[#154212]/5" : "border-[#e2e3dc] bg-white"}`}>
                      <div className="text-left">
                        <p className={`font-bold ${language === l.id ? "text-[#154212]" : "text-[#191c18]"}`}>{l.label}</p>
                        <p className="text-sm text-[#42493e]">{l.native}</p>
                      </div>
                      {language === l.id && <span className="material-symbols-outlined text-[#154212]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
                    </button>
                  ))}
                </div>
                <button onClick={() => setSheet(null)} className="mt-6 w-full bg-[#154212] text-white font-bold py-4 rounded-[1.5rem]">Save</button>
              </div>
            )}

            {/* Logout */}
            {sheet === "logout" && (
              <div className="px-6 pb-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#ffdad6] flex items-center justify-center mx-auto mt-4 mb-4">
                  <span className="material-symbols-outlined text-[#ba1a1a] text-3xl">logout</span>
                </div>
                <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-2xl text-[#191c18] mb-2">Log Out?</h2>
                <p className="text-[#42493e] text-sm mb-8">You'll need to sign in again to access your farm data and orders.</p>
                <button onClick={() => setSheet(null)} className="w-full bg-[#ba1a1a] text-white font-bold py-4 rounded-[1.5rem] mb-3 hover:bg-[#93000a] transition-colors">
                  Yes, Log Out
                </button>
                <button onClick={() => setSheet(null)} className="w-full text-[#154212] font-bold py-3">Cancel</button>
              </div>
            )}

            {/* Manage Fields */}
            {sheet === "fields" && (
              <div className="px-6 pb-10">
                <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-2xl text-[#154212] mb-6">Manage Fields</h2>
                <div className="space-y-3">
                  {crops.map((c) => (
                    <div key={c.name} className={`bg-white rounded-xl p-4 flex items-center gap-4 border-l-4 ${c.border}`}>
                      <span className={`material-symbols-outlined ${c.iconClass}`}>{c.icon}</span>
                      <div className="flex-1">
                        <p className="font-bold text-[#191c18]">{c.name}</p>
                        <p className="text-xs text-[#42493e]">{c.acres}</p>
                      </div>
                      <button className="text-[#42493e] hover:text-[#154212] transition-colors">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                    </div>
                  ))}
                  <button className="w-full border-2 border-dashed border-[#c2c9bb] rounded-xl p-4 flex items-center justify-center gap-2 text-[#42493e] hover:border-[#154212] hover:text-[#154212] transition-colors">
                    <span className="material-symbols-outlined">add</span>
                    <span className="font-medium">Add New Field</span>
                  </button>
                </div>
                <button onClick={() => setSheet(null)} className="mt-6 w-full bg-[#154212] text-white font-bold py-4 rounded-[1.5rem]">Done</button>
              </div>
            )}
          </div>
        </>
      )}
      <ChatFab />
      <BottomNav />
    </div>
  );
}
