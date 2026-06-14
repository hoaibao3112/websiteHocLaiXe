"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?:
    | "fade-in"
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right"
    | "zoom-in"
    | "scale-in"
    | "blur-in";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  animation = "slide-up",
  delay = 0,
  duration = 700,
  threshold = 0.08,
  once = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  const getAnimationStyles = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      transitionDuration: `${duration}ms`,
      transitionDelay: isVisible ? `${delay}ms` : "0ms",
      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      willChange: "transform, opacity, filter",
    };

    if (isVisible) {
      return {
        ...baseStyle,
        opacity: 1,
        transform: "translate(0, 0) scale(1)",
        filter: "blur(0px)",
      };
    }

    // Initial (hidden) states
    const hiddenMap: Record<
      NonNullable<ScrollRevealProps["animation"]>,
      React.CSSProperties
    > = {
      "fade-in": { opacity: 0, transform: "none", filter: "blur(0px)" },
      "slide-up": { opacity: 0, transform: "translateY(36px)", filter: "blur(0px)" },
      "slide-down": { opacity: 0, transform: "translateY(-36px)", filter: "blur(0px)" },
      "slide-left": { opacity: 0, transform: "translateX(40px)", filter: "blur(0px)" },
      "slide-right": { opacity: 0, transform: "translateX(-40px)", filter: "blur(0px)" },
      "zoom-in": { opacity: 0, transform: "scale(0.93)", filter: "blur(0px)" },
      "scale-in": { opacity: 0, transform: "scale(0.82)", filter: "blur(0px)" },
      "blur-in": { opacity: 0, transform: "translateY(16px)", filter: "blur(8px)" },
    };

    return {
      ...baseStyle,
      ...hiddenMap[animation],
    };
  };

  return (
    <div
      ref={ref}
      style={getAnimationStyles()}
      className={cn("transition-all", className)}
    >
      {children}
    </div>
  );
}
