import { useState, useCallback, useRef, useEffect } from 'react';
import { Mic, MicOff, Square, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export const VoiceInput = ({ onTranscript, disabled = false }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscriptRef = useRef('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
        finalTranscriptRef.current = '';
      };

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        finalTranscriptRef.current += finalTranscript;
        setTranscript(finalTranscriptRef.current + interimTranscript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(`Voice error: ${event.error}`);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (finalTranscriptRef.current.trim()) {
          setIsProcessing(true);
          onTranscript(finalTranscriptRef.current.trim());
          setTimeout(() => {
            setTranscript('');
            setIsProcessing(false);
          }, 500);
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [onTranscript]);

  const startListening = useCallback(async () => {
    if (!recognitionRef.current) {
      setError('Voice input not supported in this browser');
      return;
    }
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      recognitionRef.current.start();
    } catch (err) {
      console.error('Microphone access error:', err);
      setError('Microphone access denied');
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  const isSupported = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

  if (!isSupported) {
    return (
      <div className="text-center p-3 bg-sanctuary-gold/5 rounded-lg">
        <MicOff className="w-5 h-5 mx-auto mb-1 text-sanctuary-gold/40" />
        <p className="font-terminal text-xs text-sanctuary-gold/40">
          Voice input not supported in this browser
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <button
        onClick={isListening ? stopListening : startListening}
        disabled={disabled || isProcessing}
        className={cn(
          'w-full py-3 px-4 rounded-lg font-terminal text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2',
          isListening
            ? 'bg-red-900/30 border-2 border-red-600 text-red-400 animate-pulse'
            : 'bg-sanctuary-gold/10 border border-sanctuary-gold/30 text-sanctuary-gold hover:bg-sanctuary-gold/20',
          (disabled || isProcessing) && 'opacity-50 cursor-not-allowed'
        )}
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            PROCESSING...
          </>
        ) : isListening ? (
          <>
            <Square className="w-4 h-4" />
            STOP RECORDING
          </>
        ) : (
          <>
            <Mic className="w-5 h-5" />
            VOICE INPUT
          </>
        )}
      </button>

      {(isListening || transcript) && (
        <div className="p-3 bg-sanctuary-gold/5 border border-sanctuary-gold/10 rounded-lg">
          <p className="font-terminal text-xs text-sanctuary-gold/50 mb-1">
            {isListening ? 'LISTENING...' : 'CAPTURED:'}
          </p>
          <p className="font-ceremonial text-sm text-sanctuary-gold/80">
            {transcript || '(speak now)'}
          </p>
        </div>
      )}

      {error && (
        <div className="p-2 bg-red-900/20 border border-red-600/30 rounded-lg">
          <p className="font-terminal text-xs text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
};

// Web Speech API declarations
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}
