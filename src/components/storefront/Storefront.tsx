import { ArrowLeft, Swords } from "lucide-react";
import { EbookGrid } from "./EbookGrid";
import { ExtendedPlayList } from "./ExtendedPlayList";
import lionLogo from "@/assets/lion-logo.png";
import breastplateLogo from "@/assets/breastplate-logo.png";

interface StorefrontProps {
  onBack: () => void;
}

export const Storefront = ({ onBack }: StorefrontProps) => {
  return (
    <div
      className="fixed inset-0 overflow-y-auto z-20"
      style={{
        background: "linear-gradient(180deg, hsl(15 12% 10%) 0%, hsl(0 0% 4%) 100%)",
      }}
    >
      {/* Brand Header */}
      <div
        className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 border-b"
        style={{
          background: "hsl(15 12% 10% / 0.95)",
          backdropFilter: "blur(12px)",
          borderColor: "hsl(0 50% 35% / 0.3)",
        }}
      >
        <div className="flex items-center gap-3">
          <img src={lionLogo} alt="Lion of Judah" className="w-10 h-10 rounded-full" />
          <div>
            <h1
              className="font-ceremonial text-lg tracking-wider"
              style={{ color: "hsl(0 70% 50%)" }}
            >
              Prophet Gad Music
            </h1>
            <p
              className="font-terminal text-[9px] tracking-widest uppercase"
              style={{ color: "hsl(45 60% 50% / 0.6)" }}
            >
              Thread Bare Music — Remnant Seed LLC
            </p>
          </div>
        </div>
        <img src={breastplateLogo} alt="Breastplate" className="w-10 h-10 rounded-full" />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        <EbookGrid />

        <div
          className="border-t my-4"
          style={{ borderColor: "hsl(0 50% 35% / 0.2)" }}
        />

        <ExtendedPlayList />
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300 hover:brightness-125"
        style={{
          background: "hsl(0 0% 5% / 0.8)",
          backdropFilter: "blur(8px)",
          borderColor: "hsl(0 70% 45% / 0.4)",
          color: "hsl(0 70% 50% / 0.8)",
        }}
      >
        <Swords className="w-4 h-4" />
        <span className="font-terminal text-[10px] tracking-widest uppercase">
          Back to Thunderdome
        </span>
      </button>
    </div>
  );
};
