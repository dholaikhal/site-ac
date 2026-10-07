#!/usr/bin/env python3
"""Generate the Facebook media packet as HTML sources in marketing/facebook/cards/.

  python3 marketing/facebook/build.py
  python3 marketing/render.py facebook/cards facebook/contact-sheet.html

Edit the data below, not the generated HTML. Meshes and the logo mark are stamped in by render.py.
Copy for each post lives in posts.md; asset ids here match the "Image" column there.
"""
import html, pathlib, sys

F = pathlib.Path(__file__).resolve().parent
OUT = F / "cards"
sys.path.insert(0, str(F.parent.parent / "tools"))
from build_hero import SCENES  # noqa: E402

SCENE = {s["id"]: s for s in SCENES}
PHOTOS = "../../../site/assets/img/photos"
MARK = "<!--mark--><!--/mark-->"
BRAND = f'<span class="brand">{MARK}<span>amader<span class="tld">.cloud</span></span></span>'
e = html.escape

# ---- device drawings, each in a 360x300 box: chalk outline, blueprint detail, one amber "alive" mark ----
DEV = {
    "phone": '<rect class="ln" x="112" y="14" width="136" height="272" rx="20"/><rect class="th" x="124" y="44" width="112" height="206"/>'
             '<path class="th" d="M166 30h28M160 268h40"/><circle class="amb" cx="210" cy="30" r="5"/>'
             '<path class="dim" d="M80 14v272M74 14h12M74 286h12"/><text class="an" x="20" y="156">146</text>',
    "tvbox": '<rect class="ln" x="30" y="120" width="300" height="74" rx="14"/><path class="th" d="M34 172h292M60 194v10h28v-10M272 194v10h28v-10"/>'
             '<circle class="amb" cx="292" cy="146" r="6"/><path class="arc" d="M318 104a20 20 0 0 1 18 18M318 82a42 42 0 0 1 40 40"/>'
             '<path class="dim" d="M30 96h300M30 90v12M330 90v12"/><text class="an" x="150" y="84">110 mm</text>',
    "laptop": '<rect class="ln" x="66" y="30" width="228" height="160" rx="8"/><rect class="th" x="80" y="44" width="200" height="132"/>'
              '<path class="ln" d="M36 200h288l-18 26H54z"/><path class="th" d="M150 212h60"/><circle class="amb" cx="180" cy="37" r="4"/>'
              '<path class="dim" d="M36 254h288M36 248v12M324 248v12"/><text class="an" x="150" y="284">14 in</text>',
    "tablet": '<rect class="ln" x="34" y="50" width="292" height="200" rx="16"/><rect class="th" x="52" y="66" width="256" height="168"/>'
              '<path class="th" d="M72 92h120M72 116h200M72 140h170M72 164h190M72 188h90"/><rect class="amb-f" x="72" y="84" width="60" height="10"/>'
              '<path class="dim" d="M34 24h292M34 18v12M326 18v12"/>',
    "router": '<rect class="ln" x="40" y="170" width="280" height="62" rx="10"/><path class="ln" d="M76 170L60 60M180 170V48M284 170l16-110"/>'
              '<path class="th" d="M66 206h6M86 206h6M106 206h6M126 206h6"/><circle class="amb" cx="292" cy="201" r="6"/>'
              '<path class="arc" d="M196 36a24 24 0 0 1 20 22M196 12a48 48 0 0 1 42 46"/><path class="dim" d="M40 262h280M40 256v12M320 256v12"/>',
    "monitor": '<rect class="ln" x="30" y="24" width="300" height="190" rx="6"/><rect class="th" x="44" y="38" width="272" height="162"/>'
               '<path class="ln" d="M160 214v34M200 214v34M118 256h124"/><rect class="amb-f" x="62" y="56" width="110" height="12"/>'
               '<path class="th" d="M62 84h200M62 104h160M62 124h180"/><rect class="th" x="200" y="140" width="98" height="46"/>'
               '<path class="dim" d="M340 24v190M334 24h12M334 214h12"/>',
    "desktop": '<rect class="ln" x="196" y="20" width="120" height="250" rx="8"/><path class="th" d="M212 52h88M212 74h88M212 96h88M236 230h40"/>'
               '<circle class="amb" cx="256" cy="130" r="7"/><rect class="ln" x="34" y="60" width="140" height="104" rx="5"/>'
               '<path class="ln" d="M96 164v26M70 194h52"/><path class="dim" d="M336 20v250M330 20h12M330 270h12"/>',
}


def recipe_art(dev, job, notes):
    lines = "".join(f'<text class="an" x="472" y="{146 + i * 42}">· {e(n)}</text>' for i, n in enumerate(notes))
    return (f'<svg class="art" viewBox="0 0 936 440" aria-hidden="true"><g transform="translate(0 70)">{DEV[dev]}</g>'
            f'<path class="wire" d="M372 220H440"/><path class="wire" d="M426 206l16 14-16 14"/>'
            f'<rect class="job" x="452" y="60" width="482" height="{106 + 42 * len(notes)}" rx="4"/>'
            f'<text class="jt" x="472" y="104">{e(job)}</text>{lines}</svg>')


# ---- templates ----
def ext(a):
    """Photo cards go out as JPEG (a PNG is ~2 MB and Facebook recompresses anyway); flat blueprint cards as PNG."""
    return "jpg" if a["kind"] in ("photo", "guide") else "png"


def page(title, w, h, body, fmt="png"):
    return (f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="render" content="{fmt}"><title>{e(title)}</title>'
            f'<link rel="stylesheet" href="../../print/print.css"><link rel="stylesheet" href="../fb.css">'
            f'<style>body{{width:{w}px;height:{h}px}}.card{{width:{w}px;height:{h}px}}</style></head><body class="sz-{w}x{h}">{body}</body></html>')


def mesh(scene_id, w, h):
    s = SCENE[scene_id]
    scale = max(w / s["w"], h / s["h"])
    key = f"mesh:{scene_id}@2" if scale < .6 else f"mesh:{scene_id}"
    return f'<svg viewBox="0 0 {s["w"]} {s["h"]}" preserveAspectRatio="{s["par"]}"><!--{key}--><!--/{key}--></svg>'


def photo(a):
    w, h = a["size"]; s = SCENE[a["scene"]]
    bn = f'<p class="bn" lang="bn">{a["bn"]}</p>' if a.get("bn") else ""
    sub = f'<p class="sub">{e(a["sub"])}</p>' if a.get("sub") else ""
    kick = f'<p class="kick mono">{e(a["kick"])}</p>' if a.get("kick") else ""
    credit = s["credit"][0].replace("Photo:", "Photo:")
    cred = credit + (" / Unsplash" if "unsplash" in s["credit"][1] else "")
    cred = cred.replace(" (Pexels)", " / Pexels")
    body = (f'<section class="photo grade card p {a.get("cls", "")}"><img src="{PHOTOS}/{s["photo"]}.jpg" alt="" style="object-position:{s["pos"]}">'
            f'{mesh(a["scene"], w, h)}{BRAND}<div class="txt">{kick}<h1>{e(a["h1"])}</h1>{bn}{sub}</div>'
            f'<div class="foot mono"><span>{e(a.get("cta", "amader.cloud"))}</span><span>{e(cred)}</span></div></section>')
    return body


def recipe(a):
    cells = "".join(f'<div><span class="k">{e(k)}</span><span>{e(v)}</span></div>' for k, v in a["block"])
    return (f'<section class="blueprint card r"><div class="top">{BRAND}<span class="mono no">{e(a["no"])}</span></div>'
            f'<p class="kick mono">{e(a["kick"])}</p><h1>{e(a["h1"])}</h1><p class="sub">{e(a["sub"])}</p>'
            f'{recipe_art(a["dev"], a["job"], a["notes"])}<div class="tb mono">{cells}</div></section>')


def fact(a):
    return (f'<section class="blueprint card f"><div class="top">{BRAND}<span class="mono no">{e(a["kick"])}</span></div>'
            f'<div class="fig{" long" if len(a["fig"]) > 5 else ""}">{e(a["fig"])}</div><h1>{e(a["h1"])}</h1><p class="sub">{e(a["sub"])}</p>'
            f'<div class="do"><span class="mono k">what to do</span><p>{e(a["do"])}</p></div>'
            f'<div class="foot mono"><span>Source: {e(a["src"])}</span><span>amader.cloud</span></div></section>')


def checklist(a):
    items = "".join(f'<li><span class="box"></span><span>{e(t)}</span></li>' for t in a["items"])
    return (f'<section class="blueprint card c"><div class="top">{BRAND}<span class="mono no">{e(a["kick"])}</span></div>'
            f'<h1>{e(a["h1"])}</h1><p class="sub">{e(a["sub"])}</p><ol>{items}</ol>'
            f'<p class="then">{e(a["then"])}</p><div class="foot mono"><span>{e(a["src"])}</span><span>amader.cloud</span></div></section>')


def steps(a):
    li = "".join(f'<li><span class="n mono">0{i + 1}</span><span>{e(t)}</span></li>' for i, t in enumerate(a["steps"]))
    bn = f'<p class="bn" lang="bn">{a["bn"]}</p>' if a.get("bn") else ""
    theme = "paper" if a.get("light") else "blueprint"
    return (f'<section class="{theme} card s"><div class="top">{BRAND}<span class="mono no">{e(a["kick"])}</span></div>'
            f'<h1>{e(a["h1"])}</h1>{bn}<p class="sub">{e(a["sub"])}</p><ol>{li}</ol>'
            f'<div class="btn">{e(a["button"])}</div><div class="foot mono"><span>{e(a["foot"])}</span></div></section>')


DRAWER = ('<svg class="art" viewBox="0 0 936 470" aria-hidden="true">'
          '<path class="ln" d="M60 150h560v260H60z"/><path class="th" d="M60 150l60-70h440l60 70M300 280h80"/>'
          '<g transform="translate(90 160) scale(.55)">' + DEV["tvbox"] + '</g>'
          '<g transform="translate(300 150) scale(.45) rotate(18 180 150)">' + DEV["phone"] + '</g>'
          '<g transform="translate(420 200) scale(.5)">' + DEV["router"] + '</g>'
          '<path class="th" d="M120 330c40-30 80 30 120 0s80 30 120 0" />'
          '<text class="an" x="660" y="190">tv boxes ____</text><text class="an" x="660" y="236">old phones ____</text>'
          '<text class="an" x="660" y="282">laptops ____</text><text class="an" x="660" y="328">routers ____</text>'
          '<text class="an" x="660" y="374">tablets ____</text><text class="an" x="660" y="420">monitors ____</text></svg>')


def drawer(a):
    return (f'<section class="blueprint card r d"><div class="top">{BRAND}<span class="mono no">{e(a["kick"])}</span></div>'
            f'<h1>{e(a["h1"])}</h1><p class="bn" lang="bn">{a["bn"]}</p><p class="sub">{e(a["sub"])}</p>{DRAWER}'
            f'<div class="foot mono"><span>{e(a["foot"])}</span></div></section>')


def profile(a):
    return ('<section class="blueprint card pf"><svg viewBox="-2 -3 48 42" aria-hidden="true">'
            '<path d="M7 31 L5 34 M28 31 L30 34" stroke="#e4edf5" stroke-width="2.4" stroke-linecap="round"/>'
            '<rect x="1" y="15" width="33" height="16" rx="4.5" fill="#e4edf5"/><circle cx="26.5" cy="23" r="2.6" fill="#ffb547"/>'
            '<path d="M33 9.5 a6 6 0 0 1 5 5.5 M33 3.5 a12 12 0 0 1 10.5 11.5" fill="none" stroke="#ffb547" stroke-width="2.4" stroke-linecap="round"/></svg>'
            '</section>')


def guide(a):
    """The cover again, with Facebook's crop and overlap zones drawn on. For checking, never for upload."""
    return (f'<section class="card gd"><iframe src="{a["of"]}.html" width="1640" height="624"></iframe>'
            '<div class="z mob"><span class="mono">mobile shows only this (640×360 window)</span></div>'
            '<div class="z pp"><span class="mono">profile picture overlaps</span></div></section>')


KIND = {"photo": photo, "recipe": recipe, "fact": fact, "checklist": checklist, "steps": steps, "drawer": drawer, "profile": profile, "guide": guide}
FEED, STORY, COVER, EVENT, SQ = (1080, 1350), (1080, 1920), (1640, 624), (1920, 1005), (800, 800)
WA = "Message us on Facebook · amader.cloud"

ASSETS = [
    # ---- page identity ----
    dict(id="fb-profile", kind="profile", size=SQ, title="Profile picture"),
    dict(id="fb-cover", kind="photo", size=COVER, scene="rooftops", cls="cover", h1="Second jobs for old devices.",
         bn="পুরনো যন্ত্র, নতুন কাজ", cta="pilot buildings in Dhaka · 2027", title="Cover photo"),
    dict(id="fb-cover-guide", kind="guide", size=COVER, of="fb-cover", title="Cover crop guide"),
    dict(id="fb-event-drawer-day", kind="photo", size=EVENT, scene="towers", cls="event", kick="drawer day · free device check",
         h1="Bring your drawer. We'll tell you what each device could do next.", bn="পুরনো যন্ত্র, নতুন কাজ", cta="amader.cloud", title="Event cover: drawer day"),
    dict(id="fb-event-live-qa", kind="photo", size=EVENT, scene="neighbourhood", cls="event", kick="live q&a · bangla and english",
         h1="Ask a fixer: what can your old devices still do?", cta="amader.cloud", title="Event cover: live Q&A"),

    # ---- series A: second-job recipes (one device, one job; balanced across devices and places) ----
    dict(id="r01-phone-camera", kind="recipe", size=FEED, no="recipe 01", kick="old phone → stairwell camera", dev="phone", job="stairwell camera",
         h1="The phone from two phones ago can watch the stairs.", sub="Its camera still works. We wipe it, mount it, and keep it running for the whole building.",
         notes=["rear camera, one fixed view", "common areas only", "stays on its charger", "14 days kept, then overwritten"],
         block=[("for", "building"), ("we", "wipe · rebuild · mount · look after"), ("help", "whatsapp, in bangla")], title="Recipe: phone to camera"),
    dict(id="r02-tvbox-cloud", kind="recipe", size=FEED, no="recipe 02", kick="tv box → family photo cloud", dev="tvbox", job="family photo cloud",
         h1="The TV box from before the smart TV can keep the family's photos.", sub="Your photos stay at home. Copies kept elsewhere are locked with your key.",
         notes=["photos from every phone at home", "stays in your flat", "locked copies on members' devices", "they can't read them"],
         block=[("for", "home"), ("we", "wipe · rebuild · set up · look after"), ("help", "whatsapp, in bangla")], title="Recipe: TV box to photo cloud"),
    dict(id="r03-laptop-lab", kind="recipe", size=FEED, no="recipe 03", kick="office laptop → school lab computer", dev="laptop", job="school lab computer",
         h1="An office's retired laptops can become a school's computer lab.", sub="The company gets proof each one was wiped. The school gets a lab and a library that works offline.",
         notes=["wiped, with a record per laptop", "one per student station", "offline library server", "teacher training session"],
         block=[("for", "school"), ("paid by", "the company retiring them"), ("help", "term-time visits")], title="Recipe: laptop to school lab"),
    dict(id="r04-tablet-notices", kind="recipe", size=FEED, no="recipe 04", kick="tablet → lobby notice board", dev="tablet", job="lobby notice board",
         h1="The tablet in the drawer can run the lobby.", sub="Committee notices, the visitor register and the gas-bill reminder, all on one screen by the lift.",
         notes=["notices from the committee", "visitor register", "updated from a phone", "no more paper on the walls"],
         block=[("for", "building"), ("we", "wipe · rebuild · mount · look after"), ("help", "whatsapp, in bangla")], title="Recipe: tablet to notice board"),
    dict(id="r05-router-roof", kind="recipe", size=FEED, no="recipe 05", kick="old router → rooftop wi‑fi", dev="router", job="rooftop and guard-room wi‑fi",
         h1="The router your ISP replaced can bring Wi‑Fi to the roof.", sub="And to the guard room, so the gate camera and the guard's phone stay connected.",
         notes=["roof and guard room", "keeps the gate camera online", "shares the building ups", "updated by us"],
         block=[("for", "building"), ("we", "wipe · rebuild · install · look after"), ("help", "whatsapp, in bangla")], title="Recipe: router to rooftop Wi-Fi"),
    dict(id="r06-monitor-screen", kind="recipe", size=FEED, no="recipe 06", kick="old monitors → lift-lobby screen", dev="monitor", job="lift-lobby screen",
         h1="Old monitors can carry the notices, and pay the building fund.", sub="Notices, lost and found, and local ads. The ad income goes to the building.",
         notes=["notices and lost and found", "local shop ads", "ad income to the fund", "walls stay clean"],
         block=[("for", "building · para"), ("we", "rebuild · mount · look after"), ("help", "whatsapp, in bangla")], title="Recipe: monitor to lobby screen"),
    dict(id="r07-phone-power", kind="recipe", size=FEED, no="recipe 07", kick="old phone on a charger → power alert", dev="phone", job="current gone / current back",
         h1="Load-shedding? An old phone tells the building when the current is back.", sub="It sits on its charger. When the power stops or returns, it posts to the building's WhatsApp group.",
         notes=["sits on its charger", "posts 'current gone'", "posts 'current back'", "also: tank low, gate open"],
         block=[("for", "building"), ("we", "wipe · rebuild · set up · look after"), ("help", "whatsapp, in bangla")], title="Recipe: phone to power alert"),
    dict(id="r08-desktop-backup", kind="recipe", size=FEED, no="recipe 08", kick="old desktop → shop backup", dev="desktop", job="nightly backup for the shop",
         h1="If the shop's PC dies tonight, last night's backup is waiting.", sub="An old desktop under the counter backs up the shop's computers every night, and keeps a copy off-site.",
         notes=["nightly, up to 3 pcs", "a copy kept off-site", "accounts and cctv footage", "restored by us"],
         block=[("for", "shop · clinic · office"), ("we", "wipe · rebuild · set up · look after"), ("help", "same day")], title="Recipe: desktop to shop backup"),
    dict(id="r09-desktop-earn", kind="recipe", size=FEED, no="recipe 09", kick="spare disk → credit off your plan", dev="desktop", job="rents out spare storage",
         h1="Your old PC's empty disk can pay part of the plan.", sub="Members rent out space their devices aren't using. Other members' copies are locked; you can't read them, and they can't read yours.",
         notes=["at least 250 GB spare", "on 95% of the time", "pilot rate: Tk 50 per 250 GB", "a month, as credit"],
         block=[("for", "home · building"), ("from", "the pilot (storage)"), ("help", "whatsapp, in bangla")], title="Recipe: spare disk to credit"),
    dict(id="r10-phone-passon", kind="recipe", size=FEED, no="recipe 10", kick="old phone → someone's first phone", dev="phone", job="a first phone, passed on",
         h1="Too old for you, a first phone for someone else.", sub="Wiped, checked and passed on in the para, with a record that your data is gone.",
         notes=["your data wiped first", "battery and screen checked", "passed on locally", "you get the wipe record"],
         block=[("for", "para"), ("we", "wipe · check · pass on"), ("help", "whatsapp, in bangla")], title="Recipe: phone passed on"),

    # ---- series B: safer than the drawer ----
    dict(id="b01-vo1d", kind="fact", size=FEED, kick="safer than the drawer", fig="1.3M",
         h1="Android TV boxes infected by one piece of malware, in 197 countries.", sub="It's called Vo1d. Most owners never knew: the box kept playing TV while working for someone else.",
         do="If a box is plugged in and you don't use it, unplug it. If you'd like it to work again, we wipe and rebuild it.", src="Doctor Web, September 2024", title="Fact: Vo1d"),
    dict(id="b02-badbox", kind="fact", size=FEED, kick="safer than the drawer", fig="1M+",
         h1="Home devices hijacked by BADBOX 2.0, and rented out as residential proxies.", sub="Strangers' traffic, going out through a family's own connection.",
         do="Check the boxes and tablets in your home against the four signs. Swipe for the checklist.", src="FBI public service announcement, June 2025", title="Fact: BADBOX 2.0"),
    dict(id="b03-checklist-tvbox", kind="checklist", size=FEED, kick="safer than the drawer", h1="Is your TV box one of them?",
         sub="The FBI's warning signs. One yes is enough to take a closer look.",
         items=["It was sold as ‘unlocked’ or for free channels.", "It asked you to turn off Google Play Protect.", "Its apps came from a store that isn't Google Play.", "You can't find the brand anywhere online."],
         then="Any yes: unplug it, or message us and we'll check it for free.", src="Source: FBI, BADBOX 2.0 warning, June 2025", title="Checklist: TV box"),
    dict(id="b04-checklist-passon", kind="checklist", size=FEED, kick="before you pass on a phone", h1="Five things to do before a phone leaves your hands.",
         sub="Selling it, giving it to a cousin, or swapping it at the market.",
         items=["Back up photos and contacts.", "Sign out of your Google or Apple account.", "Sign out of bKash, Nagad and your bank apps.", "Take out the SIM and the memory card.", "Factory reset it."],
         then="Or bring it to us. We wipe to NIST SP 800-88 guidance and give you a record.", src="amader.cloud", title="Checklist: passing on a phone"),
    dict(id="b05-ewaste", kind="fact", size=FEED, kick="the drawer, nationally", fig="367M kg",
         h1="E‑waste in Bangladesh in 2022. That's 2.2 kg for every person.", sub="How much of it still worked? Nobody counted. Every device we take in gets a passport, so we can.",
         do="Before anything goes to the bhangari, ask whether it could still do one job.", src="Global E‑waste Monitor 2024", title="Fact: e-waste"),

    # ---- series C: stronger as a building (photo, with the site's mesh for that scene) ----
    dict(id="c01-together", kind="photo", size=FEED, scene="rooftops", h1="Old devices work better together.", bn="আমাদের পাড়া, আমাদের যন্ত্র",
         sub="One building's drawers can furnish its cameras, Wi‑Fi, lobby screen and backups.", cta="amader.cloud", title="Photo: together"),
    dict(id="c02-backups", kind="photo", size=FEED, scene="towers", h1="Your photos, kept safe by your neighbours, in pieces they can't read.", bn="আমাদের ডেটা, আমাদের ঘরে",
         sub="Each flat holds one locked piece. Lose your device and the building gives your photos back.", cta="amader.cloud/#community", title="Photo: backups"),
    dict(id="c03-monsoon", kind="photo", size=FEED, scene="monsoon", h1="Lane flooding, current gone, current back: the building hears it first.",
         sub="Old phones on their chargers post to the building's WhatsApp group.", cta="amader.cloud/#community", title="Photo: monsoon"),
    dict(id="c04-teastall", kind="photo", size=FEED, scene="teastall", h1="The para's notice board, on an old TV.",
         sub="Lost and found, events and local ads, instead of posters on every wall.", cta="amader.cloud/#community", title="Photo: tea stall"),
    dict(id="c05-bazar", kind="photo", size=FEED, scene="bazar", h1="Today's prices, on the bazar committee's old tablet.",
         sub="And the committee's accounts on an old laptop, backed up every night.", cta="amader.cloud/#community", title="Photo: bazar"),
    dict(id="c06-street", kind="photo", size=FEED, scene="street", h1="When the shutters come down, the old phones keep watch.",
         sub="Counter cameras, a night camera on the shutter, and the pharmacy's nightly backup.", cta="amader.cloud", title="Photo: street"),
    dict(id="c07-neighbours", kind="photo", size=FEED, scene="neighbourhood", h1="Buildings can back each other up.",
         sub="One building's old laptop holds locked copies for three neighbours. A fire or a theft in one doesn't take everything.", cta="amader.cloud/#community", title="Photo: neighbourhood"),

    # ---- series D: take part ----
    dict(id="d01-drawer", kind="drawer", size=FEED, kick="the drawer census", h1="What's in your drawer?", bn="আপনার ড্রয়ারে কী আছে?",
         sub="Count the old devices at home and tell us. We're mapping what Dhaka's drawers hold, para by para.", foot="Tell us in the comments, with your area", title="Ask: drawer census"),
    dict(id="d02-nominate", kind="steps", size=FEED, light=True, kick="pilot · march 2027", h1="Nominate your building for the pilot.",
         sub="Two Dhaka buildings get their cameras, Wi‑Fi and lobby screen from their residents' own drawers.",
         steps=["Message us your area and roughly how many flats.", "We visit, meet the committee and check the devices. Free.", "We choose two buildings by early February."],
         button="Nominate my building", foot=WA, title="Ask: nominate a building"),
    dict(id="d03-donate", kind="steps", size=FEED, kick="lend us your drawer · winter 2026", h1="Give an old device a job, and help us build the first ones.",
         sub="This winter we test every recipe on donated devices before the pilot.",
         steps=["Phones, TV boxes, laptops, tablets, routers, monitors. Ideally still working.", "We wipe each one to NIST SP 800‑88 guidance, and you get the record.", "We tell you which job it got."],
         button="Donate a device", foot=WA, title="Ask: donate a device"),
    dict(id="d04-companies", kind="steps", size=FEED, light=True, kick="for companies", h1="Retiring office laptops? Retire them into a school lab.",
         sub="A wipe record for every device, and a lab you can visit.",
         steps=["Tell us how many devices and when.", "We collect, wipe and test each one, with a passport per device.", "Working ones become a school's lab. You get the report."],
         button="Talk to us", foot="hello@amader.cloud", title="Ask: companies"),

    # ---- stories and reel covers (keep text in the middle; top 250 px and bottom 340 px are covered by Facebook's buttons) ----
    dict(id="s01-reel-drawer", kind="drawer", size=STORY, kick="reel · 30 s", h1="Every home in Dhaka has this drawer.", bn="পুরনো যন্ত্র, নতুন কাজ",
         sub="Here's what's in ours, and what each one does now.", foot="amader.cloud", title="Reel cover: drawer"),
    dict(id="s02-story-nominate", kind="photo", size=STORY, scene="street", cls="story", kick="pilot · march 2027", h1="Nominate your building.",
         sub="Two Dhaka buildings. Cameras, Wi‑Fi and a lobby screen from residents' old devices. Free visit.", cta="tap the link · amader.cloud", title="Story: nominate"),
    dict(id="s03-story-tvbox", kind="checklist", size=STORY, kick="60-second check", h1="Is your TV box one of them?", sub="The FBI's four warning signs.",
         items=["Sold as ‘unlocked’ or for free channels.", "Asked you to turn off Play Protect.", "Apps from a store that isn't Google Play.", "A brand you can't find online."],
         then="Any yes: unplug it, or message us.", src="Source: FBI, June 2025", title="Story: TV box check"),
]


def contact_sheet():
    tiles = "".join(f'<figure><img src="../out/facebook/{a["id"]}.{ext(a)}" alt=""><figcaption class="mono">{e(a["id"])} · {a["size"][0]}×{a["size"][1]}</figcaption></figure>'
                    for a in ASSETS)
    return (f'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Facebook packet: contact sheet</title>'
            '<meta name="render" content="jpg"><link rel="stylesheet" href="../print/print.css"><style>body{width:2400px;background:var(--night);color:var(--chalk);padding:60px}'
            'h1{font-size:56px;margin-bottom:40px}.g{display:grid;grid-template-columns:repeat(6,1fr);gap:28px;align-items:end}'
            'figure img{width:100%;display:block;border:1px solid rgba(143,184,220,.3)}figcaption{font-size:16px;color:var(--chalk-2);margin-top:8px}</style></head>'
            f'<body><h1>amader.cloud · Facebook media packet</h1><div class="g">{tiles}</div></body></html>')


if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    for old in OUT.glob("*.html"):
        old.unlink()
    for a in ASSETS:
        w, h = a["size"]
        (OUT / f'{a["id"]}.html').write_text(page(a["title"], w, h, KIND[a["kind"]](a), ext(a)))
    (F / "contact-sheet.html").write_text(contact_sheet())
    print(f"wrote {len(ASSETS)} cards to {OUT.relative_to(F.parent.parent)}")
