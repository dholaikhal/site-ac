import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Static output, same URLs as before (devices.html, not /devices/), so existing links keep working.
export default defineConfig({
  site: "https://amader.cloud",
  build: { format: "file" },
  trailingSlash: "ignore",
  integrations: [sitemap({ filter: (page) => !page.endsWith("/404") && !page.endsWith("404.html") })],
});
