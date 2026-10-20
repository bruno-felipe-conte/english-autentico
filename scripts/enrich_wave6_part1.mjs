import fs from 'fs';

const grammarPath = 'data/grammar.json';
const data = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));

// Onda 6 — Parte 1: Lições B2.1 a B2.5 (Condicionais Avançadas, Voz Passiva Complexa, Discurso Indireto & Orações Relativas)
const wave6Part1Lessons = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 1: Third Conditional
  // ─────────────────────────────────────────────────────────────
  "b2-lez1": {
    "id": "b2-lez1",
    "num": "Lesson 1",
    "titulo": "Third Conditional",
    "subtitulo": "Arrependimentos e Hipóteses no Passado — O Que Poderia Ter Sido",
    "cena": {
      "origem": "dialogo",
      "titulo": "The Missed Flight to Singapore",
      "texto": "**Marcus:** What happened at the airport yesterday, Elena? I heard you missed the executive summit in Singapore!\n**Elena:** It was a complete disaster! If my alarm clock had gone off on time, I wouldn't have missed my morning train.\n**Marcus:** Oh no! But couldn't you have taken a taxi directly to Heathrow?\n**Elena:** If the motorway hadn't been blocked by that terrible accident, a taxi would have gotten me there in time. If only I had packed my luggage the night before, I might have caught the midday flight!"
    },
    "fio": {
      "abertura": "Bem-vindo ao nível B2! Se no First Conditional navegamos pelas certezas do futuro e no Second Conditional exploramos devaneios hipotéticos do presente, no Third Conditional pisamos no território mais dramático da mente humana: o passado imutável. Aqui expressamos arrependimentos, alívios por termos escapado de desastres e especulações sobre como o mundo seria se um evento histórico tivesse sido diferente.",
      "descoberta": "Observe o desabafo de Elena: ela perdeu o trem e o voo. O passado está 100% selado. Para criar uma realidade alternativa no passado, a língua inglesa exige recuar um tempo verbal a mais no passado: a oração condicional («If») vai para o Past Perfect («had gone off», «hadn't been blocked»), e a consequência traz o condicional perfeito («would have missed», «would have gotten», «might have caught»).",
      "fecho": "A regra de ouro do Third Conditional: você está imaginando um filme diferente para uma cena que já terminou. A condição é impossível de mudar porque a história já aconteceu."
    },
    "alerta": "O erro mais frequente de falantes de português é colocar 'would have' dentro da oração com 'if': *'If I would have studied, I would have passed'*. Isso é estritamente incorreto no padrão culto da língua inglesa. Guarde esta lei: na oração do IF, JAMAIS use WOULD!",
    "definicao": {
      "fenomeno": "If I had known about the meeting, I would have attended (se eu soubesse / tivesse sabido, teria participado) · If she hadn't helped us, we would have failed (se ela não tivesse nos ajudado, teríamos falhado)",
      "causa": "Por que usamos Past Perfect na condição e Modal + Have + Particípio no resultado?",
      "conceito": "O Past Perfect marca que a condição pertencia a um passado anterior ao desfecho. Como a ação original nunca aconteceu na linha temporal real, o modal auxiliar ('would/could/might') acompanhado de 'have' constrói o 'presente do pretérito composto' (teria feito, poderia ter acontecido)."
    },
    "inventario": [
      "Fórmula canônica: If + Sujeito + Past Perfect (had + V3), Sujeito + would have + V3",
      "Variações de modal na oração principal: 'could have' (capacidade/possibilidade no passado) e 'might have' (probabilidade menor)",
      "Formas contraídas na fala rápida: 'If I'd known, I'd have called' (onde o primeiro 'd é HAD e o segundo é WOULD)",
      "Inversão formal sem 'if': 'Had I known about the strike, I would have stayed home' (registro C1/B2 alto de grande elegância)",
      "Diferença entre Third Conditional (passado imaginário) e Second Conditional (presente imaginário)"
    ],
    "tabela_visual": "| Estrutura | Oração Condicional (IF) | Oração Principal (Resultado) | Significado Real |\n|---|---|---|---|\n| **Afirmativa Padrão** | *If I **had studied** harder,* | *I **would have passed** the exam.* | Eu não estudei e fui reprovado. |\n| **Negativa na Condição** | *If we **hadn't taken** the shortcut,* | *we **would have arrived** late.* | Nós pegamos o atalho e chegamos a tempo. |\n| **Possibilidade (Could)** | *If you **had called** me,* | *I **could have picked** you up.* | Você não ligou; eu tinha a capacidade de buscar, mas não busquei. |\n| **Incerteza (Might)** | *If they **had offered** a discount,* | *I **might have bought** the car.* | Talvez eu tivesse comprado, não era 100% garantido. |\n| **Inversão Formal** | * **Had she arrived** earlier,* | *she **would have seen** the CEO.* | Registro sofisticado formal: dispensa o 'if' invertendo 'Had' com o sujeito. |",
    "observacao_cards": [
      {
        "ingles": "If I had known... I would have...",
        "traducao": "Se eu soubesse / tivesse sabido... eu teria...",
        "genero": "Fórmula Padrão",
        "motivo": "A combinação canônica de arrependimento ou especulação retrospectiva: Past Perfect + Would Have."
      },
      {
        "ingles": "Could have vs Would have",
        "traducao": "poderia ter vs teria",
        "genero": "Grau de Certeza/Habilidade",
        "motivo": "'Would have' expressa o resultado certo na hipótese; 'Could have' foca na habilidade ou oportunidade de realizar."
      },
      {
        "ingles": "Contração Fonética Nativa ('d have / would've)",
        "traducao": "I'd have / would've / woulda",
        "genero": "Pronúncia e Fala Fluente",
        "motivo": "Em fala espontânea, 'would have' soa como /wʊdəv/ ou /wʊdə/. O primeiro 'd é HAD: 'If I'd seen' = If I had seen."
      },
      {
        "ingles": "Proibição Absoluta do 'Would' no If",
        "traducao": "If I had (nunca If I would have)",
        "genero": "Regra Anti-Erro",
        "motivo": "Dizer 'If I would have known' é condenado pela gramática normativa e reduz sua nota em exames oficiais."
      }
    ],
    "tecnica": {
      "titulo": "A Engenharia do Passado Alternativo em 3 Passos",
      "passos": [
        "1. Identifique os dois fatos reais no passado (ex: 'Não comprei o bilhete ontem' e 'Não ganhei o prêmio').",
        "2. Transforme o primeiro fato em hipótese inversa usando HAD + Particípio: 'If I had bought the ticket...'",
        "3. Conecte o desfecho hipotético usando WOULD / COULD / MIGHT + HAVE + Particípio: '...I would have won the jackpot!'"
      ]
    },
    "teoria": "### A Teoria Aprofundada do Third Conditional (Past Unreal Conditional)\n\nO Third Conditional é empregado exclusivamente para falar de situações hipotéticas, irreais ou contrafatuais no passado. O evento já aconteceu (ou deixou de acontecer) e não há possibilidade alguma de alterar o desfecho histórico.\n\n#### 1. A Arquitetura Gramatical\nA estrutura clássica é:\n> **If + sujeito + Past Perfect (had / had not + past participle), sujeito + would / could / might + have + past participle**\n\nExemplos de análise:\n* *Fato real:* James didn't set his alarm. He was late for work.\n* *Third Conditional:* **If James had set his alarm, he wouldn't have been late for work.**\n* *Fato real:* Sarah drove too fast on the icy road. She crashed her car.\n* *Third Conditional:* **If Sarah hadn't driven so fast, she wouldn't have crashed her car.**\n\n#### 2. Variação de Modais no Resultado\nNem todas as consequências no passado expressam 100% de certeza. Dependendo da nuance semântica, o inglês substitui **would have** por outros modais:\n* **Would have + V3:** Certeza absoluta do resultado alternativo. (*I would have helped you.* = Com toda certeza eu teria ajudado).\n* **Could have + V3:** Capacidade, permissão ou habilidade de fazer algo que não ocorreu. (*If you had given me the keys, I could have driven.* = Eu teria a capacidade de dirigir).\n* **Might have + V3:** Mera possibilidade ou probabilidade incerta. (*If you had applied, you might have gotten the job.* = Talvez você tivesse conseguido, não era certeza).\n\n#### 3. Ordem das Orações e Pontuação\nAssim como nas outras condicionais, a ordem pode ser invertida sem alteração de significado. A regra da vírgula permanece:\n* Se a oração com **If** vier no início, a vírgula é **obrigatória**: *If they had warned us, we would have canceled the trip.*\n* Se a oração com o modal vier primeiro, **não** se usa vírgula: *We would have canceled the trip if they had warned us.*\n\n#### 4. O Fenômeno da Inversão Formal (Inverted Conditional)\nEm inglês formal, acadêmico ou corporativo de alto nível, o pronome conjuntivo *if* pode ser omitido. Quando isso acontece, o verbo auxiliar **Had** salta para antes do sujeito:\n* *Padrão:* If we had realized the scale of the problem, we would have intervened.\n* *Inversão B2/C1:* **Had we realized the scale of the problem, we would have intervened.**\nEssa estrutura é muito comum em artigos de jornais como *The Economist* e em relatórios jurídicos.",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português, construímos esse tipo de raciocínio de duas formas:\n1. Usando o pretérito mais-que-perfeito composto do subjuntivo na condição + o futuro do pretérito composto no resultado:\n   * *\"Se eu **tivesse estudado**, eu **teria passado**.\"*\n2. Na linguagem coloquial brasileira, é muito comum usar o imperfeito simples: *\"Se eu **soubesse**, eu **tinha ido**.\"*\n\n**Onde o brasileiro tropeça no inglês?**\n* **Transferência do 'teria' para as duas orações:** Por ouvir nativos em filmes ou por confusão com o português, muitos brasileiros dizem *\"If I would have known, I would have said...\"*. Isso é considerado um vício de linguagem severo em exames formais. Lembre-se: em inglês, a oração condicional precisa do **Past Perfect** (*If I had known*).\n* **Esquecer o particípio:** Outro tropeço comum é errar o particípio irregular do terceiro verbo: dizer *\"would have went\"* em vez de *\"would have gone\"*, ou *\"would have saw\"* em vez de *\"would have seen\"*. No Third Conditional, você sempre lida com o particípio (terceira coluna de verbos irregulares).",
    "exemplos_prc": [
      {
        "pergunta": "Why didn't you come to the cinema with us last Saturday?",
        "resposta": "If I hadn't been so exhausted from working overtime, I would have joined you without hesitation.",
        "contexto": "Explicando educadamente o motivo de ter recusado um convite no final de semana passado."
      },
      {
        "pergunta": "Did they win the championship match yesterday afternoon?",
        "resposta": "No, they lost. But if their star goalkeeper hadn't gotten injured in the first half, they might have won.",
        "contexto": "Discutindo o resultado de uma partida esportiva decidida por um imprevisto médico."
      },
      {
        "pergunta": "How did you manage to get that critical project approved so quickly?",
        "resposta": "To be honest, if our director hadn't personally intervened, the board would never have approved the budget.",
        "contexto": "Reconhecendo o papel fundamental da liderança em uma conquista corporativa recente."
      }
    ],
    "armadilhas": [
      {
        "erro": "If I would have had time, I would have visited the British Museum.",
        "correcao": "If I had had time, I would have visited the British Museum.",
        "explicacao": "Nunca use 'would' na oração com 'if'. A repetição 'had had' (o primeiro é auxiliar, o segundo é particípio de ter tempo) é 100% correta e exigida aqui."
      },
      {
        "erro": "If we had left earlier, we would have catch the express train.",
        "correcao": "If we had left earlier, we would have caught the express train.",
        "explicacao": "Após 'would have', o verbo principal deve estar obrigatoriamente no Particípio Passado (caught), nunca na forma base (catch)."
      },
      {
        "erro": "If you had told me, I would had helped you.",
        "correcao": "If you had told me, I would have helped you.",
        "explicacao": "O modal 'would' exige a forma base do auxiliar 'have'. Dizer 'would had' é um erro gramatical que não existe em inglês."
      }
    ],
    "coda": "The past is written in stone, but the Third Conditional lets us paint the masterpiece of what might have been.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a oração de arrependimento:\n\"If I ___ the weather forecast, I would have brought an umbrella.\"",
        "opcoes": [
          "checked",
          "had checked",
          "would check",
          "have checked"
        ],
        "resposta": "had checked",
        "explicacao": "Na oração condicional (com 'if') do Third Conditional, usamos obrigatoriamente o Past Perfect (had + particípio)."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual alternativa expressa uma consequência hipotética de incerteza/probabilidade no passado?",
        "opcoes": [
          "If he had practiced more, he would win the match.",
          "If he had practiced more, he might have won the match.",
          "If he practiced more, he had won the match.",
          "If he would practice, he could have won the match."
        ],
        "resposta": "If he had practiced more, he might have won the match.",
        "explicacao": "'Might have won' expressa possibilidade/incerteza no passado dentro da estrutura clássica do Third Conditional."
      },
      {
        "tipo": "escolha",
        "pergunta": "Identifique a inversão formal correta correspondente a: \"If you had contacted our customer support, they would have resolved the issue.\"",
        "opcoes": [
          "Did you contact our customer support, they would have resolved the issue.",
          "Had you contacted our customer support, they would have resolved the issue.",
          "Were you to contact our customer support, they resolved the issue.",
          "Have you contacted our customer support, they would resolve the issue."
        ],
        "resposta": "Had you contacted our customer support, they would have resolved the issue.",
        "explicacao": "A inversão formal do Third Conditional é feita retirando o 'if' e iniciando com 'Had' + sujeito + particípio."
      },
      {
        "tipo": "escolha",
        "pergunta": "Assinale a frase gramaticalmente IMPECÁVEL:",
        "opcoes": [
          "If she had listened to my advice, she wouldn't have lost all her savings.",
          "If she would have listened to my advice, she wouldn't lose all her savings.",
          "If she listened to my advice, she wouldn't had lost all her savings.",
          "If she had listened to my advice, she didn't lose all her savings."
        ],
        "resposta": "If she had listened to my advice, she wouldn't have lost all her savings.",
        "explicacao": "Combinação perfeita: 'had listened' (Past Perfect na condição) e 'wouldn't have lost' (would have + particípio no resultado)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na estrutura do Third Conditional antes de revelar:\n\n\"If we had reserved the table in advance, we ___ (not wait) outside for forty minutes.\"\n(Se tivéssemos reservado a mesa com antecedência, não teríamos esperado do lado de fora por quarenta minutos.)",
        "resposta": "If we had reserved the table in advance, we wouldn't have waited outside for forty minutes.",
        "revelacao": "If we had reserved the table in advance, we wouldn't have waited outside for forty minutes.",
        "dica": "Use wouldn't have + particípio de wait",
        "explicacao": "A consequência negativa no passado é formada por 'wouldn't have waited'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na oração condicional com 'see' antes de revelar:\n\n\"If the driver ___ (see) the red light, the accident wouldn't have occurred.\"\n(Se o motorista tivesse visto o sinal vermelho, o acidente não teria ocorrido.)",
        "resposta": "If the driver had seen the red light, the accident wouldn't have occurred.",
        "revelacao": "If the driver had seen the red light, the accident wouldn't have occurred.",
        "dica": "Past perfect de see (had seen)",
        "explicacao": "A oração de condição exige o Past Perfect: 'had seen'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no modal de habilidade 'could' antes de revelar:\n\n\"If you had given me your password, I ___ (can / upload) the files for you yesterday.\"\n(Se você tivesse me dado sua senha, eu poderia ter feito o upload dos arquivos para você ontem.)",
        "resposta": "If you had given me your password, I could have uploaded the files for you yesterday.",
        "revelacao": "If you had given me your password, I could have uploaded the files for you yesterday.",
        "dica": "could have + particípio de upload",
        "explicacao": "Para indicar habilidade/possibilidade no passado, usamos 'could have uploaded'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na contração oral comum antes de revelar:\n\nComo um nativo pronuncia de forma natural e rápida:\n\"If I had known, I would have told you.\"",
        "resposta": "If I'd known, I'd have told you. (ou: I would've told you)",
        "revelacao": "If I'd known, I'd have told you. (ou: I would've told you)",
        "dica": "O primeiro 'd é had, o segundo 'd é would",
        "explicacao": "Na linguagem falada, ambas as partes costumam ser contraídas com 'd: 'I'd known' / 'I'd have told you'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma verbal auxiliar correta para completar a oração condicional:\n\n\"If she ___ known the truth, she would have reacted differently.\"",
        "resposta": "had",
        "explicacao": "A oração com 'if' exige o auxiliar 'had' para compor o Past Perfect."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o particípio do verbo 'take' para completar a consequência:\n\n\"If you had offered me that position, I would have ___ it immediately.\"",
        "resposta": "taken",
        "explicacao": "O particípio passado do verbo irregular 'take' é 'taken'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que inicia esta inversão formal:\n\n\"___ they arrived ten minutes earlier, they would have caught the express train.\"",
        "resposta": "Had",
        "explicacao": "A inversão formal substitui 'If they had arrived' por 'Had they arrived'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma contraída negativa de 'would have' que completa a frase:\n\n\"If we had left on time, we ___ missed the beginning of the concert.\" (não teríamos)",
        "resposta": "wouldn't have",
        "explicacao": "A forma correta é 'wouldn't have' (ou would not have)."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 2: Mixed Conditionals
  // ─────────────────────────────────────────────────────────────
  "b2-lez2": {
    "id": "b2-lez2",
    "num": "Lesson 2",
    "titulo": "Mixed Conditionals",
    "subtitulo": "Quando o Passado Ecoa no Presente e Estados Permanentes Mudam a História",
    "cena": {
      "origem": "dialogo",
      "titulo": "Reflecting on Life Choices in Edinburgh",
      "texto": "**Gabriel:** You speak fluent French and German, Claire. Why didn't you accept that diplomatic post in Geneva last year?\n**Claire:** If I had taken that post in Switzerland, I wouldn't be living here in Edinburgh with my husband today!\n**Gabriel:** That makes total sense. Family always comes first.\n**Claire:** Exactly. And conversely, if I weren't so afraid of public speaking, I would have applied for the European Parliament committee back in 2021."
    },
    "fio": {
      "abertura": "Bem-vindo a uma das fronteiras mais elegantes da língua inglesa. Na vida real, o tempo não é dividido em caixinhas estanques: uma decisão que você tomou (ou deixou de tomar) há cinco anos determina exatamente a cadeira onde você está sentado agora. E um traço da sua personalidade atual pode ter impedido uma oportunidade no passado.",
      "descoberta": "Preste atenção cirúrgica às duas falas de Claire. Na primeira: «If I had taken that post... I wouldn't be living here today». A condição é no passado (Third Conditional: had taken), mas a consequência é no presente (Second Conditional: wouldn't be living now)! Na segunda: «If I weren't so afraid... I would have applied back in 2021». A condição é um estado permanente no presente (Second: weren't afraid), mas a consequência ocorreu no passado (Third: would have applied)!",
      "fecho": "Isso é um Mixed Conditional: a fusão orgânica entre o Second e o Third Conditional para refletir como o passado e o presente interagem dinamicamente."
    },
    "alerta": "O erro clássico de alunos intermediários é tentar forçar uma frase a ser 100% Third Conditional (had done + would have done) mesmo quando o marcador temporal diz claramente 'TODAY' ou 'NOW'. Se o resultado é agora, o verbo DEVE ser 'would + verbo base', nunca 'would have'!",
    "definicao": {
      "fenomeno": "If I had accepted that job, I would be wealthy today (passado afetando o presente) · If I spoke Spanish, I would have translated the contract yesterday (estado presente afetando o passado)",
      "causa": "Por que misturamos tempos verbais de condicionais diferentes em uma única frase?",
      "conceito": "Porque a causalidade humana cruza as fronteiras do tempo. Quando uma ação passada tem um resultado direto visível no agora, combinamos Past Perfect na condição com Would + Infinitivo no resultado. Quando um estado permanente ou traço atemporal causa um evento no passado, combinamos Past Simple na condição com Would Have + Particípio no resultado."
    },
    "inventario": [
      "Tipo Misto 1 (Passado → Presente): If + Past Perfect, Sujeito + Would + Base Form (com marcadores como now, today, currently)",
      "Tipo Misto 2 (Presente → Passado): If + Past Simple / Subjuntivo (were), Sujeito + Would Have + Past Participle",
      "O uso com verbos contínuos no resultado: 'would be doing' para ações em andamento neste momento",
      "Identificação dos marcadores temporais de ancoragem ('yesterday' vs 'now', 'last year' vs 'today')",
      "O contraste com o Third Conditional puro (ambos no passado) e o Second Conditional puro (ambos no presente/futuro)"
    ],
    "tabela_visual": "| Tipo de Mista | Oração Condicional (IF) | Oração Principal (Resultado) | Marcadores Típicos | Exemplo Real |\n|---|---|---|---|---|\n| **Tipo 1: Passado → Presente** | **Past Perfect** (*had done*)<br>Tempo: Passado | **Would + Verbo Base**<br>Tempo: Presente | *now, today, currently, at this moment* | *If I **had won** the lottery, I **would be** rich today.* (Não ganhei; não sou rico agora) |\n| **Tipo 1 (Contínuo)** | **Past Perfect** (*had done*) | **Would be + ING** | *right now, this afternoon* | *If I **had caught** that train, I **would be relaxing** on the beach right now.* |\n| **Tipo 2: Presente → Passado** | **Past Simple / Were**<br>Tempo: Presente / Estado | **Would have + V3**<br>Tempo: Passado | *yesterday, last month, in 2020, then* | *If I **were** braver, I **would have confronted** the manager yesterday.* (Não sou corajoso; não confrontei ontem) |\n| **Tipo 2 (Habilidade)** | **Past Simple** (*could / spoke*) | **Would have + V3** | *at the meeting, during the interview* | *If she **spoke** Italian, she **would have understood** the opera last night.* |",
    "observacao_cards": [
      {
        "ingles": "Mixed Type 1: Past → Present",
        "traducao": "Se tivesse feito no passado... seria/estaria agora",
        "genero": "Causalidade Temporal",
        "motivo": "Uma ação não realizada no passado altera seu status atual: 'If I had studied medicine, I would be a doctor now'."
      },
      {
        "ingles": "Mixed Type 2: Present → Past",
        "traducao": "Se eu fosse... teria feito no passado",
        "genero": "Traço Permanente",
        "motivo": "Uma característica sua hoje explica um ato no passado: 'If I weren't so shy, I would have asked her out'."
      },
      {
        "ingles": "Marcadores Chave (Now vs Then)",
        "traducao": "pistas temporais no enunciado",
        "genero": "Técnica de Prova",
        "motivo": "Palavras como 'now', 'today' e 'currently' no resultado são o sinal definitivo de que o verbo é WOULD + base, não would have."
      },
      {
        "ingles": "Subjuntivo 'Were' mantido",
        "traducao": "If I were / If he were",
        "genero": "Norma Culta",
        "motivo": "No Tipo 2, usamos 'were' para todas as pessoas: 'If he were taller, he would have played in yesterday's game'."
      }
    ],
    "tecnica": {
      "titulo": "O Algoritmo dos Marcadores Temporais em 3 Etapas",
      "passos": [
        "1. Sublinhe os marcadores de tempo na oração com IF e na oração principal (ex: 'last year' e 'now').",
        "2. Se o IF fala do passado ('last year') e o resultado fala de agora ('now'), monte: IF HAD + V3 ... WOULD + V1.",
        "3. Se o IF fala de um estado permanente ('I am not a lawyer') e o resultado é no passado ('last trial'), monte: IF WERE / PAST SIMPLE ... WOULD HAVE + V3."
      ]
    },
    "teoria": "### A Teoria Aprofundada dos Mixed Conditionals\n\nEnquanto os livros didáticos de nível básico ensinam as condicionais em gavetas fechadas (Zero, First, Second e Third), a linguagem autêntica exige flexibilidade temporal. Os *Mixed Conditionals* são estruturas onde o tempo da oração condicional e o tempo da oração de resultado pertencem a épocas diferentes.\n\n#### 1. Misto Tipo 1: Condição no Passado com Consequência no Presente\nEste é o tipo mais frequente na conversação cotidiana e no ambiente profissional. Uma decisão ou evento ocorrido no passado tem repercussões que se estendem até o exato momento da fala.\n* **Fórmula:** `If + Past Perfect, Sujeito + would / could / might + verbo base`\n* *Cenário real:* I didn't save any money when I was in my twenties. Therefore, I don't own a house today.\n* *Mixed Conditional:* **If I had saved money in my twenties, I would own a house today.**\n* *Variação contínua:* **If I hadn't lost my passport yesterday, I would be boarding the plane right now.** (ação em andamento no presente).\n\n#### 2. Misto Tipo 2: Condição no Presente/Permanente com Consequência no Passado\nAqui, uma característica intrínseca, habilidade, crença ou estado duradouro do sujeito influenciou o resultado de uma situação já encerrada no passado.\n* **Fórmula:** `If + Past Simple (ou 'were'), Sujeito + would / could / might + have + Particípio Passado`\n* *Cenário real:* I am terrified of heights (estado permanente). I didn't climb the mountain with my friends last weekend (evento passado).\n* *Mixed Conditional:* **If I weren't terrified of heights, I would have climbed the mountain with my friends last weekend.**\n* *Cenário real:* He doesn't know any computer programming. He didn't apply for the developer job last month.\n* *Mixed Conditional:* **If he knew how to code, he would have applied for the developer job last month.**\n\n#### 3. Diferença Crítica: Mista vs Terceira Condicional Pura\nObserve o contraste sutil:\n* *Third Conditional Pura:* If I had slept well last night, I would have felt energetic **this morning**. (A manhã já passou; ambos os eventos estão concluídos).\n* *Mixed Conditional:* If I had slept well last night, I would feel energetic **right now**. (A consequência é sentida no instante presente).",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português do Brasil, nós também misturamos tempos verbais naturalmente quando o passado reflete no presente, mas a nossa estrutura é muito mais tolerante com tempos simples:\n* *\"Se eu **tivesse feito** faculdade de TI, hoje eu **trabalharia** remoto.\"* (Exatamente o Misto Tipo 1: subjuntivo composto + futuro do pretérito simples).\n* *\"Se eu **fosse** bilíngue, **teria conseguido** aquela vaga no ano passado.\"* (Exatamente o Misto Tipo 2: imperfeito do subjuntivo + futuro do pretérito composto).\n\n**Onde o brasileiro tropeça no inglês?**\n* **Inércia do 'have':** Quando o estudante aprende o Third Conditional (*would have done*), ele tende a aplicar *would have* mecanicamente em tudo o que começa com *If I had...*. Ao encontrar a palavra *TODAY* ou *NOW*, o aluno desatento escreve *\"I would have been happy now\"* em vez de *\"I would be happy now\"*. Lembre-se: *would have* projeta para o passado; para o presente, use apenas *would* puro!",
    "exemplos_prc": [
      {
        "pergunta": "Why are you struggling so much with this advanced calculus assignment today?",
        "resposta": "If I had paid closer attention during last semester's lectures, I would understand these formulas now.",
        "contexto": "Um universitário explicando por que está com dificuldades no estudo no momento presente."
      },
      {
        "pergunta": "Did Julian help you translate the legal documents from German yesterday?",
        "resposta": "Unfortunately not. If Julian spoke German, he would have helped us, but he only speaks Italian.",
        "contexto": "Explicando que a falta de um conhecimento atual impediu uma ação no passado."
      },
      {
        "pergunta": "Are you joining us for dinner at the new steakhouse tonight?",
        "resposta": "I wish I could, but if I hadn't spent all my entertainment budget on concert tickets last week, I would definitely join you tonight.",
        "contexto": "Recusando um convite para jantar hoje à noite devido a gastos feitos na semana anterior."
      }
    ],
    "armadilhas": [
      {
        "erro": "If I had accepted that job in London, I would have lived in the UK today.",
        "correcao": "If I had accepted that job in London, I would be living (ou would live) in the UK today.",
        "explicacao": "A presença da palavra 'today' indica um estado presente. Não se usa 'would have lived' para o presente; usa-se 'would live' ou 'would be living'."
      },
      {
        "erro": "If I was having a car, I would have driven to the coast yesterday.",
        "correcao": "If I had a car, I would have driven to the coast yesterday.",
        "explicacao": "'Have' no sentido de posse não aceita forma contínua, e a condição permanente usa o Past Simple simples (had)."
      },
      {
        "erro": "If she wasn't so stubborn, she would apologize to him three days ago.",
        "correcao": "If she weren't so stubborn, she would have apologized to him three days ago.",
        "explicacao": "Como a consequência ocorreu há três dias ('three days ago'), a oração de resultado exige 'would have apologized'."
      }
    ],
    "coda": "Our present is sculpted by yesterday's choices, and Mixed Conditionals provide the exact chisel to express it.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a condicional mista (passado afetando o presente):\n\"If we had bought those airline tickets in January, we ___ hundreds of dollars right now.\"",
        "opcoes": [
          "would be saving",
          "would have saved",
          "will save",
          "saved"
        ],
        "resposta": "would be saving",
        "explicacao": "O marcador temporal 'right now' exige a forma de presente condicional contínua (would be saving), não o passado (would have saved)."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a condicional mista (estado permanente afetando o passado):\n\"If Arthur ___ so afraid of dogs, he would have adopted that puppy last week.\"",
        "opcoes": [
          "weren't",
          "hadn't been",
          "isn't",
          "wouldn't be"
        ],
        "resposta": "weren't",
        "explicacao": "O medo de cães é um traço permanente do Arthur no presente, exigindo o subjuntivo 'weren't' (ou wasn't)."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase representa um Mixed Conditional autêntico?",
        "opcoes": [
          "If I had trained harder, I would have won the medal yesterday.",
          "If I had trained harder, I would be in the national team today.",
          "If I train harder, I will join the national team.",
          "If I trained harder, I would win more competitions."
        ],
        "resposta": "If I had trained harder, I would be in the national team today.",
        "explicacao": "A oração com 'if' está no Past Perfect (had trained) e o resultado está no presente (would be... today), caracterizando a condicional mista."
      },
      {
        "tipo": "escolha",
        "pergunta": "Selecione a opção que completa a frase com a pontuação e gramática corretas:\n\"I wouldn't be sitting in this traffic jam right now ___ that alternative route.\"",
        "opcoes": [
          "if I had taken",
          "if I took",
          "if I would have taken",
          "had I would taken"
        ],
        "resposta": "if I had taken",
        "explicacao": "A condição passada é expressa por 'if I had taken'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no resultado no presente antes de revelar:\n\n\"If she had finished her university degree, she ___ (have) a much higher salary today.\"\n(Se ela tivesse terminado a faculdade, ela teria um salário muito mais alto hoje.)",
        "resposta": "If she had finished her university degree, she would have a much higher salary today.",
        "revelacao": "If she had finished her university degree, she would have a much higher salary today.",
        "dica": "would + verbo base (have), devido ao marcador 'today'",
        "explicacao": "Como a consequência é no presente ('today'), usamos 'would have a much higher salary' (have é o verbo principal)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no traço de caráter permanente antes de revelar:\n\n\"If I ___ (be) better at managing money, I wouldn't have spent all my savings last month.\"\n(Se eu fosse melhor em administrar dinheiro, não teria gasto todas as minhas economias no mês passado.)",
        "resposta": "If I were better at managing money, I wouldn't have spent all my savings last month.",
        "revelacao": "If I were better at managing money, I wouldn't have spent all my savings last month.",
        "dica": "Subjuntivo de be para situações hipotéticas presentes (were)",
        "explicacao": "Usa-se 'were' (ou informalmente 'was') para expressar o estado de personalidade atual que influenciou o evento passado."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na forma contínua do presente antes de revelar:\n\n\"If he hadn't broken his leg skiing last Saturday, he ___ (play) tennis with us right now.\"\n(Se ele não tivesse quebrado a perna esquiando no sábado passado, ele estaria jogando tênis conosco agora mesmo.)",
        "resposta": "If he hadn't broken his leg skiing last Saturday, he would be playing tennis with us right now.",
        "revelacao": "If he hadn't broken his leg skiing last Saturday, he would be playing tennis with us right now.",
        "dica": "would be + verbo com ing (playing)",
        "explicacao": "A ação estaria em andamento no momento presente ('right now'): 'would be playing'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Analise a frase e corrija o erro crasso antes de revelar:\n\n\"If I had studied harder at school, I would have been a doctor today.\"",
        "resposta": "If I had studied harder at school, I would be a doctor today.",
        "revelacao": "If I had studied harder at school, I would be a doctor today.",
        "dica": "O marcador 'today' exige 'would be', não 'would have been'",
        "explicacao": "Ser médico é o estado presente atual, logo a forma correta é 'would be'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma verbal que completa o resultado no presente:\n\n\"If they had listened to our warning yesterday, they would ___ safe now.\" (estar)",
        "resposta": "be",
        "explicacao": "Após 'would' para uma consequência presente usamos a base 'be'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o verbo auxiliar que completa a condição no passado:\n\n\"If we ___ not missed our connection in Frankfurt, we would be in Tokyo right now.\"",
        "resposta": "had",
        "explicacao": "A condição passada exige 'had not missed'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o modal que expressa capacidade no resultado presente:\n\n\"If I had brought my laptop, I ___ work on the report right now.\" (poderia / seria capaz de)",
        "resposta": "could",
        "explicacao": "O modal 'could' expressa capacidade hipotética no presente ('could work')."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma culta do verbo 'be' para a condição presente:\n\n\"If he ___ not so arrogant, he would have apologized yesterday.\"",
        "resposta": "were",
        "explicacao": "A norma culta exige o subjuntivo 'were' (embora 'was' seja comum na fala informal)."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 3: Passive Voice (Advanced)
  // ─────────────────────────────────────────────────────────────
  "b2-lez3": {
    "id": "b2-lez3",
    "num": "Lesson 3",
    "titulo": "Passive Voice (Advanced)",
    "subtitulo": "Continuous, Perfect e Modais na Voz Passiva — O Registro Profissional e Formal",
    "cena": {
      "origem": "dialogo",
      "titulo": "Auditing the Tech Headquarters",
      "texto": "**Auditor:** Has the new cybersecurity software been installed across all workstations yet?\n**IT Manager:** It is currently being deployed by our technical team. Three departments have already been completed, and the central servers are being upgraded as we speak.\n**Auditor:** Excellent. And what about the security breach that occurred last quarter? Has a full report been submitted to the board?\n**IT Manager:** Yes, it had been finalized before the quarterly audit began. Every vulnerability must be patched, and the relevant staff members ought to have been notified by now."
    },
    "fio": {
      "abertura": "No nível B1, você aprendeu a voz passiva básica do Present Simple (*English is spoken here*) e Past Simple (*The bridge was built in 1920*). Mas no ambiente corporativo, acadêmico e jornalístico, a vida raramente se resume a ações estáticas. Você precisa relatar projetos que estão acontecendo neste exato instante, metas que acabaram de ser atingidas e obrigações institucionais com verbos modais.",
      "descoberta": "Examine a sofisticação da resposta do gerente: «It is currently being deployed» (ação em andamento agora = Continuous Passive), «have already been completed» (ação recém-concluída = Perfect Passive) e «must be patched / ought to have been notified» (obrigações com modais). Em todas elas, a fórmula secreta da passiva permanece: o verbo TO BE assume o tempo exato da ação original, seguido invariavelmente pelo Particípio Passado (V3)!",
      "fecho": "Ao dominar a passiva contínua, perfeita e modal, seu inglês ganha a autoridade, a elegância e a precisão dos comunicadores seniores."
    },
    "alerta": "O calcanhar de Aquiles dos estudantes na passiva contínua é esquecer a palavra 'BEING': dizer *'The house is painted'* (fato habitual ou estado) quando pretendiam dizer *'The house is BEING painted'* (a casa está sendo pintada agora mesmo pelos pintores). Sem 'being', a ação perde o dinamismo do andamento!",
    "definicao": {
      "fenomeno": "The road is being repaired (está sendo consertada agora) · The project has been approved (foi aprovado recentemente) · The email should have been sent yesterday (deveria ter sido enviado ontem)",
      "causa": "Por que a voz passiva é a estrutura predominante no inglês corporativo, jurídico e científico?",
      "conceito": "Porque nesses contextos, a ação realizada, o processo e o resultado são infinitamente mais relevantes do que quem apertou o botão ou executou a tarefa física. A passiva confere objetividade, neutralidade e elegância ao discurso."
    },
    "inventario": [
      "Present & Past Continuous Passive: am/is/are + BEING + V3 e was/were + BEING + V3",
      "Present & Past Perfect Passive: have/has + BEEN + V3 e had + BEEN + V3",
      "Modal Passive (Presente): Modal + BE + V3 (must be done, should be checked, can be downloaded)",
      "Modal Passive (Passado): Modal + HAVE BEEN + V3 (should have been told, could have been avoided, must have been stolen)",
      "Voz Passiva com dois objetos (Give, Send, Offer): preferência nativa por iniciar a passiva pela pessoa ('I was offered a job' em vez de 'A job was offered to me')"
    ],
    "tabela_visual": "| Tempo / Estrutura | Voz Ativa | Voz Passiva Avançada | Tradução Dinâmica |\n|---|---|---|---|\n| **Present Continuous** | *They are painting the office.* | *The office **is being painted**.* | O escritório está sendo pintado. |\n| **Past Continuous** | *They were testing the car.* | *The car **was being tested**.* | O carro estava sendo testado. |\n| **Present Perfect** | *We have signed the contract.* | *The contract **has been signed**.* | O contrato foi / tem sido assinado. |\n| **Past Perfect** | *They had fixed the bug.* | *The bug **had been fixed**.* | O erro tinha sido corrigido. |\n| **Modal Presente** | *You must submit the form.* | *The form **must be submitted**.* | O formulário deve ser enviado. |\n| **Modal Perfeito (Passado)** | *You should have warned us.* | *We **should have been warned**.* | Nós deveríamos ter sido avisados. |\n| **Dois Objetos (Pessoa Primeiro)** | *They offered Sarah a promotion.* | *Sarah **was offered** a promotion.* | Ofereceram uma promoção à Sarah (Sarah recebeu a oferta). |",
    "observacao_cards": [
      {
        "ingles": "Is / Are being + V3",
        "traducao": "está / estão sendo feito(s)",
        "genero": "Passiva Contínua",
        "motivo": "Indica ação física ocorrendo neste instante: 'The bridge is being inspected today'."
      },
      {
        "ingles": "Has / Have been + V3",
        "traducao": "foi / foram feito(s) (impacto presente)",
        "genero": "Passiva Perfeita",
        "motivo": "Resultado recém-concluído sem menção a data fechada: 'The results have been published'."
      },
      {
        "ingles": "Should have been + V3",
        "traducao": "deveria ter sido feito",
        "genero": "Modal Passivo de Passado",
        "motivo": "Crítica ou arrependimento sobre algo que não ocorreu: 'The client should have been notified'."
      },
      {
        "ingles": "Pessoa como Sujeito Passivo",
        "traducao": "I was given / She was told",
        "genero": "Estilo Nativo Superior",
        "motivo": "O inglês prefere transformar o recebedor humano em sujeito: 'I was offered a discount' soa muito mais natural que 'A discount was offered to me'."
      }
    ],
    "tecnica": {
      "titulo": "A Matriz de Conversão para Passiva Avançada em 3 Etapas",
      "passos": [
        "1. Identifique o tempo verbal exato da frase ativa (ex: 'are discussing' = Present Continuous).",
        "2. Conjuge o verbo auxiliar 'TO BE' exatamente nesse tempo (para singular/plural do novo sujeito: 'is being').",
        "3. Adicione o verbo de ação no Particípio Passado (V3): 'is being discussed'."
      ]
    },
    "teoria": "### A Teoria Aprofundada da Voz Passiva Avançada\n\nA voz passiva não é apenas um exercício de reescrita gramatical; é uma ferramenta estilística de foco e ênfase (*topicalization*). Em níveis avançados (B2/C1), você não apenas reconhece a passiva simples, mas maneja suas variações temporais complexas e seus matizes pragmáticos.\n\n#### 1. A Passiva Contínua (Continuous Passive)\nUsada quando queremos destacar que um processo ou atividade está em andamento no presente ou estava em andamento em um momento específico do passado.\n* **Present Continuous Passive:** `am / is / are + BEING + past participle`\n  * *Ativa:* Mechanics are repairing my car.\n  * *Passiva:* **My car is being repaired by mechanics.**\n* **Past Continuous Passive:** `was / were + BEING + past participle`\n  * *Ativa:* When I arrived, the detectives were questioning the suspect.\n  * *Passiva:* **When I arrived, the suspect was being questioned by the detectives.**\n* *Nota:* Não existem formas passivas comuns para Future Continuous nem Present/Past Perfect Continuous (dizer *'will be being done'* ou *'has been being done'* é evitado por redundância fonética).\n\n#### 2. A Passiva Perfeita (Perfect Passive)\nUtilizada para relatar eventos concluídos cuja relevância ou evidência persiste no presente (Present Perfect) ou que ocorreram antes de outro evento passado (Past Perfect).\n* **Present Perfect Passive:** `have / has + BEEN + past participle`\n  * *Exemplo:* **All flight reservations have been confirmed.**\n* **Past Perfect Passive:** `had + BEEN + past participle`\n  * *Exemplo:* **The patient had already been transferred before the specialist arrived.**\n\n#### 3. A Passiva com Verbos Modais\nOs modais combinam-se com a passiva para expressar necessidade, probabilidade, permissão e conselho tanto no presente quanto retrospectivamente no passado.\n* **Modal Presente:** `Modal (can, must, should, may, might) + BE + past participle`\n  * *Exemplo:* **Safety helmets must be worn at all times.**\n* **Modal no Passado:** `Modal + HAVE BEEN + past participle`\n  * *Exemplo:* **The meeting could have been postponed.** (A reunião poderia ter sido adiada).\n  * *Exemplo:* **The package ought to have been delivered yesterday.** (A encomenda deveria ter sido entregue ontem).\n\n#### 4. Verbos com Dois Objetos (Ditransitive Verbs)\nVerbos como *give, send, show, lend, pay, offer, tell, promise* possuem dois objetos: o direto (a coisa) e o indireto (a pessoa).\nEm português, a passiva quase sempre começa pela coisa (*\"Um prêmio foi dado a ele\"*). Em inglês, a preferência nativa absoluta é colocar a **pessoa** como sujeito da oração passiva:\n* *Ativa:* They gave Thomas a bonus.\n* *Passiva Natural:* **Thomas was given a bonus.** (Muito mais comum e idiomático que *A bonus was given to Thomas*).\n* *Exemplo:* **I was told that the flight was canceled.** (= Me disseram que o voo foi cancelado).",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português, a voz passiva analítica com o verbo ser (*\"foi feito\"*, *\"está sendo consertado\"*) concorre fortemente com a passiva sintética pronominal (*\"vende-se\"*, *\"consertam-se\"*, *\"discutiu-se\"*).\n\n**Onde o brasileiro tropeça no inglês?**\n* **A falta da passiva sintética:** Em português dizemos *\"Comentou-se que...\"* ou *\"Cancelou-se o evento\"*. Como o pronome apassivador 'se' não existe em inglês, muitos brasileiros tentam traduzir literalmente dizendo frases incorretas como *\"Commented itself that...\"*. A tradução correta exige a passiva analítica: *\"It was commented that...\"* ou *\"The event was canceled\"*.\n* **O choque da 'Pessoa como Sujeito':** Frases como *\"I was told\"* (me disseram), *\"I was given a book\"* (me deram um livro) ou *\"She was offered a job\"* (ofereceram um emprego a ela) soam estranhas ao cérebro brasileiro no início, porque parecem dizer *\"eu fui dito\"* ou *\"eu fui dado\"*. No entanto, em inglês, essa é a construção mais fluida e prestigiosa que existe!",
    "exemplos_prc": [
      {
        "pergunta": "Why can't we use the conference room on the third floor today?",
        "resposta": "It is currently being redecorated for tomorrow's international summit.",
        "contexto": "Informando a indisponibilidade de um espaço corporativo devido a reformas em andamento."
      },
      {
        "pergunta": "Has any decision been made regarding our budget expansion proposal?",
        "resposta": "Yes, our proposal has just been approved by the board of trustees.",
        "contexto": "Celebrando a aprovação recente de uma proposta orçamentária importante."
      },
      {
        "pergunta": "Why wasn't I informed about the emergency evacuation drill yesterday?",
        "resposta": "An email should have been sent to everyone on your floor; we sincerely apologize for the oversight.",
        "contexto": "Respondendo a uma reclamação sobre falha de comunicação interna na empresa."
      }
    ],
    "armadilhas": [
      {
        "erro": "My car is repairing at the garage right now.",
        "correcao": "My car is being repaired at the garage right now.",
        "explicacao": "Sem 'being repaired', a frase diz que o carro está consertando a si mesmo ativamente. A voz passiva contínua exige 'is being repaired'."
      },
      {
        "erro": "I was said to wait outside the office.",
        "correcao": "I was told to wait outside the office.",
        "explicacao": "O verbo 'say' não aceita a pessoa como sujeito na passiva pessoal. Deve-se usar 'tell': 'I was told to wait' (me mandaram/disseram para esperar)."
      },
      {
        "erro": "The documents must to be signed before Friday.",
        "correcao": "The documents must be signed before Friday.",
        "explicacao": "Modais como 'must', 'can' e 'should' são seguidos diretamente pela base 'be', sem a partícula 'to'."
      }
    ],
    "coda": "Mastering the advanced passive voice is not about hiding who did it; it is about putting the spotlight on what truly matters.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a oração passiva no Present Continuous:\n\"Please excuse the mess; the main lobby ___ right now.\"",
        "opcoes": [
          "is being renovated",
          "is renovated",
          "has been renovated",
          "was being renovated"
        ],
        "resposta": "is being renovated",
        "explicacao": "Para uma ação em andamento no momento da fala ('right now'), usamos o Present Continuous Passive: 'is being renovated'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual alternativa expressa uma obrigação não cumprida no passado na voz passiva?",
        "opcoes": [
          "The passengers should be informed immediately.",
          "The passengers should have been informed earlier.",
          "The passengers were informing earlier.",
          "The passengers had been inform earlier."
        ],
        "resposta": "The passengers should have been informed earlier.",
        "explicacao": "'Should have been informed' é o modal passivo perfeito que expressa que algo deveria ter acontecido no passado, mas não aconteceu."
      },
      {
        "tipo": "escolha",
        "pergunta": "Transforme a frase ativa na passiva mais idiomática e natural em inglês:\n\"They offered Dr. Watson a prestigious research grant.\"",
        "opcoes": [
          "Dr. Watson was offered a prestigious research grant.",
          "A prestigious research grant offered Dr. Watson.",
          "Dr. Watson had offered to a prestigious research grant.",
          "To Dr. Watson was offered a prestigious research grant."
        ],
        "resposta": "Dr. Watson was offered a prestigious research grant.",
        "explicacao": "Em inglês, quando há um objeto indireto (pessoa), a preferência nativa absoluta é torná-lo o sujeito da passiva: 'Dr. Watson was offered...'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o Past Perfect Passive:\n\"By the time the police arrived, the stolen jewelry ___ from the vault.\"",
        "opcoes": [
          "had already been removed",
          "has already been removed",
          "was already removing",
          "had already removed"
        ],
        "resposta": "had already been removed",
        "explicacao": "A ação passiva ocorreu antes de outro evento passado ('by the time the police arrived'), exigindo o Past Perfect Passive: 'had been removed'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na passiva contínua antes de revelar:\n\n\"Don't enter that laboratory! A delicate experiment ___ (conduct) in there right now.\"\n(Não entre naquele laboratório! Um experimento delicado está sendo conduzido lá dentro agora.)",
        "resposta": "Don't enter that laboratory! A delicate experiment is being conducted in there right now.",
        "revelacao": "Don't enter that laboratory! A delicate experiment is being conducted in there right now.",
        "dica": "is being + particípio de conduct",
        "explicacao": "A estrutura de ação contínua no presente para singular é 'is being conducted'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no Present Perfect Passive antes de revelar:\n\n\"The official announcement ___ (already / make) by the CEO.\"\n(O comunicado oficial já foi feito pelo CEO.)",
        "resposta": "The official announcement has already been made by the CEO.",
        "revelacao": "The official announcement has already been made by the CEO.",
        "dica": "has already been + particípio de make (made)",
        "explicacao": "Usa-se o Present Perfect Passive: 'has already been made'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na expressão idiomática 'me disseram' em inglês antes de revelar:\n\nTraduza com elegância e naturalidade:\n\"Me disseram para não tocar em nada nesta sala.\"",
        "resposta": "I was told not to touch anything in this room.",
        "revelacao": "I was told not to touch anything in this room.",
        "dica": "I was told not to...",
        "explicacao": "A estrutura nativa idiomática para 'me disseram' é 'I was told'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no modal passivo com 'can' antes de revelar:\n\n\"All relevant files ___ (can / download) from our cloud server free of charge.\"\n(Todos os arquivos relevantes podem ser baixados do nosso servidor em nuvem gratuitamente.)",
        "resposta": "All relevant files can be downloaded from our cloud server free of charge.",
        "revelacao": "All relevant files can be downloaded from our cloud server free of charge.",
        "dica": "can be + particípio de download",
        "explicacao": "Modal presente na passiva: 'can be downloaded'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que marca a forma contínua da passiva:\n\n\"The road was ___ resurfaced when the storm began yesterday.\"",
        "resposta": "being",
        "explicacao": "A palavra que indica que a ação estava em andamento na passiva é 'being' (was being resurfaced)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o particípio do auxiliar 'be' necessário na passiva perfeita:\n\n\"Three new satellites have ___ launched into orbit this morning.\"",
        "resposta": "been",
        "explicacao": "A passiva com 'have' exige o particípio 'been' (have been launched)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o particípio passado do verbo 'write' para completar a frase:\n\n\"The report had already been ___ before the auditor requested it.\"",
        "resposta": "written",
        "explicacao": "O particípio passado de 'write' é 'written'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma base do verbo 'be' que segue o modal:\n\n\"This sensitive information must not ___ shared with third parties.\"",
        "resposta": "be",
        "explicacao": "Após o modal 'must' (ou 'must not'), usa-se a forma base 'be'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 4: Reported Speech (Advanced)
  // ─────────────────────────────────────────────────────────────
  "b2-lez4": {
    "id": "b2-lez4",
    "num": "Lesson 4",
    "titulo": "Reported Speech (Advanced)",
    "subtitulo": "Perguntas Indiretas, Ordens, Pedidos e Verbos de Reporte Especializados",
    "cena": {
      "origem": "dialogo",
      "titulo": "Debriefing the Job Interview",
      "texto": "**Chloe:** How did your interview with the tech consultancy go, David?\n**David:** It was quite intense! The lead partner asked me where I saw myself in five years, and she wanted to know whether I had ever managed a remote team.\n**Chloe:** Those are tough questions! Did they mention anything about the salary or start date?\n**David:** Well, the HR director warned me not to accept other offers until Friday. In fact, he advised me to review the company handbook and promised to email the formal contract tomorrow morning!"
    },
    "fio": {
      "abertura": "No nível B1, você aprendeu as regras mecânicas de *backshift* do Reported Speech (*\"I am tired\" → He said he was tired*). Porém, no mundo real e corporativo, as pessoas não se limitam a dizer frases afirmativas com o verbo *say*. Elas fazem perguntas, dão ordens, pedem favores, sugerem ideias, advertem contra riscos e acusam adversários.",
      "descoberta": "Observe a precisão de David ao relatar a entrevista: quando a parceira fez uma pergunta com palavra interrogativa, David desfez a inversão da pergunta («asked me where I saw myself», e não *where did I see*). Ao relatar uma pergunta de sim/não, usou «whether I had ever managed». E para ordens e conselhos, dispensou o verbo *say* e usou verbos de reporte ricos com infinitivo: «warned me not to accept» e «advised me to review»!",
      "fecho": "Ao dominar perguntas relatadas e verbos de reporte com infinitivo ou gerúndio, seu discurso ganha concisão, fluidez e elegância jornalística."
    },
    "alerta": "O erro número um em exames B2/C1 ao relatar perguntas é manter a inversão ou os auxiliares interrogativos: dizer *'He asked me where did I live'* ou *'She asked me what was my name'*. Quando a pergunta se torna indireta, a frase vira uma AFIRMAÇÃO: *'He asked me where I lived'* e *'She asked me what my name was'*!",
    "definicao": {
      "fenomeno": "He asked where I lived (ordem afirmativa, sem 'did') · She asked if I was ready (uso de if/whether) · He advised me to study (reporting verb + objeto + to-infinitivo)",
      "causa": "Por que a ordem das palavras muda e por que substituímos 'say that' por verbos especializados?",
      "conceito": "Porque perguntas relatadas já não funcionam como interrogações diretas que demandam resposta imediata, tornando-se orações subordinadas substantivas com ordem direta (sujeito + verbo). Além disso, verbos como 'warn', 'advise', 'threaten' e 'suggest' sintetizam a intenção do falante em menos palavras com maior expressividade."
    },
    "inventario": [
      "Reported Questions com Question Words (Who, What, Where, When, Why, How): oração direta (Sujeito + Verbo, sem do/does/did)",
      "Reported Questions Sim/Não: uso obrigatório de 'if' ou 'whether' (*She asked whether I had a passport*)",
      "Reported Commands / Requests: Sujeito + told / asked / ordered + Objeto + (NOT) to-infinitivo",
      "Verbos de reporte com Infinitivo (Verb + to-do): agree, offer, promise, refuse, threaten",
      "Verbos de reporte com Objeto + Infinitivo (Verb + object + to-do): advise, ask, encourage, remind, tell, warn",
      "Verbos de reporte com Gerúndio (Verb + -ing): admit, deny, recommend, suggest (ou suggest that + subjuntivo)"
    ],
    "tabela_visual": "| Tipo de Discurso Direto | Discurso Indireto Avançado (Reported) | Regra Estrutural |\n|---|---|---|\n| **Pergunta com Wh-**<br>*\"Where do you live?\"* | *He asked me **where I lived**.* | **Sem inversão e sem 'do'**: Sujeito + Verbo. |\n| **Pergunta de Sim/Não**<br>*\"Are you coming?\"* | *She asked **if / whether I was coming**.* | Insere-se **if** ou **whether** + ordem afirmativa. |\n| **Ordem / Comando**<br>*\"Be quiet!\"* | *The teacher told us **to be quiet**.* | Verbo de comando + objeto + **to + verbo base**. |\n| **Ordem Negativa**<br>*\"Don't touch that!\"* | *She warned me **not to touch** that.* | **not to + verbo base**. |\n| **Promessa / Oferta**<br>*\"I will help you.\"* | *He offered **to help** me.* | Dispensa 'that he would': usa **to-infinitivo**. |\n| **Sugestão com Gerúndio**<br>*\"Let's take a taxi.\"* | *She suggested **taking** a taxi.* | 'Suggest' exige **gerúndio (-ing)** ou 'that we take'. |",
    "observacao_cards": [
      {
        "ingles": "Where I lived (Ordem Afirmativa)",
        "traducao": "onde eu morava (sem inversão)",
        "genero": "Regra Suprema de Perguntas",
        "motivo": "Perguntas relatadas não usam 'did/do' e não invertem sujeito e verbo: 'He asked what time it was' (nunca what time was it)."
      },
      {
        "ingles": "Whether vs If",
        "traducao": "se (em perguntas indiretas)",
        "genero": "Elegância Formal",
        "motivo": "'Whether' é mais formal que 'if' e obrigatório antes de 'or not' ou após preposições: 'He asked whether or not I agreed'."
      },
      {
        "ingles": "Warn / Advise + Object + To...",
        "traducao": "advertiu / aconselhou a fazer",
        "genero": "Reporting Verbs com Infinitivo",
        "motivo": "Em vez de dizer 'He said to me that I should study', diga com elegância: 'He advised me to study'."
      },
      {
        "ingles": "Suggest + -ING (Nunca 'suggest to')",
        "traducao": "sugeriu fazer",
        "genero": "Armadilha Clássica",
        "motivo": "Nunca diga 'he suggested me to go'. Diga: 'he suggested going' ou 'he suggested that I go'."
      }
    ],
    "tecnica": {
      "titulo": "A Engenharia do Relato de Perguntas em 3 Etapas",
      "passos": [
        "1. Identifique se a pergunta original tem Wh-word (Where, What) ou se é de Sim/Não.",
        "2. Se for Sim/Não, adicione 'if' ou 'whether'. Se tiver Wh-word, mantenha-a.",
        "3. ELIMINE os auxiliares 'do/does/did', volte o verbo um tempo para o passado (*backshift*) e coloque na ordem direta: SUJEITO + VERBO."
      ]
    },
    "teoria": "### A Teoria Aprofundada do Reported Speech Avançado\n\nNo nível B2, o foco do Reported Speech deixa de ser a memorização mecânica de tempos verbais e passa a ser a precisão pragmática: como transmitir a mensagem original com clareza, fidelidade e sofisticação de vocabulário.\n\n#### 1. Reported Questions (Perguntas Indiretas)\nAo transformar uma pergunta direta em discurso indireto, você não está mais fazendo uma pergunta. Trata-se de uma afirmação sobre uma dúvida. Portanto:\n* O ponto de interrogação desaparece.\n* A ordem das palavras passa a ser a ordem afirmativa padrão: **Sujeito antes do Verbo**.\n* Os auxiliares *do, does, did* são descartados.\n\nExemplos comparativos detalhados:\n* *Direto:* \"What time **does the train leave**?\"\n* *Indireto:* She asked what time **the train left**. *(Não: what time did the train leave)*\n* *Direto:* \"Why **were you** crying?\"\n* *Indireto:* He asked why **I had been** crying.\n* *Direto:* \"Do you have a driving license?\"\n* *Indireto:* The officer inquired **if / whether I had** a driving license.\n\n#### 2. Reported Commands, Requests e Advice\nPara ordens, pedidos, instruções e advertências, a língua inglesa prefere estruturas com o infinitivo (`to + base form` ou `not to + base form`) em vez de orações subordinadas com 'that':\n* *Direto:* \"Please sit down.\" → She asked us **to sit down**.\n* *Direto:* \"Don't open the window!\" → He told me **not to open** the window.\n* *Direto:* \"You should see a doctor.\" → She advised him **to see** a doctor.\n\n#### 3. O Arsenal de Verbos de Reporte (Reporting Verbs)\nSubstituir o monótono *he said / she said* por verbos específicos eleva instantaneamente o nível do seu inglês acadêmico e profissional:\n\n* **Padrão 1: Verbo + to + infinitivo**\n  * *agree:* He agreed to review the proposal.\n  * *offer:* She offered to carry my luggage.\n  * *promise:* They promised to arrive on time.\n  * *refuse:* The witness refused to answer.\n  * *threaten:* The hijacker threatened to shoot.\n\n* **Padrão 2: Verbo + Objeto + to + infinitivo**\n  * *advise:* She advised me to consult a lawyer.\n  * *encourage:* My mentor encouraged me to apply.\n  * *remind:* Please remind John to send the invoice.\n  * *warn:* The guide warned us **not to drink** the water.\n\n* **Padrão 3: Verbo + Gerúndio (-ing)**\n  * *admit:* The suspect admitted **stealing** the necklace.\n  * *deny:* The politician denied **taking** bribes.\n  * *recommend:* The critic recommended **visiting** the exhibition.\n  * *suggest:* Clara suggested **postponing** the conference.\n\n* **Padrão 4: Verbo + Preposição + -ing**\n  * *apologize for:* He apologized for being late.\n  * *insist on:* They insisted on paying for dinner.\n  * *accuse of (com objeto):* The manager accused him of falsifying receipts.",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português, a transição para o discurso indireto em perguntas e ordens apresenta hábitos que geram erros frequentes no inglês:\n* Em português dizemos: *\"Ela me perguntou onde **era** o banheiro\"* (verbo antes do sujeito). Ao falar inglês, o brasileiro tende a traduzir literalmente: *\"She asked me where **was** the bathroom\"*. Em inglês culto, o verbo DEVE ir para o final: *\"She asked me where the bathroom **was**\"*.\n* Em português usamos 'que' para ordens: *\"O médico me mandou **que eu descansasse**\"*. Em inglês, usar 'that' aqui soa truncado e artificial (*He told me that I rest*). A língua inglesa exige infinitivo direto com objeto: *\"The doctor told me **to rest**\"*.\n* **O vício do 'suggest to me':** Em português dizemos *\"Ele me sugeriu ir...\"*. Em inglês, 'suggest' NUNCA aceita um pronome objeto seguido de infinitivo (*He suggested me to go* é um dos erros mais penalizados do nível B2). O correto é: *He suggested that I go* ou *He suggested going*.",
    "exemplos_prc": [
      {
        "pergunta": "What did the police officer ask you when you were pulled over on the highway?",
        "resposta": "She asked me where I was driving in such a hurry, and she inquired whether I had my vehicle registration documents.",
        "contexto": "Relatando as perguntas feitas por uma policial durante uma blitz rodoviária."
      },
      {
        "pergunta": "Did your manager approve your request to work from home on Fridays?",
        "resposta": "Not immediately. First, he reminded me to complete all pending deliverables, and then he agreed to let me try it for a month.",
        "contexto": "Descrevendo o processo de negociação de home office com a chefia."
      },
      {
        "pergunta": "What did the financial advisor recommend during your consultation?",
        "resposta": "She strongly advised against investing in speculative cryptocurrencies and recommended diversifying my portfolio instead.",
        "contexto": "Compartilhando as orientações recebidas em uma consulta de planejamento financeiro."
      }
    ],
    "armadilhas": [
      {
        "erro": "She asked me where did I buy that leather jacket.",
        "correcao": "She asked me where I had bought (ou where I bought) that leather jacket.",
        "explicacao": "Em perguntas indiretas relatadas, o auxiliar 'did' deve ser eliminado e a frase assume a ordem direta (sujeito + verbo)."
      },
      {
        "erro": "The doctor suggested me to stop eating processed sugar.",
        "correcao": "The doctor suggested that I stop eating processed sugar (ou suggested stopping).",
        "explicacao": "'Suggest' nunca aceita a construção 'suggest + objeto + to-infinitivo'. Use 'suggest that + sujeito' ou o gerúndio."
      },
      {
        "erro": "He warned me to not touch the high-voltage cable.",
        "correcao": "He warned me not to touch the high-voltage cable.",
        "explicacao": "A negação do infinitivo em inglês coloca o 'not' SEMPRE antes da partícula 'to': 'not to touch' (e não 'to not touch')."
      }
    ],
    "coda": "In reported speech, you do not parrot words; you decode intentions and re-orchestrate syntax with elegance.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Qual é a transformação correta da pergunta direta: \"Where is the meeting room?\"\n\"The guest asked the receptionist ___.\"",
        "opcoes": [
          "where the meeting room was",
          "where was the meeting room",
          "where is the meeting room",
          "where did the meeting room be"
        ],
        "resposta": "where the meeting room was",
        "explicacao": "Perguntas relatadas exigem ordem direta (sujeito 'the meeting room' antes do verbo 'was') e eliminação de tom interrogativo."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o verbo de reporte e a estrutura correta:\n\"The CEO ___ the employees that the company would remain fully remote.\"",
        "opcoes": [
          "assured",
          "said",
          "explained to",
          "suggested"
        ],
        "resposta": "assured",
        "explicacao": "'Assure' é um verbo transitivo que exige objeto de pessoa imediato ('assured the employees that...')."
      },
      {
        "tipo": "escolha",
        "pergunta": "Assinale a frase gramaticalmente CORRETA com o verbo 'suggest':",
        "opcoes": [
          "She suggested me to take a taxi to the airport.",
          "She suggested taking a taxi to the airport.",
          "She suggested to take a taxi to the airport.",
          "She suggested me that I should take a taxi."
        ],
        "resposta": "She suggested taking a taxi to the airport.",
        "explicacao": "'Suggest' rege gerúndio ('suggested taking') quando não há menção explícita de sujeito em uma oração com 'that'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual alternativa relata corretamente a ordem negativa: \"Don't tell anyone about the merger!\"\n\"The director ordered us ___.\"",
        "opcoes": [
          "not to tell anyone about the merger",
          "to not tell anyone about the merger",
          "that we don't tell anyone about the merger",
          "to not telling anyone about the merger"
        ],
        "resposta": "not to tell anyone about the merger",
        "explicacao": "A negação do infinitivo em inglês padrão coloca o 'not' antes de 'to': 'not to tell'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no relato de pergunta de Sim/Não antes de revelar:\n\nDiscurso direto: \"Have you ever visited Canada?\"\nDiscurso indireto: \"He asked me ___.\"",
        "resposta": "He asked me if (ou whether) I had ever visited Canada.",
        "revelacao": "He asked me if (ou whether) I had ever visited Canada.",
        "dica": "Use if/whether + sujeito + had ever visited",
        "explicacao": "Perguntas de Sim/Não exigem 'if' ou 'whether' seguido de ordem afirmativa com backshift temporal: 'whether I had ever visited Canada'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na estrutura com o verbo 'warn' antes de revelar:\n\nDiscurso direto: \"Don't open that attachment! It might contain malware.\"\nDiscurso indireto: \"The IT specialist warned us ___ that attachment.\"",
        "resposta": "The IT specialist warned us not to open that attachment.",
        "revelacao": "The IT specialist warned us not to open that attachment.",
        "dica": "not to + open",
        "explicacao": "Verbos como 'warn' com ordens negativas usam 'not to + verbo base'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na pergunta com 'What time' e verbo to be antes de revelar:\n\nDiscurso direto: \"What time is the concert?\"\nDiscurso indireto: \"She asked me ___.\"",
        "resposta": "She asked me what time the concert was.",
        "revelacao": "She asked me what time the concert was.",
        "dica": "what time + o sujeito (the concert) + o verbo (was)",
        "explicacao": "A ordem das palavras em perguntas indiretas coloca o sujeito antes do verbo: 'what time the concert was'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no verbo 'apologize for' com preposição antes de revelar:\n\nDiscurso direto: \"I'm really sorry that I interrupted your presentation.\"\nDiscurso indireto: \"He apologized for ___ her presentation.\"",
        "resposta": "He apologized for interrupting her presentation.",
        "revelacao": "He apologized for interrupting her presentation.",
        "dica": "preposição 'for' exige verbo com -ing (interrupting)",
        "explicacao": "Após a preposição 'for', usa-se o gerúndio: 'apologized for interrupting'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a conjunção formal (iniciada com 'wh') que substitui 'if' em perguntas indiretas:\n\n\"The officer asked ___ I had any items to declare.\"",
        "resposta": "whether",
        "explicacao": "A conjunção formal é 'whether'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que falta para negar o infinitivo:\n\n\"The flight attendant told the passengers ___ to unfasten their seatbelts.\"",
        "resposta": "not",
        "explicacao": "A estrutura de infinitivo negativo é 'not to unfasten'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o verbo no passado que completa a pergunta indireta (ordem direta):\n\n\"He wanted to know where I ___ born.\" (nasci / verbo to be no passado para I)",
        "resposta": "was",
        "explicacao": "A ordem afirmativa é 'where I was born'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição que rege o verbo 'accuse' nesta estrutura de reporte:\n\n\"The board accused the CFO ___ misusing company funds.\" (de)",
        "resposta": "of",
        "explicacao": "A regência de accuse é 'accuse someone of doing something'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 5: Relative Clauses (Non-defining)
  // ─────────────────────────────────────────────────────────────
  "b2-lez5": {
    "id": "b2-lez5",
    "num": "Lesson 5",
    "titulo": "Relative Clauses (Non-defining)",
    "subtitulo": "Informações Extras Entre Vírgulas — A Proibição do 'That' e a Precisão Descritiva",
    "cena": {
      "origem": "dialogo",
      "titulo": "The London Architecture Tour",
      "texto": "**Guide:** On our left is St Paul's Cathedral, which was designed by Sir Christopher Wren after the Great Fire of 1666.\n**Tourist:** It's absolutely breathtaking! And who is that statue of in the courtyard?\n**Guide:** That depicts Queen Anne, whose reign witnessed the completion of the cathedral in 1710.\n**Tourist:** Fascinating! And is that the Millennium Bridge ahead of us?\n**Guide:** Yes, the Millennium Bridge, which connects the cathedral area to Tate Modern, is one of the most famous pedestrian bridges in Europe."
    },
    "fio": {
      "abertura": "No nível B1, você explorou as Defining Relative Clauses (*The man who stole my bag was arrested*). Naquelas frases, a oração relativa era vital: sem ela, não saberíamos de qual homem estávamos falando. Agora, no nível B2, dominaremos as **Non-defining Relative Clauses**, que servem para acrescentar informações extras, históricas, biográficas e parentéticas de enorme sofisticação.",
      "descoberta": "Repare nas falas do guia turístico: «St Paul's Cathedral, which was designed by Sir Christopher Wren...» e «Queen Anne, whose reign witnessed...». St Paul's Cathedral já é única no mundo. Se você remover a oração entre vírgulas, a frase continua perfeitamente compreensível! Além disso, note os dois traços sagrados: o uso obrigatório de vírgulas e o emprego exclusivo de «which» (o pronome coringa *that* é estritamente proibido aqui).",
      "fecho": "Ao dominar as orações relativas não-restritivas, seus textos e apresentações ganham o tom enciclopédico, fluido e articulado dos autores nativos mais respeitados."
    },
    "alerta": "As duas regras invioláveis das Non-defining Relative Clauses que derrubam notas em exames internacionais:\n1. NUNCA use 'that' entre vírgulas! Para coisas, use sempre 'which'; para pessoas, use sempre 'who'.\n2. NUNCA omita o pronome relativo entre vírgulas, mesmo que ele funcione como objeto da oração!",
    "definicao": {
      "fenomeno": "My mother, who is 65, loves gardening (oração extra entre vírgulas) · The Eiffel Tower, which was built in 1889, attracts millions of visitors (oração descritiva dispensável)",
      "causa": "Por que chamamos essa estrutura de 'não-restritiva' ou 'não-definidora'?",
      "conceito": "Porque o substantivo principal já está 100% identificado e individualizado na mente do ouvinte. A oração relativa não serve para restringir ou especificar 'qual deles', mas sim para oferecer uma informação suplementar elegante e dispensável sem alterar o sentido nuclear da mensagem."
    },
    "inventario": [
      "Pontuação mandatória: a oração deve estar isolada por duas vírgulas (ou vírgula e ponto final)",
      "Pronomes permitidos: WHO (pessoas), WHICH (coisas/animais), WHOSE (posse), WHERE (lugares), WHEN (tempo)",
      "A Proibição Absoluta do 'THAT' entre vírgulas (erro gravíssimo em Cambridge e IELTS)",
      "Proibição de Omissão do Pronome: 'who' e 'which' jamais podem ser deletados em non-defining clauses",
      "O uso do 'Which' oracional para comentar a frase inteira anterior: 'He passed the exam, which surprised everyone'"
    ],
    "tabela_visual": "| Critério | Defining Relative Clauses (B1) | Non-defining Relative Clauses (B2) |\n|---|---|---|\n| **Função** | Identifica / restringe qual pessoa ou coisa | Acrescenta informação extra dispensável |\n| **Pontuação** | **SEM VÍRGULAS** | **OBRIGATORIAMENTE ENTRE VÍRGULAS** |\n| **Uso de 'THAT'** | Totalmente permitido e muito comum | **ESTRITAMENTE PROIBIDO** (use *which* / *who*) |\n| **Omissão do Pronome** | Pode ser omitido quando é objeto | **NUNCA PODE SER OMITIDO** |\n| **Exemplo com Pessoa** | *The woman **who/that** called you is outside.* | *My mother, **who** lives in London, is visiting us.* |\n| **Exemplo com Coisa** | *The laptop **that** I bought broke down.* | *My MacBook, **which** cost £2,000, broke down.* |\n| **Which 'Comentador'** | Não se aplica | *He offered to pay for lunch, **which** was very kind.* |",
    "observacao_cards": [
      {
        "ingles": ", which... , (Nunca THAT)",
        "traducao": ", o qual / a qual... ,",
        "genero": "Regra Suprema de Estilo",
        "motivo": "Entre vírgulas, 'that' é banido da norma culta em inglês: 'The book, which I read yesterday, was thrilling'."
      },
      {
        "ingles": "Obrigação das Vírgulas",
        "traducao": "vírgula antes e depois da oração",
        "genero": "Pontuação Crítica",
        "motivo": "A ausência de vírgulas altera o significado filosófico da frase (ex: 'My brother who lives in NY' implica que tenho mais de um irmão; 'My brother, who lives in NY,' implica que só tenho um)."
      },
      {
        "ingles": "Whose (Posse Entre Vírgulas)",
        "traducao": "cujo / cuja / cujos / cujas",
        "genero": "Pronome Possessivo Relativo",
        "motivo": "Conecta posse a pessoas ou instituições: 'Professor Evans, whose research was published in Nature, will deliver the keynote'."
      },
      {
        "ingles": "Sentence Relative 'Which'",
        "traducao": "o que / fato que",
        "genero": "Comentário Global",
        "motivo": "'Which' pode se referir a uma oração inteira precedente: 'It rained all weekend, which ruined our camping trip'."
      }
    ],
    "tecnica": {
      "titulo": "O Teste da Extração em 3 Passos",
      "passos": [
        "1. Isole mentalmente a oração relativa entre as duas vírgulas.",
        "2. Remova essa oração da frase e leia apenas o sujeito e a oração principal.",
        "3. Se a frase resultante continuar fazendo sentido pleno e o substantivo continuar unicamente identificado, você tem uma Non-defining Clause: verifique se colocou as vírgulas e garantiu que usou 'which/who' (e NÃO 'that')."
      ]
    },
    "teoria": "### A Teoria Aprofundada das Non-defining Relative Clauses\n\nAs orações relativas não-restritivas (ou explicativas) desempenham um papel crucial no inglês formal, na redação jornalística e na literatura, permitindo condensar duas ou mais orações completas em um único período coeso e bem articulado.\n\n#### 1. A Diferença Semântica Fundamental\nCompare com atenção o impacto da pontuação no significado:\n* **Defining (sem vírgulas):** *The musicians who arrived early got the front seats.* (Apenas os músicos que chegaram cedo ganharam os lugares da frente; os outros não ganharam).\n* **Non-defining (com vírgulas):** *The musicians, who arrived early, got the front seats.* (TODOS os músicos chegaram cedo, e todos ganharam os lugares da frente. A chegada antecipada é apenas uma informação suplementar).\n\nOutro exemplo clássico de impacto familiar:\n* *\"My sister who lives in Toronto is a doctor.\"* (Implica que o falante tem várias irmãs, e está especificando a que mora em Toronto).\n* *\"My sister, who lives in Toronto, is a doctor.\"* (O falante tem apenas UMA irmã; o fato de ela morar em Toronto é apenas um dado a mais).\n\n#### 2. Os Pronomes Relativos Autorizados\n* **Who:** Utilizado exclusivamente para seres humanos. *(Nelson Mandela, who dedicated his life to freedom, inspired generations.)*\n* **Which:** Utilizado para objetos, animais, conceitos e instituições. *(The Amazon rainforest, which spans nine South American countries, produces vital oxygen.)*\n* **Whose:** Indica relação de posse tanto para pessoas quanto para entidades coletivas. *(The company, whose shares surged by 15%, reported record profits.)*\n* **Where:** Utilizado para lugares específicos já individualizados. *(Oxford, where my father studied philosophy, is renowned for its academic heritage.)*\n* **When:** Utilizado para momentos ou datas demarcadas. *(In 1969, when Apollo 11 landed on the moon, the world watched in awe.)*\n\n#### 3. O Uso Especial do 'Sentential Which' (Which Comentador)\nEm níveis intermediários-altos, uma das aplicações mais elegantes do pronome *which* é atuar como conectivo que qualifica ou avalia **toda a ação da oração anterior**, e não apenas um substantivo isolado:\n* *He offered to work through the weekend to finish the project, **which was deeply appreciated by the entire management team**.* (Aqui, 'which' não se refere a 'project' ou 'weekend', mas sim ao ato generoso de ter oferecido trabalhar no fim de semana).\n* *The train was delayed for four hours, **which caused immense frustration among travelers**.*",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português, as orações explicativas também são grafadas entre vírgulas (*\"O Cristo Redentor, que fica no Rio de Janeiro, é uma das maravilhas do mundo\"*).\n\n**Onde o brasileiro tropeça gravemente no inglês?**\n* **A armadilha do 'QUE' universal:** Em português, a palavra **'que'** serve para tudo: defining, non-defining, coisas, pessoas (*\"meu pai, que mora lá\"*, *\"o carro, que é novo\"*). Por causa disso, o estudante brasileiro tende a usar **'that'** como equivalente universal do 'que' e escreve: *\"London, that is a big city, is expensive\"*. Isso é um erro fatal em provas como TOEFL, IELTS e exames de Cambridge (B2 First e C1 Advanced). Em inglês culto, **'that' é estritamente proibido entre vírgulas**. Você DEVE usar **which** para coisas e **who** para pessoas.\n* **Esquecer as vírgulas ao digitar:** No português informal da internet, muitos omitiram o hábito de pontuar orações explicativas. No inglês, a falta das vírgulas altera estruturalmente a classificação da frase de restritiva para explicativa, mudando o significado semântico do enunciado.",
    "exemplos_prc": [
      {
        "pergunta": "Why is the Golden Gate Bridge painted in International Orange instead of gray?",
        "resposta": "The Golden Gate Bridge, which was completed in 1937, was painted in International Orange to enhance its visibility through San Francisco's notorious thick fog.",
        "contexto": "Um guia explicando uma curiosidade histórica e arquitetônica de um monumento mundial."
      },
      {
        "pergunta": "Have you met Dr. Aris Thorne, the new department head?",
        "resposta": "Yes, I spoke with Dr. Thorne, whose recent publications on renewable energy have received international acclaim.",
        "contexto": "Comentando as credenciais de um novo chefe de departamento acadêmico."
      },
      {
        "pergunta": "How did your presentation to the international investors go yesterday?",
        "resposta": "The projector stopped working right in the middle of our pitch, which made everyone feel quite nervous initially, but we managed to finish smoothly.",
        "contexto": "Relatando um imprevisto técnico ocorrido durante uma apresentação executiva."
      }
    ],
    "armadilhas": [
      {
        "erro": "The British Museum, that attracts millions of visitors, is free to enter.",
        "correcao": "The British Museum, which attracts millions of visitors, is free to enter.",
        "explicacao": "É proibido usar 'that' em orações relativas explicativas (entre vírgulas). Use 'which'."
      },
      {
        "erro": "William Shakespeare which was born in Stratford wrote Hamlet.",
        "correcao": "William Shakespeare, who was born in Stratford, wrote Hamlet.",
        "explicacao": "Dois erros: 'who' deve ser usado para seres humanos (nunca which) e as vírgulas são obrigatórias em torno da informação extra."
      },
      {
        "erro": "My uncle, I haven't seen for years, is coming to dinner tonight.",
        "correcao": "My uncle, whom (ou who) I haven't seen for years, is coming to dinner tonight.",
        "explicacao": "Em orações relativas não-restritivas (entre vírgulas), o pronome relativo NUNCA pode ser omitido, mesmo quando funciona como objeto."
      }
    ],
    "coda": "Non-defining relative clauses are the art of the parenthetical whisper — enriching the story without disrupting the stride.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a oração explicativa entre vírgulas com o pronome relativo correto:\n\"Mount Everest, ___ is the highest peak on Earth, attracts hundreds of mountaineers each year.\"",
        "opcoes": [
          "which",
          "that",
          "what",
          "where"
        ],
        "resposta": "which",
        "explicacao": "Entre vírgulas (non-defining clause), usa-se 'which' para coisas ou acidentes geográficos; 'that' é estritamente proibido aqui."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a oração indicando relação de posse:\n\"Professor Higgins, ___ lecture on linguistics was inspiring, will publish a new book next month.\"",
        "opcoes": [
          "whose",
          "who's",
          "which",
          "whom"
        ],
        "resposta": "whose",
        "explicacao": "'Whose' é o pronome relativo que indica posse ('cuja palestra'). 'Who's' é a contração de 'who is'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual das frases a seguir está com a pontuação e gramática IMPECÁVEIS?",
        "opcoes": [
          "The Louvre Museum, which houses the Mona Lisa, is located in Paris.",
          "The Louvre Museum that houses the Mona Lisa, is located in Paris.",
          "The Louvre Museum, who houses the Mona Lisa, is located in Paris.",
          "The Louvre Museum, that houses the Mona Lisa, is located in Paris."
        ],
        "resposta": "The Louvre Museum, which houses the Mona Lisa, is located in Paris.",
        "explicacao": "A frase usa vírgulas obrigatórias e o pronome 'which' para um museu (instituição/coisa)."
      },
      {
        "tipo": "escolha",
        "pergunta": "Identifique o papel do 'which' na frase: \"He apologized sincerely, which made everyone feel much better.\"",
        "opcoes": [
          "Refere-se ao sujeito 'He'.",
          "Refere-se a toda a oração anterior (o fato de ele ter se desculpado).",
          "Refere-se ao substantivo 'everyone'.",
          "É um erro de concordância."
        ],
        "resposta": "Refere-se a toda a oração anterior (o fato de ele ter se desculpado).",
        "explicacao": "O 'sentential which' (which comentador) avalia e resume todo o fato relatado na oração precedente."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no pronome para pessoas entre vírgulas antes de revelar:\n\n\"J.K. Rowling, ___ wrote the Harry Potter series, was born in Gloucestershire.\"\n(J.K. Rowling, que escreveu a série Harry Potter, nasceu em Gloucestershire.)",
        "resposta": "J.K. Rowling, who wrote the Harry Potter series, was born in Gloucestershire.",
        "revelacao": "J.K. Rowling, who wrote the Harry Potter series, was born in Gloucestershire.",
        "dica": "Pronome relativo para pessoa entre vírgulas (who)",
        "explicacao": "Usa-se 'who' para pessoas em orações explicativas."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no pronome relativo para lugares antes de revelar:\n\n\"Cambridge, ___ many famous scientists studied, is renowned for its university.\"\n(Cambridge, onde muitos cientistas famosos estudaram, é renomada por sua universidade.)",
        "resposta": "Cambridge, where many famous scientists studied, is renowned for its university.",
        "revelacao": "Cambridge, where many famous scientists studied, is renowned for its university.",
        "dica": "Pronome para lugares (where)",
        "explicacao": "O pronome relativo para indicar localidade é 'where'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Identifique e corrija o erro grave na frase antes de revelar:\n\n\"The Titanic, that sank in 1912, was believed to be unsinkable.\"",
        "resposta": "The Titanic, which sank in 1912, was believed to be unsinkable.",
        "revelacao": "The Titanic, which sank in 1912, was believed to be unsinkable.",
        "dica": "Substitua 'that' por 'which' entre vírgulas",
        "explicacao": "'That' é inadmissível em orações relativas não-restritivas (entre vírgulas). A forma correta é 'which'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na posse relativa de uma empresa antes de revelar:\n\n\"Apple, ___ headquarters are in Cupertino, is one of the world's most valuable companies.\"\n(A Apple, cuja sede fica em Cupertino, é uma das empresas mais valiosas do mundo.)",
        "resposta": "Apple, whose headquarters are in Cupertino, is one of the world's most valuable companies.",
        "revelacao": "Apple, whose headquarters are in Cupertino, is one of the world's most valuable companies.",
        "dica": "Pronome de posse (whose)",
        "explicacao": "'Whose' expressa posse também para empresas e entidades coletivas."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome relativo que deve ser usado entre vírgulas para coisas (substituindo o proibido 'that'):\n\n\"The Mona Lisa, ___ was painted by Leonardo da Vinci, hangs in the Louvre.\"",
        "resposta": "which",
        "explicacao": "O pronome obrigatório para coisas entre vírgulas é 'which'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome relativo de pessoa para preencher a lacuna:\n\n\"Charles Darwin, ___ published 'On the Origin of Species', transformed modern biology.\"",
        "resposta": "who",
        "explicacao": "Para pessoas, usa-se 'who'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome relativo possessivo que completa a frase:\n\n\"The author, ___ novel won the Booker Prize, gave an interview on BBC Radio.\"",
        "resposta": "whose",
        "explicacao": "O pronome que expressa posse ('cujo romance') é 'whose'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome que introduz a oração comentadora:\n\n\"He decided to donate half of his fortune to charity, ___ amazed the press.\" (o que / fato que)",
        "resposta": "which",
        "explicacao": "O pronome que se refere a toda a ação precedente é 'which'."
      }
    ]
  }
};

console.log('Aplicando Onda 6 — Parte 1 (Lições B2.1 a B2.5)...');

for (const [id, lessonData] of Object.entries(wave6Part1Lessons)) {
  for (const mod of data.moduli) {
    const idx = mod.lezioni.findIndex(l => l.id === id);
    if (idx !== -1) {
      mod.lezioni[idx] = lessonData;
      console.log(`✓ Lição ${id} (${lessonData.titulo}) enriquecida com sucesso!`);
    }
  }
}

fs.writeFileSync(grammarPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Onda 6 — Parte 1 gravada com sucesso em data/grammar.json!');
