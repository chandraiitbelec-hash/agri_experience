"use client";
import { useState } from "react";
import Drawer from "./Drawer";

export default function AppHeader({ title = "Rythu Mitra" }: { title?: string }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <header className="sticky top-0 w-full z-[50] flex items-center justify-between px-6 h-16 bg-[#f3f4ed]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDrawerOpen(true)}
            className="text-[#154212] hover:bg-[#e2e3dc] transition-colors active:scale-90 p-2 rounded-full"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="font-['Plus_Jakarta_Sans'] font-black text-xl text-[#154212] tracking-tight">{title}</h1>
        </div>
        <button className="text-[#154212] hover:bg-[#e2e3dc] transition-colors active:scale-90 p-2 rounded-full">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>
    </>
  );
}
