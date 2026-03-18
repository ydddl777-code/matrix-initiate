import { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { DoctrinalWarfare } from "./doctrine/DoctrinalWarfare";
import goldenGate from "@/assets/golden-gate.png";
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
      musicRef.current.play().catch(() => {});
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

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <audio ref={musicRef} src="/audio/warning-in-the-dark.mp3" loop preload="auto" />

      {/* === GOLDEN GATE TRANSLUCENT BACKDROP === */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <img
          src={goldenGate}
          alt="Golden Gate - Vision of Heaven"
          className="w-[80%] max-w-[900px] h-auto object-contain opacity-[0.06]"
          style={{
            filter: "brightness(1.2) sepia(0.3) hue-rotate(-10deg)",
          }}
        />
      </div>

      {/* === THUNDERDOME RING + SPOTLIGHT === */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 50% 40% at 50% 0%, hsl(0 70% 50% / 0.08) 0%, transparent 100%),
              radial-gradient(circle at 50% 50%, hsl(0 70% 50% / 0.04) 0%, transparent 50%)
            `,
          }}
        />

        {/* Thunderdome ring SVG */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div style={{ width: "min(90vw, 90vh)", height: "min(90vw, 90vh)" }}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="29.3,4 70.7,4 96,29.3 96,70.7 70.7,96 29.3,96 4,70.7 4,29.3"
                fill="none"
                stroke="hsl(0 70% 45%)"
                strokeWidth="0.3"
                opacity="0.25"
              />
              <polygon
                points="33,10 67,10 90,33 90,67 67,90 33,90 10,67 10,33"
                fill="none"
                stroke="hsl(0 70% 45%)"
                strokeWidth="0.15"
                opacity="0.12"
              />
              <circle
                cx="50" cy="50" r="22"
                fill="hsl(0 0% 100% / 0.015)"
                stroke="hsl(0 70% 45%)"
                strokeWidth="0.12"
                opacity="0.3"
              />
            </svg>
          </div>
        </div>

        {/* Corner post markers */}
        {["top-6 left-6", "top-6 right-6", "bottom-6 left-6", "bottom-6 right-6"].map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} w-3 h-3 rounded-full`}
            style={{
              background: "hsl(0 70% 45% / 0.3)",
              boxShadow: "0 0 12px hsl(0 70% 45% / 0.4)",
            }}
          />
        ))}

        {/* Shadow crowd silhouettes along edges */}
        <div
          className="absolute inset-x-0 bottom-0 h-[15%]"
          style={{
            background: `linear-gradient(to top, hsl(0 0% 0% / 0.9) 0%, transparent 100%)`,
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[12%]"
          style={{
            background: `
              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 40'%3E%3Cellipse cx='20' cy='35' rx='8' ry='12' fill='%23111'/%3E%3Cellipse cx='45' cy='33' rx='7' ry='14' fill='%230a0a0a'/%3E%3Cellipse cx='70' cy='36' rx='9' ry='11' fill='%23111'/%3E%3Cellipse cx='95' cy='32' rx='7' ry='15' fill='%230d0d0d'/%3E%3Cellipse cx='120' cy='35' rx='8' ry='12' fill='%23111'/%3E%3Cellipse cx='145' cy='33' rx='9' ry='14' fill='%230a0a0a'/%3E%3Cellipse cx='170' cy='36' rx='7' ry='11' fill='%23111'/%3E%3Cellipse cx='195' cy='34' rx='8' ry='13' fill='%230d0d0d'/%3E%3C/svg%3E") repeat-x bottom
            `,
            backgroundSize: "300px 60px",
            opacity: 0.6,
          }}
        />
      </div>

      {/* === GAD'S CORNER (Left) === */}
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
          <p
            className="font-display text-[10px] md:text-xs tracking-widest"
            style={{ color: "hsl(0 70% 50%)", opacity: 0.6 }}
          >
            GAD
          </p>
        </div>
      </div>

      {/* === CHALLENGER'S CORNER (Right) === */}
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
          <p
            className="font-display text-[10px] md:text-xs tracking-widest text-right"
            style={{ color: "hsl(0 70% 50%)", opacity: 0.6 }}
          >
            CHALLENGER
          </p>
        </div>
      </div>

      {/* === CENTER RING: DOCTRINAL WARFARE === */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-3xl h-[90vh] max-h-[800px]">
          <DoctrinalWarfare />
        </div>
      </div>

      {/* === BACK BUTTON === */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={onExit}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 backdrop-blur-sm
                     border transition-all duration-300"
          style={{
            borderColor: "hsl(0 70% 45% / 0.3)",
            color: "hsl(0 70% 50% / 0.7)",
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-terminal text-[10px] tracking-widest">EXIT RING</span>
        </button>
      </div>
    </div>
  );
};