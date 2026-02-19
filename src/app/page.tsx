"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/nav";

import PricingModal from "@/components/pricing";

import Footer from "@/components/footer";
import { ArrowDownCircle } from "lucide-react";
import CarouselWindowResponsive from "@/components/carousel-window";

import MapSection from "@/components/MapSection";
import AnnouncementBar from "@/components/Annoucebar";
import WaterLoader from "@/components/loader";
import VideoAai from "@/components/video-ai";
import TestimonialsPage from "@/components/testimonial";

export default function Home() {
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-teal-50">
      <WaterLoader />
      <Navbar />
      <AnnouncementBar />

      {/* Hero Section with Carousel */}
      <section className="relative pt-16">
        {/* Option 1: Use Carousel with default images from the component */}
        {/* <Carousel /> */}
        <CarouselWindowResponsive />

        {/* Option 2: Or pass custom images as props */}
        {/* <Carousel customImages={customImages} /> */}

        {/* CTA Button */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            onClick={() => setIsPricingOpen(true)}
            className="cursor-pointer bg-linear-to-r from-violet-800 to-orange-600 text-white font-bold text-md rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center space-x-2 md:px-8 md:py-4 px-2  group"
          >
            <span className="px-4 py-2 md:text-lg">VIEW PRICING</span>
            <ArrowDownCircle className="group-hover:animate-bounce" size={24} />
          </motion.button>
        </div>
      </section>

      {/* Pricing Modal */}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />

      {/* Map Section */}

      <VideoAai />
      <MapSection />
      <div>{/* <PersistentReactionCounter /> */}</div>
      {/* Footer */}
      <TestimonialsPage />

      <Footer />
    </main>
  );
}
