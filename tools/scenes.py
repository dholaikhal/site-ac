"""Hero and page-head scenes for the Python marketing scripts.

The website (web/src/data/scenes.json) is the source of truth; this returns the same data in the
tuple shape the marketing scripts expect: nodes {key: (x, y, from, to[, "far"])}, credit (text, url).
"""
import json, pathlib

_DATA = json.loads((pathlib.Path(__file__).resolve().parent.parent / "web" / "src" / "data" / "scenes.json").read_text())


def _shape(s):
    d = dict(s)
    d["nodes"] = {n["key"]: (n["x"], n["y"], n["from"], n["to"], "far") if n["far"] else (n["x"], n["y"], n["from"], n["to"]) for n in s["nodes"]}
    d["credit"] = (s["credit"]["text"], s["credit"]["url"])
    return d


SCENES = [_shape(s) for s in _DATA["hero"]]
HEAD_SCENES = [_shape(s) for s in _DATA["extra"]]
PAGE_HEADS = _DATA["pageHeads"]
