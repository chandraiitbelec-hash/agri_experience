import BottomNav from "@/components/BottomNav";
import ChatFab from "@/components/ChatFab";
import Link from "next/link";

const categories = [
  { icon: "eco", label: "Fertilizers", bg: "bg-[#2d5a27]", href: "/marketplace/fertilizers" },
  { icon: "pest_control", label: "Pesticides", bg: "bg-[#755750]", href: "/marketplace/pesticides" },
  { icon: "handyman", label: "Tools", bg: "bg-[#003c60]", href: "/marketplace/tools" },
  {
    icon: "rocket_launch",
    label: "Growth Boosters",
    bg: "bg-[#e2e3dc]",
    textClass: "text-[#191c18]",
    iconClass: "text-[#154212]",
    href: "/marketplace/growth-boosters",
  },
];

const products = [
  {
    id: "elan-npk-complex",
    name: "Elan NPK Complex",
    tag: "Bestseller",
    tagBg: "bg-[#2d5a27]/10 text-[#2d5a27]",
    desc: "Balanced macro-nutrient fertilizer",
    price: "₹850",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=80",
  },
  {
    id: "elan-ecoshield",
    name: "Elan EcoShield",
    tag: "Safe Spray",
    tagBg: "bg-[#005484]/10 text-[#005484]",
    desc: "Natural botanical defence spray",
    price: "₹420",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&q=80",
  },
  {
    id: "elan-rootmax",
    name: "Elan RootMax",
    tag: "Organic",
    tagBg: "bg-[#ffdad2] text-[#2b1611]",
    desc: "Mycorrhiza-based root enhancer",
    price: "₹650",
    img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=300&q=80",
  },
  {
    id: "elan-copper-xl",
    name: "Elan Copper XL",
    tag: "Top Rated",
    tagBg: "bg-[#bcf0ae] text-[#002201]",
    desc: "High-potency bio-fungicide",
    price: "₹780",
    img: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=300&q=80",
  },
];

export default function Marketplace() {
  return (
    <div className="bg-[#f9faf2] font-['Work_Sans'] text-[#191c18]">
      <header className="sticky top-0 w-full z-[50] flex items-center justify-between px-6 h-16 bg-[#f9faf2]">
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-[#e2e3dc] transition-colors active:scale-90">
            <span className="material-symbols-outlined text-[#154212]">menu</span>
          </button>
          <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight text-[#154212]">
            Rythu Mitra
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/checkout" className="relative p-2 rounded-full hover:bg-[#e2e3dc] transition-colors">
            <span className="material-symbols-outlined text-[#154212]">shopping_cart</span>
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#154212] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              2
            </span>
          </Link>
          <button className="p-2 rounded-full hover:bg-[#e2e3dc] transition-colors">
            <span className="material-symbols-outlined text-[#154212]">notifications</span>
          </button>
        </div>
      </header>

      <main className="pt-20 pb-32 px-6 max-w-5xl mx-auto">
        {/* Search & Hero */}
        <section className="mb-10">
          <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-4xl mb-6 tracking-tight text-[#154212] leading-tight">
            Find your agricultural essentials.
          </h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-[#72796e]">search</span>
            </div>
            <input
              className="w-full h-14 pl-14 pr-6 rounded-xl bg-[#edefe7] border-none focus:ring-2 focus:ring-[#154212] placeholder:text-[#72796e] text-base outline-none transition-all"
              placeholder="Search fertilizers, tools, and more..."
              type="text"
            />
          </div>
        </section>

        {/* Categories */}
        <section className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-xl">Categories</h3>
            <span className="text-xs font-semibold text-[#154212] cursor-pointer hover:underline uppercase tracking-wider">
              View All
            </span>
          </div>
          <div className="grid grid-cols-2 grid-cols-2 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className={`aspect-square ${cat.bg} rounded-xl p-6 flex flex-col justify-between items-start ${cat.textClass ?? "text-white"} group cursor-pointer overflow-hidden relative`}
              >
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <span className={`material-symbols-outlined text-[6rem] ${cat.iconClass ?? ""}`} style={{ fontSize: "6rem" }}>
                    {cat.icon}
                  </span>
                </div>
                <span className={`material-symbols-outlined text-3xl ${cat.iconClass ?? ""}`}>
                  {cat.icon}
                </span>
                <p className="font-bold text-lg leading-tight">{cat.label}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Recommended Products */}
        <section className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-xl">Elan Agrochem Products</h3>
            <span className="text-xs font-semibold text-[#154212] cursor-pointer hover:underline uppercase tracking-wider">
              Explore
            </span>
          </div>
          <div className="flex flex-col gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl p-4 flex gap-6 items-center shadow-[0_12px_32px_rgba(25,28,24,0.04)] hover:shadow-[0_12px_32px_rgba(25,28,24,0.08)] transition-all group"
              >
                <div className="w-32 h-32 bg-[#f3f4ed] rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1">
                  <div className={`${p.tagBg} text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-2 tracking-widest uppercase`}>
                    {p.tag}
                  </div>
                  <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#191c18]">
                    {p.name}
                  </h4>
                  <p className="text-[#755750] text-sm mb-3">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl text-[#154212]">
                      {p.price}
                    </span>
                    <button className="bg-[#154212] text-white p-2 rounded-full hover:bg-[#2d5a27] transition-colors shadow-lg active:scale-95">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seasonal Banner */}
        <section className="relative bg-[#005484] text-white rounded-[2rem] p-8 overflow-hidden mb-12">
          <div className="relative z-10 md:max-w-md">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
              Monsoon Prep
            </span>
            <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-3xl mb-4 leading-tight">
              Keep your crops dry &amp; healthy.
            </h3>
            <p className="text-white/80 mb-6">
              Explore our curated range of water-resistant mulching and moisture sensors.
            </p>
            <button className="bg-white text-[#003c60] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#cee5ff] transition-all">
              View Monsoon Deals
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-1/2 h-full hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1603912699214-92627f304eb6?w=400&q=70"
              alt="Rain on farm"
              className="w-full h-full object-cover opacity-50 mix-blend-overlay"
            />
          </div>
        </section>
      </main>

      <ChatFab />
      <BottomNav />
    </div>
  );
}
