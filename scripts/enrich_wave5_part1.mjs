import fs from 'fs';

const grammarPath = 'data/grammar.json';
const data = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));

// Onda 5 — Parte 1: Lições B1.1 a B1.5 (Tempos Perfeitos & Condicionais)
const wave5Part1Lessons = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 1: Present Perfect vs Past Simple
  // ─────────────────────────────────────────────────────────────
  "b1-lez1": {
    "id": "b1-lez1",
    "num": "Lesson 1",
    "titulo": "Present Perfect vs Past Simple",
    "subtitulo": "O Grande Divisor de Águas — Tempo Específico vs Relevância Presente",
    "cena": {
      "origem": "dialogo",
      "titulo": "Coffee Break at the London Office",
      "texto": "**Liam:** Have you ever visited Japan, Sofia?\n**Sofia:** Yes, I have! I went to Tokyo two years ago for a design conference. It was fascinating.\n**Liam:** That sounds incredible. Have you finished the presentation for our meeting with the Tokyo team today?\n**Sofia:** Yes, I have just emailed the final slides to everyone. I sent them five minutes ago."
    },
    "fio": {
      "abertura": "Bem-vindo ao nível B1! Este é o divisor de águas mais famoso e crucial de toda a língua inglesa. É aqui que o aluno básico, que apenas traduz, se transforma no falante intermediário, que compreende a psicologia do tempo na mente nativa.",
      "descoberta": "Repare na precisão cirúrgica de Sofia: quando Liam perguntou sobre experiência de vida geral, usou «Have you ever visited?». Sofia respondeu que sim no Present Perfect, mas no segundo em que mencionou a data («two years ago»), mudou instantaneamente para o Past Simple: «I went to Tokyo». E no final: «I have just emailed» (ação relevante com impacto agora) vs «I sent them five minutes ago» (tempo fechado com ago)!",
      "fecho": "Agora você desvendou a regra suprema: disse QUANDO aconteceu no passado? Use Past Simple. Falou de experiência de vida ou o resultado ecoa no presente? Use Present Perfect."
    },
    "alerta": "O erro mais punido em exames de proficiência (IELTS/Cambridge) e em entrevistas de emprego é misturar datas passadas com Present Perfect: dizer *'I have seen him yesterday'* ou *'I have graduated in 2020'* dói nos ouvidos de um nativo. Datas fechadas exigem Past Simple!",
    "definicao": {
      "fenomeno": "I lost my keys (aconteceu no passado) vs I have lost my keys (estou sem elas agora mesmo) · I lived in Paris in 2018 (não moro mais lá) vs I have lived in Paris for 5 years (ainda moro lá)",
      "causa": "Por que usamos dois tempos verbais diferentes para ações que já aconteceram?",
      "conceito": "O Past Simple ancora o evento em um período de tempo já encerrado e desconectado do presente (*closed time frame*). O Present Perfect constrói uma ponte entre o passado e o presente: importa a experiência adquirida, o resultado visível agora ou um período de tempo ainda aberto (*open time frame*)."
    },
    "inventario": [
      "A Regra da Ancoragem Temporal: marcadores de tempo fechado (yesterday, last year, in 2015, two hours ago, when I was young) exigem SEMPRE Past Simple",
      "A Regra da Relevância Presente: marcadores de tempo aberto e experiência (ever, never, already, yet, just, so far, recently) exigem Present Perfect",
      "A distinção 'I lost' (fato histórico) vs 'I have lost' (estou trancado do lado de fora neste momento)",
      "A distinção 'been to' (foi e já voltou) vs 'gone to' (foi e ainda está lá)",
      "O uso com 'for' e 'since': Past Simple com 'for' (duração encerrada no passado) vs Present Perfect com 'for/since' (duração que continua ativa)"
    ],
    "tabela_visual": "| Critério | Past Simple (Tempo Fechado) | Present Perfect (Conexão com o Presente) |\n|---|---|---|\n| **Quando aconteceu?** | Tempo específico e finalizado explicitado | Tempo não mencionado, indeterminado ou recente |\n| **Marcadores Típicos** | *yesterday, last night, in 2010, ago, when...* | *ever, never, already, yet, just, recently, so far* |\n| **Estrutura** | Sujeito + Verbo no Passado (worked, went) | Sujeito + HAVE/HAS + Particípio Passado (gone, seen) |\n| **Status da Ação** | 100% no passado, sem impacto direto agora | O resultado ou a experiência ecoa no presente |\n| **Exemplo de Chaves** | *I **lost** my keys yesterday, but I found them.* | *I **have lost** my keys! Can you help me look?* |\n| **Exemplo com 'For'** | *He **lived** in Rome for 3 years.* (Não mora mais) | *He **has lived** in Rome for 3 years.* (Ainda mora lá) |",
    "observacao_cards": [
      {
        "ingles": "Yesterday / In 2020 / Ago (Past Simple)",
        "traducao": "ontem / em 2020 / atrás (tempo fechado)",
        "genero": "Gatilho de Passado Simples",
        "motivo": "Mencionou data ou 'ago'? O verbo DEVE ir para o Past Simple: 'I saw him yesterday' (nunca I have seen)."
      },
      {
        "ingles": "Ever / Never (Present Perfect)",
        "traducao": "alguma vez na vida / nunca",
        "genero": "Experiência de Vida",
        "motivo": "Pergunta sobre a bagagem de vida até o presente: 'Have you ever eaten sushi?' / 'I have never been to India'."
      },
      {
        "ingles": "Been to vs Gone to",
        "traducao": "esteve em (já voltou) vs foi para (ainda lá)",
        "genero": "Diferença Crítica",
        "motivo": "'She has been to Italy' (ela conhece a Itália e voltou). 'She has gone to Italy' (ela está na Itália agora)."
      },
      {
        "ingles": "Just / Already / Yet",
        "traducao": "acabou de / já / ainda, já (perguntas)",
        "genero": "Ações Recentes",
        "motivo": "Present Perfect obrigatório: 'I have just arrived' / 'I haven't finished yet'."
      }
    ],
    "tecnica": "O Teste do Relógio e do Calendário em 3 passos:\n\n**Passo 1** — Há na frase palavras como *yesterday, last week, in 1999, two days ago, when I was a child*?\n→ Se houver qualquer data ou momento passado específico, use SEM HESITAR o **Past Simple** (*I met her in 2019*).\n\n**Passo 2** — A frase tem palavras como *already, yet, just, ever, never, so far, this week* (período não terminado)?\n→ Use **Present Perfect** (*I have already eaten*).\n\n**Passo 3** — Não há marcador de tempo? Pergunte-se:\n- O resultado importa para o que está acontecendo agora? → **Present Perfect** (*I've broken my arm — veja o gesso!*).\n- É apenas um relato de história concluída? → **Past Simple** (*Shakespeare wrote Hamlet*).",
    "teoria": "### Tratado Teórico: A Dialética entre Aspecto e Tempo Gramatical\n\nA incompreensão do Present Perfect pelo falante de português decorre do fato de que o português é uma língua predominantemente orientada para o **tempo** (*tense-prominent*), enquanto o sistema verbal inglês combina rigorosamente **tempo** e **aspecto** (*aspect-prominent*).\n\n#### 1. A Natureza do Present Perfect\nO Present Perfect NÃO é um tempo passado; ele é gramaticalmente um **tempo presente de aspecto perfeito**. O auxiliar *have/has* está no presente e atesta o estado atual do sujeito resultante de ações passadas:\n- *I have cleaned my room.* = Meu quarto encontra-se limpo neste instante por causa da minha ação anterior.\n- *She has written three books.* = Ela é autora de três livros (e continua viva, podendo escrever o quarto).\n- Compare: *Agatha Christie **wrote** 66 detective novels.* (Past Simple obrigatório, pois ela já faleceu e sua produção está permanentemente encerrada).\n\n#### 2. Períodos de Tempo Abertos vs Fechados\n- **Tempo Aberto (Present Perfect):** *today, this morning* (se ainda for de manhã), *this month, this year, in my life*:\n  - *I have had two coffees **this morning**.* (Ainda é manhã; posso tomar mais um).\n- **Tempo Fechado (Past Simple):** *this morning* (se já for à tarde ou noite), *yesterday, last month*:\n  - *I had two coffees **this morning**.* (Falado às 15h; a manhã acabou).\n\n#### 3. Os Particípios Irregulares Críticos\nPara dominar este nível, o particípio passado (*past participle*) deve estar na ponta da língua:\n- *see → saw → **seen***\n- *do → did → **done***\n- *go → went → **gone / been***\n- *write → wrote → **written***\n- *break → broke → **broken***\n- *choose → chose → **chosen***",
    "ponte": "Em português, usamos o pretérito perfeito simples tanto para 'Comi ontem' quanto para 'Já comi'. Não temos um tempo verbal idêntico ao Present Perfect.\n\nPor isso, o brasileiro tende a cometer dois erros simétricos:\n1. Usar Past Simple onde deveria ser Present Perfect: dizer *'I already ate'* (aceito no inglês americano informal, mas *I have already eaten* é o padrão mundial culto).\n2. O pior de todos: traduzir o 'tenho feito' do português: 'Eu tenho trabalhado muito' soa como hábito recente, mas no inglês *I have worked* expressa conclusão de experiência, e 'trabalho aqui há 5 anos' se traduz como **I have worked here for 5 years**, NUNCA *I work here for 5 years*!",
    "exemplos_prc": [
      {
        "oracao": "She lived in London for two years, and then she moved to Berlin.",
        "pergunta": "Por que 'lived' e 'moved' estão ambos no Past Simple?",
        "resposta": "Porque a moradia em Londres e a mudança para Berlim são fatos completamente encerrados no passado.",
        "conclusao": "lived / moved = morou / mudou-se (ações concluídas)."
      },
      {
        "oracao": "She has lived in London for two years and loves the city.",
        "pergunta": "O que a forma 'has lived' nos informa sobre o presente dela?",
        "resposta": "Informa que ela se mudou há dois anos e CONTINUA morando em Londres hoje.",
        "conclusao": "has lived = mora / tem morado (ação ainda ativa)."
      },
      {
        "oracao": "Did you see the latest movie directed by Christopher Nolan yesterday?",
        "pergunta": "Por que foi usado 'Did you see' em vez de 'Have you seen'?",
        "resposta": "A presença da palavra 'yesterday' (ontem = tempo fechado) obriga o uso do Past Simple.",
        "conclusao": "Did you see... yesterday = Você assistiu... ontem?"
      },
      {
        "oracao": "I can't open my apartment door because I have lost my keys.",
        "pergunta": "Por que 'have lost' foi usado e não 'lost'?",
        "resposta": "Porque o foco principal é a consequência imediata no presente: não conseguir abrir a porta agora.",
        "conclusao": "have lost = perdi (e estou sem elas agora)."
      }
    ],
    "armadilhas": [
      {
        "errado": "I have arrived in New York yesterday.",
        "certo": "I arrived in New York yesterday.",
        "motivo": "Datas e momentos fechados do passado como 'yesterday' proíbem o uso do Present Perfect."
      },
      {
        "errado": "I live in this apartment since 2018.",
        "certo": "I have lived in this apartment since 2018.",
        "motivo": "Ações iniciadas no passado que continuam no presente com 'since' exigem Present Perfect."
      },
      {
        "errado": "Where have you gone last night?",
        "certo": "Where did you go last night?",
        "motivo": "'Last night' é tempo finalizado no passado, exigindo o auxiliar 'did'."
      },
      {
        "errado": "She has went to the supermarket.",
        "certo": "She has gone to the supermarket. (ou: has been)",
        "motivo": "Após have/has usa-se o particípio passado (gone), nunca a forma do passado simples (went)."
      }
    ],
    "coda": "Disse QUANDO no passado (yesterday, ago, in 2010)? Use Past Simple. Não disse quando ou a ação reverbera agora? Use Present Perfect!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o tempo verbal correto:\n\n\"We ___ to Rome three years ago for our anniversary.\"",
        "opcoes": ["went", "have gone", "have been", "were going"],
        "resposta": 0,
        "explicacao": "'Three years ago' é tempo específico e fechado no passado, exigindo Past Simple (went)."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete para experiência de vida geral:\n\n\"___ you ever ___ a famous Hollywood celebrity in person?\"",
        "opcoes": [
          "Have / met",
          "Did / meet",
          "Have / meet",
          "Did / met"
        ],
        "resposta": 0,
        "explicacao": "Perguntas com 'ever' sobre experiências de vida usam Present Perfect: 'Have you ever met'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o resultado relevante no presente:\n\n\"Look at Sarah! She ___ her ankle, so she can't play tennis today.\"",
        "opcoes": ["has sprained", "sprained yesterday", "is sprain", "had sprain"],
        "resposta": 0,
        "explicacao": "O resultado evidente no presente (não poder jogar hoje) exige Present Perfect: 'has sprained'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual das frases está gramaticalmente PERFEITA?",
        "opcoes": [
          "I have lived in this city since 2015.",
          "I live in this city since 2015.",
          "I have lived in this city in 2015 ago.",
          "I lived in this city since 2015 until now."
        ],
        "resposta": 0,
        "explicacao": "Ações que continuam no presente com 'since' exigem Present Perfect: 'have lived... since 2015'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no tempo correto antes de revelar:\n\n\"Shakespeare ___ many famous plays, including Hamlet and Macbeth.\"\n(Shakespeare escreveu muitas peças famosas...)",
        "resposta": "Shakespeare wrote many famous plays, including Hamlet and Macbeth.",
        "revelacao": "Shakespeare wrote many famous plays, including Hamlet and Macbeth.",
        "dica": "Shakespeare já faleceu (período de vida encerrado)",
        "explicacao": "A vida do autor terminou no passado histórico, logo usa-se Past Simple: 'wrote'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na ação que continua antes de revelar:\n\n\"They ___ married for twenty-five years and are still very happy.\"\n(Eles estão casados há vinte e cinco anos...)",
        "resposta": "They have been married for twenty-five years and are still very happy.",
        "revelacao": "They have been married for twenty-five years and are still very happy.",
        "dica": "Ainda estão casados hoje",
        "explicacao": "Casamento que continua até o presente exige Present Perfect: 'have been married'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na pergunta com momento específico antes de revelar:\n\n\"What time ___ you ___ home last night?\"\n(A que horas você chegou em casa ontem à noite?)",
        "resposta": "What time did you arrive home last night?",
        "revelacao": "What time did you arrive home last night?",
        "dica": "Last night = tempo fechado (auxiliar did)",
        "explicacao": "'Last night' exige pergunta no Past Simple com 'did you arrive'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na ação recém-concluída antes de revelar:\n\n\"I am not hungry because I ___ just ___ a delicious sandwich.\"\n(Não estou com fome porque acabei de comer um sanduíche delicioso.)",
        "resposta": "I am not hungry because I have just eaten a delicious sandwich.",
        "revelacao": "I am not hungry because I have just eaten a delicious sandwich.",
        "dica": "Just = ação recém-concluída (Present Perfect)",
        "explicacao": "'Just' posiciona-se entre have e o particípio: 'have just eaten'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma verbal correta do verbo 'see' para esta oração com 'yesterday':\n\n\"I ___ my doctor yesterday morning for an annual check-up.\"",
        "resposta": "saw",
        "explicacao": "Yesterday exige Past Simple: 'saw'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o particípio correto de 'write' para o Present Perfect:\n\n\"She has ___ three bestselling novels so far.\"",
        "resposta": "written",
        "explicacao": "O particípio passado de write é 'written'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o verbo auxiliar no presente para 'He' com Present Perfect:\n\n\"He ___ worked at this technology company for over ten years.\"",
        "resposta": "has",
        "explicacao": "3ª pessoa do singular usa 'has'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o auxiliar de pergunta no passado simples:\n\n\"When ___ you buy your current laptop?\"",
        "resposta": "did",
        "explicacao": "Perguntas de momento passado com 'When' usam o auxiliar 'did'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 2: Present Perfect Continuous
  // ─────────────────────────────────────────────────────────────
  "b1-lez2": {
    "id": "b1-lez2",
    "num": "Lesson 2",
    "titulo": "Present Perfect Continuous",
    "subtitulo": "Have Been Doing — Duração, Processo e Efeitos Visíveis",
    "cena": {
      "origem": "dialogo",
      "titulo": "Meeting After a Long Day at the Lab",
      "texto": "**Emma:** Lucas, you look completely exhausted! What have you been doing all afternoon?\n**Lucas:** I have been running laboratory experiments since 8:00 AM without any break.\n**Emma:** Wow! Has your team been assisting you?\n**Lucas:** Yes, they have been compiling the data. Look, my hands are shaking because I have been typing for five hours straight!"
    },
    "fio": {
      "abertura": "Você já viu alguém chegar suado de uma corrida, ou com tinta nas mãos, ou com olhos cansados de estudar? Para expressar uma atividade que se estendeu ao longo do tempo e cujas marcas físicas estão visíveis agora, o inglês criou o Present Perfect Continuous.",
      "descoberta": "Repare na expressão de Emma: «What have you been doing?» e na resposta de Lucas: «I have been running experiments», «they have been compiling», «I have been typing for five hours». Três peças trabalham juntas: HAVE/HAS + BEEN + Verbo com -ING!",
      "fecho": "Agora você domina o tempo do esforço e da continuidade. Use-o para enfatizar a duração de um processo e o cansaço ou resultado que você carrega agora."
    },
    "alerta": "Muitos estudantes confundem o Present Perfect Simple (*I have painted the room* = o quarto está pronto, terminei!) com o Present Perfect Continuous (*I have been painting the room* = estou com tinta na roupa, a atividade estava em andamento). Essa distinção entre resultado final vs processo é vital no nível intermediário.",
    "definicao": {
      "fenomeno": "It has been raining for two hours (a rua está molhada) · I have been learning English since January · What have you been doing?",
      "causa": "Por que usamos três verbos juntos ('have' + 'been' + 'learning')?",
      "conceito": "O Present Perfect Continuous funde o aspecto perfeito (*have been* = conexão do passado ao presente) com o aspecto progressivo (*-ing* = duração e continuidade da ação). O foco não é se a ação terminou, mas sim a energia e o tempo contínuo despendidos na atividade."
    },
    "inventario": [
      "A fórmula de três engrenagens: Sujeito + HAVE/HAS + BEEN + Verbo-ING",
      "As contrações orais padrão: I've been working, He's been studying, We've been waiting",
      "Os dois usos capitais: 1) Ação contínua iniciada no passado que continua agora; 2) Ação recém-interrompida com evidência física presente",
      "Os conectores de duração temporal: FOR (duração: for two hours, for three days) e SINCE (ponto de partida: since 9 AM, since Monday)",
      "A restrição dos Stative Verbs: verbos de estado (know, like, understand) NÃO aceitam forma contínua (diga *I have known him for years*, nunca *I have been knowing*)"
    ],
    "tabela_visual": "| Dimensão | Present Perfect Simple | Present Perfect Continuous |\n|---|---|---|\n| **Foco Principal** | **Resultado concluído** (*O que foi feito / Quantos?*) | **Duração do processo** (*Por quanto tempo? / Atividade recente*) |\n| **Estrutura** | Sujeito + have/has + Particípio Passado | Sujeito + have/has + **been** + Verbo-**ING** |\n| **Exemplo de Pintura** | *I **have painted** the ceiling.* (O teto está pronto) | *I **have been painting** the ceiling.* (Veja a tinta na minha mão) |\n| **Exemplo de Leitura** | *She **has read** 50 pages today.* (Contagem de páginas) | *She **has been reading** all afternoon.* (Foco na dedicação de tempo) |\n| **Evidência Presente** | *The car is clean; I **have washed** it.* | *My clothes are wet; I **have been washing** the car.* |\n| **Verbos de Estado** | Obrigatório: *I **have known** him since 2010.* | ❌ Proibido: *I have been knowing him.* |",
    "observacao_cards": [
      {
        "ingles": "I have been working / I've been working",
        "traducao": "Eu tenho trabalhado / venho trabalhando / estou trabalhando (há X tempo)",
        "genero": "1ª Pessoa Contínua",
        "motivo": "Mostra esforço contínuo: 'I've been working on this code all morning'."
      },
      {
        "ingles": "He has been waiting / He's been waiting",
        "traducao": "Ele está esperando (há X tempo)",
        "genero": "3ª Pessoa Contínua",
        "motivo": "Usa 'has been': 'He's been waiting at the bus stop for forty minutes'."
      },
      {
        "ingles": "Since vs For",
        "traducao": "desde (ponto de início) vs por/há (duração)",
        "genero": "Marcadores Temporais",
        "motivo": "Since 2015 / Since 8 AM (ponto no tempo). For 10 years / For 3 hours (quantidade de tempo)."
      },
      {
        "ingles": "Why are your clothes dirty?",
        "traducao": "Por que suas roupas estão sujas?",
        "genero": "Evidência Física",
        "motivo": "Gatilho clássico de Continuous: 'Because I have been repairing my bicycle'."
      }
    ],
    "tecnica": "Como escolher entre Simple e Continuous em 3 passos:\n\n**Passo 1** — A frase tem quantidade de itens ou vezes completadas (*how many, three times, two books*)?\n→ Foco no resultado numérico = **Present Perfect Simple** (*I have written three emails*).\n\n**Passo 2** — A pergunta é 'Por quanto tempo?' (*how long*) ou o foco é o cansaço/duração (*all day, for hours*)?\n→ Foco na duração = **Present Perfect Continuous** (*I have been writing emails all morning*).\n\n**Passo 3** — O verbo é de estado (*know, like, believe, belong*)?\n→ Verbos de estado REJEITAM o -ing: use **Present Perfect Simple** (*I have known her for ten years*).",
    "teoria": "### Tratado Teórico: A Gramática da Continuidade e Prova Presente\n\nEm semântica de eventos (*event semantics*), o Present Perfect Continuous expressa atividades télicas em andamento ou atélicas continuadas:\n\n#### 1. Atividades Temporais Contínuas (*Durative Events*)\nQuando uma atividade começou no passado e ainda não foi interrompida no momento da fala:\n- *The baby **has been sleeping** for three hours.* (O bebê continua dormindo agora).\n- *We **have been living** in this street since 2018.* (Ainda moramos aqui).\n\n#### 2. Efeitos Consecutivos Visíveis no Presente (*Present Evidentials*)\nMesmo que a ação tenha acabado alguns minutos antes, a evidência sensorial imediata no falante exige o aspecto contínuo:\n- *You are out of breath! **Have you been running**?* (Você está sem fôlego! Estava correndo?).\n- *The ground is wet. It **has been raining**.* (O chão está encharcado; estava chovendo até há pouco).\n\n#### 3. Forma Interrogativa e Negativa\n- Pergunta: **Have/Has** + Sujeito + **been** + Verbo-**ing**?\n  - *How long **have you been waiting** for the train?*\n- Negativa: Sujeito + **haven't/hasn't** + **been** + Verbo-**ing**:\n  - *She **hasn't been feeling** well lately.*",
    "ponte": "Em português, costumamos traduzir essa estrutura de três formas diferentes:\n1. Pelo presente simples com 'há': 'Moro aqui há cinco anos' → **I have been living here for five years**.\n2. Pelo gerúndio composto: 'Tenho estudado muito ultimamente' → **I have been studying hard lately**.\n3. Pelo imperfeito: 'Estava chovendo' (vendo a rua molhada) → **It has been raining**.\n\n⚠️ O grande erro do brasileiro: dizer *'I am working here for 5 years'* (usar o Present Continuous comum com 'for'). Isso é gramaticalmente incorreto em inglês porque o Present Continuous comum não consegue olhar para trás no tempo!",
    "exemplos_prc": [
      {
        "oracao": "How long have you been studying English at this academy?",
        "pergunta": "Qual é a intenção da pergunta com 'How long have you been studying'?",
        "resposta": "Indagar a duração contínua de um processo de aprendizado que começou no passado e segue vivo.",
        "conclusao": "How long have you been studying = Há quanto tempo você estuda / vem estudando?"
      },
      {
        "oracao": "His eyes are red and tired because he has been working on his laptop all night.",
        "pergunta": "Por que o Continuous foi acionado pela visão dos olhos vermelhos?",
        "resposta": "Porque a evidência física no presente (olhos vermelhos) é consequência direta da atividade contínua recente.",
        "conclusao": "has been working = esteve trabalhando / passou a noite trabalhando."
      },
      {
        "oracao": "It has been snowing heavily since early this morning.",
        "pergunta": "O que 'has been snowing since' nos diz sobre o clima?",
        "resposta": "Começou a nevar cedo de manhã e continua nevando sem parar no momento presente.",
        "conclusao": "has been snowing since = tem nevado / está nevando desde..."
      },
      {
        "oracao": "They haven't been practicing enough for the music festival.",
        "pergunta": "Como foi construída a negação nesta frase?",
        "resposta": "Auxiliar haven't + sido (been) + verbo principal com -ing (practicing).",
        "conclusao": "haven't been practicing = não têm praticado."
      }
    ],
    "armadilhas": [
      {
        "errado": "I am waiting for you for two hours!",
        "certo": "I have been waiting for you for two hours!",
        "motivo": "Expressões de duração de tempo (for two hours) exigem Present Perfect Continuous, nunca o Present Continuous comum."
      },
      {
        "errado": "I have been knowing Sarah since high school.",
        "certo": "I have known Sarah since high school.",
        "motivo": "O verbo 'know' é de estado mental e não aceita -ing: usa-se Present Perfect Simple."
      },
      {
        "errado": "She has been written three letters this morning.",
        "certo": "She has written three letters this morning.",
        "motivo": "Contagem de itens concluídos (three letters) exige Present Perfect Simple, não Continuous."
      },
      {
        "errado": "How long do you study English?",
        "certo": "How long have you been studying English?",
        "motivo": "Para perguntar a duração de uma atividade até o presente, use 'How long have you been + V-ing'."
      }
    ],
    "coda": "Foco na duração, no cansaço e no tempo que passou: HAVE/HAS + BEEN + Verbo com -ING!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o Present Perfect Continuous correto:\n\n\"Look at the garden! It ___ for over four hours.\"",
        "opcoes": ["has been raining", "is raining", "has rained", "was raining"],
        "resposta": 0,
        "explicacao": "Duração contínua com 'for over four hours' exige 'has been raining'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual é a pergunta correta para saber a duração dos estudos de alguém?",
        "opcoes": [
          "How long have you been studying medicine?",
          "How long are you studying medicine?",
          "How long do you study medicine?",
          "How long have you study medicine?"
        ],
        "resposta": 0,
        "explicacao": "A pergunta padrão de duração até o presente é 'How long have you been studying...?'"
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a preposição correta de ponto de partida:\n\n\"Lucas has been playing tennis ___ he was seven years old.\"",
        "opcoes": ["since", "for", "during", "ago"],
        "resposta": 0,
        "explicacao": "Ponto de partida no tempo passado exige 'since'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Por que esta frase é um ERRO: *\"I have been having this car for five years\"*?",
        "opcoes": [
          "Porque 'have' no sentido de posse é verbo de estado e não aceita -ing.",
          "Porque deveria usar 'since five years'.",
          "Porque 'car' é um substantivo incontável.",
          "Porque falta a palavra 'already'."
        ],
        "resposta": 0,
        "explicacao": "Verbos de posse como 'have' são de estado e recusam o -ing: deve-se dizer 'I have had this car for five years'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na evidência presente antes de revelar:\n\n\"Why are your hands covered in flour?\"\n\"Because I ___ bread all morning.\"\n(Porque estive fazendo pão a manhã toda.)",
        "resposta": "Because I have been baking bread all morning.",
        "revelacao": "Because I have been baking bread all morning.",
        "dica": "I have been + baking",
        "explicacao": "Evidência física presente da atividade recente usa 'have been baking'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na ação que segue ativa antes de revelar:\n\n\"The construction workers ___ this bridge since last October.\"\n(Os operários vêm construindo esta ponte desde outubro passado.)",
        "resposta": "The construction workers have been building this bridge since last October.",
        "revelacao": "The construction workers have been building this bridge since last October.",
        "dica": "Workers (plural) + have been building",
        "explicacao": "Sujeito plural usa 'have been building'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na pergunta com 'he' antes de revelar:\n\n\"Why is he so out of breath? ___ he ___?\"\n(Por que ele está tão sem fôlego? Ele estava correndo?)",
        "resposta": "Has he been running?",
        "revelacao": "Has he been running?",
        "dica": "Has he been running (dupla letra n)",
        "explicacao": "Pergunta para he: 'Has he been running?'"
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no marcador de duração antes de revelar:\n\n\"We have been waiting in line ___ more than forty-five minutes.\"\n(Estamos esperando na fila há mais de quarenta e cinco minutos.)",
        "resposta": "We have been waiting in line for more than forty-five minutes.",
        "revelacao": "We have been waiting in line for more than forty-five minutes.",
        "dica": "Quantidade de tempo (minutos)",
        "explicacao": "Duração de quantidade de tempo exige 'for'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma contraída de 'I have been':\n\n\"___ living in this neighborhood for two years.\"",
        "resposta": "I've been",
        "explicacao": "A contração é 'I've been'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição que indica o início exato da ação:\n\n\"She has been working here ___ 2019.\"",
        "resposta": "since",
        "explicacao": "Ano de início exige 'since'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição que indica a extensão de tempo acumulada:\n\n\"They have been talking on the phone ___ three hours.\"",
        "resposta": "for",
        "explicacao": "Quantidade de tempo exige 'for'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma verbal contínua de 'wait' após 'has been':\n\n\"The customer has been ___ patiently at the counter.\"",
        "resposta": "waiting",
        "explicacao": "O verbo é 'waiting'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 3: Past Perfect
  // ─────────────────────────────────────────────────────────────
  "b1-lez3": {
    "id": "b1-lez3",
    "num": "Lesson 3",
    "titulo": "Past Perfect",
    "subtitulo": "Had + Particípio — O 'Passado do Passado' na Linha do Tempo",
    "cena": {
      "origem": "dialogo",
      "titulo": "Rushing to the International Airport",
      "texto": "**David:** Did you manage to catch your flight to Madrid yesterday?\n**Elena:** No, unfortunately not! When I finally arrived at the boarding gate, the airplane had already taken off.\n**David:** Oh no, what a disaster! Why were you late?\n**Elena:** Because a major traffic accident had completely blocked the highway before I left my house."
    },
    "fio": {
      "abertura": "Imagine que você está contando uma história no passado. Tudo já aconteceu. Mas de repente, você precisa dar um passo ainda mais para trás no tempo e contar algo que aconteceu ANTES daquela história principal. É para isso que existe o Past Perfect.",
      "descoberta": "Repare na linha do tempo de Elena: ela chegou ao portão de embarque (Past Simple: «arrived»). Mas o que aconteceu ANTES disso? O avião já havia decolado: «the airplane had already taken off»! E o acidente na rodovia? Já havia bloqueado tudo antes: «had blocked the highway»!",
      "fecho": "Agora você domina a máquina do tempo da narrativa inglesa. Duas ações no passado: a mais antiga de todas leva sempre **HAD + Particípio**."
    },
    "alerta": "O Past Perfect raramente anda sozinho; ele quase sempre vive em parceria com o Past Simple para estabelecer qual evento ocorreu primeiro. Não use Past Perfect se houver apenas uma ação isolada no passado.",
    "definicao": {
      "fenomeno": "When I arrived, the train had left · She couldn't buy a ticket because she had forgotten her wallet",
      "causa": "Por que não podemos colocar os dois verbos no passado simples: 'When I arrived, the train left'?",
      "conceito": "Se usarmos dois verbos no Past Simple ligados por 'when', a língua inglesa interpreta que a segunda ação ocorreu COMO CONSEQUÊNCIA imediata da primeira (eu cheguei e aí o trem partiu). O Past Perfect (*had left*) é necessário para indicar com precisão que a partida do trem ocorreu ANTERIORMENTE à minha chegada."
    },
    "inventario": [
      "A estrutura invariável para todas as pessoas: Sujeito + HAD + Particípio Passado",
      "A contração padrão na fala: I'd, you'd, he'd, she'd, we'd, they'd (atenção: I'd pode ser 'I had' ou 'I would')",
      "A forma negativa: had not / hadn't + particípio",
      "Os conectores temporais consagradas da narrativa: when, before, after, by the time, already",
      "A distinção cronológica: Ação 1 (mais antiga = Past Perfect) ➔ Ação 2 (mais recente = Past Simple)"
    ],
    "tabela_visual": "| Ação 1: Ocorrida Primeiro (Mais Antiga) | Conector Temporal | Ação 2: Ocorrida Depois (Mais Recente) | Resultado Narrativo |\n|---|---|---|---|\n| **Past Perfect (HAD + Particípio)** | *when / before* | **Past Simple (Verbo no Passado)** | Cronologia Clara |\n| *The movie **had already started*** | *when* | *we **arrived** at the cinema.* | Chegamos atrasados e perdemos o início |\n| *She **had finished** her degree* | *before* | *she **got** that prestigious job.* | Graduou-se primeiro, trabalhou depois |\n| *By the time the police **arrived**,* | — | *the thief **had escaped**.* | O ladrão fugiu antes da polícia chegar |\n| *He **had not slept** for 24 hours,* | *so* | *he **fell** asleep at the desk.* | O cansaço prévio causou o sono posterior |",
    "observacao_cards": [
      {
        "ingles": "Had + Past Participle",
        "traducao": "tinha / havia feito",
        "genero": "Passado Anterior",
        "motivo": "Invariável para I, you, he, she, we, they: 'I had seen', 'She had finished'."
      },
      {
        "ingles": "By the time...",
        "traducao": "no momento em que / quando",
        "genero": "Conector Temporal Clássico",
        "motivo": "Gatilho perfeito: 'By the time we got there, the concert had ended'."
      },
      {
        "ingles": "I'd (Had vs Would)",
        "traducao": "eu tinha (had) vs eu iria (would)",
        "genero": "Ambiguidade Oral",
        "motivo": "I'd + particípio = I had ('I'd seen'). I'd + verbo base = I would ('I'd like')."
      },
      {
        "ingles": "Because he had forgotten...",
        "traducao": "porque ele havia esquecido...",
        "genero": "Causa Prévia",
        "motivo": "Explica o motivo passado de um problema: 'He failed the exam because he hadn't studied'."
      }
    ],
    "tecnica": "A Linha do Tempo em 3 passos:\n\n**Passo 1** — Desenhe mentalmente a linha do tempo e identifique as duas ações do passado:\n→ Qual das duas aconteceu em primeiro lugar cronológico no mundo real?\n\n**Passo 2** — A ação que aconteceu PRIMEIRO de todas leva OBRIGATORIAMENTE:\n→ **HAD + Particípio Passado** (*had started, had left, had eaten*).\n\n**Passo 3** — A ação que aconteceu DEPOIS fica no:\n→ **Past Simple** (*we arrived, they realized, he called*).",
    "teoria": "### Tratado Teórico: A Relatividade Temporal na Narrativa (Pluperfect)\n\nEm análise do discurso literário e jornalístico, o Past Perfect (historicamente denominado *pluperfect* ou mais-que-perfeito) estabelece a profundidade de campo na narrativa:\n\n#### 1. Relação com 'By the time'\nA locução conjuntiva *By the time* cria uma fronteira temporal limite no passado:\n- *By the time Arthur was twenty-five, he **had written** three symphonies.*\n- *By the time the rescue team reached the mountain, the storm **had passed**.*\n\n#### 2. Discurso Indireto (Reported Speech)\nQuando relatamos no passado algo que foi dito no Present Perfect ou Past Simple, a regra de recuo temporal (*backshift*) converte automaticamente para Past Perfect:\n- Fala original: *\"I have lost my passport.\"*\n- Relato: *He told me that he **had lost** his passport.*\n- Fala original: *\"I saw the suspect yesterday.\"*\n- Relato: *The witness said she **had seen** the suspect the day before.*\n\n#### 3. Forma Negativa e Interrogativa\n- Negativa: *had not* → **hadn't**:\n  - *I hadn't seen such a beautiful sunset before my trip to Santorini.*\n- Pergunta: Inversão de *Had* para antes do sujeito:\n  - ***Had** you ever **visited** Europe before you moved to Germany?* → *Yes, I had. / No, I hadn't.*",
    "ponte": "Em português, usamos o pretérito mais-que-perfeito composto: 'Ele já tinha saído quando cheguei' ou 'Eu já havia comido'.\n\nNo inglês, a correspondência com 'tinha / havia' é quase idêntica:\n- 'Ele já tinha saído' → **He had already left**.\n- 'Eu nunca tinha visto aquilo' → **I had never seen that before**.\n- 'Nós tínhamos terminado o trabalho' → **We had finished the work**.\n\n⚠️ Atenção: NUNCA use o verbo 'have' no presente nesta estrutura narrativa de passado: não diga *'When I arrived, the train has left'*! Use sempre **had**.",
    "exemplos_prc": [
      {
        "oracao": "When we got to the theater, the play had already begun.",
        "pergunta": "Qual evento ocorreu primeiro: a nossa chegada ou o início da peça?",
        "resposta": "A peça começou primeiro (had already begun); nossa chegada ocorreu depois (got).",
        "conclusao": "had already begun = já havia começado."
      },
      {
        "oracao": "She didn't have any money to pay the taxi because she had left her purse at home.",
        "pergunta": "Por que 'had left' está no Past Perfect?",
        "resposta": "Esquecer a bolsa em casa ocorreu antes da corrida de táxi e da tentativa de pagamento.",
        "conclusao": "had left = havia deixado / esquecido."
      },
      {
        "oracao": "Had you ever flown on an airplane before that trip to New York?",
        "pergunta": "Como foi construída a pergunta sobre experiência anterior?",
        "resposta": "Invertendo 'Had' para antes do sujeito 'you' + particípio passado 'flown'.",
        "conclusao": "Had you ever flown = Você já tinha voado (antes daquela viagem)?"
      },
      {
        "oracao": "He was very nervous during the speech because he hadn't prepared properly.",
        "pergunta": "Qual é a relação causal entre as duas orações?",
        "resposta": "A ausência de preparação prévia (hadn't prepared) gerou o nervosismo durante a fala.",
        "conclusao": "hadn't prepared = não havia se preparado."
      }
    ],
    "armadilhas": [
      {
        "errado": "When I arrived at the station, the train has already left.",
        "certo": "When I arrived at the station, the train had already left.",
        "motivo": "Em narrativas no passado, use 'had' (Past Perfect), nunca 'has' (Present Perfect)."
      },
      {
        "errado": "Yesterday I had gone to the supermarket.",
        "certo": "Yesterday I went to the supermarket.",
        "motivo": "Não use Past Perfect para ações isoladas no passado sem relação com outro evento."
      },
      {
        "errado": "By the time we arrived, they already ate all the pizza.",
        "certo": "By the time we arrived, they had already eaten all the pizza.",
        "motivo": "Com 'By the time', a ação prévia deve estar no Past Perfect (had already eaten)."
      },
      {
        "errado": "She had forgot her passport.",
        "certo": "She had forgotten her passport.",
        "motivo": "Após 'had', use o particípio passado (forgotten), não o passado simples (forgot)."
      }
    ],
    "coda": "Entre duas coisas que aconteceram no passado: a que aconteceu PRIMEIRO leva sempre HAD + Particípio!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o tempo verbal correto da ação anterior:\n\n\"The stadium was completely empty when we arrived; the match ___.\"",
        "opcoes": ["had already finished", "has already finished", "already finished", "finishes"],
        "resposta": 0,
        "explicacao": "A partida terminou antes da nossa chegada: exige Past Perfect 'had already finished'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a oração narrativa:\n\n\"She couldn't board the flight because she ___ her passport in the hotel safe.\"",
        "opcoes": ["had left", "has left", "leaves", "was left"],
        "resposta": 0,
        "explicacao": "O esquecimento do passaporte ocorreu antes de tentar embarcar: 'had left'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual evento aconteceu PRIMEIRO na oração:\n\n\"Mark had worked as an engineer for ten years before he became a teacher.\"",
        "opcoes": [
          "Trabalhou como engenheiro.",
          "Tornou-se professor.",
          "Os dois aconteceram ao mesmo tempo.",
          "Nenhum dos dois aconteceu."
        ],
        "resposta": 0,
        "explicacao": "O Past Perfect (had worked) marca a ação que ocorreu primeiro cronologicamente."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a forma negativa:\n\n\"I recognized her immediately, although I ___ her for twenty years.\"",
        "opcoes": ["hadn't seen", "haven't seen", "didn't saw", "wasn't seeing"],
        "resposta": 0,
        "explicacao": "A ausência de contato antes daquele momento passado usa 'hadn't seen'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no particípio irregular de 'eat' antes de revelar:\n\n\"By the time the guests arrived, we ___ all the dessert.\"\n(No momento em que os convidados chegaram, nós já tínhamos comido toda a sobremesa.)",
        "resposta": "By the time the guests arrived, we had eaten all the dessert.",
        "revelacao": "By the time the guests arrived, we had eaten all the dessert.",
        "dica": "Had + eaten",
        "explicacao": "Ação anterior a 'arrived' exige 'had eaten'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na pergunta sobre o passado antes de revelar:\n\n\"___ you ___ the book before you watched the movie adaptation?\"\n(Você tinha lido o livro antes de assistir à adaptação cinematográfica?)",
        "resposta": "Had you read the book before you watched the movie adaptation?",
        "revelacao": "Had you read the book before you watched the movie adaptation?",
        "dica": "Had you read (read escreve igual)",
        "explicacao": "Pergunta invertida: 'Had you read...?'"
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na causa prévia antes de revelar:\n\n\"The streets were flooded because it ___ heavily for six hours.\"\n(As ruas estavam alagadas porque tinha chovido fortemente por seis horas.)",
        "resposta": "The streets were flooded because it had rained heavily for six hours.",
        "revelacao": "The streets were flooded because it had rained heavily for six hours.",
        "dica": "Had + rained",
        "explicacao": "A chuva que causou o alagamento no passado usa 'had rained'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na contração oral antes de revelar:\n\n\"She told me that she ___ never ___ a tropical rainforest before.\"\n(Ela me contou que nunca tinha visitado uma floresta tropical antes.)",
        "resposta": "She told me that she had never visited a tropical rainforest before.",
        "revelacao": "She told me that she had never visited a tropical rainforest before.",
        "dica": "Had + never + visited",
        "explicacao": "Usa-se 'had never visited'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o verbo auxiliar invariável do Past Perfect:\n\n\"They ___ already closed the museum when we arrived.\"",
        "resposta": "had",
        "explicacao": "O auxiliar do Past Perfect é 'had'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma contraída negativa de 'had not':\n\n\"He ___ studied for the test, so he was anxious.\"",
        "resposta": "hadn't",
        "explicacao": "A forma contraída é 'hadn't'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o particípio passado correto do verbo 'see':\n\n\"I had never ___ such an impressive monument before visiting Rome.\"",
        "resposta": "seen",
        "explicacao": "O particípio passado de see é 'seen'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o particípio passado do verbo 'leave':\n\n\"When I woke up, my parents had already ___ for the airport.\"",
        "resposta": "left",
        "explicacao": "O particípio passado de leave é 'left'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 4: Second Conditional
  // ─────────────────────────────────────────────────────────────
  "b1-lez4": {
    "id": "b1-lez4",
    "num": "Lesson 4",
    "titulo": "Second Conditional",
    "subtitulo": "If + Past Simple, Would + Verbo — Hipóteses Irreais no Presente",
    "cena": {
      "origem": "dialogo",
      "titulo": "Daydreaming Over Lunch",
      "texto": "**Ben:** If you won ten million dollars in the lottery tomorrow, what would you do?\n**Clara:** If I had that much money, I would buy a villa in Tuscany and I would travel around the world!\n**Ben:** That sounds dreamy. And would you quit your job?\n**Clara:** Absolutely! But if I were you, I would keep working until the money arrived in the bank account."
    },
    "fio": {
      "abertura": "E se você pudesse voar? E se você ganhasse na loteria? E se você fosse o presidente? Entramos no reino da imaginação e das hipóteses contrárias à realidade com o Second Conditional.",
      "descoberta": "Repare na fórmula mágica que Clara e Ben usaram: «If I had that much money» (verbo no passado para mostrar que é irreal), «I would buy a villa» (resultado condicional com would). E preste muita atenção na frase de ouro de Clara: «If I were you» — ela usou 'were' com 'I'! Por que?",
      "fecho": "Agora você domina a arte da imaginação e dos conselhos hipotéticos. Guarde a fórmula: Se + Passado Simples ➔ Would + Verbo Puro."
    },
    "alerta": "No Second Conditional, a tradição culta do inglês substitui 'was' por **were** para todas as pessoas gramaticais (If I were, If he were, If she were). A expressão de conselho mais usada no mundo corporativo e pessoal é sempre: **If I were you, I would...** (Se eu fosse você, eu...).",
    "definicao": {
      "fenomeno": "If I had more time, I would learn Italian · If she lived closer, we would see her more often · If I were you, I would accept the job",
      "causa": "Por que usamos o verbo no passado ('had', 'lived') se a imaginação é sobre o presente ou o futuro?",
      "conceito": "Linguistas chamam isso de 'distância hipotética' (*hypothetical distance*). Como a situação é imaginária, irreal ou improvável no momento presente, o inglês 'recua' a forma verbal para o passado para sinalizar ao cérebro que não se trata de um fato real."
    },
    "inventario": [
      "A estrutura mestra: IF + Sujeito + Past Simple, Sujeito + WOULD + Verbo Base",
      "A contração universal de would: I'd, you'd, he'd, she'd, we'd, they'd",
      "A forma condicional negativa: wouldn't + verbo base (I wouldn't do that)",
      "A regra de prestígio do subjuntivo: 'If I were / If he were / If she were' em vez de 'was'",
      "A fórmula canônica de aconselhamento: 'If I were you, I would...'"
    ],
    "tabela_visual": "| Oração com IF (Hipótese Irreal) | Oração Principal (Resultado Imaginado) | Sentido Real no Mundo |\n|---|---|---|\n| **If + Past Simple** | **Would + Verbo Puro** | Situação Atual Real |\n| *If I **had** a car,* | *I **would drive** to work.* | Não tenho carro (ando de ônibus) |\n| *If she **spoke** German,* | *she **would apply** for the job.* | Ela não fala alemão (não pode se candidatar) |\n| *If we **lived** by the beach,* | *we **would surf** every day.* | Moramos longe da praia |\n| *If I **were** you,* | *I **would apologize** immediately.* | Dando um conselho direto |\n| *Inversão sem vírgula:* | *I **would travel** if I **had** money.* | A oração com IF pode vir em segundo lugar |",
    "observacao_cards": [
      {
        "ingles": "If I had... I would...",
        "traducao": "Se eu tivesse... eu iria / faria...",
        "genero": "Estrutura Base",
        "motivo": "Passado na condição (had) + would no resultado: 'If I had time, I would exercise'."
      },
      {
        "ingles": "If I were you",
        "traducao": "Se eu fosse você",
        "genero": "Conselho Canônico",
        "motivo": "Usa 'were' mesmo com I: 'If I were you, I wouldn't worry about it'."
      },
      {
        "ingles": "I'd (Would)",
        "traducao": "eu faria / iria",
        "genero": "Contração de Would",
        "motivo": "Na fala nativa: 'I'd buy a house' soa muito mais natural do que falar 'I would buy'."
      },
      {
        "ingles": "Could / Might como alternativas",
        "traducao": "poderia / talvez fizesse",
        "genero": "Variação Modal",
        "motivo": "Pode trocar 'would' por 'could' (capacidade) ou 'might' (possibilidade incerta)."
      }
    ],
    "tecnica": "A Balança do Second Conditional em 3 passos:\n\n**Passo 1** — O lado do IF leva sempre o **Past Simple**:\n→ *If I won, If she knew, If we had* (NUNCA coloque 'would' colado no 'if'!).\n\n**Passo 2** — O lado do RESULTADO leva **WOULD + Verbo Puro**:\n→ *I would buy, he would travel, we would celebrate*.\n\n**Passo 3** — O sujeito é I, He, She ou It com o verbo To Be?\n→ Diga **were**: *If I were you / If he were here*.",
    "teoria": "### Tratado Teórico: O Modo Subjuntivo e a Modalidade Hipotética\n\nO Second Conditional opera no domínio da **irrealidade presente** (*present counterfactuals*):\n\n#### 1. Por que 'If I were' e não 'If I was'?\nHistoricamente, o inglês possuía um modo subjuntivo flexionado (*past subjunctive*). A única forma que sobreviveu intacta no inglês contemporâneo é o uso de **were** para todas as pessoas gramaticais nas orações com *if*:\n- *Formal/Padrão culto:* **If I were** rich... / **If he were** the manager...\n- *Coloquial informal oral:* nativos por vezes usam *If I was*, mas em escrita formal, negócios e exames internacionais, **were** é considerado o padrão de ouro indiscutível.\n\n#### 2. Modais Alternativos no Resultado (Could e Might)\nPodemos modular o grau de certeza do resultado hipotético:\n- *If I had his number, I **would call** him.* (Certeza de 100% da minha intenção imaginada).\n- *If I had his number, I **could call** him.* (Teria a capacidade/habilidade física de ligar).\n- *If I had his number, I **might call** him.* (Talvez eu ligasse; probabilidade de 50%).\n\n#### 3. Pontuação com a Vírgula\n- Se a oração com IF vier primeiro: **usa-se vírgula** (*If it rained, we would stay indoors.*).\n- Se a oração com WOULD vier primeiro: **dispensa-se a vírgula** (*We would stay indoors if it rained.*).",
    "ponte": "Em português usamos o pretérito imperfeito do subjuntivo na condição e o futuro do pretérito no resultado: 'Se eu **tivesse** dinheiro, eu **compraria** uma casa'.\n\nNo inglês, a correspondência é perfeita:\n- 'tivesse' (-sse) → **had**\n- 'compraria' (-ria) → **would buy**\n- 'Se eu soubesse' → **If I knew**\n- 'Eu diria' → **I would tell**\n- 'Se eu fosse você' → **If I were you**.\n\n⚠️ O erro proibido: nunca diga *If I would have*! O 'would' JAMAIS entra na cláusula do 'if'!",
    "exemplos_prc": [
      {
        "oracao": "If I had more free time, I would learn how to play the piano.",
        "pergunta": "Qual é a realidade do falante no presente?",
        "resposta": "Ele não tem tempo livre suficiente agora, por isso não está aprendendo piano.",
        "conclusao": "If I had / I would learn = Se eu tivesse / eu aprenderia."
      },
      {
        "oracao": "If she lived in New York, she would visit Central Park every weekend.",
        "pergunta": "Por que 'lived' e 'would visit' foram combinados?",
        "resposta": "Para expressar um cenário hipotético: ela não mora em Nova York na realidade.",
        "conclusao": "If she lived / she would visit = Se ela morasse / ela visitaria."
      },
      {
        "oracao": "If I were you, I would consult a professional lawyer before signing.",
        "pergunta": "Por que foi usado 'were' com o sujeito 'I'?",
        "resposta": "Uso formal do subjuntivo na expressão canônica de aconselhamento 'If I were you'.",
        "conclusao": "If I were you = Se eu fosse você."
      },
      {
        "oracao": "What would you do if you lost your smartphone during an international trip?",
        "pergunta": "Como foi construída a pergunta no Second Conditional?",
        "resposta": "What would you do (resultado interrogativo) + if you lost (condição hipotética).",
        "conclusao": "What would you do if you lost = O que você faria se perdesse...?"
      }
    ],
    "armadilhas": [
      {
        "errado": "If I would have money, I would buy a car.",
        "certo": "If I had money, I would buy a car.",
        "motivo": "Nunca coloque 'would' dentro da oração com 'if'. O lado do if usa Past Simple."
      },
      {
        "errado": "If I was you, I would take the job.",
        "certo": "If I were you, I would take the job.",
        "motivo": "Na expressão padrão de conselho, o subjuntivo culto exige 'were' para todas as pessoas."
      },
      {
        "errado": "If she studied more, she will pass the exam.",
        "certo": "If she studied more, she would pass the exam.",
        "motivo": "Não misture First Conditional (will) com Second Conditional (would)."
      },
      {
        "errado": "I would to travel around the world.",
        "certo": "I would travel around the world.",
        "motivo": "Após 'would', usa-se o verbo puro sem a partícula 'to'."
      }
    ],
    "coda": "Lado do IF: verbo no Passado Simples (com 'were' para conselhos). Lado do Resultado: WOULD + Verbo Puro!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com a forma verbal correta do Second Conditional:\n\n\"If I ___ the answer, I would tell you immediately.\"",
        "opcoes": ["knew", "know", "would know", "had known"],
        "resposta": 0,
        "explicacao": "A oração com 'if' no Second Conditional exige Past Simple: 'knew'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual é a expressão canônica correta para dar um conselho?",
        "opcoes": [
          "If I were you, I would accept the job offer.",
          "If I was you, I will accept the job offer.",
          "If I would be you, I would accept the job offer.",
          "If I am you, I would accept the job offer."
        ],
        "resposta": 0,
        "explicacao": "A fórmula padrão e elegante de aconselhamento é 'If I were you, I would...'"
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a oração principal:\n\n\"If we had wings, we ___ all over the world.\"",
        "opcoes": ["would fly", "will fly", "flew", "would to fly"],
        "resposta": 0,
        "explicacao": "O resultado hipotético usa 'would' + verbo puro: 'would fly'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual das frases está gramaticalmente PERFEITA?",
        "opcoes": [
          "What would you buy if you won the lottery?",
          "What will you buy if you won the lottery?",
          "What would you buy if you would win the lottery?",
          "What do you buy if you won the lottery?"
        ],
        "resposta": 0,
        "explicacao": "Pergunta perfeita no Second Conditional: What would you buy if you won...?"
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no verbo hipotético antes de revelar:\n\n\"If she ___ closer to her parents, she would visit them every weekend.\"\n(Se ela morasse mais perto dos pais dela, ela os visitaria todo fim de semana.)",
        "resposta": "If she lived closer to her parents, she would visit them every weekend.",
        "revelacao": "If she lived closer to her parents, she would visit them every weekend.",
        "dica": "Passado simples de live",
        "explicacao": "Oração com if usa Past Simple: 'lived'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na contração oral de would antes de revelar:\n\n\"If I had a million dollars, ___ donate half to charity.\"\n(Se eu tivesse um milhão de dólares, eu doaria metade para caridade.)",
        "resposta": "If I had a million dollars, I'd donate half to charity.",
        "revelacao": "If I had a million dollars, I'd donate half to charity.",
        "dica": "Contração I'd",
        "explicacao": "Contração de I would é 'I'd'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na negativa de would antes de revelar:\n\n\"If I were in your shoes, I ___ worry about their criticism.\"\n(Se eu estivesse no seu lugar, eu não me preocuparia com a crítica deles.)",
        "resposta": "If I were in your shoes, I wouldn't worry about their criticism.",
        "revelacao": "If I were in your shoes, I wouldn't worry about their criticism.",
        "dica": "Negativa contraída de would",
        "explicacao": "A negativa de would é 'wouldn't'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no subjuntivo antes de revelar:\n\n\"If he ___ here right now, he would know exactly what to do.\"\n(Se ele estivesse aqui agora mesmo, ele saberia exatamente o que fazer.)",
        "resposta": "If he were here right now, he would know exactly what to do.",
        "revelacao": "If he were here right now, he would know exactly what to do.",
        "dica": "Subjuntivo culto de be para he",
        "explicacao": "No padrão culto hipotético usa-se 'were' com he."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que forma o conselho hipotético:\n\n\"If I ___ you, I would take an umbrella.\" (fosse)",
        "resposta": "were",
        "explicacao": "Expressão canônica: 'If I were you'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o modal do resultado condicional:\n\n\"They ___ travel more if tickets were cheaper.\" (viajariam)",
        "resposta": "would",
        "explicacao": "O modal de resultado condicional é 'would'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma no passado do verbo 'have' para a oração com if:\n\n\"If we ___ more space, we would adopt a dog.\"",
        "resposta": "had",
        "explicacao": "O passado de have é 'had'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma negativa contraída de 'would not':\n\n\"I ___ do that if I were you.\"",
        "resposta": "wouldn't",
        "explicacao": "A contração é 'wouldn't'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 5: Zero Conditional
  // ─────────────────────────────────────────────────────────────
  "b1-lez5": {
    "id": "b1-lez5",
    "num": "Lesson 5",
    "titulo": "Zero Conditional",
    "subtitulo": "If + Present Simple, Present Simple — Fatos Científicos e Verdades Universais",
    "cena": {
      "origem": "dialogo",
      "titulo": "Science Fair Experiment",
      "texto": "**Teacher:** Class, watch carefully what happens in this beaker!\n**Student:** What happens if you heat water to 100 degrees Celsius, Professor?\n**Teacher:** If you heat water to 100 degrees Celsius, it boils and turns into steam. It is a universal law of physics.\n**Student:** And what happens if you freeze it?\n**Teacher:** If you cool it below zero degrees, it becomes solid ice."
    },
    "fio": {
      "abertura": "Chegamos ao condicional mais sólido de todos: o Zero Conditional. Enquanto os outros condicionais falam de planos futuros (First) ou devaneios imaginários (Second), o Zero Conditional fala da pura realidade das leis da natureza, das regras matemáticas e dos fatos científicos.",
      "descoberta": "Repare na fala do professor: «If you heat water to 100 degrees, it boils». Ambos os verbos estão no Present Simple: 'heat' no presente, 'boils' no presente! Não há 'will', não há 'would'. Se a causa acontece, o efeito é 100% certo e garantido todas as vezes.",
      "fecho": "Agora você domina a certeza absoluta. No Zero Conditional, você pode inclusive trocar 'If' por 'When' sem mudar em nada o sentido da frase."
    },
    "alerta": "Brasileiros costumam colocar 'will' desnecessariamente ao enunciar fatos científicos (*If you heat water, it will boil*). Embora compreensível, o inglês nativo e acadêmico prefere estritamente o Present Simple nos dois lados para expressar leis imutáveis.",
    "definicao": {
      "fenomeno": "If you mix red and blue, you get purple · If people don't eat, they get hungry · When the sun goes down, it gets dark",
      "causa": "Por que não usamos 'will' nem 'would' neste tipo de oração condicional?",
      "conceito": "O Zero Conditional não expressa uma previsão futura nem uma hipótese incerta; ele descreve uma relação de causa e efeito perpétua e universal. Por isso, a gramática inglesa emprega o Present Simple tanto na condição quanto no resultado (*Present Simple + Present Simple*)."
    },
    "inventario": [
      "A estrutura simétrica da certeza: IF / WHEN + Present Simple, Present Simple",
      "A equivalência semântica perfeita: 'If' e 'When' são 100% intercambiáveis aqui",
      "Aplicação 1: Leis científicas, físicas e biológicas (If ice melts, it becomes water)",
      "Aplicação 2: Hábitos automáticos e reações fisiológicas (If I drink coffee late at night, I don't sleep)",
      "Aplicação 3: Instruções imperativas de causa e efeito (If you feel dizzy, sit down immediately)"
    ],
    "tabela_visual": "| Condição Causal (IF / WHEN) | Resultado Automático | Tipo de Verdade |\n|---|---|---|\n| **If + Present Simple** | **Present Simple** | Certeza Absoluta (100%) |\n| *If you **heat** ice,* | *it **melts**.* | Lei física da matéria |\n| *If you **mix** yellow and blue,* | *you **get** green.* | Fato das cores |\n| *When it **rains**,* | *the grass **gets** wet.* | Causa e efeito natural |\n| *If babies **are** hungry,* | *they **cry**.* | Reação biológica natural |\n| *If the alarm **rings**, (Imperativo)* | ***evacuate** the building.* | Instrução de segurança direta |",
    "observacao_cards": [
      {
        "ingles": "If / When (Intercambiáveis)",
        "traducao": "se / quando",
        "genero": "Conector de Certeza",
        "motivo": "Como o fato sempre acontece, 'If you touch fire, it burns' = 'When you touch fire, it burns'."
      },
      {
        "ingles": "Present + Present",
        "traducao": "presente + presente",
        "genero": "Simetria Verbal",
        "motivo": "Ambos os lados usam Present Simple: 'If water freezes, it expands' (com 's' na 3ª pessoa!)."
      },
      {
        "ingles": "Habitual Zero Conditional",
        "traducao": "hábito automático pessoal",
        "genero": "Rotina Invariável",
        "motivo": "'If I wake up late, I miss the train'. Sempre que a causa acontece, o resultado se repete."
      },
      {
        "ingles": "Zero Conditional com Imperativo",
        "traducao": "instrução condicional",
        "genero": "Comando Prático",
        "motivo": "'If you have any questions, ask the teacher'. O resultado pode ser um comando direto."
      }
    ],
    "tecnica": "A Fórmula da Certeza em 3 passos:\n\n**Passo 1** — O que você está dizendo é uma lei científica, verdade universal ou reação biológica invariável?\n→ Trata-se do **Zero Conditional**!\n\n**Passo 2** — O lado da Condição (com IF ou WHEN) leva o **Present Simple**:\n→ *If you heat, If it rains, If people eat*.\n\n**Passo 3** — O lado do Resultado também leva o **Present Simple**:\n→ *it melts, the street gets wet, they survive* (atenção à regra do '-s' de 3ª pessoa singular!).",
    "teoria": "### Tratado Teórico: A Relação Causal Atemporal no Zero Conditional\n\nEm lógica formal e filosofia da linguagem, o Zero Conditional expressa proposições nomológicas (*nomological statements* — enunciados baseados em leis da natureza):\n\n#### 1. Fatos Científicos vs Previsões Futuras\nObserve o contraste entre Zero e First Conditional:\n- **Zero Conditional (Fato universal e atemporal):**\n  - *If you drop an apple, gravity pulls it to the ground.*\n  - Não estamos falando de uma maçã específica amanhã, mas de qualquer maçã em qualquer época do universo.\n- **First Conditional (Situação concreta particular no futuro):**\n  - *If you drop that crystal glass, it **will break**!* (Cuidado com esse copo agora!).\n\n#### 2. Reações Pessoais Consistentes\nTambém se aplica a reações comportamentais ou fisiológicas que funcionam como 'regras' daquela pessoa:\n- *If I don't drink my morning coffee, I **get** a headache.*\n- *If my boss **is** stressed, he **walks** around the office quickly.*\n\n#### 3. Concordância e a 3ª Pessoa Singular\nO erro mais comum neste tempo simples não é de lógica, mas ortográfico: esquecer o acréscimo de **-s** ou **-es** no verbo da 3ª pessoa do singular:\n- ❌ *If water freeze, it expand.*\n- ✅ *If water **freezes**, it **expands**.*",
    "ponte": "Em português usamos a mesma estrutura exata no presente: 'Se você esquenta a água a 100 graus, ela ferve' ou 'Se você aperta este botão, a máquina desliga'.\n\nNo inglês, a simetria é total:\n- 'Se chove, a grama fica molhada' → **If it rains, the grass gets wet**.\n- 'Quando o sol se põe, fica escuro' → **When the sun sets, it gets dark**.\n- 'Se você mistura vermelho e azul, você obtém roxo' → **If you mix red and blue, you get purple**.\n\nA única armadilha para brasileiros é não esquecer o 'S' da 3ª pessoa nos dois lados (*it rains, it boils, it melts*)!",
    "exemplos_prc": [
      {
        "oracao": "If you heat ice, it melts and turns into liquid water.",
        "pergunta": "Por que ambos os verbos estão no Present Simple?",
        "resposta": "Porque derreter com calor é uma lei física imutável da matéria (Zero Conditional).",
        "conclusao": "If you heat / it melts = Se você aquece / ele derrete."
      },
      {
        "oracao": "When people do not get enough sleep, their concentration drops significantly.",
        "pergunta": "Por que foi usado 'When' em vez de 'If'?",
        "resposta": "No Zero Conditional, 'When' e 'If' são intercambiáveis pois o efeito ocorre sempre.",
        "conclusao": "When people do not get / drops = Quando as pessoas não dormem / cai."
      },
      {
        "oracao": "If you press this red emergency button, the entire conveyor belt stops immediately.",
        "pergunta": "Qual relação funcional esta frase estabelece?",
        "resposta": "Relação mecânica de causa e efeito automático em um maquinário industrial.",
        "conclusao": "press / stops = aperta / para."
      },
      {
        "oracao": "Plants die if they do not receive enough sunlight and water.",
        "pergunta": "A oração com 'if' pode vir na segunda metade da frase?",
        "resposta": "Sim, a ordem das cláusulas é livre e dispensa a vírgula quando o 'if' fica no meio.",
        "conclusao": "Plants die if they do not receive = Plantas morrem se não recebem."
      }
    ],
    "armadilhas": [
      {
        "errado": "If you heat water, it will boil.",
        "certo": "If you heat water, it boils.",
        "motivo": "Fatos científicos e leis universais usam Present Simple em ambos os lados."
      },
      {
        "errado": "If it rain, the ground get wet.",
        "certo": "If it rains, the ground gets wet.",
        "motivo": "Não esqueça a terminação de 3ª pessoa (-s) em 'it rains' e 'the ground gets wet'."
      },
      {
        "errado": "When you will heat ice, it melts.",
        "certo": "When you heat ice, it melts.",
        "motivo": "Nunca use 'will' após if ou when no Zero Conditional."
      },
      {
        "errado": "If I am tired, I will sleep early every day.",
        "certo": "If I am tired, I sleep early every day.",
        "motivo": "Rotinas automáticas invariáveis com 'every day' usam Present Simple nos dois lados."
      }
    ],
    "coda": "Fato científico, lei natural ou certeza de 100%: Present Simple de um lado e Present Simple do outro!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a lei física no Zero Conditional:\n\n\"If water reaches zero degrees Celsius, it ___ solid.\"",
        "opcoes": ["becomes", "will become", "would become", "became"],
        "resposta": 0,
        "explicacao": "Fato científico universal exige Present Simple com -s: 'becomes'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete para causa e efeito das cores:\n\n\"If you mix red and white paint, you ___ pink.\"",
        "opcoes": ["get", "will get", "would get", "getting"],
        "resposta": 0,
        "explicacao": "Verdade factual atemporal usa Present Simple: 'you get'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual palavra pode substituir 'If' no Zero Conditional sem alterar o sentido?",
        "opcoes": ["When", "Unless", "Although", "Because"],
        "resposta": 0,
        "explicacao": "No Zero Conditional, 'When' e 'If' são 100% intercambiáveis."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual das frases está gramaticalmente PERFEITA com a concordância de 3ª pessoa?",
        "opcoes": [
          "If iron gets wet, it rusts.",
          "If iron get wet, it rust.",
          "If iron gets wet, it will rusts.",
          "If iron will get wet, it rusts."
        ],
        "resposta": 0,
        "explicacao": "Ambos os verbos concordam na 3ª pessoa com -s: 'gets wet' e 'rusts'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no verbo de 3ª pessoa antes de revelar:\n\n\"When the sun rises, the morning temperature ___.\"\n(Quando o sol nasce, a temperatura da manhã sobe.)",
        "resposta": "When the sun rises, the morning temperature rises.",
        "revelacao": "When the sun rises, the morning temperature rises.",
        "dica": "Rise com -s de 3ª pessoa",
        "explicacao": "Verdade natural no presente: 'temperature rises'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no verbo biológico antes de revelar:\n\n\"If plants do not get enough water, they ___.\"\n(Se as plantas não recebem água suficiente, elas morrem.)",
        "resposta": "If plants do not get enough water, they die.",
        "revelacao": "If plants do not get enough water, they die.",
        "dica": "Verbo morrer (die) no plural",
        "explicacao": "Sujeito plural plants: 'they die'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na instrução imperativa antes de revelar:\n\n\"If there is a fire in the building, ___ the stairs, not the elevator!\"\n(Se houver incêndio no prédio, use as escadas, não o elevador!)",
        "resposta": "If there is a fire in the building, use the stairs, not the elevator!",
        "revelacao": "If there is a fire in the building, use the stairs, not the elevator!",
        "dica": "Imperativo puro (use)",
        "explicacao": "O resultado em instruções de segurança é um imperativo direto: 'use the stairs'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na reação automática pessoal antes de revelar:\n\n\"If I drink espresso after 8:00 PM, I ___ asleep easily.\"\n(Se eu bebo café expresso depois das 20h, não consigo pegar no sono facilmente.)",
        "resposta": "If I drink espresso after 8:00 PM, I don't fall asleep easily.",
        "revelacao": "If I drink espresso after 8:00 PM, I don't fall asleep easily.",
        "dica": "Presente negativo para I (don't fall)",
        "explicacao": "Reação fisiológica habitual negativa: 'I don't fall asleep'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma verbal de 'boil' para 'water' (3ª pessoa):\n\n\"If you heat water to 100°C, it ___.\"",
        "resposta": "boils",
        "explicacao": "3ª pessoa de boil é 'boils'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma de 3ª pessoa do verbo 'melt':\n\n\"If snow gets warm, it ___.\"",
        "resposta": "melts",
        "explicacao": "3ª pessoa de melt é 'melts'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o conector temporal que substitui 'If' com o mesmo sentido:\n\n\"___ you press this button, the computer restarts.\" (quando)",
        "resposta": "When",
        "explicacao": "O conector é 'When'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma de 3ª pessoa do verbo 'freeze':\n\n\"If water temperature drops below 0°C, it ___.\"",
        "resposta": "freezes",
        "explicacao": "3ª pessoa de freeze é 'freezes'."
      }
    ]
  }
};

console.log('Aplicando Onda 5 — Parte 1 (Lições B1.1 a B1.5)...');

for (const [id, lessonData] of Object.entries(wave5Part1Lessons)) {
  for (const mod of data.moduli) {
    const idx = mod.lezioni.findIndex(l => l.id === id);
    if (idx !== -1) {
      mod.lezioni[idx] = lessonData;
      console.log(`✓ Lição ${id} (${lessonData.titulo}) enriquecida com sucesso!`);
    }
  }
}

fs.writeFileSync(grammarPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Onda 5 — Parte 1 gravada com sucesso em data/grammar.json!');
