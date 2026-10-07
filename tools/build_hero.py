#!/usr/bin/env python3
"""Generate the hero scene slideshow in site/index.html from the data below.

Each scene is a photo plus nodes placed on things the photo really shows: lit flat windows, ground-floor shops,
rooftop masts, a water tank. Coordinates are in the photo's own pixels (the 2400px-wide master).
Run after editing:  python3 tools/build_hero.py
"""
import pathlib, re
from PIL import Image
PHOTOS = pathlib.Path(__file__).resolve().parent.parent / "site" / "assets" / "img" / "photos"

SCENES = [
    {
        "id": "rooftops", "label": "Homes and rooftops", "photo": "rooftops", "w": 2400, "h": 1601,
        "fit": "cover", "pos": "50% 100%", "par": "xMidYMax slice",
        "alt": "Apartment rooftops in Bibir Bagicha, Dhaka, at dusk, with a few windows lit.",
        "credit": ("Bibir Bagicha, Dhaka. Photo: Ahmed Hasan", "https://unsplash.com/photos/ioA9B-RAFHE"),
        "nodes": {
            "a": (902, 1112, "TV box", "Family photo cloud"),
            "b": (888, 1370, "Old phone", "Stairwell camera"),
            "c": (495, 1265, "Laptop", "Rents out its idle computing"),
            "d": (1175, 1205, "Desktop PC", "Rents out spare storage"),
            "e": (1363, 1144, "TV box", "Private cloud for a family"),
            "f": (1488, 1060, "Wi‑Fi router", "Rooftop Wi‑Fi"),
            "g": (1525, 1330, "Old phone", "Watches the tank gauge, warns the building before it runs dry"),
            "h": (1765, 975, "Old Wi‑Fi router", "Rooftop link to the next building, for backups only"),
            "i": (1638, 1193, "Tablet", "Family calendar on the wall"),
            "j": (1995, 1230, "Laptop", "Building server"),
            "k": (2000, 1420, "Desktop PC", "Camera recorder"),
            "l": (2260, 1330, "Laptop", "Rents out its idle computing"),
            "m": (1476, 1385, "TV box", "Offline library for the kids"),
            "n": (915, 1025, "Next building over", "Holds an encrypted copy of your backups", "far"),
        },
        "links": "a-b a-c c-b a-d d-e e-f e-m m-g d-m i-f i-j j-k j-l k-l".split(),
        "radio": [],
        "far": ["n-a", "n-f", "f-h", "h-g"],
        "rings": None,
    },
    {
        "id": "street", "label": "Shops and street level", "photo": "street", "w": 2400, "h": 3200,
        "fit": "right", "pos": "0% 100%", "par": "xMinYMax slice",
        "alt": "A Dhaka street on a rainy night: a lit shoe shop, a shuttered shop, a pharmacy sign and flats above.",
        "credit": ("Dhaka. Photo: MD Shaha Riaz Rimon (Pexels)", "https://www.pexels.com/photo/rainy-night-street-scene-in-dhaka-bangladesh-36922835/"),
        "nodes": {
            "s1": (700, 1500, "Old phone", "Counter camera for the shop"),
            "s2": (880, 1560, "Tablet", "Price and offer screen"),
            "s3": (1200, 1560, "Old phone", "Night camera on a closed shutter"),
            "s4": (1530, 1470, "Laptop", "Pharmacy's nightly backup"),
            "s5": (1850, 1470, "Wi‑Fi router", "Guard-room Wi‑Fi at the gate"),
            "s6": (1650, 720, "TV box", "Family photo cloud upstairs"),
            "s7": (1300, 930, "Laptop", "Rents out its idle computing"),
            "s8": (1350, 560, "Desktop PC", "Rents out spare storage"),
        },
        "links": "s1-s2 s2-s3 s3-s4 s4-s5 s3-s7 s7-s6 s6-s8 s7-s8 s4-s6 s5-s6".split(),
        "radio": [], "far": [], "rings": None,
    },
    {
        "id": "neighbourhood", "label": "Across the neighbourhood", "photo": "sunset", "w": 2400, "h": 1861,
        "fit": "cover", "pos": "50% 100%", "par": "xMidYMax slice",
        "alt": "Dhaka rooftops at sunset, with houses, water tanks and a distant telecom tower.",
        "credit": ("Dhaka. Photo: Hasnan Monir", "https://unsplash.com/photos/7JRlvjYK0m0"),
        "nodes": {
            "u1": (1960, 1480, "Old laptop", "This building's backup server, holding copies for three neighbours"),
            "u2": (300, 1430, "Old phone", "Rooftop weather station (its barometer still works)"),
            "u3": (2150, 1330, "Laptop", "Rents out its idle computing"),
            "u4": (1150, 1420, "TV box", "Holds an encrypted copy of the next building's backups"),
            "u5": (700, 1560, "Desktop PC", "Backup copies for three buildings"),
            "u6": (1900, 1095, "Building across the road", "Joins the same network", "far"),
            "u8": (2280, 1700, "TV box", "Family photo cloud"),
        },
        "links": "u1-u3 u3-u8 u5-u2 u5-u4 u4-u1".split(),
        "radio": [],
        "far": ["u1-u2", "u1-u6", "u6-u3"],
        "rings": None,
    },
]


SCENES += [
    {
        "id": "bazar", "label": "Bazar", "photo": "bazar", "w": 2400, "h": 3200,
        "fit": "right", "pos": "50% 100%", "par": "xMidYMax slice",
        "alt": "A crowded Dhaka market street under tangled cables, with a mosque minaret at the end.",
        "credit": ("Dhaka. Photo: Ferdous Hasan (Pexels)", "https://www.pexels.com/photo/bustling-dhaka-street-market-with-mosque-in-view-36525029/"),
        "nodes": {
            "b1": (1290, 1180, "TV box + old TV", "The bazar's notice board: closing days, lost and found, local ads"),
            "b2": (1640, 2340, "Tablet", "Today's prices board for the bazar committee"),
            "b3": (1080, 2900, "Old laptop", "The bazar committee's shared accounts"),
            "b4": (2280, 1300, "Desktop PC", "Wholesaler's accounts, backed up nightly"),
            "b5": (2240, 2000, "Old phone", "Shop counter camera"),
            "b6": (350, 2400, "Old phone", "bKash QR and the day's sales tally"),
            "b7": (300, 520, "Laptop", "Rents out its idle computing"),
        },
        "links": "b6-b3 b3-b2 b2-b5 b5-b4".split(),
        "radio": [], "far": ["b1-b2", "b1-b7", "b7-b6"], "rings": None,
    },
    {
        "id": "teastall", "label": "Tea stall", "photo": "teastall", "w": 2400, "h": 3175,
        "fit": "right", "pos": "50% 100%", "par": "xMidYMax slice",
        "alt": "A roadside tea stall in Dhaka: a blue wall painted with a kettle and the words 'swadhin desher cha', and a row of plastic chairs.",
        "credit": ("Dhaka. Photo: Ahnaf Abror (Pexels)", "https://www.pexels.com/photo/lonely-man-at-a-dhaka-tea-stall-33006139/"),
        "nodes": {
            "t1": (1650, 1350, "Old tablet", "bKash and Nagad QR, plus the day's tally"),
            "t2": (1050, 1060, "Old phone", "Night camera over the stall and chairs"),
            "t3": (1250, 760, "Old TV + TV box", "The para's notice board: lost and found, events, local ads, instead of posters"),
            "t4": (180, 720, "Laptop", "The coaching centre's attendance and results"),
        },
        "links": "t1-t2 t2-t3 t3-t4".split(),
        "radio": [], "far": [], "rings": None,
    },
    {
        "id": "monsoon", "label": "Monsoon", "photo": "monsoon", "w": 2400, "h": 1600,
        "fit": "cover", "pos": "50% 100%", "par": "xMidYMax slice",
        "alt": "A waterlogged residential lane in Dhaka during the monsoon, with rickshaws wading through and shop shutters down.",
        "credit": ("Dhaka. Photo: Faisal Ibne Kalam (Pexels)", "https://www.pexels.com/photo/urban-flooding-in-a-residential-area-38551008/"),
        "nodes": {
            "m1": (2160, 1180, "Water-level sensor", "Alerts the lane as water rises (the one new part)"),
            "m2": (330, 1140, "Old phone", "Live view of the lane for every resident"),
            "m3": (1640, 440, "Old phone", "Posts 'current gone' and 'current back' to the building's WhatsApp"),
            "m4": (1700, 520, "TV box", "Family photo cloud, safe upstairs"),
            "m5": (1820, 880, "Old phone", "Night camera on a shut shop"),
            "m6": (1440, 860, "Old phone", "Building gate camera"),
        },
        "links": "m3-m4 m4-m6 m3-m5 m5-m6 m6-m1".split(),
        "radio": [], "far": ["m2-m6"], "rings": None,
    },
    {
        "id": "towers", "label": "The building together", "photo": "towers", "w": 2400, "h": 1600,
        "fit": "cover", "pos": "50% 100%", "par": "xMidYMax slice",
        "alt": "Rajuk Uttara apartment towers in Dhaka, with hundreds of flat windows.",
        "credit": ("Uttara, Dhaka. Photo: Robiul Islam Pailot (Pexels)", "https://www.pexels.com/photo/apartment-buildings-in-the-residential-district-of-dhaka-built-as-part-of-the-rajuk-uttara-apartment-project-18340726/"),
        "nodes": {
            "f1": (1360, 560, "Flat 9C", "Its photos, encrypted and split into pieces"),
            "f2": (1520, 880, "Flat 6B", "Holds one piece. It can't read it"),
            "f3": (1840, 700, "Next tower, 8A", "Holds one piece"),
            "f4": (2250, 520, "Tower 3, 10D", "Holds one piece"),
            "f5": (1040, 1180, "Flat 3A", "Holds one piece"),
            "f6": (1170, 1180, "Old monitors", "Lift-lobby screen: notices and local ads, so the walls stay clean"),
            "f7": (1950, 1150, "Old laptop", "Building server: committee records, and a map of who holds which piece"),
            "f8": (2300, 1000, "Desktop PC", "Rents out idle computing for the service-charge fund"),
            "f9": (600, 1250, "Two old laptops", "Homework corner in the common room"),
        },
        "links": "f6-f7 f7-f8 f7-f9 f7-f1".split(),
        "radio": [], "far": ["f1-f2", "f1-f3", "f1-f4", "f1-f5"], "rings": None,
    },
    {
        "id": "office", "label": "Offices", "photo": "office", "w": 2400, "h": 1600,
        "fit": "cover", "pos": "50% 100%", "par": "xMidYMax slice",
        "alt": "An office building in Dhaka at night, with several floors lit.",
        "credit": ("Dhaka. Photo: Adnan Fahim (Pexels)", "https://www.pexels.com/photo/view-of-apartments-in-a-glass-building-15535141/"),
        "nodes": {
            "o1": (1650, 760, "200 retired laptops", "Wiped with a certificate each, then sent to school labs"),
            "o2": (1900, 760, "Old monitors", "Meeting-room and reception screens"),
            "o3": (1600, 1080, "Office desktops", "Rent out idle computing overnight"),
            "o4": (1900, 1080, "Old desktop", "File server and nightly backups"),
            "o5": (1530, 450, "Old laptop", "Holds backup copies for the branch office"),
            "o6": (1150, 940, "Old phones", "Cameras for the server room and stairs"),
            "o7": (1150, 1250, "Old tablet", "Visitor log at reception"),
        },
        "links": "o1-o2 o2-o4 o4-o3 o3-o1 o6-o3 o7-o6".split(),
        "radio": [], "far": ["o5-o4"], "rings": None,
    },
]
ORDER = ["rooftops", "office", "towers", "street", "bazar", "teastall", "monsoon", "neighbourhood"]
SCENES = sorted(SCENES, key=lambda s: ORDER.index(s["id"]))
for s in SCENES:
    s["label"] = {"street": "Shops at night", "neighbourhood": "Neighbourhood"}.get(s["id"], s["label"])

HEAD_SCENES = [
    {
        "id": "skyline", "label": "Public services", "photo": "skyline", "w": 2400, "h": 1600,
        "fit": "cover", "pos": "50% 100%", "par": "xMidYMax slice",
        "alt": "Dhaka's skyline of apartment and office towers under monsoon clouds.",
        "credit": ("Dhaka. Photo: Al Amin Mir (Unsplash)", "https://unsplash.com/photos/jkW9ES-w79Q"),
        "nodes": {
            "g1": (820, 1300, "Upazila office", "A records server sized to real use, not to the brochure"),
            "g2": (1300, 1250, "Public school", "A computer lab from retired laptops"),
            "g3": (1700, 1350, "Public hospital", "Queue and notice screens from old monitors"),
            "g4": (2150, 1300, "City corporation", "Notice screens at service points"),
            "g5": (480, 1400, "Union digital centre", "Reconditioned desktops, each with a wipe certificate"),
            "g6": (1500, 1450, "Agency storeroom", "Retired devices wiped, passported and reused"),
        },
        "links": "g5-g1 g1-g2 g2-g6 g6-g3 g3-g4".split(),
        "radio": [], "far": [], "rings": None,
    },
]
PAGE_HEADS = {"companies.html": "office", "hosts.html": "towers", "investors.html": "neighbourhood",
              "about.html": "teastall", "contact.html": "street", "government.html": "skyline"}


def head_html(s):
    p = f'assets/img/photos/{s["photo"]}'
    srcset = f'{p}-1200.jpg 1200w, {p}.jpg {Image.open(PHOTOS / (s["photo"] + ".jpg")).width}w'
    img = f'<img src="{p}.jpg" srcset="{srcset}" sizes="100vw" alt="{s["alt"]}" style="object-position:{s["pos"]}">'
    bg = f'<img class="scene-bg" src="{p}-1200.jpg" alt="" aria-hidden="true">' if s["fit"] == "right" else ""
    return (f'<figure class="scene live head-scene" data-fit="{s["fit"]}">{bg}<div class="frame" style="--ar:{s["w"]}/{s["h"]}">{img}\n{scene_svg(s)}</div>'
            f'<figcaption class="mono"><a href="{s["credit"][1]}" rel="noopener">{s["credit"][0]}</a></figcaption></figure>\n<div class="node-tip" role="status" hidden></div>')


def scene_svg(s):
    n = s["nodes"]
    out = [f'<svg class="mesh" viewBox="0 0 {s["w"]} {s["h"]}" preserveAspectRatio="{s["par"]}" role="group" aria-label="{s["label"]}: old devices and their second jobs. Select a light to read it.">']
    if s["rings"]:
        x, y = n[s["rings"]][:2]
        out.append('<g class="rings">' + "".join(f'<circle cx="{x}" cy="{y}" r="{r}" style="animation-delay:{1.6 + i * .5}s"/>' for i, r in enumerate((90, 170, 250))) + "</g>")
    out.append('<g class="links">')
    delay = 0.5
    for kind, pairs in (("", s["links"]), (" radio", s["radio"]), (" far", s["far"])):
        for p in pairs:
            a, b = p.split("-")
            (x1, y1), (x2, y2) = n[a][:2], n[b][:2]
            out.append(f'<path class="link{kind}" pathLength="1" style="animation-delay:{delay:.2f}s" d="M{x1} {y1} L{x2} {y2}"/>')
            delay += 0.09
    out.append("</g>")
    # one packet travelling along the main chain of links
    chain = [n[k][:2] for k in dict.fromkeys(sum((p.split("-") for p in s["links"]), []))][:7]
    if len(chain) > 2:
        d = "M" + " L".join(f"{x} {y}" for x, y in chain)
        out.append(f'<g class="packets"><circle class="packet" r="7"><animateMotion dur="4s" begin="2s" repeatCount="indefinite" path="{d}"/></circle></g>')
    out.append('<g class="nodes">')
    for i, (k, v) in enumerate(n.items()):
        x, y, frm, to = v[:4]
        far = len(v) > 4
        r_halo, r_core = (16, 6) if far else (22, 8)
        out.append(f'<g class="node" tabindex="0" role="button" data-from="{frm}" data-to="{to}"><circle class="hit" cx="{x}" cy="{y}" r="44"/>'
                   f'<circle class="halo" cx="{x}" cy="{y}" r="{r_halo}" style="animation-delay:{.4 + i * .12:.2f}s,{1 + (i % 5) * .2:.1f}s"/>'
                   f'<circle class="core" cx="{x}" cy="{y}" r="{r_core}" style="animation-delay:{.4 + i * .12:.2f}s"/></g>')
    out.append("</g></svg>")
    return "\n".join(out)


def scene_html(s, i):
    p = f'assets/img/photos/{s["photo"]}'
    srcset = f'{p}-1200.jpg 1200w, {p}.jpg {Image.open(PHOTOS / (s["photo"] + ".jpg")).width}w'
    img = (f'<img src="{p}.jpg" srcset="{srcset}" sizes="100vw" alt="{s["alt"]}" style="object-position:{s["pos"]}"'
           + (' fetchpriority="high"' if i == 0 else ' loading="lazy"') + ">")
    bg = f'<img class="scene-bg" src="{p}-1200.jpg" alt="" aria-hidden="true" loading="lazy">' if s["fit"] == "right" else ""
    frame = f'<div class="frame" style="--ar:{s["w"]}/{s["h"]}">{img}\n{scene_svg(s)}</div>'
    active = " live" if i == 0 else ""
    hidden = "" if i == 0 else " inert"
    return (f'<figure class="scene{active}" data-fit="{s["fit"]}" id="scene-{s["id"]}" aria-label="{s["label"]}"{hidden}>{bg}{frame}'
            f'<figcaption class="mono"><a href="{s["credit"][1]}" rel="noopener">{s["credit"][0]}</a></figcaption></figure>')


def build():
    tabs = "".join(f'<button type="button" role="tab" aria-selected="{"true" if i == 0 else "false"}" aria-controls="scene-{s["id"]}" data-i="{i}"><span>{s["label"]}</span><i></i></button>'
                   for i, s in enumerate(SCENES))
    return ('<div class="scenes">\n' + "\n".join(scene_html(s, i) for i, s in enumerate(SCENES)) + '\n</div>\n'
            f'<div class="wrap hero-foot"><div class="scene-tabs mono" role="tablist" aria-label="Scenes">{tabs}</div>'
            '<button type="button" class="scene-pause mono" aria-pressed="false">Pause</button></div>')


if __name__ == "__main__":
    page = pathlib.Path(__file__).resolve().parent.parent / "site" / "index.html"
    html = page.read_text()
    html, n = re.subn(r"<!-- hero:scenes -->.*?<!-- /hero:scenes -->", "<!-- hero:scenes -->\n" + build() + "\n<!-- /hero:scenes -->", html, flags=re.S)
    assert n == 1, "hero:scenes markers not found"
    page.write_text(html)
    print("hero rebuilt:", ", ".join(s["id"] for s in SCENES))
    by_id = {x["id"]: x for x in SCENES + HEAD_SCENES}
    for name, sid in PAGE_HEADS.items():
        f = page.parent / name
        t = f.read_text()
        t, k = re.subn(r"<!-- head:scene -->.*?<!-- /head:scene -->", lambda _m: "<!-- head:scene -->\n" + head_html(by_id[sid]) + "\n<!-- /head:scene -->", t, flags=re.S)
        if k:
            f.write_text(t); print("page head:", name, "->", sid)
