import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { loadFont as loadOrbitron } from "@remotion/google-fonts/Orbitron";

const { fontFamily: cinzel } = loadFont("normal", { weights: ["700"], subsets: ["latin"] });
const { fontFamily: orbitron } = loadOrbitron("normal", { weights: ["700", "400"], subsets: ["latin"] });

export const CallToAction = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 15, stiffness: 100 } });
  const textOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });
  const urlOpacity = interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" });

  // Fade out at end
  const fadeOut = interpolate(frame, [120, 150], [1, 0], { extrapolateRight: "clamp" });

  // Pulsing glow
  const glow = interpolate(Math.sin(frame * 0.12), [-1, 1], [0.4, 1]);

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      {/* Background */}
      <AbsoluteFill style={{
        background: "radial-gradient(ellipse 60% 50% at 50% 45%, #1a0808 0%, #050505 100%)",
      }} />

      {/* Content */}
      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
      }}>
        {/* Lion logo */}
        <Img
          src={staticFile("images/lion-of-judah.png")}
          style={{
            width: 120,
            height: 120,
            transform: `scale(${interpolate(logoScale, [0, 1], [0.5, 1])})`,
            filter: `drop-shadow(0 0 ${30 * glow}px rgba(212,175,55,0.6))`,
          }}
        />

        {/* Title */}
        <div style={{ opacity: textOpacity, textAlign: "center" }}>
          <p style={{
            fontFamily: cinzel,
            fontSize: 48,
            fontWeight: 700,
            color: "#c41e1e",
            letterSpacing: "0.15em",
            textShadow: "0 0 30px rgba(196,30,30,0.5)",
            lineHeight: 1.3,
          }}>
            DOCTRINAL WARFARE
          </p>
          <p style={{
            fontFamily: orbitron,
            fontSize: 20,
            color: "rgba(212,175,55,0.9)",
            letterSpacing: "0.5em",
            marginTop: 12,
          }}>
            THE THRESHING FLOOR
          </p>
        </div>

        {/* URL */}
        <div style={{
          opacity: urlOpacity,
          marginTop: 40,
          padding: "12px 32px",
          border: `2px solid rgba(139, 0, 0, ${glow})`,
          borderRadius: 8,
          background: "rgba(0,0,0,0.6)",
        }}>
          <p style={{
            fontFamily: orbitron,
            fontSize: 22,
            color: "#f0e6d0",
            letterSpacing: "0.15em",
          }}>
            matrix-initiate.lovable.app
          </p>
        </div>

        <p style={{
          fontFamily: orbitron,
          fontSize: 14,
          color: "rgba(212,175,55,0.6)",
          letterSpacing: "0.4em",
          opacity: urlOpacity,
          marginTop: 8,
        }}>
          ENTER IF YOU HAVE THE COURAGE
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
