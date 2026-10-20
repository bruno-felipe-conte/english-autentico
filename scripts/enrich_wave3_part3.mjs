import fs from 'fs';

const grammarPath = 'data/grammar.json';
const data = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));

// Onda 3 Parte 3: Lições A1.26 a A1.30 (Conclusão definitiva do Módulo A1)
const wave3Part3Lessons = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 26: Present Simple vs Present Continuous
  // ─────────────────────────────────────────────────────────────
  "a1-lez26": {
    "id": "a1-lez26",
    "num": "Lesson 26",
    "titulo": "Present Simple vs Present Continuous",
    "subtitulo": "Rotina vs Momento Presente — I do vs I am doing",
    "cena": {
      "origem": "dialogo",
      "titulo": "Phone Call During the Workday",
      "texto": "**Laura:** Hi Mark! Can you talk right now?\n**Mark:** Not really, Laura. I am driving to the airport at the moment.\n**Laura:** Oh, sorry! Do you usually drive to the airport?\n**Mark:** No, I usually take the express train, but today the trains are on strike.\n**Laura:** I understand! Call me when you arrive."
    },
    "fio": {
      "abertura": "Em português usamos 'estou fazendo' e 'faço' de forma quase intercambiável: 'Hoje eu trabalho' ou 'Hoje estou trabalhando'. No inglês, a fronteira entre rotina habitual e ação temporária em andamento é uma lei sagrada.",
      "descoberta": "Perceba o contraste na fala de Mark: «I am driving at the moment» (ação que está acontecendo agora, enquanto o telefone toca) vs «I usually take the train» (o que ele faz habitualmente no dia a dia). O inglês não tolera misturar os dois tempos.",
      "fecho": "Agora você domina a distinção mestra da fluência: Present Simple para o que é permanente e rotineiro; Present Continuous para o que é temporário e está em pleno curso."
    },
    "alerta": "O erro de dizer *'I am living in Brazil'* quando você mora no Brasil a vida inteira soa como se sua estadia fosse apenas por alguns dias. Aprenda quando usar o permanente e o transitório.",
    "definicao": {
      "fenomeno": "I work every day (Present Simple) vs I am working right now (Present Continuous)",
      "causa": "O que determina a escolha entre os dois tempos verbais?",
      "conceito": "**Present Simple** descreve fatos gerais, rotinas, hábitos e estados permanentes (*I drink tea*). **Present Continuous** descreve ações que estão ocorrendo no instante da fala, tendências do momento ou situações estritamente temporárias (*I am drinking tea right now*)."
    },
    "inventario": [
      "A oposição fundamental: Hábito/Fato Geral (Simple) vs Ação em Curso (Continuous)",
      "Marcadores de Present Simple: always, usually, every day, on weekdays, often",
      "Marcadores de Present Continuous: now, right now, at the moment, currently, today",
      "Os 'Stative Verbs' (verbos que NÃO aceitam Continuous: like, know, understand, believe)",
      "O uso do Continuous para situações temporárias (*I am living with my brother this month*)"
    ],
    "tabela_visual": "| Dimensão | Present Simple (I do) | Present Continuous (I am doing) |\n|---|---|---|\n| **Foco Temporal** | Fato permanente, verdade universal, rotina | Ação acontecendo agora, situação temporária |\n| **Estrutura** | Sujeito + Verbo Básico (ou -s) | Sujeito + AM/IS/ARE + Verbo-ING |\n| **Marcadores Típicos** | *always, usually, every day, never* | *now, right now, at the moment, currently* |\n| **Exemplo Prático** | *I play tennis on Sundays.* | *I am playing tennis right now.* |\n| **Stative Verbs** | *I understand the rule.* | ❌ *I am understanding the rule.* |",
    "observacao_cards": [
      {
        "ingles": "I do (Simple)",
        "traducao": "Eu faço (rotina/fato)",
        "genero": "Hábito Permanente",
        "motivo": "Usa-se para verdades duradouras: 'I work as a software developer'."
      },
      {
        "ingles": "I am doing (Continuous)",
        "traducao": "Estou fazendo (agora/temporário)",
        "genero": "Ação em Andamento",
        "motivo": "Usa-se para o que acontece neste segundo: 'I am typing an email'."
      },
      {
        "ingles": "Right now / At the moment",
        "traducao": "Agora mesmo / No momento",
        "genero": "Marcadores do Continuous",
        "motivo": "Atraem automaticamente o Present Continuous: 'He is sleeping right now'."
      },
      {
        "ingles": "Every day / Usually",
        "traducao": "Todos os dias / Geralmente",
        "genero": "Marcadores do Simple",
        "motivo": "Atraem automaticamente o Present Simple: 'He sleeps eight hours every day'."
      },
      {
        "ingles": "Stative Verbs (Verbos de Estado)",
        "traducao": "Verbos que não aceitam -ING",
        "genero": "Restrição Gramatical",
        "motivo": "Verbos mentais e sensoriais (know, understand, want, like, love, believe) NUNCA vão para o Continuous: diga 'I know', jamais 'I am knowing'."
      },
      {
        "ingles": "Temporary Situations",
        "traducao": "Situações passageiras",
        "genero": "Uso Avançado",
        "motivo": "'I live in London' (minha casa definitiva) vs 'I am living in London this year' (estou morando temporariamente este ano)."
      }
    ],
    "tecnica": "### O Filtro Decisório dos Dois Presentes:\n\n1. **Procure o marcador temporal da frase:**\n   - Tem *now, right now, at the moment, today*? → **Present Continuous** (*AM/IS/ARE + ING*).\n   - Tem *always, usually, every day, on Mondays*? → **Present Simple** (*verbo puro ou com -s*).\n\n2. **O verbo é um verbo de estado mental (Stative Verb)?**\n   - Se for *know, understand, want, need, like, believe, belong* → Use **SEMPRE Present Simple**, mesmo que esteja acontecendo agora (*I understand now*, nunca *I am understanding*).\n\n3. **É um fato permanente da sua vida?**\n   - Sim → Present Simple (*Water boils at 100°C* · *I work in finance*).",
    "teoria": "### A Profundidade dos Stative Verbs\n\nNo inglês, os verbos dividem-se em duas grandes categorias filosóficas:\n\n1. **Dynamic Verbs (Ação Física ou Processo):**\n   Envolvem atividade deliberada e mudança de estado (*run, eat, drive, build, read*). Eles aceitam ambos os tempos com total liberdade:\n   - *I read books* (hábito) · *I am reading a novel* (neste momento).\n\n2. **Stative Verbs (Estados Involuntários e Percepções):**\n   Descrevem estados da mente, emoções, sentidos ou posse permanente. Eles **não têm aspecto contínuo**:\n   - Emoções: *like, love, hate, prefer*.\n   - Cognição: *know, understand, remember, believe, think (opinião)*.\n   - Posse: *have (posse), belong, own*.\n   - Sentidos: *hear, smell, taste*.\n\n<div class=\"gram-regola\"><strong>Atenção com o Verbo THINK:</strong> Quando expressa opinião, é Stative: <em>I think this is right</em>. Quando expressa o ato mental ativo de refletir, aceita Continuous: <em>Shh, I am thinking!</em></div>",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: A Confusão de 'Hoje eu trabalho'\n\n1. **O uso do Presente Simples para o que acontece agora:**\n   - Em português podemos dizer no telefone: *\"Não posso falar, dirijo agora.\"* ou *\"O que você faz?\"* (perguntando o que a pessoa está fazendo neste instante).\n   - Em inglês essa distinção é rígida:\n     - *What do you do?* = Qual é a sua profissão? (O que você faz da vida?)\n     - *What are you doing?* = O que você está fazendo agora neste exato momento?",
    "exemplos_prc": [
      {
        "oracao": "Carlos usually drinks coffee, but today he is drinking herbal tea.",
        "pergunta": "Por que a primeira oração usa o Present Simple e a segunda o Present Continuous?",
        "resposta": "Porque 'usually drinks' descreve o hábito geral permanente, enquanto 'is drinking today' descreve a exceção temporária válida apenas para hoje.",
        "conclusao": "Carlos geralmente bebe café, mas hoje ele está bebendo chá de ervas."
      },
      {
        "oracao": "I understand the grammar explanation completely right now.",
        "pergunta": "Por que não se diz 'I am understanding right now'?",
        "resposta": "Porque 'understand' é um stative verb (verbo de cognição mental) e não admite a forma contínua em -ing.",
        "conclusao": "Eu entendo a explicação gramatical completamente agora mesmo."
      },
      {
        "oracao": "What do you do? — I am an architect.",
        "pergunta": "Que tipo de pergunta é 'What do you do?'",
        "resposta": "É a pergunta idiomática padrão sobre a profissão e ocupação permanente da pessoa.",
        "conclusao": "O que você faz da vida? — Eu sou arquiteto."
      },
      {
        "oracao": "What are you doing right now? — I am preparing dinner.",
        "pergunta": "Como esta pergunta difere da anterior?",
        "resposta": "O uso de 'are you doing' com 'right now' foca estritamente na ação física em curso no momento da fala.",
        "conclusao": "O que você está fazendo agora mesmo? — Estou preparando o jantar."
      }
    ],
    "armadilhas": [
      {
        "errado": "I am knowing the answer.",
        "certo": "I know the answer.",
        "motivo": "'Know' é stative verb e nunca é usado na forma contínua com -ing."
      },
      {
        "errado": "She works right now, please be quiet.",
        "certo": "She is working right now, please be quiet.",
        "motivo": "Com o marcador 'right now', deve-se usar o Present Continuous (is working)."
      },
      {
        "errado": "What do you do right now?",
        "certo": "What are you doing right now?",
        "motivo": "Para saber o que a pessoa faz neste instante, use o Continuous."
      },
      {
        "errado": "Water is boiling at 100 degrees Celsius.",
        "certo": "Water boils at 100 degrees Celsius.",
        "motivo": "Verdades científicas universais utilizam sempre o Present Simple (boils)."
      }
    ],
    "coda": "Hábito e verdade geral? Present Simple. Ação acontecendo agora? Present Continuous. Verbos mentais (know, like, want)? Sempre Simple.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o tempo verbal correto:\n\n\"Listen! Somebody ___ at the front door.\"\n(= Escute! Alguém está batendo na porta da frente.)",
        "opcoes": ["knocks", "is knocking", "are knocking", "knock"],
        "resposta": 1,
        "explicacao": "O comando 'Listen!' indica que a ação está acontecendo neste exato segundo → IS KNOCKING."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete sobre rotina semanal:\n\n\"My parents ___ to the countryside every weekend.\"\n(= Meus pais vão para o interior todo fim de semana.)",
        "opcoes": ["are going", "go", "goes", "is going"],
        "resposta": 1,
        "explicacao": "'Every weekend' indica hábito de rotina → Present Simple com sujeito plural: GO."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase está gramaticalmente PERFEITA em inglês?",
        "opcoes": [
          "I am wanting a cup of coffee right now.",
          "I want a cup of coffee right now.",
          "I wants a cup of coffee right now.",
          "I am want a cup of coffee right now."
        ],
        "resposta": 1,
        "explicacao": "'Want' é um stative verb e rejeita a forma contínua em -ing, devendo ser usado no Simple: 'I want'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual pergunta você deve fazer para saber a PROFISSÃO de alguém?",
        "opcoes": [
          "What are you doing?",
          "What do you do?",
          "What you do?",
          "What are you do?"
        ],
        "resposta": 1,
        "explicacao": "'What do you do?' é a pergunta consagrada para profissão/ocupação."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente o contraste:\n\n\"He usually ___ by car, but today he ___ by bus.\"\n(Ele geralmente viaja de carro, mas hoje está viajando de ônibus.)",
        "revelacao": "He usually travels by car, but today he is traveling by bus.",
        "explicacao": "Usually travels (Simple) vs today he is traveling (Continuous)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com stative verb:\n\n\"I ___ that this decision is correct.\"\n(Eu acredito que esta decisão está correta. Verbo: believe)",
        "revelacao": "I believe that this decision is correct.",
        "explicacao": "Believe é stative verb e fica no Present Simple."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"The sun ___ in the east and sets in the west.\"\n(O sol nasce no leste e se põe no oeste. Verbo: rise)",
        "revelacao": "The sun rises in the east and sets in the west.",
        "explicacao": "Fato universal da natureza = Present Simple (rises)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"Why ___ you ___ an umbrella? It is not raining!\"\n(Por que você está carregando um guarda-chuva? Não está chovendo!)",
        "revelacao": "Why are you carrying an umbrella? It is not raining!",
        "explicacao": "Ação em curso no momento = are you carrying."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma correta do verbo 'work' para ação no momento:\n\n\"Please be quiet; the baby is ___.\" (dormindo)",
        "resposta": "sleeping",
        "explicacao": "Is sleeping."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma correta do stative verb 'like' no presente:\n\n\"She ___ classical music very much.\" (gosta)",
        "resposta": "likes",
        "explicacao": "Stative verb no Present Simple com She = likes."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a pergunta de profissão:\n\n\"What ___ you do for a living?\"",
        "resposta": "do",
        "explicacao": "What do you do."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o verbo auxiliar que falta para ação no momento:\n\n\"Look! It ___ starting to snow outside!\"",
        "resposta": "is",
        "explicacao": "It is starting."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 27: Modal Verb 'Can'
  // ─────────────────────────────────────────────────────────────
  "a1-lez27": {
    "id": "a1-lez27",
    "num": "Lesson 27",
    "titulo": "Modal Verb 'Can'",
    "subtitulo": "Habilidades, Possibilidades e Permissões — Can vs Can't",
    "cena": {
      "origem": "dialogo",
      "titulo": "Job Interview Skill Assessment",
      "texto": "**Interviewer:** Can you speak any foreign languages, Lucas?\n**Lucas:** Yes, I can speak Portuguese and English fluently, and I can code in Python.\n**Interviewer:** Impressive! Can you drive a company vehicle if needed?\n**Lucas:** Yes, I have a valid license, so I can drive anywhere.\n**Interviewer:** Can you start work on Monday?"
    },
    "fio": {
      "abertura": "Os verbos modais são superpoderes na língua inglesa. Eles não seguem as regras dos verbos comuns: não usam 'to', não ganham 's' na 3ª pessoa e nunca precisam de 'do/does'.",
      "descoberta": "Repare em Lucas: ele disse «I can speak», «I can code» e o entrevistador perguntou «Can you drive?». Em todos os casos, o verbo seguinte fica na forma pura sem 'to'. E para 'He', 'She' ou 'It', 'can' continua exatamente igual!",
      "fecho": "Agora você domina o verbo modal mais versátil de todos: expressar o que você é capaz de fazer, o que é possível e solicitar favores com máxima naturalidade."
    },
    "alerta": "O verbo 'CAN' é um modal anômalo: NUNCA diga *'he cans'* e NUNCA use *'to'* depois dele (*I can to swim* ❌). O verbo seguinte vem sempre puro.",
    "definicao": {
      "fenomeno": "I can swim · She can play the piano · Can you help me? · I can't come tonight",
      "causa": "Por que os verbos modais são invariáveis?",
      "conceito": "'CAN' é um verbo auxiliar defectivo modal. Ele expressa **habilidade física/mental**, **possibilidade** ou **permissão/pedido**. É idêntico para todas as pessoas gramaticais e rege infinitivo nu (*bare infinitive*, sem 'to')."
    },
    "inventario": [
      "Os 3 pilares de CAN: Habilidade (saber fazer), Possibilidade e Pedido polido",
      "A invariabilidade absoluta: can é igual para I, You, He, She, It, We, They (sem -s)",
      "A regra do infinitivo sem 'to': can + verbo puro (I can swim, nunca I can to swim)",
      "A negação contraída: cannot (junto) / can't (pronúncia britânica /kɑːnt/, americana /kænt/)",
      "A pergunta por inversão direta: Can you...? / Can I...?"
    ],
    "tabela_visual": "| Modo | Estrutura | Exemplo Real | Tradução Prática |\n|---|---|---|---|\n| **Afirmativa** | Sujeito + **can** + Verbo Puro | *She can speak three languages.* | *Ela sabe falar três idiomas.* |\n| **Negativa** | Sujeito + **can't** + Verbo Puro | *I can't hear you clearly.* | *Não consigo te ouvir com clareza.* |\n| **Interrogativa** | **Can** + Sujeito + Verbo Puro? | *Can you open the window, please?* | *Você pode abrir a janela, por favor?* |\n| **Resposta Curta** | *Yes, I can. / No, I can't.* | *Can he drive? — Yes, he can.* | *Ele sabe dirigir? — Sabe.* |",
    "observacao_cards": [
      {
        "ingles": "I can",
        "traducao": "Eu posso / Eu sei / Eu consigo",
        "genero": "Habilidade e Capacidade",
        "motivo": "Em português usamos 'saber' para habilidades aprendidas ('sei nadar'). No inglês, diz-se 'I can swim'."
      },
      {
        "ingles": "She can",
        "traducao": "Ela pode / Ela sabe",
        "genero": "Sem 'S' na 3ª Pessoa",
        "motivo": "Atenção: NUNCA diga 'she cans'. Verbos modais não aceitam 's' de terceira pessoa."
      },
      {
        "ingles": "Can't",
        "traducao": "Não posso / Não consigo",
        "genero": "Negação Modal",
        "motivo": "Contração de 'cannot' (que se escreve como uma única palavra). Na fala britânica soa como /kɑːnt/ com 'a' longo."
      },
      {
        "ingles": "Can you...?",
        "traducao": "Você pode...? / Dá para você...?",
        "genero": "Pedido Informal Polido",
        "motivo": "Usa-se para pedir favores ou serviços do dia a dia: 'Can you help me with this bag?'"
      },
      {
        "ingles": "Can I...?",
        "traducao": "Posso...?",
        "genero": "Pedido de Permissão",
        "motivo": "Usa-se para pedir permissão cotidiana: 'Can I ask a question?'"
      },
      {
        "ingles": "Bare Infinitive",
        "traducao": "Infinitivo sem 'TO'",
        "genero": "Regra Estrutural",
        "motivo": "Diga 'I can speak', NUNCA 'I can to speak'. O 'to' é estritamente proibido após 'can'."
      }
    ],
    "tecnica": "### As 3 Leis Inquebráveis de 'CAN':\n\n1. **Lei 1: Sem 'TO' antes do próximo verbo:**\n   - *I can dance.* (Correto)\n   - *I can to dance.* (ERRADO! Elimine o 'to').\n\n2. **Lei 2: Sem 'S' na terceira pessoa:**\n   - *He can drive.* (Correto)\n   - *He cans drive.* (ERRADO! 'Can' nunca recebe 's').\n\n3. **Lei 3: Sem auxiliares DO ou DOES:**\n   - Negativa: *I can't* (nunca *I don't can*).\n   - Pergunta: *Can you?* (nunca *Do you can?*).",
    "teoria": "### Os Sentidos Comunicativos de 'Can'\n\nO verbo modal *can* desempenha quatro funções pragmáticas fundamentais:\n1. **Habilidade Aprendida:** Saber fazer algo (*I can play chess* · *She can swim*).\n2. **Possibilidade / Oportunidade:** Algo que as circunstâncias permitem (*We can visit the museum on Sunday because it is free*).\n3. **Permissão Informal:** Estar autorizado a fazer (*You can park your car here*).\n4. **Pedidos e Solicitações:** Pedir um favor com educação (*Can you pass the salt, please?*).\n\n#### A Escrita de 'Cannot':\nA forma não-contraída negativa de *can* escreve-se como **uma única palavra**: **cannot** (e não *can not*, exceto em ênfases extremas).",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: 'Saber' vs 'Poder'\n\n1. **A Armadilha do Verbo 'Saber':**\n   - Em português dizemos: *\"Você sabe nadar?\"* ou *\"Ele sabe tocar violão?\"*.\n   - O brasileiro tenta traduzir com o verbo *know*: *\"Do you know to swim?\"* ❌ (erro gravíssimo!).\n   - Em inglês, para habilidades práticas aprendidas, usa-se exclusivamente **CAN**: **Can you swim?** ✓ · **He can play the guitar.** ✓\n\n2. **A Dupla Negação Proibida:**\n   - Dizer *I don't can* é um dos erros mais constrangedores. O modal nega sozinho: **I can't**.",
    "exemplos_prc": [
      {
        "oracao": "She can play classical piano with incredible technique.",
        "pergunta": "Por que o verbo 'can' não recebeu 's' se o sujeito é 'She'?",
        "resposta": "Porque 'can' é um verbo modal, e os verbos modais são estritamente invariáveis para todas as pessoas gramaticais.",
        "conclusao": "Ela sabe tocar piano clássico com técnica incrível."
      },
      {
        "oracao": "Can you hear the music coming from the next room?",
        "pergunta": "Como esta pergunta interrogativa foi construída?",
        "resposta": "Invertendo o modal 'Can' para a frente do sujeito 'you', sem a necessidade de nenhum auxiliar como 'do'.",
        "conclusao": "Você consegue ouvir a música que vem da sala ao lado?"
      },
      {
        "oracao": "We can't attend the conference tomorrow due to an emergency.",
        "pergunta": "O que significa 'can't' e qual o verbo principal seguinte?",
        "resposta": "Significa 'não podemos' (impossibilidade), seguido do verbo principal puro 'attend' sem 'to'.",
        "conclusao": "Nós não podemos comparecer à conferência amanhã devido a uma emergência."
      },
      {
        "oracao": "Can I use your phone charger for a few minutes?",
        "pergunta": "Qual é a função comunicativa desta frase?",
        "resposta": "Fazer um pedido polido de permissão para utilizar o objeto de outra pessoa.",
        "conclusao": "Posso usar seu carregador de celular por alguns minutos?"
      }
    ],
    "armadilhas": [
      {
        "errado": "He cans speak English very well.",
        "certo": "He can speak English very well.",
        "motivo": "Verbos modais nunca recebem 's'. 'Can' é idêntico para todas as pessoas."
      },
      {
        "errado": "I can to drive a manual car.",
        "certo": "I can drive a manual car.",
        "motivo": "Após 'can', o verbo vem sempre na forma pura sem a partícula 'to'."
      },
      {
        "errado": "Do you can swim?",
        "certo": "Can you swim?",
        "motivo": "Modais não usam o auxiliar 'do'. Inverta diretamente: 'Can you swim?'."
      },
      {
        "errado": "I don't can come tomorrow.",
        "certo": "I can't come tomorrow. / I cannot come tomorrow.",
        "motivo": "A negação de can é 'can't' ou 'cannot', nunca 'don't can'."
      }
    ],
    "coda": "Sem 'S' para He/She/It, sem 'TO' depois e sem 'DO' para perguntar. 'Can' é autossuficiente e direto.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com a forma correta do modal:\n\n\"David is a talented musician; he ___ play four instruments.\"\n(= David é um músico talentoso; ele sabe tocar quatro instrumentos.)",
        "opcoes": ["cans", "can", "can to", "is can"],
        "resposta": 1,
        "explicacao": "Verbos modais não recebem 's' e não usam 'to': CAN play."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase em inglês traduz com precisão:\n\n\"Você sabe nadar?\"",
        "opcoes": [
          "Do you know to swim?",
          "Can you swim?",
          "Do you can swim?",
          "Can you to swim?"
        ],
        "resposta": 1,
        "explicacao": "Habilidades aprendidas usam 'Can you swim?' em inglês."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual é a negação correta do verbo modal CAN?",
        "opcoes": ["I don't can", "I can't", "I not can", "I am not can"],
        "resposta": 1,
        "explicacao": "A negação correta é CAN'T (ou CANNOT)."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase está gramaticalmente PERFEITA em inglês?",
        "opcoes": [
          "She can to speak fluent German.",
          "She cans speak fluent German.",
          "She can speak fluent German.",
          "She does can speak fluent German."
        ],
        "resposta": 2,
        "explicacao": "'She can speak' cumpre todas as três regras dos modais: sem 's', sem 'to' e sem auxiliar."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente o pedido polido:\n\n\"___ you help me carry these heavy boxes?\"\n(Você pode me ajudar a carregar estas caixas pesadas?)",
        "revelacao": "Can you help me carry these heavy boxes?",
        "explicacao": "Can you help me."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente a negação:\n\n\"I am sorry, but I ___ attend the meeting on Friday.\"\n(Sinto muito, mas não posso comparecer à reunião na sexta-feira.)",
        "revelacao": "I am sorry, but I can't attend the meeting on Friday.",
        "explicacao": "I can't attend."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com 3ª pessoa:\n\n\"My smartphone ___ take high-resolution night photos.\"\n(Meu smartphone consegue tirar fotos noturnas de alta resolução.)",
        "revelacao": "My smartphone can take high-resolution night photos.",
        "explicacao": "Smartphone = It → can take (sem 's')."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente o pedido de permissão:\n\n\"___ I open the window? It is very warm in here.\"\n(Posso abrir a janela? Está muito quente aqui dentro.)",
        "revelacao": "Can I open the window? It is very warm in here.",
        "explicacao": "Can I open."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o modal que indica habilidade para 'He':\n\n\"Carlos ___ speak three languages.\" (sabe / pode)",
        "resposta": "can",
        "explicacao": "Can é invariável para todas as pessoas."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma negativa contraída de 'can':\n\n\"I ___ see anything without my glasses.\" (não consigo)",
        "resposta": "can't",
        "explicacao": "Can't é a contração padrão."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que abre a pergunta de habilidade:\n\n\"___ you play chess?\"",
        "resposta": "Can",
        "explicacao": "Can abre perguntas de habilidade."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra única formal para 'não pode' (can + not):\n\n\"Visitors ___ enter this restricted area without a badge.\"",
        "resposta": "cannot",
        "explicacao": "Cannot escreve-se junto como uma única palavra."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 28: Imperatives (Commands & Instructions)
  // ─────────────────────────────────────────────────────────────
  "a1-lez28": {
    "id": "a1-lez28",
    "num": "Lesson 28",
    "titulo": "Imperatives",
    "subtitulo": "Comandos, Instruções e Convites — Do this / Don't do that",
    "cena": {
      "origem": "dialogo",
      "titulo": "Emergency Instructions on an Airplane",
      "texto": "**Flight Attendant:** Please fasten your seatbelts and turn off all electronic devices.\n**Passenger:** Where do I put my carry-on bag?\n**Flight Attendant:** Place it under the seat in front of you. Don't leave any items in the aisle.\n**Passenger:** Thank you. Should I keep my tray table closed?\n**Flight Attendant:** Yes, keep it closed until we reach cruising altitude."
    },
    "fio": {
      "abertura": "Você já reparou em placas como 'Open', 'Stop', 'Push', 'Pull'? No modo imperativo, a língua inglesa é a mais econômica e direta do planeta: o sujeito simplesmente desaparece.",
      "descoberta": "Observe as ordens da comissária: «fasten your seatbelts», «place it under the seat», e a proibição «don't leave any items». Não há 'you', não há 'please' obrigatório (embora seja educado). Começa-se direto no verbo!",
      "fecho": "Agora você domina a arte de dar instruções, seguir receitas, entender placas de rua e fazer convites acolhedores com 'Let's'."
    },
    "alerta": "O imperativo é a ÚNICA situação na língua inglesa onde o sujeito é omitido sem que a frase seja considerada errada. Para proibir algo, basta colocar 'Don't' antes do verbo.",
    "definicao": {
      "fenomeno": "Open the door · Please sit down · Don't touch that · Let's go",
      "causa": "Por que o imperativo não tem sujeito gramatical explícito?",
      "conceito": "O imperativo destina-se diretamente à 2ª pessoa (você ou vocês), tornando o pronome redundante. Inicia-se a oração com a **forma básica do verbo** (*base form*). Na negativa, usa-se exclusivamente **DON'T** para qualquer pessoa."
    },
    "inventario": [
      "A estrutura afirmativa do imperativo: Verbo Base direto (sem sujeito)",
      "A estrutura negativa do imperativo: DON'T + Verbo Base",
      "O uso polido com PLEASE (no início ou final da frase com vírgula)",
      "O imperativo da 1ª pessoa plural: LET'S (let us) + Verbo Base (convite mútuo)",
      "A negação de Let's: LET'S NOT + Verbo Base (*Let's not argue*)"
    ],
    "tabela_visual": "| Tipo | Estrutura | Exemplo Real | Função Comunicativa |\n|---|---|---|---|\n| **Ordem / Instrução** | **[Verbo Base]** + complemento | *Turn right at the traffic lights.* | Direção / Manual |\n| **Pedido Polido** | **Please** + [Verbo] (ou no fim) | *Please sign your name here.* | Cortesia comercial |\n| **Proibição** | **Don't** + [Verbo Base] | *Don't touch the wet paint.* | Aviso de perigo / regra |\n| **Convite Coletivo** | **Let's** + [Verbo Base] | *Let's take a fifteen-minute break.* | Sugestão de grupo |\n| **Negação Coletiva** | **Let's not** + [Verbo Base] | *Let's not waste any more time.* | Desistência mútua |",
    "observacao_cards": [
      {
        "ingles": "Open the window",
        "traducao": "Abra a janela",
        "genero": "Imperativo Direto",
        "motivo": "Inicie direto no verbo no infinitivo sem 'to'. Serve para 'você' ou 'vocês'."
      },
      {
        "ingles": "Please sit down",
        "traducao": "Por favor, sente-se",
        "genero": "Polidez Essencial",
        "motivo": "Adicione 'please' para transformar ordens secas em pedidos respeitosos."
      },
      {
        "ingles": "Don't touch",
        "traducao": "Não toque / Não toquem",
        "genero": "Proibição Universal",
        "motivo": "Toda proibição imperativa usa DON'T, nunca 'no' ou 'not': 'Don't worry'."
      },
      {
        "ingles": "Be careful",
        "traducao": "Tenha cuidado / Seja cuidadoso",
        "genero": "Imperativo do Verbo To Be",
        "motivo": "Com o verbo To Be, use a forma 'BE': 'Be quiet', 'Be happy'."
      },
      {
        "ingles": "Let's go",
        "traducao": "Vamos (convite)",
        "genero": "1ª Pessoa Plural",
        "motivo": "Contração de 'let us'. Inclui quem fala e quem ouve em uma ação conjunta."
      },
      {
        "ingles": "Let's not",
        "traducao": "Não vamos (+ verbo)",
        "genero": "Negação Coletiva",
        "motivo": "Para negar um convite conjunto: 'Let's not hurry' (Não vamos ter pressa)."
      }
    ],
    "tecnica": "### As Fórmulas Rápidas do Imperativo:\n\n1. **Quer que alguém faça algo?**\n   - Comece direto com o verbo puro: *Listen carefully!* · *Read the instructions!*\n\n2. **Quer pedir com educação?**\n   - Adicione *Please*: *Please call me back* OU *Call me back, please*.\n\n3. **Quer proibir algo?**\n   - Adicione **Don't** antes do verbo: *Don't open the door!*\n\n4. **Quer convidar o grupo (nós)?**\n   - Use **Let's + verbo**: *Let's celebrate!* (Vamos comemorar!).",
    "teoria": "### Pragmatismo e Cortesia no Imperativo\n\nEm inglês, o imperativo não é usado apenas para comandos militares, mas para:\n* **Sinalização Pública:** *Stop*, *Exit*, *Keep off the grass*, *Beware of the dog*.\n* **Manuais e Receitas:** *Boil the water, add salt, stir for five minutes*.\n* **Instruções de Navegação (GPS):** *Turn left on Main Street*.\n* **Desejos Benevolentes:** *Have a nice weekend!* · *Enjoy your meal!*\n\n#### A Sutileza Cultural do 'Please':\nPara falantes nativos, o imperativo puro sem *please* em interações cotidianas (*Give me water*) soa autoritário e rude. Adicionar **please** ou usar fórmulas como *Could you please...* é mandatório em lojas e restaurantes.",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: O Erro do 'No + Verbo'\n\n1. **A Armadilha de 'Não Faça':**\n   - Em português dizemos: *\"Não fume aqui.\"*\n   - O brasileiro é tentado a traduzir literalmente com 'no': *\"No smoke here\"* ❌.\n   - O imperativo negativo em inglês SEMPRE exige **DON'T**: **Don't smoke here** ✓.\n\n2. **A Forma 'BE':**\n   - Em português: *\"Seja paciente.\"* (o verbo ser muda para 'seja').\n   - Em inglês, o imperativo do verbo To Be é simplesmente a palavra **BE**: **Be patient!**",
    "exemplos_prc": [
      {
        "oracao": "Please fill out this registration form and sign at the bottom.",
        "pergunta": "Por que esta oração começa com 'Please' seguido diretamente dos verbos 'fill out' e 'sign'?",
        "resposta": "Porque trata-se de uma instrução imperativa formal polida fornecida a um cliente.",
        "conclusao": "Por favor preencha este formulário de inscrição e assine na parte inferior."
      },
      {
        "oracao": "Don't forget to lock the office doors before leaving tonight.",
        "pergunta": "Como o imperativo negativo foi estruturado nesta frase?",
        "resposta": "Iniciando com o operador negativo 'Don't' antes do verbo na forma básica 'forget'.",
        "conclusao": "Não se esqueça de trancar as portas do escritório antes de sair hoje à noite."
      },
      {
        "oracao": "Be quiet during the presentation; the microphone is sensitive.",
        "pergunta": "Por que a frase começa com 'Be' e não 'Are'?",
        "resposta": "Porque 'Be' é a forma pura do imperativo do verbo To Be para dar comandos e pedidos.",
        "conclusao": "Fique em silêncio durante a apresentação; o microfone é sensível."
      },
      {
        "oracao": "Let's take a fifteen-minute coffee break before the final session.",
        "pergunta": "Qual a diferença comunicativa entre 'Take a break' e 'Let's take a break'?",
        "resposta": "'Take a break' é uma instrução para os outros; 'Let's take a break' é uma proposta que inclui o próprio orador (nós).",
        "conclusao": "Vamos fazer um intervalo de quinze minutos para o café antes da sessão final."
      }
    ],
    "armadilhas": [
      {
        "errado": "No park your car here.",
        "certo": "Don't park your car here.",
        "motivo": "Para imperativos negativos de proibição, use sempre 'Don't', nunca 'no'."
      },
      {
        "errado": "You open the window, please.",
        "certo": "Open the window, please. / Please open the window.",
        "motivo": "O imperativo não deve ter pronome sujeito explícito antes do verbo."
      },
      {
        "errado": "Is quiet during the meeting.",
        "certo": "Be quiet during the meeting.",
        "motivo": "O imperativo do verbo To Be é 'Be', nunca 'is' ou 'are'."
      },
      {
        "errado": "Let's don't go there.",
        "certo": "Let's not go there.",
        "motivo": "A negação de Let's é 'Let's not + verbo', nunca 'Let's don't'."
      }
    ],
    "coda": "Afirmativo: comece direto no verbo. Negativo: coloque DON'T antes. Com o grupo: use LET'S.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com a proibição correta no imperativo:\n\n\"___ the emergency exit unless there is a fire!\"\n(= Não abra a saída de emergência a menos que haja um incêndio!)",
        "opcoes": ["No open", "Don't open", "Not open", "Doesn't open"],
        "resposta": 1,
        "explicacao": "O imperativo negativo universal é formado com DON'T + Verbo puro."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual é a forma correta do imperativo para pedir silêncio?",
        "opcoes": [
          "Are quiet, please.",
          "Be quiet, please.",
          "You be quiet, please.",
          "Is quiet, please."
        ],
        "resposta": 1,
        "explicacao": "O imperativo do verbo To Be é sempre BE: 'Be quiet, please'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete o convite coletivo:\n\n\"It is raining heavily outside; ___ order a pizza and watch a movie.\"\n(= Está chovendo forte lá fora; vamos pedir uma pizza e assistir a um filme.)",
        "opcoes": ["Let", "Let's", "We go", "Let is"],
        "resposta": 1,
        "explicacao": "LET'S convida o grupo a agir conjuntamente."
      },
      {
        "tipo": "escolha",
        "pergunta": "Como negar um convite conjunto com 'Let's'?",
        "opcoes": [
          "Let's don't stay here.",
          "Let's not stay here.",
          "Don't let's stay here.",
          "Let's no stay here."
        ],
        "resposta": 1,
        "explicacao": "A negação padrão é LET'S NOT + Verbo básico."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente a instrução de trânsito:\n\n\"___ left at the next traffic light.\"\n(Vire à esquerda no próximo semáforo. Verbo: turn)",
        "revelacao": "Turn left at the next traffic light.",
        "explicacao": "Turn left (imperativo direto)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente a cortesia:\n\n\"Please ___ your seat during takeoff and landing.\"\n(Por favor permaneça no seu assento durante a decolagem e o pouso. Verbo: remain)",
        "revelacao": "Please remain in your seat during takeoff and landing.",
        "explicacao": "Please remain in your seat."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente o aviso de cuidado:\n\n\"___ careful when you cross this busy street.\"\n(Tenha cuidado quando você atravessar esta rua movimentada.)",
        "revelacao": "Be careful when you cross this busy street.",
        "explicacao": "Be careful."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente a proibição:\n\n\"___ take photos inside the art gallery.\"\n(Não tire fotos dentro da galeria de arte.)",
        "revelacao": "Don't take photos inside the art gallery.",
        "explicacao": "Don't take photos."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que forma o imperativo negativo:\n\n\"___ worry about the mistake; we can fix it.\" (Não)",
        "resposta": "Don't",
        "explicacao": "Don't worry é o clássico 'não se preocupe'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma imperativa do verbo To Be:\n\n\"___ patient with the new employees; they are learning.\" (Seja)",
        "resposta": "Be",
        "explicacao": "Be patient."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que propõe um convite coletivo:\n\n\"___ start the meeting now; everyone is here.\" (Vamos)",
        "resposta": "Let's",
        "explicacao": "Let's start."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a instrução direta de verificação:\n\n\"___ the battery before turning on the device.\" (Verifique)",
        "resposta": "Check",
        "explicacao": "Check the battery."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 29: Basic Conjunctions (And, But, Or, Because, So)
  // ─────────────────────────────────────────────────────────────
  "a1-lez29": {
    "id": "a1-lez29",
    "num": "Lesson 29",
    "titulo": "Basic Conjunctions",
    "subtitulo": "Conectando Ideias — And, But, Or, Because, So",
    "cena": {
      "origem": "dialogo",
      "titulo": "Making Weekend Plans",
      "texto": "**Chloe:** Do you want to go to the beach or visit the museum this Saturday?\n**Lucas:** I love the beach, but the forecast says it might rain.\n**Chloe:** That is true. It is cold today, so we should stay indoors.\n**Lucas:** Let's visit the modern art museum, because tickets are half price on weekends!\n**Chloe:** Perfect! We can see the exhibition and have lunch nearby."
    },
    "fio": {
      "abertura": "Falar frases curtas e isoladas faz você soar como um robô. Para criar fluência e raciocínio contínuo, você precisa de conectores lógicos que amarrem suas ideias.",
      "descoberta": "Veja como Chloe e Lucas articularam o diálogo: «and» para somar, «but» para contrastar, «or» para escolher alternativas, «because» para dar o motivo e «so» para mostrar a consequência! Com essas 5 palavras, suas frases ganham vida adulta.",
      "fecho": "Agora você domina a cola sintática que transforma pensamentos simples em parágrafos fluentes e articulados."
    },
    "alerta": "Cuidado com o par 'Because' (motivo) e 'So' (consequência). 'Because' explica o porquê; 'So' mostra o que aconteceu em seguida. Não inverta a relação de causa e efeito.",
    "definicao": {
      "fenomeno": "Apples and oranges · Fast but expensive · Coffee or tea · I stayed home because it was cold · It was cold, so I stayed home",
      "causa": "Qual a relação lógica de cada uma das 5 conjunções fundamentais?",
      "conceito": "**AND** adiciona informações semelhantes (+). **BUT** introduz contraste ou surpresa (≠). **OR** apresenta alternativas ou escolhas. **BECAUSE** introduz a causa/motivo (←). **SO** introduz o resultado/consequência (→)."
    },
    "inventario": [
      "AND: adição e continuidade de ideias afins",
      "BUT: contraste, ressalva e oposição",
      "OR: alternativa, escolha ou disjunção",
      "BECAUSE: causa, justificativa e motivo explicativo",
      "SO: consequência lógica, resultado e conclusão de uma premissa"
    ],
    "tabela_visual": "| Conjunção | Relação Lógica | Função Sintática | Exemplo Canônico |\n|---|---|---|---|\n| **and** | Adição (+) | Soma duas ideias compatíveis | *He speaks English and Spanish.* |\n| **but** | Contraste (≠) | Apresenta oposição ou exceção | *She is tired, but she is happy.* |\n| **or** | Escolha (?) | Apresenta opções excludentes | *Do you want water or juice?* |\n| **because** | Causa (← Motivo) | Explica a razão daquilo ter ocorrido | *I called him because I was worried.* |\n| **so** | Efeito (→ Consequência) | Mostra o resultado prático gerado | *I was worried, so I called him.* |",
    "observacao_cards": [
      {
        "ingles": "And",
        "traducao": "E (adição)",
        "genero": "Soma de Ideias",
        "motivo": "Conecta elementos similares: 'I bought shoes and a jacket'."
      },
      {
        "ingles": "But",
        "traducao": "Mas / Porém (contraste)",
        "genero": "Oposição",
        "motivo": "Introduz uma quebra de expectativa: 'The hotel was small, but very clean'."
      },
      {
        "ingles": "Or",
        "traducao": "Ou (alternativa)",
        "genero": "Escolha",
        "motivo": "Apresenta opções em perguntas ou negativas: 'Cash or card?'"
      },
      {
        "ingles": "Because",
        "traducao": "Porque (causa)",
        "genero": "Motivo",
        "motivo": "Aponta para a causa geradora: 'I went to bed early because I was exhausted'."
      },
      {
        "ingles": "So",
        "traducao": "Então / Por isso (consequência)",
        "genero": "Efeito Lógico",
        "motivo": "Aponta para o desfecho: 'It was raining, so we took an umbrella'."
      },
      {
        "ingles": "Vírgula antes de 'But' e 'So'",
        "traducao": "Pontuação Gramatical",
        "genero": "Regra Estilística",
        "motivo": "Quando conectam duas orações completas com sujeitos próprios, coloca-se vírgula antes de 'but' e 'so'."
      }
    ],
    "tecnica": "### O Teste Causa vs Efeito (Because vs So):\n\n1. **Identifique a CAUSA e o EFEITO:**\n   - Premissa A: *Estava chovendo.* (Causa)\n   - Premissa B: *Fiquei em casa.* (Efeito)\n\n2. **Se a frase diz o EFEITO primeiro e depois o MOTIVO:**\n   - Use **BECAUSE**:\n     *I stayed home **because** it was raining.*\n\n3. **Se a frase diz a CAUSA primeiro e depois o RESULTADO:**\n   - Use **SO**:\n     *It was raining, **so** I stayed home.*",
    "teoria": "### A Função das Conjunções Coordenativas e Subordinativas\n\nNo inglês básico, essas 5 palavras cobrem 90% das conexões narrativas:\n* *FANBOYS* é o acrônimo mnemônico clássico em escolas anglo-saxãs para conjunções coordenativas: *For, **And**, Nor, **But**, **Or**, Yet, **So**.\n\n#### A Sutileza entre 'Because' e 'Because of':\n* **Because** é seguido de uma oração completa com sujeito e verbo (*because it was raining*).\n* **Because of** é uma preposição seguida apenas de um substantivo (*because of the rain*).",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: 'So' não é só 'Tão'\n\n1. **A polissemia de 'So':**\n   - No Brasil muitos conhecem 'so' como intensificador (*so beautiful = tão bonita*).\n   - Mas no início de orações ou ligando frases, 'so' significa **\"então / por isso / portanto\"**: *\"I had no cash, so I paid with my card.\"*\n\n2. **A Virgulação de 'But':**\n   - No inglês formal escrito, costuma-se colocar uma vírgula antes de 'but' quando duas frases independentes são unidas: *I wanted to travel, but my flight was canceled.*",
    "exemplos_prc": [
      {
        "oracao": "The train was canceled, so we decided to rent a car.",
        "pergunta": "Qual a relação lógica expressa pela conjunção 'so'?",
        "resposta": "Expressa a consequência direta do cancelamento do trem (decidir alugar um carro).",
        "conclusao": "O trem foi cancelado, por isso nós decidimos alugar um carro."
      },
      {
        "oracao": "She studies hard because she wants to get a scholarship.",
        "pergunta": "Por que se usou 'because' e não 'so'?",
        "resposta": "Porque a oração que se segue explica o motivo (a causa) pela qual ela estuda com afinco.",
        "conclusao": "Ela estuda com afinco porque quer conseguir uma bolsa de estudos."
      },
      {
        "oracao": "Would you like coffee, tea, or mineral water?",
        "pergunta": "Qual o papel de 'or' nesta oração interrogativa?",
        "resposta": "Oferecer opções e alternativas das quais o ouvinte pode selecionar uma.",
        "conclusao": "Você gostaria de café, chá ou água mineral?"
      },
      {
        "oracao": "He worked twelve hours today, but he is not tired.",
        "pergunta": "Por que a conjunção 'but' foi empregada aqui?",
        "resposta": "Porque introduz um contraste inesperado: o normal após trabalhar 12 horas seria estar cansado.",
        "conclusao": "Ele trabalhou doze horas hoje, mas não está cansado."
      }
    ],
    "armadilhas": [
      {
        "errado": "It was raining because I took an umbrella.",
        "certo": "It was raining, so I took an umbrella. / I took an umbrella because it was raining.",
        "motivo": "Inversão de causa e efeito. 'Because' explica o motivo; 'so' mostra o resultado."
      },
      {
        "errado": "I like coffee, but I like tea too.",
        "certo": "I like coffee, and I like tea too.",
        "motivo": "Para somar preferências sem oposição, use 'and', não 'but'."
      },
      {
        "errado": "She didn't come so she was sick.",
        "certo": "She didn't come because she was sick.",
        "motivo": "Estar doente foi o motivo da ausência; logo, usa-se 'because'."
      },
      {
        "errado": "Do you want to drive and take the train?",
        "certo": "Do you want to drive or take the train?",
        "motivo": "Para apresentar alternativas em uma escolha, use 'or'."
      }
    ],
    "coda": "AND soma (+), BUT contrasta (≠), OR oferece escolha (?). BECAUSE explica o motivo (←) e SO mostra o resultado (→).",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com a conjunção de consequência:\n\n\"The restaurant was completely full, ___ we went to another place.\"\n(= O restaurante estava completamente cheio, por isso fomos a outro lugar.)",
        "opcoes": ["because", "so", "but", "or"],
        "resposta": 1,
        "explicacao": "SO indica o resultado prático que se seguiu à causa."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a conjunção explicativa de motivo:\n\n\"Lucas stayed in bed today ___ he had a severe fever.\"\n(= Lucas ficou na cama hoje porque estava com febre alta.)",
        "opcoes": ["so", "because", "but", "and"],
        "resposta": 1,
        "explicacao": "BECAUSE introduz a justificativa e causa da ação."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a conjunção de contraste:\n\n\"The laptop is very powerful, ___ it is quite heavy to carry.\"\n(= O notebook é muito potente, mas é bastante pesado para carregar.)",
        "opcoes": ["and", "or", "but", "so"],
        "resposta": 2,
        "explicacao": "BUT expressa a ressalva e oposição entre ser potente e ser pesado."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a conjunção de alternativa:\n\n\"Would you prefer to pay in cash ___ by credit card?\"\n(= Você prefere pagar em dinheiro ou com cartão de crédito?)",
        "opcoes": ["and", "or", "but", "because"],
        "resposta": 1,
        "explicacao": "OR apresenta alternativas de escolha."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com a conjunção correta:\n\n\"I woke up late, ___ I missed the morning train.\"\n(Eu acordei tarde, por isso perdi o trem da manhã.)",
        "revelacao": "I woke up late, so I missed the morning train.",
        "explicacao": "So introduz a consequência direta."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"She bought apples, oranges, ___ bananas at the supermarket.\"\n(Ela comprou maçãs, laranjas e bananas no supermercado.)",
        "revelacao": "She bought apples, oranges, and bananas at the supermarket.",
        "explicacao": "And para somar itens de uma lista."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"We wanted to go for a walk, ___ it started to rain heavily.\"\n(Queríamos dar uma caminhada, mas começou a chover forte.)",
        "revelacao": "We wanted to go for a walk, but it started to rain heavily.",
        "explicacao": "But para contrariar o desejo inicial."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"I am studying English ___ I want to work abroad.\"\n(Estou estudando inglês porque quero trabalhar no exterior.)",
        "revelacao": "I am studying English because I want to work abroad.",
        "explicacao": "Because explica a motivação."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a conjunção que significa 'por isso / então':\n\n\"The weather was terrible, ___ we stayed home all day.\"",
        "resposta": "so",
        "explicacao": "So expressa consequência."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a conjunção que significa 'porque':\n\n\"I called you ___ I needed your advice.\"",
        "resposta": "because",
        "explicacao": "Because expressa a causa."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a conjunção de oposição / contraste:\n\n\"He is very rich, ___ he lives very simply.\" (mas)",
        "resposta": "but",
        "explicacao": "But expressa contraste."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a conjunção de alternativa:\n\n\"Do you prefer tea ___ coffee in the morning?\" (ou)",
        "resposta": "or",
        "explicacao": "Or expressa alternativa."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 30: Adjectives & Word Order
  // ─────────────────────────────────────────────────────────────
  "a1-lez30": {
    "id": "a1-lez30",
    "num": "Lesson 30",
    "titulo": "Adjectives & Word Order",
    "subtitulo": "A Ordem Canônica dos Modificadores — Adjective Before Noun",
    "cena": {
      "origem": "dialogo",
      "titulo": "Describing a Lost Pet",
      "texto": "**Officer:** Can you describe your missing dog, please?\n**Owner:** Yes! He is a small brown dog with long ears.\n**Owner:** He also wears a shiny red collar with my phone number on it.\n**Officer:** Don't worry, ma'am. We have dedicated officers searching the park right now."
    },
    "fio": {
      "abertura": "Chegamos ao ápice do Módulo A1! E aqui jaz uma das marcas mais registradas da mentalidade da língua inglesa: onde você coloca a qualidade das coisas.",
      "descoberta": "Repare na dona do cãozinho: ela disse «small brown dog» e «shiny red collar». Em inglês, a característica vem ANTES do substantivo, como uma coroa que prepara o ouvinte para a palavra principal. Além disso, o adjetivo nunca ganha 'S' de plural!",
      "fecho": "Parabéns! Você concluiu com maestria todo o Módulo A1. Você domina a base estrutural mais sólida de toda a língua inglesa, com 30 lições no mais alto padrão de qualidade didática."
    },
    "alerta": "No Brasil dizemos 'carro vermelho' e 'carros vermelhos'. No inglês é estritamente obrigatório dizer 'red car' (adjetivo antes) e 'red cars' (o adjetivo NUNCA vai para o plural).",
    "definicao": {
      "fenomeno": "A red car · An expensive house · Fast cars (nunca fasts cars) · An interesting book",
      "causa": "Por que o adjetivo precede o substantivo em inglês?",
      "conceito": "Na sintaxe germânica do inglês, **os modificadores antecedem o núcleo substantivo** (*head noun*). O adjetivo serve como um filtro antecipado que define o objeto. Sendo puramente qualificadores invariáveis, adjetivos **nunca flexionam em gênero nem em número**."
    },
    "inventario": [
      "A posição canônica: Adjetivo ANTES do substantivo (*a fast car*, nunca *a car fast*)",
      "A posição predicativa: Adjetivo APÓS o verbo To Be (*The car is fast*)",
      "A invariabilidade absoluta: adjetivos nunca recebem '-s' de plural (*blue eyes*, não *blues eyes*)",
      "A ordem dos múltiplos adjetivos: Opinião → Tamanho → Idade → Cor → Origem → Material",
      "A concordância do artigo: a/an olha para o som da palavra imediatamente seguinte (*an old car*)"
    ],
    "tabela_visual": "| Posição | Estrutura | Exemplo Real | Tradução Portuguesa |\n|---|---|---|---|\n| **Atributiva** (Antes do nome) | **[Adjetivo]** + Substantivo | *She bought a **red car**.* | *Ela comprou um carro vermelho.* |\n| **Predicativa** (Após To Be) | Substantivo + **is/are** + **[Adjetivo]** | *Her car is **red**.* | *O carro dela é vermelho.* |\n| **Plural (Invariável)** | **[Adjetivo sem 's']** + Substantivo Plural | *They have **expensive houses**.* | *Eles têm casas caras.* |\n| **Múltiplos Adjetivos** | Opinião + Tamanho + Cor + Nome | *A **lovely small white** house.* | *Uma linda casa branca pequena.* |",
    "observacao_cards": [
      {
        "ingles": "Red car",
        "traducao": "Carro vermelho",
        "genero": "Ordem Atributiva",
        "motivo": "O adjetivo precede obrigatoriamente o substantivo: 'an expensive phone', 'a quiet street'."
      },
      {
        "ingles": "Expensive cars",
        "traducao": "Carros caros (sem 'S')",
        "genero": "Invariabilidade de Plural",
        "motivo": "Nunca adicione 's' em adjetivos! 'Expensives cars' é proibido em inglês."
      },
      {
        "ingles": "The soup is hot",
        "traducao": "A sopa está quente",
        "genero": "Posição Predicativa",
        "motivo": "Após verbos de ligação (be, look, smell, taste, feel), o adjetivo fica no final solto."
      },
      {
        "ingles": "An old car",
        "traducao": "Um carro velho",
        "genero": "Artigo Condicionado",
        "motivo": "O artigo concorda com a palavra vizinha: 'a car' (consoante), mas 'an old car' (old começa com som de vogal)."
      },
      {
        "ingles": "Italian food",
        "traducao": "Comida italiana",
        "genero": "Nacionalidades Maiúsculas",
        "motivo": "Adjetivos pátrios são sempre capitalizados com letra maiúscula: 'Brazilian coffee', 'Japanese technology'."
      },
      {
        "ingles": "OSASCOMP",
        "traducao": "Ordem dos Múltiplos Adjetivos",
        "genero": "Mnemônico Nativo",
        "motivo": "Opinion, Size, Age, Shape, Color, Origin, Material, Purpose: 'A beautiful small old round black Italian leather driving glove'."
      }
    ],
    "tecnica": "### O Passo a Passo de Construção de Frases com Adjetivos:\n\n1. **Você quer qualificar o substantivo diretamente?**\n   - Coloque o adjetivo **PRIMEIRO**, e o substantivo **DEPOIS**:\n     *A good friend* · *An interesting job*.\n\n2. **O substantivo está no plural?**\n   - Coloque 'S' **APENAS no substantivo**:\n     *Good friends* (e nunca *Goods friends*).\n\n3. **Há mais de um adjetivo?**\n   - Siga a ordem natural: Opinião antes de fatos físicos:\n     *A beautiful (opinião) blue (cor) jacket (substantivo)*.",
    "teoria": "### A Ordem Natural dos Adjetivos em Inglês\n\nNativos de língua inglesa seguem uma ordem inconsciente, mas extremamente rígida, quando acumulam adjetivos antes de um substantivo. Essa ordem é resumida na regra **OSASCOMP**:\n\n1. **Opinion (Opinião/Julgamento):** *beautiful, lovely, horrible, delicious*.\n2. **Size (Tamanho):** *big, small, huge, tiny, long*.\n3. **Age (Idade/Época):** *old, young, modern, antique*.\n4. **Shape (Forma):** *round, square, oval*.\n5. **Color (Cor):** *blue, green, red, dark*.\n6. **Origin (Origem/Nacionalidade):** *Brazilian, French, Japanese*.\n7. **Material (Material de fabricação):** *wooden, leather, gold, plastic*.\n8. **Purpose (Finalidade/Função):** *sleeping (bag), running (shoes)*.\n\n*Exemplo:* **A beautiful small old Brazilian wooden table.**",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: A Inversão Sistemática\n\n1. **A Inversão Adjetivo-Substantivo:**\n   - Português: Substantivo primeiro, adjetivo depois (*\"Eu comprei um livro interessante.\"*).\n   - Inglês: Adjetivo primeiro, substantivo depois (**\"I bought an interesting book.\"**).\n\n2. **O Plural Inexistente nos Adjetivos:**\n   - No português, tudo concorda em plural: *\"Os carros amarelos são rápidos.\"* (4 palavras no plural!).\n   - No inglês, apenas o verbo e o substantivo pluralizam: **\"The yellow cars are fast.\"** (Amarelo e rápido ficam intocados no singular).",
    "exemplos_prc": [
      {
        "oracao": "She bought an expensive leather jacket in Milan.",
        "pergunta": "Qual a ordem dos adjetivos em relação ao substantivo 'jacket'?",
        "resposta": "Vieram antes do substantivo na ordem: opinião/preço ('expensive') seguido do material ('leather') antes do nome ('jacket').",
        "conclusao": "Ela comprou uma jaqueta de couro cara em Milão."
      },
      {
        "oracao": "They have two friendly golden retrievers in their backyard.",
        "pergunta": "Por que a palavra 'friendly' não recebeu 's' se são dois cães?",
        "resposta": "Porque 'friendly' é um adjetivo, e adjetivos em inglês são estritamente invariáveis em número.",
        "conclusao": "Eles têm dois golden retrievers amigáveis no quintal deles."
      },
      {
        "oracao": "This soup smells delicious, but it is extremely hot.",
        "pergunta": "Por que 'delicious' e 'hot' estão depois dos verbos e não antes de substantivos?",
        "resposta": "Porque funcionam como adjetivos predicativos após os verbos de ligação 'smells' e 'is'.",
        "conclusao": "Esta sopa tem um cheiro delicioso, mas está extremamente quente."
      },
      {
        "oracao": "We stayed at a charming historic hotel near the cathedral.",
        "pergunta": "Por que o artigo 'a' foi usado em vez de 'an'?",
        "resposta": "Porque o adjetivo que vem imediatamente após o artigo ('charming') começa com som consonantal (/tʃ/).",
        "conclusao": "Ficamos em um hotel histórico charmoso perto da catedral."
      }
    ],
    "armadilhas": [
      {
        "errado": "I have a car red.",
        "certo": "I have a red car.",
        "motivo": "Em inglês o adjetivo deve vir ANTES do substantivo: red car."
      },
      {
        "errado": "She has blues eyes.",
        "certo": "She has blue eyes.",
        "motivo": "Adjetivos em inglês NUNCA vão para o plural. Elimine o 's' de 'blue'."
      },
      {
        "errado": "They are very richs people.",
        "certo": "They are very rich people.",
        "motivo": "'Rich' é adjetivo e permanece invariável no singular."
      },
      {
        "errado": "He lives in a big old beautiful house.",
        "certo": "He lives in a beautiful big old house.",
        "motivo": "Adjetivos de opinião (beautiful) devem preceder tamanho (big) e idade (old)."
      }
    ],
    "coda": "Adjetivo vem antes do nome e NUNCA ganha 'S' de plural. Essa é a assinatura de quem fala inglês de verdade.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Qual frase em inglês traduz com precisão:\n\n\"Eles moram em uma casa antiga muito bonita.\"",
        "opcoes": [
          "They live in a house old very beautiful.",
          "They live in a very beautiful old house.",
          "They live in a old very beautiful house.",
          "They live in a very beautiful house old."
        ],
        "resposta": 1,
        "explicacao": "Os adjetivos devem vir antes do substantivo (house), na ordem: opinião (beautiful) + idade (old): 'a very beautiful old house'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Identifique a frase gramaticalmente CORRETA em inglês:",
        "opcoes": [
          "She has long browns hairs.",
          "She has brown long hair.",
          "She has long brown hair.",
          "She has hairs long brown."
        ],
        "resposta": 2,
        "explicacao": "'Long brown hair': tamanho antes de cor, adjetivos invariáveis sem 's' e 'hair' incontável."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase evita o erro clássico de plural no adjetivo?",
        "opcoes": [
          "We visited three moderns museums in Paris.",
          "We visited three modern museums in Paris.",
          "We visited three museums moderns in Paris.",
          "We visited three museums modern in Paris."
        ],
        "resposta": 1,
        "explicacao": "Adjetivos em inglês nunca recebem 's' de plural: 'three modern museums'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a ordem e artigo corretos:\n\n\"Lucas bought ___ yesterday at the downtown store.\"\n(= Lucas comprou uma jaqueta de couro preta cara ontem.)",
        "opcoes": [
          "a black leather expensive jacket",
          "an expensive black leather jacket",
          "a leather black expensive jacket",
          "an expensive jacket black leather"
        ],
        "resposta": 1,
        "explicacao": "'An expensive black leather jacket': artigo 'an' para som vocálico de expensive + cor (black) + material (leather) + substantivo (jacket)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com o adjetivo antes do substantivo:\n\n\"She drives a ___ to work every day.\"\n(Ela dirige um carro elétrico rápido para o trabalho todo dia.)",
        "revelacao": "She drives a fast electric car to work every day.",
        "explicacao": "Fast (velocidade/opinião) + electric (tipo/propósito) + car."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com adjetivos plurais invariáveis:\n\n\"They sell ___ in this antique boutique.\"\n(Eles vendem relógios caros nesta loja de antiguidades.)",
        "revelacao": "They sell expensive watches in this antique boutique.",
        "explicacao": "Expensive (sem 's') + watches."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"It was a ___ evening in Florence.\"\n(Foi uma noite quente adorável em Florença.)",
        "revelacao": "It was a lovely warm evening in Florence.",
        "explicacao": "Lovely (opinião) + warm (sensação térmica) + evening."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"I love drinking hot ___ on cold winter mornings.\"\n(Eu adoro beber café brasileiro quente nas manhãs frias de inverno.)",
        "revelacao": "I love drinking hot Brazilian coffee on cold winter mornings.",
        "explicacao": "Hot + Brazilian (com maiúscula) + coffee."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a ordem correta para 'carro novo':\n\n\"Carlos bought a ___ yesterday.\" (novo carro)",
        "resposta": "new car",
        "explicacao": "Adjetivo antes do substantivo: new car."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma correta do adjetivo (sem 's') antes de 'shoes':\n\n\"These are very ___ shoes.\" (confortáveis - comfortable)",
        "resposta": "comfortable",
        "explicacao": "Adjetivos em inglês nunca recebem 's'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o adjetivo pátrio com letra maiúscula:\n\n\"We love ___ cuisine.\" (italiana)",
        "resposta": "Italian",
        "explicacao": "Nacionalidades são sempre capitalizadas em inglês: Italian."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o adjetivo correto antes de 'problem':\n\n\"This is a very ___ problem.\" (difícil - difficult)",
        "resposta": "difficult",
        "explicacao": "A difficult problem."
      }
    ]
  }
};

console.log('Gravando Onda 3 Parte 3 (Lições 26 a 30) — Conclusão do Módulo A1...');

for (const [id, lessonData] of Object.entries(wave3Part3Lessons)) {
  for (const mod of data.moduli) {
    const idx = mod.lezioni.findIndex(l => l.id === id);
    if (idx !== -1) {
      mod.lezioni[idx] = lessonData;
      console.log(`Lição ${id} (${lessonData.titulo}) enriquecida com sucesso!`);
    }
  }
}

fs.writeFileSync(grammarPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Onda 3 Parte 3 gravada com sucesso! Módulo A1 100% completo!');
