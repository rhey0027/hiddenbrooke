"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingModal = ({ isOpen, onClose }: PricingModalProps) => {
  const [selectedSeason, setSelectedSeason] = useState<"low" | "high">("low");

  const pricingData = {
    low: [
      {
        type: "Resthouse",
        price: "3,500",
        features: ["Plus entrance fee", "8:00am - 5:00pm", "Daytime only"],
      },
      {
        type: "Resthouse Overnight",
        price: "6,500",
        features: [
          "Entrance fee included",
          "Up to 15 pax/persons",
          "2nd floor Included",
          "With aircondition",
        ],
      },
      {
        type: "Nipa Hut",
        price: "1,000",
        features: ["Entrance fee included", "Up to 3 pax/persons", "Overnight"],
      },
      {
        type: "Camping Tent",
        price: "350",
        features: ["Addional 100 for Entrance fee", "Up to 3 pax/persons"],
      },
    ],
    high: [
      {
        type: "Cottages",
        price: "700",
        features: [],
      },
      {
        type: "Gazebo",
        price: "700",
        features: [],
      },
      {
        type: "Picnic Table",
        price: 300,
        features: [],
      },
      {
        type: "Regular Table",
        price: 200,
        features: ["For 4 pax/persons"],
      },
    ],
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed top-20 md:inset-x-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-linear-to-br from-white/95 to-blue-50/95 backdrop-blur-lg rounded-2xl shadow-2xl z-50 max-w-4xl w-full md:w-auto"
          >
            <div className="p-6 md:p-8 ">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Room Rates & Packages
                  </h2>
                  <p className="text-gray-600 mt-2">
                    All prices are per day/night in Php
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <X size={24} className="text-gray-700" />
                </button>
              </div>

              {/* Season Selector */}
              <div className="flex gap-4 mb-8 ">
                <button
                  onClick={() => setSelectedSeason("low")}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer ${
                    selectedSeason === "low"
                      ? "bg-linear-to-r from-blue-600 to-teal-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Pricing for Set A
                </button>
                <button
                  onClick={() => setSelectedSeason("high")}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer ${
                    selectedSeason === "high"
                      ? "bg-linear-to-r from-blue-600 to-teal-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Pricing for Set B
                </button>
              </div>

              {/* Pricing Grid */}
              <div className="max-h-[70vh] overflow-y-auto p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pricingData[selectedSeason].map((room, index) => (
                    <motion.div
                      key={room.type}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-900">
                          {room.type}
                        </h3>
                        <div className="text-right">
                          <span className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-teal-600">
                            P{room.price}
                          </span>
                          <p className="text-sm text-gray-500">hiddenbrooke</p>
                        </div>
                      </div>
                      <ul className="space-y-2 mb-6">
                        {room.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-gray-700"
                          >
                            <div className="w-2 h-2 bg-linear-to-r from-blue-400 to-teal-400 rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button className="w-full py-3 bg-linear-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer">
                        View More
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-linear-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-100">
                <p className="text-center text-gray-700">
                  * Walk-ins are always welcome on a first come first serve
                  basis.
                  <br />* For overnights, we recomment a reservation with 50%
                  downpayment <br /> to lock-in your preferred date. <br />* For
                  <span className="text-amber-700 font-light">
                    {" "}
                    bookings
                  </span>{" "}
                  and{" "}
                  <span className="text-amber-700 font-light">inquiries </span>
                  kindly call/text @ 0975-856-9236. Thank you! & have a
                  wonderfull day!
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PricingModal;
