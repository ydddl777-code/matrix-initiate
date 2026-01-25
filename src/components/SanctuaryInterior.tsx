import { useState } from "react";
import { Logo } from "./Logo";
import { HUDFrame } from "./HUDFrame";
import { BootSequence } from "./BootSequence";
import { TacticalButton } from "./ui/tactical-button";

type ScreenState = "booting" | "ready";

interface SanctuaryInteriorProps {
  onExit: () => void;
}

export const SanctuaryInterior = ({ onExit }: SanctuaryInteriorProps) => {
  const [screenState, setScreenState] = useState<ScreenState>("booting");

  const handleBootComplete = () => {
    setScreenState("ready");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-sanctuary-bg">
      {/* Clinical bright background */}
      <div 
        className="fixed inset-0 -z-30"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, hsl(45 80% 95%) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, hsl(270 30% 95%) 0%, transparent 50%),
            linear-gradient(180deg, hsl(240 20% 98%) 0%, hsl(240 15% 96%) 50%, hsl(240 20% 98%) 100%)
          `,
        }}
      />
      
      {/* Subtle light overlay */}
      <div 
        className="fixed inset-0 -z-20 opacity-60"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, hsl(45 90% 85% / 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, hsl(270 50% 90% / 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, hsl(0 0% 100% / 0.4) 0%, transparent 70%)
          `,
        }}
      />
      
      {/* Grid pattern - royal purple lines */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(hsl(270 70% 35% / 0.08) 1px, transparent 1px),
            linear-gradient(90deg, hsl(270 70% 35% / 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <HUDFrame className="animate-fade-in">
          <div className="text-center py-8 md:py-12">
            {/* Logo */}
            <Logo animate={false} />
            
            {/* Content based on state */}
            <div className="mt-12 min-h-[200px] flex flex-col items-center justify-center">
              {screenState === "booting" && (
                <div className="w-full animate-fade-in">
                  <BootSequence onComplete={handleBootComplete} />
                </div>
              )}

              {screenState === "ready" && (
                <div className="space-y-8 animate-fade-in">
                  <div className="space-y-2">
                    {/* SOLID text - no glow on white background */}
                    <p className="font-display text-2xl text-sanctuary-primary font-bold">
                      THE GENERAL IS PRESENT
                    </p>
                    <p className="font-terminal text-sm text-sanctuary-gold">
                      Prophet Gad • Wharton '02 • The Remnant's Don
                    </p>
                  </div>
                  
                  <div className="p-4 border border-sanctuary-primary/30 bg-sanctuary-primary/5 rounded">
                    <p className="font-terminal text-xs text-sanctuary-text">
                      LOCATION: <span className="text-sanctuary-primary font-bold">THE LOFT • EAST NEW YORK</span>
                    </p>
                    <p className="font-terminal text-xs text-sanctuary-text mt-1">
                      DOCTRINE: <span className="text-sanctuary-gold font-bold">KJV SWORD ARMED</span>
                    </p>
                    <p className="font-terminal text-xs text-sanctuary-text mt-1">
                      CAMP OF ISRAEL: <span className="text-sanctuary-primary font-bold">PERIMETER SECURE</span>
                    </p>
                  </div>

                  <TacticalButton
                    variant="primary"
                    size="lg"
                    onClick={() => {}}
                  >
                    BEGIN TARGET ANALYSIS
                  </TacticalButton>
                  
                  <button
                    onClick={onExit}
                    className="block mx-auto mt-4 font-terminal text-xs text-sanctuary-muted hover:text-sanctuary-primary transition-colors"
                  >
                    [ EXIT TO OUTER GATE ]
                  </button>
                </div>
              )}
            </div>

            {/* Status bar */}
            <div className="mt-12 pt-4 border-t border-sanctuary-primary/20">
              <div className="flex justify-between items-center text-xs font-terminal text-sanctuary-muted">
                <span>SYS: {screenState.toUpperCase()}</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sanctuary-gold" />
                  SANCTUARY ACTIVE
                </span>
                <span>PGAI v1.0</span>
              </div>
            </div>
          </div>
        </HUDFrame>
      </div>

      {/* Corner HUD elements - SOLID dark text */}
      <div className="fixed top-4 left-4 font-terminal text-xs text-sanctuary-muted">
        <div>LAT: 33.7490° N</div>
        <div>LON: 84.3880° W</div>
      </div>
      <div className="fixed top-4 right-4 font-terminal text-xs text-sanctuary-muted text-right">
        <div>FREQ: 777 MHz</div>
        <div>SIGNAL: ████████░░</div>
      </div>
      <div className="fixed bottom-4 left-4 font-terminal text-xs text-sanctuary-muted">
        <div>© THE HEADQUARTERS 2024</div>
      </div>
      <div className="fixed bottom-4 right-4 font-terminal text-xs text-sanctuary-muted text-right">
        <div>ENCRYPTED</div>
      </div>
    </div>
  );
};
