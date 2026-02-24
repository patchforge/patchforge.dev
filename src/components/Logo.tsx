import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "icon" | "wordmark";
  size?: "sm" | "md" | "lg";
  theme?: "dark" | "light";
  className?: string;
}

const sizes = {
  sm: { icon: 28, text: "text-lg", tagline: false },
  md: { icon: 36, text: "text-2xl", tagline: false },
  lg: { icon: 56, text: "text-4xl", tagline: true },
} as const;

/**
 * PatchForge hammer + git merge icon rendered inline as SVG.
 * Uses unique gradient IDs per instance to avoid conflicts when
 * multiple logos appear on the same page.
 */
function HammerIcon({ size, id }: { size: number; id: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-hg`} x1="20" y1="15" x2="100" y2="55">
          <stop offset="0%" stopColor="#00E0FF" />
          <stop offset="100%" stopColor="#0088CC" />
        </linearGradient>
        <linearGradient id={`${id}-hd`} x1="55" y1="50" x2="65" y2="85">
          <stop offset="0%" stopColor="#0099DD" />
          <stop offset="100%" stopColor="#006699" />
        </linearGradient>
        <filter id={`${id}-glow`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Hammer head */}
      <rect x="24" y="22" width="72" height="24" rx="5" fill={`url(#${id}-hg)`} />
      <rect x="24" y="22" width="72" height="4" rx="2" fill="white" opacity="0.15" />
      {/* Sparks */}
      <circle cx="20" cy="30" r="2.5" fill="#FF6B2B" filter={`url(#${id}-glow)`} />
      <circle cx="14" cy="24" r="1.5" fill="#FF6B2B" opacity="0.7" />
      <circle cx="17" cy="36" r="1" fill="#FF8844" opacity="0.5" />
      <circle cx="103" cy="26" r="1.8" fill="#FF6B2B" opacity="0.6" />
      <circle cx="108" cy="32" r="1" fill="#FF8844" opacity="0.4" />
      {/* Handle */}
      <rect x="52" y="46" width="16" height="30" rx="5" fill={`url(#${id}-hd)`} />
      <line x1="55" y1="54" x2="63" y2="54" stroke="white" strokeWidth="0.5" opacity="0.2" />
      <line x1="55" y1="58" x2="63" y2="58" stroke="white" strokeWidth="0.5" opacity="0.2" />
      <line x1="55" y1="62" x2="63" y2="62" stroke="white" strokeWidth="0.5" opacity="0.2" />
      {/* Git merge nodes */}
      <circle cx="38" cy="86" r="5" stroke="#00D4FF" strokeWidth="2.5" fill="#0A0F1E" />
      <circle cx="38" cy="86" r="2" fill="#00D4FF" />
      <circle cx="82" cy="86" r="5" stroke="#00D4FF" strokeWidth="2.5" fill="#0A0F1E" />
      <circle cx="82" cy="86" r="2" fill="#00D4FF" />
      <circle cx="60" cy="102" r="6" stroke="#FF6B2B" strokeWidth="2.5" fill="#0A0F1E" />
      <circle cx="60" cy="102" r="2.5" fill="#FF6B2B" />
      {/* Merge lines */}
      <line x1="42" y1="90" x2="55" y2="97" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" />
      <line x1="78" y1="90" x2="65" y2="97" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="76" x2="60" y2="96" stroke="#006699" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" opacity="0.4" />
    </svg>
  );
}

let instanceCounter = 0;

export default function Logo({
  variant = "full",
  size = "md",
  theme = "dark",
  className,
}: LogoProps) {
  const config = sizes[size];
  const id = `pf-logo-${++instanceCounter}`;

  const textColor = theme === "dark" ? "text-white" : "text-navy-950";

  if (variant === "icon") {
    return (
      <span className={cn("inline-flex items-center", className)}>
        <HammerIcon size={config.icon} id={id} />
      </span>
    );
  }

  if (variant === "wordmark") {
    return (
      <span className={cn("inline-flex flex-col", className)}>
        <span className={cn("font-display font-bold tracking-tight", config.text, textColor)}>
          Patch<span className="text-electric">Forge</span>
        </span>
        {config.tagline && (
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500 mt-0.5">
            Autonomous AI Engineer
          </span>
        )}
      </span>
    );
  }

  // full variant: icon + text
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <HammerIcon size={config.icon} id={id} />
      <span className="inline-flex flex-col">
        <span className={cn("font-display font-bold tracking-tight leading-none", config.text, textColor)}>
          Patch<span className="text-electric">Forge</span>
        </span>
        {config.tagline && (
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500 mt-1">
            Autonomous AI Engineer
          </span>
        )}
      </span>
    </span>
  );
}
