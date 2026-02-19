"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Users } from "lucide-react";

// ─── Supabase Client ──────────────────────────────────────────────────────────
// Re-use your existing client if you have a lib/supabase.ts — replace this
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const SESSION_KEY = "hiddenbrooke_visited";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const run = async () => {
      const alreadyVisited = sessionStorage.getItem(SESSION_KEY);

      if (!alreadyVisited) {
        // New session — increment in Supabase via RPC
        const { data, error } = await supabase.rpc("increment_visitors");
        if (!error && data != null) {
          setCount(data as number);
        } else {
          // Fallback: just read current count
          const { data: row } = await supabase
            .from("visitors")
            .select("count")
            .eq("id", 1)
            .single();
          if (row) setCount(row.count);
        }
        sessionStorage.setItem(SESSION_KEY, "1");
      } else {
        // Returning tab — just read the count
        const { data: row } = await supabase
          .from("visitors")
          .select("count")
          .eq("id", 1)
          .single();
        if (row) setCount(row.count);
      }
    };

    run();
  }, []);

  // Don't render until we have a count
  if (count === null) return null;

  return (
    <div className="absolute left-27 top-13 transform -translate-x-1/2 flex items-center gap-2 bg-black/50 max-w-38 rounded-full px-6 py-1 shadow-md text-sm text-stone-600">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <Users className="w-4 h-4 text-emerald-600" />
      <span className="text-white/70">
        <code className="font-semibold text-lg text-orange-400">
          {count.toLocaleString()}
        </code>{" "}
        Visitor{count !== 1 ? "s" : ""}
      </span>
    </div>
  );
}
