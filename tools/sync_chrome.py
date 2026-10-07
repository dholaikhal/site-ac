#!/usr/bin/env python3
"""Stamp partials/{header,footer}.html into every site/*.html page.

Pages mark the slots with <!-- chrome:header --><!-- /chrome:header --> and
<!-- chrome:footer --><!-- /chrome:footer -->. The site stays plain static HTML;
run this after editing a partial:  python3 tools/sync_chrome.py
"""
import pathlib, re

SITE = pathlib.Path(__file__).resolve().parent.parent / "site"
partials = {n: (SITE.parent / "partials" / f"{n}.html").read_text().strip() for n in ("header", "footer")}

for page in sorted(SITE.glob("*.html")):
    html = page.read_text()
    for name, body in partials.items():
        # Mark the current page in the nav.
        body = body.replace(f'href="{page.name}"', f'href="{page.name}" aria-current="page"', 1) if name == "header" else body
        html, n = re.subn(rf"<!-- chrome:{name} -->.*?<!-- /chrome:{name} -->",
                          f"<!-- chrome:{name} -->\n{body}\n<!-- /chrome:{name} -->", html, flags=re.S)
        if n != 1:
            print(f"skip {page.name}: {n} {name} slots")
    page.write_text(html)
    print(f"ok   {page.name}")
