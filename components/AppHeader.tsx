"use client";

export default function AppHeader({ title = "Rythu Mitra" }: { title?: string }) {
  return (
    <header className="sticky top-0 w-full z-[50] flex items-center justify-between px-6 h-14 bg-[#f3f4ed]">
      <h1 className="font-['Plus_Jakarta_Sans'] font-black text-xl text-[#154212] tracking-tight">{title}</h1>
      <button className="text-[#154212] hover:bg-[#e2e3dc] transition-colors active:scale-90 p-2 rounded-full">
        <span className="material-symbols-outlined">notifications</span>
      </button>
    </header>
  );
}
