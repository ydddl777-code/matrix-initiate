import { useState, useRef } from "react";
import { Play, Pause, Music } from "lucide-react";

interface Song {
  id: string;
  title: string;
  duration: string;
  audioUrl?: string;
}

// 10 Songs - Thunder Road Gospel first, rest in rotating order
const songs: Song[] = [
  { id: "1", title: "Thunder Road Gospel", duration: "4:32", audioUrl: "/audio/thunder-road-gospel.mp3" },
  { id: "2", title: "The Unsealed Book", duration: "5:00", audioUrl: "/audio/the-unsealed-book.mp3" },
  { id: "3", title: "As Enoch Walked", duration: "4:15", audioUrl: "/audio/as-enoch-walked.mp3" },
  { id: "4", title: "Valley of Dry Bones", duration: "5:30" },
  { id: "5", title: "Fire from Heaven", duration: "4:45" },
  { id: "6", title: "The Remnant's March", duration: "6:00" },
  { id: "7", title: "Sword of the Spirit", duration: "3:55" },
  { id: "8", title: "Babylon Is Fallen", duration: "5:20" },
  { id: "9", title: "Twelve Tribes United", duration: "4:40" },
  { id: "10", title: "The Final Hour", duration: "7:00" },
];

export const SongCatalog = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = (song: Song) => {
    if (!song.audioUrl) return;
    
    if (playingId === song.id) {
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = song.audioUrl;
        audioRef.current.play();
        setPlayingId(song.id);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-sanctuary-text/30" />
          <Music className="w-6 h-6 text-sanctuary-gold" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-sanctuary-text/30" />
        </div>
        
        <h2 className="font-display text-2xl text-sanctuary-primary font-bold italic tracking-wider">
          PROPHET GAD MUSIC CATALOG
        </h2>
        
        <p className="font-terminal text-xs text-sanctuary-muted">
          ORIGINAL COMPOSITIONS • ROOTS & REVELATION
        </p>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} onEnded={() => setPlayingId(null)} />

      {/* Scrolling Song List */}
      <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2 scrollbar-thin">
        {songs.map((song, index) => {
          const isAvailable = !!song.audioUrl;
          const isPlaying = playingId === song.id;
          
          return (
            <div
              key={song.id}
              className={`
                flex items-center gap-4 p-4 rounded-lg border transition-all duration-300
                ${isAvailable 
                  ? 'border-sanctuary-primary/30 bg-white/60 hover:bg-sanctuary-primary/5 hover:border-sanctuary-primary/50 cursor-pointer' 
                  : 'border-sanctuary-muted/20 bg-sanctuary-bg/50 opacity-60'
                }
                ${isPlaying ? 'ring-2 ring-sanctuary-gold border-sanctuary-gold' : ''}
              `}
              onClick={() => isAvailable && handlePlay(song)}
            >
              {/* Track Number */}
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sanctuary-primary/10 text-sanctuary-primary font-terminal text-sm font-bold">
                {index + 1}
              </div>
              
              {/* Play Button */}
              <div className={`
                w-10 h-10 flex items-center justify-center rounded-full transition-all
                ${isAvailable 
                  ? 'bg-sanctuary-gold text-white hover:bg-sanctuary-gold/80' 
                  : 'bg-sanctuary-muted/30 text-sanctuary-muted'
                }
              `}>
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" />
                )}
              </div>
              
              {/* Song Info */}
              <div className="flex-1">
                <p className="font-terminal text-sm text-sanctuary-text font-bold">
                  {song.title}
                </p>
                <p className="font-terminal text-xs text-sanctuary-muted">
                  {isAvailable ? "Preview Available" : "Coming Soon"}
                </p>
              </div>
              
              {/* Duration */}
              <div className="font-terminal text-xs text-sanctuary-muted">
                {song.duration}
              </div>
              
              {/* Waveform Placeholder */}
              <div className="hidden md:flex items-center gap-0.5 h-6">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all ${
                      isPlaying 
                        ? 'bg-sanctuary-gold animate-pulse' 
                        : 'bg-sanctuary-primary/20'
                    }`}
                    style={{ 
                      height: `${Math.random() * 100}%`,
                      animationDelay: `${i * 50}ms`
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="text-center pt-4 border-t border-sanctuary-text/10">
        <p className="font-terminal text-xs text-sanctuary-muted">
          FULL CATALOG AVAILABLE FOR PURCHASE • DIGITAL DOWNLOAD
        </p>
      </div>
    </div>
  );
};
