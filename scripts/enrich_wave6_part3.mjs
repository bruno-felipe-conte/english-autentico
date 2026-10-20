import fs from 'fs';

const grammarPath = 'data/grammar.json';
const data = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));

// Onda 6 — Parte 3: Lições B2.11 a B2.15 (Artigos Avançados, Adjetivos em -ed/-ing, Conectivos de Contraste e Condição & Phrasal Verbs)
const wave6Part3Lessons = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 11: Articles (Advanced): Omissões Institucionais e Abstrações
  // ─────────────────────────────────────────────────────────────
  "b2-lez11": {
    "id": "b2-lez11",
    "num": "Lesson 11",
    "titulo": "Articles (Advanced): Omissões Institucionais e Abstrações",
    "subtitulo": "Hospital, Prison, University, Bed e Conceitos Abstratos — Com ou Sem 'The'?",
    "cena": {
      "origem": "dialogo",
      "titulo": "Visiting a Friend in Cambridge",
      "texto": "**Fiona:** I heard that Julian is in **hospital**! What happened to him?\n**Arthur:** He broke his collarbone during a rugby match. He was rushed to hospital on Saturday, so he is currently a patient there.\n**Fiona:** Oh, poor Julian! I want to visit him this afternoon. Which hospital is he in?\n**Arthur:** He is at Addenbrooke's. If you go to **the hospital** to visit him, make sure you park in visitor bay C.\n**Fiona:** Thanks for the tip. **Love** and **friendship** are best proven in times of adversity!"
    },
    "fio": {
      "abertura": "No nível A1, aprendemos a regra básica: 'the' para coisas específicas e 'a/an' para genéricas. Mas por que dizemos *\"Julian is in hospital\"* sem artigo, e logo em seguida *\"I'm going to the hospital to visit him\"* com 'the'? E por que dizemos *\"Love is patient\"* sem artigo, mas *\"The love of a mother\"* com artigo?",
      "descoberta": "Examine a sutileza na conversa de Fiona e Arthur: quando Julian está em «hospital» como paciente, ou quando alguém vai para «prison» como presidiário, ou para «university» como estudante, o artigo desaparece! A instituição passa a representar sua **função primária intrínseca**. Porém, quando Fiona vai a «the hospital» como mera visitante externa ou vai a «the prison» consertar um cano, o edifício físico é ativado, exigindo o artigo «the»!",
      "fecho": "Ao dominar as omissões institucionais e o tratamento de substantivos abstratos, seu inglês atinge a sensibilidade nativa mais refinada."
    },
    "alerta": "O erro mais comum de falantes de português é traduzir 'A vida é bela' como *'The life is beautiful'*, ou 'Eu amo a música' como *'I love the music'*. No inglês, substantivos abstratos e generalizações puras NUNCA levam artigo definido!",
    "definicao": {
      "fenomeno": "He is in prison (preso) vs He went to the prison (foi visitar o prédio) · Life is short (a vida em geral) vs The life of Abraham Lincoln (a vida específica de alguém)",
      "causa": "Por que o artigo 'the' é omitido diante de instituições e abstrações?",
      "conceito": "Quando usamos palavras como 'school, university, prison, hospital, church, bed' sem artigo, estamos nos referindo ao propósito social ou existencial do lugar (estudar, cumprir pena, receber tratamento médico, rezar, dormir). Quando usamos 'the', o foco passa a ser o edifício físico ou objeto geográfico."
    },
    "inventario": [
      "Instituições com função primária (Sem artigo): in hospital (paciente), in prison (presidiário), at university (estudante), in bed (dormindo), at church (rezando)",
      "Instituições como edifícios físicos (Com artigo 'the'): go to the hospital (visitar), visit the prison (trabalhar/visitar), walk into the church (turismo)",
      "Generalizações e Substantivos Abstratos (Sem artigo): Life, Love, Happiness, Music, Science, History, Nature",
      "Especificação com 'of' (Exige artigo 'the'): *The love of my life*, *The history of Europe*, *The science behind vaccines*",
      "Refeições cotidianas (Sem artigo): have breakfast, have lunch, have dinner (exceto quando qualificadas por adjetivo: *a delicious dinner*)",
      "Meios de transporte com 'by' (Sem artigo): by car, by train, by plane, by bus"
    ],
    "tabela_visual": "| Substantivo | Sem Artigo (Função Primária / Abstração) | Com Artigo 'The' (Edifício Físico / Específico) |\n|---|---|---|\n| **Hospital** | *He is in **hospital**.* (Ele é um paciente internado) | *She drove to **the hospital**.* (Ela foi ao prédio visitar alguém) |\n| **Prison / Jail** | *The burglar is in **prison**.* (Cumprindo pena de prisão) | *The lawyer visited **the prison**.* (Foi ao edifício a trabalho) |\n| **School / University** | *My son is at **school**.* (Ele é um aluno em aula) | *The repairman went to **the school**.* (Foi ao prédio consertar a fiação) |\n| **Bed** | *It's late; I'm going to **bed**.* (Vou me deitar para dormir) | *Don't jump on **the bed**!* (Não pule sobre o móvel físico) |\n| **Substantivos Abstratos** | * **Love** conquers all.* (O amor em sentido universal) | * **The love** they shared was inspiring.* (O amor específico daquele casal) |\n| **Vida / Natureza** | * **Life** is full of surprises.* (A vida em geral) | * **The life** of Winston Churchill.* (A biografia daquele homem) |",
    "observacao_cards": [
      {
        "ingles": "In hospital vs In the hospital",
        "traducao": "internado vs no prédio do hospital",
        "genero": "Diferença Semântica / Dialetal",
        "motivo": "No inglês britânico, 'in hospital' = internado. Nos EUA, diz-se 'in the hospital' para ambos, mas para 'prison/school' a regra é universal."
      },
      {
        "ingles": "Zero Article para Abstrações",
        "traducao": "sem 'the' para conceitos gerais",
        "genero": "Lei Anti-Vício",
        "motivo": "Nunca diga 'the nature' ou 'the peace'. Diga: 'Nature is wise' e 'We want peace'."
      },
      {
        "ingles": "Qualificação com 'OF' traz o THE",
        "traducao": "The [conceito] of...",
        "genero": "Regra de Restrição",
        "motivo": "Ao especificar com 'of', o artigo 'the' reaparece: 'History is interesting' vs 'The history of Brazil'."
      },
      {
        "ingles": "By car / By bus (Sem Artigo)",
        "traducao": "de carro / de ônibus",
        "genero": "Meios de Transporte",
        "motivo": "Após a preposição 'by', o artigo é eliminado: 'I commute by train' (mas 'on the train / in my car')."
      }
    ],
    "tecnica": {
      "titulo": "O Teste da Função Primária em 3 Passos",
      "passos": [
        "1. Identifique a palavra institucional (hospital, prison, school, church, bed).",
        "2. Pergunte-se: o sujeito está usando o local para o seu propósito original (estudar, dormir, cumprir pena)?",
        "3. Se a resposta for SIM, ELIMINE o artigo 'the' (ex: 'he is in prison'). Se ele for apenas um visitante ou prestador de serviço no prédio, use 'the' (ex: 'he repaired the roof of the prison')."
      ]
    },
    "teoria": "### A Teoria Aprofundada dos Artigos Avançados: Instituições e Abstrações\n\nO uso de artigos em inglês de nível B2 e C1 não é guiado por traduções mecânicas, mas pela perspectiva cognitiva que o falante deseja projetar sobre o substantivo.\n\n#### 1. A Omissão Institucional (*Institutional Zero Article*)\nAlgumas palavras que designam instituições sociais, edifícios ou móveis perdem o artigo definido quando funcionam como símbolos da atividade humana que ocorre em seu interior:\n* **School / College / University:**\n  * *\"Liam is at university.\"* (Ele está cursando o ensino superior).\n  * *\"His mother walked to **the university** to attend his graduation.\"* (Ela se deslocou até o campus físico).\n* **Prison / Jail:**\n  * *\"The criminal was sent to **prison** for five years.\"* (Foi sentenciado a cumprir pena).\n  * *\"A group of human rights inspectors toured **the prison**.\"* (Inspecionaram o complexo penal).\n* **Hospital:**\n  * No inglês britânico (UK standard): *\"She has been in **hospital** for two weeks.\"* (Está internada).\n  * *\"I will meet you outside **the hospital**.\"* (No edifício físico).\n* **Bed / Church / Court:**\n  * *\"Time for bed!\"* (Hora de dormir) vs *\"The cat is sleeping under **the bed**.\"* (Embaixo do móvel).\n  * *\"They go to church every Sunday.\"* (Vão participar do culto religioso) vs *\"Tourists were photographing **the church**.\"* (A arquitetura da igreja).\n\n#### 2. Substantivos Abstratos e Generalizações Puras\nEm inglês, falar de um conceito em sua totalidade universal exige a **ausência de artigo** (*Zero Article*):\n* *\"**Life** is a journey, not a destination.\"* (A vida humana universal).\n* *\"**Happiness** cannot be purchased with money.\"* (O sentimento de felicidade em geral).\n* *\"**Science** has made tremendous progress in cancer research.\"*\n* *\"We all strive for **peace** and **justice**.\"*\n\n#### 3. A Reativação do Artigo Definido por Especificação\nNo entanto, no momento em que esses mesmos substantivos abstratos são delimitados por um modificador pós-posto (como uma oração relativa ou uma locução com *of*), eles se tornam específicos e o artigo **THE** volta a ser obrigatório:\n* *\"**The life** of Mahatma Gandhi inspired Martin Luther King.\"*\n* *\"**The happiness** that I felt on my wedding day was indescribable.\"*\n* *\"**The history** of the Roman Empire spans centuries.\"*\n\n#### 4. Refeições e Meios de Transporte\n* **Refeições:** *\"We usually have breakfast at 7:30 AM.\"* / *\"What's for dinner?\"* (Sem artigo). Porém, se houver um adjetivo descritivo: *\"We had **a wonderful dinner** at the Italian bistro.\"*\n* **Transporte:** *\"I travel by bus / by plane / by boat.\"* (Sem artigo). Porém, com outras preposições: *\"on **the** bus\"*, *\"in **a** taxi\"*, *\"in **my** car\"*.",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português, a regra geral é quase o inverso do inglês: nós colocamos artigos definidos diante de quase tudo!\n* Dizemos: *\"**A** vida é bela\"*, *\"**A** ciência comprova\"*, *\"**O** amor é cego\"*, *\"Eu adoro **a** música clássica\"*.\n* Dizemos também: *\"Ele está n**o** hospital\"*, *\"Ela foi para **a** escola\"*, *\"Ele está n**a** prisão\"*.\n\n**Onde o brasileiro tropeça gravemente no inglês?**\n* **A epidemia do 'The' desnecessário:** Por vício do português, 90% dos alunos brasileiros escrevem: *\"The life is hard\"*, *\"The love is important\"*, *\"I like the nature\"*. Essas frases soam extremamente estranhas para nativos. Lembre-se: em inglês, para conceitos universais, **elimine o 'THE'** (*Life is hard*, *Love is important*, *Nature is beautiful*).\n* **Não distinguir 'in hospital' de 'in the hospital':** No Reino Unido, dizer *\"My father is in the hospital\"* pode soar como se ele estivesse apenas no prédio fazendo uma visita ou entregando correspondência. Se ele está internado na UTI ou num leito, diga com propriedade: *\"He is in hospital\"*.",
    "exemplos_prc": [
      {
        "pergunta": "Why wasn't Marcus present at yesterday's departmental meeting?",
        "resposta": "He was in hospital recovering from an emergency appendectomy, but the doctors say he will be discharged tomorrow.",
        "contexto": "Explicando que um colega estava internado recebendo tratamento médico de emergência."
      },
      {
        "pergunta": "Do you agree with the statement that technology improves human happiness?",
        "resposta": "Generally speaking, yes, but technology can also generate anxiety if we fail to maintain balance in daily life.",
        "contexto": "Discutindo conceitos abstratos filosóficos em uma prova de redação acadêmica (IELTS)."
      },
      {
        "pergunta": "How did you travel from London to Edinburgh for the arts festival?",
        "resposta": "We traveled by train because it was much more scenic and relaxing than flying.",
        "contexto": "Relatando o meio de transporte utilizado em uma viagem pelo Reino Unido."
      }
    ],
    "armadilhas": [
      {
        "erro": "The life is very difficult for immigrants in big cities.",
        "correcao": "Life is very difficult for immigrants in big cities.",
        "explicacao": "A palavra 'life' em sentido genérico e universal não aceita o artigo 'the'. Diga simplesmente 'Life is very difficult'."
      },
      {
        "erro": "The criminal was sent to the prison for armed robbery.",
        "correcao": "The criminal was sent to prison for armed robbery.",
        "explicacao": "Quando alguém vai para a prisão como condenado/detento, omite-se o artigo: 'sent to prison'."
      },
      {
        "erro": "I commute to the university by the car every single day.",
        "correcao": "I commute to university by car every single day.",
        "explicacao": "Dois erros: 'to university' como estudante não leva artigo, e após a preposição 'by' para transporte não se usa 'the'."
      }
    ],
    "coda": "In English, true universals need no article; when concepts are vast as the sky, words stand proudly naked.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a oração que expressa o conceito universal de amor:\n\"___ is patient, ___ is kind; it does not envy, it does not boast.\"",
        "opcoes": [
          "Love / love",
          "The love / the love",
          "A love / a love",
          "An love / an love"
        ],
        "resposta": "Love / love",
        "explicacao": "Conceitos abstratos em sentido universal não admitem artigo: 'Love is patient, love is kind'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a frase indicando que alguém está internado como paciente (inglês britânico padrão):\n\"Grandmother was feeling unwell, so she is currently in ___.\"",
        "opcoes": [
          "hospital",
          "the hospital",
          "a hospital",
          "an hospital"
        ],
        "resposta": "hospital",
        "explicacao": "Estar internado recebendo cuidados médicos em inglês britânico é expresso por 'in hospital' (sem artigo)."
      },
      {
        "tipo": "escolha",
        "pergunta": "Assinale a frase com o uso gramaticalmente CORRETO do artigo definido:",
        "opcoes": [
          "The history of Renaissance art fascinates me.",
          "The history fascinates me in general.",
          "I believe that the peace is essential for humanity.",
          "We usually have the lunch at 1:00 PM."
        ],
        "resposta": "The history of Renaissance art fascinates me.",
        "explicacao": "Quando o substantivo abstrato é delimitado por uma locução restritiva ('of Renaissance art'), o artigo 'The' é obrigatório."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual alternativa expressa o meio de transporte de forma idiomática e sem artigo?",
        "opcoes": [
          "They traveled to Glasgow by train.",
          "They traveled to Glasgow by the train.",
          "They traveled to Glasgow by a train.",
          "They traveled to Glasgow by one train."
        ],
        "resposta": "They traveled to Glasgow by train.",
        "explicacao": "Após a preposição 'by', os meios de transporte não levam artigo: 'by train'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no conceito genérico de ciência antes de revelar:\n\n\"___ (science) has made astonishing discoveries regarding the human genome in recent years.\"\n(A ciência fez descobertas espantosas sobre o genoma humano nos últimos anos.)",
        "resposta": "Science has made astonishing discoveries regarding the human genome in recent years.",
        "revelacao": "Science has made astonishing discoveries regarding the human genome in recent years.",
        "dica": "Sem artigo 'the' (apenas Science)",
        "explicacao": "Substantivos que representam áreas do saber em geral não levam artigo: 'Science'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na visita ao prédio da escola antes de revelar:\n\n\"The electrician went to ___ (school) to repair the heating system in the gymnasium.\"\n(O eletricista foi à escola para consertar o sistema de aquecimento no ginásio.)",
        "resposta": "The electrician went to the school to repair the heating system in the gymnasium.",
        "revelacao": "The electrician went to the school to repair the heating system in the gymnasium.",
        "dica": "Usa 'the school' porque é o edifício físico, não um aluno",
        "explicacao": "Como ele é um profissional visitando o prédio e não um estudante, usa-se 'the school'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na expressão cotidiana de ir dormir antes de revelar:\n\n\"It's past 11:00 PM; I'm exhausted and going to ___ (bed).\"\n(Passa das 23h; estou exausto e vou para a cama / dormir.)",
        "resposta": "It's past 11:00 PM; I'm exhausted and going to bed.",
        "revelacao": "It's past 11:00 PM; I'm exhausted and going to bed.",
        "dica": "Sem artigo (to bed)",
        "explicacao": "A expressão fixa para ir dormir é 'go to bed'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Corrija o erro comum de tradução literal antes de revelar:\n\n\"The nature is so peaceful during the early morning hours.\"",
        "resposta": "Nature is so peaceful during the early morning hours.",
        "revelacao": "Nature is so peaceful during the early morning hours.",
        "dica": "Elimine 'The'",
        "explicacao": "'Nature' em sentido ecológico/universal não leva artigo 'the'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o substantivo abstrato 'music' sem artigo para generalização:\n\n\"___ is known as the universal language of mankind.\" (A música)",
        "resposta": "Music",
        "explicacao": "Generalizações sobre música não levam artigo: 'Music'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o artigo definido necessário pela especificação com 'of':\n\n\"___ education of young children requires patience and empathy.\" (A educação de)",
        "resposta": "The",
        "explicacao": "Especificado por 'of young children', o substantivo exige 'The'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição que se combina com meios de transporte sem artigo:\n\n\"We decided to travel ___ plane to save precious vacation time.\" (de)",
        "resposta": "by",
        "explicacao": "A preposição é 'by' (by plane)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que preenche a expressão de condenação judicial sem artigo:\n\n\"The corrupt official was found guilty and sent to ___ for three years.\" (prisão)",
        "resposta": "prison",
        "explicacao": "Cumprir pena de prisão é expresso por 'sent to prison' (sem artigo)."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 12: Adjectives ending in -ed vs -ing
  // ─────────────────────────────────────────────────────────────
  "b2-lez12": {
    "id": "b2-lez12",
    "num": "Lesson 12",
    "titulo": "Adjectives ending in -ed vs -ing",
    "subtitulo": "Bored vs Boring, Interested vs Interesting — Sentimento vs Causa",
    "cena": {
      "origem": "dialogo",
      "titulo": "After the Three-Hour Physics Lecture",
      "texto": "**Toby:** I am so **bored**! That was by far the most **boring** lecture I have ever endured in my entire life.\n**Alicia:** Really? I found the professor's theories on quantum entanglement absolutely **fascinating**! I was completely **captivated** from start to finish.\n**Toby:** Well, you are always **fascinated** by theoretical physics. To me, listening to someone read mathematical equations for three hours is utterly **exhausting**; I feel completely **exhausted** now!"
    },
    "fio": {
      "abertura": "Poucas confusões causam tantos mal-entendidos cômicos ou constrangedores quanto a troca de adjetivos terminados em **-ED** e **-ING**. Se você entrar em uma reunião de trabalho e disser *\"I am very boring today\"*, você não está dizendo que está entediado; você acabou de dizer que você é uma pessoa chata, enfadonha e desinteressante!",
      "descoberta": "Observe o diálogo perfeito entre Toby e Alicia: Toby se sente entediado («I am bored») porque a palestra é chata («the lecture is boring»). A palestra é a **fonte ou causa** do sentimento (-ING), e o cérebro de Toby é o **receptor que sente a emoção** (-ED). Alicia acha as teorias fascinantes («fascinating» = a causa) e, por isso, ela própria fica fascinada («fascinated» = o efeito).",
      "fecho": "A regra mnemônica de ouro: **-ED** é a **E**moção que você sente dentro de você. **-ING** é o gatilho externo que causa essa reação no mundo."
    },
    "alerta": "Cuidado extremo com os pares sociais: *I am boring* (sou uma pessoa chata) vs *I am bored* (estou entediado); *I am embarrassing* (sou uma vergonha para os outros) vs *I am embarrassed* (estou envergonhado/tímido). Trocar essas terminações altera radicalmente o julgamento sobre seu caráter!",
    "definicao": {
      "fenomeno": "I am bored (sinto tédio) vs The movie is boring (o filme causa tédio) · She is excited (ela sente empolgação) vs The news is exciting (a notícia é empolgante)",
      "causa": "Por que a língua inglesa utiliza os dois particípios (passado e presente) como adjetivos?",
      "conceito": "O Particípio Passado (-ED) carrega valor passivo: o sujeito foi impactado ou afetado por um estímulo. O Particípio Presente (-ING) carrega valor ativo: o sujeito ou objeto é a fonte geradora que irradia aquele efeito sobre quem o observa."
    },
    "inventario": [
      "Adjetivos em -ED: descrevem COMO alguém se sente (estados emocionais humanos: tired, bored, fascinated, shocked, disappointed)",
      "Adjetivos em -ING: descrevem a CARACTERÍSTICA de uma coisa, evento ou pessoa que gera o sentimento (tiring, boring, fascinating, shocking, disappointing)",
      "Pessoas podem ser descritas com -ING quando elas são a fonte do sentimento: *Professor Higgins is an inspiring teacher* (ele inspira os alunos)",
      "Adjetivos de choque e surpresa: surprised vs surprising, amazed vs amazing, astonished vs astonishing",
      "Adjetivos de cansaço e frustração: exhausted vs exhausting, frustrated vs frustrating, annoyed vs annoying"
    ],
    "tabela_visual": "| Verbo Base | Adjetivo em -ED (O Sentimento Sentido) | Adjetivo em -ING (A Causa Geradora) | Frase Exemplo Demonstrativa |\n|---|---|---|---|\n| **Bore** | **bored** (entediado) | **boring** (chato / monótono) | *The **boring** film made the audience feel **bored**.* |\n| **Exhaust** | **exhausted** (exausto / esgotado) | **exhausting** (extenuante) | *A marathon is **exhausting**; the runners were **exhausted**.* |\n| **Interest** | **interested** (interessado) | **interesting** (interessante) | *I am **interested** in reading this **interesting** book.* |\n| **Surprise** | **surprised** (surpreso / espantado) | **surprising** (surpreendente) | *We were **surprised** by the **surprising** news.* |\n| **Embarrass**| **embarrassed** (envergonhado) | **embarrassing** (constrangedor) | *It was an **embarrassing** mistake, and he felt deeply **embarrassed**.* |\n| **Confuse** | **confused** (confuso / desorientado) | **confusing** (confuso / difícil) | *These instructions are **confusing**; I am totally **confused**.* |\n| **Annoy** | **annoyed** (irritado / chateado) | **annoying** (irritante / incômodo) | *That **annoying** buzzing noise made the teacher feel **annoyed**.* |",
    "observacao_cards": [
      {
        "ingles": "-ED = Emotion Inside",
        "traducao": "o sentimento do sujeito",
        "genero": "Regra Mnemônica",
        "motivo": "-ED descreve a emoção interna de uma pessoa (ou animal): 'The dog was frightened by fireworks'."
      },
      {
        "ingles": "-ING = Inspiring the feeling",
        "traducao": "a característica causadora",
        "genero": "Gatilho Externo",
        "motivo": "-ING descreve o que gera o impacto: 'The fireworks were frightening'."
      },
      {
        "ingles": "Pessoas com -ING",
        "traducao": "alguém que causa uma impressão",
        "genero": "Uso Avançado",
        "motivo": "Sim, pessoas podem ter -ING! 'He is an interesting man' = ele causa interesse nos outros."
      },
      {
        "ingles": "Bored vs Boring (O Clássico)",
        "traducao": "entediado vs chato",
        "genero": "Cuidado Social",
        "motivo": "Dizer 'I am boring' significa 'eu sou chato'. Para dizer que está sem nada para fazer, diga: 'I am bored'."
      }
    ],
    "tecnica": {
      "titulo": "O Teste de Causa e Efeito em 3 Passos",
      "passos": [
        "1. Identifique sobre quem ou sobre o que você está falando.",
        "2. Essa pessoa/coisa está SENTINDO a emoção no peito? Se sim, adicione -ED (ex: 'I felt frightened').",
        "3. Essa pessoa/coisa está PROVOCANDO a reação nos outros? Se sim, adicione -ING (ex: 'The horror film was frightening')."
      ]
    },
    "teoria": "### A Teoria Aprofundada dos Adjetivos Participiais em -ED e -ING\n\nOs adjetivos derivados de verbos de emoção e estado psicológico são denominados *participial adjectives*. A distinção morfológica entre a desinência de Particípio Passado (-ed) e a de Particípio Presente (-ing) codifica a direção do fluxo causal da ação.\n\n#### 1. A Perspectiva do Receptor: Adjetivos em -ED\nOs adjetivos em **-ed** descrevem o estado psicológico, físico ou emocional em que uma criatura consciente se encontra. Funcionam quase que exclusivamente com seres humanos e animais capazes de experimentar sentimentos:\n* *\"The tourists were **astonished** by the grandeur of the Taj Mahal.\"*\n* *\"After working sixteen hours without a break, she was utterly **exhausted**.\"*\n* *\"The students felt **disappointed** when the field trip was canceled.\"*\n\n#### 2. A Perspectiva do Emissor / Estímulo: Adjetivos em -ING\nOs adjetivos em **-ing** descrevem as qualidades inerentes de uma coisa, situação, ideia ou pessoa que despertam sentimentos em quem as presencia:\n* *\"The Taj Mahal is an **astonishing** masterpiece of Mughal architecture.\"*\n* *\"Working sixteen hours a day is physically **exhausting**.\"*\n* *\"The sudden cancellation of the trip was deeply **disappointing**.\"*\n\n#### 3. Pessoas Descritas com Ambas as Terminações\nUm erro conceitual comum é acreditar que *-ed* é 'para pessoas' e *-ing* é 'para coisas'. Isso é falso! **Pessoas podem receber ambas as terminações**, com significados radicalmente diferentes:\n* *\"Professor Higgins is **bored**.\"* (O professor está com tédio; não aguenta mais a aula dele mesmo).\n* *\"Professor Higgins is **boring**.\"* (O professor é maçante, monótono e sem graça; faz todos os alunos dormirem).\n* *\"Sarah is an **inspiring** leader.\"* (Ela inspira os membros da sua equipe).\n* *\"Sarah felt **inspired** after reading the biography.\"* (Ela se sentiu cheia de inspiração).\n\n#### 4. Pares Sofisticados de Nível B2 / C1\n* *overwhelmed* (sobrecarregado) vs *overwhelming* (esmagador / avassalador)\n* *captivated* (fascinado / cativado) vs *captivating* (cativante / encantador)\n* *reassured* (tranquilizado) vs *reassuring* (reconfortante)\n* *disillusioned* (desiludido) vs *disillusioning* (desilusionante)",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português, usamos adjetivos com sufixos diferentes ou nos apoiamos nos verbos auxiliares *ser* vs *estar*:\n* Dizemos: *\"Eu **estou** entediado\"* (estado temporário) vs *\"Aquele filme **é** chato\"* (qualidade permanente).\n* *\"Eu **estou** cansado\"* vs *\"O trabalho **é** cansativo\"*.\n\n**Onde o brasileiro tropeça gravemente no inglês?**\n* Como o inglês usa o verbo *to be* tanto para *ser* quanto para *estar*, a distinção entre a sensação passageira e a qualidade causadora é transferida **inteiramente para o sufixo -ED / -ING**.\n* Por causa dessa fusão no verbo *to be*, o brasileiro desavisado pensa em *\"eu sou interessante\"* e diz *\"I am interested\"* (significando 'estou interessado em algo'). Ou pensa em *\"estou cansado\"* e solta *\"I am tiring\"* (significando 'eu sou uma pessoa cansativa que esgota os outros'). Dominar os sufixos -ed e -ing é o antídoto definitivo para nunca mais pagar esse mico internacional!",
    "exemplos_prc": [
      {
        "pergunta": "How did you feel when you heard that your startup won the innovation award?",
        "resposta": "We were absolutely thrilled and overwhelmed with joy! It was an incredible and thrilling moment for our whole team.",
        "contexto": "Compartilhando a emoção genuína de conquistar um prêmio profissional de prestígio."
      },
      {
        "pergunta": "Why did you decide to leave the cinema before the movie finished?",
        "resposta": "Because the plot was totally confusing and predictable; frankly, I was so bored that I couldn't stay another minute.",
        "contexto": "Explicando o motivo de ter abandonado uma sessão de cinema ruim."
      },
      {
        "pergunta": "Is climbing Mount Kilimanjaro as difficult as people say?",
        "resposta": "It is an exhausting six-day trek, and by the final summit night, every single climber is completely exhausted, but the sunrise is breathtaking.",
        "contexto": "Descrevendo o desafio físico e a beleza visual de uma expedição de alta montanha."
      }
    ],
    "armadilhas": [
      {
        "erro": "I am very boring in this meeting; let's go home.",
        "correcao": "I am very bored in this meeting; let's go home.",
        "explicacao": "'I am boring' significa 'eu sou uma pessoa chata'. Para dizer que está entediado, use 'I am bored'."
      },
      {
        "erro": "The news about the company bankruptcy was very shocked.",
        "correcao": "The news about the company bankruptcy was very shocking.",
        "explicacao": "A notícia é a fonte que causa o choque, logo exige a terminação causadora -ing: 'shocking'."
      },
      {
        "erro": "Are you interesting in learning contemporary art history?",
        "correcao": "Are you interested in learning contemporary art history?",
        "explicacao": "A pergunta indaga sobre o interesse sentido pela pessoa, exigindo a terminação -ed: 'interested in'."
      }
    ],
    "coda": "-ED is the echo of the heart; -ING is the thunder in the world.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o adjetivo que expressa a emoção sentida pelo público:\n\"The audience was completely ___ by the magician's illusions.\"",
        "opcoes": [
          "fascinated",
          "fascinating",
          "fascinate",
          "fascinator"
        ],
        "resposta": "fascinated",
        "explicacao": "O público é o receptor que sente a emoção, exigindo a terminação -ed: 'fascinated'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o adjetivo que descreve a qualidade cansativa da jornada:\n\"Hiking thirty kilometers with a heavy backpack is an ___ experience.\"",
        "opcoes": [
          "exhausting",
          "exhausted",
          "exhaustion",
          "exhaust"
        ],
        "resposta": "exhausting",
        "explicacao": "A caminhada é a causa geradora do cansaço, exigindo -ing: 'an exhausting experience'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase contém um erro constrangedor de uso de adjetivo?",
        "opcoes": [
          "I didn't talk to anyone at the party because I felt very boring.",
          "I didn't talk to anyone at the party because I felt very bored.",
          "The party was very boring.",
          "The host was very charming."
        ],
        "resposta": "I didn't talk to anyone at the party because I felt very boring.",
        "explicacao": "'Felt very boring' soaria como 'senti que eu era chato'. O correto para expressar tédio é 'felt very bored'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o par correto (-ed e -ing):\n\"The instructions were very ___, so the new employees felt totally ___.\"",
        "opcoes": [
          "confusing / confused",
          "confused / confusing",
          "confusing / confusing",
          "confused / confused"
        ],
        "resposta": "confusing / confused",
        "explicacao": "As instruções são a causa (confusing) e os funcionários sentem a confusão (confused)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no sentimento de decepção antes de revelar:\n\n\"We were deeply ___ (disappoint) when our flight was canceled at the last minute.\"\n(Ficamos profundamente decepcionados quando nosso voo foi cancelado no último minuto.)",
        "resposta": "We were deeply disappointed when our flight was canceled at the last minute.",
        "revelacao": "We were deeply disappointed when our flight was canceled at the last minute.",
        "dica": "Terminação -ed para o sentimento sentido (disappointed)",
        "explicacao": "Descreve o sentimento das pessoas: 'disappointed'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na característica assustadora do filme antes de revelar:\n\n\"That new horror movie in the cinema was really ___ (frighten); I couldn't sleep all night!\"\n(Aquele novo filme de terror no cinema foi realmente assustador; não consegui dormir a noite toda!)",
        "resposta": "That new horror movie in the cinema was really frightening; I couldn't sleep all night!",
        "revelacao": "That new horror movie in the cinema was really frightening; I couldn't sleep all night!",
        "dica": "Terminação -ing para o estímulo gerador (frightening)",
        "explicacao": "O filme provoca o medo, logo usa-se 'frightening'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no sentimento de vergonha/timidez antes de revelar:\n\n\"He spilled red wine all over the host's white sofa; he was so ___ (embarrass)!\"\n(Ele derramou vinho tinto no sofá branco do anfitrião; ele ficou tão envergonhado!)",
        "resposta": "He spilled red wine all over the host's white sofa; he was so embarrassed!",
        "revelacao": "He spilled red wine all over the host's white sofa; he was so embarrassed!",
        "dica": "Terminação -ed para vergonha própria (embarrassed)",
        "explicacao": "A pessoa sentiu a vergonha: 'embarrassed'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no líder inspirador que causa impacto nos outros antes de revelar:\n\n\"Nelson Mandela was one of the most ___ (inspire) leaders in world history.\"\n(Nelson Mandela foi um dos líderes mais inspiradores da história mundial.)",
        "resposta": "Nelson Mandela was one of the most inspiring leaders in world history.",
        "revelacao": "Nelson Mandela was one of the most inspiring leaders in world history.",
        "dica": "Terminação -ing para quem gera a inspiração (inspiring)",
        "explicacao": "Ele irradiava inspiração sobre os demais: 'inspiring'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o adjetivo com -ed derivado de 'interest' para preencher a frase:\n\n\"Are you ___ in joining our creative writing club?\" (interessado)",
        "resposta": "interested",
        "explicacao": "O adjetivo de sentimento é 'interested'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o adjetivo com -ing derivado de 'surprise' para preencher a frase:\n\n\"It is quite ___ that he passed the driving test on his first attempt.\" (surpreendente)",
        "resposta": "surprising",
        "explicacao": "A qualidade geradora é 'surprising'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o adjetivo com -ed derivado de 'tire' para completar o estado físico:\n\n\"After running twenty miles, I was so ___ that I went straight to sleep.\" (cansado)",
        "resposta": "tired",
        "explicacao": "O estado do sujeito é 'tired'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o adjetivo com -ing derivado de 'annoy' para qualificar o barulho irritante:\n\n\"Please turn off that ___ car alarm; nobody can sleep!\" (irritante)",
        "resposta": "annoying",
        "explicacao": "O barulho que causa o incômodo é 'annoying'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 13: Contrast Linkers
  // ─────────────────────────────────────────────────────────────
  "b2-lez13": {
    "id": "b2-lez13",
    "num": "Lesson 13",
    "titulo": "Contrast Linkers",
    "subtitulo": "Despite, In Spite Of, Although, Even Though, Whereas & However — A Sintaxe do Contraste",
    "cena": {
      "origem": "dialogo",
      "titulo": "Boardroom Debate on Renewable Investments",
      "texto": "**CFO:** **Although** energy prices fluctuated dramatically last quarter, our overall revenue remained resilient.\n**CEO:** That is true. **Despite the economic downturn**, our European operations expanded by twelve percent.\n**CFO:** **However**, we must proceed cautiously. **In spite of having** secured low-interest credit lines, production costs are rising.\n**CEO:** Indeed. Our competitors are cutting research budgets, **whereas** we are accelerating our solar panel development program."
    },
    "fio": {
      "abertura": "Expressar oposição, concessão e ressalvas é a própria essência do pensamento crítico maduro. Em redações para exames (IELTS, TOEFL, Cambridge) e em reuniões de negócios, limitar-se a usar a conjunção *but* a cada duas frases empobrece seu discurso e soa elementar.",
      "descoberta": "Analise com lupa a arquitetura gramatical do diálogo entre o CFO e o CEO:\n1. «Although» é seguido por uma oração completa com Sujeito + Verbo («Although energy prices fluctuated...»);\n2. «Despite» é seguido diretamente por um substantivo («Despite the economic downturn»);\n3. «In spite of» é seguido por um gerúndio («In spite of having secured...»);\n4. «However» surge isolado por vírgula como advérbio conectivo;\n5. «Whereas» estabelece uma comparação paralela direta entre dois sujeitos diferentes!",
      "fecho": "A regra de ouro dos conectivos de contraste não está no significado (todos expressam 'apesar de' ou 'no entanto'), mas estritamente na **sintaxe que os sucede**."
    },
    "alerta": "O erro mais punido em exames internacionais: NUNCA diga *'despite of'*! A expressão 'in spite' exige a preposição 'of' (*in spite of*), mas a palavra 'despite' é autossuficiente e NUNCA aceita 'of' (*despite the rain*, jamais *despite of the rain*)!",
    "definicao": {
      "fenomeno": "Although it was raining, we went out (oração subordinada com verbo) · Despite the rain, we went out (substantivo imediato) · In spite of being tired, he worked (gerúndio)",
      "causa": "Por que existem tantos conectivos diferentes para a mesma ideia de 'apesar de'?",
      "conceito": "Porque o inglês diferencia conjunções subordinativas (que introduzem orações completas com sujeito e verbo: although, even though), preposições concessivas (que governam substantivos, pronomes ou gerúndios: despite, in spite of) e advérbios de transição (que conectam períodos independentes: however, nevertheless)."
    },
    "inventario": [
      "Conjunções com Oração (Sujeito + Verbo): Although, Even though (mais enfático), Though",
      "Preposições Concessivas (+ Substantivo ou Gerúndio -ing): Despite, In spite of",
      "A fórmula mágica 'the fact that': *Despite the fact that...* e *In spite of the fact that...* (permite usar oração completa com verbo!)",
      "Advérbios de Transição (com vírgula inicial): However, Nevertheless, Nonetheless",
      "Conectivos de Comparação Direta: Whereas, While (*He likes jazz, whereas she loves opera*)"
    ],
    "tabela_visual": "| Conectivo de Contraste | Categoria Gramatical | O Que Deve Seguir Imediatamente? | Exemplo Prático |\n|---|---|---|---|\n| **Although / Even though** | Conjunção Subordinativa | **Sujeito + Verbo** (Oração Completa) | * **Although** she **was** tired, she finished the report.* |\n| **Despite** | Preposição | **Substantivo** ou **Gerúndio (-ing)** | * **Despite** the **heavy rain**, we went hiking.* |\n| **In spite of** | Locução Prepositiva | **Substantivo** ou **Gerúndio (-ing)** | * **In spite of being** exhausted, he kept working.* |\n| **Despite the fact that** | Locução Concessiva Complexa | **Sujeito + Verbo** | * **Despite the fact that** he was late, he was polite.* |\n| **However** | Advérbio de Transição | Seguido de **VÍRGULA** no início da oração | *We planned early. **However,** the flight was canceled.* |\n| **Whereas / While** | Conjunção de Contraste Duplo | Contrapõe dois sujeitos distintos | *Dogs are sociable, **whereas** cats are independent.* |",
    "observacao_cards": [
      {
        "ingles": "Despite (Nunca 'despite of')",
        "traducao": "apesar de",
        "genero": "Regra Anti-Erro Fatal",
        "motivo": "'Despite' já tem força prepositiva própria: 'Despite the bad weather' (jamais 'despite of')."
      },
      {
        "ingles": "In spite of + Noun / -ING",
        "traducao": "a despeito de / apesar de",
        "genero": "Estrutura Prepositiva",
        "motivo": "Exige 'of': 'In spite of the traffic, we arrived early' / 'In spite of raining'."
      },
      {
        "ingles": "Even though vs Although",
        "traducao": "embora / mesmo que",
        "genero": "Intensidade",
        "motivo": "'Even though' é mais dramático e enfático que 'although', ambos exigem oração com verbo."
      },
      {
        "ingles": "Whereas (Contraste Paralelo)",
        "traducao": "ao passo que / enquanto",
        "genero": "Redação Acadêmica",
        "motivo": "Compara duas realidades opostas: 'London is fast-paced, whereas Oxford is tranquil'."
      }
    ],
    "tecnica": {
      "titulo": "O Algoritmo da Sintaxe Concessiva em 3 Etapas",
      "passos": [
        "1. Olhe para as palavras que vêm logo após o espaço em branco.",
        "2. Se você vê um substantivo puro (ex: 'the rain') ou um verbo com -ING (ex: 'working hard'), use DESPITE ou IN SPITE OF.",
        "3. Se você vê um sujeito explícito acompanhado de um verbo conjugado (ex: 'it was raining'), use ALTHOUGH ou EVEN THOUGH."
      ]
    },
    "teoria": "### A Teoria Aprofundada dos Conectivos de Contraste (Contrast Linkers)\n\nA articulação de ideias contrastantes é um dos critérios de avaliação mais rigorosos na competência de *Cohesion and Coherence* de exames de proficiência internacionais.\n\n#### 1. Conjunções Subordinativas: *Although*, *Even though*, *Though*\nEsses conectivos introduzem uma oração adverbial concessiva que contém obrigatoriamente um sujeito e um verbo conjugado:\n* *\"**Although** the company **invested** heavily in marketing, sales remained flat.\"*\n* *\"**Even though** he **had practiced** for months, he felt nervous before the concert.\"*\n* *Atenção com 'Though':* Na fala informal, *though* pode ser deslocado para o final da frase como advérbio: *\"The food was spicy. I liked it, **though**.\"*\n\n#### 2. Preposições de Concessão: *Despite* e *In spite of*\nAo contrário de *although*, *despite* e *in spite of* são preposições. Portanto, de acordo com as leis universais da sintaxe inglesa, preposições **só podem ser seguidas por substantivos, pronomes ou gerúndios (-ing)**:\n* Com substantivo: *\"**Despite** the freezing temperature, they went swimming in the lake.\"*\n* Com pronome: *\"I warned him about the danger. **In spite of** that, he climbed the cliff.\"*\n* Com gerúndio: *\"**Despite feeling** exhausted, she delivered an exceptional keynote address.\"*\n\n#### 3. A Estrutura de Resgate: *Despite the fact that*\nSe você deseja usar a palavra *despite*, mas sua frase possui uma oração completa com sujeito e verbo conjugado, a língua inglesa oferece a locução *the fact that* como uma 'ponte' sintática:\n* *\"**Despite the fact that** she was only nineteen years old, she won the international piano competition.\"*\n\n#### 4. Advérbios de Transição e Contraste Comparativo\n* **However / Nevertheless:** Não unem orações na mesma frase; iniciam um novo período independente e são obrigatoriamente seguidos por vírgula:\n  * *\"The proposal seemed risky. **However,** the potential return on investment was extraordinary.\"*\n* **Whereas / While:** Utilizados para colocar duas ideias, sujeitos ou dados estatísticos em contraste direto e espelhado:\n  * *\"Electric cars produce zero tailpipe emissions, **whereas** diesel vehicles emit substantial particulate matter.\"*",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português, a locução *\"apesar de\"* é altamente flexível e aceita tanto substantivos quanto orações inteiras com infinitivo pessoal:\n* *\"Apesar da chuva...\"* (substantivo)\n* *\"Apesar de estarmos cansados...\"* (infinitivo conjugado)\n* *\"Embora estivéssemos cansados...\"* (subjuntivo)\n\n**Onde o brasileiro tropeça gravemente no inglês?**\n* **Inventar o 'despite of':** Por contaminação com *\"apesar DE\"* e *\"in spite OF\"*, muitos estudantes brasileiros criam a aberração inexistente *\"despite of the rain\"*. Lembre-se: **DESPITE NUNCA TEM OF**!\n* **Usar 'despite' com oração direta:** Dizer *\"Despite it was raining\"* é um erro gramatical que custa caro em provas. Se há sujeito e verbo conjugado (*it was*), você DEVE usar **Although** ou **Even though** (*Although it was raining*). Se quiser usar *despite*, use com o substantivo (*Despite the rain*).",
    "exemplos_prc": [
      {
        "pergunta": "Did the team manage to launch the new software update on schedule?",
        "resposta": "Yes, despite facing numerous server connectivity issues during beta testing, the developers met the deadline smoothly.",
        "contexto": "Relatando o sucesso no lançamento de um projeto a despeito de obstáculos técnicos."
      },
      {
        "pergunta": "Why does the company maintain offices in Zurich even though commercial rent is astronomical?",
        "resposta": "Although operating expenses in Switzerland are extremely high, having a Zurich presence gives us immediate access to top-tier private banking clients.",
        "contexto": "Justificando uma estratégia corporativa dispendiosa com base em vantagens competitivas."
      },
      {
        "pergunta": "How do consumer habits differ between generation Z and baby boomers in your market study?",
        "resposta": "Generation Z consumers prioritize digital sustainability, whereas older demographics focus primarily on brand legacy and customer service.",
        "contexto": "Apresentando uma análise comparativa de pesquisa de mercado em uma reunião executiva."
      }
    ],
    "armadilhas": [
      {
        "erro": "Despite of the bad traffic, we arrived at the airport on time.",
        "correcao": "Despite the bad traffic (ou In spite of the bad traffic), we arrived at the airport on time.",
        "explicacao": "'Despite' nunca é seguido da preposição 'of'. Use 'despite' sozinho ou 'in spite of'."
      },
      {
        "erro": "Despite he worked very hard, he was not promoted.",
        "correcao": "Although he worked very hard, he was not promoted (ou Despite working very hard).",
        "explicacao": "'Despite' não pode introduzir uma oração completa com sujeito e verbo (he worked). Deve-se usar 'Although' ou transformar o verbo em gerúndio."
      },
      {
        "erro": "We wanted to go to the beach, although the rain was very heavy.",
        "correcao": "We wanted to go to the beach; however, the rain was very heavy (ou although it was raining heavily).",
        "explicacao": "Atenção ao posicionamento e à pontuação dos conectivos de concessão e contraste."
      }
    ],
    "coda": "Contrast linkers are the hinges of intellectual maturity: turning simple opposition into structured insight.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o conectivo adequado diante de uma oração completa com sujeito e verbo:\n\"___ the flight was delayed by four hours, the airline provided no food vouchers.\"",
        "opcoes": [
          "Although",
          "Despite",
          "In spite of",
          "However"
        ],
        "resposta": "Although",
        "explicacao": "A frase é seguida por uma oração completa com sujeito e verbo ('the flight was delayed'), exigindo a conjunção 'Although'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a preposição correta que precede um substantivo:\n\"The marathon runners completed the race ___ the sweltering desert heat.\"",
        "opcoes": [
          "despite",
          "despite of",
          "although",
          "even though"
        ],
        "resposta": "despite",
        "explicacao": "Diante do substantivo 'the sweltering desert heat', usa-se 'despite' (sem 'of')."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o conectivo de contraste comparativo entre dois países:\n\"In Norway, electric vehicles dominate market sales, ___ in many developing nations, charging infrastructure remains scarce.\"",
        "opcoes": [
          "whereas",
          "despite",
          "in spite of",
          "however"
        ],
        "resposta": "whereas",
        "explicacao": "'Whereas' é a conjunção que contrapõe diretamente duas realidades contrastantes em paralelo."
      },
      {
        "tipo": "escolha",
        "pergunta": "Assinale a opção com erro gramatical crasso:",
        "opcoes": [
          "Despite of having a map, they got lost in the forest.",
          "In spite of having a map, they got lost in the forest.",
          "Despite having a map, they got lost in the forest.",
          "Although they had a map, they got lost in the forest."
        ],
        "resposta": "Despite of having a map, they got lost in the forest.",
        "explicacao": "'Despite of' é gramaticalmente incorreto na língua inglesa."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no conectivo com gerúndio antes de revelar:\n\n\"___ (in spite of / despite) being warned about the icy roads, they decided to drive over the mountain pass.\"\n(Apesar de terem sido avisados sobre as estradas congeladas, decidiram dirigir pelo desfiladeiro.)",
        "resposta": "In spite of (ou Despite) being warned about the icy roads, they decided to drive over the mountain pass.",
        "revelacao": "In spite of (ou Despite) being warned about the icy roads, they decided to drive over the mountain pass.",
        "dica": "Ambos são válidos diante de gerúndio (being warned)",
        "explicacao": "'Despite' ou 'In spite of' governam gerúndios: 'Despite being warned'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na locução complexa com 'the fact that' antes de revelar:\n\n\"___ (despite) the fact that she had no formal political experience, she ran a brilliant campaign.\"\n(Apesar do fato de que ela não tinha experiência política formal, ela conduziu uma campanha brilhante.)",
        "resposta": "Despite the fact that she had no formal political experience, she ran a brilliant campaign.",
        "revelacao": "Despite the fact that she had no formal political experience, she ran a brilliant campaign.",
        "dica": "Despite the fact that...",
        "explicacao": "'Despite the fact that' permite conectar 'despite' a uma oração com sujeito e verbo."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no advérbio de transição seguido de vírgula antes de revelar:\n\n\"The clinical trial results were very encouraging. ___ (no entanto), further tests are necessary before public approval.\"",
        "resposta": "However, further tests are necessary before public approval.",
        "revelacao": "However, further tests are necessary before public approval.",
        "dica": "However seguido de vírgula",
        "explicacao": "No início de período independente seguido de vírgula, usa-se 'However'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Corrija a frase que usou 'despite' incorretamente com oração antes de revelar:\n\n\"Despite he was feeling sick, he attended the annual conference.\"",
        "resposta": "Although he was feeling sick, he attended the annual conference. (ou: Despite feeling sick...)",
        "revelacao": "Although he was feeling sick, he attended the annual conference. (ou: Despite feeling sick...)",
        "dica": "Substitua por Although ou mude para 'Despite feeling sick'",
        "explicacao": "Não se usa 'despite' com oração direta; substitui-se por 'Although'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a conjunção de concessão de oito letras que inicia orações com sujeito e verbo:\n\n\"___ they offered him a massive bonus, he decided to resign.\" (Embora)",
        "resposta": "Although",
        "explicacao": "A conjunção é 'Although'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que precede 'of' na locução 'in ___ of':\n\n\"In ___ of the adverse weather conditions, the rescue helicopter landed safely.\"",
        "resposta": "spite",
        "explicacao": "A expressão correta é 'in spite of'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o conectivo que compara duas realidades opostas (iniciado com 'wh'):\n\n\"Coffee consumption is rising among adults, ___ tea remains the preferred drink among seniors.\"",
        "resposta": "whereas",
        "explicacao": "O conectivo é 'whereas'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que forma o conectivo enfático 'even ___':\n\n\"He continued running even ___ his ankle was hurting terribly.\" (embora / mesmo que)",
        "resposta": "though",
        "explicacao": "A forma enfática é 'even though'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 14: Condition Linkers
  // ─────────────────────────────────────────────────────────────
  "b2-lez14": {
    "id": "b2-lez14",
    "num": "Lesson 14",
    "titulo": "Condition Linkers",
    "subtitulo": "Provided that, As long as, Unless, In case & Whether or not — Além do Simples 'If'",
    "cena": {
      "origem": "dialogo",
      "titulo": "Signing the Commercial Lease Agreement",
      "texto": "**Landlord:** We are happy to lease this retail space to your coffee brand, **provided that** you maintain proper insurance coverage at all times.\n**Tenant:** Of course. And **as long as** the building heating works reliably during the winter months, we foresee no issues.\n**Landlord:** Excellent. Please remember that pets are not permitted on the premises **unless** they are certified guide dogs.\n**Tenant:** Understood. Also, we will keep an extra fire extinguisher in the back room **in case** of an electrical emergency."
    },
    "fio": {
      "abertura": "Em níveis elementares, toda condição começa com a palavra *IF*. Mas na linguagem jurídica, contratual, diplomática e na conversação madura, depender exclusivamente de *if* empobrece as nuances de garantia, restrição e precaução. Como dizer *'contanto que'*, *'a não ser que'* ou *'por precaução de'?*",
      "descoberta": "Observe o diálogo contratual: o proprietário impõe uma garantia estrita com «provided that» (contanto que / sob a condição de que); o inquilino retribui uma salvaguarda mútua com «as long as» (enquanto / contanto que); o contrato traz uma exceção categórica com «unless» (a menos que / a não ser que); e a segurança preventiva é garantida com «in case» (caso ocorra / por precaução)!",
      "fecho": "Ao dominar esses conectivos condicionais, seus argumentos ganham o rigor de um advogado e a precisão de um negociador internacional."
    },
    "alerta": "A armadilha clássica do 'UNLESS': a palavra 'unless' já significa *'if not'* (a menos que / se não). Portanto, NUNCA coloque uma negação dentro da oração com unless! Dizer *'unless you don't study'* vira uma dupla negação e significa o oposto do que você pretendia. O correto é: *'unless you study'* (a menos que você estude = if you don't study)!",
    "definicao": {
      "fenomeno": "You will pass provided that you study (contanto que estude) · You can borrow my car as long as you drive carefully (desde que dirija com cuidado) · You will fail unless you study (a menos que estude) · Take an umbrella in case it rains (por precaução)",
      "causa": "Por que usamos conectivos condicionais alternativos em vez de apenas 'if'?",
      "conceito": "Porque cada conectivo carrega uma nuance pragmática própria: 'provided that' expressa exigência contratual indispensável; 'as long as' expressa duração e concessão amigável; 'unless' expressa a única exceção que anula a regra; e 'in case' expressa preparativo preventivo diante de um risco futuro."
    },
    "inventario": [
      "Provided that / Providing that: 'contanto que / sob a condição explícita de que' (registro contratual formal)",
      "As long as / So long as: 'desde que / contanto que' (registro dinâmico e conversacional)",
      "Unless: equivale a 'IF... NOT' (a menos que, a não ser que) — rege verbo afirmativo",
      "In case: expressa precaução prévia diante de um imprevisto (diferença crítica de 'if')",
      "Whether or not: 'quer... ou não / independentemente de' (*Whether you like it or not, we must obey the law*)"
    ],
    "tabela_visual": "| Conectivo Condicional | Significado em Português | Nuance Semântica Central | Exemplo Prático |\n|---|---|---|---|\n| **Provided (that)** | Contanto que / sob condição de | Exigência formal ou estipulação contratual | *You can stay here **provided that** you pay rent on time.* |\n| **As long as** | Desde que / contanto que | Condição favorável contínua | *You can borrow my laptop **as long as** you don't drop it.* |\n| **Unless** | A menos que / se não (*if not*) | Exceção que invalida o resultado normal | *We will miss the train **unless** we leave right now.* |\n| **In case** | Para o caso de / por precaução | Ação de precaução feita ANTES de um evento | *Take a jacket **in case** the temperature drops tonight.* |\n| **Whether or not** | Quer aconteça ou não | O resultado se mantém em qualquer hipótese | *We will proceed **whether** they agree **or not**.* |",
    "observacao_cards": [
      {
        "ingles": "Unless = If Not",
        "traducao": "a menos que / se não",
        "genero": "Regra Anti-Dupla Negação",
        "motivo": "'Unless you invite him' = If you don't invite him. Nunca use negação após unless."
      },
      {
        "ingles": "In case vs If",
        "traducao": "por precaução vs sob condição",
        "genero": "Diferença Vital de Ação",
        "motivo": "'I'll take an umbrella in case it rains' (pego antes). 'I'll open my umbrella if it rains' (só abro depois que chover)."
      },
      {
        "ingles": "Provided that (Contratual)",
        "traducao": "sob a condição de que",
        "genero": "Inglês Jurídico e Formal",
        "motivo": "Muito utilizado em acordos, licenças de software e termos de serviço corporativos."
      },
      {
        "ingles": "As long as (Desde que)",
        "traducao": "enquanto / desde que",
        "genero": "Uso Amplo e Fluente",
        "motivo": "Comum em acordos pessoais: 'You can play video games as long as your homework is finished'."
      }
    ],
    "tecnica": {
      "titulo": "O Teste de Precaução vs Condição em 3 Passos",
      "passos": [
        "1. Identifique se a ação principal é feita ANTES como precaução ou APENAS SE o evento acontecer.",
        "2. Se você compra/faz algo ANTES por segurança (ex: 'comprei seguro de viagem'), use IN CASE.",
        "3. Se a ação só acontece no momento em que a condição se concretiza, use IF ou AS LONG AS."
      ]
    },
    "teoria": "### A Teoria Aprofundada dos Conectivos Condicionais Avançados\n\nNo nível B2, a substituição estratégica da conjunção *if* por conectivos mais específicos permite calibrar com exatidão o tom da negociação, a força da obrigação e a natureza da contingência.\n\n#### 1. Garantias e Estipulações: *Provided that* e *As long as*\n* **Provided (that) / Providing (that):** É a fórmula por excelência de acordos contratuais, regras institucionais e regulamentos. A palavra *that* pode ser omitida na fala:\n  * *\"The bank will approve the business loan **provided that** you submit audited financial statements.\"*\n  * *\"You may enter the laboratory **providing that** you wear full protective clothing.\"*\n* **As long as / So long as:** Enfatiza a continuidade de uma situação favorável condicionada ao cumprimento de um acordo mútuo:\n  * *\"We can continue our collaboration **as long as** both parties maintain transparent communication.\"*\n\n#### 2. A Lógica da Exceção Única: *Unless*\n*Unless* equivale exatamente a *if... not*. É empregado para apresentar a única condição sob a qual o resultado esperado não acontecerá:\n* *Exemplo:* \"We will arrive late **unless we take** a taxi.\" (= *We will arrive late if we do not take a taxi*).\n* *Exemplo com 1st Conditional:* \"I won't attend the wedding **unless they invite** my partner.\" (= *I won't attend if they don't invite my partner*).\n\n#### 3. A Distinção Psicológica Crucial: *In case* vs *If*\nEsta é uma das diferenças mais cobradas em provas de proficiência:\n* **In case:** Indica que uma ação é executada de forma **preventiva e antecipada**, porque algo indesejado ou incerto pode acontecer no futuro:\n  * *\"I will write down his telephone number **in case** I forget it.\"* (Eu anoto o número AGORA, preventivamente, porque posso esquecer depois).\n* **If:** Indica que a ação **só será realizada se e quando** a condição ocorrer:\n  * *\"I will call his telephone number **if** I need assistance.\"* (Eu só farei a ligação no momento em que precisar).\n\n#### 4. Certeza Incondicional: *Whether or not*\nExpressa que o desfecho acontecerá invariavelmente, independentemente da vontade, preferência ou ocorrência de um fator:\n* *\"**Whether or not** it rains tomorrow, the charity marathon will proceed as scheduled.\"*\n* *\"We must make a formal decision by 5:00 PM **whether** the client replies **or not**.\"*",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português, possuímos equivalentes diretos para todas essas expressões:\n* *\"Contanto que / desde que\"* → *Provided that / As long as*\n* *\"A menos que / a não ser que\"* → *Unless*\n* *\"Para o caso de / caso\"* → *In case*\n* *\"Quer você queira quer não\"* → *Whether or not*\n\n**Onde o brasileiro tropeça no inglês?**\n* **A confusão entre 'caso' e 'in case':** No português coloquial, usamos a palavra *\"caso\"* com o mesmo valor de *\"se\"*: *\"Caso você vá, me avise\"* (= Se você for, me avise). Ao traduzir para o inglês, muitos dizem: *\"In case you go, let me know\"*. Isso soa estranho para um nativo! Em inglês, *in case* é ação preventiva prévia. Se você quer dizer simplesmente *\"se você for\"*, use **IF** (*If you go, let me know*). Guarde: *in case* = 'por precaução de'.\n* **A dupla negação com 'unless':** Em português dizemos: *\"A não ser que você **não** queira\"*. Em inglês, *unless* já traz a negação embutida; colocar *don't* após *unless* gera confusão semântica imediata.",
    "exemplos_prc": [
      {
        "pergunta": "Will the bank authorize our international money transfer today?",
        "resposta": "Yes, provided that all compliance verification documents are submitted before 2:00 PM.",
        "contexto": "Esclarecendo os requisitos formais para a liberação de uma transferência financeira bancária."
      },
      {
        "pergunta": "Should I bring some extra cash with me to the music festival?",
        "resposta": "Definitely take some cash in case the food truck card terminals lose wireless signal in the crowd.",
        "contexto": "Aconselhando uma medida preventiva inteligente diante de uma falha tecnológica comum."
      },
      {
        "pergunta": "Are we still having the team picnic in the park on Saturday?",
        "resposta": "As long as it doesn't pour with rain, yes! We have blankets and games ready for everyone.",
        "contexto": "Confirmando a realização de um piquenique condicionado a um tempo razoável."
      }
    ],
    "armadilhas": [
      {
        "erro": "I will bring an umbrella in case it will rain.",
        "correcao": "I will bring an umbrella in case it rains.",
        "explicacao": "Orações introduzidas por 'in case' seguem as regras das orações temporais/condicionais e usam o Present Simple (rains), nunca 'will'."
      },
      {
        "erro": "You won't get better unless you don't take your antibiotics.",
        "correcao": "You won't get better unless you take your antibiotics.",
        "explicacao": "'Unless' já significa 'if not' (a menos que). Adicionar 'don't' gera uma dupla negação incoerente."
      },
      {
        "erro": "In case you need anything, call me anytime.",
        "correcao": "If you need anything, call me anytime.",
        "explicacao": "Para oferecer ajuda caso surja uma necessidade, usa-se 'If you need anything'. 'In case' indicaria uma ação preventiva prévia tomada antes da necessidade."
      }
    ],
    "coda": "Language is a contract of trust; condition linkers define the boundaries where promises stand firm.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete o contrato de empréstimo de carro com a garantia correta:\n\"You can borrow my car this weekend ___ you return it with a full tank of petrol.\"",
        "opcoes": [
          "as long as",
          "unless",
          "in case",
          "whether"
        ],
        "resposta": "as long as",
        "explicacao": "'As long as' expressa a condição favorável ('desde que você o devolva com o tanque cheio')."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o conectivo de exceção única (a menos que):\n\"We cannot grant you entry to the examination hall ___ you show your student ID card.\"",
        "opcoes": [
          "unless",
          "provided that",
          "as long as",
          "in case"
        ],
        "resposta": "unless",
        "explicacao": "'Unless' expressa a condição sem a qual a entrada não é permitida ('a menos que você mostre')."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase expressa uma ação de precaução antecipada legítima?",
        "opcoes": [
          "I will take my umbrella in case it rains later.",
          "I will take my umbrella if it will rain later.",
          "I will open my umbrella in case it rains now.",
          "I take my umbrella unless it rains."
        ],
        "resposta": "I will take my umbrella in case it rains later.",
        "explicacao": "Levar o guarda-chuva preventivamente antes de sair é o uso clássico de 'in case + Present Simple'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a oração formal de termos de serviço:\n\"You may download the software for free, ___ that you use it solely for non-commercial purposes.\"",
        "opcoes": [
          "provided",
          "unless",
          "in case",
          "even if"
        ],
        "resposta": "provided",
        "explicacao": "A locução contratual formal é 'provided that' (contanto que)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no conectivo 'unless' sem dupla negação antes de revelar:\n\n\"The plants will wither and die ___ (a menos que / se não) you water them regularly.\"",
        "resposta": "The plants will wither and die unless you water them regularly.",
        "revelacao": "The plants will wither and die unless you water them regularly.",
        "dica": "Unless + verbo afirmativo (water)",
        "explicacao": "Usa-se 'unless you water them' (= if you don't water them)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na precaução com 'in case' no Present Simple antes de revelar:\n\n\"Keep this emergency medical card in your wallet ___ (para o caso de) you need urgent care.\"",
        "resposta": "Keep this emergency medical card in your wallet in case you need urgent care.",
        "revelacao": "Keep this emergency medical card in your wallet in case you need urgent care.",
        "dica": "in case you need...",
        "explicacao": "Ação preventiva diante de um risco futuro: 'in case you need'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na expressão incondicional 'quer você queira ou não' antes de revelar:\n\n\"___ (quer você goste ou não), the new tax regulations take effect on January 1st.\"",
        "resposta": "Whether you like it or not, the new tax regulations take effect on January 1st.",
        "revelacao": "Whether you like it or not, the new tax regulations take effect on January 1st.",
        "dica": "Whether you like it or not...",
        "explicacao": "A estrutura para expressar certeza incondicional é 'Whether you like it or not'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Corrija a frase que usou 'in case' no lugar de 'if' antes de revelar:\n\n\"In case you see Peter at the party tonight, please tell him I said hello.\"",
        "resposta": "If you see Peter at the party tonight, please tell him I said hello.",
        "revelacao": "If you see Peter at the party tonight, please tell him I said hello.",
        "dica": "Substitua 'In case' por 'If'",
        "explicacao": "Para condições pontuais que só ocorrem se o evento acontecer, usa-se 'If', não 'In case'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que completa a expressão contratual 'provided ___':\n\n\"You can access the VIP lounge provided ___ you present a first-class ticket.\"",
        "resposta": "that",
        "explicacao": "A locução formal completa é 'provided that'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o conectivo que equivale a 'if not' (seis letras):\n\n\"We will never finish this project on time ___ everyone cooperates.\" (a menos que)",
        "resposta": "unless",
        "explicacao": "O conectivo é 'unless'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que completa a locução 'as ___ as':\n\n\"I don't mind staying late as ___ as we take a break for dinner.\" (desde que)",
        "resposta": "long",
        "explicacao": "A locução é 'as long as'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição que forma o conectivo de precaução 'in ___':\n\n\"Take some extra cash in ___ the electronic card machines are down.\" (caso / por precaução)",
        "resposta": "case",
        "explicacao": "O conectivo de precaução é 'in case'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 15: Phrasal Verbs (Separable vs Inseparable)
  // ─────────────────────────────────────────────────────────────
  "b2-lez15": {
    "id": "b2-lez15",
    "num": "Lesson 15",
    "titulo": "Phrasal Verbs (Separable vs Inseparable)",
    "subtitulo": "A Lógica Sintática por Trás dos Verbos Preposicionais e a Regra do Pronome",
    "cena": {
      "origem": "dialogo",
      "titulo": "Organizing the Community Fundraiser",
      "texto": "**Nadia:** Can you help me **set up** the fundraising stage in the park, Sean?\n**Sean:** Sure! Where should I **put it up**?\n**Nadia:** Right over there by the oak trees. And please don't forget to **turn off** the sound system when the rehearsal finishes. Make sure you **turn it off** before 10:00 PM!\n**Sean:** Got it. And who is going to **look after** the donation boxes during the concert?\n**Nadia:** Hannah offered to **look after them**. We can always rely on her to **come up with** brilliant solutions when emergencies arise!"
    },
    "fio": {
      "abertura": "Para a grande maioria dos estudantes do mundo inteiro, os Phrasal Verbs são vistos como um pesadelo de memorização aleatória. No entanto, no nível B2, você descobre que existe uma **lógica arquitetural e sintática rigorosa** governando esses verbos. A questão mais importante não é apenas saber o que o verbo significa, mas entender **onde o objeto pode se posicionar na frase**.",
      "descoberta": "Observe atentamente o diálogo de Nadia e Sean:\n1. Quando Nadia fala do som, ela diz «turn off the sound system» (objeto substantivo depois), mas Sean logo em seguida diz «turn IT off» (com o pronome IT no meio dos dois termos);\n2. Porém, quando falam das caixas de doação com o verbo *look after*, Nadia diz «look after them» (o pronome fica OBRIGATORIAMENTE DEPOIS, nunca no meio!);\n3. E com o verbo de três palavras *come up with*, todos os termos ficam inseparavelmente colados!",
      "fecho": "Bem-vindo ao domínio dos 4 Tipos de Phrasal Verbs: a fronteira definitiva onde a sintaxe nativa deixa de ser um mistério e se torna uma engrenagem transparente."
    },
    "alerta": "A Regra do Pronome no Meio (The Pronoun Rule): se o Phrasal Verb for separável (como *turn off, pick up, fill in, throw away*) e o seu objeto for um PRONOME (*it, them, him, her, me*), você é OBRIGADO a colocar o pronome no meio! Dizer *'turn off it'* ou *'pick up them'* fere os ouvidos de qualquer nativo. O correto é sempre: **turn IT off** e **pick THEM up**!",
    "definicao": {
      "fenomeno": "Turn off the light = Turn the light off (com substantivo) · Turn IT off (com pronome, obrigatório no meio) · Look after the children = Look after them (inseparável, sempre depois)",
      "causa": "Por que alguns phrasal verbs separam sua partícula e outros não aceitam separação?",
      "conceito": "Isso depende da natureza da partícula. Verbos com partículas adverbiais transitivas admitem a separação do objeto substantivo e EXIGEM a separação se o objeto for pronome (Type 2: Separable). Verbos estritamente preposicionais mantêm a preposição inseparavelmente colada ao seu objeto (Type 3: Inseparable). Verbos com duas partículas (Type 4) são 100% inseparáveis."
    },
    "inventario": [
      "Tipo 1: Intransitivos (sem objeto, inseparáveis): wake up, break down, show up, take off (o avião decolar)",
      "Tipo 2: Transitivos Separáveis: turn on/off, pick up, give up, throw away, fill in, put off, call off",
      "A Regra do Pronome Obrigatório no Meio para o Tipo 2: *throw it away*, *call him back*, *look it up*",
      "Tipo 3: Transitivos Inseparáveis: look after, run into, come across, take after, get over (*look after them*, jamais *look them after*)",
      "Tipo 4: Verbos de Três Palavras (Two-particle phrasal verbs, sempre inseparáveis): run out of, put up with, look forward to, come up with"
    ],
    "tabela_visual": "| Categoria | Características Sintáticas | Com Substantivo | Com Pronome (it / them) | Exemplos Chave |\n|---|---|---|---|---|\n| **Tipo 1: Intransitivo** | Não possui objeto direto | *The car **broke down**.* | Não se aplica | *wake up, break down, catch on* |\n| **Tipo 2: Separável** | A partícula pode se mover | * **Turn off** the TV.*<br>* **Turn** the TV **off**.* | **OBRIGATÓRIO NO MEIO:**<br>* **Turn it off**.* (Nunca *turn off it*) | *pick up, fill out, give up, put off, write down* |\n| **Tipo 3: Inseparável** | A partícula NUNCA se separa | *She **takes after** her father.* | **SEMPRE DEPOIS:**<br>*She **takes after him**.* | *look after, run into, get over, come across* |\n| **Tipo 4: Três Palavras** | Verbo + Partícula + Preposição | *I can't **put up with** this noise.* | **SEMPRE DEPOIS:**<br>*I can't **put up with it**.* | *run out of, look forward to, come up with* |",
    "observacao_cards": [
      {
        "ingles": "The Pronoun in the Middle",
        "traducao": "pronome no meio (obrigatório)",
        "genero": "Regra Suprema do Tipo 2",
        "motivo": "Com verbos separáveis, pronomes (it, them) vão SEMPRE entre o verbo e a partícula: 'Pick it up' (nunca pick up it)."
      },
      {
        "ingles": "Look after (Tipo 3 Inseparável)",
        "traducao": "cuidar de / tomar conta",
        "genero": "Verbo Inseparável",
        "motivo": "A partícula fica presa ao verbo: 'Look after the baby' / 'Look after him' (nunca look him after)."
      },
      {
        "ingles": "Three-Word Verbs (Tipo 4)",
        "traducao": "verbos de três palavras",
        "genero": "Estrutura Fixo",
        "motivo": "Nunca separe os blocos de três palavras: 'I ran out of coffee' / 'I ran out of it'."
      },
      {
        "ingles": "Substantivos: Escolha Livre",
        "traducao": "o substantivo pode ir antes ou depois",
        "genero": "Flexibilidade do Tipo 2",
        "motivo": "Com substantivos, ambas as posições são 100% corretas: 'Turn on the lights' ou 'Turn the lights on'."
      }
    ],
    "tecnica": {
      "titulo": "O Algoritmo de Posicionamento do Objeto em 3 Passos",
      "passos": [
        "1. Identifique se o objeto é um SUBSTANTIVO (ex: 'the report') ou um PRONOME (ex: 'it').",
        "2. Se for um PRONOME e o verbo for separável (Tipo 2), coloque-o IMEDIATAMENTE NO MEIO: 'hand IT in', 'look IT up'.",
        "3. Se o verbo for preposicional (Tipo 3) ou de três palavras (Tipo 4), mantenha o pronome DEPOIS de toda a locução: 'run into HIM', 'look forward to IT'."
      ]
    },
    "teoria": "### A Teoria Aprofundada dos Phrasal Verbs (Separabilidade Sintática)\n\nCompreender phrasal verbs exige abandonar a ideia de que são palavras estáticas e encará-los como sistemas sintáticos com propriedades de mobilidade (*particle movement*).\n\n#### 1. Tipo 1: Phrasal Verbs Intransitivos\nSão verbos que não recebem objeto direto. O significado se completa no próprio verbo e na sua partícula:\n* *\"The morning alarm went off at 6:30 AM.\"*\n* *\"The airplane **took off** smoothly despite the crosswinds.\"*\n* *\"My car **broke down** on the motorway yesterday.\"*\n\n#### 2. Tipo 2: Phrasal Verbs Transitivos Separáveis (*The Core Battleground*)\nQuando o objeto é um substantivo comum ou próprio, o falante tem liberdade estilística total para posicioná-lo após a partícula ou entre o verbo e a partícula:\n* *\"Could you **turn off the lights**?\"* (Perfeito)\n* *\"Could you **turn the lights off**?\"* (Igualmente perfeito)\n\n**A Regra Sagrada do Pronome Átono:**\nQuando o objeto é substituído por um pronome objeto (*it, them, him, her, me, us*), a língua inglesa proíbe categoricamente colocar o pronome no final. O pronome DEVE ser atraído para o espaço entre o verbo e a partícula:\n* *Correto:* **Turn it off!** *(Incorreto: Turn off it!)*\n* *Correto:* **Throw them away!** *(Incorreto: Throw away them!)*\n* *Correto:* **Fill it in!** *(Incorreto: Fill in it!)*\n* *Correto:* **Wake her up!** *(Incorreto: Wake up her!)*\n\n#### 3. Tipo 3: Phrasal Verbs Transitivos Inseparáveis (Prepositional Verbs)\nNesses verbos, a partícula funciona como uma preposição pura ligada ao seu complemento. O objeto (seja substantivo ou pronome) deve vir **sempre após a preposição**:\n* *\"She **takes after** her grandmother.\"* → *\"She takes after **her**.\"* *(Jamais: she takes her after)*\n* *\"I unexpectedly **ran into** an old schoolmate.\"* → *\"I ran into **him**.\"*\n* *\"The doctor said it will take months to **get over** the illness.\"* → *\"to get over **it**.\"*\n\n#### 4. Tipo 4: Phrasal-Prepositional Verbs (Três Palavras)\nPossuem duas partículas (um advérbio e uma preposição). São sempre transitivos e **nunca admitem separação** sob hipótese alguma:\n* *\"We have completely **run out of milk**.\"* → *\"We have run out of **it**.\"*\n* *\"I will not **put up with your rudeness** any longer.\"* → *\"put up with **it**.\"*\n* *\"She **came up with an ingenious plan**.\"* → *\"came up with **it**.\"*\n* *\"We are really **looking forward to our vacation**.\"* → *\"looking forward to **it**.\"*",
    "ponte": "### Ponte Contrastiva: Português vs Inglês\n\nNo português, a grande maioria dos verbos preposicionais não permite a intercalação de palavras no meio da locução:\n* Dizemos: *\"Desligue a luz\"* ou *\"Desligue-a\"* (o pronome vem colado ao verbo por próclise ou ênclise, nunca após a preposição).\n* Em português não temos uma partícula solta como o 'off' ou 'up' que possa navegar na frase.\n\n**Onde o brasileiro tropeça gravemente no inglês?**\n* **A armadilha do pronome no final:** Por influência do português (*\"Desligue isso\"*), o brasileiro tende a traduzir literalmente palavra por palavra e diz: *\"Turn off it\"*, *\"Pick up it\"*, *\"Give back it\"*. Essa é uma das marcas registradas mais fortes de fala não-nativa. Para soar fluente e natural em exames e na conversação cotidiana, treine o reflexo motor de 'sanduíche': coloque SEMPRE o pronome no meio: **Turn it off! Pick it up! Give it back!**",
    "exemplos_prc": [
      {
        "pergunta": "Where should I throw away these old financial documents and receipts?",
        "resposta": "Don't just throw them away in the regular recycling bin! We need to shred them first to protect client confidentiality.",
        "contexto": "Instruindo um colega de trabalho sobre o descarte seguro de documentos corporativos confidenciais."
      },
      {
        "pergunta": "Did you manage to look up the technical definition of that medical term?",
        "resposta": "Yes, I looked it up in the Oxford Medical Dictionary, and it refers to an autoimmune condition.",
        "contexto": "Confirmando que realizou a pesquisa e consulta de uma definição em uma enciclopédia confiável."
      },
      {
        "pergunta": "How are you dealing with the loud construction noise outside your apartment building?",
        "resposta": "I honestly can't put up with it much longer; I am planning to work from a quiet library until they finish.",
        "contexto": "Expressando tolerância no limite em relação a um incômodo acústico prolongado."
      }
    ],
    "armadilhas": [
      {
        "erro": "Please pick up it from the floor.",
        "correcao": "Please pick it up from the floor.",
        "explicacao": "Com verbos separáveis, quando o objeto é um pronome ('it'), ele DEVE ficar obrigatoriamente no meio: 'pick it up'."
      },
      {
        "erro": "My grandmother is sick, so I need to look her after.",
        "correcao": "My grandmother is sick, so I need to look after her.",
        "explicacao": "'Look after' é um phrasal verb inseparável (Tipo 3). O pronome deve vir sempre depois: 'look after her'."
      },
      {
        "erro": "We have run out the printer paper of.",
        "correcao": "We have run out of the printer paper.",
        "explicacao": "Verbos de três palavras (Tipo 4) como 'run out of' são inseparáveis e nunca podem ter suas partículas dispersas."
      }
    ],
    "coda": "Phrasal verbs are not random chaos; learn their structural dance, and words will click into place like clockwork.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Qual alternativa posiciona o pronome objeto com o verbo separável 'turn off' de forma CORRETA?",
        "opcoes": [
          "Please turn it off before leaving the office.",
          "Please turn off it before leaving the office.",
          "Please it turn off before leaving the office.",
          "Please turn off them before leaving the office."
        ],
        "resposta": "Please turn it off before leaving the office.",
        "explicacao": "Com verbos separáveis, o pronome objeto ('it') deve vir obrigatoriamente no meio: 'turn it off'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o verbo inseparável 'look after' (cuidar de) e o pronome 'them':\n\"Who will feed the cats while we are on holiday? Will Sarah ___?\"",
        "opcoes": [
          "look after them",
          "look them after",
          "look after it",
          "look they after"
        ],
        "resposta": "look after them",
        "explicacao": "'Look after' é inseparável, logo o pronome deve vir sempre no final: 'look after them'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase com verbo de três palavras (Tipo 4) está com a ordem correta?",
        "opcoes": [
          "I am really looking forward to the international design conference.",
          "I am really looking the conference forward to.",
          "I am really looking forward the conference to.",
          "I am really looking to forward the conference."
        ],
        "resposta": "I am really looking forward to the international design conference.",
        "explicacao": "Verbos de três palavras são completamente inseparáveis: 'looking forward to + objeto'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Assinale a opção com o uso gramaticalmente INCORRETO:",
        "opcoes": [
          "Here is the registration form; please fill out it immediately.",
          "Here is the registration form; please fill it out immediately.",
          "Here is the registration form; please fill out the form immediately.",
          "Here is the registration form; please fill the form out immediately."
        ],
        "resposta": "Here is the registration form; please fill out it immediately.",
        "explicacao": "'Fill out it' é incorreto; a regra do pronome exige 'fill it out'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no posicionamento do pronome 'it' com 'give up' antes de revelar:\n\n\"Smoking is terrible for your health. You should ___ (give up / it) as soon as possible.\"",
        "resposta": "Smoking is terrible for your health. You should give it up as soon as possible.",
        "revelacao": "Smoking is terrible for your health. You should give it up as soon as possible.",
        "dica": "O pronome 'it' deve vir no meio (give it up)",
        "explicacao": "'Give up' é separável e o pronome deve vir no meio: 'give it up'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no verbo inseparável 'run into' (encontrar por acaso) com 'him' antes de revelar:\n\n\"I haven't seen Daniel for months, but yesterday I ___ (run into / him) at the supermarket.\"",
        "resposta": "I haven't seen Daniel for months, but yesterday I ran into him at the supermarket.",
        "revelacao": "I haven't seen Daniel for months, but yesterday I ran into him at the supermarket.",
        "dica": "Passado de run (ran) + into + him (inseparável)",
        "explicacao": "'Run into' é inseparável: 'ran into him'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no verbo de três palavras 'put up with' (tolerar) antes de revelar:\n\n\"The tenant told the landlord: 'I refuse to ___ (put up with / this constant noise) any longer!'\"",
        "resposta": "The tenant told the landlord: 'I refuse to put up with this constant noise any longer!'",
        "revelacao": "The tenant told the landlord: 'I refuse to put up with this constant noise any longer!'",
        "dica": "Mantenha as três palavras juntas: put up with",
        "explicacao": "Verbos de três palavras são inseparáveis: 'put up with this constant noise'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Corrija o erro do pronome na frase antes de revelar:\n\n\"If you don't know what that word means, look up it in the dictionary.\"",
        "resposta": "If you don't know what that word means, look it up in the dictionary.",
        "revelacao": "If you don't know what that word means, look it up in the dictionary.",
        "dica": "Coloque 'it' entre 'look' e 'up'",
        "explicacao": "O pronome deve vir no meio: 'look it up'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a partícula que completa o phrasal verb separável 'desligar':\n\n\"Before you go to sleep, remember to turn the computer ___.\" (desligar)",
        "resposta": "off",
        "explicacao": "A partícula é 'off' (turn off)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome objeto de 'the keys' que deve ser inserido no meio:\n\n\"I found your car keys on the floor and picked ___ up for you.\" (elas / as chaves)",
        "resposta": "them",
        "explicacao": "O pronome plural para keys é 'them' (picked them up)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição que completa o verbo 'cuidar de':\n\n\"Can you look ___ my dog while I am on vacation next weekend?\"",
        "resposta": "after",
        "explicacao": "O phrasal verb é 'look after' (cuidar de)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição que completa a expressão 'ficar sem':\n\n\"We have run out ___ printer ink; we need to buy a new cartridge.\" (de)",
        "resposta": "of",
        "explicacao": "A locução é 'run out of' (ficar sem estoque de algo)."
      }
    ]
  }
};

console.log('Aplicando Onda 6 — Parte 3 (Lições B2.11 a B2.15)...');

for (const [id, lessonData] of Object.entries(wave6Part3Lessons)) {
  for (const mod of data.moduli) {
    const idx = mod.lezioni.findIndex(l => l.id === id);
    if (idx !== -1) {
      mod.lezioni[idx] = lessonData;
      console.log(`✓ Lição ${id} (${lessonData.titulo}) enriquecida com sucesso!`);
    }
  }
}

fs.writeFileSync(grammarPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Onda 6 — Parte 3 gravada com sucesso em data/grammar.json!');
