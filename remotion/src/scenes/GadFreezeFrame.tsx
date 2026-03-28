import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { loadFont as loadOrbitron } from "@remotion/google-fonts/Orbitron";

const { fontFamily: cinzel } = loadFont("normal", { weights: ["700"], subsets: ["latin"] });
const { fontFamily: orbitron } = loadOrbitron("normal", { weights: ["700", "400"], subsets: ["latin"] });

export const GadFreezeFrame = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gad image reveal
  const gadScale = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  const gadOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Title text animation
  const titleScale = spring({ frame: frame - 30, fps, config: { damping: 15, stiffness: 120 } });
  const titleOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });

  // Subtitle
  const subOpacity = interpolate(frame, [60, 80], [0, 1], { extrapolateRight: "clamp" });

  // Red border pulse
  const borderGlow = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.3, 0.8]);

  // Slow ken burns on Gad
  const slowDrift = interpolate(frame, [0, 450], [1, 1.08], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      {/* Dark arena background */}
      <AbsoluteFill style={{
        background: "radial-gradient(ellipse 60% 50% at 50% 40%, #1a0808 0%, #050505 100%)",
      }} />

      {/* Arena ring lines */}
      <AbsoluteFill style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.15,
      }}>
        <div style={{
          width: 800,
          height: 800,
          borderRadius: "50%",
          border: "1px solid rgba(139,0,0,0.6)",
          position: "absolute",
        }} />
        <div style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          border: "1px solid rgba(212,175,55,0.4)",
          position: "absolute",
        }} />
      </AbsoluteFill>

      {/* Gad portrait — freeze frame */}
      <AbsoluteFill style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: gadOpacity,
        transform: `scale(${interpolate(gadScale, [0, 1], [0.9, 1])}) scale(${slowDrift})`,
      }}>
        <Img
          src={staticFile("images/pgai-breastplate.png")}
          style={{
            width: 650,
            height: 850,
            objectFit: "cover",
            objectPosition: "top center",
            borderRadius: 12,
            border: `3px solid rgba(139, 0, 0, ${borderGlow})`,
            boxShadow: `0 0 60px rgba(139, 0, 0, ${borderGlow * 0.5}), 0 0 120px rgba(0,0,0,0.6)`,
            filter: "brightness(0.85) contrast(1.15) sepia(0.1)",
          }}
        />
      </AbsoluteFill>

      {/* Dark gradient overlay to create depth for text */}
      <AbsoluteFill style={{
        background: "linear-gradient(180deg, transparent 0%, transparent 50%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.95) 100%)",
        zIndex: 10,
      }} />

      {/* "ENTER THE THRESHING FLOOR" text */}
      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 250,
        zIndex: 20,
      }}>
        {/* Lion of Judah */}
        <Img
          src={staticFile("images/lion-of-judah.png")}
          style={{
            width: 80,
            height: 80,
            marginBottom: 20,
            opacity: titleOpacity,
            filter: "drop-shadow(0 0 20px rgba(212,175,55,0.4))",
          }}
        />

        <div style={{
          opacity: titleOpacity,
          transform: `scale(${interpolate(titleScale, [0, 1], [0.8, 1])})`,
        }}>
          <p style={{
            fontFamily: cinzel,
            fontSize: 56,
            fontWeight: 700,
            color: "#c41e1e",
            textAlign: "center",
            letterSpacing: "0.15em",
            textShadow: "0 0 40px rgba(196, 30, 30, 0.5), 0 4px 8px rgba(0,0,0,0.8)",
            lineHeight: 1.2,
          }}>
            ENTER THE
          </p>
          <p style={{
            fontFamily: cinzel,
            fontSize: 56,
            fontWeight: 700,
            color: "#c41e1e",
            textAlign: "center",
            letterSpacing: "0.15em",
            textShadow: "0 0 40px rgba(196, 30, 30, 0.5), 0 4px 8px rgba(0,0,0,0.8)",
            lineHeight: 1.2,
          }}>
            THRESHING FLOOR
          </p>
        </div>

        <p style={{
          fontFamily: orbitron,
          fontSize: 22,
          color: "rgba(212, 175, 55, 0.9)",
          letterSpacing: "0.5em",
          marginTop: 16,
          opacity: subOpacity,
          textShadow: "0 0 20px rgba(212,175,55,0.3)",
        }}>
          THE TRUTH DOES NOT NEGOTIATE
        </p>
      </AbsoluteFill>

      {/* Corner brackets */}
      {[
        { top: 80, left: 60 },
        { top: 80, right: 60 },
        { bottom: 80, left: 60 },
        { bottom: 80, right: 60 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...pos,
            width: 40,
            height: 40,
            borderColor: `rgba(139, 0, 0, ${borderGlow})`,
            borderStyle: "solid",
            borderWidth: 0,
            ...(i === 0 ? { borderTopWidth: 2, borderLeftWidth: 2 } :
               i === 1 ? { borderTopWidth: 2, borderRightWidth: 2 } :
               i === 2 ? { borderBottomWidth: 2, borderLeftWidth: 2 } :
                         { borderBottomWidth: 2, borderRightWidth: 2 }),
            zIndex: 30,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
