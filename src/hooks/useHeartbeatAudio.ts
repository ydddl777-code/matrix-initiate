import { useRef, useCallback, useEffect } from "react";

interface UseHeartbeatAudioProps {
  state: "normal" | "vitality" | "flatline";
  isMuted: boolean;
  isExternalAudioPlaying: boolean;
}

export const useHeartbeatAudio = ({ 
  state, 
  isMuted, 
  isExternalAudioPlaying 
}: UseHeartbeatAudioProps) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);
  const flatlineOscillatorRef = useRef<OscillatorNode | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playBeep = useCallback((frequency: number, duration: number, volume: number = 0.15) => {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = "sine";

    // Soft attack and decay for less jarring sound
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.02);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }, [getAudioContext]);

  const playHeartbeat = useCallback(() => {
    // Double beep pattern like real heart monitor
    playBeep(880, 0.08, 0.12); // First beep
    setTimeout(() => playBeep(880, 0.06, 0.08), 100); // Second softer beep
  }, [playBeep]);

  const playVitalityBeep = useCallback(() => {
    // Stronger, more energetic beep
    playBeep(1000, 0.1, 0.18);
    setTimeout(() => playBeep(1200, 0.08, 0.12), 80);
  }, [playBeep]);

  const startFlatline = useCallback(() => {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Stop any existing flatline
    if (flatlineOscillatorRef.current) {
      flatlineOscillatorRef.current.stop();
      flatlineOscillatorRef.current = null;
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 440; // Classic flatline tone
    oscillator.type = "sine";
    gainNode.gain.value = 0.15;

    oscillator.start();
    flatlineOscillatorRef.current = oscillator;

    // Auto-stop after 3 seconds
    setTimeout(() => {
      if (flatlineOscillatorRef.current === oscillator) {
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
        setTimeout(() => {
          oscillator.stop();
          flatlineOscillatorRef.current = null;
        }, 500);
      }
    }, 3000);
  }, [getAudioContext]);

  const stopFlatline = useCallback(() => {
    if (flatlineOscillatorRef.current) {
      flatlineOscillatorRef.current.stop();
      flatlineOscillatorRef.current = null;
    }
  }, []);

  const stopHeartbeatLoop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Don't play if muted or external audio is playing
    if (isMuted || isExternalAudioPlaying) {
      stopHeartbeatLoop();
      stopFlatline();
      return;
    }

    // Clear previous interval
    stopHeartbeatLoop();
    stopFlatline();

    if (state === "flatline") {
      startFlatline();
    } else if (state === "vitality") {
      // Faster, stronger heartbeat
      playVitalityBeep();
      intervalRef.current = window.setInterval(playVitalityBeep, 600);
    } else {
      // Normal heartbeat - steady rhythm
      playHeartbeat();
      intervalRef.current = window.setInterval(playHeartbeat, 1000);
    }

    return () => {
      stopHeartbeatLoop();
    };
  }, [state, isMuted, isExternalAudioPlaying, playHeartbeat, playVitalityBeep, startFlatline, stopHeartbeatLoop, stopFlatline]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopHeartbeatLoop();
      stopFlatline();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopHeartbeatLoop, stopFlatline]);
};
