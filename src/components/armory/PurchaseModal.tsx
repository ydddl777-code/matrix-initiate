import { Lock, ShieldAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VaultItemData } from "./VaultItem";

interface PurchaseModalProps {
  item: VaultItemData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPurchase: (item: VaultItemData) => void;
}

export const PurchaseModal = ({
  item,
  open,
  onOpenChange,
  onPurchase,
}: PurchaseModalProps) => {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white border-2 border-sanctuary-text/30 rounded-none max-w-md">
        {/* Header Icon */}
        <div className="flex justify-center -mt-2 mb-2">
          <div className="p-4 bg-red-600/10 border border-red-600/30">
            <ShieldAlert className="w-10 h-10 text-red-600" />
          </div>
        </div>

        <DialogHeader className="text-center space-y-3">
          <DialogTitle className="font-display text-xl text-sanctuary-text uppercase tracking-wide">
            SIGNAL ENCRYPTED
          </DialogTitle>
          <DialogDescription className="font-terminal text-sm text-sanctuary-muted">
            Preview terminated. Full access requires decryption key.
          </DialogDescription>
        </DialogHeader>

        {/* Item Details */}
        <div className="p-4 bg-sanctuary-text/5 border border-sanctuary-text/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-terminal text-xs text-sanctuary-muted uppercase">
              FILE
            </span>
            <span className="font-display text-sm text-sanctuary-text font-bold">
              {item.title}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-terminal text-xs text-sanctuary-muted uppercase">
              CLASSIFICATION
            </span>
            <span className="font-terminal text-xs text-sanctuary-primary">
              {item.classification}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-terminal text-xs text-sanctuary-muted uppercase">
              STATUS
            </span>
            <span className="font-terminal text-xs text-red-600 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              LOCKED
            </span>
          </div>
        </div>

        {/* Purchase CTA */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => onPurchase(item)}
            className="w-full py-4 bg-sanctuary-gold text-sanctuary-bg font-display text-sm uppercase tracking-widest hover:bg-sanctuary-gold/90 transition-all flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            PURCHASE DECRYPTION KEY — ${item.price.toFixed(2)}
          </button>

          <button
            onClick={() => onOpenChange(false)}
            className="w-full py-2 font-terminal text-xs text-sanctuary-muted hover:text-sanctuary-text transition-colors"
          >
            [ CANCEL ]
          </button>
        </div>

        {/* Footer */}
        <div className="text-center pt-2 border-t border-sanctuary-text/10">
          <p className="font-terminal text-xs text-sanctuary-muted">
            SECURE TRANSACTION • INSTANT DELIVERY
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
