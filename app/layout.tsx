import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Work_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Rythu Mitra — Elan Agrochem",
  description: "Your digital agronomist — shop Elan Agrochem products, diagnose crops, and get AI-powered farming advice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${workSans.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen" style={{ backgroundColor: "#0f2410" }}>
        {/* Outer shell: dark soil green flanking the mobile frame */}
        <div className="flex min-h-screen justify-center">
          {/* Decorative side panels */}
          <div className="hidden md:flex flex-1 max-w-xs flex-col items-center justify-center gap-6 px-8">
            <div className="text-[#2d5a27] text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#2d5a27]/20 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[#a1d494] text-xl">eco</span>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] font-bold text-[#a1d494] text-sm tracking-wide">
                Rythu Mitra
              </p>
              <p className="font-['Work_Sans'] text-[#42493e] text-xs leading-relaxed">
                Smart farming for every Indian farmer
              </p>
            </div>
            <div className="w-px h-32 bg-[#2d5a27]/30" />
            <div className="text-center space-y-3">
              {["Diagnose Crops", "Shop Elan Products", "AI Agronomist"].map((t) => (
                <p key={t} className="font-['Work_Sans'] text-[#42493e] text-xs">
                  {t}
                </p>
              ))}
            </div>
          </div>

          {/* Mobile frame — fixed height, independent scroll, contains all positioned children */}
          <div className="relative w-full md:max-w-[390px] md:h-[calc(100vh-2rem)] md:my-4 md:rounded-[2rem] md:shadow-[0_0_80px_rgba(0,0,0,0.5)] md:overflow-y-auto md:overflow-x-hidden">
            <CartProvider>{children}</CartProvider>
          </div>

          {/* Right decorative panel */}
          <div className="hidden md:flex flex-1 max-w-xs flex-col items-center justify-center gap-6 px-8">
            <div className="space-y-4 w-full max-w-[160px]">
              <div className="bg-[#2d5a27]/20 rounded-xl p-4 text-center">
                <span className="material-symbols-outlined text-[#a1d494] block mb-1">thermostat</span>
                <p className="font-['Plus_Jakarta_Sans'] font-bold text-[#a1d494] text-lg">32°C</p>
                <p className="font-['Work_Sans'] text-[#42493e] text-[10px] uppercase tracking-wider">Kadapa, AP</p>
              </div>
              <div className="bg-[#2d5a27]/20 rounded-xl p-4 text-center">
                <span className="material-symbols-outlined text-[#a1d494] block mb-1">agriculture</span>
                <p className="font-['Plus_Jakarta_Sans'] font-bold text-[#a1d494] text-lg">19.5</p>
                <p className="font-['Work_Sans'] text-[#42493e] text-[10px] uppercase tracking-wider">Acres Tracked</p>
              </div>
              <div className="bg-[#2d5a27]/20 rounded-xl p-4 text-center">
                <span className="material-symbols-outlined text-[#a1d494] block mb-1">verified</span>
                <p className="font-['Plus_Jakarta_Sans'] font-bold text-[#a1d494] text-sm">Elan Agrochem</p>
                <p className="font-['Work_Sans'] text-[#42493e] text-[10px] uppercase tracking-wider">Trusted Partner</p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
