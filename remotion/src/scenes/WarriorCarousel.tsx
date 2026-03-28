import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Orbitron";

const { fontFamily: orbitron } = loadFont("normal", { weights: ["700", "400"], subsets: ["latin"] });

const warriors = [
  { src: "images/gad-military-1.png", label: "TRIBE OF GAD" },
  { src: "images/gad-military-2.png", label: "WARRIORS OF ISRAEL" },
  { src: "images/pgai-warrior-new.png", label: "THE COMMANDER" },
];

const villains = [
  "NIMROD", "AHAB", "CONSTANTINE", "BALAAM", "PHARAOH", "DARWIN", "THE FALSE PROPHET"
];

export const WarriorCarousel = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Rotate warriors every 100 frames (~3.3s)
  const currentWarrior = Math.floor(frame / 100) % warriors.length;

  // Rotate villain names every 45 frames (~1.5s)
  const currentVillain = Math.floor(frame / 45) % villains.length;

  // Entrance
  const leftSlide = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  const rightSlide = spring({ frame: frame - 10, fps, config: { damping: 20, stiffness: 80 } });

  // Center "VS" pulse
  const vsPulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.8, 1.1]);

  return (
    <AbsoluteFill>
      {/* Dark arena background */}
      <AbsoluteFill style={{
        background: "radial-gradient(ellipse 70% 50% at 50% 50%, #120808 0%, #050505 100%)",
      }} />

      {/* Left panel — GAD warriors */}
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "38%",
        overflow: "hidden",
        transform: `translateX(${interpolate(leftSlide, [0, 1], [-400, 0])}px)`,
      }}>
        {warriors.map((w, i) => (
          <Img
            key={i}
            src={staticFile(w.src)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: i === currentWarrior ? 1 : 0,
              transition: "opacity 0.5s",
              filter: "brightness(0.85) contrast(1.1) sepia(0.08)",
              maskImage: "linear-gradient(to right, black 60%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, black 60%, transparent 100%)",
            }}
          />
        ))}
        {/* Label */}
        <div style={{
          position: "absolute",
          bottom: 100,
          left: 20,
          zIndex: 10,
        }}>
          <p style={{
            fontFamily: orbitron,
            fontSize: 18,
            color: "#c41e1e",
            letterSpacing: "0.3em",
            textShadow: "0 0 15px rgba(196,30,30,0.5)",
          }}>
            {warriors[currentWarrior].label}
          </p>
        </div>
      </div>

      {/* Right panel — Villain names / challenger */}
      <div style={{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: "38%",
        overflow: "hidden",
        transform: `translateX(${interpolate(rightSlide, [0, 1], [400, 0])}px)`,
        background: "linear-gradient(180deg, #0a0505 0%, #150808 50%, #0a0505 100%)",
        maskImage: "linear-gradient(to left, black 60%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to left, black 60%, transparent 100%)",
      }}>
        {/* Giant question mark */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <span style={{
            fontFamily: orbitron,
            fontSize: 200,
            color: "rgba(212, 175, 55, 0.15)",
            textShadow: "0 0 60px rgba(212,175,55,0.1)",
          }}>
            ?
          </span>
        </div>
        {/* Villain name */}
        <div style={{
          position: "absolute",
          bottom: 100,
          right: 20,
          zIndex: 10,
          textAlign: "right",
        }}>
          <p style={{
            fontFamily: orbitron,
            fontSize: 14,
            color: "rgba(212,175,55,0.7)",
            letterSpacing: "0.2em",
            marginBottom: 4,
          }}>
            CHALLENGER
          </p>
          <p style={{
            fontFamily: orbitron,
            fontSize: 18,
            color: "#d4af37",
            letterSpacing: "0.25em",
            textShadow: "0 0 15px rgba(212,175,55,0.4)",
          }}>
            {villains[currentVillain]}
          </p>
        </div>
      </div>

      {/* Center VS badge */}
      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 20,
      }}>
        <div style={{
          transform: `scale(${vsPulse})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <Img
            src={staticFile("images/lion-of-judah.png")}
            style={{
              width: 60,
              height: 60,
              marginBottom: 16,
              filter: "drop-shadow(0 0 20px rgba(212,175,55,0.5))",
            }}
          />
          <p style={{
            fontFamily: orbitron,
            fontSize: 72,
            fontWeight: 700,
            color: "#d4af37",
            textShadow: "0 0 40px rgba(212,175,55,0.5), 0 0 80px rgba(212,175,55,0.2)",
          }}>
            VS
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
