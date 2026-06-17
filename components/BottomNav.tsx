"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/marketplace", icon: "storefront", label: "Marketplace" },
  { href: "/diagnose", icon: "medical_services", label: "Diagnose" },
  { href: "/profile", icon: "person", label: "Profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-[#f9faf2]/90 backdrop-blur-md rounded-t-[1.5rem] shadow-[0_-4px_20px_rgba(25,28,24,0.06)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center px-5 py-2 transition-all active:opacity-80 ${
              isActive
                ? "bg-[#2D5A27] text-white rounded-[1.5rem]"
                : "text-[#755750] hover:text-[#154212]"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            <span className="font-['Work_Sans'] font-medium text-[10px] uppercase tracking-wider mt-1">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
