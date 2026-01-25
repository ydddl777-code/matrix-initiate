import { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface FrequencyEmitterProps {
  onUnlockFull?: () => void;
}

export const FrequencyEmitter = ({ onUnlockFull }: FrequencyEmitterProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sampleMode, setSampleMode] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const progressRef = useRef<number>(0);

  const SAMPLE_DURATION = 30; // seconds
  const FULL_DURATION = 300; // 5 minutes in seconds

  const maxDuration = sampleMode ? SAMPLE_DURATION : FULL_DURATION;

  const drawWaveform = useCallback((intensity: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;

    // Clear canvas
    ctx.fillStyle = "hsl(240 20% 98%)";
    ctx.fillRect(0, 0, width, height);

    // Draw center line
    ctx.strokeStyle = "hsl(270 50% 85%)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    if (!isPlaying) {
      // Static flat line when not playing
      ctx.strokeStyle = "hsl(270 70% 35%)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
      return;
    }

    // Generate seismic waveform data
    const points: { x: number; y: number }[] = [];
    const segments = 100;

    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * width;
      
      // Create jagged seismic pattern
      const baseNoise = Math.sin(i * 0.5 + Date.now() * 0.005) * 10;
      const bassHit = Math.random() > 0.85 ? (Math.random() - 0.5) * 60 * intensity : 0;
      const seismic = Math.sin(i * 0.2 + Date.now() * 0.01) * 15 * intensity;
      const jitter = (Math.random() - 0.5) * 8 * intensity;
      
      const y = centerY + baseNoise + bassHit + seismic + jitter;
      points.push({ x, y });
    }

    // Draw the waveform
    ctx.strokeStyle = "hsl(270 70% 35%)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();

    // Add glow effect for peaks
    ctx.strokeStyle = "hsl(45 90% 55% / 0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(2, 2);
    }
  }, []);

  useEffect(() => {
    let lastTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (isPlaying) {
        progressRef.current += delta;
        if (progressRef.current >= maxDuration) {
          progressRef.current = 0;
          if (sampleMode) {
            setIsPlaying(false);
          }
        }
        setProgress(progressRef.current);
      }

      const intensity = isPlaying ? 0.8 + Math.sin(Date.now() * 0.003) * 0.2 : 0;
      drawWaveform(intensity);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, sampleMode, maxDuration, drawWaveform]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleInitiate = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      progressRef.current = 0;
      setProgress(0);
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative backdrop-blur-md bg-white/80 border border-sanctuary-primary/20 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-sanctuary-primary/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg text-sanctuary-primary font-bold tracking-wide">
              FREQUENCY EMITTER
            </h3>
            <p className="font-terminal text-xs text-sanctuary-muted mt-1">
              TRACK: "THE UNSEALED BOOK" • ROOTS/DUB
            </p>
          </div>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 text-sanctuary-muted hover:text-sanctuary-primary transition-colors"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </div>

      {/* Waveform Display */}
      <div className="px-6 py-6">
        <div className="relative bg-sanctuary-bg border border-sanctuary-primary/10 rounded overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-24"
            style={{ display: "block" }}
          />
          {/* Progress overlay */}
          <div 
            className="absolute top-0 left-0 h-full bg-sanctuary-gold/10 transition-all duration-100"
            style={{ width: `${(progress / maxDuration) * 100}%` }}
          />
        </div>

        {/* Time display */}
        <div className="flex justify-between mt-2 font-terminal text-xs text-sanctuary-muted">
          <span>{formatTime(progress)}</span>
          <span className="text-sanctuary-primary font-bold">
            {sampleMode ? "SAMPLE MODE" : "FULL FREQUENCY"}
          </span>
          <span>{formatTime(maxDuration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 pb-6 space-y-3">
        <div className="flex gap-3">
          {/* Initiate Button */}
          <button
            onClick={handleInitiate}
            className={`flex-1 py-3 font-display text-sm uppercase tracking-widest border-2 transition-all ${
              isPlaying
                ? "bg-sanctuary-primary text-white border-sanctuary-primary"
                : "bg-transparent text-sanctuary-primary border-sanctuary-primary hover:bg-sanctuary-primary/10"
            }`}
          >
            {isPlaying ? "TERMINATE" : "INITIATE AUDIO"}
          </button>

          {/* Sample Mode Toggle */}
          <button
            onClick={() => {
              setSampleMode(!sampleMode);
              setIsPlaying(false);
              progressRef.current = 0;
              setProgress(0);
            }}
            className={`px-4 py-3 font-terminal text-xs uppercase border-2 transition-all ${
              sampleMode
                ? "bg-sanctuary-gold/20 text-sanctuary-gold border-sanctuary-gold"
                : "bg-transparent text-sanctuary-muted border-sanctuary-muted/30 hover:border-sanctuary-muted"
            }`}
          >
            SAMPLE
          </button>
        </div>

        {/* Unlock Button */}
        <button
          onClick={onUnlockFull}
          className="w-full py-3 font-display text-sm uppercase tracking-widest bg-gradient-to-r from-sanctuary-gold to-sanctuary-gold/80 text-sanctuary-bg border-2 border-sanctuary-gold hover:shadow-lg transition-all"
        >
          UNLOCK FULL FREQUENCY — $5.00
        </button>
      </div>
    </div>
  );
};
