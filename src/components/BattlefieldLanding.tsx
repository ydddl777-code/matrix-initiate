import { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, VolumeX, RotateCcw, SkipForward } from "lucide-react";
import pgaiWarrior from "@/assets/pgai-warrior-new.png";
import pgaiMilitary from "@/assets/pgai-nobg.png";
import pgaiGeneral from "@/assets/pgai-general.png";
import pgaiSuit from "@/assets/pgai-suit-new.jpg";
import pgaiJacket from "@/assets/pgai-jacket.png";
import pgaiDining from "@/assets/pgai-dining.png";
import pgaiBreastplate from "@/assets/pgai-breastplate.png";
import pgaiGeneralLight from "@/assets/pgai-general-light.png";

type Phase = "gad-intro" | "competitor" | "showcase" | "judgment";

interface BattlefieldLandingProps {
  onEnterSanctuary: () => void;
}

const warriorImages = [
  { src: pgaiWarrior, alt: "Prophet Gad - Warrior" },
  { src: pgaiMilitary, alt: "Prophet Gad - Military" },
  { src: pgaiGeneral, alt: "Prophet Gad - General" },
  { src: pgaiSuit, alt: "Prophet Gad - Suited" },
  { src: pgaiJacket, alt: "Prophet Gad - Jacket" },
  { src: pgaiDining, alt: "Prophet Gad - Royal" },
  { src: pgaiBreastplate, alt: "Prophet Gad - Breastplate" },
  { src: pgaiGeneralLight, alt: "Prophet Gad - Commander" },
];

export const BattlefieldLanding = ({ onEnterSanctuary }: BattlefieldLandingProps) => {
  const [phase, setPhase] = useState<Phase>("gad-intro");
  const [isMuted, setIsMuted] = useState(false);
  const [showFlash, setShowFlash] = useState<"red" | "gold" | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [judgmentState, setJudgmentState] = useState<"choosing" | "condemned" | "saved">("choosing");
  const [showTitle, setShowTitle] = useState(false);

  const gadVideoRef = useRef<HTMLVideoElement>(null);
  const competitorVideoRef = useRef<HTMLVideoElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);

  // Cycle warrior images during showcase
  useEffect(() => {
    if (phase !== "showcase" && phase !== "judgment") return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % warriorImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [phase]);

  // Show title overlay after a moment
  useEffect(() => {
    const t = setTimeout(() => setShowTitle(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // Start music after Gad intro ends
  const startMusic = useCallback(() => {
    if (musicRef.current) {
      musicRef.current.volume = 0.7;
      musicRef.current.play().catch(() => {});
    }
  }, []);

  const handleGadVideoEnd = () => {
    setPhase("competitor");
    if (competitorVideoRef.current) {
      competitorVideoRef.current.play().catch(() => {});
    }
    // Start music during competitor video
    startMusic();
  };

  const handleCompetitorVideoEnd = () => {
    setPhase("showcase");
    // Music keeps playing, images cycle
    setTimeout(() => setPhase("judgment"), 8000);
  };

  const handleSkipToJudgment = () => {
    if (gadVideoRef.current) gadVideoRef.current.pause();
    if (competitorVideoRef.current) competitorVideoRef.current.pause();
    startMusic();
    setPhase("judgment");
  };

  const handleReplay = () => {
    setPhase("gad-intro");
    setJudgmentState("choosing");
    setShowMessage(false);
    setCurrentImageIndex(0);
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.currentTime = 0;
    }
    if (gadVideoRef.current) {
      gadVideoRef.current.currentTime = 0;
      gadVideoRef.current.play().catch(() => {});
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (gadVideoRef.current) gadVideoRef.current.muted = next;
      if (competitorVideoRef.current) competitorVideoRef.current.muted = next;
      if (musicRef.current) musicRef.current.muted = next;
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

      {/* === GAD INTRO VIDEO === */}
      <video
        ref={gadVideoRef}
        src="/video/gad-challenge.mp4"
        autoPlay
        playsInline
        muted={isMuted}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          phase === "gad-intro" ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
        onEnded={handleGadVideoEnd}
      />

      {/* === COMPETITOR VIDEO === */}
      <video
        ref={competitorVideoRef}
        src="/video/gad-competitor.mp4"
        playsInline
        muted={isMuted}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          phase === "competitor" ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
        onEnded={handleCompetitorVideoEnd}
      />

      {/* === WARRIOR IMAGE SHOWCASE === */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          phase === "showcase" || phase === "judgment" ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      >
        {/* Rotating warrior images */}
        {warriorImages.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${
              i === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              filter: "brightness(0.8) contrast(1.2) drop-shadow(0 0 40px rgba(212,175,55,0.5))",
            }}
          />
        ))}

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
      </div>

      {/* === GAD VS AMALEKITES ROTATING TITLE === */}
      {(phase === "competitor" || phase === "showcase") && (
        <div className="absolute top-8 left-0 right-0 z-30 text-center animate-fade-in">
          <div className="inline-block px-6 py-3 bg-black/60 backdrop-blur-sm border border-battlefield-gold/40 rounded">
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
      {phase === "judgment" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
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

      {/* === HUD CONTROLS === */}
      <div className="fixed top-4 left-4 z-50 flex flex-col gap-2">
        {/* Mute Button */}
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

      {/* Skip / Replay buttons */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        {phase !== "judgment" && (
          <button
            onClick={handleSkipToJudgment}
            className="h-10 px-4 rounded-full bg-black/60 backdrop-blur-sm border border-battlefield-gold/30
                       flex items-center gap-2 hover:bg-black/80 hover:border-battlefield-gold
                       transition-all duration-300"
            title="Skip to Judgment"
          >
            <SkipForward className="w-4 h-4 text-battlefield-gold" />
            <span className="font-terminal text-xs text-battlefield-gold/80">SKIP</span>
          </button>
        )}
        <button
          onClick={handleReplay}
          className="h-10 px-4 rounded-full bg-black/60 backdrop-blur-sm border border-battlefield-gold/30
                     flex items-center gap-2 hover:bg-black/80 hover:border-battlefield-gold
                     transition-all duration-300"
          title="Replay from Start"
        >
          <RotateCcw className="w-4 h-4 text-battlefield-gold" />
          <span className="font-terminal text-xs text-battlefield-gold/80">REPLAY</span>
        </button>
      </div>

      {/* Phase indicator */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-3 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full border border-battlefield-gold/20">
          {(["gad-intro", "competitor", "showcase", "judgment"] as Phase[]).map((p) => (
            <div
              key={p}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                phase === p ? "bg-battlefield-gold scale-150 shadow-[0_0_10px_rgba(212,175,55,0.8)]" : "bg-battlefield-gold/30"
              }`}
            />
          ))}
          <span className="font-terminal text-[10px] text-battlefield-gold/60 ml-2 uppercase tracking-wider">
            {phase === "gad-intro" && "GAD SPEAKS"}
            {phase === "competitor" && "THE CHALLENGER"}
            {phase === "showcase" && "WAR MODE"}
            {phase === "judgment" && "JUDGMENT"}
          </span>
        </div>
      </div>

      {/* Now Playing indicator */}
      {(phase === "competitor" || phase === "showcase" || phase === "judgment") && (
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
