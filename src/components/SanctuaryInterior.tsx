import { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { DoctrinalWarfare } from "./doctrine/DoctrinalWarfare";
import { BrandHeader } from "./BrandHeader";
import { ThunderdomeEntry } from "./ThunderdomeEntry";
import { Storefront } from "./storefront/Storefront";
import gadThreshingFloor from "@/assets/gad-threshing-floor.jpg";

interface SanctuaryInteriorProps {
  onExit: () => void;
}

type SanctuaryView = "entry" | "thunderdome" | "storefront";

// Single stationary image — Gad does NOT rotate
const gadImage = { src: gadThreshingFloor, alt: "Prophet Gad - Threshing Floor" };

export const SanctuaryInterior = ({ onExit }: SanctuaryInteriorProps) => {
  const [view, setView] = useState<SanctuaryView>("entry");
  const musicRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = 0.15;
    }
    const handleAudioStart = () => {
      if (musicRef.current) musicRef.current.volume = 0.075;
    };
    const handleAudioEnd = () => {
      if (musicRef.current) musicRef.current.volume = 0.15;
    };
    window.addEventListener("pgai-audio-start", handleAudioStart);
    window.addEventListener("pgai-audio-end", handleAudioEnd);
    return () => {
      window.removeEventListener("pgai-audio-start", handleAudioStart);
      window.removeEventListener("pgai-audio-end", handleAudioEnd);
    };
  }, []);

  if (view === "entry") {
    return (
      <ThunderdomeEntry
        onEnter={() => setView("thunderdome")}
        onExit={onExit}
        onOpenStorefront={() => setView("storefront")}
        gadImage={gadImage}
      />
    );
  }

  if (view === "storefront") {
    return <Storefront onBack={() => setView("entry")} />;
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <audio ref={musicRef} src="/audio/warning-in-the-dark.mp3" loop preload="auto" />
      <BrandHeader />

      {/* Thunderdome Ring + Spotlight */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 50% 40% at 50% 0%, hsl(0 70% 50% / 0.08) 0%, transparent 100%),
            radial-gradient(circle at 50% 50%, hsl(0 70% 50% / 0.04) 0%, transparent 50%)
          `,
        }} />
      </div>

      {/* GAD'S CORNER (Left) */}
      <div className="absolute left-0 top-0 bottom-0 w-[12%] md:w-[15%] z-[2] overflow-hidden pointer-events-none">
         <img
           src={gadImage.src}
           alt={gadImage.alt}
          className="h-full w-full object-cover object-center transition-opacity duration-1000"
          style={{
            filter: "brightness(0.5) contrast(1.3) sepia(0.2)",
            maskImage: "linear-gradient(to right, black 40%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, black 40%, transparent 100%)",
          }}
        />
        <div className="absolute bottom-12 left-2 z-10">
          <p className="font-display text-[10px] md:text-xs tracking-widest"
            style={{ color: "hsl(0 70% 50%)", opacity: 0.6 }}>GAD</p>
        </div>
      </div>

      {/* CHALLENGER'S CORNER (Right) */}
      <div className="absolute right-0 top-0 bottom-0 w-[12%] md:w-[15%] z-[2] overflow-hidden pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            maskImage: "linear-gradient(to left, black 40%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to left, black 40%, transparent 100%)",
            background: `
              radial-gradient(ellipse 34% 26% at 62% 20%, hsl(0 0% 18% / 0.9) 0%, transparent 100%),
              radial-gradient(ellipse 28% 38% at 58% 50%, hsl(0 0% 15% / 0.96) 0%, transparent 100%),
              radial-gradient(ellipse 30% 26% at 56% 79%, hsl(0 0% 12% / 0.96) 0%, transparent 100%),
              linear-gradient(180deg, hsl(0 0% 10% / 0.96) 0%, hsl(0 0% 3% / 0.98) 100%)
            `,
            filter: "brightness(1.05) contrast(1.08)",
          }}
        >
          <div className="absolute inset-y-0 right-[12%] flex items-center justify-center">
            <span
              className="font-display text-5xl md:text-7xl"
              style={{ color: "hsl(45 85% 58% / 0.86)", textShadow: "0 0 30px hsl(45 85% 58% / 0.24)" }}
            >
              ?
            </span>
          </div>
        </div>
        <div className="absolute bottom-12 right-2 z-10">
          <p className="font-display text-[10px] md:text-xs tracking-widest text-right"
            style={{ color: "hsl(45 85% 58%)", opacity: 0.8 }}>CHALLENGER</p>
        </div>
      </div>

      {/* CENTER RING: DOCTRINAL WARFARE */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-3xl h-[90vh] max-h-[800px]">
          <DoctrinalWarfare />
        </div>
      </div>

      {/* BACK BUTTON */}
      <div className="fixed top-20 md:top-24 left-4 z-50">
        <button
          onClick={() => setView("entry")}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 backdrop-blur-sm border transition-all duration-300"
          style={{ borderColor: "hsl(0 70% 45% / 0.3)", color: "hsl(0 70% 50% / 0.7)" }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-terminal text-[10px] tracking-widest">EXIT RING</span>
        </button>
      </div>
    </div>
  );
};
