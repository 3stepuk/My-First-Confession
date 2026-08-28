import { Lesson } from '../types';

export const LESSONS_DATA: Lesson[] = [
  {
    id: 1,
    title: "God Made Me and Loves Me",
    remember: "I am made by God, loved by God and called to live with him for ever.",
    explanation: [
      "God made the whole world out of love. He made every human person in his image and likeness. This means that we can know what is true, choose what is good, love God and one another, and receive his friendship.",
      "God knows us completely. Nothing is hidden from him, yet he does not stop loving us when we have done wrong. He calls us to return to him and gives us the grace to begin again.",
      "Our conscience is a judgement of reason by which we recognise whether something we are about to do, or have already done, is good or wrong. We must form our conscience by listening to God's word and the teaching of the Church."
    ],
    talkAboutIt: {
      question: "If God already knows everything about you — even the things you do wrong — why don't you need to hide from him?",
      guide: "God knows us completely and still loves us; when we do wrong, he calls us back rather than abandoning us."
    },
    questions: [
      {
        id: 1,
        question: "Who made you?",
        answer: "God made me."
      },
      {
        id: 2,
        question: "Why did God make you?",
        answer: "God made me to know him, love him and serve him in this life, and to be happy with him for ever in heaven."
      },
      {
        id: 3,
        question: "In whose image are human beings made?",
        answer: "Human beings are made in the image and likeness of God."
      },
      {
        id: 4,
        question: "Does God know and love you?",
        answer: "Yes. God knows me completely and loves me with a faithful love."
      },
      {
        id: 5,
        question: "What is conscience?",
        answer: "Conscience is the judgement by which I recognise whether a choice is good or wrong."
      }
    ],
    prayer: "Father in heaven, thank you for making me and loving me. Help me to know what is good and to choose it freely. Amen.",
    action: {
      type: "TO BEGIN",
      instruction: "Make the Sign of the Cross slowly each morning and thank God for one person or gift in your life."
    }
  },
  {
    id: 2,
    title: "Jesus Saves Me from Sin",
    remember: "Jesus died and rose again to save us from sin and bring us home to the Father.",
    explanation: [
      "God created our first parents in holiness and friendship with him. They freely disobeyed God. Through this first sin, human nature was wounded and every person, except the Blessed Virgin Mary by a special grace, is conceived without the original holiness God intended.",
      "The Father did not abandon us. He sent his eternal Son. Jesus Christ is true God and true man. By his obedient life, his Death on the Cross and his Resurrection, Jesus conquered sin and death and opened the way to eternal life.",
      "Every time we repent, we are responding to the grace won for us by Christ. In Confession we do not hide from Jesus. We come to the Saviour who already knows us and gave his life for us."
    ],
    talkAboutIt: {
      question: "Look at a crucifix. What does the Cross tell us about how much Jesus wants sinners to come back to God?",
      guide: "Jesus did not merely tell us that God forgives; he gave himself for us, died and rose, conquered sin and opened the way back to the Father."
    },
    questions: [
      {
        id: 1,
        question: "What is original sin?",
        answer: "Original sin is the state in which we are born without the original holiness lost by our first parents."
      },
      {
        id: 2,
        question: "Who is Jesus Christ?",
        answer: "Jesus Christ is the eternal Son of God made man, true God and true man."
      },
      {
        id: 3,
        question: "Why did Jesus die on the Cross?",
        answer: "Jesus died for our sins and offered himself to the Father for our salvation."
      },
      {
        id: 4,
        question: "What happened on the third day?",
        answer: "Jesus rose from the dead in glory."
      },
      {
        id: 5,
        question: "Why can we hope for forgiveness?",
        answer: "We can hope because Jesus has conquered sin and offers us his mercy."
      }
    ],
    prayer: "Jesus, my Saviour, you loved me and gave yourself for me. Help me to trust your mercy and turn away from sin. Amen.",
    action: {
      type: "AS OFTEN AS YOU CAN",
      instruction: "Look at a crucifix and say: \"Jesus, thank you for loving me.\""
    }
  },
  {
    id: 3,
    title: "Baptism and the Life of Grace",
    remember: "In Baptism God made me his child and gave me the new life of grace.",
    explanation: [
      "Baptism is the first sacrament. It frees us from original sin and from every personal sin committed before Baptism. It gives sanctifying grace, makes us adopted children of the Father, joins us to Christ and makes us members of his Church.",
      "Grace is God's free gift of his own life and help. Sanctifying grace is the stable gift that makes the soul holy and pleasing to God. Actual grace is God's help to know and do what is good.",
      "After Baptism we remain free and can still sin. Venial sin wounds our friendship with God. Mortal sin destroys charity in the heart and causes the loss of sanctifying grace. The Sacrament of Penance restores sanctifying grace when it has been lost and strengthens us to resist sin."
    ],
    talkAboutIt: {
      question: "What changed when you were baptised, even though you probably looked exactly the same afterwards?",
      guide: "Baptism is not merely an outward ceremony. God gave us new life, sanctifying grace, made us his adopted children and joined us to Christ and his Church."
    },
    questions: [
      {
        id: 1,
        question: "What is Baptism?",
        answer: "Baptism is the sacrament that frees us from sin, gives us new life in Christ and makes us members of the Church."
      },
      {
        id: 2,
        question: "What is grace?",
        answer: "Grace is God's free gift of his life and his help."
      },
      {
        id: 3,
        question: "What is sanctifying grace?",
        answer: "Sanctifying grace is the gift that makes us holy and enables us to share in God's life."
      },
      {
        id: 4,
        question: "Can a baptised person still sin?",
        answer: "Yes. After Baptism we must continue to choose good and resist temptation."
      },
      {
        id: 5,
        question: "What restores sanctifying grace after mortal sin?",
        answer: "The Sacrament of Penance restores sanctifying grace when it is received with the right dispositions."
      }
    ],
    prayer: "Holy Spirit, live in me and help me to remember that I belong to Christ. Strengthen me to choose what is good. Amen.",
    action: {
      type: "TODAY",
      instruction: "Ask when and where you were baptised. Thank God for your Baptism and pray for your godparents."
    }
  },
  {
    id: 4,
    title: "God's Commandments Teach Me to Love",
    remember: "God's law shows me how to love God and my neighbour.",
    explanation: [
      "God gave the Ten Commandments because he loves us and wants us to be free for what is good. They are not a collection of traps. They protect our friendship with God, the dignity of every person, family life, truth, purity, justice and peace.",
      "Jesus brought the commandments to fulfilment. He taught that the greatest commandments are to love God with all our heart and to love our neighbour as ourselves. He also gave us the new commandment: to love one another as he has loved us.",
      "Love is more than a feeling. Christian love chooses the true good of another person. Sometimes love means helping, forgiving, telling the truth, obeying a rightful instruction or courageously refusing what is wrong."
    ],
    talkAboutIt: {
      question: "Suppose your friend wants to do something you know is wrong. Would loving your friend mean going along with it? Why or why not?",
      guide: "Love is not simply being agreeable or having nice feelings. Sometimes genuine love means saying no, telling the truth or doing something difficult because we want what is truly good for another person."
    },
    questions: [
      {
        id: 1,
        question: "Why did God give the commandments?",
        answer: "God gave the commandments to teach us the way of love and lead us to true freedom and happiness."
      },
      {
        id: 2,
        question: "What is the greatest commandment?",
        answer: "We must love the Lord our God with all our heart, soul and mind."
      },
      {
        id: 3,
        question: "What is the second great commandment?",
        answer: "We must love our neighbour as ourselves."
      },
      {
        id: 4,
        question: "What new commandment did Jesus give?",
        answer: "Jesus commanded us to love one another as he has loved us."
      },
      {
        id: 5,
        question: "Is love only a feeling?",
        answer: "No. Love chooses and does what is truly good."
      }
    ],
    prayer: "Lord Jesus, teach me to love as you love. Help me to obey God, speak the truth, forgive others and choose what is good. Amen.",
    action: {
      type: "THIS WEEK",
      instruction: "Choose one hidden act of kindness and do it without asking for praise."
    }
  },
  {
    id: 5,
    title: "What Is Sin?",
    remember: "Sin is a freely chosen offence against God and a wound to ourselves, our neighbour and the Church.",
    explanation: [
      "A sin is a thought, word, action or omission freely chosen against God's law. We can sin by doing what is wrong or by refusing to do a good thing that we truly ought to do. A temptation is not itself a sin. An unwanted thought or feeling is not a sin unless we freely welcome or choose it. An accident, a simple mistake or something done without freedom is not the same as a deliberate sin.",
      "For a sin to be mortal, three things must be present together: the matter is serious (breaking one of the 10 commandments, for example), the person knows that it is seriously wrong, and the person freely chooses it. Venial sin concerns less serious matter, or is committed without full knowledge or complete consent. We should avoid every sin, but we should not become frightened or scrupulous. God sees the truth of the heart."
    ],
    talkAboutIt: {
      question: "Imagine three children: one breaks a cup by accident; one feels tempted to break it but doesn't; one deliberately throws it on the floor because they are angry. Are those three things the same? Why not?",
      guide: "An accident is not a deliberate sin; temptation is not itself sin; sin involves freely choosing what we know to be wrong. (This is probably the most important discussion in the Confession course.)"
    },
    specialNote: {
      label: "BE AT PEACE",
      text: "You are not guilty of another person's sin against you. If someone has hurt, frightened or harmed you, tell a trusted safe adult outside Confession. It is not your fault."
    },
    questions: [
      {
        id: 1,
        question: "What is sin?",
        answer: "Sin is a thought, word, action or omission freely chosen against God's law."
      },
      {
        id: 2,
        question: "Is temptation itself a sin?",
        answer: "No. Temptation becomes sin only when we freely consent to what is wrong."
      },
      {
        id: 3,
        question: "What three things are required for mortal sin?",
        answer: "There must be serious matter, full knowledge and deliberate consent."
      },
      {
        id: 4,
        question: "What is venial sin?",
        answer: "Venial sin is a less serious sin, or a sin committed without full knowledge or complete consent."
      },
      {
        id: 5,
        question: "Why should we avoid venial sin?",
        answer: "Venial sin wounds charity, weakens us and can lead us towards more serious sin."
      }
    ],
    prayer: "Jesus, give me light to know what is wrong, courage to refuse temptation and trust in you when I have sinned. Amen.",
    action: {
      type: "REFLECTION",
      instruction: "Remember always that God looks with kindness at your heart. Never be afraid to be completely honest with Him."
    }
  },
  {
    id: 6,
    title: "God Calls Me to Conversion",
    remember: "Conversion means turning away from sin and returning to God with hope in his mercy.",
    explanation: [
      "Jesus began his preaching with the call: \"Repent and believe in the gospel\" (Mark 1:15). Repentance is not merely feeling bad. It is a change of heart, made possible by grace, in which we turn away from sin and turn towards God.",
      "Jesus showed the Father's mercy in the parable of the lost son. The son recognised his sin and returned home. His father saw him, ran to meet him and welcomed him. God's mercy does not say that sin is unimportant. Mercy heals us because sin is real and because God's love is greater.",
      "We should never despair. Shame may tell us to hide, but grace tells us to return. A good Confession begins with trust: God already knows the truth, wants our salvation and gives us the courage to speak honestly."
    ],
    talkAboutIt: {
      question: "When the lost son came home, why do you think his father ran to meet him instead of making him stand outside?",
      guide: "Conversion means genuinely turning away from sin, but we return with hope rather than despair because God desires to forgive and heal us."
    },
    questions: [
      {
        id: 1,
        question: "What is conversion?",
        answer: "Conversion is turning away from sin and returning to God."
      },
      {
        id: 2,
        question: "Who gives us the grace to repent?",
        answer: "The Holy Spirit moves our hearts and gives us the grace to repent."
      },
      {
        id: 3,
        question: "Should shame make us hide from God?",
        answer: "No. We should trust God's mercy and return to him honestly."
      },
      {
        id: 4,
        question: "Does mercy pretend that sin does not matter?",
        answer: "No. Mercy forgives and heals the sinner who turns back to God."
      },
      {
        id: 5,
        question: "What short prayer can a sinner make?",
        answer: "\"God, be merciful to me, a sinner!\" (Luke 18:13)."
      }
    ],
    prayer: "Father of mercy, when I have wandered from you, help me to return quickly. Give me a humble and trusting heart. Amen.",
    action: {
      type: "THIS WEEK",
      instruction: "Read or listen to the parable of the lost son in Luke 15:11-32."
    }
  },
  {
    id: 7,
    title: "Jesus Gave Us the Sacrament of Penance",
    remember: "In this sacrament the risen Jesus forgives sins through the ministry of a priest and reconciles us with the Church.",
    explanation: [
      "On Easter Day the risen Jesus breathed the Holy Spirit upon the apostles and gave them authority to forgive sins (John 20:19-23). This ministry continues in the bishops and priests of the Church.",
      "Only God can forgive sins. In the sacrament, Christ himself acts through the priest. The priest listens, gives counsel, proposes a penance and gives absolution. Through absolution God forgives the sins confessed with true repentance and reconciles the penitent with the Church.",
      "This sacrament has several names. It is called Penance because it calls us to conversion and reparation; Confession because we confess our sins; Forgiveness because God pardons us; and Reconciliation because friendship with God and communion with the Church are restored."
    ],
    talkAboutIt: {
      question: "In Confession you can see and hear the priest. So how can we say that it is Jesus who forgives you?",
      guide: "Christ entrusted his ministry of forgiveness to the Apostles; that ministry continues through bishops and priests, and Christ acts through the priest in the sacrament."
    },
    specialNote: {
      label: "THE SEAL OF CONFESSION",
      text: "The priest may never reveal what he learns in Confession. The sacramental seal is absolute."
    },
    questions: [
      {
        id: 1,
        question: "Who instituted the Sacrament of Penance?",
        answer: "Jesus Christ instituted the Sacrament of Penance."
      },
      {
        id: 2,
        question: "To whom did Jesus first give authority to forgive sins?",
        answer: "Jesus gave this authority to his apostles."
      },
      {
        id: 3,
        question: "Who exercises this ministry in the Church?",
        answer: "Bishops and priests exercise the ministry of sacramental forgiveness."
      },
      {
        id: 4,
        question: "Who forgives sins in the sacrament?",
        answer: "God forgives sins through the absolution given by the priest in the name of Christ and the Church."
      },
      {
        id: 5,
        question: "What does this sacrament restore?",
        answer: "It restores friendship with God, reconciles us with the Church and gives peace of conscience and spiritual strength."
      }
    ],
    prayer: "Risen Lord Jesus, thank you for giving your Church the ministry of forgiveness. Help me to receive this sacrament with faith and honesty. Amen.",
    action: {
      type: "PASTORAL ACTION",
      instruction: "Thank Jesus in your personal prayer for establishing the sacrament of forgiveness for all of us."
    }
  },
  {
    id: 8,
    title: "Contrition and a Firm Purpose",
    remember: "I must be truly sorry for sin and sincerely intend, with God's help, to avoid it.",
    explanation: [
      "Contrition is sorrow for sin together with hatred of the sin committed and a resolution not to sin again. Contrition must come from faith and grace. It is more than embarrassment about being caught or fear of another person's anger. Perfect contrition arises from love of God above all things. Imperfect contrition arises from other true and supernatural motives, such as recognising the ugliness of sin or fearing its just consequences. Imperfect contrition is also a gift of God and disposes us to receive forgiveness in the sacrament.",
      "A firm purpose of amendment means that we sincerely intend to avoid sin and the near occasions that lead us into it. It does not mean that we can guarantee we will never fail again. We promise to try with God's grace and to use practical means to change."
    ],
    talkAboutIt: {
      question: "What's the difference between saying \"I'm sorry I did it\" and saying \"I'm sorry I got caught\"?",
      guide: "Real contrition concerns the wrong we have done before God, not merely embarrassment or fear of punishment. A genuine purpose of amendment means sincerely wanting to change with God's help, not promising that we will never make another mistake."
    },
    questions: [
      {
        id: 1,
        question: "What is contrition?",
        answer: "Contrition is sorrow for sin, hatred of the sin committed and a resolution not to sin again."
      },
      {
        id: 2,
        question: "What is perfect contrition?",
        answer: "Perfect contrition is sorrow for sin because we love God above all things and are sorry to have offended him."
      },
      {
        id: 3,
        question: "What is imperfect contrition?",
        answer: "Imperfect contrition is sorrow arising from another true supernatural motive, such as the ugliness of sin or fear of its consequences."
      },
      {
        id: 4,
        question: "What is a firm purpose of amendment?",
        answer: "It is a sincere intention, with God's help, to avoid sin and the occasions that lead to it."
      },
      {
        id: 5,
        question: "Must we be certain that we will never sin again?",
        answer: "No. We must sincerely intend to change and rely upon God's grace."
      }
    ],
    prayer: "O my God, because you are so good, I am very sorry that I have sinned against you, and by the help of your grace I will not sin again. Amen.",
    action: {
      type: "THIS WEEK",
      instruction: "Choose one practical change that will help you avoid a repeated fault."
    }
  },
  {
    id: 9,
    title: "Examining My Conscience",
    remember: "Before Confession I ask the Holy Spirit to help me remember my sins honestly and peacefully.",
    explanation: [
      "An examination of conscience is a prayerful review of our choices since our last good Confession. Before a first Confession, we think about the sins we remember from the time we became able to understand and choose right and wrong.",
      "We examine ourselves in the light of God's commandments, the teaching of Jesus and the duties of our age and state of life. We ask what we have done and what good we have deliberately failed to do.",
      "We should be honest but not anxious. We are not required to remember the impossible. Mortal sins must be confessed in kind and number (what kind of sin and how many times it has been committed) as far as we can remember after a careful examination. Venial sins may be confessed and doing so is very helpful, but we need not produce a long list of tiny faults."
    ],
    talkAboutIt: {
      question: "Why do you think we ask the Holy Spirit to help us before we try to remember our sins?",
      guide: "An examination of conscience is prayer, not anxious fault-finding. We ask God for light so that we can see ourselves truthfully and peacefully. We need honesty, not a perfect memory."
    },
    specialNote: {
      label: "BE HONEST, NOT AFRAID",
      text: "God asks for a sincere examination, not a perfect memory. Do not keep repeating an examination once it has been made carefully."
    },
    questions: [
      {
        id: 1,
        question: "What is an examination of conscience?",
        answer: "It is a prayerful review of our thoughts, words, actions and omissions in order to recognise our sins."
      },
      {
        id: 2,
        question: "What light guides our examination?",
        answer: "God's commandments, the teaching of Jesus and the duties of our life guide us."
      },
      {
        id: 3,
        question: "Must mortal sins be confessed?",
        answer: "Yes. Every remembered mortal sin must be confessed in kind and number as far as possible."
      },
      {
        id: 4,
        question: "Must venial sins be confessed?",
        answer: "No, but the Church strongly recommends the regular confession of venial sins."
      },
      {
        id: 5,
        question: "What if we honestly forget a sin?",
        answer: "A sin honestly forgotten is forgiven with the other sins; if it was mortal and is later remembered, it should be mentioned in the next Confession."
      }
    ],
    prayer: "Come, Holy Spirit. Give me light to know my sins, sorrow to repent of them, honesty to confess them and strength to amend my life. Amen.",
    action: {
      type: "PRACTICE",
      instruction: "Visit Appendix A in this app to try the Child's Examination of Conscience quietly with your parent or mentor."
    }
  },
  {
    id: 10,
    title: "Making a Good Confession",
    remember: "I confess my sins simply, honestly and clearly, trusting in Jesus.",
    explanation: [
      "The priest will welcome you and help you. Begin with the Sign of the Cross. You may say: \"Bless me, Father, for I have sinned. This is my first Confession.\" Then confess your sins without hiding them, blaming others or adding unnecessary stories.",
      "The priest may ask a gentle question or give advice. He will give you a penance. Listen carefully and ask politely if you do not understand. Then make your Act of Contrition when he invites you.",
      "The priest extends his hand and gives absolution. Listen and make the Sign of the Cross as he says the essential words: \"I absolve you from your sins, in the name of the Father, and of the Son, and of the Holy Spirit.\" Answer, \"Amen.\" The priest then dismisses you in peace."
    ],
    talkAboutIt: {
      question: "If you forgot the words, became nervous or didn't know what to do in your First Confession, what could you do?",
      guide: "Simply tell the priest. He will help. A good Confession does not depend upon performing everything perfectly; the child needs to be sincere and honest."
    },
    specialNote: {
      label: "DO NOT WORRY",
      text: "The priest will guide you if you forget what to say. A first Confession does not have to sound perfect; it must be sincere."
    },
    questions: [
      {
        id: 1,
        question: "How should we confess our sins?",
        answer: "We should confess our sins simply, honestly, clearly and without blaming other people."
      },
      {
        id: 2,
        question: "What must never be deliberately concealed?",
        answer: "We must never deliberately conceal a mortal sin."
      },
      {
        id: 3,
        question: "What should we do after confessing our sins?",
        answer: "We listen to the priest's advice, accept a penance and make an Act of Contrition."
      },
      {
        id: 4,
        question: "What is absolution?",
        answer: "Absolution is the sacramental act by which Christ, through the priest, forgives our sins."
      },
      {
        id: 5,
        question: "What do we answer after absolution?",
        answer: "We answer, \"Amen.\""
      }
    ],
    prayer: "Jesus, give me courage to speak the truth and humility to receive your forgiveness with gratitude. Amen.",
    action: {
      type: "PRACTICE",
      instruction: "Read through Appendix B: Step by Step walkthrough and practice the simple dialogue with your parent or sponsor."
    }
  },
  {
    id: 11,
    title: "Absolution, Penance and a New Beginning",
    remember: "Christ forgives me in absolution, and I respond by doing my penance and repairing harm.",
    explanation: [
      "Absolution is the heart of the sacramental action. Through the words and ministry of the priest, the merciful Father forgives us because of the Death and Resurrection of his Son and the gift of the Holy Spirit.",
      "The penance given by the priest may be a prayer, a work of mercy, an act of self-denial or another good action. It helps repair the harm caused by sin and trains us in the way of holiness. We should do it carefully and as soon as reasonably possible.",
      "If our sin has harmed another person, true repentance includes a willingness to repair the harm when possible. Stolen property should be returned; lies should be corrected when prudent; and an apology or act of kindness may be needed. The priest can advise us."
    ],
    talkAboutIt: {
      question: "If you deliberately broke somebody's toy, would saying sorry to God mean that you no longer needed to put things right with the person?",
      guide: "God's forgiveness is real, but genuine repentance also makes us willing to repair harm where reasonably possible. Penance and satisfaction belong to our response to God's mercy."
    },
    specialNote: {
      label: "AFTER CONFESSION",
      text: "Do your penance, thank God quietly and leave the church with peaceful confidence in his mercy."
    },
    questions: [
      {
        id: 1,
        question: "What happens in absolution?",
        answer: "God forgives our sins and reconciles us with the Church through the ministry of the priest."
      },
      {
        id: 2,
        question: "What is satisfaction?",
        answer: "Satisfaction is repairing, as far as possible, the harm caused by sin and doing the penance given by the priest."
      },
      {
        id: 3,
        question: "When should we do our penance?",
        answer: "We should do our penance carefully and as soon as reasonably possible."
      },
      {
        id: 4,
        question: "What if we have harmed another person?",
        answer: "We should be willing to repair the harm as far as we reasonably can."
      },
      {
        id: 5,
        question: "What words of Jesus may we remember after forgiveness?",
        answer: "Jesus said, \"Your sins are forgiven\" (Luke 7:48)."
      }
    ],
    prayer: "Merciful Father, thank you for forgiving me. Help me to do my penance, repair the harm I have caused and walk in newness of life. Amen.",
    action: {
      type: "AFTER CONFESSION",
      instruction: "Do your penance, thank God quietly and leave the church with peaceful confidence in his mercy."
    }
  },
  {
    id: 12,
    title: "Living as a Forgiven Child of God",
    remember: "Confession gives me grace to begin again and to grow in holiness.",
    explanation: [
      "The Sacrament of Penance is not only for a first celebration. Christ gives it to the Church as a continuing medicine for the soul. Frequent Confession helps us form our conscience, resist temptation, grow in virtue and receive spiritual guidance.",
      "After Confession we should continue the ordinary means of Christian life: Sunday Mass, prayer each morning and evening, reading or listening to Scripture, acts of charity, obedience to our duties and asking help quickly when we are tempted.",
      "Those who have been forgiven must also learn to forgive. We may still need wise boundaries and adult help when another person has harmed us. Forgiveness does not mean pretending that harm was acceptable. It means refusing hatred and entrusting justice and healing to God."
    ],
    talkAboutIt: {
      question: "Why do you think Catholics go to Confession again after their First Confession?",
      guide: "Confession is not a ceremony we graduate from. Christ gives us the sacrament throughout life to forgive, strengthen, form our conscience and help us grow in holiness."
    },
    specialNote: {
      label: "MY NEXT STEP",
      text: "Ask your parent or catechist how often the parish offers Confession and choose a simple plan for receiving the sacrament regularly."
    },
    questions: [
      {
        id: 1,
        question: "Why should Catholics receive this sacrament regularly?",
        answer: "Regular Confession helps us grow in grace, form our conscience, resist sin and deepen our friendship with Christ."
      },
      {
        id: 2,
        question: "What ordinary practices help us grow in holiness?",
        answer: "Sunday Mass, daily prayer, Scripture, works of charity, obedience to duty and the sacraments help us grow."
      },
      {
        id: 3,
        question: "What should we do when temptation begins?",
        answer: "We should pray, turn away from the occasion and seek help from God and trusted people."
      },
      {
        id: 4,
        question: "Must Christians forgive?",
        answer: "Yes. Because Christ forgives us, we must ask for the grace to forgive others."
      },
      {
        id: 5,
        question: "What does Jesus tell the forgiven sinner?",
        answer: "Jesus calls the sinner to a new life: \"From now on sin no more\" (John 8:11)."
      }
    ],
    prayer: "Lord Jesus, keep me close to you. Help me to love what is good, return quickly when I fall and forgive others as you forgive me. Amen.",
    action: {
      type: "MY NEXT STEP",
      instruction: "Ask your parent or catechist how often the parish offers Confession and choose a simple plan for receiving the sacrament regularly."
    }
  }
];
