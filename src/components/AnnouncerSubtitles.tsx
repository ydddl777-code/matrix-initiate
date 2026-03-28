import { useState, useEffect, useRef } from "react";

// Each line with approximate start time (seconds) based on slow, deliberate delivery
// Tighter timing — speech is at 0.82x speed, each line ~3-5s of deliberate delivery
const SUBTITLE_LINES = [
  { time: 0, text: "Welcome, friend. Welcome, stranger.", highlight: true },
  { time: 5, text: "Welcome, citizen of every nation.", highlight: true },
  { time: 9, text: "I am the Prophetess Huldah.", gold: true },
  { time: 14, text: "This is a Bible doctrinal debate application." },
  { time: 20, text: "What you are seeing is symbolic." },
  { time: 25, text: "No one will be harmed here." },
  { time: 29, text: "No blood will be shed here." },
  { time: 34, text: "These images speak of spiritual warfare —", red: true },
  { time: 40, text: "the testing of doctrine, tradition, and every lie raised against the word of God." },
  { time: 50, text: "Prophet Gad answers with Scripture.", gold: true },
  { time: 55, text: "With the King James Bible, sixteen eleven." },
  { time: 61, text: "Bring your question." },
  { time: 65, text: "Bring your doctrine." },
  { time: 69, text: "Bring what you have been taught." },
  { time: 74, text: "The Threshing Floor is a place of testing.", red: true },
  { time: 80, text: "Truth is welcome here." },
  { time: 85, text: "So enter in peace —" },
  { time: 90, text: "and let every claim be weighed by the word of the Most High.", highlight: true },
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
