import { useState, useEffect } from "react";
import { HeartbeatMonitor } from "./HeartbeatMonitor";
import guardianAvatar from "@/assets/guardian-avatar.jpg";

type JudgmentState = "choosing" | "condemned" | "saved";

interface BattlefieldLandingProps {
  onEnterSanctuary: () => void;
}

export const BattlefieldLanding = ({ onEnterSanctuary }: BattlefieldLandingProps) => {
  const [judgmentState, setJudgmentState] = useState<JudgmentState>("choosing");
  const [heartbeatState, setHeartbeatState] = useState<"normal" | "vitality" | "flatline">("normal");
  const [showFlash, setShowFlash] = useState<"red" | "gold" | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleSurrender = () => {
    setJudgmentState("condemned");
    setHeartbeatState("flatline");
    setShowFlash("red");
    
    setTimeout(() => setShowFlash(null), 500);
    setTimeout(() => setShowMessage(true), 800);
  };

  const handleObey = () => {
    setJudgmentState("saved");
    setHeartbeatState("vitality");
    setShowFlash("gold");
    
    setTimeout(() => setShowFlash(null), 500);
    setTimeout(() => setShowMessage(true), 800);
    setTimeout(() => onEnterSanctuary(), 3000);
  };

  const handleReset = () => {
    setJudgmentState("choosing");
    setHeartbeatState("normal");
    setShowMessage(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-battlefield-bg">
      {/* Storm background effect */}
      <div 
        className="fixed inset-0 -z-20"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(75, 0, 130, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(30, 0, 60, 0.5) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 80%, rgba(40, 0, 80, 0.4) 0%, transparent 40%),
            linear-gradient(180deg, #0a0010 0%, #050008 50%, #000000 100%)
          `,
        }}
      />

      {/* Animated storm particles */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-battlefield-gold/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `storm-drift ${10 + Math.random() * 20}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Flash overlay */}
      {showFlash && (
        <div 
          className={`fixed inset-0 z-50 transition-opacity duration-300 ${
            showFlash === "red" ? "bg-red-600" : "bg-yellow-400"
          }`}
          style={{ animation: "flash 0.5s ease-out forwards" }}
        />
      )}

      {/* Guardian Avatar - subtle background presence */}
      <div 
        className="fixed inset-0 -z-5 flex items-center justify-center opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url(${guardianAvatar})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "grayscale(50%) brightness(0.5)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
        {/* Logo/Title */}
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-battlefield-gold tracking-wider battlefield-text-glow">
            THE JUDGMENT
          </h1>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-battlefield-gold" />
            <span className="font-terminal text-xs text-battlefield-gold/60">FINAL HOUR</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-battlefield-gold" />
          </div>
        </div>

        {/* Heartbeat Monitor */}
        <div className="my-12">
          <HeartbeatMonitor state={heartbeatState} />
        </div>

        {/* The Ultimatum Text */}
        <div className="mb-12">
          <p className="font-ceremonial text-xl md:text-2xl text-battlefield-gold/90 italic leading-relaxed">
            "The time has come to choose a side—
            <br />
            <span className="text-white font-bold not-italic">to obey or to die.</span>"
          </p>
        </div>

        {/* Choice Buttons or Result Message */}
        {judgmentState === "choosing" ? (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            {/* Surrender Button */}
            <button
              onClick={handleSurrender}
              className="group relative px-8 py-4 min-w-[220px] font-display text-sm uppercase tracking-widest 
                         bg-gray-900/50 text-gray-500 border border-gray-700/50
                         hover:bg-gray-800/60 hover:text-gray-400 hover:border-gray-600
                         transition-all duration-300"
            >
              <span className="relative z-10">Surrender to the System</span>
              <div className="absolute inset-0 bg-gray-800/0 group-hover:bg-gray-800/20 transition-all" />
            </button>

            {/* Obey Button */}
            <button
              onClick={handleObey}
              className="group relative px-8 py-4 min-w-[220px] font-display text-sm uppercase tracking-widest
                         bg-gradient-to-r from-battlefield-gold/20 to-battlefield-gold/10 
                         text-battlefield-gold border-2 border-battlefield-gold
                         hover:from-battlefield-gold/30 hover:to-battlefield-gold/20
                         hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]
                         transition-all duration-300 battlefield-border-glow"
            >
              <span className="relative z-10">Obey the Truth</span>
              <div className="absolute inset-[-2px] border border-battlefield-gold/30 pointer-events-none" />
            </button>
          </div>
        ) : (
          <div className="animate-fade-in">
            {judgmentState === "condemned" ? (
              <div className="space-y-6">
                <p className="font-display text-3xl md:text-4xl text-red-500 tracking-wider animate-pulse">
                  JUDGMENT SEALED
                </p>
                <p className="font-terminal text-lg text-red-400/80">
                  YOU ARE CHAFF.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-8 px-6 py-2 font-terminal text-xs text-gray-500 border border-gray-700
                             hover:text-gray-400 hover:border-gray-600 transition-all"
                >
                  [ RESET SIMULATION ]
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="font-display text-3xl md:text-4xl text-battlefield-gold tracking-wider battlefield-text-glow">
                  LIFE PRESERVED
                </p>
                <p className="font-terminal text-lg text-battlefield-gold/80">
                  ENTER THE SANCTUARY...
                </p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="w-2 h-2 rounded-full bg-battlefield-gold animate-ping" />
                  <span className="font-terminal text-xs text-battlefield-gold/60">TRANSITIONING</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Scripture reference */}
        <div className="mt-16">
          <p className="font-terminal text-xs text-battlefield-gold/40">
            "I have set before you life and death, blessing and cursing: therefore choose life"
            <br />
            <span className="text-battlefield-neon">— Deuteronomy 30:19</span>
          </p>
        </div>
      </div>

      {/* Corner HUD elements */}
      <div className="fixed top-4 left-4 font-terminal text-xs text-battlefield-gold/40">
        <div>STATUS: JUDGMENT ACTIVE</div>
        <div>SECTOR: OUTER GATE</div>
      </div>
      <div className="fixed top-4 right-4 font-terminal text-xs text-battlefield-gold/40 text-right">
        <div>FREQ: 777 MHz</div>
        <div>█████████░</div>
      </div>
      <div className="fixed bottom-4 left-4 font-terminal text-xs text-battlefield-gold/40">
        <div>© THE HEADQUARTERS 2024</div>
      </div>
      <div className="fixed bottom-4 right-4 font-terminal text-xs text-battlefield-gold/40 text-right">
        <div>ENCRYPTED</div>
      </div>

      <style>{`
        @keyframes storm-drift {
          0% { 
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { 
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }
        
        @keyframes flash {
          0% { opacity: 0.8; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};
