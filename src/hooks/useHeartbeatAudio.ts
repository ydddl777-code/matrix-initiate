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
  const gainNodeRef = useRef<GainNode | null>(null);
  const flatlineOscillatorRef = useRef<OscillatorNode | null>(null);
  const flatlineGainRef = useRef<GainNode | null>(null);
  const voiceIntervalRef = useRef<number | null>(null);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);
  const [hasPlayedVoice, setHasPlayedVoice] = useState(false);

  // Determine if audio should be active
  const shouldPlay = !isMuted && !isExternalAudioPlaying;

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      // Create a master gain node for easy muting
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
    }
    return audioContextRef.current;
  }, []);

  // Stop all sounds immediately
  const stopAllSounds = useCallback(() => {
    console.log('Stopping all sounds');
    
    // Clear heartbeat interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Stop flatline
    if (flatlineOscillatorRef.current) {
      try {
        flatlineOscillatorRef.current.stop();
      } catch (e) {}
      flatlineOscillatorRef.current = null;
    }
    if (flatlineGainRef.current) {
      flatlineGainRef.current.disconnect();
      flatlineGainRef.current = null;
    }
    
    // Stop voice
    if (voiceIntervalRef.current) {
      clearInterval(voiceIntervalRef.current);
      voiceIntervalRef.current = null;
    }
    if (voiceAudioRef.current) {
      voiceAudioRef.current.pause();
      voiceAudioRef.current.src = '';
      voiceAudioRef.current = null;
    }
    
    // Mute master gain
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current?.currentTime || 0);
    }
  }, []);

  const playBeep = useCallback((frequency: number, duration: number, volume: number = 0.15) => {
    if (!shouldPlay) return;
    
    const ctx = getAudioContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Ensure master gain is up
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(1, ctx.currentTime);
    }

    const oscillator = ctx.createOscillator();
    const beepGain = ctx.createGain();

    oscillator.connect(beepGain);
    beepGain.connect(gainNodeRef.current || ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = "sine";

    beepGain.gain.setValueAtTime(0, ctx.currentTime);
    beepGain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.02);
    beepGain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }, [shouldPlay, getAudioContext]);

  const playHeartbeat = useCallback(() => {
    if (!shouldPlay) return;
    playBeep(880, 0.08, 0.12);
    setTimeout(() => {
      if (shouldPlay) playBeep(880, 0.06, 0.08);
    }, 100);
  }, [playBeep, shouldPlay]);

  const playVitalityBeep = useCallback(() => {
    if (!shouldPlay) return;
    playBeep(1000, 0.1, 0.18);
    setTimeout(() => {
      if (shouldPlay) playBeep(1200, 0.08, 0.12);
    }, 80);
  }, [playBeep, shouldPlay]);

  const startFlatline = useCallback(() => {
    if (!shouldPlay) return;
    
    const ctx = getAudioContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Stop any existing flatline
    if (flatlineOscillatorRef.current) {
      try {
        flatlineOscillatorRef.current.stop();
      } catch (e) {}
      flatlineOscillatorRef.current = null;
    }

    const oscillator = ctx.createOscillator();
    const flatGain = ctx.createGain();

    oscillator.connect(flatGain);
    flatGain.connect(gainNodeRef.current || ctx.destination);

    oscillator.frequency.value = 440;
    oscillator.type = "sine";
    flatGain.gain.value = 0.15;

    oscillator.start();
    flatlineOscillatorRef.current = oscillator;
    flatlineGainRef.current = flatGain;

    // Auto-stop after 3 seconds
    setTimeout(() => {
      if (flatlineOscillatorRef.current === oscillator) {
        flatGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
        setTimeout(() => {
          try {
            oscillator.stop();
          } catch (e) {}
          flatlineOscillatorRef.current = null;
          flatlineGainRef.current = null;
        }, 500);
      }
    }, 3000);
  }, [shouldPlay, getAudioContext]);

  const playUrgentVoice = useCallback(async () => {
    if (!shouldPlay) return;
    
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
            voiceId: 'onwK4e9ZLuTAKqWW03F9'
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
  }, [shouldPlay]);

  // Main effect to control audio based on state and mute
  useEffect(() => {
    console.log('Audio effect - shouldPlay:', shouldPlay, 'state:', state, 'isMuted:', isMuted);
    
    if (!shouldPlay) {
      stopAllSounds();
      return;
    }

    // Clear previous intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (state === "flatline") {
      startFlatline();
    } else if (state === "vitality") {
      playVitalityBeep();
      intervalRef.current = window.setInterval(() => {
        if (shouldPlay) playVitalityBeep();
      }, 600);
    } else {
      playHeartbeat();
      intervalRef.current = window.setInterval(() => {
        if (shouldPlay) playHeartbeat();
      }, 1000);
      
      // Voice prompt after 8 seconds
      if (!hasPlayedVoice) {
        const voiceTimeout = window.setTimeout(() => {
          if (shouldPlay) {
            playUrgentVoice();
            setHasPlayedVoice(true);
            voiceIntervalRef.current = window.setInterval(() => {
              if (shouldPlay) playUrgentVoice();
            }, 45000);
          }
        }, 8000);
        
        return () => {
          clearTimeout(voiceTimeout);
          if (intervalRef.current) clearInterval(intervalRef.current);
        };
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [shouldPlay, state, hasPlayedVoice, playHeartbeat, playVitalityBeep, startFlatline, playUrgentVoice, stopAllSounds, isMuted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAllSounds();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, [stopAllSounds]);
};
