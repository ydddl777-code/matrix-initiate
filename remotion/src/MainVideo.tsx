import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { HuldahIntro } from "./scenes/HuldahIntro";
import { GadFreezeFrame } from "./scenes/GadFreezeFrame";
import { WarriorCarousel } from "./scenes/WarriorCarousel";
import { CallToAction } from "./scenes/CallToAction";

// Timeline (30fps):
// 0-900 (0-30s): Huldah intro with rotating videos + subtitles
// 900-1350 (30-45s): Gad freeze frame + "Enter the Threshing Floor"
// 1350-1650 (45-55s): Warrior carousel with sidebars
// 1650-1800 (55-60s): Final CTA / logo

export const MainVideo = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#050505" }}>
      {/* Background music — Warning in the Dark, trimmed to 60s */}
      <Audio
        src={staticFile("audio/warning-in-the-dark.mp3")}
        volume={(f) => {
          // Fade in 0-2s
          const fadeIn = interpolate(f, [0, 60], [0, 0.7], { extrapolateRight: "clamp" });
          // Duck during Huldah speech (frames 120-840 = 4s-28s)
          const duck = interpolate(f, [120, 150, 840, 870], [1, 0.15, 0.15, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          // Fade out at end
          const fadeOut = interpolate(f, [1680, 1800], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return fadeIn * duck * fadeOut;
        }}
      />

      {/* Persistent dark vignette */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.8) 100%)`,
          zIndex: 50,
          pointerEvents: "none",
        }}
      />

      {/* Scene 1: Huldah Introduction */}
      <Sequence from={0} durationInFrames={900}>
        <HuldahIntro />
      </Sequence>

      {/* Scene 2: Gad Freeze Frame */}
      <Sequence from={900} durationInFrames={450}>
        <GadFreezeFrame />
      </Sequence>

      {/* Scene 3: Warrior Carousel */}
      <Sequence from={1350} durationInFrames={300}>
        <WarriorCarousel />
      </Sequence>

      {/* Scene 4: Final CTA */}
      <Sequence from={1650} durationInFrames={150}>
        <CallToAction />
      </Sequence>
    </AbsoluteFill>
  );
};
