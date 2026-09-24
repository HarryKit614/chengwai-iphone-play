/** 顾山 Demo 第1章 — 关心憨厚调「渡气」 */
window.REL_STAGES = [
  {
    id: "stranger",
    title: "陌生救命",
    known: "刚被他从雨里捞回来，还不太熟",
    allow: "道谢、接水、让他帮忙看看伤；他笨拙地解释自己不是坏人",
    forbid: "一开口就像旧情人；把破祠当成已经说好的同榻"
  },
  {
    id: "wary",
    title: "同室照顾",
    known: "雨停前得共处一室，他防着外面，却顾着你",
    allow: "一起生火盛水；问他从哪来；接受他让出的干位置",
    forbid: "把体贴当成可以随便试探的亲昵；未铺垫的情热"
  },
  {
    id: "trust",
    title: "肯留下",
    known: "渡气发生过，他明确说了可以留到天亮",
    allow: "多看一眼、多停一句；低声说不舒服；让他守门",
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
      text: "你在漏雨的破祠里醒过来。胸口发闷，像有人从外面小心翼翼往里渡过一口气。火堆烧得不算旺，却一直有人添着柴。",
      next: "n02"
    },
    n02: {
      speaker: "narr",
      name: "",
      emotion: "idle",
      text: "火边坐着个男人。土褐衣裳，头发被雨打乱，袖口还潮着。见你睁眼，他先把烧开的水往旁边挪了挪，怕烫到你。",
      next: "n03"
    },
    n03: {
      speaker: "gu",
      name: "顾山",
      emotion: "watch",
      text: "还好。呼吸顺了就行。水在这儿，温的。你先喝一口。",
      next: "n04"
    },
    n04: {
      speaker: "thought",
      name: "你",
      emotion: "idle",
      text: "碗沿烫手，他却把自己那份靠得更远一点。目光落在你脸上，又很快挪开，像怕看得太直。",
      next: "n05"
    },
    n05: {
      speaker: "gu",
      name: "顾山",
      emotion: "idle",
      text: "我叫顾山。路过撞见的。山里这种事……我不会放着不管。你别怕，我不是来害人的。",
      next: "c01"
    },
    c01: {
      speaker: "narr",
      name: "",
      emotion: "idle",
      text: "火噼啪响了一下。他等着你开口，手却老实地搁在膝上。",
      choices: [
        { text: "……多谢。你是医家？", next: "n06a" },
        { text: "方才胸口那口气，是你渡的？", next: "n06b" },
        { text: "你一个人走山路？", next: "n06c" }
      ]
    },
    n06a: {
      speaker: "gu",
      name: "顾山",
      emotion: "idle",
      text: "算不上医。只会一点救人的法子。人还活着，我就放心了。剩下的，你慢慢缓。",
      next: "n07"
    },
    n06b: {
      speaker: "gu",
      name: "顾山",
      emotion: "watch",
      text: "是我。你壳子空得厉害，不渡一口气怕撑不住。要是唐突了，你骂我也行。",
      next: "n07"
    },
    n06c: {
      speaker: "gu",
      name: "顾山",
      emotion: "idle",
      text: "嗯。打猎的。这山我熟。今晚雨大，才把你往破祠里带。别处更潮。",
      next: "n07"
    },
    n07: {
      speaker: "narr",
      name: "",
      emotion: "idle",
      text: "他起身把漏雨那侧的草席捲起来，又把自己干一点的披风抖开，垫在你身后靠着的位置。动作不算利落，却很认真。",
      next: "n08"
    },
    n08: {
      speaker: "gu",
      name: "顾山",
      emotion: "watch",
      text: "这边不滴水。你靠着。我去添把柴。",
      next: "n09"
    },
    n09: {
      speaker: "thought",
      name: "你",
      emotion: "idle",
      text: "胸口那口闷气又浮上来，像渡到一半停住了。他添完柴回头，看见你皱眉，脚步立刻顿住。",
      next: "c02"
    },
    c02: {
      speaker: "narr",
      name: "",
      emotion: "watch",
      text: "他在一步之外蹲下，掌心朝上，声音放得很低。",
      choices: [
        { text: "伸手——让他把那口气渡完", next: "n10a" },
        { text: "先缓一缓，先不要", next: "n10b" }
      ]
    },
    n10a: {
      speaker: "narr",
      name: "",
      emotion: "watch",
      text: "他掌心发烫，却不敢握太紧。热气慢慢渡进你发冷的胸口，耳鸣里有一瞬很静，只剩下雨和他压低的呼吸。",
      next: "n11a"
    },
    n11a: {
      speaker: "gu",
      name: "顾山",
      emotion: "watch",
      text: "烫一点就对了。别怕。缓一缓……我在。不舒服你就捏我一下。",
      next: "n12"
    },
    n10b: {
      speaker: "narr",
      name: "",
      emotion: "idle",
      text: "你摇头。他立刻把手收回去，还往旁边挪了半寸，生怕自己逼着你。",
      next: "n11b"
    },
    n11b: {
      speaker: "gu",
      name: "顾山",
      emotion: "idle",
      text: "也成。你不舒服就说。我不逼你。水还热着，渴了喊我。",
      next: "n12"
    },
    n12: {
      speaker: "narr",
      name: "",
      emotion: "idle",
      text: "雨声小了些。门外泥地反着一点天光。他听了听外面，又回头看你有没有缓过来。",
      next: "n13"
    },
    n13: {
      speaker: "gu",
      name: "顾山",
      emotion: "watch",
      text: "雨还没停干净。你要是不嫌这里破，就留到天亮。榻席干的那边给你，我靠门就行。我守着，你睡。",
      next: "c03"
    },
    c03: {
      speaker: "narr",
      name: "",
      emotion: "idle",
      text: "他说完耳朵有点红，却把话说明白了，等你点头。",
      choices: [
        { text: "那就麻烦你了。我留下。", next: "n14a" },
        { text: "谢谢。天亮我想走。", next: "n14b" }
      ]
    },
    n14a: {
      speaker: "gu",
      name: "顾山",
      emotion: "watch",
      text: "不麻烦。应该的。你躺下，我把火压小一点，别熏着你。",
      next: "n15a"
    },
    n15a: {
      speaker: "thought",
      name: "你",
      emotion: "watch",
      text: "他把干的位置让出来，自己靠着门坐下，背影挡着风口。过一会儿又轻声问一句：还冷不冷。",
      stage: "trust",
      next: "end01"
    },
    n14b: {
      speaker: "gu",
      name: "顾山",
      emotion: "idle",
      text: "好。那你先缓着。天亮路滑，我送你到岔口。不送远，免得你觉得我缠人。",
      next: "n15b"
    },
    n15b: {
      speaker: "thought",
      name: "你",
      emotion: "idle",
      text: "他点头应了，还是把干披风往你这边推了推。人没强留，照顾却没收回去。",
      stage: "wary",
      next: "end01"
    },
    end01: {
      speaker: "narr",
      name: "",
      emotion: "idle",
      text: "无论你怎么选，回到主界面时，他还在火边，偶尔抬头看你一眼，又很快低下去。\n\n（第一章 · 渡气 · 完）\n可轻触他，或从底栏再进主线。",
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
    lines: [
      "……脸还有点白。要不要再喝一口？",
      "看着我干嘛。我脸上有灰？",
      "缓过来一点就好。别硬撑。"
    ]
  },
  {
    id: "shoulder",
    label: "肩",
    x: "58%",
    y: "40%",
    w: "20%",
    h: "18%",
    lines: [
      "袖子我晾过了。你别再挨着漏雨那儿坐。",
      "肩上潮气重。你冷就说，我添柴。",
      "……手可以搭这儿。我不躲。"
    ]
  },
  {
    id: "waist",
    label: "腰侧",
    x: "72%",
    y: "58%",
    w: "16%",
    h: "18%",
    lines: [
      "不是不让碰。刀柄凉，别划着手。",
      "腰间是干粮。饿了跟我说。",
      "你站稳些。地滑。"
    ]
  }
];
