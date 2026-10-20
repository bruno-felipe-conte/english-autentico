import fs from 'fs';

const grammarPath = 'data/grammar.json';
const data = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));

// Onda 4 Parte 2: Lições A2.6 a A2.10 (Passado Complexo, Futuros e Comparações)
const wave4Part2Lessons = {
  // ─────────────────────────────────────────────────────────────
  // LESSON A2.6: Past Simple vs Past Continuous
  // ─────────────────────────────────────────────────────────────
  "a2-lez6": {
    "id": "a2-lez6",
    "num": "Lesson 6",
    "titulo": "Past Simple vs Past Continuous",
    "subtitulo": "Ação em Progresso vs Interrupção Pontual — When & While",
    "cena": {
      "origem": "dialogo",
      "titulo": "The Sudden Blackout",
      "texto": "**Emma:** What were you doing when the lights went out last night?\n**Liam:** I was cooking dinner in the kitchen while my brother was playing the guitar.\n**Emma:** Did you find the candles immediately?\n**Liam:** No! While I was searching for a flashlight in the dark, I accidentally dropped a glass on the floor."
    },
    "fio": {
      "abertura": "Imagine assistir a um filme: a câmera mostra uma cena acontecendo ao fundo (o cenário em andamento), quando de repente algo pontual acontece e corta a cena.",
      "descoberta": "É exatamente essa a relação entre o Past Continuous e o Past Simple! O Past Continuous (was/were + -ing) cria o cenário que estava em progresso. O Past Simple (verbo no passado com -ed ou irregular) é o evento súbito que interrompe esse cenário!",
      "fecho": "Com as palavras-chave «WHEN» (quando) e «WHILE» (enquanto), você orquestra narrativas ricas e cinematográficas em inglês."
    },
    "alerta": "Cuidado com as conjunções: use geralmente 'WHEN' seguido de Past Simple (ação pontual: 'when the phone rang') e 'WHILE' seguido de Past Continuous (ação em andamento: 'while I was sleeping').",
    "definicao": {
      "fenomeno": "I was reading a book when she called · While we were driving, it started to rain · He was working while I was studying",
      "causa": "Por que usamos dois tempos verbais diferentes na mesma oração?",
      "conceito": "O Past Continuous expressa uma atividade contínua e temporária no passado (o 'pano de fundo'). O Past Simple expressa uma ação concluída que aconteceu pontualmente durante essa atividade contínua ou que a interrompeu."
    },
    "inventario": [
      "Identificar a ação contínua de fundo (was/were + -ing)",
      "Identificar o evento pontual interruptor (Past Simple)",
      "Dominar o uso de 'WHEN' (+ Past Simple) para introduzir a interrupção",
      "Dominar o uso de 'WHILE' (+ Past Continuous) para introduzir a ação em andamento",
      "Expressar duas ações contínuas simultâneas no passado conectadas por 'while'"
    ],
    "tabela_visual": "| Conectivo | Tempo Verbal Típico | Exemplo em Inglês | Tradução em Português |\n|---|---|---|---|\n| **WHEN** | + Past Simple (Pontual) | I was taking a shower **when the phone rang**. | Eu estava tomando banho quando o telefone tocou. |\n| **WHILE** | + Past Continuous (Contínuo) | The accident happened **while he was texting**. | O acidente aconteceu enquanto ele digitava. |\n| **WHILE** (Paralelo) | Contínuo + Contínuo | I **was reading** while she **was writing**. | Eu estava lendo enquanto ela estava escrevendo. |",
    "observacao_cards": [
      {
        "ingles": "When the lights went out",
        "traducao": "Quando as luzes se apagaram",
        "genero": "Ação Pontual (Interrupção)",
        "motivo": "Introduzido por 'when' + Past Simple. Corta a ação que estava em andamento."
      },
      {
        "ingles": "While I was cooking",
        "traducao": "Enquanto eu estava cozinhando",
        "genero": "Ação em Progresso (Cenário)",
        "motivo": "Introduzido por 'while' + Past Continuous. Descreve a duração do processo."
      },
      {
        "ingles": "I was sleeping when...",
        "traducao": "Eu estava dormindo quando...",
        "genero": "Fundo Contínuo",
        "motivo": "Past Continuous no primeiro segmento, pronto para receber o evento súbito."
      },
      {
        "ingles": "It started to rain while...",
        "traducao": "Começou a chover enquanto...",
        "genero": "Início Pontual",
        "motivo": "O início da chuva é pontual (started), a caminhada era o processo (while we were walking)."
      },
      {
        "ingles": "Simultaneous past actions",
        "traducao": "Ações simultâneas",
        "genero": "Dois Processos",
        "motivo": "'While Tom was studying, Sarah was listening to music' — ambas em progresso."
      },
      {
        "ingles": "Stative verbs in the past",
        "traducao": "Verbos de estado no passado",
        "genero": "Exceção Gramatical",
        "motivo": "Verbos como know, want, like e believe raramente vão para o contínuo: use Past Simple ('I knew the answer', não *I was knowing*)."
      }
    ],
    "tecnica": {
      "passo1": "Identifique qual ação já estava acontecendo há algum tempo (o filme rodando) -> aplique Past Continuous (was/were + -ing).",
      "passo2": "Identifique o fato pontual que aconteceu no meio do caminho (o estalo) -> aplique Past Simple (-ed ou irregular).",
      "passo3": "Posicione os conectores com precisão: coloque 'when' antes do Past Simple ou 'while' antes do Past Continuous."
    },
    "teoria": "A combinação entre Past Simple e Past Continuous é a espinha dorsal de qualquer narrativa em inglês (relato de acidentes, encontros fortuitos, memórias e histórias do cotidiano).\n\n### 1. O Modelo do 'Pano de Fundo' e da 'Interrupção'\n* **Linha contínua (Past Continuous):** Descreve uma atividade que levou tempo: *I was walking in the park...*\n* **Ponto de corte (Past Simple):** O evento que atravessa essa linha: *...when I saw an old friend.*\n\n### 2. A Dança dos Conectivos: When vs While\n* **WHEN + Past Simple:** *I was driving when my tire exploded.* (Eu estava dirigindo quando meu pneu estourou).\n* **WHILE + Past Continuous:** *My tire exploded while I was driving.* (Meu pneu estourou enquanto eu estava dirigindo).\n\n### 3. Ações Simultâneas sem Interrupção\nQuando duas pessoas estavam realizando atividades contínuas ao mesmo tempo e nenhuma interrompeu a outra, usamos Past Continuous em ambas as orações:\n* *While Jack was washing the dishes, Mary was drying them.* (Enquanto Jack lavava a louça, Mary a secava).\n\n### 4. Sequência Pura de Ações Consecutivas\nCuidado: se uma ação aconteceu DEPOIS da outra (e não durante), ambas ficam no Past Simple!\n* *I woke up, brushed my teeth, and had breakfast.* (Sem contínuo, pois são ações sequenciais).",
    "ponte": "Em português, costumamos usar o pretérito imperfeito para as duas coisas: 'Eu andava na rua quando o vi' ou 'Eu estava andando na rua quando o vi'. Em inglês, a distinção é muito mais rigorosa e sistemática. O inglês exige o contínuo (*was walking*) para estabelecer a duração e o Past Simple (*saw*) para o corte pontual. Nunca use dois verbos simples se a intenção for mostrar que uma ação servia de cenário para a outra.",
    "exemplos_prc": [
      {
        "oracao": "She was crossing the street when a bicycle hit her.",
        "pergunta": "Qual ação estava em progresso e qual foi o evento súbito?",
        "resposta": "Atravessar a rua estava em andamento (was crossing); a bicicleta atingi-la foi o evento pontual (hit).",
        "conclusao": "Past Continuous para a travessia, Past Simple com 'when' para a colisão."
      },
      {
        "oracao": "While we were having lunch, the courier delivered the parcel.",
        "pergunta": "Por que 'having' está no contínuo e 'delivered' no simples?",
        "resposta": "Porque 'while' introduz o intervalo de tempo do almoço, dentro do qual o entregador realizou a entrega pontual.",
        "conclusao": "A conjunção 'while' rege a forma contínua do tempo verbal de fundo."
      },
      {
        "oracao": "What were you doing when the earthquake occurred?",
        "pergunta": "Como se formula uma pergunta sobre a atividade que estava em andamento?",
        "resposta": "Pergunta-se com 'What were you doing...?' seguido do gatilho 'when + sujeito + Past Simple'.",
        "conclusao": "Estrutura clássica de interrogatório ou curiosidade sobre o momento exato de um incidente."
      },
      {
        "oracao": "While Clara was playing the piano, Peter was painting a portrait.",
        "pergunta": "Houve interrupção entre as duas pessoas?",
        "resposta": "Não, foram duas atividades contínuas paralelas e harmoniosas no passado.",
        "conclusao": "Duas ações no Past Continuous conectadas por 'while' denotam paralelismo temporal."
      }
    ],
    "armadilhas": [
      {
        "errado": "I walked on the street when I was seeing the accident. ❌",
        "certo": "I was walking on the street when I saw the accident. ✔️",
        "motivo": "A caminhada é o processo contínuo (was walking) e o avistamento é o fato pontual (saw). Verbos sensoriais como 'see' não vão para o contínuo aqui."
      },
      {
        "errado": "While the telephone rang, I watched TV. ❌",
        "certo": "While I was watching TV, the telephone rang. ✔️",
        "motivo": "O toque do telefone é pontual (não dura horas no cenário) e a TV é a atividade contínua regida por 'while'."
      },
      {
        "errado": "When I was eating lunch, suddenly someone knocked on the door. (tolerável mas prolixo) ⚠️",
        "certo": "I was eating lunch when someone knocked on the door. ✔️",
        "motivo": "O padrão nativo elegante associa 'when' diretamente à oração da batida na porta."
      },
      {
        "errado": "He was knowing the answer when the teacher asked. ❌",
        "certo": "He knew the answer when the teacher asked. ✔️",
        "motivo": "'Know' é verbo de estado (stative verb) e não aceita a forma contínua *was knowing*."
      }
    ],
    "coda": "Pense como um diretor de cinema: o Past Continuous é a câmera gravando o cenário de fundo; o Past Simple é o raio que corta a cena quando você grita 'when'!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o tempo correto:\n\n\"I ___ an email when the computer suddenly crashed.\"",
        "opcoes": ["was writing", "wrote", "am writing", "write"],
        "resposta": "was writing",
        "explicacao": "A escrita do e-mail era o processo em andamento que foi interrompido pela pane do computador."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual conjunção completa a frase naturalmente?\n\n\"The baby woke up ___ the dog barked loudly outside.\"",
        "opcoes": ["when", "while", "during", "although"],
        "resposta": "when",
        "explicacao": "'When' conecta-se naturalmente ao evento pontual no Past Simple ('the dog barked')."
      },
      {
        "tipo": "escolha",
        "pergunta": "Escolha a frase gramaticalmente impecável:",
        "opcoes": [
          "While we were waiting for the bus, it began to snow.",
          "When we were waiting for the bus, it was beginning to snow.",
          "While it began to snow, we waited for the bus.",
          "We waited for the bus while it was beginning to snow."
        ],
        "resposta": "While we were waiting for the bus, it began to snow.",
        "explicacao": "'While' introduz a espera contínua e 'began' marca o início pontual da neve."
      },
      {
        "tipo": "escolha",
        "pergunta": "Analise a frase: \"While Mark was studying, Julia was cooking dinner.\"\n\nO que aconteceu?",
        "opcoes": [
          "Duas ações contínuas ocorreram em paralelo ao mesmo tempo.",
          "Mark interrompeu Julia enquanto ela cozinhava.",
          "Julia terminou de cozinhar antes de Mark começar a estudar.",
          "Nenhuma das duas ações chegou a ser iniciada."
        ],
        "resposta": "Duas ações contínuas ocorreram em paralelo ao mesmo tempo.",
        "explicacao": "Dois verbos no Past Continuous unidos por 'while' denotam paralelismo temporal."
      },
      {
        "tipo": "revelar",
        "pergunta": "Por que não dizemos *\"I was having a car when I had an accident\"*?",
        "resposta": "Porque 'have' no sentido de posse é um 'stative verb' (verbo de estado) e não admite forma contínua; o correto é 'I had a car'.",
        "explicacao": "Verbos de estado nunca recebem -ing contínuo no passado."
      },
      {
        "tipo": "revelar",
        "pergunta": "Como se traduz com precisão para o inglês:\n\n\"O que você estava fazendo quando eu te liguei?\"",
        "resposta": "\"What were you doing when I called you?\"",
        "explicacao": "'What were you doing' (Past Continuous interrogativo) + 'when I called you' (Past Simple pontual)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Qual a diferença de sentido entre:\n1. *When John arrived, we had dinner.*\n2. *When John arrived, we were having dinner.*",
        "resposta": "Na frase 1, nós jantamos DEPOIS que John chegou. Na frase 2, nós já estávamos no meio do jantar QUANDO John chegou.",
        "explicacao": "O Past Simple indica sequência; o Past Continuous indica que o jantar já estava acontecendo."
      },
      {
        "tipo": "revelar",
        "pergunta": "Complete mentalmente a oração:\n\n\"He burnt his hand while he ___ (iron) his clothes.\"",
        "resposta": "\"was ironing\"",
        "explicacao": "Passar roupa era a ação em progresso (while he was ironing) durante a qual a queimadura ocorreu."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com o verbo 'drive' no Past Continuous:\n\n\"She ___ home when the storm started.\"",
        "resposta": "was driving",
        "explicacao": "She + was driving (ação em progresso interrompida pela tempestade)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com o verbo 'ring' no Past Simple:\n\n\"We were watching a movie when the doorbell ___.\"",
        "resposta": "rang",
        "explicacao": "Rang é o passado irregular de ring (evento pontual que interrompe o filme)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a conjunção ideal para introduzir a oração contínua:\n\n\"I dropped my keys ___ I was opening the door.\"",
        "resposta": "while",
        "explicacao": "'While' é a conjunção por excelência para orações contínuas."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma verbal correta de 'break' (quebrou):\n\n\"Tim was playing football when he ___ his leg.\"",
        "resposta": "broke",
        "explicacao": "Broke é o passado simples de break (evento instantâneo que corta a partida)."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON A2.7: Future with 'Going to'
  // ─────────────────────────────────────────────────────────────
  "a2-lez7": {
    "id": "a2-lez7",
    "num": "Lesson 7",
    "titulo": "Future with 'Going to'",
    "subtitulo": "Planos Premeditados, Intenções Claras e Previsões Baseadas em Evidências",
    "cena": {
      "origem": "dialogo",
      "titulo": "Weekend Getaway Plans",
      "texto": "**Sophia:** Have you decided what to do during the long weekend, Noah?\n**Noah:** Yes! I'm going to visit my grandparents in the countryside. I bought the train tickets yesterday.\n**Sophia:** That sounds lovely! Look at those dark clouds in the sky, though.\n**Noah:** Oh, it looks like it's going to rain this afternoon. I should take an umbrella!"
    },
    "fio": {
      "abertura": "Como você fala sobre o futuro quando algo já foi planejado com antecedência ou quando uma pista visual óbvia mostra o que vai acontecer?",
      "descoberta": "É aqui que entra a estrutura «BE GOING TO»! Ela equivale perfeitamente ao nosso 'vou fazer / vai acontecer'. Se você já tomou a decisão antes de falar ou se vê o céu preto de nuvens de chuva, 'going to' é a sua ferramenta exata!",
      "fecho": "Agora você distingue com maestria o futuro de planejamento daquele futuro decidido no calor do momento."
    },
    "alerta": "Pronúncia coloquial: No dia a dia falado, você ouvirá muito 'gonna' (/ˈɡənə/). Você pode reconhecê-lo e usá-lo em conversas informais, mas na escrita formal sempre escreva 'going to'.",
    "definicao": {
      "fenomeno": "I am going to buy a car · She is going to start a new job · Look at those clouds, it is going to rain",
      "causa": "O que diferencia 'be going to' de outras formas de futuro?",
      "conceito": "'Be going to' conecta o presente ao futuro em dois cenários: 1) Planos e intenções já decididos antes do momento da fala; 2) Previsões com evidência presente tangível (você vê ou sente que aquilo é iminente)."
    },
    "inventario": [
      "Conjugar o verbo auxiliar To Be no presente (am / is / are) + going to + verbo base",
      "Formular planos e intenções premeditadas (I'm going to travel next month)",
      "Expressar previsões baseadas em evidências visuais presentes (It's going to rain)",
      "Formar negativas com facilidade (I'm not going to sell / She isn't going to quit)",
      "Fazer perguntas com inversão de To Be (Are you going to attend the seminar?)"
    ],
    "tabela_visual": "| Sujeito | Afirmativa (+ verbo) | Negativa | Pergunta com Inversão |\n|---|---|---|---|\n| **I** | **am going to study** | **am not going to study** | **Am I going to study?** |\n| **He / She / It** | **is going to rain** | **isn't going to rain** | **Is it going to rain?** |\n| **You / We / They** | **are going to travel** | **aren't going to travel** | **Are they going to travel?** |",
    "observacao_cards": [
      {
        "ingles": "I'm going to visit",
        "traducao": "Eu vou visitar / pretendo visitar",
        "genero": "Plano Pessoal",
        "motivo": "Decisão já tomada antes da conversa: 'I'm going to visit my doctor tomorrow'."
      },
      {
        "ingles": "It's going to rain",
        "traducao": "Vai chover (evidência visível)",
        "genero": "Previsão com Pista",
        "motivo": "Você olha para o céu e vê nuvens carregadas; a causa presente já está posta."
      },
      {
        "ingles": "Are you going to stay?",
        "traducao": "Você vai ficar? / Você planeja ficar?",
        "genero": "Pergunta sobre Planos",
        "motivo": "Inversão do verbo To Be no início: 'Are you going to stay at this hotel?'"
      },
      {
        "ingles": "She isn't going to accept",
        "traducao": "Ela não vai aceitar",
        "genero": "Negação de Intenção",
        "motivo": "Negação direta no verbo auxiliar To Be: 'isn't going to'."
      },
      {
        "ingles": "Look out! You're going to fall!",
        "traducao": "Cuidado! Você vai cair!",
        "genero": "Aviso Iminente",
        "motivo": "Evidência física imediata (a pessoa tropeçou ou a escada está bamba)."
      },
      {
        "ingles": "Gonna (informal)",
        "traducao": "Vou / vai (redução fonética)",
        "genero": "Linguagem Falada",
        "motivo": "Fusão fonética de 'going to' exclusiva da oralidade: *I'm gonna do it*."
      }
    ],
    "tecnica": {
      "passo1": "Escolha a forma correta do verbo To Be para o sujeito: I am, He/She/It is, You/We/They are.",
      "passo2": "Insira o elo fixo 'going to' logo em seguida.",
      "passo3": "Adicione o verbo principal na sua forma infinitiva pura (sem 'to' extra e sem conjugação): *He is going to (buy) a house*."
    },
    "teoria": "A construção 'Be going to' é um dos pilares da comunicação funcional em inglês. Ela dá clareza sobre o nível de compromisso e certeza do falante em relação ao futuro.\n\n### 1. Os Dois Grandes Pilares de 'Going To'\n1. **Intenções e Planos Pré-estabelecidos:** O falante pensou nisso ANTES de abrir a boca. Há uma deliberação prévia.\n   * *We are going to move to Toronto next year.* (Já pesquisamos, decidimos e começamos a planejar).\n2. **Previsão Baseada em Evidência Física Atual:** O futuro já está plantado diante dos seus olhos.\n   * *The vase is at the edge of the table! It's going to fall!* (O vaso está na beirada, a queda é uma consequência física iminente).\n\n### 2. A Estrutura Sintática Completa\n* **Afirmativa:** Sujeito + [am/is/are] + going to + Verbo Base.\n  * *They are going to build a hospital.* \n* **Negativa:** Sujeito + [am not / isn't / aren't] + going to + Verbo Base.\n  * *We aren't going to buy that expensive car.*\n* **Interrogativa:** [Am/Is/Are] + Sujeito + going to + Verbo Base?\n  * *Is she going to apply for the scholarship?*\n\n### 3. 'Going to go' vs 'Going'\nCom o próprio verbo 'to go' ou 'to come', nativos muitas vezes preferem o Present Continuous para evitar a repetição sonora *going to go*:\n* *I'm going to go to Paris* (correto, mas ligeiramente pesado).\n* *I'm going to Paris next week* (mais fluido e comum entre nativos).",
    "ponte": "No Brasil, nós quase nunca usamos o futuro simples ('eu comprarei', 'nós viajaremos'). Nós usamos 99% das vezes a locução 'eu vou comprar', 'nós vamos viajar'. O 'be going to' é exatamente o irmão gêmeo do nosso 'ir + infinitivo'! A única diferença essencial que você deve memorizar é que em inglês o verbo 'ir' aqui é acompanhado do verbo 'to be' obrigatoriamente (*I AM going to*, e nunca *I going to*).",
    "exemplos_prc": [
      {
        "oracao": "Look at that runner; he is going to win the marathon!",
        "pergunta": "Por que o narrador usa 'is going to win' em vez de 'will win'?",
        "resposta": "Porque há evidência visível no presente: o corredor está a 5 metros da linha de chegada com 100 metros de vantagem.",
        "conclusao": "Evidência concreta e imediata exige 'be going to'."
      },
      {
        "oracao": "We are going to launch our new website on Monday.",
        "pergunta": "Essa decisão foi tomada agora ou já estava planejada?",
        "resposta": "Já estava planejada; o site já foi desenvolvido e a data foi agendada.",
        "conclusao": "Planos e projetos premeditados utilizam a estrutura 'be going to'."
      },
      {
        "oracao": "Are you going to invite Sarah to your graduation ceremony?",
        "pergunta": "Como foi construída a pergunta sobre os planos do ouvinte?",
        "resposta": "O verbo 'are' foi colocado antes do sujeito 'you', seguido de 'going to invite'.",
        "conclusao": "Perguntas de planos exigem inversão do verbo To Be."
      },
      {
        "oracao": "I am not going to tolerate this disrespectful behavior any longer.",
        "pergunta": "Qual a intenção expressa na negação?",
        "resposta": "Uma resolução firme e decidida de não tolerar o comportamento.",
        "conclusao": "'Am not going to' expressa intenções e decisões negativas categóricas."
      }
    ],
    "armadilhas": [
      {
        "errado": "I going to study tonight. ❌",
        "certo": "I am going to study tonight. ✔️",
        "motivo": "Omitir o verbo 'to be' (am/is/are) é um dos erros mais comuns de brasileiros. A fórmula exige 'be'!"
      },
      {
        "errado": "She is going to buys a new laptop. ❌",
        "certo": "She is going to buy a new laptop. ✔️",
        "motivo": "O verbo que vem depois de 'going to' fica na forma base pura (sem -s de terceira pessoa)."
      },
      {
        "errado": "It will rain! Look at those dark clouds! ⚠️ (pouco natural)",
        "certo": "It is going to rain! Look at those dark clouds! ✔️",
        "motivo": "Quando há evidência física visível no presente, nativos preferem 'going to' em vez de 'will'."
      },
      {
        "errado": "Are you going to go to home? ❌",
        "certo": "Are you going to go home? / Are you going home? ✔️",
        "motivo": "A palavra 'home' não leva a preposição 'to'."
      }
    ],
    "coda": "Se já está na sua agenda ou diante dos seus olhos, o futuro é com 'be going to'!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a frase com o plano de Lucas:\n\n\"Lucas ___ computer science at university next year.\"",
        "opcoes": ["is going to study", "are going to study", "am going to study", "going to study"],
        "resposta": "is going to study",
        "explicacao": "Lucas (ele / he) concorda com 'is going to' seguido do verbo no infinitivo 'study'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Veja a situação: \"Watch out! That ladder is shaking! You ___ fall!\"",
        "opcoes": ["are going to", "will probably", "going to", "are to"],
        "resposta": "are going to",
        "explicacao": "Evidência física iminente (a escada está tremendo) exige 'are going to'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual é a forma interrogativa correta?",
        "opcoes": [
          "Are they going to sell their apartment?",
          "Do they going to sell their apartment?",
          "They are going to sell their apartment?",
          "Will they going to sell their apartment?"
        ],
        "resposta": "Are they going to sell their apartment?",
        "explicacao": "A interrogação com 'be going to' inverte o verbo To Be para o início da oração."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a negação:\n\n\"We ___ watch television tonight because we have an exam tomorrow.\"",
        "opcoes": ["aren't going to", "don't going to", "isn't going to", "not going to"],
        "resposta": "aren't going to",
        "explicacao": "Sujeito 'We' + 'aren't going to' para negação de planos."
      },
      {
        "tipo": "revelar",
        "pergunta": "Por que a frase *\"Look at the sky, it will rain\"* soa menos natural para um nativo do que *\"it's going to rain\"*?",
        "resposta": "Porque quando existe uma evidência visual concreta no presente (o céu nublado), a gramática inglesa privilegia expressar a certeza iminente com 'going to'.",
        "explicacao": "Evidência presente ativa a estrutura 'be going to'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Como transformar em inglês a intenção:\n\n\"Eu não vou desistir dos meus sonhos.\"",
        "resposta": "\"I am not going to give up on my dreams.\"",
        "explicacao": "'I am not going to' + verbo base 'give up'."
      },
      {
        "tipo": "revelar",
        "pergunta": "O que significa a expressão falada informal *\"I'm gonna grab a coffee\"*?",
        "resposta": "\"Eu vou pegar um café / comprar um café.\" ('Gonna' é a redução fonética oral de 'going to').",
        "explicacao": "'Gonna' = going to na fala informal rápida."
      },
      {
        "tipo": "revelar",
        "pergunta": "Identifique o erro na frase: *\"My sister is going to travels to Italy.\"*",
        "resposta": "O verbo principal deve ficar na forma base pura: 'travel', sem o '-s'. O correto é: *My sister is going to travel to Italy.*",
        "explicacao": "Após 'going to', o verbo nunca recebe conjugação de 3ª pessoa."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com a forma contraída de 'am not' + 'going to':\n\n\"I ___ cook dinner tonight; let's order pizza.\"",
        "resposta": "I'm not going to",
        "explicacao": "I'm not going to."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com 'is' e 'going to' para a previsão:\n\n\"Look at that car driving so fast! It ___ crash!\"",
        "resposta": "is going to",
        "explicacao": "It is going to crash (evidência de risco iminente)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com o verbo auxiliar para formar a pergunta:\n\n\"___ you going to attend the morning meeting?\"",
        "resposta": "Are",
        "explicacao": "'Are' concorda com o sujeito 'you' na interrogação."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma verbal correta (passada a limpo sem erro):\n\n\"She is going to ___ (start) her internship on Monday.\"",
        "resposta": "start",
        "explicacao": "O verbo no infinitivo base após 'going to' é 'start'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON A2.8: Future with 'Will'
  // ─────────────────────────────────────────────────────────────
  "a2-lez8": {
    "id": "a2-lez8",
    "num": "Lesson 8",
    "titulo": "Future with 'Will'",
    "subtitulo": "Decisões Espontâneas, Promessas, Opiniões e Ofertas Imediatas",
    "cena": {
      "origem": "dialogo",
      "titulo": "At the Office Pantry",
      "texto": "**Oliver:** Oh no, we've run out of printer paper, and the client report is due in twenty minutes!\n**Chloe:** Don't panic! I'll run down to the stationery store and buy two packs right now.\n**Oliver:** Thank you so much, Chloe! I promise I'll finish formatting the graphs while you're away.\n**Chloe:** Perfect. I think the boss will be very pleased with our teamwork."
    },
    "fio": {
      "abertura": "Você está numa sala e o telefone toca. Você não tinha planejado atender aquele telefonema duas semanas atrás — você simplesmente decide no segundo em que o som toca.",
      "descoberta": "Para decisões tomadas no instante exato da fala, o inglês reserva o auxiliar modal «WILL»! Enquanto 'going to' é a agenda já calculada, 'will' é a faísca da decisão imediata ('I'll answer it!'), a promessa de lealdade ('I will help you') e a previsão baseada em opinião pessoal ('I think it will be sunny').",
      "fecho": "Ao dominar o 'will' e sua contração ágil \"'ll\", seu discurso ganha o ritmo natural de um falante nativo."
    },
    "alerta": "Pronúncia e contração: Quase 90% das afirmativas com 'will' na conversa real usam a contração 'll: I'll (/aɪl/), you'll (/juːl/), he'll (/hiːl/), they'll (/ðeɪl/). A negação 'will not' vira 'won't' (/woʊnt/) — não confunda com o verbo 'want' (/wɒnt/ ou /wɑːnt/)!",
    "definicao": {
      "fenomeno": "I will help you · I'll have the steak, please · She won't tell anyone · Will you marry me?",
      "causa": "Qual é a função central do verbo modal 'will'?",
      "conceito": "'Will' é um verbo auxiliar modal invariável (não muda com he/she/it). Ele projeta o futuro em três territórios: 1) Decisões instantâneas tomadas no momento da fala; 2) Promessas, juramentos e recusas voluntárias; 3) Previsões especulativas baseadas em crenças, palpites e opiniões (geralmente com 'I think', 'maybe', 'probably')."
    },
    "inventario": [
      "Usar 'will' + verbo base sem alterações para todas as pessoas gramaticais",
      "Dominar as contrações afirmativas: I'll, you'll, he'll, she'll, we'll, they'll",
      "Usar a negação contraída universal 'won't' (will not)",
      "Distinguir decisões espontâneas (I'll help you) de planos premeditados (going to)",
      "Formular promessas confiáveis (I'll never forget this) e ofertas gentis (Shall I...? / I'll carry that)"
    ],
    "tabela_visual": "| Sujeito | Afirmativa Contraída | Negativa Contraída | Pergunta com Inversão |\n|---|---|---|---|\n| **I / You** | **I'll help** | **I won't forget** | **Will you come?** |\n| **He / She / It** | **He'll arrive soon** | **He won't mind** | **Will it work?** |\n| **We / They** | **They'll agree** | **They won't lose** | **Will they accept?** |",
    "observacao_cards": [
      {
        "ingles": "I'll do it right now",
        "traducao": "Eu faço / farei isso agora mesmo",
        "genero": "Decisão Instantânea",
        "motivo": "Decisão tomada no momento da fala: 'The phone is ringing. I'll get it!'"
      },
      {
        "ingles": "I promise I'll be there",
        "traducao": "Prometo que estarei lá",
        "genero": "Promessa Pessoal",
        "motivo": "'Will' é o marcador padrão de juramentos e compromissos morais."
      },
      {
        "ingles": "Won't (/woʊnt/)",
        "traducao": "Não vai / Não farei (will not)",
        "genero": "Negação Contraída",
        "motivo": "Contração obrigatória na conversação natural: 'He won't come to the party'."
      },
      {
        "ingles": "I think it will be sunny",
        "traducao": "Acho que vai fazer sol",
        "genero": "Previsão / Palpite",
        "motivo": "Opinião subjetiva sem evidência visual imediata; frequentemente precedido por 'I think'."
      },
      {
        "ingles": "I'll carry your bags",
        "traducao": "Deixa que eu levo suas malas",
        "genero": "Oferta Espontânea",
        "motivo": "Oferecer ajuda imediata a alguém que precisa."
      },
      {
        "ingles": "Shall we go?",
        "traducao": "Vamos? / Que tal irmos?",
        "genero": "Sugestão com Shall",
        "motivo": "Na 1ª pessoa (I / We), 'Shall' é usado em perguntas para fazer sugestões ou ofertas educadas."
      }
    ],
    "tecnica": {
      "passo1": "Verifique a invariabilidade: 'will' é idêntico para I, You, He, She, It, We e They — nunca adicione '-s'.",
      "passo2": "Insira o verbo principal em sua forma pura sem 'to': *She will come* (e nunca *She will to come*).",
      "passo3": "Para decisões imediatas ou em restaurantes/lojas, use a contração: *I'll have a coffee, please*."
    },
    "teoria": "O auxiliar 'Will' é frequentemente ensinado como 'o futuro do inglês', mas na verdade o inglês possui múltiplas formas de futuro. Entender exatamente ONDE usar 'will' é o segredo da fluência nativa.\n\n### 1. Os Quatro Usos Nobres de 'Will'\n1. **Decisão Espontânea (On-the-spot decision):** Você não pensou nisso antes. Aconteceu algo e você reagiu:\n   * *A: It's very hot in here. B: I'll open the window.* (Vou abrir a janela agora mesmo).\n2. **Promessas e Juramentos (Promises):**\n   * *Don't worry, I won't tell your secret to anybody.* (Não contarei a ninguém).\n3. **Previsões Baseadas em Opinião (Predictions based on belief):**\n   * Geralmente acompanhadas de verbos mentais: *I think, I believe, I suppose, I doubt, I'm sure*:\n   * *I think humans will land on Mars in the 2030s.* (É uma crença/opinião, não um compromisso fechado de agenda).\n4. **Ofertas e Pedidos:**\n   * *I'll give you a lift to the station.* (Deixa que eu te dou uma carona).\n   * *Will you please pass the salt?* (Você me passa o sal, por favor?).\n\n### 2. A Negação e a Recusa: Won't\nAlém do futuro negativo comum, 'won't' pode expressar a recusa deliberada de uma pessoa ou de um objeto inanimado:\n* *The car won't start!* (O carro não quer pegar / recusa-se a funcionar).\n* *He won't listen to me.* (Ele se recusa a me escutar).\n\n### 3. Shall I / Shall We\nNo inglês britânico tradicional e no inglês internacional elegante, usa-se 'Shall' com *I* e *we* para sugestões:\n* *Shall we dance?* (Vamos dançar?).\n* *Shall I open the window for you?* (Quer que eu abra a janela para você?).",
    "ponte": "Em português, quando o garçom pergunta o que vamos querer, dizemos: 'Eu quero um bife' ou 'Eu vou querer um bife'. Em inglês, nunca diga *'I want a steak'* (soa rude) nem *'I am going to have a steak'* (a menos que já tivesse isso planejado desde casa). Em restaurantes e lojas, a regra de ouro é sempre usar 'will': *I'll have the steak, please*. O 'will' mostra a escolha sendo feita naquele momento exato.",
    "exemplos_prc": [
      {
        "oracao": "A: The doorbell is ringing. B: I'll get it!",
        "pergunta": "Por que a pessoa B responde com 'I'll get it' em vez de 'I'm going to get it'?",
        "resposta": "Porque a campainha tocou de surpresa; a decisão de atender foi tomada na fração de segundo da fala.",
        "conclusao": "Reações espontâneas a acontecimentos presentes exigem 'will' / ''ll'."
      },
      {
        "oracao": "I think Brazil will win the next World Cup.",
        "pergunta": "Qual a natureza da previsão sobre a Copa do Mundo?",
        "resposta": "É uma opinião, palpite ou crença do falante ('I think'), sem evidência material conclusiva hoje.",
        "conclusao": "Previsões baseadas em juízo pessoal e crenças usam 'will'."
      },
      {
        "oracao": "Don't be nervous about the interview; I'm sure you will do great.",
        "pergunta": "Como 'will' atua para encorajar o interlocutor?",
        "resposta": "Expressa confiança e convicção sobre o futuro em conjunto com 'I'm sure'.",
        "conclusao": "Frases com 'sure', 'certain' e 'hope' combinam perfeitamente com 'will'."
      },
      {
        "oracao": "I won't let you down, boss. I promise.",
        "pergunta": "Qual é a função semântica de 'won't' aqui?",
        "resposta": "Constitui uma promessa solene e compromisso de honra.",
        "conclusao": "Promessas formais utilizam 'will' / 'won't'."
      }
    ],
    "armadilhas": [
      {
        "errado": "He wills help us tomorrow. ❌",
        "certo": "He will help us tomorrow. ✔️",
        "motivo": "'Will' é um verbo modal e NUNCA recebe '-s', mesmo para he, she ou it."
      },
      {
        "errado": "I will to call you later. ❌",
        "certo": "I will call you later. / I'll call you later. ✔️",
        "motivo": "Nunca use a preposição 'to' após o verbo modal 'will'."
      },
      {
        "errado": "I want a coffee, please. (em cafeteria / restaurante) ⚠️",
        "certo": "I'll have a coffee, please. ✔️",
        "motivo": "'I want' soa imperativo e infantil; 'I'll have' é a fórmula universalmente educada para pedidos."
      },
      {
        "errado": "I think it will not rain. ⚠️ (pouco natural)",
        "certo": "I don't think it will rain. ✔️",
        "motivo": "Em inglês, a negação é transferida para o verbo principal de opinião: 'I don't think + will'."
      }
    ],
    "coda": "Para o que você decide agora, para o que você promete de coração e para o café que pede no balcão: use sempre 'I'll'!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Você está num restaurante e decidiu o seu pedido agora. Qual é a frase perfeita?",
        "opcoes": [
          "I'll have the grilled salmon, please.",
          "I am having the grilled salmon, please.",
          "I will to have the grilled salmon, please.",
          "I want the grilled salmon, please."
        ],
        "resposta": "I'll have the grilled salmon, please.",
        "explicacao": "'I'll have...' é a fórmula polida e nativa padrão para fazer pedidos."
      },
      {
        "tipo": "escolha",
        "pergunta": "O telefone toca na sua mesa. O que você diz para o colega?",
        "opcoes": [
          "Don't worry, I'll answer it.",
          "Don't worry, I am going to answer it.",
          "Don't worry, I answer it.",
          "Don't worry, I'll to answer it."
        ],
        "resposta": "Don't worry, I'll answer it.",
        "explicacao": "Decisão instantânea tomada no momento em que o estímulo ocorre: 'I'll answer it'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a negação adequada para uma promessa:\n\n\"Trust me, I ___ tell anyone your password.\"",
        "opcoes": ["won't", "don't will", "not will", "am not"],
        "resposta": "won't",
        "explicacao": "'Won't' (will not) é a forma correta para selar uma promessa negativa."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase expressa uma previsão baseada em opinião pessoal?",
        "opcoes": [
          "I believe electric cars will replace petrol cars completely.",
          "Look at the fuel gauge; we are going to run out of petrol.",
          "I am buying an electric car on Friday morning.",
          "The train departs at seven o'clock tomorrow."
        ],
        "resposta": "I believe electric cars will replace petrol cars completely.",
        "explicacao": "Opinião/crença sobre o futuro introduzida por 'I believe' usa 'will'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Qual a diferença de sentido entre:\n1. *\"I'm going to clean my room tomorrow.\"*\n2. *\"Alright, I'll clean my room now!\"*",
        "resposta": "A frase 1 é um plano que já estava decidido previamente. A frase 2 é uma reação ou decisão espontânea tomada no calor do momento.",
        "explicacao": "Going to = plano prévio; Will = decisão no momento da fala."
      },
      {
        "tipo": "revelar",
        "pergunta": "Por que dizemos *\"I don't think he will pass the test\"* em vez de *\"I think he won't pass the test\"*?",
        "resposta": "Porque em inglês existe o fenômeno do 'negative transfer' com verbos de opinião: nativos negam o verbo 'think' (*I don't think...*), deixando a oração subordinada afirmativa.",
        "explicacao": "'I don't think + will' é a construção elegante padrão em inglês."
      },
      {
        "tipo": "revelar",
        "pergunta": "O que significa a pergunta britânica *\"Shall we dance?\"*?",
        "resposta": "\"Vamos dançar? / Que tal uma dança?\". 'Shall' com 'we' convida ou sugere uma ação conjunta educada.",
        "explicacao": "'Shall we' formula convites e sugestões colaborativas."
      },
      {
        "tipo": "revelar",
        "pergunta": "Qual é a contração de 'will not' e como se pronuncia?",
        "resposta": "'Won't', pronunciado /woʊnt/ (com som de 'ou' fechado, diferente de 'want' /wɒnt/).",
        "explicacao": "Won't = will not."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com a contração de 'I will':\n\n\"Give me the bag; ___ carry it for you.\"",
        "resposta": "I'll",
        "explicacao": "I'll é a forma contraída natural de oferta."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma negativa contraída de 'will not':\n\n\"I promise I ___ be late for the meeting tomorrow.\"",
        "resposta": "won't",
        "explicacao": "Won't é a contração de will not."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete a pergunta com a palavra correta para oferta educada na 1ª pessoa:\n\n\"___ I carry your suitcase, madam?\"",
        "resposta": "Shall",
        "explicacao": "Shall I é a fórmula clássica para oferecer ajuda."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com o verbo modal de certeza sobre a opinião:\n\n\"I am sure they ___ love the surprise party.\"",
        "resposta": "will",
        "explicacao": "'I am sure they will love...' projeta a certeza subjetiva."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON A2.9: Comparatives
  // ─────────────────────────────────────────────────────────────
  "a2-lez9": {
    "id": "a2-lez9",
    "num": "Lesson 9",
    "titulo": "Comparatives",
    "subtitulo": "Comparando Elementos — Regras de -er than, More... than e Formas Irregulares",
    "cena": {
      "origem": "dialogo",
      "titulo": "Choosing an Apartment",
      "texto": "**Leo:** What do you think of the apartment near the subway station, Maya?\n**Maya:** It's certainly more convenient than the suburban flat, but it's much smaller and noisier.\n**Leo:** True, but the rent is cheaper than I expected, and the landlord seems friendlier.\n**Maya:** That's a good point! Living closer to work is definitely better for our daily commute."
    },
    "fio": {
      "abertura": "No dia a dia, estamos constantemente avaliando opções: qual carro é mais rápido, qual cidade é mais segura, qual ideia é melhor.",
      "descoberta": "O inglês faz isso dividindo os adjetivos pelo seu comprimento silábico! Se a palavra é curta (1 sílaba), ela recebe o sufixo «-ER» (*tall -> taller*). Se a palavra é longa (2 ou mais sílabas), ela ganha a palavra «MORE» na frente (*more expensive*). E para conectar os dois lados da balança, usamos sempre a palavra mágica «THAN»!",
      "fecho": "Com essas regras claras e os casos especiais dominados, você comparará qualquer coisa em inglês com precisão cirúrgica."
    },
    "alerta": "Erro clássico de brasileiro: NUNCA diga *'more cheap'* ou *'more easy'*. Adjetivos curtos exigem '-er' (*cheaper, easier*). E cuidado para nunca usar duplo comparativo como *'more better'* ❌!",
    "definicao": {
      "fenomeno": "Taller than · Cheaper than · More comfortable than · Better than · Worse than",
      "causa": "Como o inglês estabelece a superioridade relativa entre dois elementos?",
      "conceito": "Adjetivos curtos (1 sílaba ou 2 sílabas terminadas em -y) incorporam o sufixo comparativo '-er' (com ajustes ortográficos). Adjetivos longos (2 ou mais sílabas) mantêm sua forma original e recebem o advérbio 'more' antes de si. Em ambos os casos, o segundo termo da comparação é introduzido por 'than'."
    },
    "inventario": [
      "Aplicar '-er' a adjetivos curtos de uma sílaba (faster, older, colder)",
      "Dobrar a consoante final em palavras CVC (big -> bigger, hot -> hotter)",
      "Transformar '-y' em '-ier' (easy -> easier, heavy -> heavier, happy -> happier)",
      "Usar 'more + adjetivo' para palavras longas (more modern, more expensive)",
      "Dominar os comparativos irregulares fundamentais: good -> better, bad -> worse, far -> further",
      "Usar a conjunção comparativa correta: 'than' (e nunca *that* ou *then*)"
    ],
    "tabela_visual": "| Tipo de Adjetivo | Regra Gramatical | Adjetivo Base | Comparativo (+ than) |\n|---|---|---|---|\n| **1 sílaba (geral)** | Adiciona **-er** | fast / cold | **faster than** / **colder than** |\n| **1 sílaba (CVC)** | Dobra consoante + **-er** | big / hot | **bigger than** / **hotter than** |\n| **Terminado em -y** | Troca por **-ier** | easy / busy | **easier than** / **busier than** |\n| **2+ sílabas (longo)** | Adiciona **more** | expensive / modern | **more expensive than** |\n| **Irregular** | Forma própria exclusiva | good / bad / far | **better than** / **worse than** / **further than** |",
    "observacao_cards": [
      {
        "ingles": "Bigger than",
        "traducao": "Maior que / Maior do que",
        "genero": "Regra CVC (Consoante-Vogal-Consoante)",
        "motivo": "Big termina em C-V-C, logo a última consoante é dobrada antes do -er: 'bigger'."
      },
      {
        "ingles": "Easier than",
        "traducao": "Mais fácil que",
        "genero": "Regra do -Y",
        "motivo": "Easy termina em consoante + y; o 'y' cai e entra '-ier': 'easier than'."
      },
      {
        "ingles": "More expensive than",
        "traducao": "Mais caro que",
        "genero": "Adjetivo Longo",
        "motivo": "Expensive tem 3 sílabas; não aceita sufixo: usamos 'more expensive than'."
      },
      {
        "ingles": "Better than (/ˈbɛtər ðæn/)",
        "traducao": "Melhor que",
        "genero": "Irregular Nobre (Good)",
        "motivo": "Good nunca vira *gooder*; a forma comparativa é 'better'."
      },
      {
        "ingles": "Worse than (/wɜːrs ðæn/)",
        "traducao": "Pior que",
        "genero": "Irregular Nobre (Bad)",
        "motivo": "Bad nunca vira *badder*; a forma comparativa é 'worse'."
      },
      {
        "ingles": "As... as (Comparativo de Igualdade)",
        "traducao": "Tão... quanto",
        "genero": "Igualdade Comparativa",
        "motivo": "Para dizer que algo é igual: 'This test is as difficult as the previous one'."
      }
    ],
    "tecnica": {
      "passo1": "Conte as sílabas do adjetivo falado: 1 sílaba ou 2 terminadas em -y = família '-er'; 2 ou mais sílabas gerais = família 'more'.",
      "passo2": "Se for curto, aplique o ajuste ortográfico: consoante dobrada para CVC (*hot -> hotter*) ou '-ier' para -y (*happy -> happier*).",
      "passo3": "Coloque a palavra 'than' logo antes do segundo termo: *Tokyo is bigger than London*."
    },
    "teoria": "A comparação em inglês é governada pelo princípio da economia e da eufonia (harmonia sonora). Línguas germânicas preservaram o sufixo comparativo sintético para palavras nativas curtas e adotaram a forma analítica ('more') para palavras mais longas de origem latina ou francesa.\n\n### 1. O Filtro de Classificação dos Adjetivos\n1. **Adjetivos Curtos (Monossílabos):**\n   * Regra geral: + *-er* (*tall -> taller, short -> shorter, young -> younger*).\n   * Terminados em -e: apenas + *-r* (*large -> larger, wide -> wider*).\n   * Terminados em CVC (Consoante-Vogal-Consoante): dobra a consoante final (*fat -> fatter, slim -> slimmer, wet -> wetter*).\n2. **Dissílabos terminados em -Y:**\n   * Troca-se o -y por *-ier* (*noisy -> noisier, pretty -> prettier, friendly -> friendlier*).\n3. **Adjetivos Longos (Dois ou mais sílabas sem -y):**\n   * Antepõe-se a palavra *more*: *more intelligent, more comfortable, more dangerous, more interesting*.\n\n### 2. Os Três Gigantes Irregulares\n* **Good -> Better:** *My new laptop is much better than my old one.*\n* **Bad -> Worse:** *The traffic today is even worse than yesterday.*\n* **Far -> Further / Farther:** *The train station is further than the bus stop.* (Further também significa 'adicional/mais': *further information*).\n\n### 3. A Conjunção 'THAN'\nNunca confunda a grafia e pronúncia:\n* **THAN** (/ðæn/ com 'A') = conector comparativo (*She is taller THAN me*).\n* **THEN** (/ðɛn/ com 'E') = marcador temporal 'então / depois' (*We ate dinner, and then we slept*).\n\n### 4. Intensificando a Comparação\nPara dizer 'muito mais...' ou 'um pouco mais...', use advérbios antes do comparativo:\n* *Much bigger* (muito maior) / *A lot more expensive* (muito mais caro).\n* *A bit colder* (um pouco mais frio) / *Slightly easier* (ligeiramente mais fácil).",
    "ponte": "Em português, nós sempre usamos a palavra 'mais' para tudo: 'mais alto', 'mais inteligente', 'mais fácil', 'mais quente'. Por causa desse hábito do português, brasileiros tendem a falar *'more tall'*, *'more easy'* e *'more hot'*. Isso soa truncado e incorreto em inglês. Você precisa 'trocar a chave mental': se a palavra for pequena, ela quer engolir o '-er' no final!",
    "exemplos_prc": [
      {
        "oracao": "An airplane is much faster than a passenger train.",
        "pergunta": "Como se formou a comparação entre o avião e o trem?",
        "resposta": "'Fast' tem uma sílaba, então recebeu '-er' (faster), intensificado por 'much' e conectado por 'than'.",
        "conclusao": "Adjetivos monossílabos usam '-er than'."
      },
      {
        "oracao": "The second semester was much easier than the first one.",
        "pergunta": "O que aconteceu com a ortografia de 'easy'?",
        "resposta": "Como terminava em consoante + y, o 'y' foi substituído por '-ier'.",
        "conclusao": "Palavras de duas sílabas em -y flexionam-se como '-ier than'."
      },
      {
        "oracao": "This documentary is more interesting than that action movie.",
        "pergunta": "Por que 'interesting' usou 'more' em vez de '-er'?",
        "resposta": "Porque 'interesting' é um adjetivo longo (quatro sílabas) e exige a estrutura analítica com 'more'.",
        "conclusao": "Adjetivos polissilábicos são precedidos por 'more ... than'."
      },
      {
        "oracao": "His health condition is getting worse than before.",
        "pergunta": "Por que não foi usado *'more bad'*?",
        "resposta": "Porque 'bad' é estritamente irregular e sua forma comparativa única é 'worse'.",
        "conclusao": "Bad transforma-se obrigatoriamente em worse."
      }
    ],
    "armadilhas": [
      {
        "errado": "He is more tall than his brother. ❌",
        "certo": "He is taller than his brother. ✔️",
        "motivo": "'Tall' tem uma sílaba e exige '-er'. 'More tall' é incorreto."
      },
      {
        "errado": "This exercise is more better than that one. ❌",
        "certo": "This exercise is much better than that one. ✔️",
        "motivo": "Nunca combine 'more' com comparativos sintéticos ou irregulares (*more better*, *more faster* são erros grosseiros de redundância)."
      },
      {
        "errado": "Canada is bigger then Mexico. ❌",
        "certo": "Canada is bigger than Mexico. ✔️",
        "motivo": "A palavra comparativa é 'than' (com 'a'). 'Then' (com 'e') significa 'então/depois'."
      },
      {
        "errado": "Your phone is more modern that mine. ❌",
        "certo": "Your phone is more modern than mine. ✔️",
        "motivo": "Nunca use 'that' em comparações de superioridade; o conectivo é sempre 'than'."
      }
    ],
    "coda": "Palavra curta ganha '-er', palavra longa pede 'more', e para amarrar os dois lados na balança, chame sempre o 'than'!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o comparativo correto:\n\n\"The blue whale is ___ animal in the world.\"",
        "opcoes": ["bigger than any other", "more big than any other", "more bigger than any other", "as big that any other"],
        "resposta": "bigger than any other",
        "explicacao": "Big é CVC (consoante-vogal-consoante), dobra o 'g' e recebe '-er than'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a comparação de adjetivo longo:\n\n\"Travelling by train is often ___ travelling by air.\"",
        "opcoes": [
          "more relaxing than",
          "relaxinger than",
          "more relaxing that",
          "most relaxing than"
        ],
        "resposta": "more relaxing than",
        "explicacao": "'Relaxing' é adjetivo longo (3 sílabas), exigindo 'more ... than'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual das frases a seguir está 100% correta?",
        "opcoes": [
          "My English is getting better every single day.",
          "My English is getting more good every single day.",
          "My English is getting gooder every single day.",
          "My English is getting more better every single day."
        ],
        "resposta": "My English is getting better every single day.",
        "explicacao": "'Good' flexiona-se exclusivamente como 'better'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a frase: \"The weather today is ___ yesterday.\"",
        "opcoes": ["worse than", "badder than", "more bad than", "worse then"],
        "resposta": "worse than",
        "explicacao": "'Worse than' é a forma comparativa irregular correta de 'bad'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Por que a palavra *'heavy'* (pesado) vira *'heavier'* e não *'more heavy'* nem *'heavyer'*?",
        "resposta": "Porque adjetivos de duas sílabas terminados em consoante + 'y' trocam o 'y' por 'i' e recebem o sufixo '-er': 'heavier'.",
        "explicacao": "Regra ortográfica: -y precedido de consoante transforma-se em -ier."
      },
      {
        "tipo": "revelar",
        "pergunta": "Qual é a diferença entre *'than'* e *'then'*?",
        "resposta": "'Than' (com 'a') é a conjunção de comparação ('faster than'). 'Then' (com 'e') é advérbio de tempo ('I washed my hands, then I ate').",
        "explicacao": "Than = do que; Then = então / depois."
      },
      {
        "tipo": "revelar",
        "pergunta": "Como se diz em inglês: \"Este carro é tão rápido quanto aquele\"?",
        "resposta": "\"This car is as fast as that one.\"",
        "explicacao": "O comparativo de igualdade usa a estrutura 'as + adjetivo base + as'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Corrija o erro comum: *\"I need more further information.\"*",
        "resposta": "Elimine o 'more'. O correto é: *\"I need further information\"* (ou *further details*).",
        "explicacao": "'Further' já é uma forma comparativa completa."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma comparativa do adjetivo 'hot' (quente):\n\n\"July is usually ___ than May in Europe.\"",
        "resposta": "hotter",
        "explicacao": "Hot termina em consoante-vogal-consoante, dobrando o 't': hotter."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra comparativa que completa a frase:\n\n\"She is two years older ___ her sister.\"",
        "resposta": "than",
        "explicacao": "'Than' é o conectivo comparativo obrigatório."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o comparativo irregular de 'good':\n\n\"Health is ___ than wealth.\"",
        "resposta": "better",
        "explicacao": "Good vira better."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com a forma comparativa de 'busy' (ocupado):\n\n\"Mondays are always ___ than Fridays at our clinic.\"",
        "resposta": "busier",
        "explicacao": "Busy termina em consoante + y, virando busier."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON A2.10: Superlatives
  // ─────────────────────────────────────────────────────────────
  "a2-lez10": {
    "id": "a2-lez10",
    "num": "Lesson 10",
    "titulo": "Superlatives",
    "subtitulo": "O Topo da Escala — The -est, The Most e Formas Irregulares",
    "cena": {
      "origem": "dialogo",
      "titulo": "The World Geography Quiz",
      "texto": "**Quizmaster:** Question number five: What is the highest mountain peak above sea level on Earth?\n**Daniel:** Mount Everest! It is definitely the tallest.\n**Quizmaster:** Correct! And which ocean is the deepest and the largest?\n**Sarah:** The Pacific Ocean is the largest, and the Mariana Trench is the deepest point in the world!"
    },
    "fio": {
      "abertura": "Quando não estamos mais comparando apenas duas coisas entre si, mas destacando o número UM de todo um grupo ou do planeta inteiro, entramos no reino dos superlativos.",
      "descoberta": "Assim como nos comparativos, o tamanho do adjetivo dita a regra! Adjetivos curtos recebem «THE ... -EST» (*the highest, the oldest*). Adjetivos longos recebem «THE MOST ...» (*the most beautiful*). E o artigo definido «THE» é OBRIGATÓRIO, porque estamos falando daquele único que alcançou o topo!",
      "fecho": "Ao dominar os superlativos e suas preposições típicas ('in the world', 'of all'), você expressará recordes e limites absolutos com maestria."
    },
    "alerta": "Preposição após superlativo: Quando se referir a lugares, países ou grupos, use 'IN' (*the best in the world, the tallest in the class*). Quando se referir a períodos de tempo ou de um conjunto numérico, use 'OF' (*the coldest day of the year, the smartest of them all*). Nunca use *'from the world'* ❌!",
    "definicao": {
      "fenomeno": "The tallest building · The most expensive watch · The best solution · The worst storm · The deepest lake",
      "causa": "O que caracteriza a estrutura de superlativo em inglês?",
      "conceito": "O superlativo isola um elemento como o detentor do grau máximo (ou mínimo) de uma característica dentro de um conjunto de três ou mais elementos. Exige sempre o artigo definido 'the' e divide-se em forma sintética (the + adjetivo + -est) e forma analítica (the most + adjetivo)."
    },
    "inventario": [
      "Usar obrigatoriamente o artigo 'the' antes de qualquer superlativo",
      "Adicionar '-est' a adjetivos curtos de uma sílaba (the fastest, the darkest)",
      "Dobrar a consoante final em adjetivos CVC (the biggest, the hottest)",
      "Modificar adjetivos em '-y' para '-iest' (the easiest, the happiest, the luckiest)",
      "Usar 'the most + adjetivo' para palavras de duas ou mais sílabas (the most important)",
      "Dominar os superlativos irregulares: the best, the worst, the furthest/farthest"
    ],
    "tabela_visual": "| Categoria | Regra Gramatical | Adjetivo Base | Superlativo Completo |\n|---|---|---|---|\n| **1 sílaba (geral)** | the + adjetivo + **-est** | old / fast | **the oldest** / **the fastest** |\n| **1 sílaba (CVC)** | the + dobra consoante + **-est** | big / hot | **the biggest** / **the hottest** |\n| **Terminado em -y** | the + troca por **-iest** | happy / heavy | **the happiest** / **the heaviest** |\n| **2+ sílabas (longo)** | **the most** + adjetivo | popular / famous | **the most popular** / **the most famous** |\n| **Irregular** | Formas únicas memorizadas | good / bad / far | **the best** / **the worst** / **the furthest** |",
    "observacao_cards": [
      {
        "ingles": "The biggest",
        "traducao": "O maior (de todos)",
        "genero": "Superlativo CVC",
        "motivo": "Big tem padrão Consoante-Vogal-Consoante: dobra o 'g' e adiciona '-est' com 'the'."
      },
      {
        "ingles": "The most expensive",
        "traducao": "O mais caro",
        "genero": "Superlativo Longo",
        "motivo": "Expensive é palavra longa; recebe 'the most' e não aceita terminação '-est'."
      },
      {
        "ingles": "The best (/ðə bɛst/)",
        "traducao": "O melhor (de todos)",
        "genero": "Irregular Nobre (Good)",
        "motivo": "Superlativo exclusivo de good: 'This is the best pizza in town'."
      },
      {
        "ingles": "The worst (/ðə wɜːrst/)",
        "traducao": "O pior (de todos)",
        "genero": "Irregular Nobre (Bad)",
        "motivo": "Superlativo exclusivo de bad: 'That was the worst movie of the decade'."
      },
      {
        "ingles": "In the world / In my class",
        "traducao": "No mundo / Na minha turma",
        "genero": "Preposição de Lugar/Grupo",
        "motivo": "Usa-se a preposição 'in' (e não 'of' nem 'from') após superlativos para lugares e grupos."
      },
      {
        "ingles": "The least (+ adjetivo)",
        "traducao": "O menos (+ adjetivo)",
        "genero": "Superlativo de Inferioridade",
        "motivo": "O oposto de 'the most': 'This is the least expensive option'."
      }
    ],
    "tecnica": {
      "passo1": "Coloque sempre o artigo definido 'the' no início da construção.",
      "passo2": "Analise o adjetivo: se tiver 1 sílaba ou 2 terminadas em -y, aplique '-est' ou '-iest'; se tiver 2 ou mais sílabas gerais, use 'most'.",
      "passo3": "Para contextualizar o conjunto de referência, use 'in' para lugares/instituições (*in the company*) e 'of' para períodos (*of the year*)."
    },
    "teoria": "O superlativo representa o grau absoluto no topo (ou fundo) de uma hierarquia qualitativa. Ele completa a trilogia dos graus do adjetivo: Positivo (*fast*), Comparativo (*faster*) e Superlativo (*the fastest*).\n\n### 1. Regras de Formação Morfológica\n* **Monossílabos regulares:** *cold -> the coldest, high -> the highest, smart -> the smartest*.\n* **Monossílabos terminados em -e:** adiciona-se apenas *-st*: *nice -> the nicest, safe -> the safest, close -> the closest*.\n* **CVC (Consoante-Vogal-Consoante):** dobra-se a consoante: *fat -> the fattest, thin -> the thinnest, sad -> the saddest*.\n* **Dissílabos em -Y:** troca-se o -y por *-iest*: *busy -> the busiest, crazy -> the craziest, friendly -> the friendliest*.\n* **Adjetivos Longos:** utilizam *the most*: *the most generous, the most dangerous, the most comfortable*.\n\n### 2. Formas Irregulares Capitais\n* **Good -> The best:** *She is the best doctor in our hospital.*\n* **Bad -> The worst:** *That was the worst storm in thirty years.*\n* **Far -> The furthest / farthest:** *Neptune is the furthest planet from the Sun.*\n* **Little -> The least:** *He made the least amount of noise.*\n\n### 3. A Conexão com o Present Perfect\nUma das estruturas mais sofisticadas e comuns da língua inglesa é combinar o superlativo com o Present Perfect com 'ever':\n* *This is the best coffee I have ever tasted.* (Este é o melhor café que já provei na vida).\n* *It was the most boring speech we had ever heard.* (Foi o discurso mais chato que já tínhamos ouvido).",
    "ponte": "No português, dizemos 'o mais alto', 'o mais caro', 'o mais rápido' — sempre usando 'o mais'. Em inglês, a tentação do brasileiro é traduzir palavra por palavra e dizer *'the more high'* ou *'the most fast'*. Isso é um erro estrutural grave. Adjetivos curtos em inglês se recusam a aceitar 'most': eles exigem '-est' anexado ao seu próprio corpo (*the highest, the fastest*). Guarde a regra de ouro: 'est' é o campeão dos curtos!",
    "exemplos_prc": [
      {
        "oracao": "Vatican City is the smallest country in the world.",
        "pergunta": "Como se estruturou o superlativo de 'small'?",
        "resposta": "'Small' tem uma sílaba, recebendo o artigo 'the' + o sufixo '-est' (the smallest), seguido da preposição de lugar 'in'.",
        "conclusao": "Adjetivos curtos usam 'the -est in [lugar]'."
      },
      {
        "oracao": "This is the most challenging project our engineering team has ever undertaken.",
        "pergunta": "Por que foi usado 'the most challenging'?",
        "resposta": "Porque 'challenging' tem três sílabas e exige a forma analítica superlativa.",
        "conclusao": "Adjetivos longos usam 'the most'."
      },
      {
        "oracao": "Yesterday was the hottest day of the whole summer.",
        "pergunta": "O que explica a ortografia de 'hottest' e o uso da preposição 'of'?",
        "resposta": "'Hot' termina em CVC, dobrando o 't' (hottest); 'of' é usado porque o conjunto de referência é um período temporal ('the summer').",
        "conclusao": "Dobra de consoante em CVC e 'of' para períodos de tempo."
      },
      {
        "oracao": "It was the worst decision he could possibly make.",
        "pergunta": "Qual a forma base de 'worst'?",
        "resposta": "A forma base é 'bad' (mau/ruim), cujo superlativo irregular é 'the worst'.",
        "conclusao": "Bad flexiona-se de forma irregular e exclusiva como 'the worst'."
      }
    ],
    "armadilhas": [
      {
        "errado": "He is the most fast runner. ❌",
        "certo": "He is the fastest runner. ✔️",
        "motivo": "'Fast' é curto (1 sílaba) e exige 'the fastest'. 'Most fast' não existe em inglês culto."
      },
      {
        "errado": "She is tallest girl in the school. ❌",
        "certo": "She is the tallest girl in the school. ✔️",
        "motivo": "Nunca omita o artigo 'the' antes de um superlativo. 'The' é obrigatório."
      },
      {
        "errado": "He is the best player of the world. ❌",
        "certo": "He is the best player in the world. ✔️",
        "motivo": "Para lugares, cidades e o mundo, a preposição padrão em inglês é 'IN', nunca 'of'."
      },
      {
        "errado": "This is the most best day of my life. ❌",
        "certo": "This is the best day of my life. ✔️",
        "motivo": "Nunca combine 'most' com 'best' (*most best* é redundância grotesca)."
      }
    ],
    "coda": "Para coroar o número um de todos: use sempre 'THE', adicione '-est' aos curtos e 'most' aos longos!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Qual é a frase que expressa corretamente o superlativo de 'large'?",
        "opcoes": [
          "Russia is the largest country in the world.",
          "Russia is the most large country in the world.",
          "Russia is largest country of the world.",
          "Russia is the larger country in the world."
        ],
        "resposta": "Russia is the largest country in the world.",
        "explicacao": "Large + -st = the largest; acompanhado de 'in the world'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o superlativo de adjetivo longo:\n\n\"The cheetah is ___ land animal on Earth.\"",
        "opcoes": [
          "the fastest",
          "the most fast",
          "the faster",
          "most fast"
        ],
        "resposta": "the fastest",
        "explicacao": "Fast é monossílabo: the fastest."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual das frases está gramaticalmente perfeita?",
        "opcoes": [
          "This is the most interesting book I have ever read.",
          "This is the interestingest book I have ever read.",
          "This is most interesting book I have ever read.",
          "This is the more interesting book I have ever read."
        ],
        "resposta": "This is the most interesting book I have ever read.",
        "explicacao": "'Interesting' é longo, exigindo 'the most interesting'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a frase com a preposição correta:\n\n\"Liam is the smartest student ___ our entire school.\"",
        "opcoes": ["in", "of", "from", "at"],
        "resposta": "in",
        "explicacao": "Usa-se 'in' com instituições, lugares e grupos (in our school, in the company)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Por que o superlativo de *'bad'* é *'the worst'* e não *'the baddest'*?",
        "resposta": "Porque 'bad' é um adjetivo irregular histórico da língua inglesa: positivo = bad, comparativo = worse, superlativo = the worst.",
        "explicacao": "Superlativo irregular de bad."
      },
      {
        "tipo": "revelar",
        "pergunta": "Identifique e corrija os dois erros na frase:\n\n*\"He is most friendly person of my team.\"*",
        "resposta": "Falta o artigo 'the' e a preposição para grupo é 'in': *\"He is THE friendliest person IN my team.\"*",
        "explicacao": "Exige 'the', sufixo '-iest' e preposição 'in'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Como se diz em inglês: \"Este foi o melhor dia da minha vida\"?",
        "resposta": "\"This was the best day of my life.\"",
        "explicacao": "The best (superlativo de good) + of my life (período de tempo/vida)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Qual é a forma superlativa do advérbio/adjetivo 'far' para distância máxima?",
        "resposta": "\"The furthest\" ou \"the farthest\".",
        "explicacao": "Ambas as formas são aceitas, sendo 'furthest' a mais comum no inglês internacional."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o superlativo completo do adjetivo 'good':\n\n\"She is ___ doctor in our hospital.\" (a melhor)",
        "resposta": "the best",
        "explicacao": "The best é o superlativo irregular de good."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com o superlativo de 'easy' (o mais fácil):\n\n\"This was ___ exam of the semester.\"",
        "resposta": "the easiest",
        "explicacao": "Easy termina em consoante + y, virando 'the easiest'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição correta após o superlativo de lugar:\n\n\"Tokyo is the most populous city ___ Japan.\"",
        "resposta": "in",
        "explicacao": "'In' é a preposição para países e cidades após superlativo."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com o superlativo irregular de 'bad':\n\n\"That was ___ mistake I have ever made.\" (o pior)",
        "resposta": "the worst",
        "explicacao": "The worst é o superlativo irregular de bad."
      }
    ]
  }
};

console.log('Gravando Onda 4 Parte 2 (Lições A2.6 a A2.10)...');

for (const [id, lessonData] of Object.entries(wave4Part2Lessons)) {
  for (const mod of data.moduli) {
    const idx = mod.lezioni.findIndex(l => l.id === id);
    if (idx !== -1) {
      mod.lezioni[idx] = lessonData;
      console.log(`Lição ${id} (${lessonData.titulo}) enriquecida com sucesso!`);
    }
  }
}

fs.writeFileSync(grammarPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Onda 4 Parte 2 (A2.6 a A2.10) gravada com sucesso em data/grammar.json!');
