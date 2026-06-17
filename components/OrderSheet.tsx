"use client";

interface Order {
  id: string;
  status: string;
  statusBg: string;
  note: string;
  icon: string;
  iconBg: string;
  iconClass: string;
  amount: string;
}

const ITEMS: Record<string, { name: string; qty: string; price: string }[]> = {
  "RM-92841": [
    { name: "Elan Copper XL 1kg", qty: "×5", price: "₹4,250" },
    { name: "Elan EcoShield 500ml", qty: "×8", price: "₹3,360" },
    { name: "Elan NPK Complex 5kg", qty: "×3", price: "₹6,890" },
  ],
  "RM-81102": [
    { name: "Elan Pure Neem Oil 1L", qty: "×2", price: "₹840" },
    { name: "Elan RootMax 250ml", qty: "×2", price: "₹1,300" },
    { name: "Elan EcoShield 500ml", qty: "×1", price: "₹420" },
    { name: "Delivery", qty: "", price: "₹-320" },
  ],
  "RM-73450": [
    { name: "Elan NPK Complex 5kg", qty: "×4", price: "₹3,620" },
  ],
};

export default function OrderSheet({ order, onClose }: { order: Order | null; onClose: () => void }) {
  if (!order) return null;
  const items = ITEMS[order.id] ?? [];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] bg-black/50 transition-opacity duration-300 ${order ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Sheet */}
      <div className={`fixed bottom-0 left-1/2 -translate-x-1/2 z-[110] w-full max-w-[390px] bg-[#f9faf2] rounded-t-[2rem] shadow-2xl transition-transform duration-300 ${order ? "translate-y-0" : "translate-y-full"}`}>
        {/* Handle */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-10 h-1 rounded-full bg-[#c2c9bb]" />
        </div>

        <div className="px-6 pb-10 max-h-[80vh] overflow-y-auto">
          {/* Order header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-['Work_Sans'] text-xs uppercase tracking-wider text-[#42493e]">Order</p>
              <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-2xl text-[#154212]">#{order.id}</h2>
            </div>
            <span className={`${order.statusBg} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider`}>
              {order.status}
            </span>
          </div>

          <p className="text-sm text-[#42493e] mb-6 flex items-center gap-2">
            <span className={`material-symbols-outlined text-sm ${order.iconClass}`}>{order.icon}</span>
            {order.note}
          </p>

          {/* Items */}
          <div className="bg-white rounded-[1.5rem] p-5 mb-4 space-y-4">
            <p className="font-bold text-[#191c18] mb-2">Items Ordered</p>
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#154212] text-sm">eco</span>
                  <span className="text-[#191c18]">{item.name}</span>
                  {item.qty && <span className="text-[#42493e]">{item.qty}</span>}
                </div>
                <span className="font-bold text-[#154212]">{item.price}</span>
              </div>
            ))}
            <div className="border-t border-[#e2e3dc] pt-3 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-[#154212]">{order.amount}</span>
            </div>
          </div>

          {/* Delivery address */}
          <div className="bg-white rounded-[1.5rem] p-5 flex items-start gap-3">
            <span className="material-symbols-outlined text-[#154212] mt-0.5">location_on</span>
            <div>
              <p className="font-bold text-sm">Delivery Address</p>
              <p className="text-sm text-[#42493e] mt-1">Survey No. 142, Pedakurapadu Mandal<br />Guntur District, Andhra Pradesh — 522 601</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full bg-[#154212] text-white font-bold py-4 rounded-[1.5rem] hover:bg-[#2d5a27] active:scale-95 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
