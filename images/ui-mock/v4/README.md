# UI 线框 v4 · 天市 / 衣冠

沿用 v3 主殿（hub-overlay-preview.html）的云纹视觉语言：象牙纸牌匾、漆面描金胶囊、四角云纹、朱漆按钮。
1280×720 固定舞台，仅横屏。

| 文件 | 说明 |
|---|---|
| tianshi.html | 天市。`?tab=fu`（默认）/`waiguan`/`libao`/`jiaohuan` |
| yiguan.html | 衣冠。`?slot=cloth`（默认）/`fu` |
| 02_tianshi.png | 天市 · 符箓页（主图） |
| 02b/02c/02d_*.png | 天市 · 外观/礼包/以物换物 |
| 03_yiguan.png | 衣冠 · 衣服槽（主图） |
| 03b_yiguan_fu.png | 衣冠 · 符箓槽（含材料绘制） |
| v4-common.css/js, v4-icons.js | 共用样式、云纹 SVG 构件、占位图标 |
| bg_v4_blur.jpg, thumb_*.png, gu_face_thumb.png | 由 hub_bg_clean / fu_* / gu_watch 裁出的派生素材 |

渲染：`python3 render.py`（或 `python3 render.py "tianshi.html?tab=libao=02c_tianshi_libao.png"`）。
卡面标「占位」的都是描金剪影，物件美术未出。数量、期名、日期都是示意。
