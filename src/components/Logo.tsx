import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  animate?: boolean;
}

export const Logo = ({ className, animate = true }: LogoProps) => {
  return (
    <div className={cn("text-center", className)}>
      {/* Main Logo Text - Teal Primary */}
      <h1 
        className={cn(
          "font-display text-6xl md:text-8xl font-black tracking-[0.3em] text-primary italic",
          animate && "animate-glow-pulse"
        )}
        style={{ textShadow: '0 0 20px hsl(175 65% 35% / 0.4)' }}
      >
        S.W.H.P.
      </h1>
      
      {/* Subtitle - Clean Sans-Serif, Bold + Italic */}
      <div className="mt-4 space-y-1">
        <p className="font-display text-lg md:text-xl tracking-[0.15em] text-sanctuary-gold uppercase font-bold italic">
          Spiritual Wickedness
        </p>
        <p className="font-display text-sm md:text-base tracking-[0.2em] text-sanctuary-text uppercase font-bold italic">
          in High Places
        </p>
      </div>
      
      {/* Decorative line - Gold */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-sanctuary-gold to-transparent" />
        <div className="w-2 h-2 rotate-45 border border-sanctuary-gold bg-sanctuary-gold/20" />
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-sanctuary-gold to-transparent" />
      </div>
      
      {/* Headquarters tag - Undisclosed */}
      <p className="mt-4 font-terminal text-xs tracking-widest text-sanctuary-muted font-bold">
        [ UNDISCLOSED HEADQUARTERS ]
      </p>
    </div>
  );
};
