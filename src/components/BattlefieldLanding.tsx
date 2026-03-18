import { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import pgaiWarrior from "@/assets/pgai-warrior-new.png";
import pgaiMilitary from "@/assets/pgai-nobg.png";
import pgaiGeneral from "@/assets/pgai-general.png";
import pgaiBreastplate from "@/assets/pgai-breastplate.png";
import pgaiGeneralLight from "@/assets/pgai-general-light.png";

type VideoPhase = "gad" | "competitor";

interface BattlefieldLandingProps {
  onEnterSanctuary: () => void;
}

const warriorImages = [
  { src: pgaiWarrior, alt: "Prophet Gad - Warrior" },
  { src: pgaiMilitary, alt: "Prophet Gad - Military" },
  { src: pgaiGeneral, alt: "Prophet Gad - General" },
  { src: pgaiBreastplate, alt: "Prophet Gad - Breastplate" },
  { src: pgaiGeneralLight, alt: "Prophet Gad - Commander" },
];

export const BattlefieldLanding = ({ onEnterSanctuary }: BattlefieldLandingProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [videoPhase, setVideoPhase] = useState<VideoPhase>("gad");
  const [iterationCount, setIterationCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCTA, setShowCTA] = useState(false);

  const gadVideoRef = useRef<HTMLVideoElement>(null);
  const competitorVideoRef = useRef<HTMLVideoElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);

  // Cycle warrior images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % warriorImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const startMusic = useCallback(() => {
    if (musicRef.current && musicRef.current.paused) {
      musicRef.current.volume = 0.7;
      musicRef.current.play().catch(() => {});
    }
  }, []);

  const handleGadVideoEnd = () => {
    setVideoPhase("competitor");
    if (competitorVideoRef.current) {
      competitorVideoRef.current.currentTime = 0;
      competitorVideoRef.current.play().catch(() => {});
    }
    if (iterationCount === 0) {
      startMusic();
    }
  };

  const handleCompetitorVideoEnd = () => {
    setIterationCount((prev) => prev + 1);
    setVideoPhase("gad");
    if (gadVideoRef.current) {
      gadVideoRef.current.currentTime = 0;
      gadVideoRef.current.muted = true;
      gadVideoRef.current.play().catch(() => {});
    }
    // Show CTA after 2nd full loop
    if (iterationCount >= 1) {
      setShowCTA(true);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (musicRef.current) musicRef.current.muted = next;
      if (iterationCount === 0) {
        if (gadVideoRef.current) gadVideoRef.current.muted = next;
        if (competitorVideoRef.current) competitorVideoRef.current.muted = next;
      }
      return next;
    });
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <audio ref={musicRef} src="/audio/warning-in-the-dark.mp3" loop preload="auto" />

      {/* === FULL-SCREEN VIDEO LAYER === */}
      <div className="absolute inset-0 z-10">
        <video
          ref={gadVideoRef}
          src="/video/gad-challenge.mp4"
          autoPlay
          playsInline
          muted={isMuted}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoPhase === "gad" ? "opacity-100" : "opacity-0"
          }`}
          onEnded={handleGadVideoEnd}
        />
        <video
          ref={competitorVideoRef}
          src="/video/gad-competitor.mp4"
          playsInline
          muted={iterationCount > 0 || isMuted}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoPhase === "competitor" ? "opacity-100" : "opacity-0"
          }`}
          onEnded={handleCompetitorVideoEnd}
        />
      </div>

      {/* === WARRIOR IMAGE FLANKS (after first loop) === */}
      {iterationCount > 0 && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-[15%] z-20 overflow-hidden pointer-events-none">
            <img
              src={warriorImages[currentImageIndex].src}
              alt={warriorImages[currentImageIndex].alt}
              className="h-full w-full object-cover object-center transition-opacity duration-1000"
              style={{
                filter: "brightness(0.6) contrast(1.3) sepia(0.3)",
                maskImage: "linear-gradient(to right, black 50%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, black 50%, transparent 100%)",
              }}
            />
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-[15%] z-20 overflow-hidden pointer-events-none">
            <img
              src={warriorImages[(currentImageIndex + 3) % warriorImages.length].src}
              alt={warriorImages[(currentImageIndex + 3) % warriorImages.length].alt}
              className="h-full w-full object-cover object-center transition-opacity duration-1000"
              style={{
                filter: "brightness(0.6) contrast(1.3) sepia(0.3)",
                maskImage: "linear-gradient(to left, black 50%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to left, black 50%, transparent 100%)",
              }}
            />
          </div>
        </>
      )}

      {/* === ENTER THE OCTAGON CTA (after 2 loops) === */}
      {showCTA && (
        <div className="absolute inset-0 z-40 flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <button
              onClick={onEnterSanctuary}
              className="px-10 py-5 font-display text-xl md:text-3xl uppercase tracking-[0.3em]
                         bg-red-900/40 text-red-500 border-2 border-red-600
                         hover:bg-red-800/50 hover:text-red-400 hover:border-red-500
                         hover:shadow-[0_0_40px_rgba(239,68,68,0.5)]
                         transition-all duration-500 animate-pulse"
            >
              Enter the Octagon
            </button>
            <p className="font-terminal text-xs text-red-500/50 mt-4 tracking-widest">
              IF YOU HAVE THE COURAGE
            </p>
          </div>
        </div>
      )}

      {/* === MUTE BUTTON === */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={toggleMute}
          className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-red-600/40
                     flex items-center justify-center hover:bg-black/80 hover:border-red-500
                     transition-all duration-300"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-red-400" />
          ) : (
            <Volume2 className="w-5 h-5 text-red-500" />
          )}
        </button>
      </div>

      <style>{`
        @keyframes eq-bar {
          0% { height: 20%; }
          100% { height: 100%; }
        }
      `}</style>
    </div>
  );
};
