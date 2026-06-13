import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 select-none",
        {
          "border-transparent bg-brand-500 text-white shadow shadow-brand-500/10":
            variant === "default",
          "border-transparent bg-neutral-100 text-neutral-900 hover:bg-neutral-200":
            variant === "secondary",
          "border-transparent bg-red-500 text-white shadow shadow-red-500/10":
            variant === "destructive",
          "border-transparent bg-emerald-500 text-white shadow shadow-emerald-500/10":
            variant === "success",
          "border-transparent bg-amber-500 text-white shadow shadow-amber-500/10":
            variant === "warning",
          "border-neutral-200 text-neutral-900 bg-white": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
