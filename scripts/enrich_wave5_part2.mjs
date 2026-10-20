import fs from 'fs';

const grammarPath = 'data/grammar.json';
const data = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));

// Onda 5 — Parte 2: Lições B1.6 a B1.10 (Passiva, Relativas, Reported Speech, Used to, Dedução)
const wave5Part2Lessons = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 6: Passive Voice (Present & Past)
  // ─────────────────────────────────────────────────────────────
  "b1-lez6": {
    "id": "b1-lez6",
    "num": "Lesson 6",
    "titulo": "Passive Voice (Present & Past)",
    "subtitulo": "Foco na Ação e no Objeto — Is Made, Was Built, Are Produced",
    "cena": {
      "origem": "dialogo",
      "titulo": "Guided Tour at an Artisan Cheese Factory",
      "texto": "**Guide:** Welcome! This world-famous cheddar is produced right here on our organic farm.\n**Visitor:** It tastes incredible! How long has this farm been operating?\n**Guide:** The main dairy barn was built in 1895 by my great-grandfather. Today, over ten thousand wheels of cheese are sold to gourmet markets every year.\n**Visitor:** Were these copper vats imported from Switzerland?\n**Guide:** Yes, they were imported fifty years ago!"
    },
    "fio": {
      "abertura": "No dia a dia, muitas vezes não importa quem apertou o botão ou quem fabricou o produto; o que realmente importa é o que foi feito. Em notícias de jornal, relatórios corporativos e manuais técnicos, a Voz Passiva é a rainha da objetividade.",
      "descoberta": "Repare na linguagem do guia: «this cheese is produced», «the barn was built in 1895», «cheeses are sold», «they were imported». O que todas têm em comum? O verbo TO BE conjugado no tempo certo (is, are, was, were) seguido do PARTICÍPIO PASSADO do verbo de ação!",
      "fecho": "Agora você domina a perspectiva passiva: quem recebe a ação vai para o início da frase, o To Be marca o tempo, e o particípio conclui o fato."
    },
    "alerta": "Brasileiros frequentemente tentam traduzir o 'se' apassivador do português (*vende-se casas, fala-se inglês*) dizendo *'it speaks English'* ou *'sells houses'*. Em inglês, isso é incompreensível! O correto é sempre a voz passiva: **English is spoken here** e **Houses are sold**.",
    "definicao": {
      "fenomeno": "Active: Millions of people drink coffee ➔ Passive: Coffee is drunk by millions of people · Active: Steve Jobs founded Apple in 1976 ➔ Passive: Apple was founded by Steve Jobs in 1976",
      "causa": "Por que transformamos uma oração ativa em passiva?",
      "conceito": "Usamos a Voz Passiva quando o agente da ação é desconhecido (*My bike was stolen*), óbvio pelo contexto (*The criminal was arrested*), ou quando queremos deliberadamente dar destaque e foco ao objeto que sofreu a ação em vez de quem a praticou."
    },
    "inventario": [
      "A fórmula matemática universal da passiva: Objeto ➔ Novo Sujeito + Verbo TO BE + Particípio Passado",
      "Passiva no Present Simple: AM / IS / ARE + Particípio (It is made of wood, They are exported)",
      "Passiva no Past Simple: WAS / WERE + Particípio (The bridge was built in 1930, The files were deleted)",
      "O agente da passiva com 'BY': usado apenas quando a identidade do autor for relevante e enriquecedora",
      "A proibição do 'se' literal: 'Fala-se inglês' = English is spoken (nunca *speaks itself*)"
    ],
    "tabela_visual": "| Tempo Verbal | Voz Ativa (Foco no Agente) | Voz Passiva (Foco no Objeto / Ação) | Estrutura Passiva |\n|---|---|---|---|\n| **Present Simple** | *Farmers **grow** coffee in Brazil.* | *Coffee **is grown** in Brazil.* | **is / are** + Particípio |\n| **Present Simple (Plural)** | *Workers **make** smartphones here.* | *Smartphones **are made** here.* | **are** + Particípio |\n| **Past Simple** | *Da Vinci **painted** the Mona Lisa.* | *The Mona Lisa **was painted** by Da Vinci.* | **was / were** + Particípio |\n| **Past Simple (Plural)** | *Engineers **repaired** the roads.* | *The roads **were repaired** yesterday.* | **were** + Particípio |\n| **Pergunta Passiva** | *Did they clean the rooms?* | ***Were** the rooms cleaned?* | Inversão do To Be |",
    "observacao_cards": [
      {
        "ingles": "Is made / Are made",
        "traducao": "é feito / são feitos",
        "genero": "Passiva no Presente",
        "motivo": "Presente habitual de fabricação: 'This watch is made in Switzerland'."
      },
      {
        "ingles": "Was built / Were built",
        "traducao": "foi construído / foram construídos",
        "genero": "Passiva no Passado",
        "motivo": "Passado pontual: 'The Colosseum was built in Rome'."
      },
      {
        "ingles": "My car was stolen!",
        "traducao": "Meu carro foi roubado!",
        "genero": "Agente Desconhecido",
        "motivo": "Não sei quem roubou: a passiva é a única forma elegante de relatar o fato."
      },
      {
        "ingles": "By + Agente",
        "traducao": "por / pelo / pela",
        "genero": "Agente da Passiva",
        "motivo": "Só adicione 'by' se o nome do criador for essencial: 'Hamlet was written by Shakespeare'."
      }
    ],
    "tecnica": "A Conversão para Voz Passiva em 3 passos:\n\n**Passo 1** — Pegue o OBJETO que sofreu a ação e mova-o para a PRIMEIRA POSIÇÃO da frase:\n→ *A dog bit the postman* ➔ **The postman...**\n\n**Passo 2** — Insira o verbo TO BE no mesmo tempo da oração original (presente = *is/are*; passado = *was/were*):\n→ *bit* é passado de 1 pessoa singular ➔ **was**.\n\n**Passo 3** — Adicione o PARTICÍPIO PASSADO do verbo principal (e opcionalmente 'by + autor'):\n→ **The postman was bitten by a dog**.",
    "teoria": "### Tratado Teórico: A Diátese Passiva e a Estrutura da Informação\n\nEm linguística funcional e teoria da informação (*information packaging*), a voz passiva é um recurso para controlar o **tema** (*topic / given information*) e o **rema** (*focus / new information*):\n\n#### 1. Quando o Agente Deve Ser Omitido (*Agent Deletion*)\nEm cerca de 80% das orações passivas autênticas no inglês, o agente com *by* é suprimido porque:\n- É redundante: *The thief was arrested (by the police).* (Óbvio).\n- É desconhecido: *My wallet was stolen on the bus.*\n- É universal: *English is spoken around the globe.*\n- Deseja-se evitar culpar alguém (*hedging* diplomático): *Mistakes were made.* (Em vez de: *You made mistakes*).\n\n#### 2. Passiva com Verbos de Dois Objetos (Ditransitivos)\nVerbos como *give, send, show, pay, offer* têm objeto direto (a coisa) e objeto indireto (a pessoa). No inglês, a PESSOA quase sempre se torna o sujeito da passiva:\n- Ativa: *They gave **Sarah** an award.*\n- Passiva Natural: ***Sarah was given** an award.* (Muito mais comum que: *An award was given to Sarah*).\n\n#### 3. Forma Interrogativa e Negativa\n- Negativa: *The report **was not sent** on time.*\n- Pergunta: ***Was** your car **damaged** in the accident?* / ***Are** credit cards **accepted** here?*",
    "ponte": "Em português, preferimos a voz passiva sintética com 'se': 'Vende-se esta casa', 'Descobriu-se a cura', 'Construiu-se a ponte em 1950'.\n\nNo inglês, não existe partícula 'se' apassivadora. Toda passiva é analítica (com verbo auxiliar Be + Particípio):\n- 'Vende-se esta casa' → **This house is sold** ou **This house is for sale**.\n- 'Fabricam-se carros aqui' → **Cars are manufactured here**.\n- 'O castelo foi construído no século XII' → **The castle was built in the 12th century**.",
    "exemplos_prc": [
      {
        "oracao": "Spanish is spoken by more than 500 million people worldwide.",
        "pergunta": "Por que 'is spoken' está no Present Simple da passiva?",
        "resposta": "Porque falar espanhol é uma verdade factual e permanente no mundo contemporâneo.",
        "conclusao": "is spoken by = é falado por."
      },
      {
        "oracao": "The Eiffel Tower was constructed for the 1889 World's Fair in Paris.",
        "pergunta": "Como a frase foi estruturada no passado da passiva?",
        "resposta": "Sujeito singular (Tower) + was + particípio passado regular (constructed).",
        "conclusao": "was constructed = foi construída."
      },
      {
        "oracao": "Are credit cards accepted at this small local bakery?",
        "pergunta": "Como foi construída a pergunta na voz passiva?",
        "resposta": "Invertendo o auxiliar 'Are' para antes do sujeito plural 'credit cards' + particípio 'accepted'.",
        "conclusao": "Are credit cards accepted = Cartões de crédito são aceitos?"
      },
      {
        "oracao": "The missing documents were not found during the internal investigation.",
        "pergunta": "Como a negação foi articulada nesta frase formal?",
        "resposta": "Sujeito plural (documents) + were not (were not) + particípio irregular de find (found).",
        "conclusao": "were not found = não foram encontrados."
      }
    ],
    "armadilhas": [
      {
        "errado": "It speaks English here.",
        "certo": "English is spoken here.",
        "motivo": "Em inglês não se usa o pronome ativo para substituir o 'se' apassivador: use a passiva 'is spoken'."
      },
      {
        "errado": "The telephone was invent by Alexander Graham Bell.",
        "certo": "The telephone was invented by Alexander Graham Bell.",
        "motivo": "A voz passiva exige sempre o particípio passado (invented), nunca o verbo na forma base."
      },
      {
        "errado": "The letters were sent from John.",
        "certo": "The letters were sent by John.",
        "motivo": "O agente que executou a ação passiva é introduzido por 'by', não por 'from'."
      },
      {
        "errado": "The car was broke yesterday.",
        "certo": "The car was broken yesterday. (ou: broke down)",
        "motivo": "O particípio passado de break é 'broken', não a forma de passado simples 'broke'."
      }
    ],
    "coda": "Na voz passiva o objeto vira protagonista: Verbo TO BE marca o tempo e o PARTICÍPIO define a ação!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com a voz passiva no passado:\n\n\"The famous novel '1984' ___ by George Orwell in 1949.\"",
        "opcoes": ["was written", "is written", "wrote", "was wrote"],
        "resposta": 0,
        "explicacao": "Ação concluída em 1949 com agente exige 'was written by'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a voz passiva no presente:\n\n\"Millions of packages ___ by postal workers every single day.\"",
        "opcoes": ["are delivered", "is delivered", "deliver", "were delivered"],
        "resposta": 0,
        "explicacao": "Sujeito no plural (packages) no presente habitual exige 'are delivered'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual preposição introduz o agente que realizou a ação na voz passiva?",
        "opcoes": ["by", "from", "for", "with"],
        "resposta": 0,
        "explicacao": "O agente da passiva é introduzido exclusivamente pela preposição 'by'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Como traduzir corretamente 'Fala-se inglês aqui'?",
        "opcoes": [
          "English is spoken here.",
          "Speaks English here.",
          "It speaks English here.",
          "English speaks here."
        ],
        "resposta": 0,
        "explicacao": "A tradução exata e padrão é 'English is spoken here'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no particípio passado irregular antes de revelar:\n\n\"The window was ___ by a stray football.\"\n(A janela foi quebrada por uma bola de futebol perdida.)",
        "resposta": "The window was broken by a stray football.",
        "revelacao": "The window was broken by a stray football.",
        "dica": "Particípio de break",
        "explicacao": "O particípio de break é 'broken': 'was broken'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na pergunta passiva antes de revelar:\n\n\"When ___ America ___ by Christopher Columbus?\"\n(Quando a América foi descoberta por Cristóvão Colombo?)",
        "resposta": "When was America discovered by Christopher Columbus?",
        "revelacao": "When was America discovered by Christopher Columbus?",
        "dica": "Was + America + discovered",
        "explicacao": "Pergunta passiva: 'When was America discovered...?'"
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no plural passivo do presente antes de revelar:\n\n\"These luxury sports cars ___ in Modena, Italy.\"\n(Estes carros esportivos de luxo são fabricados em Modena, Itália.)",
        "resposta": "These luxury sports cars are manufactured in Modena, Italy.",
        "revelacao": "These luxury sports cars are manufactured in Modena, Italy.",
        "dica": "Plural are + manufactured",
        "explicacao": "Sujeito plural no presente usa 'are manufactured'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na negativa passiva antes de revelar:\n\n\"The final contract ___ signed yesterday because of disagreements.\"\n(O contrato final não foi assinado ontem por causa de desacordos.)",
        "resposta": "The final contract was not signed yesterday because of disagreements.",
        "revelacao": "The final contract was not signed yesterday because of disagreements.",
        "dica": "Was not signed (ou wasn't signed)",
        "explicacao": "Negativa passiva no passado: 'was not signed'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição que indica quem realizou a ação passiva:\n\n\"The painting was created ___ a young Dutch artist.\"",
        "resposta": "by",
        "explicacao": "A preposição de autoria é 'by'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma do verbo To Be no passado para sujeito singular na passiva:\n\n\"The magnificent bridge ___ designed in 1928.\"",
        "resposta": "was",
        "explicacao": "Sujeito singular no passado usa 'was'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma do verbo To Be no presente para sujeito plural na passiva:\n\n\"Many foreign languages ___ taught at this university.\"",
        "resposta": "are",
        "explicacao": "Sujeito plural no presente usa 'are'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o particípio passado de 'make':\n\n\"All our delicious cakes are ___ with organic ingredients.\"",
        "resposta": "made",
        "explicacao": "O particípio de make é 'made'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 7: Relative Clauses (Defining)
  // ─────────────────────────────────────────────────────────────
  "b1-lez7": {
    "id": "b1-lez7",
    "num": "Lesson 7",
    "titulo": "Relative Clauses (Defining)",
    "subtitulo": "Who, Which, That, Whose, Where — Identificando com Precisão",
    "cena": {
      "origem": "dialogo",
      "titulo": "At the Technology Startup Networking Mixer",
      "texto": "**Leo:** Maya, look over there! That is the software engineer who designed our security algorithm.\n**Maya:** Really? And is that the laptop that won the innovation award last month?\n**Leo:** Yes! And that is Dr. Vance, whose research in quantum computing is famous worldwide.\n**Maya:** Amazing. Let's find a quiet corner where we can introduce ourselves."
    },
    "fio": {
      "abertura": "Como você conecta duas frases sobre a mesma pessoa ou coisa sem ter que ficar repetindo o nome o tempo todo? Em vez de dizer 'Eu conheci uma mulher. A mulher fala cinco línguas', você diz: 'Eu conheci uma mulher QUE fala cinco línguas'. Esse é o poder das Relative Clauses.",
      "descoberta": "Repare na agilidade da conversa entre Leo e Maya: «the engineer who designed» (pessoa = who), «the laptop that won» (coisa = that/which), «Dr. Vance, whose research» (posse = whose) e «a quiet corner where we can talk» (lugar = where). Cada elemento ganha sua ponte conectora perfeita!",
      "fecho": "Agora você domina os pronomes relativos essenciais. Use-os para definir e especificar exatamente de quem ou do que você está falando, sem quebras no fluxo do pensamento."
    },
    "alerta": "Brasileiros usam a palavra 'que' para absolutamente tudo em português (a pessoa que, a coisa que, o lugar que). No inglês, usar 'which' para pessoas (*the man which lives here*) é um erro clássico que soa desumanizante. Use **who** para pessoas e **which/that** para coisas!",
    "definicao": {
      "fenomeno": "The woman who called you is here · The car that I bought is electric · The city where I grew up · The man whose dog barked",
      "causa": "O que torna uma Relative Clause 'Defining' (Restritiva)?",
      "conceito": "Uma 'Defining Relative Clause' fornece informação essencial e indispensável para identificar de qual pessoa, objeto ou lugar estamos falando. Se retirarmos essa oração, a frase perde o sentido ou fica incompleta. Por ser essencial, ela NUNCA vem separada por vírgulas."
    },
    "inventario": [
      "WHO: exclusivo para seres humanos (The teacher who inspired me)",
      "WHICH: exclusivo para objetos, animais e conceitos inanimados (The book which I read)",
      "THAT: o curinga universal para pessoas e coisas em Defining Clauses (The movie that I loved)",
      "WHOSE: expressa posse (cujo, cuja, cujos, cujas) para pessoas ou entidades (The author whose book is famous)",
      "WHERE: conecta a lugares físicos (The restaurant where we had dinner)",
      "A Regra da Omissão do Relativo: quando o pronome relativo for o OBJETO do verbo seguinte, ele pode ser 100% omitido na fala (The book I bought vs The book that I bought)"
    ],
    "tabela_visual": "| Pronome Relativo | Aplica-se a... | Função Sintática | Exemplo Prático |\n|---|---|---|---|\n| **WHO** | **Pessoas** | Sujeito ou Objeto | *The doctor **who** treated my mother was very kind.* |\n| **WHICH** | **Coisas e Animais** | Sujeito ou Objeto | *The train **which** leaves at 8:00 is always punctual.* |\n| **THAT** | **Pessoas ou Coisas** | Sujeito ou Objeto (Defining) | *The phone **that** has the best battery life.* |\n| **WHOSE** | **Posse (de quem / cujo)** | Determinante possessivo | *I met a musician **whose** songs are trending on Spotify.* |\n| **WHERE** | **Lugares** | Adjunto adverbial de lugar | *This is the park **where** we used to play as children.* |\n| **Omissão Ø** | Quando for Objeto | Pronome omitido naturalmente | *The woman **(who)** I met yesterday was lovely.* |",
    "observacao_cards": [
      {
        "ingles": "Who (Pessoas)",
        "traducao": "que / quem",
        "genero": "Pronome Humano",
        "motivo": "Exclusivo para pessoas: 'The man who lives next door is friendly' (nunca 'which')."
      },
      {
        "ingles": "Which / That (Coisas)",
        "traducao": "que / o qual / a qual",
        "genero": "Pronome Inanimado",
        "motivo": "Para objetos e animais: 'The car which/that broke down'."
      },
      {
        "ingles": "Whose (Posse)",
        "traducao": "cujo / cuja / de quem",
        "genero": "Posse Relativa",
        "motivo": "Conecta o dono ao objeto possuído: 'The girl whose phone was stolen'."
      },
      {
        "ingles": "Omissão Natural do Relativo",
        "traducao": "omissão do 'que'",
        "genero": "Fluência Nativa",
        "motivo": "Se houver outro sujeito logo depois, pode deletar o pronome: 'The movie (that) we watched was great'."
      }
    ],
    "tecnica": "Como escolher o pronome relativo em 3 passos:\n\n**Passo 1** — O antecedente é uma PESSOA?\n→ Use **who** (ou **that**) (*The woman who called*).\n\n**Passo 2** — O antecedente é um OBJETO ou ANIMAL?\n→ Use **which** (ou **that**) (*The machine which works*).\n\n**Passo 3** — É uma relação de POSSE ('cujo pai', 'cujo carro') ou LUGAR?\n- Para posse → use **whose** (*The student whose grades improved*).\n- Para lugar → use **where** (*The hotel where we stayed*).",
    "teoria": "### Tratado Teórico: A Sintaxe das Orações Adjetivas Restritivas\n\nEm gramática gerativa clássica, as orações relativas atuam como modificadores dentro do sintagma nominal (*Noun Phrase Modification*):\n\n#### 1. Pronome como Sujeito vs Pronome como Objeto (*Subject vs Object Relatives*)\nEsta é uma das distinções mais elegantes da língua inglesa:\n- **Pronome como Sujeito:** O pronome relativo executa a ação do verbo da oração relativa. NUNCA pode ser omitido:\n  - *I met the woman [**who** wrote the book].* (Who é o sujeito de wrote ➔ omissão PROIBIDA: *I met the woman wrote* é agramatical!).\n- **Pronome como Objeto:** O verbo da oração relativa já possui outro sujeito próprio. O pronome relativo PODE (e na fala nativa quase sempre DEVE) ser omitido:\n  - *The book [**(that)** you lent me] was fascinating.* (You é o sujeito de lent ➔ o 'that' é objeto e pode sumir com elegância).\n\n#### 2. That vs Which em Defining Clauses\nEmbora ambos sejam aceitos na gramática internacional para coisas, a tradição estilística moderna recomenda enfaticamente:\n- **That:** para orações restritivas (sem vírgulas): *The car **that** I drive is blue.*\n- **Which:** preferido em orações explicativas não-restritivas (com vírgulas): *My car, **which** is blue, is parked outside.*\n\n#### 3. Whose: O Substituto de 'His / Her / Their'\n*Whose* substitui pronomes possessivos para fundir duas orações em uma só:\n- Frase 1: *I know a man.* + Frase 2: *His daughter is an astronaut.*\n- Fusão: *I know a man **whose daughter** is an astronaut.*",
    "ponte": "Em português, a palavra 'que' é onipresente: 'A pessoa que me ligou', 'O livro que comprei', 'O carro que quebrou'.\n\nNo inglês, não cometa o erro de usar *which* para pessoas:\n- ❌ *The girl which works with me.*\n- ✅ **The girl who works with me.** (ou: *that works with me*).\n- 'O hotel onde ficamos' → **The hotel where we stayed**.\n- 'O homem cujo carro foi roubado' → **The man whose car was stolen**.",
    "exemplos_prc": [
      {
        "oracao": "The architect who designed this eco-friendly skyscraper won an international prize.",
        "pergunta": "Por que 'who' é o pronome ideal nesta sentença?",
        "resposta": "Porque o antecedente 'architect' é um ser humano que atua como sujeito do verbo designed.",
        "conclusao": "architect who designed = arquiteto que projetou."
      },
      {
        "oracao": "This is the fascinating novel that kept me awake all night.",
        "pergunta": "O que o pronome 'that' está qualificando?",
        "resposta": "O substantivo inanimado 'novel' (romance literário) em uma oração restritiva.",
        "conclusao": "novel that kept me awake = romance que me manteve acordado."
      },
      {
        "oracao": "I met a photographer whose pictures have appeared on the cover of National Geographic.",
        "pergunta": "Qual função semântica 'whose' cumpre aqui?",
        "resposta": "Indica relação de posse e autoria: as fotos do fotógrafo (his pictures).",
        "conclusao": "photographer whose pictures = fotógrafo cujas fotos..."
      },
      {
        "oracao": "We visited the historic town where my grandparents were born.",
        "pergunta": "Por que usamos 'where' nesta oração?",
        "resposta": "Porque 'town' é um local geográfico onde a ação de nascer ocorreu.",
        "conclusao": "town where my grandparents were born = cidade onde meus avós nasceram."
      }
    ],
    "armadilhas": [
      {
        "errado": "The person which called you didn't leave a message.",
        "certo": "The person who called you didn't leave a message.",
        "motivo": "Nunca use 'which' para seres humanos; use sempre 'who' (ou 'that')."
      },
      {
        "errado": "The man who his car was stolen went to the police.",
        "certo": "The man whose car was stolen went to the police.",
        "motivo": "Não misture 'who' com 'his'. Para indicar posse, use o pronome possessivo relativo 'whose'."
      },
      {
        "errado": "The restaurant that we ate dinner was expensive. (sem preposição)",
        "certo": "The restaurant where we ate dinner was expensive. (ou: that we ate at)",
        "motivo": "Para indicar o local onde uma ação ocorreu, use 'where' (ou adicione a preposição ao final)."
      },
      {
        "errado": "The book, that I bought yesterday, is great.",
        "certo": "The book that I bought yesterday is great. (sem vírgulas)",
        "motivo": "'That' nunca deve ser precedido por vírgula em orações relativas restritivas."
      }
    ],
    "coda": "Pessoas usam WHO; coisas usam WHICH ou THAT; posse usa WHOSE; e lugares usam WHERE!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o pronome relativo para pessoas:\n\n\"The surgeon ___ performed the delicate operation is world-renowned.\"",
        "opcoes": ["who", "which", "whose", "where"],
        "resposta": 0,
        "explicacao": "Para seres humanos (surgeon), usamos 'who'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o pronome de posse:\n\n\"I felt very sorry for the family ___ home was destroyed in the storm.\"",
        "opcoes": ["whose", "who", "which", "that"],
        "resposta": 0,
        "explicacao": "Relação de posse (a casa da família) exige 'whose'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o pronome para coisas:\n\n\"The smartphone ___ has the best battery life is also the most expensive.\"",
        "opcoes": ["that", "who", "whose", "where"],
        "resposta": 0,
        "explicacao": "Para objetos em Defining Clauses, usamos 'that' ou 'which'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete para local físico:\n\n\"This is the charming café ___ Lucas and Sofia first met.\"",
        "opcoes": ["where", "which", "who", "whose"],
        "resposta": 0,
        "explicacao": "Para lugares onde a ação ocorreu usamos 'where'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no pronome para a pessoa que presta serviço antes de revelar:\n\n\"A mechanic is someone ___ repairs cars and motorcycles.\"\n(Um mecânico é alguém que conserta carros e motocicletas.)",
        "resposta": "A mechanic is someone who repairs cars and motorcycles.",
        "revelacao": "A mechanic is someone who repairs cars and motorcycles.",
        "dica": "Someone = pessoa (who)",
        "explicacao": "Para definir pessoas usamos 'who'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no pronome de posse antes de revelar:\n\n\"The candidate ___ resume was the most impressive got the executive job.\"\n(O candidato cujo currículo foi o mais impressionante conseguiu o emprego executivo.)",
        "resposta": "The candidate whose resume was the most impressive got the executive job.",
        "revelacao": "The candidate whose resume was the most impressive got the executive job.",
        "dica": "Posse (o currículo do candidato)",
        "explicacao": "Posse em orações relativas exige 'whose'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na oração com omissão elegante antes de revelar:\n\n\"The delicious pasta ___ she cooked tasted like authentic Italian food.\"\n(A massa deliciosa que ela cozinhou tinha gosto de autêntica comida italiana.)",
        "resposta": "The delicious pasta that she cooked tasted like authentic Italian food.",
        "revelacao": "The delicious pasta that she cooked tasted like authentic Italian food.",
        "dica": "That (ou which)",
        "explicacao": "Para objetos usamos 'that' (podendo inclusive ser omitido: 'pasta she cooked')."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no lugar onde se estuda antes de revelar:\n\n\"Oxford is the prestigious city ___ many British Prime Ministers studied.\"\n(Oxford é a cidade prestigiosa onde muitos primeiros-ministros britânicos estudaram.)",
        "resposta": "Oxford is the prestigious city where many British Prime Ministers studied.",
        "revelacao": "Oxford is the prestigious city where many British Prime Ministers studied.",
        "dica": "Lugar geográfico de ação",
        "explicacao": "Cidade onde estudaram exige 'where'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome relativo para seres humanos (3 letras):\n\n\"The woman ___ lives across the street is a professional violinist.\"",
        "resposta": "who",
        "explicacao": "O pronome para pessoas é 'who'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome relativo possessivo correspondente a 'cujo/cuja':\n\n\"He met an author ___ novel won the Booker Prize.\"",
        "resposta": "whose",
        "explicacao": "O pronome possessivo é 'whose'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome relativo de lugar (5 letras):\n\n\"That is the hospital ___ my twins were born.\"",
        "resposta": "where",
        "explicacao": "O pronome de lugar é 'where'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome relativo de 4 letras para coisas em Defining Clauses:\n\n\"The documentary ___ we watched yesterday was eye-opening.\"",
        "resposta": "that",
        "explicacao": "O pronome é 'that'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 8: Reported Speech (Basic)
  // ─────────────────────────────────────────────────────────────
  "b1-lez8": {
    "id": "b1-lez8",
    "num": "Lesson 8",
    "titulo": "Reported Speech (Basic)",
    "subtitulo": "Contando o que os Outros Disseram — O Recuo dos Tempos Verbais",
    "cena": {
      "origem": "dialogo",
      "titulo": "Reporting on the Project Meeting",
      "texto": "**Manager:** Did you speak to Alexander about the project timeline?\n**Assistant:** Yes, I did. He said that he was very busy with the client presentations.\n**Manager:** Did he tell you when the files would be ready?\n**Assistant:** He told me that he would send the documents tonight. He also said that he had already resolved the server issues."
    },
    "fio": {
      "abertura": "Como você conta para seu chefe o que o cliente disse na reunião? Ou como você fofoca com seu amigo sobre o que alguém falou ontem? No momento em que você relata palavras alheias, todo o tempo verbal dá um 'passo para trás' no tempo. Esse recuo temporal é o Reported Speech.",
      "descoberta": "Repare na transformação mágica que o assistente fez: Alexander disse no presente «I am busy», mas o assistente relatou no passado «He said that he was busy»! Alexander disse no futuro «I will send», e o assistente relatou «He said that he would send»! E disse «I have resolved», virando «He had resolved»!",
      "fecho": "Agora você domina a arte de relatar conversas. A regra de ouro é simples: toda frase relatada no passado dá um passo para trás na linha do tempo."
    },
    "alerta": "Brasileiros confundem constantemente **Say** e **Tell**. A regra mnemônica infalível é: Você 'diz algo' (**Say something**), mas você 'conta a alguém' (**Tell someone**). Dizer *'He said me'* é um dos erros mais dolorosos da língua inglesa!",
    "definicao": {
      "fenomeno": "Direct: \"I live in Madrid\" ➔ Reported: He said that he lived in Madrid · Direct: \"I will call you\" ➔ Reported: She told me that she would call me",
      "causa": "Por que os verbos mudam de tempo quando relatamos o que alguém disse?",
      "conceito": "Como o ato de fala original ocorreu no passado, a perspectiva temporal da narrativa é retroativa. Por isso, a gramática inglesa aplica a regra do 'Backshift' (recuo temporal): o presente vira passado simples, o passado simples e o present perfect viram past perfect, e 'will' vira 'would'."
    },
    "inventario": [
      "A Regra do Backshift (Recuo Temporal): Present Simple ➔ Past Simple; Present Continuous ➔ Past Continuous",
      "O Recuo dos Modais: Will ➔ Would; Can ➔ Could; May ➔ Might",
      "O Recuo dos Tempos Perfeitos: Past Simple & Present Perfect ➔ Past Perfect (Had done)",
      "A distinção vital entre SAY e TELL: Say that... vs Tell [someone] that...",
      "O uso opcional de 'that': 'He said that he was tired' ou 'He said he was tired' (ambos 100% corretos)"
    ],
    "tabela_visual": "| Discurso Direto (O que a pessoa falou) | Discurso Indireto (Como você relata) | Mudança Verbal (Backshift) |\n|---|---|---|\n| *\"I **am** happy.\"* | *She said (that) she **was** happy.* | **am/is ➔ was** |\n| *\"We **are working**.\"* | *They said (that) they **were working**.* | **are ➔ were** |\n| *\"I **like** traveling.\"* | *He said (that) he **liked** traveling.* | **Present Simple ➔ Past Simple** |\n| *\"I **will call** you.\"* | *She told me she **would call** me.* | **will ➔ would** |\n| *\"I **can swim**.\"* | *He said he **could swim**.* | **can ➔ could** |\n| *\"I **have finished**.\"* | *They said they **had finished**.* | **have finished ➔ had finished** |\n| *\"I **bought** a car.\"* | *He said he **had bought** a car.* | **Past Simple ➔ Past Perfect** |",
    "observacao_cards": [
      {
        "ingles": "Say vs Tell",
        "traducao": "dizer vs contar a alguém",
        "genero": "Regra Inegociável",
        "motivo": "SAY não aceita pessoa direta: 'He said that...' / TELL exige a pessoa: 'He told ME that...' (nunca 'he said me')."
      },
      {
        "ingles": "Will ➔ Would",
        "traducao": "vai fazer ➔ disse que faria",
        "genero": "Recuo de Futuro",
        "motivo": "\"I will help you\" vira no relato: 'He told me that he would help me'."
      },
      {
        "ingles": "Can ➔ Could",
        "traducao": "pode / sabe ➔ disse que podia / sabia",
        "genero": "Recuo de Modal",
        "motivo": "\"I can't come\" vira: 'She said that she couldn't come'."
      },
      {
        "ingles": "That é Opcional",
        "traducao": "o 'que' pode sumir",
        "genero": "Elegância Oral",
        "motivo": "'She said she was tired' é tão natural e correto quanto 'She said that she was tired'."
      }
    ],
    "tecnica": "A Mecânica do Backshift em 3 passos:\n\n**Passo 1** — Escolha o verbo introdutório correto:\n- Vai mencionar para quem foi dito? ➔ Use **Told + Pessoa** (*She told me*).\n- Não vai mencionar a pessoa ou vai dizer direto o conteúdo? ➔ Use **Said** (*She said that*).\n\n**Passo 2** — Ajuste os pronomes conforme quem está contando:\n→ Se Mark disse \"I am tired\", relate: *He said that **he** was tired*.\n\n**Passo 3** — Dê UM PASSO PARA TRÁS no tempo do verbo:\n- Presente vira Passado (*work ➔ worked*).\n- Will vira **Would** (*will go ➔ would go*).\n- Can vira **Could** (*can come ➔ could come*).",
    "teoria": "### Tratado Teórico: A Transposição Dêitica no Discurso Indireto\n\nEm linguística pragmática, o Reported Speech envolve a mudança completa das coordenadas **dêiticas** (pessoa, tempo e espaço) do evento de fala:\n\n#### 1. Dêixis Temporal e Espacial\nAlém do recuo dos verbos (*backshift*), palavras que apontam para o 'aqui e agora' do falante original devem ser transpostas para o tempo da narrativa:\n- *now* ➔ **then / at that time**\n- *today* ➔ **that day**\n- *yesterday* ➔ **the day before / the previous day**\n- *tomorrow* ➔ **the next day / the following day**\n- *here* ➔ **there**\n- *this* ➔ **that**\n\n#### 2. Exceção ao Backshift: Verdades Universais e Situações Ainda Vigentes\nSe a afirmação original continua sendo uma verdade permanente hoje, o recuo temporal é opcional e frequentemente não ocorre:\n- O professor disse: *\"The earth revolves around the sun.\"*\n- Relato: *The teacher said that the earth **revolves** around the sun.* (Ainda gira hoje!).\n- Maria me disse há 2 minutos: *\"I am hungry.\"*\n- Relato imediato: *Maria said that she **is** hungry.* (Ela ainda está com fome agora).\n\n#### 3. Erro Crítico: 'Say to me' vs 'Tell me'\nPode-se dizer *He said to me*, mas soa arcaico e pesado na língua moderna. Prefira sempre **He told me**.",
    "ponte": "Em português fazemos exatamente a mesma transposição: se João diz 'Eu estou cansado', nós contamos: 'O João disse que ele **estava** cansado'. Se diz 'Eu vou amanhã', contamos: 'Ele disse que **iria** no dia seguinte'.\n\nNo inglês, o único cuidado crítico é a batalha entre SAY e TELL:\n- ❌ *He said me that...*\n- ✅ **He told me that...**\n- ✅ **He said that...**\n- 'Ela me disse que viria' → **She told me that she would come**.",
    "exemplos_prc": [
      {
        "oracao": "She told me that she was studying for her bar exam that week.",
        "pergunta": "Como a frase original 'I am studying' foi transformada?",
        "resposta": "O pronome 'I' virou 'she', 'am studying' recuou para 'was studying' e 'this week' virou 'that week'.",
        "conclusao": "told me that she was studying = me disse que estava estudando."
      },
      {
        "oracao": "David said that he would call the supplier first thing in the morning.",
        "pergunta": "Qual foi a fala original de David antes do relato?",
        "resposta": "A fala original direta foi: \"I will call the supplier first thing in the morning.\"",
        "conclusao": "said that he would call = disse que ligaria."
      },
      {
        "oracao": "The police officer told the drivers that the road had been closed because of ice.",
        "pergunta": "Por que foi usado 'told' e não 'said'?",
        "resposta": "Porque o ouvinte direto a quem foi dito foi explicitado ('the drivers').",
        "conclusao": "told the drivers = disse / informou aos motoristas."
      },
      {
        "oracao": "They said that they couldn't attend the wedding ceremony in Rome.",
        "pergunta": "O que aconteceu com o modal 'can't' no relato indireto?",
        "resposta": "O modal 'can't' sofreu o recuo temporal natural para a forma de passado 'couldn't'.",
        "conclusao": "said they couldn't attend = disseram que não podiam comparecer."
      }
    ],
    "armadilhas": [
      {
        "errado": "He said me that he was tired.",
        "certo": "He told me that he was tired. (ou: He said that he was tired.)",
        "motivo": "O verbo 'say' nunca aceita o objeto pessoal diretamente colado nele: use 'told me'."
      },
      {
        "errado": "She told that she would come.",
        "certo": "She said that she would come. (ou: She told us that she would come.)",
        "motivo": "O verbo 'tell' exige obrigatoriamente a pessoa a quem se fala antes do 'that'."
      },
      {
        "errado": "He said that he will call tomorrow.",
        "certo": "He said that he would call the next day.",
        "motivo": "Em relatos no passado, 'will' deve sofrer o backshift para 'would'."
      },
      {
        "errado": "She said she can speak three languages.",
        "certo": "She said she could speak three languages.",
        "motivo": "O modal 'can' recua para 'could' no Reported Speech padrão."
      }
    ],
    "coda": "Com quem falou? Use TOLD ME. Sem a pessoa? Use SAID THAT. E lembre-se: todo tempo verbal dá um passo para trás!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Qual verbo completa corretamente a oração com a pessoa explícita?\n\n\"Julia ___ me that she had passed her driving test.\"",
        "opcoes": ["told", "said", "spoke", "explained to"],
        "resposta": 0,
        "explicacao": "Com o pronome de pessoa direto 'me', usamos 'told'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Como relatar a fala direta: *\"I will help you with your luggage\"*?",
        "opcoes": [
          "He said that he would help me with my luggage.",
          "He said that he will help me with my luggage.",
          "He told that he would help me with my luggage.",
          "He said me that he would help my luggage."
        ],
        "resposta": 0,
        "explicacao": "'Will' sofre recuo para 'would', e 'said that' é a forma correta."
      },
      {
        "tipo": "escolha",
        "pergunta": "Como relatar a fala direta: *\"I am feeling sick today\"*?",
        "opcoes": [
          "She said that she was feeling sick that day.",
          "She said that she is feeling sick today.",
          "She told that she was feeling sick.",
          "She said me she was sick."
        ],
        "resposta": 0,
        "explicacao": "'Am feeling' recua para 'was feeling', e 'today' vira 'that day'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual das frases está gramaticalmente PERFEITA?",
        "opcoes": [
          "Mark told his manager that he couldn't work on Saturday.",
          "Mark said his manager that he couldn't work on Saturday.",
          "Mark told to his manager that he can't work on Saturday.",
          "Mark said that his manager he couldn't work."
        ],
        "resposta": 0,
        "explicacao": "'Told his manager that...' conecta o ouvinte com perfeição e aplica o backshift em couldn't."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no recuo de 'have seen' antes de revelar:\n\n\"Direct: 'I have already seen this movie.'\"\n\"Reported: He said that he ___ this movie.\"",
        "resposta": "He said that he had already seen this movie.",
        "revelacao": "He said that he had already seen this movie.",
        "dica": "Present Perfect vira Past Perfect",
        "explicacao": "Have seen recua para 'had already seen'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no recuo de 'can' antes de revelar:\n\n\"Direct: 'I can't find my keys.'\"\n\"Reported: She told me that she ___ her keys.\"",
        "resposta": "She told me that she couldn't find her keys.",
        "revelacao": "She told me that she couldn't find her keys.",
        "dica": "Can't recua para couldn't",
        "explicacao": "Can't vira 'couldn't find'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no recuo do Present Simple antes de revelar:\n\n\"Direct: 'I don't like spicy food.'\"\n\"Reported: He said that he ___ spicy food.\"",
        "resposta": "He said that he didn't like spicy food.",
        "revelacao": "He said that he didn't like spicy food.",
        "dica": "Don't like recua para didn't like",
        "explicacao": "Don't like vira 'didn't like'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no verbo introdutório sem ouvinte direto antes de revelar:\n\n\"The pilot ___ that the flight would be delayed by thirty minutes.\"\n(O piloto disse que o voo atrasaria trinta minutos.)",
        "resposta": "The pilot said that the flight would be delayed by thirty minutes.",
        "revelacao": "The pilot said that the flight would be delayed by thirty minutes.",
        "dica": "Sem ouvinte direto usa-se said",
        "explicacao": "Sem pessoa direta usamos 'said that'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o passado do verbo 'tell' usado com o pronome 'us':\n\n\"The teacher ___ us that the test would be easy.\"",
        "resposta": "told",
        "explicacao": "O passado de tell é 'told'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o verbo auxiliar que substitui 'will' no Reported Speech:\n\n\"She promised that she ___ arrive on time.\"",
        "resposta": "would",
        "explicacao": "Will vira 'would'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o verbo modal que substitui 'can' no relato passado:\n\n\"He explained that he ___ not attend the dinner party.\"",
        "resposta": "could",
        "explicacao": "Can vira 'could'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma do passado de 'say':\n\n\"The doctor ___ that I needed more sleep.\"",
        "resposta": "said",
        "explicacao": "O passado de say é 'said'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 9: Used to
  // ─────────────────────────────────────────────────────────────
  "b1-lez9": {
    "id": "b1-lez9",
    "num": "Lesson 9",
    "titulo": "Used to",
    "subtitulo": "Hábitos e Estados no Passado que Já Não Existem Mais",
    "cena": {
      "origem": "dialogo",
      "titulo": "Looking at Old College Photos",
      "texto": "**Chloe:** Wow, look at this old photograph of us from university!\n**Daniel:** Oh my goodness! I used to have long curly hair and I used to play electric guitar in a rock band.\n**Chloe:** That's true! And you didn't use to drink coffee back then, right?\n**Daniel:** Exactly! I used to drink only tea. Now I drink three espressos every single day. Did you use to ride a bicycle to campus?\n**Chloe:** Yes, I used to ride my bike every day, but now I drive a car."
    },
    "fio": {
      "abertura": "Como você fala sobre aquela época em que você tinha cabelo comprido, morava em outra cidade ou praticava um esporte que hoje você abandonou? Em português dizemos 'Eu costumava' ou simplesmente usamos o pretérito imperfeito ('Eu jogava bola'). No inglês, a expressão definitiva para isso é o **Used to**.",
      "descoberta": "Repare na conversa nostálgica de Daniel e Chloe: «I used to have long hair», «I used to play electric guitar», «you didn't use to drink coffee», «Did you use to ride a bike?». Toda vez que eles usam 'used to', o ouvinte entende imediatamente: isso era verdade no passado, MAS NÃO É MAIS VERDADE HOJE!",
      "fecho": "Agora você domina o marcador oficial da nostalgia e da transformação pessoal. Guarde: **Used to** é exclusivo do passado e sempre conecta direto a um verbo puro."
    },
    "alerta": "O erro mais perigoso de estudantes em nível intermediário é inventar um presente que não existe: dizer *'I use to wake up at 7 AM'* querendo dizer 'eu costumo acordar às 7'. Em inglês, **used to** NÃO TEM PRESENTE! Para hábitos no presente, usa-se **usually** (*I usually wake up at 7 AM*).",
    "definicao": {
      "fenomeno": "I used to smoke, but I quit three years ago · She used to be very shy as a child · Did you use to live in Toronto? · I didn't use to like olives",
      "causa": "Qual é a diferença entre 'I played tennis' e 'I used to play tennis'?",
      "conceito": "'I played tennis' relata apenas um evento passado pontual ou genérico. Já 'I used to play tennis' enfatiza expressamente o CONTRASTE com a realidade presente: significa que era um hábito regular de longa duração no passado, mas que atualmente foi 100% abandonado."
    },
    "inventario": [
      "A forma afirmativa invariável: Sujeito + USED TO + Verbo Base Puro",
      "A forma negativa com 'didn't': Sujeito + DIDN'T USE TO + Verbo Base (atenção: perde o 'd' de used!)",
      "A forma interrogativa com 'did': DID + Sujeito + USE TO + Verbo Base?",
      "Os dois usos: 1) Hábitos e ações repetidas no passado; 2) Estados permanentes no passado (used to have, used to live, used to be)",
      "A regra proibitiva: 'used to' NUNCA se aplica a hábitos do presente (use 'usually' ou 'normally')"
    ],
    "tabela_visual": "| Modalidade | Estrutura Sintática | Exemplo Autêntico | Significado Implícito no Presente |\n|---|---|---|---|\n| **Afirmativa (+)** | Sujeito + **used to** + V. puro | *I **used to smoke**.* | Fumei regularmente no passado, mas **não fumo mais** |\n| **Negativa (-)** | Sujeito + **didn't use to** + V. puro | *She **didn't use to like** sushi.* | Não gostava antes, mas **agora adora** |\n| **Pergunta (?)** | **Did** + Suj. + **use to** + V. puro? | ***Did you use to play** soccer?* | Você tinha esse hábito no passado? |\n| **Estado Passado** | Sujeito + **used to be/live** | *He **used to live** in Paris.* | Morava em Paris antes, mas **mudou-se** |\n| **Erro Fatal** | ❌ *I use to play tennis now.* | ✅ *I **usually play** tennis now.* | Para presente, use SEMPRE **usually** |",
    "observacao_cards": [
      {
        "ingles": "Used to + Verbo",
        "traducao": "costumava / fazia no passado",
        "genero": "Hábito Abandonado",
        "motivo": "Mostra contraste: 'I used to bite my nails' (tinha esse vício, mas parei)."
      },
      {
        "ingles": "Didn't use to (Sem 'D')",
        "traducao": "não costumava",
        "genero": "Negativa com Auxiliar",
        "motivo": "Como o 'didn't' já carrega o passado, o 'used' perde a letra 'd': 'didn't use to'."
      },
      {
        "ingles": "Did you use to...?",
        "traducao": "Você costumava...?",
        "genero": "Interrogação",
        "motivo": "Pergunta sobre a juventude ou infância: 'Did you use to have a pet?'"
      },
      {
        "ingles": "Used to vs Be used to",
        "traducao": "costumava vs estar acostumado a",
        "genero": "Falso Amigo Crítico",
        "motivo": "'Used to play' = costumava jogar. 'I am used to playing' = estou habituado/acostumado a jogar."
      }
    ],
    "tecnica": "A Tríade de 'Used to' em 3 passos:\n\n**Passo 1** — É um hábito ou estado do PASSADO que acabou e não existe mais?\n→ Use **used to + verbo base** (*I used to live in Madrid*).\n\n**Passo 2** — É uma pergunta ou negativa com 'did/didn't'?\n→ REMOVA a letra 'D' da palavra *used*: escreva **didn't use to** ou **Did you use to**.\n\n**Passo 3** — É um hábito do PRESENTE ('eu costumo acordar cedo')?\n→ DELETE 'used to' da sua mente! Use **usually** (*I usually wake up early*).",
    "teoria": "### Tratado Teórico: O Aspecto Habitual do Passado\n\nEm linguística histórica, *used to* gramaticalizou-se como um operador aspectual exclusivo de **hábito passado descontinuado** (*discontinued past habit*):\n\n#### 1. Hábitos vs Estados\n- **Hábitos repetitivos:** *We **used to spend** every summer in Cornwall.* (Ação repetida dezenas de vezes).\n- **Estados duradouros:** *This building **used to be** a cinema.* / *She **used to have** blond hair.* / *I **used to believe** in ghosts.*\n- *Nota de comparação com 'Would':* Podemos usar *would* para ações repetidas no passado (*We would play in the garden for hours*), mas *would* NÃO pode ser usado para estados (é proibido dizer: *This building would be a cinema*). Logo, *used to* é muito mais versátil e universal.\n\n#### 2. Cuidado com as Três Estruturas Parecidas\nNão confunda as três estruturas que usam a palavra 'used':\n1. **Used to + Verbo Base:** Hábito passado descontinuado (*I used to run* = corria no passado, parei).\n2. **Be used to + Substantivo / Gerúndio (-ing):** Estar acostumado / adaptado a algo (*I am used to the cold weather* / *I am used to waking up early*).\n3. **Get used to + Substantivo / Gerúndio (-ing):** O processo de acostumar-se / adaptar-se (*You will get used to the noise*).",
    "ponte": "Em português, o pretérito imperfeito é muito amplo: 'Eu corria' pode significar que eu costumava correr quando jovem ou que eu estava correndo no momento em que algo aconteceu.\n\nNo inglês, a distinção é cirúrgica:\n- 'Eu corria quando era jovem (hábito antigo)' → **I used to run when I was young**.\n- 'Eu estava correndo quando o telefone tocou' → **I was running when the phone rang** (Past Continuous).\n- 'Eu costumo acordar às 7h' → **I usually wake up at 7 AM** (proibido dizer *I use to wake up*!).",
    "exemplos_prc": [
      {
        "oracao": "My grandfather used to walk five miles to school through the woods.",
        "pergunta": "O que 'used to walk' nos revela sobre a vida do avô?",
        "resposta": "Era uma rotina diária regular no passado dele que não ocorre mais hoje em dia.",
        "conclusao": "used to walk = costumava caminhar / caminhava."
      },
      {
        "oracao": "She didn't use to like classical music, but now she attends the symphony regularly.",
        "pergunta": "Por que a palavra 'use' perdeu a letra 'd' nesta oração?",
        "resposta": "Porque a presença do auxiliar 'didn't' já marca o tempo passado, exigindo a forma base 'use to'.",
        "conclusao": "didn't use to like = não costumava gostar."
      },
      {
        "oracao": "Did you use to have any pets when you were growing up in the countryside?",
        "pergunta": "Como foi formulada a pergunta sobre o passado da infância?",
        "resposta": "Auxiliar 'Did' + sujeito 'you' + 'use to' sem d + verbo base 'have'.",
        "conclusao": "Did you use to have = Você costumava ter / tinha...?"
      },
      {
        "oracao": "This old warehouse used to be a bustling textile factory in the 1920s.",
        "pergunta": "Por que 'used to' foi usado para um prédio?",
        "resposta": "Para descrever um estado permanente e histórico que não existe mais no presente.",
        "conclusao": "used to be = costumava ser / era."
      }
    ],
    "armadilhas": [
      {
        "errado": "I use to go to the gym on Mondays. (falando de hábito atual)",
        "certo": "I usually go to the gym on Mondays.",
        "motivo": "'Used to' não existe no presente. Para hábitos atuais use 'usually' ou 'normally'."
      },
      {
        "errado": "I didn't used to drink green tea.",
        "certo": "I didn't use to drink green tea.",
        "motivo": "Com o auxiliar 'didn't', a palavra perde a letra 'd': use 'didn't use to'."
      },
      {
        "errado": "Did you used to play tennis?",
        "certo": "Did you use to play tennis?",
        "motivo": "Em perguntas com 'Did', a forma correta é 'Did you use to'."
      },
      {
        "errado": "I used to playing the piano when I was small.",
        "certo": "I used to play the piano when I was small.",
        "motivo": "Após 'used to' de hábito passado, o verbo principal deve estar puro (play), sem -ing."
      }
    ],
    "coda": "Hábito ou estado do passado que acabou: USED TO! Pergunta ou negativa com did: USE TO! Hábito no presente: use USUALLY!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a oração sobre um hábito do passado que não existe mais:\n\n\"He ___ smoke twenty cigarettes a day, but he quit five years ago.\"",
        "opcoes": ["used to", "uses to", "was used to", "usually"],
        "resposta": 0,
        "explicacao": "Hábito passado abandonado exige 'used to'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual é a forma negativa correta de 'used to'?",
        "opcoes": [
          "She didn't use to eat seafood.",
          "She didn't used to eat seafood.",
          "She used not to eat seafood.",
          "She wasn't use to eat seafood."
        ],
        "resposta": 0,
        "explicacao": "Com o auxiliar 'didn't', escreve-se 'didn't use to' (sem a letra d)."
      },
      {
        "tipo": "escolha",
        "pergunta": "Como expressar um hábito no PRESENTE: 'Eu costumo ler antes de dormir'?",
        "opcoes": [
          "I usually read before going to sleep.",
          "I use to read before going to sleep.",
          "I am used to read before going to sleep.",
          "I used to read before going to sleep."
        ],
        "resposta": 0,
        "explicacao": "Para hábitos no presente usa-se 'usually', nunca 'use to'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a pergunta sobre a infância:\n\n\"___ you ___ to play hide-and-seek when you were children?\"",
        "opcoes": [
          "Did / use",
          "Did / used",
          "Were / use",
          "Do / used"
        ],
        "resposta": 0,
        "explicacao": "A pergunta correta é 'Did you use to play...?'"
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no estado passado antes de revelar:\n\n\"There ___ to be a lovely small bakery on that corner.\"\n(Costumava haver / Havia uma padariazinha charmosa naquela esquina.)",
        "resposta": "There used to be a lovely small bakery on that corner.",
        "revelacao": "There used to be a lovely small bakery on that corner.",
        "dica": "There used to be",
        "explicacao": "Existência que não existe mais: 'There used to be'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na negativa com 'didn't' antes de revelar:\n\n\"We ___ to watch television when we lived in the mountain cabin.\"\n(Não costumávamos assistir televisão quando morávamos na cabana da montanha.)",
        "resposta": "We didn't use to watch television when we lived in the mountain cabin.",
        "revelacao": "We didn't use to watch television when we lived in the mountain cabin.",
        "dica": "Didn't use to (sem d)",
        "explicacao": "A negativa padrão é 'didn't use to watch'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no contraste de vida antes de revelar:\n\n\"My brother ___ to be very introverted, but now he is a public motivational speaker.\"\n(Meu irmão costumava ser muito introvertido, mas agora é palestrante motivacional.)",
        "resposta": "My brother used to be very introverted, but now he is a public motivational speaker.",
        "revelacao": "My brother used to be very introverted, but now he is a public motivational speaker.",
        "dica": "Used to be",
        "explicacao": "Estado passado que se transformou: 'used to be'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na pergunta antes de revelar:\n\n\"Where did you ___ to spend your summer holidays as a teenager?\"\n(Onde você costumava passar suas férias de verão como adolescente?)",
        "resposta": "Where did you use to spend your summer holidays as a teenager?",
        "revelacao": "Where did you use to spend your summer holidays as a teenager?",
        "dica": "Após did usa-se use to (sem d)",
        "explicacao": "A grafia na pergunta com did é 'use to'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma afirmativa completa (duas palavras) para 'costumava ter':\n\n\"She ___ long brown hair when she was younger.\"",
        "resposta": "used to have",
        "explicacao": "A estrutura afirmativa é 'used to have'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a grafia de 'used' (sem d) após o auxiliar didn't:\n\n\"I didn't ___ to like black coffee.\"",
        "resposta": "use",
        "explicacao": "Após didn't usa-se 'use'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que expressa hábito no PRESENTE (começa com U):\n\n\"I ___ have a quick breakfast at 7:30 AM.\" (geralmente / costumo)",
        "resposta": "usually",
        "explicacao": "Hábito no presente usa 'usually'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o auxiliar de pergunta no passado para 'use to':\n\n\"___ they use to live in Toronto?\"",
        "resposta": "Did",
        "explicacao": "Perguntas de passado usam o auxiliar 'Did'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 10: Modals of Deduction (Present)
  // ─────────────────────────────────────────────────────────────
  "b1-lez10": {
    "id": "b1-lez10",
    "num": "Lesson 10",
    "titulo": "Modals of Deduction (Present)",
    "subtitulo": "Must be, Can't be, Might/Could be — Deduções e Suposições Lógicas",
    "cena": {
      "origem": "dialogo",
      "titulo": "Investigating a Mystery at the Office",
      "texto": "**Sarah:** Look! The lights are still on in the director's office, and his coat is hanging on the chair.\n**Tom:** He must still be in the building. Maybe he is in the conference room.\n**Sarah:** But his car isn't in his reserved parking spot outside!\n**Tom:** In that case, it can't be him. It might be the evening cleaning staff, or it could be security making their rounds."
    },
    "fio": {
      "abertura": "Você vê fumaça saindo de uma janela. Você não tem certeza absoluta se é fogo ou churrasco, mas seu cérebro calcula as probabilidades instantaneamente. Para expressar o quanto você tem certeza sobre algo no presente, o inglês usa os Modais de Dedução.",
      "descoberta": "Repare na dedução lógica de Tom e Sarah: vendo o casaco, Tom conclui com 95% de certeza «He must be in the building». Mas ao ver que o carro não está, deduz a impossibilidade lógica absoluta «It can't be him»! E para as alternativas incertas de 50%, usa «It might be» ou «It could be»!",
      "fecho": "Agora você domina o termômetro da dedução lógica: **Must** para quase certeza positiva, **Can't** para impossibilidade lógica, e **Might / Could** para hipóteses em aberto."
    },
    "alerta": "O erro mais chocante cometido por brasileiros neste ponto é usar *'mustn't'* para dedução negativa (*It mustn't be him* - ERRADO!). Em inglês, 'mustn't' expressa PROIBIÇÃO legal (*você não deve fazer isso*). A dedução lógica negativa de 'ele com certeza não é' é SEMPRE **can't be**!",
    "definicao": {
      "fenomeno": "He has three Ferraris; he must be rich (95% certeza) · She is in Tokyo today; that can't be her in the street (0% probabilidade) · Take an umbrella; it might rain (50% possibilidade)",
      "causa": "Por que não dizemos 'It mustn't be true' se 'must' é o positivo?",
      "conceito": "'Must' expressa a dedução lógica afirmativa irresistível baseada em evidências. Porém, o sistema modal inglês atribui a função de impossibilidade lógica ao modal **can't** (*It can't be true* = É logicamente impossível ser verdade). O termo 'mustn't' é reservado para proibições morais e regulamentares."
    },
    "inventario": [
      "MUST BE (95% de Certeza Lógica Afirmativa): todas as evidências apontam para isso (He must be tired)",
      "CAN'T BE (95% de Impossibilidade Lógica): é impossível pelas evidências (She can't be forty; she looks twenty)",
      "MIGHT BE / MAY BE / COULD BE (30% a 50% de Possibilidade): talvez seja, é uma hipótese em aberto",
      "A estrutura da dedução: Modal + Verbo Base Puro (must be, can't have, might know)",
      "A proibição do 'mustn't' em deduções: 'mustn't' = proibição; 'can't' = dedução negativa"
    ],
    "tabela_visual": "| Grau de Certeza | Modal de Dedução | Tradução Lógica | Evidência / Exemplo Prático |\n|---|---|---|---|\n| **Quase 100% de Certeza (+)** | **MUST** + verbo | *com certeza é / deve ser* | *He has worked 14 hours; he **must be** exhausted.* |\n| **Impossibilidade Lógica (-)** | **CAN'T** + verbo | *com certeza NÃO é / não pode ser* | *She was in Paris an hour ago; she **can't be** here.* |\n| **Possibilidade Aberta (~50%)** | **MIGHT** + verbo | *talvez seja / pode ser que seja* | *The phone is ringing; it **might be** John.* |\n| **Possibilidade Aberta (~50%)** | **COULD** + verbo | *poderia ser / é possível que seja* | *Don't eat that berry; it **could be** poisonous.* |\n| **Atenção Proibitiva** | ❌ *It mustn't be him.* | ✅ *It **can't be** him.* | Impossibilidade exige sempre **CAN'T** |",
    "observacao_cards": [
      {
        "ingles": "Must be (Certeza Positiva)",
        "traducao": "com certeza é / deve ser",
        "genero": "Dedução Conclusiva",
        "motivo": "Todas as pistas apontam para isso: 'You haven't eaten all day; you must be starving!'."
      },
      {
        "ingles": "Can't be (Impossibilidade)",
        "traducao": "não pode ser / com certeza não é",
        "genero": "Dedução Negativa",
        "motivo": "É contra as leis da lógica: 'He can't be American; he doesn't speak a word of English'."
      },
      {
        "ingles": "Might be / Could be",
        "traducao": "talvez seja / pode ser",
        "genero": "Possibilidade Neutra",
        "motivo": "Hipótese de 50%: 'Where are my keys? — They might be in your jacket pocket'."
      },
      {
        "ingles": "Mustn't = Proibição (Não Dedução)",
        "traducao": "proibido / não deve fazer",
        "genero": "Alerta de Uso",
        "motivo": "'You mustn't smoke here' (proibição legal). Nunca use para deduzir que algo não é verdade."
      }
    ],
    "tecnica": "O Termômetro da Dedução em 3 passos:\n\n**Passo 1** — As evidências mostram que é QUASE CERTO que SIM?\n→ Use **MUST + Verbo Puro** (*She must be the CEO*).\n\n**Passo 2** — As evidências provam que é LOGICAMENTE IMPOSSÍVEL?\n→ Use **CAN'T + Verbo Puro** (*It can't be true / He can't be at home*).\n\n**Passo 3** — Você NÃO TEM CERTEZA e está apenas especulando uma possibilidade (talvez sim, talvez não)?\n→ Use **MIGHT**, **MAY** ou **COULD** (*They might be stuck in traffic*).",
    "teoria": "### Tratado Teórico: A Modalidade Epistêmica no Inglês Contemporâneo\n\nEm linguística modal, os Modais de Dedução expressam **modalidade epistêmica** (*epistemic modality* — julgamento do falante sobre a plausibilidade da verdade de uma proposição baseada em evidências conhecidas):\n\n#### 1. A Escala Epistêmica de Força\nPodemos ordenar os modais pelo seu grau decrescente de compromisso epistêmico com a verdade:\n1. **Verbo to be factual (100% de certeza empírica):** *He **is** in the garden.* (Eu estou vendo ele lá com meus próprios olhos).\n2. **Must (95% de dedução dedutiva):** *He **must be** in the garden.* (O casaco dele sumiu e ouço passos lá fora; não vejo ele diretamente, mas é a única conclusão lógica).\n3. **Should / Ought to (80% de expectativa razoável):** *He **should be** here soon.* (O trânsito estava bom, então é esperado que chegue).\n4. **May / Might / Could (30-50% de possibilidade especulativa):** *He **might be** in the garden.* (É uma possibilidade entre várias outras).\n5. **Can't (95% de refutação epistêmica):** *He **can't be** in the garden; it is locked and I have the only key.*\n\n#### 2. Deduções com Verbos em Andamento (*Continuous Deduction*)\nPodemos deduzir o que alguém está fazendo exatamente agora combinando o modal com **be + V-ing**:\n- *Don't call him now; he **must be sleeping**.* (São 3 da manhã; com certeza ele está dormindo).\n- *Why is she smiling at her phone? She **might be texting** her new boyfriend.*",
    "ponte": "Em português, dizemos 'Deve ser ele' tanto para probabilidade média quanto para quase certeza, e costumamos dizer 'Não deve ser ele'.\n\nNo inglês, a distinção é rigorosa:\n- 'Com certeza é o João' / 'Deve ser o João' (quase certeza) → **It must be John**.\n- 'Com certeza NÃO é o João' / 'Não pode ser o João' → **It can't be John** (nunca *it mustn't be*!).\n- 'Talvez seja o João' / 'Pode ser o João' → **It might be John** ou **It could be John**.",
    "exemplos_prc": [
      {
        "oracao": "You have been traveling for twenty hours without sleep; you must be exhausted!",
        "pergunta": "Por que 'must be' foi selecionado nesta dedução?",
        "resposta": "Porque vinte horas de viagem sem dormir é evidência esmagadora de cansaço extremo.",
        "conclusao": "you must be exhausted = você com certeza deve estar exausto!"
      },
      {
        "oracao": "That woman can't be David's mother; she looks younger than him!",
        "pergunta": "Por que usamos 'can't be' e não 'mustn't be'?",
        "resposta": "Porque a evidência visual torna a afirmação uma impossibilidade biológica lógica.",
        "conclusao": "can't be = com certeza não pode ser."
      },
      {
        "oracao": "Don't throw away that old document; it might be important for the tax audit.",
        "pergunta": "Qual grau de certeza 'might' expressa nesta advertência?",
        "resposta": "Possibilidade em aberto (talvez seja importante, não temos certeza absoluta).",
        "conclusao": "it might be important = talvez seja importante."
      },
      {
        "oracao": "Where is the director? — I am not sure, he could be meeting the new investors.",
        "pergunta": "Por que 'could be meeting' foi usado?",
        "resposta": "Para expressar uma hipótese contínua plausível sobre a atividade atual do diretor.",
        "conclusao": "could be meeting = poderia estar / pode estar em reunião."
      }
    ],
    "armadilhas": [
      {
        "errado": "It mustn't be true! I don't believe it.",
        "certo": "It can't be true! I don't believe it.",
        "motivo": "Para dedução lógica negativa ('não pode ser verdade'), use sempre 'can't', nunca 'mustn't'."
      },
      {
        "errado": "He must to be rich because he drives a Ferrari.",
        "certo": "He must be rich because he drives a Ferrari.",
        "motivo": "Modais como 'must' são seguidos diretamente pelo infinitivo sem 'to' (bare infinitive)."
      },
      {
        "errado": "She must is at home right now.",
        "certo": "She must be at home right now.",
        "motivo": "Após 'must', usa-se a forma base do verbo To Be ('be'), nunca 'is' ou 'are'."
      },
      {
        "errado": "It could to rain this afternoon.",
        "certo": "It could rain this afternoon. (ou: might rain)",
        "motivo": "Não use 'to' após o modal 'could'."
      }
    ],
    "coda": "Quase certeza que SIM: MUST! Certeza absoluta que NÃO: CAN'T! E quando houver dúvida no ar: MIGHT ou COULD!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com a dedução de quase certeza afirmativa:\n\n\"Listen to that fluent accent! She ___ a native English speaker.\"",
        "opcoes": ["must be", "can't be", "might to be", "should being"],
        "resposta": 0,
        "explicacao": "A evidência auditiva clara leva à dedução conclusiva: 'must be'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a dedução de impossibilidade lógica:\n\n\"That diamond ring costs only ten dollars? It ___ a genuine diamond!\"",
        "opcoes": ["can't be", "mustn't be", "might not be", "isn't to be"],
        "resposta": 0,
        "explicacao": "Por custar apenas 10 dólares, é logicamente impossível ser genuíno: 'can't be'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a possibilidade em aberto (~50%):\n\n\"Where are my reading glasses? — Check the living room, they ___ on the coffee table.\"",
        "opcoes": ["might be", "must to be", "can't be", "are to be"],
        "resposta": 0,
        "explicacao": "Hipótese sem certeza de localização usa 'might be'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Por que esta frase é um erro grave: *\"He mustn't be the manager\"*?",
        "opcoes": [
          "Porque 'mustn't' expressa proibição; para dedução lógica negativa deve-se usar 'can't be'.",
          "Porque falta a palavra 'to'.",
          "Porque 'manager' é substantivo feminino.",
          "Porque deveria usar 'won't be'."
        ],
        "resposta": 0,
        "explicacao": "Dedução de impossibilidade lógica usa obrigatoriamente 'can't be'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no modal de certeza lógica antes de revelar:\n\n\"You haven't slept for twenty-four hours! You ___ completely exhausted.\"\n(Você não dorme há vinte e quatro horas! Você com certeza deve estar completamente exausto.)",
        "resposta": "You must be completely exhausted.",
        "revelacao": "You must be completely exhausted.",
        "dica": "Must + be",
        "explicacao": "Evidência clara de cansaço extremo exige 'must be'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no modal de impossibilidade antes de revelar:\n\n\"He was in Sydney this morning, so he ___ in London tonight; the flight takes 24 hours!\"\n(Ele estava em Sydney esta manhã, então ele com certeza não pode estar em Londres esta noite...)",
        "resposta": "He can't be in London tonight.",
        "revelacao": "He can't be in London tonight.",
        "dica": "Impossibilidade lógica (can't be)",
        "explicacao": "Impossibilidade física exige 'can't be'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na hipótese aberta antes de revelar:\n\n\"Take a warm jacket with you; the temperature ___ drop later this evening.\"\n(Leve uma jaqueta quente com você; a temperatura pode cair mais tarde esta noite.)",
        "resposta": "The temperature might drop later this evening.",
        "revelacao": "The temperature might drop later this evening.",
        "dica": "Might ou could",
        "explicacao": "Possibilidade meteorológica sem certeza usa 'might drop' ou 'could drop'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na dedução contínua antes de revelar:\n\n\"The lights are off and their car is gone. They ___ traveling on holiday.\"\n(As luzes estão apagadas e o carro sumiu. Eles com certeza devem estar viajando de férias.)",
        "resposta": "They must be traveling on holiday.",
        "revelacao": "They must be traveling on holiday.",
        "dica": "Must be + traveling",
        "explicacao": "Dedução contínua: 'must be traveling'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o modal de quase certeza lógica positiva (4 letras):\n\n\"He has two doctorates from Oxford; he ___ be exceptionally brilliant.\"",
        "resposta": "must",
        "explicacao": "O modal é 'must'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma contraída de impossibilidade lógica (5 letras):\n\n\"This ___ be the right address; there is only an empty field here!\"",
        "resposta": "can't",
        "explicacao": "Impossibilidade lógica usa 'can't'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o modal de possibilidade de 5 letras (começa com M):\n\n\"I am not sure, but she ___ know the answer to your question.\"",
        "resposta": "might",
        "explicacao": "O modal é 'might'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o modal de possibilidade de 5 letras (começa com C):\n\n\"Be careful with that wire; it ___ be dangerous.\"",
        "resposta": "could",
        "explicacao": "O modal é 'could'."
      }
    ]
  }
};

console.log('Aplicando Onda 5 — Parte 2 (Lições B1.6 a B1.10)...');

for (const [id, lessonData] of Object.entries(wave5Part2Lessons)) {
  for (const mod of data.moduli) {
    const idx = mod.lezioni.findIndex(l => l.id === id);
    if (idx !== -1) {
      mod.lezioni[idx] = lessonData;
      console.log(`✓ Lição ${id} (${lessonData.titulo}) enriquecida com sucesso!`);
    }
  }
}

fs.writeFileSync(grammarPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Onda 5 — Parte 2 gravada com sucesso em data/grammar.json!');
