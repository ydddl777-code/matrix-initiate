import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { HuldahIntro } from "./scenes/HuldahIntro";
import { TribalShowcase } from "./scenes/TribalShowcase";
import { GadFreezeFrame } from "./scenes/GadFreezeFrame";
import { ThreshingFloorEntry } from "./scenes/ThreshingFloorEntry";
import { PromoCTA } from "./scenes/PromoCTA";

// ~55 second promo: 1650 frames at 30fps
// Timeline:
//   0-120    (0-4s)     Huldah portrait reveal
//   120-840  (4-28s)    Huldah videos / warrior showcase
//   840-1140 (28-38s)   Gad freeze frame — "Enter the Threshing Floor"
//   1140-1380 (38-46s)  Threshing Floor ENTER screen
//   1380-1650 (46-55s)  Final CTA with prophetgadspeaks.com

export const PromoVideo = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#050505" }}>
      {/* Persistent vignette */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.8) 100%)`,
          zIndex: 50,
          pointerEvents: "none",
        }}
      />

      {/* Scene 1: Huldah Introduction (0-28s) */}
      <Sequence from={0} durationInFrames={840}>
        <HuldahIntro />
      </Sequence>

      {/* Scene 2: Gad Freeze Frame (28-38s) */}
      <Sequence from={840} durationInFrames={300}>
        <GadFreezeFrame />
      </Sequence>

      {/* Scene 3: Threshing Floor ENTER (38-46s) */}
      <Sequence from={1140} durationInFrames={240}>
        <ThreshingFloorEntry />
      </Sequence>

      {/* Scene 4: Final CTA — prophetgadspeaks.com (46-55s) */}
      <Sequence from={1380} durationInFrames={270}>
        <PromoCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
