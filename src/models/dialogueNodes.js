// Dialogue data: one node = one bubble (18 bubbles, 14 of them with a typing
// indicator, 4 with a reply button). No branching — every button leads linearly
// to the next node.
export const dialogueNodes = [
  {
    id: 1,
    indicator: false,
    lines: { ru: ["Привет!"], sr: ["Ћао!"], cs: ["Ahoj!"], en: ["Hi!"] },
    button: {
      ru: "Привет! А кто ты?",
      sr: "Ћао! А ко си ти?",
      cs: "Ahoj! A kdo jsi ty?",
      en: "Hi! And who are you?",
    },
    action: "next",
  },
  {
    id: 2,
    indicator: false,
    lines: {
      ru: ["Сегодня важный день для тебя — и я хочу сделать его чуточку лучше!"],
      sr: ["Данас је важан дан за тебе — и желим да га учиним мало лепшим!"],
      cs: ["Dnes je pro tebe důležitý den — a chci ho udělat o něco lepším!"],
      en: ["Today's a big day for you — and I want to make it just a little better!"],
    },
  },
  {
    id: 3,
    indicator: true,
    lines: {
      ru: [
        "Не просто сказать тебе: «Счастья.» «Здоровья.» «Пусть все мечты сбудутся.» …",
        "Хотя это тоже важно!",
      ],
      sr: [
        "Не само да ти кажем: „Срећу.“ „Здравље.“ „Нека се све жеље остваре.“ …",
        "Мада је и то важно!",
      ],
      cs: [
        "Ne jen ti říct: „Štěstí.“ „Zdraví.“ „Ať se ti splní všechna přání.“ …",
        "I když i to je důležité!",
      ],
      en: [
        "Not just to tell you: “Happiness.” “Health.” “May all your dreams come true.” …",
        "Though that matters too!",
      ],
    },
  },
  {
    id: 4,
    indicator: true,
    lines: {
      ru: ["Но это было слишком просто 😁"],
      sr: ["Али то би било превише једноставно 😁"],
      cs: ["Ale to by bylo příliš jednoduché 😁"],
      en: ["But that would've been too easy 😁"],
    },
    button: {
      ru: "Ох, заинтриговал!",
      sr: "Ох, заинтриговао си ме!",
      cs: "Ó, zaujal jsi mě!",
      en: "Oh, now I'm intrigued!",
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
        "И то је довољно да га учини мало топлијим.",
      ],
      cs: [
        "Zato jedno vím jistě.",
        "Dnes je tvůj den.",
        "A to stačí, aby byl o něco vřelejší.",
      ],
      en: [
        "One thing I know for sure, though.",
        "Today is your day.",
        "And that's enough to make it a little warmer.",
      ],
    },
  },
  {
    id: 6,
    indicator: true,
    lines: {
      ru: ["И вот что я вижу."],
      sr: ["И ево шта видим."],
      cs: ["A tady je to, co vidím."],
      en: ["And here's what I see."],
    },
  },
  {
    id: 7,
    indicator: true,
    lines: {
      ru: ["Ты умеешь замечать хорошее вокруг."],
      sr: ["Умеш да приметиш лепо око себе."],
      cs: ["Umíš si všímat dobrého kolem sebe."],
      en: ["You know how to notice the good around you."],
    },
  },
  {
    id: 8,
    indicator: true,
    lines: {
      ru: [
        "Иногда достаточно чашки любимого кофе.",
        "Хотя...",
        "если я ничего не перепутал, апельсиновый фреш всё-таки сумел занять первое место 😏",
      ],
      sr: [
        "Понекад је довољна шоља омиљене кафе.",
        "Мада...",
        "ако нисам ништа побркао, цеђена поморанџа је ипак заузела прво место 😏",
      ],
      cs: [
        "Někdy stačí šálek oblíbené kávy.",
        "I když...",
        "jestli jsem nic nepopletl, čerstvý pomerančový džus přece jen obsadil první místo 😏",
      ],
      en: [
        "Sometimes a cup of your favorite coffee is enough.",
        "Well…",
        "if I've got it right, fresh orange juice still took first place after all 😏",
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
        "Понекад је довољан укусан даниш са јагодама 🍓",
        "Или леп кадар који пожелиш да поделиш.",
      ],
      cs: [
        "Někdy stačí dobrý jahodový dánský koláč 🍓",
        "Nebo krásný záběr, o který se chceš podělit.",
      ],
      en: [
        "Sometimes a tasty strawberry danish is enough 🍓",
        "Or a beautiful shot you want to share.",
      ],
    },
  },
  {
    id: 10,
    indicator: true,
    lines: {
      ru: ["Или совершенно несерьёзной шутки."],
      sr: ["Или сасвим неозбиљна шала."],
      cs: ["Nebo úplně nevážný vtip."],
      en: ["Or a completely silly joke."],
    },
  },
  {
    id: 11,
    indicator: true,
    lines: {
      ru: ["В конце концов...", "не каждый человек может заболеть скиттлзтрянкой. 😄"],
      sr: ["На крају крајева...", "не може свако да се разболи од скитлс-богиња. 😄"],
      cs: ["Nakonec...", "ne každý může chytit skittles-neštovice. 😄"],
      en: ["After all…", "not everyone can come down with a case of skittle-pox. 😄"],
    },
  },
  {
    id: 12,
    indicator: true,
    lines: {
      ru: ["Это оно и есть — то самое умение замечать хорошее вокруг."],
      sr: ["То је то — та способност да примећујеш лепо око себе."],
      cs: ["To je ono — ta schopnost všímat si dobrého kolem sebe."],
      en: ["That's exactly it — that gift for noticing the good around you."],
    },
    button: {
      ru: "Ну вот и весь секрет!",
      sr: "Ето, то је цела тајна!",
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
        "А некад си сама отишла у Чешку.",
        "Уписала факултет.",
        "И успешно га завршила!",
      ],
      cs: [
        "A kdysi jsi sama odjela do Česka.",
        "Nastoupila na univerzitu.",
        "A úspěšně ji dokončila!",
      ],
      en: [
        "And once, you moved to Czechia all on your own.",
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
      sr: ["Лепе приче скоро увек почињу одлукама које испрва делују помало застрашујуће."],
      cs: ["Krásné příběhy skoro vždy začínají rozhodnutími, která zprvu působí trochu děsivě."],
      en: ["Beautiful stories almost always begin with decisions that feel a little scary at first."],
    },
  },
  {
    id: 15,
    indicator: true,
    lines: {
      ru: ["Смелость выбирать то, что откликается внутри, — кажется, у тебя это уже получается."],
      sr: ["Храброст да бираш оно што ти одзвања изнутра — чини се да ти то већ полази за руком."],
      cs: ["Odvaha vybírat si to, co v tobě rezonuje — zdá se, že ti to už jde."],
      en: ["The courage to choose what resonates inside — seems like you've already got the hang of it."],
    },
  },
  {
    id: 16,
    indicator: true,
    lines: {
      ru: ["Мечты превращаются в новые города, новые истории, новые воспоминания — по-моему, это как раз твой почерк."],
      sr: ["Снови се претварају у нове градове, нове приче, нове успомене — по мени, то је баш твој рукопис."],
      cs: ["Sny se proměňují v nová města, nové příběhy, nové vzpomínky — podle mě je to přesně tvůj rukopis."],
      en: ["Dreams turn into new cities, new stories, new memories — that's your signature, I think."],
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
        "То хоћу да кажем…",
        "Већ ти толико тога полази за руком. Даље се може само пожелети — нека тога буде још више.",
      ],
      cs: [
        "Tím chci říct…",
        "Už se ti daří tolik věcí. Dál lze jen popřát — ať je toho ještě víc.",
      ],
      en: [
        "What I'm getting at…",
        "You've already got so much going for you. All that's left to wish is — may there be even more.",
      ],
    },
  },
  {
    id: 18,
    indicator: true,
    lines: {
      ru: ["А теперь можно сказать главное."],
      sr: ["А сада могу да кажем оно најважније."],
      cs: ["A teď můžu říct to hlavní."],
      en: ["And now I can say the main thing."],
    },
    button: {
      ru: "Не томи!",
      sr: "Не мучи ме!",
      cs: "Netrap mě!",
      en: "Don't keep me waiting!",
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
