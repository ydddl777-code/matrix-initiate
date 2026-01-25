import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  animate?: boolean;
}

export const Logo = ({ className, animate = true }: LogoProps) => {
  return (
    <div className={cn("text-center", className)}>
      {/* Main Logo Text - Royal Purple */}
      <h1 
        className={cn(
          "font-display text-6xl md:text-8xl font-black tracking-[0.3em] text-primary",
          "text-glow-purple",
          animate && "animate-glow-pulse"
        )}
      >
        S.W.H.P.
      </h1>
      
      {/* Subtitle - Gold */}
      <div className="mt-4 space-y-1">
        <p className="font-ceremonial text-lg md:text-xl tracking-[0.2em] text-secondary uppercase">
          Spiritual Wickedness
        </p>
        <p className="font-ceremonial text-sm md:text-base tracking-[0.25em] text-muted-foreground uppercase">
          in High Places
        </p>
      </div>
      
      {/* Decorative line - Gold */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-secondary to-transparent" />
        <div className="w-2 h-2 rotate-45 border border-secondary bg-secondary/20" />
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-secondary to-transparent" />
      </div>
      
      {/* Headquarters tag */}
      <p className="mt-4 font-terminal text-xs tracking-widest text-muted-foreground">
        [ THE HEADQUARTERS • EAST NEW YORK ]
      </p>
    </div>
  );
};
