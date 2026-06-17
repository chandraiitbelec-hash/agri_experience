"use client";
import Link from "next/link";

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
  rightIcon?: string;
}

export default function TopBar({
  title = "Rythu Mitra",
  showBack = false,
  backHref = "/",
  rightIcon = "notifications",
}: TopBarProps) {
  return (
    <header className="fixed top-0 w-full z-50 flex items-center justify-between px-6 h-16 bg-[#f9faf2]">
      <div className="flex items-center gap-4">
        {showBack ? (
          <Link
            href={backHref}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e2e3dc] transition-colors"
          >
            <span className="material-symbols-outlined text-[#154212]">arrow_back</span>
          </Link>
        ) : (
          <button className="p-2 rounded-full hover:bg-[#e2e3dc] transition-colors active:scale-90">
            <span className="material-symbols-outlined text-[#154212]">menu</span>
          </button>
        )}
        <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight text-[#154212]">
          {title}
        </h1>
      </div>
      <button className="p-2 rounded-full hover:bg-[#e2e3dc] transition-colors active:scale-90">
        <span className="material-symbols-outlined text-[#154212]">{rightIcon}</span>
      </button>
    </header>
  );
}
