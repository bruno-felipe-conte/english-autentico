import fs from 'fs';

const grammarPath = 'data/grammar.json';
const data = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));

// Onda 4 Parte 3: Lições A2.11 a A2.15 (Modais de Obrigação, Propósito, Present Perfect Inicial e Movimento)
const wave4Part3Lessons = {
  // ─────────────────────────────────────────────────────────────
  // LESSON A2.11: Modal Verbs (Advice & Obligation)
  // ─────────────────────────────────────────────────────────────
  "a2-lez11": {
    "id": "a2-lez11",
    "num": "Lesson 11",
    "titulo": "Modal Verbs (Advice & Obligation)",
    "subtitulo": "Conselhos, Deveres e Proibições — Should, Must, Have To & Mustn't",
    "cena": {
      "origem": "dialogo",
      "titulo": "Doctor's Consultation",
      "texto": "**Dr. Harris:** Your blood pressure is quite high, Mr. Jenkins. You really must reduce your daily salt intake immediately.\n**Mr. Jenkins:** I understand, Doctor. Do I have to take medication every morning?\n**Dr. Harris:** Yes, you have to take this pill after breakfast. But remember, you mustn't drink alcohol while taking it.\n**Mr. Jenkins:** What about exercise?\n**Dr. Harris:** You should walk at least thirty minutes every day. It's a great habit for your heart."
    },
    "fio": {
      "abertura": "Na vida social e profissional, precisamos orientar pessoas, estabelecer limites e seguir leis. O inglês tem um sistema cirúrgico para modular o peso das obrigações.",
      "descoberta": "Se é uma recomendação amigável ou conselho, usamos «SHOULD» (você deveria). Se é uma obrigação externa imposta por regras ou médicos, usamos «HAVE TO» (tem que). Se é uma ordem moral direta ou lei categórica, usamos «MUST». E atenção ao perigo: «MUSTN'T» é PROIBIÇÃO total, enquanto «DON'T HAVE TO» é apenas ausência de obrigação (você não precisa, mas pode)!",
      "fecho": "Com essa distinção clara, você nunca mais soará grosseiro sem querer nem confundirá uma mera sugestão com uma proibição legal."
    },
    "alerta": "O maior falso amigo lógico do inglês: 'You don't have to go' significa 'Você não precisa ir (é opcional)'. 'You mustn't go' significa 'Você está PROIBIDO de ir'! Confundir os dois pode causar sérios mal-entendidos.",
    "definicao": {
      "fenomeno": "You should sleep more · You must wear a seatbelt · You have to wear a badge · You mustn't smoke · You don't have to pay",
      "causa": "Como o inglês distingue a força de uma obrigação?",
      "conceito": "'Should' expressa recomendação ou conselho subjetivo. 'Must' e 'Have to' expressam obrigação forte (necessidade inevitável ou regra legal). Na forma negativa, eles divergem totalmente: 'Mustn't' expressa proibição estrita, enquanto 'Don't have to' expressa ausência de obrigação (opcionalidade)."
    },
    "inventario": [
      "Usar 'should' e 'shouldn't' para dar conselhos e recomendações gentis",
      "Usar 'must' para ordens categóricas, convicções do falante e regras universais",
      "Usar 'have to' / 'has to' para obrigações impostas por leis, chefes ou circunstâncias externas",
      "Dominar 'mustn't' como proibição estrita e veto (prohibited)",
      "Dominar 'don't have to' / 'doesn't have to' como ação desnecessária mas permitida (optional)"
    ],
    "tabela_visual": "| Modal | Sentido Primário | Exemplo em Inglês | Tradução em Português |\n|---|---|---|---|\n| **Should** | Conselho / Recomendação | You **should see** a dentist. | Você deveria ir ao dentista. |\n| **Must** | Obrigação forte / Dever pessoal | I **must finish** this report today. | Eu tenho que/devo terminar este relatório hoje. |\n| **Have to** | Obrigação externa / Regra | Employees **have to clock in** at 9 AM. | Funcionários têm que bater ponto às 9h. |\n| **Mustn't** | **Proibição absoluta** | You **mustn't park** here. | Você **não pode / está proibido** de estacionar aqui. |\n| **Don't have to** | **Não obrigatório (opcional)** | Tomorrow is Sunday; you **don't have to wake up** early. | Amanhã é domingo; você **não precisa acordar** cedo. |",
    "observacao_cards": [
      {
        "ingles": "You should (/ʃʊd/)",
        "traducao": "Você deveria / É bom que você faça",
        "genero": "Conselho Amigável",
        "motivo": "O 'l' é mudo (/ʃʊd/). Usado para dar conselhos sem soar autoritário."
      },
      {
        "ingles": "You must (/mʌst/)",
        "traducao": "Você deve / É obrigatório",
        "genero": "Dever Forte",
        "motivo": "Modal invariável sem 'to': 'You must show your passport'."
      },
      {
        "ingles": "Have to / Has to",
        "traducao": "Ter que / Ser obrigado por regras",
        "genero": "Obrigação Externa",
        "motivo": "Não é modal puro; flexiona na 3ª pessoa: 'He HAS to wear a uniform'."
      },
      {
        "ingles": "Mustn't (/ˈmʌsnt/)",
        "traducao": "Proibido! / Não pode de forma alguma",
        "genero": "Veto Absoluto",
        "motivo": "O primeiro 't' é mudo (/ˈmʌsnt/). Significa que é contra as regras ou perigoso."
      },
      {
        "ingles": "Don't have to",
        "traducao": "Não precisa (é facultativo)",
        "genero": "Ausência de Obrigação",
        "motivo": "Você tem a liberdade de fazer se quiser: 'Museum entry is free; you don't have to pay'."
      },
      {
        "ingles": "Ought to",
        "traducao": "Deveria (sinônimo formal de should)",
        "genero": "Modal Formal",
        "motivo": "Equivalente mais formal de 'should': 'You ought to apologize'."
      }
    ],
    "tecnica": {
      "passo1": "Identifique a força da mensagem: é um conselho amigo (should), uma regra/ordem (must / have to) ou uma proibição (mustn't)?",
      "passo2": "Se for modal (should/must), nunca use 'to' depois nem '-s' no final (*He must go*, e nunca *He must to go*).",
      "passo3": "Ao negar a obrigação, decida se a ação é proibida (mustn't) ou apenas dispensável/opcional (don't have to)."
    },
    "teoria": "O domínio dos verbos modais é indispensável para expressar atitudes interpessoais com exatidão e tato diplomático.\n\n### 1. Conselho: Should & Shouldn't\n* *You look exhausted; you should take a couple of days off.* (Você parece exausto; deveria tirar folga).\n* *You shouldn't drink so much coffee before bed.* (Não deveria tomar tanto café).\n* Dica: Costuma vir acompanhado de 'I think you should...' para soar mais educado.\n\n### 2. Obrigação no Presente: Must vs Have To\n* **Must:** Frequentemente expressa a vontade interna do falante ou uma regra universal formal:\n  * *I must remember to send flowers to my mother.* (Decisão moral pessoal).\n  * *Passengers must remain seated.* (Regra formal de segurança em aviso público).\n* **Have To:** Expressa regras, leis institucionais ou circunstâncias impostas por terceiros:\n  * *In the UK, drivers have to drive on the left.* (É a lei de trânsito).\n  * *She has to wear glasses for reading.* (Necessidade biológica/médica).\n\n### 3. A Assimetria das Negativas: O Grande Abismo\nEsta é uma das distinções mais vitais de toda a gramática inglesa:\n* **Mustn't = Proibição:** É proibido, ilegal ou perigoso.\n  * *You mustn't touch that wire; it's live!* (Não toque naquele fio; ele está energizado!).\n* **Don't / Doesn't have to = Desnecessidade:** Não é obrigatório; faça se quiser.\n  * *You don't have to come if you feel tired.* (Você não precisa vir se estiver cansado; a decisão é sua).\n\n### 4. O Passado da Obrigação: Had to\n'Must' não possui forma própria no passado! Para dizer 'eu tive que / eu precisei', usa-se exclusivamente **HAD TO**:\n* *I had to stay at work until 9 PM yesterday.* (Eu tive que ficar no trabalho até as 21h).",
    "ponte": "Em português, a frase 'você não tem que fazer isso' é ambígua: pode significar tanto que você está proibido quanto que não é necessário. Em inglês essa ambiguidade NÃO EXISTE. Se alguém diz *'You don't have to do it'*, ela está te dando liberdade total de escolha ('você não precisa fazer'). Se ela quiser proibir você, ela dirá *'You mustn't do that'* ou *'You can't do that'*. Guarde essa diferença para nunca passar vexame!",
    "exemplos_prc": [
      {
        "oracao": "You must silence your mobile phone during the theater performance.",
        "pergunta": "Qual é a natureza do dever de silenciar o celular?",
        "resposta": "É uma exigência formal estrita para todos os espectadores do teatro.",
        "conclusao": "'Must' estabelece a regra categórica de conduta institucional."
      },
      {
        "oracao": "Tomorrow is a national holiday, so we don't have to go to the office.",
        "pergunta": "Ir ao escritório é proibido ou dispensável?",
        "resposta": "É dispensável (não há obrigação), mas nada impede alguém de trabalhar de casa se quiser.",
        "conclusao": "'Don't have to' indica ausência de obrigação ou dispensa de dever."
      },
      {
        "oracao": "You mustn't share your online banking security token with anyone.",
        "pergunta": "O que aconteceria se a pessoa compartilhasse o token?",
        "resposta": "Violaria uma regra de segurança grave; é terminantemente proibido.",
        "conclusao": "'Mustn't' marca proibição de segurança rigorosa."
      },
      {
        "oracao": "If you want to improve your fluency, you should listen to English podcasts daily.",
        "pergunta": "É uma lei ou uma recomendação pedagógica?",
        "resposta": "É uma recomendação benéfica e sugestão prática de estudo.",
        "conclusao": "'Should' expressa o melhor conselho sem imposição."
      }
    ],
    "armadilhas": [
      {
        "errado": "You must to show your ID card. ❌",
        "certo": "You must show your ID card. ✔️",
        "motivo": "'Must' é verbo modal e NUNCA é seguido da preposição 'to'."
      },
      {
        "errado": "He musts work on Saturdays. ❌",
        "certo": "He has to work on Saturdays. / He must work... ✔️",
        "motivo": "Modais nunca recebem a letra '-s' para a terceira pessoa (he/she/it)."
      },
      {
        "errado": "You mustn't pay; the concert is free for students. ❌",
        "certo": "You don't have to pay; the concert is free for students. ✔️",
        "motivo": "Se a entrada é gratuita, pagar não é proibido, é apenas desnecessário! O correto é 'don't have to'."
      },
      {
        "errado": "Yesterday I must go to the dentist. ❌",
        "certo": "Yesterday I had to go to the dentist. ✔️",
        "motivo": "'Must' não tem passado. A obrigação no passado expressa-se sempre com 'had to'."
      }
    ],
    "coda": "Para sugerir com carinho: 'should'; para regras externas: 'have to'; para proibições absolutas: 'mustn't'; e quando não é obrigatório: 'don't have to'!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Qual modal completa o conselho amigável?\n\n\"You have a severe cough; you ___ see a doctor as soon as possible.\"",
        "opcoes": ["should", "mustn't", "have", "would to"],
        "resposta": "should",
        "explicacao": "'Should' é o verbo modal indicado para sugerir e dar conselhos médicos amigáveis."
      },
      {
        "tipo": "escolha",
        "pergunta": "Você vê uma placa em um posto de gasolina: \"Danger: Flammable!\"\n\n\"You ___ smoke in this area.\"",
        "opcoes": ["mustn't", "don't have to", "should", "haven't to"],
        "resposta": "mustn't",
        "explicacao": "Fumar perto de inflamáveis é terminantemente proibido: 'mustn't'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a oração de ausência de obrigação:\n\n\"The museum is free today. You ___ pay any admission fee.\"",
        "opcoes": ["don't have to", "mustn't", "shouldn't", "haven't to"],
        "resposta": "don't have to",
        "explicacao": "Entrada gratuita significa que não é obrigatório pagar: 'don't have to'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase indica uma obrigação no passado (ontem)?",
        "opcoes": [
          "I had to renew my passport yesterday before travelling.",
          "I must renew my passport yesterday before travelling.",
          "I have to renewed my passport yesterday before travelling.",
          "I musted renew my passport yesterday before travelling."
        ],
        "resposta": "I had to renew my passport yesterday before travelling.",
        "explicacao": "'Had to' é a única forma válida para expressar obrigação no tempo passado."
      },
      {
        "tipo": "revelar",
        "pergunta": "Explique a diferença de sentido entre:\n1. *\"You don't have to wear a suit to the dinner.\"*\n2. *\"You mustn't wear shorts to the dinner.\"*",
        "resposta": "A frase 1 significa que usar terno é opcional (não precisa, mas quem quiser pode usar). A frase 2 significa que usar bermuda é estritamente proibido pelo código de vestimenta.",
        "explicacao": "Don't have to = opcional; Mustn't = proibido."
      },
      {
        "tipo": "revelar",
        "pergunta": "Por que a frase *\"He must to study more\"* é um erro clássico?",
        "resposta": "Porque 'must' é um verbo modal puro e exige o verbo seguinte na forma infinitiva sem a preposição 'to' (*He must study*).",
        "explicacao": "Modais não aceitam 'to'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Como se traduz com precisão:\n\n\"Ela tem que acordar às seis da manhã todos os dias de semana.\"",
        "resposta": "\"She has to wake up at six in the morning every weekday.\"",
        "explicacao": "She concorda com 'has to' para regras/obrigações diárias."
      },
      {
        "tipo": "revelar",
        "pergunta": "Qual é a pronúncia correta de *'should'* e *'mustn't'*?",
        "resposta": "'Should' pronuncia-se /ʃʊd/ (com o 'L' completamente mudo). 'Mustn't' pronuncia-se /ˈmʌsnt/ (com o primeiro 'T' totalmente mudo).",
        "explicacao": "Letras mudas: o 'L' em should e o 'T' em mustn't."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o modal para dar o seguinte conselho:\n\n\"It's raining heavily; you ___ take an umbrella with you.\"",
        "resposta": "should",
        "explicacao": "'Should' é o modal de conselho e recomendação."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com o modal negativo de proibição:\n\n\"Drivers ___ exceed the speed limit in front of schools.\"",
        "resposta": "mustn't",
        "explicacao": "Mustn't expressa veto e proibição legal estrita."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com 'has to' ou 'have to':\n\n\"Peter ___ wear a protective helmet on the construction site.\"",
        "resposta": "has to",
        "explicacao": "Peter (3ª pessoa singular) exige 'has to'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma negativa correta de 'have to' para o sujeito 'we':\n\n\"We ___ finish this task today; the deadline is next week.\" (não precisamos)",
        "resposta": "don't have to",
        "explicacao": "Don't have to indica ausência de obrigação."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON A2.12: Infinitive of Purpose
  // ─────────────────────────────────────────────────────────────
  "a2-lez12": {
    "id": "a2-lez12",
    "num": "Lesson 12",
    "titulo": "Infinitive of Purpose",
    "subtitulo": "Expressando o 'Para Que' das Ações — To + Verbo vs In Order To",
    "cena": {
      "origem": "dialogo",
      "titulo": "Preparing for an International Journey",
      "texto": "**Gabriel:** Why are you studying so hard late at night, Olivia?\n**Olivia:** I'm revising the technical vocabulary to pass the Cambridge English exam next month.\n**Gabriel:** Ah, and why did you go to the bank this afternoon?\n**Olivia:** I went there to exchange some currency in order to pay for our hotel in London."
    },
    "fio": {
      "abertura": "Por que você estuda inglês? Por que as pessoas vão à academia? Por que acordamos cedo? Todas as nossas ações têm uma finalidade, um objetivo.",
      "descoberta": "Em inglês, a maneira mais elegante e natural de responder ao 'por quê' de uma ação é simplesmente usar a preposição «TO» seguida do verbo no infinitivo: *'I study to learn'*. Parece simples demais, mas esse é exatamente o ponto onde a maioria dos brasileiros tropeça feio ao inventar fórmulas como *'for to learn'* ou *'for learn'*!",
      "fecho": "Ao gravar o 'TO + Verbo' para expressar propósito, você elimina um dos vícios de fala mais estigmatizados do inglês brasileiro."
    },
    "alerta": "Alerta vermelho de interferência: NUNCA diga *'I came here for study'* ou *'I came for to study'*. A finalidade de uma ação SEMPRE se expressa com 'TO + Verbo' (*I came here to study*). A preposição 'for' é usada apenas antes de substantivos (*for dinner, for a meeting*).",
    "definicao": {
      "fenomeno": "I went to the store to buy milk · She called me to ask a question · He exercises to stay fit",
      "causa": "Como o inglês conecta uma ação principal ao seu propósito ou meta?",
      "conceito": "O 'Infinitive of Purpose' utiliza a partícula 'to' seguida do verbo no infinitivo base para responder à pergunta 'Why?' (Por quê?). Em registros formais ou escritos, pode ser expandido para 'in order to' ou 'so as to'."
    },
    "inventario": [
      "Usar 'to + verbo base' para justificar a finalidade de qualquer ação",
      "Evitar categoricamente o erro brasileiro *for + verbo* para expressar objetivo",
      "Diferenciar o uso de 'to + verbo' (ação) vs 'for + substantivo' (objeto/evento)",
      "Empregar 'in order to' e 'so as to' em contextos formais ou acadêmicos",
      "Formular o propósito negativo formal: 'in order not to' / 'so as not to'"
    ],
    "tabela_visual": "| Estrutura | Quando Usar | Exemplo Correto | O Que NUNCA Dizer |\n|---|---|---|---|\n| **to + Verbo** | Finalidade com ação (verbo) | I went there **to help** him. | *...for help him* ❌ / *...for to help* ❌ |\n| **for + Substantivo** | Finalidade com coisa ou evento | I went there **for a meeting**. | *...to a meeting* (com sentido de finalidade) |\n| **in order to + Verbo** | Finalidade formal / escrita | He wore a disguise **in order to avoid** press. | *...in order for avoid* ❌ |\n| **in order not to + Verbo** | Finalidade negativa (para não...) | She set two alarms **in order not to be** late. | *...to not be late* (coloquial) |",
    "observacao_cards": [
      {
        "ingles": "To buy / To learn",
        "traducao": "Para comprar / Para aprender",
        "genero": "Propósito Infinitivo Básico",
        "motivo": "Responde diretamente a 'Why did you go?': 'I went to the bakery to buy bread'."
      },
      {
        "ingles": "For a coffee / For lunch",
        "traducao": "Para um café / Para o almoço",
        "genero": "For + Substantivo",
        "motivo": "'For' combina-se perfeitamente com substantivos: 'Let's meet for lunch'."
      },
      {
        "ingles": "In order to (+ verbo)",
        "traducao": "A fim de / Com o intuito de",
        "genero": "Propósito Formal",
        "motivo": "Variante enfática muito valorizada em redações e relatórios empresariais."
      },
      {
        "ingles": "In order not to (+ verbo)",
        "traducao": "A fim de não / Para não...",
        "genero": "Propósito Negativo",
        "motivo": "Posicionamento correto do 'not': 'He whispered in order not to wake the baby'."
      },
      {
        "ingles": "So that (+ sujeito + can/could)",
        "traducao": "De modo que / Para que...",
        "genero": "Oração com Sujeito Próprio",
        "motivo": "Usado quando quem faz a ação A é diferente de quem faz a ação B: 'I gave him a key so that he could enter'."
      },
      {
        "ingles": "What did you do that for?",
        "traducao": "Para que você fez isso? / Por qual motivo?",
        "genero": "Pergunta Coloquial",
        "motivo": "Expressão idiomática oral que coloca 'for' no final para indagar a finalidade."
      }
    ],
    "tecnica": {
      "passo1": "Faça a si mesmo a pergunta: 'Por que a pessoa fez isso?'",
      "passo2": "Se a resposta envolver uma AÇÃO (um verbo), utilize obrigatoriamente 'TO + Verbo Base' (*to see, to buy, to understand*).",
      "passo3": "Se a resposta envolver um OBJETO ou EVENTO (um substantivo), utilize 'FOR + Substantivo' (*for an interview, for dinner*)."
    },
    "teoria": "A expressão de objetivo e finalidade é uma das áreas mais elegantes da sintaxe inglesa pela sua extraordinária economia de palavras.\n\n### 1. A Simplicidade do 'To-Infinitive'\nEnquanto muitas línguas exigem conectivos como 'a fim de que' ou 'com o objetivo de', o inglês moderno resolve 90% das situações com a partícula 'to':\n* *I turned on the air conditioner to cool down the room.* (Liguei o ar-condicionado para resfriar a sala).\n* *She went online to check the stock prices.* (Ela entrou na internet para conferir os preços das ações).\n\n### 2. A Comparação Decisiva: TO vs FOR\n* **TO + VERBO:** *I sat down to rest.* (Sentei-me para descansar).\n* **FOR + SUBSTANTIVO:** *I sat down for a rest.* (Sentei-me para um descanso).\n* **FOR + ING:** Só é usado para descrever a função ou propósito permanente de um OBJETO/FERRAMENTA, e NÃO a intenção deliberada de uma pessoa numa ação específica:\n  * *This knife is used for cutting bread.* (A função desta faca é cortar pão).\n  * Mas: *I took the knife to slice the bread.* (Eu peguei a faca para cortar o pão).\n\n### 3. Propósito Formal: In Order To / So As To\nEm correspondência de negócios, ensaios acadêmicos e discursos formais, usamos 'in order to' para dar clareza e peso argumentativo:\n* *The government reduced taxes in order to stimulate consumer spending.*\n* A negação requer atenção especial: coloca-se 'not' ANTES do 'to':\n  * *We left early in order not to miss the flight.* (Saímos cedo para não perder o voo).",
    "ponte": "Em português, a palavra 'para' serve para tudo: 'para comprar' (para + verbo) e 'para o almoço' (para + substantivo). Isso cria uma armadilha fatal: os brasileiros traduzem 'para' literalmente como 'for' e acabam dizendo *'I went to the supermarket for buy food'*. Essa frase dói no ouvido de qualquer anglófono nativo! Lembre-se: antes de VERBO, o 'para' do inglês é sempre **TO**!",
    "exemplos_prc": [
      {
        "oracao": "Lucas turned down the volume to concentrate on his thesis.",
        "pergunta": "Qual foi a finalidade de Lucas abaixar o volume?",
        "resposta": "Concentrar-se em sua tese ('to concentrate').",
        "conclusao": "A finalidade imediata de uma ação verbal é expressa por 'to + verbo'."
      },
      {
        "oracao": "They stopped at a roadside diner for lunch.",
        "pergunta": "Por que foi usado 'for' e não 'to' nesta frase?",
        "resposta": "Porque 'lunch' é um substantivo (o almoço), e não um verbo no infinitivo.",
        "conclusao": "Diante de substantivos, a preposição de propósito é 'for'."
      },
      {
        "oracao": "She took a taxi in order not to arrive late for the interview.",
        "pergunta": "Como foi construído o propósito negativo na frase formal?",
        "resposta": "Usou-se a fórmula 'in order not to' seguida do verbo base 'arrive'.",
        "conclusao": "A finalidade negativa formal posiciona o 'not' antes de 'to'."
      },
      {
        "oracao": "I opened the window to let some fresh air into the room.",
        "pergunta": "Qual erro típico brasileiro o falante evitou aqui?",
        "resposta": "Evitou dizer *for let* ou *for to let*.",
        "conclusao": "'To let' é a única forma gramaticalmente pura para expressar a meta."
      }
    ],
    "armadilhas": [
      {
        "errado": "I went to London for improve my English. ❌",
        "certo": "I went to London to improve my English. ✔️",
        "motivo": "Nunca use 'for + verbo base'. A finalidade de uma ação exige 'to + verbo'."
      },
      {
        "errado": "She called me for to ask for help. ❌",
        "certo": "She called me to ask for help. ✔️",
        "motivo": "'For to' é um arcaísmo obsoleto e soa como erro gravíssimo no inglês moderno."
      },
      {
        "errado": "I woke up early for not be late. ❌",
        "certo": "I woke up early in order not to be late. / ...so as not to be late. ✔️",
        "motivo": "Propósito negativo não admite 'for not be'; exige 'in order not to' ou 'so as not to'."
      },
      {
        "errado": "We went to the restaurant to a meal. ❌",
        "certo": "We went to the restaurant for a meal. ✔️",
        "motivo": "Antes do substantivo 'a meal' usa-se 'for' (e não 'to')."
      }
    ],
    "coda": "Para explicar o porquê de uma ação: antes de verbo, use 'TO'; antes de substantivo, use 'FOR'!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a oração com a opção correta de propósito:\n\n\"He bought a bouquet of flowers ___ surprise his wife on her birthday.\"",
        "opcoes": ["to", "for", "for to", "in order for"],
        "resposta": "to",
        "explicacao": "Surprise é um verbo, portanto a finalidade exige 'to + verbo base'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a frase: \"They met at the cafe ___ a quick discussion.\"",
        "opcoes": ["for", "to", "in order to", "for to"],
        "resposta": "for",
        "explicacao": "'A quick discussion' é um substantivo, logo a preposição correta é 'for'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual das frases a seguir expressa propósito negativo formal com precisão?",
        "opcoes": [
          "He walked quietly in order not to wake the sleeping child.",
          "He walked quietly for not wake the sleeping child.",
          "He walked quietly in order to not waking the sleeping child.",
          "He walked quietly for to not wake the sleeping child."
        ],
        "resposta": "He walked quietly in order not to wake the sleeping child.",
        "explicacao": "'In order not to + verbo base' é a estrutura formal impecável de finalidade negativa."
      },
      {
        "tipo": "escolha",
        "pergunta": "Escolha a frase gramaticalmente correta em inglês padrão:",
        "opcoes": [
          "I am saving money to travel around South America.",
          "I am saving money for travel around South America.",
          "I am saving money for to travel around South America.",
          "I am saving money to travelling around South America."
        ],
        "resposta": "I am saving money to travel around South America.",
        "explicacao": "'To travel' é o infinitivo de propósito correto."
      },
      {
        "tipo": "revelar",
        "pergunta": "Por que é errado dizer *\"I came to Brazil for learn Portuguese\"*?",
        "resposta": "Porque a preposição 'for' não se combina com verbos no infinitivo base para indicar a intenção de uma pessoa; o correto é usar o infinitivo de propósito: *\"I came to Brazil to learn Portuguese\"*.",
        "explicacao": "'To + verbo' é a fórmula universal do infinitivo de propósito."
      },
      {
        "tipo": "revelar",
        "pergunta": "Qual é a diferença entre:\n1. *\"I went out to get fresh air.\"*\n2. *\"I went out for fresh air.\"*",
        "resposta": "Ambas estão certas! A frase 1 usa 'to + verbo' (to get), enquanto a frase 2 usa 'for + substantivo' (for fresh air). Ambas expressam o mesmo propósito com sintaxes diferentes.",
        "explicacao": "To + verbo vs For + substantivo."
      },
      {
        "tipo": "revelar",
        "pergunta": "Como se traduz com precisão para o inglês formal:\n\n\"Eles fecharam as portas a fim de manter o calor dentro de casa.\"",
        "resposta": "\"They closed the doors in order to keep the heat inside the house.\"",
        "explicacao": "'In order to keep' é a forma de propósito formal."
      },
      {
        "tipo": "revelar",
        "pergunta": "Quando é correto usar *'for + verbo com -ing'* em inglês?",
        "resposta": "Quando descrevemos a função habitual ou o propósito de um objeto inanimado ou instrumento: *\"A thermometer is an instrument used for measuring temperature.\"*",
        "explicacao": "'For + -ing' descreve função/utilidade de ferramentas."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a partícula de propósito que completa a frase:\n\n\"She logged in to her computer ___ check her unread messages.\"",
        "resposta": "to",
        "explicacao": "'To' introduz o verbo base 'check' como propósito."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com 'for' ou 'to':\n\n\"We reserved a table at the Italian bistro ___ dinner.\"",
        "resposta": "for",
        "explicacao": "'Dinner' é um substantivo, exigindo 'for'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a locução formal que significa 'a fim de':\n\n\"The company launched the campaign in ___ to attract new investors.\"",
        "resposta": "order to",
        "explicacao": "'In order to' completa a locução de propósito."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que falta para a negação de propósito:\n\n\"She set three alarms in order ___ to be late for her flight.\"",
        "resposta": "not",
        "explicacao": "'In order not to' é o padrão de propósito negativo."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON A2.13: Present Perfect (Intro)
  // ─────────────────────────────────────────────────────────────
  "a2-lez13": {
    "id": "a2-lez13",
    "num": "Lesson 13",
    "titulo": "Present Perfect (Intro)",
    "subtitulo": "A Ponte Entre Passado e Presente — Have/Has + Past Participle",
    "cena": {
      "origem": "dialogo",
      "titulo": "Job Interview Experience",
      "texto": "**Interviewer:** Welcome, Alex. Have you ever worked in a multinational corporation before?\n**Alex:** Yes, I have worked with international software teams in three different countries.\n**Interviewer:** Impressive! Have you ever led a major product launch?\n**Alex:** No, I haven't managed a launch as lead coordinator yet, but I have contributed to several successful agile releases."
    },
    "fio": {
      "abertura": "Chegamos ao tempo verbal mais famoso, temido e fascinante da língua inglesa: o Present Perfect. Por que ele existe e por que não temos um equivalente idêntico em português?",
      "descoberta": "Porque para o falante de inglês, o que aconteceu no passado não é apenas uma data morta num calendário: se o fato ainda é relevante AGORA, se define quem você é hoje ou se conecta com a sua vida presente, o inglês cria uma ponte mágica com «HAVE / HAS + Particípio Passado»!",
      "fecho": "Ao entender essa ponte com o presente, você nunca mais terá medo do Present Perfect e começará a pensar como um nativo de verdade."
    },
    "alerta": "A regra de ouro que destrói 90% das dúvidas: se você mencionar uma data ou momento específico no passado (como 'yesterday', 'last night', 'in 2020', 'two days ago'), você NUNCA pode usar o Present Perfect! Tempo fechado exige Past Simple!",
    "definicao": {
      "fenomeno": "I have lost my keys · She has visited London · Have you ever eaten sushi? · We have lived here for five years",
      "causa": "O que define a essência do Present Perfect?",
      "conceito": "O Present Perfect (Have/Has + Past Participle) conecta um evento ou experiência do passado com o momento presente. Ele não se importa com 'quando' o fato aconteceu, mas sim com o 'fato em si' e suas consequências visíveis ou relevância no agora."
    },
    "inventario": [
      "Conjugar o auxiliar HAVE (I, you, we, they) e HAS (he, she, it)",
      "Reconhecer o Past Participle regular (verbo + -ed) e os principais irregulares (seen, been, done, eaten, lost)",
      "Formar frases de experiência de vida usando 'ever' (em perguntas) e 'never' (em negativas)",
      "Expressar uma ação recente com impacto imediato no presente (I've lost my keys = I don't have them now)",
      "Compreender por que expressões com tempo definido (yesterday, in 2018) são proibidas com Present Perfect"
    ],
    "tabela_visual": "| Sujeito | Auxiliar | Particípio Passado | Exemplo Completo | Significado Concreto |\n|---|---|---|---|---|\n| **I / You / We / They** | **have ('ve)** | **visited** | I**'ve visited** Rome twice. | Tenho a experiência de ter visitado Roma. |\n| **He / She / It** | **has ('s)** | **lost** | She**'s lost** her phone. | Ela perdeu o celular (e continua sem ele agora). |\n| **Interrogativa** | **Have/Has** | ... ? | **Have** you **ever seen** a whale? | Você já viu uma baleia na vida? |\n| **Negativa** | **haven't / hasn't** | ... | We **haven't finished** yet. | Ainda não terminamos até o presente momento. |",
    "observacao_cards": [
      {
        "ingles": "I have lost my keys",
        "traducao": "Perdi minhas chaves (e estou sem elas agora)",
        "genero": "Resultado no Presente",
        "motivo": "O foco não é a hora em que caíram, mas o fato de que agora estou trancado do lado de fora."
      },
      {
        "ingles": "Have you ever...?",
        "traducao": "Você já... na sua vida?",
        "genero": "Pergunta de Experiência",
        "motivo": "'Ever' significa 'em algum momento da sua vida até o dia de hoje'."
      },
      {
        "ingles": "I have never seen",
        "traducao": "Eu nunca vi (na minha vida)",
        "genero": "Experiência Negativa",
        "motivo": "'Never' já carrega a negação; o verbo fica na afirmativa: 'I have never tried caviar'."
      },
      {
        "ingles": "She has been to Italy",
        "traducao": "Ela já esteve na Itália (e já voltou)",
        "genero": "Been to vs Gone to",
        "motivo": "'Been to' significa que ela visitou e retornou; 'Gone to' significa que ela foi e ainda está lá."
      },
      {
        "ingles": "Contração: I've / She's",
        "traducao": "Eu... / Ela...",
        "genero": "Oralidade Fluida",
        "motivo": "Nativos quase sempre contraem: I've seen, he's arrived, they've gone."
      },
      {
        "ingles": "Tempo Aberto vs Fechado",
        "traducao": "Princípio Essencial",
        "genero": "Filtro Lógico",
        "motivo": "This morning (se ainda for de manhã) = Present Perfect. Yesterday = Past Simple."
      }
    ],
    "tecnica": {
      "passo1": "Escolha o auxiliar pelo sujeito: I/You/We/They usam 'have'; He/She/It usam 'has'.",
      "passo2": "Traga a 3ª coluna dos verbos (o Past Participle): regulares ganham '-ed' (*worked, lived*); irregulares usam a forma de particípio (*seen, done, gone, eaten*).",
      "passo3": "Faça o teste do tempo: tem 'yesterday', 'ago' ou 'in 1999'? Se tiver, ABANDONE o Present Perfect e use Past Simple!"
    },
    "teoria": "O Present Perfect é o tempo verbal da 'relevância presente'. Ele não é passado e não é presente: ele é o cordão umbilical que une os dois mundos.\n\n### 1. Os Dois Grandes Pilares de Introdução ao Present Perfect\n1. **Experiências de Vida (Life Experience):**\n   * O período de tempo considerado é toda a sua vida até este exato segundo. O tempo não acabou porque você continua vivo!\n   * *Have you ever jumped with a parachute?* (Alguma vez na vida você pulou de paraquedas?).\n   * *I have never eaten insects.* (Nunca comi insetos em toda a minha existência).\n2. **Ação Passada com Resultado no Presente (Past Action with Present Result):**\n   * Algo aconteceu há pouco ou muito tempo, mas o seu efeito material é palpável agora:\n   * *Tom has broken his arm.* (O braço dele está engessado hoje).\n   * *I've bought a new car.* (O carro novo está na minha garagem agora; venha ver!).\n\n### 2. A Crucial Diferença: Been to vs Gone to\n* **She has been to Paris:** Ela foi a Paris, passeou na Torre Eiffel e JÁ RETORNOU para casa. A viagem virou bagagem cultural e memória.\n* **She has gone to Paris:** Ela viajou para Paris e AINDA ESTÁ LÁ (ou a caminho). Se você for à casa dela hoje, a casa estará vazia!\n\n### 3. A Terceira Coluna dos Verbos (Particípio Passado)\nPara dominar o Present Perfect, você precisa internalizar a terceira forma dos verbos irregulares:\n* *Go -> Went -> Gone*\n* *See -> Saw -> Seen*\n* *Write -> Wrote -> Written*\n* *Take -> Took -> Taken*\n* *Do -> Did -> Done*",
    "ponte": "Em português, nós dizemos simplesmente: 'Você já viajou de avião?' ou 'Eu perdi minhas chaves'. Usamos o mesmo pretérito perfeito simples tanto para fatos datados ('Ontem perdi minhas chaves') quanto para fatos sem data que afetam o presente ('Perdi minhas chaves, me ajuda a procurar?'). Em inglês isso é proibido! Se você disser *'Yesterday I have lost'* ou *'I lost my keys (sem data e querendo ajuda agora)'*, você soará impreciso. Treine o ouvido: sem data específica + efeito no agora = **HAVE + Particípio**!",
    "exemplos_prc": [
      {
        "oracao": "Have you ever ridden a camel in the desert?",
        "pergunta": "Qual é o tempo de referência dessa pergunta?",
        "resposta": "Toda a vida da pessoa, desde o nascimento até o momento presente.",
        "conclusao": "'Have you ever + particípio' investiga experiências acumuladas na vida."
      },
      {
        "oracao": "He has lost his wallet, so he cannot pay for the subway ticket.",
        "pergunta": "Por que a perda da carteira está no Present Perfect?",
        "resposta": "Porque a consequência direta e imediata é sentida agora: ele está na catraca sem dinheiro.",
        "conclusao": "Ação passada com resultado concreto e presente exige Present Perfect."
      },
      {
        "oracao": "Sarah has been to Japan three times.",
        "pergunta": "Sarah está no Japão neste momento?",
        "resposta": "Não; 'has been to' significa que ela viajou para o Japão e já retornou.",
        "conclusao": "'Been to' denota visitas com retorno completado."
      },
      {
        "oracao": "I have never seen such a magnificent sunset.",
        "pergunta": "Como foi construída a negação de experiência?",
        "resposta": "Usou-se o advérbio 'never' entre o auxiliar 'have' e o particípio 'seen'.",
        "conclusao": "'Never' com Present Perfect expressa inexperiência total até o momento."
      }
    ],
    "armadilhas": [
      {
        "errado": "I have seen that movie yesterday. ❌",
        "certo": "I saw that movie yesterday. ✔️",
        "motivo": "'Yesterday' é um ponto de tempo finalizado no passado. NUNCA use Present Perfect com marcadores de tempo específico fechado."
      },
      {
        "errado": "Did you ever eat sushi? ⚠️ (coloquial americano, mas impreciso gramaticalmente)",
        "certo": "Have you ever eaten sushi? ✔️",
        "motivo": "Para experiências de vida até o presente, a fórmula gramatical internacional canônica é 'Have you ever + particípio'."
      },
      {
        "errado": "She has went to the supermarket. ❌",
        "certo": "She has gone to the supermarket. ✔️",
        "motivo": "'Went' é a 2ª coluna (Past Simple). O Present Perfect exige a 3ª coluna (Past Participle: gone)."
      },
      {
        "errado": "I have lived in Brazil since 10 years. ❌",
        "certo": "I have lived in Brazil for 10 years. ✔️",
        "motivo": "Duração de tempo exige 'for' (por 10 anos). 'Since' é usado apenas com pontos de partida (since 2014)."
      }
    ],
    "coda": "Se não tem data fechada no calendário e a consequência respira no presente: conecte os mundos com 'HAVE + Particípio'!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com a estrutura clássica de pergunta sobre experiência de vida:\n\n\"___ you ever ___ a famous actor in person?\"",
        "opcoes": ["Have / met", "Did / meet", "Have / meet", "Were / meeting"],
        "resposta": "Have / met",
        "explicacao": "Have + sujeito + ever + particípio passado (met, de meet)."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o particípio correto:\n\n\"Oh no! Someone has ___ my favorite coffee mug!\"",
        "opcoes": ["broken", "broke", "break", "breaked"],
        "resposta": "broken",
        "explicacao": "O particípio passado de 'break' é 'broken'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Onde está Anna agora se a frase for: \"Anna has gone to Madrid\"?",
        "opcoes": [
          "Ela viajou para Madri e ainda está lá (ou a caminho).",
          "Ela visitou Madri e já voltou para sua casa.",
          "Ela planeja ir a Madri na semana que vem.",
          "Ela nunca esteve em Madri na vida."
        ],
        "resposta": "Ela viajou para Madri e ainda está lá (ou a caminho).",
        "explicacao": "'Gone to' indica que a pessoa viajou e ainda não retornou."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual das frases a seguir contém um erro grave de gramática?",
        "opcoes": [
          "I have visited the Louvre Museum last summer.",
          "I have visited the Louvre Museum twice in my life.",
          "I visited the Louvre Museum last summer.",
          "Have you ever visited the Louvre Museum?"
        ],
        "resposta": "I have visited the Louvre Museum last summer.",
        "explicacao": "O marcador temporal finalizado 'last summer' proíbe o Present Perfect."
      },
      {
        "tipo": "revelar",
        "pergunta": "Por que dizemos *\"I have cut my finger!\"* quando vemos sangue escorrendo agora, mas dizemos *\"I cut my finger in 2015\"*?",
        "resposta": "Porque com sangue escorrendo no presente, a ação passada tem um resultado direto, visível e urgente no AGORA (Present Perfect). Em 2015, o corte é apenas um fato histórico encerrado e datado no passado (Past Simple).",
        "explicacao": "Resultado presente vs fato histórico datado."
      },
      {
        "tipo": "revelar",
        "pergunta": "Quais são as três formas dos verbos: BE, SEE e DO?",
        "resposta": "Be -> Was/Were -> BEEN; See -> Saw -> SEEN; Do -> Did -> DONE. (O Present Perfect utiliza sempre a terceira forma: been, seen, done).",
        "explicacao": "Infinitivo, Past Simple e Past Participle."
      },
      {
        "tipo": "revelar",
        "pergunta": "Como se diz em inglês: \"Eu nunca estive em Nova York na minha vida\"?",
        "resposta": "\"I have never been to New York in my life.\"",
        "explicacao": "'Have never been to' expressa a ausência da experiência de ter visitado o local."
      },
      {
        "tipo": "revelar",
        "pergunta": "Qual é a contração natural falada de *\"She has arrived\"* e como não confundi-la com *\"She is\"*?",
        "resposta": "A contração é *\"She's arrived\"*. Você sabe que é 'has' e não 'is' porque é imediatamente seguido de um verbo no particípio passado (*arrived*).",
        "explicacao": "She's + particípio = She has."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com o verbo auxiliar para 'he':\n\n\"Liam ___ lost his passport and cannot board the plane.\"",
        "resposta": "has",
        "explicacao": "Liam (he) exige o auxiliar 'has'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma do particípio passado de 'see':\n\n\"I have never ___ such an incredible solar eclipse.\"",
        "resposta": "seen",
        "explicacao": "Seen é a 3ª forma (past participle) de see."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que significa 'alguma vez na vida' em perguntas:\n\n\"Have you ___ driven an electric car?\"",
        "resposta": "ever",
        "explicacao": "'Ever' expressa 'alguma vez na vida até agora'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com o particípio passado de 'eat':\n\n\"We have already ___ dinner, so we are not hungry.\"",
        "resposta": "eaten",
        "explicacao": "Eaten é o particípio passado de eat."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON A2.14: Present Perfect (Just, Already, Yet)
  // ─────────────────────────────────────────────────────────────
  "a2-lez14": {
    "id": "a2-lez14",
    "num": "Lesson 14",
    "titulo": "Present Perfect (Just, Already, Yet)",
    "subtitulo": "Marcadores Temporais Chave — Just, Already e Yet em Ação",
    "cena": {
      "origem": "dialogo",
      "titulo": "Morning in the Office",
      "texto": "**Manager:** Good morning, Diana. Have you sent the quarterly budget to the directors yet?\n**Diana:** Yes, I have already emailed them the complete spreadsheet with the projections.\n**Manager:** Fantastic! And what about the client feedback summary?\n**Diana:** I have just finished typing the final paragraph two seconds ago. Here is the printed copy!"
    },
    "fio": {
      "abertura": "O Present Perfect ganha vida de verdade quando você adiciona seus três fiéis escudeiros temporais: JUST, ALREADY e YET.",
      "descoberta": "Cada um deles tem uma personalidade e uma posição geográfica exata na frase! «JUST» é o frescor imediato (acabou de acontecer há segundos). «ALREADY» é a antecipação vitoriosa (já aconteceu antes do que você esperava). E «YET» é a expectativa (ainda não aconteceu em negativas, ou 'já' em perguntas), posicionado solenemente no FINAL da frase!",
      "fecho": "Com esses três advérbios na ponta da língua, suas conversas de trabalho e do dia a dia fluirão com a naturalidade de um profissional experiente."
    },
    "alerta": "A posição de 'YET': 'Yet' vai SEMPRE no final da frase (*Have you finished yet? / I haven't finished yet*). NUNCA coloque 'yet' no meio como se faz com 'already' (*I not yet finished* ❌)!",
    "definicao": {
      "fenomeno": "I have just arrived · She has already left · Have you eaten yet? · We haven't paid the bill yet",
      "causa": "Como os advérbios temporais modulam a perspectiva do Present Perfect?",
      "conceito": "'Just' indica que a ação foi concluída há instantes. 'Already' expressa que a ação ocorreu antes do esperado ou mais cedo do que o previsto (usado no meio da oração afirmativa). 'Yet' indica expectativa: em perguntas pergunta se o fato esperado já ocorreu, e em negativas afirma que o fato ainda não ocorreu (sempre posicionado no fim)."
    },
    "inventario": [
      "Posicionar 'JUST' entre o auxiliar have/has e o particípio (I have just arrived)",
      "Posicionar 'ALREADY' em orações afirmativas para expressar 'já aconteceu mais cedo que o esperado'",
      "Posicionar 'YET' no final de perguntas significando 'já?'",
      "Posicionar 'YET' no final de frases negativas significando 'ainda não'",
      "Reconhecer que 'just' elimina a necessidade da locução 'acabei de...' do português"
    ],
    "tabela_visual": "| Advérbio | Significado Central | Posição na Frase | Tipo de Frase | Exemplo Prático |\n|---|---|---|---|---|\n| **JUST** | Acabou de acontecer (segundos atrás) | Entre have/has e particípio | Afirmativa | I've **just received** your text. |\n| **ALREADY** | Já aconteceu (antes do previsto) | Entre have/has e particípio | Afirmativa / Pergunta surpresa | She has **already booked** the tickets. |\n| **YET** | Ainda não (expectativa não cumprida) | **No final da frase** | Negativa | We haven't signed the contract **yet**. |\n| **YET** | Já? (perguntando por algo esperado) | **No final da frase** | Interrogativa | Have you had lunch **yet**? |",
    "observacao_cards": [
      {
        "ingles": "I have just finished",
        "traducao": "Acabei de terminar",
        "genero": "Just (Frescor Imediato)",
        "motivo": "Fica no meio da estrutura: have + just + particípio. Equivale ao nosso 'acabar de'."
      },
      {
        "ingles": "I have already seen that",
        "traducao": "Eu já vi isso (antes)",
        "genero": "Already (Antecipação)",
        "motivo": "Usado para mostrar que uma tarefa já está resolvida ou que o fato é conhecido."
      },
      {
        "ingles": "Haven't finished yet",
        "traducao": "Ainda não terminou",
        "genero": "Yet em Negação",
        "motivo": "'Yet' no final da oração negativa expressa que a ação é esperada para breve."
      },
      {
        "ingles": "Have you heard the news yet?",
        "traducao": "Você já soube das notícias?",
        "genero": "Yet em Pergunta",
        "motivo": "Em interrogativas, 'yet' equivale ao 'já' do português e fica no fim."
      },
      {
        "ingles": "Have you already finished?!",
        "traducao": "Você JÁ terminou?! (tão rápido?)",
        "genero": "Already Surpreso",
        "motivo": "Quando usado em perguntas, expressa surpresa com a velocidade da conclusão."
      },
      {
        "ingles": "Still haven't",
        "traducao": "Ainda não (com ênfase de demora)",
        "genero": "Variante com Still",
        "motivo": "'Still' fica antes do auxiliar: 'I still haven't received the confirmation email'."
      }
    ],
    "tecnica": {
      "passo1": "Se a ação acabou de acontecer há poucos instantes, coloque 'JUST' entre have/has e o particípio: *I have just washed the dishes*.",
      "passo2": "Se a ação já foi feita antes da hora em frase afirmativa, coloque 'ALREADY' no mesmo local: *She has already completed the report*.",
      "passo3": "Se for uma pergunta ou negação de algo que você espera que aconteça, jogue 'YET' lá no finalzinho da frase: *Haven't done it YET* / *Have you done it YET?*."
    },
    "teoria": "A tríade Just, Already e Yet representa o núcleo da gestão temporal na conversação prática em língua inglesa.\n\n### 1. JUST: A Tradução Perfeita de 'Acabar de'\nEm português dizemos 'Eu acabei de comer', 'Ela acabou de sair'. Em inglês não existe o verbo 'acabar' usado desse modo. Usa-se o Present Perfect com 'JUST':\n* *The plane has just landed.* (O avião acabou de pousar).\n* *I've just heard the great news!* (Acabei de ouvir as ótimas notícias!).\n\n### 2. ALREADY: A Ação Antecipada\n'Already' enfatiza que o evento aconteceu mais cedo do que o ouvinte pensava:\n* *A: Don't forget to pay the electricity bill. B: I've already paid it!* (Não se esqueça de pagar a conta de luz. / Eu já paguei!).\n* Posição clássica: Entre o auxiliar have/has e o particípio principal.\n* Em perguntas de espanto: *Are you leaving already?!* (Você já vai embora tão cedo?!).\n\n### 3. YET: A Expectativa em Suspenso\n'Yet' é carregado de expectativa futura: o falante espera que aquilo ocorra:\n* **Em perguntas:** *Has the postman arrived yet?* (O carteiro já chegou? [Estamos esperando a correspondência]).\n* **Em negativas:** *The postman hasn't arrived yet.* (O carteiro ainda não chegou [mas deve chegar a qualquer momento]).\n* Posição obrigatória: No final da oração.",
    "ponte": "Em português, a palavra 'já' é usada para tudo: 'Eu JÁ fiz' (already), 'Você JÁ comeu?' (yet), 'JÁ acabou de acontecer' (just). O cérebro do brasileiro quer usar a palavra 'already' em todas essas frases e colocá-la em qualquer lugar. Em inglês, essa distinção é rígida: afirmativa no meio = **already**; pergunta no fim = **yet**; ação de segundos atrás = **just**. Não confunda!",
    "exemplos_prc": [
      {
        "oracao": "Be careful walking into the living room; I have just mopped the floor.",
        "pergunta": "Qual é o estado do chão neste momento?",
        "resposta": "O chão está completamente molhado porque foi lavado há segundos atrás ('just mopped').",
        "conclusao": "'Just' indica uma ação concluída instantes antes com efeito direto."
      },
      {
        "oracao": "Would you like some dessert? No thanks, I have already eaten enough.",
        "pergunta": "Por que o convidado recusa a sobremesa?",
        "resposta": "Porque ele já comeu o suficiente anteriormente e está satisfeito ('already eaten').",
        "conclusao": "'Already' demonstra que a necessidade já foi resolvida com antecedência."
      },
      {
        "oracao": "Have you spoken to the human resources manager yet?",
        "pergunta": "O que o falante espera com o uso de 'yet'?",
        "resposta": "Espera saber se a conversa esperada já aconteceu até este instante.",
        "conclusao": "'Yet' no fim da pergunta indaga o cumprimento de uma expectativa."
      },
      {
        "oracao": "We haven't received the delivery confirmation yet.",
        "pergunta": "A entrega é considerada cancelada?",
        "resposta": "Não; a confirmação ainda não chegou, mas é esperada a qualquer momento.",
        "conclusao": "'Haven't ... yet' expressa que a ação está pendente de conclusão."
      }
    ],
    "armadilhas": [
      {
        "errado": "I not yet finished my homework. ❌",
        "certo": "I haven't finished my homework yet. ✔️",
        "motivo": "'Yet' vai no final da frase, e o Present Perfect exige o auxiliar 'haven't'."
      },
      {
        "errado": "Have you already finished the exam? (como pergunta neutra) ⚠️",
        "certo": "Have you finished the exam yet? ✔️",
        "motivo": "Para perguntas neutras sem surpresa, use 'yet' no final. 'Already' em perguntas indica grande surpresa ou espanto."
      },
      {
        "errado": "I finished just now. (aceitável, mas menos nativo que o Present Perfect) ⚠️",
        "certo": "I have just finished. ✔️",
        "motivo": "A forma mais elegante e nativa de dizer 'acabei de' é 'have just + particípio'."
      },
      {
        "errado": "She already has went home. ❌",
        "certo": "She has already gone home. ✔️",
        "motivo": "'Already' fica DEPOIS de 'has' e antes do particípio correto 'gone'."
      }
    ],
    "coda": "Acabou de acontecer? 'Just' no meio. Já aconteceu antes da hora? 'Already' no meio. Ainda não aconteceu ou pergunta se já? 'Yet' no final!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Como dizer naturalmente em inglês: \"Eu acabei de lavar minhas mãos\"?",
        "opcoes": [
          "I have just washed my hands.",
          "I just wash my hands now.",
          "I already have washed my hands.",
          "I have washed my hands yet."
        ],
        "resposta": "I have just washed my hands.",
        "explicacao": "'Have just washed' é a tradução precisa de 'acabei de lavar'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a pergunta educada de rotina:\n\n\"Has the meeting started ___?\"",
        "opcoes": ["yet", "already", "just", "still"],
        "resposta": "yet",
        "explicacao": "Em perguntas neutras no final da frase, usa-se 'yet'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a palavra que indica antecipação:\n\n\"You don't need to remind him; he has ___ sent the invoice.\"",
        "opcoes": ["already", "yet", "ever", "never"],
        "resposta": "already",
        "explicacao": "'Already' indica que a tarefa já foi executada com antecedência."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a oração negativa com o marcador no local correto:\n\n\"The package hasn't arrived ___.\"",
        "opcoes": ["yet", "already", "just", "ever"],
        "resposta": "yet",
        "explicacao": "Em orações negativas no Present Perfect, 'yet' posiciona-se no fim."
      },
      {
        "tipo": "revelar",
        "pergunta": "Por que a frase *\"Have you finished your dinner already?!\"* expressa surpresa do interlocutor?",
        "resposta": "Porque quando usamos 'already' em vez de 'yet' em uma pergunta, estamos enfatizando que a pessoa terminou muito mais rápido do que o imaginado.",
        "explicacao": "Already em perguntas = espanto/surpresa."
      },
      {
        "tipo": "revelar",
        "pergunta": "Identifique e corrija os dois erros em: *\"I already haven't done my homework yet.\"*",
        "resposta": "A frase misturou 'already' e 'yet' em negação. O correto é: *\"I haven't done my homework yet.\"*",
        "explicacao": "Negações usam apenas 'yet' no final."
      },
      {
        "tipo": "revelar",
        "pergunta": "Como se diz: \"O trem acabou de partir da estação\"?",
        "resposta": "\"The train has just left the station.\"",
        "explicacao": "The train has just left."
      },
      {
        "tipo": "revelar",
        "pergunta": "Qual a posição de 'just' e 'already' na frase afirmativa?",
        "resposta": "Ambos ficam entre o verbo auxiliar (have/has) e o particípio passado principal: *have JUST done* / *have ALREADY done*.",
        "explicacao": "Posição intermediária entre auxiliar e particípio."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o advérbio que significa 'acabou de':\n\n\"I have ___ heard the good news on the radio!\"",
        "resposta": "just",
        "explicacao": "Just indica que a ação ocorreu há instantes."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o advérbio obrigatório no final desta negação:\n\n\"The students haven't submitted their essays ___.\"",
        "resposta": "yet",
        "explicacao": "Yet vai ao final de negações do Present Perfect."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com o advérbio de antecipação:\n\n\"Don't buy any milk; I have ___ bought two cartons.\"",
        "resposta": "already",
        "explicacao": "Already indica que a ação já foi realizada."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete a pergunta com a palavra correta de final de frase:\n\n\"Have they announced the winner ___?\"",
        "resposta": "yet",
        "explicacao": "Yet finaliza perguntas sobre expectativa."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON A2.15: Prepositions of Movement
  // ─────────────────────────────────────────────────────────────
  "a2-lez15": {
    "id": "a2-lez15",
    "num": "Lesson 15",
    "titulo": "Prepositions of Movement",
    "subtitulo": "Navegando no Espaço Dinâmico — Into, Out of, Across, Through, Along & Over",
    "cena": {
      "origem": "dialogo",
      "titulo": "The Morning Jog in London",
      "texto": "**Henry:** What route did you take for your run this morning, Maya?\n**Maya:** I ran out of my apartment, walked across the Millennium Bridge, and jogged along the River Thames.\n**Henry:** Did you go through Hyde Park too?\n**Maya:** Yes! I ran through the green gates, climbed over the small wooden fence, and jumped into the recreation center for a quick shower."
    },
    "fio": {
      "abertura": "Existe uma diferença crucial entre 'estar parado num lugar' e 'mover-se através de um lugar'. O inglês tem preposições especializadas para desenhar vetores e trajetórias no espaço.",
      "descoberta": "Enquanto 'in' e 'on' indicam repouso ou localização estática, preposições dinâmicas como «INTO» (para dentro de), «OUT OF» (para fora de), «THROUGH» (através de um volume 3D) e «ACROSS» (cruzando uma superfície 2D) dão vida e movimento cinematográfico às suas descrições!",
      "fecho": "Com essas preposições de movimento no seu repertório, você dará orientações de trânsito e relatará viagens com precisão milimétrica."
    },
    "alerta": "Across vs Through: 'Across' cruza superfícies planas 2D (across the street, across the river). 'Through' atravessa espaços fechados tridimensionais com coisas em volta ou em cima (through the tunnel, through the forest, through the window).",
    "definicao": {
      "fenomeno": "He walked into the room · She came out of the shop · Walk across the bridge · Drive through the tunnel · Walk along the beach",
      "causa": "O que diferencia as preposições de movimento das preposições de lugar?",
      "conceito": "Preposições de movimento são combinadas com verbos de deslocamento (walk, run, drive, fly, jump) para indicar a trajetória física, direção e transição de fronteira no espaço tridimensional."
    },
    "inventario": [
      "Distinguir 'into' (entrada com movimento) de 'in' (localização estática no interior)",
      "Usar 'out of' como o inverso exato de 'into' (saída de um espaço)",
      "Diferenciar 'across' (cruzar linha/superfície 2D) de 'through' (atravessar volume 3D)",
      "Empregar 'along' para trajetórias lineares paralelas (along the river/street)",
      "Dominar 'over' (por cima superando obstáculo), 'under' (por baixo) e 'past' (passar ao lado de)"
    ],
    "tabela_visual": "| Preposição | Ideia Geométrica | Exemplo Dinâmico | Tradução em Português |\n|---|---|---|---|\n| **INTO** | Entrando em um espaço fechado | He walked **into the bank**. | Ele entrou no banco. |\n| **OUT OF** | Saindo de um espaço fechado | She stepped **out of the taxi**. | Ela saiu do táxi. |\n| **ACROSS** | Cruzando de um lado ao outro (2D) | Walk **across the pedestrian crossing**. | Atravesse a faixa de pedestres. |\n| **THROUGH** | Atravessando um volume ou túnel (3D) | The train sped **through the dark tunnel**. | O trem acelerou pelo túnel escuro. |\n| **ALONG** | Seguindo uma linha contínua | We strolled **along the seashore**. | Passeamos ao longo da praia. |\n| **OVER** | Passando por cima com elevação | The dog jumped **over the low fence**. | O cão pulou por cima da cerca baixa. |",
    "observacao_cards": [
      {
        "ingles": "Into the room",
        "traducao": "Para dentro do quarto (movimento)",
        "genero": "Entrada Dinâmica",
        "motivo": "Exige verbo de movimento: 'He walked INTO the room' (diferente de 'He is IN the room')."
      },
      {
        "ingles": "Out of the car",
        "traducao": "Para fora do carro (saída)",
        "genero": "Saída Dinâmica",
        "motivo": "O oposto de into: 'Get out of the car now!'."
      },
      {
        "ingles": "Across the street",
        "traducao": "Do outro lado da rua / Atravessando a rua",
        "genero": "Travessia Superficial (2D)",
        "motivo": "Cruzar de uma calçada à outra de uma superfície aberta."
      },
      {
        "ingles": "Through the forest",
        "traducao": "Por entre a floresta / Através da floresta",
        "genero": "Travessia Volumétrica (3D)",
        "motivo": "Existem árvores ao redor e galhos por cima; é uma travessia tridimensional."
      },
      {
        "ingles": "Along the avenue",
        "traducao": "Ao longo da avenida",
        "genero": "Linha Contínua",
        "motivo": "Caminhar paralelamente à extensão da via sem cruzar."
      },
      {
        "ingles": "Walk past the pharmacy",
        "traducao": "Passe reto pela farmácia",
        "genero": "Passar ao Lado",
        "motivo": "'Past' indica que o ponto de referência é ultrapassado lateralmente no trajeto."
      }
    ],
    "tecnica": {
      "passo1": "Verifique a geometria do obstáculo: é plano como uma rua ou rio? -> use ACROSS.",
      "passo2": "É tridimensional e cercado (túnel, floresta, multidão, porta)? -> use THROUGH.",
      "passo3": "Há transição de fora para dentro de um ambiente? -> use INTO (e OUT OF para sair dele)."
    },
    "teoria": "Preposições de movimento são os conectores da física espacial na língua inglesa. Elas transformam verbos estáticos em cenas vivas de ação e navegação.\n\n### 1. Into vs In (A Dinâmica da Fronteira)\n* **In:** Expressa estado e permanência: *The keys are in my pocket.* (As chaves já estão no meu bolso).\n* **Into:** Expressa a transição de fora para dentro: *I put the keys into my pocket.* (O movimento da mão cruzando a borda do bolso).\n* O inverso de 'into' é **OUT OF**: *She took her passport out of her handbag.*\n\n### 2. O Grande Duelo: Across vs Through\n* **ACROSS (Plano / Superfície 2D):** Pense numa linha traçada sobre uma folha de papel. Você vai de uma margem à outra:\n  * *We swam across the lake.* (Nadamos de uma margem à outra do lago).\n  * *The pharmacy is just across the road.* (A farmácia fica do outro lado da rua).\n* **THROUGH (Volume / Espaço 3D):** Pense em um canudo ou numa caixa onde você entra por uma ponta e sai pela outra cercado por matéria:\n  * *The bullet went through the glass.* (A bala atravessou o vidro).\n  * *We drove through three countries on our road trip.* (Cruzamos três países por dentro de seus territórios).\n\n### 3. Along, Over, Under e Past\n* **Along:** Movimento paralelo contínuo: *We walked along the path.* (Seguimos a trilha).\n* **Over:** Movimento passando por cima superando um obstáculo vertical: *The plane flew over the mountains.*\n* **Under:** Movimento passando por baixo: *The boat sailed under the bridge.*\n* **Past:** Ultrapassar uma referência sem parar nela: *Go past the church and turn left at the corner.*",
    "ponte": "Em português, nós usamos o verbo 'passar' ou 'ir' com a preposição genérica 'por': 'passar pelo túnel', 'passar pela ponte', 'passar pela farmácia'. Em inglês, essa preposição genérica não existe! Você tem que enxergar o espaço: o túnel exige **through** (volume fechado); a ponte exige **across** (superfície plana); e a farmácia exige **past** (passar direto ao lado dela). Essa precisão visual é a marca de quem realmente domina o inglês.",
    "exemplos_prc": [
      {
        "oracao": "The train traveled through the Alps via a twelve-mile tunnel.",
        "pergunta": "Por que o trem viajou 'through' o túnel e não 'across'?",
        "resposta": "Porque um túnel é um tubo tridimensional fechado cercado por rochas por todos os lados.",
        "conclusao": "Espaços fechados e volumétricos exigem a preposição 'through'."
      },
      {
        "oracao": "A flock of birds flew across the clear evening sky.",
        "pergunta": "Qual foi o padrão de travessia das aves?",
        "resposta": "Elas cruzaram a extensão do céu aberto de um lado ao outro.",
        "conclusao": "Travessia aberta e bidimensional utiliza 'across'."
      },
      {
        "oracao": "The thief jumped over the security wall and disappeared into the shadows.",
        "pergunta": "Quais são as duas preposições de movimento combinadas?",
        "resposta": "'Over' para transpor o muro por cima e 'into' para penetrar no interior das sombras.",
        "conclusao": "Superação vertical de obstáculo = over; entrada no interior = into."
      },
      {
        "oracao": "We enjoyed a peaceful stroll along the river bank at sunset.",
        "pergunta": "Como os pedestres se moveram em relação ao rio?",
        "resposta": "Eles caminharam paralelamente à margem ao longo do seu curso d'água.",
        "conclusao": "'Along' expressa movimento paralelo contínuo a uma linha ou margem."
      }
    ],
    "armadilhas": [
      {
        "errado": "He walked in the room. (quando a intenção é entrada rápida) ⚠️",
        "certo": "He walked into the room. ✔️",
        "motivo": "Para enfatizar a travessia da porta para o interior, o padrão correto é 'into'."
      },
      {
        "errado": "We drove through the bridge. ❌",
        "certo": "We drove across the bridge. ✔️",
        "motivo": "Pontes são superfícies abertas planas (2D), portanto você dirige 'across' a ponte (a menos que seja uma ponte coberta por um túnel)."
      },
      {
        "errado": "She came out the house. ❌",
        "certo": "She came out of the house. ✔️",
        "motivo": "A preposição composta completa para sair de um local é 'out OF' (a preposição 'of' é indispensável)."
      },
      {
        "errado": "Walk pass the supermarket. ❌",
        "certo": "Walk past the supermarket. ✔️",
        "motivo": "'Pass' com dois 's' é o verbo (*to pass*). A preposição de movimento ao lado é 'PAST' com 't'."
      }
    ],
    "coda": "Se é plano, cruze 'across'; se é fechado, atravesse 'through'; para entrar, mergulhe 'into'; e para sair, escape 'out of'!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com a preposição para atravessar uma rua aberta:\n\n\"Look both ways before you walk ___ the road.\"",
        "opcoes": ["across", "through", "into", "along"],
        "resposta": "across",
        "explicacao": "A rua é uma superfície bidimensional aberta, portanto a travessia é 'across'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a travessia de um ambiente fechado:\n\n\"The subway train travels ___ a deep underground tunnel.\"",
        "opcoes": ["through", "across", "over", "along"],
        "resposta": "through",
        "explicacao": "Túneis são volumes 3D fechados, exigindo 'through'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a saída de um veículo:\n\n\"The movie star stepped ___ the black limousine.\"",
        "opcoes": ["out of", "out", "from into", "off to"],
        "resposta": "out of",
        "explicacao": "'Out of' é a preposição completa de movimento para sair do interior de um espaço ou carro."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a caminhada paralela:\n\n\"They walked hand in hand ___ the sandy beach.\"",
        "opcoes": ["along", "through", "into", "across"],
        "resposta": "along",
        "explicacao": "'Along' expressa movimento longitudinal paralelo à margem."
      },
      {
        "tipo": "revelar",
        "pergunta": "Qual a diferença conceitual entre *'walk in the park'* e *'walk into the park'*?",
        "resposta": "'Walk in the park' significa que você já está lá dentro passeando. 'Walk into the park' significa que você estava do lado de fora na calçada e atravessou o portão de entrada para o interior do parque.",
        "explicacao": "In = permanência interior; Into = entrada com transição de limite."
      },
      {
        "tipo": "revelar",
        "pergunta": "Por que dizemos *'drive THROUGH a forest'* mas *'drive ACROSS a desert'*?",
        "resposta": "Porque a floresta é um ambiente tridimensional cercado por árvores altas dos dois lados e galhos por cima (volume 3D = through). O deserto é uma imensa planície aberta de horizonte a horizonte (superfície aberta = across).",
        "explicacao": "Volume tridimensional (through) vs Superfície plana aberta (across)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Qual a diferença entre a grafia de *'pass'* e *'past'* na frase:\n*\"Go ___ the library and turn right\"*?",
        "resposta": "A grafia correta é 'past' (com 't'), pois atua como preposição de movimento indicando ultrapassagem lateral. 'Pass' (com 'ss') é o verbo infinitivo.",
        "explicacao": "Past = preposição; Pass = verbo."
      },
      {
        "tipo": "revelar",
        "pergunta": "Como se diz: \"O gato pulou por cima da mesa\"?",
        "resposta": "\"The cat jumped over the table.\"",
        "explicacao": "'Over' indica movimento que transpõe um objeto por cima."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição que indica movimento para dentro:\n\n\"He put his passport ___ his breast pocket.\"",
        "resposta": "into",
        "explicacao": "'Into' indica colocação ou movimento para o interior."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição para atravessar um rio de uma margem à outra:\n\n\"They paddled their canoe ___ the wide river.\"",
        "resposta": "across",
        "explicacao": "'Across' indica travessia de margem a margem."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição para transitar por dentro de um túnel:\n\n\"We drove ___ the mountain through a lighted tunnel.\"",
        "resposta": "through",
        "explicacao": "'Through' indica movimento por dentro de um volume."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com a preposição que significa 'ao longo de':\n\n\"There are tall palm trees all ___ the coastal promenade.\"",
        "resposta": "along",
        "explicacao": "'Along' denota extensão contínua paralela."
      }
    ]
  }
};

console.log('Gravando Onda 4 Parte 3 (Lições A2.11 a A2.15)...');

for (const [id, lessonData] of Object.entries(wave4Part3Lessons)) {
  for (const mod of data.moduli) {
    const idx = mod.lezioni.findIndex(l => l.id === id);
    if (idx !== -1) {
      mod.lezioni[idx] = lessonData;
      console.log(`Lição ${id} (${lessonData.titulo}) enriquecida com sucesso!`);
    }
  }
}

fs.writeFileSync(grammarPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Onda 4 Parte 3 (A2.11 a A2.15) gravada com sucesso em data/grammar.json!');
