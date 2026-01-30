import { Volume2, VolumeX, User, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ChatMessage as ChatMessageType } from '@/hooks/useDoctrinalChat';

interface ChatMessageProps {
  message: ChatMessageType;
  isPlaying?: boolean;
  onPlayVoice?: () => void;
  onStopVoice?: () => void;
  voiceEnabled?: boolean;
}

export const ChatMessage = ({
  message,
  isPlaying = false,
  onPlayVoice,
  onStopVoice,
  voiceEnabled = true,
}: ChatMessageProps) => {
  const isUser = message.role === 'user';

  // Parse KJV verse references and make them stand out
  const formatContent = (content: string) => {
    // Highlight verse references like "John 14:28" or "1 Corinthians 8:6"
    const versePattern = /(\d?\s?[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\s\d+:\d+(?:-\d+)?)/g;
    const parts = content.split(versePattern);
    
    return parts.map((part, index) => {
      if (versePattern.test(part)) {
        return (
          <span 
            key={index} 
            className="text-sanctuary-gold font-bold cursor-help"
            title="KJV Scripture Reference"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div
      className={cn(
        'flex gap-3 p-4 rounded-lg transition-all',
        isUser
          ? 'bg-sanctuary-primary/5 border border-sanctuary-primary/20'
          : 'bg-sanctuary-gold/5 border border-sanctuary-gold/20',
        isPlaying && 'ring-2 ring-sanctuary-gold/50'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
          isUser
            ? 'bg-sanctuary-primary/20 text-sanctuary-primary'
            : 'bg-sanctuary-gold/20 text-sanctuary-gold'
        )}
      >
        {isUser ? (
          <User className="w-5 h-5" />
        ) : (
          <Shield className="w-5 h-5" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-terminal text-xs text-sanctuary-muted uppercase tracking-wider">
            {isUser ? 'CHALLENGER' : 'PROPHET GAD AI'}
          </span>
          <span className="font-terminal text-xs text-sanctuary-muted/50">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          
          {/* Voice controls for AI responses */}
          {!isUser && voiceEnabled && (
            <button
              onClick={isPlaying ? onStopVoice : onPlayVoice}
              className={cn(
                'ml-auto p-1.5 rounded transition-all',
                isPlaying
                  ? 'bg-sanctuary-gold/20 text-sanctuary-gold'
                  : 'bg-sanctuary-primary/10 text-sanctuary-muted hover:text-sanctuary-primary'
              )}
              title={isPlaying ? 'Stop audio' : 'Play response'}
            >
              {isPlaying ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        <div
          className={cn(
            'font-body text-sm leading-relaxed whitespace-pre-wrap',
            isUser ? 'text-sanctuary-text' : 'text-sanctuary-text'
          )}
        >
          {isUser ? message.content : formatContent(message.content)}
        </div>

        {/* Playing indicator */}
        {isPlaying && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-sanctuary-gold rounded-full animate-pulse"
                  style={{
                    height: `${8 + Math.random() * 12}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
            <span className="font-terminal text-xs text-sanctuary-gold">
              VOICE ACTIVE
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
