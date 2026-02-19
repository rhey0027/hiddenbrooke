"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SESSION_FLAG = "hiddenbrooke_visited";

export default function useVisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    async function trackVisit() {
      try {
        const alreadyCounted = sessionStorage.getItem(SESSION_FLAG);

        if (!alreadyCounted) {
          const { data, error } = await supabase.rpc("increment_visitor_count");

          if (error) throw error;
          sessionStorage.setItem(SESSION_FLAG, "true");
          setCount(Number(data));
        } else {
          const { data, error: fetchError } = await supabase
            .from("visitor_counter")
            .select("total_visits")
            .eq("id", 1)
            .single();

          if (fetchError) throw fetchError;
          setCount(Number(data.total_visits));
        }
      } catch (err: unknown) {
        console.error("Visitor counter error:", err);
        setError("Count not load");
      } finally {
        setLoading(false);
      }
    }
    trackVisit();
  }, []);

  return { count, loading, error };
}
