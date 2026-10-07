import { defineConfig } from "astro/config";

// Static output with page.html URLs, like main.
export default defineConfig({
  site: "https://amader.cloud",
  build: { format: "file" },
  trailingSlash: "ignore",
  markdown: { smartypants: false },
});
