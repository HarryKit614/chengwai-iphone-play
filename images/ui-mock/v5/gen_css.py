# 生成 buttons.css：把 motifs.py 的云纹 SVG 编码成 CSS 变量，再拼上 buttons.src.css
import base64, pathlib, motifs as m
here = pathlib.Path(__file__).resolve().parent
u = lambda s: 'url("data:image/svg+xml;base64,' + base64.b64encode(s.encode()).decode() + '")'
vars_ = {}
for k, pal in {"gold": ("#fff4cc", "#e8c878", "#9a6a20"),
               "lit": ("#ffffff", "#ffe9a0", "#d49a30"),
               "verm": ("#e86a50", "#b8321f", "#7c140c"),
               "dull": ("#b8ab90", "#8a7e68", "#5a5040")}.items():
    for f in ("tl", "tr", "bl", "br"):
        vars_[f"--cw-cn-{k}-{f}"] = u(m.corner(*pal, flip="" if f == "tl" else f))
vars_["--cw-band-gold"] = u(m.cloud_band("#f5d890", 1.4))
vars_["--cw-band-lit"] = u(m.cloud_band("#fff3c4", 1.6))
vars_["--cw-band-deep"] = u(m.cloud_band("#b0802a", 1.6))
vars_["--cw-band-jade"] = u(m.cloud_band("rgba(255,255,255,.55)", 1.2))
vars_["--cw-band-verm"] = u(m.cloud_band("#b8321f", 1.3))
vars_["--cw-lattice"] = u(m.lattice(12))
vars_["--cw-rod"] = u(m.rod())
vars_["--cw-rod-lit"] = u(m.rod(lit=True))
vars_["--cw-rod-off"] = u(m.rod(disabled=True))
vars_["--cw-noise"] = u(m.noise())
head = ("/* 《廿四道·城外》按钮 v5 · 可复用样式（由 gen_css.py 生成，改样式请改 buttons.src.css / motifs.py）\n"
        " * 用法：<button class=\"cw cw-a cw-primary\"><span class=\"cw-label\">购买</span></button>\n"
        " * 方向：cw-a 玉牌嵌金 · cw-b 朱漆印章 · cw-c 卷轴页签 · cw-d 镂空窗棂\n"
        " * 种类：cw-primary / cw-secondary / cw-tab / cw-chip\n"
        " * 状态：:hover  :active(或 .is-pressed)  .is-selected / [aria-selected=true]  :disabled(或 .is-disabled)\n */\n"
        ":root {\n" + "".join(f"  {k}: {v};\n" for k, v in vars_.items()) + "}\n\n")
(here / "buttons.css").write_text(head + (here / "buttons.src.css").read_text(encoding="utf-8"), encoding="utf-8")
print("buttons.css", (here / "buttons.css").stat().st_size, "bytes")
