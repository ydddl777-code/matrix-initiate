import { useEffect, useRef } from "react";

interface HeartbeatMonitorProps {
  state: "normal" | "vitality" | "flatline";
}

export const HeartbeatMonitor = ({ state }: HeartbeatMonitorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const offsetRef = useRef(0);

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
      ctx.shadowBlur = 20;
      ctx.shadowColor = state === "flatline" ? "#ef4444" : "#d4af37";
      
      ctx.beginPath();
      ctx.strokeStyle = state === "flatline" ? "#ef4444" : "#d4af37";
      ctx.lineWidth = 3;

      const speed = state === "vitality" ? 4 : state === "flatline" ? 0 : 2;
      offsetRef.current += speed;

      for (let x = 0; x < width; x++) {
        const adjustedX = (x + offsetRef.current) % width;
        let y = centerY;

        if (state === "flatline") {
          // Flatline - straight line
          y = centerY;
        } else {
          // Heartbeat pattern
          const cycle = adjustedX % 120;
          
          if (cycle > 40 && cycle < 50) {
            // Small P wave
            y = centerY - Math.sin((cycle - 40) * Math.PI / 10) * 10;
          } else if (cycle > 55 && cycle < 60) {
            // Q dip
            y = centerY + 8;
          } else if (cycle > 60 && cycle < 70) {
            // R spike (main peak)
            const peak = state === "vitality" ? 50 : 35;
            y = centerY - Math.sin((cycle - 60) * Math.PI / 10) * peak;
          } else if (cycle > 70 && cycle < 75) {
            // S dip
            y = centerY + 12;
          } else if (cycle > 80 && cycle < 95) {
            // T wave
            y = centerY - Math.sin((cycle - 80) * Math.PI / 15) * 15;
          }
        }

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      // Add scanline effect
      ctx.shadowBlur = 0;
      ctx.fillStyle = state === "flatline" ? "rgba(239, 68, 68, 0.1)" : "rgba(212, 175, 55, 0.05)";
      for (let i = 0; i < height; i += 4) {
        ctx.fillRect(0, i, width, 2);
      }

      animationRef.current = requestAnimationFrame(drawHeartbeat);
    };

    drawHeartbeat();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [state]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <canvas
        ref={canvasRef}
        width={600}
        height={120}
        className="w-full h-auto"
      />
      {/* Pulse indicator */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
        <div 
          className={`w-3 h-3 rounded-full ${
            state === "flatline" 
              ? "bg-red-500" 
              : state === "vitality"
              ? "bg-battlefield-gold animate-ping"
              : "bg-battlefield-gold animate-pulse"
          }`}
        />
        <span className="font-terminal text-xs text-battlefield-gold">
          {state === "flatline" ? "FLATLINE" : state === "vitality" ? "LIFE" : "PULSE"}
        </span>
      </div>
    </div>
  );
};
