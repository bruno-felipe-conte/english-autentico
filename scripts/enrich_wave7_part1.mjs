import fs from 'fs';

const grammarPath = 'data/grammar.json';
const data = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));

// Onda 7 — Parte 1: Lições C1.1 a C1.5 (Inversão Negativa, Cleft Sentences, Orações Participiais, Condicionais Invertidas & Subjuntivo C1)
const wave7Part1Lessons = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 1: Inversion with Negative Adverbials
  // ─────────────────────────────────────────────────────────────
  "c1-lez1": {
    "id": "c1-lez1",
    "num": "Lesson 1",
    "titulo": "Inversion with Negative Adverbials",
    "subtitulo": "Rarely have I seen... — A Suprema Elegância Retórica e Enfática",
    "cena": {
      "origem": "dialogo",
      "titulo": "The Parliamentary Address in Westminster",
      "texto": "**Speaker of the House:** Order! I now call upon the Foreign Secretary to address the emergency diplomatic summit.\n**Foreign Secretary:** Thank you, Mr. Speaker. **Rarely in our modern history has this nation faced** a geopolitical challenge of such magnitude. **Seldom have world leaders witnessed** such rapid economic disruption.\n**Opposition Leader:** Hear, hear!\n**Foreign Secretary:** **Not only must we defend** international maritime treaties, but **under no circumstances will we compromise** on the security of our democratic allies. **No sooner had the ceasefire been signed than** hostiles resumed artillery fire."
    },
    "fio": {
      "abertura": "Bem-vindo ao ápice da maestria linguística: o nível C1! Se nos níveis anteriores você aprendeu a falar com correção gramatical e clareza, aqui você adquire **voz de autoridade, eloquência retórica e magnetismo estilístico**. A inversão com adverbiais negativos é a técnica favorita de oradores britânicos em Westminster, de autores de editoriais do *The Times* e dos maiores ensaístas de língua inglesa.",
      "descoberta": "Observe a potência dramática do discurso da Secretária de Relações Exteriores: em vez de dizer a frase comum e plana *\"This nation has rarely faced...\"*, ela desloca o advérbio negativo para o primeiríssimo lugar da oração («Rarely in our modern history...») e **inverte o verbo auxiliar com o sujeito**: «has this nation faced». Repare também nas outras estruturas: «Seldom have world leaders witnessed», «Not only must we defend», «Under no circumstances will we compromise» e «No sooner had... than»!",
      "fecho": "A regra de ouro da Inversão C1: colocar um adverbial negativo ou restritivo no início da frase aciona instantaneamente a **estrutura de pergunta (Auxiliar + Sujeito + Verbo)** em uma afirmação, criando um impacto dramático irresistível."
    },
    "alerta": "O erro mais punido em exames de nível C1 (Cambridge C1 Advanced / C2 Proficiency): colocar o advérbio negativo no início mas esquecer de fazer a inversão do auxiliar! Dizer *'Rarely I have seen'* ou *'Under no circumstances we will allow'* é um erro grave de coesão formal. A inversão é OBRIGATÓRIA: **Rarely have I seen... / Under no circumstances will we allow...**!",
    "definicao": {
      "fenomeno": "Rarely have I seen such beauty (raramente vi) · Little did they know the truth (mal sabiam eles) · Never before had she felt so proud (nunca antes ela havia se sentido)",
      "causa": "Por que o verbo auxiliar salta para antes do sujeito se a frase não é uma pergunta?",
      "conceito": "Trata-se de um recurso de topicalização e ênfase dramática herdado das origens germânicas do inglês. Ao adiantar uma palavra de polaridade negativa ou restritiva para a posição temática inicial, o cérebro do ouvinte é colocado em estado de alerta retórico, exigindo a sintaxe V2 (verbo auxiliar antes do sujeito)."
    },
    "inventario": [
      "Adverbiais de Frequência Negativa/Restritiva: Rarely, Seldom, Never (before), Barely, Scarcely, Hardly",
      "Expressões Prepositivas de Restrição Absoluta: Under no circumstances, On no account, At no time, In no way",
      "Locuções de Foco Concessivo: Not only... but also (inversão na primeira oração: *Not only did he apologize, but he also...*)",
      "Sequência Temporal Dramática: No sooner had... than... / Hardly had... when... (*No sooner had I arrived than it started to snow*)",
      "Restrições Condicionais no Início: Only then, Only when, Only after (*Only after leaving the room did I realize my mistake*)",
      "Expressões de Ignorância Retórica: Little did [sujeito] know / realize (*Little did they know that the police were listening*)"
    ],
    "tabela_visual": "| Adverbial Negativo Inicial | Estrutura Sintática Obrigatória | Exemplo Padrão (Sem Inversão) | Exemplo Eloquente C1 (Com Inversão) |\n|---|---|---|---|\n| **Rarely / Seldom** | Adverbial + **Auxiliar + Sujeito + V** | *I have rarely seen such dedication.* | * **Rarely have I seen** such dedication.* |\n| **Under no circumstances** | Adverbial + **Modal + Sujeito + V** | *You must not enter this vault.* | * **Under no circumstances must you enter** this vault.* |\n| **Little did [sujeito] know** | Little + **DID + Sujeito + Verbo Base** | *They had no idea what was coming.* | * **Little did they know** what was coming.* |\n| **No sooner... than** | No sooner + **HAD + S + V3** ... than | *As soon as I sat down, the phone rang.* | * **No sooner had I sat** down **than** the phone rang.* |\n| **Hardly / Scarcely... when** | Hardly + **HAD + S + V3** ... when | *I had hardly closed my eyes when the alarm rang.* | * **Hardly had I closed** my eyes **when** the alarm rang.* |\n| **Not only... but also** | Not only + **Aux + S + V** ... but also | *He is intelligent and also hardworking.* | * **Not only is he** intelligent, **but he is also** hardworking.* |\n| **Only after / Only when** | Only after [oração], **AUX + S + V** | *I only understood after he explained.* | * **Only after he explained did I understand**.* |",
    "observacao_cards": [
      {
        "ingles": "Rarely / Seldom have I...",
        "traducao": "Raramente eu...",
        "genero": "Retórica e Oratória",
        "motivo": "Inverte o auxiliar com o sujeito para conferir solenidade: 'Seldom have we witnessed such bravery'."
      },
      {
        "ingles": "No sooner had... THAN",
        "traducao": "Mal tinha... quando/do que...",
        "genero": "Par Conectivo Sagrado",
        "motivo": "'No sooner' faz par obrigatório com 'THAN'. Já 'Hardly/Scarcely' faz par com 'WHEN'!"
      },
      {
        "ingles": "Little did they know...",
        "traducao": "Mal sabiam eles / Nem imaginavam",
        "genero": "Narrativa Dramática",
        "motivo": "Usa o auxiliar do passado 'did': 'Little did he realize that his life was about to change forever'."
      },
      {
        "ingles": "Under no circumstances...",
        "traducao": "Sob hipótese alguma...",
        "genero": "Proibição Formal Absoluta",
        "motivo": "Exige modal invertido: 'Under no circumstances should staff divulge client passwords'."
      }
    ],
    "tecnica": {
      "titulo": "O Algoritmo da Inversão C1 em 3 Etapas",
      "passos": [
        "1. Desloque a expressão negativa para o primeiro lugar da frase (ex: 'Never in my life...').",
        "2. Identifique o tempo verbal e selecione o auxiliar correto correspondente (ex: have, has, had, do, does, did, will, should).",
        "3. Insira a sequência: AUXILIAR + SUJEITO + VERBO PRINCIPAL (ex: 'Never in my life HAVE I ENCOUNTERED such arrogance')."
      ]
    },
    "teoria": "### A Teoria Aprofundada da Inversão com Adverbiais Negativos\n\nA inversão sintática no inglês moderno não é uma relíquia arcaica; é um dos dispositivos retóricos mais vivos e valorizados em discursos parlamentares, teses doutorais, jornalismo de alta patente e ensaios literários.\n\n#### 1. A Mecânica da Inversão Auxiliar-Sujeito (Subject-Auxiliary Inversion)\nQuando um advérbio ou locução de sentido negativo, restritivo ou concessivo é colocado na posição inicial da oração principal por razões estilísticas, a ordem direta padrão (*Subject-Verb*) é suspensa, e a oração adota a ordem interrogativa (*Auxiliary-Subject-Verb*):\n* *Direta:* I had never felt such sheer joy. → *Inversão C1:* **Never had I felt such sheer joy.**\n* *Direta:* He not only arrived late, but he also forgot the slides. → *Inversão C1:* **Not only did he arrive late, but he also forgot the slides.**\n* *Nota:* Se não houver auxiliar explícito no tempo simples (Present Simple ou Past Simple), insira **do, does** ou **did**, exatamente como se estivesse construindo uma pergunta:\n  * *Direta:* She rarely visits her hometown. → *Invertida:* **Rarely does she visit her hometown.**\n  * *Direta:* He little suspected the truth. → *Invertida:* **Little did he suspect the truth.**\n\n#### 2. Expressões Prepositivas de Negação Categórica\nSão frases que expressam proibições legais, protocolos de segurança de alta rigidez ou decretos institucionais:\n* **Under no circumstances:** *\"Under no circumstances should flammable liquids be stored near heat sources.\"*\n* **On no account:** *\"On no account may unauthorized personnel access the biometric server room.\"*\n* **At no time:** *\"At no time during the cross-examination did the defendant admit liability.\"*\n* **In no way:** *\"In no way does this interim settlement compromise our long-term intellectual property rights.\"*\n\n#### 3. Os Pares Temporais: *No sooner... than* vs *Hardly... when*\nEssas duas fórmulas retratam a sobreposição imediata de dois eventos no passado:\n* **No sooner + HAD + Sujeito + V3 ... THAN + Past Simple:**\n  * *\"**No sooner had the curtain fallen than** the audience erupted in thunderous applause.\"*\n* **Hardly / Scarcely + HAD + Sujeito + V3 ... WHEN + Past Simple:**\n  * *\"**Hardly had we stepped** out of the shelter **when** the blizzard intensified violently.\"*\n* *Atenção aos pares:* Misturar *no sooner* com *when* ou *hardly* com *than* é uma das pegadinhas mais clássicas de provas de Cambridge!\n\n#### 4. O Fenômeno com 'Only': Inversão na Oração Principal\nCom locuções iniciadas por *Only* (*Only when, Only after, Only if, Only then*), a inversão **não ocorre dentro da oração do only**, mas sim **na oração principal seguinte**:\n* *\"Only after conducting exhaustive clinical trials **did the researchers publish** their conclusive findings.\"*\n* *\"Only when the emergency sirens wailed **did the residents realize** the river had burst its banks.\"*",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português, a ênfase é construída predominantemente pela entonação da voz, pelo uso de partículas enfáticas (*\"é que\"*) ou pela inversão livre do verbo:\n* *\"Raramente vi algo assim\"* (no português, o verbo precede o sujeito naturalmente: *\"Raramente se vê...\"*).\n* *\"Sob hipótese alguma nós aceitaremos\"* (em português mantemos o pronome antes ou depois sem mudança de auxiliares).\n\n**Onde o brasileiro tropeça gravemente no nível C1?**\n* **A falta do auxiliar 'did/do':** Em português, dizemos *\"Raramente ela visita...\"*. Se o aluno traduz para o inglês como *\"Rarely she visits...\"*, a frase soa desajeitada e perde toda a elegância C1. Em inglês, a regra exige a injeção do auxiliar: **Rarely DOES she visit...**!\n* **Trocar 'than' por 'when' em 'No sooner':** No português, dizemos *\"Mal tinha entrado QUANDO começou a chover\"*. Por isso, o brasileiro tenta dizer *\"No sooner had I entered WHEN...\"*. Erro penalizado em Cambridge! Lembre-se: **NO SOONER exige THAN** (porque *sooner* é um comparativo com *-er*), enquanto **HARDLY exige WHEN**.",
    "exemplos_prc": [
      {
        "pergunta": "How serious was the cybersecurity breach at the central bank?",
        "resposta": "At no time was customer banking data compromised; however, rarely in our history have we witnessed such a sophisticated malware payload.",
        "contexto": "Um diretor de segurança prestando depoimento oficial à imprensa sobre um ataque hacker."
      },
      {
        "pergunta": "Did the board of directors expect the CEO to resign so abruptly?",
        "resposta": "Little did the board know that the CEO had been secretly negotiating an acquisition with a competing Silicon Valley firm for six months.",
        "contexto": "Comentando os bastidores dramáticos de uma demissão corporativa surpreendente."
      },
      {
        "pergunta": "When did the medical team realize that the experimental treatment was working?",
        "resposta": "Only after analyzing the second round of blood samples did the research team observe complete tumor regression.",
        "contexto": "Explicando o momento exato da descoberta de um avanço médico histórico."
      }
    ],
    "armadilhas": [
      {
        "erro": "Rarely I have witnessed such magnificent theatrical performances.",
        "correcao": "Rarely have I witnessed such magnificent theatrical performances.",
        "explicacao": "A inversão entre o verbo auxiliar (have) e o sujeito (I) é obrigatória quando o advérbio negativo inicia a frase."
      },
      {
        "erro": "No sooner had we left the building when it started pouring with rain.",
        "correcao": "No sooner had we left the building than it started pouring with rain.",
        "explicacao": "'No sooner' faz par obrigatório com 'than' (devido à raiz comparativa -er). O conector 'when' é exclusivo de 'hardly/scarcely'."
      },
      {
        "erro": "Under no circumstances you should sign the contract without legal advice.",
        "correcao": "Under no circumstances should you sign the contract without legal advice.",
        "explicacao": "A locução restritiva inicial exige a inversão do modal 'should' com o sujeito 'you'."
      }
    ],
    "coda": "Inversion is not mere grammar; it is the trumpet fanfare of the English language, heralding profound truths with dramatic grace.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a inversão retórica com a ordem correta:\n\"Rarely ___ an artist of such extraordinary visionary brilliance.\"",
        "opcoes": [
          "has the world produced",
          "the world has produced",
          "produced the world has",
          "has produced the world"
        ],
        "resposta": "has the world produced",
        "explicacao": "A ordem após o adverbial negativo é: Auxiliar (has) + Sujeito (the world) + Particípio (produced)."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual conectivo completa perfeitamente o par com 'No sooner had they arrived...'?",
        "opcoes": [
          "than the electricity failed completely.",
          "when the electricity failed completely.",
          "that the electricity failed completely.",
          "then the electricity failed completely."
        ],
        "resposta": "than the electricity failed completely.",
        "explicacao": "'No sooner' rege inegociavelmente a conjunção comparativa 'than'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a advertência de segurança de alta formalidade:\n\"Under no circumstances ___ the fire exit doors during a performance.\"",
        "opcoes": [
          "must staff block",
          "staff must block",
          "must block staff",
          "should staff to block"
        ],
        "resposta": "must staff block",
        "explicacao": "Inversão obrigatória do modal com o sujeito: 'must staff block'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Identifique a inversão correta com o verbo no Past Simple:\n\"Little ___ that the detectives had already wiretapped the telephone line.\"",
        "opcoes": [
          "did the suspect suspect",
          "the suspect suspected",
          "suspected the suspect",
          "had the suspect suspected"
        ],
        "resposta": "did the suspect suspect",
        "explicacao": "Para verbos comuns no passado com 'Little', insere-se o auxiliar 'did' + sujeito + verbo base."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na inversão com 'Not only' antes de revelar:\n\n\"Not only ___ (he / lose) his house keys, but he also left his wallet in the restaurant.\"\n(Ele não apenas perdeu as chaves de casa, como também deixou a carteira no restaurante.)",
        "resposta": "Not only did he lose his house keys, but he also left his wallet in the restaurant.",
        "revelacao": "Not only did he lose his house keys, but he also left his wallet in the restaurant.",
        "dica": "did + he + lose",
        "explicacao": "A inversão no passado exige o auxiliar 'did' seguido da base 'lose'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no par com 'Hardly had... when' antes de revelar:\n\n\"Hardly had the prime minister finished speaking ___ the journalists began shouting questions.\"\n(Mal o primeiro-ministro havia terminado de falar quando os jornalistas começaram a gritar perguntas.)",
        "resposta": "Hardly had the prime minister finished speaking when the journalists began shouting questions.",
        "revelacao": "Hardly had the prime minister finished speaking when the journalists began shouting questions.",
        "dica": "Hardly faz par com WHEN",
        "explicacao": "O conectivo correlativo obrigatório de 'Hardly/Scarcely' é 'when'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na inversão na oração principal após 'Only after' antes de revelar:\n\n\"Only after reviewing the security footage ___ (the police / discover) how the vault was breached.\"\n(Somente após revisar as filmagens de segurança a polícia descobriu como o cofre foi violado.)",
        "resposta": "Only after reviewing the security footage did the police discover how the vault was breached.",
        "revelacao": "Only after reviewing the security footage did the police discover how the vault was breached.",
        "dica": "did the police discover...",
        "explicacao": "A oração principal após 'Only after' inverte com o auxiliar 'did'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Corrija a frase que omitiu a inversão C1 antes de revelar:\n\n\"Never in my life I have seen such an astonishing sunset over the Pacific Ocean.\"",
        "resposta": "Never in my life have I seen such an astonishing sunset over the Pacific Ocean.",
        "revelacao": "Never in my life have I seen such an astonishing sunset over the Pacific Ocean.",
        "dica": "Inverta 'have' com 'I'",
        "explicacao": "A expressão negativa inicial exige a inversão: 'have I seen'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a conjunção de quatro letras que faz par obrigatório com 'No sooner had':\n\n\"No sooner had we boarded the train ___ the conductor blew the departure whistle.\"",
        "resposta": "than",
        "explicacao": "O par correlativo exato de 'no sooner' é 'than'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o auxiliar do Present Simple necessário para a 3ª pessoa na inversão:\n\n\"Rarely ___ he complain about the demanding physical workload.\" (verbo do / does)",
        "resposta": "does",
        "explicacao": "Para a 3ª pessoa do singular (he) no presente, o auxiliar é 'does'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o modal que expressa dever na inversão formal:\n\n\"On no account ___ passengers tamper with aircraft smoke detectors.\" (devem / modal)",
        "resposta": "should",
        "explicacao": "O modal clássico em protocolos formais é 'should' (ou 'must')."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que completa a expressão de ignorância dramática 'Little ___ they know':\n\n\"Little ___ the conspirators know that their letters had been intercepted.\" (passado de do)",
        "resposta": "did",
        "explicacao": "A expressão dramática consagrada é 'Little did they know'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 2: Cleft Sentences
  // ─────────────────────────────────────────────────────────────
  "c1-lez2": {
    "id": "c1-lez2",
    "num": "Lesson 2",
    "titulo": "Cleft Sentences",
    "subtitulo": "It was John who... & What I need is... — A Engenharia do Foco e Ênfase",
    "cena": {
      "origem": "dialogo",
      "titulo": "Investigating the Financial Discrepancy",
      "texto": "**Director:** Someone altered the budget figures in the spreadsheet yesterday, Beatrice! Was it Thomas?\n**Beatrice:** No, **it was Robert who modified the spreadsheet**, not Thomas. Thomas was out of the office all morning.\n**Director:** I see. But why did he do it without consulting the steering committee?\n**Beatrice:** **What Robert was trying to do was correct** a catastrophic calculation error in cell D14. **All he wanted was to protect** the firm from an embarrassing public audit. **It was only after double-checking the numbers that he realized** the severity of the mistake."
    },
    "fio": {
      "abertura": "Em uma frase padrão como *\"Robert modified the spreadsheet\"*, o peso informativo está distribuído de forma neutra. Mas quando você precisa refutar uma acusação falsa, esclarecer uma dúvida crítica ou colocar um holofote teatral sobre exatamente **QUEM** fez a ação, **O QUE** a pessoa queria ou **POR QUE** ela tomou aquela decisão, a língua inglesa utiliza as poderosas **Cleft Sentences** (orações clivadas).",
      "descoberta": "A palavra *cleft* vem do verbo *cleave* (fender, dividir ao meio). Observe a genialidade de Beatrice ao defender Robert: em vez de dizer a frase comum *\"Robert modified it\"*, ela fende a oração em duas partes («It was Robert who modified...»), isolando 'Robert' no centro das atenções! E quando explica a motivação dele, usa uma *Wh-cleft*: «What Robert was trying to do was correct...» e «All he wanted was...»!",
      "fecho": "As Cleft Sentences são a ferramenta suprema para orientar o olhar do seu leitor ou ouvinte, controlando a hierarquia da informação com precisão cirúrgica."
    },
    "alerta": "A estrutura de 'It-cleft' usa SEMPRE o pronome impessoal **IT** acompanhado do verbo TO BE no tempo adequado (*It was... / It is...*). NUNCA comece com *'This was Robert who...'* ou *'He was Robert that...'*. O pronome introdutório é inegociavelmente **IT**!",
    "definicao": {
      "fenomeno": "It was David who solved the problem (foco na pessoa) · What we need is more time (foco na necessidade) · All I want is peace (foco no desejo exclusivo) · The place where I met her was Rome (foco no lugar)",
      "causa": "Por que fatiamos uma oração simples em duas partes conectadas por uma oração relativa?",
      "conceito": "Para criar contraste e destaque temático (*focus / clefting*). O elemento sob foco é isolado logo no início entre 'It is/was' e o pronome relativo, enquanto a informação secundária ou já conhecida é relegada à oração subordinada."
    },
    "inventario": [
      "It-clefts (Foco em sujeito, objeto, lugar ou tempo): It is/was + [Elemento Destacado] + that / who / which...",
      "Wh-clefts (Pseudo-clefts com What): What + sujeito + verbo + IS/WAS + [Elemento Destacado]",
      "All-clefts (Expressando exclusividade ou simplicidade): All + sujeito + verbo + IS/WAS... (*All I want is your honesty*)",
      "Person / Thing / Place / Reason clefts: The person who... / The place where... / The reason why...",
      "Reversed Wh-clefts: [Elemento Destacado] + is/was + what... (*A cup of hot coffee is what I need right now*)",
      "It-clefts com advérbios e tempo: *It was only yesterday that I heard the news* / *It was because of you that we won*"
    ],
    "tabela_visual": "| Tipo de Cleft Sentence | Fórmula Estrutural | Frase Neutra Original | Frase com Foco Enfatizado (Cleft) |\n|---|---|---|---|\n| **It-cleft (Pessoa)** | It + is/was + [Pessoa] + who/that | *Sarah designed the new logo.* | * **It was Sarah who** designed the new logo.* |\n| **It-cleft (Tempo)** | It + was + [Tempo] + that | *I met him in 2018.* | * **It was in 2018 that** I met him.* |\n| **It-cleft (Causa)** | It + was + because of... + that | *We won due to teamwork.* | * **It was because of teamwork that** we won.* |\n| **Wh-cleft (Coisa/Necessidade)** | What + S + V + is/was + [Elemento] | *We need extra funding.* | * **What we need is** extra funding.* |\n| **Wh-cleft (Ação)** | What + S + did + was + [Verbo] | *He resigned immediately.* | * **What he did was resign** immediately.* |\n| **All-cleft (Exclusividade)** | All + S + V + is/was + [Elemento] | *I only asked for a glass of water.* | * **All I asked for was** a glass of water.* |\n| **Reason-cleft (Motivo)** | The reason why + S + V + is/was... | *I called to warn you.* | * **The reason why I called was to** warn you.* |",
    "observacao_cards": [
      {
        "ingles": "It was [X] who/that...",
        "traducao": "Foi o [X] quem/que...",
        "genero": "It-Cleft Clássica",
        "motivo": "Isola o culpado, o herói ou o autor da ação: 'It was my brother who found the lost dog'."
      },
      {
        "ingles": "What I need is...",
        "traducao": "O que eu preciso é...",
        "genero": "Wh-Cleft (Pseudo-cleft)",
        "motivo": "Prepara a mente do ouvinte para a revelação principal: 'What we need right now is clarity'."
      },
      {
        "ingles": "All I want is...",
        "traducao": "Tudo o que eu quero é...",
        "genero": "All-Cleft de Exclusividade",
        "motivo": "Enfatiza que a exigência é modesta ou única: 'All he did was tell the truth'."
      },
      {
        "ingles": "The reason why... was...",
        "traducao": "A razão pela qual... foi...",
        "genero": "Foco Causal",
        "motivo": "Estrutura elegantíssima para justificar decisões em redações formais: 'The reason why we failed was poor logistics'."
      }
    ],
    "tecnica": {
      "titulo": "A Engenharia da Clivagem em 3 Passos",
      "passos": [
        "1. Identifique qual elemento da frase você deseja destacar (o autor, a ação, o motivo ou o objeto).",
        "2. Para destacar o autor ou o momento, aplique a fórmula: IT + IS/WAS + [ELEMENTO] + THAT/WHO.",
        "3. Para destacar a coisa ou a ação, aplique a fórmula de Wh-cleft: WHAT + [SUJEITO + VERBO] + IS/WAS + [ELEMENTO]."
      ]
    },
    "teoria": "### A Teoria Aprofundada das Cleft Sentences\n\nNa linguística discursiva, uma *cleft sentence* é uma construção sintática complexa que pega uma oração simples e a divide em duas partes, atribuindo a cada uma delas um papel comunicativo específico: a informação nova ou contrastiva (*focus*) e a informação de fundo compartilhada (*presupposition*).\n\n#### 1. It-Clefts (Orações Clivadas com 'It')\nAs *It-clefts* são as mais flexíveis, pois permitem destacar praticamente qualquer constituinte da oração: o sujeito, o objeto direto, o adjunto adverbial de tempo, de lugar ou de modo:\n* *Frase base:* **Shakespeare wrote Hamlet in London in 1600.**\n  * *Foco no sujeito:* **It was Shakespeare who** wrote Hamlet in London in 1600.\n  * *Foco no objeto:* **It was Hamlet that** Shakespeare wrote in London in 1600.\n  * *Foco no lugar:* **It was in London that** Shakespeare wrote Hamlet in 1600.\n  * *Foco no tempo:* **It was in 1600 that** Shakespeare wrote Hamlet in London.\n* *Regra de concordância verbal:* Quando o pronome sob foco é de 1ª ou 2ª pessoa, a concordância na norma culta segue o pronome enfático:\n  * *\"It is I who **am** responsible for the department.\"* (Norma culta estrita).\n  * *\"It is me who **is** responsible.\"* (Registro informal aceito na fala cotidiana).\n\n#### 2. Wh-Clefts / Pseudo-Clefts\nAs pseudo-clivadas iniciam com uma oração relativa substantiva encabeçada por *What*, funcionando como sujeito do verbo *be*:\n* **Foco no objeto:** *\"What I admire most about her is her intellectual resilience.\"*\n* **Foco na ação realizada (com o verbo 'do'):** Quando destacamos uma ação, usamos formas do verbo *do* na oração com *what*, e o verbo enfático seguinte pode aparecer com ou sem 'to':\n  * *\"What the committee did was **(to) suspend** the company's trading license.\"*\n  * *\"What you should do is **apologize** immediately.\"*\n\n#### 3. All-Clefts e Estruturas Similares\nA palavra *All* substitui *What* para enfatizar que nenhuma outra coisa importa além daquele item:\n* *\"All I ask is a fair trial.\"* (= A única coisa que peço é um julgamento justo).\n* *\"All they did was laugh at his speech.\"* (= Eles não fizeram nada além de rir).\n\n#### 4. Pseudo-Clivadas Invertidas (*Reversed Wh-Clefts*)\nPodemos inverter a ordem, colocando o elemento enfático no início do período, seguido por *is/was what...*:\n* *\"A comprehensive healthcare reform is **what the citizens are demanding**.\"*\n* *\"Ten minutes of silence was **all he wanted**.\"*",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português, as orações clivadas são extremamente frequentes na forma de *\"Foi o João quem...\"* ou *\"O que nós precisamos é...\"* ou com a locução enfática *\"é que\"* (*\"Ontem é que eu soube\"*).\n\n**Onde o brasileiro tropeça no inglês de nível C1?**\n* **Substituir 'It' por pronomes demonstrativos:** Em português, às vezes dizemos *\"Esse é o João que fez isso\"*. Em inglês, para criar uma cleft de foco, você NUNCA pode usar *this* ou *that* no lugar de *It* (*This was John who made it* é incorreto). A estrutura gramatical canônica exige o pronome impessoal **IT**: **It was John who made it**!\n* **Omissão do 'is/was' nas Wh-clefts:** No português coloquial, é comum dizer *\"O que eu quero uma pizza\"* omitindo o verbo ser. Em inglês, a cópula *is/was* é um pilar estrutural obrigatório: **What I want IS a pizza**.",
    "exemplos_prc": [
      {
        "pergunta": "Why was the press blaming the Minister of Finance for the inflation surge?",
        "resposta": "It wasn't the Minister of Finance who made that fiscal decision; it was the Central Bank governor who raised the interbank interest rates.",
        "contexto": "Corrigindo uma atribuição equivocada de responsabilidade política e econômica."
      },
      {
        "pergunta": "What do you think is the biggest hurdle facing young entrepreneurs today?",
        "resposta": "What young founders struggle with most is securing early-stage seed funding from risk-averse venture capital firms.",
        "contexto": "Analisando com profundidade os desafios do ecossistema de startups em um fórum de investimentos."
      },
      {
        "pergunta": "Did you demand a refund when your luxury hotel suite had no hot water?",
        "resposta": "No, all we asked for was a clean room on a different floor and an apology from the hotel management.",
        "contexto": "Demonstrando moderação ao relatar a resolução de uma queixa em um hotel."
      }
    ],
    "armadilhas": [
      {
        "erro": "This was the CEO who made the controversial announcement.",
        "correcao": "It was the CEO who made the controversial announcement.",
        "explicacao": "Em cleft sentences de foco, o pronome introdutório deve ser obrigatoriamente 'It', nunca 'This' ou 'That'."
      },
      {
        "erro": "What we really need extra time to complete the project.",
        "correcao": "What we really need is extra time to complete the project.",
        "explicacao": "A pseudo-cleft com 'What' exige o verbo to be ('is' ou 'was') ligando a oração subordinada ao elemento de foco."
      },
      {
        "erro": "It was in Paris where I first studied international diplomacy.",
        "correcao": "It was in Paris that I first studied international diplomacy.",
        "explicacao": "Em It-clefts com adjunto adverbial preposicionado ('in Paris'), a conjunção padrão da norma culta é 'that', e não 'where'."
      }
    ],
    "coda": "Cleft sentences are the stage lighting of prose: bathing the essential actor in radiant brilliance while the background fades.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a It-cleft de foco pessoal com a forma culta correta:\n\"___ was Professor Higgins who deciphered the ancient Mayan manuscript.\"",
        "opcoes": [
          "It",
          "This",
          "That",
          "There"
        ],
        "resposta": "It",
        "explicacao": "A fórmula de cleft sentence de foco exige o pronome impessoal 'It' (It was... who...)."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a Wh-cleft destacando a necessidade prioritária da equipe:\n\"What our research laboratory desperately needs ___ additional funding for gene sequencing equipment.\"",
        "opcoes": [
          "is",
          "are",
          "being",
          "to be"
        ],
        "resposta": "is",
        "explicacao": "A oração encabeçada por 'What' funciona como sujeito singular abstrato, exigindo o verbo de ligação 'is'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual alternativa expressa foco em exclusividade (tudo o que eu queria):",
        "opcoes": [
          "All I wanted was a simple cup of tea.",
          "What I wanted was a simple cup of tea.",
          "It was a simple cup of tea that I wanted.",
          "The cup of tea was all what I wanted."
        ],
        "resposta": "All I wanted was a simple cup of tea.",
        "explicacao": "'All I wanted was...' é a clivada clássica que expressa modéstia ou exclusividade do desejo."
      },
      {
        "tipo": "escolha",
        "pergunta": "Identifique a It-cleft que coloca foco no momento temporal exato:",
        "opcoes": [
          "It was only yesterday that I learned about the merger.",
          "I learned about the merger only yesterday.",
          "Yesterday was when I learned about the merger.",
          "What I learned yesterday was the merger."
        ],
        "resposta": "It was only yesterday that I learned about the merger.",
        "explicacao": "'It was only yesterday that...' foca e enfatiza dramaticamente o adjunto temporal."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na clivada de ação com 'What he did was' antes de revelar:\n\nTransforme em cleft sentence de ação:\n\"He resigned from the cabinet immediately.\"\n→ \"What he did ___ (resign) from the cabinet immediately.\"",
        "resposta": "What he did was resign from the cabinet immediately.",
        "revelacao": "What he did was resign from the cabinet immediately.",
        "dica": "was resign (ou was to resign)",
        "explicacao": "A cleft de ação é: 'What he did was resign'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no pronome relativo que segue o sujeito humano em It-cleft antes de revelar:\n\n\"It was Dr. Franklin ___ (who / that) first documented the rare botanical specimen.\"",
        "resposta": "It was Dr. Franklin who (ou that) first documented the rare botanical specimen.",
        "revelacao": "It was Dr. Franklin who (ou that) first documented the rare botanical specimen.",
        "dica": "who ou that para seres humanos",
        "explicacao": "Usa-se 'who' ou 'that' para pessoas em cleft sentences."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na estrutura 'The reason why... was...' antes de revelar:\n\n\"___ (a razão pela qual) we canceled the contract was their failure to meet safety standards.\"",
        "resposta": "The reason why we canceled the contract was their failure to meet safety standards.",
        "revelacao": "The reason why we canceled the contract was their failure to meet safety standards.",
        "dica": "The reason why...",
        "explicacao": "A clivada de motivo começa com 'The reason why'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Corrija o erro do pronome inicial antes de revelar:\n\n\"This was my mother who inspired me to pursue classical violin.\"",
        "resposta": "It was my mother who inspired me to pursue classical violin.",
        "revelacao": "It was my mother who inspired me to pursue classical violin.",
        "dica": "Troque 'This' por 'It'",
        "explicacao": "A cleft sentence de foco exige 'It', nunca 'This'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome impessoal de duas letras que abre toda It-cleft:\n\n\"___ was in the 17th century that modern physics emerged.\" (Foi no século XVII que)",
        "resposta": "It",
        "explicacao": "O pronome é 'It'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome interrogativo de quatro letras que encabeça uma pseudo-cleft:\n\n\"___ fascinates me most about astronomy is the vastness of the cosmos.\" (O que)",
        "resposta": "What",
        "explicacao": "A pseudo-cleft se inicia com 'What'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra de três letras que expressa exclusividade total em 'All-cleft':\n\n\"___ she asked for was an honest explanation.\" (Tudo o que)",
        "resposta": "All",
        "explicacao": "A estrutura de exclusividade é 'All she asked for was...'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma no passado do verbo 'be' que conecta a pseudo-cleft:\n\n\"What we discovered during the audit ___ shocking evidence of fraud.\" (foi)",
        "resposta": "was",
        "explicacao": "A cópula no passado é 'was'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 3: Participle Clauses
  // ─────────────────────────────────────────────────────────────
  "c1-lez3": {
    "id": "c1-lez3",
    "num": "Lesson 3",
    "titulo": "Participle Clauses",
    "subtitulo": "Having finished... & Seen from above... — A Suprema Economia e Fluidez Narrativa",
    "cena": {
      "origem": "dialogo",
      "titulo": "The Foreign Correspondent's War Memoir",
      "texto": "**Editor:** This chapter on the evacuation of the embassy is masterfully written, Henry! The pacing is electrifying.\n**Henry:** Thank you. **Having spent ten years covering conflicts in the Middle East**, I wanted the prose to reflect the chaotic reality on the ground.\n**Editor:** It certainly does. Lines like: \"**Arriving at the perimeter fence, the refugees saw** the humanitarian convoy\" and \"**Trapped between two opposing militias, the diplomats had** no choice but to negotiate.\"\n**Henry:** Exactly. **Not wishing to cause public panic**, the ambassador remained composed until the final transport helicopter landed."
    },
    "fio": {
      "abertura": "Em níveis intermediários, os textos costumam ser povoados por uma sequência repetitiva de orações introduzidas por *Because*, *When*, *After* e *Since* (*\"Because he had lived there, he knew...\"*, *\"When she arrived at the airport, she saw...\"*). No nível C1, a língua inglesa alcança sua máxima densidade estilística por meio das **Participle Clauses** (orações participiais reduzidas).",
      "descoberta": "Observe como Henry e seu editor condensam duas frases completas em uma única pincelada narrativa magistral:\n1. «Having spent ten years...» substitui o prolixo *Because I had spent ten years* (Particípio Perfeito);\n2. «Arriving at the fence...» substitui *When they arrived at the fence* (Particípio Presente);\n3. «Trapped between two militias...» substitui *Because they were trapped* (Particípio Passado Passivo);\n4. «Not wishing to cause panic...» substitui *As he did not wish to cause panic* (Particípio Negativo)!",
      "fecho": "As Participle Clauses são o motor da prosa jornalística de alto nível (*The New Yorker, The Economist*), permitindo expressar causa, tempo, condição e concessão com economia e elegância de tirar o fôlego."
    },
    "alerta": "O perigo mortal do 'Dangling Participle' (particípio pendente / sem sujeito): em uma oração participial, o sujeito implícito do particípio DEVE ser rigorosamente o mesmo sujeito da oração principal! Se você escrever *'Walking down the street, a piano fell on my head'*, a frase diz gramaticalmente que o PIANO estava caminhando pela rua! O correto é: **Walking down the street, I saw a piano fall**.",
    "definicao": {
      "fenomeno": "Having finished his breakfast, he left (após ter terminado) · Knowing the answer, she raised her hand (como sabia a resposta) · Written in 1813, Pride and Prejudice remains a bestseller (tendo sido escrito em 1813)",
      "causa": "Por que eliminamos as conjunções (when, because, after) e os sujeitos repetidos?",
      "conceito": "Para conferir concisão, velocidade narrativa e densidade informativa à frase (*syntactic compression*). A relação lógica de causa, tempo ou condição é deduzida contextualmente pelo leitor através da forma do particípio."
    },
    "inventario": [
      "Present Participle Clauses (-ING): indicam ações simultâneas, causas ou eventos imediatos (*Opening the letter, she burst into tears*)",
      "Past Participle Clauses (-ED / V3): indicam valor passivo (*Shocked by the news, the community united*)",
      "Perfect Participle Clauses (Having + V3): indicam ação anterior concluída antes do evento principal (*Having completed the training, she was hired*)",
      "Passive Perfect Participle Clauses (Having been + V3): *Having been warned of the risks, they proceeded anyway*",
      "Particípios Negativos: o 'NOT' precede obrigatoriamente o particípio (*Not knowing what to say, I stayed silent*)",
      "A Regra do Sujeito Idêntico e a prevenção contra o 'Dangling Participle'"
    ],
    "tabela_visual": "| Tipo de Particípio | Forma Verbal | Função Lógica Equivalente | Exemplo Prolixo Original | Exemplo C1 Reduzido |\n|---|---|---|---|---|\n| **Presente (-ing)** | *V-ing* | **Tempo simultâneo / Causa** | *Because she felt ill, she stayed home.* | * **Feeling ill**, she stayed home.* |\n| **Presente (-ing)** | *V-ing* | **Ação Imediata** | *When he opened the door, he saw...* | * **Opening the door**, he saw...* |\n| **Passado (V3)** | *Past Participle* | **Voz Passiva / Causa** | *Because he was abandoned by his allies...* | * **Abandoned by his allies**, he fled.* |\n| **Perfeito Ativo** | *Having + V3* | **Tempo Anterior Concluído** | *After he had saved enough money...* | * **Having saved enough money**, he bought the house.* |\n| **Perfeito Passivo** | *Having been + V3* | **Passiva Anterior Concluída** | *After it had been inspected by experts...* | * **Having been inspected by experts**, the bridge reopened.* |\n| **Negativo** | *Not + Particípio* | **Causa ou Motivo Negativo** | *Because I did not know her number...* | * **Not knowing her number**, I couldn't call.* |",
    "observacao_cards": [
      {
        "ingles": "Having + V3 (Ação Anterior)",
        "traducao": "Tendo feito / Após ter feito",
        "genero": "Particípio Perfeito",
        "motivo": "Marca que uma ação foi 100% finalizada antes da próxima: 'Having passed the exam, she celebrated'."
      },
      {
        "ingles": "Dangling Participle (Erro Fatal)",
        "traducao": "particípio pendente / sem sujeito",
        "genero": "Cuidado de Estilo C1",
        "motivo": "O sujeito da oração principal deve praticar a ação do particípio. 'Driving home, my car broke' é errado!"
      },
      {
        "ingles": "Not knowing... (Negativa)",
        "traducao": "Não sabendo... / Por não saber",
        "genero": "Posição do Not",
        "motivo": "A palavra 'not' vem SEMPRE antes do particípio: 'Not wanting to disturb them, I left quietly'."
      },
      {
        "ingles": "V3 Isolado (Passiva Elegante)",
        "traducao": "Visto de cima / Surpreendido por",
        "genero": "Particípio Passado",
        "motivo": "Carrega sentido passivo direto: 'Surrounded by mountains, the village was idyllic'."
      }
    ],
    "tecnica": {
      "titulo": "A Conversão para Particípio C1 em 3 Passos",
      "passos": [
        "1. Verifique se as duas orações possuem EXATAMENTE o mesmo sujeito.",
        "2. Se a primeira ação expressa causa ou simultaneidade ativa, substitua pelo verbo com -ING (ex: 'Realizing the danger...').",
        "3. Se a primeira ação ocorreu ANTES e já terminou, substitua por HAVING + PARTICÍPIO (ex: 'Having signed the contract...'). Se for passiva, use apenas o PARTICÍPIO PASSADO (ex: 'Built in 1900...')."
      ]
    },
    "teoria": "### A Teoria Aprofundada das Participle Clauses\n\nAs orações participiais são orações não finitas (*non-finite clauses*) que funcionam como modificadores adverbiais de tempo, causa, condição ou resultado. Representam o mais alto grau de sofisticação estilística e coesão da prosa anglo-saxônica.\n\n#### 1. Particípio Presente (-ING): Simultaneidade e Causa Imediata\nUtilizado quando a ação da oração participial ocorre ao mesmo tempo que a oração principal ou é a causa direta imediata dela:\n* *Tempo:* \"**Strolling through Central Park**, I bumped into my former university roommate.\" (= *While I was strolling...*)\n* *Causa:* \"**Believing that the market would crash**, the fund managers sold all tech equities.\" (= *Because they believed...*)\n\n#### 2. Particípio Passado (-ED / V3): Causa e Condição Passiva\nPossui inerentemente significado passivo. É o equivalente condensado de uma oração subordinada na voz passiva:\n* *\"**Shocked by the horrific allegations**, the prime minister demanded an immediate independent inquiry.\"* (= *Because he was shocked...*)\n* *\"**Situated on the slopes of the volcano**, the winery enjoys mineral-rich soil.\"* (= *Because it is situated...*)\n\n#### 3. Particípio Perfeito (*Having + V3* e *Having been + V3*)\nQuando é crucial enfatizar que a primeira ação foi **completamente concluída antes de o evento principal ter início**:\n* *Ativa:* \"**Having reviewed six hundred pages of evidence**, the jury delivered their verdict.\" (= *After they had reviewed...*)\n* *Passiva:* \"**Having been defeated in three consecutive elections**, the party leader stepped down.\" (= *After he had been defeated...*)\n\n#### 4. O Fenômeno do *Dangling Participle* (Particípio Flutuante)\nNa gramática normativa de Cambridge e Oxford, o sujeito do particípio não é expresso na oração reduzida; portanto, ele **deve ser recuperado pelo sujeito sintático da oração principal que vem logo após a vírgula**:\n* *Exemplo do erro clássico:* **Waiting for the bus, the rain started to fall.** (Incorreto: a chuva não estava esperando pelo ônibus!).\n* *Correção culta:* **Waiting for the bus, we were caught in a sudden downpour.** (Correto: nós estávamos esperando pelo ônibus).",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português literário e formal, as orações reduzidas de gerúndio e de particípio também são extremamente elegantes:\n* *\"Tendo terminado a prova, o aluno saiu.\"* (Having finished...)\n* *\"Sabendo do perigo, ele recuou.\"* (Knowing the danger...)\n* *\"Construída no século XVIII, a igreja permanece imponente.\"* (Built in the 18th century...)\n\n**Onde o brasileiro tropeça no inglês?**\n* **Falta de hábito no uso ativo:** Embora o português tenha essas estruturas na literatura, na conversação do dia a dia o brasileiro usa apenas *\"como eu tinha feito...\"* ou *\"depois que eu terminei...\"*. Ao escrever redações formais em inglês, muitos esquecem de usar *Having done* ou *Seen from*, produzindo textos com excesso infantil de conjunções *because, so, after*.\n* **Posicionamento da negação:** Em português dizemos *\"Não sabendo o que fazer...\"*. Em inglês, a palavra **NOT** deve preceder o particípio: **Not knowing what to do...** (nunca *Don't knowing* ou *Without knowing* quando se quer uma oração participial causal).",
    "exemplos_prc": [
      {
        "pergunta": "Why did the scientific panel reject the initial pharmaceutical trial results?",
        "resposta": "Having discovered significant flaws in the data collection methodology, the panel refused to endorse the medication.",
        "contexto": "Explicando o motivo técnico da rejeição de uma pesquisa médica por um comitê científico."
      },
      {
        "pergunta": "How did the ancient fortress survive so many hostile sieges throughout the Middle Ages?",
        "resposta": "Perched high on an inaccessible granite cliff, the fortress was virtually impregnable to ground assault.",
        "contexto": "Descrevendo a vantagem militar e geográfica de um monumento histórico."
      },
      {
        "pergunta": "Why didn't you intervene when you noticed the heated argument between the two delegates?",
        "resposta": "Not wishing to escalate an already delicate diplomatic dispute, I decided to observe from a distance and alert security.",
        "contexto": "Justificando a postura prudente adotada durante uma crise de relações públicas."
      }
    ],
    "armadilhas": [
      {
        "erro": "Walking through the park, a heavy branch fell on my shoulder.",
        "correcao": "Walking through the park, I was struck on the shoulder by a falling branch.",
        "explicacao": "Erro de Dangling Participle: o sujeito da oração principal deve ser a pessoa que estava caminhando (I), não o galho (a heavy branch)."
      },
      {
        "erro": "Don't knowing the answer, the student looked down at the floor.",
        "correcao": "Not knowing the answer, the student looked down at the floor.",
        "explicacao": "Em orações participiais negativas, usa-se 'Not' antes do particípio, nunca auxiliares como 'don't' ou 'didn't'."
      },
      {
        "erro": "After having finished the marathon, she drank a liter of water.",
        "correcao": "Having finished the marathon, she drank a liter of water (ou After finishing...).",
        "explicacao": "Combinar 'after' com 'having finished' é uma redundância pleonástica. Use 'Having finished' sozinho ou 'After finishing'."
      }
    ],
    "coda": "Participle clauses strip prose of redundant scaffoldings, leaving only the pure architecture of thought and motion.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a oração participial indicando uma ação que foi concluída ANTES:\n\"___ all required flight simulation hours, the pilot was cleared for commercial service.\"",
        "opcoes": [
          "Having completed",
          "Completing",
          "Completed having",
          "Being completed"
        ],
        "resposta": "Having completed",
        "explicacao": "A conclusão prévia das horas de voo exige o Particípio Perfeito: 'Having completed'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a oração participial passiva:\n\"___ by thousands of cheering fans, the Olympic champions waved from the open-top bus.\"",
        "opcoes": [
          "Surrounded",
          "Surrounding",
          "Having surrounded",
          "To surround"
        ],
        "resposta": "Surrounded",
        "explicacao": "O particípio passado com sentido passivo ('cercados por') é 'Surrounded'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase evita o erro gravíssimo de 'Dangling Participle'?",
        "opcoes": [
          "Running across the wet field, Arthur slipped and bruised his knee.",
          "Running across the wet field, Arthur's knee was bruised.",
          "Running across the wet field, a deep puddle was stepped into.",
          "Running across the wet field, the ball bounced away."
        ],
        "resposta": "Running across the wet field, Arthur slipped and bruised his knee.",
        "explicacao": "O sujeito que estava correndo é Arthur, que abre a oração principal após a vírgula."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a oração participial negativa:\n\"___ to offend the diplomatic hosts, the ambassador politely tasted the exotic dish.\"",
        "opcoes": [
          "Not wishing",
          "Don't wishing",
          "Without to wish",
          "Not to wish"
        ],
        "resposta": "Not wishing",
        "explicacao": "Orações participiais negativas colocam 'Not' antes do gerúndio: 'Not wishing'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no Particípio Perfeito Passivo antes de revelar:\n\n\"___ (having / reject) by twelve publishing houses, J.K. Rowling's first manuscript was finally accepted by Bloomsbury.\"\n(Tendo sido rejeitado por doze editoras, o primeiro manuscrito de J.K. Rowling foi finalmente aceito pela Bloomsbury.)",
        "resposta": "Having been rejected by twelve publishing houses, J.K. Rowling's first manuscript was finally accepted by Bloomsbury.",
        "revelacao": "Having been rejected by twelve publishing houses, J.K. Rowling's first manuscript was finally accepted by Bloomsbury.",
        "dica": "Having been rejected...",
        "explicacao": "Particípio perfeito passivo: 'Having been rejected'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na redução causal com 'realize' antes de revelar:\n\n\"___ (realize) that he was hopelessly lost in the dense fog, the hiker activated his emergency GPS beacon.\"\n(Percebendo que estava irremediavelmente perdido na névoa densa, o trilheiro ativou seu sinalizador GPS de emergência.)",
        "resposta": "Realizing that he was hopelessly lost in the dense fog, the hiker activated his emergency GPS beacon.",
        "revelacao": "Realizing that he was hopelessly lost in the dense fog, the hiker activated his emergency GPS beacon.",
        "dica": "Realizing...",
        "explicacao": "Present participle causal: 'Realizing'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no particípio passado de 'damage' antes de revelar:\n\n\"___ (severely / damage) by the Category 5 hurricane, the historic seaport required millions in reconstruction funds.\"\n(Severamente danificado pelo furacão de categoria 5, o porto histórico exigiu milhões em fundos de reconstrução.)",
        "resposta": "Severely damaged by the Category 5 hurricane, the historic seaport required millions in reconstruction funds.",
        "revelacao": "Severely damaged by the Category 5 hurricane, the historic seaport required millions in reconstruction funds.",
        "dica": "Severely damaged...",
        "explicacao": "Particípio passado passivo: 'Severely damaged'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Corrija o erro crasso de Dangling Participle antes de revelar:\n\n\"Driving down the motorway, a deer jumped right in front of the car.\"",
        "resposta": "Driving down the motorway, the driver saw a deer jump right in front of the car.",
        "revelacao": "Driving down the motorway, the driver saw a deer jump right in front of the car.",
        "dica": "O sujeito após a vírgula deve ser quem estava dirigindo (the driver)",
        "explicacao": "O cervo não estava dirigindo o carro; o sujeito principal deve ser o motorista."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma verbal que abre o particípio perfeito ativo:\n\n\"___ worked in investment banking for twenty years, she understands the global financial system.\" (Tendo)",
        "resposta": "Having",
        "explicacao": "O auxiliar é 'Having'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra negativa que precede o particípio:\n\n\"___ wanting to cause any unnecessary delay, we submitted the forms immediately.\" (Não)",
        "resposta": "Not",
        "explicacao": "A negação de particípio é 'Not'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o particípio passado do verbo 'write' para iniciar a oração passiva reduzida:\n\n\"___ in 1948, George Orwell's novel '1984' remains astonishingly relevant today.\" (Escrito)",
        "resposta": "Written",
        "explicacao": "O particípio passado de write é 'Written'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o verbo auxiliar 'be' no particípio que completa o particípio perfeito passivo:\n\n\"Having ___ informed of the flight cancellation, the passengers queued at the service desk.\"",
        "resposta": "been",
        "explicacao": "A estrutura passiva é 'Having been informed'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 4: Advanced Conditionals
  // ─────────────────────────────────────────────────────────────
  "c1-lez4": {
    "id": "c1-lez4",
    "num": "Lesson 4",
    "titulo": "Advanced Conditionals",
    "subtitulo": "Inverted Conditionals (Had I known, Were you to...), But for & Supposing — O Cume das Hipóteses",
    "cena": {
      "origem": "dialogo",
      "titulo": "The High-Stakes Venture Capital Negotiation",
      "texto": "**Partner:** **Had we known** about the undisclosed corporate debt last week, we **would never have approved** this multi-million dollar buyout.\n**Founder:** I understand your frustration. However, **were you to inspect** our newly patented artificial intelligence algorithms, you would recognize the immense market valuation.\n**Partner:** Perhaps. But **but for the immediate intervention** of our senior legal counsel, this merger would have collapsed entirely yesterday.\n**Founder:** **Should you require** any further proprietary documentation, our chief technology officer stands ready to provide full transparency."
    },
    "fio": {
      "abertura": "Nos níveis anteriores, dominamos as condicionais convencionais com *if*. Mas nos círculos diplomáticos, em contratos de fusões e aquisições e na alta literatura em língua inglesa, a palavra *if* costuma ser considerada corriqueira demais. Falantes avançados preferem as majestosas **Inverted Conditionals** (condicionais invertidas sem 'if') e fórmulas sofisticadas como **But for** e **Were it not for**.",
      "descoberta": "Analise a riqueza retórica do diálogo entre o investidor e o fundador:\n1. «Had we known...» substitui *If we had known* (Inversão do Third Conditional);\n2. «Were you to inspect...» substitui *If you inspected* (Inversão do Second Conditional);\n3. «Should you require...» substitui *If you should require / If you need* (Inversão do First Conditional);\n4. «But for the immediate intervention...» substitui com imensa sofisticação *If it hadn't been for the intervention*!",
      "fecho": "Ao dominar as três inversões condicionais (Had, Were, Should) e as expressões 'But for' e 'Supposing', seu inglês jurídico e executivo alcança o nível de mestre absoluto."
    },
    "alerta": "Lembre-se da trindade de inversão condicional: **SHOULD** (para First Conditional), **WERE** (para Second Conditional) e **HAD** (para Third Conditional). Ao fazer a inversão, a palavra 'IF' É COMPLETAMENTE ELIMINADA! Nunca diga *'If had I known'* — diga apenas: **Had I known**!",
    "definicao": {
      "fenomeno": "Had I realized the danger, I would have stopped (se eu tivesse percebido) · Were he to apologize, I might forgive him (se ele viesse a se desculpar) · Should you need help, please call me (caso venha a precisar) · But for his courage, we would have drowned (não fosse pela coragem dele)",
      "causa": "Por que eliminamos o 'if' e invertemos o auxiliar?",
      "conceito": "Essa é a estrutura de condicional hipotética formal preservada do inglês literário antigo. Ela confere solenidade institucional, diplomacia refinada e concisão elegante a textos contratuais e argumentativos."
    },
    "inventario": [
      "Inversão do 1º Condicional com SHOULD: Should + Sujeito + Verbo Base (*Should you require assistance, contact us*)",
      "Inversão do 2º Condicional com WERE: Were + Sujeito + to-infinitive (*Were they to increase prices, clients would leave*)",
      "Inversão do 3º Condicional com HAD: Had + Sujeito + V3 (*Had she accepted the offer, she would have moved to Paris*)",
      "Inversão com verbo TO BE puro no 2º Condicional: *Were I in your shoes, I would resign*",
      "Expressões 'But for' e 'Were it not for' / 'Had it not been for': 'não fosse por / se não fosse por' (+ substantivo)",
      "Conectivos Hipotéticos Criativos: Supposing / Imagine (*Supposing you won the jackpot, what would you buy?*)"
    ],
    "tabela_visual": "| Tipo Condicional | Forma Padrão com IF | Forma Invertida Formal C1 (Sem 'IF') | Nuance de Registro |\n|---|---|---|---|\n| **1º Condicional (Possibilidade)** | *If you have any questions...* | * **Should you have** any questions...* | Altamente polido e comercial (emails e contratos) |\n| **2º Condicional (Ação Hipotética)** | *If they offered me the job...* | * **Were they to offer** me the job...* | Hipótese improvável, registro acadêmico e diplomático |\n| **2º Condicional (Estado com 'be')**| *If I were you...* | * **Were I** you...* | Solene e enfático |\n| **3º Condicional (Arrependimento)** | *If we had known earlier...* | * **Had we known** earlier...* | Registro narrativo e jurídico superior |\n| **'Se não fosse por' (Passado)** | *If it hadn't been for his help...* | * **Had it not been for** his help...*<br>* **But for** his help...* | Gratidão profunda ou atribuição causal decisiva |\n| **'Se não fosse por' (Presente)** | *If it weren't for the rain...* | * **Were it not for** the rain...* | Obstáculo imediato no presente |",
    "observacao_cards": [
      {
        "ingles": "Should you need... (1st Cond)",
        "traducao": "Caso venha a precisar...",
        "genero": "Polidez Comercial e Formal",
        "motivo": "Substitui 'If you need' em correspondência de negócios: 'Should you have further queries, let me know'."
      },
      {
        "ingles": "Were you to ask... (2nd Cond)",
        "traducao": "Se você viesse a perguntar...",
        "genero": "Hipótese Diplomática",
        "motivo": "Usa 'Were + Sujeito + TO + Verbo Base': 'Were the government to raise taxes, protests would erupt'."
      },
      {
        "ingles": "Had I known... (3rd Cond)",
        "traducao": "Se eu soubesse / tivesse sabido...",
        "genero": "Arrependimento Solene",
        "motivo": "Elimina 'if' e inverte 'Had': 'Had we anticipated the storm, we would have stayed ashore'."
      },
      {
        "ingles": "But for... (+ Substantivo)",
        "traducao": "Não fosse por... / Se não fosse...",
        "genero": "Estrutura C1 de Prestígio",
        "motivo": "Equivale a 'If it hadn't been for': 'But for his quick reflexes, the accident would have been fatal'."
      }
    ],
    "tecnica": {
      "titulo": "A Engenharia da Inversão Condicional em 3 Passos",
      "passos": [
        "1. Identifique o tipo de condicional (1ª com futuro/presente, 2ª com hipótese presente, 3ª com passado).",
        "2. ELIMINE a palavra 'IF'.",
        "3. Abra a frase com a palavra-chave correspondente: SHOULD (para a 1ª), WERE (para a 2ª) ou HAD (para a 3ª): ex: 'Should you require...', 'Were you to decide...', 'Had you told me...'."
      ]
    },
    "teoria": "### A Teoria Aprofundada das Condicionais Avançadas e Invertidas\n\nAs condicionais avançadas representam a síntese entre a precisão lógica e a elegância sintática. Seu emprego é obrigatório para atingir os patamares mais elevados de proficiência (Banda 8.0-9.0 no IELTS e nota A no Cambridge C1/C2).\n\n#### 1. Inversão do First Conditional com 'Should'\nIndica que a condição é possível, mas tratada com extrema deferência, cortesia ou probabilidade remota:\n* *Padrão:* If you happen to see Peter, please tell him to call me.\n* *Inversão C1:* **Should you see Peter, please tell him to call me.**\n* *Em correspondência formal:* **Should you require any further assistance, please do not hesitate to contact our office.**\n\n#### 2. Inversão do Second Conditional com 'Were'\nEmprega-se para hipóteses presentes ou futuras de probabilidade muito baixa. Se a oração contiver um verbo de ação, utiliza-se a estrutura infinitiva `Were + Sujeito + to + base form`:\n* *Padrão:* If the board rejected our merger proposal, we would look for other partners.\n* *Inversão C1:* **Were the board to reject our merger proposal, we would look for other partners.**\n* Se o verbo for o próprio *to be*, inverte-se diretamente:\n  * *Padrão:* If I were the minister of education...\n  * *Inversão C1:* **Were I the minister of education, I would raise teacher salaries.**\n\n#### 3. Inversão do Third Conditional com 'Had'\nEsta é a inversão mais celebrada em textos jurídicos e narrativas históricas. Transforma o arrependimento contrafatual em um período de grande gravidade dramática:\n* *Padrão:* If we had foreseen the collapse of the banking system...\n* *Inversão C1:* **Had we foreseen the collapse of the banking system, we would have divested our holdings.**\n* *Forma negativa:* A palavra 'not' permanece **após o sujeito**, sem contração:\n  * *Incorreto:* Hadn't we intervened...\n  * *Correto C1:* **Had we not intervened, the company would have gone bankrupt.**\n\n#### 4. As Estruturas 'But for', 'Were it not for' e 'Had it not been for'\nSão fórmulas idiomáticas que expressam que um único fator foi decisivo para impedir ou provocar determinado resultado:\n* **Para o presente:** *\"**Were it not for** his generous support, our research laboratory would not exist today.\"*\n* **Para o passado:** *\"**Had it not been for** the brave firefighters, the entire cathedral would have burned down.\"*\n* **A fórmula sintética 'But for' (+ substantivo):** *\"**But for** your timely intervention, we would have lost all our savings.\"* (= *If it had not been for your timely intervention...*).",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português, construímos essas ideias com locuções sofisticadas como:\n* *\"Caso venha a necessitar...\"* (Should you require...)\n* *\"Se viesse a acontecer...\"* (Were it to happen...)\n* *\"Tivesse eu sabido...\"* (Had I known...)\n* *\"Não fosse pela sua ajuda...\"* (But for your help...)\n\n**Onde o brasileiro tropeça gravemente no nível C1?**\n* **Manter o 'IF' na frase invertida:** O erro mais frequente é misturar as duas estruturas dizendo *\"If should you need...\"* ou *\"If had I known...\"*. A regra é taxativa: **se você fez a inversão, o IF desaparece completamente**!\n* **Contrair o 'hadn't' no início:** Na inversão negativa, o aluno desatento escreve *\"Hadn't you told me...\"*. Na norma culta escrita em inglês, a negação é colocada depois do sujeito: **Had you not told me...**.",
    "exemplos_prc": [
      {
        "pergunta": "Would the peace treaty have succeeded without the United Nations mediation?",
        "resposta": "Certainly not. But for the tireless diplomacy of the UN envoy, both nations would have plunged into open warfare.",
        "contexto": "Analisando o papel decisivo da mediação internacional na resolução de um conflito armado."
      },
      {
        "pergunta": "What are our contingency plans if the prime commercial supplier fails to deliver on time?",
        "resposta": "Should the supplier fail to meet the delivery deadline, our contract entitles us to activate alternative suppliers across Europe immediately.",
        "contexto": "Esclarecendo protocolos de gestão de risco em uma reunião de logística corporativa."
      },
      {
        "pergunta": "Is there any chance our investment firm would consider acquiring that troubled airline?",
        "resposta": "Were the government to guarantee the pension fund liabilities, our partners might consider examining the books, but it remains highly improbable.",
        "contexto": "Deliberando sobre os termos hipotéticos de uma aquisição empresarial de alto risco."
      }
    ],
    "armadilhas": [
      {
        "erro": "If had I known about the changes, I would have warned you.",
        "correcao": "Had I known about the changes, I would have warned you.",
        "explicacao": "Na inversão condicional, a palavra 'if' deve ser completamente eliminada. Diga apenas 'Had I known'."
      },
      {
        "erro": "Hadn't he saved us, we would have drowned in the river.",
        "correcao": "Had he not saved us, we would have drowned in the river.",
        "explicacao": "Em inversões formais negativas, a contração 'hadn't' é evitada; usa-se 'Had he not saved us'."
      },
      {
        "erro": "Were they accept the offer, we would sign today.",
        "correcao": "Were they to accept the offer, we would sign today.",
        "explicacao": "Com verbos de ação na inversão do 2º condicional, a estrutura exige 'Were + sujeito + TO + verbo base' (Were they to accept)."
      }
    ],
    "coda": "Inverted conditionals dispense with the humble 'if', ascending straight to the majestic summit of hypothesis.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a inversão formal comercial do First Conditional:\n\"___ you encounter any technical difficulties, please contact our 24/7 helpdesk.\"",
        "opcoes": [
          "Should",
          "Were",
          "Had",
          "If should"
        ],
        "resposta": "Should",
        "explicacao": "'Should you encounter...' é a inversão formal correta que substitui 'If you encounter'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a inversão do Third Conditional de arrependimento:\n\"___ the pilot not spotted the obstacle in time, the plane would have crashed.\"",
        "opcoes": [
          "Had",
          "Were",
          "Should",
          "Did"
        ],
        "resposta": "Had",
        "explicacao": "A inversão do Third Conditional utiliza 'Had + sujeito + not + particípio'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual alternativa expressa 'não fosse pela sua ajuda' utilizando a estrutura de prestígio C1?",
        "opcoes": [
          "But for your assistance, we would have failed.",
          "Without for your assistance, we would have failed.",
          "Except for your assistance, we had failed.",
          "Not for your assistance, we would fail."
        ],
        "resposta": "But for your assistance, we would have failed.",
        "explicacao": "'But for your assistance...' equivale a 'If it hadn't been for your assistance'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a inversão do Second Conditional com verbo de ação:\n\"___ to discover our secret, all our strategic plans would be ruined.\"",
        "opcoes": [
          "Were the competitors",
          "Had the competitors",
          "Should the competitors",
          "Did the competitors"
        ],
        "resposta": "Were the competitors",
        "explicacao": "A estrutura de ação no 2º condicional invertido é: 'Were + sujeito + to + verbo' (Were the competitors to discover)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na inversão do 3º condicional antes de revelar:\n\nTransforme sem usar 'if':\n\"If we had invested in renewable energy earlier, our emissions would be fifty percent lower.\"\n→ \"___ (invest) in renewable energy earlier, our emissions would be fifty percent lower.\"",
        "resposta": "Had we invested in renewable energy earlier, our emissions would be fifty percent lower.",
        "revelacao": "Had we invested in renewable energy earlier, our emissions would be fifty percent lower.",
        "dica": "Had we invested...",
        "explicacao": "Inversão clássica do Third Conditional: 'Had we invested'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na polidez comercial com 'should' antes de revelar:\n\nTransforme sem usar 'if':\n\"If you require any further documentation, please email our legal department.\"\n→ \"___ (require) any further documentation, please email our legal department.\"",
        "resposta": "Should you require any further documentation, please email our legal department.",
        "revelacao": "Should you require any further documentation, please email our legal department.",
        "dica": "Should you require...",
        "explicacao": "Inversão com Should: 'Should you require'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na estrutura 'Had it not been for' antes de revelar:\n\n\"___ (não fosse pelo) prompt action of the paramedics, the patient would not have survived.\"",
        "resposta": "Had it not been for the prompt action of the paramedics, the patient would not have survived. (ou: But for the prompt action...)",
        "revelacao": "Had it not been for the prompt action of the paramedics, the patient would not have survived. (ou: But for the prompt action...)",
        "dica": "Had it not been for...",
        "explicacao": "A fórmula canônica no passado é 'Had it not been for'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Corrija a frase que manteve o 'if' na inversão antes de revelar:\n\n\"If had she listened to her parents, she wouldn't have married him.\"",
        "resposta": "Had she listened to her parents, she wouldn't have married him.",
        "revelacao": "Had she listened to her parents, she wouldn't have married him.",
        "dica": "Elimine a palavra 'If'",
        "explicacao": "Na inversão condicional, elimina-se o 'If': 'Had she listened'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que inicia a inversão formal do 1º condicional em correspondência executiva:\n\n\"___ you have any questions regarding the contract, do not hesitate to call.\" (Caso venha a)",
        "resposta": "Should",
        "explicacao": "A palavra é 'Should'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que inicia a inversão do 3º condicional:\n\n\"___ I known about the flight cancellation, I would have stayed at the hotel.\" (Tivesse eu)",
        "resposta": "Had",
        "explicacao": "A palavra é 'Had'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra de três letras que forma a locução '___ for' (não fosse por):\n\n\"___ for the guidance of my mentor, I would never have completed my PhD.\" (Não fosse)",
        "resposta": "But",
        "explicacao": "A locução é 'But for'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma subjuntiva do verbo 'be' que inicia a inversão do 2º condicional:\n\n\"___ I in your position, I would reject the settlement offer immediately.\" (Fosse eu)",
        "resposta": "Were",
        "explicacao": "A palavra é 'Were' (Were I in your position)."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 5: Subjunctive Mood
  // ─────────────────────────────────────────────────────────────
  "c1-lez5": {
    "id": "c1-lez5",
    "num": "Lesson 5",
    "titulo": "Subjunctive Mood",
    "subtitulo": "I suggest that he go... & It is vital that she be... — A Gramática do Comando e da Necessidade",
    "cena": {
      "origem": "dialogo",
      "titulo": "The Hospital Ethics Committee",
      "texto": "**Chairperson:** We are reviewing the clinical trial protocol for the new oncology drug. Dr. Vance, what is your recommendation?\n**Dr. Vance:** I strongly **recommend that the dosage be reduced** by twenty percent, and I **insist that every patient remain** under continuous neurological observation.\n**Chairperson:** Agreed. It is **vital that the lead researcher inform** the regulatory agency of any adverse reactions immediately.\n**Dr. Vance:** Absolutely. And **be that as it may**, we must ensure that no participant **be subjected** to unnecessary biological distress, **lest we violate** our fundamental medical oath."
    },
    "fio": {
      "abertura": "Muitos estudantes ouvem dizer que *'não existe modo subjuntivo em inglês'*. Isso é um mito monumental! Embora o inglês moderno tenha simplificado desinências verbais, o **Subjunctive Mood** sobrevive vigorosamente no inglês formal, jurídico, médico, institucional e nos padrões cultos do inglês norte-americano e britânico internacional.",
      "descoberta": "Observe as frases do comitê de ética: «recommend that the dosage BE reduced» (e não *is reduced*); «insist that every patient REMAIN» (e não *remains*, mesmo sendo terceira pessoa!); «vital that the lead researcher INFORM» (sem o -s da 3ª pessoa!); e expressões consagradas como «be that as it may» e «lest we violate». O modo subjuntivo utiliza a **FORMA BASE PURA DO VERBO (bare infinitive)** para todas as pessoas, sem conjugação e sem 'to'!",
      "fecho": "O Subjuntivo Mandatório é a assinatura definitiva de quem domina a redação jurídica, as atas corporativas e a diplomacia internacional no mais alto nível."
    },
    "alerta": "O choque do aluno ao ver a 3ª pessoa sem o -s: em orações subordinadas com subjuntivo mandatório após verbos de ordem ou exigência, o verbo DEVE ficar na forma base pura! Dizer *'I recommend that he goes'* soa coloquial/incorreto no padrão C1; a forma culta oficial é: **I recommend that he GO**! E para o verbo TO BE, usa-se a forma **BE** para todas as pessoas: *It is essential that she BE present*!",
    "definicao": {
      "fenomeno": "The doctor demanded that he rest (sem -s) · It is crucial that she be informed (forma pura 'be') · I move that the meeting be adjourned (proposta formal)",
      "causa": "Por que o verbo perde as desinências de tempo e pessoa?",
      "conceito": "Porque a oração não relata um fato histórico ou uma ação concreta que já está ocorrendo, mas sim um desejo, comando, exigência, recomendação ou necessidade abstrata cuja realização é almejada pelo falante. A forma base pura sinaliza essa natureza virtual/mandatória."
    },
    "inventario": [
      "Verbos que regem o Subjuntivo: demand, insist, recommend, suggest, propose, require, request, urge (todos seguidos de 'that + sujeito + forma base')",
      "Adjetivos que regem o Subjuntivo: crucial, essential, vital, imperative, important, necessary (ex: *It is essential that he be told*)",
      "O Verbo 'TO BE' no Subjuntivo Mandatório: a forma é simplesmente 'BE' para todas as pessoas (I be, you be, he be, they be)",
      "Negação no Subjuntivo Mandatório: insere-se 'NOT' diretamente antes do verbo base (*I recommend that he not participate*)",
      "Subjuntivo em Expressões Idiomáticas Fixas (Formulaic Subjunctive): *God save the Queen*, *Be that as it may*, *Come what may*, *Suffice it to say*, *Heaven forbid*",
      "Uso arcaico/formal com 'LEST' (para que não): *Lest we forget*, *He took notes lest he forget the details*"
    ],
    "tabela_visual": "| Contexto de Uso | Gatilho Verbal / Adjetival | Frase Coloquial B1 | Frase Culta no Subjunctive C1 |\n|---|---|---|---|\n| **Verbo de Recomendação** | *recommend that + S + base* | *She recommended that he **goes**.* | *She recommended that he **go**.* |\n| **Verbo de Exigência** | *insist that + S + base* | *I insist that he **apologizes**.* | *I insist that he **apologize**.* |\n| **Adjetivo de Necessidade** | *It is crucial that + S + base* | *It is crucial that she **signs**.* | *It is crucial that she **sign**.* |\n| **Verbo To Be na Passiva** | *It is vital that + S + be V3* | *It is vital that it **is done**.* | *It is vital that it **be done**.* |\n| **Negação Mandatória** | *S + not + base form* | *I suggest that he **doesn't go**.* | *I suggest that he **not go**.* |\n| **Fórmula Fixa: 'Aconteça o que acontecer'**| Expressão consagrada | *Whatever happens...* | * **Come what may**, we will survive.* |\n| **Fórmula Fixa: 'Basta dizer'** | Expressão consagrada | *It is enough to say...* | * **Suffice it to say**, we agreed.* |",
    "observacao_cards": [
      {
        "ingles": "Forma Base Pura (Sem -S)",
        "traducao": "he go / she understand",
        "genero": "Regra Suprema do Subjuntivo",
        "motivo": "Na oração subordinada mandatória, o -s da 3ª pessoa é banido: 'The judge ordered that the prisoner remain silent'."
      },
      {
        "ingles": "Uso de 'BE' invariável",
        "traducao": "que ele seja / que esteja",
        "genero": "Verbo To Be Subjuntivo",
        "motivo": "Para todas as pessoas, o verbo to be fica como 'be': 'It is imperative that the truth be revealed'."
      },
      {
        "ingles": "Negação com 'NOT' puro",
        "traducao": "that he NOT do",
        "genero": "Sintaxe Negativa",
        "motivo": "Dispensa 'doesn't/don't': 'I propose that we not proceed with this merger until audit approval'."
      },
      {
        "ingles": "Formulaic Subjunctive",
        "traducao": "expressões consagradas fixas",
        "genero": "Expressões Idiomáticas C1",
        "motivo": "'Be that as it may' (seja como for), 'God forbid' (Deus me livre), 'Suffice it to say' (basta dizer)."
      }
    ],
    "tecnica": {
      "titulo": "A Identificação do Subjuntivo Mandatório em 3 Passos",
      "passos": [
        "1. Identifique se a oração principal traz um verbo de ordem/sugestão (recommend, insist, demand) ou adjetivo enfático (crucial, vital, essential) seguido de 'THAT'.",
        "2. Na oração subordinada, localize o sujeito.",
        "3. Aplique IMEDIATAMENTE a forma base nua do verbo (bare infinitive), ignorando o -s da 3ª pessoa e usando 'be' para o verbo ser/estar (ex: 'that he submit', 'that they be')."
      ]
    },
    "teoria": "### A Teoria Aprofundada do Subjunctive Mood (O Modo Subjuntivo em Inglês)\n\nO modo subjuntivo em inglês divide-se em duas categorias principais: o *Past Subjunctive* (o uso de *were* para situações hipotéticas com *if* e *wish*, já estudado) e o **Present Subjunctive / Mandative Subjunctive** (o subjuntivo mandatório ou de comando), que é a forma mais prestigiosa em redação legislativa e corporativa.\n\n#### 1. Verbos que Despertam o Subjuntivo Mandatório\nQuando a oração principal expressa volição, exigência, recomendação, petição ou ordem institucional através de verbos como:\n* *advise, ask, demand, insist, propose, recommend, request, require, stipulate, suggest, urge*\n\nA oração subordinada introduzida pela conjunção *that* deve empregar a forma infinitiva básica sem 'to':\n* *\"The board **stipulated that every executive submit** personal tax filings.\"*\n* *\"The prosecutor **demanded that the defendant hand over** his passport.\"*\n* *\"The United Nations **urged that all hostilities cease** immediately.\"*\n\n#### 2. Adjetivos Impessoais de Importância Crítica\nQuando a oração se inicia com a estrutura impessoal *It is + Adjetivo + that...*, onde o adjetivo expressa urgência, necessidade ou dever ético:\n* *advisable, crucial, desirable, essential, fitting, imperative, important, mandatory, necessary, urgent, vital*\n* *Exemplo:* \"It is **imperative that the contaminated water supply be shut off** at once.\"\n* *Exemplo:* \"It is **vital that the patient not be moved** until the orthopedic surgeon arrives.\"\n\n#### 3. A Estrutura Alternativa com 'Should' (Padrão Britânico Coloquial)\nNo inglês britânico informal e jornalístico, é comum encontrar a inserção do modal *should* como equivalente ao subjuntivo puro:\n* *Subjuntivo Americano / Padrão Internacional C1:* The doctor recommended that he **rest**.\n* *Variante Britânica com Should:* The doctor recommended that he **should rest**.\nAmbas as formas são aceitas, mas o subjuntivo puro (*that he rest / that he be*) é a forma preferida e de maior valor em testes internacionais avançados.\n\n#### 4. O Subjuntivo Formulaico e a Conjunção 'Lest'\nFrases feitas congeladas na história da língua preservam o subjuntivo arcaico:\n* **Be that as it may:** Seja como for / Não obstante isso.\n* **Come what may:** Aconteça o que acontecer / Custe o que custar.\n* **Suffice it to say:** Basta dizer que...\n* **God bless you / God save the King:** O verbo fica na base (bless/save), sem -s!\n* **Lest (+ subjuntivo):** Conjunção literária que significa 'para que não / com receio de que':\n  * *\"He spoke in hushed whispers, **lest he wake the sleeping baby**.\"*",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português, o subjuntivo é incrivelmente rico em desinências e conjugações em todos os tempos verbais:\n* *\"Exijo que ele **faça**\"* (presente do subjuntivo)\n* *\"Era vital que ela **estivesse** presente\"* (imperfeito do subjuntivo)\n* *\"Quando você **quiser**\"* (futuro do subjuntivo)\n\n**Onde o brasileiro tropeça gravemente no inglês?**\n* **Achar que o inglês precisa de uma desinência especial:** Como o português tem conjugações específicas para o subjuntivo (*faça, venha, seja*), o aluno brasileiro fica desorientado ao descobrir que, em inglês, o subjuntivo mandatório é simplesmente a **FORMA BASE PURA DO VERBO** (sem conjugação alguma: *go, be, have, do*)!\n* **Insistir em colocar o -s da 3ª pessoa:** O cérebro do estudante intermediário foi condicionado a colocar -s após *he/she/it*. Quando ele escreve *\"I recommend that he goes\"*, ele acha que está sendo correto, mas está violando a regra do subjuntivo mandatório. Em inglês culto C1, o -s desaparece: **I recommend that he GO**!",
    "exemplos_prc": [
      {
        "pergunta": "What did the aviation safety board conclude following the emergency landing?",
        "resposta": "The board mandated that all commercial airlines inspect the titanium turbine blades on Boeing 777 aircraft immediately.",
        "contexto": "Relatando a determinação obrigatória de uma agência reguladora de aviação."
      },
      {
        "pergunta": "Why is the defense attorney asking for a temporary adjournment of the trial?",
        "resposta": "She is demanding that new forensic ballistic evidence be admitted before cross-examination begins.",
        "contexto": "Justificando um pedido formal da defesa em uma audiência jurídica de alta repercussão."
      },
      {
        "pergunta": "Do you think we should disclose the merger negotiations to the press today?",
        "resposta": "Heaven forbid! It is imperative that our negotiations remain strictly confidential until the binding contract is executed.",
        "contexto": "Recusando categoricamente o vazamento antecipado de informações de uma fusão corporativa."
      }
    ],
    "armadilhas": [
      {
        "erro": "The doctor suggested that she takes a month off work.",
        "correcao": "The doctor suggested that she take a month off work.",
        "explicacao": "Após o verbo 'suggest that', o subjuntivo mandatório exige a forma base sem o -s da 3ª pessoa: 'that she take'."
      },
      {
        "erro": "It is essential that the prisoner is guarded at all times.",
        "correcao": "It is essential that the prisoner be guarded at all times.",
        "explicacao": "Com adjetivos de necessidade e comando ('essential that'), o verbo to be assume a forma pura 'be' (that the prisoner be guarded)."
      },
      {
        "erro": "I insist that he doesn't sign the contract until I arrive.",
        "correcao": "I insist that he not sign the contract until I arrive.",
        "explicacao": "A negação do subjuntivo mandatório dispensa o auxiliar 'doesn't'; usa-se 'not' diretamente antes da forma base: 'that he not sign'."
      }
    ],
    "coda": "The subjunctive mood strips the verb of human ego, leaving only the pure crystal of mandate and necessity.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o verbo na forma de subjuntivo mandatório C1:\n\"The judge ordered that the defendant ___ in custody until the bail hearing.\"",
        "opcoes": [
          "remain",
          "remains",
          "remained",
          "is remaining"
        ],
        "resposta": "remain",
        "explicacao": "Após 'ordered that', usa-se a forma base pura do verbo (remain), sem a terminação -s da 3ª pessoa."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o verbo 'to be' no subjuntivo mandatório:\n\"It is vital that all personnel ___ notified of the safety protocol immediately.\"",
        "opcoes": [
          "be",
          "are",
          "were",
          "to be"
        ],
        "resposta": "be",
        "explicacao": "Com adjetivos de comando e necessidade ('vital that'), o verbo 'be' permanece na forma básica pura: 'all personnel be notified'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual alternativa formula a negação do subjuntivo mandatório de forma IMPECÁVEL?",
        "opcoes": [
          "I suggest that she not accept the initial settlement offer.",
          "I suggest that she doesn't accept the initial settlement offer.",
          "I suggest that she don't accept the initial settlement offer.",
          "I suggest that she not to accept the initial settlement offer."
        ],
        "resposta": "I suggest that she not accept the initial settlement offer.",
        "explicacao": "A negação no subjuntivo mandatório insere 'not' diretamente antes da forma base verbal ('that she not accept')."
      },
      {
        "tipo": "escolha",
        "pergunta": "Identifique a expressão que contém o Subjuntivo Formulaico consagrado:",
        "opcoes": [
          "Be that as it may, we must proceed with our strategy.",
          "Is that as it may, we must proceed with our strategy.",
          "Was that as it may, we must proceed with our strategy.",
          "Being that as it may, we must proceed with our strategy."
        ],
        "resposta": "Be that as it may, we must proceed with our strategy.",
        "explicacao": "'Be that as it may' (seja como for) é uma expressão idiomática consagrada que preserva o subjuntivo arcaico."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no verbo na forma base sem -s antes de revelar:\n\n\"The university dean demanded that the dishonest student ___ (apologize) publicly to the faculty.\"\n(O reitor da universidade exigiu que o estudante desonesto se desculpasse publicamente perante o corpo docente.)",
        "resposta": "The university dean demanded that the dishonest student apologize publicly to the faculty.",
        "revelacao": "The university dean demanded that the dishonest student apologize publicly to the faculty.",
        "dica": "Forma base de apologize (sem o -s)",
        "explicacao": "Usa-se 'apologize' puro para a terceira pessoa no subjuntivo mandatório."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no verbo 'to be' no subjuntivo antes de revelar:\n\n\"It is imperative that every medical record ___ (be) encrypted in compliance with federal privacy laws.\"\n(É imperativo que todo prontuário médico seja criptografado em conformidade com as leis federais de privacidade.)",
        "resposta": "It is imperative that every medical record be encrypted in compliance with federal privacy laws.",
        "revelacao": "It is imperative that every medical record be encrypted in compliance with federal privacy laws.",
        "dica": "Forma básica: be",
        "explicacao": "A forma do verbo ser/estar no subjuntivo mandatório é 'be'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na expressão literária com 'lest' antes de revelar:\n\n\"The general checked the encrypted transmission twice, lest any detail ___ (be / overlook).\"\n(O general checou a transmissão criptografada duas vezes, para que nenhum detalhe fosse negligenciado.)",
        "resposta": "The general checked the encrypted transmission twice, lest any detail be overlooked.",
        "revelacao": "The general checked the encrypted transmission twice, lest any detail be overlooked.",
        "dica": "be overlooked",
        "explicacao": "'Lest' rege o modo subjuntivo: 'be overlooked'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Corrija a frase que usou o presente do indicativo com -s incorretamente antes de revelar:\n\n\"The committee recommended that the mayor resigns immediately.\"",
        "resposta": "The committee recommended that the mayor resign immediately.",
        "revelacao": "The committee recommended that the mayor resign immediately.",
        "dica": "Remova o -s de resigns",
        "explicacao": "No subjuntivo mandatório, elimina-se o -s da 3ª pessoa: 'that the mayor resign'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma base do verbo 'attend' exigida pelo subjuntivo mandatório:\n\n\"The CEO insisted that every regional manager ___ the annual symposium.\" (participe)",
        "resposta": "attend",
        "explicacao": "A forma base pura sem -s é 'attend'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma do verbo 'to be' exigida após o adjetivo de comando 'crucial that':\n\n\"It is crucial that the international treaty ___ ratified before the fiscal year ends.\" (seja)",
        "resposta": "be",
        "explicacao": "A forma exigida é 'be'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que nega diretamente o subjuntivo mandatório (sem do/does):\n\n\"I strongly advise that he ___ make any public statements today.\" (não)",
        "resposta": "not",
        "explicacao": "A negação do subjuntivo é feita com a palavra 'not'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o verbo que abre a expressão consagrada 'Come what ___' (aconteça o que acontecer):\n\n\"Come what ___, we will stand by our scientific convictions.\"",
        "resposta": "may",
        "explicacao": "A expressão fixa consagrada é 'Come what may'."
      }
    ]
  }
};

console.log('Aplicando Onda 7 — Parte 1 (Lições C1.1 a C1.5)...');

for (const [id, lessonData] of Object.entries(wave7Part1Lessons)) {
  for (const mod of data.moduli) {
    const idx = mod.lezioni.findIndex(l => l.id === id);
    if (idx !== -1) {
      mod.lezioni[idx] = lessonData;
      console.log(`✓ Lição ${id} (${lessonData.titulo}) enriquecida com sucesso!`);
    }
  }
}

fs.writeFileSync(grammarPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Onda 7 — Parte 1 gravada com sucesso em data/grammar.json!');
