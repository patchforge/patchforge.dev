import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "electric" | "forge";
}

export default function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        {
          "bg-navy-700/50 text-gray-300 border border-navy-600/50": variant === "default",
          "bg-electric/10 text-electric border border-electric/20": variant === "electric",
          "bg-forge/10 text-forge border border-forge/20": variant === "forge",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
