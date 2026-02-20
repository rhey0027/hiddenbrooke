// components/ReactionButtons.tsx
// Heart ❤️ and 👍 ThumbsUp side-by-side reaction buttons.
// - Both icons always visible side by side
// - Only ONE can be selected at a time per review
// - Once per session per review (sessionStorage flag)
// - Counts saved in Supabase
// - Floating burst animation on click

"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Heart, ThumbsUp } from "lucide-react";
import { createClient } from "@supabase/supabase-js"; // adjust path if needed

// ─── Types ───────────────────────────────────────────────────────────────────

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

// ─── Session Key Helper ───────────────────────────────────────────────────────

function sessionKey(reviewId: string) {
  return `hiddenbrooke_reaction_${reviewId}`;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ReactionButtons({
  reviewId,
  initialHearts,
  initialThumbsUp,
}: ReactionButtonsProps) {
  const [hearts, setHearts] = useState(initialHearts);
  const [thumbsUp, setThumbsUp] = useState(initialThumbsUp);
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

  // ── Floating burst animation ──────────────────────────────────────────────
  // -- Inject the keyframe animation into <head> once

  useEffect(() => {
    const styleId = "hiddenbrooke-float-style";

    if (document.getElementById(styleId)) return;
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
   @keyframes floatRise {
        0%   { transform: translateY(0px)   scale(var(--fs, 1)); opacity: 1;    }
        30%  { opacity: 1; }
        75%  { transform: translateY(-60px) scale(calc(var(--fs, 1) * 1.1)); opacity: 0.7; }
        100% { transform: translateY(-95px) scale(calc(var(--fs, 1) * 0.8)); opacity: 0;   }
      }
    `;
    document.head.appendChild(style);
  }, []);

  // ── Staggered burst — each icon launches 130ms after the previous ──────────
  const triggerBurst = useCallback((type: ReactionType) => {
    const count = 6;
    const newFloaters: FloatingIcon[] = Array.from(
      { length: count },
      (_, i) => ({
        id: floaterIdRef.current++,
        x: (i - (count - 1) / 2) * 14 + (Math.random() * 8 - 4),
        delay: i * 130, // 0ms, 130ms, 260ms, 390ms, 520ms, 650ms
        scale: 0.8 + Math.random() * 0.4,
        type,
      }),
    );

    setFloaters((prev) => [...prev, ...newFloaters]);

    // Clean up after last icon finishes: last delay + animation duration
    const cleanup = (count - 1) * 130 + 1600;
    setTimeout(() => {
      setFloaters((prev) =>
        prev.filter((f) => !newFloaters.find((n) => n.id === f.id)),
      );
    }, cleanup);
  }, []);

  // ── Reaction handler ──────────────────────────────────────────────────────
  const handleReact = useCallback(
    async (type: ReactionType) => {
      if (loading) return;
      setLoading(true);

      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
      );
      const previous = selected;

      try {
        if (previous === type) {
          // Toggle OFF — remove reaction
          const { data, error } = await supabase.rpc("remove_reaction", {
            review_id: reviewId,
            reaction_type: type,
          });
          if (error) throw error;

          const row = Array.isArray(data) ? data[0] : data;
          setHearts(Number(row.hearts));
          setThumbsUp(Number(row.thumbs_up));
          setSelected(null);
          sessionStorage.removeItem(sessionKey(reviewId));
        } else {
          // Select new / switch from previous
          const { data, error } = await supabase.rpc("react_to_review", {
            review_id: reviewId,
            reaction_type: type,
            previous_type: previous ?? null,
          });
          if (error) throw error;

          const row = Array.isArray(data) ? data[0] : data;
          setHearts(Number(row.hearts));
          setThumbsUp(Number(row.thumbs_up));
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
    [loading, selected, reviewId, triggerBurst],
  );

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex items-center gap-3 mt-3 select-none">
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
                  // Each icon animates independently with its own delay
                  animation: `floatRise 1.5s cubic-bezier(0.22, 0.8, 0.36, 1) ${f.delay}ms both`,
                  ["--fs" as unknown as keyof React.CSSProperties]: f.scale,
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
                ? "bg-rose-50 border-rose-300 text-rose-500 scale-105"
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
          <span className="tabular-nums min-w-3 text-center">
            {hearts > 0 ? hearts : ""}
          </span>
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
                  ["--fs" as unknown as keyof React.CSSProperties]: f.scale,
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
          <span className="tabular-nums min-w-3 text-center">
            {thumbsUp > 0 ? thumbsUp : ""}
          </span>
        </button>
      </div>
    </div>
  );
}
