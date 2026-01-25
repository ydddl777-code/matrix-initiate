import { useState } from "react";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { Logo } from "@/components/Logo";
import { HUDFrame } from "@/components/HUDFrame";
import { BootSequence } from "@/components/BootSequence";
import { TacticalButton } from "@/components/ui/tactical-button";

type ScreenState = "idle" | "booting" | "ready";

const Index = () => {
  const [screenState, setScreenState] = useState<ScreenState>("idle");

  const handleInitiate = () => {
    setScreenState("booting");
  };

  const handleBootComplete = () => {
    setScreenState("ready");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <BackgroundEffects />
      
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <HUDFrame className="animate-fade-in">
          <div className="text-center py-8 md:py-12">
            {/* Logo - Always visible */}
            <Logo animate={screenState === "idle"} />
            
            {/* Content based on state */}
            <div className="mt-12 min-h-[200px] flex flex-col items-center justify-center">
              {screenState === "idle" && (
                <div className="space-y-8 animate-fade-in">
                  <p className="font-terminal text-sm text-muted-foreground tracking-wide">
                    AWAITING AUTHORIZATION...
                  </p>
                  <TacticalButton
                    variant="initiate"
                    size="xl"
                    onClick={handleInitiate}
                  >
                    INITIATE PROTOCOL
                  </TacticalButton>
                  <p className="font-terminal text-xs text-muted-foreground/80">
                    "For we wrestle not against flesh and blood..."
                    <br />
                    <span className="text-secondary">— Ephesians 6:12</span>
                  </p>
                </div>
              )}

              {screenState === "booting" && (
                <div className="w-full animate-fade-in">
                  <BootSequence onComplete={handleBootComplete} />
                </div>
              )}

              {screenState === "ready" && (
                <div className="space-y-8 animate-fade-in">
                  <div className="space-y-2">
                    <p className="font-display text-2xl text-primary text-glow-purple">
                      SYSTEM ONLINE
                    </p>
                    <p className="font-terminal text-sm text-secondary">
                      Prophet Gad AI Interface Active
                    </p>
                  </div>
                  
                  <div className="p-4 border border-primary/30 bg-primary/5 rounded">
                    <p className="font-terminal text-xs text-foreground">
                      PGAI_STATUS: <span className="text-primary font-bold">OPERATIONAL</span>
                    </p>
                    <p className="font-terminal text-xs text-foreground mt-1">
                      WARFARE_MODE: <span className="text-secondary font-bold">STANDBY</span>
                    </p>
                  </div>

                  <TacticalButton
                    variant="primary"
                    size="lg"
                    onClick={() => setScreenState("idle")}
                  >
                    ENTER COMMAND CENTER
                  </TacticalButton>
                </div>
              )}
            </div>

            {/* Status bar */}
            <div className="mt-12 pt-4 border-t border-primary/20">
              <div className="flex justify-between items-center text-xs font-terminal text-muted-foreground">
                <span>SYS: {screenState.toUpperCase()}</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  SECURE CONNECTION
                </span>
                <span>PGAI v1.0</span>
              </div>
            </div>
          </div>
        </HUDFrame>
      </div>

      {/* Corner HUD elements - Dark text on light background */}
      <div className="fixed top-4 left-4 font-terminal text-xs text-muted-foreground">
        <div>LAT: 33.7490° N</div>
        <div>LON: 84.3880° W</div>
      </div>
      <div className="fixed top-4 right-4 font-terminal text-xs text-muted-foreground text-right">
        <div>FREQ: 777 MHz</div>
        <div>SIGNAL: ████████░░</div>
      </div>
      <div className="fixed bottom-4 left-4 font-terminal text-xs text-muted-foreground">
        <div>© PROJECT S.W.H.P.</div>
      </div>
      <div className="fixed bottom-4 right-4 font-terminal text-xs text-muted-foreground text-right">
        <div>ENCRYPTED</div>
      </div>
    </div>
  );
};

export default Index;
