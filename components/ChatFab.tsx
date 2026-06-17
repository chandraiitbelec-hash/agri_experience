import Link from "next/link";

export default function ChatFab() {
  return (
    <Link
      href="/chat"
      className="sticky bottom-28 ml-auto mr-6 z-50 w-16 h-16 bg-gradient-to-br from-[#154212] to-[#2D5A27] text-white rounded-full shadow-[0_12px_32px_rgba(25,28,24,0.15)] flex items-center justify-center active:scale-90 transition-transform hover:scale-105"
    >
      <span
        className="material-symbols-outlined"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        chat
      </span>
    </Link>
  );
}
