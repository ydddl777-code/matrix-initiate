import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { loadFont as loadOrbitron } from "@remotion/google-fonts/Orbitron";

const { fontFamily: cinzel } = loadFont("normal", { weights: ["700"], subsets: ["latin"] });
const { fontFamily: orbitron } = loadOrbitron("normal", { weights: ["700", "400"], subsets: ["latin"] });

const tribes = [
  { image: "images/tribe-judah.jpeg", name: "JUDAH", color: "#d4af37" },
  { image: "images/tribe-reuben.jpeg", name: "REUBEN", color: "#c41e1e" },
  { image: "images/tribe-levi.jpeg", name: "LEVI", color: "#d4af37" },
  { image: "images/tribe-naphtali.jpeg", name: "NAPHTALI", color: "#c41e1e" },
  { image: "images/tribe-zebulun.jpeg", name: "ZEBULUN", color: "#d4af37" },
  { image: "images/tribe-asher.jpeg", name: "ASHER", color: "#c41e1e" },
];

const FRAMES_PER_TRIBE = 120; // 4 seconds each

export const TribalShowcase = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentIndex = Math.min(Math.floor(frame / FRAMES_PER_TRIBE), tribes.length - 1);
  const localFrame = frame - currentIndex * FRAMES_PER_TRIBE;
  const tribe = tribes[currentIndex];

  // Image entrance
  const imgScale = spring({ frame: localFrame, fps, config: { damping: 20, stiffness: 80 } });
  const imgOpacity = interpolate(localFrame, [0, 15, FRAMES_PER_TRIBE - 15, FRAMES_PER_TRIBE], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Name entrance
  const nameY = interpolate(
    spring({ frame: localFrame - 20, fps, config: { damping: 15, stiffness: 120 } }),
    [0, 1], [60, 0]
  );
  const nameOpacity = interpolate(localFrame, [20, 35, FRAMES_PER_TRIBE - 15, FRAMES_PER_TRIBE], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Slow ken burns
  const drift = interpolate(localFrame, [0, FRAMES_PER_TRIBE], [1, 1.06], { extrapolateRight: "clamp" });

  // Scanline effect
  const scanY = interpolate(frame % 120, [0, 120], [0, 1920]);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{
        background: "radial-gradient(ellipse 70% 50% at 50% 40%, #1a0808 0%, #050505 100%)",
      }} />

      {/* Tribe image — full-screen cinematic */}
      <AbsoluteFill style={{
        opacity: imgOpacity,
        transform: `scale(${interpolate(imgScale, [0, 1], [0.95, 1]) * drift})`,
      }}>
        <Img
          src={staticFile(tribe.image)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.75) contrast(1.2) sepia(0.1)",
          }}
        />
      </AbsoluteFill>

      {/* Dark gradient overlays */}
      <AbsoluteFill style={{
        background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 25%, transparent 60%, rgba(0,0,0,0.9) 100%)",
        zIndex: 5,
      }} />

      {/* Scanline */}
      <AbsoluteFill style={{
        background: `linear-gradient(180deg, transparent ${scanY - 2}px, rgba(212,175,55,0.05) ${scanY}px, transparent ${scanY + 2}px)`,
        zIndex: 6,
        pointerEvents: "none",
      }} />

      {/* Tribe name */}
      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 280,
        zIndex: 10,
      }}>
        <p style={{
          fontFamily: orbitron,
          fontSize: 16,
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.6em",
          opacity: nameOpacity,
          transform: `translateY(${nameY}px)`,
          marginBottom: 12,
        }}>
          TRIBE OF
        </p>
        <p style={{
          fontFamily: cinzel,
          fontSize: 72,
          fontWeight: 700,
          color: tribe.color,
          letterSpacing: "0.2em",
          opacity: nameOpacity,
          transform: `translateY(${nameY}px)`,
          textShadow: `0 0 40px ${tribe.color}88, 0 4px 12px rgba(0,0,0,0.8)`,
        }}>
          {tribe.name}
        </p>
      </AbsoluteFill>

      {/* Corner brackets */}
      {[
        { top: 60, left: 40 },
        { top: 60, right: 40 },
        { bottom: 60, left: 40 },
        { bottom: 60, right: 40 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...pos,
            width: 36,
            height: 36,
            borderColor: `rgba(139, 0, 0, 0.5)`,
            borderStyle: "solid",
            borderWidth: 0,
            ...(i === 0 ? { borderTopWidth: 2, borderLeftWidth: 2 } :
               i === 1 ? { borderTopWidth: 2, borderRightWidth: 2 } :
               i === 2 ? { borderBottomWidth: 2, borderLeftWidth: 2 } :
                         { borderBottomWidth: 2, borderRightWidth: 2 }),
            zIndex: 30,
            opacity: imgOpacity,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
