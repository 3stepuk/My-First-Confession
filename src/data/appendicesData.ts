import { ExaminationCategory, ConfessionStep, PrayerItem, ReadinessItem } from '../types';

export const EXAMINATION_CATEGORIES: ExaminationCategory[] = [
  {
    id: "loving-god",
    title: "Loving God",
    items: [
      {
        id: "lg-1",
        text: "Have I remembered God in prayer, or deliberately refused to pray?"
      },
      {
        id: "lg-2",
        text: "Have I missed Sunday Mass through my own fault?"
      },
      {
        id: "lg-3",
        text: "Have I used God's holy name carelessly or disrespectfully?"
      },
      {
        id: "lg-4",
        text: "Have I treated holy things, the church or the sacraments without reverence?"
      },
      {
        id: "lg-5",
        text: "Have I been ashamed of my Catholic faith or joined in mocking it?"
      }
    ]
  },
  {
    id: "home-duties",
    title: "At home and in my duties",
    items: [
      {
        id: "hd-1",
        text: "Have I deliberately disobeyed my parents or those rightly responsible for me?"
      },
      {
        id: "hd-2",
        text: "Have I spoken rudely, shouted or refused reasonable help?"
      },
      {
        id: "hd-3",
        text: "Have I neglected schoolwork or another duty through laziness?"
      },
      {
        id: "hd-4",
        text: "Have I been ungrateful for the care and gifts I receive?"
      },
      {
        id: "hd-5",
        text: "Have I tried to make peace after an argument?"
      }
    ]
  },
  {
    id: "kindness-respect",
    title: "Kindness and respect",
    items: [
      {
        id: "kr-1",
        text: "Have I hit, bullied, threatened or deliberately frightened someone?"
      },
      {
        id: "kr-2",
        text: "Have I encouraged others to exclude or humiliate someone?"
      },
      {
        id: "kr-3",
        text: "Have I held on to anger or refused to forgive?"
      },
      {
        id: "kr-4",
        text: "Have I been cruel to a person, an animal or someone weaker than me?"
      },
      {
        id: "kr-5",
        text: "Have I failed to help when I reasonably could?"
      }
    ]
  },
  {
    id: "truth-justice",
    title: "Truth and justice",
    items: [
      {
        id: "tj-1",
        text: "Have I told a lie, blamed someone falsely or cheated?"
      },
      {
        id: "tj-2",
        text: "Have I gossiped, shared a secret or damaged someone's good name?"
      },
      {
        id: "tj-3",
        text: "Have I taken or damaged something that was not mine?"
      },
      {
        id: "tj-4",
        text: "Have I returned borrowed things and tried to repair damage?"
      },
      {
        id: "tj-5",
        text: "Have I been unfair in games, schoolwork or online activity?"
      }
    ]
  },
  {
    id: "purity-selfcontrol",
    title: "Purity, gratitude and self-control",
    items: [
      {
        id: "ps-1",
        text: "Have I treated my own body and other people's bodies with respect?"
      },
      {
        id: "ps-2",
        text: "Have I deliberately looked at or shared something I knew was indecent?"
      },
      {
        id: "ps-3",
        text: "Have I respected the privacy and personal boundaries of others?"
      },
      {
        id: "ps-4",
        text: "Have I been jealous of another person's gifts, friends or possessions?"
      },
      {
        id: "ps-5",
        text: "Have I been greedy, wasteful or unwilling to share?"
      },
      {
        id: "ps-6",
        text: "Have I lost self-control with food, games, screens or entertainment?"
      }
    ]
  }
];

export const CONFESSION_STEPS: ConfessionStep[] = [
  {
    step: 1,
    title: "Prepare",
    whatHappens: "Prepare your heart",
    whatIDo: "Examine your conscience, ask for true sorrow and choose to speak honestly."
  },
  {
    step: 2,
    title: "Enter and begin",
    whatHappens: "The priest welcomes you",
    whatIDo: "Make the Sign of the Cross. You may say: \"Bless me, Father, for I have sinned. This is my first Confession.\""
  },
  {
    step: 3,
    title: "Confess your sins",
    whatHappens: "State your sins to the priest",
    whatIDo: "Tell your sins simply and clearly. You may finish: \"For these and all my sins, I am truly sorry.\""
  },
  {
    step: 4,
    title: "Listen",
    whatHappens: "The priest speaks with counsel",
    whatIDo: "Listen to the priest's advice. Accept the penance he gives you. Ask if you do not understand."
  },
  {
    step: 5,
    title: "Pray",
    whatHappens: "Act of Contrition",
    whatIDo: "Make your Act of Contrition when the priest invites you."
  },
  {
    step: 6,
    title: "Receive absolution",
    whatHappens: "Christ forgives you through the priest",
    whatIDo: "Listen prayerfully. Make the Sign of the Cross as the priest absolves you. Answer, \"Amen.\""
  },
  {
    step: 7,
    title: "Give thanks",
    whatHappens: "Dismissal and peace",
    whatIDo: "The priest dismisses you in peace. Do your penance as soon as possible and thank God for his mercy."
  }
];

export const DIALOGUE_PRACTICE = [
  { speaker: "Child", text: "Bless me, Father, for I have sinned. This is my first Confession." },
  { speaker: "Child", text: "These are my sins: [name your sins simply and honestly]..." },
  { speaker: "Child", text: "For these and all my sins, I am truly sorry." },
  { speaker: "Priest", text: "[The priest gives gentle advice and a penance, then invites you to pray the Act of Contrition.]" },
  { speaker: "Child", text: "O my God, I am very sorry that I have sinned against you, and by the help of your grace I will not sin again. Amen." },
  { speaker: "Priest", text: "[The priest gives absolution: '...I absolve you from your sins, in the name of the Father, and of the Son, and of the Holy Spirit.']" },
  { speaker: "Child", text: "Amen." }
];

export const PRAYERS_DATA: PrayerItem[] = [
  {
    id: "sign-of-cross",
    title: "The Sign of the Cross",
    label: "PRAY",
    text: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen."
  },
  {
    id: "lords-prayer",
    title: "The Lord's Prayer (Our Father)",
    label: "PRAY",
    text: "Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen."
  },
  {
    id: "hail-mary",
    title: "The Hail Mary",
    label: "PRAY",
    text: "Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen."
  },
  {
    id: "glory-be",
    title: "The Glory Be",
    label: "PRAY",
    text: "Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen."
  },
  {
    id: "act-of-contrition",
    title: "Act of Contrition",
    label: "PRAY",
    text: "O my God, I am very sorry that I have sinned against you, and by the help of your grace I will not sin again. Amen."
  },
  {
    id: "before-examination",
    title: "Before examining my conscience",
    label: "PRAY",
    text: "Come, Holy Spirit. Give me light to know my sins, sorrow to repent of them, honesty to confess them and strength to amend my life. Amen."
  },
  {
    id: "after-confession",
    title: "After Confession",
    label: "PRAY",
    text: "Merciful Father, thank you for forgiving me through your Son. Help me to do my penance, repair any harm and remain close to you. Through Christ our Lord. Amen."
  },
  {
    id: "guardian-angel",
    title: "Prayer to my guardian angel",
    label: "PRAY",
    text: "Angel of God, my guardian dear, to whom God's love commits me here, ever this day be at my side, to light and guard, to rule and guide. Amen."
  }
];

export const READINESS_ITEMS: ReadinessItem[] = [
  {
    id: "r-1",
    area: "God and mercy",
    looksLike: "The child knows that God loves us, that sin is real and that Jesus offers forgiveness."
  },
  {
    id: "r-2",
    area: "Moral understanding",
    looksLike: "The child can usually distinguish a deliberate wrong choice from an accident, mistake, temptation or action without freedom."
  },
  {
    id: "r-3",
    area: "Sacramental understanding",
    looksLike: "The child knows that sins are confessed to a priest and that God forgives through sacramental absolution."
  },
  {
    id: "r-4",
    area: "Acts of the penitent",
    looksLike: "The child understands examination, contrition, honest confession, amendment and penance at an age-appropriate level."
  },
  {
    id: "r-5",
    area: "Practical confidence",
    looksLike: "The child can make the Sign of the Cross, name remembered sins simply, pray an Act of Contrition and follow gentle prompts."
  },
  {
    id: "r-6",
    area: "Freedom and safety",
    looksLike: "The child is not being pressured to invent sins or disclose them publicly and knows how to seek help from a safe adult outside Confession."
  },
  {
    id: "r-7",
    area: "Pastoral judgement",
    looksLike: "Parents, catechists and the parish priest have had a reasonable opportunity to support the child and address evident difficulties."
  }
];

export const SOURCES_DATA = {
  scripture: "Sacred Scripture. References are given throughout. Short quotations follow the English Standard Version - Catholic Edition.",
  ccc: "Catechism of the Catholic Church. Nos. 1420-1498 on Penance and Reconciliation; 1730-1748 on freedom; 1776-1802 on conscience; 1846-1876 on sin; 1987-2029 on grace and justification.",
  compendium: "Compendium of the Catechism of the Catholic Church. Questions 291-312 on the sacraments of healing.",
  canonLaw: "Code of Canon Law. Canons 914, 959-997, especially 959, 987-989 and 983-984; canon 827 on catechetical publications.",
  rite: "Rite of Penance. Introduction and Rite for Reconciliation of Individual Penitents.",
  deharbe: "Joseph Deharbe, S.J.. A Full Catechism of the Catholic Religion, English translation by John Fander (London, 1863), especially pp. 277-293.",
  doctrinalStandard: "Where local practice or terminology differs, the approved liturgical books, diocesan policy and the directions of the parish priest govern practical preparation. No text in this draft should be interpreted contrary to the Catechism of the Catholic Church or the competent ecclesiastical authority."
};
