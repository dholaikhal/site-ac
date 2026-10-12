import { defineConfig } from "astro/config";

// The example apps: one source in examples/, built once per app onto its own subdomain.
//   APP=goldweave npx astro build --config examples.config.mjs
// tools/build_examples.sh builds them all and adds each one's CNAME and robots.txt.
const app = process.env.APP;
if (!app) throw new Error("Set APP to an example's slug, e.g. APP=goldweave");

export default defineConfig({
  srcDir: "./examples",
  outDir: `./dist-examples/${app}`,
  publicDir: "./public", // shared logos; tools/build_examples.sh replaces the CNAME and robots.txt
  site: `https://${app}.amader.cloud`,
  build: { format: "file" },
});
