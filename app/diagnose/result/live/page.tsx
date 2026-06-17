"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { useCart } from "@/context/CartContext";

interface DiagnosisResult {
  disease: string;
  confidence: number;
  alertLevel: "High" | "Moderate" | "Low" | "Optimal";
  humidityRisk: number;
  category: string;
  crop: string;
  description: string;
  steps: { title: string; desc: string; icon: string }[];
  products: { name: string; price: string; tag: string }[];
  imageDataUrl?: string;
}

const ALERT_COLORS: Record<string, { bg: string; text: string; ring: string }> = {
  High:     { bg: "bg-[#ffdad6]", text: "text-[#93000a]", ring: "bg-[#93000a]" },
  Moderate: { bg: "bg-[#ffd7ce]", text: "text-[#7a5b54]", ring: "bg-[#755750]" },
  Low:      { bg: "bg-[#bcf0ae]", text: "text-[#002201]", ring: "bg-[#154212]" },
  Optimal:  { bg: "bg-[#bcf0ae]", text: "text-[#002201]", ring: "bg-[#154212]" },
};

export default function LiveDiagnosisPage() {
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [missing, setMissing] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);
  const { add } = useCart();

  function handleAddToCart(p: { name: string; price: string; tag: string }) {
    const id = p.name.toLowerCase().replace(/\s+/g, "-");
    add({ id, name: p.name, price: p.price, img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&q=80" });
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1200);
  }

  function handleShare() {
    if (navigator.share && result) {
      navigator.share({ title: `Diagnosis: ${result.disease}`, text: result.description, url: window.location.href });
    }
  }

  useEffect(() => {
    const raw = sessionStorage.getItem("diagnosis_result");
    if (!raw) { setMissing(true); return; }
    try {
      setResult(JSON.parse(raw));
    } catch {
      setMissing(true);
    }
  }, []);

  if (missing) {
    return (
      <div className="bg-[#f9faf2] min-h-screen flex flex-col items-center justify-center gap-6 px-8 text-center">
        <span className="material-symbols-outlined text-5xl text-[#154212]">image_search</span>
        <p className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#154212]">No diagnosis found</p>
        <p className="text-[#42493e] text-sm">Go back and upload a crop image to get an AI diagnosis.</p>
        <Link href="/diagnose" className="bg-[#154212] text-white px-6 py-3 rounded-full font-bold hover:bg-[#2d5a27]">
          Diagnose a Crop
        </Link>
        <BottomNav />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-[#f9faf2] min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#154212] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const colors = ALERT_COLORS[result.alertLevel] ?? ALERT_COLORS.Moderate;

  return (
    <div className="bg-[#f9faf2] font-['Work_Sans'] text-[#191c18]">
      {/* Header */}
      <nav className="sticky top-0 w-full z-[50] flex items-center justify-between px-6 h-16 bg-[#f9faf2]">
        <Link href="/diagnose" className="p-2 text-[#154212] hover:bg-[#e2e3dc] rounded-full transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <span className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#154212]">Diagnosis Result</span>
        <button onClick={handleShare} className="p-2 text-[#154212] hover:bg-[#e2e3dc] rounded-full transition-colors">
          <span className="material-symbols-outlined">share</span>
        </button>
      </nav>

      <main className="pb-32 px-6 space-y-6">
        {/* Image + Confidence */}
        <div className="relative rounded-[1.5rem] overflow-hidden">
          {result.imageDataUrl ? (
            <img src={result.imageDataUrl} alt="Analysed crop" className="w-full aspect-[4/3] object-cover" />
          ) : (
            <div className="w-full aspect-[4/3] bg-[#e2e3dc] flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl text-[#72796e]">image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 ${colors.bg}`}>
              <span className={`w-2 h-2 rounded-full ${colors.ring}`} />
              <span className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}>
                {result.alertLevel} Alert
              </span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-3xl leading-tight">
              {result.disease}
            </h1>
            <p className="text-white/80 text-sm mt-1">{result.crop}</p>
          </div>
        </div>

        {/* Confidence meters */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-[1.5rem] shadow-[0_4px_12px_rgba(25,28,24,0.06)]">
            <p className="font-['Work_Sans'] text-xs uppercase tracking-wider text-[#42493e] mb-3">AI Confidence</p>
            <p className="font-['Plus_Jakarta_Sans'] font-extrabold text-4xl text-[#154212]">{result.confidence}%</p>
            <div className="mt-2 h-2 bg-[#e2e3dc] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#154212] rounded-full transition-all duration-700"
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>
          <div className="bg-white p-5 rounded-[1.5rem] shadow-[0_4px_12px_rgba(25,28,24,0.06)]">
            <p className="font-['Work_Sans'] text-xs uppercase tracking-wider text-[#42493e] mb-3">Humidity Risk</p>
            <p className="font-['Plus_Jakarta_Sans'] font-extrabold text-4xl text-[#003c60]">{result.humidityRisk}%</p>
            <div className="mt-2 h-2 bg-[#e2e3dc] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#003c60] rounded-full transition-all duration-700"
                style={{ width: `${result.humidityRisk}%` }}
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_4px_12px_rgba(25,28,24,0.06)]">
          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#154212] mb-3">What We Found</h2>
          <p className="text-[#42493e] leading-relaxed">{result.description}</p>
        </div>

        {/* Treatment Steps */}
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_4px_12px_rgba(25,28,24,0.06)]">
          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#154212] mb-5">Treatment Plan</h2>
          <div className="space-y-5">
            {result.steps.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#154212] flex items-center justify-center shrink-0 text-white">
                  <span className="material-symbols-outlined text-sm">{step.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-['Work_Sans'] text-[10px] font-bold uppercase text-[#42493e] tracking-widest">
                      Step {i + 1}
                    </span>
                  </div>
                  <p className="font-bold text-[#191c18]">{step.title}</p>
                  <p className="text-sm text-[#42493e] mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Elan Product Recommendations */}
        <div>
          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#154212] mb-4">Recommended Products</h2>
          <div className="space-y-3">
            {result.products.map((p) => (
              <div
                key={p.name}
                className="bg-white p-5 rounded-[1.5rem] shadow-[0_4px_12px_rgba(25,28,24,0.06)] flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#154212]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#154212]">science</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#191c18]">{p.name}</p>
                    <span className="text-[10px] font-bold uppercase text-[#003c60] bg-[#cee5ff] px-2 py-0.5 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#154212]">{p.price}</p>
                  <button
                    onClick={() => handleAddToCart(p)}
                    className={`mt-1 text-xs px-3 py-1.5 rounded-full font-bold active:scale-95 transition-all ${
                      addedId === p.name.toLowerCase().replace(/\s+/g, "-")
                        ? "bg-[#bcf0ae] text-[#002201]"
                        : "bg-[#154212] text-white hover:bg-[#2d5a27]"
                    }`}
                  >
                    {addedId === p.name.toLowerCase().replace(/\s+/g, "-") ? "Added!" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Re-scan button */}
        <Link
          href="/diagnose"
          className="flex items-center justify-center gap-2 w-full bg-[#154212] text-white font-bold py-4 rounded-[1.5rem] hover:bg-[#2d5a27] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">photo_camera</span>
          Scan Another Crop
        </Link>
      </main>

      <BottomNav />
    </div>
  );
}
