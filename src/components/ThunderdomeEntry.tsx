import { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { BrandHeader } from "./BrandHeader";
import lionOfJudah from "@/assets/lion-of-judah.png";
import gadMilitary1 from "@/assets/gad-military-1.png";
import gadMilitary2 from "@/assets/gad-military-2.png";

const gadPoses = [gadMilitary1, gadMilitary2];

import bannerReuben from "@/assets/banners/reuben.png";
import bannerSimeon from "@/assets/banners/simeon.png";
import bannerLevi from "@/assets/banners/levi.png";
import bannerJudah from "@/assets/banners/judah.png";
import bannerDan from "@/assets/banners/dan.png";
import bannerNaphtali from "@/assets/banners/naphtali.png";
import bannerGad from "@/assets/banners/gad.png";
import bannerAsher from "@/assets/banners/asher.png";
import bannerIssachar from "@/assets/banners/issachar.png";
import bannerZebulun from "@/assets/banners/zebulun.png";
import bannerJoseph from "@/assets/banners/joseph.png";
import bannerBenjamin from "@/assets/banners/benjamin.png";

const tribalBanners = [
  { name: "Reuben", img: bannerReuben },
  { name: "Simeon", img: bannerSimeon },
  { name: "Levi", img: bannerLevi },
  { name: "Judah", img: bannerJudah },
  { name: "Dan", img: bannerDan },
  { name: "Naphtali", img: bannerNaphtali },
  { name: "Gad", img: bannerGad },
  { name: "Asher", img: bannerAsher },
  { name: "Issachar", img: bannerIssachar },
  { name: "Zebulun", img: bannerZebulun },
  { name: "Joseph", img: bannerJoseph },
  { name: "Benjamin", img: bannerBenjamin },
];

const opponents = [
  { name: "NIMROD", title: "The Usurper King" },
  { name: "AHAB", title: "The Weak King" },
  { name: "CONSTANTINE", title: "The Emperor" },
  { name: "BALAAM", title: "Prophet for Hire" },
  { name: "PHARAOH", title: "The False Deity" },
  { name: "DARWIN", title: "The Deceiver" },
  { name: "THE FALSE PROPHET", title: "Balaam's Spirit" },
];

// Villain silhouette images — we'll use styled text medallions that rotate
const villainImages = [
  gadMilitary1, // placeholder — will use text overlay instead
  gadMilitary2,
];

interface ThunderdomeEntryProps {
  onEnter: () => void;
  onExit: () => void;
  onOpenStorefront?: () => void;
  gadImage: { src: string; alt: string };
}

export const ThunderdomeEntry = ({ onEnter, onExit, onOpenStorefront, gadImage }: ThunderdomeEntryProps) => {
  const [opponentIndex, setOpponentIndex] = useState(0);
  const [gadPoseIndex, setGadPoseIndex] = useState(0);
  const musicRef = useRef<HTMLAudioElement>(null);

  // Auto-play music on mount (continues from landing page)
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = 0.65;
      musicRef.current.play().catch(() => {});
    }
    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpponentIndex((prev) => (prev + 1) % opponents.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGadPoseIndex((prev) => (prev + 1) % gadPoses.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = opponents[opponentIndex];

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <audio ref={musicRef} src="/audio/warning-in-the-dark.mp3" loop preload="auto" />
      <BrandHeader />
      {/* Arena background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse 58% 50% at 50% 56%, hsl(35 44% 24%) 0%, hsl(18 28% 12%) 44%, hsl(0 0% 4%) 100%)`,
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 40px, hsl(32 28% 42% / 0.45) 40px, hsl(32 28% 42% / 0.45) 41px)`,
        }}
      />

      {/* Arena glow */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 28% 38% at 50% 45%, hsl(45 82% 74% / 0.24) 0%, transparent 100%),
            radial-gradient(ellipse 48% 58% at 50% 48%, hsl(12 72% 50% / 0.1) 0%, transparent 100%),
            radial-gradient(ellipse 14% 82% at 50% 0%, hsl(45 65% 86% / 0.08) 0%, transparent 100%)
          `,
        }}
      />

      {/* Arena circles */}
      <div className="absolute inset-0 z-[3] pointer-events-none flex items-center justify-center">
        <div className="relative" style={{ width: "min(86vw, 86vh)", height: "min(86vw, 86vh)" }}>
          <svg viewBox="0 0 400 400" className="w-full h-full absolute inset-0">
            <defs>
              <radialGradient id="arena-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(45 82% 60%)" stopOpacity="0.16" />
                <stop offset="55%" stopColor="hsl(12 72% 44%)" stopOpacity="0.08" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="200" r="190" fill="url(#arena-glow)" />
            <circle cx="200" cy="200" r="190" fill="none" stroke="hsl(12 72% 44%)" strokeWidth="0.8" opacity="0.28" />
            <circle cx="200" cy="200" r="160" fill="none" stroke="hsl(45 82% 60%)" strokeWidth="0.5" opacity="0.18" />
            <circle cx="200" cy="200" r="82" fill="none" stroke="hsl(45 82% 60%)" strokeWidth="0.4" opacity="0.22" strokeDasharray="4 4" />
          </svg>
        </div>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 54% 54% at 50% 48%, transparent 34%, hsl(0 0% 0% / 0.28) 62%, hsl(0 0% 0% / 0.74) 100%)`,
        }}
      />

      {/* Smoke */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <div
          className="absolute w-[62%] h-[40%] top-[18%] left-[19%]"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, hsl(45 80% 70% / 0.08) 0%, transparent 70%)`,
            animation: "smoke-drift 15s ease-in-out infinite",
            filter: "blur(42px)",
          }}
        />
      </div>

      {/* Tribal banners */}
      <div className="absolute inset-0 z-[6] pointer-events-none hidden md:block">
        {tribalBanners.map((tribe, i) => {
          const isGad = tribe.name === "Gad";
          if (isGad) return null;
          const nonGadIndex = i > 6 ? i - 1 : i;
          const startAngle = -60;
          const arcSpan = 300;
          const angle = (startAngle + nonGadIndex * (arcSpan / 10)) * (Math.PI / 180);
          const radiusX = 46;
          const radiusY = 44;
          const x = 50 + radiusX * Math.cos(angle);
          const y = 50 + radiusY * Math.sin(angle);
          return (
            <div key={tribe.name} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}>
              <div className="w-10 h-16 lg:w-12 lg:h-20 overflow-hidden" style={{ opacity: 0.52, filter: "brightness(0.9) saturate(1.05)" }}>
                <img src={tribe.img} alt={`Banner of ${tribe.name}`} className="w-full h-full object-contain" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Gad banner top-left */}
      <div className="absolute left-[1%] top-[5%] z-[8] pointer-events-none hidden md:block" style={{ width: "80px", height: "140px" }}>
        <div className="w-full h-full overflow-hidden" style={{ opacity: 0.8, filter: "brightness(1.02) saturate(1.08)", maskImage: "linear-gradient(to right, black 60%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, black 60%, transparent 100%)" }}>
          <img src={bannerGad} alt="Banner of Gad" className="w-full h-full object-contain drop-shadow-[0_0_18px_hsl(45,82%,60%,0.35)]" />
        </div>
      </div>

      {/* LEFT PANEL — VILLAINS (bad guys) rotating */}
      <div className="absolute left-0 top-0 bottom-0 w-[14%] md:w-[18%] z-[10] overflow-hidden">
        {/* Dark background for villain side */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(90deg, hsl(0 0% 3%) 0%, hsl(0 0% 5% / 0.95) 60%, transparent 100%)",
        }} />
        {/* Rotating villain names as large imposing text */}
        {opponents.map((villain, i) => (
          <div
            key={villain.name}
            className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700"
            style={{ opacity: i === opponentIndex ? 1 : 0 }}
          >
            <div className="text-center px-2">
              <p className="font-display text-lg md:text-2xl lg:text-3xl uppercase tracking-wider font-bold"
                style={{ color: "hsl(0 72% 50%)", textShadow: "0 0 30px hsl(0 72% 50% / 0.5), 0 0 60px hsl(0 50% 30% / 0.3)" }}>
                ?
              </p>
              <p className="font-display text-[10px] md:text-xs lg:text-sm uppercase tracking-[0.2em] font-bold mt-4"
                style={{ color: "hsl(0 60% 55%)", textShadow: "0 0 15px hsl(0 60% 55% / 0.4)" }}>
                {villain.name}
              </p>
              <p className="font-terminal text-[8px] md:text-[10px] mt-1 uppercase tracking-wide"
                style={{ color: "hsl(0 0% 55%)" }}>
                {villain.title}
              </p>
            </div>
          </div>
        ))}
        {/* Label */}
        <div className="absolute bottom-6 left-0 right-0 z-10 text-center">
          <p className="font-terminal text-[8px] md:text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "hsl(0 60% 50% / 0.7)" }}>
            CHALLENGER
          </p>
        </div>
      </div>

      {/* RIGHT PANEL — WARRIORS (good guys) rotating images */}
      <div className="absolute right-0 top-0 bottom-0 w-[14%] md:w-[18%] z-[10] overflow-hidden">
        {gadPoses.map((pose, i) => (
          <img
            key={i}
            src={pose}
            alt={`Warriors of Israel - Pose ${i + 1}`}
            className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000"
            style={{
              opacity: i === gadPoseIndex ? 1 : 0,
              filter: "brightness(0.75) contrast(1.35) saturate(0.85)",
              maskImage: "linear-gradient(to left, black 55%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to left, black 55%, transparent 100%)",
            }}
          />
        ))}
        <div className="absolute bottom-6 right-0 left-0 z-10 text-center">
          <p className="font-display text-[9px] md:text-xs tracking-[0.2em] uppercase font-bold"
            style={{ color: "hsl(45 85% 58%)", textShadow: "0 0 10px hsl(45 85% 58% / 0.4)" }}>
            THE MIGHTY MEN
          </p>
        </div>
      </div>

      {/* CENTER CONTENT — Gad stationary + simplified text */}
      <div className="absolute inset-0 z-[20] flex flex-col items-center justify-center p-4">
        {/* Gad stationary portrait */}
        <div className="relative mb-2">
          <img
            src={gadImage.src}
            alt={gadImage.alt}
            className="w-auto max-w-[340px] md:max-w-[420px] lg:max-w-[480px]"
            style={{
              height: "auto",
              maxHeight: "55vh",
              objectFit: "contain",
              filter: "brightness(0.75) contrast(1.35) saturate(0.85)",
              borderRadius: "8px",
            }}
          />
        </div>

        {/* GAD vs VILLAIN matchup */}
        <div className="mt-3 flex items-center justify-center gap-2 md:gap-4">
          <p className="font-display text-sm md:text-lg uppercase tracking-wider font-bold"
            style={{ color: "hsl(12 76% 54%)", textShadow: "0 0 15px hsl(12 76% 54% / 0.35)" }}>
            GAD
          </p>
          <span className="font-display text-base md:text-xl font-bold"
            style={{ color: "hsl(45 82% 60%)", textShadow: "0 0 20px hsl(45 82% 60% / 0.38)" }}>
            vs.
          </span>
          <p className="font-display text-sm md:text-lg uppercase tracking-wider font-bold"
            style={{ color: "hsl(0 0% 92%)", textShadow: "0 0 15px hsl(0 0% 100% / 0.18)" }}>
            {current.name}
          </p>
        </div>

        {/* ENTER button — gold inside red box */}
        <button
          onClick={onEnter}
          className="mt-4 md:mt-6 px-12 md:px-20 py-3 md:py-4 font-display text-lg md:text-2xl uppercase tracking-[0.35em]
                     border-2 transition-all duration-500 cursor-pointer relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(12 60% 26% / 0.85) 0%, hsl(0 55% 16% / 0.95) 100%)",
            borderColor: "hsl(12 76% 54%)",
            color: "hsl(45 82% 60%)",
            boxShadow: "0 0 25px hsl(12 76% 54% / 0.35), inset 0 0 30px hsl(12 60% 20% / 0.25)",
            textShadow: "0 0 15px hsl(45 82% 60% / 0.4)",
            animation: "enter-pulse 2.5s ease-in-out infinite",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 50px hsl(12 76% 54% / 0.5), 0 0 100px hsl(12 76% 40% / 0.22), inset 0 0 30px hsl(12 60% 20% / 0.3)";
            e.currentTarget.style.borderColor = "hsl(45 82% 60%)";
            e.currentTarget.style.color = "hsl(45 90% 70%)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 0 25px hsl(12 76% 54% / 0.35), inset 0 0 30px hsl(12 60% 20% / 0.25)";
            e.currentTarget.style.borderColor = "hsl(12 76% 54%)";
            e.currentTarget.style.color = "hsl(45 82% 60%)";
          }}
        >
          ENTER
        </button>

        {/* THRESHING FLOOR — below the button */}
        <p className="mt-3 font-display text-lg md:text-2xl lg:text-3xl uppercase tracking-[0.25em] font-bold text-center"
          style={{
            color: "hsl(12 76% 54%)",
            textShadow: "0 0 20px hsl(12 76% 54% / 0.4), 0 2px 4px hsl(0 0% 0% / 0.8)",
          }}>
          THRESHING FLOOR
        </p>

        {onOpenStorefront && (
          <button
            onClick={onOpenStorefront}
            className="mt-3 px-8 py-2 font-terminal text-xs uppercase tracking-[0.25em] border rounded transition-all duration-500 hover:brightness-125"
            style={{
              background: "hsl(45 40% 20% / 0.3)",
              borderColor: "hsl(45 60% 45% / 0.4)",
              color: "hsl(45 80% 60%)",
            }}
          >
            ✦ Music & E-Books ✦
          </button>
        )}

        {/* Mobile villain pills */}
        <div className="mt-4 flex md:hidden items-center justify-center gap-2 overflow-x-auto pb-2">
          {opponents.map((v, i) => (
            <div
              key={v.name}
              className="flex-shrink-0 rounded-full border transition-all duration-500 px-3 py-2"
              style={{
                borderColor: i === opponentIndex ? "hsl(45 85% 58% / 0.7)" : "hsl(0 0% 100% / 0.12)",
                background: i === opponentIndex ? "hsl(0 0% 8% / 0.92)" : "hsl(0 0% 5% / 0.72)",
                opacity: i === opponentIndex ? 1 : 0.55,
              }}
            >
              <span className="font-terminal text-[9px] uppercase tracking-[0.2em] whitespace-nowrap"
                style={{ color: i === opponentIndex ? "hsl(45 85% 58%)" : "hsl(0 0% 76%)" }}>
                {v.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Exit button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={onExit}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 backdrop-blur-sm border transition-all duration-300"
          style={{ borderColor: "hsl(45 82% 60% / 0.3)", color: "hsl(45 82% 60% / 0.85)" }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-terminal text-[10px] tracking-widest">EXIT</span>
        </button>
      </div>

      <style>{`
        @keyframes smoke-drift {
          0% { transform: translateX(0) translateY(0); opacity: 0.5; }
          33% { transform: translateX(20px) translateY(-10px); opacity: 0.7; }
          66% { transform: translateX(-15px) translateY(5px); opacity: 0.4; }
          100% { transform: translateX(0) translateY(0); opacity: 0.5; }
        }
        @keyframes enter-pulse {
          0%, 100% { box-shadow: 0 0 25px hsl(12 76% 54% / 0.35), inset 0 0 30px hsl(12 60% 20% / 0.25); }
          50% { box-shadow: 0 0 40px hsl(12 76% 54% / 0.5), inset 0 0 40px hsl(12 60% 20% / 0.35); }
        }
      `}</style>
    </div>
  );
};
