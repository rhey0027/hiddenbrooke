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

interface CarouselWindowResponsiveProps {
  images?: string[];
  size?: "small" | "medium" | "large";
}

const CarouselWindowResponsive = ({
  images: customImages,
  size = "large",
}: CarouselWindowResponsiveProps) => {
  const LOCAL_IMAGES = [
    "/images/pic1.jpg",
    "/images/pic2.jpg",
    "/images/pic3.jpg",
    "/images/pic4.jpg",
    "/images/pic5.jpg",
    "/images/pic6.jpg",
    "/images/pic7.jpg",
    "/images/pic8.jpg",
    "/images/pic9.jpg",
    "/images/pic10.jpg",
    "/images/pic11.jpg",
    "/images/pic12.jpg",
    "/images/pic13.jpg",
    "/images/pic14.jpg",
    "/images/pic15.jpg",
    "/images/pic16.jpg",
    "/images/pic17.jpg",
    "/images/pic18.jpg",
    "/images/pic19.jpg",
    "/images/pic20.jpg",
    "/images/pic21.jpg",
    "/images/pic22.jpg",
    "/images/pic23.jpg",
    "/images/pic24.jpg",
    "/images/pic25.jpg",
    "/images/pic26.jpg",
    "/images/pic27.jpg",
    "/images/pic28.jpg",
    "/images/pic29.jpg",
  ];
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
      iconSize: 24,
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
        relative mx-auto mt-24 rounded-xl overflow-hidden shadow-xl border border-gray-200
        transition-all duration-300 ease-in-out
        ${
          isFullscreen
            ? "fixed inset-4 z-50 max-w-none w-auto h-auto rounded-none"
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
              quality={isFullscreen ? 90 : 80}
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
              className="bg-white/80 hover:bg-white text-gray-800 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg z-20"
              style={{ padding: config.arrows }}
              aria-label="Previous slide"
            >
              <ChevronLeft size={config.iconSize} />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white/80 hover:bg-white text-gray-800 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg z-20"
              style={{ padding: config.arrows }}
              aria-label="Next slide"
            >
              <ChevronRight size={config.iconSize} />
            </button>
          </div>

          {/* Top Controls */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
            {/* Slide Counter */}
            <div className="bg-black/50 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Control Buttons */}
            <div className="flex gap-2">
              <button
                onClick={toggleAutoPlay}
                className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all hover:scale-110 backdrop-blur-sm"
                aria-label={
                  isAutoPlaying ? "Pause slideshow" : "Play slideshow"
                }
              >
                {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all hover:scale-110 backdrop-blur-sm"
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
                      ? "bg-white w-8 h-2"
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
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-6 py-3 rounded-full backdrop-blur-sm z-20">
          <span className="text-sm">
            Press ESC or click the maximize button to exit
          </span>
        </div>
      )}
    </div>
  );
};

export default CarouselWindowResponsive;
