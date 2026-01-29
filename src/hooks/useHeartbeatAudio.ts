import { useRef, useCallback, useEffect, useState } from "react";

interface UseHeartbeatAudioProps {
  state: "normal" | "vitality" | "flatline";
  isMuted: boolean;
  isExternalAudioPlaying: boolean;
}

const URGENT_PROMPT = "It's urgent. Make your choice. Do not delay.";

export const useHeartbeatAudio = ({ 
  state, 
  isMuted, 
  isExternalAudioPlaying 
}: UseHeartbeatAudioProps) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);
  const flatlineOscillatorRef = useRef<OscillatorNode | null>(null);
  const voiceIntervalRef = useRef<number | null>(null);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);
  const [hasPlayedVoice, setHasPlayedVoice] = useState(false);
  
  // Track muted state in a ref so interval callbacks can access current value
  const isMutedRef = useRef(isMuted);
  const isExternalAudioRef = useRef(isExternalAudioPlaying);
  
  // Keep refs in sync with props and handle immediate mute
  useEffect(() => {
    isMutedRef.current = isMuted;
    isExternalAudioRef.current = isExternalAudioPlaying;
    
    // Immediately stop all audio when muted
    if (isMuted || isExternalAudioPlaying) {
      // Stop voice audio
      if (voiceAudioRef.current) {
        voiceAudioRef.current.pause();
        voiceAudioRef.current = null;
      }
      // Stop flatline oscillator
      if (flatlineOscillatorRef.current) {
        try {
          flatlineOscillatorRef.current.stop();
        } catch (e) {
          // Already stopped
        }
        flatlineOscillatorRef.current = null;
      }
    }
  }, [isMuted, isExternalAudioPlaying]);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playBeep = useCallback((frequency: number, duration: number, volume: number = 0.15) => {
    // Check mute state via ref (for interval callbacks)
    if (isMutedRef.current || isExternalAudioRef.current) return;
    
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
    // Check mute state
    if (isMutedRef.current || isExternalAudioRef.current) return;
    
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

  const stopVoiceLoop = useCallback(() => {
    if (voiceIntervalRef.current) {
      clearInterval(voiceIntervalRef.current);
      voiceIntervalRef.current = null;
    }
    if (voiceAudioRef.current) {
      voiceAudioRef.current.pause();
      voiceAudioRef.current = null;
    }
  }, []);

  const playUrgentVoice = useCallback(async () => {
    // Only play if not muted and no external audio
    if (isMuted || isExternalAudioPlaying) return;
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ 
            text: URGENT_PROMPT,
            voiceId: 'onwK4e9ZLuTAKqWW03F9' // Daniel - deep, authoritative
          }),
        }
      );

      if (!response.ok) {
        console.error('TTS request failed:', response.status);
        return;
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (voiceAudioRef.current) {
        voiceAudioRef.current.pause();
      }
      
      voiceAudioRef.current = new Audio(audioUrl);
      voiceAudioRef.current.volume = 0.7;
      await voiceAudioRef.current.play();
    } catch (error) {
      console.error('Failed to play urgent voice:', error);
    }
  }, [isMuted, isExternalAudioPlaying]);

  useEffect(() => {
    // Don't play if muted or external audio is playing
    if (isMuted || isExternalAudioPlaying) {
      stopHeartbeatLoop();
      stopFlatline();
      stopVoiceLoop();
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
      
      // Play urgent voice after 8 seconds if still in normal state, then every 45 seconds
      if (!hasPlayedVoice) {
        const voiceTimeout = window.setTimeout(() => {
          playUrgentVoice();
          setHasPlayedVoice(true);
          // Set up recurring prompt every 45 seconds
          voiceIntervalRef.current = window.setInterval(playUrgentVoice, 45000);
        }, 8000);
        
        return () => {
          clearTimeout(voiceTimeout);
          stopHeartbeatLoop();
        };
      }
    }

    return () => {
      stopHeartbeatLoop();
    };
  }, [state, isMuted, isExternalAudioPlaying, hasPlayedVoice, playHeartbeat, playVitalityBeep, startFlatline, stopHeartbeatLoop, stopFlatline, stopVoiceLoop, playUrgentVoice]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopHeartbeatLoop();
      stopFlatline();
      stopVoiceLoop();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopHeartbeatLoop, stopFlatline, stopVoiceLoop]);
};
