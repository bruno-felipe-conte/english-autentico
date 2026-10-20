import fs from 'fs';

const grammarPath = 'data/grammar.json';
const data = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));

// Onda 6 — Parte 2: Lições B2.6 a B2.10 (Dedução no Passado, Desejos com Wish, Futuros Avançados & Forma Causativa)
const wave6Part2Lessons = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 6: Modals of Deduction (Past)
  // ─────────────────────────────────────────────────────────────
  "b2-lez6": {
    "id": "b2-lez6",
    "num": "Lesson 6",
    "titulo": "Modals of Deduction (Past)",
    "subtitulo": "Must have, Can't have, Might have & Should have — A Arte da Especulação Retrospectiva",
    "cena": {
      "origem": "dialogo",
      "titulo": "The Detective at Baker Street",
      "texto": "**Inspector Lestrade:** The diamond necklace vanished from the locked safe last night, Holmes! The window was smashed from the inside, not the outside!\n**Sherlock Holmes:** Elementary, Lestrade. The thief **must have had** an accomplice inside the household. He **can't have broken** the glass from the garden, as there are no footprints in the flowerbeds.\n**Inspector Lestrade:** But what about the butler? He claims he was asleep on the top floor.\n**Sherlock Holmes:** He **might have been telling** the truth, or he **could have slipped** downstairs unnoticed. Either way, the security guards **should have checked** the rear entrance every thirty minutes!"
    },
    "fio": {
      "abertura": "No nível B1, aprendemos a fazer deduções no presente (*He must be at work / He can't be at home*). Mas na vida real, grande parte das nossas conversas sobre mistérios, atrasos, falhas e imprevistos acontece no passado: *O que aconteceu com meu pedido? Por que o cliente cancelou? Onde a Maria esqueceu a bolsa?*",
      "descoberta": "Observe o raciocínio dedutivo de Holmes: para certezas lógicas afirmativas no passado, ele usa «must have had»; para impossibilidades lógicas, usa «can't have broken» (nunca *must not have*!). Para possibilidades abertas, ele varia entre «might have been» e «could have slipped». E para uma crítica de dever descumprido, dispara «should have checked». Em todos os casos, a fórmula universal é: Modal + HAVE + Particípio Passado (V3)!",
      "fecho": "Ao dominar os modais perfeitos de dedução, você aprende a expressar graus exatos de certeza científica e probabilidade retrospectiva sem hesitação."
    },
    "alerta": "A maior armadilha de dedução no passado em inglês: para dizer que algo era 'impossível de ter acontecido', JAMAIS diga *'must not have done'*. O oposto lógico de 'must have done' (certeza afirmativa) é **CAN'T HAVE DONE** (ou *couldn't have done*)! *'Must not have'* significa 'deduzo que a pessoa preferiu não fazer'.",
    "definicao": {
      "fenomeno": "He must have forgotten his keys (certeza: com certeza esqueceu) · She can't have said that (impossibilidade: é impossível que tenha dito) · They might have taken the bus (possibilidade: talvez tenham pego) · You should have called me (crítica: você deveria ter me ligado)",
      "causa": "Por que usamos o infinitivo perfeito ('have + V3') após o verbo modal?",
      "conceito": "Como os verbos modais puros (must, can, may, might) não possuem conjugação de passado com -ed, a língua inglesa projeta a ideia de passado anexando o auxiliar 'HAVE' acompanhado do particípio do verbo principal."
    },
    "inventario": [
      "Must have + V3: certeza quase absoluta (95-99%) baseada em fortes evidências lógicas no passado",
      "Can't have / Couldn't have + V3: certeza de impossibilidade lógica no passado (é impossível que tenha acontecido)",
      "Might have / May have / Could have + V3: possibilidade de 30% a 50% (talvez tenha acontecido, não temos provas)",
      "Should have / Ought to have + V3: expectativa descumprida, conselho retrospectivo ou crítica de dever não realizado",
      "Shouldn't have + V3: repreensão por ter feito algo inadequado no passado (não deveria ter feito)",
      "Variação contínua: Modal + have been + -ing (ex: *He must have been sleeping*)"
    ],
    "tabela_visual": "| Modal Perfeito | Grau de Certeza | Função Semântica | Exemplo Prático |\n|---|---|---|---|\n| **Must have + V3** | **95% - 99% (Certeza Afirmativa)** | Dedução lógica irresistível no passado | *The ground is soaked. It **must have rained** heavily last night.* |\n| **Can't have + V3** | **95% - 99% (Impossibilidade)** | Certeza de que algo NÃO aconteceu | *He **can't have stolen** the car; he was with me in Manchester!* |\n| **May / Might have + V3** | **30% - 50% (Possibilidade)** | Especulação incerta (talvez sim, talvez não) | *She hasn't replied; she **might have missed** the train.* |\n| **Could have + V3** | **30% - 50% (Oportunidade / Dúvida)** | Habilidade passada não exercida ou possibilidade | *You **could have called** me! Why didn't you?* |\n| **Should have + V3** | **Crítica / Expectativa** | Dever moral não cumprido no passado | *You **should have submitted** the report before 5 PM.* |\n| **Shouldn't have + V3** | **Arrependimento / Reprovação** | Ação passada que foi um erro | *I **shouldn't have eaten** that entire spicy pizza.* |",
    "observacao_cards": [
      {
        "ingles": "Must have + V3",
        "traducao": "deve ter feito (com certeza)",
        "genero": "Dedução Positiva",
        "motivo": "Evidência incontestável: 'Her car is in the driveway; she must have arrived early'."
      },
      {
        "ingles": "Can't have + V3",
        "traducao": "não pode ter feito / impossível",
        "genero": "Dedução Negativa",
        "motivo": "Oposto lógico de 'must have'. 'She can't have passed the exam without studying' (é impossível que tenha passado)."
      },
      {
        "ingles": "Might have / Could have + V3",
        "traducao": "pode ter feito / talvez tenha",
        "genero": "Hipótese Aberta",
        "motivo": "Falta de informação conclusiva: 'I don't know where my wallet is; I might have left it in the taxi'."
      },
      {
        "ingles": "Should have + V3",
        "traducao": "deveria ter feito",
        "genero": "Crítica Retrospectiva",
        "motivo": "Não é dedução de fato, mas julgamento ético ou técnico: 'You should have backed up your computer files'."
      }
    ],
    "tecnica": {
      "titulo": "A Bússola da Dedução no Passado em 3 Perguntas",
      "passos": [
        "1. Você tem evidências concretas de que aconteceu? Se SIM, use MUST HAVE + V3.",
        "2. Você tem provas de que é fisicamente ou logicamente impossível que tenha acontecido? Se SIM, use CAN'T HAVE + V3.",
        "3. Você está apenas supondo sem certeza alguma? Use MIGHT HAVE / COULD HAVE + V3."
      ]
    },
    "teoria": "### A Teoria Aprofundada dos Modals of Deduction in the Past\n\nNo inglês avançado, a modalidade epistêmica expressa o compromisso do falante com a verdade de uma proposição. No passado, essa modalidade é sempre expressa pela combinação de um verbo modal com o infinitivo perfeito (`have + past participle`).\n\n#### 1. Dedução de Certeza Afirmativa: *Must have + V3*\nQuando todas as evidências convergem para uma única explicação lógica indiscutível:\n* *Exemplo:* \"Arthur's light is still on and his computer is running. He **must have fallen** asleep at his desk.\"\n* *Exemplo contínuo:* \"They didn't hear the doorbell because the music was blasting; they **must have been partying**.\"\n\n#### 2. Dedução de Impossibilidade Lógica: *Can't have* ou *Couldn't have + V3*\nEm inglês, a negação da dedução não é *must not have*, mas sim *can't have*. Usamos quando consideramos algo faticamente impossível ou contraditório com a realidade conhecida:\n* *Exemplo:* \"Sarah was in Tokyo all weekend, so you **can't have seen** her at the supermarket in Dublin yesterday!\"\n* *Exemplo:* \"The locked steel door wasn't damaged at all. The burglar **couldn't have entered** through the front entrance.\"\n\n#### 3. Especulação e Dúvida: *Might have*, *May have*, *Could have + V3*\nQuando há várias hipóteses concorrentes e o falante não possui dados para cravar nenhuma delas com segurança:\n* *Exemplo:* \"Where is Oliver? He **might have gone** to the bank, or he **could have stepped** out for lunch.\"\n* *Atenção com 'Could have':* Além de expressar especulação, *could have* também expressa uma **oportunidade que existiu no passado, mas que o sujeito escolheu não aproveitar**:\n  * *\"I could have gone to Oxford University, but I chose Cambridge instead.\"*\n\n#### 4. Julgamento Moral e Crítica: *Should have* e *Ought to have + V3*\nDiferente dos modais puramente dedutivos, *should have* avalia o que era o correto, esperado ou prudente a fazer, mas que lamentavelmente não ocorreu:\n* *Exemplo de crítica externa:* \"You **should have double-checked** the contract before signing it!\"\n* *Exemplo de arrependimento pessoal:* \"I **shouldn't have stayed** up until 3 AM binge-watching that TV series; I'm exhausted today.\"",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português, expressamos essas nuances com locuções verbais variadas ou com o futuro do pretérito:\n* *\"Ele **deve ter esquecido**\"* → *He must have forgotten.*\n* *\"Ela **não pode ter dito** isso\"* → *She can't have said that.*\n* *\"Ele **pode ter perdido** o trem\"* → *He might have missed the train.*\n* *\"Você **deveria ter avisado**\"* → *You should have warned us.*\n\n**Onde o brasileiro tropeça gravemente no inglês?**\n* **A armadilha do 'must not have':** No português, dizemos *\"ele não deve ter visto\"* quando achamos que a pessoa provavelmente não viu. Se o brasileiro traduz isso literalmente como *\"he must not have seen\"*, o nativo entende de forma diferente. Para expressar que é impossível ou altamente improvável que alguém tenha visto, a língua inglesa exige **he can't have seen**. Guarde com carinho: certeza negativa em inglês usa **CAN'T HAVE**!\n* **Omissão do 'have' na fala:** O brasileiro costuma tentar conjugar o modal: *\"he must saw\"* ou *\"he could had seen\"*. Em inglês, modais NUNCA mudam de forma e SEMPRE são seguidos pelo auxiliar **have** invariável.",
    "exemplos_prc": [
      {
        "pergunta": "Why wasn't Richard at the project kickoff meeting this morning?",
        "resposta": "He must have missed his flight from Berlin; there was a severe snowstorm across Germany overnight.",
        "contexto": "Deduzindo com segurança o motivo da ausência de um colega de trabalho internacional."
      },
      {
        "pergunta": "Is it possible that Jessica leaked the confidential financial projections?",
        "resposta": "No way! She can't have leaked them because she didn't even have access to that encrypted server.",
        "contexto": "Defendendo uma colega de uma acusação injusta com base na impossibilidade lógica."
      },
      {
        "pergunta": "Where did I put my car keys? I can't find them anywhere in the house!",
        "resposta": "You might have left them inside the car, or you could have dropped them when you unlocked the front door.",
        "contexto": "Ajudando um amigo a conjecturar sobre o paradeiro de um objeto perdido."
      }
    ],
    "armadilhas": [
      {
        "erro": "He must not have been in the building; he was in Australia at the time.",
        "correcao": "He can't have been in the building; he was in Australia at the time.",
        "explicacao": "Para indicar impossibilidade lógica comprovada no passado, usa-se 'can't have been' (ou couldn't have been), nunca 'must not have'."
      },
      {
        "erro": "You should have tell me that the deadline had changed.",
        "correcao": "You should have told me that the deadline had changed.",
        "explicacao": "Após 'should have', o verbo DEVE estar no Particípio Passado (told), nunca na forma base (tell)."
      },
      {
        "erro": "I must had lost my wallet at the restaurant.",
        "correcao": "I must have lost my wallet at the restaurant.",
        "explicacao": "O auxiliar após um verbo modal é SEMPRE a forma base 'have', nunca 'had'."
      }
    ],
    "coda": "When history leaves only clues, past modals of deduction are the deductive magnifying glass of the mind.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a dedução lógica afirmativa de certeza:\n\"The streets are completely white with fresh snow. It ___ heavily overnight.\"",
        "opcoes": [
          "must have snowed",
          "can't have snowed",
          "should snow",
          "must to snow"
        ],
        "resposta": "must have snowed",
        "explicacao": "A evidência visível da neve acumulada exige 'must have snowed' (certeza de que nevou)."
      },
      {
        "tipo": "escolha",
        "pergunta": "Indique a impossibilidade lógica no passado:\n\"Leo ___ the Mona Lisa yesterday; he was in Tokyo all week!\"",
        "opcoes": [
          "can't have seen",
          "must not have seen",
          "shouldn't have seen",
          "might not seen"
        ],
        "resposta": "can't have seen",
        "explicacao": "A impossibilidade de estar em dois lugares ao mesmo tempo é expressa com 'can't have seen'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com uma crítica de obrigação não cumprida:\n\"You ___ the oven off before leaving the house! We could have had a fire.\"",
        "opcoes": [
          "should have turned",
          "must have turned",
          "can't have turned",
          "might turn"
        ],
        "resposta": "should have turned",
        "explicacao": "'Should have turned' expressa o conselho retrospectivo / dever que não foi feito."
      },
      {
        "tipo": "escolha",
        "pergunta": "Selecione a opção que indica mera especulação ou incerteza no passado:",
        "opcoes": [
          "She might have forgotten to set her alarm clock.",
          "She must have set her alarm clock.",
          "She had to set her alarm clock.",
          "She shouldn't have set her alarm clock."
        ],
        "resposta": "She might have forgotten to set her alarm clock.",
        "explicacao": "'Might have forgotten' indica possibilidade incerta (talvez tenha esquecido)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no modal de certeza afirmativa antes de revelar:\n\n\"The cake in the fridge is completely gone. The kids ___ (must / eat) it!\"\n(O bolo na geladeira sumiu completamente. As crianças com certeza comeram!)",
        "resposta": "The cake in the fridge is completely gone. The kids must have eaten it!",
        "revelacao": "The cake in the fridge is completely gone. The kids must have eaten it!",
        "dica": "must have + particípio de eat (eaten)",
        "explicacao": "Dedução quase certa no passado: 'must have eaten'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no modal de impossibilidade antes de revelar:\n\n\"Arthur ___ (can / not / steal) the laptop; he wasn't even in the office on Friday.\"\n(O Arthur não pode ter roubado o notebook; ele nem estava no escritório na sexta-feira.)",
        "resposta": "Arthur can't have stolen the laptop; he wasn't even in the office on Friday.",
        "revelacao": "Arthur can't have stolen the laptop; he wasn't even in the office on Friday.",
        "dica": "can't have + particípio de steal (stolen)",
        "explicacao": "A impossibilidade lógica no passado é expressa por 'can't have stolen'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no conselho retrospectivo (deveria ter avisado) antes de revelar:\n\n\"If you were going to be late, you ___ (should / send) a quick message.\"\n(Se você ia se atrasar, você deveria ter enviado uma mensagem rápida.)",
        "resposta": "If you were going to be late, you should have sent a quick message.",
        "revelacao": "If you were going to be late, you should have sent a quick message.",
        "dica": "should have + particípio de send (sent)",
        "explicacao": "Crítica sobre um dever não realizado: 'should have sent'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no modal de possibilidade contínua antes de revelar:\n\n\"They didn't hear our phone calls yesterday afternoon; they ___ (might / sleep).\"\n(Eles não ouviram nossas ligações ontem à tarde; talvez estivessem dormindo.)",
        "resposta": "They didn't hear our phone calls yesterday afternoon; they might have been sleeping.",
        "revelacao": "They didn't hear our phone calls yesterday afternoon; they might have been sleeping.",
        "dica": "might have been + sleeping",
        "explicacao": "Para expressar ação contínua especulativa no passado, usamos 'might have been sleeping'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma base do auxiliar que acompanha o modal para indicar passado:\n\n\"She might ___ arrived by now, but I haven't seen her yet.\"",
        "resposta": "have",
        "explicacao": "A forma do auxiliar após o modal é sempre 'have'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o modal negativo contraído que expressa impossibilidade lógica:\n\n\"He ___ have known about the party; it was a total surprise!\" (não pode / impossível)",
        "resposta": "can't",
        "explicacao": "O modal de impossibilidade lógica é 'can't' (ou couldn't)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o particípio passado de 'lose' para completar a dedução:\n\n\"Where is my passport? I must have ___ it at the airport check-in desk!\"",
        "resposta": "lost",
        "explicacao": "O particípio passado de lose é 'lost'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o modal que expressa dever não cumprido / recomendação no passado:\n\n\"You ___ have worn a jacket; it is freezing outside today.\" (deveria)",
        "resposta": "should",
        "explicacao": "O modal para recomendação / crítica retrospectiva é 'should'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 7: Wish e If Only
  // ─────────────────────────────────────────────────────────────
  "b2-lez7": {
    "id": "b2-lez7",
    "num": "Lesson 7",
    "titulo": "Wish e If Only",
    "subtitulo": "Expressando Desejos, Frustrações e Arrependimentos nos Três Tempos",
    "cena": {
      "origem": "dialogo",
      "titulo": "Rainy Afternoon in Manchester",
      "texto": "**Liam:** Look at this endless pouring rain. I wish I lived in Southern Spain right now!\n**Chloe:** Tell me about it! If only we hadn't canceled our holiday to Mallorca last month.\n**Liam:** Exactly. That was such a foolish decision. And I wish my landlord would fix the leaking roof! It has been dripping in the kitchen for three days.\n**Chloe:** If only he cared as much about maintenance as he does about collecting the rent on time!"
    },
    "fio": {
      "abertura": "O ser humano passa grande parte da vida desejando que as coisas fossem diferentes: desejando ter mais tempo livre hoje, arrependendo-se de uma oportunidade recusada no ano passado, ou irritando-se com o comportamento inconveniente de alguém ao seu redor. Na língua inglesa, o verbo **WISH** e a expressão **IF ONLY** são os instrumentos de máxima precisão emocional para expressar esse anseio.",
      "descoberta": "Observe as três nuances distintas no diálogo de Liam e Chloe:\n1. «I wish I lived in Southern Spain» (desejo no presente: usa Past Simple);\n2. «If only we hadn't canceled our holiday» (arrependimento no passado: usa Past Perfect);\n3. «I wish my landlord would fix the roof» (irritação com a atitude de outra pessoa: usa WOULD + verbo base)!\nCada tempo verbal abre uma gaveta emocional específica.",
      "fecho": "A regra de ouro do Wish: o inglês sempre dá um passo para trás no tempo (*backshift*) para sinalizar que o desejo está distante da realidade concreta."
    },
    "alerta": "O erro mais punido e irritante: JAMAIS use 'wish + would' para falar de si mesmo! Dizer *'I wish I would have more money'* ou *'I wish I would be taller'* é um erro grave de gramática. 'Wish + would' expressa exclusivamente o desejo de que OUTRA PESSOA mude de comportamento ou que uma situação externa incontrolável mude!",
    "definicao": {
      "fenomeno": "I wish I knew the answer (desejo presente: queria saber agora) · I wish I had studied harder (arrependimento passado: queria ter estudado) · I wish you would stop shouting (reclamação presente/futura: queria que você parasse)",
      "causa": "Por que usamos tempos verbais de passado para falar de desejos atuais?",
      "conceito": "Porque o inglês emprega o chamado 'passado irreal' (*unreal past* / subjuntivo). O recuo temporal para o passado sinaliza psicologicamente o distanciamento da realidade: o fato não existe ou é o oposto do que você deseja."
    },
    "inventario": [
      "Wish / If Only + Past Simple: insatisfação com a realidade presente (ex: *I wish I had a car*)",
      "Uso de 'were' para todas as pessoas no presente: *I wish I were taller / I wish he were here* (norma culta)",
      "Wish / If Only + Past Perfect: arrependimento de uma ação passada imutável (ex: *I wish I had accepted that job*)",
      "Wish / If Only + WOULD + Base Form: reclamação e irritação sobre o comportamento de terceiros ou hábitos chatos",
      "Proibição absoluta de 'I wish I would' (use *I wish I could* para si mesmo)",
      "'If only' possui o mesmo valor gramatical de 'wish', porém com maior carga de dramaticidade poética e intensidade emocional"
    ],
    "tabela_visual": "| Estrutura | Tempo do Desejo | Significado Real Concreto | Exemplo Prático |\n|---|---|---|---|\n| **Wish + Past Simple** | **Presente** (Queria que fosse diferente agora) | Eu não sei falar alemão. | *I wish I **spoke** German.* |\n| **Wish + Were** | **Presente** (Estado de ser) | Eu não sou milionário. | *I wish I **were** a millionaire.* |\n| **Wish + Could** | **Presente** (Capacidade própria) | Eu não sei dançar salsa. | *I wish I **could dance** salsa.* (Nunca *I would*) |\n| **Wish + Past Perfect** | **Passado** (Arrependimento de algo que aconteceu) | Eu gastei todo o meu dinheiro ontem. | *I wish I **hadn't spent** all my money.* |\n| **Wish + Would** | **Reclamação de Comportamento** | Você fuma dentro de casa e isso me irrita. | *I wish you **would stop** smoking inside!* |\n| **If only... !** | **Desejo Intenso / Poético** | Lamentação profunda de presente ou passado. | *If only I **had listened** to my parents!* |",
    "observacao_cards": [
      {
        "ingles": "Wish + Past Simple (Presente)",
        "traducao": "queria que fosse / quem me dera",
        "genero": "Insatisfação Presente",
        "motivo": "Para desejar uma realidade diferente agora: 'I wish I lived near the beach' (moro longe da praia agora)."
      },
      {
        "ingles": "Wish + Past Perfect (Passado)",
        "traducao": "queria ter feito / me arrependo",
        "genero": "Arrependimento Retrospectivo",
        "motivo": "Para lamentar fatos históricos: 'I wish I had bought Apple shares in 2005'."
      },
      {
        "ingles": "Wish + Would (Reclamação)",
        "traducao": "queria que fulano parasse de...",
        "genero": "Irritação com Terceiros",
        "motivo": "Expressa aborrecimento com a vontade alheia: 'I wish my neighbor would turn down the music'."
      },
      {
        "ingles": "If Only (Mais Dramático)",
        "traducao": "Se ao menos... !",
        "genero": "Intensidade Emocional",
        "motivo": "Sinônimo mais enfático e apaixonado de 'I wish': 'If only I had known the truth earlier!'."
      }
    ],
    "tecnica": {
      "titulo": "A Escolha do Tempo com 'Wish' em 3 Passos",
      "passos": [
        "1. O seu desejo é sobre uma situação atual do presente? Use PAST SIMPLE (ou 'were').",
        "2. O seu desejo é sobre um arrependimento do passado? Use PAST PERFECT (had + V3).",
        "3. Você está irritado com o comportamento de outra pessoa e quer que ela mude? Use WOULD + Verbo Base (mas nunca use 'would' com sujeito 'I')."
      ]
    },
    "teoria": "### A Teoria Aprofundada de Wish e If Only\n\nAs estruturas com *wish* e *if only* expressam contrafatualidade psicológica. A gramática inglesa divide esses desejos em três categorias bem delineadas:\n\n#### 1. Desejos no Presente e no Futuro Imediato\nQuando estamos insatisfeitos com a situação presente e gostaríamos que a realidade agora fosse o oposto do que é:\n* **Fórmula:** `Sujeito + wish + (that) + sujeito + Past Simple`\n* *Fato:* I am short. → *Desejo:* **I wish I were taller.** (O subjuntivo 'were' é preferido na norma culta para todas as pessoas: *I wish he were here*).\n* *Fato:* I don't have a car. → *Desejo:* **I wish I had a car.**\n* *Habilidade própria:* Para desejar ter uma capacidade que você não tem hoje, use **could** (o passado de can): **I wish I could swim.**\n\n#### 2. Arrependimentos no Passado\nQuando olhamos para trás e nos arrependemos de uma ação ou omissão que já está no passado imutável:\n* **Fórmula:** `Sujeito + wish + (that) + sujeito + Past Perfect (had / had not + V3)`\n* *Fato:* I didn't tell her the truth. → *Arrependimento:* **I wish I had told her the truth.**\n* *Fato:* We bought this unreliable car. → *Arrependimento:* **I wish we hadn't bought this car.**\n\n#### 3. Reclamação sobre o Comportamento Alheio: *Wish + Would*\nEsta estrutura expressa que o falante está incomodado, impaciente ou irritado com o comportamento repetitivo de outra pessoa e deseja que ela mude de atitude:\n* **Fórmula:** `Sujeito + wish + outro sujeito + would + base form`\n* *Exemplo:* \"I wish you **would listen** to me when I'm speaking!\"\n* *Exemplo:* \"I wish the dog **would stop** barking next door.\"\n* *Condição da natureza:* Também podemos usar com fenômenos climáticos incontroláveis para expressar impaciência: \"I wish it **would stop** raining!\"\n* *Regra de Ouro:* **NUNCA diga *'I wish I would'*.** Se você deseja mudar a si mesmo, use *I wish I could* ou *I wish I were*.",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português, traduzimos 'I wish' de maneiras muito variadas:\n* *\"Quem me dera...\"*\n* *\"Eu queria que...\"*\n* *\"Se ao menos...\"*\n* *\"Gostaria que...\"*\n\n**Onde o brasileiro tropeça gravemente no inglês?**\n* **A confusão entre Wish e Hope:** Em português usamos o verbo 'esperar' ou 'desejar' indistintamente: *\"Espero que você venha amanhã\"* e *\"Queria que você viesse amanhã\"*. No inglês:\n  * Use **HOPE** quando a situação é viável, plausível e possível no futuro: *\"I hope you come to my party tomorrow\"* (Present Simple).\n  * Use **WISH** quando a situação é hipotética, impossível ou contrária aos fatos: *\"I wish you could come, but you are in Paris\"* (Past Simple/Could).\n* **Usar presente após 'wish':** Dizer *\"I wish I have more time\"* é um erro primário. O verbo após 'wish' JAMAIS fica no presente; ele sempre recua um tempo para o passado (*I wish I HAD more time*).",
    "exemplos_prc": [
      {
        "pergunta": "Are you happy living in this small apartment downtown?",
        "resposta": "Not really. I wish we had a larger balcony, or at least a spare room for a home office.",
        "contexto": "Expressando insatisfação com as limitações de espaço da moradia atual."
      },
      {
        "pergunta": "Do you have any regrets about leaving your previous company last summer?",
        "resposta": "Sometimes I wish I had stayed for another year to lead the European expansion project.",
        "contexto": "Refletindo honestamente sobre uma decisão de carreira tomada no ano anterior."
      },
      {
        "pergunta": "Why are you looking so stressed during this meeting?",
        "resposta": "I just wish the marketing team would stop interrupting the speaker every two minutes!",
        "contexto": "Demonstrando impaciência com as interrupções contínuas de colegas de equipe."
      }
    ],
    "armadilhas": [
      {
        "erro": "I wish I have a million dollars right now.",
        "correcao": "I wish I had a million dollars right now.",
        "explicacao": "Após 'wish' para desejos presentes, o verbo deve recuar para o Past Simple (had), nunca no presente (have)."
      },
      {
        "erro": "I wish I would speak Japanese fluently.",
        "correcao": "I wish I could speak Japanese fluently (ou I wish I spoke).",
        "explicacao": "Nunca use 'wish + would' para a 1ª pessoa (I / we). Para habilidades próprias desejadas, use 'could'."
      },
      {
        "erro": "I wish I didn't eat so much cake at the party last night.",
        "correcao": "I wish I hadn't eaten so much cake at the party last night.",
        "explicacao": "Arrependimentos de eventos no passado ('last night') exigem o Past Perfect (hadn't eaten), não o Past Simple."
      }
    ],
    "coda": "We cannot rewrite history or command others at will, but 'wish' and 'if only' let the soul articulate its deepest longing.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete o desejo presente com a forma culta correta:\n\"I'm completely exhausted. I wish I ___ on a sunny beach in Hawaii right now.\"",
        "opcoes": [
          "were",
          "am",
          "will be",
          "would be"
        ],
        "resposta": "were",
        "explicacao": "Para expressar um estado hipotético no presente com o verbo 'be', a norma culta prefere o subjuntivo 'were' (I wish I were)."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete o arrependimento no passado:\n\"The train has already departed! If only we ___ home ten minutes earlier!\"",
        "opcoes": [
          "had left",
          "left",
          "would leave",
          "have left"
        ],
        "resposta": "had left",
        "explicacao": "Lamentação retrospectiva de uma ação que não ocorreu no passado exige o Past Perfect: 'had left'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a reclamação sobre o comportamento irritante de outra pessoa:\n\"I can't concentrate on my reading. I wish my brother ___ his drums in the garage!\"",
        "opcoes": [
          "would stop playing",
          "stopped playing",
          "had stopped playing",
          "will stop playing"
        ],
        "resposta": "would stop playing",
        "explicacao": "Reclamações contra a conduta alheia que queremos que cesse utilizam 'would + verbo base'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Assinale a frase gramaticalmente INCORRETA:",
        "opcoes": [
          "I wish I would be taller and stronger.",
          "I wish I were taller and stronger.",
          "I wish I could run faster.",
          "I wish they would arrive on time."
        ],
        "resposta": "I wish I would be taller and stronger.",
        "explicacao": "É terminantemente proibido usar 'would' com o sujeito 'I' após o verbo 'wish' para características próprias."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no desejo de habilidade pessoal presente antes de revelar:\n\n\"I can't play the piano at all. I wish I ___ (can / play) like Chopin.\"\n(Eu não sei tocar piano de jeito nenhum. Queria saber tocar como Chopin.)",
        "resposta": "I can't play the piano at all. I wish I could play like Chopin.",
        "revelacao": "I can't play the piano at all. I wish I could play like Chopin.",
        "dica": "Passado de can para habilidades (could)",
        "explicacao": "Usa-se 'could play' para desejar habilidades pessoais presentes."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no arrependimento de ter dito algo no passado antes de revelar:\n\n\"She was deeply hurt. I wish I ___ (not / say) those cruel words yesterday.\"\n(Ela ficou profundamente magoada. Queria não ter dito aquelas palavras cruéis ontem.)",
        "resposta": "She was deeply hurt. I wish I hadn't said those cruel words yesterday.",
        "revelacao": "She was deeply hurt. I wish I hadn't said those cruel words yesterday.",
        "dica": "Past perfect negativo (hadn't said)",
        "explicacao": "Arrependimentos de fatos passados ('yesterday') utilizam o Past Perfect: 'hadn't said'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no desejo de posse presente antes de revelar:\n\n\"Our flat is so tiny. I wish we ___ (have) a small garden.\"\n(Nosso apartamento é tão minúsculo. Queria que tivéssemos um pequeno jardim.)",
        "resposta": "Our flat is so tiny. I wish we had a small garden.",
        "revelacao": "Our flat is so tiny. I wish we had a small garden.",
        "dica": "Past simple de have (had)",
        "explicacao": "Desejo presente de posse utiliza o Past Simple: 'had'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na irritação com o clima chuvoso antes de revelar:\n\n\"It has been raining all morning! I wish it ___ (would / stop)!\"\n(Está chovendo a manhã toda! Queria que parasse!)",
        "resposta": "It has been raining all morning! I wish it would stop!",
        "revelacao": "It has been raining all morning! I wish it would stop!",
        "dica": "would + stop",
        "explicacao": "Para expressar impaciência com fatores externos incontroláveis, usa-se 'would stop'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma verbal no passado de 'know' para completar o desejo presente:\n\n\"I wish I ___ where my sunglasses are!\" (soubesse)",
        "resposta": "knew",
        "explicacao": "O passado de know é 'knew'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o auxiliar do Past Perfect para completar o arrependimento:\n\n\"If only I ___ taken that advice when it was offered!\"",
        "resposta": "had",
        "explicacao": "A estrutura de arrependimento passado com 'if only' exige 'had'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o modal que expressa irritação com a demora de alguém:\n\n\"I wish the bus ___ hurry up; I am freezing!\" (viesse logo / apressasse)",
        "resposta": "would",
        "explicacao": "Usa-se 'would' para reclamações contra terceiros ou fatores externos."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma culta de 'be' para terceira pessoa em oração com wish:\n\n\"He wishes he ___ capable of speaking Japanese fluently.\" (fosse)",
        "resposta": "were",
        "explicacao": "A norma culta inglesa emprega o subjuntivo 'were' para todas as pessoas."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 8: Future Continuous
  // ─────────────────────────────────────────────────────────────
  "b2-lez8": {
    "id": "b2-lez8",
    "num": "Lesson 8",
    "titulo": "Future Continuous",
    "subtitulo": "Ações em Andamento no Futuro e Perguntas Polidas — I will be doing",
    "cena": {
      "origem": "dialogo",
      "titulo": "Coordinating the Tokyo Flight",
      "texto": "**Oliver:** What time does your flight land in Narita tomorrow, Maya?\n**Maya:** At 2:00 PM local time. So this time tomorrow, I **will be flying** somewhere over the Pacific Ocean!\n**Oliver:** How exciting! And **will you be meeting** our Japanese partners tomorrow evening?\n**Maya:** No, tomorrow evening I **will be resting** at the hotel to overcome the jet lag. We will be holding the first formal strategy session on Thursday morning."
    },
    "fio": {
      "abertura": "No nível A2 e B1, aprendemos as três formas básicas de futuro: *will* para decisões espontâneas, *going to* para planos prévios e *Present Continuous* para compromissos agendados. Mas e quando queremos visualizar uma cena dinâmica em pleno andamento em um horário específico de amanhã? Ou quando queremos perguntar educadamente pelos planos de alguém sem parecer invasivo?",
      "descoberta": "Repare na viagem mental de Maya: «This time tomorrow, I will be flying over the Pacific» e «tomorrow evening I will be resting at the hotel». Ela não está marcando o início da ação; ela projeta a imaginação para um ponto futuro onde a ação já estará em progresso! E repare na pergunta delicada de Oliver: «Will you be meeting our partners?». No inglês britânico e corporativo, essa é a forma mais cortês e polida de sondar a agenda de alguém.",
      "fecho": "O Future Continuous (will be + -ing) transforma seu futuro de um mero calendário estático em um filme vivo em alta definição."
    },
    "alerta": "Não confunda *'I will work tomorrow'* (decisão/fato de que vou trabalhar) com *'At 10 AM tomorrow, I will be working'* (às 10h eu estarei no meio do expediente). O Future Continuous projeta uma ação QUE JÁ COMEÇOU ANTES e CONTINUA EM ANDAMENTO naquele instante específico!",
    "definicao": {
      "fenomeno": "This time next week, I will be sunbathing in Bali (estarei tomando sol) · Don't call at 8 PM; we will be having dinner (estaremos jantando) · Will you be using the printer? (pergunta polida de rotina)",
      "causa": "Por que usamos o infinitivo contínuo 'be + -ing' após 'will'?",
      "conceito": "Porque combinamos a projeção de futuro (*will*) com o aspecto contínuo ou progressivo (*be + -ing*). O foco não é o início ou término do evento, mas sim a sua duração ativa em torno de uma âncora temporal futura."
    },
    "inventario": [
      "Fórmula afirmativa: Sujeito + WILL BE + Verbo com -ING (ex: *I will be waiting*)",
      "Fórmula negativa: Sujeito + WON'T BE + Verbo com -ING (ex: *He won't be joining us*)",
      "Fórmula interrogativa: WILL + Sujeito + BE + Verbo com -ING? (ex: *Will you be presenting?*)",
      "Âncoras temporais típicas: *this time tomorrow, at 3 PM next Monday, in ten years' time, between 2 and 4*",
      "Uso de Polidez Social Extrema: sondar planos de terceiros sem parecer que você está exigindo nada (*Will you be passing by the post office?*)",
      "Restrição de Verbos de Estado: verbos que não aceitam contínuo (know, believe, belong) usam o Future Simple normal"
    ],
    "tabela_visual": "| Uso Principal | Estrutura | Função Semântica | Exemplo Prático |\n|---|---|---|---|\n| **Ação em Andamento no Futuro** | *will be + -ing* | Ação que estará no meio do seu curso em um momento específico | *At 8:30 tonight, I **will be watching** the Champions League final.* |\n| **Projeção 'This Time Tomorrow'** | *this time + futuro* | Contraste temporal entre o agora e a cena de amanhã | *This time next month, we **will be hiking** in the Alps.* |\n| **Evento Rotineiro Natural** | *will be + -ing* | Acontecimento que ocorrerá como parte normal da rotina | *I **will be seeing** Dr. Bennett tomorrow anyway; I can ask him.* |\n| **Pergunta Super-Polida** | *Will you be + -ing?* | Pergunta neutra e cortês sem pressão de pedido | * **Will you be using** the company car this afternoon?* |\n| **Ações Simultâneas no Futuro** | *while + present continuous* | Duas ações ocorrendo em paralelo | *I **will be cooking** while you are doing the laundry.* |",
    "observacao_cards": [
      {
        "ingles": "Will be doing (Estrutura)",
        "traducao": "estará fazendo / estarei fazendo",
        "genero": "Fórmula Canônica",
        "motivo": "'Will be' é invariável para todas as pessoas (I, you, he, she, we, they) seguido de verbo com -ing."
      },
      {
        "ingles": "This time next week...",
        "traducao": "a esta hora na semana que vem...",
        "genero": "Gatilho Temporal Clássico",
        "motivo": "A expressão que quase sempre exige o Future Continuous para contrastar com a sua atividade agora."
      },
      {
        "ingles": "Politeness Formula",
        "traducao": "pergunta ultra-educada",
        "genero": "Etiqueta Corporativa",
        "motivo": "'Will you be going to the cafeteria?' soa como mera curiosidade neutra, muito mais suave que 'Are you going to the cafeteria?'."
      },
      {
        "ingles": "Won't be doing (Negativa)",
        "traducao": "não estarei fazendo",
        "genero": "Forma Negativa",
        "motivo": "Contração de 'will not be': 'Don't worry about lunch; I won't be eating until 2 PM'."
      }
    ],
    "tecnica": {
      "titulo": "O Teste da Foto Mental no Futuro em 3 Etapas",
      "passos": [
        "1. Identifique a âncora temporal no futuro (ex: 'at 11:00 AM tomorrow').",
        "2. Visualize a cena como uma fotografia: você já estará no meio da atividade naquele segundo exato?",
        "3. Se sim, aplique: WILL BE + VERBO-ING (ex: 'I will be taking the exam')."
      ]
    },
    "teoria": "### A Teoria Aprofundada do Future Continuous\n\nO Future Continuous é uma das estruturas mais idiomáticas e requintadas da língua inglesa. Seu valor transcende a simples localização temporal, agregando nuances de polidez e naturalidade que distinguem o estudante intermediário do falante de nível avançado.\n\n#### 1. Ação em Progresso em um Momento Futuro Definido\nO uso central do Future Continuous é retratar uma ação que terá começado antes de determinado horário no futuro e que continuará em andamento durante aquele momento:\n* *Exemplo:* \"Please do not phone between 1:00 and 2:00 PM. We **will be having** our executive lunch.\"\n* *Exemplo:* \"This time next Friday, we **will be flying** over the Atlantic.\"\nCompare:\n* *At 8:00, I will have dinner.* (Eu começarei a jantar às 8:00).\n* *At 8:00, I will be having dinner.* (O jantar já estará na mesa e eu já estarei comendo às 8:00).\n\n#### 2. Eventos que Ocorrem como Curso Natural das Coisas\nUsamos o Future Continuous para indicar que algo acontecerá simplesmente porque faz parte do curso normal dos acontecimentos ou da rotina, e não por uma nova decisão ou arranjo especial:\n* *Exemplo:* \"I **will be seeing** Helen at the office tomorrow anyway, so I can pass your message to her.\"\nEssa forma soa muito mais natural e espontânea do que *I am going to see Helen*, pois não pressupõe um plano deliberado exclusivo para vê-la.\n\n#### 3. O Instrumento Supremo de Polidez (*Polite Inquiry*)\nQuando você quer pedir uma carona, um favor ou um empréstimo a alguém, fazer perguntas diretas como *\"Are you driving to the mall?\"* pode soar invasivo ou pressionar a pessoa a dizer sim. No inglês culto, a fórmula mais educada é perguntar com o Future Continuous:\n* *\"**Will you be driving** past the post office by any chance?\"*\nEssa pergunta soa totalmente neutra: você apenas quer saber se a atividade já está na rotina da pessoa. Se ela responder *\"Yes, I will\"*, você pode emendar com suavidade: *\"Could you drop this letter for me?\"*.",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português, nós expressamos esse tempo com o gerúndio composto do futuro:\n* *\"A esta hora amanhã, eu **estarei viajando**.\"*\n* *\"Não me ligue às três da tarde, pois eu **estarei gravando** um podcast.\"*\n\n**Onde o brasileiro tropeça no inglês?**\n* **Evitar o Future Continuous por preguiça:** Por dominar o *will* simples (*I will travel tomorrow*), o brasileiro costuma ignorar o *Future Continuous* e dizer *\"This time tomorrow I will travel\"*. Embora compreensível, soa incompleto e estático aos ouvidos de um nativo, que espera ouvir a ação contínua *\"I will be traveling\"*.\n* **Desconhecer o uso de polidez:** No Brasil, pedimos favores dizendo *\"Você vai na padaria? Compra um pão pra mim?\"*. Em inglês, perguntar *\"Are you going to the bakery?\"* pode soar excessivamente direto. Empregando *\"Will you be going to the bakery?\"*, você soa incrivelmente respeitoso e elegante no ambiente internacional.",
    "exemplos_prc": [
      {
        "pergunta": "Can we schedule our project review call for 10:00 AM tomorrow morning?",
        "resposta": "Unfortunately not. At 10:00 AM tomorrow, I will be interviewing candidates for the senior developer position.",
        "contexto": "Recusando educadamente um horário de reunião com base em uma atividade que estará em andamento."
      },
      {
        "pergunta": "Will you be passing by the stationery supply store on your way back to the office?",
        "resposta": "Yes, I will. Do we need any printer paper or whiteboard markers?",
        "contexto": "Fazendo uma pergunta extremamente polida sobre a rota de um colega de trabalho para pedir um favor sem constrangimento."
      },
      {
        "pergunta": "What do you think you will be doing in ten years' time?",
        "resposta": "In ten years' time, I hope I will be managing my own renewable energy consultancy here in Vancouver.",
        "contexto": "Projetando aspirações de carreira a longo prazo em uma entrevista de desenvolvimento profissional."
      }
    ],
    "armadilhas": [
      {
        "erro": "This time tomorrow I will fly to Tokyo.",
        "correcao": "This time tomorrow I will be flying to Tokyo.",
        "explicacao": "A expressão 'this time tomorrow' foca na ação em andamento naquele instante exato, exigindo o Future Continuous (will be flying)."
      },
      {
        "erro": "Don't call me at midnight; I will be sleep.",
        "correcao": "Don't call me at midnight; I will be sleeping (ou I will be asleep).",
        "explicacao": "Após 'will be' na forma contínua, o verbo principal deve levar a terminação -ing: 'sleeping'."
      },
      {
        "erro": "Tomorrow at noon, I will be knowing the final test results.",
        "correcao": "Tomorrow at noon, I will know the final test results.",
        "explicacao": "Verbos de estado cognitivo como 'know', 'understand' e 'believe' não aceitam formas contínuas. Usa-se o Future Simple (will know)."
      }
    ],
    "coda": "The future is not just a destination on a map; the Future Continuous allows us to experience the journey in motion.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a oração com o Future Continuous:\n\"This time next Monday, the students ___ their final graduation exams.\"",
        "opcoes": [
          "will be writing",
          "will write",
          "will have write",
          "are write"
        ],
        "resposta": "will be writing",
        "explicacao": "Para expressar que a atividade estará em andamento no horário fixado no futuro ('this time next Monday'), usamos 'will be writing'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual alternativa formula uma pergunta socialmente ultra-polida sobre a intenção de usar um objeto?",
        "opcoes": [
          "Will you be using the photocopier for much longer?",
          "Are you using the photocopier forever?",
          "Do you will use the photocopier?",
          "Will you have use the photocopier?"
        ],
        "resposta": "Will you be using the photocopier for much longer?",
        "explicacao": "'Will you be using...?' é a fórmula clássica de cortesia para perguntar sobre planos alheios sem exercer pressão."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a advertência de horário:\n\"Don't ring the doorbell at 7:00 PM; we ___ dinner with our grandparents.\"",
        "opcoes": [
          "will be having",
          "will have",
          "have had",
          "are had"
        ],
        "resposta": "will be having",
        "explicacao": "A família já estará jantando naquele horário ('will be having dinner')."
      },
      {
        "tipo": "escolha",
        "pergunta": "Identifique a frase com verbo de estado que NÃO deve usar Future Continuous:",
        "opcoes": [
          "By tomorrow afternoon, I will know the answer.",
          "By tomorrow afternoon, I will be knowing the answer.",
          "By tomorrow afternoon, I will be hearing the answer.",
          "By tomorrow afternoon, I am knowing the answer."
        ],
        "resposta": "By tomorrow afternoon, I will know the answer.",
        "explicacao": "O verbo 'know' é um verbo de estado cognitivo e não aceita terminação contínua -ing."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no Future Continuous afirmativo antes de revelar:\n\n\"At 3:00 PM tomorrow, our legal counsel ___ (negotiate) the merger agreement.\"\n(Às 15h de amanhã, nosso assessor jurídico estará negociando o acordo de fusão.)",
        "resposta": "At 3:00 PM tomorrow, our legal counsel will be negotiating the merger agreement.",
        "revelacao": "At 3:00 PM tomorrow, our legal counsel will be negotiating the merger agreement.",
        "dica": "will be + negotiating",
        "explicacao": "A ação estará em pleno curso no horário marcado: 'will be negotiating'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na forma negativa contraída antes de revelar:\n\n\"We ___ (not / attend) the morning seminar because our flight lands at noon.\"\n(Nós não estaremos participando do seminário matinal porque nosso voo pousa ao meio-dia.)",
        "resposta": "We won't be attending the morning seminar because our flight lands at noon.",
        "revelacao": "We won't be attending the morning seminar because our flight lands at noon.",
        "dica": "won't be attending",
        "explicacao": "A forma negativa do Future Continuous é 'won't be attending' (ou will not be attending)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na pergunta cortês com 'come' antes de revelar:\n\n\"___ (you / come) to the cafeteria with us, or do you have a meeting?\"\n(Você estará vindo ao refeitório conosco ou tem uma reunião?)",
        "resposta": "Will you be coming to the cafeteria with us, or do you have a meeting?",
        "revelacao": "Will you be coming to the cafeteria with us, or do you have a meeting?",
        "dica": "Will you be coming...",
        "explicacao": "Pergunta polida de rotina: 'Will you be coming'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no contraste de 'this time tomorrow' antes de revelar:\n\n\"This time tomorrow, I ___ (lie) on a white sandy beach under the sun.\"\n(A esta hora amanhã, estarei deitado em uma praia de areia branca sob o sol.)",
        "resposta": "This time tomorrow, I will be lying on a white sandy beach under the sun.",
        "revelacao": "This time tomorrow, I will be lying on a white sandy beach under the sun.",
        "dica": "cuidado com a ortografia de lie no gerúndio (lying)",
        "explicacao": "O gerúndio do verbo lie é 'lying': 'will be lying'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma base do verbo auxiliar que segue 'will' no Future Continuous:\n\n\"They will ___ waiting for you at the airport arrival terminal.\"",
        "resposta": "be",
        "explicacao": "A estrutura exige 'will be' seguido de particípio presente (-ing)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o verbo 'drive' com terminação -ing para completar a frase:\n\n\"Between 4:00 and 6:00 PM, I will be ___ through the mountains.\" (dirigindo)",
        "resposta": "driving",
        "explicacao": "A ortografia de drive no gerúndio é 'driving' (elimina-se o -e final)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma contraída negativa de 'will' que completa a frase:\n\n\"I ___ be working late tonight, so we can have dinner together at 7:00.\" (não estarei)",
        "resposta": "won't",
        "explicacao": "A contração negativa é 'won't'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que abre esta pergunta polida no futuro:\n\n\"___ you be needing any assistance with your luggage, sir?\"",
        "resposta": "Will",
        "explicacao": "A pergunta polida se inicia com o auxiliar 'Will'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 9: Future Perfect
  // ─────────────────────────────────────────────────────────────
  "b2-lez9": {
    "id": "b2-lez9",
    "num": "Lesson 9",
    "titulo": "Future Perfect",
    "subtitulo": "Ações Concluídas Até Certo Ponto no Futuro — I will have done (By next year...)",
    "cena": {
      "origem": "dialogo",
      "titulo": "The Skyscraper Construction Milestone",
      "texto": "**Project Sponsor:** Can you assure the municipal board that the new bridge will be operational before the international exhibition starts?\n**Chief Engineer:** Absolutely. By November, our engineering teams **will have completed** the entire suspension cable framework.\n**Project Sponsor:** And what about the asphalt paving and lighting installations?\n**Chief Engineer:** By the time the mayor arrives for the opening ceremony on December 1st, we **will have finished** all road surfacing, and our technicians **will have tested** the automated traffic monitoring systems multiple times."
    },
    "fio": {
      "abertura": "No universo corporativo, científico e pessoal, metas não são definidas pelo momento em que começam, mas pelo prazo em que estarão 100% concluídas. Expressões como *\"até sexta-feira\"*, *\"até o final do ano\"* ou *\"quando você se formar\"* exigem uma ferramenta temporal que projete a mente para frente e olhe para trás, vendo a tarefa como fato consumado.",
      "descoberta": "Observe a precisão do engenheiro-chefe: «By November, our teams will have completed the framework» e «By the time the mayor arrives... we will have finished all road surfacing». Note o marcador mágico: a preposição **BY** (que significa 'até, o mais tardar em'). Ele não está dizendo que começará em novembro; ele garante que, antes que novembro termine, a obra já será uma conquista do passado!",
      "fecho": "O Future Perfect (will have + V3) é a linguagem definitiva da responsabilidade executiva, dos prazos impreteríveis e das grandes conquistas de vida."
    },
    "alerta": "O marcador supremo do Future Perfect é a preposição **BY** (*by next week, by tomorrow morning, by the year 2030, by the time...*). Ao encontrar 'by' indicando um prazo limite no futuro, você quase sempre precisará do **Future Perfect** (will have done)!",
    "definicao": {
      "fenomeno": "By next Friday, I will have finished this report (terei terminado) · In two years' time, she will have graduated from medical school (terá se formado) · By the time you arrive, we will have left (já teremos partido)",
      "causa": "Por que usamos 'will have + particípio passado'?",
      "conceito": "Porque combinamos a projeção para o futuro ('will') com o aspecto perfeito ('have + V3'). Olhamos a partir de um ponto futuro imaginário para trás, enxergando uma ação como completamente realizada e finalizada antes daquele momento."
    },
    "inventario": [
      "Fórmula afirmativa: Sujeito + WILL HAVE + Past Participle (V3) (ex: *I will have saved £10,000*)",
      "Fórmula negativa: Sujeito + WON'T HAVE + Past Participle (V3) (ex: *She won't have received the letter yet*)",
      "Fórmula interrogativa: WILL + Sujeito + HAVE + Past Participle (V3)? (ex: *Will they have arrived?*)",
      "O marcador temporal soberano: 'BY' (by 5 PM, by Friday, by the end of the month, by 2035)",
      "A conjunção 'BY THE TIME': a oração subordinada exige o Present Simple (*By the time you wake up, I will have landed*)",
      "Expressão de duração futura com 'IN': *In six months' time, I will have completed my thesis*"
    ],
    "tabela_visual": "| Marcador Temporal | Estrutura | Significado Exato | Exemplo Prático |\n|---|---|---|---|\n| **By + Data/Hora**<br>*By 5:00 PM* | *will have + V3* | A ação estará concluída antes ou até aquele momento | *By 5:00 PM, I **will have submitted** the tender.* |\n| **By the time + Presente**<br>*By the time you arrive* | *will have + V3* | Um evento presente marca o prazo de conclusão do outro | *By the time you wake up, I **will have left**.* |\n| **In [tempo] time**<br>*In three years' time* | *will have + V3* | Olhando para o que terá sido conquistado daqui a X tempo | *In three years' time, we **will have paid off** our mortgage.* |\n| **Negativa (Won't have)** | *won't have + V3* | Ação que ainda NÃO estará pronta no prazo limite | *They **won't have repaired** the bridge by tomorrow.* |\n| **Interrogativa de Prazo** | *Will you have + V3?* | Pergunta se a tarefa estará pronta até o prazo | * **Will you have finished** the analysis by Monday?* |",
    "observacao_cards": [
      {
        "ingles": "Will have done (Estrutura)",
        "traducao": "terei feito / terá feito",
        "genero": "Fórmula Canônica",
        "motivo": "'Will have' é invariável para todas as pessoas, seguido do Particípio Passado (V3) do verbo principal."
      },
      {
        "ingles": "By (Até o mais tardar)",
        "traducao": "até / o mais tardar em",
        "genero": "Gatilho Temporal Soberano",
        "motivo": "'By 2030' significa 'antes de 2030 ou no máximo em 2030'. É o sinal inequívoco do Future Perfect."
      },
      {
        "ingles": "By the time + Present Simple",
        "traducao": "quando você chegar... eu já terei...",
        "genero": "Regra de Oração Subordinada",
        "motivo": "A oração com 'by the time' leva o Present Simple: 'By the time he arrives (nunca will arrive), we will have eaten'."
      },
      {
        "ingles": "In five years' time",
        "traducao": "daqui a cinco anos",
        "genero": "Projeção de Carreira e Vida",
        "motivo": "Expressão comum para traçar marcos de longo prazo: 'In five years' time, I will have bought my house'."
      }
    ],
    "tecnica": {
      "titulo": "O Algoritmo do Prazo Futuro em 3 Etapas",
      "passos": [
        "1. Identifique o prazo limite na frase marcado por 'BY' ou 'BY THE TIME'.",
        "2. Certifique-se de que a oração com 'by the time' esteja no Present Simple (ex: 'by the time the store closes').",
        "3. Na oração principal de resultado, aplique: WILL HAVE + PARTICÍPIO PASSADO (ex: 'we will have bought the supplies')."
      ]
    },
    "teoria": "### A Teoria Aprofundada do Future Perfect\n\nO Future Perfect (Futuro Perfeito) ancora uma perspectiva de retrospecção prospectiva: colocamo-nos no futuro e contemplamos um evento anterior como um fato consumado e registrado na linha da história.\n\n#### 1. A Lógica Temporal de Conclusão\nEnquanto o *Future Simple* apenas anuncia uma ocorrência futura (*I will finish the book tomorrow*) e o *Future Continuous* descreve uma atividade em progresso (*I will be reading tomorrow afternoon*), o *Future Perfect* foca exclusivamente no **resultado concluído antes de um momento de referência**:\n* *Exemplo:* \"Do not worry about the audit on Monday. By Sunday night, our accountants **will have reconciled** every balance sheet.\"\n* *Contraste crucial:*\n  * *At 6:00, I will cook dinner.* (Começo a cozinhar às 6:00).\n  * *At 6:00, I will be cooking dinner.* (Estarei no meio do preparo às 6:00).\n  * *By 6:00, I will have cooked dinner.* (O jantar já estará pronto, cozido e esperando na mesa antes das 6:00).\n\n#### 2. O Funcionamento de 'By the time'\nA locução conjuntiva *by the time* introduz uma oração adverbial temporal de referência. De acordo com as leis fundamentais das orações temporais em inglês, **não se pode usar 'will' dentro da oração com by the time**:\n* *Incorreto:* By the time you will get home, I will have cleaned the flat.\n* *Correto:* **By the time you get home, I will have cleaned the flat.**\nO verbo da oração com *by the time* assume o Present Simple, enquanto a oração principal expressa o Future Perfect.\n\n#### 3. Projeção de Metas de Vida (In [time] time)\nEm entrevistas de emprego ou planejamento estratégico, usa-se a expressão possessiva de tempo (*in X years' time*) para projetar realizações consolidadas:\n* *\"In five years' time, our company **will have expanded** operations into seven new Latin American countries.\"*\n* *\"In ten years' time, scientists **will have developed** more effective treatments for Alzheimer's disease.\"*",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português, usamos o futuro do presente composto com o verbo ter:\n* *\"Até o final da semana, eu **terei terminado** este relatório.\"*\n* *\"Quando você chegar lá, eles já **terão partido**.\"*\n\n**Onde o brasileiro tropeça no inglês?**\n* **Colocar 'will' dentro do 'by the time':** Em português dizemos *\"Na hora que você **for** chegar...\"* ou *\"Quando você **chegar**...\"* (futuro do subjuntivo). Como o português usa uma forma de futuro, o brasileiro é tentado a dizer *\"By the time you will arrive...\"*. Lembre-se: em orações temporais inglesas com *when*, *as soon as* e *by the time*, usa-se estritamente o **Present Simple** (*By the time you arrive*)!\n* **Esquecer o particípio correto:** Ao construir *will have*, muitos alunos usam a forma base ou o passado simples (*will have wrote*, *will have did*). O Future Perfect exige inegociavelmente o particípio (*will have written*, *will have done*).",
    "exemplos_prc": [
      {
        "pergunta": "Will the translation of this medical research paper be ready by tomorrow afternoon?",
        "resposta": "Yes, by 3:00 PM tomorrow, our certified translators will have completed and proofread the entire text.",
        "contexto": "Garantindo a entrega de um trabalho técnico com prazo estipulado."
      },
      {
        "pergunta": "How much progress do you expect to make on your mortgage by the end of this decade?",
        "resposta": "If everything goes according to plan, by 2030 we will have paid off more than seventy percent of the total debt.",
        "contexto": "Avaliando metas financeiras familiares de longo prazo."
      },
      {
        "pergunta": "Should I come to your apartment at 8:00 PM to help you pack for the move?",
        "resposta": "You're very kind, but by 8:00 PM I will have packed all the boxes myself. Just come by for pizza at 9:00!",
        "contexto": "Dispensando educadamente ajuda ao demonstrar que a tarefa já estará finalizada naquele horário."
      }
    ],
    "armadilhas": [
      {
        "erro": "By the time you will arrive, the movie will have started.",
        "correcao": "By the time you arrive, the movie will have started.",
        "explicacao": "A oração introduzida por 'by the time' jamais aceita 'will'; o verbo deve estar no Present Simple (arrive)."
      },
      {
        "erro": "By next month, I will have save £5,000.",
        "correcao": "By next month, I will have saved £5,000.",
        "explicacao": "Após 'will have', o verbo principal deve estar no Particípio Passado (saved), nunca na forma base (save)."
      },
      {
        "erro": "By 2030, scientists will has discovered a cure.",
        "correcao": "By 2030, scientists will have discovered a cure.",
        "explicacao": "Após o modal 'will', o auxiliar é invariavelmente a forma base 'have', nunca 'has', mesmo para a 3ª pessoa do singular."
      }
    ],
    "coda": "The Future Perfect is the grammar of achievement: looking from tomorrow's hilltop back at today's finished climb.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a oração que expressa um prazo futuro com 'by':\n\"By the end of this year, our company ___ over 100,000 electric vehicles.\"",
        "opcoes": [
          "will have manufactured",
          "will manufacture",
          "will be manufactured",
          "has manufactured"
        ],
        "resposta": "will have manufactured",
        "explicacao": "O marcador 'By the end of this year' exige o Future Perfect para indicar ação concluída até aquele ponto: 'will have manufactured'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual é a forma verbal correta para a oração com 'by the time'?\n\"By the time the train ___ at the station, we will have bought our tickets.\"",
        "opcoes": [
          "arrives",
          "will arrive",
          "arrived",
          "is arriving"
        ],
        "resposta": "arrives",
        "explicacao": "Orações temporais com 'by the time' exigem o Present Simple ('arrives'), sendo incorreto o uso de 'will'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o Future Perfect interrogativo:\n\"___ the report by the time the board meeting begins tomorrow morning?\"",
        "opcoes": [
          "Will you have finalized",
          "Will you finalize",
          "Are you finalizing",
          "Have you finalize"
        ],
        "resposta": "Will you have finalized",
        "explicacao": "A pergunta sobre se algo estará concluído até certo ponto no futuro utiliza 'Will you have finalized'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Identifique a frase com erro gramatical:",
        "opcoes": [
          "By next Friday, she will has finished the painting.",
          "By next Friday, she will have finished the painting.",
          "By next Friday, she will be finishing the painting.",
          "By next Friday, she will finish the painting."
        ],
        "resposta": "By next Friday, she will has finished the painting.",
        "explicacao": "Após o modal 'will', o auxiliar é SEMPRE 'have'. A forma 'will has' não existe na língua inglesa."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no Future Perfect afirmativo antes de revelar:\n\n\"By midnight tonight, our technical team ___ (resolve) all database issues.\"\n(Até a meia-noite de hoje, nossa equipe técnica terá resolvido todos os problemas do banco de dados.)",
        "resposta": "By midnight tonight, our technical team will have resolved all database issues.",
        "revelacao": "By midnight tonight, our technical team will have resolved all database issues.",
        "dica": "will have + particípio de resolve (resolved)",
        "explicacao": "Prazo marcado por 'by midnight' exige 'will have resolved'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na oração com 'by the time' no presente antes de revelar:\n\n\"By the time you ___ (wake up) tomorrow, I will have already boarded my flight.\"\n(Quando você acordar amanhã, eu já terei embarcado no meu voo.)",
        "resposta": "By the time you wake up tomorrow, I will have already boarded my flight.",
        "revelacao": "By the time you wake up tomorrow, I will have already boarded my flight.",
        "dica": "Present Simple para you (wake up)",
        "explicacao": "A oração com 'by the time' usa o Present Simple: 'wake up'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no particípio irregular de 'read' antes de revelar:\n\n\"By the end of the semester, we ___ (read) six classic Victorian novels.\"\n(Até o final do semestre, teremos lido seis romances vitorianos clássicos.)",
        "resposta": "By the end of the semester, we will have read six classic Victorian novels.",
        "revelacao": "By the end of the semester, we will have read six classic Victorian novels.",
        "dica": "will have + read (grafia igual, pronúncia /red/)",
        "explicacao": "O particípio de read é 'read': 'will have read'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na forma negativa contraída antes de revelar:\n\n\"They ___ (not / build) the entire hospital wing by next month; they need more time.\"\n(Eles não terão construído toda a ala do hospital até o mês que vem; eles precisam de mais tempo.)",
        "resposta": "They won't have built the entire hospital wing by next month; they need more time.",
        "revelacao": "They won't have built the entire hospital wing by next month; they need more time.",
        "dica": "won't have + particípio de build (built)",
        "explicacao": "Negativa do Future Perfect: 'won't have built'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição soberana que indica prazo limite no futuro:\n\n\"I will have finished my bachelor's degree ___ July 2026.\" (até / o mais tardar em)",
        "resposta": "by",
        "explicacao": "A preposição que estabelece o prazo limite é 'by'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o auxiliar invariável que segue 'will' no Future Perfect:\n\n\"She will ___ saved enough money to buy a car by Christmas.\"",
        "resposta": "have",
        "explicacao": "O auxiliar é sempre 'have'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o particípio passado do verbo 'write' para completar a meta:\n\n\"By this evening, I will have ___ twenty pages of my novel.\"",
        "resposta": "written",
        "explicacao": "O particípio passado de write é 'written'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o verbo auxiliar no Present Simple para a oração com 'by the time':\n\n\"By the time the guests ___, we will have prepared all the appetizers.\" (chegarem / verbo arrive para they)",
        "resposta": "arrive",
        "explicacao": "A forma no Present Simple para they é 'arrive'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 10: Causative Form
  // ─────────────────────────────────────────────────────────────
  "b2-lez10": {
    "id": "b2-lez10",
    "num": "Lesson 10",
    "titulo": "Causative Form",
    "subtitulo": "Have / Get something done — A Arte de Delegar Serviços e Relatar Incidentes",
    "cena": {
      "origem": "dialogo",
      "titulo": "Preparing the Estate for the Wedding",
      "texto": "**Beatrice:** The wedding reception is in three days, Sebastian! Is everything organized at the country estate?\n**Sebastian:** Almost! We **had the garden landscaped** yesterday, and I am **having the grand piano tuned** this afternoon.\n**Beatrice:** Wonderful! And what about the vintage Rolls-Royce? Did you fix the brakes yourself?\n**Sebastian:** Heavens, no! I don't know the first thing about car engines. I **got the brakes serviced** by a professional mechanic in Oxford. We also **had the roof repaired** after last week's gale."
    },
    "fio": {
      "abertura": "Se você disser a um nativo *\"I cut my hair yesterday\"*, ele provavelmente olhará para você com espanto e perguntará se você usou uma tesoura diante do espelho do banheiro. Em português, dizemos naturalmente *\"cortei meu cabelo\"* ou *\"consertei meu carro\"*, mesmo quando fomos a um salão profissional ou à oficina mecânica. Na língua inglesa, essa distinção é cirúrgica.",
      "descoberta": "Preste atenção à fala de Sebastian: «We had the garden landscaped» e «I got the brakes serviced by a mechanic». Ele não tocou em pás nem em ferramentas. Ele usou a **Causative Form**: Sujeito + HAVE/GET + o Objeto + Particípio Passado (V3). Essa estrutura expressa que você não fez o trabalho físico; você contratou, delegou, organizou ou pagou para que um profissional qualificado fizesse por você!",
      "fecho": "A Causative Form é o divisor de águas entre o inglês literal ingênuo e a fala madura, elegante e profissional de quem sabe orquestrar serviços."
    },
    "alerta": "O erro cultural mais hilário e frequente dos brasileiros: dizer *'I will paint my house'* (você mesmo vai pegar na trincha) quando pretendem contratar pintores (*'I will have my house painted'*). Se você contratou alguém, use sempre HAVE / GET SOMETHING DONE!",
    "definicao": {
      "fenomeno": "I had my hair cut (cortei o cabelo no barbeiro) · She is having her car repaired (está tendo o carro consertado na oficina) · He got his teeth cleaned (fez limpeza dental no dentista)",
      "causa": "Por que o inglês exige uma estrutura especial quando terceirizamos um serviço?",
      "conceito": "Porque o inglês é uma língua de alta precisão de agência (*agency*). Dizer 'I repaired my roof' atribui a ação física diretamente ao sujeito. Para sinalizar que você foi o causador ou contratante, mas não o executor braçal, a língua aciona a forma causativa com 'have' ou 'get'."
    },
    "inventario": [
      "Fórmula canônica da Causativa Passiva: Sujeito + HAVE + Objeto (coisa) + Past Participle (V3)",
      "Variação informal com GET: Sujeito + GET + Objeto + Past Participle (muito frequente na fala cotidiana)",
      "Conjugação em qualquer tempo verbal: Present Simple (*has it cleaned*), Past Simple (*had it painted*), Continuous (*is having it serviced*), Future (*will have it delivered*)",
      "Uso de infortúnio / acidente: relatar incidentes indesejados sofridos pelo sujeito (*He had his passport stolen* = roubaram o passaporte dele)",
      "A Causativa Ativa com HAVE: HAVE + alguém + BASE FORM (*I had the technician check the router*)",
      "A Causativa Ativa com GET: GET + alguém + TO-INFINITIVE (*I got the technician to check the router*)"
    ],
    "tabela_visual": "| Tempo Verbal | Sujeito + HAVE/GET | Objeto (Coisa) | Particípio (V3) | Significado Prático |\n|---|---|---|---|---|\n| **Present Simple** | *I **have** / **get*** | *my eyes* | *tested* | Faço exame de vista regularmente no oftalmologista. |\n| **Past Simple** | *She **had** / **got*** | *her laptop* | *repaired* | Ela mandou consertar o laptop na assistência técnica. |\n| **Present Continuous** | *We **are having*** | *our kitchen* | *renovated* | Estamos reformando a cozinha (com pedreiros trabalhando agora). |\n| **Future (Will)** | *They **will have*** | *the document* | *translated* | Eles contratarão um tradutor juramentado. |\n| **Modal (Should)** | *You **should have*** | *your car* | *serviced* | Você deveria mandar revisar seu carro. |\n| **Infortúnio / Roubo** | *He **had*** | *his wallet* | *stolen* | Roubaram a carteira dele (ele foi vítima de furto). |",
    "observacao_cards": [
      {
        "ingles": "Have something done",
        "traducao": "mandar fazer algo / terceirizar",
        "genero": "Fórmula Padrão Formal",
        "motivo": "A estrutura elegante para serviços contratados: 'I have my suit dry-cleaned every month'."
      },
      {
        "ingles": "Get something done",
        "traducao": "fazer/mandar fazer (informal)",
        "genero": "Linguagem Falada",
        "motivo": "Extremamente comum no dia a dia: 'I need to get my phone screen replaced'."
      },
      {
        "ingles": "Causativa de Infortúnio",
        "traducao": "ter algo roubado/danificado",
        "genero": "Experiência Desagradável",
        "motivo": "Expressa incidentes sofridos: 'She had her luggage lost by the airline'."
      },
      {
        "ingles": "Ativa: Have someone do vs Get someone TO do",
        "traducao": "fazer alguém fazer",
        "genero": "Diferença de Regência",
        "motivo": "Com pessoa: 'have someone DO' (sem to) vs 'get someone TO DO' (com to: convencer a fazer)."
      }
    ],
    "tecnica": {
      "titulo": "A Construção da Causativa em 3 Passos",
      "passos": [
        "1. Identifique quem é o beneficiário/contratante (Sujeito) e em que tempo a ação ocorre.",
        "2. Conjuge o verbo HAVE (ou GET) nesse tempo verbal: 'I had', 'She is having', 'We will have'.",
        "3. Insira a COISA que recebe o serviço, seguida imediatamente pelo seu PARTICÍPIO PASSADO (V3): 'my teeth whitened', 'our roof repaired'."
      ]
    },
    "teoria": "### A Teoria Aprofundada da Forma Causativa (Causative Form)\n\nA forma causativa (*Causative Form*) é um dos pilares da clareza estilística em inglês. Ela permite distinguir com precisão matemática se o sujeito é o trabalhador braçal ou a pessoa que contratou/providenciou o serviço.\n\n#### 1. A Causativa Passiva Clássica (*Have / Get something done*)\nNesta estrutura, o agente executor da ação (o cabeleireiro, o mecânico, o encanador) geralmente não precisa ser mencionado, pois já está implícito pelo contexto social do serviço:\n* **Fórmula:** `Sujeito + HAVE/GET (no tempo desejado) + Objeto + Past Participle`\n* *Cenário 1 (Passado):* \"I **had my wisdom teeth removed** last Friday.\" (O dentista extraiu; eu apenas paguei e sofri a anestesia).\n* *Cenário 2 (Futuro):* \"We are going to **have our house painted** next spring.\" (Pintores profissionais farão o trabalho).\n* *Diferença de registro entre Have e Get:* Ambos são intercambiáveis, mas *get* soa mais dinâmico e coloquial na conversação diária (*I must get my watch repaired*).\n\n#### 2. A Causativa de Acidente ou Infortúnio (*Adversity Causative*)\nAlém de serviços deliberados, essa mesma estrutura é amplamente usada para relatar quando algo ruim ou inesperado acontece com os pertences do sujeito sem a sua intenção:\n* *Exemplo:* \"While traveling in Barcelona, David **had his passport and wallet stolen**.\"\n* *Exemplo:* \"Many homeowners **had their roofs damaged** during yesterday's hurricane.\"\nIsso não significa que eles mandaram danificar os telhados, mas sim que sofreram o impacto do evento passivo.\n\n#### 3. As Causativas Ativas: *Have someone do* vs *Get someone to do*\nQuando queremos explicitar a **pessoa** que foi encarregada ou convencida a realizar a tarefa, a regência verbal muda de acordo com o verbo utilizado:\n* **Have + pessoa + VERBO BASE (bare infinitive):** Indica autoridade formal, instrução profissional ou relação de trabalho direta:\n  * *\"The manager **had the assistant print** twenty copies of the agenda.\"* (Não leva 'to'!).\n* **Get + pessoa + TO-INFINITIVE:** Indica persuasão, convencimento ou superação de relutância:\n  * *\"I finally **got my teenager to clean** his bedroom after promising him pizza.\"* (Leva 'to'!).\n* **Make + pessoa + VERBO BASE:** Expressa imposição, coação ou obrigatoriedade estrita:\n  * *\"The strict teacher **made the students rewrite** the entire essay.\"*",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português do Brasil, é universal dizer frases como:\n* *\"Eu **cortei** meu cabelo ontem.\"*\n* *\"Vou **lavar** meu carro na sexta.\"*\n* *\"Ele **tirou** as amígdalas.\"*\nEm todas elas, o falante brasileiro usa a voz ativa como se ele próprio tivesse empunhado a tesoura, o bisturi ou o lava a jato.\n\n**Onde o brasileiro tropeça no inglês?**\n* **Tradução literal perigosa:** Se você disser *\"I cut my hair yesterday\"*, um nativo entenderá que você cometeu um corte caseiro de cabelo. Para soar normal, você DEVE dizer: *\"I **had my hair cut** yesterday\"* ou *\"I **got my hair cut**\"*.\n* **A armadilha da ordem das palavras:** No português, às vezes dizemos *\"Mandei consertar o carro\"* (verbo auxiliar + verbo de ação + objeto). Em inglês, a 'coisa' entra **no meio**, separando os dois verbos: **I had my car repaired** (e NUNCA *I had repaired my car*, que seria Past Perfect e significaria 'eu tinha consertado meu carro' com as próprias mãos!). Preste muita atenção: a coisa fica no meio!",
    "exemplos_prc": [
      {
        "pergunta": "Did you paint your new apartment all by yourself last weekend?",
        "resposta": "No way! I am terrible with paint rollers. I had the entire apartment painted by two professional decorators.",
        "contexto": "Esclarecendo que contratou profissionais para a pintura do imóvel em vez de fazê-la sozinho."
      },
      {
        "pergunta": "Why can't you drive to the airport this evening?",
        "resposta": "I am having my car's transmission replaced at the garage; it won't be ready until Thursday afternoon.",
        "contexto": "Explicando que o veículo está na oficina mecânica passando por reparos importantes."
      },
      {
        "pergunta": "How did you convince your brother to help you move all that heavy furniture?",
        "resposta": "It wasn't easy! I finally got him to help me by promising to treat him to an expensive steak dinner.",
        "contexto": "Descrevendo como conseguiu persuadir alguém a prestar ajuda por meio de uma recompensa."
      }
    ],
    "armadilhas": [
      {
        "erro": "I had repaired my smartphone at the mall yesterday.",
        "correcao": "I had my smartphone repaired at the mall yesterday.",
        "explicacao": "A coisa ('my smartphone') DEVE ficar entre o verbo 'had' e o particípio 'repaired'. Se você disser 'had repaired', soa como Past Perfect (você mesmo consertou)."
      },
      {
        "erro": "I cut my hair every two months.",
        "correcao": "I have my hair cut (ou I get my hair cut) every two months.",
        "explicacao": "A menos que você corte o próprio cabelo diante do espelho, use a forma causativa 'have my hair cut'."
      },
      {
        "erro": "The boss had the secretary to send the confidential email.",
        "correcao": "The boss had the secretary send the confidential email.",
        "explicacao": "A causativa ativa com 'have' usa a forma base do verbo sem 'to': 'had someone send'. Se usasse 'got', seria 'got someone to send'."
      }
    ],
    "coda": "The Causative Form is the grammar of sophisticated delegation: putting your intentions into motion through the skilled hands of others.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a frase indicando que o serviço foi terceirizado a um encanador:\n\"We had a severe water leak, so we ___ immediately.\"",
        "opcoes": [
          "had the pipes repaired",
          "had repaired the pipes",
          "repaired the pipes ourselves",
          "have repairing the pipes"
        ],
        "resposta": "had the pipes repaired",
        "explicacao": "A ordem causativa é: Sujeito + HAD + Objeto (the pipes) + Particípio (repaired)."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual alternativa expressa que alguém cortou o cabelo em um salão profissional no passado?",
        "opcoes": [
          "She had her hair cut yesterday.",
          "She cut her hair yesterday.",
          "She was cutting her hair yesterday.",
          "She had cut her hair yesterday."
        ],
        "resposta": "She had her hair cut yesterday.",
        "explicacao": "'She had her hair cut' expressa que o corte foi realizado por um profissional."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a causativa ativa com 'got' (persuasão):\n\"After a long discussion, I finally got my business partner ___ the contract.\"",
        "opcoes": [
          "to sign",
          "sign",
          "signed",
          "signing"
        ],
        "resposta": "to sign",
        "explicacao": "A causativa ativa com o verbo 'get' exige infinitivo com 'to': 'got someone to sign'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Identifique a causativa de infortúnio/furto:",
        "opcoes": [
          "Unfortunately, he had his bicycle stolen outside the library.",
          "He stole his bicycle outside the library.",
          "He got a new bicycle outside the library.",
          "He had stolen a bicycle outside the library."
        ],
        "resposta": "Unfortunately, he had his bicycle stolen outside the library.",
        "explicacao": "'Had his bicycle stolen' é a causativa de infortúnio que indica que ele foi vítima de furto."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na causativa no Present Continuous antes de revelar:\n\n\"Please pardon the noise; we ___ (have / our bathroom / remodel) by contractors this week.\"\n(Por favor, desculpe o barulho; estamos tendo nosso banheiro reformado por empreiteiros esta semana.)",
        "resposta": "Please pardon the noise; we are having our bathroom remodeled by contractors this week.",
        "revelacao": "Please pardon the noise; we are having our bathroom remodeled by contractors this week.",
        "dica": "are having + our bathroom + remodeled",
        "explicacao": "Present Continuous causativo: 'are having our bathroom remodeled'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na causativa de revisão mecânica no futuro antes de revelar:\n\n\"Before our long road trip next month, I ___ (will / get / the engine / check) by a mechanic.\"\n(Antes da nossa longa viagem de carro no mês que vem, mandarei checar o motor por um mecânico.)",
        "resposta": "Before our long road trip next month, I will get the engine checked by a mechanic.",
        "revelacao": "Before our long road trip next month, I will get the engine checked by a mechanic.",
        "dica": "will get + the engine + checked",
        "explicacao": "Causativa no futuro com get: 'will get the engine checked'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na causativa ativa com 'have' (sem to) antes de revelar:\n\n\"The director ___ (have / the assistant / organize) the international conference folders.\"\n(O diretor fez a assistente organizar as pastas da conferência internacional.)",
        "resposta": "The director had the assistant organize the international conference folders.",
        "revelacao": "The director had the assistant organize the international conference folders.",
        "dica": "had + pessoa + organize (forma base sem to)",
        "explicacao": "Com o verbo 'have', a causativa ativa leva o verbo base puro: 'had the assistant organize'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Corrija a ordem causativa incorreta antes de revelar:\n\n\"I had cleaned my suit at the dry cleaner's.\"",
        "resposta": "I had my suit cleaned at the dry cleaner's.",
        "revelacao": "I had my suit cleaned at the dry cleaner's.",
        "dica": "Coloque 'my suit' entre 'had' e 'cleaned'",
        "explicacao": "A coisa contratada deve vir entre had e o particípio: 'had my suit cleaned'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma no passado do verbo 'have' para completar a causativa:\n\n\"We ___ our house painted by professionals last summer.\"",
        "resposta": "had",
        "explicacao": "No Past Simple, a forma de have é 'had'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o particípio passado de 'deliver' para completar a causativa:\n\n\"I am going to have the groceries ___ to my doorstep.\" (entregues)",
        "resposta": "delivered",
        "explicacao": "O particípio passado de deliver é 'delivered'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a partícula que é OBRIGATÓRIA na causativa ativa com 'get':\n\n\"She finally got her husband ___ visit the doctor.\" (a visitar / para visitar)",
        "resposta": "to",
        "explicacao": "A causativa com get exige a partícula 'to' antes do infinitivo ('got him to visit')."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o particípio passado de 'clean' para expressar limpeza dental no dentista:\n\n\"You should go to the clinic and get your teeth ___ twice a year.\" (limpos)",
        "resposta": "cleaned",
        "explicacao": "O particípio passado de clean é 'cleaned'."
      }
    ]
  }
};

console.log('Aplicando Onda 6 — Parte 2 (Lições B2.6 a B2.10)...');

for (const [id, lessonData] of Object.entries(wave6Part2Lessons)) {
  for (const mod of data.moduli) {
    const idx = mod.lezioni.findIndex(l => l.id === id);
    if (idx !== -1) {
      mod.lezioni[idx] = lessonData;
      console.log(`✓ Lição ${id} (${lessonData.titulo}) enriquecida com sucesso!`);
    }
  }
}

fs.writeFileSync(grammarPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Onda 6 — Parte 2 gravada com sucesso em data/grammar.json!');
