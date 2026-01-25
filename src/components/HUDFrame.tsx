import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HUDFrameProps {
  children: ReactNode;
  className?: string;
}

export const HUDFrame = ({ children, className }: HUDFrameProps) => {
  return (
    <div className={cn("relative", className)}>
      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/60" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary/60" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary/60" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/60" />
      
      {/* Inner content with subtle border */}
      <div className="border border-primary/20 bg-background/40 backdrop-blur-sm p-8">
        {children}
      </div>
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-30 scanlines" />
    </div>
  );
};
