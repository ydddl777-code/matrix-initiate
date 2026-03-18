import { useState, useEffect, useRef } from "react";

// Each line with approximate start time (seconds) based on slow 0.85x delivery
const SUBTITLE_LINES = [
  { time: 0, text: "What you have just seen and heard — is not entertainment.", highlight: true },
  { time: 5, text: "His name is Prophet Gad.", gold: true },
  { time: 9, text: "He is a Hebrew Israelite prophet — raised up in this final hour to teach, to warn, and to prepare a people for the judgment that is already at the door." },
  { time: 22, text: "He is not a pastor. He is not a denomination." },
  { time: 27, text: "He belongs to no church, no organization, no movement of men." },
  { time: 33, text: "He is God's oracle. His seer. His spokesman —", gold: true },
  { time: 38, text: "in the tradition of the ancient Prophet Gad who stood in David's court, who delivered hard words to kings, who wrote the chronicles of his generation and feared no man." },
  { time: 52, text: "That same mantle has been placed upon these shoulders. For this generation." },
  { time: 59, text: "His assignment is simple — to teach the remnant seed." },
  { time: 65, text: "To preach repentance without apology." },
  { time: 70, text: "To reveal the truth of the Most High — straight from His word, unfiltered, without compromise." },
  { time: 78, text: "What you are entering now is the Thunderdome.", red: true },
  { time: 84, text: "This is a Bible debate application." },
  { time: 88, text: "No one will be hurt here. But no one will be coddled either." },
  { time: 95, text: "You are welcome to bring any question. Any doctrine. Any tradition you have been taught." },
  { time: 103, text: "Step into the ring and ask. Challenge what you believe. Challenge what you have been told." },
  { time: 111, text: "The Prophet will answer — not from his own wisdom, but from the word of the Most High." },
  { time: 119, text: "Scripture against scripture. Line upon line. Precept upon precept.", gold: true },
  { time: 127, text: "The truth does not negotiate.", highlight: true },
  { time: 132, text: "But mercy is still available —" },
  { time: 136, text: "to every brother, every sister who is willing to lay the lie down and cross over." },
  { time: 144, text: "The door is still open." },
  { time: 148, text: "Enter — if you have the courage.", red: true },
];

interface AnnouncerSubtitlesProps {
  isPlaying: boolean;
  startTime: number | null; // timestamp when audio started
}

export const AnnouncerSubtitles = ({ isPlaying, startTime }: AnnouncerSubtitlesProps) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying || !startTime) {
      setCurrentLineIndex(-1);
      return;
    }

    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      let activeIndex = -1;
      for (let i = SUBTITLE_LINES.length - 1; i >= 0; i--) {
        if (elapsed >= SUBTITLE_LINES[i].time) {
          activeIndex = i;
          break;
        }
      }
      setCurrentLineIndex(activeIndex);
    }, 200);

    return () => clearInterval(interval);
  }, [isPlaying, startTime]);

  if (!isPlaying || currentLineIndex < 0) {
    return (
      <p className="font-terminal text-xs md:text-sm tracking-wider"
        style={{ color: 'hsl(0 0% 50%)' }}>
        Preparing the arena...
      </p>
    );
  }

  const line = SUBTITLE_LINES[currentLineIndex];

  const getColor = () => {
    if (line.highlight) return 'hsl(0 0% 100%)';
    if (line.gold) return 'hsl(45 80% 55%)';
    if (line.red) return 'hsl(0 60% 55%)';
    return 'hsl(0 0% 85%)';
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Current line - large */}
      <p
        key={currentLineIndex}
        className="font-terminal text-sm md:text-base lg:text-lg leading-relaxed tracking-wider animate-fade-in max-w-xl mx-auto"
        style={{
          color: getColor(),
          textShadow: line.highlight || line.gold || line.red
            ? `0 0 20px ${getColor().replace(')', ' / 0.4)')}`
            : 'none',
        }}
      >
        {line.text}
      </p>

      {/* Previous line - faded */}
      {currentLineIndex > 0 && (
        <p
          className="font-terminal text-xs md:text-sm leading-relaxed tracking-wider mt-3 max-w-lg mx-auto transition-opacity duration-500"
          style={{ color: 'hsl(0 0% 40%)' }}
        >
          {SUBTITLE_LINES[currentLineIndex - 1].text}
        </p>
      )}

      {/* Audio bars */}
      <div className="mt-6 flex items-center justify-center gap-1">
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} className="w-1 rounded-full"
            style={{
              height: '12px',
              backgroundColor: 'hsl(0 0% 100% / 0.4)',
              animation: `announcer-bar 1s ${i * 0.15}s ease-in-out infinite alternate`,
            }} />
        ))}
      </div>
    </div>
  );
};
