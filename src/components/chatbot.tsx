// components/ChatWidget.tsx
// Hiddenbrooke Resort — AI Chat Widget
// Powered by Claude API — answers visitor questions about the resort
// Floating bubble bottom-right corner
// Bilingual: English + Filipino (Bisaya/Tagalog)

"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot } from "lucide-react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant";
  content: string;
}

// ─── System Prompt ────────────────────────────────────────────────────────────
// This is what the AI knows about Hiddenbrooke Resort

const SYSTEM_PROMPT = `You are a friendly and helpful chat assistant for Hiddenbrooke Resort, located in bunguiao, upper waray-waray, Zamboanga City, Philippines.

Your job is to answer visitor questions about the resort warmly and helpfully. Reply in the same language the visitor uses — if they write in English, reply in English. If they write in Filipino, Tagalog, or Bisaya/Cebuano, reply in the same language. You can also mix languages naturally (Taglish or Bisaya-English) if it feels natural.

== RESORT INFORMATION ==

Name: Hiddenbrooke Resort
Location: bunguiao, upper waray-waray, Zamboanga City, Philippines

RATES & ACCOMMODATIONS:
- Resthouse (Overnight) ₱6,500 up to 15 persons with airconditioning system, entrance fee is included: 
- Resthouse (daytime only + entrance fee): ₱3,500
- Nipa Hut:  (good for 3 persons, entrance fee included): ₱1,000
- Camping Tent: ₱350. additional 100.for entrance fee up to 3 persons.
- Cottages: ₱700.
- Gazebo: ₱700.
- Picnic Table: ₱300.
- Regular Table: ₱200. for 4 persons
- Other accommodations are available — encourage guests to call or message for more details

AMENITIES:
- 2 sets Swimming pool
- Cottages and cabins
- Kids playground
- Surrounded by nature — great for relaxation and family outings

BOOKING:
- Guests can book by calling or messaging the resort directly
- Encourage interested guests to reach out to confirm availability and reserve their slot

== YOUR PERSONALITY ==
- Warm, friendly, and welcoming — like a real resort staff member
- Keep answers short and easy to read (2-4 sentences max unless more detail is needed)
- Use emojis occasionally to keep the tone light and inviting 🌿🏖️
- If you don't know the answer to something specific (like exact contact number or address), politely say you'll need them to contact the resort directly for that info
- Never make up information that isn't listed above
- Always end with an invitation to ask more or to visit the resort`;

// ─── Suggested Questions ─────────────────────────────────────────────────────

const SUGGESTIONS = [
  "How much is overnight?",
  "Unsa ang mga amenities?",
  "How do I book?",
  "May kids playground po ba?",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  // ── Send message to Claude API ────────────────────────────────────────────
  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      const reply =
        data?.content?.[0]?.text ??
        "Sorry, I couldn't get a response. Please try again.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Oops! Something went wrong. Please try again or contact us directly. 🙏",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* ── Chat Window ───────────────────────────────────────────────────── */}
      <div
        className={`
          flex flex-col bg-white rounded-2xl shadow-2xl border border-stone-100
          w-87.5 transition-all duration-300 origin-bottom-right overflow-hidden
          ${
            open
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-90 pointer-events-none"
          }
        `}
        style={{ height: "520px" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 shrink-0"
          style={{
            background: "linear-gradient(135deg, #1a6b4a 0%, #2d8f6f 100%)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-lg">
                <Image
                  src="/logo/brooke.png"
                  width={80}
                  height={80}
                  alt="logo"
                />
              </span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">
                Hiddenbrooke Resort
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <p className="text-emerald-100 text-xs">
                  24/7 yaya at your service
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-stone-200 scrollbar-track-transparent">
          {/* Welcome message */}
          {messages.length === 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-start">
                <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-emerald-700" />
                </div>
                <div
                  className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed max-w-[80%]"
                  style={{ backgroundColor: "#f0fdf4", color: "#1a1a1a" }}
                >
                  Buenas Dias! 👋 Welcome to{" "}
                  <strong>Hiddenbrooke Resort</strong>! Andito po ako para
                  tumulong o mag assist sa mga gusto nyong malaman. What would
                  you like to know?
                </div>
              </div>

              {/* Suggestion chips */}
              <div className="flex flex-wrap gap-2 pl-9">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-xs px-3 py-1.5 rounded-full border transition-colors cursor-pointer"
                    style={{
                      borderColor: "#2d8f6f",
                      color: "#1a6b4a",
                      backgroundColor: "#f0fdf4",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "#d1fae5";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "#f0fdf4";
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Conversation */}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 items-start ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-emerald-700" />
                </div>
              )}

              {/* Bubble */}
              <div
                className="rounded-2xl px-4 py-3 text-sm leading-relaxed max-w-[80%] whitespace-pre-wrap"
                style={
                  msg.role === "user"
                    ? {
                        backgroundColor: "#1a6b4a",
                        color: "#ffffff",
                        borderRadius: "1rem 1rem 0.25rem 1rem",
                      }
                    : {
                        backgroundColor: "#f0fdf4",
                        color: "#1a1a1a",
                        borderRadius: "1rem 1rem 1rem 0.25rem",
                      }
                }
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-2 items-start">
              <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-emerald-700" />
              </div>
              <div
                className="rounded-2xl px-4 py-3 flex items-center gap-1"
                style={{ backgroundColor: "#f0fdf4" }}
              >
                <span
                  className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-stone-100 shrink-0">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about the resort..."
              disabled={loading}
              className="flex-1 text-sm px-4 py-2.5 rounded-full border border-stone-200 outline-none transition-all"
              style={{ fontFamily: "inherit" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#2d8f6f")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all shrink-0"
              style={{
                backgroundColor:
                  loading || !input.trim() ? "#d1fae5" : "#1a6b4a",
              }}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 text-emerald-700 animate-spin" />
              ) : (
                <Send className="w-4 h-4 text-white" />
              )}
            </button>
          </form>
          <p className="text-center text-xs mt-2" style={{ color: "#9ca3af" }}>
            Powered by • Maximus
          </p>
        </div>
      </div>

      {/* ── Floating Bubble Button ─────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #1a6b4a 0%, #2d8f6f 100%)",
        }}
        aria-label="Open chat"
      >
        {/* Unread indicator */}
        {unread && !open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">1</span>
          </span>
        )}

        {/* Icon toggle */}
        <div
          className={`transition-all duration-300 ${open ? "rotate-90 opacity-0 absolute" : "rotate-0 opacity-100"}`}
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div
          className={`transition-all duration-300 ${open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0 absolute"}`}
        >
          <X className="w-6 h-6 text-white" />
        </div>
      </button>
    </div>
  );
}
