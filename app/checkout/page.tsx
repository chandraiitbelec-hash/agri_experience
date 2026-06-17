import Link from "next/link";

const cartItems = [
  {
    id: "elan-npk",
    name: "Elan NPK Complex",
    qty: 2,
    price: "₹1,450.00",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&q=80",
  },
  {
    id: "elan-seeds",
    name: "Hybrid Tomato Seeds",
    qty: 5,
    price: "₹499.00",
    img: "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=200&q=80",
  },
];

export default function CheckoutPage() {
  return (
    <div className="bg-[#f9faf2] font-['Work_Sans'] text-[#191c18] min-h-screen pb-32">
      <header className="sticky top-0 w-full z-[50] flex items-center justify-between px-6 h-16 bg-[#f9faf2]">
        <div className="flex items-center gap-4">
          <Link
            href="/marketplace"
            className="p-2 text-[#154212] hover:bg-[#e2e3dc] transition-colors active:scale-90"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight text-[#154212]">
            Your Basket
          </h1>
        </div>
        <button className="p-2 text-[#154212] hover:bg-[#e2e3dc] transition-colors active:scale-90">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="pt-24 px-6 max-w-5xl mx-auto space-y-10">
        <section className="flex flex-col gap-6">
          {/* Cart Items */}
          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-[10px] uppercase tracking-wider text-[#755750] font-semibold">
                Items in Cart
              </h2>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-3xl flex items-center gap-6 shadow-[0_12px_32px_rgba(25,28,24,0.02)] border border-[#c2c9bb]/10"
                >
                  <div className="w-24 h-24 rounded-2xl bg-[#edefe7] overflow-hidden flex-shrink-0">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-[#154212]">{item.name}</h3>
                        <p className="text-sm text-[#755750] font-medium">Qty: {item.qty}</p>
                      </div>
                      <p className="text-lg font-bold text-[#191c18]">{item.price}</p>
                    </div>
                    <div className="mt-4 flex gap-4">
                      <button className="text-xs font-semibold uppercase tracking-widest text-[#154212]/60 hover:text-[#154212] transition-colors">
                        Remove
                      </button>
                      <button className="text-xs font-semibold uppercase tracking-widest text-[#154212]/60 hover:text-[#154212] transition-colors">
                        Save for Later
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Address */}
            <div className="bg-[#f3f4ed] p-8 rounded-3xl space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-[10px] uppercase tracking-wider text-[#755750] font-semibold">
                  Delivery Address
                </h2>
                <button className="text-[#154212] text-sm font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">edit</span> Change
                </button>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#154212]/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[#154212]">location_on</span>
                </div>
                <div>
                  <p className="font-bold text-[#191c18]">Green Valley Farm, Plot #44</p>
                  <p className="text-sm text-[#42493e] leading-relaxed">
                    Near Ancient Banyan Tree, Rural Road 12,
                    <br />
                    Kurnool District, AP - 518001
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment & Summary */}
          <div className="space-y-6">
            {/* Payment Methods */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_12px_32px_rgba(25,28,24,0.04)] space-y-6">
              <h2 className="text-[10px] uppercase tracking-wider text-[#755750] font-semibold">
                Payment Method
              </h2>
              <div className="space-y-3">
                {[
                  { id: "upi", label: "UPI", icon: "account_balance_wallet", checked: true },
                  { id: "cod", label: "Cash on Delivery", icon: "payments", checked: false },
                  { id: "bank", label: "Bank Transfer", icon: "account_balance", checked: false },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-center p-4 rounded-2xl cursor-pointer transition-all group ${
                      m.checked
                        ? "border border-[#154212]/20 bg-[#f9faf2]"
                        : "bg-[#f3f4ed] hover:bg-[#e2e3dc]"
                    }`}
                  >
                    <input
                      defaultChecked={m.checked}
                      className="w-5 h-5 text-[#154212] border-[#c2c9bb] focus:ring-[#154212]"
                      name="payment"
                      type="radio"
                    />
                    <span className="ml-3 font-semibold text-[#191c18] flex-grow">{m.label}</span>
                    <span className="material-symbols-outlined text-[#154212]">{m.icon}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-[#154212] text-white p-8 rounded-3xl space-y-6">
              <h2 className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">
                Order Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="opacity-80">Subtotal</span>
                  <span>₹1,949.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-80">Shipping</span>
                  <span className="text-[#a1d494]">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-80">GST (5%)</span>
                  <span>₹97.45</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                  <span className="text-lg font-bold">Total</span>
                  <p className="font-['Plus_Jakarta_Sans'] text-2xl font-black tracking-tight">
                    ₹2,046.45
                  </p>
                </div>
              </div>
              <button className="w-full py-5 bg-white text-[#154212] rounded-2xl font-bold text-lg shadow-xl active:scale-95 transition-all hover:bg-[#f3f4ed] flex items-center justify-center gap-2">
                Pay Now
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <button className="fixed right-6 bottom-24 z-40 w-16 h-16 bg-[#755750] text-white rounded-3xl shadow-[0_12px_32px_rgba(25,28,24,0.3)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
        <span className="material-symbols-outlined text-3xl">chat_bubble</span>
      </button>
    </div>
  );
}
