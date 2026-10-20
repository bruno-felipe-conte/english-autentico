import fs from 'fs';

const grammarPath = 'data/grammar.json';
const data = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));

// Onda 2 Parte 2: Lições A1.11 a A1.15
const wave2Part2Lessons = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 11: Present Simple (Negative) — Don't vs Doesn't
  // ─────────────────────────────────────────────────────────────
  "a1-lez11": {
    "id": "a1-lez11",
    "num": "Lesson 11",
    "titulo": "Present Simple (Negative)",
    "subtitulo": "Negação no Presente — Don't vs Doesn't",
    "cena": {
      "origem": "dialogo",
      "titulo": "Dietary Habits at Lunch",
      "texto": "**Waiter:** Are you ready to order, or would you like to hear today's specials?\n**Daniel:** I don't eat meat, so I prefer the vegetarian pasta.\n**Waiter:** Certainly. And for the lady?\n**Daniel:** She doesn't eat dairy products, so she wants the garden salad without cheese.\n**Waiter:** Understood! We don't use butter in our vegan dressings."
    },
    "fio": {
      "abertura": "Para dizer 'não' em inglês, você não pode simplesmente colocar 'not' antes de um verbo de ação. O inglês precisa de um auxiliar para carregar a negação.",
      "descoberta": "Reparou como Daniel disse «I don't eat» para si mesmo, mas ao falar dela disse «she doesn't eat»? E o mais incrível: o verbo 'eat' ficou limpo e puro em ambas as frases! O 'S' migrou para o auxiliar «doesn't».",
      "fecho": "Você acabou de desarmar a armadilha clássica da dupla marcação: quando 'doesn't' entra em cena, o verbo principal descansa na forma básica."
    },
    "alerta": "No Brasil dizemos simplesmente 'eu não trabalho' e 'ela não trabalha'. No inglês, 'no work' não existe. Você precisa dominar a dupla 'don't' e 'doesn't'.",
    "definicao": {
      "fenomeno": "I don't smoke · You don't know · He doesn't drive · She doesn't like spicy food · It doesn't work",
      "causa": "Por que o verbo principal perde o 'S' quando usamos 'doesn't'?",
      "conceito": "O auxiliar 'DOES' já absorveu a marca de 3ª pessoa do singular. Como a regra do inglês proíbe redundância morfológica, o verbo principal volta obrigatoriamente à sua **forma básica** (*base form*)."
    },
    "inventario": [
      "O uso do auxiliar negativo DON'T (do + not) para I, You, We, They",
      "O uso do auxiliar negativo DOESN'T (does + not) para He, She, It",
      "A regra do verbo principal puro após doesn't (he doesn't like, nunca likes)",
      "A proibição absoluta de 'no + verbo' (*I no have*)",
      "Formas completas vs contraídas (do not / does not vs don't / doesn't)"
    ],
    "tabela_visual": "| Sujeito | Auxiliar Negativo | Verbo Principal (Forma Básica) | Exemplo Real |\n|---|---|---|---|\n| **I** | **don't** (do not) | drink | *I don't drink alcohol.* |\n| **You** | **don't** (do not) | need | *You don't need a visa here.* |\n| **He** | **doesn't** (does not) | smoke | *He doesn't smoke anymore.* |\n| **She** | **doesn't** (does not) | eat | *She doesn't eat fast food.* |\n| **It** | **doesn't** (does not) | work | *The remote doesn't work.* |\n| **We** | **don't** (do not) | live | *We don't live in the city.* |\n| **They** | **don't** (do not) | agree | *They don't agree with the price.* |",
    "observacao_cards": [
      {
        "ingles": "I don't",
        "traducao": "Eu não (+ verbo)",
        "genero": "1ª Pessoa",
        "motivo": "Contração de 'do not'. É a ferramenta universal de negação de hábitos pessoais: 'I don't know'."
      },
      {
        "ingles": "You don't",
        "traducao": "Você não / Vocês não",
        "genero": "2ª Pessoa",
        "motivo": "Serve tanto para uma pessoa quanto para um grupo: 'You don't have to apologize'."
      },
      {
        "ingles": "He doesn't",
        "traducao": "Ele não (+ verbo)",
        "genero": "3ª Pessoa Masculina",
        "motivo": "O 'es' já está aqui dentro (/ˈdʌznt/). O verbo que vem a seguir fica 100% puro."
      },
      {
        "ingles": "She doesn't",
        "traducao": "Ela não (+ verbo)",
        "genero": "3ª Pessoa Feminina",
        "motivo": "Mesma lógica: 'She doesn't work on Saturdays' (e nunca 'works')."
      },
      {
        "ingles": "It doesn't",
        "traducao": "Não (+ verbo neutro)",
        "genero": "3ª Pessoa Neutra",
        "motivo": "Usado para aparelhos, tempo e situações: 'It doesn't matter' (Não importa) / 'It doesn't rain much'."
      },
      {
        "ingles": "We / They don't",
        "traducao": "Nós não / Eles não",
        "genero": "Plurais",
        "motivo": "Nos plurais volta o 'don't': 'We don't want' / 'They don't understand'."
      }
    ],
    "tecnica": "### Passo a Passo para Negar no Present Simple:\n\n1. **Identifique o sujeito da oração:**\n   - É `He`, `She` ou `It` (singular)? → Use **doesn't**.\n   - É `I`, `You`, `We` ou `They`? → Use **don't**.\n\n2. **Insira o verbo na forma pura de dicionário:**\n   - *To understand* → `understand`.\n   - *To like* → `like`.\n\n3. **Verificação de segurança (Anti-Erro):**\n   - Se você usou *doesn't*, certifique-se de que o verbo NÃO tem 'S'.\n   - Certo: *She doesn't like*.\n   - Errado: *She doesn't likes* (o 'S' já está no *doesn't*!).",
    "teoria": "### O Papel dos Auxiliares no Sistema Verbal Inglês\n\nNo inglês, os verbos comuns (como *work, live, understand, go*) são considerados **verbos fracos**: eles são incapazes de receber a partícula negativa *not* diretamente. Eles necessitam do verbo auxiliar **DO / DOES** como suporte sintático.\n\n#### A Metáfora do Ímã:\nPense no auxiliar *DOES* como um **ímã potente**: ele atrai para si o 'S' que antes ficava no verbo principal:\n* Afirmativa: *He work**s**.*\n* Negativa: *He doe**s**n't work.* (o 'S' foi sugado pelo auxiliar!).\n\n<div class=\"gram-regola\"><strong>Atenção com o Verbo To Be:</strong> O verbo To Be é forte e autossuficiente: ele NUNCA usa <em>don't</em> ou <em>doesn't</em>. Diga <em>He is not here</em> (nunca <em>He doesn't be here</em>).</div>",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: O Vício do 'I No'\n\n1. **A tentação fatal do 'No + Verbo':**\n   - Em português dizemos: *\"Eu não falo espanhol.\"* (não + verbo).\n   - Muitos brasileiros traduzem literalmente: *\"I no speak Spanish\"*. Isso é gramaticalmente infantil em inglês.\n   - A forma correta exige o auxiliar: **I don't speak Spanish.**\n\n2. **A Dupla Marcação:**\n   - Em português o verbo continua conjugado na negativa: *\"Ele trabalha\"* → *\"Ele não trabalha\"*.\n   - No inglês, se você mantiver o 'S' (*He doesn't works*), soará aos ouvidos nativos como uma redundância gritante.",
    "exemplos_prc": [
      {
        "oracao": "Lucas doesn't drink coffee after 4:00 PM.",
        "pergunta": "Por que o verbo 'drink' não recebeu o 's' se o sujeito é Lucas (He)?",
        "resposta": "Porque a presença do auxiliar 'doesn't' já marca a 3ª pessoa do singular, fazendo o verbo principal voltar à forma básica.",
        "conclusao": "Lucas não bebe café depois das 16h."
      },
      {
        "oracao": "We don't need additional assistance with this project.",
        "pergunta": "Por que se usou 'don't' e não 'doesn't'?",
        "resposta": "Porque o sujeito é 'We' (1ª pessoa plural), que exige o auxiliar 'don't'.",
        "conclusao": "Nós não precisamos de ajuda adicional com este projeto."
      },
      {
        "oracao": "This credit card doesn't charge foreign transaction fees.",
        "pergunta": "Qual é o sujeito desta frase e qual o seu pronome correspondente?",
        "resposta": "O sujeito é 'This credit card', que corresponde ao pronome neutro 'It' (singular), exigindo 'doesn't'.",
        "conclusao": "Este cartão de crédito não cobra taxas de transações internacionais."
      },
      {
        "oracao": "They don't understand our perspective on this topic.",
        "pergunta": "Por que não se diz 'They no understand'?",
        "resposta": "Porque a palavra 'no' é um determinante ou resposta isolada, nunca o operador negativo de verbos de ação.",
        "conclusao": "Eles não entendem a nossa perspectiva sobre este tópico."
      }
    ],
    "armadilhas": [
      {
        "errado": "I no understand this instruction.",
        "certo": "I don't understand this instruction.",
        "motivo": "'No' não nega verbos de ação. Use 'don't'."
      },
      {
        "errado": "She doesn't works on Sundays.",
        "certo": "She doesn't work on Sundays.",
        "motivo": "Após 'doesn't', o verbo principal NUNCA recebe 's'. O auxiliar já tem o 'es'."
      },
      {
        "errado": "He doesn't is at the office.",
        "certo": "He isn't at the office. / He is not at the office.",
        "motivo": "O verbo To Be nega sozinho (is not / isn't). Nunca use doesn't com To Be."
      },
      {
        "errado": "My friends doesn't like this music.",
        "certo": "My friends don't like this music.",
        "motivo": "'My friends' é plural (They) → deve-se usar 'don't', não 'doesn't'."
      }
    ],
    "coda": "Para negar rotina: I/You/We/They usam DON'T. He/She/It usam DOESN'T + verbo puro. 'No speak' nunca mais!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a frase negativa de rotina:\n\n\"Amanda ___ sugar in her coffee.\"\n(= Amanda não coloca açúcar no café dela.)",
        "opcoes": ["don't put", "doesn't put", "doesn't puts", "no puts"],
        "resposta": 1,
        "explicacao": "Amanda = She → usa-se DOESN'T + verbo na forma pura (put)."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase está gramaticalmente PERFEITA em inglês?",
        "opcoes": [
          "They doesn't live in this neighborhood.",
          "They no live in this neighborhood.",
          "They don't live in this neighborhood.",
          "They don't lives in this neighborhood."
        ],
        "resposta": 2,
        "explicacao": "Com o sujeito 'They' usa-se 'don't' seguido do verbo básico 'live'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete sobre um aparelho com defeito:\n\n\"The air conditioner ___ properly today.\"\n(= O ar-condicionado não está funcionando adequadamente hoje.)",
        "opcoes": ["don't work", "doesn't work", "doesn't works", "isn't work"],
        "resposta": 1,
        "explicacao": "The air conditioner = It → usa-se 'doesn't work'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a negação pessoal:\n\n\"I ___ why the flight is delayed.\"\n(= Eu não sei por que o voo está atrasado.)",
        "opcoes": ["not know", "no know", "don't know", "doesn't know"],
        "resposta": 2,
        "explicacao": "Com o sujeito 'I', a negação obrigatória é DON'T KNOW."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente a negação correta:\n\n\"He ___ meat because he is a vegetarian.\"\n(Ele não come carne porque é vegetariano.)",
        "revelacao": "He doesn't eat meat because he is a vegetarian.",
        "explicacao": "Doesn't + eat (verbo puro sem 's')."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"We ___ on weekends.\"\n(Nós não trabalhamos nos fins de semana.)",
        "revelacao": "We don't work on weekends.",
        "explicacao": "We don't work."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"The train ___ at this station on Sundays.\"\n(O trem não para nesta estação aos domingos.)",
        "revelacao": "The train doesn't stop at this station on Sundays.",
        "explicacao": "The train = It → doesn't stop."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"You ___ need an umbrella today; it is sunny.\"\n(Você não precisa de guarda-chuva hoje; está ensolarado.)",
        "revelacao": "You don't need an umbrella today; it is sunny.",
        "explicacao": "You don't need."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o auxiliar negativo contraído que falta:\n\n\"She ___ speak French, only Italian.\" (não fala)",
        "resposta": "doesn't",
        "explicacao": "Sujeito She exige o auxiliar doesn't."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o auxiliar negativo contraído que falta:\n\n\"I ___ have enough time to finish this report.\" (não tenho)",
        "resposta": "don't",
        "explicacao": "Sujeito I exige o auxiliar don't."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma correta do verbo 'drive' após doesn't:\n\n\"Carlos has a car, but he doesn't ___ to work.\" (dirigir)",
        "resposta": "drive",
        "explicacao": "Após doesn't o verbo fica puro sem 's': drive."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o auxiliar negativo para 'They':\n\n\"My colleagues ___ agree with that decision.\" (não concordam)",
        "resposta": "don't",
        "explicacao": "My colleagues = They → don't."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 12: Present Simple (Questions) — Do vs Does
  // ─────────────────────────────────────────────────────────────
  "a1-lez12": {
    "id": "a1-lez12",
    "num": "Lesson 12",
    "titulo": "Present Simple (Questions)",
    "subtitulo": "Perguntas de Sim/Não e Respostas Curtas — Do vs Does",
    "cena": {
      "origem": "dialogo",
      "titulo": "Interviewing a Job Candidate",
      "texto": "**Recruiter:** Welcome, Julia. Do you live in Chicago?\n**Julia:** Yes, I do. I moved here two years ago.\n**Recruiter:** Great. And does your previous employer know you are applying here?\n**Julia:** Yes, he does. He supports my career growth.\n**Recruiter:** Excellent. Do you have any questions about the role?"
    },
    "fio": {
      "abertura": "Para fazer uma pergunta em português, basta mudar a entonação da voz: 'Você fala inglês?'. Mas no inglês, a pergunta precisa ser anunciada logo na primeira sílaba com um auxiliar dedicado.",
      "descoberta": "Reparou como o recrutador iniciou com «Do you live» e depois «Does your employer know»? E quando Julia respondeu, ela não disse apenas 'Yes', mas «Yes, I do» e «Yes, he does»! Essa é a elegância das Short Answers.",
      "fecho": "Agora você sabe abrir qualquer pergunta de rotina e responder com a polidez e a autoridade que os nativos esperam em conversas profissionais."
    },
    "alerta": "Nunca pergunte *\"You speak English?\"* em contextos formais. A ausência de 'Do' soa desleixada. Empregue sempre o auxiliar 'Do' ou 'Does' na abertura da pergunta.",
    "definicao": {
      "fenomeno": "Do you speak English? · Does he work here? · Do they know the answer?",
      "causa": "Por que precisamos de 'Do' ou 'Does' se a palavra não tem tradução para o português?",
      "conceito": "'DO' e 'DOES' funcionam como **marcadores gramaticais de pergunta**: ao ouvir a primeira palavra, o cérebro do ouvinte já sabe que se trata de uma interrogação no presente. Na 3ª pessoa singular, 'DOES' assume o 'S', deixando o verbo principal na forma pura."
    },
    "inventario": [
      "A estrutura da pergunta de Sim/Não: DO/DOES + Sujeito + Verbo Básico?",
      "O uso de DO para I, You, We, They",
      "O uso de DOES para He, She, It",
      "A regra do verbo principal sem 'S' após DOES",
      "Respostas curtas polidas (*Short Answers*): Yes, I do / No, I don't"
    ],
    "tabela_visual": "| Auxiliar Interrogativo | Sujeito | Verbo Principal | Resposta Curta Afirmativa | Resposta Curta Negativa |\n|---|---|---|---|---|\n| **Do** | **you** | live here? | *Yes, I do.* | *No, I don't.* |\n| **Does** | **he** | work here? | *Yes, he does.* | *No, he doesn't.* |\n| **Does** | **she** | speak Spanish? | *Yes, she does.* | *No, she doesn't.* |\n| **Does** | **it** | rain often? | *Yes, it does.* | *No, it doesn't.* |\n| **Do** | **we** | have time? | *Yes, we do.* | *No, we don't.* |\n| **Do** | **they** | agree? | *Yes, they do.* | *No, they don't.* |",
    "observacao_cards": [
      {
        "ingles": "Do you...?",
        "traducao": "Você (+ verbo)?",
        "genero": "Abertura de Pergunta",
        "motivo": "A chave mágica de quase todas as perguntas cotidianas: 'Do you work here?' / 'Do you have a pen?'"
      },
      {
        "ingles": "Does he / she...?",
        "traducao": "Ele / Ela (+ verbo)?",
        "genero": "Pergunta 3ª Pessoa",
        "motivo": "Does (/dʌz/) carrega a marca de 3ª pessoa. O verbo que vem depois fica 100% puro: 'Does he like coffee?'"
      },
      {
        "ingles": "Yes, I do",
        "traducao": "Sim (afirmativa curta)",
        "genero": "Resposta Curta",
        "motivo": "Soa infinitamente mais natural e educado do que um seco 'Yes'. Reutiliza o auxiliar da pergunta."
      },
      {
        "ingles": "No, I don't",
        "traducao": "Não (negativa curta)",
        "genero": "Resposta Curta",
        "motivo": "Padrão de polidez para negar com respeito: 'Do you smoke? — No, I don't.'"
      },
      {
        "ingles": "Yes, he does",
        "traducao": "Sim, ele (+ faz/é)",
        "genero": "Resposta Curta 3ª P.",
        "motivo": "Responde perguntas feitas com 'Does': 'Does she work here? — Yes, she does.'"
      },
      {
        "ingles": "No, she doesn't",
        "traducao": "Não, ela não (+ faz)",
        "genero": "Resposta Curta 3ª P.",
        "motivo": "Negação curta na 3ª pessoa: 'Does the train stop here? — No, it doesn't.'"
      }
    ],
    "tecnica": "### Fórmula para Montar Perguntas de Sim/Não no Presente:\n\n$$\\mathbf{DO / DOES} + \\text{[Sujeito]} + \\text{[Verbo Puro]} + \\text{[Complemento]}?$$\n\n1. **Escolha o auxiliar pelo sujeito:**\n   - Sujeito é He, She ou It? → Comece com **Does**.\n   - Sujeito é I, You, We ou They? → Comece com **Do**.\n\n2. **Coloque o verbo principal na forma mais básica:**\n   - Mesmo com *Does*, o verbo principal NÃO ganha 'S' (*Does she work?*, nunca *Does she works?*).\n\n3. **Para responder:**\n   - Sim: `Yes, [pronome] + do/does`.\n   - Não: `No, [pronome] + don't/doesn't`.",
    "teoria": "### A Importância das Short Answers na Cultura de Língua Inglesa\n\nEm países anglo-saxões, responder a uma pergunta de sim/não apenas com a palavra **\"Yes\"** ou **\"No\"** pode soar excessivamente ríspido, seco ou desinteressado.\n\n* Perguntaram: *Do you speak English?*\n* Resposta nativa polida: **\"Yes, I do.\"** ou **\"No, I don't, but I am learning.\"**\n\n#### Não Repita o Verbo Principal na Resposta Curta:\nEm português costumamos responder repetindo o verbo: *\"Você estuda aqui? — Estudo.\"*\nEm inglês, você NUNCA responde com o verbo principal (*Do you study here? — I study* ❌). Responda sempre com o auxiliar: **Yes, I do** ✓.",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: A Ausência do 'Do'\n\n1. **A tentação de usar apenas a entonação:**\n   - Português: *\"Você mora perto daqui?\"* (afirmação com ponto de interrogação no tom).\n   - No inglês isso só é usado em momentos de espanto (*You live here?!*). Em perguntas normais de rotina, o **Do** é estritamente obrigatório: **Do you live near here?**\n\n2. **A Resposta Eco do Português:**\n   - Português: *\"Ela gosta de chocolate? — Gosta.\"*\n   - Inglês: **Does she like chocolate? — Yes, she does.** (Jamais diga *She likes* como resposta curta).",
    "exemplos_prc": [
      {
        "oracao": "Does your company offer remote work options?",
        "pergunta": "Por que a pergunta começou com 'Does' e não com 'Do'?",
        "resposta": "Porque o sujeito é 'your company', que é um substantivo singular neutro correspondente a 'It'.",
        "conclusao": "A sua empresa oferece opções de trabalho remoto?"
      },
      {
        "oracao": "Do you need a receipt for this purchase? — Yes, I do, please.",
        "pergunta": "Qual a estrutura da resposta curta utilizada?",
        "resposta": "Yes + pronome sujeito correspondente (I) + auxiliar da pergunta (do).",
        "conclusao": "Você precisa de recibo para esta compra? — Sim, preciso, por favor."
      },
      {
        "oracao": "Does David travel frequently for his job? — No, he doesn't.",
        "pergunta": "Por que o verbo 'travel' não tem 's' nesta frase?",
        "resposta": "Porque a marca de 3ª pessoa do singular já está contida no auxiliar 'Does' no início da oração.",
        "conclusao": "O David viaja frequentemente pelo trabalho dele? — Não, ele não viaja."
      },
      {
        "oracao": "Do they accept credit cards at this store?",
        "pergunta": "Como formular a resposta curta negativa?",
        "resposta": "No, they don't.",
        "conclusao": "Eles aceitam cartão de crédito nesta loja?"
      }
    ],
    "armadilhas": [
      {
        "errado": "You have a car?",
        "certo": "Do you have a car?",
        "motivo": "Em perguntas normais de rotina, o auxiliar 'Do' é obrigatório no início."
      },
      {
        "errado": "Does she likes Italian food?",
        "certo": "Does she like Italian food?",
        "motivo": "Com 'Does', o verbo principal fica na forma básica sem 's'."
      },
      {
        "errado": "Do you live in London? — Yes, I live.",
        "certo": "Do you live in London? — Yes, I do.",
        "motivo": "Respostas curtas utilizam o verbo auxiliar 'do', não o verbo principal."
      },
      {
        "errado": "Do he work on Saturdays?",
        "certo": "Does he work on Saturdays?",
        "motivo": "Para He, She e It, o auxiliar interrogativo correto é 'Does'."
      }
    ],
    "coda": "Abra com DO ou DOES, deixe o verbo puro no meio e feche a resposta curta com o mesmo auxiliar. Essa é a coreografia da conversa nativa.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a pergunta no presente:\n\n\"___ your brother play the guitar?\"\n(= O seu irmão toca violão?)",
        "opcoes": ["Do", "Does", "Is", "Has"],
        "resposta": 1,
        "explicacao": "Your brother = He → a pergunta de rotina exige o auxiliar DOES."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual é a resposta curta correta para:\n\n\"Do you work on weekends?\"",
        "opcoes": ["Yes, I work.", "Yes, I do.", "Yes, I am.", "Yes, I have."],
        "resposta": 1,
        "explicacao": "A resposta curta afirmativa padrão em inglês utiliza o auxiliar: 'Yes, I do'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase interrogativa está gramaticalmente CORRETA?",
        "opcoes": [
          "Does Sarah knows the answer?",
          "Does Sarah know the answer?",
          "Do Sarah know the answer?",
          "Is Sarah know the answer?"
        ],
        "resposta": 1,
        "explicacao": "Does + Sarah (She) + know (verbo na forma básica sem 's')."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a pergunta plural:\n\n\"___ your parents live in the same city?\"\n(= Os seus pais moram na mesma cidade?)",
        "opcoes": ["Do", "Does", "Are", "Have"],
        "resposta": 0,
        "explicacao": "Your parents = They (plural) → o auxiliar interrogativo é DO."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente a pergunta:\n\n\"___ you understand what the teacher said?\"\n(Você entende o que o professor disse?)",
        "revelacao": "Do you understand what the teacher said?",
        "explicacao": "Do you understand."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"___ this bus go directly to the airport?\"\n(Este ônibus vai direto para o aeroporto?)",
        "revelacao": "Does this bus go directly to the airport?",
        "explicacao": "This bus = It → Does this bus go."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente a resposta curta negativa:\n\n\"Does he smoke? — No, he ___.\"\n(Ele fuma? — Não, ele não fuma.)",
        "revelacao": "Does he smoke? — No, he doesn't.",
        "explicacao": "Resposta curta negativa na 3ª pessoa: No, he doesn't."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"___ they have reservations for tonight?\"\n(Eles têm reservas para esta noite?)",
        "revelacao": "Do they have reservations for tonight?",
        "explicacao": "Do they have."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o auxiliar interrogativo que falta:\n\n\"___ you speak Portuguese?\"",
        "resposta": "Do",
        "explicacao": "Para o sujeito 'you', o auxiliar é Do."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o auxiliar interrogativo que falta:\n\n\"___ Carlos work in an office or from home?\"",
        "resposta": "Does",
        "explicacao": "Carlos = He → o auxiliar interrogativo é Does."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete a resposta curta negativa:\n\n\"Do you need help with your luggage? — No, I ___.\"",
        "resposta": "don't",
        "explicacao": "No, I don't."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete a resposta curta afirmativa:\n\n\"Does she like her new job? — Yes, she ___.\"",
        "resposta": "does",
        "explicacao": "Yes, she does."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 13: Adverbs of Frequency (Always, Usually, Sometimes, Never)
  // ─────────────────────────────────────────────────────────────
  "a1-lez13": {
    "id": "a1-lez13",
    "num": "Lesson 13",
    "titulo": "Adverbs of Frequency",
    "subtitulo": "Posição e Graduação de Hábitos — Always, Usually, Often, Sometimes, Never",
    "cena": {
      "origem": "dialogo",
      "titulo": "Weekend Lifestyle Habits",
      "texto": "**Emma:** Do you often cook at home on weekends, David?\n**David:** I usually cook on Saturdays, but I never cook on Sundays. We always order food or go to a restaurant.\n**Emma:** I am always tired on Friday nights, so I rarely go out before Saturday afternoon.\n**David:** Same here! Life is often too busy during the week."
    },
    "fio": {
      "abertura": "Com que frequência você estuda? Com que frequência você viaja? Para responder a isso com precisão, o inglês possui uma escala matemática de advérbios de frequência.",
      "descoberta": "Repare onde David colocou os advérbios: «I usually cook» (antes do verbo comum), mas Emma disse «I am always tired» (depois do verbo To Be)! Essa regra de trânsito é rígida em inglês.",
      "fecho": "Você agora domina a bússola de posicionamento dos advérbios: antes de verbos normais, mas sempre depois do verbo To Be."
    },
    "alerta": "No português dizemos *'Sempre eu acordo cedo'* ou *'Eu acordo cedo sempre'*. No inglês o advérbio tem lugar fixo no meio da frase, e 'never' NUNCA aceita 'not' (proibição da dupla negação).",
    "definicao": {
      "fenomeno": "I always drink water · She is always late · We rarely travel · They never complain",
      "causa": "Por que a posição do advérbio muda dependendo do tipo de verbo?",
      "conceito": "Com verbos de ação comuns, o advérbio fica **entre o sujeito e o verbo principal**. Com o verbo **To Be**, o advérbio fica obrigatoriamente **após o verbo**. Além disso, 'never' já é negativo e proíbe o uso de 'don't/doesn't'."
    },
    "inventario": [
      "A escala percentual de frequência (always 100%, usually 80%, often 60%, sometimes 40%, rarely/hardly ever 10%, never 0%)",
      "A regra de posição 1: Sujeito + Advérbio + Verbo Comum",
      "A regra de posição 2: Sujeito + Verbo To Be + Advérbio",
      "A proibição absoluta da dupla negação com NEVER (*I don't never* ❌)",
      "A pergunta de frequência com 'How often...?'"
    ],
    "tabela_visual": "| Frequência Aprox. | Advérbio | Tradução | Exemplo com Verbo Normal | Exemplo com To Be |\n|---|---|---|---|---|\n| **100%** | **always** | sempre | *I always study.* | *He is always happy.* |\n| **80-90%** | **usually / normally** | normalmente, geralmente | *We usually walk.* | *She is usually punctual.* |\n| **60-70%** | **often / frequently** | frequentemente | *They often visit us.* | *It is often cold here.* |\n| **40-50%** | **sometimes** | às vezes | *I sometimes read.* | *They are sometimes late.* |\n| **10-20%** | **rarely / hardly ever** | raramente, quase nunca | *He rarely drinks soda.* | *We are rarely bored.* |\n| **0%** | **never** | nunca | *I never eat fish.* | *He is never angry.* |",
    "observacao_cards": [
      {
        "ingles": "Always (100%)",
        "traducao": "Sempre",
        "genero": "Frequência Máxima",
        "motivo": "Posição: 'I always drink coffee' ou 'I am always busy'. Nunca no início solto."
      },
      {
        "ingles": "Usually (85%)",
        "traducao": "Geralmente / Normalmente",
        "genero": "Hábito Frequente",
        "motivo": "Pronuncia-se /ˈjuːʒuəli/. Indica o padrão normal do seu dia a dia."
      },
      {
        "ingles": "Often (70%)",
        "traducao": "Frequentemente",
        "genero": "Hábito Regular",
        "motivo": "A letra 't' pode ser muda (/ˈɒfən/) ou pronunciada (/ˈɒftən/) — ambas são aceitas no inglês moderno."
      },
      {
        "ingles": "Sometimes (50%)",
        "traducao": "Às vezes",
        "genero": "Hábito Ocasional",
        "motivo": "É o mais flexível: pode vir antes do verbo ('I sometimes cook') ou no início da frase ('Sometimes I cook')."
      },
      {
        "ingles": "Hardly ever / Rarely (15%)",
        "traducao": "Quase nunca / Raramente",
        "genero": "Baixa Frequência",
        "motivo": "'Hardly ever' é extremamente natural e comum na fala britânica e americana."
      },
      {
        "ingles": "Never (0%)",
        "traducao": "Nunca",
        "genero": "Frequência Nula",
        "motivo": "Já contém a negação! Diga 'I never go', NUNCA 'I don't never go'."
      }
    ],
    "tecnica": "### O Semáforo de Posicionamento dos Advérbios:\n\n1. **Verifique se o verbo da frase é o verbo TO BE (am/is/are):**\n   - SIM? → Coloque o advérbio **DEPOIS** do verbo To Be:\n     $$\\text{Sujeito} + \\mathbf{am/is/are} + \\mathbf{Advérbio} + \\text{Complemento}$$\n     *She **is always** on time.*\n\n2. **O verbo é um verbo de ação qualquer (work, live, go, sleep)?**\n   - SIM? → Coloque o advérbio **ANTES** do verbo:\n     $$\\text{Sujeito} + \\mathbf{Advérbio} + \\mathbf{Verbo} + \\text{Complemento}$$\n     *She **always arrives** on time.*\n\n3. **Cuidado com NEVER:**\n   - Como 'never' é 100% negativo, o verbo fica AFIRMATIVO (*He never eats meat*).",
    "teoria": "### A Posição Sintática dos Advérbios de Frequência\n\nEm inglês, a posição dos advérbios de frequência no meio da frase (*mid-position*) obedece a uma regra estrutural estrita:\n\n* **Com Verbos Comuns:** [Sujeito] + **ADVÉRBIO** + [Verbo Principal] (*We **rarely** watch television*).\n* **Com o Verbo To Be:** [Sujeito] + [To Be] + **ADVÉRBIO** (*He is **never** tired*).\n* **Com Auxiliares e Modais:** [Sujeito] + [Auxiliar] + **ADVÉRBIO** + [Verbo Principal] (*I can **never** remember his name* · *You should **always** check your tickets*).\n\n#### A Pergunta Canônica: How often...?\nPara perguntar a frequência de uma ação, a estrutura consagrada é:\n* **How often do you travel?** (Com que frequência você viaja?)\n* **How often does she exercise?** (Com que frequência ela se exercita?)",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: A Dupla Negação Proibida\n\n1. **A Proibição Absoluta da Dupla Negação:**\n   - No Brasil é naturalíssimo dizer: *\"Eu não como peixe nunca\"* (dupla negação: *não* + *nunca*).\n   - Em inglês, duas palavras negativas anulam uma à outra, virando uma afirmação. Dizer *\"I don't never eat fish\"* é um erro primário.\n   - Correto: **I never eat fish.**\n\n2. **A Liberdade da Ordem no Português:**\n   - Em português podemos dizer: *\"Sempre eu estudo\"*, *\"Eu sempre estudo\"* ou *\"Eu estudo sempre\"*.\n   - No inglês, colocar *Always I study* soa bizarro e agramatical aos ouvidos nativos. Mantenha o padrão: **I always study**.",
    "exemplos_prc": [
      {
        "oracao": "Sophia is always punctual for business meetings.",
        "pergunta": "Por que 'always' veio depois de 'is'?",
        "resposta": "Porque com o verbo To Be (is), a regra gramatical exige que o advérbio de frequência venha imediatamente após o verbo.",
        "conclusao": "Sophia é sempre pontual para reuniões de negócios."
      },
      {
        "oracao": "They usually eat lunch at the cafeteria near their office.",
        "pergunta": "Por que 'usually' veio antes de 'eat'?",
        "resposta": "Porque com verbos comuns de ação, o advérbio fica posicionado entre o sujeito e o verbo principal.",
        "conclusao": "Eles normalmente almoçam no refeitório perto do escritório deles."
      },
      {
        "oracao": "He never eats fast food on weekdays.",
        "pergunta": "Por que o verbo 'eats' tem 's' se a frase tem sentido negativo?",
        "resposta": "Porque a palavra 'never' não é um auxiliar, mas um advérbio. Com o sujeito 'He', o verbo continua conjugado no singular afirmativo.",
        "conclusao": "Ele nunca come comida rápida em dias de semana."
      },
      {
        "oracao": "How often do you visit your grandparents in Boston?",
        "pergunta": "Qual a finalidade da locução 'How often'?",
        "resposta": "Pergunta a frequência periódica com que um hábito acontece na rotina.",
        "conclusao": "Com que frequência você visita seus avós em Boston?"
      }
    ],
    "armadilhas": [
      {
        "errado": "Always I wake up at 7:00 AM.",
        "certo": "I always wake up at 7:00 AM.",
        "motivo": "Advérbios de frequência ficam entre o sujeito e o verbo, não no início solto."
      },
      {
        "errado": "I don't never drink alcohol.",
        "certo": "I never drink alcohol.",
        "motivo": "Dupla negação é proibida em inglês. 'Never' já carrega a negação completa."
      },
      {
        "errado": "She always is late for class.",
        "certo": "She is always late for class.",
        "motivo": "Com o verbo To Be, o advérbio de frequência deve vir DEPOIS do verbo (is always)."
      },
      {
        "errado": "He never eat meat.",
        "certo": "He never eats meat.",
        "motivo": "Com 'He' e 'never', o verbo principal continua exigindo o 'S' de 3ª pessoa."
      }
    ],
    "coda": "Antes de verbos normais, depois do verbo To Be. Com NEVER, nunca use NOT.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Qual é a ordem correta das palavras com o verbo To Be?",
        "opcoes": [
          "He always is tired after work.",
          "He is always tired after work.",
          "Always he is tired after work.",
          "He tired is always after work."
        ],
        "resposta": 1,
        "explicacao": "Com o verbo To Be, o advérbio de frequência fica DEPOIS do verbo: He is always tired."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual é a ordem correta das palavras com verbo de ação?",
        "opcoes": [
          "We usually have lunch at 1:00 PM.",
          "We have usually lunch at 1:00 PM.",
          "Usually we have at 1:00 PM lunch.",
          "We have lunch usually at 1:00 PM."
        ],
        "resposta": 0,
        "explicacao": "Com verbos normais, o advérbio fica entre sujeito e verbo: We usually have lunch."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase está gramaticalmente CORRETA em inglês?",
        "opcoes": [
          "I don't never smoke cigarettes.",
          "I never don't smoke cigarettes.",
          "I never smoke cigarettes.",
          "I smoke never cigarettes."
        ],
        "resposta": 2,
        "explicacao": "'I never smoke cigarettes' evita a dupla negação incorreta."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a pergunta sobre frequência periódica:\n\n\"___ do you go to the dentist?\"\n(= Com que frequência você vai ao dentista?)",
        "opcoes": ["How many", "How much", "How often", "How time"],
        "resposta": 2,
        "explicacao": "HOW OFTEN é a expressão canônica em inglês para perguntar sobre frequência."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com a ordem correta:\n\n\"They ___ go out on Monday nights.\"\n(Eles raramente saem nas noites de segunda-feira. Advérbio: rarely)",
        "revelacao": "They rarely go out on Monday nights.",
        "explicacao": "Sujeito + rarely + go."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"My boss ___ in a good mood on Fridays.\"\n(Meu chefe está sempre de bom humor às sextas-feiras.)",
        "revelacao": "My boss is always in a good mood on Fridays.",
        "explicacao": "To Be (is) + always."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"He ___ breakfast at home; he prefers a coffee shop.\"\n(Ele quase nunca toma café da manhã em casa; prefere uma cafeteria.)",
        "revelacao": "He hardly ever eats breakfast at home; he prefers a coffee shop.",
        "explicacao": "Hardly ever eats (verbo com 's' devido a 'He')."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"We ___ take the train when we travel to New York.\"\n(Nós normalmente pegamos o trem quando viajamos para Nova York.)",
        "revelacao": "We usually take the train when we travel to New York.",
        "explicacao": "We usually take."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a expressão que pergunta 'com que frequência':\n\n\"How ___ do you travel abroad?\"",
        "resposta": "often",
        "explicacao": "How often é a expressão correta."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o advérbio para 100% de frequência:\n\n\"She is ___ on time for meetings.\" (sempre)",
        "resposta": "always",
        "explicacao": "Always significa sempre."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o advérbio para 0% de frequência (nunca):\n\n\"I ___ drink coffee before going to sleep.\"",
        "resposta": "never",
        "explicacao": "Never significa nunca."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o advérbio que significa 'geralmente / normalmente':\n\n\"We ___ have dinner at 8:00 PM.\"",
        "resposta": "usually",
        "explicacao": "Usually é o advérbio para normalmente/geralmente."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 14: Question Words 2 (When, Why, How, How often)
  // ─────────────────────────────────────────────────────────────
  "a1-lez14": {
    "id": "a1-lez14",
    "num": "Lesson 14",
    "titulo": "Question Words 2",
    "subtitulo": "Tempo, Motivo, Modo e Quantidade — When, Why, How, How often",
    "cena": {
      "origem": "dialogo",
      "titulo": "Planning a Business Trip",
      "texto": "**Director:** When does our flight to London depart, Lucas?\n**Lucas:** It departs tomorrow at 9:00 PM from terminal 3.\n**Director:** Perfect. Why do we have a layover in Atlanta?\n**Lucas:** Because direct flights were completely booked for that date.\n**Director:** I see. How do we get from Heathrow Airport to the hotel?\n**Lucas:** By express train. It takes only fifteen minutes."
    },
    "fio": {
      "abertura": "Você já sabe perguntar 'o que', 'quem' e 'onde'. Mas para organizar viagens, resolver problemas no trabalho e compreender os motivos das coisas, você precisa de um segundo conjunto de perguntas.",
      "descoberta": "Observe como o diretor combinou a Question Word com o auxiliar do presente: «When does our flight depart?», «Why do we have...?», «How do we get...?». A fórmula permanece idêntica: a palavra especial abre a frase e o auxiliar vem colado a ela.",
      "fecho": "Agora seu vocabulário investigativo está completo: tempo (When), causa (Why), método (How) e frequência (How often)."
    },
    "alerta": "Lembre-se da clássica dupla 'Why' e 'Because'. Pergunte com 'Why' e responda com 'Because'. Não confunda os dois.",
    "definicao": {
      "fenomeno": "When do you start? · Why does he study English? · How does this machine work? · How often do you exercise?",
      "causa": "Como combinar question words complexas com o Present Simple?",
      "conceito": "A fórmula universal é: [Question Word] + [do / does] + [Sujeito] + [Verbo Principal]? O auxiliar 'do/does' é indispensável mesmo após 'When', 'Why' ou 'How'."
    },
    "inventario": [
      "O significado e uso de WHEN (quando — tempo e datas)",
      "O significado e uso de WHY (por que — perguntas de causa) e BECAUSE (porque — respostas)",
      "O significado e uso de HOW (como — modo, estado e meios de transporte)",
      "A estrutura interrogativa completa com auxiliares DO e DOES",
      "Diferença entre 'How' sozinho e 'How + adjetivo/advérbio' (How old, How often)"
    ],
    "tabela_visual": "| Question Word | Significado | Foco da Informação | Exemplo Canônico |\n|---|---|---|---|\n| **When** | Quando | Horários, datas, momentos | *When does the concert begin?* |\n| **Why** | Por que | Causas, motivos, justificativas | *Why do you want to learn English?* |\n| **Because** | Porque (resposta) | Explicação do motivo | *Because I want to travel the world.* |\n| **How** | Como | Modo, meios de transporte, estado | *How do you travel to work?* |\n| **How often** | Com que frequência | Periodicidade de hábitos | *How often do you clean your laptop?* |",
    "observacao_cards": [
      {
        "ingles": "When",
        "traducao": "Quando",
        "genero": "Pergunta Temporal",
        "motivo": "Usa-se para horas, dias, meses ou anos: 'When does the store open?' / 'When is your birthday?'"
      },
      {
        "ingles": "Why",
        "traducao": "Por que (pergunta)",
        "genero": "Pergunta de Motivo",
        "motivo": "Exclusivo para perguntas: 'Why are you late?' / 'Why does he work so late?'"
      },
      {
        "ingles": "Because",
        "traducao": "Porque (resposta)",
        "genero": "Conjunção de Causa",
        "motivo": "Responde diretamente a 'Why': 'Why do you study? — Because I need it for my job.'"
      },
      {
        "ingles": "How",
        "traducao": "Como",
        "genero": "Pergunta de Modo",
        "motivo": "Usa-se para método ('How do you spell your name?') e transporte ('How do you get to work? By train')."
      },
      {
        "ingles": "How often",
        "traducao": "Com que frequência",
        "genero": "Pergunta de Periodicidade",
        "motivo": "Pergunta a frequência de hábitos: 'How often do you wash your car?'"
      },
      {
        "ingles": "How much / many",
        "traducao": "Quanto / Quantos",
        "genero": "Pergunta de Quantidade",
        "motivo": "How much (incontáveis e preços) vs How many (contáveis no plural)."
      }
    ],
    "tecnica": "### Fórmula Mestra de Perguntas com Question Words:\n\n$$\\mathbf{QW} + \\mathbf{DO / DOES} + \\text{[Sujeito]} + \\text{[Verbo na Forma Básica]} + \\text{[Complemento]}?$$\n\n1. **Escolha a informação procurada:**\n   - Tempo? → `When`\n   - Motivo? → `Why`\n   - Modo/Transporte? → `How`\n   - Frequência? → `How often`\n\n2. **Insira o auxiliar DO ou DOES:**\n   - *When **do** you leave?*\n   - *Why **does** she study?*\n\n3. **Deixe o verbo principal 100% puro.**",
    "teoria": "### Aprofundamento nas Question Words\n\nNo inglês, a distinção entre a pergunta de causa e sua resposta é muito mais estrita do que no português:\n* **Why** é estritamente uma palavra interrogativa.\n* **Because** é uma conjunção causal de resposta.\n* Nunca responda a uma pergunta dizendo *\"Why I like it\"* ❌. Diga sempre **\"Because I like it\"** ✓.\n\n#### A Família de 'HOW':\n'How' é a mais produtiva das question words em inglês. Quando combinada com adjetivos, cria perguntas específicas de mensuração:\n* **How long?** = Quanto tempo? / Qual comprimento?\n* **How far?** = A que distância? / Quão longe?\n* **How old?** = Quantos anos? (Quão velho?)\n* **How much?** = Quanto custa? / Quanta quantidade?",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: 'Por que' vs 'Porque'\n\n1. **A Simplificação do Porquê:**\n   - O português tem 4 formas que geram dores de cabeça (*por que, por quê, porque, porquê*).\n   - O inglês simplificou tudo em duas palavras transparentes:\n     - Para perguntar: **Why**.\n     - Para responder e explicar: **Because**.\n\n2. **Meios de Transporte com 'How':**\n   - Em português perguntamos: *\"Como você vai para o trabalho? — Vou de carro.\"*\n   - Em inglês, o transporte usa a preposição 'by': **By car**, **by bus**, **by train** (mas a pé é *on foot*).",
    "exemplos_prc": [
      {
        "oracao": "When does the next train to Boston leave?",
        "pergunta": "Qual a estrutura e o que esta oração solicita?",
        "resposta": "Inicia com 'When' (tempo), seguida do auxiliar 'does' porque 'the next train' é 3ª pessoa singular (It).",
        "conclusao": "Quando parte o próximo trem para Boston?"
      },
      {
        "oracao": "Why does Sarah want to change departments?",
        "pergunta": "Como responder adequadamente a esta pergunta?",
        "resposta": "Iniciando com 'Because': 'Because she wants new professional challenges.'",
        "conclusao": "Por que a Sarah quer mudar de departamento?"
      },
      {
        "oracao": "How do you commute to work every morning?",
        "pergunta": "Que tipo de informação 'How' solicita aqui?",
        "resposta": "Solicita o meio de transporte ou o trajeto utilizado (ex: 'I commute by subway').",
        "conclusao": "Como você se desloca para o trabalho toda manhã?"
      },
      {
        "oracao": "How often does your company hold team meetings?",
        "pergunta": "Por que se usou 'does' e não 'do'?",
        "resposta": "Porque o sujeito é 'your company' (singular neutro = It).",
        "conclusao": "Com que frequência a sua empresa realiza reuniões de equipe?"
      }
    ],
    "armadilhas": [
      {
        "errado": "Why you are late?",
        "certo": "Why are you late?",
        "motivo": "Com o verbo To Be, deve haver inversão mesmo após question words."
      },
      {
        "errado": "Why do you study English? — Why I need it.",
        "certo": "Why do you study English? — Because I need it.",
        "motivo": "Usa-se 'Why' para perguntar e 'Because' para responder."
      },
      {
        "errado": "When the museum opens?",
        "certo": "When does the museum open?",
        "motivo": "Em perguntas no presente com verbos comuns, o auxiliar 'does' é obrigatório antes do sujeito."
      },
      {
        "errado": "How you spell that word?",
        "certo": "How do you spell that word?",
        "motivo": "Falta o auxiliar 'do' após a question word."
      }
    ],
    "coda": "When para o relógio, Why para o motivo, Because para a resposta e How para o método. Sempre com auxiliar no comando.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a pergunta sobre tempo:\n\n\"___ does the conference start tomorrow?\"\n(= Quando começa a conferência amanhã?)",
        "opcoes": ["Where", "When", "Why", "Who"],
        "resposta": 1,
        "explicacao": "WHEN pergunta sobre horários, datas e momentos."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete o diálogo causal:\n\n\"Why are you studying on a Saturday? — ___ I have an exam on Monday.\"",
        "opcoes": ["Why", "Because", "For", "So"],
        "resposta": 1,
        "explicacao": "Respostas a perguntas iniciadas por 'Why' utilizam 'Because'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual é a ordem correta para perguntar sobre transporte?",
        "opcoes": [
          "How you get to the office?",
          "How do you get to the office?",
          "How do get you to the office?",
          "How get you to the office?"
        ],
        "resposta": 1,
        "explicacao": "A ordem canônica é: QW (How) + Auxiliar (do) + Sujeito (you) + Verbo (get) + Complemento."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a pergunta sobre motivo:\n\n\"___ does David want to leave the company?\"\n(= Por que o David quer sair da empresa?)",
        "opcoes": ["When", "Where", "Why", "How much"],
        "resposta": 2,
        "explicacao": "WHY é a palavra interrogativa usada para saber as razões e causas."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente a pergunta:\n\n\"___ do you travel to London for business?\"\n(Com que frequência você viaja para Londres a negócios?)",
        "revelacao": "How often do you travel to London for business?",
        "explicacao": "How often pergunta a periodicidade."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"___ does the flight from New York arrive?\"\n(Quando chega o voo vindo de Nova York?)",
        "revelacao": "When does the flight from New York arrive?",
        "explicacao": "When does + sujeito + arrive."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"___ do you spell your last name, please?\"\n(Como você soletra seu sobrenome, por favor?)",
        "revelacao": "How do you spell your last name, please?",
        "explicacao": "How do you spell."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"___ does this printer make that strange noise?\"\n(Por que esta impressora faz esse barulho estranho?)",
        "revelacao": "Why does this printer make that strange noise?",
        "explicacao": "Why does + impressora (It) + make."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a question word para tempo:\n\n\"___ does the supermarket close tonight?\" (Quando / A que horas)",
        "resposta": "When",
        "explicacao": "When pergunta sobre tempo."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que responde a 'Why':\n\n\"Why are you tired? — ___ I worked all night.\"",
        "resposta": "Because",
        "explicacao": "Because responde a perguntas de motivo."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a question word para modo/método:\n\n\"___ do I turn on this projector?\" (Como)",
        "resposta": "How",
        "explicacao": "How pergunta como fazer algo."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a question word que falta:\n\n\"___ is the weather in Chicago today?\" (Como está)",
        "resposta": "How",
        "explicacao": "How is the weather é a expressão clássica para perguntar sobre o clima."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 15: Object Pronouns (Me, You, Him, Her, It, Us, Them)
  // ─────────────────────────────────────────────────────────────
  "a1-lez15": {
    "id": "a1-lez15",
    "num": "Lesson 15",
    "titulo": "Object Pronouns",
    "subtitulo": "Quem Recebe a Ação — Me, You, Him, Her, It, Us, Them",
    "cena": {
      "origem": "dialogo",
      "titulo": "Delegating Tasks in the Project",
      "texto": "**Manager:** Did you speak to Carlos about the presentation?\n**Assistant:** Yes, I called him this morning and sent him the slides.\n**Manager:** Great. Can you also send them to Sarah and me?\n**Assistant:** Of course! I will email them to you immediately.\n**Manager:** Thank you! If you have questions, talk to us before lunch."
    },
    "fio": {
      "abertura": "Em uma frase, alguém pratica a ação e alguém recebe a ação. Quando você diz 'Eu vi ele', o português informal comete um erro que o inglês jamais tolera.",
      "descoberta": "Perceba como a assistente disse «I called him» e não «he»! E o gerente pediu «send them to us» e não «we»! Antes do verbo fica o sujeito (I, He, We); depois do verbo ou de preposições, entram os Object Pronouns (Me, Him, Us).",
      "fecho": "Agora você domina a distinção fundamental da sintaxe inglesa: quem faz a ação tem uma roupa; quem recebe a ação veste outra."
    },
    "alerta": "O erro de dizer *\"I saw he\"* ou *\"Listen to I\"* fere os ouvidos de qualquer nativo. Pronomes após verbos e preposições são obrigatoriamente pronomes oblíquos de objeto.",
    "definicao": {
      "fenomeno": "He loves me · I called him · She helped us · Look at them · Listen to her",
      "causa": "Por que o pronome muda de forma quando fica depois do verbo?",
      "conceito": "Em inglês, os pronomes têm **caso reto** (*Subject Pronouns*: I, he, she, we, they) para quem pratica a ação, e **caso oblíquo** (*Object Pronouns*: me, him, her, us, them) para quem é o objeto da ação ou vem após preposições (*to, for, with, about*)."
    },
    "inventario": [
      "Os 7 pronomes objeto (me, you, him, her, it, us, them)",
      "A posição padrão: após verbos de ação (*call him, help us*)",
      "O uso obrigatório após preposições (*with me, for her, to them*)",
      "Os pronomes invariáveis: 'you' e 'it' (iguais como sujeito e objeto)",
      "A correção formal: 'between you and me' (nunca 'between you and I')"
    ],
    "tabela_visual": "| Sujeito (Antes do Verbo) | Objeto (Depois do Verbo / Preposição) | Tradução Prática | Exemplo Real |\n|---|---|---|---|\n| **I** | **me** | me, a mim | *Call me tomorrow.* |\n| **You** | **you** | te, a você, a vocês | *I understand you.* |\n| **He** | **him** | o, lhe, a ele | *I saw him at the station.* |\n| **She** | **her** | a, lhe, a ela | *Talk to her gently.* |\n| **It** | **it** | o, a, a isso (neutro) | *I bought it online.* |\n| **We** | **us** | nos, a nós | *They invited us to lunch.* |\n| **They** | **them** | os, as, lhes, a eles/elas | *We sent them an email.* |",
    "observacao_cards": [
      {
        "ingles": "Me",
        "traducao": "me / a mim",
        "genero": "1ª Pessoa Singular",
        "motivo": "Vem após verbos ou preposições: 'Help me!' / 'Come with me.' Nunca use 'I' após preposição."
      },
      {
        "ingles": "Him",
        "traducao": "ele / o / a ele (objeto)",
        "genero": "3ª Pessoa Masculina",
        "motivo": "Substitui 'he' após o verbo: 'I know him very well' (Eu conheço ele)."
      },
      {
        "ingles": "Her",
        "traducao": "ela / a / a ela (objeto)",
        "genero": "3ª Pessoa Feminina",
        "motivo": "Atenção: 'her' é tanto adjetivo possessivo (*her car*) quanto pronome objeto (*I love her*)."
      },
      {
        "ingles": "Us",
        "traducao": "nos / a nós",
        "genero": "1ª Pessoa Plural",
        "motivo": "Pronuncia-se /ʌs/. Substitui 'we' na posição de objeto: 'Join us for dinner'."
      },
      {
        "ingles": "Them",
        "traducao": "eles / elas / os / as (objeto)",
        "genero": "3ª Pessoa Plural",
        "motivo": "Pronuncia-se /ðɛm/. Usado para pessoas e objetos plurais: 'Where are my keys? I lost them!'"
      },
      {
        "ingles": "You / It",
        "traducao": "você / isso (invariáveis)",
        "genero": "Formas Neutras",
        "motivo": "'You' e 'It' têm a mesma forma como sujeito e objeto: 'You love it' e 'It loves you'."
      }
    ],
    "tecnica": "### Teste Rápido de Posição do Pronome:\n\n1. **O pronome está ANTES do verbo e executa a ação?**\n   - SIM → Use o pronome sujeito (**I, You, He, She, It, We, They**).\n   - Ex: *He called.* (Ele ligou).\n\n2. **O pronome está DEPOIS do verbo ou de uma preposição (*with, to, for, about, at*)?**\n   - SIM → Use o pronome objeto (**me, you, him, her, it, us, them**).\n   - Ex: *I called **him**.* (Liguei para ele).\n   - Ex: *Come with **us**.* (Venha conosco).",
    "teoria": "### Caso Reto vs Caso Oblíquo no Inglês\n\nEnquanto no português coloquial dizemos frequentemente *\"Vi ele na rua\"* (usando o pronome reto 'ele' como objeto), no inglês essa mistura é gramaticalmente impossível:\n* *I saw he* ❌ é inadmissível em qualquer nível da língua.\n* A única forma legítima é **I saw him** ✓.\n\n#### A Regra de Ouro com Preposições:\nToda e qualquer preposição em inglês exige **obrigatoriamente** o pronome objeto:\n* *Wait for **me**.* (e não *for I*)\n* *Give it to **her**.* (e não *to she*)\n* *Speak with **them**.* (e não *with they*)\n* *Between you and **me**.* (e não *between you and I*).",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: 'Eu vi ele' e 'Para mim fazer'\n\n1. **A cura definitiva de 'Vi ele':**\n   - No Brasil, o pronome reto é usado como objeto na fala informal (*\"Liguei pra ele\", \"Vi ela\"*).\n   - Em inglês, o sistema de pronomes objeto é rigorosamente respeitado: **I called him**, **I saw her**.\n\n2. **O Neutro Plural 'Them':**\n   - No português usamos 'eles/elas' para pessoas e quase nunca para objetos soltos (*\"Comprei as maçãs e comi-as\"*).\n   - No inglês, 'them' serve com total naturalidade para objetos inanimados no plural: **I bought the apples and ate them.**",
    "exemplos_prc": [
      {
        "oracao": "Lucas called Sarah and invited her to the tech conference.",
        "pergunta": "Por que usamos 'her' e não 'she'?",
        "resposta": "Porque Sarah é quem recebe a ação do verbo 'invited' (objeto direto), exigindo o pronome objeto feminino 'her'.",
        "conclusao": "Lucas ligou para a Sarah e a convidou para a conferência de tecnologia."
      },
      {
        "oracao": "Could you please explain this software to us?",
        "pergunta": "Por que usamos 'us' e não 'we'?",
        "resposta": "Porque o pronome está posicionado após a preposição 'to', exigindo a forma de objeto da 1ª pessoa plural.",
        "conclusao": "Você poderia por favor explicar este software para nós?"
      },
      {
        "oracao": "Where are my documents? — I put them on your desk.",
        "pergunta": "A que 'them' se refere nesta oração?",
        "resposta": "Refere-se a 'my documents' (substantivo inanimado plural), atuando como pronome objeto direto.",
        "conclusao": "Onde estão meus documentos? — Eu os coloquei na sua mesa."
      },
      {
        "oracao": "This confidential report is between you and me.",
        "pergunta": "Por que se diz 'between you and me' e não 'between you and I'?",
        "resposta": "Porque 'between' é uma preposição, e todas as preposições regem obrigatoriamente pronomes no caso oblíquo (me).",
        "conclusao": "Este relatório confidencial fica entre você e eu."
      }
    ],
    "armadilhas": [
      {
        "errado": "I saw he at the supermarket yesterday.",
        "certo": "I saw him at the supermarket yesterday.",
        "motivo": "Após verbos, usa-se o pronome objeto 'him', nunca o pronome sujeito 'he'."
      },
      {
        "errado": "She travels with we every summer.",
        "certo": "She travels with us every summer.",
        "motivo": "Após a preposição 'with', usa-se obrigatoriamente o pronome objeto 'us'."
      },
      {
        "errado": "This secret is between you and I.",
        "certo": "This secret is between you and me.",
        "motivo": "'Between' é preposição e exige o pronome objeto 'me'."
      },
      {
        "errado": "I bought new shoes and I like they.",
        "certo": "I bought new shoes and I like them.",
        "motivo": "Para objetos no plural após o verbo, o pronome correto é 'them'."
      }
    ],
    "coda": "Antes do verbo: I, He, She, We, They. Depois do verbo ou da preposição: Me, Him, Her, Us, Them. Nunca misture os papéis.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o pronome objeto correto:\n\n\"Julia is my best friend; I talk to ___ every single day.\"\n(= Julia é minha melhor amiga; eu converso com ela todo santo dia.)",
        "opcoes": ["she", "her", "hers", "him"],
        "resposta": 1,
        "explicacao": "Após a preposição 'to', usa-se o pronome objeto feminino HER."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a frase de trabalho em equipe:\n\n\"The management gave ___ three weeks to finish the project.\"\n(= A diretoria nos deu três semanas para concluir o projeto.)",
        "opcoes": ["we", "us", "our", "ours"],
        "resposta": 1,
        "explicacao": "Após o verbo 'gave' (deu), usa-se o pronome objeto US (nos / a nós)."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase está gramaticalmente PERFEITA em inglês?",
        "opcoes": [
          "I called he yesterday, but he didn't answer.",
          "I called him yesterday, but he didn't answer.",
          "I called his yesterday, but he didn't answer.",
          "I called him yesterday, but him didn't answer."
        ],
        "resposta": 1,
        "explicacao": "Quem recebe a ação é 'him' (objeto) e quem não atendeu é 'he' (sujeito): I called him yesterday, but he didn't answer."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete sobre objetos no plural:\n\n\"I found your glasses on the table and brought ___ to you.\"\n(= Encontrei seus óculos na mesa e os trouxe para você.)",
        "opcoes": ["they", "them", "it", "their"],
        "resposta": 1,
        "explicacao": "'Glasses' é um substantivo plural → o pronome objeto correspondente é THEM."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com o pronome objeto:\n\n\"Can you hear ___? The connection is very weak.\"\n(Você consegue me ouvir? A conexão está muito fraca.)",
        "revelacao": "Can you hear me? The connection is very weak.",
        "explicacao": "Hear me (me ouvir)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"My parents live in Miami; we visit ___ twice a year.\"\n(Meus pais moram em Miami; nós os visitamos duas vezes ao ano.)",
        "revelacao": "My parents live in Miami; we visit them twice a year.",
        "explicacao": "Visit them (visitá-los)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"David is waiting outside; please invite ___ in.\"\n(David está esperando lá fora; por favor convide-o para entrar.)",
        "revelacao": "David is waiting outside; please invite him in.",
        "explicacao": "Invite him (convidá-lo)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"This present is for ___; thank you for being a great friend.\"\n(Este presente é para você; obrigado por ser um grande amigo.)",
        "revelacao": "This present is for you; thank you for being a great friend.",
        "explicacao": "For you (o pronome you é idêntico como objeto)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome objeto para 'He':\n\n\"I know Carlos; I work with ___ at the clinic.\" (ele)",
        "resposta": "him",
        "explicacao": "Após with usa-se him."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome objeto para 'We':\n\n\"Our teacher gave ___ extra homework today.\" (nos)",
        "resposta": "us",
        "explicacao": "Gave us (deu-nos)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome objeto para 'They':\n\n\"I have the keys; I will give ___ to the landlord.\" (as)",
        "resposta": "them",
        "explicacao": "Give them (dá-las)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome objeto de 1ª pessoa que completa:\n\n\"Wait for ___! I am coming!\" (mim)",
        "resposta": "me",
        "explicacao": "Wait for me (espere por mim)."
      }
    ]
  }
};

console.log('Carregando parte 2 da Onda 2 (Lições 11 a 15)...');

for (const [id, lessonData] of Object.entries(wave2Part2Lessons)) {
  for (const mod of data.moduli) {
    const idx = mod.lezioni.findIndex(l => l.id === id);
    if (idx !== -1) {
      mod.lezioni[idx] = lessonData;
      console.log(`Lição ${id} (${lessonData.titulo}) enriquecida com sucesso!`);
    }
  }
}

fs.writeFileSync(grammarPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Parte 2 da Onda 2 gravada com sucesso em data/grammar.json!');
