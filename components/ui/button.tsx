import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] duration-100",
          {
            "bg-brand-500 text-white hover:bg-brand-600 shadow-md shadow-brand-500/10":
              variant === "default",
            "bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/10":
              variant === "destructive",
            "border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700":
              variant === "outline",
            "bg-neutral-100 text-neutral-900 hover:bg-neutral-200":
              variant === "secondary",
            "hover:bg-neutral-50 text-neutral-600 hover:text-neutral-900":
              variant === "ghost",
            "text-brand-600 underline-offset-4 hover:underline hover:text-brand-700 p-0":
              variant === "link",
          },
          {
            "h-10 px-4 py-2": size === "default",
            "h-9 px-3 rounded-md": size === "sm",
            "h-11 px-8 rounded-lg": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
