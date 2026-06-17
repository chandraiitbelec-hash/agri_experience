"use client";
import BottomNav from "@/components/BottomNav";
import { useState, useRef, useEffect } from "react";
import Drawer from "@/components/Drawer";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  { icon: "trending_up",  iconClass: "text-[#003c60]", label: "Market prices" },
  { icon: "potted_plant", iconClass: "text-[#154212]",  label: "What should I plant now?" },
  { icon: "water_drop",   iconClass: "text-[#005484]",  label: "Irrigation tips" },
  { icon: "bug_report",   iconClass: "text-[#755750]",  label: "Identify a pest" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: msg }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "I'm having trouble connecting right now. Please try again shortly." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  const empty = messages.length === 0;

  return (
    <div className="flex flex-col h-full min-h-screen bg-[#f9faf2] font-['Work_Sans'] text-[#191c18]">
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Header */}
      <header className="sticky top-0 w-full z-[50] flex items-center justify-between px-6 h-16 bg-[#f9faf2] shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => setDrawerOpen(true)} className="p-2 text-[#154212] hover:bg-[#e2e3dc] rounded-full transition-colors active:scale-90">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight text-[#154212]">Rythu Mitra</h1>
        </div>
        <Link href="/profile">
          <div className="w-8 h-8 rounded-full bg-[#2d5a27] overflow-hidden">
            <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Profile" />
          </div>
        </Link>
      </header>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Empty state */}
        {empty && (
          <div className="flex flex-col items-center justify-center h-full py-12 gap-6">
            <div className="w-16 h-16 rounded-full bg-[#2d5a27] flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-3xl">psychology</span>
            </div>
            <div className="text-center">
              <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-3xl text-[#154212] tracking-tight">Namaste, Ramesh</h2>
              <p className="text-[#755750] font-medium italic mt-1">Your digital agronomist is ready to help.</p>
            </div>
            <div className="flex flex-col gap-3 w-full mt-4">
              {suggestions.map((s) => (
                <button
                  key={s.label}
                  onClick={() => sendMessage(s.label)}
                  className="flex items-center gap-3 px-5 py-4 bg-white rounded-2xl shadow-[0_4px_12px_rgba(25,28,24,0.04)] hover:bg-[#edefe7] transition-all active:scale-95 text-left"
                >
                  <span className={`material-symbols-outlined ${s.iconClass}`}>{s.icon}</span>
                  <span className="font-semibold text-[#191c18]">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {!empty && (
          <div className="space-y-6 pt-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-end gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-[#2d5a27] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-white" style={{ fontSize: "1rem" }}>psychology</span>
                  </div>
                )}
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#154212] text-white rounded-br-sm"
                    : "bg-white text-[#191c18] rounded-bl-sm shadow-sm border-l-4 border-[#154212]"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-end gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-[#2d5a27] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white" style={{ fontSize: "1rem" }}>psychology</span>
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border-l-4 border-[#154212]">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-[#154212] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-[#154212] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-[#154212] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="shrink-0 px-4 pb-2 pt-2 bg-[#f9faf2]">
        <div className="glass-panel p-2 rounded-2xl shadow-[0_12px_32px_rgba(25,28,24,0.08)] flex items-center gap-2">
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
            if (e.target.files?.[0]) sendMessage("I've uploaded a photo of my crop. Can you diagnose what's wrong with it?");
          }} />
          <button onClick={() => fileInputRef.current?.click()} className="p-2 text-[#755750] hover:bg-[#e2e3dc] rounded-full transition-colors shrink-0">
            <span className="material-symbols-outlined">add_a_photo</span>
          </button>
          <input
            className="flex-1 bg-[#e2e3dc]/50 rounded-xl px-4 py-3 text-sm text-[#191c18] placeholder:text-[#72796e] outline-none focus:bg-[#e2e3dc] transition-colors"
            placeholder="Describe your field issue..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="bg-[#154212] p-3 text-white rounded-xl hover:bg-[#2d5a27] active:scale-95 transition-all disabled:opacity-40 shrink-0"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
