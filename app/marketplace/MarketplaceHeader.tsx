"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function MarketplaceHeader() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 w-full z-[50] flex items-center justify-between px-6 h-14 bg-[#f9faf2]">
      <h1 className="font-['Plus_Jakarta_Sans'] font-black text-xl text-[#154212] tracking-tight">Rythu Mitra</h1>
      <div className="flex items-center gap-1">
        <Link href="/checkout" className="relative p-2 rounded-full hover:bg-[#e2e3dc] transition-colors">
          <span className="material-symbols-outlined text-[#154212]">shopping_cart</span>
          {count > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#154212] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {count > 9 ? "9+" : count}
            </span>
          )}
        </Link>
        <button className="p-2 rounded-full hover:bg-[#e2e3dc] transition-colors">
          <span className="material-symbols-outlined text-[#154212]">notifications</span>
        </button>
      </div>
    </header>
  );
}
