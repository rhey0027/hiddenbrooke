"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingModal = ({ isOpen, onClose }: PricingModalProps) => {
  // State for the Lightbox
  const [selectedGallery, setSelectedGallery] = useState<string[] | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  // Gallery Navigation Functions
  const nextSlide = () =>
    setPhotoIndex((prev) => (prev + 1) % (selectedGallery?.length || 1));
  const prevSlide = () =>
    setPhotoIndex(
      (prev) =>
        (prev - 1 + (selectedGallery?.length || 1)) %
        (selectedGallery?.length || 1),
    );

  const pricingData = [
    {
      id: 1,
      type: "Resthouse Overnight",
      price: "6,500",
      features: [
        "Entrance fee included",
        "Up to 15 pax/persons",
        "2nd floor Included",
        "With aircondition",
      ],
      gallery: [
        "/rooms/rh1.jpg",
        "/rooms/rh2.jpg",
        "/rooms/rh3.jpg",
        "/rooms/rh4.jpg",
        "/rooms/rh5.jpg",
      ],
    },
    {
      id: 2,
      type: "Resthouse",
      price: "3,500",
      features: ["Plus entrance fee", "8:00am - 5:00pm", "Daytime only"],
      gallery: [
        "/rooms/rh1.jpg",
        "/rooms/rh2.jpg",
        "/rooms/rh3.jpg",
        "/rooms/rh4.jpg",
        "/rooms/rh5.jpg",
      ],
    },
    {
      id: 3,
      type: "Nipa Hut",
      price: "1,000",
      features: ["Entrance fee included", "Up to 3 pax/persons", "Overnight"],
      gallery: ["/rooms/nipa1.jpg", "/rooms/nipa2.jpg", "/rooms/nipa3.jpg"],
    },
    {
      id: 4,
      type: "Camping Tent",
      price: "350",
      features: ["Addional 100 for Entrance fee", "Up to 3 pax/persons"],
      gallery: ["/rooms/tent.jpg"],
    },
    {
      id: 5,
      type: "Cottages",
      price: "700",
      features: ["wide and spacious", "cement floor"],
      gallery: ["/rooms/cot.jpg", "/rooms/cot2.jpg"],
    },
    {
      id: 6,
      type: "Gazebo",
      price: "700",
      features: ["wider table"],
      gallery: ["/rooms/gazebo.jpg", "/rooms/gazebo2.jpg"],
    },
    {
      id: 7,
      type: "Picnic Table",
      price: 300,
      features: ["comfortable"],
      gallery: ["/rooms/table3.jpg"],
    },
    {
      id: 8,
      type: "Regular Table",
      price: 200,
      features: ["For 4 pax/persons"],
      gallery: ["/rooms/tablenchair.jpg"],
    },
  ];

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
            className="fixed top-2 md:inset-x-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-linear-to-br from-white/95 to-blue-50/95 backdrop-blur-lg rounded-2xl shadow-2xl z-50 max-w-4xl w-full md:w-auto"
          >
            <div className="p-6 md:p-8 ">
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Room Rates & Packages
                  </h2>
                  <p className="text-gray-600 mt-2">
                    All prices are per day/night in 👉 php
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <X size={24} className="text-gray-700" />
                </button>
              </div>

              {/* Pricing Grid */}
              {/* 2. GRID OF 4 CARDS */}
              <div className="grid grid-cols-1  gap-6">
                <div
                  className="max-h-[55vh] overflow-y-auto p-5"
                  data-aos="fade-up"
                >
                  {pricingData.map((card) => (
                    <div
                      key={card.id}
                      className="border border-gray-100 rounded-2xl
                              p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-gray-800">
                            {card.type}
                          </h3>
                          <div className="text-right">
                            <span className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-blue-600">
                              {card.price}
                            </span>
                            <p className="text-xs text-gray-400">
                              hiddenbrooke
                            </p>
                          </div>
                        </div>
                        <ul className="space-y-3 mb-6">
                          {card.features.map((feat, i) => (
                            <li
                              key={i}
                              className="flex items-center text-sm textgray-600"
                            >
                              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3" />
                              {feat}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* VIEW MORE BUTTON - Triggers the gallery */}
                      <button
                        onClick={() => {
                          setSelectedGallery(card.gallery);
                          setPhotoIndex(0);
                        }}
                        className="w-full py-3 bg-linear-to-br from-blue-800 via-blue-500 text-white font-semibold tracking-wider rounded-xl hover:opacity-90 transition shadow-md cursor-pointer active:scale-95"
                      >
                        View Images
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* 3. THE LIGHTBOX POP-UP */}
            {selectedGallery && (
              <div className="fixed inset-0 z-100 bg-black/85 flex items-center justify-center p-4">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedGallery(null)}
                  className="cursor-pointer absolute top-10 right-10 text-white hover:bg-white/10 p-2 rounded-full transition"
                >
                  <X size={40} />
                </button>
                {/* Left Arrow */}
                {selectedGallery.length > 1 && (
                  <button
                    onClick={prevSlide}
                    className="cursor-pointer absolute left-4 md:left-10 text-white p-2 hover:bg-white/10 rounded-full transition"
                  >
                    <ChevronLeft size={48} />
                  </button>
                )}
                {/* Image Container */}
                <div className="max-w-5xl w-full h-[80vh] flex items-center justify-center">
                  <Image
                    width={500}
                    height={500}
                    src={selectedGallery[photoIndex]}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in fade-in zoom-in duration-300"
                    alt="Gallery Preview"
                  />
                </div>
                {/* Right Arrow */}
                {selectedGallery.length > 1 && (
                  <button
                    onClick={nextSlide}
                    className="cursor-pointer absolute right-4 md:right-10 text-white p-2 hover:bg-white/10 rounded-full transition"
                  >
                    <ChevronRight size={48} />
                  </button>
                )}
                {/* Image Counter Indicator */}
                <div className="absolute bottom-10 text-white font-medium">
                  {photoIndex + 1} / {selectedGallery.length}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="mt-4 p-4 bg-linear-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-100">
              <p className="text-center text-gray-700">
                * Walk-ins are always welcome on a first come first serve basis.
                <br />* For overnights, we recomment a reservation with 50%
                downpayment <br /> to lock-in your preferred date. <br />* For
                <span className="text-amber-700 font-light">
                  {" "}
                  bookings
                </span> and{" "}
                <span className="text-amber-700 font-light">inquiries </span>
                kindly call/text @ 0975-856-9236. Thank you! & have a wonderfull
                day!
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PricingModal;
