"use client";
import { useState } from "react";
import Link from "next/link";
import Drawer from "@/components/Drawer";

export default function MarketplaceHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <header className="sticky top-0 w-full z-[50] flex items-center justify-between px-6 h-16 bg-[#f9faf2]">
        <div className="flex items-center gap-4">
          <button onClick={() => setDrawerOpen(true)} className="p-2 rounded-full hover:bg-[#e2e3dc] transition-colors active:scale-90">
            <span className="material-symbols-outlined text-[#154212]">menu</span>
          </button>
          <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight text-[#154212]">Rythu Mitra</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/checkout" className="relative p-2 rounded-full hover:bg-[#e2e3dc] transition-colors">
            <span className="material-symbols-outlined text-[#154212]">shopping_cart</span>
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#154212] text-white text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
          </Link>
          <button className="p-2 rounded-full hover:bg-[#e2e3dc] transition-colors">
            <span className="material-symbols-outlined text-[#154212]">notifications</span>
          </button>
        </div>
      </header>
    </>
  );
}
