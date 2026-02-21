"use client";

import { motion } from "framer-motion";
import { Droplets } from "lucide-react";

// fixed top-24 left-0 right-0 z-40 overflow-hidden bg-linear-to-r from-blue-800/90 via-teal-800/80 to-emerald-800/90 py-2 shadow-lg

const AnnouncementBar = () => {
  return (
    <div className="fixed top-22 left-0 right-0 z-40 overflow-hidden bg-linear-to-r from-violet-800/90 via-orange-800/80 to-yellow-400/90 py-1 shadow-lg font-lighter text-xs">
      <motion.div
        className="flex items-center justify-center space-x-4 whitespace-nowrap"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 text-white">
            <Droplets className="w-5 h-5 text-blue-300 animate-pulse" />
            <span className="text-md font-semibold tracking-wider">
              Come visit and enjoy an infinite fresh running water -----{" "}
              <span className="font-light text-green-400 animate-pulse">
                watch out! Mobile app is coming soon for your convenience...
              </span>
            </span>
            <Droplets className="w-5 h-5 text-teal-300 animate-pulse" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AnnouncementBar;
