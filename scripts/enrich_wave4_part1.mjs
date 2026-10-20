import fs from 'fs';

const grammarPath = 'data/grammar.json';
const data = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));

// Onda 4 Parte 1: Lições A2.1 a A2.5 (A Fundação do Tempo Passado)
const wave4Part1Lessons = {
  // ─────────────────────────────────────────────────────────────
  // LESSON A2.1: Past Simple (Verb To Be) — Was vs Were
  // ─────────────────────────────────────────────────────────────
  "a2-lez1": {
    "id": "a2-lez1",
    "num": "Lesson 1",
    "titulo": "Past Simple (Verb To Be)",
    "subtitulo": "Identidade e Estado no Passado — Was vs Were",
    "cena": {
      "origem": "dialogo",
      "titulo": "Talking About Yesterday's Event",
      "texto": "**David:** Where were you yesterday evening, Lucas?\n**Lucas:** I was at the international tech symposium downtown.\n**David:** Really? Was it interesting?\n**Lucas:** Yes, it was fantastic! The keynote speakers were brilliant, but the conference room was quite cold."
    },
    "fio": {
      "abertura": "Bem-vindo ao Módulo A2! Agora você cruza a fronteira do tempo e aprende a relatar o passado. O primeiro passo é o mesmo do presente: dominar o verbo To Be.",
      "descoberta": "Notou a simplificação espetacular? No presente tínhamos três formas (am, is, are). No passado, o inglês reduziu tudo a apenas DUAS formas: «WAS» para singulares (I, he, she, it) e «WERE» para plurais e para você (you, we, they)!",
      "fecho": "Agora você relata onde esteve, quem eram as pessoas e como as coisas estavam ontem com total segurança."
    },
    "alerta": "Pronúncia vital: 'Were' pronuncia-se /wɜːr/ (com som de 'êr' fechado). Não confunda com 'where' /wɛər/ (onde) ou 'we're' /wɪər/ (nós somos).",
    "definicao": {
      "fenomeno": "I was tired · He was at home · You were right · We were late · They were friends",
      "causa": "Por que o verbo To Be tem apenas duas formas no passado?",
      "conceito": "'WAS' unificou a 1ª e a 3ª pessoa do singular (I, He, She, It). 'WERE' atende a 2ª pessoa (singular e plural) e todas as pessoas do plural (You, We, They). Assim como no presente, o verbo To Be no passado é autossuficiente e não usa o auxiliar 'did'."
    },
    "inventario": [
      "As duas formas do passado: WAS (I, he, she, it) e WERE (you, we, they)",
      "A negação direta: wasn't (was not) e weren't (were not)",
      "A interrogação com inversão: Was he...? / Were you...?",
      "Respostas curtas no passado: Yes, I was / No, we weren't",
      "A regra de ouro: NUNCA use 'did' com was/were (*Did you were* ❌)"
    ],
    "tabela_visual": "| Sujeito | Afirmativa | Negativa Contraída | Pergunta com Inversão | Resposta Curta |\n|---|---|---|---|---|\n| **I / He / She / It** | **was** ready | **wasn't** ready | **Was** she ready? | *Yes, she was. / No, she wasn't.* |\n| **You / We / They** | **were** late | **weren't** late | **Were** they late? | *Yes, they were. / No, they weren't.* |",
    "observacao_cards": [
      {
        "ingles": "I was / He was",
        "traducao": "Eu era/estava · Ele era/estava",
        "genero": "Singular do Passado",
        "motivo": "I, He, She e It compartilham exatamente a mesma forma: 'I was tired yesterday'."
      },
      {
        "ingles": "You were / We were",
        "traducao": "Você era/estava · Nós éramos/estávamos",
        "genero": "Plural e 2ª Pessoa",
        "motivo": "You, We e They usam 'were' (/wɜːr/): 'We were very happy with the results'."
      },
      {
        "ingles": "Wasn't",
        "traducao": "Não era / Não estava (singular)",
        "genero": "Negação Singular",
        "motivo": "Contração de 'was not': 'She wasn't at the meeting this morning'."
      },
      {
        "ingles": "Weren't",
        "traducao": "Não eram / Não estavam (plural)",
        "genero": "Negação Plural",
        "motivo": "Contração de 'were not' (/wɜːnt/): 'They weren't satisfied with the service'."
      },
      {
        "ingles": "Were you...?",
        "traducao": "Você era/estava...? / Vocês eram/estavam...?",
        "genero": "Pergunta Invertida",
        "motivo": "Inverte-se diretamente: 'Were you at home last night? — Yes, I was.'"
      },
      {
        "ingles": "There was / There were",
        "traducao": "Havia / Tinha (singular e plural)",
        "genero": "Existência no Passado",
        "motivo": "'There was a problem' (singular) vs 'There were three problems' (plural)."
      }
    ],
    "tecnica": "### O Filtro Rápido Was vs Were:\n\n1. **Identifique o sujeito:**\n   - É `I`, `he`, `she`, `it` ou um substantivo singular? → Use **WAS** (*wasn't* na negativa).\n   - É `you`, `we`, `they` ou um substantivo plural? → Use **WERE** (*weren't* na negativa).\n\n2. **Para fazer uma pergunta:**\n   - Coloque *Was* ou *Were* antes do sujeito (*Were you tired?*).\n\n3. **Anti-Erro Crucial:**\n   - Jamais coloque o auxiliar *DID* junto com *WAS/WERE* (*Did you were there?* ❌ → *Were you there?* ✓).",
    "teoria": "### A Morfologia do Verbo To Be no Passado\n\nO verbo *To Be* é o único verbo em toda a língua inglesa que mantém duas formas distintas no Passado Simples (*Past Simple*):\n* Forma Singular: **WAS**\n* Forma Plural/2ª Pessoa: **WERE**\n\nTodos os demais verbos do inglês possuem uma única forma para todas as pessoas no passado (ex: *I worked, you worked, he worked*).\n\n#### O Existencial no Passado: There was / There were\nA regra de existência estudada no presente estende-se com perfeição ao passado:\n* Presente: *There is a cat* → Passado: **There was a cat**.\n* Presente: *There are two cats* → Passado: **There were two cats**.",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: A Simplificação do Imperfeito e Perfeito\n\n1. **A Fusão de 'Fui / Era / Estava':**\n   - No português temos 'fui' (perfeito), 'era' (imperfeito) e 'estava' (estado transitório).\n   - O inglês simplifica tudo em uma única palavra: **WAS**:\n     - *Eu fui feliz* = **I was happy**.\n     - *Eu era criança* = **I was a child**.\n     - *Eu estava cansado* = **I was tired**.\n\n2. **A Proibição do Auxiliar 'Did':**\n   - Assim como no presente você não diz *Do you are?*, no passado é terminantemente proibido dizer *Did you were?*. O verbo To Be inverte por conta própria: **Were you there?**",
    "exemplos_prc": [
      {
        "oracao": "The presentation was very clear, but the slides were too small.",
        "pergunta": "Por que a primeira oração usou 'was' e a segunda 'were'?",
        "resposta": "Porque 'The presentation' é singular (It = was), enquanto 'the slides' está no plural (They = were).",
        "conclusao": "A apresentação foi muito clara, mas os slides estavam pequenos demais."
      },
      {
        "oracao": "Were you at the office yesterday afternoon? — No, I wasn't.",
        "pergunta": "Como foi formulada a pergunta e a respectiva resposta curta?",
        "resposta": "A pergunta inverteu 'Were' com o sujeito 'you'; a resposta curta negativa usou 'I' com o auxiliar correspondente 'wasn't'.",
        "conclusao": "Você estava no escritório ontem à tarde? — Não, eu não estava."
      },
      {
        "oracao": "There were over five hundred attendees at the summit.",
        "pergunta": "Qual a estrutura existencial utilizada aqui?",
        "resposta": "'There were', indicando existência no passado para um sujeito plural ('five hundred attendees').",
        "conclusao": "Havia mais de quinhentos participantes no congresso."
      },
      {
        "oracao": "She wasn't comfortable with the proposed contract terms.",
        "pergunta": "Qual a forma completa de 'wasn't'?",
        "resposta": "'Was not', utilizada para negar estados ou características na 3ª pessoa singular do passado.",
        "conclusao": "Ela não estava confortável com os termos contratuais propostos."
      }
    ],
    "armadilhas": [
      {
        "errado": "Did you were at home yesterday?",
        "certo": "Were you at home yesterday?",
        "motivo": "O verbo To Be nunca usa o auxiliar 'did'. Faça a inversão direta com 'were'."
      },
      {
        "errado": "We was very tired after the trip.",
        "certo": "We were very tired after the trip.",
        "motivo": "Com o pronome 'We' a forma correta do passado é 'were', nunca 'was'."
      },
      {
        "errado": "There was two cars in the garage.",
        "certo": "There were two cars in the garage.",
        "motivo": "Existência plural no passado exige 'There were'."
      },
      {
        "errado": "They didn't be at school.",
        "certo": "They weren't at school.",
        "motivo": "To Be nega sozinho: weren't (were not)."
      }
    ],
    "coda": "I, He, She, It usam WAS. You, We, They usam WERE. Nada de 'did' com o verbo To Be.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com a forma correta do passado:\n\n\"Carlos ___ absent from the team meeting yesterday.\"\n(= Carlos estava ausente da reunião de equipe ontem.)",
        "opcoes": ["were", "was", "did be", "been"],
        "resposta": 1,
        "explicacao": "Carlos = He → no passado usa-se WAS."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a pergunta com inversão no passado:\n\n\"Where ___ you when the fire alarm sounded?\"\n(= Onde você estava quando o alarme de incêndio tocou?)",
        "opcoes": ["was", "were", "did", "are"],
        "resposta": 1,
        "explicacao": "Com o sujeito 'you', a forma do passado é WERE."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase está gramaticalmente PERFEITA em inglês?",
        "opcoes": [
          "Did you was happy with the outcome?",
          "Were you happy with the outcome?",
          "Did you were happy with the outcome?",
          "Was you happy with the outcome?"
        ],
        "resposta": 1,
        "explicacao": "'Were you happy...?' inverte o verbo To Be sem auxílio de 'did'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete sobre existência plural no passado:\n\n\"___ many tourists in Rome last summer.\"\n(= Havia muitos turistas em Roma no verão passado.)",
        "opcoes": ["There was", "There were", "Had", "Were have"],
        "resposta": 1,
        "explicacao": "'Many tourists' é plural → no passado existencial usa-se THERE WERE."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com a negação singular:\n\n\"She ___ at work yesterday because she was ill.\"\n(Ela não estava no trabalho ontem porque estava doente.)",
        "revelacao": "She wasn't at work yesterday because she was ill.",
        "explicacao": "She wasn't."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com o plural:\n\n\"We ___ very surprised by the announcement.\"\n(Nós ficamos muito surpresos com o comunicado.)",
        "revelacao": "We were very surprised by the announcement.",
        "explicacao": "We were."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente a resposta curta:\n\n\"Was the weather good in London? — No, it ___.\"\n(O tempo estava bom em Londres? — Não, não estava.)",
        "revelacao": "Was the weather good in London? — No, it wasn't.",
        "explicacao": "No, it wasn't."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"They ___ in the office until 8:00 PM yesterday.\"\n(Eles estavam no escritório até as 20h ontem.)",
        "revelacao": "They were in the office until 8:00 PM yesterday.",
        "explicacao": "They were."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma do passado de To Be para 'I':\n\n\"I ___ very tired after the flight.\" (estava)",
        "resposta": "was",
        "explicacao": "I was."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma do passado de To Be para 'They':\n\n\"My parents ___ born in Portugal.\" (foram / eram)",
        "resposta": "were",
        "explicacao": "My parents = They → were."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete a resposta curta afirmativa no passado:\n\n\"Were you at home? — Yes, I ___.\"",
        "resposta": "was",
        "explicacao": "Yes, I was."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma negativa contraída de 'were not':\n\n\"The employees ___ satisfied with the proposal.\" (não estavam)",
        "resposta": "weren't",
        "explicacao": "Weren't."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON A2.2: Past Simple (Regular Verbs)
  // ─────────────────────────────────────────────────────────────
  "a2-lez2": {
    "id": "a2-lez2",
    "num": "Lesson 2",
    "titulo": "Past Simple (Regular Verbs)",
    "subtitulo": "Ações Concluídas no Passado — O Sufixo -ed e suas 3 Pronúncias",
    "cena": {
      "origem": "dialogo",
      "titulo": "Reporting Yesterday's Accomplishments",
      "texto": "**Manager:** Did you complete the project milestones yesterday?\n**Sophia:** Yes! I finished the design draft, called the client, and uploaded all assets to the cloud.\n**Manager:** Fantastic! Did you test the payment gateway?\n**Sophia:** Lucas tested the gateway in the morning, and it worked perfectly without any errors."
    },
    "fio": {
      "abertura": "Como transformar qualquer verbo regular no passado em inglês? Adicionando as letras '-ed'. Mas por que tantos estrangeiros soam artificiais ao falar essas palavras?",
      "descoberta": "O segredo não está na escrita, mas na PRONÚNCIA. Nativos NUNCA pronunciam a letra 'e' na maioria dos verbos: 'worked' soa como /wɜːkt/ (terminando em som de 'T') e 'called' soa como /kɔːld/ (som de 'D'). Apenas verbos que terminam em T ou D ganham uma sílaba extra (/ɪd/) como em 'wanted'!",
      "fecho": "Agora você domina a chave que separa o sotaque amador da pronúncia lapidada: os três sons do sufixo -ed."
    },
    "alerta": "Nunca pronuncie 'work-ed' ou 'play-ed' com duas sílabas. O 'e' é mudo na imensa maioria dos casos. Diga /wɜːkt/ e /pleɪd/ em uma única sílaba fluida.",
    "definicao": {
      "fenomeno": "Worked (/t/) · Played (/d/) · Wanted (/ɪd/) · Started (/ɪd/) · Decided (/ɪd/)",
      "causa": "Por que o sufixo -ed tem três pronúncias distintas?",
      "conceito": "A fonologia inglesa economiza esforço articulatório. Após sons surdos (voiceless: p, k, f, s, sh, ch), o -ed soa como **/t/**. Após sons sonoros (voiced: vogais, b, g, v, z, m, n, l, r), soa como **/d/**. Apenas após sons de **T** ou **D** adiciona-se uma nova sílaba cheia **/ɪd/**."
    },
    "inventario": [
      "A regra ortográfica geral: adição de '-ed' (work → worked)",
      "Verbos terminados em 'e': apenas adição de '-d' (live → lived, decide → decided)",
      "Verbos Consoante + Y: troca por '-ied' (study → studied, cry → cried)",
      "A regra CVC (Consoante-Vogal-Consoante): dobra a consoante final (stop → stopped, plan → planned)",
      "As 3 regras de pronúncia: som /t/, som /d/ e som silábico /ɪd/"
    ],
    "tabela_visual": "| Regra Ortográfica | Condição | Infinitivo | Passado Simples (-ed) | Pronúncia IPA |\n|---|---|---|---|---|\n| **Geral (+ed)** | Maioria dos verbos | watch, work, rain | *watched, worked, rained* | /wɒtʃt/, /wɜːkt/, /reɪnd/ |\n| **Terminados em E (+d)** | Já têm a letra E | live, dance, close | *lived, danced, closed* | /lɪvd/, /dɑːnst/, /kləʊzd/ |\n| **Consoante + Y (ied)** | Y precedido de consoante | study, marry, carry | *studied, married, carried* | /ˈstʌdid/, /ˈmærid/ |\n| **Regra CVC (Dobra)** | 1 sílaba tônica C-V-C | stop, plan, drop | *stopped, planned, dropped* | /stɒpt/, /plænd/ |\n| **Sons /t/ e /d/ finais** | Terminam em som T ou D | want, need, visit | *wanted, needed, visited* | /ˈwɒntɪd/, /ˈniːdɪd/ |",
    "observacao_cards": [
      {
        "ingles": "Worked (/t/)",
        "traducao": "Trabalhou (som surdo)",
        "genero": "Pronúncia /t/",
        "motivo": "O som final de 'work' é /k/ (sem vibração nas cordas vocais). O -ed vira um /t/ seco e rápido: /wɜːkt/."
      },
      {
        "ingles": "Played (/d/)",
        "traducao": "Jogou / Tocou (som sonoro)",
        "genero": "Pronúncia /d/",
        "motivo": "Termina em som de vogal /eɪ/ (cordas vocais vibram). O -ed vira um /d/ suave: /pleɪd/."
      },
      {
        "ingles": "Wanted (/ɪd/)",
        "traducao": "Quis / Queria (sílaba extra)",
        "genero": "Pronúncia /ɪd/",
        "motivo": "Como a palavra já termina em 'T', é fisicamente impossível emendar outro T sem criar uma nova sílaba: /ˈwɒntɪd/."
      },
      {
        "ingles": "Decided (/ɪd/)",
        "traducao": "Decidiu (sílaba extra)",
        "genero": "Pronúncia /ɪd/",
        "motivo": "Termina em som de 'D'. Cria nova sílaba: /dɪˈsaɪdɪd/."
      },
      {
        "ingles": "Studied",
        "traducao": "Estudou (troca de Y)",
        "genero": "Ortografia Especial",
        "motivo": "D + Y: a consoante expulsa o 'y' e introduz '-ied' (*study → studied*)."
      },
      {
        "ingles": "Stopped",
        "traducao": "Parou (regra CVC)",
        "genero": "Ortografia Especial",
        "motivo": "S-T-O-P termina em Consoante-Vogal-Consoante: dobra o 'p' (*stopped*)."
      }
    ],
    "tecnica": "### O Segredo de Ouro da Pronúncia do -ED:\n\nFaça apenas uma pergunta:\n* **A palavra termina no som de T ou D?**\n  - Se **SIM** (ex: *want, need, start, invite, decide*) → Pronuncie com sílaba extra: **-id** (*wanted, needed, started*).\n  - Se **NÃO** (ex: *work, call, play, live, finish, clean*) → **O 'E' É MUDO!** Emende direto o som de 'T' ou 'D' sem criar sílaba nova (*worked = workt*, *called = calld*).",
    "teoria": "### A Natureza Pontual do Past Simple\n\nO Past Simple é o tempo narrativo por excelência na língua inglesa. Ele descreve:\n* **Ações Totalmente Concluídas:** Ocorridas em um momento definido do passado que já terminou (*I visited London in 2022*).\n* **Sequência de Ações (Storytelling):** *He entered the room, turned on the light, and opened the window*.\n\n#### Marcadores Temporais Definitivos do Passado:\nSempre que vir estes marcadores, o verbo deve ir obrigatoriamente para o Past Simple:\n* **Yesterday** (yesterday morning, yesterday evening)\n* **Last...** (last night, last week, last month, last year)\n* **...ago** (two days ago, five minutes ago, ten years ago)\n* **In + ano passado** (in 1995, in 2020).",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: A Pronúncia Brasileira do '-ED'\n\n1. **O Vício de Pronunciar o 'E':**\n   - Brasileiros costumam ler foneticamente: *\"wor-ked\"*, *\"clo-sed\"*, *\"li-ved\"*.\n   - Isso soa extremamente estranho para nativos e quebra o ritmo do inglês.\n   - Lembre-se: em 90% dos verbos, a letra 'E' NÃO EXISTE na fala: **worked** é monossílabo (/wɜːkt/).\n\n2. **A Mesma Forma para Todas as Pessoas:**\n   - Em português: *eu trabalhei, você trabalhou, nós trabalhamos, eles trabalharam*.\n   - Em inglês: **worked** serve para rigorosamente todas as pessoas gramaticais!",
    "exemplos_prc": [
      {
        "oracao": "They lived in San Francisco for ten years before moving to Austin.",
        "pergunta": "Como se pronuncia a palavra 'lived' nesta oração?",
        "resposta": "Pronuncia-se como uma única sílaba /lɪvd/, com o 'e' completamente mudo e o som suave de /d/ no final.",
        "conclusao": "Eles moraram em São Francisco por dez anos antes de se mudarem para Austin."
      },
      {
        "oracao": "The project manager started the presentation promptly at 9:00 AM.",
        "pergunta": "Por que a pronúncia de 'started' tem duas sílabas (/ˈstɑːtɪd/)?",
        "resposta": "Porque a forma base 'start' termina com som de 'T', o que exige a terminação silábica cheia /ɪd/.",
        "conclusao": "O gerente de projetos iniciou a apresentação pontualmente às 9h."
      },
      {
        "oracao": "Carlos studied software engineering at university three years ago.",
        "pergunta": "Qual regra ortográfica foi aplicada ao verbo 'study'?",
        "resposta": "A consoante 'd' antes do 'y' exigiu a troca de 'y' por '-ied' (studied).",
        "conclusao": "Carlos estudou engenharia de software na universidade há três anos."
      },
      {
        "oracao": "The driver stopped the bus immediately when the light turned red.",
        "pergunta": "Por que o verbo 'stop' dobrou a letra 'p' (stopped)?",
        "resposta": "Porque é um verbo monossilábico terminado na sequência Consoante-Vogal-Consoante (t-o-p).",
        "conclusao": "O motorista parou o ônibus imediatamente quando o semáforo ficou vermelho."
      }
    ],
    "armadilhas": [
      {
        "errado": "He worked all day yesterday. (pronunciado 'uor-ked')",
        "certo": "He worked all day yesterday. (pronunciado /wɜːkt/)",
        "motivo": "O 'e' de -ed é mudo na maioria dos verbos. Pronuncie 'workt'."
      },
      {
        "errado": "She studyed hard for the exam.",
        "certo": "She studied hard for the exam.",
        "motivo": "Consoante + Y troca por '-ied': studied."
      },
      {
        "errado": "They stoped at the gas station.",
        "certo": "They stopped at the gas station.",
        "motivo": "Verbos de uma sílaba terminados em CVC dobram a consoante final: stopped."
      },
      {
        "errado": "We visited London two years before.",
        "certo": "We visited London two years ago.",
        "motivo": "Para indicar tempo decorrido do passado até agora, use 'ago', não 'before'."
      }
    ],
    "coda": "Só pronuncie o 'E' do -ed se o verbo terminar em som de T ou D. Em todos os outros, o 'E' é mudo.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Em qual dos seguintes verbos no passado a terminação '-ed' é pronunciada com SÍLABA EXTRA (/ɪd/)?",
        "opcoes": ["worked", "played", "decided", "cleaned"],
        "resposta": 2,
        "explicacao": "DECIDE termina em som de /d/ → no passado pronuncia-se com sílaba extra: /dɪˈsaɪdɪd/."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual é a grafia correta no passado do verbo 'try' (tentar)?",
        "opcoes": ["tryed", "tried", "tryd", "tryied"],
        "resposta": 1,
        "explicacao": "Consoante (r) + y troca por -ied: TRIED."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o verbo regular no passado:\n\n\"The police officer ___ the vehicle because of speeding.\"\n(= O policial parou o veículo por causa de excesso de velocidade.)",
        "opcoes": ["stoped", "stopped", "stoppied", "was stop"],
        "resposta": 1,
        "explicacao": "Regra CVC: dobra o 'p' → STOPPED."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase está gramaticalmente PERFEITA em inglês?",
        "opcoes": [
          "I graduated from university three years ago.",
          "I graduated from university three years before.",
          "I graduate from university three years ago.",
          "I did graduated from university three years ago."
        ],
        "resposta": 0,
        "explicacao": "'Three years ago' com verbo no Past Simple (graduated) é a construção perfeita."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com a pronúncia correta de /t/:\n\n\"She ___ the presentation with a powerful quotation.\"\n(Ela finalizou a apresentação com uma citação poderosa. Verbo: finish)",
        "revelacao": "She finished the presentation with a powerful quotation.",
        "explicacao": "Finished (/fɪnɪʃt/)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com som /ɪd/:\n\n\"The flight ___ at JFK airport two hours late.\"\n(O voo pousou no aeroporto JFK com duas horas de atraso. Verbo: land)",
        "revelacao": "The flight landed at JFK airport two hours late.",
        "explicacao": "Landed (/ˈlændɪd/)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com som /d/:\n\n\"We ___ tennis for two hours on Saturday morning.\"\n(Nós jogamos tênis por duas horas na manhã de sábado. Verbo: play)",
        "revelacao": "We played tennis for two hours on Saturday morning.",
        "explicacao": "Played (/pleɪd/)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"Carlos ___ his apartment before the guests arrived.\"\n(Carlos limpou seu apartamento antes que os convidados chegassem. Verbo: clean)",
        "revelacao": "Carlos cleaned his apartment before the guests arrived.",
        "explicacao": "Cleaned (/kliːnd/)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma de passado do verbo 'work':\n\n\"He ___ overtime last night to meet the deadline.\"",
        "resposta": "worked",
        "explicacao": "Worked."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma de passado do verbo 'study':\n\n\"She ___ law at Harvard University.\"",
        "resposta": "studied",
        "explicacao": "Consoante + y vira -ied: studied."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma de passado do verbo 'plan':\n\n\"We ___ our summer vacation months in advance.\"",
        "resposta": "planned",
        "explicacao": "Regra CVC dobra o n: planned."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que significa 'atrás / faz tempo':\n\n\"I finished my degree four years ___.\"",
        "resposta": "ago",
        "explicacao": "Ago expressa tempo decorrido no passado."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON A2.3: Past Simple (Irregular Verbs)
  // ─────────────────────────────────────────────────────────────
  "a2-lez3": {
    "id": "a2-lez3",
    "num": "Lesson 3",
    "titulo": "Past Simple (Irregular Verbs)",
    "subtitulo": "Os 20 Verbos Mais Frequentes — Went, Had, Saw, Took, Made",
    "cena": {
      "origem": "dialogo",
      "titulo": "Monday Morning Office Talk",
      "texto": "**Liam:** How was your weekend in New York, Maria?\n**Maria:** It was incredible! We went to Central Park, saw a Broadway show, and took hundreds of photos.\n**Liam:** Did you eat at that famous Italian place downtown?\n**Maria:** Yes! We had dinner there on Saturday, and I met the head chef."
    },
    "fio": {
      "abertura": "Ao contrário dos verbos regulares com '-ed', os verbos mais antigos e vitais da língua inglesa transformam seu próprio corpo no passado. São os verbos irregulares.",
      "descoberta": "Veja Maria relatando seu fim de semana: «we went» (de go), «saw» (de see), «took» (de take), «had» (de have) e «met» (de meet). Nenhum deles termina em -ed. Mas há uma grande vantagem: a mesma forma serve para 'I', 'he', 'she' e 'they' sem exceção!",
      "fecho": "Agora você domina o pelotão de elite dos 20 verbos irregulares mais falados do planeta, essenciais para relatar qualquer história da sua vida."
    },
    "alerta": "Não tente decorar listas de 200 verbos em ordem alfabética. Foque nos 20 verbos que representam 80% de todas as conversas reais: go/went, have/had, see/saw, buy/bought, take/took, make/made.",
    "definicao": {
      "fenomeno": "Go → Went · Have → Had · See → Saw · Take → Took · Buy → Bought · Make → Made",
      "causa": "Por que esses verbos não aceitam -ed no passado?",
      "conceito": "Os verbos irregulares são heranças do inglês germânico antigo (verbos fortes) que mudam a vogal da raiz. No inglês moderno, eles **mantêm a mesma forma invariável para todas as pessoas gramaticais** no Past Simple afirmativo."
    },
    "inventario": [
      "A invariabilidade: a forma irregular serve para I, You, He, She, We, They igualmente",
      "Os verbos de movimento vitais: go → went / come → came / leave → left",
      "Os verbos de posse e ação: have → had / make → made / take → took / get → got",
      "Os verbos de percepção e fala: see → saw / say → said / tell → told / hear → heard",
      "A regra de ouro: verbos irregulares só aparecem na AFIRMATIVA; na negativa e pergunta volta a forma básica!"
    ],
    "tabela_visual": "| Infinitivo (Presente) | Passado Irregular | Tradução | Exemplo Canônico |\n|---|---|---|---|\n| **go** | **went** | fui, foi, fomos, foram | *We went to the beach.* |\n| **have** | **had** | tive, tinha, tivemos | *I had a busy day.* |\n| **see** | **saw** | vi, viu, vimos, viram | *She saw a doctor.* |\n| **take** | **took** | peguei, tomou, levou | *He took the subway.* |\n| **make** | **made** | fiz, fez, fizemos | *They made a decision.* |\n| **buy** | **bought** | comprei, comprou | *I bought a new phone.* |\n| **get** | **got** | consegui, ficou, chegou | *We got home late.* |",
    "observacao_cards": [
      {
        "ingles": "Go → Went",
        "traducao": "Ir → Foi / Fui",
        "genero": "Movimento Essencial",
        "motivo": "O verbo mais irregular de todos: 'went' herdou a raiz de outro verbo antigo ('wend'). Invariável: 'I went, they went'."
      },
      {
        "ingles": "See → Saw",
        "traducao": "Ver → Viu / Vi",
        "genero": "Percepção",
        "motivo": "Pronuncia-se com 'ó' aberto (/sɔː/), sem som de 'w': 'I saw a movie'."
      },
      {
        "ingles": "Buy → Bought",
        "traducao": "Comprar → Comprou",
        "genero": "Comércio",
        "motivo": "A terminação '-ought' soa simplesmente como /bɔːt/ (o 'gh' é 100% mudo)."
      },
      {
        "ingles": "Take → Took",
        "traducao": "Pegar/Levar → Pegou",
        "genero": "Ação Frequente",
        "motivo": "O duplo 'oo' tem som curto /tʊk/: 'He took a taxi'."
      },
      {
        "ingles": "Say → Said",
        "traducao": "Dizer → Disse",
        "genero": "Comunicação",
        "motivo": "Pronúncia especial: soa como /sɛd/ (com som de 'é' curto, rimando com 'red')."
      },
      {
        "ingles": "Make → Made",
        "traducao": "Fazer → Fez",
        "genero": "Criação",
        "motivo": "Usa-se para criar, produzir ou decidir: 'She made a reservation'."
      }
    ],
    "tecnica": "### O Truque das Famílias Sonoras de Irregulares:\n\nEm vez de decorar listas alfabéticas, agrupe por famílias fonéticas:\n1. **A família do som /ɔːt/ (-ought / -aught):**\n   - *buy → bought* · *bring → brought* · *think → thought* · *catch → caught*.\n2. **A família da mudança simples de vogal:**\n   - *sing → sang* · *drink → drank* · *swim → swam* · *begin → began*.\n3. **A família do /uː/ ou /ʊ/ (oo/ew):**\n   - *take → took* · *stand → stood* · *know → knew* · *grow → grew*.",
    "teoria": "### A Regra Crítica: Irregulares Apenas na Afirmativa!\n\nEste é o maior alívio gramatical para qualquer estudante:\n* **Na Afirmativa:** Você precisa da forma irregular (*He **went** to Paris*).\n* **Na Negativa:** O auxiliar *didn't* entra em cena e o verbo volta ao infinitivo básico puro (*He **didn't go** to Paris* ❌ nunca *didn't went*!).\n* **Na Pergunta:** O auxiliar *did* faz a mesma coisa (*Where **did he go**?* ❌ nunca *did he went*!).\n\nIsso significa que você só usa a forma memorizada quando estiver AFIRMANDO algo.",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: A Simplicidade das Pessoas\n\n1. **Seis conjugações vs Uma Única:**\n   - Português: *eu fui, tu foste, ele foi, nós fomos, vós fostes, eles foram* (6 formas complexas).\n   - Inglês: **went** para absolutamente todas as pessoas: *I went, you went, he went, she went, we went, they went*!\n\n2. **Cuidado com 'Said':**\n   - Brasileiros costumam falar *sayed* ou pronunciar /seɪd/. Lembre-se: pronuncia-se **SED** (/sɛd/).",
    "exemplos_prc": [
      {
        "oracao": "We bought our flight tickets two months ago online.",
        "pergunta": "Qual é a forma básica do verbo 'bought' e como se pronuncia?",
        "resposta": "A forma básica é 'buy' e a pronúncia do passado é /bɔːt/, com 'gh' totalmente mudo.",
        "conclusao": "Compramos nossas passagens aéreas há dois meses pela internet."
      },
      {
        "oracao": "Sophia saw her doctor yesterday morning and got a prescription.",
        "pergunta": "Identifique os dois verbos irregulares nesta frase.",
        "resposta": "'Saw' (passado de see) e 'got' (passado de get), ambos na afirmativa singular.",
        "conclusao": "Sophia consultou o médico dela ontem de manhã e conseguiu uma receita."
      },
      {
        "oracao": "The train came on time, but I took the wrong connection.",
        "pergunta": "Quais os verbos no infinitivo correspondentes a 'came' e 'took'?",
        "resposta": "'Come' (vir) e 'take' (pegar/tomar).",
        "conclusao": "O trem veio no horário, mas eu peguei a baldeação errada."
      },
      {
        "oracao": "He made a brilliant presentation to the board of directors.",
        "pergunta": "Por que se usou 'made' e não 'did'?",
        "resposta": "Porque com apresentações, discursos e propostas usa-se a colocation 'make a presentation' (no passado: made).",
        "conclusao": "Ele fez uma apresentação brilhante para a diretoria."
      }
    ],
    "armadilhas": [
      {
        "errado": "I goed to the cinema yesterday.",
        "certo": "I went to the cinema yesterday.",
        "motivo": "'Go' é irregular e seu passado é 'went', nunca 'goed'."
      },
      {
        "errado": "He buyed a new laptop.",
        "certo": "He bought a new laptop.",
        "motivo": "O passado do verbo buy é 'bought'."
      },
      {
        "errado": "I didn't saw you at the party.",
        "certo": "I didn't see you at the party.",
        "motivo": "Após o auxiliar 'didn't', o verbo volta à forma básica pura 'see'."
      },
      {
        "errado": "She taked three aspirin.",
        "certo": "She took three aspirin.",
        "motivo": "O passado do verbo take é 'took'."
      }
    ],
    "coda": "Verbo irregular só mostra a cara na afirmativa: go vira went, see vira saw, have vira had. Uma forma para todo mundo.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o passado irregular de 'go':\n\n\"Last weekend, my colleagues and I ___ to the tech conference.\"\n(= No fim de semana passado, meus colegas e eu fomos à conferência de tecnologia.)",
        "opcoes": ["goed", "went", "gone", "was go"],
        "resposta": 1,
        "explicacao": "O passado afirmativo de GO é WENT."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o passado irregular de 'buy':\n\n\"Sophia ___ a beautiful dress for the wedding.\"\n(= Sophia comprou um lindo vestido para o casamento.)",
        "opcoes": ["buyed", "bought", "boated", "buying"],
        "resposta": 1,
        "explicacao": "O passado do verbo buy é BOUGHT."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase está gramaticalmente CORRETA?",
        "opcoes": [
          "He had lunch with his manager yesterday.",
          "He haved lunch with his manager yesterday.",
          "He was have lunch with his manager yesterday.",
          "He hads lunch with his manager yesterday."
        ],
        "resposta": 0,
        "explicacao": "O passado simples de have é HAD para todas as pessoas."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o passado de 'see':\n\n\"I ___ an interesting documentary about artificial intelligence last night.\"\n(= Eu vi um documentário interessante sobre inteligência artificial ontem à noite.)",
        "opcoes": ["seed", "saw", "seen", "sawed"],
        "resposta": 1,
        "explicacao": "O passado simples de see é SAW."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com o passado de 'take':\n\n\"We ___ the high-speed train from Rome to Milan.\"\n(Pegamos o trem de alta velocidade de Roma para Milão.)",
        "revelacao": "We took the high-speed train from Rome to Milan.",
        "explicacao": "Take → Took."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com o passado de 'make':\n\n\"She ___ an excellent suggestion during the meeting.\"\n(Ela fez uma excelente sugestão durante a reunião.)",
        "revelacao": "She made an excellent suggestion during the meeting.",
        "explicacao": "Make → Made."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com o passado de 'get':\n\n\"Carlos ___ a promotion at work last month.\"\n(Carlos conseguiu uma promoção no trabalho no mês passado.)",
        "revelacao": "Carlos got a promotion at work last month.",
        "explicacao": "Get → Got."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com o passado de 'say':\n\n\"The director ___ that our project was approved.\"\n(O diretor disse que nosso projeto foi aprovado.)",
        "revelacao": "The director said that our project was approved.",
        "explicacao": "Say → Said (/sɛd/)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o passado do verbo 'go':\n\n\"They ___ to London on vacation last summer.\" (foram)",
        "resposta": "went",
        "explicacao": "Go vira went."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o passado do verbo 'have':\n\n\"I ___ a terrible headache yesterday afternoon.\" (tive)",
        "resposta": "had",
        "explicacao": "Have vira had."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o passado do verbo 'see':\n\n\"She ___ her best friend at the shopping mall.\" (viu)",
        "resposta": "saw",
        "explicacao": "See vira saw."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o passado do verbo 'take':\n\n\"He ___ an umbrella because it looked like rain.\" (levou / pegou)",
        "resposta": "took",
        "explicacao": "Take vira took."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON A2.4: Past Simple (Negative & Questions)
  // ─────────────────────────────────────────────────────────────
  "a2-lez4": {
    "id": "a2-lez4",
    "num": "Lesson 4",
    "titulo": "Past Simple (Negative & Questions)",
    "subtitulo": "O Poder do Auxiliar DID — Didn't vs Did",
    "cena": {
      "origem": "dialogo",
      "titulo": "Investigating a Missed Delivery",
      "texto": "**Customer:** Did you receive my package yesterday, as promised?\n**Agent:** I checked our logistics system, but the courier didn't deliver it.\n**Customer:** Why didn't he deliver it? Did he have the wrong address?\n**Agent:** No, he had the correct address, but nobody answered the front door."
    },
    "fio": {
      "abertura": "Se na afirmativa você precisou aprender -ed e verbos irregulares, agora vem a recompensa: na negativa e nas perguntas, todos os verbos ficam 100% puros!",
      "descoberta": "Olhe com atenção para o diálogo: «Did you receive», «the courier didn't deliver» e «Why didn't he deliver». O verbo 'receive' e 'deliver' estão na forma básica do presente! Quem assumiu todo o peso do passado foi a palavrinha mágica «DID».",
      "fecho": "Você acaba de dominar a regra mais libertadora do inglês: quando DID ou DIDN'T entra na frase, o verbo principal descansa na forma básica de dicionário."
    },
    "alerta": "O erro de dizer *'I didn't went'* ou *'Did you saw?'* é gravíssimo. O passado já foi marcado pelo 'did'; colocar o verbo principal no passado é uma dupla marcação agramatical.",
    "definicao": {
      "fenomeno": "I went → I didn't go · Did you go? · She bought → She didn't buy · Did she buy?",
      "causa": "Por que o verbo principal volta ao infinitivo quando usamos DID?",
      "conceito": "'DID' é o passado do verbo auxiliar DO. Uma vez que o auxiliar carrega a marca temporal de passado, a gramática inglesa proíbe redundância. O verbo principal retorna compulsoriamente à sua **forma básica** (*base form*)."
    },
    "inventario": [
      "A estrutura da negativa no passado: Sujeito + DIDN'T (did not) + Verbo Básico",
      "A estrutura da pergunta de Sim/Não: DID + Sujeito + Verbo Básico?",
      "A estrutura com Question Words: QW + DID + Sujeito + Verbo Básico?",
      "Respostas curtas polidas: Yes, I did / No, I didn't",
      "A invariabilidade: DIDN'T e DID são usados com todas as pessoas (I, you, he, she, we, they)"
    ],
    "tabela_visual": "| Modo | Fórmula Estrutural | Exemplo Correto | Exemplo com Erro Fatal |\n|---|---|---|---|\n| **Afirmativa** | Sujeito + Verbo no Passado | *I went to school.* | — |\n| **Negativa** | Sujeito + **didn't** + **Verbo Puro** | *I **didn't go** to school.* | ❌ *I didn't went.* |\n| **Pergunta Sim/Não** | **Did** + Sujeito + **Verbo Puro**? | ***Did you go** to school?* | ❌ *Did you went?* |\n| **Pergunta com QW** | QW + **did** + Sujeito + **Verbo Puro**? | *What **did you buy**?* | ❌ *What did you bought?* |\n| **Resposta Curta** | *Yes, [pronome] did.* / *No, [pronome] didn't.* | *Did he call? — Yes, he did.* | ❌ *Yes, he called.* |",
    "observacao_cards": [
      {
        "ingles": "Didn't + Verbo Puro",
        "traducao": "Não (+ verbo no passado)",
        "genero": "Negação Universal",
        "motivo": "Contração de 'did not'. Serve para todas as pessoas: 'I didn't sleep', 'She didn't know'."
      },
      {
        "ingles": "Did you...?",
        "traducao": "Você (+ verbo no passado)?",
        "genero": "Pergunta Passada",
        "motivo": "Anuncia que a pergunta é sobre o passado: 'Did you see that?'"
      },
      {
        "ingles": "Yes, I did",
        "traducao": "Sim (afirmativa curta)",
        "genero": "Resposta Curta",
        "motivo": "Usa o auxiliar do passado: 'Did you lock the door? — Yes, I did.'"
      },
      {
        "ingles": "No, I didn't",
        "traducao": "Não (negativa curta)",
        "genero": "Resposta Curta",
        "motivo": "Polidez nativa: 'Did you call him? — No, I didn't.'"
      },
      {
        "ingles": "Why did you...?",
        "traducao": "Por que você (+ verbo)?",
        "genero": "Pergunta Aberta",
        "motivo": "QW + did + sujeito + verbo: 'Why did you leave so early?'"
      },
      {
        "ingles": "What did you say?",
        "traducao": "O que você disse?",
        "genero": "Expressão Cotidiana",
        "motivo": "Frase de sobrevivência auditiva. O verbo 'say' fica puro."
      }
    ],
    "tecnica": "### O Algoritmo Anti-Dupla Marcação:\n\n1. **Você está negando ou perguntando algo que aconteceu no passado?**\n   - Negativa → Coloque **didn't**.\n   - Pergunta → Abra com **Did** (ou QW + *did*).\n\n2. **Qual é o verbo principal da ação?**\n   - Deixe o verbo **100% puro** de dicionário:\n     - *go* (nunca *went*)\n     - *see* (nunca *saw*)\n     - *work* (nunca *worked*)\n\n3. **Verificação de segurança:**\n   - Se tem *DID* ou *DIDN'T*, o verbo NUNCA pode ter -ed nem forma irregular!",
    "teoria": "### A Teoria da Redundância Proibida\n\nNo inglês moderno, a flexão de passado é considerada um \"encargo sintático\". Esse encargo só pode ser carregado por um único elemento por oração:\n* Na oração afirmativa, como não há auxiliar, o encargo recai sobre o verbo principal (*She spoke*).\n* Na oração negativa e interrogativa, o auxiliar **DID** entra em campo e assume 100% do encargo de passado. O verbo principal fica completamente liberado e retorna ao seu estado neutro (*She didn't speak* · *Did she speak?*).\n\n<div class=\"gram-regola\"><strong>Atenção com o Verbo To Be:</strong> Lembre-se sempre de que o verbo To Be (was/were) não aceita <em>did</em>. Nunca diga <em>Did you be happy?</em>. Diga <em>Were you happy?</em>.</div>",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: A Dupla Marcação Mental\n\n1. **A Inércia do Português:**\n   - Em português, o verbo continua conjugado no passado tanto na afirmativa quanto na negativa:\n     - *\"Eu fui\"* → *\"Eu não fui\"*.\n   - No inglês, se você mantiver o passado na negativa (*I didn't went*), soará aos ouvidos de um nativo exatamente como *\"Eu não fui fui\"*.\n\n2. **A Resposta Eco:**\n   - Em português: *\"Você viu o e-mail? — Vi.\"*\n   - Em inglês, responder repetindo o verbo (*I saw*) é incorreto. Responda com o auxiliar: **Yes, I did**.",
    "exemplos_prc": [
      {
        "oracao": "Did you finish the financial audit yesterday? — Yes, I did.",
        "pergunta": "Por que o verbo 'finish' não tem a terminação '-ed'?",
        "resposta": "Porque o auxiliar 'Did' no início da oração já carrega a marca de tempo passado, exigindo o verbo na forma pura.",
        "conclusao": "Você terminou a auditoria financeira ontem? — Sim, terminei."
      },
      {
        "oracao": "They didn't buy the house because the price was too high.",
        "pergunta": "Qual a estrutura negativa empregada na primeira oração?",
        "resposta": "O pronome 'They' seguido de 'didn't' e do verbo básico puro 'buy' (em vez da forma irregular 'bought').",
        "conclusao": "Eles não compraram a casa porque o preço estava alto demais."
      },
      {
        "oracao": "Where did you go on vacation last winter?",
        "pergunta": "Qual a ordem canônica desta pergunta com Question Word?",
        "resposta": "Question Word (Where) + Auxiliar do passado (did) + Sujeito (you) + Verbo principal puro (go) + Complemento.",
        "conclusao": "Aonde você foi nas férias no inverno passado?"
      },
      {
        "oracao": "Why didn't she call us when she arrived at the airport?",
        "pergunta": "Que tipo de estrutura é 'Why didn't she call'?",
        "resposta": "Uma pergunta negativa no passado, combinando question word com 'didn't' para expressar surpresa ou questionar um motivo.",
        "conclusao": "Por que ela não nos ligou quando chegou ao aeroporto?"
      }
    ],
    "armadilhas": [
      {
        "errado": "I didn't went to the party.",
        "certo": "I didn't go to the party.",
        "motivo": "Com 'didn't', o verbo principal deve voltar à forma básica (go)."
      },
      {
        "errado": "Did you saw the news?",
        "certo": "Did you see the news?",
        "motivo": "Com 'did', o verbo fica na forma pura (see)."
      },
      {
        "errado": "Did you study yesterday? — Yes, I studied.",
        "certo": "Did you study yesterday? — Yes, I did.",
        "motivo": "Respostas curtas usam o auxiliar do passado: 'Yes, I did'."
      },
      {
        "errado": "She didn't liked the movie.",
        "certo": "She didn't like the movie.",
        "motivo": "Elimine o -ed após didn't: didn't like."
      }
    ],
    "coda": "Se DID ou DIDN'T entrou na frase, o verbo principal descansa no infinitivo puro. Dupla marcação nunca mais!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Qual frase negativa no passado está gramaticalmente CORRETA?",
        "opcoes": [
          "I didn't went to work yesterday.",
          "I didn't go to work yesterday.",
          "I not went to work yesterday.",
          "I didn't gone to work yesterday."
        ],
        "resposta": 1,
        "explicacao": "DIDN'T + verbo na forma básica pura (go): 'I didn't go to work yesterday'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a pergunta no passado:\n\n\"What time ___ you arrive at the hotel last night?\"\n(= A que horas você chegou ao hotel ontem à noite?)",
        "opcoes": ["did", "were", "do", "have"],
        "resposta": 0,
        "explicacao": "O auxiliar interrogativo do passado para verbos de ação é DID."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual é a resposta curta correta para:\n\n\"Did Lucas pass his driving test?\"",
        "opcoes": [
          "Yes, he passed.",
          "Yes, he did.",
          "Yes, he was.",
          "Yes, he does."
        ],
        "resposta": 1,
        "explicacao": "A resposta curta afirmativa padrão usa o auxiliar: 'Yes, he did'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase interrogativa evita a dupla marcação?",
        "opcoes": [
          "Did she called you yesterday?",
          "Did she call you yesterday?",
          "Does she called you yesterday?",
          "Was she call you yesterday?"
        ],
        "resposta": 1,
        "explicacao": "Did + she + call (verbo puro sem -ed)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com a negação correta:\n\n\"We ___ the contract because the terms were unfair.\"\n(Nós não assinamos o contrato porque os termos eram injustos. Verbo: sign)",
        "revelacao": "We didn't sign the contract because the terms were unfair.",
        "explicacao": "Didn't sign (verbo puro)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente a pergunta:\n\n\"Where ___ you ___ that beautiful leather bag?\"\n(Onde você comprou essa linda bolsa de couro? Verbo: buy)",
        "revelacao": "Where did you buy that beautiful leather bag?",
        "explicacao": "Where did you buy (buy fica puro)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente a resposta negativa:\n\n\"Did they enjoy the concert? — No, they ___.\"\n(Eles gostaram do show? — Não, não gostaram.)",
        "revelacao": "Did they enjoy the concert? — No, they didn't.",
        "explicacao": "No, they didn't."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"I ___ my keys, but I found my wallet.\"\n(Eu não encontrei minhas chaves, mas encontrei minha carteira. Verbo: find)",
        "revelacao": "I didn't find my keys, but I found my wallet.",
        "explicacao": "Didn't find (find no infinitivo)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o auxiliar negativo contraído do passado:\n\n\"She ___ come to the office today.\" (não)",
        "resposta": "didn't",
        "explicacao": "Didn't é o auxiliar negativo do passado."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o verbo puro que completa a pergunta (verbo ver):\n\n\"Did you ___ the new movie yesterday?\" (ver)",
        "resposta": "see",
        "explicacao": "Após 'did' usa-se a forma básica see (nunca saw)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o auxiliar que abre a pergunta de passado:\n\n\"___ they finish the project on time?\"",
        "resposta": "Did",
        "explicacao": "Did abre perguntas no passado."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete a resposta curta negativa:\n\n\"Did you receive my email? — No, I ___.\"",
        "resposta": "didn't",
        "explicacao": "No, I didn't."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON A2.5: Past Continuous
  // ─────────────────────────────────────────────────────────────
  "a2-lez5": {
    "id": "a2-lez5",
    "num": "Lesson 5",
    "titulo": "Past Continuous",
    "subtitulo": "Ações em Andamento no Passado — Was/Were + -ing",
    "cena": {
      "origem": "dialogo",
      "titulo": "Police Alibi Investigation",
      "texto": "**Detective:** Where were you yesterday at 8:00 PM, Mr. Davis?\n**Mr. Davis:** At 8:00 PM, I was having dinner with my wife at an Italian restaurant.\n**Detective:** Was anybody else sitting with you?\n**Mr. Davis:** Yes, our friends were dining with us. We were celebrating a birthday.\n**Detective:** And was it raining when you left the restaurant?"
    },
    "fio": {
      "abertura": "Imagine que você tira uma foto mental do que estava acontecendo ontem às 8h da noite. Não uma ação concluída e fechada, mas algo que estava em pleno andamento, em câmera lenta.",
      "descoberta": "Veja o depoimento de Mr. Davis: «I was having dinner», «our friends were dining with us» e «we were celebrating». A fórmula é familiar: pegue o passado do verbo To Be (was/were) e junte com o verbo no gerúndio (-ing). É o pretérito imperfeito contínuo em ação!",
      "fecho": "Agora você domina o cenário de fundo de qualquer narrativa: descrever o que estava acontecendo quando a história se desenrolou."
    },
    "alerta": "O Past Continuous é como o cenário de um filme: ele descreve a atmosfera, o que estava rolando no momento exato em que outra coisa pontual aconteceu.",
    "definicao": {
      "fenomeno": "I was sleeping at midnight · She was working all morning · They were driving home",
      "causa": "Qual a diferença funcional entre Past Simple e Past Continuous?",
      "conceito": "**Past Simple** descreve uma ação pontual completada no passado (*I cooked dinner* = cozinhei o jantar, ação feita). **Past Continuous** descreve uma ação em progresso, incompleta ou em desenvolvimento em um momento específico do passado (*I was cooking dinner at 7 PM* = eu estava no meio do processo de cozinhar)."
    },
    "inventario": [
      "A estrutura afirmativa: Sujeito + WAS/WERE + Verbo-ING",
      "A estrutura negativa: Sujeito + WASN'T/WEREN'T + Verbo-ING",
      "A interrogação com inversão: WAS/WERE + Sujeito + Verbo-ING?",
      "O uso com horários exatos de referência (*At 9:00 PM yesterday, I was watching TV*)",
      "Ações paralelas simultâneas com WHILE (*While I was cooking, my wife was reading*)"
    ],
    "tabela_visual": "| Sujeito | Afirmativa (was/were + -ing) | Negativa (wasn't/weren't + -ing) | Pergunta Invertida |\n|---|---|---|---|\n| **I / He / She / It** | *He was sleeping.* | *He wasn't sleeping.* | *Was he sleeping?* |\n| **You / We / They** | *They were working.* | *They weren't working.* | *Were they working?* |",
    "observacao_cards": [
      {
        "ingles": "I was working",
        "traducao": "Eu estava trabalhando",
        "genero": "Ação em Andamento (Singular)",
        "motivo": "I, He, She e It usam 'was' + verbo com terminação -ing."
      },
      {
        "ingles": "They were playing",
        "traducao": "Eles estavam jogando/brincando",
        "genero": "Ação em Andamento (Plural)",
        "motivo": "You, We e They usam 'were' + verbo com terminação -ing."
      },
      {
        "ingles": "Wasn't doing",
        "traducao": "Não estava fazendo",
        "genero": "Negação Singular",
        "motivo": "Contração de 'was not' com o gerúndio: 'She wasn't paying attention'."
      },
      {
        "ingles": "Weren't listening",
        "traducao": "Não estavam ouvindo",
        "genero": "Negação Plural",
        "motivo": "Contração de 'were not' com o gerúndio: 'They weren't listening to the teacher'."
      },
      {
        "ingles": "What were you doing?",
        "traducao": "O que você estava fazendo?",
        "genero": "Pergunta Canônica",
        "motivo": "A pergunta mais famosa do Past Continuous: 'What were you doing yesterday at 8 PM?'"
      },
      {
        "ingles": "While",
        "traducao": "Enquanto",
        "genero": "Conector Temporal Contínuo",
        "motivo": "Conecta duas ações que aconteciam simultaneamente no passado: 'While I was studying, he was cooking'."
      }
    ],
    "tecnica": "### A Fórmula de Montagem do Past Continuous:\n\n$$\\text{[Sujeito]} + \\mathbf{WAS / WERE} + \\text{[Verbo Base]} + \\mathbf{-ING}$$\n\n1. **Escolha o auxiliar pelo sujeito:**\n   - Singular (*I, he, she, it*) → **was** (negativa: *wasn't*).\n   - Plural ou você (*you, we, they*) → **were** (negativa: *weren't*).\n\n2. **Pegue o verbo principal e coloque -ING:**\n   - *read* → `reading`\n   - *drive* → `driving`\n   - *run* → `running`\n\n3. **Use quando quiser dar ênfase à DURAÇÃO da ação em um momento passado.**",
    "teoria": "### Cenário de Fundo vs Interrupção\n\nO Past Continuous é amplamente utilizado em conjunto com o Past Simple para expressar duas ações combinadas:\n* **Ação Longa de Fundo (Past Continuous):** O que já estava rolando no ambiente.\n* **Ação Curta Interrompedora (Past Simple):** O evento repentino que quebrou a continuidade.\n\n*Exemplo clássico:*\n* *I **was having** a shower (ação longa contínua) when the telephone **rang** (evento curto e pontual).*",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: 'Estava Fazendo' vs 'Fazia'\n\n1. **O Pretérito Imperfeito do Português:**\n   - Em português podemos dizer: *\"Ontem às 8h eu jantava\"* ou *\"eu estava jantando\"*.\n   - No inglês, quando nos referimos a uma ação em curso naquele exato momento marcado no passado, a forma contínua é muito mais viva e natural: **I was having dinner.**\n\n2. **A Ação Simultânea com 'While':**\n   - Em português: *\"Enquanto eu estudava, ele dormia.\"*\n   - Em inglês: **While I was studying, he was sleeping.**",
    "exemplos_prc": [
      {
        "oracao": "What were you doing yesterday at 10:00 PM?",
        "pergunta": "Por que esta pergunta exigiu o Past Continuous em vez do Past Simple?",
        "resposta": "Porque pergunta sobre a atividade que estava em andamento em um horário específico e pontual do passado ('at 10:00 PM').",
        "conclusao": "O que você estava fazendo ontem às 22h?"
      },
      {
        "oracao": "It was raining heavily when we left the theater.",
        "pergunta": "Qual a relação temporal entre as duas orações?",
        "resposta": "'It was raining' descreve o cenário contínuo de fundo, enquanto 'we left' é o evento pontual no Past Simple.",
        "conclusao": "Estava chovendo forte quando nós saímos do teatro."
      },
      {
        "oracao": "While Carlos was cooking dinner, Sophia was setting the table.",
        "pergunta": "O que a palavra 'While' indica nesta oração?",
        "resposta": "Indica que duas ações contínuas estavam acontecendo simultaneamente e em paralelo no passado.",
        "conclusao": "Enquanto Carlos estava cozinhando o jantar, Sophia estava arrumando a mesa."
      },
      {
        "oracao": "I wasn't sleeping when you called; I was reading a book.",
        "pergunta": "Como foi construída a negação contínua nesta oração?",
        "resposta": "Utilizando 'wasn't' (was not) seguido do particípio presente 'sleeping' com a terminação -ing.",
        "conclusao": "Eu não estava dormindo quando você ligou; eu estava lendo um livro."
      }
    ],
    "armadilhas": [
      {
        "errado": "I was sleep when you called.",
        "certo": "I was sleeping when you called.",
        "motivo": "O Past Continuous exige a terminação -ing no verbo principal: was sleeping."
      },
      {
        "errado": "We was watching TV last night.",
        "certo": "We were watching TV last night.",
        "motivo": "Com o sujeito 'We', o auxiliar obrigatório é 'were', nunca 'was'."
      },
      {
        "errado": "What did you doing yesterday at 5 PM?",
        "certo": "What were you doing yesterday at 5 PM?",
        "motivo": "Ações contínuas usam was/were + ing, não o auxiliar 'did'."
      },
      {
        "errado": "While I cooked, he was reading.",
        "certo": "While I was cooking, he was reading.",
        "motivo": "Após 'while' para ações simultâneas, utiliza-se o Past Continuous."
      }
    ],
    "coda": "Para a foto em andamento no passado: WAS ou WERE + verbo com -ING. O cenário do filme ganha vida.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o Past Continuous correto:\n\n\"At 3:00 PM yesterday, Sophia ___ an important client presentation.\"\n(= Às 15h ontem, Sophia estava fazendo uma apresentação importante para clientes.)",
        "opcoes": ["was giving", "were giving", "did give", "is giving"],
        "resposta": 0,
        "explicacao": "Sophia = She → usa-se WAS GIVING."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete para o sujeito plural:\n\n\"The children ___ in the garden when the storm started.\"\n(= As crianças estavam brincando no jardim quando a tempestade começou.)",
        "opcoes": ["was playing", "were playing", "did play", "played"],
        "resposta": 1,
        "explicacao": "The children = They (plural) → usa-se WERE PLAYING."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual pergunta no Past Continuous está gramaticalmente PERFEITA?",
        "opcoes": [
          "What did you doing at 9:00 PM?",
          "What were you doing at 9:00 PM?",
          "What was you doing at 9:00 PM?",
          "What are you doing at 9:00 PM yesterday?"
        ],
        "resposta": 1,
        "explicacao": "'What were you doing...?' combina 'were' com 'you' e o gerúndio 'doing'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete as ações simultâneas com 'while':\n\n\"While David was driving, his wife ___ the map on her phone.\"\n(= Enquanto David estava dirigindo, a esposa dele estava verificando o mapa no celular.)",
        "opcoes": ["was checking", "were checking", "checked", "did check"],
        "resposta": 0,
        "explicacao": "His wife = She → was checking (ação simultânea em progresso)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com a negação singular:\n\n\"He ___ attention when the manager explained the procedure.\"\n(Ele não estava prestando atenção quando o gerente explicou o procedimento.)",
        "revelacao": "He wasn't paying attention when the manager explained the procedure.",
        "explicacao": "He wasn't paying attention."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente o cenário de fundo:\n\n\"It ___ heavily when we arrived at the airport.\"\n(Estava nevando forte quando chegamos ao aeroporto. Verbo: snow)",
        "revelacao": "It was snowing heavily when we arrived at the airport.",
        "explicacao": "It was snowing."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com plural:\n\n\"They ___ dinner when the power went out.\"\n(Eles estavam jantando quando a energia acabou.)",
        "revelacao": "They were having dinner when the power went out.",
        "explicacao": "They were having."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente a pergunta com inversão:\n\n\"___ you sleeping when I called you last night?\"\n(Você estava dormindo quando eu te liguei ontem à noite?)",
        "revelacao": "Were you sleeping when I called you last night?",
        "explicacao": "Were you sleeping."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma de Past Continuous de 'work' para 'I':\n\n\"I ___ in the garden all morning yesterday.\" (estava trabalhando)",
        "resposta": "was working",
        "explicacao": "I was working."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma do auxiliar no passado contínuo para 'We':\n\n\"We ___ watching a movie when the phone rang.\" (estávamos)",
        "resposta": "were",
        "explicacao": "We were watching."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a conjunção que significa 'enquanto':\n\n\"___ I was cooking, the children were doing their homework.\"",
        "resposta": "While",
        "explicacao": "While introduz ações contínuas simultâneas."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma negativa de 'was not' com 'drive':\n\n\"Lucas ___ fast when the accident happened.\" (não estava dirigindo)",
        "resposta": "wasn't driving",
        "explicacao": "Wasn't driving."
      }
    ]
  }
};

console.log('Gravando Onda 4 Parte 1 (Lições A2.1 a A2.5 completas)...');

for (const [id, lessonData] of Object.entries(wave4Part1Lessons)) {
  for (const mod of data.moduli) {
    const idx = mod.lezioni.findIndex(l => l.id === id);
    if (idx !== -1) {
      mod.lezioni[idx] = lessonData;
      console.log(`Lição ${id} (${lessonData.titulo}) enriquecida com sucesso!`);
    }
  }
}

fs.writeFileSync(grammarPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Onda 4 Parte 1 (A2.1 a A2.5) gravada com sucesso em data/grammar.json!');

