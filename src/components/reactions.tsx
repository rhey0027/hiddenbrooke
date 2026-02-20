// "use client";

// import { useState, useEffect } from "react";
// import { Heart, ThumbsUp, TrendingUp } from "lucide-react";

// type ReactionState = {
//   hearts: number;
//   thumbsUp: number;
//   userReactions: {
//     heart: boolean;
//     thumbsUp: boolean;
//   };
//   lastUpdated: string;
// };

// export default function PersistentReactionCounter() {
//   const [reactions, setReactions] = useState<ReactionState>({
//     hearts: 0,
//     thumbsUp: 0,
//     userReactions: {
//       heart: false,
//       thumbsUp: false,
//     },
//     lastUpdated: new Date().toISOString(),
//   });

//   // Load from localStorage on mount
//   useEffect(() => {
//     const saved = localStorage.getItem("resortReactions");
//     if (saved) {
//       try {
//         const parsed = JSON.parse(saved);
//         // Check if user already reacted (using session or device-based)
//         const userReactions = localStorage.getItem("userReactions") || "{}";
//         const timer = setTimeout(() => {
//           setReactions({
//             ...parsed,
//             userReactions: JSON.parse(userReactions),
//           });
//           // setIsMounted(true);
//         }, 1);

//         return () => {
//           clearTimeout(timer);
//         };

//         // setReactions({
//         //   ...parsed,
//         //   userReactions: JSON.parse(userReactions)
//         // });
//       } catch (error) {
//         console.error("Failed to load reactions:", error);
//       }
//     }
//   }, []);

//   // Save to localStorage on update
//   useEffect(() => {
//     localStorage.setItem(
//       "resortReactions",
//       JSON.stringify({
//         hearts: reactions.hearts,
//         thumbsUp: reactions.thumbsUp,
//         lastUpdated: reactions.lastUpdated,
//       }),
//     );

//     localStorage.setItem(
//       "userReactions",
//       JSON.stringify(reactions.userReactions),
//     );
//   }, [reactions]);

//   const handleReaction = (type: "heart" | "thumbsUp") => {
//     setReactions((prev) => {
//       const hasReacted = prev.userReactions[type];
//       const increment = hasReacted ? -1 : 1;
//       const countKey = type === "heart" ? "hearts" : "thumbsUp";

//       const newState = {
//         ...prev,
//         [countKey]: prev[countKey] + increment,
//         userReactions: {
//           ...prev.userReactions,
//           [type]: !hasReacted,
//         },
//         lastUpdated: new Date().toISOString(),
//       };

//       return newState;
//     });
//   };

//   const totalReactions = reactions.hearts + reactions.thumbsUp;

//   return (
//     <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
//       {/* Header */}
//       <div className="bg-linear-to-r from-pink-500 to-blue-500 text-white p-6">
//         <h3 className="text-2xl font-bold">Resort Reactions</h3>
//         <p className="opacity-90">Share your love for HiddenBrooke</p>
//       </div>

//       {/* Content */}
//       <div className="p-8">
//         {/* Stats Overview */}
//         <div className="mb-8 grid grid-cols-2 gap-4">
//           <div className="bg-pink-50 rounded-xl p-4 text-center">
//             <div className="text-4xl font-bold text-pink-600">
//               {reactions.hearts}
//             </div>
//             <div className="text-sm text-pink-700 font-medium">
//               Total Hearts
//             </div>
//           </div>
//           <div className="bg-blue-50 rounded-xl p-4 text-center">
//             <div className="text-4xl font-bold text-blue-600">
//               {reactions.thumbsUp}
//             </div>
//             <div className="text-sm text-blue-700 font-medium">Total Likes</div>
//           </div>
//         </div>

//         {/* Reaction Buttons */}
//         <div className="flex justify-center gap-12 mb-8">
//           {/* Heart */}
//           <button
//             onClick={() => handleReaction("heart")}
//             className="group flex flex-col items-center gap-3"
//           >
//             <div
//               className={`relative p-5 rounded-2xl transition-all duration-300 ${
//                 reactions.userReactions.heart
//                   ? "bg-linear-to-br from-pink-500 to-red-500 shadow-2xl shadow-pink-300 transform -translate-y-2"
//                   : "bg-linear-to-br from-gray-100 to-gray-200 group-hover:shadow-xl group-hover:shadow-pink-100"
//               }`}
//             >
//               <Heart
//                 className={`w-10 h-10 transition-all duration-300 ${
//                   reactions.userReactions.heart
//                     ? "fill-white text-white animate-bounce"
//                     : "text-gray-400 group-hover:text-pink-500 group-hover:scale-110"
//                 }`}
//               />
//               {reactions.userReactions.heart && (
//                 <div className="absolute -top-2 -right-2 bg-white border-2 border-pink-500 text-pink-600 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
//                   ✓
//                 </div>
//               )}
//             </div>
//             <span
//               className={`font-semibold ${
//                 reactions.userReactions.heart
//                   ? "text-pink-600"
//                   : "text-gray-600"
//               }`}
//             >
//               Love It! ❤️
//             </span>
//           </button>

//           {/* Thumbs Up */}
//           <button
//             onClick={() => handleReaction("thumbsUp")}
//             className="group flex flex-col items-center gap-3"
//           >
//             <div
//               className={`relative p-5 rounded-2xl transition-all duration-300 ${
//                 reactions.userReactions.thumbsUp
//                   ? "bg-linear-to-br from-blue-500 to-indigo-500 shadow-2xl shadow-blue-300 transform -translate-y-2"
//                   : "bg-linear-to-br from-gray-100 to-gray-200 group-hover:shadow-xl group-hover:shadow-blue-100"
//               }`}
//             >
//               <ThumbsUp
//                 className={`w-10 h-10 transition-all duration-300 ${
//                   reactions.userReactions.thumbsUp
//                     ? "fill-white text-white animate-bounce"
//                     : "text-gray-400 group-hover:text-blue-500 group-hover:scale-110"
//                 }`}
//               />
//               {reactions.userReactions.thumbsUp && (
//                 <div className="absolute -top-2 -right-2 bg-white border-2 border-blue-500 text-blue-600 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
//                   ✓
//                 </div>
//               )}
//             </div>
//             <span
//               className={`font-semibold ${
//                 reactions.userReactions.thumbsUp
//                   ? "text-blue-600"
//                   : "text-gray-600"
//               }`}
//             >
//               Like It! 👍
//             </span>
//           </button>
//         </div>

//         {/* Progress Bar */}
//         <div className="mb-6">
//           <div className="flex justify-between mb-2">
//             <span className="text-sm text-gray-600">Engagement Level</span>
//             <span className="text-sm font-bold text-gray-800">
//               {totalReactions} reactions
//             </span>
//           </div>
//           <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
//             <div
//               className="h-full bg-linear-to-r from-pink-500 to-blue-500 transition-all duration-500"
//               style={{
//                 width: `${Math.min((totalReactions / 1000) * 100, 100)}%`,
//               }}
//             ></div>
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-gray-50 rounded-xl p-4">
//           <div className="flex items-center gap-2 text-gray-600 mb-2">
//             <TrendingUp className="w-4 h-4" />
//             <span className="text-sm font-medium">Recent Activity</span>
//           </div>
//           <p className="text-sm text-gray-600">
//             Last updated: {new Date(reactions.lastUpdated).toLocaleTimeString()}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
