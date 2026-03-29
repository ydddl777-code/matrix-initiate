import { useState, useRef, useCallback, useEffect } from "react";
import { BattlefieldLanding } from "@/components/BattlefieldLanding";
import { SanctuaryInterior } from "@/components/SanctuaryInterior";

type ZoneState = "battlefield" | "sanctuary";

const Index = () => {
  const [zone, setZone] = useState<ZoneState>("battlefield");
  const musicRef = useRef<HTMLAudioElement>(null);
  const instrumentalRef = useRef<HTMLAudioElement>(null);
  const [musicStarted, setMusicStarted] = useState(false);

  const startMusic = useCallback(() => {
    if (musicRef.current && musicRef.current.paused) {
      musicRef.current.volume = 0.75;
      musicRef.current.play().catch(() => {});
      setMusicStarted(true);
    }
  }, []);

  // When "Warning in the Dark" ends, seamlessly start instrumental
  const handleMainSongEnd = useCallback(() => {
    if (instrumentalRef.current) {
      instrumentalRef.current.volume = 0.75;
      instrumentalRef.current.play().catch(() => {});
      // Gradually fade instrumental to 20% over 30 seconds
      let vol = 0.75;
      const fadeInterval = setInterval(() => {
        vol -= 0.55 / 60; // 60 steps over ~30s (every 500ms)
        if (vol <= 0.20) {
          vol = 0.20;
          clearInterval(fadeInterval);
        }
        if (instrumentalRef.current) {
          instrumentalRef.current.volume = vol;
        }
      }, 500);
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
        src="/audio/thunder-road-gospel.mp3"
        preload="auto"
        loop
      />

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
