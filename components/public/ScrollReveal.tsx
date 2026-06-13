"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-in" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom-in";
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
  threshold = 0.1,
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

  const getAnimationStyles = () => {
    const baseStyle = {
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      willChange: "transform, opacity",
    };

    if (isVisible) {
      return {
        ...baseStyle,
        opacity: 1,
        transform: "translate(0, 0) scale(1)",
      };
    }

    // Initial styles
    let transform = "";
    switch (animation) {
      case "slide-up":
        transform = "translateY(32px)";
        break;
      case "slide-down":
        transform = "translateY(-32px)";
        break;
      case "slide-left":
        transform = "translateX(32px)";
        break;
      case "slide-right":
        transform = "translateX(-32px)";
        break;
      case "zoom-in":
        transform = "scale(0.96)";
        break;
      default:
        transform = "none";
    }

    return {
      ...baseStyle,
      opacity: 0,
      transform,
    };
  };

  return (
    <div
      ref={ref}
      style={getAnimationStyles()}
      className={cn("transition-all duration-700 ease-out", className)}
    >
      {children}
    </div>
  );
}
