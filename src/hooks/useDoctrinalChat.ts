import { useState, useCallback, useRef } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isPlaying?: boolean;
}

interface UseDoctrinalChatOptions {
  onAudioReady?: (audioBlob: Blob, messageId: string) => void;
  voiceEnabled?: boolean;
  voiceId?: string;
}

export const useDoctrinalChat = (options: UseDoctrinalChatOptions = {}) => {
  const { voiceEnabled = true, voiceId } = options;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const generateId = () => `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim()) return;

    setError(null);
    setIsLoading(true);

    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: userMessage.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);

    try {
      // Get AI response
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/pgai-chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            message: userMessage,
            conversationHistory: messages.map(m => ({
              role: m.role,
              content: m.content
            }))
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Chat request failed: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to get response');
      }

      const assistantMsg: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMsg]);

      // Generate voice if enabled
      if (voiceEnabled) {
        try {
          await generateVoice(data.response, assistantMsg.id);
        } catch (voiceError) {
          console.error('Voice generation failed:', voiceError);
          // Don't fail the whole message if voice fails
        }
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [messages, voiceEnabled, voiceId]);

  const generateVoice = useCallback(async (text: string, messageId: string) => {
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
            text,
            voiceId: voiceId || 'onwK4e9ZLuTAKqWW03F9', // Daniel - deep, authoritative (default)
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`TTS request failed: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Auto-play the response
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onplay = () => setCurrentlyPlayingId(messageId);
      audio.onended = () => {
        setCurrentlyPlayingId(null);
        URL.revokeObjectURL(audioUrl);
      };
      audio.onerror = () => {
        setCurrentlyPlayingId(null);
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();

    } catch (err) {
      console.error('Voice generation error:', err);
      throw err;
    }
  }, [voiceId]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentlyPlayingId(null);
    }
  }, []);

  const clearMessages = useCallback(() => {
    stopAudio();
    setMessages([]);
    setError(null);
  }, [stopAudio]);

  return {
    messages,
    isLoading,
    error,
    currentlyPlayingId,
    sendMessage,
    generateVoice,
    stopAudio,
    clearMessages,
  };
};
