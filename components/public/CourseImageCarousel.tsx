"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface CourseImageCarouselProps {
  defaultImage?: string | null;
}

const GALLERY_IMAGES = [
  "z7931449256666_28bc1c7fac33c6795e4ea637cea014df.jpg",
  "z7931449256722_f68d2d8a61597e5601ad303e1b43b71b.jpg",
  "z7931449256723_0f10fff5234904e8d3c2fc9b690accc7.jpg",
  "z7931449256726_173bfcdc7a37092ae06a1e3d8ad037f8.jpg",
  "z7931449256732_bd1a6ded33d2aa98fff4bcf515bf47ec.jpg",
  "z7931449256734_b2719dcc5a8acf6da7e977076933ed40.jpg",
  "z7931449256735_139e4fb63dcabe74c1d61cf441adca34.jpg",
  "z7931449256736_9b1880c14e5e69502477b800eeba8507.jpg",
  "z7931449256742_9221f841c0af80eb4fa90a096d893bbe.jpg",
  "z7931449256745_74da91f8911e46da92a28a7a52f496e2.jpg",
  "z7931449256746_6c0aa0026e72c0a19ddbb533dd74a175.jpg",
  "z7931449256747_dd28e3cb0fef0ca6321cb51e44219084.jpg",
  "z7931449256748_27e59b349a4c9c181a2ccd00d96225f4.jpg",
  "z7931449256749_74705a7113f8aa359f14675ca948389a.jpg",
  "z7931449256753_51435d1290dd130fa0f009efce9074cd.jpg",
  "z7931449256755_a96798908aaefe2cb2269da418207c67.jpg",
  "z7931449256757_15b48ace73782a7dd03944240d2cc142.jpg",
  "z7931449256763_57d1ea422d6112c024bd743fec68c2bb.jpg",
  "z7931449286605_e04a0342c6a1bd1a58a6ac2c5179e9c8.jpg",
  "z7931449286607_2d025b44c5e311b6368c25874ef5954e.jpg",
  "z7931449286608_e78c7cec484000d0e002e34ecaca59c3.jpg",
];

export function CourseImageCarousel({ defaultImage }: CourseImageCarouselProps) {
  // Combine default image if exists with the gallery images
  const images = defaultImage
    ? [defaultImage, ...GALLERY_IMAGES.map((img) => `/course-gallery/${img}`)]
    : GALLERY_IMAGES.map((img) => `/course-gallery/${img}`);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Autoplay functionality
  useEffect(() => {
    if (!isPlaying || isLightboxOpen) return;
    const interval = setInterval(nextSlide, 3500); // 3.5 seconds
    return () => clearInterval(interval);
  }, [isPlaying, isLightboxOpen, nextSlide]);

  return (
    <div className="space-y-4">
      {/* Main Slide Card */}
      <div
        className="relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-900 shadow-md group border border-neutral-100/60"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        <Image
          src={images[currentIndex]}
          alt={`Hình ảnh khóa học ${currentIndex + 1}`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
          sizes="(max-width: 1024px) 100vw, 30vw"
          priority
        />

        {/* Top Gradient Overlay */}
        <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/40 to-transparent p-4 flex items-center justify-between text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-xs">
            Ảnh {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            className="p-1.5 rounded-lg bg-black/40 hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
            title="Xem toàn màn hình"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/25 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/25 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 translate-x-[10px] group-hover:translate-x-0 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Progress Bar indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            key={currentIndex}
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all"
            style={{
              animation: isPlaying && !isLightboxOpen ? "shimmerProgress 3.5s linear forwards" : "none",
              width: isPlaying && !isLightboxOpen ? "100%" : "0%",
            }}
          />
        </div>
      </div>

      {/* Thumbnails Navigation Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x select-none">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative w-16 aspect-video rounded-lg overflow-hidden border-2 flex-shrink-0 snap-start cursor-pointer transition-all ${
              idx === currentIndex
                ? "border-amber-500 scale-95 shadow-md"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Lightbox / Zoom Overlay */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 select-none">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 z-[110] p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Lightbox slide */}
          <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden">
            <Image
              src={images[currentIndex]}
              alt={`Hình ảnh zoom ${currentIndex + 1}`}
              fill
              className="object-contain"
            />

            {/* Navigation Arrows for Lightbox */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Bottom photo title */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-md">
              Ảnh thực tế tại Trường Chiến Thắng ({currentIndex + 1} / {images.length})
            </div>
          </div>
        </div>
      )}

      {/* Progress Animation Style injection */}
      <style jsx global>{`
        @keyframes shimmerProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
