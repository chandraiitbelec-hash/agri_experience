"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { icon: "home",             label: "Home",        href: "/" },
  { icon: "storefront",       label: "Marketplace", href: "/marketplace" },
  { icon: "medical_services", label: "Diagnose",    href: "/diagnose" },
  { icon: "psychology",       label: "AI Chat",     href: "/chat" },
  { icon: "shopping_cart",    label: "Checkout",    href: "/checkout" },
  { icon: "person",           label: "Profile",     href: "/profile" },
];

export default function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] bg-black/50 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 left-0 z-[110] h-full w-72 bg-[#f9faf2] shadow-2xl transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="bg-[#154212] px-6 pt-12 pb-8">
          <div className="flex items-center justify-between mb-6">
            <span className="font-['Plus_Jakarta_Sans'] font-black text-xl text-white">Rythu Mitra</span>
            <button onClick={onClose} className="text-white/70 hover:text-white p-1">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-bold text-white">Ramesh Kumar</p>
              <p className="text-white/60 text-xs">Guntur, Andhra Pradesh</p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${
                  active ? "bg-[#154212] text-white" : "text-[#191c18] hover:bg-[#e2e3dc]"
                }`}
              >
                <span className={`material-symbols-outlined ${active ? "text-white" : "text-[#154212]"}`}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-6 border-t border-[#e2e3dc]">
          <p className="text-xs text-[#72796e]">Powered by Elan Agrochem</p>
          <p className="text-xs text-[#c2c9bb] mt-1">v1.0 · rythumitra.app</p>
        </div>
      </div>
    </>
  );
}
