import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

// Static output with page.html URLs, like main. Legal pages are MDX so their text is edited directly.
export default defineConfig({
  site: "https://amader.cloud",
  build: { format: "file" },
  trailingSlash: "ignore",
  markdown: { smartypants: false },
  integrations: [mdx()],
});
