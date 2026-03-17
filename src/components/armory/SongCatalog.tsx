import { useState, useRef } from "react";
import { Play, Pause, Music } from "lucide-react";

interface Song {
  id: string;
  title: string;
  duration: string;
  audioUrl?: string;
}

// 20 Songs - Thunder Road Gospel first, then all uploaded tracks
const songs: Song[] = [
  { id: "1", title: "Thunder Road Gospel", duration: "4:32", audioUrl: "/audio/thunder-road-gospel.mp3" },
  { id: "2", title: "The Unsealed Book", duration: "5:00", audioUrl: "/audio/the-unsealed-book.mp3" },
  { id: "3", title: "As Enoch Walked", duration: "4:15", audioUrl: "/audio/as-enoch-walked.mp3" },
  { id: "4", title: "Dub of Clarity", duration: "4:00", audioUrl: "/audio/dub-of-clarity.mp3" },
  { id: "5", title: "Dust and Holy Light", duration: "4:30", audioUrl: "/audio/dust-and-holy-light.mp3" },
  { id: "6", title: "Eternal Father Call", duration: "5:15", audioUrl: "/audio/eternal-father-call.mp3" },
  { id: "7", title: "Eternal Father Dub", duration: "4:45", audioUrl: "/audio/eternal-father-dub.mp3" },
  { id: "8", title: "Fire Call Again", duration: "4:20", audioUrl: "/audio/fire-call-again.mp3" },
  { id: "9", title: "Fire Call Dub", duration: "4:10", audioUrl: "/audio/fire-call-dub.mp3" },
  { id: "10", title: "Hymn of the Wall", duration: "5:00", audioUrl: "/audio/hymn-of-the-wall.mp3" },
  { id: "11", title: "No Shadow of Turning", duration: "4:45", audioUrl: "/audio/no-shadow-of-turning.mp3" },
  { id: "12", title: "No Shadow Turning", duration: "4:30", audioUrl: "/audio/no-shadow-turning.mp3" },
  { id: "13", title: "Prophet's Call", duration: "5:10", audioUrl: "/audio/prophets-call.mp3" },
  { id: "14", title: "Prophet's Fire Call", duration: "4:55", audioUrl: "/audio/prophets-fire-call.mp3" },
  { id: "15", title: "Prophet's Fire Call V3", duration: "5:00", audioUrl: "/audio/prophets-fire-call-v3.mp3" },
  { id: "16", title: "Prophet's Fire Call V8", duration: "5:15", audioUrl: "/audio/prophets-fire-call-v8.mp3" },
  { id: "17", title: "Prophet's Soil", duration: "4:40", audioUrl: "/audio/prophets-soil.mp3" },
  { id: "18", title: "Prophet's Warning", duration: "5:20", audioUrl: "/audio/prophets-warning.mp3" },
  { id: "19", title: "Roots of Faith", duration: "4:50", audioUrl: "/audio/roots-of-faith.mp3" },
  { id: "20", title: "Seven Calls to Fire", duration: "6:00", audioUrl: "/audio/seven-calls-to-fire.mp3" },
  { id: "21", title: "Warning in the Dark", duration: "4:35", audioUrl: "/audio/warning-in-the-dark.mp3" },
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
        
        <h2 className="font-display text-2xl text-sanctuary-primary font-black italic tracking-wider">
          PROPHET GAD MUSIC CATALOG
        </h2>
        
        <p className="font-terminal text-sm text-sanctuary-muted font-bold tracking-widest">
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
                <p className="font-terminal text-sm text-sanctuary-text font-black">
                  {song.title}
                </p>
                <p className="font-terminal text-xs text-sanctuary-muted font-semibold">
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
