// Dialogue data: one node = one bubble (18 bubbles, 14 of them with a typing
// indicator, 4 with a reply button). No branching — every button leads linearly
// to the next node.
export const dialogueNodes = [
  {
    id: 1,
    indicator: false,
    lines: { ru: ["Привет!"], sr: ["Ћао!"], cs: ["Ahoj!"], en: ["Hey!"] },
    button: {
      ru: "Привет! А кто ты?",
      sr: "Ћао! А ко си ти?",
      cs: "Ahoj! A kdo jsi?",
      en: "Hey! Who are you?",
    },
    action: "next",
  },
  {
    id: 2,
    indicator: false,
    lines: {
      ru: ["Просто человек, который захотел сделать важный для тебя день чуточку лучше!"],
      sr: ["Само човек који је хтео да твој важан дан учини мало лепшим!"],
      cs: ["Jen člověk, který chtěl udělat tvůj důležitý den o trošku hezčí!"],
      en: ["Just someone who wanted to make your big day a little better!"],
    },
  },
  {
    id: 3,
    indicator: true,
    lines: {
      ru: [
        "Не просто сказать тебе: «Счастья». «Здоровья». «Пусть все мечты сбудутся»…",
        "Хотя это тоже важно!",
      ],
      sr: [
        "Не само да ти пожелим: „срећу“, „здравље“, „нека ти се остваре сви снови“…",
        "Мада је и то важно!",
      ],
      cs: [
        "Ne jen ti popřát: „štěstí“, „zdraví“, „ať se ti splní všechny sny“…",
        "I když i to je důležité!",
      ],
      en: [
        "Not just to tell you: “Happiness.” “Health.” “May all your dreams come true.”…",
        "Though that's important too!",
      ],
    },
  },
  {
    id: 4,
    indicator: true,
    lines: {
      ru: ["Но это было бы слишком просто 😁"],
      sr: ["Али то би било сувише једноставно 😁"],
      cs: ["Ale to by bylo až moc jednoduché 😁"],
      en: ["But that would be too easy 😁"],
    },
    button: {
      ru: "Ох, заинтриговал!",
      sr: "О, сад си ме заинтригирао!",
      cs: "No, teď jsi mě navnadil!",
      en: "Ooh, now I'm intrigued!",
    },
    action: "next",
  },
  {
    id: 5,
    indicator: false,
    lines: {
      ru: [
        "Зато одно я знаю точно.",
        "Сегодня твой день.",
        "И этого достаточно, чтобы сделать его немного теплее.",
      ],
      sr: [
        "Али једно знам сигурно.",
        "Данас је твој дан.",
        "И то је довољно да га учиним мало посебнијим.",
      ],
      cs: [
        "Ale jedno vím jistě.",
        "Dnes je tvůj den.",
        "A to stačí, aby byl o kousek krásnější.",
      ],
      en: [
        "But one thing I know for sure.",
        "Today is your day.",
        "And that's enough to make it a little brighter.",
      ],
    },
  },
  {
    id: 6,
    indicator: true,
    lines: {
      ru: ["И знаешь, что я вижу?"],
      sr: ["И знаш шта видим?"],
      cs: ["A víš, co vidím?"],
      en: ["And you know what I see?"],
    },
  },
  {
    id: 7,
    indicator: true,
    lines: {
      ru: ["Ты умеешь замечать хорошее вокруг."],
      sr: ["Умеш да приметиш лепе ствари унаоколо."],
      cs: ["Umíš si všímat hezkých věcí kolem."],
      en: ["You know how to notice the good things all around."],
    },
  },
  {
    id: 8,
    indicator: true,
    lines: {
      ru: [
        "Иногда достаточно чашки любимого кофе.",
        "Хотя…",
        "если я ничего не перепутал, апельсиновый фреш всё-таки сумел занять первое место 😏",
      ],
      sr: [
        "Некад је довољна шоља омиљене кафе.",
        "Мада…",
        "ако ништа нисам помешао, свеже цеђена поморанџа је ипак заузела прво место 😏",
      ],
      cs: [
        "Někdy stačí šálek oblíbené kávy.",
        "I když…",
        "jestli se nepletu, čerstvý pomerančový džus si nakonec vybojoval první místo 😏",
      ],
      en: [
        "Sometimes a cup of your favorite coffee is enough.",
        "Although…",
        "if I'm not mistaken, fresh orange juice still managed to take first place 😏",
      ],
    },
  },
  {
    id: 9,
    indicator: true,
    lines: {
      ru: [
        "Иногда достаточно вкусного даниша с клубникой 🍓",
        "Или красивого кадра, которым хочется поделиться.",
      ],
      sr: [
        "Некад је довољан укусан даниш са јагодама 🍓",
        "Или лепа фотка коју пожелиш да поделиш.",
      ],
      cs: [
        "Někdy stačí chutný jahodový danish 🍓",
        "Nebo pěkná fotka, o kterou se chceš podělit.",
      ],
      en: [
        "Sometimes a tasty strawberry danish is enough 🍓",
        "Or a beautiful shot you just want to share.",
      ],
    },
  },
  {
    id: 10,
    indicator: true,
    lines: {
      ru: ["Или совершенно несерьёзной шутки."],
      sr: ["Или сасвим неозбиљне шале."],
      cs: ["Nebo úplně nevážného vtípku."],
      en: ["Or a completely silly joke."],
    },
  },
  {
    id: 11,
    indicator: true,
    lines: {
      ru: ["В конце концов…", "не каждый человек может заболеть скитлстрянкой 😄"],
      sr: ["Ипак…", "не може свако да добије скитлс-богиње 😄"],
      cs: ["Koneckonců…", "ne každý může dostat skittlesničky 😄"],
      en: ["After all…", "not everyone gets to come down with Skittles Pox 😄"],
    },
  },
  {
    id: 12,
    indicator: true,
    lines: {
      ru: ["Это оно и есть — то самое умение замечать хорошее вокруг."],
      sr: ["То је баш то — то умеће да приметиш лепе ствари унаоколо."],
      cs: ["A přesně to je ono – to umění všímat si hezkých věcí kolem."],
      en: ["And that's exactly it — that very knack for noticing the good things all around."],
    },
    button: {
      ru: "Ну вот и весь секрет!",
      sr: "Па то је цела тајна!",
      cs: "Tak to je celé tajemství!",
      en: "So that's the whole secret!",
    },
    action: "next",
  },
  {
    id: 13,
    indicator: false,
    lines: {
      ru: [
        "А ещё когда-то ты сама уехала в Чехию.",
        "Поступила в университет.",
        "И успешно его закончила!",
      ],
      sr: [
        "А некада си сама отишла у Чешку.",
        "Уписала факултет.",
        "И успешно га завршила!",
      ],
      cs: [
        "A kdysi ses sama vydala do Česka.",
        "Přihlásila ses na vysokou.",
        "A úspěšně jsi ji dokončila!",
      ],
      en: [
        "And another thing — you once moved to Czechia all on your own.",
        "Got into university.",
        "And graduated!",
      ],
    },
  },
  {
    id: 14,
    indicator: true,
    lines: {
      ru: ["Красивые истории почти всегда начинаются с решений, которые сначала кажутся немного страшными."],
      sr: ["Лепе приче скоро увек почињу одлукама које у почетку делују помало застрашујуће."],
      cs: ["Krásné příběhy skoro vždycky začínají rozhodnutími, která se zpočátku zdají trochu děsivá."],
      en: ["Beautiful stories almost always start with decisions that feel a little scary at first."],
    },
  },
  {
    id: 15,
    indicator: true,
    lines: {
      ru: ["Смелость выбирать то, что откликается внутри, — кажется, у тебя это уже получается."],
      sr: ["Храброст да бираш оно што ти је блиско срцу — чини се да ти то већ полази за руком."],
      cs: ["Odvaha jít za tím, co tě opravdu oslovuje – zdá se, že ti to už docela jde."],
      en: ["The courage to choose what feels right inside — seems like you've already got the hang of it."],
    },
  },
  {
    id: 16,
    indicator: true,
    lines: {
      ru: ["Мечты превращаются в новые города, новые истории, новые воспоминания — по-моему, это как раз твой почерк."],
      sr: ["Снови се претварају у нове градове, нове приче, нове успомене — рекао бих да је то баш твој рукопис."],
      cs: ["Sny se mění v nová města, nové příběhy, nové vzpomínky – řekl bych, že přesně tohle je tvůj rukopis."],
      en: ["Dreams turning into new cities, new stories, new memories — that, I'd say, is exactly your signature."],
    },
  },
  {
    id: 17,
    indicator: true,
    lines: {
      ru: [
        "Это я к чему…",
        "У тебя уже столько всего получается. Дальше можно только пожелать — пусть этого будет ещё больше.",
      ],
      sr: [
        "Хоћу рећи…",
        "Толико тога ти већ иде од руке. Остаје само пожелети — нека тога буде још више.",
      ],
      cs: [
        "Čímž chci říct…",
        "Tolik věcí se ti už daří. Zbývá jen popřát – ať toho je ještě víc.",
      ],
      en: [
        "All of which is to say…",
        "So much is already going well for you. The only wish left is — may there be even more of it.",
      ],
    },
  },
  {
    id: 18,
    indicator: true,
    lines: {
      ru: ["А теперь можно сказать главное…"],
      sr: ["А сада — оно најважније…"],
      cs: ["A teď to hlavní…"],
      en: ["And now for the main thing…"],
    },
    button: {
      ru: "Не томи!",
      sr: "Хајде, реци већ!",
      cs: "Nenapínej mě!",
      en: "Out with it!",
    },
    action: "end",
  },
];

export const LANGS = ["ru", "sr", "cs", "en"];

export function linesOf(node, lang) {
  return node.lines[lang] || node.lines.ru;
}

export function buttonLabelOf(node, lang) {
  if (!node.button) return "";
  return node.button[lang] || node.button.ru;
}

// "Typing" delay: 30ms per character of the upcoming text, clamped to 900–1500ms (spec §7.1.2)
export function indicatorDuration(node, lang) {
  const text = linesOf(node, lang).join(" ");
  return Math.max(900, Math.min(1500, text.length * 30));
}
