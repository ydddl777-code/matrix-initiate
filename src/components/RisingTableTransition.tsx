import { useState, useEffect } from "react";
import { BrandHeader } from "./BrandHeader";
import gadWelcoming from "@/assets/gad-welcoming-real.jpg";

import tribeBenjamin from "@/assets/tribes/benjamin.jpeg";
import tribeJudah from "@/assets/tribes/judah.jpeg";
import tribeLevi from "@/assets/tribes/levi.jpeg";

interface RisingTableTransitionProps {
  onComplete: () => void;
  gadImage: { src: string; alt: string };
}

export const RisingTableTransition = ({ onComplete, gadImage }: RisingTableTransitionProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fade in the raised-table scene
    const t1 = setTimeout(() => setVisible(true), 100);
    // After holding for 3 seconds, transition to chat
    const t2 = setTimeout(() => onComplete(), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 bg-black overflow-hidden transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <BrandHeader />

      {/* Same arena background as ThunderdomeEntry */}
      <div className="absolute inset-0 z-0" style={{
        background: `radial-gradient(ellipse 58% 50% at 50% 56%, hsl(35 44% 24%) 0%, hsl(18 28% 12%) 44%, hsl(0 0% 4%) 100%)`,
      }} />

      {/* Grid lines */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.07]" style={{
        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 40px, hsl(32 28% 42% / 0.45) 40px, hsl(32 28% 42% / 0.45) 41px)`,
      }} />

      {/* Arena glow */}
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 28% 38% at 50% 45%, hsl(45 82% 74% / 0.24) 0%, transparent 100%),
          radial-gradient(ellipse 48% 58% at 50% 48%, hsl(12 72% 50% / 0.1) 0%, transparent 100%)
        `,
      }} />

      {/* Vignette */}
      <div className="absolute inset-0 z-[4] pointer-events-none" style={{
        background: `radial-gradient(ellipse 54% 54% at 50% 48%, transparent 34%, hsl(0 0% 0% / 0.28) 62%, hsl(0 0% 0% / 0.74) 100%)`,
      }} />

      {/* Tribal standards on back wall — same as arena */}
      <div className="absolute inset-0 z-[6] pointer-events-none hidden md:flex items-center justify-center">
        <div className="relative" style={{ width: "min(86vw, 86vh)", height: "min(86vw, 86vh)" }}>
          <div className="absolute flex flex-col items-center"
            style={{ top: "22%", left: "18%", transform: "translate(-50%, 0)" }}>
            <div className="w-8 lg:w-11 h-14 lg:h-20 overflow-hidden rounded-sm"
              style={{ boxShadow: "0 4px 20px hsl(0 0% 0% / 0.7)", border: "1px solid hsl(30 20% 25% / 0.2)", opacity: 0.3, filter: "brightness(0.4) saturate(0.6)" }}>
              <img src={tribeLevi} alt="Standard of Levi" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="absolute flex flex-col items-center"
            style={{ top: "18%", left: "50%", transform: "translate(-50%, 0)" }}>
            <div className="w-9 lg:w-13 h-16 lg:h-22 overflow-hidden rounded-sm"
              style={{ boxShadow: "0 4px 25px hsl(0 0% 0% / 0.7)", border: "1px solid hsl(30 20% 25% / 0.25)", opacity: 0.4, filter: "brightness(0.45) saturate(0.65)" }}>
              <img src={tribeJudah} alt="Standard of Judah" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="absolute flex flex-col items-center"
            style={{ top: "22%", right: "18%", transform: "translate(50%, 0)" }}>
            <div className="w-8 lg:w-11 h-14 lg:h-20 overflow-hidden rounded-sm"
              style={{ boxShadow: "0 4px 20px hsl(0 0% 0% / 0.7)", border: "1px solid hsl(30 20% 25% / 0.2)", opacity: 0.3, filter: "brightness(0.4) saturate(0.6)" }}>
              <img src={tribeBenjamin} alt="Standard of Benjamin" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* CENTER — The raised oval table with pedestal leg */}
      <div className="absolute inset-0 z-[10] flex items-center justify-center">
        <div className="relative" style={{ width: "min(70vw, 500px)", height: "min(55vh, 400px)" }}>

          {/* Pedestal leg — single thick center column */}
          <div className="absolute left-1/2 -translate-x-1/2 z-[1]" style={{
            width: "10%",
            height: "28%",
            bottom: "8%",
            background: `linear-gradient(180deg, hsl(0 0% 25%) 0%, hsl(0 0% 15%) 50%, hsl(0 0% 10%) 100%)`,
            borderRadius: "6px",
            boxShadow: "inset -6px 0 12px hsl(0 0% 0% / 0.6), 4px 0 10px hsl(0 0% 0% / 0.4), 0 8px 20px hsl(0 0% 0% / 0.5)",
          }} />

          {/* Pedestal base — wider disc at the bottom */}
          <div className="absolute left-1/2 -translate-x-1/2 z-[1]" style={{
            width: "22%",
            height: "4%",
            bottom: "7%",
            background: `linear-gradient(180deg, hsl(0 0% 20%) 0%, hsl(0 0% 10%) 100%)`,
            borderRadius: "50%",
            boxShadow: "0 4px 15px hsl(0 0% 0% / 0.6)",
          }} />

          {/* Shadow on the ground beneath table */}
          <div className="absolute left-1/2 -translate-x-1/2 z-[0]" style={{
            width: "80%",
            height: "8%",
            bottom: "3%",
            background: `radial-gradient(ellipse at 50% 50%, hsl(0 0% 0% / 0.6) 0%, transparent 70%)`,
            filter: "blur(8px)",
          }} />

          {/* The oval table surface — elevated, seen at slight angle */}
          <div className="absolute z-[2]" style={{
            left: "5%",
            right: "5%",
            top: "20%",
            height: "42%",
            borderRadius: "50%",
            background: `
              radial-gradient(ellipse 80% 70% at 50% 45%, hsl(25 15% 22%) 0%, hsl(20 12% 16%) 55%, hsl(15 10% 11%) 100%)
            `,
            border: "2px solid hsl(45 60% 40% / 0.3)",
            boxShadow: `
              0 0 30px hsl(45 60% 40% / 0.15),
              inset 0 0 50px hsl(0 0% 0% / 0.4),
              0 15px 40px hsl(0 0% 0% / 0.5)
            `,
            transform: "perspective(800px) rotateX(25deg)",
          }}>
            {/* Surface texture */}
            <div className="absolute inset-0 rounded-[50%] opacity-[0.05]" style={{
              backgroundImage: `
                repeating-linear-gradient(45deg, transparent, transparent 8px, hsl(0 0% 50% / 0.3) 8px, hsl(0 0% 50% / 0.3) 9px)
              `,
            }} />

            {/* Decorative ring */}
            <div className="absolute inset-[8%] rounded-[50%]" style={{
              border: "1px solid hsl(45 50% 45% / 0.18)",
            }} />

            {/* Inner dashed ring */}
            <div className="absolute inset-[15%] rounded-[50%]" style={{
              border: "1px dashed hsl(45 50% 45% / 0.1)",
            }} />

            {/* Scroll on Gad's side */}
            <div className="absolute" style={{
              top: "30%", left: "14%",
              width: "16%", height: "10%",
              background: `linear-gradient(90deg, hsl(35 40% 50%) 0%, hsl(35 30% 38%) 50%, hsl(35 40% 50%) 100%)`,
              borderRadius: "50% / 100%",
              boxShadow: "0 2px 6px hsl(0 0% 0% / 0.5)",
              opacity: 0.5,
            }} />

            {/* Bible / book on challenger's side */}
            <div className="absolute" style={{
              bottom: "22%", right: "16%",
              width: "12%", height: "16%",
              background: `linear-gradient(180deg, hsl(15 30% 20%) 0%, hsl(10 25% 14%) 100%)`,
              borderRadius: "2px",
              border: "1px solid hsl(45 50% 40% / 0.25)",
              boxShadow: "0 2px 6px hsl(0 0% 0% / 0.5)",
              opacity: 0.4,
            }} />
          </div>

          {/* GAD — on the right side of the table, facing camera */}
          <div className="absolute right-[-8%] bottom-[5%] z-[5]" style={{
            width: "30%",
            height: "90%",
          }}>
            <img
              src={gadWelcoming}
              alt="Prophet Gad welcoming you to the table"
              className="w-full h-full object-cover object-top"
              style={{
                filter: "brightness(0.8) contrast(1.25) saturate(0.85)",
                maskImage: "linear-gradient(to left, black 50%, transparent 95%)",
                WebkitMaskImage: "linear-gradient(to left, black 50%, transparent 95%)",
              }}
            />
          </div>

          {/* Challenger silhouette — back to camera, left side */}
          <div className="absolute left-[-8%] bottom-[5%] z-[5]" style={{
            width: "28%",
            height: "85%",
          }}>
            <div className="w-full h-full" style={{
              background: `
                radial-gradient(ellipse 60% 20% at 50% 12%, hsl(0 0% 12%) 0%, transparent 100%),
                radial-gradient(ellipse 40% 50% at 50% 45%, hsl(0 0% 8%) 0%, transparent 100%),
                radial-gradient(ellipse 50% 25% at 50% 80%, hsl(0 0% 10%) 0%, transparent 100%)
              `,
              filter: "brightness(0.6)",
              maskImage: "linear-gradient(to right, black 50%, transparent 95%)",
              WebkitMaskImage: "linear-gradient(to right, black 50%, transparent 95%)",
            }} />
          </div>
        </div>
      </div>

      {/* "WELCOME" text from Gad */}
      <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 z-[20] text-center">
        <p className="font-display text-base md:text-lg tracking-[0.35em] uppercase"
          style={{
            color: "hsl(45 80% 55%)",
            textShadow: "0 0 20px hsl(45 80% 55% / 0.3)",
          }}>
          WELCOME TO THE TABLE
        </p>
        <p className="font-terminal text-[10px] mt-2 tracking-widest"
          style={{ color: "hsl(45 60% 45% / 0.5)" }}>
          THE THRESHING FLOOR IS SET
        </p>
      </div>
    </div>
  );
};
