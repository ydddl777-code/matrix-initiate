import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HUDFrameProps {
  children: ReactNode;
  className?: string;
}

export const HUDFrame = ({ children, className }: HUDFrameProps) => {
  return (
    <div className={cn("relative", className)}>
      {/* Corner brackets - Royal Purple */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary" />
      
      {/* Gold accent corners */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-secondary translate-x-1 translate-y-1" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-secondary -translate-x-1 translate-y-1" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-secondary translate-x-1 -translate-y-1" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-secondary -translate-x-1 -translate-y-1" />
      
      {/* Inner content with frosted glass effect */}
      <div className="frosted-glass border border-primary/20 p-8">
        {children}
      </div>
      
      {/* Subtle scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 scanlines" />
    </div>
  );
};
