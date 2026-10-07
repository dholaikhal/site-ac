import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// Static output, same URLs as before (devices.html, not /devices/), so existing links keep working.
export default defineConfig({
  site: "https://amader.cloud",
  build: { format: "file" },
  trailingSlash: "ignore",
  markdown: { smartypants: false },
  integrations: [mdx(), sitemap({ filter: (page) => !page.endsWith("/404") && !page.endsWith("404.html") })],
});
