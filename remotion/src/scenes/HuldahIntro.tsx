import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile, Sequence } from "remotion";
import { Video } from "@remotion/media";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { loadFont as loadOrbitron } from "@remotion/google-fonts/Orbitron";

const { fontFamily: cinzel } = loadFont("normal", { weights: ["700"], subsets: ["latin"] });
const { fontFamily: orbitron } = loadOrbitron("normal", { weights: ["700", "400"], subsets: ["latin"] });

// Huldah's speech — subtitle lines timed to ~28 seconds
const subtitleLines = [
  { start: 0, end: 3, text: "Welcome, friend." },
  { start: 3, end: 6, text: "Welcome, stranger." },
  { start: 6, end: 10, text: "Welcome, seeker of truth." },
  { start: 10, end: 14, text: "You have entered a place of doctrine." },
  { start: 14, end: 17, text: "Not of religion." },
  { start: 17, end: 20, text: "But of confrontation with the Word." },
  { start: 20, end: 24, text: "The Prophet will answer from the Most High." },
  { start: 24, end: 28, text: "The truth does not negotiate." },
];

const huldahVideos = [
  "video/huldah-2.mp4",
  "video/huldah-3.mp4",
  "video/huldah-4.mp4",
  "video/huldah-5.mp4",
];

export const HuldahIntro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timeInSeconds = frame / fps;

  // Video rotation: each video plays ~7.5 seconds
  const videoIndex = Math.min(Math.floor(timeInSeconds / 7.5), huldahVideos.length - 1);

  // Initial Huldah portrait reveal (0-4s)
  const portraitOpacity = interpolate(frame, [0, 30, 90, 120], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const portraitScale = interpolate(frame, [0, 30], [1.1, 1], { extrapolateRight: "clamp" });

  // Subtitle display
  const currentSubtitle = subtitleLines.find(
    (line) => timeInSeconds >= line.start + 4 && timeInSeconds < line.end + 4
  );

  // Text reveal
  const subtitleOpacity = currentSubtitle
    ? interpolate(
        timeInSeconds,
        [currentSubtitle.start + 4, currentSubtitle.start + 4.3, currentSubtitle.end + 3.5, currentSubtitle.end + 4],
        [0, 1, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0;

  // Title card appears at the start
  const titleOpacity = interpolate(frame, [0, 20, 80, 110], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 20], [40, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      {/* Dark cinematic background */}
      <AbsoluteFill style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 30%, #1a0a0a 0%, #050505 100%)",
      }} />

      {/* Huldah portrait (first 4 seconds) */}
      <AbsoluteFill style={{
        opacity: portraitOpacity,
        transform: `scale(${portraitScale})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Img
          src={staticFile("images/prophetess-huldah.png")}
          style={{
            width: 500,
            height: 500,
            objectFit: "cover",
            borderRadius: "50%",
            border: "3px solid rgba(212, 175, 55, 0.6)",
            boxShadow: "0 0 80px rgba(212, 175, 55, 0.3), 0 0 160px rgba(139, 0, 0, 0.2)",
          }}
        />
      </AbsoluteFill>

      {/* Title card overlay */}
      <AbsoluteFill style={{
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 350,
      }}>
        <p style={{
          fontFamily: orbitron,
          fontSize: 28,
          color: "rgba(212, 175, 55, 0.9)",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
        }}>
          PROPHETESS HULDAH
        </p>
      </AbsoluteFill>

      {/* Rotating Huldah videos (after portrait) */}
      {frame > 110 && (
        <AbsoluteFill style={{
          opacity: interpolate(frame, [110, 140], [0, 1], { extrapolateRight: "clamp" }),
        }}>
          {huldahVideos.map((vid, i) => (
            <Sequence key={i} from={Math.round(i * 7.5 * fps) - 110} durationInFrames={Math.round(7.5 * fps) + 15}>
              <AbsoluteFill style={{
                opacity: i === videoIndex ? 1 : 0,
              }}>
                <Video
                  src={staticFile(vid)}
                  muted
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(0.7) contrast(1.2) sepia(0.15)",
                  }}
                  loop
                />
              </AbsoluteFill>
            </Sequence>
          ))}
        </AbsoluteFill>
      )}

      {/* Crimson overlay gradient */}
      <AbsoluteFill style={{
        background: "linear-gradient(180deg, rgba(139,0,0,0.15) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.8) 100%)",
        zIndex: 10,
      }} />

      {/* Subtitles */}
      {currentSubtitle && (
        <AbsoluteFill style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 200,
          zIndex: 20,
        }}>
          <div style={{
            opacity: subtitleOpacity,
            background: "rgba(0,0,0,0.7)",
            padding: "16px 40px",
            borderRadius: 8,
            borderLeft: "3px solid rgba(139, 0, 0, 0.8)",
            maxWidth: 900,
          }}>
            <p style={{
              fontFamily: cinzel,
              fontSize: 38,
              color: "#f0e6d0",
              textAlign: "center",
              lineHeight: 1.5,
              textShadow: "0 2px 20px rgba(0,0,0,0.8)",
            }}>
              {currentSubtitle.text}
            </p>
          </div>
        </AbsoluteFill>
      )}

      {/* Pulsing audio visualizer dots */}
      <AbsoluteFill style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingBottom: 160,
        zIndex: 15,
        opacity: frame > 120 ? 0.6 : 0,
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          {[0, 1, 2, 3, 4].map((i) => {
            const barHeight = interpolate(
              Math.sin(frame * 0.15 + i * 1.2),
              [-1, 1],
              [4, 16]
            );
            return (
              <div
                key={i}
                style={{
                  width: 4,
                  height: barHeight,
                  backgroundColor: "rgba(212, 175, 55, 0.7)",
                  borderRadius: 2,
                }}
              />
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
