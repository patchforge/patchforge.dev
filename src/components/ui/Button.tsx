"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center font-display font-semibold rounded-lg transition-all duration-300 cursor-pointer",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-electric/50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-electric text-navy-950 hover:bg-electric-light hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] active:scale-[0.98]":
              variant === "primary",
            "bg-navy-700/50 text-white border border-navy-600 hover:border-electric/40 hover:bg-navy-700 active:scale-[0.98]":
              variant === "secondary",
            "text-gray-300 hover:text-white hover:bg-white/5 active:scale-[0.98]":
              variant === "ghost",
          },
          {
            "text-sm px-4 py-2": size === "sm",
            "text-sm px-6 py-3": size === "md",
            "text-base px-8 py-4": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
