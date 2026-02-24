import { Shield, Crown, Sword, Star, Flame } from "lucide-react";

type DividerVariant = "shield" | "crown" | "sword" | "star" | "flame";

interface AncientDividerProps {
  variant?: DividerVariant;
  label?: string;
}

const iconMap = {
  shield: Shield,
  crown: Crown,
  sword: Sword,
  star: Star,
  flame: Flame,
};

export const AncientDivider = ({ variant = "shield", label }: AncientDividerProps) => {
  const Icon = iconMap[variant];

  return (
    <div className="flex items-center justify-center gap-3 py-4">
      {/* Left ornamental line */}
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 rotate-45 border border-sanctuary-gold/60" />
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-sanctuary-gold/50" />
        <div className="h-[2px] w-12 bg-gradient-to-r from-sanctuary-gold/50 to-sanctuary-gold" />
      </div>

      {/* Center icon cluster */}
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 12 12" className="w-3 h-3 text-sanctuary-gold/40" fill="currentColor">
          <path d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5 Z" />
        </svg>
        <div className="relative">
          <Icon className="w-5 h-5 text-sanctuary-gold" strokeWidth={1.5} />
        </div>
        {label && (
          <span className="font-terminal text-[9px] text-sanctuary-muted tracking-[0.3em] uppercase font-bold">
            {label}
          </span>
        )}
        <div className="relative">
          <Icon className="w-5 h-5 text-sanctuary-gold" strokeWidth={1.5} />
        </div>
        <svg viewBox="0 0 12 12" className="w-3 h-3 text-sanctuary-gold/40" fill="currentColor">
          <path d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5 Z" />
        </svg>
      </div>

      {/* Right ornamental line */}
      <div className="flex items-center gap-1">
        <div className="h-[2px] w-12 bg-gradient-to-l from-sanctuary-gold/50 to-sanctuary-gold" />
        <div className="h-px w-8 bg-gradient-to-l from-transparent to-sanctuary-gold/50" />
        <div className="w-2 h-2 rotate-45 border border-sanctuary-gold/60" />
      </div>
    </div>
  );
};
