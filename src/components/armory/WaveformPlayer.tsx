import { useRef, useEffect, useState, useCallback } from "react";
import WaveSurfer from "wavesurfer.js";
import { Play, Pause, Lock } from "lucide-react";

interface WaveformPlayerProps {
  audioUrl: string;
  isUnlocked: boolean;
  previewDuration?: number; // seconds
  onPreviewEnd?: () => void;
}

export const WaveformPlayer = ({
  audioUrl,
  isUnlocked,
  previewDuration = 45,
  onPreviewEnd,
}: WaveformPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [previewEnded, setPreviewEnded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "hsl(45 80% 50% / 0.4)",
      progressColor: "hsl(45 80% 50%)",
      cursorColor: "hsl(270 70% 35%)",
      cursorWidth: 2,
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      height: 48,
      normalize: true,
      backend: "WebAudio",
    });

    wavesurfer.load(audioUrl);

    wavesurfer.on("ready", () => {
      setIsReady(true);
      setDuration(wavesurfer.getDuration());
      wavesurferRef.current = wavesurfer;
    });

    wavesurfer.on("audioprocess", () => {
      const time = wavesurfer.getCurrentTime();
      setCurrentTime(time);

      // Preview limit enforcement
      if (!isUnlocked && time >= previewDuration) {
        wavesurfer.pause();
        wavesurfer.seekTo(0);
        setIsPlaying(false);
        setPreviewEnded(true);
        onPreviewEnd?.();
      }
    });

    wavesurfer.on("play", () => setIsPlaying(true));
    wavesurfer.on("pause", () => setIsPlaying(false));
    wavesurfer.on("finish", () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    return () => {
      wavesurfer.destroy();
    };
  }, [audioUrl, isUnlocked, previewDuration, onPreviewEnd]);

  const togglePlay = useCallback(() => {
    if (previewEnded && !isUnlocked) {
      onPreviewEnd?.();
      return;
    }
    wavesurferRef.current?.playPause();
  }, [previewEnded, isUnlocked, onPreviewEnd]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const displayDuration = isUnlocked ? duration : Math.min(previewDuration, duration);

  return (
    <div className="space-y-2">
      {/* Waveform Container */}
      <div className="relative">
        <div
          ref={containerRef}
          className={`w-full rounded transition-opacity ${
            !isReady ? "opacity-50" : "opacity-100"
          }`}
        />
        
        {/* Preview Overlay */}
        {!isUnlocked && (
          <div 
            className="absolute top-0 right-0 h-full bg-gradient-to-l from-sanctuary-bg via-sanctuary-bg/80 to-transparent pointer-events-none"
            style={{ 
              width: `${Math.max(0, 100 - (previewDuration / duration) * 100)}%`,
              display: duration > 0 ? 'block' : 'none'
            }}
          >
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-red-600">
              <Lock className="w-3 h-3" />
              <span className="font-terminal text-xs">ENCRYPTED</span>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          disabled={!isReady}
          className={`p-2 transition-all ${
            previewEnded && !isUnlocked
              ? "bg-red-600/10 text-red-600"
              : "bg-sanctuary-gold/10 text-sanctuary-gold hover:bg-sanctuary-gold/20"
          } ${!isReady ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {previewEnded && !isUnlocked ? (
            <Lock className="w-4 h-4" />
          ) : isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>

        <div className="flex-1 flex items-center justify-between font-terminal text-xs">
          <span className="text-sanctuary-text">
            {formatTime(currentTime)}
          </span>
          <span className={previewEnded && !isUnlocked ? "text-red-600 font-bold" : "text-sanctuary-muted"}>
            {previewEnded && !isUnlocked ? (
              "SIGNAL TERMINATED"
            ) : !isUnlocked ? (
              `PREVIEW: ${formatTime(previewDuration)}`
            ) : (
              formatTime(duration)
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
