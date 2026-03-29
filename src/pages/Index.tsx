import { useState, useRef, useCallback, useEffect } from "react";
import { BattlefieldLanding } from "@/components/BattlefieldLanding";
import { SanctuaryInterior } from "@/components/SanctuaryInterior";

type ZoneState = "battlefield" | "sanctuary";

const Index = () => {
  const [zone, setZone] = useState<ZoneState>("battlefield");
  const musicRef = useRef<HTMLAudioElement>(null);
  const instrumentalRef = useRef<HTMLAudioElement>(null);
  const [musicStarted, setMusicStarted] = useState(false);

  const [globalVolume, setGlobalVolume] = useState(0.85);

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
      instrumentalRef.current.volume = globalVolume;
      instrumentalRef.current.play().catch(() => {});
      // Gradually fade instrumental to 20% over 30 seconds
      let vol = globalVolume;
      const targetVol = 0.20;
      const fadeInterval = setInterval(() => {
        vol -= (globalVolume - targetVol) / 60;
        if (vol <= targetVol) {
          vol = targetVol;
          clearInterval(fadeInterval);
        }
        if (instrumentalRef.current) {
          instrumentalRef.current.volume = vol;
        }
      }, 500);
    }
  }, [globalVolume]);

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
        src="/audio/thunder-road-gospel.mp3"
        preload="auto"
        loop
      />

      {/* Persistent Volume Slider */}
      {musicStarted && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-4 py-2 rounded-full bg-black/80 backdrop-blur-sm border border-battlefield-gold/30">
          <VolumeX className="w-4 h-4 text-battlefield-gold/60 shrink-0" />
          <input
            type="range"
            min="0"
            max="100"
            value={Math.round(globalVolume * 100)}
            onChange={(e) => setGlobalVolume(Number(e.target.value) / 100)}
            className="w-32 md:w-48 h-1.5 accent-[hsl(45,80%,55%)] cursor-pointer"
            style={{
              background: `linear-gradient(to right, hsl(45 80% 55%) ${globalVolume * 100}%, hsl(0 0% 25%) ${globalVolume * 100}%)`,
              borderRadius: '4px',
            }}
          />
          <Volume2 className="w-4 h-4 text-battlefield-gold/60 shrink-0" />
          <span className="font-terminal text-[10px] text-battlefield-gold/50 w-8 text-center">
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
