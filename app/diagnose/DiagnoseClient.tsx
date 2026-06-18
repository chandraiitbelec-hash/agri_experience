"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const recentHistory = [
  { id: "tomato-blight", img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&q=80", title: "Tomato Early Blight", badge: "High Risk", badgeBg: "bg-[#ffdad6] text-[#93000a]", location: "Greenhouse B", time: "2 hours ago" },
  { id: "maize-healthy", img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=200&q=80", title: "Maize Healthy", badge: "Optimal", badgeBg: "bg-[#bcf0ae] text-[#002201]", location: "West Field", time: "Yesterday" },
  { id: "potato-leaf-roll", img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&q=80", title: "Potato Leaf Roll", badge: "Moderate", badgeBg: "bg-[#ffd7ce] text-[#7a5b54]", location: "North Hill", time: "3 days ago" },
];

const tips = [
  { icon: "light_mode", title: "Good lighting", desc: "Avoid harsh shadows or dark environments." },
  { icon: "zoom_in", title: "Close-up", desc: "Ensure the affected part fills the screen." },
  { icon: "center_focus_strong", title: "Focused", desc: "Keep the camera still until it auto-focuses." },
];

export default function DiagnoseClient() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    setStatus("loading");
    setErrorMsg("");

    // Convert to base64 for API
    const b64Reader = new FileReader();
    b64Reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      const base64 = dataUrl.split(",")[1];
      const mediaType = file.type;

      try {
        const res = await fetch("/api/diagnose", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: base64, mediaType }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error ?? "Diagnosis failed");
        }

        const diagnosis = await res.json();
        // Store in sessionStorage and navigate to result
        sessionStorage.setItem("diagnosis_result", JSON.stringify({ ...diagnosis, imageDataUrl: dataUrl }));
        router.push("/diagnose/result/live");
      } catch (err: unknown) {
        setStatus("error");
        setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      }
    };
    b64Reader.readAsDataURL(file);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="bg-[#f9faf2] font-['Work_Sans'] text-[#191c18]">
      <nav className="sticky top-0 w-full z-[50] flex items-center justify-between px-6 h-14 bg-[#f9faf2]">
        <span className="font-['Plus_Jakarta_Sans'] font-black text-xl text-[#154212]">Rythu Mitra</span>
        <button className="p-2 text-[#154212] hover:bg-[#e2e3dc] transition-colors rounded-full active:scale-90">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </nav>

      <main className="pb-32 px-6 max-w-4xl mx-auto">
        <header className="mb-8 mt-4">
          <span className="text-[#154212] text-[0.75rem] uppercase tracking-widest font-bold mb-2 block">
            Crop Intelligence
          </span>
          <h1 className="font-['Plus_Jakarta_Sans'] text-[#154212] text-[2.2rem] leading-none font-extrabold tracking-tight">
            Snap a photo of the problem
          </h1>
        </header>

        {/* Camera Viewfinder */}
        <section className="bg-white rounded-[1.5rem] shadow-[0_12px_32px_rgba(25,28,24,0.06)] overflow-hidden mb-6">
          <div
            className="aspect-[4/3] bg-[#e2e3dc] flex flex-col items-center justify-center relative overflow-hidden mx-4 mt-4 rounded-xl border-4 border-dashed border-[#c2c9bb]/40 cursor-pointer"
            onClick={() => !status || status === "error" ? cameraInputRef.current?.click() : null}
          >
            {preview ? (
              <>
                <img src={preview} alt="Uploaded crop" className="absolute inset-0 w-full h-full object-cover" />
                {status === "loading" && (
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    <p className="text-white font-bold text-sm">Analysing with AI...</p>
                  </div>
                )}
              </>
            ) : (
              <>
                <img
                  className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
                  src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=60"
                  alt=""
                />
                <div className="z-10 text-center px-8">
                  <button
                    className="w-20 h-20 bg-[#2d5a27] rounded-full flex items-center justify-center text-white mb-4 mx-auto active:scale-95 transition-transform hover:bg-[#154212]"
                    onClick={(e) => { e.stopPropagation(); cameraInputRef.current?.click(); }}
                  >
                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      photo_camera
                    </span>
                  </button>
                  <p className="font-['Plus_Jakarta_Sans'] text-xl text-[#154212] font-bold mb-1">Open Camera</p>
                  <p className="text-[#42493e] text-sm">Position the affected leaf in frame</p>
                </div>
              </>
            )}
            {/* Viewfinder corners */}
            {!preview && <>
              <div className="absolute top-6 left-6 w-8 h-8 border-t-4 border-l-4 border-[#154212] rounded-tl-lg" />
              <div className="absolute top-6 right-6 w-8 h-8 border-t-4 border-r-4 border-[#154212] rounded-tr-lg" />
              <div className="absolute bottom-6 left-6 w-8 h-8 border-b-4 border-l-4 border-[#154212] rounded-bl-lg" />
              <div className="absolute bottom-6 right-6 w-8 h-8 border-b-4 border-r-4 border-[#154212] rounded-br-lg" />
            </>}
          </div>

          {status === "error" && (
            <div className="mx-4 mb-4 p-3 bg-[#ffdad6] text-[#93000a] rounded-xl text-sm font-medium">
              <span className="material-symbols-outlined text-sm mr-1 align-middle">error</span>
              {errorMsg}
            </div>
          )}

          <div className="p-4 bg-[#f3f4ed] flex justify-between items-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 text-[#755750] font-medium hover:text-[#154212] transition-colors"
            >
              <span className="material-symbols-outlined">image</span>
              Upload from Gallery
            </button>
            <span className="text-[#42493e] text-sm uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#154212] animate-pulse" />
              AI Ready
            </span>
          </div>

          {/* Hidden inputs */}
          <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onFileChange} />
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
        </section>

        {/* Tips */}
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_12px_32px_rgba(25,28,24,0.04)] mb-6">
          <h2 className="font-['Plus_Jakarta_Sans'] text-lg text-[#154212] mb-5 font-bold">Tips for best results</h2>
          <ul className="space-y-4">
            {tips.map((t) => (
              <li key={t.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#005484] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#8dc8ff]">{t.icon}</span>
                </div>
                <div>
                  <p className="font-bold text-[#191c18]">{t.title}</p>
                  <p className="text-sm text-[#42493e]">{t.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent History */}
        <section>
          <div className="flex justify-between items-end mb-5">
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl text-[#154212] font-bold">Recent History</h2>
            <button className="text-[#755750] font-medium flex items-center gap-1 hover:underline text-sm">
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <div className="space-y-4">
            {recentHistory.map((item) => (
              <Link key={item.id} href={`/diagnose/result/${item.id}`}
                className="bg-white p-5 rounded-[1.5rem] shadow-[0_4px_12px_rgba(25,28,24,0.04)] flex items-center gap-4 hover:bg-[#edefe7] transition-colors">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-[#191c18]">{item.title}</h3>
                    <span className={`px-3 py-1 ${item.badgeBg} text-[10px] font-bold uppercase rounded-full tracking-wider`}>{item.badge}</span>
                  </div>
                  <p className="text-sm text-[#42493e] mt-1">{item.location} • {item.time}</p>
                </div>
                <span className="material-symbols-outlined text-[#72796e]">chevron_right</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
