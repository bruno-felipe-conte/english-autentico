import fs from 'fs';

const grammarPath = 'data/grammar.json';
const data = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));

// Onda 3 Parte 1: Lições A1.16 a A1.20
const wave3Part1Lessons = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 16: Have Got vs Have
  // ─────────────────────────────────────────────────────────────
  "a1-lez16": {
    "id": "a1-lez16",
    "num": "Lesson 16",
    "titulo": "Have Got vs Have",
    "subtitulo": "Posse, Características e Expressões — I have got vs I have",
    "cena": {
      "origem": "dialogo",
      "titulo": "Meeting at a London Café",
      "texto": "**Oliver:** Have you got a pen I could borrow for a moment?\n**Carlos:** Yes, I have got two pens in my briefcase. Here you go!\n**Oliver:** Brilliant, thanks! Have you got time for a quick espresso?\n**Carlos:** Actually, I haven't got much time. I have an important meeting at 2:00 PM."
    },
    "fio": {
      "abertura": "Você certamente aprendeu que 'ter' é 'have'. Mas ao pisar em Londres ou assistir a uma série britânica, você ouvirá 'have got' a cada minuto. O que significa esse 'got'?",
      "descoberta": "Repare no diálogo: «Have you got a pen?» e «I haven't got much time». No inglês britânico falado, 'have got' é o padrão indiscutível para posse de objetos, características físicas e compromissos.",
      "fecho": "Agora você domina os dois códigos: o 'have got' britânico com negação direta (*haven't got*) e o 'have' com auxiliares (*don't have*)."
    },
    "alerta": "Muitos brasileiros estranham a pergunta *'Have you got a car?'* porque esperavam *'Do you have a car?'*. Ambas estão corretas! 'Have got' é informal britânico e não usa 'do/does'.",
    "definicao": {
      "fenomeno": "I have a car = I've got a car · She has blue eyes = She's got blue eyes · I don't have time = I haven't got time",
      "causa": "Qual a diferença gramatical real entre 'have' e 'have got'?",
      "conceito": "'Have got' funciona como um tempo perfeito no presente: 'have' é o auxiliar (ele mesmo nega e inverte na pergunta) e 'got' é o particípio invariável. 'Have' comum comporta-se como verbo regular, exigindo 'do/does' para negar e perguntar."
    },
    "inventario": [
      "A equivalência de posse: I have = I have got (I've got)",
      "A forma de 3ª pessoa: He/She/It has got (He's got)",
      "A negação direta sem 'do': I haven't got / He hasn't got",
      "A pergunta com inversão: Have you got...? / Has she got...?",
      "Quando NÃO usar 'have got': rotinas e ações (*have breakfast*, *have a shower*)"
    ],
    "tabela_visual": "| Pessoa | Forma Afirmativa Contraída | Forma Negativa | Pergunta Canônica |\n|---|---|---|---|\n| **I / You / We / They** | **I've got** a laptop | **I haven't got** a car | **Have you got** a ticket? |\n| **He / She / It** | **She's got** blue eyes | **He hasn't got** a job | **Has she got** a passport? |",
    "observacao_cards": [
      {
        "ingles": "I've got",
        "traducao": "Eu tenho (posse / estado)",
        "genero": "Contração Britânica",
        "motivo": "Contração de 'I have got'. Na fala real soa como /ˈaɪv ɡɒt/."
      },
      {
        "ingles": "He's got",
        "traducao": "Ele tem",
        "genero": "3ª Pessoa Singular",
        "motivo": "Atenção: aqui 'He's' é contração de 'He HAS', não de 'He is'."
      },
      {
        "ingles": "Haven't got",
        "traducao": "Não tenho / não tem",
        "genero": "Negação Direta",
        "motivo": "O próprio 'have' recebe o 'not': 'I haven't got any cash on me'."
      },
      {
        "ingles": "Hasn't got",
        "traducao": "Ele/Ela não tem",
        "genero": "Negação 3ª Pessoa",
        "motivo": "'She hasn't got a sister' = Ela não tem irmã."
      },
      {
        "ingles": "Have you got...?",
        "traducao": "Você tem...?",
        "genero": "Pergunta sem Auxiliar 'Do'",
        "motivo": "O 'have' vai para a frente do sujeito: 'Have you got five minutes?'"
      },
      {
        "ingles": "Have a coffee",
        "traducao": "Tomar um café (ação/hábito)",
        "genero": "Expressão Fixa de Ação",
        "motivo": "Para hábitos e refeições usa-se apenas 'have', NUNCA 'have got' (*I have lunch*, jamais *I have got lunch*)."
      }
    ],
    "tecnica": "### Quando Usar 'Have Got' vs 'Have':\n\n1. **Para POSSE de objetos, doenças ou características físicas:**\n   - Pode usar qualquer um dos dois:\n     - *I have a headache* OU *I've got a headache*.\n     - *She has a cat* OU *She's got a cat*.\n\n2. **Para AÇÕES, REFEIÇÕES ou EXPERIÊNCIAS (não é posse real):**\n   - Use **APENAS HAVE**:\n     - Tomar café da manhã: *have breakfast* (nunca *have got breakfast*).\n     - Tomar banho: *have a shower*.\n     - Divertir-se: *have fun*.\n\n3. **Na negação e interrogação:**\n   - Se escolheu 'have got' → negue com *haven't got* / pergunte com *Have you got...?*\n   - Se escolheu 'have' simples → negue com *don't have* / pergunte com *Do you have...?*",
    "teoria": "### A Batalha dos Estilos: Inglês Britânico vs Americano\n\n* **Inglês Americano:** Prefere a simplicidade do verbo comum com auxiliares:\n  - *Do you have a question?* · *I don't have a car.*\n* **Inglês Britânico:** Tem paixão pelo uso de *have got* no presente informal:\n  - *Have you got a question?* · *I haven't got a car.*\n\nAmbas as formas são compreendidas e aceitas em 100% dos países de língua inglesa.\n\n<div class=\"gram-regola\"><strong>Cuidado com o Passado:</strong> 'Have got' só existe no presente! No passado, usa-se exclusivamente <em>had</em> (ex: <em>I had a bicycle when I was young</em>, nunca <em>I had got</em> para posse simples).</div>",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: A Confusão de 'He's got'\n\n1. **A Armadilha do Apóstrofo 'S:**\n   - Ao ler *\"He's got a new job\"*, o brasileiro iniciante pensa: *\"Ele É pegou um trabalho\"*?\n   - Não! A letra 's após o pronome pode ser contração de **IS** ou de **HAS**:\n     - *He's Brazilian* = He **is** Brazilian.\n     - *He's got a brother* = He **has** got a brother.",
    "exemplos_prc": [
      {
        "oracao": "Have you got any change for the parking meter?",
        "pergunta": "Como essa mesma pergunta seria feita no inglês americano tradicional?",
        "resposta": "Seria feita com o auxiliar 'do': 'Do you have any change for the parking meter?'.",
        "conclusao": "Você tem algum trocado para o parquímetro?"
      },
      {
        "oracao": "Sophia has got a meeting with the client at 3:00 PM.",
        "pergunta": "Qual a contração natural desta oração na fala rápida?",
        "resposta": "'Sophia's got a meeting...'. O 'has' funde-se com o nome próprio.",
        "conclusao": "Sophia tem uma reunião com o cliente às 15h."
      },
      {
        "oracao": "We haven't got enough room in the car for five suitcases.",
        "pergunta": "Por que não se usou 'don't' aqui?",
        "resposta": "Porque a estrutura escolhida foi 'have got', cuja negação é feita diretamente anexando 'not' ao próprio have (haven't got).",
        "conclusao": "Não temos espaço suficiente no carro para cinco malas."
      },
      {
        "oracao": "I always have breakfast at 7:00 AM.",
        "pergunta": "Por que seria um erro grave dizer 'I always have got breakfast'?",
        "resposta": "Porque 'have breakfast' é uma ação e rotina de refeição, não posse de um objeto estático.",
        "conclusao": "Eu sempre tomo café da manhã às 7h."
      }
    ],
    "armadilhas": [
      {
        "errado": "I have got a shower every morning.",
        "certo": "I have a shower every morning. / I take a shower every morning.",
        "motivo": "'Have got' não pode ser usado para ações de rotina como tomar banho ou refeições."
      },
      {
        "errado": "Do you have got a pen?",
        "certo": "Have you got a pen? / Do you have a pen?",
        "motivo": "Nunca misture o auxiliar 'do' com 'have got'. Ou usa 'Do you have' ou 'Have you got'."
      },
      {
        "errado": "Yesterday I had got a headache.",
        "certo": "Yesterday I had a headache.",
        "motivo": "'Have got' só existe no tempo presente. No passado, use apenas 'had'."
      },
      {
        "errado": "He haven't got a ticket.",
        "certo": "He hasn't got a ticket.",
        "motivo": "Com He, She e It, o auxiliar de 3ª pessoa é 'hasn't got'."
      }
    ],
    "coda": "Para posse no presente: 'have' usa DO, 'have got' anda sozinho. Para refeições e ações: apenas HAVE puro.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com a forma britânica correta de 3ª pessoa:\n\n\"Lucas ___ three sisters and two brothers.\"\n(= Lucas tem três irmãs e dois irmãos.)",
        "opcoes": ["have got", "has got", "is got", "haves got"],
        "resposta": 1,
        "explicacao": "Lucas = He → a forma correta é HAS GOT."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual pergunta está gramaticalmente CORRETA em inglês?",
        "opcoes": [
          "Do you have got an extra charger?",
          "Have you got an extra charger?",
          "Are you got an extra charger?",
          "Has you got an extra charger?"
        ],
        "resposta": 1,
        "explicacao": "'Have you got...?' é a fórmula interrogativa perfeita sem auxiliar 'do'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a negação adequada:\n\n\"We ___ enough time to visit the museum today.\"\n(= Não temos tempo suficiente para visitar o museu hoje.)",
        "opcoes": ["haven't got", "hasn't got", "not have got", "don't have got"],
        "resposta": 0,
        "explicacao": "Com o sujeito 'We', a negação direta é HAVEN'T GOT."
      },
      {
        "tipo": "escolha",
        "pergunta": "Em qual das frases o uso de 'have got' é PROIBIDO?",
        "opcoes": [
          "I have got a blue bicycle.",
          "I have got lunch at noon every day.",
          "She has got a bad cold.",
          "They have got a large garden."
        ],
        "resposta": 1,
        "explicacao": "'Have lunch' é ação de refeição e não posse; deve ser apenas 'I have lunch'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com a contração de 'have got':\n\n\"___ two tickets for the concert on Friday.\"\n(Eu tenho dois ingressos para o show na sexta-feira.)",
        "revelacao": "I've got two tickets for the concert on Friday.",
        "explicacao": "I've got = I have got."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"She ___ a terrible headache right now.\"\n(Ela está com uma terrível dor de cabeça agora.)",
        "revelacao": "She's got a terrible headache right now.",
        "explicacao": "She's got = She has got."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente a negação:\n\n\"He ___ any money in his wallet.\"\n(Ele não tem nenhum dinheiro na carteira dele.)",
        "revelacao": "He hasn't got any money in his wallet.",
        "explicacao": "Hasn't got para 3ª pessoa singular."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente a pergunta:\n\n\"___ a map of the subway system?\"\n(Você tem um mapa do sistema de metrô?)",
        "revelacao": "Have you got a map of the subway system?",
        "explicacao": "Have you got."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma contraída de 'I have got':\n\n\"___ a question for the speaker.\" (Eu tenho)",
        "resposta": "I've got",
        "explicacao": "I've got é a contração padrão."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma negativa de 'have got' para 'He':\n\n\"Carlos ___ a driver's license yet.\" (não tem)",
        "resposta": "hasn't got",
        "explicacao": "He hasn't got."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que abre a pergunta de posse britânica:\n\n\"___ you got an umbrella? It is starting to rain.\"",
        "resposta": "Have",
        "explicacao": "Have abre a pergunta com 'you got'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a contração de 'She has got':\n\n\"___ green eyes and brown hair.\" (Ela tem)",
        "resposta": "She's got",
        "explicacao": "She's got = She has got."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 17: There is vs There are
  // ─────────────────────────────────────────────────────────────
  "a1-lez17": {
    "id": "a1-lez17",
    "num": "Lesson 17",
    "titulo": "There is vs There are",
    "subtitulo": "Existência no Presente — O 'Tem' que Não é Have",
    "cena": {
      "origem": "dialogo",
      "titulo": "Checking Into a New Apartment",
      "texto": "**Tenant:** Is there an elevator in this building?\n**Landlord:** Yes, there is. There is an elevator right next to the stairs.\n**Tenant:** And are there parking spaces available for residents?\n**Landlord:** There are two parking spots in the basement for your apartment.\n**Tenant:** Fantastic! Is there Wi-Fi included in the rent?"
    },
    "fio": {
      "abertura": "No Brasil, quando entramos em uma sala dizemos: 'Tem alguém aqui?', 'Tem três cadeiras'. Esse uso de 'ter' para existência é a maior fonte de erros de brasileiros no mundo inteiro.",
      "descoberta": "Notou como o proprietário respondeu? Ele não usou o verbo 'have' nem uma única vez! Ele disse: «there is an elevator» e «there are two parking spots». Em inglês, EXISTÊNCIA não é posse.",
      "fecho": "Você acaba de extirpar o vício mais gritante do inglês brasileiro: nunca mais diga 'have three people'; a partir de hoje você dirá com orgulho 'there are three people'."
    },
    "alerta": "No português brasileiro usamos 'ter' no sentido de 'existir' (*Tem um problema aqui*). Em inglês, 'HAVE' é exclusivamente POSSE (*Eu tenho um carro*). Para existência, a única estrutura correta é THERE IS (singular) e THERE ARE (plural).",
    "definicao": {
      "fenomeno": "There is a problem · There are two options · Is there an ATM nearby? · There isn't any milk",
      "causa": "Por que o inglês separa a posse da existência?",
      "conceito": "'HAVE' exige um sujeito que seja o dono do objeto (*I have a pen*). Quando nada possui aquilo, e você apenas constata a existência no ambiente, a língua inglesa utiliza o pronome existencial 'THERE' combinado com o verbo To Be concordando em número."
    },
    "inventario": [
      "A estrutura existencial afirmativa: There is (singular) / There are (plural)",
      "A forma contraída: There's (exclusiva do singular)",
      "A negação: There isn't (singular) / There aren't (plural)",
      "A interrogação com inversão: Is there...? / Are there...?",
      "A regra de ouro: nunca use 'Have' no sentido de 'haver / existir'"
    ],
    "tabela_visual": "| Modo | Singular (1 item ou incontável) | Plural (2 ou mais itens) |\n|---|---|---|\n| **Afirmativa** | **There is** a bank nearby. (*There's*) | **There are** two banks nearby. |\n| **Negativa** | **There isn't** a pharmacy here. | **There aren't** any pharmacies. |\n| **Pergunta** | **Is there** an elevator? | **Are there** any elevators? |\n| **Resposta Curta** | *Yes, there is. / No, there isn't.* | *Yes, there are. / No, there aren't.* |",
    "observacao_cards": [
      {
        "ingles": "There is (There's)",
        "traducao": "Há / Tem / Existe (singular)",
        "genero": "Existência Singular",
        "motivo": "Usa-se para um único elemento: 'There is a message for you' = Há uma mensagem para você."
      },
      {
        "ingles": "There are",
        "traducao": "Há / Têm / Existem (plural)",
        "genero": "Existência Plural",
        "motivo": "Usa-se para múltiplos elementos: 'There are five continents'. Não contraia 'there are'."
      },
      {
        "ingles": "There isn't",
        "traducao": "Não há / Não tem (singular)",
        "genero": "Negação Singular",
        "motivo": "Contração de 'There is not': 'There isn't any coffee left' (Não sobrou café)."
      },
      {
        "ingles": "There aren't",
        "traducao": "Não há / Não tem (plural)",
        "genero": "Negação Plural",
        "motivo": "Contração de 'There are not': 'There aren't any tickets available'."
      },
      {
        "ingles": "Is there...?",
        "traducao": "Há...? / Tem...? (pergunta singular)",
        "genero": "Inversão Interrogativa",
        "motivo": "O 'is' passa para antes de 'there': 'Is there a hospital near here?'"
      },
      {
        "ingles": "Are there...?",
        "traducao": "Há...? / Têm...? (pergunta plural)",
        "genero": "Inversão Interrogativa",
        "motivo": "O 'are' passa para antes de 'there': 'Are there any questions?'"
      }
    ],
    "tecnica": "### O Teste Infalível: Have ou There is/are?\n\n1. **Faça a pergunta-chave:** *\"Alguém é o DONO daquilo?\"*\n   - Se **SIM** (eu tenho, ele tem, nós temos) → Use **HAVE / HAS**:\n     *I have a smartphone.*\n   - Se **NÃO** (apenas existe no local, no ambiente, na cidade) → Use **THERE IS / THERE ARE**:\n     *There is a smartphone on the table.*\n\n2. **Verifique o número do substantivo:**\n   - Um objeto ou incontável (água, tempo) → **There is / There isn't**.\n   - Dois ou mais objetos → **There are / There aren't**.",
    "teoria": "### A Natureza Existencial de 'There + Be'\n\nEm inglês, a palavra *there* normalmente significa \"lá / ali\" (*The book is there*). Porém, quando colocada antes do verbo *To Be*, ela perde o sentido de distância e passa a ser uma **partícula existencial gramatical**, equivalente ao verbo haver em português.\n\n#### A Concordância Estrita com o Substantivo Real:\nEm português, o verbo 'haver' no sentido de existir é impessoal e fica no singular (*Havia três pessoas*).\nNo inglês, **o verbo concorda estritamente com o que vem depois**:\n* *There **is** a man outside.* (singular)\n* *There **are** ten people outside.* (plural).\n\n<div class=\"gram-regola\"><strong>Erro Fatal:</strong> Nunca comece uma oração dizendo <em>\"Have many people here\"</em>. Dizer isso faz você soar instantaneamente como iniciante. O correto é sempre <em>\"There are many people here\"</em>.</div>",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: O Desarmamento do 'Tem'\n\n1. **A Armadilha do Português Brasileiro:**\n   - No Brasil: *\"Tem uma padaria na esquina?\"*\n   - Erro clássico do aluno: *\"Have a bakery on the corner?\"* ❌\n   - Como deve ser: **\"Is there a bakery on the corner?\"** ✓\n\n2. **A Resposta Curta Correta:**\n   - Pergunta: *Is there an ATM in the hotel?*\n   - Resposta: **Yes, there is.** (e nunca *Yes, have*).",
    "exemplos_prc": [
      {
        "oracao": "There are thirty students in the advanced English class.",
        "pergunta": "Por que usamos 'There are' e não 'There is'?",
        "resposta": "Porque o substantivo que sucede o verbo ('thirty students') está no plural, exigindo a concordância com 'are'.",
        "conclusao": "Há trinta alunos na turma de inglês avançado."
      },
      {
        "oracao": "Is there any vegetarian option on the lunch menu?",
        "pergunta": "Como esta pergunta foi construída?",
        "resposta": "Invertendo o verbo 'is' com a partícula existencial 'there' para formular a interrogação no singular.",
        "conclusao": "Há alguma opção vegetariana no cardápio de almoço?"
      },
      {
        "oracao": "There isn't enough time to review the entire document today.",
        "pergunta": "Por que usamos 'There isn't' para 'time'?",
        "resposta": "Porque 'time' (tempo) é um substantivo incontável e gramaticalmente singular.",
        "conclusao": "Não há tempo suficiente para revisar todo o documento hoje."
      },
      {
        "oracao": "There's a gas station two miles down this road.",
        "pergunta": "O que significa a contração 'There's'?",
        "resposta": "É a contração de 'There is', amplamente utilizada na fala cotidiana antes de substantivos no singular.",
        "conclusao": "Há um posto de gasolina a duas milhas nesta estrada."
      }
    ],
    "armadilhas": [
      {
        "errado": "Have many people in the room.",
        "certo": "There are many people in the room.",
        "motivo": "'Have' indica posse, nunca existência no ambiente. Use 'There are'."
      },
      {
        "errado": "Has a problem with the server.",
        "certo": "There is a problem with the server.",
        "motivo": "Para indicar existência no singular, usa-se 'There is', nunca 'has'."
      },
      {
        "errado": "Is there a pharmacy? — Yes, have.",
        "certo": "Is there a pharmacy? — Yes, there is.",
        "motivo": "Respostas curtas utilizam o pronome existencial: 'Yes, there is'."
      },
      {
        "errado": "There is three cars outside.",
        "certo": "There are three cars outside.",
        "motivo": "Com substantivos plurais (three cars), a concordância exige 'There are'."
      }
    ],
    "coda": "Se alguém é dono, use HAVE. Se apenas existe no mundo, use THERE IS e THERE ARE. 'Have many people' nunca mais!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com a forma existencial correta:\n\n\"___ several good restaurants in this neighborhood.\"\n(= Há vários bons restaurantes neste bairro.)",
        "opcoes": ["There is", "There are", "Have", "Has"],
        "resposta": 1,
        "explicacao": "'Several good restaurants' é plural → use THERE ARE."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase em inglês traduz com precisão:\n\n\"Tem uma farmácia perto daqui?\"",
        "opcoes": [
          "Have a pharmacy near here?",
          "Has a pharmacy near here?",
          "Is there a pharmacy near here?",
          "Are there a pharmacy near here?"
        ],
        "resposta": 2,
        "explicacao": "Para perguntar sobre existência singular, a estrutura canônica é 'Is there a pharmacy near here?'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a negação singular:\n\n\"___ any milk left in the refrigerator.\"\n(= Não há nenhum leite sobrando na geladeira.)",
        "opcoes": ["There isn't", "There aren't", "Hasn't", "Doesn't have"],
        "resposta": 0,
        "explicacao": "Milk é incontável (singular) → usa-se THERE ISN'T."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual é a resposta curta correta para:\n\n\"Are there any clean towels in the bathroom?\"",
        "opcoes": [
          "Yes, have.",
          "Yes, there are.",
          "Yes, they are.",
          "Yes, there have."
        ],
        "resposta": 1,
        "explicacao": "A resposta curta plural oficial é 'Yes, there are'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com a contração de singular:\n\n\"___ a new message in your email inbox.\"\n(Há uma nova mensagem na sua caixa de entrada de e-mail.)",
        "revelacao": "There's a new message in your email inbox.",
        "explicacao": "There's = There is (singular)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente no plural:\n\n\"___ twenty-four hours in a day.\"\n(Há vinte e quatro horas em um dia.)",
        "revelacao": "There are twenty-four hours in a day.",
        "explicacao": "There are (plural)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente a negação plural:\n\n\"___ any direct flights to Sydney this evening.\"\n(Não há nenhum voo direto para Sydney esta noite.)",
        "revelacao": "There aren't any direct flights to Sydney this evening.",
        "explicacao": "There aren't (plural negativo)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente a pergunta:\n\n\"___ an ATM machine inside the station?\"\n(Há um caixa eletrônico dentro da estação?)",
        "revelacao": "Is there an ATM machine inside the station?",
        "explicacao": "Is there (inversão interrogativa singular)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma existencial plural afirmativa:\n\n\"___ two doctors on duty tonight.\" (Há / Existem)",
        "resposta": "There are",
        "explicacao": "There are para substantivos no plural."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma existencial singular contraída:\n\n\"___ a strange noise coming from the engine.\" (Há / Tem)",
        "resposta": "There's",
        "explicacao": "There's é a contração de There is."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete a resposta curta afirmativa:\n\n\"Is there Wi-Fi here? — Yes, there ___.\"",
        "resposta": "is",
        "explicacao": "Yes, there is."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma interrogativa para plural:\n\n\"___ there any available tables on the terrace?\"",
        "resposta": "Are",
        "explicacao": "Are there para perguntas no plural."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 18: Prepositions of Place (In, On, At)
  // ─────────────────────────────────────────────────────────────
  "a1-lez18": {
    "id": "a1-lez18",
    "num": "Lesson 18",
    "titulo": "Prepositions of Place",
    "subtitulo": "A Pirâmide de Localização Física — In, On, At",
    "cena": {
      "origem": "dialogo",
      "titulo": "Meeting a Friend in New York",
      "texto": "**Gabriel:** Hello Sarah! I am in New York for the weekend.\n**Sarah:** Welcome, Gabriel! Where are you staying?\n**Gabriel:** I am staying at the Hilton Hotel on Fifth Avenue.\n**Sarah:** Perfect! I am at the café on the corner right now. Meet me on the second floor!"
    },
    "fio": {
      "abertura": "Para dizer 'em', o português usa uma palavrinha só: 'no', 'na', 'em'. No inglês existem três opções: IN, ON e AT. Como saber qual escolher sem adivinhar?",
      "descoberta": "Olhe a precisão de Gabriel: «in New York» (cidade grande e espaçosa), «on Fifth Avenue» (rua/superfície) e «at the Hilton Hotel» (ponto de encontro exato). Existe uma geometria visual por trás de cada preposição.",
      "fecho": "Você acaba de absorver o modelo mental da Pirâmide de Especificidade: do espaço amplo e fechado (IN), passando pela linha ou superfície (ON), até o ponto milimétrico no mapa (AT)."
    },
    "alerta": "Não tente traduzir 'em' ao pé da letra. Visualize a geometria: IN é espaço 3D tridimensional fechado, ON é superfície de contato 2D, e AT é um ponto específico ou endereço numérico.",
    "definicao": {
      "fenomeno": "In Brazil · In the room · On the table · On Oxford Street · At the airport · At 221B Baker Street",
      "causa": "Qual a lógica geométrica das preposições de lugar?",
      "conceito": "**IN** indica delimitação espacial fechada (países, cidades, cômodos, recipientes). **ON** indica contato com uma superfície, linha de rua ou andar. **AT** indica um ponto funcional específico, endereço com número ou ponto de encontro."
    },
    "inventario": [
      "IN: países, cidades, cômodos fechados e recipientes (in England, in Paris, in the kitchen)",
      "ON: superfícies de contato, andares, ruas e avenidas (on the table, on the 3rd floor, on Wall Street)",
      "AT: pontos exatos, endereços com número e locais funcionais (at the bus stop, at 45 Main St, at school)",
      "A pirâmide de especificidade espacial (Generalidade → Superfície → Ponto Específico)",
      "Expressões fixas essenciais: at home, at work, in bed, on the phone"
    ],
    "tabela_visual": "| Preposição | Dimensão Geométrica | Âmbito de Aplicação | Exemplos Reais |\n|---|---|---|---|\n| **IN** | **3D (Dentro)** | Países, cidades, cômodos, recipientes | *in Brazil, in London, in the office, in the box* |\n| **ON** | **2D (Superfície / Linha)** | Ruas/avenidas, andares, móveis, telas | *on Fifth Avenue, on the second floor, on the wall, on TV* |\n| **AT** | **1D (Ponto Específico)** | Endereço com número, ponto no mapa, eventos | *at 100 Broadway, at the airport, at the bus stop, at a party* |",
    "observacao_cards": [
      {
        "ingles": "In London",
        "traducao": "Em Londres (cidade)",
        "genero": "Espaço 3D Amplo",
        "motivo": "Cidades, estados e países sempre usam IN: 'in Italy', 'in São Paulo'."
      },
      {
        "ingles": "On Fifth Avenue",
        "traducao": "Na Quinta Avenida (rua)",
        "genero": "Superfície / Linha",
        "motivo": "Ruas, avenidas e estradas sem número usam ON: 'on Baker Street'."
      },
      {
        "ingles": "At 221B Baker Street",
        "traducao": "No número 221B da Baker Street",
        "genero": "Endereço com Número",
        "motivo": "Ganhou número exato? Vira ponto no mapa e exige AT: 'at 742 Evergreen Terrace'."
      },
      {
        "ingles": "On the table",
        "traducao": "Sobre a mesa / na mesa",
        "genero": "Superfície de Contato",
        "motivo": "Contato físico sobre superfície é sempre ON: 'on the floor', 'on the wall'."
      },
      {
        "ingles": "At the bus stop",
        "traducao": "No ponto de ônibus",
        "genero": "Localização Funcional",
        "motivo": "Ponto de encontro específico no espaço urbano exige AT."
      },
      {
        "ingles": "At home / At work",
        "traducao": "Em casa / No trabalho",
        "genero": "Locativo Funcional Fixo",
        "motivo": "Expressões consagradas: 'I am at home' (em casa) e 'He is at work' (no trabalho)."
      }
    ],
    "tecnica": "### O Algoritmo da Pirâmide de Localização:\n\n1. **É um país, estado, cidade ou dentro de um cômodo/caixa?**\n   - SIM → Use **IN** (*in Portugal, in Chicago, in the bedroom*).\n\n2. **É uma rua sem número, um andar de prédio ou sobre uma superfície/tela?**\n   - SIM → Use **ON** (*on Oxford Street, on the 4th floor, on the wall, on the internet*).\n\n3. **É um endereço com número, um ponto de parada ou local funcional (casa/trabalho)?**\n   - SIM → Use **AT** (*at 20 Oxford Street, at the station, at home, at work*).",
    "teoria": "### A Teoria da Pirâmide de Lugar (Place Pyramid)\n\nVisualizar a pirâmide invertida resolve 95% das dúvidas de preposições em inglês:\n\n```\n   ▼ IN (Topo Largo)  --> Países, Cidades, Bairros, Áreas fechadas 3D\n    ▼ ON (Meio)       --> Ruas, Avenidas, Praias, Superfícies 2D, Andares\n     ▼ AT (Vértice)   --> Endereços com número exato, Pontos específicos 1D\n```\n\n#### A Sutileza: 'At the restaurant' vs 'In the restaurant'\n* **At the restaurant:** Enfatiza a **função** de estar no local como cliente ou ponto de encontro (*I'm having dinner at the restaurant*).\n* **In the restaurant:** Enfatiza a **localização física dentro das quatro paredes** do prédio (*It started raining, so we took shelter in the restaurant*).",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: O Perigo do 'No/Na'\n\n1. **A Armadilha do Português 'Em/No/Na':**\n   - Em português tudo é 'em': *no Brasil, na rua, no número 50, na mesa*.\n   - No inglês isso se divide em três conceitos matematicamente distintos:\n     - *In Brazil* (espaço amplo)\n     - *On the street* (superfície/rua)\n     - *At number 50* (ponto exato)\n     - *On the table* (superfície de contato).\n\n2. **Atenção aos Meios de Comunicação:**\n   - Na internet / Na TV / No rádio → Todos são superfícies virtuais e usam **ON**: *on the internet, on television, on Instagram*.",
    "exemplos_prc": [
      {
        "oracao": "Our global headquarters is in London on Regent Street.",
        "pergunta": "Por que usamos 'in' para London e 'on' para Regent Street?",
        "resposta": "Porque London é uma cidade (espaço geográfico amplo = IN) e Regent Street é uma rua sem número (linha de tráfego = ON).",
        "conclusao": "Nossa sede global fica em Londres, na Regent Street."
      },
      {
        "oracao": "Let's meet at the entrance of the museum at 10:00 AM.",
        "pergunta": "Qual a razão do uso de 'at' para 'the entrance'?",
        "resposta": "Porque 'the entrance' é um ponto de encontro físico específico delimitado no espaço.",
        "conclusao": "Vamos nos encontrar na entrada do museu às 10h."
      },
      {
        "oracao": "My passport is on the kitchen table in a blue folder.",
        "pergunta": "Por que 'on the table' mas 'in a folder'?",
        "resposta": "Porque a mesa é uma superfície aberta de apoio (ON), enquanto a pasta é um recipiente que fecha e contém algo dentro (IN).",
        "conclusao": "Meu passaporte está sobre a mesa da cozinha, dentro de uma pasta azul."
      },
      {
        "oracao": "David is working at his desk on the fifth floor.",
        "pergunta": "Por que usamos 'on' para o quinto andar?",
        "resposta": "Porque andares de edifícios são tratados gramaticalmente como superfícies horizontais de piso (ON).",
        "conclusao": "David está trabalhando em sua mesa no quinto andar."
      }
    ],
    "armadilhas": [
      {
        "errado": "I live at Brazil.",
        "certo": "I live in Brazil.",
        "motivo": "Para países e cidades, a preposição obrigatória é 'in'."
      },
      {
        "errado": "She lives in Oxford Street.",
        "certo": "She lives on Oxford Street.",
        "motivo": "Para nomes de ruas e avenidas sem número usa-se 'on' (no inglês americano) ou 'in' (britânico clássico), mas 'on' é o padrão moderno universal."
      },
      {
        "errado": "We met on the airport.",
        "certo": "We met at the airport.",
        "motivo": "Aeroportos, estações e locais de trânsito como pontos funcionais usam 'at'."
      },
      {
        "errado": "I am in home right now.",
        "certo": "I am at home right now.",
        "motivo": "A expressão fixa em inglês para 'em casa' é 'at home' (sem artigo)."
      }
    ],
    "coda": "Países e cidades: IN. Ruas, andares e superfícies: ON. Números e pontos específicos: AT. Siga a pirâmide.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com a preposição correta:\n\n\"The main office is located ___ New York City.\"\n(= O escritório principal está localizado na cidade de Nova York.)",
        "opcoes": ["at", "on", "in", "to"],
        "resposta": 2,
        "explicacao": "Cidades e países sempre exigem a preposição IN."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a localização do endereço numerado:\n\n\"The suspect was arrested ___ 742 Evergreen Terrace.\"\n(= O suspeito foi preso no número 742 da Evergreen Terrace.)",
        "opcoes": ["in", "on", "at", "by"],
        "resposta": 2,
        "explicacao": "Endereços com número específico exigem AT."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete sobre superfícies e andares:\n\n\"Our apartment is ___ the fourth floor.\"\n(= Nosso apartamento fica no quarto andar.)",
        "opcoes": ["in", "at", "on", "into"],
        "resposta": 2,
        "explicacao": "Andares de edifícios usam a preposição ON."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a expressão clássica:\n\n\"Is your husband ___ work or ___ home?\"\n(= Seu marido está no trabalho ou em casa?)",
        "opcoes": ["in / in", "at / at", "on / on", "at / in"],
        "resposta": 1,
        "explicacao": "As expressões idiomáticas fixas de local funcional são 'at work' e 'at home'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com a preposição correta:\n\n\"I left my car keys ___ the kitchen counter.\"\n(Deixei as chaves do meu carro sobre o balcão da cozinha.)",
        "revelacao": "I left my car keys on the kitchen counter.",
        "explicacao": "Superfície de apoio = on."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"Let's meet ___ the train station entrance.\"\n(Vamos nos encontrar na entrada da estação de trem.)",
        "revelacao": "Let's meet at the train station entrance.",
        "explicacao": "Ponto de encontro específico = at."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"Many multinational tech companies are based ___ California.\"\n(Muitas empresas multinacionais de tecnologia estão sediadas na Califórnia.)",
        "revelacao": "Many multinational tech companies are based in California.",
        "explicacao": "Estados e territórios = in."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"I saw an interesting documentary ___ television last night.\"\n(Vi um documentário interessante na televisão ontem à noite.)",
        "revelacao": "I saw an interesting documentary on television last night.",
        "explicacao": "Meios de transmissão e telas = on."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição para países:\n\n\"My brother lives ___ Canada.\" (no)",
        "resposta": "in",
        "explicacao": "Países usam in."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição para ruas sem número:\n\n\"The luxury hotel is ___ Wall Street.\" (na)",
        "resposta": "on",
        "explicacao": "Ruas e avenidas usam on."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição para 'em casa':\n\n\"I prefer to stay ___ home on rainy days.\"",
        "resposta": "at",
        "explicacao": "At home é a expressão fixa."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição para pontos específicos de parada:\n\n\"Wait for me ___ the bus stop.\" (no)",
        "resposta": "at",
        "explicacao": "Pontos específicos usam at."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 19: Prepositions of Time (In, On, At)
  // ─────────────────────────────────────────────────────────────
  "a1-lez19": {
    "id": "a1-lez19",
    "num": "Lesson 19",
    "titulo": "Prepositions of Time",
    "subtitulo": "A Pirâmide Temporal de Datas e Horas — In, On, At",
    "cena": {
      "origem": "dialogo",
      "titulo": "Scheduling an International Meeting",
      "texto": "**Manager:** When is our quarterly review with the London team?\n**Assistant:** It is scheduled for Friday at 3:00 PM.\n**Manager:** Perfect. And when does the new fiscal year start?\n**Assistant:** It starts in October, specifically on October 1st."
    },
    "fio": {
      "abertura": "A mesma pirâmide geométrica que você aprendeu para lugares funciona com precisão milimétrica para o TEMPO. As três preposições (IN, ON, AT) dividem o calendário com lógica impecável.",
      "descoberta": "Repare na fala da assistente: «at 3:00 PM» (hora exata), «on Friday» e «on October 1st» (dias e datas específicas), mas «in October» (mês amplo)! Conforme o tempo se afunila, a preposição muda.",
      "fecho": "Agora você domina a regra temporal de ouro do inglês: períodos longos usam IN, dias e datas usam ON, e horas exatas usam AT."
    },
    "alerta": "No Brasil usamos 'em' para tudo: *em outubro, na sexta-feira, às 3 horas*. Em inglês, usar a preposição errada para datas ou horas é um dos erros mais recorrentes.",
    "definicao": {
      "fenomeno": "In 2026 · In summer · In the morning · On Monday · On my birthday · On July 4th · At 9:00 AM · At midnight",
      "causa": "Como funciona a pirâmide de especificidade no tempo?",
      "conceito": "**IN** cobre períodos longos e difusos (séculos, anos, estações, meses e partes do dia). **ON** cobre unidades de 24 horas (dias da semana e datas completas de calendário). **AT** cobre momentos pontuais e horas exatas do relógio."
    },
    "inventario": [
      "IN: anos, séculos, estações do ano, meses e partes do dia (in 2025, in winter, in May, in the evening)",
      "ON: dias da semana e datas completas (on Monday, on October 15th, on Christmas Day)",
      "AT: horas exatas do relógio e momentos específicos (at 8:30 AM, at noon, at midnight, at the weekend [UK])",
      "A exceção clássica: in the morning/afternoon/evening MAS 'at night'",
      "Palavras que dispensam preposição: this, last, next, every (*next Monday*, não *on next Monday*)"
    ],
    "tabela_visual": "| Preposição | Escala de Tempo | Âmbito de Aplicação | Exemplos Reais |\n|---|---|---|---|\n| **IN** | **Períodos Longos (> 24h)** | Séculos, anos, estações, meses, partes do dia | *in 2026, in summer, in August, in the morning* |\n| **ON** | **Ciclos de 24h (Dias/Datas)** | Dias da semana, datas com dia e mês, feriados específicos | *on Wednesday, on April 12th, on New Year's Day* |\n| **AT** | **Horas e Momentos (< 24h)** | Horas exatas do relógio, momentos precisos | *at 7:00 PM, at noon, at midnight, at night* |",
    "observacao_cards": [
      {
        "ingles": "In 2026 / In May",
        "traducao": "Em 2026 / Em maio",
        "genero": "Período Longo",
        "motivo": "Anos e meses sozinhos (sem o dia numérico) usam sempre IN."
      },
      {
        "ingles": "On Friday",
        "traducao": "Na sexta-feira",
        "genero": "Dia da Semana",
        "motivo": "Todos os dias da semana usam obrigatoriamente ON: 'on Monday', 'on Sunday'."
      },
      {
        "ingles": "On May 15th",
        "traducao": "No dia 15 de maio",
        "genero": "Data Completa",
        "motivo": "Tem o dia do mês? A regra do dia (ON) vence o mês: 'on May 15th'."
      },
      {
        "ingles": "At 8:30 AM",
        "traducao": "Às 8h30",
        "genero": "Hora Exata do Relógio",
        "motivo": "Horas exatas do relógio usam sempre AT: 'at ten o'clock'."
      },
      {
        "ingles": "At night",
        "traducao": "À noite",
        "genero": "Exceção Consagrada",
        "motivo": "Diz-se 'in the morning', 'in the afternoon', 'in the evening', MAS 'at night'."
      },
      {
        "ingles": "Next Monday",
        "traducao": "Na próxima segunda (sem preposição)",
        "genero": "Preposição Zero",
        "motivo": "Palavras como 'next', 'last', 'this' e 'every' eliminam a preposição ('last year', nunca 'in last year')."
      }
    ],
    "tecnica": "### A Regra dos Três Filtros de Tempo:\n\n1. **É uma hora exata do relógio ou a palavra 'night/midnight/noon'?**\n   - SIM → Use **AT** (*at 5:00 PM, at noon, at night*).\n\n2. **Tem a palavra 'day' ou é um dia de calendário de 24 horas (dia da semana, data com dia)?**\n   - SIM → Use **ON** (*on Tuesday, on June 5th, on Christmas Day*).\n\n3. **É um mês sozinho, ano, estação ou parte do dia (morning/afternoon/evening)?**\n   - SIM → Use **IN** (*in July, in 2030, in winter, in the morning*).",
    "teoria": "### A Pirâmide do Tempo (Time Pyramid)\n\nAssim como no espaço, o tempo se estreita do mais geral ao mais específico:\n\n```\n   ▼ IN (Amplo)  --> Séculos, Décadas, Anos, Meses, Estações (Períodos longos)\n    ▼ ON (Médio)  --> Dias da semana, Datas com dia (Ciclo exato de 24 horas)\n     ▼ AT (Exato) --> Horas do relógio, Momentos pontuais (Minutos e segundos)\n```\n\n#### British vs American: Finais de Semana\n* **Inglês Britânico:** Prefere tradicionalmente **at the weekend** (*What are you doing at the weekend?*).\n* **Inglês Americano:** Prefere quase sempre **on the weekend** ou **on weekends** (*I love relaxing on the weekend*).\nAmbos são amplamente compreendidos.",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: O Desarmamento do 'Na Sexta'\n\n1. **A tentação de usar 'In' com dias da semana:**\n   - Em português dizemos: *\"Na segunda-feira\"* (em + a).\n   - O brasileiro é tentado a dizer *\"In Monday\"* ❌.\n   - Lembre-se: qualquer dia da semana é um ciclo de 24h e exige **ON**: **On Monday** ✓.\n\n2. **A Omissão de Preposição com 'Next' e 'Last':**\n   - No português: *\"Na próxima semana\"*, *\"No ano passado\"*.\n   - No inglês, elimine a preposição: **Next week** (e não *In the next week*), **Last year** (e não *In the last year*).",
    "exemplos_prc": [
      {
        "oracao": "The project deadline is on Friday at 5:00 PM.",
        "pergunta": "Por que usamos 'on' para Friday e 'at' para 5:00 PM?",
        "resposta": "Porque Friday é um dia da semana (unidade de 24h = ON) e 5:00 PM é uma hora exata do relógio (ponto exato = AT).",
        "conclusao": "O prazo final do projeto é na sexta-feira às 17h."
      },
      {
        "oracao": "She was born in 1998 on November 23rd.",
        "pergunta": "Por que o ano usou 'in' e a data usou 'on'?",
        "resposta": "Porque o ano é um período longo e amplo (IN), enquanto 'November 23rd' especifica o dia exato do calendário (ON).",
        "conclusao": "Ela nasceu em 1998, no dia 23 de novembro."
      },
      {
        "oracao": "I always drink a glass of warm milk at night before sleeping.",
        "pergunta": "Por que se usou 'at night' em vez de 'in the night'?",
        "resposta": "Porque 'at night' é a locução idiomática padrão consolidada em inglês para o período noturno genérico.",
        "conclusao": "Eu sempre bebo um copo de leite morno à noite antes de dormir."
      },
      {
        "oracao": "We are traveling to Tokyo next Monday.",
        "pergunta": "Por que não há nenhuma preposição antes de 'next Monday'?",
        "resposta": "Porque palavras determinantes de tempo como 'next', 'last', 'this' e 'every' dispensam preposições em inglês.",
        "conclusao": "Nós vamos viajar para Tóquio na próxima segunda-feira."
      }
    ],
    "armadilhas": [
      {
        "errado": "The meeting is in Monday.",
        "certo": "The meeting is on Monday.",
        "motivo": "Dias da semana usam obrigatoriamente a preposição 'on'."
      },
      {
        "errado": "I wake up on 7:00 AM.",
        "certo": "I wake up at 7:00 AM.",
        "motivo": "Horas do relógio exigem a preposição 'at'."
      },
      {
        "errado": "My birthday is in May 12th.",
        "certo": "My birthday is on May 12th.",
        "motivo": "Quando o mês é acompanhado do dia numérico, vira data e exige 'on'."
      },
      {
        "errado": "See you in the next Friday.",
        "certo": "See you next Friday.",
        "motivo": "Não use 'in' nem 'on' antes da palavra 'next'."
      }
    ],
    "coda": "Anos e meses sozinhos: IN. Dias e datas com dia: ON. Horas exatas e at night: AT. Siga o relógio.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com a preposição correta para dia da semana:\n\n\"The museum is closed ___ Mondays.\"\n(= O museu fecha às segundas-feiras.)",
        "opcoes": ["in", "on", "at", "to"],
        "resposta": 1,
        "explicacao": "Dias da semana usam sempre ON."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete para hora exata do relógio:\n\n\"The webinar will start promptly ___ 2:30 PM.\"\n(= O seminário online começará pontualmente às 14h30.)",
        "opcoes": ["in", "on", "at", "by"],
        "resposta": 2,
        "explicacao": "Horas exatas do relógio exigem AT."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete para mês sem dia:\n\n\"Our family usually takes vacations ___ July.\"\n(= Nossa família geralmente tira férias em julho.)",
        "opcoes": ["in", "on", "at", "during to"],
        "resposta": 0,
        "explicacao": "Meses sozinhos (sem dia numérico) exigem IN."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a exceção da noite:\n\n\"It is dangerous to walk alone in this park ___ night.\"\n(= É perigoso caminhar sozinho neste parque à noite.)",
        "opcoes": ["in", "on", "at", "by"],
        "resposta": 2,
        "explicacao": "A locução padrão correta em inglês é AT NIGHT."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente para data completa:\n\n\"American Independence Day is celebrated ___ July 4th.\"\n(O Dia da Independência Americana é comemorado em 4 de julho.)",
        "revelacao": "American Independence Day is celebrated on July 4th.",
        "explicacao": "Data com dia numérico = on."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente para ano:\n\n\"The company was founded ___ 2012.\"\n(A empresa foi fundada em 2012.)",
        "revelacao": "The company was founded in 2012.",
        "explicacao": "Anos usam in."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente para parte do dia:\n\n\"I usually exercise ___ the morning before breakfast.\"\n(Eu normalmente me exercito de manhã antes do café.)",
        "revelacao": "I usually exercise in the morning before breakfast.",
        "explicacao": "In the morning."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente para hora exata:\n\n\"The store closes ___ midnight on weekends.\"\n(A loja fecha à meia-noite nos fins de semana.)",
        "revelacao": "The store closes at midnight on weekends.",
        "explicacao": "At midnight."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição para dias da semana:\n\n\"I have an appointment ___ Tuesday.\" (na)",
        "resposta": "on",
        "explicacao": "Dias usam on."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição para horas do relógio:\n\n\"The train departs ___ 6:45 AM.\" (às)",
        "resposta": "at",
        "explicacao": "Horas usam at."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição para estações do ano:\n\n\"It snows a lot here ___ winter.\" (no)",
        "resposta": "in",
        "explicacao": "Estações do ano usam in."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição correta:\n\n\"I prefer to study ___ the evening.\" (à noite / no início da noite)",
        "resposta": "in",
        "explicacao": "In the evening."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 20: Countable vs Uncountable Nouns
  // ─────────────────────────────────────────────────────────────
  "a1-lez20": {
    "id": "a1-lez20",
    "num": "Lesson 20",
    "titulo": "Countable vs Uncountable Nouns",
    "subtitulo": "Unidades Individuais vs Substâncias de Massa — Countable vs Uncountable",
    "cena": {
      "origem": "dialogo",
      "titulo": "At the Grocery Store",
      "texto": "**Chef:** We need to buy ingredients for tonight's banquet.\n**Assistant:** What is on our shopping list?\n**Chef:** We need five apples, two bottles of olive oil, and some fresh bread.\n**Assistant:** Do we have enough information about the guests' dietary restrictions?\n**Chef:** Good point! Let me check my notes on the laptop."
    },
    "fio": {
      "abertura": "Você pode contar maçãs: uma maçã, duas maçãs. Mas você pode contar água? Você não diz 'duas águas', você diz 'dois copos de água'. Essa distinção governa todo o vocabulário e a gramática de quantidades no inglês.",
      "descoberta": "Notou como o chef disse «five apples» com plural em 'S', mas disse «some fresh bread» e «information» sem plural algum? No inglês, pão e informação são massas contínuas incontáveis que nunca recebem 'S'!",
      "fecho": "Agora você domina a linha divisória entre o que se conta por unidades e o que se mede por massa ou volume, evitando os erros mais comuns com falsos contáveis."
    },
    "alerta": "Palavras como 'bread' (pão), 'information' (informação), 'advice' (conselho) e 'furniture' (móveis) são 100% INCONTÁVEIS em inglês. Dizer *'two breads'* ou *'many informations'* é um erro clássico.",
    "definicao": {
      "fenomeno": "A book / two books · An apple / three apples · Water · Bread · Money · Advice · Information",
      "causa": "O que define um substantivo como contável ou incontável?",
      "conceito": "**Countable Nouns** são entidades individuais com forma própria que aceitam números diretos e forma de plural (*one coin, two coins*). **Uncountable Nouns** são materiais, substâncias, líquidos ou conceitos abstratos indivisíveis que não aceitam números diretos nem plural (*money, water, music*)."
    },
    "inventario": [
      "A definição de substantivos contáveis (singular com a/an, plural com -s)",
      "A definição de incontáveis (sem a/an, sem plural em -s)",
      "Os maiores incontáveis armadilhas (bread, information, advice, furniture, luggage, money)",
      "Como quantificar incontáveis usando unidades medidoras (*a piece of advice*, *a loaf of bread*)",
      "A concordância verbal: incontáveis sempre regem verbos no singular (*The news is good*)"
    ],
    "tabela_visual": "| Categoria | Substantivos Contáveis (Countable) | Substantivos Incontáveis (Uncountable) |\n|---|---|---|\n| **Conceito** | Entidades separadas que se podem contar | Líquidos, massas, materiais, conceitos abstratos |\n| **Artigo 'A / AN'** | **Permitido:** *a car, an orange* | **Proibido:** *water* (nunca *a water*) |\n| **Forma de Plural** | **Tem plural:** *two cars, three oranges* | **Não tem plural:** *milk, bread, advice* |\n| **Pergunta de Quantidade** | **How many** cars? | **How much** water? |\n| **Unidade Medidora** | Direta: *three chairs* | Fracionada: *three pieces of furniture* |",
    "observacao_cards": [
      {
        "ingles": "Bread (Uncountable)",
        "traducao": "Pão (massa incontável)",
        "genero": "Falso Contável",
        "motivo": "Pão é considerado a massa alimentar como um todo. Para contar, diga 'a slice of bread' (uma fatia) ou 'a loaf of bread' (um pão inteiro)."
      },
      {
        "ingles": "Information",
        "traducao": "Informação / Informações",
        "genero": "Incontável Abstrato",
        "motivo": "Nunca recebe 's'! Diga 'some information' ou 'a piece of information'. Jamais 'informations'."
      },
      {
        "ingles": "Advice",
        "traducao": "Conselho / Conselhos",
        "genero": "Incontável Abstrato",
        "motivo": "Nunca diga 'an advice'. Diga 'some advice' ou 'a piece of advice'."
      },
      {
        "ingles": "Money",
        "traducao": "Dinheiro",
        "genero": "Incontável Geral",
        "motivo": "Contamos as moedas (*dollars, euros, coins*), mas a palavra 'money' é incontável."
      },
      {
        "ingles": "Luggage / Baggage",
        "traducao": "Bagagem / Malas",
        "genero": "Incontável Coletivo",
        "motivo": "Contamos as malas (*suitcases, bags*), mas a palavra 'luggage' é massa coletiva sem plural."
      },
      {
        "ingles": "Furniture",
        "traducao": "Móveis / Mobília",
        "genero": "Incontável Coletivo",
        "motivo": "Contamos mesas e cadeiras (*chairs, tables*), mas 'furniture' nunca recebe 's'."
      }
    ],
    "tecnica": "### O Teste do 'Um/Uma' (Filtro Antierro):\n\n1. **Tente colocar 'ONE' na frente da palavra:**\n   - Faz sentido natural direto? (*One car, one bottle, one idea*) → É **Contável**.\n   - Soa estranho ou incompleto? (*One water, one advice, one information*) → É **Incontável**.\n\n2. **Se for incontável, aplique as 3 Leis:**\n   - Lei 1: NUNCA use 'a' ou 'an' direto na frente.\n   - Lei 2: NUNCA adicione 's' no final da palavra.\n   - Lei 3: Se precisar de quantidade, use uma unidade medidora: *a cup of coffee*, *a piece of advice*, *a bottle of water*.",
    "teoria": "### A Natureza Semântica dos Incontáveis\n\nNo inglês, a distinção entre contável e incontável não é puramente física, mas **conceitual**. Muitos substantivos que consideramos contáveis em português são vistos no inglês como uma massa contínua homogênea:\n\n* **Alimentos e Ingredientes:** *rice, sugar, butter, cheese, beef, salt, bread*.\n* **Líquidos e Gases:** *water, milk, oil, petrol, air, smoke*.\n* **Conceitos Abstratos:** *knowledge, information, advice, news, traffic, weather*.\n* **Coletivos de Massa:** *furniture, luggage, money, equipment*.\n\n<div class=\"gram-regola\"><strong>Atenção com 'News':</strong> A palavra <em>news</em> (notícias) termina com a letra 's', mas é 100% singular e incontável! Diga <em>The news is exciting</em>, jamais <em>The news are</em>.</div>",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: As 5 Armadilhas Clássicas\n\n1. **Informações:**\n   - Português: *\"Preciso de mais informações.\"*\n   - Inglês: **\"I need more information.\"** (sem 's'!).\n\n2. **Conselhos:**\n   - Português: *\"Ela me deu dois conselhos ótimos.\"*\n   - Inglês: **\"She gave me two pieces of great advice.\"**\n\n3. **Dois Pães:**\n   - Na padaria no Brasil: *\"Me dá dois pães, por favor.\"*\n   - Em inglês, pedir *\"two breads\"* confunde o atendente. Peça **\"two bread rolls\"** (dois pãezinhos) ou **\"two slices of bread\"**.\n\n4. **Notícia boa:**\n   - Inglês: **Good news** (sem 'a' na frente: nunca *a good news*).",
    "exemplos_prc": [
      {
        "oracao": "Can you give me some advice about my career?",
        "pergunta": "Por que usamos 'some advice' e não 'an advice'?",
        "resposta": "Porque 'advice' é estritamente incontável e rejeita o artigo indefinido 'an'.",
        "conclusao": "Você pode me dar alguns conselhos sobre a minha carreira?"
      },
      {
        "oracao": "The hotel has modern furniture in every room.",
        "pergunta": "Por que 'furniture' não está no plural com 's'?",
        "resposta": "Porque 'furniture' é um substantivo de massa coletiva sem forma de plural em inglês.",
        "conclusao": "O hotel tem móveis modernos em todos os quartos."
      },
      {
        "oracao": "We bought three bottles of mineral water for the trip.",
        "pergunta": "Como foi possível quantificar a água nesta oração?",
        "resposta": "Utilizando um substantivo contável medidor ('bottles of') antes da substância incontável ('water').",
        "conclusao": "Nós compramos três garrafas de água mineral para a viagem."
      },
      {
        "oracao": "The news from the financial market was very encouraging.",
        "pergunta": "Por que o verbo está no singular ('was') e não no plural ('were')?",
        "resposta": "Porque 'news' é gramaticalmente um substantivo singular e incontável, apesar de terminar com 's'.",
        "conclusao": "As notícias do mercado financeiro foram muito animadoras."
      }
    ],
    "armadilhas": [
      {
        "errado": "I need an information about flight 204.",
        "certo": "I need some information about flight 204. / a piece of information",
        "motivo": "'Information' é incontável e nunca aceita o artigo 'an'."
      },
      {
        "errado": "He gave me two good advices.",
        "certo": "He gave me two pieces of good advice. / some good advice.",
        "motivo": "'Advice' não tem plural com 's'. Use 'pieces of advice'."
      },
      {
        "errado": "Please buy two breads at the supermarket.",
        "certo": "Please buy two loaves of bread / some bread at the supermarket.",
        "motivo": "'Bread' é incontável. Use 'loaves of bread' ou 'rolls'."
      },
      {
        "errado": "The news are very bad today.",
        "certo": "The news is very bad today.",
        "motivo": "'News' rege verbo no singular: 'The news is'."
      }
    ],
    "coda": "Se é unidade individual: aceita número e 'S'. Se é substância, massa ou conselho: nada de 'a/an', nada de 'S'.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Qual das seguintes palavras é um substantivo INCONTÁVEL em inglês?",
        "opcoes": ["bottle", "information", "coin", "apple"],
        "resposta": 1,
        "explicacao": "INFORMATION é estritamente incontável e não aceita plural em 's'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a forma correta do verbo To Be:\n\n\"The news about the scientific discovery ___ fascinating.\"\n(= A notícia / As notícias sobre a descoberta científica são fascinantes.)",
        "opcoes": ["are", "is", "were", "be"],
        "resposta": 1,
        "explicacao": "'The news' é gramaticalmente singular e exige o verbo IS."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase está gramaticalmente PERFEITA em inglês?",
        "opcoes": [
          "She gave me a great advice yesterday.",
          "She gave me some great advice yesterday.",
          "She gave me some great advices yesterday.",
          "She gave me an advice yesterday."
        ],
        "resposta": 1,
        "explicacao": "'Some great advice' respeita a natureza incontável de advice (sem 'an' e sem 's')."
      },
      {
        "tipo": "escolha",
        "pergunta": "Como pedir pão fatiado corretamente em inglês?",
        "opcoes": [
          "Can I have two breads, please?",
          "Can I have two slices of bread, please?",
          "Can I have two piece of breads, please?",
          "Can I have a bread, please?"
        ],
        "resposta": 1,
        "explicacao": "Usa-se a unidade medidora: 'two slices of bread' (duas fatias de pão)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com o substantivo incontável:\n\n\"Do you need any help with your ___?\"\n(Você precisa de alguma ajuda com a sua bagagem?)",
        "revelacao": "Do you need any help with your luggage?",
        "explicacao": "Luggage é a palavra incontável para bagagem."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"We bought some modern ___ for the living room.\"\n(Compramos alguns móveis modernos para a sala de estar.)",
        "revelacao": "We bought some modern furniture for the living room.",
        "explicacao": "Furniture é incontável e não recebe 's'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"Could you pass me a glass of ___, please?\"\n(Você poderia me passar um copo de água, por favor?)",
        "revelacao": "Could you pass me a glass of water, please?",
        "explicacao": "A glass of water quantifica a substância líquida."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"How much ___ do you have in your bank account?\"\n(Quanto dinheiro você tem na sua conta bancária?)",
        "revelacao": "How much money do you have in your bank account?",
        "explicacao": "How much money (incontável)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma incontável correta (sem 's'):\n\n\"I need more ___ about this university course.\" (informações)",
        "resposta": "information",
        "explicacao": "Information nunca tem 's'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra para conselho (sem 's'):\n\n\"Thank you for your valuable ___.\" (conselhos)",
        "resposta": "advice",
        "explicacao": "Advice é incontável."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o substantivo incontável para pão:\n\n\"We eat fresh ___ with butter every morning.\"",
        "resposta": "bread",
        "explicacao": "Bread é incontável."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma do verbo To Be no presente com 'The news':\n\n\"The news from the hospital ___ very positive.\" (é / são)",
        "resposta": "is",
        "explicacao": "The news rege verbo no singular: is."
      }
    ]
  }
};

console.log('Gravando Onda 3 Parte 1 (Lições 16 a 20)...');

for (const [id, lessonData] of Object.entries(wave3Part1Lessons)) {
  for (const mod of data.moduli) {
    const idx = mod.lezioni.findIndex(l => l.id === id);
    if (idx !== -1) {
      mod.lezioni[idx] = lessonData;
      console.log(`Lição ${id} (${lessonData.titulo}) enriquecida com sucesso!`);
    }
  }
}

fs.writeFileSync(grammarPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Onda 3 Parte 1 gravada com sucesso em data/grammar.json!');
