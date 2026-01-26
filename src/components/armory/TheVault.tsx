import { useState } from "react";
import { Shield, Lock } from "lucide-react";
import { VaultItem, VaultItemData } from "./VaultItem";
import { PurchaseModal } from "./PurchaseModal";

interface TheVaultProps {
  onPurchase?: (item: VaultItemData) => void;
}

export const TheVault = ({ onPurchase }: TheVaultProps) => {
  const [modalItem, setModalItem] = useState<VaultItemData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Placeholder vault items - ready for customization
  const vaultItems: VaultItemData[] = [
    {
      id: "unsealed-book",
      title: "The Unsealed Book",
      subtitle: "Dub/Steppers Mix • 5:00",
      type: "audio",
      classification: "SIGNAL-001",
      price: 5.00,
      duration: "5:00",
      isUnlocked: false,
      audioUrl: "/audio/the-unsealed-book.mp3",
    },
    {
      id: "as-enoch-walked",
      title: "As Enoch Walked",
      subtitle: "Roots/Reggae • TBD",
      type: "audio",
      classification: "SIGNAL-002",
      price: 5.00,
      duration: "TBD",
      isUnlocked: false,
      audioUrl: "/audio/as-enoch-walked.mp3",
    },
    {
      id: "no-false-wisdom",
      title: "No False Wisdom for the Israelites",
      subtitle: "Survival Guide • PDF",
      type: "document",
      classification: "INTEL-001",
      price: 15.00,
      isUnlocked: false,
    },
  ];

  const handlePurchaseRequest = (item: VaultItemData) => {
    setModalItem(item);
    setIsModalOpen(true);
  };

  const handlePurchase = (item: VaultItemData) => {
    setIsModalOpen(false);
    onPurchase?.(item);
  };

  return (
    <div className="space-y-6">
      {/* Vault Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-sanctuary-text/30" />
          <Shield className="w-6 h-6 text-sanctuary-primary" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-sanctuary-text/30" />
        </div>
        
        <h2 className="font-display text-2xl text-sanctuary-primary font-bold tracking-wider">
          THE ARMORY
        </h2>
        
        <p className="font-terminal text-xs text-sanctuary-muted">
          SECURE FILE GRID • CLASSIFIED ASSETS
        </p>

        <div className="flex items-center justify-center gap-2 text-sanctuary-gold">
          <Lock className="w-3 h-3" />
          <span className="font-terminal text-xs">
            45-SECOND PREVIEW • FULL ACCESS REQUIRES PURCHASE
          </span>
          <Lock className="w-3 h-3" />
        </div>
      </div>

      {/* Vault Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {vaultItems.map((item) => (
          <VaultItem
            key={item.id}
            item={item}
            onPurchaseRequest={handlePurchaseRequest}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="text-center pt-4 border-t border-sanctuary-text/10">
        <p className="font-terminal text-xs text-sanctuary-muted">
          NO CHARITY. SILENCE IS STANDARD. CONTENT IS THE REWARD.
        </p>
      </div>

      {/* Purchase Modal */}
      <PurchaseModal
        item={modalItem}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onPurchase={handlePurchase}
      />
    </div>
  );
};
