/** 顾山 Demo 第1章 — 全新节点，仅本地自玩 */
window.STORY = {
  meta: {
    title: "城外·顾山",
    chapter: "第一章 · 渡气",
    orientation: "16:9"
  },
  start: "n01",
  nodes: {
    n01: {
      speaker: "",
      name: "",
      text: "雨停在屋脊上。破祠里只剩灶口一点余温，和你自己的呼吸。",
      next: "n02"
    },
    n02: {
      speaker: "thought",
      name: "你",
      text: "醒来时，手腕上还留着别人的掌温。像有人把气渡进了你这具空壳。",
      next: "n03"
    },
    n03: {
      speaker: "gu",
      name: "顾山",
      text: "还喘。",
      next: "n04",
      showSprite: true
    },
    n04: {
      speaker: "gu",
      name: "顾山",
      text: "水在灶上。",
      next: "c01"
    },
    c01: {
      speaker: "narr",
      name: "",
      text: "他蹲在一步之外，不多看你。你先开口？",
      choices: [
        { text: "……多谢。你是医家？", next: "n05a" },
        { text: "方才，是你渡的气？", next: "n05b" },
        { text: "先不问。把水端过来。", next: "n05c" }
      ]
    },
    n05a: {
      speaker: "gu",
      name: "顾山",
      text: "这算不算医，我也不知道。",
      next: "n06"
    },
    n05b: {
      speaker: "gu",
      name: "顾山",
      text: "嗯。壳空了，要先活。",
      next: "n06"
    },
    n05c: {
      speaker: "gu",
      name: "顾山",
      text: "……好。",
      next: "n06"
    },
    n06: {
      speaker: "thought",
      name: "你",
      text: "他递碗时指节很稳。渡气的事他不做解释，只把「还活着」当成一件该做完的活。",
      next: "n07"
    },
    n07: {
      speaker: "gu",
      name: "顾山",
      text: "别出门。山里有脚印。",
      next: "n08"
    },
    n08: {
      speaker: "gu",
      name: "顾山",
      text: "我在。",
      next: "end01"
    },
    end01: {
      speaker: "narr",
      name: "",
      text: "（第一章 · 渡气 · 完）\n可回主界面轻触他，或从底栏再进主线。",
      end: true
    }
  }
};

window.HOME_TOUCH = [
  { id: "shoulder", label: "肩", x: "62%", y: "38%", w: "16%", h: "18%", lines: ["……", "肩湿了。", "坐着。"] },
  { id: "sleeve", label: "袖", x: "70%", y: "55%", w: "14%", h: "16%", lines: ["袖口有血。不是今天的。", "别扯。"] },
  { id: "knife", label: "刀", x: "78%", y: "62%", w: "14%", h: "18%", lines: ["猎刀。", "你碰不到柄。"] }
];

window.HOME_TOUCH = window.HOME_TOUCH;
