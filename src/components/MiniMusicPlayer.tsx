import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, SkipForward, RotateCcw } from "lucide-react";

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

  const replayTrack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTrackEnd = () => {
    nextTrack();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Caption */}
      <span className="font-terminal text-xs text-battlefield-gold/70 tracking-wider">
        LISTEN TO PROPHET GAD SONGS
      </span>
      
      <div className="flex items-center justify-center gap-2">
        <audio
          ref={audioRef}
          src={audioTracks[currentTrackIndex].src}
          onEnded={handleTrackEnd}
        />
        
        {/* Replay */}
        <button
          onClick={replayTrack}
          className="w-8 h-8 rounded-full bg-battlefield-gold/10 border border-battlefield-gold/30 
                     flex items-center justify-center hover:bg-battlefield-gold/20 transition-all"
          title="Replay Track"
        >
          <RotateCcw className="w-3 h-3 text-battlefield-gold" />
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
        <div className="font-terminal text-xs text-battlefield-gold/60 max-w-[120px] truncate">
          {audioTracks[currentTrackIndex].title}
        </div>

        {/* Red Mute Button - Smaller to match play button */}
        <button
          onClick={toggleMute}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 
                     bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/40 hover:shadow-red-500/60
                     border border-red-400 hover:scale-105 active:scale-95"
          title={isMuted ? "Unmute Audio" : "MUTE"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-white" />
          ) : (
            <Volume2 className="w-4 h-4 text-white" />
          )}
        </button>
      </div>
    </div>
  );
};