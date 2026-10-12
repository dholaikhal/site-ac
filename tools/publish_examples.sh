#!/bin/sh
# Publishes each built example app to its own GitHub Pages repository, one per subdomain
# (GitHub Pages serves one custom domain per repository).
#
# Once, per app:
#   1. Create an empty repository  github.com/$OWNER/example-<slug>  (public; Pages on free plans needs public).
#   2. At the DNS host (Porkbun), add:  CNAME  <slug>  ->  $OWNER.github.io
#   3. After the first publish: repository Settings > Pages > Deploy from branch "main", folder "/",
#      and tick Enforce HTTPS once the certificate is issued.
# Then:  tools/build_examples.sh && tools/publish_examples.sh
# Finally set LIVE = true in web/examples/data.ts so the main site links to them.
set -e
OWNER="${OWNER:-dholaikhal}"
cd "$(dirname "$0")/../web/dist-examples"
for dir in */; do
  case "$dir" in .publish-*) continue ;; esac
  app="${dir%/}"
  # Inside the project, not the system temp dir, so the project's git identity and SSH key apply.
  tmp="$(mktemp -d "$PWD/.publish-$app.XXXX")"
  cp -R "$app/." "$tmp/"
  touch "$tmp/.nojekyll"
  git -C "$tmp" init -q -b main
  git -C "$tmp" add -A
  git -C "$tmp" -c user.name="$(git config user.name)" -c user.email="$(git config user.email)" commit -q -m "Publish $app.amader.cloud"
  git -C "$tmp" push -q --force "git@github.com:$OWNER/example-$app.git" main
  rm -rf "$tmp"
  echo "published $app -> github.com/$OWNER/example-$app"
done
