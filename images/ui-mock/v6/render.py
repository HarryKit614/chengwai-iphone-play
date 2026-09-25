# 渲染 v6（D 镂空窗棂）线框为 1280x720 PNG
import sys, pathlib
from playwright.sync_api import sync_playwright
here = pathlib.Path(__file__).resolve().parent
jobs = [a.rsplit("=", 1) for a in sys.argv[1:]] or [
    ("tianshi.html", "02_tianshi_d.png"), ("yiguan.html", "03_yiguan_d.png")]
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--allow-file-access-from-files"])
    pg = b.new_page(viewport={"width": 1280, "height": 720}, device_scale_factor=1)
    for src, out in jobs:
        pg.goto((here / src.split("?")[0]).as_uri() + ("?" + src.split("?", 1)[1] if "?" in src else ""))
        pg.wait_for_load_state("networkidle"); pg.evaluate("document.fonts.ready"); pg.wait_for_timeout(400)
        pg.screenshot(path=str(here / out), clip={"x": 0, "y": 0, "width": 1280, "height": 720})
        print("wrote", out)
    b.close()
