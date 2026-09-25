# UI 线框 v6 · 天市 / 衣冠 · D「镂空窗棂」按钮

基于 v4 线框（布局、内容不变），所有可点控件换成 v5 `buttons.css` 的 D 方向（cw-d）：
主页签 / 方案 = cw-tab，子筛选 / 去天市 = cw-chip，购买 / 保存搭配 / 兑换 = cw-primary，回主殿 / 一键卸下 = cw-secondary，
衣冠槽位 = cw-d 窗棂条（选中透暖光）。货币条、页名、搭配标签改为同质感静态框；选中卡片外圈镂空透光。

| 文件 | 说明 |
|---|---|
| tianshi.html | `?tab=fu`（默认）/`waiguan`/`libao`/`jiaohuan` |
| yiguan.html | `?slot=cloth`（默认）/`fu` |
| 02_tianshi_d.png / 03_yiguan_d.png | 主图 1280×720 |
| v6-d.css / v6-d.js | 线框语境覆盖（常态透光略调亮）+ 顶栏构件 |

素材与共用脚本引用 ../v4，按钮样式引用 ../v5/buttons.css。渲染：`python3 render.py`；局部 2x 检查：`python3 shot2x.py <html> <out.png> x y w h`。
