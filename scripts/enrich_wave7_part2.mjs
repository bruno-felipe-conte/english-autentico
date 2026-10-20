import fs from 'fs';

const grammarPath = 'data/grammar.json';
const data = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));

// Onda 7 — Parte 2: Lições C1.6 a C1.10 (Nuances de Futuro, Modais Raros, Elipse & Substituição, Marcadores Discursivos & Colocações Avançadas)
const wave7Part2Lessons = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 6: Nuances of Future Forms
  // ─────────────────────────────────────────────────────────────
  "c1-lez6": {
    "id": "c1-lez6",
    "num": "Lesson 6",
    "titulo": "Nuances of Future Forms",
    "subtitulo": "Be bound to, Be about to, Be due to, Be on the verge of & Be to — A Geometria da Certeza Futura",
    "cena": {
      "origem": "dialogo",
      "titulo": "Mission Control at Cape Canaveral",
      "texto": "**Flight Director:** What is the status of the orbital launch, Commander?\n**Commander:** The spacecraft **is about to enter** the final automated ignition sequence. The weather conditions are optimal, so the countdown **is bound to succeed** without delays.\n**Flight Director:** And when **is the capsule due to dock** with the International Space Station?\n**Commander:** It **is due to dock** at 04:30 GMT tomorrow morning. In fact, our astrobiologists **are on the verge of confirming** organic molecular traces in the preliminary telemetry. The prime astronaut **is to deliver** a live televised address once docking is complete."
    },
    "fio": {
      "abertura": "Em níveis básicos e intermediários, aprendemos *will, going to* e o *Present Continuous*. Mas quando abrimos o *Financial Times*, relatórios governamentais ou declarações oficiais de chefes de estado, essas formas elementares raramente aparecem sozinhas. A língua inglesa culta possui um leque extraordinário de locuções perifrásticas para calibrar **urgência imediata, horários programados, inevitabilidade lógica e protocolos formais**.",
      "descoberta": "Observe a precisão técnica no centro de controle espacial: «is about to enter» (iminência nos próximos segundos); «is bound to succeed» (certeza lógica ou inevitabilidade biológica/física); «is due to dock at 04:30» (horário fixado em cronograma ou tabela de transporte); «are on the verge of confirming» (no limiar imediato de um grande acontecimento); e «is to deliver» (protocolo formal de dever ou compromisso oficial de estado)!",
      "fecho": "Ao dominar essas cinco nuances avançadas de futuro, sua linguagem se liberta do monótono 'will' e atinge a precisão analítica e diplomática mais admirada no mundo anglo-saxão."
    },
    "alerta": "Cuidado com o falso amigo: *'be due to'* para horários programados (*The train is due to arrive at 5 PM*) não deve ser confundido com a locução causal *'due to'* (*The flight was canceled due to rain*). Quando acompanhado de infinitivo (*due TO ARRIVE*), significa 'com chegada agendada para'!",
    "definicao": {
      "fenomeno": "He is about to leave (está prestes a sair) · Prices are bound to rise (certamente vão subir / inevitável) · The plane is due to land at 6:00 (está programado para pousar) · The company is on the verge of bankruptcy (à beira de) · The President is to visit Tokyo (visitará / protocolo oficial)",
      "causa": "Por que o inglês utiliza tantas estruturas perifrásticas em vez de apenas 'will'?",
      "conceito": "Porque 'will' expressa mera previsão ou intenção genérica. As estruturas perifrásticas codificam a relação entre o presente e o futuro: se o evento decorre de um horário impresso (due to), de uma lei da probabilidade (bound to), de iminência física (about to / on the verge of) ou de um decreto institucional (be to)."
    },
    "inventario": [
      "Be about to + Base Form: iminência imediata nos próximos minutos ou segundos (*The ceremony is about to begin*)",
      "Be bound to + Base Form: certeza quase absoluta fundamentada na lógica, na natureza ou no destino (*Humans are bound to make mistakes*)",
      "Be due to + Base Form: eventos e chegadas que seguem uma tabela, cronograma oficial ou agenda (*The bus is due to arrive in ten minutes*)",
      "Be on the verge of / on the brink of + Gerúndio ou Substantivo: no limiar ou à beira de algo histórico ou dramático (*Scientists are on the verge of curing the disease*)",
      "Be to + Base Form: obrigações protocolares formais, ordens oficiais ou eventos pré-acordados (*You are not to enter this laboratory without goggles*)",
      "Variação no Passado: *was/were about to* (estava prestes a), *was/were bound to* (era inevitável que), *was/were to* (estava destinado a)"
    ],
    "tabela_visual": "| Estrutura Avançada | Função Semântica Central | Grau de Iminência / Certeza | Exemplo Prático C1 |\n|---|---|---|---|\n| **Be about to + V1** | **Iminência Imediata** | Acontecendo nos próximos segundos | *Hurry up! The train **is about to leave**.* |\n| **Be bound to + V1** | **Inevitabilidade Lógica** | Certeza de 99% baseada na realidade | *With his extraordinary talent, he **is bound to win**.* |\n| **Be due to + V1** | **Tabela / Cronograma Oficial** | Horário fixo estipulado | *The financial report **is due to be released** on Friday.* |\n| **Be on the verge of + -ING** | **No Limiar / À Beira de** | Prestes a atingir um ponto crucial | *The two nations **are on the verge of signing** peace.* |\n| **Be to + V1** | **Protocolo / Ordem Oficial** | Mandato governamental ou obrigação | *The King **is to open** Parliament tomorrow.* |\n| **Be not to + V1** | **Proibição Categórica Formal** | Ordem de autoridade institucional | *Students **are not to leave** the examination hall.* |",
    "observacao_cards": [
      {
        "ingles": "Be bound to...",
        "traducao": "é inevitável que / certamente vai...",
        "genero": "Certeza Lógica",
        "motivo": "Expressa que o resultado é inescapável: 'If you don't sleep, you are bound to feel exhausted'."
      },
      {
        "ingles": "Be about to...",
        "traducao": "estar prestes a (segundos/minutos)",
        "genero": "Iminência Temporal",
        "motivo": "Ação à beira de acontecer: 'Quiet, please! The movie is about to start'."
      },
      {
        "ingles": "Be due to + Verb",
        "traducao": "com chegada/término previsto para",
        "genero": "Horário e Cronograma",
        "motivo": "Comum em voos e eventos: 'The plane is due to land at Heathrow at 19:45'."
      },
      {
        "ingles": "Be to + Verb (Oficial)",
        "traducao": "deve / está programado oficialmente para",
        "genero": "Registro Noticioso e Formal",
        "motivo": "Linguagem jornalística: 'The Prime Minister is to visit Berlin next Tuesday'."
      }
    ],
    "tecnica": {
      "titulo": "O Seletor de Futuro Avançado em 3 Passos",
      "passos": [
        "1. O evento vai acontecer nos próximos segundos/minutos? Use BE ABOUT TO + VERBO.",
        "2. O evento segue uma tabela, voo ou horário oficial marcado? Use BE DUE TO + VERBO.",
        "3. O evento é inevitável pela lógica das coisas? Use BE BOUND TO + VERBO. Se for uma ordem ou protocolo de estado, use BE TO + VERBO."
      ]
    },
    "teoria": "### A Teoria Aprofundada das Nuances do Futuro no Nível C1\n\nNo inglês de alta sofisticação, a seleção da estrutura de futuro revela a atitude epistemológica do falante em relação à causalidade dos eventos futuros.\n\n#### 1. Iminência Temporal: *Be about to* e *Be on the verge of*\n* **Be about to + base form:** Denota uma ação situada na borda cronológica imediata do presente:\n  * *\"Look! The fireworks **are about to explode** across the harbour.\"*\n  * *Forma negativa:* Indica determinação em NÃO fazer algo: *\"I am not about to compromise my moral integrity for a corporate promotion.\"* (= Não tenho a menor intenção de fazer isso).\n* **Be on the verge of / on the brink of / on the point of + gerúndio (-ing):** Utilizado para acontecimentos históricos, crises econômicas, científicas ou emocionais de grande escala:\n  * *\"The diplomatic peace talks **are on the brink of collapse**.\"*\n  * *\"She **was on the verge of tears** when she heard the verdict.\"*\n\n#### 2. Inevitabilidade Lógica e Probabilidade Extrema: *Be bound to*\nDerivado do particípio de *bind* (amarrar), *be bound to* expressa que algo está organicamente 'amarrado' a acontecer por força das leis da física, da probabilidade estatística ou da natureza humana:\n* *\"Given the extreme dry season, forest fires **are bound to break out** in the southern province.\"*\n* *\"Don't worry about your job interview; with your credentials, you **are bound to impress** the panel.\"*\n\n#### 3. Cronogramas Oficiais e Agendas: *Be due to*\nExpressa pontualidade em relação a horários previstos em tabelas de companhias aéreas, calendários acadêmicos ou relatórios orçamentários:\n* *\"The quarterly financial earnings **are due to be published** on Thursday at 9:00 AM.\"*\n* *\"When is Sarah **due to give birth**?\"* (Perguntando a data prevista do parto).\n\n#### 4. O Futuro Protocolar Institucional: *Be to + Infinitivo*\nFrequentemente encontrado em manchetes da BBC, Reuters e declarações oficiais de monarquias ou ministérios:\n* **Protocolos e compromissos solenes:** *\"The foreign delegates **are to be received** by the Queen at Buckingham Palace.\"*\n* **Ordens e regulamentos de segurança:** *\"Employees **are to report** any suspicious parcel to building security immediately.\"*\n* **Destino histórico no passado:** *\"He survived the revolution, but he **was never to see** his homeland again.\"* (Estava destinado a nunca mais ver sua pátria).",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português, traduzimos essas estruturas com locuções variadas:\n* *\"Estar prestes a...\"* → *Be about to / on the verge of*\n* *\"Com certeza vai... / É inevitável que...\"* → *Be bound to*\n* *\"Está previsto para...\"* → *Be due to*\n* *\"Deverá / Terá de...\"* → *Be to*\n\n**Onde o brasileiro tropeça gravemente no inglês?**\n* **A dependência obsessiva do 'will':** O aluno brasileiro costuma usar *\"will definitely\"* para tudo o que quer enfatizar (*\"It will definitely happen\"*). Embora correto, soa monótono. Empregando **\"It is bound to happen\"**, você demonstra um vocabulário maduro e idiomático de padrão nativo.\n* **Confundir 'due to' causal com 'due to' de futuro:** Em português aprendemos que *\"due to\"* significa *\"devido a\"*. Quando o aluno vê *\"The train is due to arrive\"*, ele tenta traduzir como *\"o trem é devido a chegar\"* e fica perplexo. Lembre-se: com verbo no infinitivo (*due to ARRIVE*), a estrutura significa **com chegada prevista para**!",
    "exemplos_prc": [
      {
        "pergunta": "Why is the atmosphere inside the laboratory so tense this morning?",
        "resposta": "The lead scientists are on the verge of discovering whether the compound can neutralize antibiotic-resistant bacteria.",
        "contexto": "Descrevendo a expectativa eletrizante no limiar de uma descoberta científica histórica."
      },
      {
        "pergunta": "Do you think inflation will decline during the next quarter?",
        "resposta": "With the continuous injection of liquidity, prices are bound to rise rather than decline over the short term.",
        "contexto": "Oferecendo uma análise macroeconômica baseada na inevitabilidade de mercado."
      },
      {
        "pergunta": "What are the protocol guidelines for the visiting foreign diplomats tomorrow?",
        "resposta": "The delegates are to assemble in the state banquet hall at 18:00, where they are to be formally introduced to the Prime Minister.",
        "contexto": "Instruindo a equipe cerimonial sobre a programação protocolar de uma visita de estado."
      }
    ],
    "armadilhas": [
      {
        "erro": "The train is due arrive at 17:30.",
        "correcao": "The train is due to arrive at 17:30.",
        "explicacao": "A locução de cronograma exige a partícula 'to': 'is due TO arrive'."
      },
      {
        "erro": "Hurry up! The plane is bound to leave in five seconds!",
        "correcao": "Hurry up! The plane is about to leave in five seconds!",
        "explicacao": "Para iminência imediata nos próximos segundos, usa-se 'about to', não 'bound to' (que expressa inevitabilidade lógica geral)."
      },
      {
        "erro": "The two companies are on the verge to sign the merger agreement.",
        "correcao": "The two companies are on the verge of signing the merger agreement.",
        "explicacao": "'On the verge of' é seguido pela preposição 'of' e, portanto, exige gerúndio (-ing): 'on the verge of signing'."
      }
    ],
    "coda": "The future does not merely arrive; it approaches with degrees of imminence, destiny, and design.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a advertência de iminência imediata (segundos antes de começar):\n\"Sit down and silence your mobile phone; the keynote speech ___ begin!\"",
        "opcoes": [
          "is about to",
          "is bound to",
          "is due to",
          "is to"
        ],
        "resposta": "is about to",
        "explicacao": "'Is about to' expressa que a ação vai começar nos próximos instantes imediatos."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete indicando que o resultado é uma inevitabilidade lógica ou da natureza humana:\n\"If you work eighty hours a week without taking a rest, you ___ burn out.\"",
        "opcoes": [
          "are bound to",
          "are about to",
          "are due to",
          "are to"
        ],
        "resposta": "are bound to",
        "explicacao": "'Are bound to' expressa que o esgotamento é uma consequência lógica inescapável."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a locução que expressa horário previsto em cronograma de voo:\n\"Flight BA 249 from London Heathrow ___ land in Dubai at 20:15 local time.\"",
        "opcoes": [
          "is due to",
          "is bound to",
          "is about to",
          "is verge to"
        ],
        "resposta": "is due to",
        "explicacao": "Chegadas programadas em tabelas e itinerários oficiais utilizam 'is due to land'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a regência correta da locução 'on the verge of':\n\"Astronomers believe we are on the verge of ___ microbial life on Europa.\"",
        "opcoes": [
          "discovering",
          "discover",
          "to discover",
          "discovered"
        ],
        "resposta": "discovering",
        "explicacao": "Após a preposição 'of' na locução 'on the verge of', o verbo deve estar no gerúndio: 'discovering'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no protocolo oficial com 'be to' antes de revelar:\n\n\"The ambassadors ___ (be / meet) at the United Nations headquarters in Geneva tomorrow morning.\"\n(Os embaixadores devem se reunir / têm reunião oficial marcada na sede da ONU em Genebra amanhã de manhã.)",
        "resposta": "The ambassadors are to meet at the United Nations headquarters in Geneva tomorrow morning.",
        "revelacao": "The ambassadors are to meet at the United Nations headquarters in Geneva tomorrow morning.",
        "dica": "are to meet...",
        "explicacao": "Protocolo formal oficial: 'are to meet'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na iminência histórica no limiar com 'verge' antes de revelar:\n\n\"The peace negotiators are ___ (no limiar de alcançar) a historic breakthrough in the border dispute.\"",
        "resposta": "The peace negotiators are on the verge of reaching a historic breakthrough in the border dispute.",
        "revelacao": "The peace negotiators are on the verge of reaching a historic breakthrough in the border dispute.",
        "dica": "on the verge of reaching...",
        "explicacao": "A locução é 'on the verge of reaching'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na inevitabilidade lógica com 'bound to' antes de revelar:\n\n\"Don't worry about the tough exam; with all the revision you did, you ___ (certamente vai passar).\"",
        "resposta": "Don't worry about the tough exam; with all the revision you did, you are bound to pass.",
        "revelacao": "Don't worry about the tough exam; with all the revision you did, you are bound to pass.",
        "dica": "are bound to pass...",
        "explicacao": "Certeza lógica baseada na dedicação: 'are bound to pass'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Corrija a frase que omitiu a preposição 'to' em 'due to' antes de revelar:\n\n\"The express delivery package is due arrive by 3:00 PM today.\"",
        "resposta": "The express delivery package is due to arrive by 3:00 PM today.",
        "revelacao": "The express delivery package is due to arrive by 3:00 PM today.",
        "dica": "Insira 'to' antes de arrive",
        "explicacao": "A locução correta de cronograma é 'due to arrive'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição de duas letras que completa a locução 'be about ___':\n\n\"Hush! The national anthem is about ___ be played in the stadium.\" (a ser tocado)",
        "resposta": "to",
        "explicacao": "A locução de iminência é 'be about to'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra de cinco letras que indica inevitabilidade lógica em 'be ___ to':\n\n\"With such reckless driving, he is ___ to have a serious accident sooner or later.\" (fadado / certamente vai)",
        "resposta": "bound",
        "explicacao": "A palavra é 'bound' (be bound to)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra de três letras que completa a locução de cronograma 'be ___ to':\n\n\"The next train to Oxford is ___ to depart from platform 4 in five minutes.\" (previsto)",
        "resposta": "due",
        "explicacao": "A palavra é 'due' (is due to depart)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição que segue a palavra 'verge' na expressão 'on the verge ___':\n\n\"Scientists are on the verge ___ completing the first synthetic human chromosome.\" (de)",
        "resposta": "of",
        "explicacao": "A preposição é 'of' (on the verge of)."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 7: Advanced Modals
  // ─────────────────────────────────────────────────────────────
  "c1-lez7": {
    "id": "c1-lez7",
    "num": "Lesson 7",
    "titulo": "Advanced Modals",
    "subtitulo": "Dare, Need, Would Rather, Had Better & Needn't Have Done — Sutilezas de Coragem e Preferência",
    "cena": {
      "origem": "dialogo",
      "titulo": "The Whistleblower's Moral Dilemma",
      "texto": "**Journalist:** How did you find the courage to leak the classified defense dossiers, Dr. Sterling?\n**Dr. Sterling:** I **could not but speak out**! How **dare anyone conceal** such egregious human rights violations from the public?\n**Journalist:** But were you not terrified of life imprisonment?\n**Dr. Sterling:** I **would rather face** twenty years in prison than live as a complicit coward. In retrospect, you **needn't have encrypted** that third flash drive; it contained only unclassified budget summaries. But we **had better secure** safe passage out of the country before dawn!"
    },
    "fio": {
      "abertura": "Nos níveis anteriores, os verbos modais pareciam comportar-se de maneira previsível (*can, could, must, should*). Mas no nível C1, a língua inglesa desvenda seus membros mais idiossincráticos e fascinantes: verbos semimodais que ora se comportam como auxiliares puros e ora como verbos normais (*DARE* e *NEED*), estruturas de preferência contrafatual (*WOULD RATHER*) e a crucial distinção entre *NEEDN'T HAVE DONE* e *DIDN'T NEED TO DO*.",
      "descoberta": "Observe a voltagem dramática da conversa de Sterling com a jornalista: ele usa «How dare anyone conceal...» (DARE atuando como modal puro, sem 'to' e sem 'does'!); diz «I would rather face prison than live...» (preferência firme seguida de verbo base); adverte com «we had better secure...» (conselho urgente com consequência de perigo); e faz uma revelação crítica: «you needn't have encrypted that flash drive» (você criptografou desnecessariamente, perdeu tempo à toa)!",
      "fecho": "Ao dominar esses modais avançados e a psicologia do 'needn't have done', seu inglês ganha a expressividade de quem sabe negociar escolhas morais com elegância de mestre."
    },
    "alerta": "A diferença mais cobrada em Cambridge C1 entre 'Needn't have done' e 'Didn't need to do':\n- **You needn't have bought bread:** Você COMPROU pão, mas foi um esforço desnecessário (já tínhamos pão em casa).\n- **You didn't need to buy bread:** Não era necessário comprar pão, e você SABIA DISSO (portanto, NÃO comprou)!",
    "definicao": {
      "fenomeno": "How dare you speak to me like that! (como ousa) · You needn't have brought wine (trouxe vinho, mas não precisava) · I would rather stay home than go out (prefiro ficar) · You had better leave now (é melhor sair agora senão...)",
      "causa": "Por que 'dare' e 'need' podem se comportar como verbos modais e como verbos principais?",
      "conceito": "São os chamados 'semi-modais' (*marginal modals*). Em sentenças negativas e interrogativas de alta formalidade, eles dispensam auxiliares (do/does/did) e rejeitam a partícula 'to', conjugando-se como modais puros (*Dare I ask? / He need not worry*)."
    },
    "inventario": [
      "Dare como Modal Puro (em perguntas e negativas formais): *Dare she challenge the CEO?* / *I dare not tell him*",
      "Need como Modal Puro (exclusivo em negativas e perguntas): *You need not attend the meeting* / *Need I say more?*",
      "Needn't have + V3: a ação FOI REALIZADA, mas descobriu-se posteriormente que foi um esforço inútil ou redundante",
      "Didn't need to + Base Form: não era necessário fazer, logo a ação NÃO foi realizada (ou era desnecessária)",
      "Would rather + Base Form + THAN + Base Form: preferência hipotética presente/futura (*I'd rather walk than drive*)",
      "Would rather + Sujeito + Past Simple: preferência sobre a conduta de outra pessoa (*I would rather you didn't smoke in here*)",
      "Had better + Base Form: recomendação urgente com ameaça implícita de consequência negativa se não for cumprida (*You had better hurry*)"
    ],
    "tabela_visual": "| Modal Avançado | Estrutura Sintática | Função Semântica | Exemplo Prático C1 |\n|---|---|---|---|\n| **Dare (Modal Puro)** | *Dare + S + base* / *dare not* | Desafio à autoridade ou audácia extrema | *How **dare you accuse** me of dishonesty!* |\n| **Need (Modal Puro)** | *need not + base* / *Need I...?* | Ausência formal de obrigação | *You **need not submit** paper copies; digital suffices.* |\n| **Needn't have + V3** | *needn't have + past participle* | Ação desnecessária que FOI feita à toa | *You **needn't have cooked** so much food; half of it was left!* |\n| **Didn't need to + V1** | *didn't need to + base* | Não era necessário fazer (e não foi feito) | *I had a free pass, so I **didn't need to buy** a ticket.* |\n| **Would rather (Próprio)** | *would rather + base + than* | Preferência pessoal direta | *I **would rather resign than compromise** my ethics.* |\n| **Would rather (Terceiro)**| *would rather + outro S + Past*| Desejo sobre o comportamento alheio | *I **would rather you didn't mention** this to the press.* |\n| **Had better + V1** | *had better + base* | Conselho urgente de perigo iminente | *We **had better call** an ambulance immediately!* |",
    "observacao_cards": [
      {
        "ingles": "Needn't have done (À toa)",
        "traducao": "não precisava ter feito (mas fez)",
        "genero": "Distinção Crítica C1",
        "motivo": "Ação executada inutilmente: 'You needn't have brought an umbrella; it hasn't rained at all!'."
      },
      {
        "ingles": "Didn't need to do (Não fez)",
        "traducao": "não precisava fazer (e não fez)",
        "genero": "Ausência de Obrigação",
        "motivo": "Você sabia que não era necessário: 'It was a holiday, so I didn't need to set the alarm clock'."
      },
      {
        "ingles": "Would rather + Past (Terceiros)",
        "traducao": "preferia que você fizesse/não fizesse",
        "genero": "Subjuntivo de Preferência",
        "motivo": "Com outro sujeito, recua o verbo para o passado: 'I would rather you told the truth'."
      },
      {
        "ingles": "Had better (Aviso Severo)",
        "traducao": "é bom que... / é melhor que...",
        "genero": "Conselho com Consequência",
        "motivo": "Carrega tom de urgência ou ameaça: 'You had better pay the invoice before they cut the service'."
      }
    ],
    "tecnica": {
      "titulo": "O Algoritmo de 'Needn't have' vs 'Didn't need to' em 3 Passos",
      "passos": [
        "1. Identifique se a ação física no passado REALMENTE ACONTECEU.",
        "2. Se a pessoa comprou, cozinhou, correu ou gastou dinheiro À TOA (fez a ação), use NEEDN'T HAVE + V3.",
        "3. Se a pessoa sabia antecipadamente que não precisava e NÃO REALIZOU a ação, use DIDN'T NEED TO + VERBO BASE."
      ]
    },
    "teoria": "### A Teoria Aprofundada dos Verbos Modais Avançados\n\nNo nível de proficiência C1, a flexibilidade modal transcende as categorias rígidas de permissão e obrigação, incorporando dimensões de desafio psicológico, arrependimento de esforço desnecessário e imposição condicional.\n\n#### 1. Os Semimodais 'Dare' e 'Need'\nEsses dois verbos possuem dupla cidadania sintática. Podem se comportar como verbos comuns com auxiliares (*do, does, did*) ou como modais puros defeituosos:\n* **Dare como verbo comum:** *\"She did not dare to look at the accident.\"* / *\"Do you dare to jump?\"*\n* **Dare como modal puro (altamente valorizado em oratória formal):**\n  * *\"I **dare not speak** ill of the government in public.\"* (Sem 'to', sem 'do'!).\n  * *\"How **dare he challenge** the supreme court ruling?\"*\n* **Need como modal puro (restrito a negativas e interrogações):**\n  * *\"You **need not worry** about the hotel booking; it is handled.\"* (= You don't need to worry).\n  * *\"**Need we review** every single appendix today?\"* (= Do we need to review?).\n\n#### 2. O Grande Divisor: *Needn't have done* vs *Didn't need to do*\nEsta é uma das distinções semânticas mais preciosas e cobradas nos exames de Cambridge C1 e C2:\n* **Needn't have + past participle (Ação Desperdiçada):**\n  * *\"We **needn't have rushed** to the airport; the flight was delayed by three hours!\"* (Nós corremos desesperadamente para o aeroporto, pegamos trânsito, suamos a camisa... para descobrir que não precisava. O esforço foi realizado em vão).\n* **Didn't need to + base form (Ação Evitada):**\n  * *\"I checked the airline app and saw the flight was delayed, so I **didn't need to rush** to the airport.\"* (Eu soube com antecedência, tomei meu café com calma e não corri. A ação física de correr não ocorreu).\n\n#### 3. Preferências Contrafatuais com *Would Rather*\n* **Quando o sujeito da preferência é a própria pessoa:** Usa-se o verbo base puro (bare infinitive):\n  * *\"I **would rather walk** in the rain **than take** an overpriced taxi.\"*\n* **Quando o sujeito da preferência é outra pessoa:** A língua inglesa exige o recuo para o *Unreal Past* (Past Simple):\n  * *\"I **would rather you didn't disclose** our financial terms to the press.\"* (Prefiro que você não divulgue).\n  * *\"Would you rather we **met** tomorrow instead?\"* (Prefere que nos encontremos amanhã?).\n\n#### 4. O Conselho Urgente: *Had Better*\nEmbora contenha a palavra *had*, a locução *had better* refere-se **sempre ao presente ou ao futuro imediato**. Expressa um conselho peremptório onde há perigo iminente de desastre se a recomendação for ignorada:\n* *\"You **had better leave** now, or you will miss the last train home.\"*\n* *Forma negativa:* O 'not' fica **depois** de 'better': **You had better NOT forget her birthday!** (Nunca *You hadn't better*!).",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português, a frase *\"Eu não precisava ter comprado pão\"* cobre as duas situações: quando compramos à toa ou quando nem compramos.\n\n**Onde o brasileiro tropeça no inglês de nível C1?**\n* **A ignorância do 'needn't have done':** O brasileiro tende a usar *\"I didn't need to buy\"* para ambas as situações. Quando ele chega em casa com duas sacolas de pão e a esposa diz que já tinha pão no armário, o brasileiro solta *\"Oh, I didn't need to buy bread\"*. Um ouvinte nativo britânico ouve isso com estranheza, porque *didn't need to* soa como se ele soubesse disso antes e não tivesse comprado! O correto idiomático nessa situação de esforço desperdiçado é: **\"Oh, I needn't have bought bread!\"**.\n* **Inventar o 'would rather TO':** Muitos colocam 'to' após would rather (*I would rather to stay*). Erro crasso! Would rather é seguido de verbo base puro: **I would rather stay**.",
    "exemplos_prc": [
      {
        "pergunta": "Why are you looking so frustrated after spending all Saturday afternoon ironing twenty shirts?",
        "resposta": "My company announced this morning that we are switching to an entirely casual dress code! I needn't have spent four hours ironing them!",
        "contexto": "Lamentando o tempo e esforço desperdiçados em uma tarefa que se revelou desnecessária."
      },
      {
        "pergunta": "Would you prefer to take the client out for sushi or Italian pasta tonight?",
        "resposta": "Personally, I would rather take them to the traditional seafood bistro by the harbour; the atmosphere is much more conducive to dealmaking.",
        "contexto": "Expressando uma preferência profissional ponderada sobre o local de um jantar de negócios."
      },
      {
        "pergunta": "Should we wait for the final laboratory test confirmations before evacuating the chemical facility?",
        "resposta": "Absolutely not! The toxic gas sensor is beeping continuously; we had better evacuate the building right now!",
        "contexto": "Dando uma ordem de emergência urgente diante de um perigo físico iminente."
      }
    ],
    "armadilhas": [
      {
        "erro": "I would rather to go by train than fly.",
        "correcao": "I would rather go by train than fly.",
        "explicacao": "'Would rather' é seguido diretamente pela forma base sem 'to': 'would rather go'."
      },
      {
        "erro": "I had better not to be late for the board interview.",
        "correcao": "I had better not be late for the board interview.",
        "explicacao": "'Had better' também exige a forma base sem 'to': 'had better not be late'."
      },
      {
        "erro": "I would rather you don't mention this issue in front of the kids.",
        "correcao": "I would rather you didn't mention this issue in front of the kids.",
        "explicacao": "Quando 'would rather' se refere à conduta de outra pessoa ('you'), o verbo recua para o Past Simple: 'didn't mention'."
      }
    ],
    "coda": "Advanced modals delineate the razor-thin boundary between courage, unnecessary toil, and firm conviction.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete indicando que o falante realizou um esforço físico desnecessário no passado (correu à toa):\n\"The train departure was delayed by thirty minutes; we ___ to the station!\"",
        "opcoes": [
          "needn't have run",
          "didn't need to run",
          "mustn't run",
          "hadn't to run"
        ],
        "resposta": "needn't have run",
        "explicacao": "'Needn't have run' expressa que eles correram, mas o esforço foi inútil porque o trem estava atrasado."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a estrutura culta de 'would rather' referindo-se à atitude de outra pessoa:\n\"I would rather you ___ the confidential contract to anyone before Monday.\"",
        "opcoes": [
          "didn't show",
          "don't show",
          "not show",
          "wouldn't show"
        ],
        "resposta": "didn't show",
        "explicacao": "Quando o sujeito da oração subordinada com 'would rather' é diferente, usa-se o Past Simple (didn't show)."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual alternativa expressa um conselho urgente com ameaça implícita de consequência grave?",
        "opcoes": [
          "You had better apologize to the director, or you might lose your job.",
          "You would rather apologize to the director.",
          "You needn't have apologized to the director.",
          "You dare to apologize to the director."
        ],
        "resposta": "You had better apologize to the director, or you might lose your job.",
        "explicacao": "'Had better' expressa conselho peremptório com consequência negativa explícita."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a interrogação de ousadia moral com 'dare' como modal puro:\n\"How ___ anyone question the scientific consensus on climate disruption?\"",
        "opcoes": [
          "dare",
          "dares",
          "dared to",
          "does dare"
        ],
        "resposta": "dare",
        "explicacao": "Na fórmula consagrada 'How dare...', o verbo atua como modal puro invariável sem o -s: 'How dare anyone question'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na ação desnecessária que foi feita (comprou vinho à toa) antes de revelar:\n\n\"The hosts had already purchased thirty bottles of vintage champagne; we ___ (need / not / bring) that extra crate of wine!\"",
        "resposta": "The hosts had already purchased thirty bottles of vintage champagne; we needn't have brought that extra crate of wine!",
        "revelacao": "The hosts had already purchased thirty bottles of vintage champagne; we needn't have brought that extra crate of wine!",
        "dica": "needn't have + particípio de bring (brought)",
        "explicacao": "Trouxemos a caixa de vinho à toa: 'needn't have brought'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na preferência própria sem 'to' antes de revelar:\n\n\"Given the terrible turbulence, I ___ (would rather / take) the overnight train than fly.\"",
        "resposta": "Given the terrible turbulence, I would rather take the overnight train than fly.",
        "revelacao": "Given the terrible turbulence, I would rather take the overnight train than fly.",
        "dica": "would rather take...",
        "explicacao": "Preferência pessoal com verbo base puro: 'would rather take'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no conselho urgente negativo antes de revelar:\n\n\"The mountain roads are covered in black ice; you ___ (had better / not / drive) tonight.\"",
        "resposta": "The mountain roads are covered in black ice; you had better not drive tonight.",
        "revelacao": "The mountain roads are covered in black ice; you had better not drive tonight.",
        "dica": "had better not drive...",
        "explicacao": "Negação com had better: 'had better not drive'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Corrija a frase que usou 'to' incorretamente com 'would rather' antes de revelar:\n\n\"She would rather to stay at home reading than go to the crowded nightclub.\"",
        "resposta": "She would rather stay at home reading than go to the crowded nightclub.",
        "revelacao": "She would rather stay at home reading than go to the crowded nightclub.",
        "dica": "Elimine a partícula 'to'",
        "explicacao": "'Would rather' não admite 'to'; usa-se 'would rather stay'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma contraída de 'need not have' para expressar esforço inútil no passado:\n\n\"You ___ have washed the car; it is pouring with rain now!\" (não precisava ter)",
        "resposta": "needn't",
        "explicacao": "A contração é 'needn't'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a conjunção comparativa de quatro letras que faz par obrigatório com 'would rather':\n\n\"I would rather work late on Friday ___ come into the office on Saturday morning.\"",
        "resposta": "than",
        "explicacao": "O par comparativo é 'than' (would rather... than)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra de três letras que completa a locução de conselho '___ better':\n\n\"You ___ better double-check your passport expiration date before booking the flights.\" (É melhor)",
        "resposta": "had",
        "explicacao": "A locução é 'had better'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra de quatro letras que expressa audácia ou desafio em 'How ___ you':\n\n\"How ___ the manager blame the interns for his own strategic miscalculations?\" (ousa)",
        "resposta": "dare",
        "explicacao": "A expressão é 'How dare'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 8: Ellipsis & Substitution
  // ─────────────────────────────────────────────────────────────
  "c1-lez8": {
    "id": "c1-lez8",
    "num": "Lesson 8",
    "titulo": "Ellipsis & Substitution",
    "subtitulo": "Do so, So do I, If so, Neither, One/Ones & Omissão Elegante — A Arte de Não se Repetir",
    "cena": {
      "origem": "dialogo",
      "titulo": "The Literary Salon in Bloomsbury",
      "texto": "**Penelope:** Did Arthur manage to complete his translation of Homer's Iliad before the publisher's deadline?\n**Sebastian:** I believe **so**. He certainly promised to **do so** when we last spoke at the library.\n**Penelope:** Wonderful! Has anyone reviewed the opening chapters yet?\n**Sebastian:** If **so**, they haven't published their critique. I haven't read the manuscript myself, and **neither has Eleanor**. But among all the translated editions available, Arthur's is bound to be the **one** that endures."
    },
    "fio": {
      "abertura": "A marca de um falante amador é a repetição desnecessária de palavras: *\"Arthur completed the translation because Arthur wanted to complete the translation, and if Arthur completed the translation...\"*. A mente de um mestre da língua inglesa abomina a redundância. No nível C1, você domina as duas ferramentas mais requintadas de concisão textual: a **Elipse** (a omissão calculada de palavras que o contexto já deixa claras) e a **Substituição** (*do so, so, neither, one/ones*).",
      "descoberta": "Observe a agilidade do diálogo entre Penelope e Sebastian:\n1. «I believe so» substitui a oração inteira *I believe that he managed to complete it*;\n2. «promised to do so» substitui *to complete his translation*;\n3. «If so» substitui *If anyone has reviewed the chapters*;\n4. «neither has Eleanor» substitui com elegância *Eleanor hasn't read the manuscript either*;\n5. «the one that endures» substitui a repetição da palavra *edition*!",
      "fecho": "Ao dominar a elipse e a substituição, seus textos acadêmicos e e-mails corporativos ganham a fluidez, a rapidez e o brilho dos grandes estilistas da prosa contemporânea."
    },
    "alerta": "Cuidado com o uso de 'do so': a locução 'do so' substitui apenas **verbos de ação dinâmica** (*He promised to write the report, and he did so*). Ela NUNCA pode ser usada para substituir verbos de estado (*stative verbs*) como *know, like, believe*! Dizer *'He liked the film and she did so too'* é incorreto; use *'and so did she'*!",
    "definicao": {
      "fenomeno": "I hope so (espero que sim) · If not, let me know (se não, avise-me) · He promised to resign and did so (fez isso) · So do I / Neither do I (eu também / nem eu) · Which jacket? The black one (a preta)",
      "causa": "Por que a língua inglesa prefere omitir palavras ou substituí-las por pro-formas?",
      "conceito": "Trata-se do princípio de economia linguística (*lexical economy*). Uma vez que um conceito já foi introduzido no campo mental compartilhado entre o falante e o ouvinte, repeti-lo gera ruído cognitivo. A substituição com 'so, not, one, do so' mantém o fluxo dinâmico sem perda de informação."
    },
    "inventario": [
      "Substituição de oração inteira com 'SO': I think so, I hope so, I believe so, I suppose so, I am afraid so",
      "Negação de oração com 'NOT': I hope not, I suspect not, I am afraid not (vs *I don't think so*)",
      "Substituição condicional: If so (se assim for / se sim) e If not (caso contrário / se não)",
      "Substituição verbal com 'DO SO': substitui verbo de ação + complementos (*The manager ordered him to leave, and he did so*)",
      "Elipse com auxiliar reduzido (Code): *She can speak Russian, and her brother can too / but her brother can't*",
      "Substituição nominal com ONE / ONES: substitui substantivos contáveis já mencionados (*I prefer the blue one* / *These ones*)",
      "Concordância espelhada: So + Auxiliar + Sujeito (afirmativa) e Neither/Nor + Auxiliar + Sujeito (negativa)"
    ],
    "tabela_visual": "| Recurso Sintático | Estrutura | Função de Economia | Exemplo Prolixo Evitado | Exemplo C1 Conciso |\n|---|---|---|---|---|\n| **Substituição com SO** | *think / hope / believe + SO* | Substitui oração afirmativa | *Will it rain? I think that it will rain.* | *Will it rain? **I think so**.* |\n| **Substituição com NOT** | *hope / be afraid + NOT* | Substitui oração negativa | *Will we fail? I hope that we will not fail.*| *Will we fail? **I hope not**.* |\n| **Condicional Elíptica** | *If so / If not* | Substitui toda a condição prévia | *If you have any questions, call me. If you do not have questions...* | *Check the details; **if so, sign**. **If not, call me**.* |\n| **Ação com DO SO** | *do so / did so / doing so* | Substitui ação dinâmica | *He was told to apologize, and he apologized.* | *He was told to apologize, and he **did so**.* |\n| **Substituição ONE/ONES**| *the [adj] one / ones* | Evita repetir o substantivo | *I have tried these shoes, but I want other shoes.* | *I want to try those **ones**.* |\n| **Elipse de Infinitivo** | Parar no 'TO' | Omite o verbo após to | *Are you coming to the theatre? I would love to come.* | *I would **love to**, but I'm busy.* |",
    "observacao_cards": [
      {
        "ingles": "I hope so vs I hope not",
        "traducao": "Espero que sim vs Espero que não",
        "genero": "Substituição Proposicional",
        "motivo": "Com 'hope', 'be afraid' e 'guess', nega-se com NOT no final: 'Will he lose his job? I hope not!'."
      },
      {
        "ingles": "Do so (Apenas Ações)",
        "traducao": "Fazer isso / Agir assim",
        "genero": "Substituição Verbal",
        "motivo": "Exclusivo para verbos de ação dinâmica: 'He asked me to submit the tax return, and I did so immediately'."
      },
      {
        "ingles": "If so / If not",
        "traducao": "Se sim / Se não (em caso afirmativo/negativo)",
        "genero": "Condicional Sintética",
        "motivo": "Essencial para contratos e manuais: 'Is the engine overheating? If so, turn off the ignition immediately'."
      },
      {
        "ingles": "Elipse no Infinitivo (To)",
        "traducao": "I would love to (sem repetir o verbo)",
        "genero": "Naturalidade Britânica",
        "motivo": "Terminar no 'to' é o padrão nativo mais polido: 'Would you like to join us for lunch? I'd love to!'."
      }
    ],
    "tecnica": {
      "titulo": "A Eliminação de Redundância em 3 Passos",
      "passos": [
        "1. Identifique se o elemento repetido é uma ORAÇÃO COMPLETA, um VERBO DE AÇÃO ou um SUBSTANTIVO.",
        "2. Se for uma oração que responde a uma expectativa de pensamento, substitua por SO (afirmativa) ou NOT (negativa).",
        "3. Se for uma ação dinâmica ordenada ou combinada, substitua por DO SO (did so, doing so). Se for um substantivo contável, use ONE ou ONES."
      ]
    },
    "teoria": "### A Teoria Aprofundada de Elipse e Substituição\n\nElipse (*ellipsis*) e Substituição (*substitution*) são os dois mecanismos gramaticais supremos descritos pelos linguistas Halliday e Hasan na teoria clássica da *Cohesion in English*. Enquanto a elipse é a criação de um 'espaço em branco' que o leitor preenche instantaneamente pelo contexto imediato, a substituição coloca um marcador gramatical pro-forma no lugar da palavra redundante.\n\n#### 1. Substituição de Orações Subordinadas: *So* e *Not*\nQuando um verbo de atitude proposicional (*believe, expect, hope, imagine, presume, suppose, think, be afraid*) responde a uma oração com *that*, o pronome neutro *so* substitui toda a proposição afirmativa:\n* *\"Has the inflation rate stabilized?\"* → *\"The economists **believe so**.\"* (= *believe that the inflation rate has stabilized*).\n* **A Assimetria na Negação:**\n  * Com verbos como *think, believe, suppose, expect*, o inglês prefere transferir a negação para o verbo principal: *\"**I don't think so**.\"* / *\"**I don't suppose so**.\"*\n  * Com verbos como *hope, fear, be afraid*, a negação é feita diretamente na pro-forma: *\"**I hope not**.\"* / *\"**I am afraid not**.\"* (Dizer *I don't hope so* é considerado um erro crasso!).\n\n#### 2. A Expressão Anafórica de Ação: *Do so / Do it / Do that*\n* **Do so:** Refere-se estritamente à mesma ação dinâmica intencional e aos mesmos complementos já mencionados, com alto grau de formalidade:\n  * *\"Employees who wish to join the pension scheme should **do so** before the end of the fiscal quarter.\"*\n  * *Restrição:* Não pode ser usado com verbos estativos (*stative verbs*). Não se pode dizer *He loves literature and does so passionately*.\n* **Do it / Do that:** Possui foco mais enfático no objeto concreto da ação ou contrasta a ação com outra opção.\n\n#### 3. Elipse Estrutural de Infinitivo (*Reduced Infinitive*)\nNa conversação avançada e em correspondências formais, quando o verbo no infinitivo é evidente pelo enunciado anterior, omite-se o verbo e seus complementos, preservando apenas a partícula infinitiva **TO**:\n* *\"You don't have to explain the incident if you don't **want to**.\"* (em vez de *want to explain the incident*).\n* *\"She asked me to lend her my laptop, but I refused **to**.\"*\n\n#### 4. Substituição Nominal com *One* e *Ones*\nSubstitui um substantivo contável que já foi nomeado, geralmente acompanhado de um determinante ou adjetivo qualificador:\n* *\"These leather boots are worn out; I need to purchase new **ones**.\"*\n* *\"Which academic paper did you consult? The **one** published in The Lancet.\"*\n* *Restrição:* Não pode ser usado com substantivos incontáveis (*uncountable nouns*). Para leite, café ou informação, use *some* ou repita o termo: *\"I don't want whole milk; do you have skimmed **milk**?\"* (Nunca *skimmed one*!).",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português, dizemos naturalmente:\n* *\"Acho que sim\"* / *\"Espero que não\"* (usamos 'sim' e 'não' como substitutos oracionais).\n* *\"Qual carro você prefere? O preto.\"* (em português, o adjetivo vira substantivo sozinho: *o preto, o novo, os velhos*).\n\n**Onde o brasileiro tropeça no inglês de nível C1?**\n* **Traduzir 'acho que sim' como 'I think yes':** Um dos erros mais embaraçosos do aluno brasileiro no exterior é responder perguntas com *\"I think yes\"* ou *\"I hope yes\"*. Isso não existe em inglês! A palavra obrigatória para substituir a oração afirmativa é **SO**: **I think so / I hope so**!\n* **Deixar o adjetivo 'pelado' sem 'one':** Em português dizemos *\"Quero a preta\"* ou *\"Gostei do novo\"*. No inglês, um adjetivo singular contável NÃO pode ficar solto sem um substantivo ou pronome que o apoie. Dizer *\"I want the black\"* é errado. Você DEVE usar: **I want the black ONE**!",
    "exemplos_prc": [
      {
        "pergunta": "Will the commercial airline pilots go on strike next Monday morning?",
        "resposta": "The trade union representatives certainly threatened to do so, but passengers desperately hope not.",
        "contexto": "Discutindo a probabilidade e o impacto iminente de uma greve no transporte aéreo."
      },
      {
        "pergunta": "Should the company proceed with the acquisition if due diligence reveals financial irregularities?",
        "resposta": "If so, we must withdraw our offer immediately; if not, our legal counsel will finalize the merger agreement.",
        "contexto": "Delineando a árvore de decisão executiva com base nos resultados de uma auditoria corporativa."
      },
      {
        "pergunta": "Did you inspect both properties before deciding which house to purchase in Bristol?",
        "resposta": "Yes, we inspected both, but the one near the university campus had significantly larger bedrooms than the modern one downtown.",
        "contexto": "Comparando duas opções imobiliárias com elegância concisa sem repetir a palavra 'house'."
      }
    ],
    "armadilhas": [
      {
        "erro": "Do you think it will rain this afternoon? — I think yes.",
        "correcao": "Do you think it will rain this afternoon? — I think so.",
        "explicacao": "Em inglês, 'acho que sim' é traduzido como 'I think so', nunca 'I think yes'."
      },
      {
        "erro": "Will our flight be canceled? — I don't hope so.",
        "correcao": "Will our flight be canceled? — I hope not.",
        "explicacao": "Com o verbo 'hope', a negação da oração subordinada é feita diretamente com 'not': 'I hope not'."
      },
      {
        "erro": "I looked at all the suits, and I chose the blue.",
        "correcao": "I looked at all the suits, and I chose the blue one.",
        "explicacao": "Adjetivos não podem ficar sozinhos substituindo substantivos contáveis singulares; use 'the blue one'."
      }
    ],
    "coda": "True eloquence knows when words have served their purpose, allowing silence and pro-forms to carry the thought.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Como responder educadamente 'espero que não' em inglês padrão C1?\n\"Will the interest rates increase again next month? — ___\"",
        "opcoes": [
          "I hope not.",
          "I don't hope so.",
          "I hope no.",
          "I hope don't."
        ],
        "resposta": "I hope not.",
        "explicacao": "Com o verbo 'hope', a pro-forma negativa é 'I hope not'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a substituição de ação formal:\n\"The CEO instructed the CFO to publish the audit report, and she ___ the following morning.\"",
        "opcoes": [
          "did so",
          "did it so",
          "made so",
          "did such"
        ],
        "resposta": "did so",
        "explicacao": "'Did so' é a substituição formal canônica para um verbo de ação dinâmica já mencionado."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a elipse de condicional rápida:\n\"Are there any discrepancies in the billing invoice? ___, contact our finance team immediately.\"",
        "opcoes": [
          "If so",
          "If yes",
          "If that",
          "If it"
        ],
        "resposta": "If so",
        "explicacao": "'If so' substitui 'If there are discrepancies in the billing invoice' (em caso afirmativo)."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a substituição nominal no plural:\n\"These leather boots are worn out; I need to buy some new ___.\"",
        "opcoes": [
          "ones",
          "one",
          "boots ones",
          "those"
        ],
        "resposta": "ones",
        "explicacao": "Para substantivos contáveis no plural ('boots'), a pro-forma substitutiva é 'ones'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na concordância negativa espelhada com 'Neither' antes de revelar:\n\n\"Arthur hasn't completed his research thesis yet, and ___ (nem a Eleanor).\"",
        "resposta": "Arthur hasn't completed his research thesis yet, and neither has Eleanor. (ou: nor has Eleanor)",
        "revelacao": "Arthur hasn't completed his research thesis yet, and neither has Eleanor. (ou: nor has Eleanor)",
        "dica": "neither + has + Eleanor",
        "explicacao": "Concordância negativa espelhada: 'neither has Eleanor'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na elipse de infinitivo reduzido terminando em 'to' antes de revelar:\n\n\"Would you like to deliver the keynote address at the conference? — I would ___ (adoraria / mas estou ocupado).\"",
        "resposta": "I would love to, but I'm completely booked that week.",
        "revelacao": "I would love to, but I'm completely booked that week.",
        "dica": "I would love to...",
        "explicacao": "A elipse de infinitivo para no 'to': 'I would love to'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na negação de receio com 'I am afraid not' antes de revelar:\n\n\"Are there any seats left on the 19:00 flight to Zurich? — ___ (temo que não, senhor).\"",
        "resposta": "I am afraid not, sir. The flight is fully booked.",
        "revelacao": "I am afraid not, sir. The flight is fully booked.",
        "dica": "I am afraid not...",
        "explicacao": "A substituição com be afraid é 'I am afraid not'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Corrija a frase que usou 'I think yes' antes de revelar:\n\n\"Will the new software pass the cybersecurity audit? — I think yes.\"",
        "resposta": "Will the new software pass the cybersecurity audit? — I think so.",
        "revelacao": "Will the new software pass the cybersecurity audit? — I think so.",
        "dica": "Troque 'yes' por 'so'",
        "explicacao": "'Acho que sim' é 'I think so'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra de duas letras que substitui uma oração afirmativa em 'I believe ___':\n\n\"Will our proposal win the tender? — All partners believe ___.\" (que sim)",
        "resposta": "so",
        "explicacao": "A palavra substitutiva é 'so'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome substitutivo singular para evitar repetir 'car':\n\n\"I don't like my old car anymore; I want to purchase a hybrid ___.\" (um / veículo)",
        "resposta": "one",
        "explicacao": "A pro-forma singular é 'one'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma no passado do verbo 'do' que compõe a substituição '___ so':\n\n\"The general ordered the troops to retreat, and they ___ so under cover of darkness.\" (fizeram)",
        "resposta": "did",
        "explicacao": "No passado, a expressão é 'did so'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra condicional negativa elíptica de três letras em 'If ___':\n\n\"Please confirm your attendance by Friday; if ___, your seat will be reallocated.\" (não / caso contrário)",
        "resposta": "not",
        "explicacao": "A expressão elíptica de caso negativo é 'if not'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 9: Discourse Markers
  // ─────────────────────────────────────────────────────────────
  "c1-lez9": {
    "id": "c1-lez9",
    "num": "Lesson 9",
    "titulo": "Discourse Markers",
    "subtitulo": "Broadly speaking, Nevertheless, That being said & As far as X is concerned — A Arquitetura do Pensamento",
    "cena": {
      "origem": "dialogo",
      "titulo": "The Academic Panel on Artificial Intelligence",
      "texto": "**Moderator:** Professor Hawthorne, how would you evaluate the ethical impact of autonomous AI agents on modern corporate governance?\n**Prof. Hawthorne:** **Broadly speaking**, the efficiency gains are undeniable. **That being said**, we cannot overlook the significant algorithmic biases present in training sets.\n**Dr. Aris:** I concur. **Consequently**, regulatory agencies must establish rigorous verification benchmarks. **Nevertheless**, over-regulation risks stifling frontier innovation.\n**Prof. Hawthorne:** Precisely. And **as far as legal liability is concerned**, existing civil liability frameworks are completely ill-equipped to handle autonomous algorithmic decisions."
    },
    "fio": {
      "abertura": "Chegamos ao coração da retórica acadêmica e profissional de nível C1. No discurso avançado, as frases não são jogadas como tijolos soltos em uma pilha; elas são conectadas por vigas de aço que sinalizam para o ouvinte **exatamente como a próxima ideia se relaciona com a anterior**: se é uma generalização, uma concessão elegante, uma consequência lógica ou uma mudança temática deliberada.",
      "descoberta": "Observe como os debatedores conduzem o raciocínio com marcadores discursivos de alto padrão:\n1. «Broadly speaking» (generalização panorâmica inicial);\n2. «That being said» (ressalva concessiva de enorme sofisticação, substituindo o batido *however*);\n3. «Consequently» (dedução lógica formal);\n4. «Nevertheless» (antítese forte);\n5. «As far as legal liability is concerned» (enquadramento temático cirúrgico)!",
      "fecho": "Os Discourse Markers são os maestros da conversa: eles controlam o ritmo, a nuance e a autoridade intelectual de cada período que você constrói."
    },
    "alerta": "A estrutura de enquadramento temático: **As far as [X] is concerned** exige a palavra 'concerned' no final! Um dos erros mais comuns de brasileiros em exames é dizer *'As far as the economy'* sem o 'is concerned'. A fórmula completa e correta é: **As far as the economy IS CONCERNED...**!",
    "definicao": {
      "fenomeno": "Broadly speaking, people prefer peace (em termos gerais) · That being said, the risks are high (dito isso / no entanto) · As far as I am concerned, it is over (no que me diz respeito) · Consequently, we must act (portanto)",
      "causa": "Por que chamamos essas palavras de 'marcadores discursivos' em vez de simples conjunções?",
      "conceito": "Porque eles operam no nível supra-frasal (*discourse level*). Não ligam apenas duas orações dentro da mesma frase, mas gerenciam a postura epistêmica do falante, a transição entre parágrafos e a navegação temática de todo o texto."
    },
    "inventario": [
      "Marcadores de Generalização: Broadly speaking, Generally speaking, On the whole, By and large",
      "Marcadores de Concessão Sofisticada: That being said, Having said that, Nevertheless, Nonetheless, Be that as it may",
      "Marcadores de Enquadramento Temático: As far as [X] is concerned, Regarding, With respect to, In terms of",
      "Marcadores de Consequência Formal: Consequently, Therefore, As a result, Accordingly",
      "Marcadores de Mudança de Tópico / Retomada: Incidentially, By the way, To return to our earlier point, As I was saying",
      "Marcadores de Precisão e Reformulação: In other words, That is to say, To put it another way"
    ],
    "tabela_visual": "| Categoria Retórica | Marcadores de Nível C1 | Função no Texto | Exemplo Prático de Alto Registro |\n|---|---|---|---|\n| **Generalização Panorâmica** | *Broadly speaking, By and large, On the whole* | Apresenta uma verdade geral sem se prender a minúcias | * **Broadly speaking**, European startups struggle with scaling capital.* |\n| **Ressalva / Concessão** | *That being said, Having said that, Nevertheless* | Contrabalanceia um elogio ou argumento anterior | *The car is magnificent. **That being said**, £150,000 is excessive.* |\n| **Enquadramento Temático**| *As far as [X] is concerned, Regarding* | Foca a atenção em um aspecto delimitado | * **As far as security is concerned**, the vault is impenetrable.* |\n| **Dedução / Consequência** | *Consequently, Therefore, Accordingly* | Mostra o desfecho lógico irrefutável | *Revenues plunged by 40%. **Consequently**, layoffs became unavoidable.* |\n| **Reformulação Didática** | *In other words, That is to say, Put simply* | Explica o mesmo conceito com maior clareza | *The market is illiquid. **In other words**, nobody is buying.* |\n| **Perspectiva Pessoal** | *To my mind, As I see it, In my estimation* | Expressa juízo técnico ponderado | * **In my estimation**, the real estate bubble will deflate gradually.* |",
    "observacao_cards": [
      {
        "ingles": "That being said...",
        "traducao": "Dito isso... / Não obstante...",
        "genero": "Transição de Alta Elegância",
        "motivo": "Substitui 'however' com muito mais frescor estilístico em ensaios e debates."
      },
      {
        "ingles": "As far as [X] is concerned",
        "traducao": "No que diz respeito a [X]...",
        "genero": "Fórmula de Enquadramento",
        "motivo": "Exige 'is concerned' no final: 'As far as renewable energy is concerned, Denmark is a pioneer'."
      },
      {
        "ingles": "Broadly speaking...",
        "traducao": "Em termos gerais... / De modo amplo",
        "genero": "Abertura Panorâmica",
        "motivo": "Inicia respostas com tom acadêmico: 'Broadly speaking, democratic regimes foster economic openness'."
      },
      {
        "ingles": "Consequently (Portanto)",
        "traducao": "consequentemente / por conseguinte",
        "genero": "Causalidade Formal",
        "motivo": "Muito mais forte e respeitável do que 'so' na redação acadêmica e técnica."
      }
    ],
    "tecnica": {
      "titulo": "A Condução da Argumentação em 3 Passos",
      "passos": [
        "1. Inicie apresentando a visão ampla e o consenso geral com BROADLY SPEAKING ou ON THE WHOLE.",
        "2. Introduza a ressalva crítica ou a complexidade do problema com THAT BEING SAID ou NEVERTHELESS.",
        "3. Delimite os aspectos específicos da sua análise usando AS FAR AS [TÓPICO] IS CONCERNED e conclua com CONSEQUENTLY."
      ]
    },
    "teoria": "### A Teoria Aprofundada dos Marcadores Discursivos (Discourse Markers)\n\nNa pragmática e na análise do discurso, os *discourse markers* funcionam como 'sinais de trânsito' (*signposts*) na mente do interlocutor. Eles indicam curvas conceituais, acelerações lógicas e desvios de rota temática, garantindo que o leitor nunca se sinta desorientado em textos densos.\n\n#### 1. A Arte da Concessão Equilibrada: *That being said* e *Having said that*\nEstas expressões tornaram-se o padrão ouro na oratória contemporânea em fóruns como Oxford Union e TED Talks. Servem para apresentar um contraponto vigoroso logo após conceder a validade de um fato anterior:\n* *\"The investment portfolio delivered impressive returns in the tech sector. **That being said**, our emerging market holdings suffered catastrophic devaluations.\"*\n* *\"She is an extraordinarily talented surgeon. **Having said that**, her bedside manner can be somewhat abrasive.\"*\n\n#### 2. O Enquadramento Analítico: *As far as... is concerned*\nEsta construção delimita o escopo da afirmação, prevenindo generalizações indevidas e demonstrando rigor científico:\n* *\"**As far as public health infrastructure is concerned**, Scandinavia ranks among the finest in the world.\"*\n* *\"**As far as I am concerned**, the scientific debate on anthropogenic warming is decisively closed.\"* (= No que me diz respeito / Na minha opinião técnica).\n\n#### 3. Generalizações Responsáveis: *By and large* e *Broadly speaking*\nNa redação acadêmica (IELTS Academic Task 2), afirmações categóricas como *\"all people do X\"* são duramente penalizadas. O uso de moduladores generalizadores confere equilíbrio e honestidade metodológica:\n* *\"**By and large**, small businesses in developing nations struggle with access to commercial credit.\"*\n* *\"**Broadly speaking**, the higher the education level of a population, the greater the civic engagement.\"*\n\n#### 4. Consequência e Encadeamento Deductivo: *Consequently* e *Accordingly*\nSubstituem com imensa autoridade os marcadores básicos *so* e *because of this*:\n* *\"The defendant deliberately misled the regulatory commission. **Consequently**, the judge imposed the maximum statutory fine.\"*\n* *\"The consumer landscape has shifted toward digital transactions. **Accordingly**, retail banks must recalibrate their physical branch networks.\"*",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português culto, utilizamos marcadores equivalentes:\n* *\"Em termos gerais...\"* → *Broadly speaking...*\n* *\"Dito isso... / Não obstante...\"* → *That being said... / Nevertheless...*\n* *\"No que concerne a... / No que tange a...\"* → *As far as [X] is concerned...*\n* *\"Por conseguinte... / Consequentemente...\"* → *Consequently...*\n\n**Onde o brasileiro tropeça no inglês de nível C1?**\n* **Pobreza de repertório (The 'SO' Addiction):** O vício número um de alunos brasileiros em redações de nível avançado é usar a conjunção *so* ou *but* no início de parágrafos inteiros. Em inglês formal, iniciar parágrafos com *so* soa extremamente informal. Substitua por **Consequently, Therefore** ou **Accordingly**!\n* **Esquecer o final de 'As far as...':** Muitos brasileiros dizem *\"As far as I know\"* (que está correto para 'até onde eu sei'), e depois tentam aplicar a mesma estrutura dizendo *\"As far as the economy\"* para dizer 'no que tange à economia'. Isso fica incompleto. Você DEVE completar a fórmula com o particípio: **As far as the economy IS CONCERNED**.",
    "exemplos_prc": [
      {
        "pergunta": "How would you characterize the overall performance of the global economy over the past year?",
        "resposta": "Broadly speaking, advanced economies demonstrated remarkable resilience against inflationary shocks. That being said, sovereign debt levels in developing nations have reached alarming proportions.",
        "contexto": "Oferecendo um resumo executivo panorâmico sobre a economia global em uma conferência bancária."
      },
      {
        "pergunta": "What are the primary logistical challenges facing the relief mission in the flood zone?",
        "resposta": "Food and potable water supplies are abundant. However, as far as road transportation is concerned, every single bridge connecting the valley has been swept away.",
        "contexto": "Delimitando com precisão o gargalo operacional de uma operação humanitária de emergência."
      },
      {
        "pergunta": "Why did the manufacturing plant decide to automate its quality inspection line?",
        "resposta": "Human inspection error rates were hovering around twelve percent. Consequently, management invested four million pounds in high-speed optical computer vision systems.",
        "contexto": "Justificando uma decisão estratégica de investimento tecnológico em uma indústria farmacêutica."
      }
    ],
    "armadilhas": [
      {
        "erro": "As far as the climate change, we must act immediately.",
        "correcao": "As far as climate change is concerned, we must act immediately (ou Regarding climate change...).",
        "explicacao": "A locução de enquadramento exige 'is concerned' no final: 'As far as climate change IS CONCERNED'."
      },
      {
        "erro": "The proposal has benefits. That say, the budget is too high.",
        "correcao": "The proposal has benefits. That being said, the budget is too high.",
        "explicacao": "A locução correta de concessão é 'That being said' (ou 'Having said that')."
      },
      {
        "erro": "Sales dropped severely. So, we had to downsize the team.",
        "correcao": "Sales dropped severely. Consequently, we had to downsize the team (ou Therefore...).",
        "explicacao": "Em relatórios e textos formais C1, evite iniciar períodos com 'So'. Utilize conectivos maduros como 'Consequently' ou 'Therefore'."
      }
    ],
    "coda": "Discourse markers are the architect's blueprint: turning a heap of individual sentences into a cathedral of cohesive thought.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o marcador de concessão contemporâneo mais refinado:\n\"The new smartphone camera is truly outstanding. ___, a price tag of £1,400 is difficult to justify.\"",
        "opcoes": [
          "That being said",
          "Broadly speaking",
          "In other words",
          "As a result"
        ],
        "resposta": "That being said",
        "explicacao": "'That being said' expressa ressalva e contrabalanço com alto prestígio estilístico."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a fórmula correta de enquadramento temático:\n\"___ environmental regulations are concerned, the European Union maintains the world's strictest standards.\"",
        "opcoes": [
          "As far as",
          "As long as",
          "As much as",
          "As soon as"
        ],
        "resposta": "As far as",
        "explicacao": "A fórmula completa é 'As far as [tópico] is concerned'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o marcador de generalização acadêmica:\n\"___, higher taxation on carbon emissions encourages private investment in green technology.\"",
        "opcoes": [
          "Broadly speaking",
          "That is to say",
          "Consequently",
          "By the way"
        ],
        "resposta": "Broadly speaking",
        "explicacao": "'Broadly speaking' inicia análises acadêmicas gerais com rigor e modulação."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual marcador expressa consequência lógica formal de alto nível em relatórios?",
        "opcoes": [
          "Consequently",
          "So",
          "Because of",
          "Broadly"
        ],
        "resposta": "Consequently",
        "explicacao": "'Consequently' é o marcador de consequência lógica formal por excelência."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no marcador de enquadramento pessoal antes de revelar:\n\n\"___ (no que me diz respeito), the contractual dispute was settled the moment they paid the penalty.\"",
        "resposta": "As far as I am concerned, the contractual dispute was settled the moment they paid the penalty.",
        "revelacao": "As far as I am concerned, the contractual dispute was settled the moment they paid the penalty.",
        "dica": "As far as I am concerned...",
        "explicacao": "A expressão de julgamento pessoal é 'As far as I am concerned'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no marcador de reformulação esclarecedora antes de revelar:\n\n\"The company's liquid liabilities exceed its current assets. ___ (em outras palavras), we are facing severe insolvency.\"",
        "resposta": "In other words, we are facing severe insolvency. (ou: Put simply, / That is to say,)",
        "revelacao": "In other words, we are facing severe insolvency. (ou: Put simply, / That is to say,)",
        "dica": "In other words...",
        "explicacao": "A reformulação didática é 'In other words'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na ressalva elegante com 'Having said that' antes de revelar:\n\n\"The candidate lacks direct management experience. ___ (dito isso / no entanto), her technical brilliance is unmatched.\"",
        "resposta": "Having said that, her technical brilliance is unmatched. (ou: That being said,)",
        "revelacao": "Having said that, her technical brilliance is unmatched. (ou: That being said,)",
        "dica": "Having said that (ou That being said)",
        "explicacao": "Marcador de ressalva: 'Having said that'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Corrija a frase que omitiu 'is concerned' antes de revelar:\n\n\"As far as artificial intelligence, we must establish clear ethical guardrails.\"",
        "resposta": "As far as artificial intelligence is concerned, we must establish clear ethical guardrails.",
        "revelacao": "As far as artificial intelligence is concerned, we must establish clear ethical guardrails.",
        "dica": "Adicione 'is concerned' após artificial intelligence",
        "explicacao": "A estrutura completa exige 'is concerned'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o advérbio que antecede 'speaking' para compor a expressão de generalização (sete letras):\n\n\"___ speaking, consumers gravitate toward brands that demonstrate social purpose.\" (De modo geral / amplamente)",
        "resposta": "Broadly",
        "explicacao": "A expressão é 'Broadly speaking'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o particípio passado de 'concern' que fecha a expressão 'As far as X is ___':\n\n\"As far as the timeline is ___, we expect completion by the end of November.\"",
        "resposta": "concerned",
        "explicacao": "A palavra que fecha a locução é 'concerned'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma com -ing do verbo 'be' que completa a locução de ressalva 'That ___ said':\n\n\"The movie was visually stunning. That ___ said, the plot was predictable.\" (Dito isso)",
        "resposta": "being",
        "explicacao": "A locução é 'That being said'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o advérbio formal de causa/efeito de doze letras iniciado com 'C':\n\n\"The central server crashed; ___, online banking transactions were halted for two hours.\" (Consequentemente)",
        "resposta": "Consequently",
        "explicacao": "O marcador é 'Consequently'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 10: Idioms & Collocations
  // ─────────────────────────────────────────────────────────────
  "c1-lez10": {
    "id": "c1-lez10",
    "num": "Lesson 10",
    "titulo": "Idioms & Collocations",
    "subtitulo": "Como Combinar Palavras de Forma Natural — A Fronteira Final da Maestria Nativa",
    "cena": {
      "origem": "dialogo",
      "titulo": "The Venture Partner's Investment Briefing",
      "texto": "**Partner:** Before we **make a final decision** on funding this quantum computing startup, we need to **do our due diligence** thoroughly.\n**Associate:** Absolutely. I **made an appointment** with their chief scientist yesterday. She **drew my attention to** their patent portfolio, which gives them an **unrivalled competitive advantage**.\n**Partner:** Excellent work. Let us not **jump to conclusions**, but if their prototype **meets our expectations**, this deal will **make a fortune** for our limited partners. We simply cannot **afford to miss this golden opportunity**."
    },
    "fio": {
      "abertura": "Chegamos à última e mais gloriosa lição de todo o curso de gramática inglesa: o ápice da proficiência C1/C2! Você pode dominar todas as regras gramaticais do mundo, mas se combinar as palavras erradas, soará para sempre como um estrangeiro traduzindo mentalmente. Por que os nativos dizem *'make a decision'* e nunca *'do a decision'*? Por que dizem *'do business'* e nunca *'make business'*? Por que dizem *'heavy rain'* e nunca *'thick rain'*?",
      "descoberta": "Isso se chama **Collocation** (colocação lexical: o casamento natural e consagrado entre as palavras). Observe o diálogo executivo: o sócio diz «make a decision» (criação/escolha) e «do due diligence» (processo/dever); a associada diz «made an appointment», «drew my attention to», «unrivalled competitive advantage», «jump to conclusions», «meet expectations», «make a fortune» e «golden opportunity». Cada substantivo está acoplado ao seu parceiro lexical perfeito!",
      "fecho": "A maestria nativa não consiste em saber palavras isoladas no dicionário, mas em manejar os blocos de linguagem pré-fabricados (*lexical chunks*) com fluidez espontânea."
    },
    "alerta": "O clássico divisor de águas: **MAKE vs DO**:\n- **MAKE:** Focado em criar, construir, produzir algo novo que não existia antes, ou em escolhas e sons (*make a cake, make a decision, make a mistake, make noise, make an appointment, make money*).\n- **DO:** Focado em executar tarefas, obrigações, atividades de rotina, trabalho indefinido ou cuidados corporais (*do homework, do business, do research, do a favor, do your best, do the dishes*)!",
    "definicao": {
      "fenomeno": "Make a mistake (cometer um erro) · Do research (fazer pesquisa) · Bitterly disappointed (amargamente desapontado) · Heavy traffic (trânsito pesado) · Fast food (comida rápida, nunca quick food)",
      "causa": "Por que certas palavras 'andam juntas' e outras combinações idênticas em significado soam erradas?",
      "conceito": "As colocações são convenções históricas e culturais sedimentadas ao longo de séculos de uso na comunidade linguística. O cérebro nativo armazena a linguagem não em palavras soltas, mas em blocos multipalavras (*formulaic sequences*). Violar uma colocação soa artificial mesmo quando a gramática é perfeita."
    },
    "inventario": [
      "O Grande Duelo: Colocações essenciais com MAKE (decisions, appointments, money, mistakes, progress, effort, an impression)",
      "O Grande Duelo: Colocações essenciais com DO (business, research, homework, a favor, damage, justice, your best)",
      "Colocações Adjetivo + Substantivo: heavy rain, heavy traffic, strong coffee, wide awake, golden opportunity, foregone conclusion",
      "Colocações Advérbio + Adjetivo: bitterly disappointed, fully aware, highly unlikely, deeply concerned, blissfully ignorant",
      "Colocações Verbo + Substantivo: draw attention to, jump to conclusions, meet expectations, cast doubt on, pay tribute to",
      "Expressões Idiomáticas de Alto Registro C1: hit the ground running, see eye to eye, bite the bullet, clear the air"
    ],
    "tabela_visual": "| Categoria de Colocação | Combinação Natural Nativa C1 | Erro Típico de Tradução Literal | Significado Prático |\n|---|---|---|---|\n| **MAKE (Criação / Escolha)** | * **make a decision** / *a choice* | *do a decision* | Tomar uma decisão |\n| **MAKE (Planejamento)** | * **make an appointment** | *do an appointment* | Marcar uma consulta / reunião |\n| **MAKE (Financeiro)** | * **make a profit** / *a fortune* | *gain money / do profit* | Lucrar / fazer uma fortuna |\n| **DO (Trabalho / Tarefa)** | * **do business** with... | *make business* | Fazer negócios com alguém |\n| **DO (Investigação)** | * **do research** / *an audit* | *make research* | Conduzir pesquisa científica |\n| **Advérbio + Adjetivo** | * **bitterly disappointed** | *deeply frustrated* | Profundamente decepcionado |\n| **Advérbio + Adjetivo** | * **highly unlikely** | *very improbable* | Altamente improvável |\n| **Adjetivo + Substantivo** | * **heavy traffic** / *heavy rain* | *thick traffic / strong rain* | Trânsito congestionado / chuva forte |\n| **Verbo + Substantivo** | * **draw attention to** | *call attention on* | Chamar a atenção para algo |",
    "observacao_cards": [
      {
        "ingles": "Do business vs Make money",
        "traducao": "Fazer negócios vs Ganhar dinheiro",
        "genero": "Make vs Do Clássico",
        "motivo": "Negócios é atividade/processo (DO business); dinheiro é resultado gerado (MAKE money)."
      },
      {
        "ingles": "Bitterly disappointed",
        "traducao": "amargamente decepcionado",
        "genero": "Advérbio + Adjetivo C1",
        "motivo": "A combinação canônica culta para decepção intensa em ensaios e resenhas."
      },
      {
        "ingles": "Draw attention to...",
        "traducao": "Chamar a atenção para...",
        "genero": "Colocação Verbal Formal",
        "motivo": "Em apresentações formais, prefira 'I would like to draw your attention to slide 4' (muito superior a call attention)."
      },
      {
        "ingles": "Heavy rain / Heavy traffic",
        "traducao": "chuva torrencial / trânsito pesado",
        "genero": "Adjetivo Consagrado",
        "motivo": "O inglês não diz 'strong rain' ou 'thick traffic'; a palavra consagrada é HEAVY."
      }
    ],
    "tecnica": {
      "titulo": "O Algoritmo de Aquisição de Colocações em 3 Passos",
      "passos": [
        "1. Nunca anote uma palavra nova isolada; anote sempre o BLOCO DE TRÊS PALAVRAS em que ela vive (ex: 'draw attention to', 'bitterly disappointed').",
        "2. Para ações: pergunte-se se você está CRIANDO algo novo do zero (MAKE) ou EXECUTANDO uma tarefa/trabalho contínuo (DO).",
        "3. Em redações C1, substitua advérbios genéricos como 'very' por advérbios de colocação forte ('highly unlikely', 'deeply concerned', 'fully aware')."
      ]
    },
    "teoria": "### A Teoria Aprofundada de Colocações e Expressões Idiomáticas (Lexical Chunks)\n\nA revolução linguística iniciada por John Sinclair e Michael Lewis com a *Lexical Approach* comprovou que a linguagem não é governada por 'gramática cheia de regras preenchida por palavras soltas', mas sim por **blocos lexicais pré-fabricados (*prefabricated multi-word chunks*)**.\n\n#### 1. A Lógica Cognitiva de MAKE vs DO\n* **MAKE (Criação, Construção e Mudança de Estado):**\n  * *Criação física ou abstrata:* make a cake, make a plan, make an exception, make an impression.\n  * *Comunicação e escolhas:* make a phone call, make a speech, make an inquiry, make a suggestion, make a mistake.\n  * *Riqueza e resultados:* make a fortune, make a living, make ends meet.\n* **DO (Processo, Atividade e Desempenho de Papel):**\n  * *Obrigações e tarefas:* do the laundry, do chores, do the dishes, do an assignment.\n  * *Atividades acadêmicas e comerciais:* do research, do a PhD, do market analysis, do business.\n  * *Ações que afetam pessoas:* do someone a favor, do justice to, do harm, do damage.\n\n#### 2. Colocações Fortes de Advérbio + Adjetivo (*Collocational Intensifiers*)\nSubstituir o monótono advérbio *very* por intensificadores colocacionais é o atalho mais rápido para obter nota máxima em vocabulário em exames internacionais:\n* *bitterly:* bitterly disappointed, bitterly cold, bitterly divided.\n* *highly:* highly unlikely, highly successful, highly controversial, highly skilled.\n* *deeply:* deeply concerned, deeply hurt, deeply committed, deeply rooted.\n* *fully:* fully aware, fully operational, fully equipped, fully justified.\n* *blissfully:* blissfully unaware, blissfully happy.\n* *utterly:* utterly ridiculous, utterly exhausted, utterly devastated.\n\n#### 3. Colocações Verbais de Registro Corporativo e Acadêmico\n* *cast doubt on:* \"The new empirical findings **cast serious doubt on** the traditional economic model.\"\n* *pay tribute to:* \"The prime minister **paid glowing tribute to** the frontline medical workers.\"\n* *shed light on:* \"This archaeological discovery **sheds new light on** Bronze Age maritime trade routes.\"\n* *reach a consensus:* \"After ten hours of deliberation, the committee finally **reached a consensus**.\"\n\n#### 4. Expressões Idiomáticas de Alto Nível de Sofisticação\n* **Hit the ground running:** Começar uma atividade ou novo emprego com dinamismo e sucesso imediato sem perda de tempo.\n* **Bite the bullet:** Enfrentar uma situação dolorosa ou inevitável com coragem estoica.\n* **See eye to eye:** Concordar plenamente em princípios e pontos de vista (*We don't always see eye to eye, but we respect each other*).\n* **Clear the air:** Ter uma conversa aberta e franca para dissipar ressentimentos ou mal-entendidos.",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português, o verbo **FAZER** é um gigante onipresente que engole quase tudo:\n* Dizemos: *\"fazer um café\"* (make), *\"fazer um bolo\"* (make), *\"fazer uma decisão\"* (make a decision), *\"fazer uma pesquisa\"* (do research), *\"fazer negócios\"* (do business), *\"fazer um favor\"* (do a favor), *\"fazer um erro\"* (make a mistake)!\n\n**Onde o brasileiro tropeça no inglês de nível C1?**\n* Como o português usa o verbo 'fazer' para ambas as categorias, o estudante brasileiro vive em uma loteria aleatória entre *make* e *do*. A regra mais importante para o brasileiro memorizar é: **PESQUISA É DO RESEARCH** e **NEGÓCIOS É DO BUSINESS**! Dizer *\"I want to make business with you\"* ou *\"we made a research\"* soa primário para um nativo.\n* **A tradução literal de adjetivos:** Em português dizemos *\"chuva forte\"*. Se traduzirmos como *\"strong rain\"*, qualquer pessoa na Inglaterra ou nos EUA estranhará a combinação, pois para eles a chuva torrencial é inegociavelmente **HEAVY RAIN**!",
    "exemplos_prc": [
      {
        "pergunta": "Why did the investment fund decide to pull out of the biotechnology venture?",
        "resposta": "Our technical auditors did comprehensive research into their patent validity, and the results cast serious doubt on their commercial viability.",
        "contexto": "Explicando os fundamentos de uma decisão estratégica de desinvestimento corporativo."
      },
      {
        "pergunta": "How did the executive team respond when the factory fire destroyed their primary inventory?",
        "resposta": "Rather than jumping to conclusions or panicking, the directors bit the bullet, cleared the air with key suppliers, and hit the ground running with alternative logistics.",
        "contexto": "Elogiando a liderança resiliente de uma diretoria executiva diante de uma crise de grandes proporções."
      },
      {
        "pergunta": "Are the members of the steering committee likely to reach a consensus before the midnight deadline?",
        "resposta": "Given that the partners are bitterly divided on the dividend allocation formula, reaching a consensus tonight is highly unlikely.",
        "contexto": "Avaliando a probabilidade de um acordo entre sócios em uma assembleia extraordinária."
      }
    ],
    "armadilhas": [
      {
        "erro": "We need to make a research before publishing the scientific paper.",
        "correcao": "We need to do research before publishing the scientific paper.",
        "explicacao": "Pesquisa acadêmica ou técnica exige o verbo 'do' (do research), sendo 'make research' gramaticalmente incorreto."
      },
      {
        "erro": "I was very disappointed by the outcome of the negotiations.",
        "correcao": "I was bitterly disappointed by the outcome of the negotiations.",
        "explicacao": "Para demonstrar vocabulário maduro C1, substitua 'very disappointed' pela colocação consagrada 'bitterly disappointed'."
      },
      {
        "erro": "I was late because there was a strong traffic on the motorway.",
        "correcao": "I was late because there was heavy traffic on the motorway.",
        "explicacao": "Trânsito congestionado combina com 'heavy', nunca com 'strong'."
      }
    ],
    "coda": "Grammar gives language its skeleton, but collocations breathe living pulse and music into the soul of words.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Qual é a colocação verbal correta para 'conduzir pesquisa científica'?\n\"The university department secured a grant to ___ on Alzheimer's disease.\"",
        "opcoes": [
          "do research",
          "make research",
          "create research",
          "perform a research"
        ],
        "resposta": "do research",
        "explicacao": "A colocação nativa e institucional correta é 'do research'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a colocação de advérbio intensificador C1 para decepção profunda:\n\"The Olympic gymnast was ___ when she missed the bronze medal by a fraction of a point.\"",
        "opcoes": [
          "bitterly disappointed",
          "heavily disappointed",
          "strongly disappointed",
          "thickly disappointed"
        ],
        "resposta": "bitterly disappointed",
        "explicacao": "'Bitterly disappointed' é a colocação consagrada de alto prestígio."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual expressão verbal formal é a mais elegante para 'chamar a atenção do público para um detalhe'?\n\"I would like to ___ the discrepancy on page 4 of the financial report.\"",
        "opcoes": [
          "draw your attention to",
          "call your attention on",
          "make your attention at",
          "pull your attention to"
        ],
        "resposta": "draw your attention to",
        "explicacao": "'Draw attention to...' é a colocação formal corporativa e acadêmica por excelência."
      },
      {
        "tipo": "escolha",
        "pergunta": "Assinale a combinação de palavras correta com 'heavy':",
        "opcoes": [
          "heavy rain and heavy traffic",
          "strong rain and thick traffic",
          "hard rain and hard traffic",
          "heavy rain and thick traffic"
        ],
        "resposta": "heavy rain and heavy traffic",
        "explicacao": "Tanto chuva torrencial quanto trânsito denso coligam com 'heavy' (heavy rain / heavy traffic)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no verbo correto entre make e do para 'negócios' antes de revelar:\n\n\"Our multinational enterprise refuses to ___ (make / do) business with suppliers that exploit child labor.\"",
        "resposta": "Our multinational enterprise refuses to do business with suppliers that exploit child labor.",
        "revelacao": "Our multinational enterprise refuses to do business with suppliers that exploit child labor.",
        "dica": "Negócios é atividade/processo (do business)",
        "explicacao": "A colocação correta é 'do business'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na colocação 'cast doubt on' (lançar dúvidas sobre) antes de revelar:\n\n\"The newly discovered forensic fingerprints ___ (lançaram sérias dúvidas sobre) the suspect's alleged alibi.\"",
        "resposta": "The newly discovered forensic fingerprints cast serious doubt on the suspect's alleged alibi.",
        "revelacao": "The newly discovered forensic fingerprints cast serious doubt on the suspect's alleged alibi.",
        "dica": "cast serious doubt on...",
        "explicacao": "A colocação formal é 'cast doubt on'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na expressão idiomática 'enfrentar com coragem / engolir o choro' antes de revelar:\n\n\"The dental procedure will be uncomfortable, but you simply have to ___ (bite the bullet / hit the ground) and get it over with.\"",
        "resposta": "The dental procedure will be uncomfortable, but you simply have to bite the bullet and get it over with.",
        "revelacao": "The dental procedure will be uncomfortable, but you simply have to bite the bullet and get it over with.",
        "dica": "bite the bullet",
        "explicacao": "A expressão para enfrentar algo difícil com coragem é 'bite the bullet'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Corrija a colocação incorreta de 'fazer uma decisão' antes de revelar:\n\n\"The committee will do a final decision by tomorrow afternoon.\"",
        "resposta": "The committee will make a final decision by tomorrow afternoon.",
        "revelacao": "The committee will make a final decision by tomorrow afternoon.",
        "dica": "Decisões exigem o verbo 'make'",
        "explicacao": "A colocação é 'make a decision', nunca 'do a decision'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o verbo (make ou do) que combina com 'an appointment':\n\n\"I need to ___ an appointment with the cardiologist for Friday morning.\" (marcar)",
        "resposta": "make",
        "explicacao": "A colocação é 'make an appointment'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o advérbio que antecede 'unlikely' na colocação C1 (seis letras):\n\n\"It is ___ unlikely that the two rival factions will sign a ceasefire this week.\" (Altamente)",
        "resposta": "highly",
        "explicacao": "A colocação é 'highly unlikely'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o verbo que completa a expressão 'jump to ___' (tirar conclusões precipitadas):\n\n\"Let's review the audited figures before we jump to ___.\" (conclusões)",
        "resposta": "conclusions",
        "explicacao": "A expressão idiomática é 'jump to conclusions'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o verbo que forma a expressão 'fazer um favor':\n\n\"Could you please ___ me a favor and proofread this urgent email?\"",
        "resposta": "do",
        "explicacao": "A colocação é 'do someone a favor'."
      }
    ]
  }
};

console.log('Aplicando Onda 7 — Parte 2 (Lições C1.6 a C1.10 - FIM DO CURRÍCULO!)...');

for (const [id, lessonData] of Object.entries(wave7Part2Lessons)) {
  for (const mod of data.moduli) {
    const idx = mod.lezioni.findIndex(l => l.id === id);
    if (idx !== -1) {
      mod.lezioni[idx] = lessonData;
      console.log(`✓ Lição ${id} (${lessonData.titulo}) enriquecida com sucesso!`);
    }
  }
}

fs.writeFileSync(grammarPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Onda 7 — Parte 2 gravada com sucesso em data/grammar.json! TODAS AS 90 LIÇÕES CONCLUÍDAS!');
