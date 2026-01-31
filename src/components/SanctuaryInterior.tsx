import { useState } from "react";
import { Logo } from "./Logo";
import { HUDFrame } from "./HUDFrame";
import { BootSequence } from "./BootSequence";
import { TheVault } from "./armory/TheVault";
import { SongCatalog } from "./armory/SongCatalog";
import { TribesGallery } from "./tribes/TribesGallery";
import { DoctrinalWarfare } from "./doctrine/DoctrinalWarfare";
import { ProphetGallery } from "./ProphetGallery";

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
      {/* Clinical bright background with teal tint */}
      <div 
        className="fixed inset-0 -z-30"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, hsl(45 80% 95%) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, hsl(175 30% 95%) 0%, transparent 50%),
            linear-gradient(180deg, hsl(180 15% 99%) 0%, hsl(180 10% 97%) 50%, hsl(180 15% 99%) 100%)
          `,
        }}
      />
      
      {/* Subtle teal + gold light overlay */}
      <div 
        className="fixed inset-0 -z-20 opacity-60"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, hsl(45 90% 85% / 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, hsl(175 50% 90% / 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, hsl(0 0% 100% / 0.5) 0%, transparent 70%)
          `,
        }}
      />
      
      {/* Grid pattern - teal lines */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(hsl(175 65% 35% / 0.06) 1px, transparent 1px),
            linear-gradient(90deg, hsl(175 65% 35% / 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* MILITARY DOUBLE-LINE FRAME - Full page border */}
      <div className="fixed inset-4 md:inset-8 pointer-events-none z-50">
        {/* Outer border - Gold */}
        <div className="absolute inset-0 border-2 border-sanctuary-gold/70" />
        {/* Inner border - Teal */}
        <div className="absolute inset-2 border border-sanctuary-primary/50" />
        
        {/* Corner brackets - outer */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-sanctuary-gold" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-sanctuary-gold" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-sanctuary-gold" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-sanctuary-gold" />
        
        {/* Corner brackets - inner accent */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-sanctuary-primary" />
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-sanctuary-primary" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-sanctuary-primary" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-sanctuary-primary" />
        
        {/* Top classified marker */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px">
          <div className="bg-sanctuary-bg px-4 py-1 border border-sanctuary-gold/50">
            <span className="font-terminal text-[10px] text-sanctuary-gold tracking-[0.3em] font-bold">
              CLASSIFIED
            </span>
          </div>
        </div>
        
        {/* Bottom classified marker */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-px">
          <div className="bg-sanctuary-bg px-4 py-1 border border-sanctuary-gold/50">
            <span className="font-terminal text-[10px] text-sanctuary-gold tracking-[0.3em] font-bold">
              SANCTUARY
            </span>
          </div>
        </div>
      </div>
      
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
                <div className="space-y-10 animate-fade-in">
                  {/* Status Header */}
                  <div className="space-y-2">
                    <p className="font-display text-2xl text-sanctuary-primary font-bold italic">
                      PROPHET GAD SPEAKS
                    </p>
                    <p className="font-terminal text-sm text-sanctuary-gold font-bold">
                      Voice of the Remnant
                    </p>
                  </div>
                  
                  {/* Status Panel */}
                  <div className="p-4 border border-sanctuary-primary/30 bg-sanctuary-primary/5 rounded">
                    <p className="font-terminal text-xs text-sanctuary-text">
                      LOCATION: <span className="text-sanctuary-primary font-bold">UNDISCLOSED HEADQUARTERS</span>
                    </p>
                    <p className="font-terminal text-xs text-sanctuary-text mt-1">
                      DOCTRINE: <span className="text-sanctuary-gold font-bold">KJV SWORD ARMED</span>
                    </p>
                    <p className="font-terminal text-xs text-sanctuary-text mt-1">
                      CAMP OF ISRAEL: <span className="text-sanctuary-primary font-bold">PERIMETER SECURE</span>
                    </p>
                  </div>

                  {/* Prophet's Military Gallery */}
                  <div className="pt-6 border-t border-sanctuary-primary/10">
                    <ProphetGallery />
                  </div>

                  {/* Song Catalog - 10 Songs */}
                  <div className="pt-6 border-t border-sanctuary-primary/10">
                    <SongCatalog />
                  </div>

                  {/* The Vault (Armory) */}
                  <div className="pt-6 border-t border-sanctuary-primary/10">
                    <TheVault onPurchase={(item) => console.log("Purchase:", item)} />
                  </div>

                  {/* Tribes Gallery */}
                  <div className="pt-6 border-t border-sanctuary-primary/10">
                    <TribesGallery />
                  </div>

                  {/* Doctrinal Warfare - AI Rebuttal System */}
                  <div className="pt-6 border-t border-sanctuary-primary/10">
                    <DoctrinalWarfare />
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <button
                      onClick={onExit}
                      className="block mx-auto font-terminal text-xs text-sanctuary-muted hover:text-sanctuary-primary transition-colors"
                    >
                      [ EXIT TO OUTER GATE ]
                    </button>
                  </div>
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
