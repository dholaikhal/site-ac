#!/bin/sh
# Builds every example app into web/dist-examples/<slug>/, ready to publish on <slug>.amader.cloud.
# Each gets its own CNAME, a robots.txt that keeps it out of search (the businesses are invented),
# and none of the main site's own files.
set -e
cd "$(dirname "$0")/../web"
APPS="${*:-goldweave shorshekitchen glowroom carepoint}"
for app in $APPS; do
  APP=$app npx astro build --config examples.config.mjs --silent
  out="dist-examples/$app"
  rm -f "$out/assets/og.jpg" "$out/assets/favicon.svg"
  printf '%s.amader.cloud\n' "$app" > "$out/CNAME"
  printf 'User-agent: *\nDisallow: /\n' > "$out/robots.txt"
  echo "built $out"
done
