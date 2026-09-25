import sys, pathlib
from playwright.sync_api import sync_playwright
here = pathlib.Path(__file__).resolve().parent
src, out, x, y, w, h = sys.argv[1], sys.argv[2], *map(int, sys.argv[3:7])
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--allow-file-access-from-files"])
    pg = b.new_page(viewport={"width": 1280, "height": 720}, device_scale_factor=2)
    pg.goto((here / src.split("?")[0]).as_uri() + ("?" + src.split("?", 1)[1] if "?" in src else ""))
    pg.wait_for_load_state("networkidle"); pg.wait_for_timeout(400)
    pg.screenshot(path=out, clip={"x": x, "y": y, "width": w, "height": h}); b.close()
