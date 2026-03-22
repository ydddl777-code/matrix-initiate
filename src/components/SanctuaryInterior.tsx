import { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { DoctrinalWarfare } from "./doctrine/DoctrinalWarfare";
import { ThunderdomeEntry } from "./ThunderdomeEntry";
import pgaiWarrior from "@/assets/pgai-warrior-new.png";
import pgaiGeneral from "@/assets/pgai-general.png";
import pgaiBreastplate from "@/assets/pgai-breastplate.png";
import pgaiGeneralLight from "@/assets/pgai-general-light.png";
import pgaiMilitary from "@/assets/pgai-nobg.png";

interface SanctuaryInteriorProps {
  onExit: () => void;
}

const gadImages = [
  { src: pgaiWarrior, alt: "Prophet Gad - Warrior" },
  { src: pgaiGeneral, alt: "Prophet Gad - General" },
  { src: pgaiBreastplate, alt: "Prophet Gad - Breastplate" },
  { src: pgaiGeneralLight, alt: "Prophet Gad - Commander" },
  { src: pgaiMilitary, alt: "Prophet Gad - Military" },
];

export const SanctuaryInterior = ({ onExit }: SanctuaryInteriorProps) => {
  const [gadIndex, setGadIndex] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const musicRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setGadIndex((prev) => (prev + 1) % gadImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = 0.15;
      // Audio disabled — user must manually start playback
    }
    const handleAudioStart = () => {
      if (musicRef.current) musicRef.current.volume = 0.03;
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

  if (!hasEntered) {
    return (
      <ThunderdomeEntry
        onEnter={() => setHasEntered(true)}
        onExit={onExit}
        gadImages={gadImages}
        gadIndex={gadIndex}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <audio ref={musicRef} src="/audio/warning-in-the-dark.mp3" loop preload="auto" />

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
          src={gadImages[gadIndex].src}
          alt={gadImages[gadIndex].alt}
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
        <img
          src={gadImages[(gadIndex + 3) % gadImages.length].src}
          alt="The Challenger"
          className="h-full w-full object-cover object-center transition-opacity duration-1000"
          style={{
            filter: "brightness(0.4) contrast(1.4) sepia(0.3) hue-rotate(10deg)",
            maskImage: "linear-gradient(to left, black 40%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to left, black 40%, transparent 100%)",
          }}
        />
        <div className="absolute bottom-12 right-2 z-10">
          <p className="font-display text-[10px] md:text-xs tracking-widest text-right"
            style={{ color: "hsl(0 70% 50%)", opacity: 0.6 }}>CHALLENGER</p>
        </div>
      </div>

      {/* CENTER RING: DOCTRINAL WARFARE */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-3xl h-[90vh] max-h-[800px]">
          <DoctrinalWarfare />
        </div>
      </div>

      {/* BACK BUTTON */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => setHasEntered(false)}
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
