"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const ABOUT_US_IMAGES = [
  "/gallery-1.jpg",
  "/gallery-2.jpg",
  "/gallery-3.jpg",
  "/gallery-4.jpg",
  "/gallery-5.jpg",
  "/gallery-6.jpg",
];

export function AboutUsImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ABOUT_US_IMAGES.length);
  }, []);

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000); // 4 seconds
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl border border-neutral-100">
      <Image
        src={ABOUT_US_IMAGES[currentIndex]}
        alt={`Hình ảnh giới thiệu ${currentIndex + 1}`}
        fill
        className="object-cover transition-opacity duration-1000 ease-in-out"
        sizes="(max-width: 1024px) 100vw, 40vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
      
      {/* Progress indicator dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {ABOUT_US_IMAGES.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? "bg-white w-6" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
