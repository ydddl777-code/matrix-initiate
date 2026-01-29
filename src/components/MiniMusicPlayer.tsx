import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, SkipForward } from "lucide-react";

const audioTracks = [
  { src: "/audio/thunder-road-gospel.mp3", title: "Thunder Road Gospel" },
  { src: "/audio/as-enoch-walked.mp3", title: "As Enoch Walked" },
  { src: "/audio/the-unsealed-book.mp3", title: "The Unsealed Book" },
];

export const MiniMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Shuffle tracks on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * audioTracks.length);
    setCurrentTrackIndex(randomIndex);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % audioTracks.length;
    setCurrentTrackIndex(nextIndex);
    if (audioRef.current && isPlaying) {
      audioRef.current.load();
      audioRef.current.play();
    }
  };

  const handleTrackEnd = () => {
    nextTrack();
  };

  return (
    <div className="fixed bottom-4 left-4 z-30 flex items-center gap-2">
      <audio
        ref={audioRef}
        src={audioTracks[currentTrackIndex].src}
        onEnded={handleTrackEnd}
      />
      
      {/* BIG RED Emergency Mute Button - Always Prominent */}
      <button
        onClick={toggleMute}
        className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 
                   bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/50 hover:shadow-red-500/70
                   border-2 border-red-400 hover:scale-105 active:scale-95"
        title={isMuted ? "Unmute Audio" : "MUTE (Emergency Silence)"}
      >
        {isMuted ? (
          <VolumeX className="w-7 h-7 text-white" />
        ) : (
          <Volume2 className="w-7 h-7 text-white animate-pulse" />
        )}
      </button>

      {/* Play/Pause */}
      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-battlefield-gold/10 border border-battlefield-gold/30 
                   flex items-center justify-center hover:bg-battlefield-gold/20 transition-all"
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 text-battlefield-gold" />
        ) : (
          <Play className="w-4 h-4 text-battlefield-gold ml-0.5" />
        )}
      </button>

      {/* Skip */}
      <button
        onClick={nextTrack}
        className="w-8 h-8 rounded-full bg-battlefield-gold/10 border border-battlefield-gold/30 
                   flex items-center justify-center hover:bg-battlefield-gold/20 transition-all"
        title="Next Track"
      >
        <SkipForward className="w-3 h-3 text-battlefield-gold" />
      </button>

      {/* Track Info */}
      <div className="hidden sm:block font-terminal text-xs text-battlefield-gold/60 max-w-[120px] truncate">
        {audioTracks[currentTrackIndex].title}
      </div>
    </div>
  );
};
