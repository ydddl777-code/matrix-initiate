import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { loadFont as loadOrbitron } from "@remotion/google-fonts/Orbitron";

const { fontFamily: cinzel } = loadFont("normal", { weights: ["700"], subsets: ["latin"] });
const { fontFamily: orbitron } = loadOrbitron("normal", { weights: ["700", "400"], subsets: ["latin"] });

export const ThreshingFloorEntry = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gate reveal
  const gateScale = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  const gateOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // ENTER button appearance
  const enterSpring = spring({ frame: frame - 40, fps, config: { damping: 12, stiffness: 120 } });
  const enterOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" });

  // Threshing Floor text
  const tfOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: "clamp" });
  const tfY = interpolate(
    spring({ frame: frame - 25, fps, config: { damping: 15, stiffness: 100 } }),
    [0, 1], [40, 0]
  );

  // Pulsing glow on ENTER
  const pulse = interpolate(Math.sin(frame * 0.12), [-1, 1], [0.6, 1]);

  // Border glow
  const borderGlow = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.4, 0.9]);

  // Slow background drift
  const bgDrift = interpolate(frame, [0, 240], [1, 1.04], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      {/* Dark arena background */}
      <AbsoluteFill style={{
        background: `radial-gradient(ellipse 70% 55% at 50% 40%, #1a0808 0%, #080303 60%, #050505 100%)`,
        transform: `scale(${bgDrift})`,
      }} />

      {/* Arena ring decorations */}
      <AbsoluteFill style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: gateOpacity * 0.12,
      }}>
        <div style={{
          width: 700,
          height: 700,
          borderRadius: "50%",
          border: `2px solid rgba(139, 0, 0, ${borderGlow})`,
          position: "absolute",
        }} />
        <div style={{
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: `1px solid rgba(212, 175, 55, ${borderGlow * 0.5})`,
          position: "absolute",
        }} />
      </AbsoluteFill>

      {/* Lion of Judah — centered above */}
      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 300,
        opacity: gateOpacity,
        transform: `scale(${interpolate(gateScale, [0, 1], [0.8, 1])})`,
      }}>
        <Img
          src={staticFile("images/lion-of-judah.png")}
          style={{
            width: 140,
            height: 140,
            filter: `drop-shadow(0 0 ${30 * pulse}px rgba(212,175,55,0.6))`,
          }}
        />
      </AbsoluteFill>

      {/* THRESHING FLOOR text */}
      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 60,
        zIndex: 10,
      }}>
        <div style={{
          opacity: tfOpacity,
          transform: `translateY(${tfY}px)`,
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: cinzel,
            fontSize: 58,
            fontWeight: 700,
            color: "#c41e1e",
            letterSpacing: "0.12em",
            textShadow: "0 0 40px rgba(196,30,30,0.5), 0 4px 8px rgba(0,0,0,0.8)",
            lineHeight: 1.2,
          }}>
            THE
          </p>
          <p style={{
            fontFamily: cinzel,
            fontSize: 58,
            fontWeight: 700,
            color: "#c41e1e",
            letterSpacing: "0.12em",
            textShadow: "0 0 40px rgba(196,30,30,0.5), 0 4px 8px rgba(0,0,0,0.8)",
            lineHeight: 1.2,
          }}>
            THRESHING FLOOR
          </p>
        </div>

        {/* ENTER button */}
        <div style={{
          opacity: enterOpacity,
          transform: `scale(${interpolate(enterSpring, [0, 1], [0.6, 1])})`,
          marginTop: 50,
        }}>
          <div style={{
            padding: "20px 80px",
            border: `3px solid rgba(212, 175, 55, ${pulse})`,
            borderRadius: 8,
            background: `rgba(139, 0, 0, ${0.15 + pulse * 0.15})`,
            boxShadow: `0 0 ${40 * pulse}px rgba(212,175,55,${pulse * 0.2}), 0 0 80px rgba(139,0,0,${pulse * 0.15})`,
          }}>
            <p style={{
              fontFamily: orbitron,
              fontSize: 36,
              fontWeight: 700,
              color: "#d4af37",
              letterSpacing: "0.4em",
              textShadow: `0 0 ${20 * pulse}px rgba(212,175,55,0.5)`,
            }}>
              ENTER
            </p>
          </div>
        </div>
      </AbsoluteFill>

      {/* Tagline below */}
      <AbsoluteFill style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingBottom: 300,
        zIndex: 10,
      }}>
        <p style={{
          fontFamily: orbitron,
          fontSize: 16,
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.5em",
          opacity: enterOpacity,
        }}>
          DOCTRINAL WARFARE AWAITS
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
            width: 40,
            height: 40,
            borderColor: `rgba(139, 0, 0, ${borderGlow * 0.7})`,
            borderStyle: "solid",
            borderWidth: 0,
            ...(i === 0 ? { borderTopWidth: 2, borderLeftWidth: 2 } :
               i === 1 ? { borderTopWidth: 2, borderRightWidth: 2 } :
               i === 2 ? { borderBottomWidth: 2, borderLeftWidth: 2 } :
                         { borderBottomWidth: 2, borderRightWidth: 2 }),
            zIndex: 30,
            opacity: gateOpacity,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
