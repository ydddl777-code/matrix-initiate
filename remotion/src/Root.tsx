import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";

// 60 seconds at 30fps = 1800 frames
export const RemotionRoot = () => (
  <Composition
    id="main"
    component={MainVideo}
    durationInFrames={1800}
    fps={30}
    width={1080}
    height={1920}
  />
);
