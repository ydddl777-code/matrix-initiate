import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { HuldahIntro } from "./scenes/HuldahIntro";
import { GadFreezeFrame } from "./scenes/GadFreezeFrame";
import { WarriorCarousel } from "./scenes/WarriorCarousel";
import { CallToAction } from "./scenes/CallToAction";

// Full-length YouTube version (~3:44 = 224s = 6720 frames at 30fps)
// Timeline:
// 0-1440 (0-48s): Huldah intro with speech + subtitles
// 1440-6200 (48-207s): Gad freeze frame + warrior carousel looping
// 6200-6720 (207-224s): Final CTA / logo

export const FullLengthVideo = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#050505" }}>
      {/* Full song — Warning in the Dark */}
      <Audio
        src={staticFile("audio/warning-in-the-dark.mp3")}
        volume={(f) => {
          // Fade in 0-2s
          const fadeIn = interpolate(f, [0, 60], [0, 0.7], { extrapolateRight: "clamp" });
          // Duck during Huldah speech (frames 120-1380 ≈ 4s-46s)
          const duck = interpolate(f, [120, 180, 1380, 1440], [1, 0.15, 0.15, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          // Fade out at end
          const fadeOut = interpolate(f, [6500, 6720], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return fadeIn * duck * fadeOut;
        }}
      />

      {/* Huldah speech audio */}
      <Audio
        src={staticFile("audio/huldah-speech.mp3")}
        volume={(f) => {
          // Fade in after 4 seconds (frame 120)
          const fadeIn = interpolate(f, [120, 150], [0, 0.85], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          // Fade out near end of speech
          const fadeOut = interpolate(f, [1350, 1428], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return fadeIn * fadeOut;
        }}
        startFrom={0}
      />

      {/* Persistent dark vignette */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.8) 100%)`,
          zIndex: 50,
          pointerEvents: "none",
        }}
      />

      {/* Scene 1: Huldah Introduction (0-48s) */}
      <Sequence from={0} durationInFrames={1440}>
        <HuldahIntro />
      </Sequence>

      {/* Scene 2: Gad Freeze Frame (48s-207s) — stays behind carousel */}
      <Sequence from={1440} durationInFrames={4760}>
        <GadFreezeFrame />
      </Sequence>

      {/* Scene 3: Warrior Carousel overlay (52s-207s) — loops over freeze frame */}
      <Sequence from={1560} durationInFrames={4640}>
        <WarriorCarousel />
      </Sequence>

      {/* Scene 4: Final CTA (207s-224s) */}
      <Sequence from={6200} durationInFrames={520}>
        <CallToAction />
      </Sequence>
    </AbsoluteFill>
  );
};
