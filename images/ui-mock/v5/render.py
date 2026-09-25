# 渲染 v5 按钮比选板：整板 1280x720 + 每行 2x 放大裁切
import pathlib
from playwright.sync_api import sync_playwright
here = pathlib.Path(__file__).resolve().parent
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--allow-file-access-from-files"])
    for scale in (1, 2):
        pg = b.new_page(viewport={"width": 1280, "height": 720}, device_scale_factor=scale)
        pg.goto((here / "buttons.html").as_uri())
        pg.wait_for_load_state("networkidle"); pg.evaluate("document.fonts.ready"); pg.wait_for_timeout(600)
        pg.add_style_tag(content="*,*::before,*::after{animation-play-state:paused!important}")
        if scale == 1:
            pg.screenshot(path=str(here / "buttons_board.png"), clip={"x": 0, "y": 0, "width": 1280, "height": 720})
            print("wrote buttons_board.png")
        else:
            for L in "ABCD":
                r = pg.locator(f"#row{L}").bounding_box()
                pg.screenshot(path=str(here / f"buttons_{L}.png"),
                              clip={"x": 0, "y": r["y"], "width": 1280, "height": r["height"]})
                print(f"wrote buttons_{L}.png")
        pg.close()
    b.close()
