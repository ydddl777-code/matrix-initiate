import { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Volume2, VolumeX, Swords, AlertTriangle, Download, FileAudio, Save, Maximize2, Minimize2 } from 'lucide-react';
import { useDoctrinalChat } from '@/hooks/useDoctrinalChat';
import { ChatMessage } from './ChatMessage';
import { VoiceInput } from './VoiceInput';
import { BreastplateSeal } from './BreastplateSeal';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import lionOfJudah from '@/assets/lion-of-judah.png';

interface DoctrinalWarfareProps {
  defaultVoiceId?: string;
}

export const DoctrinalWarfare = ({ defaultVoiceId }: DoctrinalWarfareProps) => {
  const [inputText, setInputText] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
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

  const handleDownloadPDF = () => {
    if (messages.length === 0) return;
    const transcript = messages.map(m => 
      `[${m.role === 'user' ? 'CHALLENGER' : 'PROPHET GAD AI'}] ${m.timestamp.toLocaleString()}\n${m.content}\n`
    ).join('\n---\n\n');
    
    const header = `═══════════════════════════════════════\n   PROPHETIC DECREE — RECORD OF ENGAGEMENT\n   Law-Keeper Assembly Protocol\n═══════════════════════════════════════\n\n`;
    const footer = `\n\n═══════════════════════════════════════\n   SEALED BY THE 12-GEMSTONE BREASTPLATE\n   Prophetic Synthesis for the Remnant Seed\n═══════════════════════════════════════`;
    
    const blob = new Blob([header + transcript + footer], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prophetic-decree-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportAudio = () => {
    // Trigger voice generation for the last AI message
    const lastAiMsg = [...messages].reverse().find(m => m.role === 'assistant');
    if (lastAiMsg) {
      generateVoice(lastAiMsg.content, lastAiMsg.id);
    }
  };

  const handleSaveToVault = () => {
    const sessionData = {
      timestamp: new Date().toISOString(),
      messages: messages.map(m => ({
        role: m.role,
        content: m.content,
        timestamp: m.timestamp.toISOString(),
      })),
    };
    const existing = JSON.parse(localStorage.getItem('pgai-vault') || '[]');
    existing.push(sessionData);
    localStorage.setItem('pgai-vault', JSON.stringify(existing));
    alert('Session sealed to the Vault.');
  };

  return (
    <div className={cn(
      "flex flex-col war-room-bg border-2 border-sanctuary-gold/40 overflow-hidden relative",
      isFullScreen
        ? "fixed inset-0 z-[100] rounded-none"
        : "rounded-lg"
    )}
      style={{ minHeight: isFullScreen ? '100vh' : '700px' }}
    >
      {/* Lion of Judah Header */}
      <div className="flex flex-col items-center pt-6 pb-4 border-b-2 border-sanctuary-gold/30 bg-gradient-to-b from-black/90 to-black/70">
        <img src={lionOfJudah} alt="Lion of Judah" className="w-24 h-24 md:w-32 md:h-32 drop-shadow-[0_0_20px_hsl(45,90%,50%,0.5)]" />
        <h2 className="font-ceremonial text-xl md:text-2xl text-sanctuary-gold mt-3 tracking-widest text-center">
          DOCTRINAL WARFARE
        </h2>
        <p className="font-ceremonial text-xs text-sanctuary-gold/70 mt-1 tracking-wider text-center max-w-md px-4">
          Prophetic Synthesis for the Remnant Seed: A Law-Keeper Assembly Protocol
        </p>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-sanctuary-gold/20 bg-black/60">
        <div className="flex items-center gap-3">
          <Swords className="w-4 h-4 text-sanctuary-gold" />
          <span className="font-terminal text-xs text-sanctuary-gold/80">THUNDER DOME ACTIVE</span>
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-1.5 text-sanctuary-gold/70 hover:text-sanctuary-gold transition-colors"
            title={isFullScreen ? "Exit full screen" : "Enter full screen"}
          >
            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {voiceEnabled ? (
              <Volume2 className="w-4 h-4 text-sanctuary-gold" />
            ) : (
              <VolumeX className="w-4 h-4 text-sanctuary-gold/40" />
            )}
            <Switch
              checked={voiceEnabled}
              onCheckedChange={setVoiceEnabled}
              className="data-[state=checked]:bg-sanctuary-gold"
            />
          </div>
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              className="p-1.5 text-sanctuary-gold/50 hover:text-red-500 transition-colors"
              title="Clear engagement"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* War Room Scroll — Messages Area */}
      <div className={cn(
        "flex-1 overflow-y-auto p-4 md:p-6 space-y-4",
        isFullScreen ? "" : ""
      )} style={{ maxHeight: isFullScreen ? 'none' : '400px' }}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <Swords className="w-14 h-14 text-sanctuary-gold/30 mb-4" />
            <h4 className="font-ceremonial text-lg text-sanctuary-gold mb-2">
              ENTER THE THUNDER DOME
            </h4>
            <p className="font-ceremonial text-xs text-sanctuary-gold/60 max-w-sm">
              Challenge doctrine. Question tradition. The Prophet responds with
              Scripture — no soft answers, no compromise.
            </p>
            <div className="mt-4 p-3 bg-sanctuary-gold/10 border border-sanctuary-gold/30 rounded-lg max-w-md">
              <p className="font-ceremonial text-xs text-sanctuary-gold">
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

        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="font-terminal text-xs text-red-400">{error}</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t-2 border-sanctuary-gold/20 bg-black/70 space-y-3">
        <VoiceInput onTranscript={handleVoiceTranscript} disabled={isLoading} />

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Challenge doctrine, question tradition..."
            disabled={isLoading}
            className={cn(
              'flex-1 min-h-[60px] max-h-[120px] resize-none',
              'font-ceremonial text-sm',
              'border-sanctuary-gold/30 focus:border-sanctuary-gold bg-black/50 text-sanctuary-gold placeholder:text-sanctuary-gold/30'
            )}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className={cn(
              'px-4 py-2 rounded-lg transition-all flex items-center justify-center',
              'bg-sanctuary-gold text-black font-terminal text-sm uppercase',
              'hover:bg-sanctuary-gold/90',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="font-terminal text-xs text-sanctuary-gold/40 text-center">
          PRESS ENTER TO SEND • SHIFT+ENTER FOR NEW LINE
        </p>
      </div>

      {/* Export Suite */}
      {messages.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-3 px-4 py-3 border-t-2 border-sanctuary-gold/20 bg-black/80">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 rounded border border-sanctuary-gold/50 bg-sanctuary-gold/10 text-sanctuary-gold font-terminal text-xs uppercase hover:bg-sanctuary-gold/20 transition-all"
          >
            <Download className="w-4 h-4" />
            Download Decree
          </button>
          <button
            onClick={handleExportAudio}
            className="flex items-center gap-2 px-4 py-2 rounded border border-sanctuary-gold/50 bg-sanctuary-gold/10 text-sanctuary-gold font-terminal text-xs uppercase hover:bg-sanctuary-gold/20 transition-all"
          >
            <FileAudio className="w-4 h-4" />
            Export Audio
          </button>
          <button
            onClick={handleSaveToVault}
            className="flex items-center gap-2 px-4 py-2 rounded border border-sanctuary-gold/50 bg-sanctuary-gold/10 text-sanctuary-gold font-terminal text-xs uppercase hover:bg-sanctuary-gold/20 transition-all"
          >
            <Save className="w-4 h-4" />
            Save to Vault
          </button>
        </div>
      )}

      {/* Breastplate Seal — permanent bottom-right */}
      <BreastplateSeal />
    </div>
  );
};
