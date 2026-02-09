// app/components/SimpleCounter.tsx
"use client";

import { useEffect, useState } from "react";

export default function SimpleCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/visitors");
        const data = await response.json();
        setCount(data.totalVisits || 0);
      } catch (error) {
        // Fallback to localStorage
        const stored = localStorage.getItem("visitCount");
        if (stored) {
          setCount(parseInt(stored));
        }
      }
    };

    const updateCount = () => {
      const newCount = count + 1;
      setCount(newCount);
      localStorage.setItem("visitCount", newCount.toString());

      // Send to API
      fetch("/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "increment" }),
      });
    };

    fetchCount();
    updateCount();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-full shadow-lg px-4 py-2 flex items-center gap-2 border border-gray-200">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-gray-700">
          Visitors: <span className="font-bold text-blue-600">{count}</span>
        </span>
      </div>
    </div>
  );
}
