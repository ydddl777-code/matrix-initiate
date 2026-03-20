import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import lionOfJudah from "@/assets/lion-of-judah.png";

// Villain imports
import nimrod from "@/assets/villains/nimrod.png";
import ahab from "@/assets/villains/ahab.png";
import constantine from "@/assets/villains/constantine.png";
import balaam from "@/assets/villains/balaam.png";
import pharaoh from "@/assets/villains/pharaoh.png";
import darwin from "@/assets/villains/darwin.png";
import falseProphet from "@/assets/villains/false-prophet.png";

// Tribal banner imports (birth order)
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

// Birth order — Gad (index 6) gets special treatment
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
  { name: "NIMROD", img: nimrod, title: "The Usurper King" },
  { name: "AHAB", img: ahab, title: "The Weak King" },
  { name: "CONSTANTINE", img: constantine, title: "The Emperor" },
  { name: "BALAAM", img: balaam, title: "Prophet for Hire" },
  { name: "PHARAOH", img: pharaoh, title: "The False Deity" },
  { name: "DARWIN", img: darwin, title: "The Deceiver" },
  { name: "THE FALSE PROPHET", img: falseProphet, title: "Balaam's Spirit" },
];

interface ThunderdomeEntryProps {
  onEnter: () => void;
  onExit: () => void;
  gadImages: { src: string; alt: string }[];
  gadIndex: number;
}

export const ThunderdomeEntry = ({ onEnter, onExit, gadImages, gadIndex }: ThunderdomeEntryProps) => {
  const [opponentIndex, setOpponentIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpponentIndex((prev) => (prev + 1) % opponents.length);
      setFadeKey((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const current = opponents[opponentIndex];

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* === MANHATTAN LOFT ARENA FLOOR === */}
      <div className="absolute inset-0 z-0" style={{
        background: `
          radial-gradient(ellipse 60% 50% at 50% 55%, hsl(25 10% 12%) 0%, hsl(0 0% 4%) 50%, hsl(0 0% 1%) 100%)
        `,
      }} />

      {/* Polished hardwood texture lines */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04]" style={{
        backgroundImage: `repeating-linear-gradient(
          90deg,
          transparent,
          transparent 40px,
          hsl(30 20% 30%) 40px,
          hsl(30 20% 30%) 41px
        )`,
      }} />

      {/* === CENTER SPOTLIGHT BEAM === */}
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 25% 35% at 50% 45%, hsl(45 60% 70% / 0.12) 0%, transparent 100%),
          radial-gradient(ellipse 40% 50% at 50% 45%, hsl(45 40% 60% / 0.06) 0%, transparent 100%),
          radial-gradient(ellipse 12% 80% at 50% 0%, hsl(45 50% 80% / 0.05) 0%, transparent 100%)
        `,
      }} />

      {/* === CIRCULAR ARENA RING === */}
      <div className="absolute inset-0 z-[3] pointer-events-none flex items-center justify-center">
        <div className="relative" style={{ width: 'min(85vw, 85vh)', height: 'min(85vw, 85vh)' }}>
          <svg viewBox="0 0 400 400" className="w-full h-full absolute inset-0">
            <defs>
              <radialGradient id="arena-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(0 70% 45%)" stopOpacity="0.08" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="200" r="190" fill="url(#arena-glow)" />
            <circle cx="200" cy="200" r="190" fill="none" stroke="hsl(0 70% 45%)" strokeWidth="0.5" opacity="0.2" />
            <circle cx="200" cy="200" r="160" fill="none" stroke="hsl(0 70% 45%)" strokeWidth="0.3" opacity="0.1" />
            <circle cx="200" cy="200" r="80" fill="none" stroke="hsl(0 50% 40%)" strokeWidth="0.3" opacity="0.15" strokeDasharray="4 4" />
            {/* Cross lines */}
            <line x1="200" y1="10" x2="200" y2="390" stroke="hsl(0 50% 40%)" strokeWidth="0.2" opacity="0.06" />
            <line x1="10" y1="200" x2="390" y2="200" stroke="hsl(0 50% 40%)" strokeWidth="0.2" opacity="0.06" />
          </svg>
        </div>
      </div>

      {/* === DARKNESS EDGES — city lights barely visible === */}
      <div className="absolute inset-0 z-[4] pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 50% 50% at 50% 50%, transparent 30%, hsl(0 0% 0% / 0.7) 60%, hsl(0 0% 0% / 0.95) 80%)
        `,
      }} />
      {/* Faint window/bookshelf silhouettes at edges */}
      <div className="absolute inset-0 z-[3] pointer-events-none hidden md:block">
        {[...Array(6)].map((_, i) => (
          <div key={`window-${i}`} className="absolute" style={{
            left: i < 3 ? `${2 + i * 3}%` : undefined,
            right: i >= 3 ? `${2 + (i - 3) * 3}%` : undefined,
            top: `${20 + i * 10}%`,
            width: '8px',
            height: '40px',
            background: `linear-gradient(180deg, hsl(210 30% 30% / 0.08) 0%, hsl(45 40% 50% / 0.04) 50%, transparent 100%)`,
            borderRadius: '1px',
          }} />
        ))}
      </div>

      {/* === SMOKE / HAZE IN SPOTLIGHT === */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <div className="absolute w-[60%] h-[40%] top-[20%] left-[20%]" style={{
          background: `radial-gradient(ellipse at 50% 50%, hsl(0 0% 50% / 0.04) 0%, transparent 70%)`,
          animation: 'smoke-drift 15s ease-in-out infinite',
          filter: 'blur(40px)',
        }} />
      </div>

      {/* === 12 TRIBES BANNERS — Perimeter === */}
      <div className="absolute inset-0 z-[6] pointer-events-none hidden md:block">
        {tribalBanners.map((tribe, i) => {
          const isGad = tribe.name === "Gad";
          // Distribute 11 non-Gad banners around perimeter (Gad goes behind left panel)
          if (isGad) return null;
          // Position the 11 remaining banners in an arc around the arena
          const nonGadIndex = i > 6 ? i - 1 : i; // adjust index since Gad is removed
          const startAngle = -60; // degrees, starting from upper-right
          const arcSpan = 300; // degrees of arc (leaving gap at left for Gad panel)
          const angle = (startAngle + nonGadIndex * (arcSpan / 10)) * (Math.PI / 180);
          const radiusX = 46;
          const radiusY = 44;
          const x = 50 + radiusX * Math.cos(angle);
          const y = 50 + radiusY * Math.sin(angle);
          return (
            <div
              key={tribe.name}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="w-10 h-16 lg:w-12 lg:h-20 overflow-hidden"
                style={{
                  opacity: 0.3,
                  filter: 'brightness(0.5) saturate(0.7)',
                }}>
                <img src={tribe.img} alt={`Banner of ${tribe.name}`}
                  className="w-full h-full object-contain" />
              </div>
            </div>
          );
        })}
      </div>

      {/* === GAD'S BANNER — Behind left panel, special treatment === */}
      <div className="absolute left-[1%] top-[5%] z-[8] pointer-events-none hidden md:block"
        style={{
          width: '80px',
          height: '140px',
        }}>
        <div className="w-full h-full overflow-hidden"
          style={{
            opacity: 0.55,
            filter: 'brightness(0.7) saturate(0.9)',
            maskImage: 'linear-gradient(to right, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 60%, transparent 100%)',
          }}>
          <img src={bannerGad} alt="Banner of Gad — His House, His Tribe"
            className="w-full h-full object-contain drop-shadow-[0_0_15px_hsl(45,80%,50%,0.3)]" />
        </div>
      </div>

      {/* === VILLAIN PORTRAITS — Rotating perimeter === */}
      <div className="absolute inset-0 z-[7] pointer-events-none hidden md:block">
        {opponents.map((villain, i) => {
          const angle = (i * (360 / opponents.length) - 90) * (Math.PI / 180);
          const radiusX = 36;
          const radiusY = 34;
          const x = 50 + radiusX * Math.cos(angle);
          const y = 50 + radiusY * Math.sin(angle);
          const isActive = i === opponentIndex;
          return (
            <div
              key={villain.name}
              className="absolute transition-all duration-700"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                opacity: isActive ? 0.9 : 0.25,
                filter: isActive ? 'brightness(1) saturate(1.2)' : 'brightness(0.3) saturate(0.5)',
              }}
            >
              <div className="w-16 h-20 lg:w-20 lg:h-24 rounded overflow-hidden border"
                style={{
                  borderColor: isActive ? 'hsl(0 70% 45% / 0.6)' : 'hsl(0 70% 45% / 0.15)',
                  boxShadow: isActive ? '0 0 20px hsl(0 70% 45% / 0.3)' : 'none',
                }}>
                <img src={villain.img} alt={villain.name} className="w-full h-full object-cover object-top" />
              </div>
              {isActive && (
                <p className="font-terminal text-[8px] text-center mt-1 tracking-wider"
                  style={{ color: 'hsl(0 70% 50%)' }}>{villain.name}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* === GAD — LEFT PANEL === */}
      <div className="absolute left-0 top-0 bottom-0 w-[14%] md:w-[16%] z-[10] overflow-hidden pointer-events-none">
        <img
          src={gadImages[gadIndex].src}
          alt={gadImages[gadIndex].alt}
          className="h-full w-full object-cover object-center transition-opacity duration-1000"
          style={{
            filter: "brightness(0.6) contrast(1.3) sepia(0.15)",
            maskImage: "linear-gradient(to right, black 50%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, black 50%, transparent 100%)",
          }}
        />
        <div className="absolute bottom-8 left-3 z-10">
          <p className="font-display text-xs md:text-sm tracking-[0.3em] uppercase font-bold"
            style={{ color: 'hsl(0 70% 50%)', textShadow: '0 0 10px hsl(0 70% 50% / 0.5)' }}>
            GAD
          </p>
        </div>
      </div>

      {/* === CHALLENGER — RIGHT PANEL (rotating villain) === */}
      <div className="absolute right-0 top-0 bottom-0 w-[14%] md:w-[16%] z-[10] overflow-hidden pointer-events-none">
        <img
          key={fadeKey}
          src={current.img}
          alt={current.name}
          className="h-full w-full object-cover object-top animate-fade-in"
          style={{
            filter: "brightness(0.5) contrast(1.3) sepia(0.2) hue-rotate(-5deg)",
            maskImage: "linear-gradient(to left, black 50%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to left, black 50%, transparent 100%)",
          }}
        />
        <div className="absolute bottom-8 right-3 z-10">
          <p className="font-display text-xs md:text-sm tracking-[0.3em] uppercase font-bold text-right"
            style={{ color: 'hsl(0 70% 50%)', textShadow: '0 0 10px hsl(0 70% 50% / 0.5)' }}>
            CHALLENGER
          </p>
        </div>
      </div>

      {/* === CENTER CONTENT === */}
      <div className="absolute inset-0 z-[20] flex items-center justify-center p-4">
        <div className="text-center max-w-2xl w-full">
          {/* Lion Crown Logo */}
          <img
            src={lionOfJudah}
            alt="Lion of Judah"
            className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 drop-shadow-[0_0_30px_hsl(0,70%,50%,0.5)]"
          />

          {/* THUNDERDOME — centered, scaled to fit */}
          <h1
            className="font-display text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.2em] font-bold text-center mx-auto"
            style={{
              color: 'hsl(0 70% 50%)',
              textShadow: `
                0 0 20px hsl(0 80% 40% / 0.6),
                0 0 60px hsl(0 70% 35% / 0.4),
                0 0 100px hsl(0 60% 30% / 0.2),
                0 2px 4px hsl(0 0% 0% / 0.8)
              `,
            }}
          >
            THUNDERDOME
          </h1>

          {/* THE TRUTH DOES NOT NEGOTIATE */}
          <p
            className="font-ceremonial text-xs md:text-sm mt-2 tracking-[0.4em] uppercase text-center"
            style={{
              color: 'hsl(45 80% 55%)',
              textShadow: '0 0 15px hsl(45 80% 50% / 0.3)',
            }}
          >
            The Truth Does Not Negotiate
          </p>

          {/* === MATCHUP DISPLAY — single line === */}
          <div className="mt-6 md:mt-10 flex items-center justify-center gap-2 md:gap-4 max-w-xl mx-auto">
            {/* Prophet Gad - Fixed */}
            <p className="font-display text-sm md:text-xl lg:text-2xl uppercase tracking-wider font-bold whitespace-nowrap"
              style={{
                color: 'hsl(0 70% 55%)',
                textShadow: '0 0 15px hsl(0 70% 50% / 0.4)',
              }}>
              GAD
            </p>

            {/* VS */}
            <span className="font-display text-lg md:text-2xl lg:text-3xl font-bold flex-shrink-0"
              style={{
                color: 'hsl(45 80% 55%)',
                textShadow: '0 0 20px hsl(45 80% 50% / 0.5)',
              }}>
              vs.
            </span>

            {/* Rotating Opponent */}
            <p
              key={fadeKey}
              className="font-display text-sm md:text-xl lg:text-2xl uppercase tracking-wider font-bold animate-fade-in whitespace-nowrap"
              style={{
                color: 'hsl(0 50% 40%)',
                textShadow: '0 0 15px hsl(0 70% 50% / 0.3)',
              }}
            >
              {current.name}
            </p>
          </div>

          {/* === ENTER BUTTON === */}
          <button
            onClick={onEnter}
            className="mt-8 md:mt-12 px-10 md:px-16 py-4 md:py-5 font-display text-base md:text-xl uppercase tracking-[0.3em]
                       border-2 transition-all duration-500 cursor-pointer group relative overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, hsl(0 60% 25% / 0.7) 0%, hsl(0 50% 15% / 0.9) 100%)',
              borderColor: 'hsl(0 70% 45%)',
              color: 'hsl(0 0% 95%)',
              boxShadow: `
                0 0 25px hsl(0 70% 45% / 0.4),
                inset 0 0 30px hsl(0 60% 20% / 0.3)
              `,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 50px hsl(0 70% 45% / 0.6), 0 0 100px hsl(0 70% 40% / 0.3), inset 0 0 30px hsl(0 60% 20% / 0.3)';
              e.currentTarget.style.borderColor = 'hsl(0 80% 55%)';
              e.currentTarget.style.background = 'linear-gradient(180deg, hsl(0 65% 30% / 0.8) 0%, hsl(0 55% 20% / 0.9) 100%)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 25px hsl(0 70% 45% / 0.4), inset 0 0 30px hsl(0 60% 20% / 0.3)';
              e.currentTarget.style.borderColor = 'hsl(0 70% 45%)';
              e.currentTarget.style.background = 'linear-gradient(180deg, hsl(0 60% 25% / 0.7) 0%, hsl(0 50% 15% / 0.9) 100%)';
            }}
          >
            ENTER
          </button>

          {/* Mobile villain carousel */}
          <div className="mt-6 flex md:hidden items-center justify-center gap-2 overflow-x-auto pb-2">
            {opponents.map((v, i) => (
              <div
                key={v.name}
                className="flex-shrink-0 w-12 h-16 rounded overflow-hidden border transition-all duration-500"
                style={{
                  borderColor: i === opponentIndex ? 'hsl(0 70% 45% / 0.6)' : 'hsl(0 70% 45% / 0.15)',
                  opacity: i === opponentIndex ? 1 : 0.4,
                  filter: i === opponentIndex ? 'brightness(1)' : 'brightness(0.4)',
                }}
              >
                <img src={v.img} alt={v.name} className="w-full h-full object-cover object-top" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === BACK BUTTON === */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={onExit}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 backdrop-blur-sm border transition-all duration-300"
          style={{ borderColor: "hsl(0 70% 45% / 0.3)", color: "hsl(0 70% 50% / 0.7)" }}
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
      `}</style>
    </div>
  );
};
