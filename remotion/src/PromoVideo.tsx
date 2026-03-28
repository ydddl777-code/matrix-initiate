import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { HuldahIntro } from "./scenes/HuldahIntro";
import { GadFreezeFrame } from "./scenes/GadFreezeFrame";
import { TribalShowcase } from "./scenes/TribalShowcase";
import { GadReveal } from "./scenes/GadReveal";
import { WarriorCarousel } from "./scenes/WarriorCarousel";
import { PromoCTA } from "./scenes/PromoCTA";

// 2-minute promo: 120s = 3600 frames at 30fps
// Timeline:
//   0-1440  (0-48s)    Huldah intro with speech + subtitles
//   1440-1900 (48-63s) Gad freeze frame — "Enter the Threshing Floor"
//   1900-2620 (63-87s) Tribal showcase — 6 tribes × 4s each
//   2620-3220 (87-107s) Gad reveal — 4 images of Gad rotating
//   3220-3270 (107-109s) gap/transition
//   3270-3600 (109-120s) Final CTA with prophetgadspeaks.com

export const PromoVideo = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#050505" }}>
      {/* Background music — Warning in the Dark */}
      <Audio
        src={staticFile("audio/warning-in-the-dark.mp3")}
        volume={(f) => {
          const fadeIn = interpolate(f, [0, 60], [0, 0.7], { extrapolateRight: "clamp" });
          // Duck during Huldah speech (frames 120-1380)
          const duck = interpolate(f, [120, 180, 1380, 1440], [1, 0.15, 0.15, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const fadeOut = interpolate(f, [3400, 3600], [1, 0], {
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
          const fadeIn = interpolate(f, [120, 150], [0, 0.85], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const fadeOut = interpolate(f, [1350, 1428], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return fadeIn * fadeOut;
        }}
      />

      {/* Persistent vignette */}
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

      {/* Scene 2: Gad Freeze Frame (48-63s) */}
      <Sequence from={1440} durationInFrames={460}>
        <GadFreezeFrame />
      </Sequence>

      {/* Scene 3: Tribal Showcase (63-87s) — 6 tribes */}
      <Sequence from={1900} durationInFrames={720}>
        <TribalShowcase />
      </Sequence>

      {/* Scene 4: Gad Reveal — rotating portraits (87-107s) */}
      <Sequence from={2620} durationInFrames={600}>
        <GadReveal />
      </Sequence>

      {/* Scene 5: Final CTA (107-120s) */}
      <Sequence from={3220} durationInFrames={380}>
        <PromoCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
