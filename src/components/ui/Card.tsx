import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export default function Card({ className, hover = true, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-navy-600/50 bg-navy-800/50 backdrop-blur-sm p-6",
        hover && "transition-all duration-300 hover:border-electric/30 hover:bg-navy-800/80 hover:shadow-[0_0_40px_rgba(0,212,255,0.05)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
