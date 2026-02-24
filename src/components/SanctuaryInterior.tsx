import { useState } from "react";
import { Logo } from "./Logo";
import { HUDFrame } from "./HUDFrame";
import { BootSequence } from "./BootSequence";
import { TheVault } from "./armory/TheVault";
import { SongCatalog } from "./armory/SongCatalog";
import { TribesGallery } from "./tribes/TribesGallery";
import { DoctrinalWarfare } from "./doctrine/DoctrinalWarfare";
import { ProphetGallery } from "./ProphetGallery";
import { AncientDivider } from "./AncientDivider";

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
      {/* Light purple background with gold + purple radials */}
      <div 
        className="fixed inset-0 -z-30"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, hsl(45 80% 92%) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, hsl(270 40% 92%) 0%, transparent 50%),
            linear-gradient(180deg, hsl(270 30% 96%) 0%, hsl(270 25% 94%) 50%, hsl(270 30% 96%) 100%)
          `,
        }}
      />
      
      {/* Subtle purple + gold light overlay */}
      <div 
        className="fixed inset-0 -z-20 opacity-70"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, hsl(45 90% 85% / 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, hsl(270 50% 85% / 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, hsl(270 30% 98% / 0.6) 0%, transparent 70%)
          `,
        }}
      />
      
      {/* Grid pattern - purple lines */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(hsl(270 50% 35% / 0.08) 1px, transparent 1px),
            linear-gradient(90deg, hsl(270 50% 35% / 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* MILITARY DOUBLE-LINE FRAME - Full page border - THICKENED */}
      <div className="fixed inset-4 md:inset-8 pointer-events-none z-50">
        {/* Outer border - Gold - THICKER */}
        <div className="absolute inset-0 border-4 border-sanctuary-gold/80" />
        {/* Inner border - Purple - THICKER */}
        <div className="absolute inset-3 border-2 border-sanctuary-primary/60" />
        
        {/* Corner brackets - outer - THICKER */}
        <div className="absolute top-0 left-0 w-12 h-12 border-l-[6px] border-t-[6px] border-sanctuary-gold" />
        <div className="absolute top-0 right-0 w-12 h-12 border-r-[6px] border-t-[6px] border-sanctuary-gold" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-l-[6px] border-b-[6px] border-sanctuary-gold" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-r-[6px] border-b-[6px] border-sanctuary-gold" />
        
        {/* Corner brackets - inner accent - THICKER */}
        <div className="absolute top-3 left-3 w-6 h-6 border-l-[3px] border-t-[3px] border-sanctuary-primary" />
        <div className="absolute top-3 right-3 w-6 h-6 border-r-[3px] border-t-[3px] border-sanctuary-primary" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-l-[3px] border-b-[3px] border-sanctuary-primary" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-r-[3px] border-b-[3px] border-sanctuary-primary" />
        
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
                  {/* Status Header - BOLDER */}
                  <div className="space-y-2">
                    <p className="font-display text-3xl text-sanctuary-primary font-black italic tracking-wide">
                      PROPHET GAD SPEAKS
                    </p>
                    <p className="font-terminal text-base text-sanctuary-gold font-bold tracking-widest uppercase">
                      Voice of the Remnant
                    </p>
                  </div>
                  
                  {/* Status Panel - BOLDER */}
                  <div className="p-5 border-2 border-sanctuary-primary/40 bg-sanctuary-primary/10 rounded-lg shadow-lg">
                    <p className="font-terminal text-sm text-sanctuary-text font-semibold">
                      LOCATION: <span className="text-sanctuary-primary font-black">UNDISCLOSED HEADQUARTERS</span>
                    </p>
                    <p className="font-terminal text-sm text-sanctuary-text mt-2 font-semibold">
                      DOCTRINE: <span className="text-sanctuary-gold font-black">KJV SWORD ARMED</span>
                    </p>
                    <p className="font-terminal text-sm text-sanctuary-text mt-2 font-semibold">
                      CAMP OF ISRAEL: <span className="text-sanctuary-primary font-black">PERIMETER SECURE</span>
                    </p>
                  </div>

                   {/* Prophet's Military Gallery */}
                   <AncientDivider variant="shield" label="THE PROPHET" />
                   <ProphetGallery />

                   {/* Song Catalog */}
                   <AncientDivider variant="flame" label="HOLY FIRE MUSIC" />
                   <SongCatalog />

                   {/* The Vault (Armory) */}
                   <AncientDivider variant="sword" label="THE ARMORY" />
                   <TheVault onPurchase={(item) => console.log("Purchase:", item)} />

                   {/* Tribes Gallery */}
                   <AncientDivider variant="crown" label="TWELVE TRIBES" />
                   <TribesGallery />

                   {/* Doctrinal Warfare - AI Rebuttal System */}
                   <AncientDivider variant="star" label="DOCTRINE" />
                   <DoctrinalWarfare />

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
