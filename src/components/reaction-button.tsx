// components/reaction-button.tsx
// Uses the same direct Supabase client pattern as your testimonial.tsx
// This avoids GoTrueClient warnings and ensures consistent auth context.

"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Heart, ThumbsUp } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// Same client pattern as your testimonial.tsx
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// ─── Types ────────────────────────────────────────────────────────────────────

type ReactionType = "hearts" | "thumbs_up";

interface FloatingIcon {
  id: number;
  x: number;
  delay: number;
  scale: number;
  type: ReactionType;
}

interface ReactionButtonsProps {
  reviewId: string;
  initialHearts: number;
  initialThumbsUp: number;
}

function sessionKey(reviewId: string) {
  return `hiddenbrooke_reaction_${reviewId}`;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ReactionButtons({
  reviewId,
  initialHearts,
  initialThumbsUp,
}: ReactionButtonsProps) {
  const [hearts, setHearts] = useState(Number(initialHearts) || 0);
  const [thumbsUp, setThumbsUp] = useState(Number(initialThumbsUp) || 0);
  const [selected, setSelected] = useState<ReactionType | null>(null);
  const [loading, setLoading] = useState(false);
  const [floaters, setFloaters] = useState<FloatingIcon[]>([]);
  const floaterIdRef = useRef(0);

  // Restore session state on mount
  useEffect(() => {
    const saved = sessionStorage.getItem(sessionKey(reviewId));
    if (saved === "hearts" || saved === "thumbs_up") {
      setSelected(saved);
    }
  }, [reviewId]);

  // Inject keyframe animation once
  useEffect(() => {
    const styleId = "hiddenbrooke-float-style";
    if (document.getElementById(styleId)) return;
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes floatRise {
        0%   { transform: translateY(0px)   scale(var(--fs, 1)); opacity: 1;   }
        30%  { opacity: 1; }
        75%  { transform: translateY(-60px) scale(calc(var(--fs, 1) * 1.1)); opacity: 0.7; }
        100% { transform: translateY(-95px) scale(calc(var(--fs, 1) * 0.8)); opacity: 0;   }
      }
    `;
    document.head.appendChild(style);
  }, []);

  // ── Staggered burst animation ─────────────────────────────────────────────
  const triggerBurst = useCallback((type: ReactionType) => {
    const count = 6;
    const newFloaters: FloatingIcon[] = Array.from(
      { length: count },
      (_, i) => ({
        id: floaterIdRef.current++,
        x: (i - (count - 1) / 2) * 14 + (Math.random() * 8 - 4),
        delay: i * 130,
        scale: 0.8 + Math.random() * 0.4,
        type,
      }),
    );

    setFloaters((prev) => [...prev, ...newFloaters]);

    const cleanup = (count - 1) * 130 + 1600;
    setTimeout(() => {
      setFloaters((prev) =>
        prev.filter((f) => !newFloaters.find((n) => n.id === f.id)),
      );
    }, cleanup);
  }, []);

  // ── Handle reaction — uses direct UPDATE instead of RPC ──────────────────
  // This is more reliable than RPC and matches your existing code style
  const handleReact = useCallback(
    async (type: ReactionType) => {
      if (loading) return;
      setLoading(true);

      const previous = selected;
      const col = type === "hearts" ? "hearts" : "thumbs_up";
      const prevCol = previous === "hearts" ? "hearts" : "thumbs_up";

      try {
        if (previous === type) {
          // ── Toggle OFF: decrement ──────────────────────────────────────
          const newVal = Math.max(
            (type === "hearts" ? hearts : thumbsUp) - 1,
            0,
          );

          const { error } = await supabase
            .from("testimonials")
            .update({ [col]: newVal })
            .eq("id", reviewId);

          if (error) throw error;

          if (type === "hearts") setHearts(newVal);
          else setThumbsUp(newVal);

          setSelected(null);
          sessionStorage.removeItem(sessionKey(reviewId));
        } else {
          // ── Select new / switch reaction ──────────────────────────────
          const updates: Record<string, number> = {
            [col]: (type === "hearts" ? hearts : thumbsUp) + 1,
          };

          // If switching from a previous reaction, decrement the old one too
          if (previous) {
            const prevVal = Math.max(
              (previous === "hearts" ? hearts : thumbsUp) - 1,
              0,
            );
            updates[prevCol] = prevVal;
          }

          const { error } = await supabase
            .from("testimonials")
            .update(updates)
            .eq("id", reviewId);

          if (error) throw error;

          // Update local state
          if (type === "hearts") {
            setHearts(updates["hearts"]);
            if (previous === "thumbs_up") setThumbsUp(updates["thumbs_up"]);
          } else {
            setThumbsUp(updates["thumbs_up"]);
            if (previous === "hearts") setHearts(updates["hearts"]);
          }

          setSelected(type);
          sessionStorage.setItem(sessionKey(reviewId), type);
          triggerBurst(type);
        }
      } catch (err) {
        console.error("Reaction error:", err);
      } finally {
        setLoading(false);
      }
    },
    [loading, selected, reviewId, hearts, thumbsUp, triggerBurst],
  );

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="flex items-center gap-3 mt-1 select-none">
      {/* ── Heart Button ── */}
      <div className="relative flex items-center">
        {floaters
          .filter((f) => f.type === "hearts")
          .map((f) => (
            <span
              key={f.id}
              className="pointer-events-none absolute text-sm"
              style={
                {
                  bottom: "30px",
                  left: `calc(50% + ${f.x}px)`,
                  animation: `floatRise 1.5s cubic-bezier(0.22, 0.8, 0.36, 1) ${f.delay}ms both`,
                  "--fs": f.scale,
                } as React.CSSProperties
              }
            >
              ❤️
            </span>
          ))}

        <button
          onClick={() => handleReact("hearts")}
          disabled={loading}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
            transition-all duration-200
            ${
              selected === "hearts"
                ? "text-rose-500 scale-105"
                : "bg-white border-stone-200 text-stone-400 hover:border-rose-200 hover:text-rose-400 hover:bg-rose-50"
            }
            ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer active:scale-95"}
          `}
        >
          <Heart
            className={`w-4 h-4 transition-all duration-200 ${
              selected === "hearts" ? "fill-rose-500 text-rose-500" : ""
            }`}
          />
          {hearts > 0 && (
            <span className="tabular-nums text-xs font-semibold">{hearts}</span>
          )}
        </button>
      </div>

      {/* ── ThumbsUp Button ── */}
      <div className="relative flex items-center">
        {floaters
          .filter((f) => f.type === "thumbs_up")
          .map((f) => (
            <span
              key={f.id}
              className="pointer-events-none absolute text-sm"
              style={
                {
                  bottom: "30px",
                  left: `calc(50% + ${f.x}px)`,
                  animation: `floatRise 1.5s cubic-bezier(0.22, 0.8, 0.36, 1) ${f.delay}ms both`,
                  "--fs": f.scale,
                } as React.CSSProperties
              }
            >
              👍
            </span>
          ))}

        <button
          onClick={() => handleReact("thumbs_up")}
          disabled={loading}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
            transition-all duration-200
            ${
              selected === "thumbs_up"
                ? "bg-blue-50 border-blue-300 text-blue-500 scale-105"
                : "bg-white border-stone-200 text-stone-400 hover:border-blue-200 hover:text-blue-400 hover:bg-blue-50"
            }
            ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer active:scale-95"}
          `}
        >
          <ThumbsUp
            className={`w-4 h-4 transition-all duration-200 ${
              selected === "thumbs_up" ? "fill-blue-500 text-blue-500" : ""
            }`}
          />
          {thumbsUp > 0 && (
            <span className="tabular-nums text-xs font-semibold">
              {thumbsUp}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
