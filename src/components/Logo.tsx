import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  animate?: boolean;
}

export const Logo = ({ className, animate = true }: LogoProps) => {
  return (
    <div className={cn("text-center", className)}>
      {/* Main Logo Text */}
      <h1 
        className={cn(
          "font-display text-6xl md:text-8xl font-black tracking-[0.3em] text-primary",
          "text-glow-gold",
          animate && "animate-glow-pulse"
        )}
      >
        S.W.H.P.
      </h1>
      
      {/* Subtitle */}
      <div className="mt-4 space-y-1">
        <p className="font-ceremonial text-lg md:text-xl tracking-[0.2em] text-secondary uppercase">
          Spiritual Wickedness
        </p>
        <p className="font-ceremonial text-sm md:text-base tracking-[0.25em] text-muted-foreground uppercase">
          in High Places
        </p>
      </div>
      
      {/* Decorative line */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="w-2 h-2 rotate-45 border border-primary bg-primary/20" />
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>
      
      {/* Protocol tag */}
      <p className="mt-4 font-terminal text-xs tracking-widest text-muted-foreground">
        [ TACTICAL WARFARE INTERFACE v1.0 ]
      </p>
    </div>
  );
};
