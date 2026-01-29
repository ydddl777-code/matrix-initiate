import { useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useHeartbeatAudio } from "@/hooks/useHeartbeatAudio";

interface HeartbeatMonitorProps {
  state: "normal" | "vitality" | "flatline";
  isMuted?: boolean;
  onToggleMute?: () => void;
  isExternalAudioPlaying?: boolean;
}

export const HeartbeatMonitor = ({ 
  state, 
  isMuted = false, 
  onToggleMute,
  isExternalAudioPlaying = false 
}: HeartbeatMonitorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const offsetRef = useRef(0);

  // Audio hook
  useHeartbeatAudio({ state, isMuted, isExternalAudioPlaying });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;

    const drawHeartbeat = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = state === "flatline" ? "#ef4444" : "#d4af37";
      
      ctx.beginPath();
      ctx.strokeStyle = state === "flatline" ? "#ef4444" : "#d4af37";
      ctx.lineWidth = 2;

      const speed = state === "vitality" ? 4 : state === "flatline" ? 0 : 2;
      offsetRef.current += speed;

      for (let x = 0; x < width; x++) {
        const adjustedX = (x + offsetRef.current) % width;
        let y = centerY;

        if (state === "flatline") {
          y = centerY;
        } else {
          const cycle = adjustedX % 80;
          
          if (cycle > 25 && cycle < 32) {
            y = centerY - Math.sin((cycle - 25) * Math.PI / 7) * 6;
          } else if (cycle > 35 && cycle < 38) {
            y = centerY + 5;
          } else if (cycle > 38 && cycle < 45) {
            const peak = state === "vitality" ? 25 : 18;
            y = centerY - Math.sin((cycle - 38) * Math.PI / 7) * peak;
          } else if (cycle > 45 && cycle < 48) {
            y = centerY + 7;
          } else if (cycle > 52 && cycle < 62) {
            y = centerY - Math.sin((cycle - 52) * Math.PI / 10) * 8;
          }
        }

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      // Scanline effect
      ctx.shadowBlur = 0;
      ctx.fillStyle = state === "flatline" ? "rgba(239, 68, 68, 0.08)" : "rgba(212, 175, 55, 0.04)";
      for (let i = 0; i < height; i += 3) {
        ctx.fillRect(0, i, width, 1);
      }

      animationRef.current = requestAnimationFrame(drawHeartbeat);
    };

    drawHeartbeat();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [state]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <canvas
        ref={canvasRef}
        width={400}
        height={60}
        className="w-full h-auto"
      />
      {/* Pulse indicator with mute toggle */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {/* Mute button for EKG sounds */}
        {onToggleMute && (
          <button
            onClick={onToggleMute}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all 
                       ${isMuted 
                         ? "bg-red-600 hover:bg-red-500 border border-red-400" 
                         : "bg-battlefield-gold/20 hover:bg-battlefield-gold/30 border border-battlefield-gold/50"
                       }`}
            title={isMuted ? "Unmute EKG" : "Mute EKG"}
          >
            {isMuted ? (
              <VolumeX className="w-3 h-3 text-white" />
            ) : (
              <Volume2 className="w-3 h-3 text-battlefield-gold" />
            )}
          </button>
        )}
        
        {/* Status indicator */}
        <div 
          className={`w-2.5 h-2.5 rounded-full ${
            state === "flatline" 
              ? "bg-red-500" 
              : state === "vitality"
              ? "bg-battlefield-gold animate-ping"
              : "bg-battlefield-gold animate-pulse"
          }`}
        />
        <span className="font-terminal text-xs text-battlefield-gold">
          {state === "flatline" ? "FLAT" : state === "vitality" ? "LIFE" : "PULSE"}
        </span>
      </div>
    </div>
  );
};
