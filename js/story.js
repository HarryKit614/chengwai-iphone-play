/** 顾山 Demo 第1章 — 人话版「渡气」；关系阶段供写作与共处说明 */
window.REL_STAGES = [
  {
    id: "stranger",
    title: "陌生救命",
    known: "刚被他从雨里捞回来",
    allow: "道谢、问路、接他递来的水",
    forbid: "一开口就像旧情人；把破祠当成已经说好的同榻"
  },
  {
    id: "wary",
    title: "同室戒备",
    known: "雨停前得共处一室，彼此还防着",
    allow: "一起生火盛水；问一句你是谁；干活时碰到手背",
    forbid: "靠太近、说软话；未铺垫的情热"
  },
  {
    id: "trust",
    title: "立住信任",
    known: "渡气发生过，他肯你留下——或肯自己留下",
    allow: "多看一眼、多停一句；低强度的关心",
    forbid: "急着许永远（那是后面的事）"
  }
];

window.STORY = {
  meta: {
    title: "城外·顾山",
    chapter: "第一章 · 渡气",
    orientation: "16:9"
  },
  start: "n01",
  nodes: {
    n01: {
      speaker: "narr",
      name: "",
      emotion: "idle",
      text: "你在漏雨的破祠里醒过来。胸口发闷，像有人从外面往里灌过一口气。",
      next: "n02"
    },
    n02: {
      speaker: "narr",
      name: "",
      emotion: "idle",
      text: "火堆旁坐着个男人。土褐衣裳，头发被雨打乱，并不看你。",
      next: "n03"
    },
    n03: {
      speaker: "gu",
      name: "顾山",
      emotion: "idle",
      text: "还喘。水在灶上。",
      next: "n04"
    },
    n04: {
      speaker: "thought",
      name: "你",
      emotion: "idle",
      text: "碗沿烫手。他报上姓氏时，声音像从门外雨里带进来的——短，也不解释。",
      next: "n05"
    },
    n05: {
      speaker: "gu",
      name: "顾山",
      emotion: "cold",
      text: "顾山。路过。",
      next: "c01"
    },
    c01: {
      speaker: "narr",
      name: "",
      emotion: "idle",
      text: "火噼啪响了一下。你先开口？",
      choices: [
        { text: "……多谢。你是医家？", next: "n06a" },
        { text: "方才胸口那口气，是你渡的？", next: "n06b" },
        { text: "你是什么人。", next: "n06c" }
      ]
    },
    n06a: {
      speaker: "gu",
      name: "顾山",
      emotion: "cold",
      text: "算不算医，我也不知道。人还活着，就行。",
      next: "n07"
    },
    n06b: {
      speaker: "gu",
      name: "顾山",
      emotion: "watch",
      text: "嗯。壳空了，要先活。",
      next: "n07"
    },
    n06c: {
      speaker: "gu",
      name: "顾山",
      emotion: "cold",
      text: "猎人。山里走路的那种。",
      next: "n07"
    },
    n07: {
      speaker: "narr",
      name: "",
      emotion: "idle",
      text: "他仍坐在一步之外。雨从屋脊漏下来，打在灶沿，发出很小的一声。",
      next: "n08"
    },
    n08: {
      speaker: "thought",
      name: "你",
      emotion: "idle",
      text: "胸口那口闷气又浮上来。像有什么还没渡完，停在喉咙和肋骨之间。",
      next: "c02"
    },
    c02: {
      speaker: "narr",
      name: "",
      emotion: "watch",
      text: "他抬眼看了你一下。这一次近到能听见彼此的呼吸。",
      choices: [
        { text: "伸手——让他把那口气渡完", next: "n09a" },
        { text: "退开半步", next: "n09b" }
      ]
    },
    n09a: {
      speaker: "narr",
      name: "",
      emotion: "watch",
      text: "他掌心发烫，像把山里的热渡进你发冷的胸口。耳鸣里有一瞬很静，只剩下雨。",
      next: "n10a"
    },
    n10a: {
      speaker: "gu",
      name: "顾山",
      emotion: "watch",
      text: "……好了。别憋着。",
      next: "n11"
    },
    n09b: {
      speaker: "narr",
      name: "",
      emotion: "cold",
      text: "你退开。那点热也被他收回去。他只是盯着你看一眼，没有追上来。",
      next: "n10b"
    },
    n10b: {
      speaker: "gu",
      name: "顾山",
      emotion: "cold",
      text: "行。你自己撑着。",
      next: "n11"
    },
    n11: {
      speaker: "narr",
      name: "",
      emotion: "idle",
      text: "雨声小了些。门外泥地反着一点天光，像快亮了。",
      next: "n12"
    },
    n12: {
      speaker: "gu",
      name: "顾山",
      emotion: "idle",
      text: "留不留到天亮。",
      next: "c03"
    },
    c03: {
      speaker: "narr",
      name: "",
      emotion: "idle",
      text: "他问得很平，也不催。",
      choices: [
        { text: "留下。雨还没停干净。", next: "n13a" },
        { text: "天亮就走。", next: "n13b" }
      ]
    },
    n13a: {
      speaker: "gu",
      name: "顾山",
      emotion: "watch",
      text: "榻席干的那边给你。我靠门。",
      next: "n14a"
    },
    n14a: {
      speaker: "thought",
      name: "你",
      emotion: "watch",
      text: "他踢开湿草，把干的位置让出来。话仍少，可这一回他肯你留下。",
      stage: "trust",
      next: "end01"
    },
    n13b: {
      speaker: "gu",
      name: "顾山",
      emotion: "cold",
      text: "嗯。",
      next: "n14b"
    },
    n14b: {
      speaker: "thought",
      name: "你",
      emotion: "cold",
      text: "他点一下头，并不留人。破祠里还是两个人，中间那一步距离没变。",
      stage: "wary",
      next: "end01"
    },
    end01: {
      speaker: "narr",
      name: "",
      emotion: "idle",
      text: "无论你怎么选，回到主界面时，他还在火边。\n\n（第一章 · 渡气 · 完）\n可轻触他，或从底栏再进主线。",
      end: true
    }
  }
};

window.HOME_TOUCH = [
  {
    id: "face",
    label: "脸",
    x: "68%",
    y: "18%",
    w: "18%",
    h: "22%",
    lines: ["……看什么。"]
  },
  {
    id: "shoulder",
    label: "肩",
    x: "58%",
    y: "40%",
    w: "20%",
    h: "18%",
    lines: ["袖子，还湿着。"]
  },
  {
    id: "waist",
    label: "腰侧",
    x: "72%",
    y: "58%",
    w: "16%",
    h: "18%",
    lines: ["手拿开。"]
  }
];
