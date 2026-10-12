#!/usr/bin/env python3
"""Static map for the About page's "Come by" block, drawn from OpenStreetMap data.

  python3 tools/static_map.py LAT LON web/src/assets/maps/office.svg [--width 760] [--height 460] [--data saved.json]

Fetches roads, water and parks around the point from the Overpass API and draws them as a plain
SVG, centred on the point, with English street names (OSM's standard tiles label Dhaka in Bangla
script, which the site doesn't use). Every shape carries a class, so colours come from the page's
CSS and follow the light and dark themes. The data is (c) OpenStreetMap contributors (ODbL): keep
the credit next to the map. Re-run with the real office's coordinates when the mock address in
facts.json is replaced.
"""
import argparse, json, math, urllib.parse, urllib.request
from xml.sax.saxutils import escape

UA = "amader-cloud-site/1.0 (static map build; hello@amader.cloud)"
W, H = 560, 340  # drawing units; the SVG scales to its box

ROAD = {  # OSM highway class -> (css class, width)
    "trunk": ("major", 13), "primary": ("major", 12), "secondary": ("major", 11), "secondary_link": ("major", 7),
    "tertiary": ("minor", 7.5), "tertiary_link": ("minor", 5), "residential": ("street", 4.5),
    "unclassified": ("street", 4.5), "living_street": ("street", 4), "service": ("street", 3),
    "footway": ("path", 1.4), "pedestrian": ("path", 1.8),
}
LABELS = ["Road 11", "Kamal Ataturk Avenue", "New Airport Road", "Road 7", "Road 13"]


def fetch(q):
    """The main Overpass server first, then a mirror: either can be overloaded at times."""
    for url in ("https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter"):
        try:
            req = urllib.request.Request(url, data=urllib.parse.urlencode({"data": q}).encode(), headers={"User-Agent": UA})
            return json.load(urllib.request.urlopen(req, timeout=90))["elements"]
        except Exception as err:
            print(f"{url}: {err}")
    raise SystemExit("Overpass unavailable; try again later or pass --data")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("lat", type=float); ap.add_argument("lon", type=float); ap.add_argument("out")
    ap.add_argument("--width", type=float, default=760, help="metres across"); ap.add_argument("--height", type=float, default=460)
    ap.add_argument("--data", help="a saved Overpass JSON response to draw from instead of fetching")
    a = ap.parse_args()
    mx = 111320 * math.cos(math.radians(a.lat))  # metres per degree of longitude here
    my = 110760
    dlon, dlat = a.width / 2 / mx * 1.15, a.height / 2 / my * 1.15  # a margin so roads run off the edges
    bbox = f"{a.lat - dlat},{a.lon - dlon},{a.lat + dlat},{a.lon + dlon}"
    q = f"[out:json][timeout:60];(way[highway]({bbox});way[natural=water]({bbox});relation[natural=water]({bbox});way[leisure=park]({bbox}););out geom;"
    els = json.load(open(a.data))["elements"] if a.data else fetch(q)

    s = W / a.width  # drawing units per metre
    def pt(g): return (round(W / 2 + (g["lon"] - a.lon) * mx * s, 1), round(H / 2 - (g["lat"] - a.lat) * my * s, 1))
    def d(geom, close=False): return "M" + " L".join(f"{x} {y}" for x, y in map(pt, geom)) + (" Z" if close else "")

    water, parks, casings, fills, paths, defs, labels = [], [], [], [], [], [], []
    by_name = {}
    for e in els:
        t = e.get("tags", {})
        if t.get("natural") == "water":
            rings = [m["geometry"] for m in e.get("members", []) if m.get("role") == "outer" and "geometry" in m] if e["type"] == "relation" else [e["geometry"]]
            water += [f'<path class="m-water" d="{d(r, True)}"/>' for r in rings]
        elif t.get("leisure") == "park":
            parks.append(f'<path class="m-park" d="{d(e["geometry"], True)}"/>')
        elif t.get("highway") in ROAD:
            cls, w = ROAD[t["highway"]]
            p = d(e["geometry"])
            if cls == "path":
                paths.append(f'<path class="m-path" d="{p}" stroke-width="{w}"/>')
                continue
            casings.append(f'<path class="m-case m-{cls}" d="{p}" stroke-width="{w + 2}"/>')
            fills.append(f'<path class="m-road m-{cls}" d="{p}" stroke-width="{w}"/>')
            name = t.get("name:en") or t.get("name", "")
            for label in LABELS:
                if label in name:
                    geom = e["geometry"]
                    span = math.dist(pt(geom[0]), pt(geom[-1]))
                    if span > by_name.get(label, (0, None))[0]:
                        by_name[label] = (span, geom)
    for n, (label, (span, geom)) in enumerate(by_name.items()):
        pts = list(map(pt, geom))
        if pts[0][0] > pts[-1][0]:
            pts.reverse()  # left to right, so the text reads upright
        defs.append(f'<path id="m-l{n}" d="M' + " L".join(f"{x} {y}" for x, y in pts) + '"/>')
        labels.append(f'<text class="m-label"><textPath href="#m-l{n}" startOffset="50%" text-anchor="middle">{escape(label)}</textPath></text>')
    lake = next((t.get("name:en") or t.get("name") for e in els for t in [e.get("tags", {})] if t.get("natural") == "water" and (t.get("name:en") or "").isascii() and t.get("name:en")), None)

    svg = [f'<svg class="m-map" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Map of the area around the office">',
           f'<defs>{"".join(defs)}<clipPath id="m-clip"><rect width="{W}" height="{H}"/></clipPath></defs>',
           f'<g clip-path="url(#m-clip)"><rect class="m-land" width="{W}" height="{H}"/>',
           *parks, *water, *paths, *casings, *fills, *labels]
    if lake:
        svg.append(f'<text class="m-label m-water-label" x="{W - 12}" y="{H * 0.62:.0f}" text-anchor="end">{escape(lake)}</text>')
    svg.append("</g></svg>")
    open(a.out, "w").write("\n".join(svg) + "\n")
    print(a.out, len(els), "elements; labels:", ", ".join(by_name), "; lake:", lake)


main()
