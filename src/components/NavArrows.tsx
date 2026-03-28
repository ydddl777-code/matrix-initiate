import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavArrowsProps {
  onBack?: () => void;
  onForward?: () => void;
  backLabel?: string;
  forwardLabel?: string;
}

export const NavArrows = ({ onBack, onForward, backLabel = "BACK", forwardLabel = "NEXT" }: NavArrowsProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      {onBack && (
        <button
          onClick={onBack}
          className="group flex items-center gap-1.5 px-4 py-2.5 rounded-full transition-all duration-300 hover:opacity-100 opacity-60"
          style={{
            background: 'hsl(0 0% 5% / 0.7)',
            backdropFilter: 'blur(8px)',
            border: '1px solid hsl(45 60% 40% / 0.3)',
          }}
          title={backLabel}
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" style={{ color: 'hsl(45 80% 55%)' }} />
          <span className="font-terminal text-[10px] tracking-[0.2em] uppercase" style={{ color: 'hsl(45 80% 55%)' }}>
            {backLabel}
          </span>
        </button>
      )}
      {onForward && (
        <button
          onClick={onForward}
          className="group flex items-center gap-1.5 px-4 py-2.5 rounded-full transition-all duration-300 hover:opacity-100 opacity-60"
          style={{
            background: 'hsl(0 0% 5% / 0.7)',
            backdropFilter: 'blur(8px)',
            border: '1px solid hsl(45 60% 40% / 0.3)',
          }}
          title={forwardLabel}
        >
          <span className="font-terminal text-[10px] tracking-[0.2em] uppercase" style={{ color: 'hsl(45 80% 55%)' }}>
            {forwardLabel}
          </span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ color: 'hsl(45 80% 55%)' }} />
        </button>
      )}
    </div>
  );
};
