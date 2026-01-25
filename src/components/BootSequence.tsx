import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_MESSAGES = [
  { text: "> ESTABLISHING SECURE UPLINK TO THE LOFT...", delay: 0 },
  { text: "> INITIALIZING CAMP OF ISRAEL PERIMETER...", delay: 800 },
  { text: "> SCANNING SPIRITUAL FREQUENCIES...", delay: 1600 },
  { text: "> LOADING DOCTRINE DATABASE [KJV SWORD]...", delay: 2400 },
  { text: "> VERIFYING REMNANT CREDENTIALS...", delay: 3200 },
  { text: "> PROPHET GAD ONLINE. THE GENERAL IS PRESENT.", delay: 4000 },
  { text: "> [ RECRUIT ACCESS GRANTED ]", delay: 4800, isSuccess: true },
];

export const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [currentTyping, setCurrentTyping] = useState<number | null>(0);
  const [typedChars, setTypedChars] = useState<Record<number, number>>({});

  useEffect(() => {
    BOOT_MESSAGES.forEach((msg, index) => {
      // Start showing message
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, index]);
        setCurrentTyping(index);
        setTypedChars((prev) => ({ ...prev, [index]: 0 }));
      }, msg.delay);

      // Type out the message
      const typeMessage = () => {
        const chars = msg.text.length;
        for (let i = 0; i <= chars; i++) {
          setTimeout(() => {
            setTypedChars((prev) => ({ ...prev, [index]: i }));
            if (i === chars && index === BOOT_MESSAGES.length - 1) {
              setTimeout(onComplete, 1000);
            }
          }, i * 20);
        }
      };

      setTimeout(typeMessage, msg.delay + 100);
    });
  }, [onComplete]);

  return (
    <div className="font-terminal text-sm space-y-2 text-left max-w-xl mx-auto">
      {BOOT_MESSAGES.map((msg, index) => {
        const isVisible = visibleMessages.includes(index);
        const charsToShow = typedChars[index] || 0;
        const displayText = msg.text.substring(0, charsToShow);
        const isComplete = charsToShow >= msg.text.length;

        if (!isVisible) return null;

        return (
          <div
            key={index}
            className={cn(
              "flex items-center gap-2 transition-opacity duration-300",
              msg.isSuccess ? "text-primary text-glow-purple font-bold" : "text-foreground"
            )}
          >
            <span className={cn(msg.isSuccess && "font-bold")}>
              {displayText}
            </span>
            {!isComplete && currentTyping === index && (
              <span className="terminal-cursor" />
            )}
            {isComplete && !msg.isSuccess && (
              <span className="text-secondary text-xs ml-2 font-bold">[OK]</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
