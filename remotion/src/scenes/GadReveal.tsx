import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { loadFont as loadOrbitron } from "@remotion/google-fonts/Orbitron";

const { fontFamily: cinzel } = loadFont("normal", { weights: ["700"], subsets: ["latin"] });
const { fontFamily: orbitron } = loadOrbitron("normal", { weights: ["700", "400"], subsets: ["latin"] });

const gadImages = [
  "images/pgai-general.png",
  "images/pgai-military.png",
  "images/pgai-jacket.png",
  "images/pgai-breastplate.png",
];

const FRAMES_PER_IMAGE = 150; // 5 seconds each

export const GadReveal = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentIndex = Math.min(Math.floor(frame / FRAMES_PER_IMAGE), gadImages.length - 1);
  const localFrame = frame - currentIndex * FRAMES_PER_IMAGE;

  // Image crossfade
  const imgOpacity = interpolate(localFrame, [0, 20, FRAMES_PER_IMAGE - 20, FRAMES_PER_IMAGE], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const imgScale = interpolate(localFrame, [0, FRAMES_PER_IMAGE], [1, 1.05], { extrapolateRight: "clamp" });

  // Title entrance (appears on first image)
  const titleSpring = spring({ frame: frame - 30, fps, config: { damping: 15, stiffness: 100 } });
  const titleOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });

  // Pulsing border
  const borderGlow = interpolate(Math.sin(frame * 0.06), [-1, 1], [0.3, 0.7]);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{
        background: "radial-gradient(ellipse 60% 50% at 50% 40%, #1a0808 0%, #050505 100%)",
      }} />

      {/* Gad image — centered portrait */}
      <AbsoluteFill style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: imgOpacity,
        transform: `scale(${imgScale})`,
      }}>
        <Img
          src={staticFile(gadImages[currentIndex])}
          style={{
            width: 700,
            height: 900,
            objectFit: "cover",
            objectPosition: "top center",
            borderRadius: 12,
            border: `3px solid rgba(139, 0, 0, ${borderGlow})`,
            boxShadow: `0 0 80px rgba(139, 0, 0, ${borderGlow * 0.4}), 0 0 160px rgba(0,0,0,0.7)`,
            filter: "brightness(0.85) contrast(1.15) sepia(0.08)",
          }}
        />
      </AbsoluteFill>

      {/* Dark gradient for text */}
      <AbsoluteFill style={{
        background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 20%, transparent 55%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.95) 100%)",
        zIndex: 10,
      }} />

      {/* Title overlay */}
      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 200,
        zIndex: 20,
      }}>
        <p style={{
          fontFamily: orbitron,
          fontSize: 18,
          color: "rgba(212,175,55,0.7)",
          letterSpacing: "0.5em",
          opacity: titleOpacity,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
          marginBottom: 12,
        }}>
          PROPHET GAD SPEAKS
        </p>
        <p style={{
          fontFamily: cinzel,
          fontSize: 52,
          fontWeight: 700,
          color: "#c41e1e",
          letterSpacing: "0.15em",
          opacity: titleOpacity,
          textShadow: "0 0 40px rgba(196,30,30,0.4), 0 4px 8px rgba(0,0,0,0.8)",
          textAlign: "center",
          lineHeight: 1.3,
        }}>
          THE THRESHING FLOOR
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
