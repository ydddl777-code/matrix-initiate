import { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import pgaiWarrior from "@/assets/pgai-warrior-new.png";
import pgaiMilitary from "@/assets/pgai-nobg.png";
import pgaiGeneral from "@/assets/pgai-general.png";
import pgaiSuitNew from "@/assets/pgai-suit-new.jpg";
import pgaiJacket from "@/assets/pgai-jacket.png";
import pgaiDining from "@/assets/pgai-dining.png";
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
  { src: pgaiSuitNew, alt: "Prophet Gad - Suited" },
  { src: pgaiJacket, alt: "Prophet Gad - Jacket" },
  { src: pgaiDining, alt: "Prophet Gad - Royal" },
  { src: pgaiBreastplate, alt: "Prophet Gad - Breastplate" },
  { src: pgaiGeneralLight, alt: "Prophet Gad - Commander" },
];

export const BattlefieldLanding = ({ onEnterSanctuary }: BattlefieldLandingProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [videoPhase, setVideoPhase] = useState<VideoPhase>("gad");
  const [iterationCount, setIterationCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showJudgment, setShowJudgment] = useState(false);
  const [judgmentState, setJudgmentState] = useState<"choosing" | "condemned" | "saved">("choosing");
  const [showFlash, setShowFlash] = useState<"red" | "gold" | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  const gadVideoRef = useRef<HTMLVideoElement>(null);
  const competitorVideoRef = useRef<HTMLVideoElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);

  // Show title after first Gad video ends
  useEffect(() => {
    if (iterationCount > 0) setShowTitle(true);
  }, [iterationCount]);

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

  // When Gad video ends → play competitor
  const handleGadVideoEnd = () => {
    setVideoPhase("competitor");
    if (competitorVideoRef.current) {
      competitorVideoRef.current.currentTime = 0;
      competitorVideoRef.current.play().catch(() => {});
    }
    // Start music after first Gad play
    if (iterationCount === 0) {
      startMusic();
    }
  };

  // When competitor video ends → loop back to Gad, mute video audio
  const handleCompetitorVideoEnd = () => {
    setIterationCount((prev) => prev + 1);
    setVideoPhase("gad");
    if (gadVideoRef.current) {
      gadVideoRef.current.currentTime = 0;
      // After first full loop, mute the video audio so music dominates
      gadVideoRef.current.muted = true;
      gadVideoRef.current.play().catch(() => {});
    }
    // Show judgment after 2nd full loop
    if (iterationCount >= 1) {
      setShowJudgment(true);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (musicRef.current) musicRef.current.muted = next;
      // On first iteration, video has its own audio
      if (iterationCount === 0) {
        if (gadVideoRef.current) gadVideoRef.current.muted = next;
        if (competitorVideoRef.current) competitorVideoRef.current.muted = next;
      }
      return next;
    });
  };

  const handleSurrender = () => {
    setJudgmentState("condemned");
    setShowFlash("red");
    setTimeout(() => setShowFlash(null), 500);
    setTimeout(() => setShowMessage(true), 800);
  };

  const handleObey = () => {
    setJudgmentState("saved");
    setShowFlash("gold");
    setTimeout(() => setShowFlash(null), 500);
    setTimeout(() => setShowMessage(true), 800);
    setTimeout(() => onEnterSanctuary(), 3000);
  };

  const handleReset = () => {
    setJudgmentState("choosing");
    setShowMessage(false);
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Hidden audio for Warning in the Dark */}
      <audio ref={musicRef} src="/audio/warning-in-the-dark.mp3" loop preload="auto" />

      {/* Flash overlay */}
      {showFlash && (
        <div
          className={`fixed inset-0 z-[100] ${showFlash === "red" ? "bg-red-600" : "bg-yellow-400"}`}
          style={{ animation: "flash 0.5s ease-out forwards" }}
        />
      )}

      {/* === FULL-SCREEN VIDEO LAYER === */}
      <div className="absolute inset-0 z-10">
        {/* Gad Video */}
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

        {/* Competitor Video */}
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

      {/* === WARRIOR IMAGE FLANKS (appear after first loop) === */}
      {iterationCount > 0 && (
        <>
          {/* Left warrior image */}
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

          {/* Right warrior image */}
          <div className="absolute right-0 top-0 bottom-0 w-[15%] z-20 overflow-hidden pointer-events-none">
            <img
              src={warriorImages[(currentImageIndex + 4) % warriorImages.length].src}
              alt={warriorImages[(currentImageIndex + 4) % warriorImages.length].alt}
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

      {/* === GAD VS AMALEKITES TITLE === */}
      {showTitle && (
        <div className="absolute top-6 left-0 right-0 z-30 text-center animate-fade-in">
          <div className="inline-block px-6 py-3 bg-black/70 backdrop-blur-sm border border-battlefield-gold/40 rounded">
            <h2 className="font-display text-2xl md:text-4xl text-battlefield-gold tracking-[0.3em] battlefield-text-glow">
              GAD vs THE AMALEKITES
            </h2>
            <p className="font-terminal text-xs text-battlefield-gold/60 tracking-widest mt-1">
              THE REVERSE GOLIATH • TAUNTING THE ENEMY
            </p>
          </div>
        </div>
      )}

      {/* === JUDGMENT OVERLAY === */}
      {showJudgment && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="text-center space-y-6 px-4">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-battlefield-gold tracking-wider battlefield-text-glow">
              THE JUDGMENT
            </h1>

            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-battlefield-gold" />
              <span className="font-terminal text-sm text-battlefield-gold/80 tracking-widest">FINAL HOUR</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-battlefield-gold" />
            </div>

            <p className="font-ceremonial text-lg md:text-xl text-battlefield-gold/90 italic leading-relaxed max-w-2xl mx-auto">
              "The time has come to choose a side—
              <span className="text-battlefield-text font-bold not-italic"> Obey His Word, or perish.</span>"
            </p>

            {judgmentState === "choosing" ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-4">
                <button
                  onClick={handleSurrender}
                  className="px-6 py-3 min-w-[180px] font-display text-sm uppercase tracking-widest
                             bg-muted/20 text-muted-foreground/80 border border-muted/40
                             hover:bg-red-900/30 hover:border-red-500/50 hover:text-red-400
                             transition-all duration-300"
                >
                  Surrender
                </button>
                <button
                  onClick={handleObey}
                  className="px-6 py-3 min-w-[180px] font-display text-sm uppercase tracking-widest
                             bg-gradient-to-r from-battlefield-gold/20 to-battlefield-gold/10
                             text-battlefield-gold border border-battlefield-gold
                             hover:from-battlefield-gold/30 hover:to-battlefield-gold/20
                             hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]
                             transition-all duration-300"
                >
                  Obey the Truth
                </button>
              </div>
            ) : (
              <div className="animate-fade-in">
                {judgmentState === "condemned" ? (
                  <div className="space-y-4">
                    <p className="font-display text-3xl md:text-5xl text-red-500 tracking-wider animate-pulse">
                      JUDGMENT SEALED
                    </p>
                    <p className="font-terminal text-lg text-red-400/80">YOU ARE CHAFF.</p>
                    <button
                      onClick={handleReset}
                      className="mt-6 px-6 py-2 font-terminal text-xs text-gray-500 border border-gray-700
                                 hover:text-gray-400 hover:border-gray-600 transition-all"
                    >
                      [ RESET SIMULATION ]
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="font-display text-3xl md:text-5xl text-battlefield-gold tracking-wider battlefield-text-glow">
                      LIFE PRESERVED
                    </p>
                    <p className="font-terminal text-lg text-battlefield-gold/80">ENTER THE SANCTUARY...</p>
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <div className="w-2 h-2 rounded-full bg-battlefield-gold animate-ping" />
                      <span className="font-terminal text-xs text-battlefield-gold/60">TRANSITIONING</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            <p className="font-terminal text-xs text-battlefield-gold/40 mt-8">
              "I have set before you life and death, blessing and cursing: therefore choose life"
              <br />
              <span className="text-battlefield-neon">— Deuteronomy 30:19</span>
            </p>
          </div>
        </div>
      )}

      {/* === MUTE BUTTON === */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={toggleMute}
          className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-battlefield-gold/40
                     flex items-center justify-center hover:bg-black/80 hover:border-battlefield-gold
                     transition-all duration-300"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-red-400" />
          ) : (
            <Volume2 className="w-5 h-5 text-battlefield-gold" />
          )}
        </button>
      </div>

      {/* Now Playing indicator */}
      {iterationCount > 0 && (
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full border border-battlefield-gold/20">
            <div className="flex items-end gap-0.5 h-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-0.5 bg-battlefield-gold rounded-full"
                  style={{
                    height: `${30 + Math.random() * 70}%`,
                    animation: isMuted ? "none" : `eq-bar ${0.3 + i * 0.1}s ease-in-out infinite alternate`,
                  }}
                />
              ))}
            </div>
            <span className="font-terminal text-[10px] text-battlefield-gold/70">
              WARNING IN THE DARK
            </span>
          </div>
        </div>
      )}

      {/* Phase indicator */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-3 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full border border-battlefield-gold/20">
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              videoPhase === "gad" ? "bg-battlefield-gold scale-150 shadow-[0_0_10px_rgba(212,175,55,0.8)]" : "bg-battlefield-gold/30"
            }`}
          />
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              videoPhase === "competitor" ? "bg-red-500 scale-150 shadow-[0_0_10px_rgba(239,68,68,0.8)]" : "bg-red-500/30"
            }`}
          />
          <span className="font-terminal text-[10px] text-battlefield-gold/60 ml-2 uppercase tracking-wider">
            {videoPhase === "gad" ? "GAD SPEAKS" : "THE CHALLENGER"}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 py-2 px-6 bg-black/40 backdrop-blur-sm border-t border-battlefield-gold/10 z-40">
        <div className="flex items-center justify-between max-w-4xl mx-auto font-terminal text-[10px] text-battlefield-gold/40">
          <span>© THE HEADQUARTERS 2024</span>
          <span>ENCRYPTED TRANSMISSION</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </div>

      <style>{`
        @keyframes flash {
          0% { opacity: 0.8; }
          100% { opacity: 0; }
        }
        @keyframes eq-bar {
          0% { height: 20%; }
          100% { height: 100%; }
        }
      `}</style>
    </div>
  );
};
