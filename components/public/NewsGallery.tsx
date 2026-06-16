"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

interface NewsGalleryProps {
  images: string[] | null;
}

export function NewsGallery({ images }: NewsGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="mt-12 border-t border-neutral-100 pt-10">
      <h3 className="font-display text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
        <span>📸</span> Thư viện hình ảnh thực tế
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images.map((url, idx) => (
          <div
            key={`${url}-${idx}`}
            onClick={() => setSelectedImage(url)}
            className="group relative aspect-video rounded-2xl overflow-hidden border border-neutral-200/60 bg-neutral-100 cursor-zoom-in hover-lift shadow-xs hover:shadow-md transition-all duration-300"
          >
            <Image
              src={url}
              alt={`Gallery image ${idx + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 30vw"
            />
            {/* Overlay icon on hover */}
            <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="p-2.5 bg-white/95 backdrop-blur-xs rounded-full shadow-lg text-neutral-800 scale-90 group-hover:scale-100 transition-transform duration-300">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Modal Modal view */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-neutral-950/90 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in cursor-zoom-out"
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 active:scale-95 text-white p-2.5 rounded-full backdrop-blur-md transition-all z-55"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal image container */}
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Expanded gallery view"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl animate-scale-in"
            />
          </div>
        </div>
      )}
    </div>
  );
}
