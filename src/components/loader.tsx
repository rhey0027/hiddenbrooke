"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function WaterLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black/95"
        >
          <div className="relative h-40 w-40 flex items-center justify-center">
            {/* Falling Droplet */}
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 5,
                ease: "easeIn",
                repeat: Infinity,
                repeatDelay: 1.5,
              }}
              className="absolute w-4 h-6 bg-blue-400 rounded-full"
              style={{ borderRadius: "50% 50% 50% 50% / 100% 100% 30% 30%" }}
            />

            {/* Ripple Effect (triggers when drop "hits") */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 2], opacity: [0, 0.5, 0] }}
              transition={{
                duration: 2.1,
                repeat: Infinity,
                delay: 0.6,
                ease: "easeOut",
              }}
              className="absolute w-12 h-4 border-2 border-blue-300 rounded-[100%]"
            />

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1.8], opacity: [0, 0.3, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.8,
                ease: "easeOut",
              }}
              className="absolute w-12 h-4 border border-blue-200 rounded-[100%]"
            />
          </div>

          {/* Resort Name */}
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="text-center mt-0"
          >
            <h1 className="font-[Style_Script] text-4xl tracking-widest md:text-7xl text-yellow-500 font-bold">
              Hiddenbrooke
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-blue-400 font-light tracking-[0.4em] text-sm mt-2 uppercase"
            >
              Resort
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
