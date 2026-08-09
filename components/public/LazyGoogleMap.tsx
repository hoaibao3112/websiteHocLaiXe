"use client";

import { useEffect, useRef, useState } from "react";

interface LazyGoogleMapProps {
  className?: string;
}

export function LazyGoogleMap({ className = "" }: LazyGoogleMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {isLoaded ? (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.63942007817!2d106.02196657579737!3d10.407989989718872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310aa8593d6e5229%3A0xe5a36ad2e245a498!2zVHLGsOG7nW5nIEzDoWkgWGUgQ2hp4bq_biBUaOG6r25n!5e0!3m2!1svi!2s!4v1718278000000!5m2!1svi!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bản đồ Trường lái xe Chiến Thắng"
          className="absolute inset-0"
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-neutral-600 border-t-amber-500 rounded-full animate-spin mx-auto mb-2" />
            <span className="text-neutral-500 text-[10px] font-medium">Đang tải bản đồ...</span>
          </div>
        </div>
      )}
      <a
        href="https://maps.google.com/?q=168+QL1A,+Ấp+Phú+Hòa,+Xã+Mỹ+Thành,+Đồng+Tháp+(Tiền+Giang+Cũ),+Việt+Nam"
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors cursor-pointer"
        title="Mở rộng Google Maps"
      />
    </div>
  );
}
