import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
import { FullLengthVideo } from "./FullLengthVideo";
import { PromoVideo } from "./PromoVideo";

// TikTok: 60 seconds at 30fps = 1800 frames (1080x1920 vertical)
// YouTube: ~224 seconds at 30fps = 6720 frames (1080x1920 vertical)
// Promo: 120 seconds at 30fps = 3600 frames (1080x1920 vertical)
export const RemotionRoot = () => (
  <>
    <Composition
      id="main"
      component={MainVideo}
      durationInFrames={1800}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="full"
      component={FullLengthVideo}
      durationInFrames={6720}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="promo"
      component={PromoVideo}
      durationInFrames={3600}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);
