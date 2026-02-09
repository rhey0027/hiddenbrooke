// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";

// // Define your local images (add all your image filenames here)
// const LOCAL_IMAGES = [
//   "/images/pic1.jpg",
//   "/images/pic2.jpg",
//   "/images/pic3.jpg",
//   "/images/pic4.jpg",
//   "/images/pic5.jpg",
// ];

// // Fallback images in case local images don't load
// const FALLBACK_IMAGES = [
//   "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=2070",
//   "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2070",
//   "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=2070",
// ];

// interface CarouselProps {
//   customImages?: string[]; // Optional: if you want to pass images as props
// }

// const Carousel = ({ customImages }: CarouselProps) => {
//   // Use custom images if provided, otherwise use local images
//   const images = customImages?.length ? customImages : LOCAL_IMAGES;
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [loadedImages, setLoadedImages] = useState<boolean[]>(
//     new Array(images.length).fill(false),
//   );
//   const [imageErrors, setImageErrors] = useState<boolean[]>(
//     new Array(images.length).fill(false),
//   );

//   const nextSlide = useCallback(() => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1,
//     );
//   }, [images.length]);

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1,
//     );
//   };

//   const goToSlide = (index: number) => {
//     setCurrentIndex(index);
//   };

//   const handleImageLoad = (index: number) => {
//     setLoadedImages((prev) => {
//       const newLoaded = [...prev];
//       newLoaded[index] = true;
//       return newLoaded;
//     });
//   };

//   const handleImageError = (index: number) => {
//     setImageErrors((prev) => {
//       const newErrors = [...prev];
//       newErrors[index] = true;
//       return newErrors;
//     });
//   };

//   // Get the actual image source - use fallback if local image fails
//   const getImageSource = (index: number) => {
//     if (imageErrors[index] && index < FALLBACK_IMAGES.length) {
//       return FALLBACK_IMAGES[index];
//     }
//     return images[index];
//   };

//   useEffect(() => {
//     if (!isAutoPlaying || images.length === 0) return;

//     const interval = setInterval(() => {
//       nextSlide();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [isAutoPlaying, nextSlide, images.length]);

//   // Handle empty images array
//   if (images.length === 0) {
//     return (
//       <div className="min-h-screen max-w-7xl bg-linear-to-br from-blue-50 to-teal-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-4xl text-gray-600 mb-4">🏨</div>
//           <h2 className="text-2xl font-semibold text-gray-700">
//             No images available
//           </h2>
//           <p className="text-gray-500 mt-2">
//             Please add images to the carousel
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="relative w-full h-screen overflow-hidden"
//       onMouseEnter={() => setIsAutoPlaying(false)}
//       onMouseLeave={() => setIsAutoPlaying(true)}
//     >
//       {/* Carousel Images */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentIndex}
//           initial={{ opacity: 0, scale: 1.1 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.9 }}
//           transition={{ duration: 0.7, ease: "easeInOut" }}
//           className="absolute inset-0"
//         >
//           {/* Loading skeleton */}
//           {!loadedImages[currentIndex] && !imageErrors[currentIndex] && (
//             <div className="absolute inset-0 bg-linear-to-br from-blue-200 via-teal-200 to-emerald-200 animate-pulse" />
//           )}

//           {/* Image Container */}
//           <div className="relative w-full h-full">
//             <Image
//               src={getImageSource(currentIndex)}
//               alt={`Resort view ${currentIndex + 1}`}
//               fill
//               className="object-cover"
//               priority={currentIndex === 0}
//               quality={90}
//               sizes="100vw"
//               onLoad={() => handleImageLoad(currentIndex)}
//               onError={() => handleImageError(currentIndex)}
//             />
//           </div>

//           {/* linear Overlay */}
//           <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/60" />
//         </motion.div>
//       </AnimatePresence>

//       {/* Navigation Buttons */}
//       <button
//         onClick={prevSlide}
//         className="cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10 disabled:opacity-50 "
//         disabled={images.length <= 1}
//         aria-label="Previous slide"
//       >
//         <ChevronLeft size={24} />
//       </button>
//       <button
//         onClick={nextSlide}
//         className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10 disabled:opacity-50 "
//         disabled={images.length <= 1}
//         aria-label="Next slide"
//       >
//         <ChevronRight size={24} />
//       </button>

//       {/* Image Counter */}
//       <div className="absolute top-6 right-6 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10">
//         {currentIndex + 1} / {images.length}
//       </div>

//       {/* Dots Indicator */}
//       {images.length > 1 && (
//         <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
//           {images.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === currentIndex
//                   ? "bg-white scale-125"
//                   : "bg-white/50 hover:bg-white/80"
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}

//       {/* Hero Content */}
//       <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-7">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="text-center"
//         >
//           <h2 className="text-5xl md:text-5xl font-serif font-bold -mt-17 tracking-wider">
//             {/* Welcome to HiddenBrooke */}
//             Bienvenidos a Hiddenbrooke Resort
//           </h2>
//           <p className="text-xl md:text-2xl font-light mt-8 max-w-7xl">
//             {/* Experience luxury amidst nature&apos;s finest. A sanctuary where
//             tranquility meets elegance. */}
//             Experimenta el lujo entre lo mejor de la naturaleza. Un refugio
//             donde la serenidad se encuentra con la elegancia
//           </p>
//           <div className="flex items-center justify-center space-x-4 py-20 text-lg">
//             <span className="flex items-center">
//               <span className="w-3 h-3 bg-green-400  rounded-full mr-2 animate-pulse"></span>
//               {/* Currently Viewing: Photo {currentIndex + 1} */}
//               Mirando la foto este momento: Foto {currentIndex + 1}
//             </span>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Carousel;
