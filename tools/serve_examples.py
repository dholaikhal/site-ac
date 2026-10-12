#!/usr/bin/env python3
"""Local preview of the example apps as subdomains: http://goldweave.localhost:8430/ serves
web/dist-examples/goldweave/, and so on (browsers send *.localhost to this machine)."""
import functools, http.server, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent / "web" / "dist-examples"

class Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        app = self.headers.get("Host", "").split(".")[0].split(":")[0]
        self.directory = str(ROOT / app)
        return super().translate_path(path)

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8430
http.server.ThreadingHTTPServer(("127.0.0.1", port), functools.partial(Handler, directory=str(ROOT))).serve_forever()
