import { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Volume2, VolumeX, Swords, AlertTriangle } from 'lucide-react';
import { useDoctrinalChat } from '@/hooks/useDoctrinalChat';
import { ChatMessage } from './ChatMessage';
import { VoiceInput } from './VoiceInput';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface DoctrinalWarfareProps {
  defaultVoiceId?: string;
}

export const DoctrinalWarfare = ({ defaultVoiceId }: DoctrinalWarfareProps) => {
  const [inputText, setInputText] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    isLoading,
    error,
    currentlyPlayingId,
    sendMessage,
    generateVoice,
    stopAudio,
    clearMessages,
  } = useDoctrinalChat({
    voiceEnabled,
    voiceId: defaultVoiceId,
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      sendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleVoiceTranscript = (text: string) => {
    if (text && !isLoading) {
      sendMessage(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-white border-2 border-sanctuary-primary/20 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sanctuary-primary/20 bg-sanctuary-primary/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sanctuary-gold/20 rounded-lg">
            <Swords className="w-5 h-5 text-sanctuary-gold" />
          </div>
          <div>
            <h3 className="font-display text-lg text-sanctuary-primary font-bold">
              DOCTRINAL WARFARE
            </h3>
            <p className="font-terminal text-xs text-sanctuary-muted">
              PROPHET GAD AI • TRUTH VS ERROR
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Voice Toggle */}
          <div className="flex items-center gap-2">
            {voiceEnabled ? (
              <Volume2 className="w-4 h-4 text-sanctuary-gold" />
            ) : (
              <VolumeX className="w-4 h-4 text-sanctuary-muted" />
            )}
            <Switch
              checked={voiceEnabled}
              onCheckedChange={setVoiceEnabled}
              className="data-[state=checked]:bg-sanctuary-gold"
            />
            <span className="font-terminal text-xs text-sanctuary-muted">
              VOICE
            </span>
          </div>

          {/* Clear Chat */}
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              className="p-2 text-sanctuary-muted hover:text-red-500 transition-colors"
              title="Clear conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-sanctuary-primary/5">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <Swords className="w-12 h-12 text-sanctuary-primary/30 mb-4" />
            <h4 className="font-display text-lg text-sanctuary-primary mb-2">
              ENTER THE ARENA
            </h4>
            <p className="font-terminal text-xs text-sanctuary-muted max-w-sm">
              Challenge doctrine. Question tradition. The Prophet responds with
              Scripture — no soft answers, no compromise.
            </p>
            <div className="mt-4 p-3 bg-sanctuary-gold/10 border border-sanctuary-gold/30 rounded-lg max-w-md">
              <p className="font-terminal text-xs text-sanctuary-gold">
                TRY: "Why don't you believe the Trinity?"
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isPlaying={currentlyPlayingId === message.id}
              onPlayVoice={() => generateVoice(message.content, message.id)}
              onStopVoice={stopAudio}
              voiceEnabled={voiceEnabled}
            />
          ))
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center gap-3 p-4 bg-sanctuary-gold/5 border border-sanctuary-gold/20 rounded-lg">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-sanctuary-gold rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <span className="font-terminal text-xs text-sanctuary-gold">
              THE PROPHET IS RESPONDING...
            </span>
          </div>
        )}

        {/* Error display */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-600/10 border border-red-600/30 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="font-terminal text-xs text-red-500">{error}</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-sanctuary-primary/20 bg-white space-y-3">
        {/* Voice Input */}
        <VoiceInput onTranscript={handleVoiceTranscript} disabled={isLoading} />

        {/* Text Input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Challenge doctrine, question tradition..."
            disabled={isLoading}
            className={cn(
              'flex-1 min-h-[60px] max-h-[120px] resize-none',
              'font-body text-sm',
              'border-sanctuary-primary/30 focus:border-sanctuary-primary',
              'bg-white'
            )}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className={cn(
              'px-4 py-2 rounded-lg transition-all flex items-center justify-center',
              'bg-sanctuary-primary text-white font-terminal text-sm uppercase',
              'hover:bg-sanctuary-primary/90',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Hint */}
        <p className="font-terminal text-xs text-sanctuary-muted text-center">
          PRESS ENTER TO SEND • SHIFT+ENTER FOR NEW LINE
        </p>
      </div>
    </div>
  );
};
