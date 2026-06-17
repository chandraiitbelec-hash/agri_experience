import BottomNav from "@/components/BottomNav";
import Link from "next/link";

const steps = [
  {
    n: "1",
    icon: "content_cut",
    iconBg: "bg-[#2d5a27]",
    title: "Prune Infected Areas",
    desc: "Remove and burn all leaves showing symptoms to prevent spore dispersal. Clean tools between cuts.",
  },
  {
    n: "2",
    icon: "format_color_reset",
    iconBg: "bg-[#755750]",
    title: "Avoid Overhead Water",
    desc: "Direct water to the base of the plant. Rust spores require free water on leaf surfaces to germinate.",
  },
  {
    n: "3",
    icon: "vaccines",
    iconBg: "bg-[#003c60]",
    title: "Apply Fungicide",
    desc: "Spray affected areas thoroughly during the cool hours of the morning or evening for best absorption.",
  },
];

const solutions = [
  {
    id: "elan-copper-xl",
    name: "Elan Copper XL",
    desc: "High-potency bio-fungicide",
    price: "₹850.00",
    oldPrice: "₹1,100",
    badge: "TOP RATED",
    badgeBg: "bg-[#bcf0ae] text-[#002201]",
    img: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=300&q=80",
  },
  {
    id: "elan-neem-oil",
    name: "Elan Pure Neem Oil",
    desc: "100% cold-pressed organic",
    price: "₹420.00",
    badge: "ORGANIC",
    badgeBg: "bg-[#ffdad2] text-[#2b1611]",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&q=80",
  },
];

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params; // Next.js 15+: params must be awaited

  return (
    <div className="bg-[#f9faf2] font-['Work_Sans'] text-[#191c18]">
      <header className="sticky top-0 w-full z-[50] flex items-center justify-between px-6 h-16 bg-[#f9faf2]">
        <div className="flex items-center gap-4">
          <Link
            href="/diagnose"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e2e3dc] transition-colors"
          >
            <span className="material-symbols-outlined text-[#154212]">arrow_back</span>
          </Link>
          <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight text-[#154212]">
            Leaf Rust Diagnosis
          </h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e2e3dc] transition-colors">
          <span className="material-symbols-outlined text-[#154212]">share</span>
        </button>
      </header>

      <main className="pt-20 pb-32 px-6 max-w-screen-xl mx-auto space-y-10">
        {/* Hero diagnosis section */}
        <section className="flex flex-col gap-8 items-start">
          <div className="space-y-6">
            <div className="relative rounded-xl overflow-hidden aspect-[16/10] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80"
                alt="Coffee leaf with orange rust spots"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-['Work_Sans'] tracking-widest uppercase mb-2">
                  Pathogen Detected
                </span>
                <h2 className="font-['Plus_Jakarta_Sans'] text-4xl text-white font-extrabold">
                  Leaf Rust
                </h2>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 bg-white p-8 rounded-xl flex flex-col justify-between min-h-[160px]">
              <span className="font-['Work_Sans'] text-xs uppercase tracking-widest text-[#755750] font-semibold">
                Confidence Level
              </span>
              <div className="flex items-end justify-between">
                <span className="font-['Plus_Jakarta_Sans'] text-6xl font-bold text-[#154212] tracking-tighter">
                  94%
                </span>
                <span
                  className="material-symbols-outlined text-[#154212] text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
            </div>
            <div className="bg-[#005484] p-6 rounded-xl text-[#8dc8ff] flex flex-col justify-between">
              <span className="font-['Work_Sans'] text-[10px] uppercase tracking-widest opacity-80">
                Humidity Risk
              </span>
              <div className="flex items-center gap-2">
                <span className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-white">88%</span>
                <span className="material-symbols-outlined">water_drop</span>
              </div>
            </div>
            <div className="bg-[#e2e3dc] p-6 rounded-xl flex flex-col justify-between">
              <span className="font-['Work_Sans'] text-[10px] uppercase tracking-widest text-[#42493e]">
                Alert Level
              </span>
              <div className="flex items-center gap-2">
                <span className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-[#ba1a1a]">
                  High
                </span>
                <span className="material-symbols-outlined text-[#ba1a1a]">warning</span>
              </div>
            </div>
          </div>
        </section>

        {/* Treatment Plan */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-[#c2c9bb]/15 pb-4">
            <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#154212] tracking-tight">
              Treatment Plan
            </h3>
            <span className="font-['Work_Sans'] text-xs text-[#755750] font-medium">
              Updated 2m ago
            </span>
          </div>
          <div className="flex flex-col gap-6">
            {steps.map((s) => (
              <div
                key={s.n}
                className="bg-[#f3f4ed] p-8 rounded-xl relative overflow-hidden"
              >
                <span className="absolute -right-4 -top-4 text-8xl font-black text-[#154212]/5 select-none font-['Plus_Jakarta_Sans']">
                  {s.n}
                </span>
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-full ${s.iconBg} flex items-center justify-center mb-6 text-white`}>
                    <span className="material-symbols-outlined">{s.icon}</span>
                  </div>
                  <h4 className="font-['Plus_Jakarta_Sans'] text-xl font-bold mb-3 text-[#191c18]">
                    {s.title}
                  </h4>
                  <p className="text-[#42493e] text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verified Solutions */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#154212] tracking-tight">
              Verified Solutions
            </h3>
            <Link
              href="/marketplace"
              className="text-[#154212] font-['Work_Sans'] text-xs font-bold hover:underline"
            >
              View All Shop
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl flex overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-1/3">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#191c18] leading-tight">
                        {p.name}
                      </h4>
                      <span className={`${p.badgeBg} px-2 py-0.5 rounded text-[10px] font-bold`}>
                        {p.badge}
                      </span>
                    </div>
                    <p className="text-[#755750] text-sm mt-1">{p.desc}</p>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-[#154212] font-['Plus_Jakarta_Sans'] text-2xl font-extrabold">
                        {p.price}
                      </span>
                      {p.oldPrice && (
                        <span className="text-[#42493e] text-xs line-through opacity-50">
                          {p.oldPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="mt-4 w-full bg-gradient-to-br from-[#154212] to-[#2D5A27] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
                    <span className="material-symbols-outlined text-sm">shopping_cart</span>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <button className="fixed right-6 bottom-32 w-16 h-16 bg-[#154212] text-white rounded-full shadow-[0_12px_32px_rgba(25,28,24,0.15)] flex items-center justify-center z-50 hover:scale-105 active:scale-90 transition-transform">
        <span
          className="material-symbols-outlined text-3xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          chat_bubble
        </span>
      </button>

      <BottomNav />
    </div>
  );
}
