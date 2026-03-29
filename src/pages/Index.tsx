import { useState, useRef, useCallback, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { BattlefieldLanding } from "@/components/BattlefieldLanding";
import { SanctuaryInterior } from "@/components/SanctuaryInterior";

type ZoneState = "battlefield" | "sanctuary";

const Index = () => {
  const [zone, setZone] = useState<ZoneState>("battlefield");
  const musicRef = useRef<HTMLAudioElement>(null);
  const instrumentalRef = useRef<HTMLAudioElement>(null);
  const [musicStarted, setMusicStarted] = useState(false);

  const [globalVolume, setGlobalVolume] = useState(0.80);
  const [prevVolume, setPrevVolume] = useState(0.80);

  const startMusic = useCallback(() => {
    if (musicRef.current && musicRef.current.paused) {
      musicRef.current.volume = globalVolume;
      musicRef.current.play().catch(() => {});
      setMusicStarted(true);
    }
  }, [globalVolume]);

  // Keep volume in sync when slider changes
  useEffect(() => {
    if (musicRef.current && !musicRef.current.paused) {
      musicRef.current.volume = globalVolume;
    }
    if (instrumentalRef.current && !instrumentalRef.current.paused) {
      instrumentalRef.current.volume = globalVolume;
    }
  }, [globalVolume]);

  // When "Warning in the Dark" ends, stop it fully and start instrumental
  const handleMainSongEnd = useCallback(() => {
    // Ensure main track is fully stopped to prevent bleeding
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.currentTime = 0;
    }
    if (instrumentalRef.current) {
      // Start instrumental at 80% — same energy as the vocal track
      instrumentalRef.current.volume = 0.80;
      instrumentalRef.current.play().catch(() => {});
      // After 2.5 minutes (150s), gradually fade to 50% over 30 seconds
      setTimeout(() => {
        let vol = 0.80;
        const targetVol = 0.50;
        const fadeInterval = setInterval(() => {
          vol -= (0.80 - targetVol) / 60; // 60 steps over 30s
          if (vol <= targetVol) {
            vol = targetVol;
            clearInterval(fadeInterval);
          }
          if (instrumentalRef.current) {
            instrumentalRef.current.volume = vol;
          }
        }, 500);
      }, 150000); // 2.5 minutes delay before fade
    }
  }, []);

  const handleEnterSanctuary = () => {
    setZone("sanctuary");
  };

  const handleExitToGate = () => {
    setZone("battlefield");
  };

  return (
    <>
      {/* Global persistent audio — never unmounts on navigation */}
      <audio
        ref={musicRef}
        src="/audio/warning-in-the-dark.mp3"
        preload="auto"
        onEnded={handleMainSongEnd}
      />
      <audio
        ref={instrumentalRef}
        src="/audio/warning-in-the-dark-instrumental.flac"
        preload="auto"
        loop
      />

      {/* Persistent Volume Slider — compact, doesn't block nav arrows */}
      {musicStarted && (
        <div
          className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[9998] flex items-center gap-2 px-3 py-1.5 rounded-full border transition-opacity duration-700"
          style={{
            background: 'hsla(0, 0%, 0%, 0.75)',
            backdropFilter: 'blur(8px)',
            borderColor: 'hsl(45 60% 40% / 0.35)',
            pointerEvents: 'auto',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.35'; }}
          ref={(el) => {
            if (el) {
              const t = setTimeout(() => { el.style.opacity = '0.35'; }, 3000);
              el.dataset.fadeTimer = String(t);
            }
          }}
        >
          {/* Mute/Unmute button */}
          <button
            onClick={() => {
              if (globalVolume > 0) {
                setPrevVolume(globalVolume);
                setGlobalVolume(0);
              } else {
                setGlobalVolume(prevVolume || 0.80);
              }
            }}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            title={globalVolume === 0 ? "Unmute" : "Mute"}
          >
            {globalVolume === 0 ? (
              <VolumeX className="w-3.5 h-3.5" style={{ color: 'hsl(0 70% 55%)' }} />
            ) : (
              <Volume2 className="w-3.5 h-3.5" style={{ color: 'hsl(45 80% 55% / 0.7)' }} />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={Math.round(globalVolume * 100)}
            onChange={(e) => setGlobalVolume(Number(e.target.value) / 100)}
            className="volume-slider w-24 md:w-36 h-1.5 cursor-pointer appearance-none rounded-full"
            style={{
              background: `linear-gradient(to right, hsl(45 80% 55%) ${globalVolume * 100}%, hsl(0 0% 20%) ${globalVolume * 100}%)`,
            }}
          />
          <span className="font-terminal text-[9px] w-7 text-center" style={{ color: 'hsl(45 80% 55% / 0.5)' }}>
            {Math.round(globalVolume * 100)}%
          </span>
        </div>
      )}

      {zone === "battlefield" ? (
        <BattlefieldLanding
          onEnterSanctuary={handleEnterSanctuary}
          musicRef={musicRef}
          startMusic={startMusic}
          musicStarted={musicStarted}
        />
      ) : (
        <SanctuaryInterior
          onExit={handleExitToGate}
          musicRef={musicRef}
        />
      )}
    </>
  );
};

export default Index;
