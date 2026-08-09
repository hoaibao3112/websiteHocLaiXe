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

// Check reduced motion preference once
const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

export function ScrollReveal({
  children,
  className,
  animation = "slide-up",
  delay = 0,
  duration = 700,
  threshold = 0.08,
  once = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(prefersReducedMotion);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(currentRef);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [threshold, once]);

  const getAnimationStyles = (): React.CSSProperties => {
    if (prefersReducedMotion) {
      return { opacity: 1 };
    }

    const baseStyle: React.CSSProperties = {
      transitionProperty: "transform, opacity, filter",
      transitionDuration: `${duration}ms`,
      transitionDelay: isVisible ? `${delay}ms` : "0ms",
      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
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
      className={cn(className)}
    >
      {children}
    </div>
  );
}
