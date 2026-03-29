import { useState, useEffect } from "react";
import lionLogo from "@/assets/lion-logo.png";

interface RisingTableTransitionProps {
  onComplete: () => void;
}

export const RisingTableTransition = ({ onComplete }: RisingTableTransitionProps) => {
  const [phase, setPhase] = useState<"idle" | "rising" | "settling" | "fadeout">("idle");

  useEffect(() => {
    // Start rising after a brief beat
    const t1 = setTimeout(() => setPhase("rising"), 150);
    // Table settles at peak
    const t2 = setTimeout(() => setPhase("settling"), 1600);
    // Fade out to chat
    const t3 = setTimeout(() => setPhase("fadeout"), 2400);
    // Complete transition
    const t4 = setTimeout(() => onComplete(), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  const isRisen = phase === "rising" || phase === "settling" || phase === "fadeout";
  const isSettled = phase === "settling" || phase === "fadeout";
  const isFading = phase === "fadeout";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden transition-opacity duration-700"
      style={{
        background: "hsl(0 0% 3%)",
        opacity: isFading ? 0 : 1,
      }}
    >
      {/* Ambient arena glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 50% 40% at 50% 55%, hsl(35 44% 18% / 0.4) 0%, transparent 100%),
          radial-gradient(ellipse 30% 50% at 50% 50%, hsl(12 72% 30% / 0.15) 0%, transparent 100%)
        `,
      }} />

      {/* Overhead spotlight that intensifies as table rises */}
      <div
        className="absolute pointer-events-none transition-all duration-[1400ms] ease-out"
        style={{
          width: "40vw",
          height: "60vh",
          top: "-10%",
          left: "30%",
          background: `radial-gradient(ellipse at 50% 0%, hsl(45 70% 70% / ${isRisen ? 0.25 : 0.06}) 0%, transparent 70%)`,
        }}
      />

      {/* The oval table */}
      <div
        className="relative transition-all ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          width: "min(75vw, 520px)",
          height: "min(50vw, 340px)",
          transitionDuration: isRisen ? "1400ms" : "0ms",
          transform: isRisen
            ? `perspective(900px) rotateX(${isSettled ? "28deg" : "32deg"}) translateY(${isSettled ? "-8vh" : "-6vh"}) scale(${isSettled ? 1.02 : 1})`
            : "perspective(900px) rotateX(55deg) translateY(12vh) scale(0.9)",
        }}
      >
        {/* Table shadow on the ground — grows as it rises */}
        <div
          className="absolute transition-all duration-[1400ms] ease-out"
          style={{
            width: "120%",
            height: "40%",
            bottom: isRisen ? "-60%" : "-15%",
            left: "-10%",
            background: `radial-gradient(ellipse at 50% 50%, hsl(0 0% 0% / ${isRisen ? 0.7 : 0.3}) 0%, transparent 70%)`,
            filter: `blur(${isRisen ? 30 : 10}px)`,
          }}
        />

        {/* Center pedestal / leg */}
        <div
          className="absolute left-1/2 -translate-x-1/2 transition-all duration-[1400ms] ease-out"
          style={{
            width: "8%",
            bottom: isRisen ? "-55%" : "-10%",
            height: isRisen ? "55%" : "10%",
            background: `linear-gradient(180deg, hsl(0 0% 22%) 0%, hsl(0 0% 12%) 100%)`,
            borderRadius: "4px",
            boxShadow: "inset -4px 0 8px hsl(0 0% 0% / 0.5), 2px 0 6px hsl(0 0% 0% / 0.4)",
          }}
        />

        {/* Oval table surface */}
        <div
          className="absolute inset-0 rounded-[50%] overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse 80% 70% at 50% 40%, hsl(25 15% 22%) 0%, hsl(20 12% 14%) 60%, hsl(15 10% 10%) 100%)
            `,
            border: "2px solid hsl(45 60% 40% / 0.35)",
            boxShadow: `
              0 0 40px hsl(45 60% 40% / ${isRisen ? 0.2 : 0.08}),
              inset 0 0 60px hsl(0 0% 0% / 0.5),
              0 ${isRisen ? 20 : 4}px ${isRisen ? 60 : 15}px hsl(0 0% 0% / ${isRisen ? 0.6 : 0.3})
            `,
            transition: "box-shadow 1400ms ease-out",
          }}
        >
          {/* Surface texture — faint granite lines */}
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 8px, hsl(0 0% 50% / 0.3) 8px, hsl(0 0% 50% / 0.3) 9px),
              repeating-linear-gradient(-45deg, transparent, transparent 12px, hsl(0 0% 40% / 0.2) 12px, hsl(0 0% 40% / 0.2) 13px)
            `,
          }} />

          {/* Decorative ring on table edge */}
          <div className="absolute inset-[6%] rounded-[50%]" style={{
            border: "1px solid hsl(45 50% 45% / 0.2)",
          }} />

          {/* Inner ring */}
          <div className="absolute inset-[12%] rounded-[50%]" style={{
            border: "1px dashed hsl(45 50% 45% / 0.12)",
          }} />

          {/* Center emblem — Lion of Judah */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-full overflow-hidden transition-all duration-[1400ms]"
              style={{
                width: isRisen ? "22%" : "18%",
                height: isRisen ? "32%" : "26%",
                opacity: isRisen ? 0.7 : 0.3,
                boxShadow: `0 0 ${isRisen ? 30 : 10}px hsl(45 80% 50% / ${isRisen ? 0.4 : 0.15})`,
                border: "1.5px solid hsl(45 70% 50% / 0.4)",
              }}
            >
              <img src={lionLogo} alt="Lion of Judah" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Scroll prop (left side of table) */}
          <div
            className="absolute transition-opacity duration-[1000ms]"
            style={{
              top: "28%",
              left: "12%",
              width: "18%",
              height: "8%",
              opacity: isSettled ? 0.5 : 0,
              background: `linear-gradient(90deg, hsl(35 40% 55%) 0%, hsl(35 30% 40%) 50%, hsl(35 40% 55%) 100%)`,
              borderRadius: "50% / 100%",
              boxShadow: "0 2px 8px hsl(0 0% 0% / 0.5)",
            }}
          />

          {/* Bible prop (right side — challenger's) */}
          <div
            className="absolute transition-opacity duration-[1000ms]"
            style={{
              bottom: "25%",
              right: "14%",
              width: "14%",
              height: "18%",
              opacity: isSettled ? 0.45 : 0,
              background: `linear-gradient(180deg, hsl(15 30% 20%) 0%, hsl(10 25% 14%) 100%)`,
              borderRadius: "2px",
              border: "1px solid hsl(45 50% 40% / 0.3)",
              boxShadow: "0 2px 8px hsl(0 0% 0% / 0.5)",
            }}
          />

          {/* Hourglass timer (side of table) */}
          <div
            className="absolute transition-opacity duration-[1200ms] flex flex-col items-center"
            style={{
              top: "20%",
              right: "6%",
              opacity: isSettled ? 0.4 : 0,
            }}
          >
            <div style={{
              width: "6px",
              height: "16px",
              background: "linear-gradient(180deg, hsl(45 60% 50%) 0%, hsl(35 40% 35%) 40%, hsl(45 60% 50%) 100%)",
              clipPath: "polygon(0 0, 100% 0, 60% 50%, 100% 100%, 0 100%, 40% 50%)",
            }} />
          </div>
        </div>
      </div>

      {/* Status text */}
      <div
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 transition-opacity duration-700"
        style={{ opacity: isRisen && !isFading ? 1 : 0 }}
      >
        <p className="font-display text-sm md:text-base tracking-[0.4em] uppercase"
          style={{
            color: "hsl(45 80% 55%)",
            textShadow: "0 0 20px hsl(45 80% 55% / 0.3)",
          }}>
          {isSettled ? "THE TABLE IS SET" : "PREPARING THE THRESHING FLOOR"}
        </p>
      </div>
    </div>
  );
};
