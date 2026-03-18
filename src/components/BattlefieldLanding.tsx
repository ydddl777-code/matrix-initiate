import { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import pgaiWarrior from "@/assets/pgai-warrior-new.png";
import pgaiMilitary from "@/assets/pgai-nobg.png";
import pgaiGeneral from "@/assets/pgai-general.png";
import pgaiBreastplate from "@/assets/pgai-breastplate.png";
import pgaiGeneralLight from "@/assets/pgai-general-light.png";
import { AnnouncerSubtitles } from "./AnnouncerSubtitles";

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

// Generate ember particles
const embers = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 6,
  duration: 4 + Math.random() * 6,
  size: 2 + Math.random() * 4,
  drift: -30 + Math.random() * 60,
}));

export const BattlefieldLanding = ({ onEnterSanctuary }: BattlefieldLandingProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [videoPhase, setVideoPhase] = useState<VideoPhase>("gad");
  const [iterationCount, setIterationCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [announcementPlaying, setAnnouncementPlaying] = useState(false);
  const [announcementStartTime, setAnnouncementStartTime] = useState<number | null>(null);
  const announcementRef = useRef<HTMLAudioElement | null>(null);

  const gadVideoRef = useRef<HTMLVideoElement>(null);
  const competitorVideoRef = useRef<HTMLVideoElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);

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

  const playAnnouncement = useCallback(async () => {
    setShowAnnouncement(true);
    setAnnouncementPlaying(true);
    // Lower music volume during announcement
    if (musicRef.current) musicRef.current.volume = 0.15;

    const announcementText = `What you have just seen and heard — is not entertainment.
His name is Prophet Gad.
He is a Hebrew Israelite prophet — raised up in this final hour to teach, to warn, and to prepare a people for the judgment that is already at the door.
He is not a pastor. He is not a denomination. He belongs to no church, no organization, no movement of men.
He is God's oracle. His seer. His spokesman — in the tradition of the ancient Prophet Gad who stood in David's court, who delivered hard words to kings, who wrote the chronicles of his generation and feared no man.
That same mantle has been placed upon these shoulders. For this generation.
His assignment is simple — to teach the remnant seed. To preach repentance without apology. To reveal the truth of the Most High — straight from His word, unfiltered, without compromise.
What you are entering now is the Thunderdome.
This is a Bible debate application. No one will be hurt here. But no one will be coddled either.
You are welcome to bring any question. Any doctrine. Any tradition you have been taught. Step into the ring and ask. Challenge what you believe. Challenge what you have been told.
The Prophet will answer — not from his own wisdom, but from the word of the Most High. Scripture against scripture. Line upon line. Precept upon precept.
The truth does not negotiate.
But mercy is still available — to every brother, every sister who is willing to lay the lie down and cross over.
The door is still open.
Enter — if you have the courage.`;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            text: announcementText,
            voiceId: "EXAVITQu4vr4xnSDxMaL", // Sarah — dignified feminine authority
            voiceSettings: {
              stability: 0.80,
              similarity_boost: 0.75,
              style: 0.15,
              use_speaker_boost: true,
              speed: 0.85, // slow, deliberate pace
            },
          }),
        }
      );

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        announcementRef.current = audio;
        audio.muted = isMuted;
        audio.onended = () => {
          setAnnouncementPlaying(false);
          setShowCTA(true);
          if (musicRef.current) musicRef.current.volume = 0.3;
          URL.revokeObjectURL(audioUrl);
        };
        await audio.play();
        setAnnouncementStartTime(Date.now());
      } else {
        // Fallback: just show CTA after a delay if TTS fails
        setTimeout(() => {
          setAnnouncementPlaying(false);
          setShowCTA(true);
          if (musicRef.current) musicRef.current.volume = 0.3;
        }, 5000);
      }
    } catch {
      setTimeout(() => {
        setAnnouncementPlaying(false);
        setShowCTA(true);
        if (musicRef.current) musicRef.current.volume = 0.3;
      }, 5000);
    }
  }, [isMuted]);

  const handleCompetitorVideoEnd = () => {
    setIterationCount((prev) => prev + 1);
    setVideoPhase("gad");
    if (iterationCount >= 1) {
      // Stop videos after 2 loops, trigger announcement
      if (gadVideoRef.current) {
        gadVideoRef.current.pause();
      }
      if (competitorVideoRef.current) {
        competitorVideoRef.current.pause();
      }
      playAnnouncement();
    } else {
      if (gadVideoRef.current) {
        gadVideoRef.current.currentTime = 0;
        gadVideoRef.current.muted = true;
        gadVideoRef.current.play().catch(() => {});
      }
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (musicRef.current) musicRef.current.muted = next;
      if (announcementRef.current) announcementRef.current.muted = next;
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

      {/* === ARENA FLOOR TEXTURE === */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 60%, hsl(30 15% 8%) 0%, hsl(0 0% 3%) 60%, hsl(0 0% 1%) 100%)
          `,
        }}
      />

      {/* === CIRCULAR ARENA RING (overhead lights) === */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, transparent 25%, hsl(45 80% 40% / 0.06) 30%, hsl(45 80% 40% / 0.12) 32%, transparent 35%),
            radial-gradient(circle at 50% 50%, transparent 35%, hsl(0 70% 30% / 0.05) 40%, transparent 45%)
          `,
        }}
      />

      {/* === TORCH RING (8 torches around perimeter) === */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45) * (Math.PI / 180);
        const x = 50 + 42 * Math.cos(angle);
        const y = 50 + 42 * Math.sin(angle);
        return (
          <div
            key={`torch-${i}`}
            className="absolute z-[6] pointer-events-none"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: '120px',
              height: '120px',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, hsl(30 90% 50% / 0.4) 0%, hsl(15 80% 40% / 0.2) 30%, transparent 70%)`,
              animation: `torch-flicker ${1.5 + i * 0.2}s ease-in-out infinite alternate`,
              filter: 'blur(2px)',
            }}
          />
        );
      })}

      {/* === CENTER SPOTLIGHT === */}
      <div
        className="absolute inset-0 z-[7] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 30% 45% at 50% 40%, hsl(45 60% 70% / 0.08) 0%, transparent 100%),
            radial-gradient(ellipse 15% 20% at 50% 55%, hsl(45 50% 50% / 0.12) 0%, transparent 100%)
          `,
        }}
      />

      {/* === CROWD SHADOWS (dark silhouettes around edges) === */}
      <div
        className="absolute inset-0 z-[8] pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg, hsl(0 0% 0% / 0.9) 0%, transparent 15%),
            linear-gradient(0deg, hsl(0 0% 0% / 0.85) 0%, transparent 20%),
            linear-gradient(90deg, hsl(0 0% 0% / 0.9) 0%, transparent 15%),
            linear-gradient(270deg, hsl(0 0% 0% / 0.9) 0%, transparent 15%)
          `,
        }}
      />

      {/* Crowd silhouette shapes at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[18%] z-[9] pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1200 200" className="w-full h-full opacity-40" preserveAspectRatio="none">
          <defs>
            <linearGradient id="crowd-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="40%" stopColor="hsl(0,0%,5%)" />
              <stop offset="100%" stopColor="hsl(0,0%,3%)" />
            </linearGradient>
          </defs>
          {/* Crowd heads and shoulders */}
          {[...Array(40)].map((_, i) => {
            const cx = 15 + i * 30 + (Math.random() - 0.5) * 15;
            const headY = 80 + Math.random() * 30;
            const headR = 8 + Math.random() * 5;
            return (
              <g key={`crowd-${i}`}>
                <circle cx={cx} cy={headY} r={headR} fill="hsl(0,0%,4%)" />
                <ellipse cx={cx} cy={headY + headR + 8} rx={headR + 4} ry={headR + 6} fill="hsl(0,0%,4%)" />
              </g>
            );
          })}
          <rect x="0" y="130" width="1200" height="70" fill="hsl(0,0%,3%)" />
        </svg>
      </div>

      {/* === SMOKE / HAZE LAYER === */}
      <div className="absolute inset-0 z-[11] pointer-events-none">
        <div
          className="absolute w-[120%] h-[40%] bottom-0 left-[-10%]"
          style={{
            background: `
              radial-gradient(ellipse at 30% 80%, hsl(0 0% 20% / 0.15) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 90%, hsl(0 0% 15% / 0.12) 0%, transparent 50%)
            `,
            animation: 'smoke-drift 12s ease-in-out infinite',
            filter: 'blur(30px)',
          }}
        />
        <div
          className="absolute w-[100%] h-[30%] bottom-[5%] left-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 70%, hsl(15 30% 15% / 0.1) 0%, transparent 60%)
            `,
            animation: 'smoke-drift 18s ease-in-out infinite reverse',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* === EMBERS / SPARKS === */}
      <div className="absolute inset-0 z-[12] pointer-events-none overflow-hidden">
        {embers.map((ember) => (
          <div
            key={ember.id}
            className="absolute rounded-full"
            style={{
              left: `${ember.left}%`,
              bottom: '-5%',
              width: `${ember.size}px`,
              height: `${ember.size}px`,
              background: `radial-gradient(circle, hsl(30 100% 60%) 0%, hsl(15 90% 45%) 60%, transparent 100%)`,
              animation: `ember-rise ${ember.duration}s ${ember.delay}s ease-out infinite`,
              boxShadow: `0 0 ${ember.size * 2}px hsl(25 100% 50% / 0.6)`,
              '--ember-drift': `${ember.drift}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* === FULL-SCREEN VIDEO LAYER === */}
      <div className="absolute inset-0 z-[15]" style={{ mixBlendMode: 'screen', opacity: 0.7 }}>
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

      {/* === VIGNETTE OVER VIDEO === */}
      <div
        className="absolute inset-0 z-[16] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, transparent 30%, hsl(0 0% 0% / 0.6) 70%, hsl(0 0% 0% / 0.9) 100%)
          `,
        }}
      />

      {/* === WARRIOR IMAGE FLANKS (after first loop) === */}
      {iterationCount > 0 && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-[15%] z-[20] overflow-hidden pointer-events-none">
            <img
              src={warriorImages[currentImageIndex].src}
              alt={warriorImages[currentImageIndex].alt}
              className="h-full w-full object-cover object-center transition-opacity duration-1000"
              style={{
                filter: "brightness(0.4) contrast(1.4) sepia(0.5) hue-rotate(-10deg)",
                maskImage: "linear-gradient(to right, black 40%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, black 40%, transparent 100%)",
              }}
            />
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-[15%] z-[20] overflow-hidden pointer-events-none">
            <img
              src={warriorImages[(currentImageIndex + 3) % warriorImages.length].src}
              alt={warriorImages[(currentImageIndex + 3) % warriorImages.length].alt}
              className="h-full w-full object-cover object-center transition-opacity duration-1000"
              style={{
                filter: "brightness(0.4) contrast(1.4) sepia(0.5) hue-rotate(-10deg)",
                maskImage: "linear-gradient(to left, black 40%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to left, black 40%, transparent 100%)",
              }}
            />
          </div>
        </>
      )}

      {/* === THUNDERDOME RING LINES === */}
      <div className="absolute inset-0 z-[18] pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 800 800" className="w-[70vmin] h-[70vmin] opacity-[0.08]">
          <polygon
            points="331,50 469,50 700,200 750,400 700,600 469,750 331,750 100,600 50,400 100,200"
            fill="none"
            stroke="hsl(0, 70%, 45%)"
            strokeWidth="2"
          />
          <polygon
            points="355,120 445,120 620,240 660,400 620,560 445,680 355,680 180,560 140,400 180,240"
            fill="none"
            stroke="hsl(0, 70%, 40%)"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* === ANNOUNCER OVERLAY (after videos stop) === */}
      {showAnnouncement && !showCTA && (
        <div className="absolute inset-0 z-[40] flex items-center justify-center p-6">
          <div className="text-center animate-fade-in max-w-2xl">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 50% 50% at 50% 50%, hsl(0 0% 0% / 0.7) 0%, hsl(0 0% 0% / 0.3) 70%, transparent 100%)`,
              }}
            />
            <p className="font-display text-sm md:text-lg lg:text-xl uppercase tracking-[0.25em] font-bold relative mb-6"
              style={{ color: 'hsl(45 80% 55%)', textShadow: '0 0 20px hsl(45 80% 50% / 0.4)' }}>
              Prophetess Huldah Speaks
            </p>
            <AnnouncerSubtitles isPlaying={announcementPlaying} startTime={announcementStartTime} />
          </div>
        </div>
      )}

      {/* === ENTER THE THUNDERDOME CTA (after announcement) === */}
      {showCTA && (
        <div className="absolute inset-0 z-[40] flex items-end justify-center pb-[12vh] md:pb-[15vh]">
          <div className="text-center animate-fade-in">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 40% 50% at 50% 50%, hsl(0 70% 30% / 0.15) 0%, transparent 100%)`,
              }}
            />
            <button
              onClick={onEnterSanctuary}
              className="relative px-14 md:px-20 py-5 md:py-7 font-display text-xl md:text-3xl lg:text-4xl uppercase tracking-[0.3em]
                         border-2 transition-all duration-500 cursor-pointer group"
              style={{
                background: 'linear-gradient(180deg, hsl(0 60% 20% / 0.6) 0%, hsl(0 50% 12% / 0.8) 100%)',
                borderColor: 'hsl(0 70% 45%)',
                color: 'hsl(0 70% 55%)',
                boxShadow: `
                  0 0 20px hsl(0 70% 45% / 0.3),
                  inset 0 0 30px hsl(0 60% 20% / 0.3)
                `,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 40px hsl(0 70% 45% / 0.5), 0 0 80px hsl(0 70% 40% / 0.3), inset 0 0 30px hsl(0 60% 20% / 0.3)';
                e.currentTarget.style.borderColor = 'hsl(0 80% 55%)';
                e.currentTarget.style.color = 'hsl(0 80% 65%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px hsl(0 70% 45% / 0.3), inset 0 0 30px hsl(0 60% 20% / 0.3)';
                e.currentTarget.style.borderColor = 'hsl(0 70% 45%)';
                e.currentTarget.style.color = 'hsl(0 70% 55%)';
              }}
            >
              Step Into the Thunderdome
            </button>
            <p
              className="font-terminal text-xs md:text-sm mt-4 tracking-[0.3em] uppercase"
              style={{
                color: 'hsl(0 0% 70%)',
              }}
            >
              ▲ Press to enter the Dome ▲
            </p>
            <p
              className="font-display text-sm md:text-lg lg:text-xl mt-4 tracking-[0.3em] uppercase font-bold px-5 md:px-8 py-2 md:py-3 mx-auto inline-block rounded"
              style={{
                color: 'hsl(0 0% 100%)',
                background: 'hsl(220 70% 35% / 0.85)',
                textShadow: '0 2px 4px hsl(0 0% 0% / 0.5)',
                boxShadow: '0 0 30px hsl(220 70% 40% / 0.4)',
              }}
            >
              If you have the courage
            </p>
          </div>
        </div>
      )}

      {/* === MUTE BUTTON === */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={toggleMute}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: 'hsl(0 0% 5% / 0.7)',
            backdropFilter: 'blur(8px)',
            border: '1px solid hsl(45 60% 40% / 0.3)',
          }}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" style={{ color: 'hsl(0 60% 50%)' }} />
          ) : (
            <Volume2 className="w-5 h-5" style={{ color: 'hsl(45 80% 55%)' }} />
          )}
        </button>
      </div>

      <style>{`
        @keyframes torch-flicker {
          0% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
          100% { opacity: 0.7; transform: translate(-50%, -50%) scale(0.95); }
        }
        
        @keyframes smoke-drift {
          0% { transform: translateX(0) translateY(0); opacity: 0.6; }
          33% { transform: translateX(30px) translateY(-10px); opacity: 0.8; }
          66% { transform: translateX(-20px) translateY(5px); opacity: 0.5; }
          100% { transform: translateX(0) translateY(0); opacity: 0.6; }
        }
        
        @keyframes ember-rise {
          0% { 
            transform: translateY(0) translateX(0) scale(1); 
            opacity: 1; 
          }
          70% { 
            opacity: 0.7; 
          }
          100% { 
            transform: translateY(-110vh) translateX(var(--ember-drift, 20px)) scale(0.2); 
            opacity: 0; 
          }
        }
        
        @keyframes cta-pulse {
          0%, 100% { 
            opacity: 0.9;
            filter: brightness(1);
          }
          50% { 
            opacity: 1;
            filter: brightness(1.2);
          }
        }

        @keyframes thunderdome-pulse {
          0%, 100% { 
            box-shadow: 0 0 20px hsl(0 70% 45% / 0.3), inset 0 0 30px hsl(0 60% 20% / 0.3);
            border-color: hsl(0 70% 45%);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 50px hsl(0 70% 45% / 0.6), 0 0 100px hsl(0 70% 40% / 0.3), inset 0 0 30px hsl(0 60% 20% / 0.3);
            border-color: hsl(0 80% 55%);
            transform: scale(1.03);
          }
        }

        @keyframes announcer-bar {
          0% { height: 4px; }
          100% { height: 16px; }
        }
      `}</style>
    </div>
  );
};
