"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Maximize2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CarouselWindowResponsiveProps } from "@/types/types";
import { LOCAL_IMAGES } from "@/def/definition";

const CarouselWindowResponsive = ({
  images: customImages,
  size = "large",
}: CarouselWindowResponsiveProps) => {
  const images = customImages?.length ? customImages : LOCAL_IMAGES;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Size configurations
  const sizeConfig = {
    small: {
      container: "max-w-2xl h-120",
      arrows: "p-2",
      iconSize: 18,
    },
    medium: {
      container: "max-w-5xl h-150",
      arrows: "p-2.5",
      iconSize: 20,
    },
    large: {
      container: "max-w-7xl h-180",
      arrows: "p-3",
      iconSize: 34,
    },
  };

  const config = sizeConfig[size];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, images.length]);

  if (images.length === 0) {
    return (
      <div
        className={`w-full ${config.container} rounded-xl overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center`}
      >
        <div className="text-center p-6">
          <div className="text-3xl text-gray-400 mb-3">📷</div>
          <p className="text-gray-600">Add images to see carousel</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        relative mx-auto mt-18 rounded-xl overflow-hidden shadow-xl border border-gray-200
        transition-all duration-300 ease-in-out
        ${
          isFullscreen
            ? "fixed inset-0 z-100 w-screen h-screen rounded-none bg-sky-500"
            : `${config.container}`
        }
      `}
    >
      {/* Carousel Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={images[currentIndex]}
              alt={`Resort view ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority={currentIndex === 0}
              quality={isFullscreen ? 75 : 80}
              sizes={
                isFullscreen ? "100vw" : "(max-width: 768px) 100vw, 1024px"
              }
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      {images.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <button
              onClick={prevSlide}
              className="bg-white/60 hover:bg-sky-400 text-violet-800 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg z-20 cursor-pointer"
              style={{ padding: config.arrows }}
              aria-label="Previous slide"
            >
              <ChevronLeft size={config.iconSize} />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white/60 hover:bg-sky-400 text-violet-800 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg z-20 cursor-pointer "
              style={{ padding: config.arrows }}
              aria-label="Next slide"
            >
              <ChevronRight size={config.iconSize} />
            </button>
          </div>

          {/* Top Controls */}
          <div className="absolute top-4 left-8 right-8 flex justify-between items-center z-20">
            {/* Slide Counter */}
            <div className="bg-black/50 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
              {currentIndex + 1} : {images.length}
            </div>

            {/* Control Buttons */}
            <div className="flex gap-4">
              <button
                onClick={toggleAutoPlay}
                className="bg-white hover:bg-green-500 text-red-700 rounded-full p-2 transition-all hover:scale-110 backdrop-blur-sm cursor-pointer"
                aria-label={
                  isAutoPlaying ? "Pause slideshow" : "Play slideshow"
                }
              >
                {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all hover:scale-110 backdrop-blur-sm cursor-pointer"
                aria-label={
                  isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                }
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  transition-all duration-300 rounded-full
                  ${
                    index === currentIndex
                      ? "bg-orange-500 w-8 h-2"
                      : "bg-white/50 w-2 h-2 hover:bg-white/80"
                  }
                `}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold -mt-14 tracking-wider">
                {/* Welcome to HiddenBrooke */}
                Bienvenidos a{" "}
                <span className="font-[Style_Script] text-yellow-300 text-7xl text-shadow-lg">
                  Hiddenbrooke{" "}
                </span>
                Resort
              </h2>
              <p className="text-lg md:text-2xl font-light mt-8 max-w-7xl">
                {/* Experience luxury amidst nature&apos;s finest. A sanctuary where
             tranquility meets elegance. */}
                Experimenta el lujo entre lo mejor de la naturaleza. Un refugio
                donde la serenidad se encuentra con la elegancia
              </p>
              <div className="flex items-center justify-center space-x-4 py-20 text-lg">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-green-400  rounded-full mr-2 animate-pulse"></span>
                  <p className="text-sm">
                    Currently Viewing: Photo {currentIndex + 1}
                    {/* Mirando la foto este momento: Foto {currentIndex + 1} */}
                  </p>
                </span>
              </div>
            </motion.div>
          </div>
        </>
      )}

      {/* Fullscreen overlay text */}
      {isFullscreen && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-6 py-3 rounded-full backdrop-blur-sm z-20">
          <span className="text-sm">
            Press ESC key or man click el maximize button para sale, Gracias!
            {/* Press ESC or click the maximize button to exit */}
          </span>
        </div>
      )}
    </div>
  );
};

export default CarouselWindowResponsive;
