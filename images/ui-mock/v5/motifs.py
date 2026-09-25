# 云纹母题（SVG 字符串）：gen_css.py 把它们编码为 data URI 写入 buttons.css
GOLD_DEFS = ('<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">'
             '<stop offset="0" stop-color="{a}"/><stop offset=".45" stop-color="{b}"/>'
             '<stop offset="1" stop-color="{c}"/></linearGradient></defs>')

def ruyi(stroke="url(#g)", w=2.1):
    # 如意云头：左右对称的两个内卷云头，尖朝上；局部坐标，原点在云头中心
    half = ("M0,-7.6 C2.6,-10.2 8.2,-9.8 9.4,-5.6 C10.6,-1.6 7.6,1.8 4.4,1.4 "
            "C2.2,1.1 1.6,-1.2 3.1,-2.1 C4.2,-2.8 5.6,-2.0 5.3,-0.8")
    stem = "M0,-7.6 C-0.2,-3 0.6,1 0,5.2"
    return (f'<g fill="none" stroke="{stroke}" stroke-linecap="round" stroke-linejoin="round">'
            f'<path d="{half}" stroke-width="{w}"/>'
            f'<path d="{half}" transform="scale(-1,1)" stroke-width="{w}"/>'
            f'<path d="M0,1.6 C-1.2,3.2 -0.8,5 0,5.8 C0.8,5 1.2,3.2 0,1.6Z" fill="{stroke}" stroke="none"/>'
            f'<path d="M-3.2,-6.4 C-1.6,-5.2 1.6,-5.2 3.2,-6.4" stroke-width="{w*0.45}" opacity=".8"/></g>')

def tail(stroke="url(#g)", w=1.7):
    # 沿边拖出的云尾：由粗到细 + 末端小回卷
    return (f'<g fill="none" stroke="{stroke}" stroke-linecap="round">'
            f'<path d="M15.5,5.6 C20,3.6 24,6.6 28.5,5.4 C31.5,4.6 33.5,3.4 36.2,3.9" stroke-width="{w}"/>'
            f'<path d="M36.2,3.9 C39.2,4.4 39.8,7.6 37.6,8.4 C36,9 34.9,7.4 35.9,6.5" stroke-width="{w*0.8}"/>'
            f'<path d="M17,8.6 C21,7.4 24,9 27.5,8.2" stroke-width="{w*0.45}" opacity=".75"/>'
            f'<path d="M40.5,5.2 L46,5.2" stroke-width="{w*0.45}" opacity=".7"/></g>')

def corner(a="#fff0c0", b="#e8c878", c="#9a6a20", flip="", dot="#fff6d8"):
    g = GOLD_DEFS.format(a=a, b=b, c=c)
    body = (f'<g transform="translate(11.4,11.4) rotate(-45) scale(.82)">{ruyi(w=2.4)}</g>'
            f'{tail()}<g transform="matrix(0,1,1,0,0,0)">{tail()}</g>'
            f'<circle cx="11.4" cy="11.4" r="1.1" fill="{dot}"/>')
    tf = {"": "", "tr": "translate(48,0) scale(-1,1)", "bl": "translate(0,48) scale(1,-1)",
          "br": "translate(48,48) scale(-1,-1)"}[flip]
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">{g}'
            f'<g transform="{tf}">{body}</g></svg>')

def cloud_band(color="#f5d890", w=1.3):
    # 连续流云带（横向可平铺，周期 48）
    p = ("M0,8 C4,8 6,3.2 10.4,3.2 C14,3.2 15.4,6.6 13.2,7.8 C11.6,8.6 10.2,7 11.2,6 "
         "M13.2,7.8 C17,9.4 20,9.4 24,8 "
         "C28,8 30,12.8 34.4,12.8 C38,12.8 39.4,9.4 37.2,8.2 C35.6,7.4 34.2,9 35.2,10 "
         "M37.2,8.2 C41,6.6 44,6.6 48,8")
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 16">'
            f'<path d="{p}" fill="none" stroke="{color}" stroke-width="{w}" stroke-linecap="round"/></svg>')

def lattice(cell=12):
    # 镂空云雷格：白色笔画 = 透光孔（用作 mask）。阿基米德螺旋 + 出格云尾，相邻格首尾相接
    import math
    c = cell / 2; pts = []
    turns, r0, r1 = 1.6, cell*.05, cell*.36
    n = 40
    for i in range(n + 1):
        t = i / n; a = math.pi * 2 * turns * t + math.pi
        r = r0 + (r1 - r0) * t
        pts.append((c + r * math.cos(a), c + r * math.sin(a)))
    d = "M" + " L".join(f"{x:.2f},{y:.2f}" for x, y in pts)
    x, y = pts[-1]
    d += f" C{x+cell*.1:.2f},{y:.2f} {cell*.92:.2f},{cell*.9:.2f} {cell:.2f},{cell:.2f}"
    d2 = f"M0,0 C{cell*.06:.2f},{cell*.04:.2f} {cell*.1:.2f},{cell*.1:.2f} {cell*.14:.2f},{cell*.16:.2f}"
    sp = (f'<path d="{d} {d2}" fill="none" stroke="#fff" stroke-width="{cell*.12:.2f}" '
          f'stroke-linecap="round" stroke-linejoin="round"/>')
    # 两格一组：左螺旋 + 镜像螺旋，相对成“云头对卷”
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {cell*2} {cell}">{sp}'
            f'<g transform="translate({cell*2},0) scale(-1,1)">{sp}</g></svg>')

def rod(lit=False, disabled=False):
    # 卷轴轴头：木轴 + 上下金色轴首
    wood = ("#6a4020", "#3a220e", "#1e1206")
    ga, gb, gc = ("#fffbe6", "#ffd978", "#b8862a") if lit else ("#f5e0a0", "#c9a045", "#6a4810")
    if disabled:
        wood = ("#4a4038", "#2e2822", "#1a1612"); ga, gb, gc = ("#a8a090", "#7a7060", "#4a4238")
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 60" preserveAspectRatio="none">'
            '<defs><linearGradient id="w" x1="0" x2="1"><stop offset="0" stop-color="%s"/>'
            '<stop offset=".35" stop-color="%s"/><stop offset=".6" stop-color="%s"/><stop offset="1" stop-color="%s"/></linearGradient>'
            '<linearGradient id="k" x1="0" x2="1"><stop offset="0" stop-color="%s"/><stop offset=".3" stop-color="%s"/>'
            '<stop offset=".55" stop-color="%s"/><stop offset="1" stop-color="%s"/></linearGradient></defs>'
            '<rect x="2" y="5" width="8" height="50" rx="1.5" fill="url(#w)"/>'
            '<rect x="2" y="5" width="8" height="50" rx="1.5" fill="none" stroke="#120a04" stroke-width=".6" opacity=".6"/>'
            '<rect x="0.6" y="0.6" width="10.8" height="6" rx="2.4" fill="url(#k)" stroke="%s" stroke-width=".6"/>'
            '<rect x="0.6" y="53.4" width="10.8" height="6" rx="2.4" fill="url(#k)" stroke="%s" stroke-width=".6"/>'
            '<rect x="1.6" y="7.6" width="8.8" height="1" fill="%s" opacity=".8"/><rect x="1.6" y="51.4" width="8.8" height="1" fill="%s" opacity=".8"/>'
            '</svg>') % (wood[1], wood[0], wood[1], wood[2], gc, ga, gb, gc, gc, gc, gb, gb)

def noise():
    return ('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n">'
            '<feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" stitchTiles="stitch"/>'
            '<feColorMatrix values="0 0 0 0 1  0 0 0 0 .9  0 0 0 0 .7  0 0 0 .09 0"/></filter>'
            '<rect width="160" height="160" filter="url(#n)"/></svg>')
