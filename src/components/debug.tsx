// // components/TestimonialDebug.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";

// interface DebugInfo {
//   tableData: unknown[] | null;
//   tableError: { message: string } | null;
//   storageFiles: unknown[] | null;
//   hasData: boolean;
//   count: number;
// }

// export default function TestimonialDebug() {
//   const [debug, setDebug] = useState<DebugInfo | null>(null);
//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL || "",
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
//   );

//   const checkData = async () => {
//     // Check if table exists and get data
//     const { data, error } = await supabase.from("testimonials").select("*");

//     // Check storage
//     const { data: storageData } = await supabase.storage
//       .from("testimonial-images")
//       .list();

//     setDebug({
//       tableData: data,
//       tableError: error,
//       storageFiles: storageData,
//       hasData: (data && data.length > 0) ?? false,
//       count: data?.length || 0,
//     });
//   };

//   useEffect(() => {
//     (async () => {
//       await checkData();
//     })();
//   }, []);

//   if (!debug) return <div>Checking...</div>;

//   return (
//     <div className="bg-gray-100 p-4 rounded-lg mt-4">
//       <h3 className="font-bold text-lg mb-2">Debug Info:</h3>
//       <p>Testimonials in DB: {debug.count}</p>
//       {debug.tableError && (
//         <p className="text-red-600">Error: {debug.tableError.message}</p>
//       )}
//       <pre className="text-xs overflow-auto max-h-40 bg-white p-2 rounded">
//         {JSON.stringify(debug, null, 2)}
//       </pre>
//     </div>
//   );
// }
