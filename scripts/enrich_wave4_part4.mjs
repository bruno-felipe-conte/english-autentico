import fs from 'fs';

const grammarPath = 'data/grammar.json';
const data = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));

// Onda 4 Parte 4: Lições A2.16 a A2.20 (Pronomes Indefinidos, Gerúndios vs Infinitivos, Too/Enough, So/Neither e First Conditional)
const wave4Part4Lessons = {
  // ─────────────────────────────────────────────────────────────
  // LESSON A2.16: Indefinite Pronouns
  // ─────────────────────────────────────────────────────────────
  "a2-lez16": {
    "id": "a2-lez16",
    "num": "Lesson 16",
    "titulo": "Indefinite Pronouns",
    "subtitulo": "Pessoas, Coisas e Lugares Indeterminados — Somebody, Anything, Nowhere & Everyone",
    "cena": {
      "origem": "dialogo",
      "titulo": "The Mystery of the Missing Office Key",
      "texto": "**Liam:** Has anyone seen the master key to the archive room? It's nowhere to be found.\n**Chloe:** I saw somebody on the third floor holding a brass key this morning, but I don't know who it was.\n**Liam:** Did they say anything to you?\n**Chloe:** No, nothing at all. Everyone was in a hurry because the executive meeting was starting."
    },
    "fio": {
      "abertura": "Como você fala sobre pessoas, objetos ou lugares quando você não sabe exatamente quem, o quê ou onde eles são?",
      "descoberta": "O inglês constrói uma matriz matemática perfeita de 16 pronomes combinando quatro prefixos (SOME, ANY, NO, EVERY) com quatro sufixos (BODY, ONE, THING, WHERE)! Uma vez que você entende como essa tabela se cruza, você ganha 16 palavras poderosas num piscar de olhos.",
      "fecho": "Com atenção à regra da concordância no singular e à proibição da dupla negação, você usará os pronomes indefinidos com naturalidade e precisão."
    },
    "alerta": "Concordância no singular: Embora 'EVERYONE' e 'EVERYBODY' deem a ideia de um grupo de muitas pessoas, gramaticalmente eles são tratados como SINGULAR! Dizemos 'Everyone IS happy' (e nunca *Everyone are happy* ❌).",
    "definicao": {
      "fenomeno": "Somebody is calling · Did you see anyone? · There is nothing to worry about · Everywhere was crowded",
      "causa": "Como o inglês compõe termos para entidades não identificadas ou generalizadas?",
      "conceito": "Os pronomes indefinidos combinam determinantes de quantidade (some = afirmativo/oferta; any = dúvida/negação; no = negação direta com verbo positivo; every = totalidade distributiva) com categorias essenciais (-body/-one = pessoa; -thing = objeto/conceito; -where = lugar). Todos regem verbos no singular."
    },
    "inventario": [
      "Cruzar os prefixos (some-, any-, no-, every-) com os sufixos (-body, -one, -thing, -where)",
      "Conjugar verbos no singular após pronomes com every- e some- (Everyone knows, Somebody is)",
      "Evitar a dupla negação: usar 'nothing / nobody' com verbo positivo, ou 'anything / anybody' com verbo negativo",
      "Usar compostos de 'some-' em perguntas para ofertas e pedidos gentis (Would you like something to drink?)",
      "Posicionar adjetivos DEPOIS do pronome indefinido (something interesting, nowhere safe)"
    ],
    "tabela_visual": "| Prefixo | Pessoa (-body / -one) | Coisa (-thing) | Lugar (-where) | Contexto de Uso |\n|---|---|---|---|---|\n| **SOME-** | **somebody / someone** | **something** | **somewhere** | Frases afirmativas e ofertas polidas |\n| **ANY-** | **anybody / anyone** | **anything** | **anywhere** | Frases negativas e perguntas neutras |\n| **NO-** | **nobody / no one** | **nothing** | **nowhere** | Negações diretas (com verbo afirmativo) |\n| **EVERY-** | **everybody / everyone** | **everything** | **everywhere** | Totalidade / Todos (verbo no singular) |",
    "observacao_cards": [
      {
        "ingles": "Someone / Somebody",
        "traducao": "Alguém",
        "genero": "Pessoa Afirmativa",
        "motivo": "Ambos são 100% intercambiáveis, sendo 'someone' ligeiramente mais comum na escrita."
      },
      {
        "ingles": "Nothing (/ˈnʌθɪŋ/)",
        "traducao": "Nada",
        "genero": "Coisa Negativa",
        "motivo": "Já traz a carga negativa: 'I know nothing' (nunca use *I don't know nothing*)."
      },
      {
        "ingles": "Everyone is (/ˈɛvriwʌn ɪz/)",
        "traducao": "Todos estão / Todo mundo está",
        "genero": "Concordância Singular",
        "motivo": "Trata o coletivo como unidade individual; verbo sempre no singular: 'Everyone is ready'."
      },
      {
        "ingles": "Nowhere to go",
        "traducao": "Nenhum lugar para ir",
        "genero": "Lugar Negativo",
        "motivo": "Indica ausência total de localização: 'We had nowhere to sleep'."
      },
      {
        "ingles": "Something interesting",
        "traducao": "Algo interessante",
        "genero": "Posição do Adjetivo",
        "motivo": "Adjetivos vêm DEPOIS de pronomes indefinidos: 'Let's watch something funny'."
      },
      {
        "ingles": "Anybody / Anyone (Afirmativo)",
        "traducao": "Qualquer pessoa / Qualquer um",
        "genero": "Sentido de Qualquer",
        "motivo": "Em frases afirmativas, 'any-' significa 'qualquer um': 'Anyone can learn English'."
      }
    ],
    "tecnica": {
      "passo1": "Escolha o sufixo: é pessoa (-body/-one), coisa (-thing) ou lugar (-where)?",
      "passo2": "Selecione o prefixo pelo tom da frase: positivo (some-), pergunta/negação (any-), negação pura sem 'not' (no-), ou todos (every-).",
      "passo3": "Conjugue sempre o verbo no singular: *Somebody WAS here* / *Everything LOOKS great*."
    },
    "teoria": "Os pronomes indefinidos fornecem flexibilidade estilística imensa à língua inglesa, mas exigem rigor sintático contra a interferência da língua portuguesa.\n\n### 1. A Regra Anti-Dupla Negação\nEm português, dizemos naturalmente: 'Eu NÃO vi NINGUÉM' (duas negativas). Em inglês, a lógica algébrica da língua proíbe isso (duas negativas cancelam-se e viram afirmativa). Você tem duas opções corretas:\n* **Opção 1 (Verbo Negativo + ANY):** *I didn't see anyone.* (Mais comum na fala cotidiana).\n* **Opção 2 (Verbo Afirmativo + NO):** *I saw no one.* (Mais enfático e estilístico).\n* NUNCA diga: *I didn't see no one* ❌.\n\n### 2. A Ilusão de Pluralidade de 'EVERY-'\nPalavras como *everybody, everyone, everything, everywhere* provocam erros constantes em estudantes. Embora se refiram a todas as pessoas do grupo, o pronome foca em 'cada indivíduo' de forma distributiva:\n* *Everybody wants to be successful.* (Com '-s' de terceira pessoa singular!).\n* *Everything has changed.* (Com 'has', e nunca *have*).\n\n### 3. Adjetivos Pós-Pronome Indefinido\nEm inglês, o adjetivo geralmente vem antes do substantivo (*a cold drink*). No entanto, com pronomes indefinidos, o adjetivo vai obrigatoriamente DEPOIS:\n* *I want to eat something spicy.* (Quero comer algo apimentado).\n* *Is there anywhere quiet to study?* (Há algum lugar silencioso para estudar?).",
    "ponte": "No Brasil, é comum dizer 'Todo mundo sabem' ou 'Todo mundo querem'? Não, nós dizemos 'Todo mundo quer' (no singular). Mas quando o brasileiro aprende inglês e vê 'everyone', ele pensa 'são todas as pessoas, então é plural' e fala *'Everyone are happy'*. Mantenha a mesma lógica do seu português: pense que 'everyone' significa 'cada um' e use SEMPRE o verbo no singular!",
    "exemplos_prc": [
      {
        "oracao": "Is there anything I can do to help you with the presentation?",
        "pergunta": "Por que o falante usou 'anything' em vez de 'something'?",
        "resposta": "Porque é uma pergunta aberta e neutra; 'anything' é o padrão interrogativo comum.",
        "conclusao": "'Anything' atua como pronome interrogativo neutro para coisas."
      },
      {
        "oracao": "Nobody knows the password to the company server.",
        "pergunta": "Como se comporta o verbo 'knows' após 'nobody'?",
        "resposta": "O verbo recebe o '-s' de 3ª pessoa singular ('knows') e a oração permanece afirmativa gramaticalmente.",
        "conclusao": "'Nobody' rege verbo no singular e expressa negação completa sem 'not'."
      },
      {
        "oracao": "Would you like something sweet to eat after lunch?",
        "pergunta": "Por que 'something' foi usado em uma pergunta?",
        "resposta": "Porque é uma oferta educada e cortês onde o falante espera ou sugere uma resposta afirmativa.",
        "conclusao": "Ofertas e convites polidos utilizam 'some-' mesmo em perguntas."
      },
      {
        "oracao": "Everyone in the audience was applauding enthusiastically.",
        "pergunta": "Por que o verbo auxiliar é 'was' e não 'were'?",
        "resposta": "Porque 'everyone' exige concordância estrita com a 3ª pessoa do singular.",
        "conclusao": "'Everyone' concorda gramaticalmente com 'was'."
      }
    ],
    "armadilhas": [
      {
        "errado": "I don't know nothing about the project. ❌",
        "certo": "I don't know anything about the project. / I know nothing... ✔️",
        "motivo": "Dupla negação é proibida no inglês culto: combine 'don't know' com 'anything'."
      },
      {
        "errado": "Everybody are waiting outside. ❌",
        "certo": "Everybody is waiting outside. ✔️",
        "motivo": "'Everybody' exige verbo no singular ('is', não 'are')."
      },
      {
        "errado": "I want to go to a place quiet. ⚠️ (prolixo)",
        "certo": "I want to go somewhere quiet. ✔️",
        "motivo": "O pronome indefinido 'somewhere' seguido do adjetivo 'quiet' é muito mais natural."
      },
      {
        "errado": "Nobody didn't call me. ❌",
        "certo": "Nobody called me. ✔️",
        "motivo": "'Nobody' já contém a negação completa; nunca adicione 'didn't'."
      }
    ],
    "coda": "Matriz mágica: some- para sim, any- para dúvida/não, no- para zero e every- para todos. E o verbo? Sempre no singular!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o pronome e verbo corretos:\n\n\"The building was completely empty; ___ inside.\"",
        "opcoes": ["nobody was", "nobody were", "anybody was", "everybody weren't"],
        "resposta": "nobody was",
        "explicacao": "'Nobody' expressa que não havia ninguém e rege verbo no singular ('was')."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase evita a armadilha da dupla negação com perfeição?",
        "opcoes": [
          "She didn't tell anybody about her secret plan.",
          "She didn't tell nobody about her secret plan.",
          "She told not anybody about her secret plan.",
          "She didn't told anyone about her secret plan."
        ],
        "resposta": "She didn't tell anybody about her secret plan.",
        "explicacao": "Verbo negativo 'didn't tell' + 'anybody' respeita a regra anti-dupla negação."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a concordância verbal adequada:\n\n\"Everyone in my family ___ coffee in the morning.\"",
        "opcoes": ["drinks", "drink", "are drinking", "have drunk"],
        "resposta": "drinks",
        "explicacao": "'Everyone' é 3ª pessoa do singular e recebe '-s' no Present Simple: 'drinks'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a oferta educada:\n\n\"You look tired. Would you like ___ to drink?\"",
        "opcoes": ["something", "anything", "nothing", "everything"],
        "resposta": "something",
        "explicacao": "Em ofertas educadas onde se sugere aceitação, usa-se 'something'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Por que a frase *\"I haven't seen no one today\"* é gramaticalmente inaceitável em inglês padrão?",
        "resposta": "Porque combina o verbo negativo ('haven't') com um pronome negativo ('no one'), gerando uma dupla negação. O correto é *\"I haven't seen anyone today\"* ou *\"I have seen no one today\"*.",
        "explicacao": "Dupla negação é vetada na norma culta."
      },
      {
        "tipo": "revelar",
        "pergunta": "Onde deve ficar o adjetivo na expressão: *\"algo interessante\"*?",
        "resposta": "O adjetivo fica imediatamente DEPOIS do pronome indefinido: *\"something interesting\"*.",
        "explicacao": "Pronomes indefinidos recebem o adjetivo pós-posto."
      },
      {
        "tipo": "revelar",
        "pergunta": "Qual é a diferença entre *'anybody'* em pergunta e *'anybody'* em frase afirmativa?",
        "resposta": "Em pergunta significa 'alguém': *Is anybody there?*. Em frase afirmativa significa 'qualquer pessoa': *Anybody can join the club*.",
        "explicacao": "Any em pergunta = alguém; em afirmativa = qualquer."
      },
      {
        "tipo": "revelar",
        "pergunta": "Como se diz: \"Não há nada que possamos fazer\"?",
        "resposta": "\"There is nothing we can do.\" (ou \"There isn't anything we can do.\").",
        "explicacao": "Nothing com verbo positivo / anything com verbo negativo."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma verbal do verbo To Be no presente que concorda com 'everyone':\n\n\"Everyone ___ ready for the excursion.\"",
        "resposta": "is",
        "explicacao": "Everyone rege o verbo singular 'is'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome indefinido para coisas em frase negativa:\n\n\"I looked in the fridge, but there wasn't ___ to eat.\"",
        "resposta": "anything",
        "explicacao": "'Anything' é usado após o verbo negativo 'wasn't'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome que significa 'em nenhum lugar':\n\n\"I searched the whole house, but my passport was ___ to be found.\"",
        "resposta": "nowhere",
        "explicacao": "Nowhere = em nenhum lugar."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com o pronome que significa 'alguém' na afirmativa:\n\n\"Listen! ___ is knocking at the front door.\"",
        "resposta": "Someone",
        "explicacao": "Someone / Somebody."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON A2.17: Gerunds (-ing) vs Infinitives
  // ─────────────────────────────────────────────────────────────
  "a2-lez17": {
    "id": "a2-lez17",
    "num": "Lesson 17",
    "titulo": "Gerunds (-ing) vs Infinitives",
    "subtitulo": "A Batalha dos Verbos Duplos — To Do vs Doing e Regência Verbal",
    "cena": {
      "origem": "dialogo",
      "titulo": "New Hobbies and Commitments",
      "texto": "**Lucas:** I've decided to take up swimming this year, Maya.\n**Maya:** That's great! I really enjoy swimming in the ocean, but I avoid going to crowded public pools.\n**Lucas:** Me too. I hope to improve my stamina before summer.\n**Maya:** Don't forget to buy a good pair of goggles. They're essential for protecting your eyes."
    },
    "fio": {
      "abertura": "O que acontece quando você junta dois verbos seguidos em inglês? Por que dizemos 'I want TO GO', mas dizemos 'I enjoy GOING'?",
      "descoberta": "O segundo verbo se curva à vontade do primeiro verbo! Alguns verbos exigem o infinitivo com «TO» (geralmente ações futuras, escolhas e planos, como decide, want, hope). Outros verbos exigem o gerúndio com «-ING» (geralmente sentimentos, processos em andamento e hábitos, como enjoy, avoid, finish). E há uma regra de ouro inegociável: após qualquer preposição, o verbo VAI SEMPRE para o '-ING'!",
      "fecho": "Ao mapear as famílias de regência verbal, seu inglês soará natural e sofisticado, livre dos tropeços de tradução direta."
    },
    "alerta": "A regra de ouro da preposição: Qualquer verbo que venha imediatamente após uma preposição (in, on, at, about, without, before, after) DEVE OBRIGATORIAMENTE terminar em '-ING'! Exemplo: 'Thank you for coming' (e NUNCA *Thank you for to come* ❌).",
    "definicao": {
      "fenomeno": "I decided to study · She enjoys dancing · We agreed to meet · He avoided answering · Interested in learning",
      "causa": "O que determina se o segundo verbo fica no infinitivo com 'to' ou no gerúndio com '-ing'?",
      "conceito": "A forma do verbo subordinado é governada pelo verbo principal precedente (regência verbal). Verbos de projeto, intenção e futuro regem o infinitivo ('to + verbo'). Verbos de experiência, hábito e atitude regem o gerúndio ('verbo + -ing'). Preposições sempre exigem gerúndio."
    },
    "inventario": [
      "Identificar verbos que regem infinitivo com 'to' (want, decide, hope, promise, need, plan)",
      "Identificar verbos que regem gerúndio com '-ing' (enjoy, avoid, finish, keep, mind, consider)",
      "Aplicar '-ing' automaticamente a qualquer verbo posicionado após uma preposição",
      "Usar o gerúndio como sujeito da frase (Smoking is bad / Learning languages is exciting)",
      "Distinguir verbos com mudança de sentido (stop to smoke = parar para fumar; stop smoking = parar de fumar)"
    ],
    "tabela_visual": "| Categoria | Verbos Mais Comuns | Estrutura | Exemplo Real |\n|---|---|---|---|\n| **Regem Infinitivo (TO)** | decide, want, hope, plan, promise, learn, offer | Verbo + **to do** | I **decided to buy** a new laptop. |\n| **Regem Gerúndio (-ING)** | enjoy, avoid, finish, mind, keep, suggest, spend (time) | Verbo + **doing** | She **enjoys reading** historical novels. |\n| **Após Preposição** | good at, interested in, without, before, after, thank for | Preposição + **-ing** | He left **without saying** goodbye. |\n| **Como Sujeito** | Verbo iniciando a oração como substantivo | **-ING** + verbo | **Swimming** is great exercise. |",
    "observacao_cards": [
      {
        "ingles": "Enjoy + -ing",
        "traducao": "Gostar / Aproveitar fazer algo",
        "genero": "Regência de Gerúndio",
        "motivo": "Enjoy NUNCA aceita 'to': 'I enjoy cooking for my friends'."
      },
      {
        "ingles": "Decide + to",
        "traducao": "Decidir fazer algo",
        "genero": "Regência de Infinitivo",
        "motivo": "Decisões apontam para frente: 'They decided to move to Canada'."
      },
      {
        "ingles": "Good at + -ing",
        "traducao": "Bom em fazer algo",
        "genero": "Preposição Obrigatória",
        "motivo": "'At' é preposição, logo o verbo seguinte recebe -ing: 'He is good at solving puzzles'."
      },
      {
        "ingles": "Without + -ing",
        "traducao": "Sem fazer algo",
        "genero": "Preposição de Exclusão",
        "motivo": "'Without leaving', 'without asking'."
      },
      {
        "ingles": "Stop doing vs Stop to do",
        "traducao": "Parar de fazer vs Parar para fazer",
        "genero": "Mudança de Significado",
        "motivo": "Stop smoking = largar o vício; Stop to smoke = fazer uma pausa na caminhada com a finalidade de acender um cigarro."
      },
      {
        "ingles": "I don't mind (+ -ing)",
        "traducao": "Eu não me importo de / Não me incomodo",
        "genero": "Expressão Reitora",
        "motivo": "Rege gerúndio: 'I don't mind waiting for ten minutes'."
      }
    ],
    "tecnica": {
      "passo1": "Verifique o que vem imediatamente antes do verbo: se for uma preposição (in, on, at, of, for, about, without), use '-ING' imediatamente.",
      "passo2": "Se for verbo de intenção ou plano futuro (decide, hope, plan, promise, want), use 'TO + verbo'.",
      "passo3": "Se for verbo de apreciação ou processo em andamento (enjoy, avoid, finish, keep, mind), use 'verbo + -ING'."
    },
    "teoria": "A regência de verbos duplos é um dos aspectos mais elegantes da gramática da língua inglesa. Cada combinação possui uma lógica semântica subjacente.\n\n### 1. A Lógica Geral: O Futuro (To) vs O Presente/Passado (-ing)\n* **Infinitivo com TO:** Geralmente aponta para o futuro, para um objetivo, promessa ou desejo a ser concretizado:\n  * *I hope to see you soon.* (Ainda vou te ver).\n  * *She promised to call me.* (O ato de ligar está no horizonte).\n* **Gerúndio com -ING:** Frequentemente foca na experiência em si, na atividade contínua ou em algo que você já conhece ou evita:\n  * *I love walking in the rain.* (A experiência de caminhar).\n  * *He avoided meeting his ex-colleague.* (A ação evitada).\n\n### 2. A Regra Sagrada das Preposições\nEm inglês, uma preposição JAMAIS pode ser seguida por um infinitivo com 'to'. Se um verbo vier após qualquer preposição, ele se substantiva recebendo '-ing':\n* *She is tired OF working late.* (Ela está cansada de trabalhar até tarde).\n* *Before leaving, please lock the door.* (Antes de sair, por favor tranque a porta).\n* *We are looking forward TO hearing from you.* (Aqui 'to' é preposição, por isso o verbo 'hear' ganha -ing!).\n\n### 3. O Famoso Caso de 'Stop'\n* *He stopped smoking.* = Ele parou de fumar (abandonou o hábito do tabagismo).\n* *He stopped to smoke.* = Ele interrompeu o que estava fazendo (estava dirigindo, encostou o carro) com o objetivo de fumar.",
    "ponte": "Em português, nós usamos o infinitivo em ambos os casos: dizemos 'eu quero VIAJAR' e 'eu gosto de VIAJAR'. Para nós, o verbo fica idêntico ('viajar'). Em inglês não! 'Querer' exige 'to travel', enquanto 'gostar/curtir' prefere 'traveling'. E o maior perigo: nós dizemos 'obrigado por VIR' (infinitivo), enquanto em inglês é obrigatório dizer *'thank you for COMING'* (-ing após a preposição 'for'). Memorize essa regra da preposição para soar como nativo!",
    "exemplos_prc": [
      {
        "oracao": "They decided to postpone the product launch until October.",
        "pergunta": "Por que o verbo 'postpone' está no infinitivo com 'to'?",
        "resposta": "Porque o verbo 'decide' rege obrigatoriamente o infinitivo com 'to'.",
        "conclusao": "'Decide + to + verbo' expressa tomada de resolução futura."
      },
      {
        "oracao": "She completely avoids eating processed sugar during the week.",
        "pergunta": "Por que 'eating' está com terminação '-ing'?",
        "resposta": "Porque o verbo 'avoid' rege gerúndio obrigatório.",
        "conclusao": "'Avoid + -ing' indica esquiva de uma atividade."
      },
      {
        "oracao": "Are you interested in learning data science?",
        "pergunta": "Qual regra gramatical determina o uso de 'learning'?",
        "resposta": "A preposição 'in'; qualquer verbo imediatamente após uma preposição recebe '-ing'.",
        "conclusao": "Preposição + verbo sempre gera forma com '-ing'."
      },
      {
        "oracao": "Learning a musical instrument requires patience and daily practice.",
        "pergunta": "Qual é a função sintática de 'Learning' no início da frase?",
        "resposta": "Atua como o sujeito da oração, substantivado na forma de gerúndio.",
        "conclusao": "Verbos no papel de sujeito iniciam-se preferencialmente com '-ing'."
      }
    ],
    "armadilhas": [
      {
        "errado": "I enjoy to listen to music. ❌",
        "certo": "I enjoy listening to music. ✔️",
        "motivo": "'Enjoy' rege gerúndio (-ing). Dizer 'enjoy to listen' é incorreto."
      },
      {
        "errado": "Thank you for to help me. ❌",
        "certo": "Thank you for helping me. ✔️",
        "motivo": "'For' é preposição e exige verbo com '-ing'. Nunca use 'for to'."
      },
      {
        "errado": "She is good in to cook. ❌",
        "certo": "She is good at cooking. ✔️",
        "motivo": "A expressão fixa é 'good AT' seguida de verbo com '-ing' ('cooking')."
      },
      {
        "errado": "He stopped to smoke two years ago. (quando quer dizer que largou o vício) ❌",
        "certo": "He stopped smoking two years ago. ✔️",
        "motivo": "'Stop smoking' = abandonar o vício. 'Stop to smoke' = fazer uma pausa para acender um cigarro."
      }
    ],
    "coda": "Intenções e planos futuros pedem 'TO'; hábitos e processos pedem '-ING'; e depois de preposição? O '-ING' é rei absoluto!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com a regência correta de 'decide':\n\n\"We have decided ___ our holiday in Greece this summer.\"",
        "opcoes": ["to spend", "spending", "spend", "for spending"],
        "resposta": "to spend",
        "explicacao": "'Decide' rege infinitivo com 'to': 'decided to spend'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a regência correta de 'enjoy':\n\n\"My parents really enjoy ___ long walks along the coastline.\"",
        "opcoes": ["taking", "to take", "take", "for take"],
        "resposta": "taking",
        "explicacao": "'Enjoy' rege obrigatoriamente gerúndio com '-ing': 'enjoy taking'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a oração que contém uma preposição:\n\n\"He left the conference room without ___ a single word.\"",
        "opcoes": ["saying", "to say", "say", "said"],
        "resposta": "saying",
        "explicacao": "'Without' é preposição, logo o verbo seguinte recebe '-ing' (saying)."
      },
      {
        "tipo": "escolha",
        "pergunta": "Se alguém diz: \"I stopped drinking coffee last month\", o que ela fez?",
        "opcoes": [
          "Ela abandonou completamente o consumo de café.",
          "Ela fez uma pausa na caminhada para comprar um café.",
          "Ela começou a tomar café com mais frequência.",
          "Ela prefere café gelado a café quente."
        ],
        "resposta": "Ela abandonou completamente o consumo de café.",
        "explicacao": "'Stop + -ing' significa cessar ou abandonar uma atividade/hábito."
      },
      {
        "tipo": "revelar",
        "pergunta": "Por que a frase *\"Thank you for invite me\"* é um erro muito comum de brasileiros?",
        "resposta": "Porque em português usamos o infinitivo ('por convidar'), mas em inglês a preposição 'for' exige obrigatoriamente que o verbo receba a terminação '-ing': *\"Thank you for INVITING me\"*.",
        "explicacao": "Regra da preposição: Preposição + verbo-ing."
      },
      {
        "tipo": "revelar",
        "pergunta": "Qual a diferença entre *\"I remember locking the door\"* e *\"I remembered to lock the door\"*?",
        "resposta": "A frase 1 significa que tenho a memória visual na minha cabeça de ter trancado a porta. A frase 2 significa que eu não me esqueci do compromisso e tranquei a porta.",
        "explicacao": "Remember + -ing = lembrança de fato passado; Remember + to = lembrar-se de cumprir um dever."
      },
      {
        "tipo": "revelar",
        "pergunta": "Qual forma verbal deve ser usada ao transformar um verbo no sujeito da frase? Exemplo: (Fumar) é prejudicial à saúde.",
        "resposta": "Usa-se o gerúndio com '-ing': *\"Smoking is harmful to health.\"*",
        "explicacao": "Verbos no papel de sujeito assumem forma de gerúndio."
      },
      {
        "tipo": "revelar",
        "pergunta": "O verbo 'avoid' (evitar) rege infinitivo com 'to' ou gerúndio com '-ing'?",
        "resposta": "Rege gerúndio com '-ing': *\"She avoids driving at night.\"*",
        "explicacao": "Avoid + -ing."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com o verbo 'learn' na forma correta após 'hope':\n\n\"I hope ___ to speak fluent English by next year.\"",
        "resposta": "to learn",
        "explicacao": "'Hope' rege infinitivo com 'to'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com o verbo 'swim' após a preposição 'at':\n\n\"Lucas is exceptionally good at ___ in open waters.\"",
        "resposta": "swimming",
        "explicacao": "Preposição 'at' exige verbo com -ing (dobrando o 'm': swimming)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com o verbo 'watch' após 'enjoy':\n\n\"We really enjoyed ___ the football match yesterday.\"",
        "resposta": "watching",
        "explicacao": "Enjoy rege gerúndio (watching)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com o verbo 'promise' seguido de 'help' no infinitivo:\n\n\"She promised ___ me with my homework.\"",
        "resposta": "to help",
        "explicacao": "'Promised to help' é a regência de promise."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON A2.18: Too and Enough
  // ─────────────────────────────────────────────────────────────
  "a2-lez18": {
    "id": "a2-lez18",
    "num": "Lesson 18",
    "titulo": "Too and Enough",
    "subtitulo": "Medindo Excessos e Suficiências — Too Hot vs Warm Enough",
    "cena": {
      "origem": "dialogo",
      "titulo": "Renting a New Office Space",
      "texto": "**Real Estate Agent:** How do you find this commercial office space on Oxford Street?\n**Client:** The location is fantastic, but the monthly rent is simply too expensive for our startup budget.\n**Real Estate Agent:** What about the office on Baker Street?\n**Client:** That one isn't big enough for our team of twelve developers. We need a room with enough space for modern workstations and private cabins."
    },
    "fio": {
      "abertura": "No trabalho e na vida prática, precisamos qualificar se algo é excessivo ('muito caro para podermos comprar') ou se é suficiente ('espaçoso o bastante para caber todo mundo').",
      "descoberta": "O inglês faz isso com duas palavras mestras: «TOO» (que indica um excesso negativo indesejado) e «ENOUGH» (que indica suficiência). Mas atenção à coreografia de 'ENOUGH': com adjetivos, ele vai DEPOIS da palavra (*warm enough*), e com substantivos, ele vai ANTES da palavra (*enough money*)!",
      "fecho": "Ao dominar a posição exata de 'too' e 'enough', você calibrará medidas, orçamentos e condições com máxima elegância."
    },
    "alerta": "A posição de ENOUGH com adjetivos: NUNCA diga *'enough big'* ou *'enough warm'*! Com adjetivos e advérbios, 'enough' fica SEMPRE DEPOIS: 'big enough', 'fast enough', 'old enough'!",
    "definicao": {
      "fenomeno": "It is too hot to drink · He isn't old enough to drive · We have enough time · Too much sugar · Too many people",
      "causa": "Como o inglês quantifica graus de excesso problemático ou de suficiência?",
      "conceito": "'Too' expressa excesso além do limite aceitável ou desejável (posicionado antes de adjetivos). 'Enough' expressa suficiência satisfatória: posicionado DEPOIS de adjetivos/advérbios (*tall enough*) e ANTES de substantivos (*enough chairs*). Ambos frequentemente se conectam ao infinitivo 'to + verbo'."
    },
    "inventario": [
      "Usar 'too + adjetivo' para indicar excesso negativo (too cold, too expensive)",
      "Posicionar 'enough' DEPOIS de adjetivos e advérbios (warm enough, well enough)",
      "Posicionar 'enough' ANTES de substantivos (enough money, enough chairs)",
      "Conectar 'too / enough' ao infinitivo de consequência: 'too tired to drive' / 'rich enough to buy'",
      "Distinguir 'too much' (incontáveis) de 'too many' (contáveis no plural)"
    ],
    "tabela_visual": "| Elemento | Estrutura Gramatical | Exemplo em Inglês | Tradução em Português |\n|---|---|---|---|\n| **TOO** | **too** + Adjetivo | The coffee is **too hot** to drink. | O café está quente demais para beber. |\n| **ENOUGH (Adjetivo)** | Adjetivo + **enough** | He isn't **old enough** to vote. | Ele não é velho o bastante para votar. |\n| **ENOUGH (Substantivo)** | **enough** + Substantivo | Do we have **enough money**? | Nós temos dinheiro suficiente? |\n| **TOO MUCH** | **too much** + Incontável | There is **too much salt** in the soup. | Tem sal demais na sopa. |\n| **TOO MANY** | **too many** + Plural Contável | There are **too many cars** in the city. | Há carros demais na cidade. |",
    "observacao_cards": [
      {
        "ingles": "Too expensive",
        "traducao": "Caro demais (excesso negativo)",
        "genero": "Too + Adjetivo",
        "motivo": "'Too' indica que ultrapassa o limite aceitável: 'I can't buy it, it's too expensive'."
      },
      {
        "ingles": "Old enough",
        "traducao": "Velho o bastante / Idade suficiente",
        "genero": "Adjetivo + Enough",
        "motivo": "Com adjetivos, 'enough' fica obrigatoriamente depois: 'She is old enough to drive'."
      },
      {
        "ingles": "Enough money / Enough time",
        "traducao": "Dinheiro suficiente / Tempo suficiente",
        "genero": "Enough + Substantivo",
        "motivo": "Com substantivos, 'enough' fica antes da palavra, como no português."
      },
      {
        "ingles": "Too tired to work",
        "traducao": "Cansado demais para trabalhar",
        "genero": "Too + Adj + To Infinitive",
        "motivo": "A estrutura expressa a impossibilidade de realizar a ação seguinte."
      },
      {
        "ingles": "Too much vs Too many",
        "traducao": "Demais (incontável vs contável)",
        "genero": "Quantificadores de Excesso",
        "motivo": "Too much sugar / too much traffic. Too many mistakes / too many questions."
      },
      {
        "ingles": "Very vs Too",
        "traducao": "Muito vs Excessivo/Demais",
        "genero": "Distinção Crítica",
        "motivo": "'Very hot' = está muito quente (mas posso gostar); 'Too hot' = está quente demais (não consigo beber)."
      }
    ],
    "tecnica": {
      "passo1": "Se quiser indicar excesso problemático, use 'TOO' antes do adjetivo (*too cold*) ou 'too much / many' antes de substantivos.",
      "passo2": "Se for suficiência com ADJETIVO, coloque 'ENOUGH' logo DEPOIS: *smart enough*, *strong enough*.",
      "passo3": "Se for suficiência com SUBSTANTIVO, coloque 'ENOUGH' logo ANTES: *enough chairs*, *enough experience*."
    },
    "teoria": "A calibragem de quantidade e grau em inglês exige atenção especial à colocação das palavras e à conotação de valor.\n\n### 1. A Diferença Fundamental: Very vs Too\n* **VERY:** Apenas intensifica o adjetivo em grau elevado, sem conotação negativa intrínseca:\n  * *The tea is very hot, just how I like it!* (O chá está bem quente, exatamente como gosto).\n* **TOO:** Aponta para um excesso indesejado que impede ou dificulta algo:\n  * *The tea is too hot to drink; I'll burn my tongue.* (O chá está quente demais para beber; vou queimar a língua).\n\n### 2. A Coreografia de 'ENOUGH'\nEsta é a regra que mais derruba estudantes:\n* **Com Adjetivos e Advérbios -> Fica DEPOIS:**\n  * *Is the water warm enough?* (A água está quente o suficiente?).\n  * *She spoke loudly enough for everyone to hear.* (Ela falou alto o bastante).\n* **Com Substantivos -> Fica ANTES:**\n  * *We don't have enough flour to bake a cake.* (Não temos farinha suficiente).\n  * *Are there enough chairs for all the guests?* (Há cadeiras suficientes?).\n\n### 3. A Estrutura de Consequência: [Too / Enough] ... TO + Verbo\nFrequentemente ligamos essas palavras a um infinitivo que explica a consequência:\n* *He is too young to watch this film.* (Jovem demais para assistir).\n* *She is experienced enough to lead the department.* (Experiente o bastante para liderar).",
    "ponte": "Em português, nós dizemos 'ele é inteligente o suficiente' (depois) ou 'ele tem suficiente inteligência' (antes). Mas no caso de 'grande', dizemos 'grande o suficiente'. No entanto, muitos brasileiros traduzem 'o suficiente' antes do adjetivo e dizem *'He is enough tall'*. Essa ordem invertida soa extremamente bizarra em inglês. Guarde a rima: 'Com adjetivo na jogada, ENOUGH fica no final da parada!' (*tall enough*).",
    "exemplos_prc": [
      {
        "oracao": "The sea is too rough for swimming today.",
        "pergunta": "Por que não é aconselhável nadar hoje?",
        "resposta": "Porque o mar está agitado além do limite de segurança ('too rough').",
        "conclusao": "'Too + adjetivo' expressa excesso problemático ou perigoso."
      },
      {
        "oracao": "Lucas isn't tall enough to reach the top shelf of the bookcase.",
        "pergunta": "Qual é a posição de 'enough' em relação ao adjetivo 'tall'?",
        "resposta": "'Enough' fica imediatamente após o adjetivo 'tall' ('tall enough').",
        "conclusao": "Adjetivo + enough é a ordem sintática obrigatória."
      },
      {
        "oracao": "Do you have enough petrol in the car to drive to Manchester?",
        "pergunta": "Por que 'enough' vem antes de 'petrol'?",
        "resposta": "Porque 'petrol' (gasolina) é um substantivo, e 'enough' precede substantivos.",
        "conclusao": "'Enough + substantivo' qualifica a suficiência do recurso."
      },
      {
        "oracao": "You are putting too much sugar into your morning espresso.",
        "pergunta": "Por que foi usado 'too much' em vez de 'too many'?",
        "resposta": "Porque 'sugar' é uma substância incontável.",
        "conclusao": "'Too much' quantifica excesso de substantivos incontáveis."
      }
    ],
    "armadilhas": [
      {
        "errado": "He is enough strong to lift that weight. ❌",
        "certo": "He is strong enough to lift that weight. ✔️",
        "motivo": "'Enough' deve vir DEPOIS do adjetivo 'strong'."
      },
      {
        "errado": "This soup is too much hot. ❌",
        "certo": "This soup is too hot. ✔️",
        "motivo": "Com adjetivos diretos, use apenas 'too' (*too hot*). 'Too much' é reservado para substantivos incontáveis (*too much soup*)."
      },
      {
        "errado": "There are too much people on this train. ❌",
        "certo": "There are too many people on this train. ✔️",
        "motivo": "'People' é plural contável, exigindo 'too many'."
      },
      {
        "errado": "I am very tired to drive. ❌",
        "certo": "I am too tired to drive. ✔️",
        "motivo": "Quando a intenção é indicar que o cansaço me impede de dirigir, a estrutura obrigatória é 'too... to'."
      }
    ],
    "coda": "Excesso negativo pede 'TOO' na frente; suficiência pede 'ENOUGH' depois do adjetivo e antes do substantivo!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Qual frase posiciona a palavra 'enough' com precisão gramatical?",
        "opcoes": [
          "She is experienced enough to manage the project.",
          "She is enough experienced to manage the project.",
          "She is enough experience to manage the project.",
          "She has experienced enough to manage the project."
        ],
        "resposta": "She is experienced enough to manage the project.",
        "explicacao": "Com adjetivos ('experienced'), 'enough' posiciona-se imediatamente após: 'experienced enough'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o termo correto para indicar excesso negativo com adjetivo:\n\n\"The music in the club was ___ loud to have a conversation.\"",
        "opcoes": ["too", "very", "enough", "too much"],
        "resposta": "too",
        "explicacao": "'Too loud to...' indica que o volume excessivo impedia a conversa."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o quantificador adequado para substantivo contável no plural:\n\n\"There are ___ mistakes in this financial document.\"",
        "opcoes": ["too many", "too much", "too", "enough many"],
        "resposta": "too many",
        "explicacao": "Mistakes é contável no plural, exigindo 'too many'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a pergunta sobre recursos materiais:\n\n\"Do we have ___ to purchase the tickets today?\"",
        "opcoes": ["enough money", "money enough", "too money", "many money"],
        "resposta": "enough money",
        "explicacao": "Com substantivos, 'enough' antecede a palavra: 'enough money'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Por que a frase *\"This jacket is enough warm for winter\"* é um erro clássico?",
        "resposta": "Porque com adjetivos, a palavra 'enough' deve ser posicionada obrigatoriamente DEPOIS dele: *\"This jacket is warm enough for winter\"*.",
        "explicacao": "Adjetivo + enough."
      },
      {
        "tipo": "revelar",
        "pergunta": "Qual a diferença entre *\"This car is very fast\"* e *\"This car is too fast\"*?",
        "resposta": "'Very fast' significa que o carro tem uma velocidade alta admirável. 'Too fast' significa que ele é rápido além da conta, tornando-se perigoso ou incontrolável.",
        "explicacao": "Very = intensidade positiva/neutra; Too = excesso indesejável."
      },
      {
        "tipo": "revelar",
        "pergunta": "Quando devemos usar *'too much'* e quando devemos usar *'too many'*?",
        "resposta": "Usa-se 'too much' com substantivos incontáveis no singular (*too much noise, too much water*). Usa-se 'too many' com substantivos contáveis no plural (*too many cars, too many emails*).",
        "explicacao": "Too much = incontáveis; Too many = contáveis plurais."
      },
      {
        "tipo": "revelar",
        "pergunta": "Como se diz: \"Ele é esperto o suficiente para entender a situação\"?",
        "resposta": "\"He is smart enough to understand the situation.\"",
        "explicacao": "Smart enough to understand."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com 'too' ou 'enough':\n\n\"The box is ___ heavy for me to carry alone.\"",
        "resposta": "too",
        "explicacao": "'Too heavy to carry' indica excesso de peso que impede a ação."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com 'too much' ou 'too many':\n\n\"You drink ___ coffee during working hours; it causes anxiety.\"",
        "resposta": "too much",
        "explicacao": "Coffee é incontável, exigindo 'too much'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete a frase garantindo a posição correta de 'enough':\n\n\"The weather is warm ___ for an outdoor picnic.\" (o suficiente)",
        "resposta": "enough",
        "explicacao": "'Warm enough' (enough após o adjetivo warm)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com o quantificador de contáveis:\n\n\"There were ___ cars parked on the sidewalk.\" (carros demais)",
        "resposta": "too many",
        "explicacao": "Too many cars."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON A2.19: So and Neither
  // ─────────────────────────────────────────────────────────────
  "a2-lez19": {
    "id": "a2-lez19",
    "num": "Lesson 19",
    "titulo": "So and Neither",
    "subtitulo": "Concordâncias e Ecos — So Do I, Neither Am I e Respostas Espelhadas",
    "cena": {
      "origem": "dialogo",
      "titulo": "Connecting with a New Colleague",
      "texto": "**Liam:** I love classical music and jazz.\n**Sophia:** So do I! I frequently attend the symphony orchestra concerts downtown.\n**Liam:** That's amazing. I'm not very fond of noisy night clubs, though.\n**Sophia:** Neither am I. I much prefer quiet cafes with good books.\n**Liam:** I can speak three languages.\n**Sophia:** So can I! English, French, and Spanish."
    },
    "fio": {
      "abertura": "Em qualquer conversa humana, queremos demonstrar afinidade e dizer: 'Eu também!' ou 'Eu também não!'.",
      "descoberta": "Enquanto em português repetimos apenas duas palavras ('eu também'), o inglês constrói um eco musical espelhado! Se a frase original for positiva, usamos «SO + Auxiliar + Sujeito» (*So do I / So am I*). Se a frase for negativa, usamos «NEITHER + Auxiliar + Sujeito» (*Neither do I / Neither can I*). O auxiliar espelha perfeitamente o tempo do verbo que a outra pessoa acabou de dizer!",
      "fecho": "Ao dominar o espelhamento com So e Neither, suas conversas ganham a rapidez, o charme e a cumplicidade típicos de quem fala inglês de verdade."
    },
    "alerta": "O auxiliar correto é a chave: Se a pessoa disse 'I am tired', você responde 'So AM I' (usando To Be). Se ela disse 'I work hard', você responde 'So DO I' (usando o auxiliar do presente). Responder 'So am I' para um verbo de ação é um dos erros mais constrangedores que existem!",
    "definicao": {
      "fenomeno": "A: I like coffee. B: So do I · A: I can't swim. B: Neither can I · A: I was late. B: So was I",
      "causa": "Como o inglês expressa concordância com afirmações e negações anteriores?",
      "conceito": "'So' introduz concordância com declarações afirmativas ('também'). 'Neither' (ou 'Nor') introduz concordância com declarações negativas ('também não'). A estrutura gramatical inverte a ordem sintática para: Palavra de Concordância + Verbo Auxiliar Correspondente + Sujeito."
    },
    "inventario": [
      "Espelhar frases afirmativas com 'So + auxiliar + sujeito' (So do I, So does he)",
      "Espelhar frases negativas com 'Neither + auxiliar + sujeito' (Neither do I, Neither is she)",
      "Selecionar o verbo auxiliar idêntico ao tempo da frase-mãe (be, do/does, did, can, have)",
      "Reconhecer as opções coloquiais curtas 'Me too' (para afirmativas) e 'Me neither' (para negativas)",
      "Evitar o vício clássico de brasileiros de responder *'I also'* ou *'I neither'* ❌"
    ],
    "tabela_visual": "| Declaração Original | Tipo | Resposta Formal / Padrão | Resposta Coloquial Rápida |\n|---|---|---|---|\n| I **am** hungry. | Afirmativa (To Be) | **So am I.** | Me too. |\n| I **live** in London. | Afirmativa (Present Simple) | **So do I.** | Me too. |\n| I **watched** the match. | Afirmativa (Past Simple) | **So did I.** | Me too. |\n| I **can** drive. | Afirmativa (Modal Can) | **So can I.** | Me too. |\n| I **am not** tired. | Negativa (To Be) | **Neither am I.** | Me neither. |\n| I **don't like** spicy food. | Negativa (Present Simple) | **Neither do I.** | Me neither. |\n| I **haven't seen** that movie. | Negativa (Present Perfect) | **Neither have I.** | Me neither. |",
    "observacao_cards": [
      {
        "ingles": "So do I (/soʊ duː aɪ/)",
        "traducao": "Eu também (para verbos no Present Simple)",
        "genero": "Eco do Presente",
        "motivo": "Responde a verbos gerais: 'I speak French' -> 'So do I'."
      },
      {
        "ingles": "So am I (/soʊ æm aɪ/)",
        "traducao": "Eu também (para verbo To Be)",
        "genero": "Eco do To Be",
        "motivo": "Responde a 'am/is/are': 'I am very excited' -> 'So am I'."
      },
      {
        "ingles": "Neither do I (/ˈnaɪðər duː aɪ/)",
        "traducao": "Eu também não",
        "genero": "Eco Negativo do Presente",
        "motivo": "Responde a negações com don't: 'I don't eat meat' -> 'Neither do I'."
      },
      {
        "ingles": "Neither can I",
        "traducao": "Eu também não posso/consigo",
        "genero": "Eco de Modal Negativo",
        "motivo": "Responde a 'can't': 'I can't swim' -> 'Neither can I'."
      },
      {
        "ingles": "Me too / Me neither",
        "traducao": "Eu também / Eu também não",
        "genero": "Oralidade Informal",
        "motivo": "Formas curtas muito usadas entre amigos, embora menos elegantes em reuniões formais."
      },
      {
        "ingles": "Nor can I",
        "traducao": "Nem eu (sinônimo de Neither)",
        "genero": "Variante Formal",
        "motivo": "'Nor' pode substituir 'Neither' com o mesmo sentido exato."
      }
    ],
    "tecnica": {
      "passo1": "A frase dita pela outra pessoa é afirmativa ou negativa? Se for positiva, comece com SO; se for negativa, comece com NEITHER.",
      "passo2": "Identifique o auxiliar oculto ou explícito da frase dela: é To Be (am/is/are)? É Present Simple (do/does)? É Past Simple (did)? É modal (can/will)?",
      "passo3": "Monte o sanduíche espelhado: [SO ou NEITHER] + [AUXILIAR] + [SUJEITO]: *So did we!* / *Neither do they!*."
    },
    "teoria": "O sistema de concordância com 'So' e 'Neither' é um dos mais representativos da lógica oracional do inglês, onde a brevidade é conquistada através do uso virtuoso dos verbos auxiliares.\n\n### 1. A Dança dos Auxiliares\nVocê nunca repete o verbo principal inteiro. Você captura apenas a 'chave de ignição' da frase:\n* *A: I bought a new bicycle yesterday.* -> O verbo é *bought* (Past Simple afirmativo, auxiliar *did*). -> *B: So did I!* (Eu também comprei!).\n* *A: She has already traveled to Egypt.* -> O verbo usa auxiliar *has*. -> *B: So have I!* (Eu também já viajei!).\n* *A: I will attend the conference.* -> O verbo usa o modal *will*. -> *B: So will I!* (Eu também irei!).\n\n### 2. A Negação com NEITHER\nComo a palavra 'Neither' já contém o 'N' de negação incorporado, o verbo auxiliar que vem logo após fica OBRIGATORIAMENTE AFIRMATIVO:\n* *A: I don't speak Russian.* -> *B: Neither DO I.* (E NUNCA *Neither don't I* ❌, pois seria dupla negação!).\n* *A: I was not at home yesterday.* -> *B: Neither WAS I.* (E nunca *Neither wasn't I* ❌).\n\n### 3. A Linguagem Informal: Me Too vs Me Neither\nEm conversas descontraídas entre amigos, é muito comum resumir:\n* Positivo: *I love this song!* -> *Me too!* (Eu também!).\n* Negativo: *I don't like horror movies.* -> *Me neither!* (Eu também não!).\n* Cuidado: Nunca diga *Me too* para responder a uma frase negativa!",
    "ponte": "No Brasil, quando alguém diz 'Eu trabalho muito', nós dizemos 'Eu também'. E se alguém diz 'Eu não fumo', nós dizemos 'Eu também não'. O erro fatal de brasileiros que aprendem inglês é traduzir a palavra 'também' literalmente como 'also' e dizer *'I also'* ou *'I neither'*. Isso não existe em inglês! Ou você usa as formas clássicas *'So do I / Neither do I'*, ou usa as opções informais *'Me too / Me neither'*. Jamais diga *'I also'*!",
    "exemplos_prc": [
      {
        "oracao": "A: I have lived in London for five years. B: So have I.",
        "pergunta": "Por que a pessoa B respondeu com 'So have I'?",
        "resposta": "Porque a frase original está no Present Perfect (auxiliar 'have') afirmativo.",
        "conclusao": "'So + have + I' espelha afirmações no Present Perfect."
      },
      {
        "oracao": "A: I didn't understand the last question. B: Neither did I.",
        "pergunta": "Como foi construída a concordância negativa no passado?",
        "resposta": "Com 'Neither' + auxiliar do passado afirmativo 'did' + sujeito 'I'.",
        "conclusao": "'Neither did I' expressa concordância com negações no Past Simple."
      },
      {
        "oracao": "A: He is extremely proud of his daughter. B: So is his wife.",
        "pergunta": "Por que o sujeito da resposta é 'his wife' e o verbo é 'is'?",
        "resposta": "Porque a concordância é feita em relação a uma terceira pessoa ('his wife'), mantendo o verbo To Be.",
        "conclusao": "A estrutura 'So/Neither + auxiliar + sujeito' adapta-se a qualquer sujeito."
      },
      {
        "oracao": "A: I can't play any musical instrument. B: Neither can I.",
        "pergunta": "Qual modal foi espelhado na resposta?",
        "resposta": "O modal de habilidade 'can' em concordância com a negação inicial.",
        "conclusao": "Modais como 'can' são espelhados diretamente sem o uso de 'do'."
      }
    ],
    "armadilhas": [
      {
        "errado": "A: I like ice cream. B: I also! ❌",
        "certo": "A: I like ice cream. B: So do I! / Me too! ✔️",
        "motivo": "'I also' é uma tradução literal errada do português. Use 'So do I' ou 'Me too'."
      },
      {
        "errado": "A: I don't drink beer. B: Me too! ❌",
        "certo": "A: I don't drink beer. B: Neither do I! / Me neither! ✔️",
        "motivo": "Nunca responda 'Me too' a uma frase negativa. Concordâncias com negação exigem 'Neither do I' ou 'Me neither'."
      },
      {
        "errado": "Neither don't I. ❌",
        "certo": "Neither do I. ✔️",
        "motivo": "'Neither' já é negativo; o auxiliar após ele deve ficar afirmativo para evitar dupla negação."
      },
      {
        "errado": "A: I work at a hospital. B: So am I. ❌",
        "certo": "A: I work at a hospital. B: So do I. ✔️",
        "motivo": "O verbo 'work' é de ação no presente e seu auxiliar é 'do' (e não o verbo To Be 'am')."
      }
    ],
    "coda": "Frase afirmativa? 'So' + auxiliar + sujeito. Frase negativa? 'Neither' + auxiliar + sujeito. E o 'I also'? Esse fica banido para sempre!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Qual é a resposta de concordância correta para:\n\n\"Liam: I really love Japanese food.\"",
        "opcoes": ["So do I.", "So am I.", "I also.", "Neither do I."],
        "resposta": "So do I.",
        "explicacao": "Love é um verbo no Present Simple (auxiliar do), exigindo 'So do I'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual é a resposta de concordância para a frase negativa:\n\n\"Chloe: I haven't finished reading the annual report yet.\"",
        "opcoes": ["Neither have I.", "Neither do I.", "So haven't I.", "Me too."],
        "resposta": "Neither have I.",
        "explicacao": "A oração usa o auxiliar 'haven't', logo a resposta espelhada é 'Neither have I'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Como concordar com: \"I was very busy yesterday afternoon\"?",
        "opcoes": ["So was I.", "So did I.", "So were I.", "Neither was I."],
        "resposta": "So was I.",
        "explicacao": "O verbo é 'was' (Passado do To Be), espelhado como 'So was I'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual das seguintes respostas informais é correta para: \"I don't like waking up early\"?",
        "opcoes": ["Me neither.", "Me too.", "I also don't.", "So neither."],
        "resposta": "Me neither.",
        "explicacao": "'Me neither' é a concordância curta informal legítima para declarações negativas."
      },
      {
        "tipo": "revelar",
        "pergunta": "Por que responder *\"I also\"* quando alguém diz *\"I live in Brazil\"* é um erro muito marcante de falantes de português?",
        "resposta": "Porque em inglês 'also' é um advérbio que precisa de um verbo completo na frase (*I also live in Brazil*). Para respostas curtas e reativas de eco, o idioma exige a construção com inversão: *\"So do I\"* (ou a forma coloquial *\"Me too\"*).",
        "explicacao": "'I also' é decalque incorreto do português."
      },
      {
        "tipo": "revelar",
        "pergunta": "Por que a resposta para *\"I didn't watch the game\"* é *\"Neither did I\"* e não *\"Neither didn't I\"*?",
        "resposta": "Porque 'Neither' já traz a conotação negativa em si mesmo; colocar 'didn't' geraria uma dupla negação proibida na norma culta da língua inglesa.",
        "explicacao": "Neither + auxiliar afirmativo."
      },
      {
        "tipo": "revelar",
        "pergunta": "Como concordar afirmativamente com a frase: *\"I can swim across the lake\"*?",
        "resposta": "\"So can I!\"",
        "explicacao": "O modal 'can' é repetido diretamente: So can I."
      },
      {
        "tipo": "revelar",
        "pergunta": "Complete o diálogo: A: *\"I am not going to the party tonight.\"* B: *\"___\"* (nem eu).",
        "resposta": "\"Neither am I!\" (ou informalmente \"Me neither!\").",
        "explicacao": "Neither am I espelha a negação do verbo To Be no presente."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete a resposta afirmativa de eco:\n\n\"A: I play tennis on weekends. B: So ___ I.\"",
        "resposta": "do",
        "explicacao": "Play no Present Simple espelha-se com 'do'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que inicia a concordância negativa:\n\n\"A: I don't drink alcohol. B: ___ do I.\"",
        "resposta": "Neither",
        "explicacao": "Neither é a palavra inicial de concordância negativa."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete o eco no tempo passado:\n\n\"A: I visited the museum yesterday. B: So ___ I.\"",
        "resposta": "did",
        "explicacao": "Visited está no Past Simple, cujo auxiliar é 'did'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete a resposta espelhada com o verbo To Be:\n\n\"A: I am ready to start. B: So ___ I.\"",
        "resposta": "am",
        "explicacao": "Am é o verbo To Be correspondente a I."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON A2.20: First Conditional
  // ─────────────────────────────────────────────────────────────
  "a2-lez20": {
    "id": "a2-lez20",
    "num": "Lesson 20",
    "titulo": "First Conditional",
    "subtitulo": "Causa e Efeito Real no Futuro — If + Present Simple, Will + Verbo Base",
    "cena": {
      "origem": "dialogo",
      "titulo": "Planning Tomorrow's Outdoor Excursion",
      "texto": "**Emma:** Are we still going hiking in the national park tomorrow, Noah?\n**Noah:** If the weather is sunny, we will hike up to the mountain peak.\n**Emma:** And what will we do if it rains heavily in the morning?\n**Noah:** If it rains, we will stay at the lodge and visit the local botanical museum instead.\n**Emma:** Sounds like a great plan. Unless there is a storm, we'll have a wonderful day!"
    },
    "fio": {
      "abertura": "Bem-vindo à lição final do Módulo A2! Agora você junta tudo o que aprendeu para formular previsões lógicas e condições da vida real.",
      "descoberta": "O First Conditional (Primeira Condicional) serve para situações reais e prováveis no futuro: 'Se acontecer X, acontecerá Y'. A fórmula matemática é: «IF + Present Simple» na oração da condição, e «WILL + Verbo Base» na oração do resultado! E o mais fascinante: você também pode usar «UNLESS», que significa exatamente 'a não ser que / a menos que'!",
      "fecho": "Com o First Conditional dominado, você fecha o Módulo A2 no topo, pronto para negociar, fazer acordos e prever cenários com total maestria."
    },
    "alerta": "A armadilha número um de todas as provas e conversas: NUNCA coloque 'will' dentro da oração que começa com 'IF'! Nativos NUNCA dizem *'If it will rain'* ❌! O 'if' obriga o verbo a ficar no PRESENTE: 'If it rains, we will stay home' ✔️!",
    "definicao": {
      "fenomeno": "If you study hard, you will pass the exam · If it rains, I'll take an umbrella · We won't go unless you come",
      "causa": "Como o inglês conecta uma condição presente viável a uma consequência futura garantida?",
      "conceito": "O First Conditional expressa uma condição real, concreta e de alta probabilidade no futuro. A cláusula condicional introduzida por 'if' fica no Present Simple; a cláusula do resultado principal projeta o desfecho com 'will / won't + verbo base'."
    },
    "inventario": [
      "Aplicar a fórmula: If + Present Simple, will/won't + verbo base",
      "Evitar categoricamente colocar 'will' dentro da cláusula com 'if'",
      "Inverter a ordem das orações sem alterar o sentido (e sem vírgula quando 'if' fica no meio)",
      "Empregar 'unless' como equivalente perfeito de 'if not' (a menos que / a não ser que)",
      "Substituir 'will' por modais de conselho ou possibilidade (can, may, should) na oração principal quando apropriado"
    ],
    "tabela_visual": "| Posição da Condição | Cláusula Condicional (IF) | Cláusula do Resultado (WILL) | Uso de Vírgula |\n|---|---|---|---|\n| **IF no Início** | **If** it **rains** tomorrow, | we **will cancel** the match. | **Obrigatória** após a cláusula do If |\n| **IF no Meio** | We **will cancel** the match | **if** it **rains** tomorrow. | **Sem vírgula** |\n| **UNLESS (= if not)** | **Unless** you **hurry**, | you **will miss** the train. | A menos que você se apresse... |\n| **Com Modal** | **If** you **feel** sick, | you **should see** a doctor. | Conselho condicionado ao presente |",
    "observacao_cards": [
      {
        "ingles": "If it rains, we will stay",
        "traducao": "Se chover, nós ficaremos",
        "genero": "Estrutura Clássica",
        "motivo": "'Rains' fica no Present Simple (com -s); 'will stay' expressa o resultado futuro."
      },
      {
        "ingles": "Unless you invite him",
        "traducao": "A menos que você o convide / Se você não o convidar",
        "genero": "Unless (= If not)",
        "motivo": "'Unless' já é negativo em sentido; a oração fica com verbo afirmativo: 'Unless you invite him, he won't come'."
      },
      {
        "ingles": "If you heat water to 100°C",
        "traducao": "Zero vs First Conditional",
        "genero": "Fato Universal vs Futuro Real",
        "motivo": "Fatos científicos usam presente nas duas pontas (Zero Conditional: it boils). O First Conditional foca no futuro específico (First: it will boil)."
      },
      {
        "ingles": "I'll call you if...",
        "traducao": "Eu te ligo se...",
        "genero": "Ordem Invertida",
        "motivo": "Quando a oração principal vem antes, a vírgula é dispensada: 'I'll call you if I arrive early'."
      },
      {
        "ingles": "If + he/she/it (-s)",
        "traducao": "Atenção à 3ª pessoa",
        "genero": "Gramática de Precisão",
        "motivo": "Lembre-se da regra do Present Simple na condição: 'If he COMES', 'If she CALLS'."
      },
      {
        "ingles": "As soon as / When",
        "traducao": "Assim que / Quando (Conectores Temporais)",
        "genero": "Conectivos Próximos",
        "motivo": "Funcionam com a mesma regra sintática do 'if': 'I will tell him as soon as he arrives'."
      }
    ],
    "tecnica": {
      "passo1": "Localize a palavra 'IF': o verbo que vem colado nele DEVE ficar no Present Simple (cuidado com o -s para he/she/it!).",
      "passo2": "Localize a outra oração (o resultado): coloque 'WILL' ou 'WON'T' seguido do verbo na forma base.",
      "passo3": "Se a frase começar com 'If', coloque uma vírgula antes do resultado; se começar com o resultado, não use vírgula."
    },
    "teoria": "O First Conditional marca a transição definitiva para o pensamento analítico e estratégico em inglês. Ele é a ferramenta usada para prever riscos, fazer promessas condicionais, planejar acordos comerciais e dar ultimatos.\n\n### 1. A Arquitetura das Duas Orações\n* **Oração Condicional (Subordinate Clause):** Apresenta o gatilho da realidade viável. Usa **Present Simple**:\n  * *If you press this red button...*\n* **Oração Principal (Main Clause):** Apresenta o desfecho que será disparado no futuro. Usa **Will + Verbo Base**:\n  * *...the alarm will sound immediately.*\n\n### 2. O Pecado Mortal do Inglês: *If it will...*\nPor que nativos nunca usam 'will' dentro da oração do 'if'? Porque o 'if' já carrega em si a hipótese e a futuridade. Adicionar 'will' seria uma redundância sintática inaceitável. Memorize como um mantra: **O 'WILL' TEM ALERGIA AO 'IF'**!\n* *If I will have time, I will call you.* ❌\n* *If I have time, I will call you.* ✔️\n\n### 3. O Poder de UNLESS\n'Unless' significa literalmente 'a não ser que' ou 'a menos que'. É o equivalente de 'if... not':\n* *You will fail the exam unless you study.* = *You will fail the exam if you do not study.*\n* Cuidado: Como 'unless' já significa 'se não', o verbo que vem logo após ele fica na afirmativa (*Unless it rains*, e nunca *Unless it doesn't rain* ❌).\n\n### 4. Variações com Modais de Conselho e Permissão\nNa oração principal, 'will' pode ser substituído por outros verbos modais dependendo da nuance desejada:\n* *If you finish early, you **can** go home.* (Permissão).\n* *If you feel tired, you **should** take a nap.* (Conselho).\n* *If we hurry, we **might** catch the bus.* (Possibilidade menor).",
    "ponte": "Em português, nós usamos o futuro do subjuntivo: 'Se você ESTUDAR, você passará'; 'Se CHOVER, nós ficaremos em casa'. O verbo 'estudar' e 'chover' estão no modo subjuntivo em português. Em inglês, esse subjuntivo não existe no First Conditional: o inglês usa simplesmente o PRESENTE DO INDICATIVO (*If you study / If it rains*). Não procure um tempo verbal complexo: use o presente mais simples que você conhece!",
    "exemplos_prc": [
      {
        "oracao": "If we leave the office right now, we will avoid the heavy rush hour traffic.",
        "pergunta": "Qual é a condição e qual é o resultado previsto?",
        "resposta": "A condição é sair do escritório agora (leave no presente); o resultado é evitar o trânsito pesado (will avoid).",
        "conclusao": "Condição no Present Simple + consequência com 'will'."
      },
      {
        "oracao": "She won't get the job unless she performs well in the technical interview.",
        "pergunta": "O que significa 'unless' nesta frase?",
        "resposta": "Significa 'a menos que' ou 'se ela não tiver um bom desempenho'.",
        "conclusao": "'Unless' introduz uma condição essencial de exclusão."
      },
      {
        "oracao": "If the temperature drops below zero tonight, the roads will become icy and hazardous.",
        "pergunta": "Por que o verbo 'drops' recebeu a terminação '-s'?",
        "resposta": "Porque 'the temperature' equivale ao pronome 'it' (3ª pessoa singular no Present Simple).",
        "conclusao": "A cláusula do 'if' segue rigorosamente as regras de concordância do Present Simple."
      },
      {
        "oracao": "I will buy that vintage leather jacket if it is on sale.",
        "pergunta": "Por que não há vírgula separando as orações nesta frase?",
        "resposta": "Porque a oração principal com 'will' veio primeiro; quando 'if' fica no meio, a vírgula é dispensada.",
        "conclusao": "Ordem invertida (Resultado + If) dispensa o uso de vírgula."
      }
    ],
    "armadilhas": [
      {
        "errado": "If it will rain tomorrow, I will stay at home. ❌",
        "certo": "If it rains tomorrow, I will stay at home. ✔️",
        "motivo": "NUNCA use 'will' na oração introduzida por 'if'. O verbo deve ficar no Present Simple ('rains')."
      },
      {
        "errado": "If he come to the party, we will be happy. ❌",
        "certo": "If he comes to the party, we will be happy. ✔️",
        "motivo": "He/she/it exige '-s' no Present Simple na oração do if: 'If he comes'."
      },
      {
        "errado": "Unless you don't study, you will fail. ❌",
        "certo": "Unless you study, you will fail. / If you don't study... ✔️",
        "motivo": "'Unless' já significa 'se não'. Adicionar 'don't' gera uma dupla negação ilógica."
      },
      {
        "errado": "If you will help me, I give you money. ❌",
        "certo": "If you help me, I will give you money. ✔️",
        "motivo": "Os tempos estão invertidos! O presente fica no 'if' e o 'will' fica no resultado."
      }
    ],
    "coda": "Guarde a lei suprema do First Conditional: o 'IF' anda de mãos dadas com o Presente, e o 'WILL' brilha no Resultado!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a oração condicional com a forma correta do verbo 'rain':\n\n\"If it ___ tomorrow, we will hold the ceremony indoors.\"",
        "opcoes": ["rains", "will rain", "rained", "is raining to"],
        "resposta": "rains",
        "explicacao": "A oração introduzida por 'if' exige o Present Simple: 'it rains'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o resultado futuro:\n\n\"If you study this grammar lesson carefully, you ___ the test with confidence.\"",
        "opcoes": ["will pass", "pass", "passed", "are passing"],
        "resposta": "will pass",
        "explicacao": "A oração de desfecho do First Conditional projeta o futuro com 'will pass'."
      },
      {
        "tipo": "escolha",
        "pergunta": "O que significa a oração: \"We will miss the flight unless we leave now\"?",
        "opcoes": [
          "Nós perderemos o voo a menos que saiamos agora.",
          "Nós perderemos o voo mesmo se sairmos agora.",
          "Nós não perderemos o voo porque já saímos.",
          "O voo foi cancelado porque não saímos a tempo."
        ],
        "resposta": "Nós perderemos o voo a menos que saiamos agora.",
        "explicacao": "'Unless' equivale a 'a menos que / se não'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase está 100% livre de erros gramaticais?",
        "opcoes": [
          "If he calls me tonight, I will tell him the truth.",
          "If he will call me tonight, I tell him the truth.",
          "If he call me tonight, I will tell him the truth.",
          "If he will call me tonight, I will tell him the truth."
        ],
        "resposta": "If he calls me tonight, I will tell him the truth.",
        "explicacao": "If + he calls (Present Simple com -s) e I will tell (resultado futuro)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Por que a frase *\"If you will help me, I will be grateful\"* é considerada errada na gramática padrão?",
        "resposta": "Porque a oração condicional que começa com 'if' proíbe o uso do auxiliar 'will'; ela deve ser formulada no Present Simple: *\"If you HELP me, I will be grateful\"*.",
        "explicacao": "If rejeita will na oração condicional."
      },
      {
        "tipo": "revelar",
        "pergunta": "Como reescrever a frase *\"If you do not wear a coat, you will catch a cold\"* utilizando a palavra *\"Unless\"*?",
        "resposta": "\"Unless you wear a coat, you will catch a cold.\"",
        "explicacao": "Unless substitui 'if... not' e o verbo fica na forma afirmativa."
      },
      {
        "tipo": "revelar",
        "pergunta": "Qual a diferença no uso da vírgula entre:\n1. *If it rains, we will stay home.*\n2. *We will stay home if it rains.*",
        "resposta": "Quando a oração com 'if' inicia o período, a vírgula é obrigatória para separar a condição do resultado. Quando a oração principal vem primeiro, não se usa vírgula.",
        "explicacao": "Regra da vírgula em condicionais."
      },
      {
        "tipo": "revelar",
        "pergunta": "Podemos usar verbos modais como 'can' ou 'should' no lugar de 'will' na oração principal do First Conditional?",
        "resposta": "Sim! Por exemplo: *\"If you finish your work early, you CAN leave\"* (expressando permissão) ou *\"If you have a headache, you SHOULD rest\"* (expressando conselho).",
        "explicacao": "Modais can, should, may podem substituir will para matizes de sentido."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma correta do verbo 'miss' no Present Simple:\n\n\"If he ___ (miss) the morning train, he will be late for work.\"",
        "resposta": "misses",
        "explicacao": "He misses (terminação em -es para verbos terminados em -ss na 3ª pessoa)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a conjunção que significa 'a menos que':\n\n\"I won't sign the contract ___ they agree to all our safety clauses.\"",
        "resposta": "unless",
        "explicacao": "Unless = a menos que."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com o verbo modal de futuro no resultado:\n\n\"If you wake up early tomorrow, we ___ have breakfast at that French bakery.\"",
        "resposta": "will",
        "explicacao": "Will projeta o resultado futuro."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma verbal de 'have' no Present Simple para concordar com 'she':\n\n\"If she ___ free time this weekend, she will visit her family.\"",
        "resposta": "has",
        "explicacao": "She has."
      }
    ]
  }
};

console.log('Gravando Onda 4 Parte 4 (Lições A2.16 a A2.20)...');

for (const [id, lessonData] of Object.entries(wave4Part4Lessons)) {
  for (const mod of data.moduli) {
    const idx = mod.lezioni.findIndex(l => l.id === id);
    if (idx !== -1) {
      mod.lezioni[idx] = lessonData;
      console.log(`Lição ${id} (${lessonData.titulo}) enriquecida com sucesso!`);
    }
  }
}

fs.writeFileSync(grammarPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Onda 4 Parte 4 (A2.16 a A2.20) gravada com sucesso em data/grammar.json!');
console.log('🎉 MÓDULO A2 (Expansion) 100% COMPLETO (20/20 LIÇÕES ENRIQUECIDAS NO PADRÃO OURO)!');
