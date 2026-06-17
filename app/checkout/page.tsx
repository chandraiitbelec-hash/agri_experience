"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { useCart } from "@/context/CartContext";

const DELIVERY_FEE = 49;
const GST_RATE = 0.18;

export default function CheckoutPage() {
  const { items, remove, increment, decrement, total } = useCart();
  const [payment, setPayment] = useState<"upi" | "cod" | "bank">("upi");
  const [paid, setPaid] = useState(false);
  const [changingAddress, setChangingAddress] = useState(false);
  const [address, setAddress] = useState("Pedakurapadu, Guntur, AP — 522 601");

  const gst = total * GST_RATE;
  const grandTotal = total + gst + (items.length > 0 ? DELIVERY_FEE : 0);

  if (paid) {
    return (
      <div className="bg-[#f9faf2] min-h-screen flex flex-col items-center justify-center px-8 text-center gap-6">
        <div className="w-24 h-24 rounded-full bg-[#bcf0ae] flex items-center justify-center mb-2">
          <span className="material-symbols-outlined text-5xl text-[#154212]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        </div>
        <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-3xl text-[#154212]">Order Placed!</h1>
        <p className="text-[#42493e]">Your order has been confirmed and will be delivered in 3–5 business days.</p>
        <div className="bg-white rounded-[1.5rem] p-5 w-full shadow-sm text-left">
          <p className="text-xs uppercase tracking-widest text-[#42493e] mb-1">Order Total</p>
          <p className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl text-[#154212]">₹{grandTotal.toFixed(2)}</p>
          <p className="text-sm text-[#42493e] mt-1">via {payment === "upi" ? "UPI" : payment === "cod" ? "Cash on Delivery" : "Bank Transfer"}</p>
        </div>
        <Link href="/marketplace" className="bg-[#154212] text-white font-bold px-8 py-4 rounded-full hover:bg-[#2d5a27] transition-colors">
          Continue Shopping
        </Link>
        <Link href="/profile" className="text-[#154212] font-medium hover:underline">View Orders</Link>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="bg-[#f9faf2] font-['Work_Sans'] text-[#191c18]">
      <header className="sticky top-0 w-full z-[50] flex items-center justify-between px-6 h-16 bg-[#f9faf2]">
        <div className="flex items-center gap-4">
          <Link href="/marketplace" className="p-2 text-[#154212] hover:bg-[#e2e3dc] transition-colors active:scale-90 rounded-full">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight text-[#154212]">Your Basket</h1>
        </div>
        {items.length > 0 && (
          <span className="bg-[#154212] text-white text-xs font-bold px-3 py-1 rounded-full">
            {items.reduce((s, i) => s + i.qty, 0)} items
          </span>
        )}
      </header>

      <main className="pt-6 pb-32 px-6 space-y-6">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <span className="material-symbols-outlined text-5xl text-[#c2c9bb]">shopping_cart</span>
            <p className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#154212]">Your cart is empty</p>
            <p className="text-[#42493e] text-sm">Add products from the marketplace to get started.</p>
            <Link href="/marketplace" className="bg-[#154212] text-white font-bold px-6 py-3 rounded-full hover:bg-[#2d5a27] transition-colors mt-2">
              Go to Marketplace
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <section className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-[1.5rem] p-4 flex gap-4 shadow-[0_4px_12px_rgba(25,28,24,0.04)]">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#f3f4ed]">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-['Plus_Jakarta_Sans'] font-bold text-[#191c18] leading-tight">{item.name}</p>
                    <p className="font-['Plus_Jakarta_Sans'] font-bold text-[#154212] mt-1">{item.price}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 bg-[#f3f4ed] rounded-full px-1 py-1">
                        <button onClick={() => decrement(item.id)} className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#154212] font-bold hover:bg-[#e2e3dc] transition-colors active:scale-90">
                          <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="font-bold w-5 text-center text-sm">{item.qty}</span>
                        <button onClick={() => increment(item.id)} className="w-7 h-7 rounded-full bg-[#154212] flex items-center justify-center text-white hover:bg-[#2d5a27] transition-colors active:scale-90">
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>
                      <button onClick={() => remove(item.id)} className="text-[#ba1a1a] text-sm font-medium hover:underline flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">delete</span>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Delivery */}
            <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_4px_12px_rgba(25,28,24,0.04)]">
              {changingAddress ? (
                <div className="space-y-3">
                  <p className="font-bold text-sm text-[#191c18]">Enter Delivery Address</p>
                  <textarea
                    className="w-full bg-[#f3f4ed] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#154212] resize-none"
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <button
                    onClick={() => setChangingAddress(false)}
                    className="w-full bg-[#154212] text-white font-bold py-3 rounded-xl hover:bg-[#2d5a27] transition-colors"
                  >
                    Save Address
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#154212]">location_on</span>
                    <div>
                      <p className="font-bold text-sm">Delivery Address</p>
                      <p className="text-xs text-[#42493e]">{address}</p>
                    </div>
                  </div>
                  <button onClick={() => setChangingAddress(true)} className="text-[#154212] text-sm font-bold hover:underline">Change</button>
                </div>
              )}
            </div>

            {/* Payment */}
            <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_4px_12px_rgba(25,28,24,0.04)] space-y-3">
              <p className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#191c18] mb-4">Payment Method</p>
              {([
                { id: "upi",  icon: "payment",         label: "UPI / GPay / PhonePe" },
                { id: "cod",  icon: "local_shipping",  label: "Cash on Delivery" },
                { id: "bank", icon: "account_balance",  label: "Net Banking" },
              ] as const).map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setPayment(opt.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    payment === opt.id ? "border-[#154212] bg-[#154212]/5" : "border-[#e2e3dc] hover:border-[#c2c9bb]"
                  }`}
                >
                  <span className={`material-symbols-outlined ${payment === opt.id ? "text-[#154212]" : "text-[#72796e]"}`}>{opt.icon}</span>
                  <span className={`font-medium ${payment === opt.id ? "text-[#154212] font-bold" : "text-[#191c18]"}`}>{opt.label}</span>
                  {payment === opt.id && <span className="material-symbols-outlined text-[#154212] ml-auto text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>radio_button_checked</span>}
                </button>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-[1.5rem] p-5 shadow-[0_4px_12px_rgba(25,28,24,0.04)] space-y-3">
              <p className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#191c18] mb-2">Order Summary</p>
              <div className="flex justify-between text-sm"><span className="text-[#42493e]">Subtotal</span><span className="font-medium">₹{total.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#42493e]">GST (18%)</span><span className="font-medium">₹{gst.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#42493e]">Delivery</span><span className="font-medium text-[#154212]">₹{DELIVERY_FEE}</span></div>
              <div className="border-t border-[#e2e3dc] pt-3 flex justify-between">
                <span className="font-bold text-[#191c18]">Total</span>
                <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl text-[#154212]">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setPaid(true)}
              className="w-full bg-[#154212] text-white font-['Plus_Jakarta_Sans'] font-bold text-lg py-5 rounded-[1.5rem] hover:bg-[#2d5a27] active:scale-[0.98] transition-all shadow-lg"
            >
              {payment === "cod" ? "Confirm Order" : `Pay ₹${grandTotal.toFixed(2)}`}
            </button>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
