import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition, openBrowser } from "@remotion/renderer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compositionId = process.argv[2] || "promo";
const outputFile = process.argv[3] || "/mnt/documents/threshing-floor-promo-2min.mp4";

console.log(`Rendering composition: ${compositionId} → ${outputFile}`);
const bundled = await bundle({
  entryPoint: path.resolve(__dirname, "../src/index.ts"),
  webpackOverride: (config) => config,
});

console.log("Opening browser...");
const browser = await openBrowser("chrome", {
  browserExecutable: process.env.PUPPETEER_EXECUTABLE_PATH ?? "/bin/chromium",
  chromiumOptions: {
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  },
  chromeMode: "chrome-for-testing",
});

const composition = await selectComposition({
  serveUrl: bundled,
  id: compositionId,
  puppeteerInstance: browser,
});

console.log(`Duration: ${composition.durationInFrames} frames (${(composition.durationInFrames / composition.fps).toFixed(1)}s)`);

await renderMedia({
  composition,
  serveUrl: bundled,
  codec: "h264",
  outputLocation: outputFile,
  puppeteerInstance: browser,
  muted: false,
  concurrency: 1,
});

console.log(`✅ Done: ${outputFile}`);
await browser.close({ silent: false });
