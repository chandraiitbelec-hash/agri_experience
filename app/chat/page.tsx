"use client";
import BottomNav from "@/components/BottomNav";
import { useState, useRef } from "react";
import Drawer from "@/components/Drawer";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  { icon: "trending_up", iconClass: "text-[#003c60]", label: "Market prices" },
  { icon: "potted_plant", iconClass: "text-[#154212]", label: "What should I plant now?" },
  { icon: "water_drop", iconClass: "text-[#005484]", label: "Irrigation tips" },
  { icon: "bug_report", iconClass: "text-[#755750]", label: "Identify a pest" },
];

const initialMessages: Message[] = [
  {
    role: "user",
    content:
      "I noticed some yellow spots on my tomato leaves today. They look like concentric rings in some parts. What could it be?",
  },
  {
    role: "assistant",
    content:
      'Based on your description of "concentric rings," this sounds like Early Blight (Alternaria solani), a common fungal disease in tomatoes. This is typically caused by warm temperatures and high humidity. Could you please upload a clear photo of the leaf? This will help me give you a definitive diagnosis and treatment plan.',
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;

    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: text }];
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
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please check your internet connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function useSuggestion(label: string) {
    setInput(label);
  }

  return (
    <div className="bg-[#f9faf2] font-['Work_Sans'] text-[#191c18]">
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <header className="sticky top-0 w-full z-[50] flex items-center justify-between px-6 h-16 bg-[#f9faf2]">
        <div className="flex items-center gap-4">
          <button onClick={() => setDrawerOpen(true)} className="p-2 text-[#154212] hover:bg-[#e2e3dc] rounded-full transition-colors active:scale-90">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight text-[#154212]">Rythu Mitra</h1>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#2d5a27] overflow-hidden">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Farmer profile" />
        </div>
      </header>

      <main className="pt-4 pb-4 px-4 max-w-4xl mx-auto">
        <div className="mb-10 text-center space-y-2">
          <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-4xl text-[#154212] tracking-tighter">
            Namaste, Ramesh
          </h2>
          <p className="text-[#755750] font-medium italic">
            Your digital agronomist is ready to help.
          </p>
        </div>

        {messages.length === 0 && (
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {suggestions.map((s) => (
              <button
                key={s.label}
                onClick={() => useSuggestion(s.label)}
                className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-[0_4px_12px_rgba(25,28,24,0.04)] hover:bg-[#edefe7] transition-all active:scale-95"
              >
                <span className={`material-symbols-outlined ${s.iconClass}`}>{s.icon}</span>
                <span className="font-semibold text-[#191c18]">{s.label}</span>
              </button>
            ))}
          </div>
        )}

        {messages.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {suggestions.map((s) => (
              <button
                key={s.label}
                onClick={() => useSuggestion(s.label)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:bg-[#edefe7] transition-all active:scale-95 text-sm"
              >
                <span className={`material-symbols-outlined text-sm ${s.iconClass}`} style={{ fontSize: "1rem" }}>
                  {s.icon}
                </span>
                <span className="font-medium text-[#191c18]">{s.label}</span>
              </button>
            ))}
          </div>
        )}

        <div className="space-y-8">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-10 h-10 rounded-full bg-[#2d5a27] flex items-center justify-center shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-white text-xl">psychology</span>
                </div>
              )}
              <div
                className={`max-w-[80%] p-5 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-[#154212] text-white rounded-tr-none"
                    : "bg-white text-[#191c18] rounded-tl-none shadow-[0_4px_12px_rgba(25,28,24,0.06)] border-l-4 border-[#154212]"
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-4 justify-start">
              <div className="w-10 h-10 rounded-full bg-[#2d5a27] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white text-xl">psychology</span>
              </div>
              <div className="bg-white p-5 rounded-2xl rounded-tl-none shadow-sm border-l-4 border-[#154212]">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-[#154212] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-[#154212] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-[#154212] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Input Bar */}
      <div className="sticky bottom-16 w-full z-40 px-4 pb-2">
        <div className="glass-panel p-3 rounded-2xl shadow-[0_12px_32px_rgba(25,28,24,0.08)] flex items-center gap-3">
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
            if (e.target.files?.[0]) {
              setInput("I've uploaded a photo of my crop. Can you diagnose what's wrong with it?");
            }
          }} />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-[#755750] hover:bg-[#e2e3dc] rounded-full transition-colors"
            title="Upload Photo"
          >
            <span className="material-symbols-outlined">add_a_photo</span>
          </button>
          <div className="flex-1 bg-[#e2e3dc]/50 rounded-xl px-4 py-3">
            <input
              className="w-full bg-transparent border-none focus:ring-0 text-[#191c18] placeholder:text-[#72796e] font-['Work_Sans'] outline-none"
              placeholder="Describe your field issue..."
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
          </div>
          <button
            className="p-3 text-[#154212] hover:bg-[#bcf0ae] rounded-full transition-colors"
            title="Voice Input"
          >
            <span className="material-symbols-outlined">mic</span>
          </button>
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="bg-[#154212] p-3 text-white rounded-xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-40"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
