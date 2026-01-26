import { Lock, LockOpen, FileText, Music } from "lucide-react";
import { WaveformPlayer } from "./WaveformPlayer";

export type VaultItemType = "audio" | "document";

export interface VaultItemData {
  id: string;
  title: string;
  subtitle?: string;
  type: VaultItemType;
  classification: string;
  price: number;
  duration?: string;
  isUnlocked?: boolean;
  audioUrl?: string;
}

interface VaultItemProps {
  item: VaultItemData;
  onPurchaseRequest: (item: VaultItemData) => void;
}

export const VaultItem = ({ item, onPurchaseRequest }: VaultItemProps) => {
  const PREVIEW_DURATION = 45; // seconds

  const handlePreviewEnd = () => {
    onPurchaseRequest(item);
  };

  const isAudio = item.type === "audio";
  const StatusIcon = item.isUnlocked ? LockOpen : Lock;
  const statusColor = item.isUnlocked ? "text-green-600" : "text-destructive";
  const TypeIcon = isAudio ? Music : FileText;

  return (
    <div className="relative bg-white border-2 border-sanctuary-text/20 hover:border-sanctuary-text/40 transition-all">
      {/* Classification Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-sanctuary-text/5 border-b border-sanctuary-text/10">
        <div className="flex items-center gap-2">
          <StatusIcon className={`w-4 h-4 ${statusColor}`} />
          <span className="font-terminal text-xs text-sanctuary-text uppercase tracking-wider">
            {item.isUnlocked ? "UNLOCKED" : "LOCKED"}
          </span>
        </div>
        <span className="font-terminal text-xs text-sanctuary-muted">
          {item.classification}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Type Icon & Title */}
        <div className="flex items-start gap-3">
          <div className="p-2 bg-sanctuary-primary/10 border border-sanctuary-primary/20">
            <TypeIcon className="w-6 h-6 text-sanctuary-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-display text-sm text-sanctuary-text font-bold truncate">
              {item.title}
            </h4>
            {item.subtitle && (
              <p className="font-terminal text-xs text-sanctuary-muted mt-0.5">
                {item.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Waveform Player (Audio Only) */}
        {isAudio && item.audioUrl && (
          <WaveformPlayer
            audioUrl={item.audioUrl}
            isUnlocked={item.isUnlocked || false}
            previewDuration={PREVIEW_DURATION}
            onPreviewEnd={handlePreviewEnd}
          />
        )}

        {/* Duration/Info for unlocked items */}
        {item.duration && item.isUnlocked && !item.audioUrl && (
          <div className="font-terminal text-xs text-sanctuary-muted">
            DURATION: {item.duration}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex border-t border-sanctuary-text/10">
        
        <button
          onClick={() => onPurchaseRequest(item)}
          className={`flex items-center justify-center gap-2 py-3 font-display text-xs uppercase tracking-wider transition-all ${
            item.isUnlocked
              ? "px-4 bg-green-600/10 text-green-600 cursor-default"
              : "flex-1 bg-sanctuary-gold text-sanctuary-bg hover:bg-sanctuary-gold/90"
          }`}
          disabled={item.isUnlocked}
        >
          {item.isUnlocked ? (
            <>
              <LockOpen className="w-3 h-3" />
              OWNED
            </>
          ) : (
            <>
              <Lock className="w-3 h-3" />
              ${item.price.toFixed(2)}
            </>
          )}
        </button>
      </div>

      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-sanctuary-text/40" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-sanctuary-text/40" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-sanctuary-text/40" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-sanctuary-text/40" />
    </div>
  );
};
