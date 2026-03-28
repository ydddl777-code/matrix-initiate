import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { loadFont as loadOrbitron } from "@remotion/google-fonts/Orbitron";

const { fontFamily: cinzel } = loadFont("normal", { weights: ["700"], subsets: ["latin"] });
const { fontFamily: orbitron } = loadOrbitron("normal", { weights: ["700", "400"], subsets: ["latin"] });

export const PromoCTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 15, stiffness: 100 } });
  const titleOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" });
  const urlOpacity = interpolate(frame, [45, 65], [0, 1], { extrapolateRight: "clamp" });
  const taglineOpacity = interpolate(frame, [70, 90], [0, 1], { extrapolateRight: "clamp" });

  // Fade out at very end
  const fadeOut = interpolate(frame, [280, 330], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Pulsing glow
  const glow = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.5, 1]);

  // Slow breathing background
  const bgPulse = interpolate(Math.sin(frame * 0.03), [-1, 1], [0.95, 1.05]);

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      {/* Background */}
      <AbsoluteFill style={{
        background: `radial-gradient(ellipse 60% 50% at 50% 45%, #1a0808 0%, #050505 100%)`,
        transform: `scale(${bgPulse})`,
      }} />

      {/* Subtle ring */}
      <AbsoluteFill style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.1,
      }}>
        <div style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          border: `2px solid rgba(139,0,0,${glow * 0.6})`,
        }} />
      </AbsoluteFill>

      {/* Content */}
      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
      }}>
        {/* Lion logo */}
        <Img
          src={staticFile("images/lion-of-judah.png")}
          style={{
            width: 160,
            height: 160,
            transform: `scale(${interpolate(logoScale, [0, 1], [0.4, 1])})`,
            filter: `drop-shadow(0 0 ${35 * glow}px rgba(212,175,55,0.6))`,
          }}
        />

        {/* Title */}
        <div style={{ opacity: titleOpacity, textAlign: "center" }}>
          <p style={{
            fontFamily: cinzel,
            fontSize: 52,
            fontWeight: 700,
            color: "#c41e1e",
            letterSpacing: "0.15em",
            textShadow: "0 0 30px rgba(196,30,30,0.5)",
            lineHeight: 1.2,
          }}>
            DOCTRINAL WARFARE
          </p>
          <p style={{
            fontFamily: orbitron,
            fontSize: 22,
            color: "rgba(212,175,55,0.9)",
            letterSpacing: "0.4em",
            marginTop: 16,
          }}>
            THE THRESHING FLOOR
          </p>
        </div>

        {/* URL — the main thing */}
        <div style={{
          opacity: urlOpacity,
          marginTop: 30,
          padding: "18px 48px",
          border: `2px solid rgba(212, 175, 55, ${glow * 0.8})`,
          borderRadius: 8,
          background: "rgba(0,0,0,0.7)",
          boxShadow: `0 0 30px rgba(212,175,55,${glow * 0.15})`,
        }}>
          <p style={{
            fontFamily: orbitron,
            fontSize: 30,
            fontWeight: 700,
            color: "#d4af37",
            letterSpacing: "0.1em",
            textShadow: "0 0 20px rgba(212,175,55,0.4)",
          }}>
            prophetgadspeaks.com
          </p>
        </div>

        <p style={{
          fontFamily: orbitron,
          fontSize: 16,
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.5em",
          opacity: taglineOpacity,
          marginTop: 12,
        }}>
          ENTER IF YOU HAVE THE COURAGE
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
