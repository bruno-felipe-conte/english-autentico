import fs from 'fs';

const grammarPath = 'data/grammar.json';
const data = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));

// Onda 1: Gabarito de Excelência para as lições a1-lez1 a a1-lez5

const wave1Lessons = {
  "a1-lez1": {
    "id": "a1-lez1",
    "num": "Lesson 1",
    "titulo": "Personal Pronouns & Verb To Be (Affirmative)",
    "subtitulo": "Identidade e Estado — I am, You are, He is",
    "cena": {
      "origem": "dialogo",
      "titulo": "First Day at the Office",
      "texto": "**Sarah:** Hello! I am Sarah, the new marketing specialist.\n**David:** Welcome, Sarah! I am David. We are very glad to have you here.\n**Sarah:** Thank you! It is a pleasure to meet you.\n**David:** Come with me. She is our manager, and they are your team members."
    },
    "fio": {
      "abertura": "Antes de decorar qualquer tabela, escute as pessoas se apresentando. Em qualquer lugar do mundo, a primeira frase dita por alguém em inglês quase sempre usa o verbo To Be. Não tente traduzir cada letra: perceba como a identidade da pessoa se conecta instantaneamente com a palavra certa.",
      "descoberta": "Reparou como Sarah disse «I am Sarah», David respondeu «We are glad», e depois apontou dizendo «She is our manager»? O verbo muda de roupa conforme quem está no comando da frase.",
      "fecho": "Agora você já ouviu, já viu o padrão e já entendeu a lógica. Daqui em diante: toda vez que for dizer quem você é ou como está, o To Be sairá sem hesitação."
    },
    "alerta": "O verbo 'To Be' é a pedra angular da língua inglesa. Ele unifica em uma única ideia o que em português dividimos em 'ser' e 'estar'. Dominar essa estrutura afirmativa traz segurança imediata para se apresentar em viagens, reuniões e entrevistas.",
    "definicao": {
      "fenomeno": "I am an engineer · She is my colleague · It is hot today · We are ready",
      "causa": "Por que o verbo assume três formas diferentes (AM, IS, ARE) se a ideia central é a mesma?",
      "conceito": "O verbo To Be concorda estritamente com a pessoa gramatical do sujeito. 'AM' é exclusivo da 1ª pessoa singular (I); 'IS' é a marca registrada da 3ª pessoa singular (He, She, It); e 'ARE' é o conector democrático para plurais e para a 2ª pessoa (You, We, They)."
    },
    "inventario": [
      "Os 7 pronomes sujeitos (I, You, He, She, It, We, They)",
      "As 3 formas afirmativas do presente: AM, IS, ARE",
      "Formas contraídas da fala real: I'm, You're, He's, She's, It's, We're, They're",
      "O papel obrigatório do pronome neutro 'IT' para coisas, animais e clima",
      "A regra fundamental: em inglês o sujeito NUNCA é omitido"
    ],
    "tabela_visual": "| Pronome Sujeito | Tradução | Forma Plena | Forma Contraída | Exemplo Real |\n|---|---|---|---|---|\n| **I** | Eu | I am | **I'm** | *I'm ready.* (Estou pronto) |\n| **You** | Você / Vocês | You are | **You're** | *You're welcome.* (De nada / Você é bem-vindo) |\n| **He** | Ele (homem) | He is | **He's** | *He's my doctor.* (Ele é meu médico) |\n| **She** | Ela (mulher) | She is | **She's** | *She's at home.* (Ela está em casa) |\n| **It** | Ele/Ela (neutro) | It is | **It's** | *It's cold.* (Está frio) |\n| **We** | Nós | We are | **We're** | *We're partners.* (Somos parceiros) |\n| **They** | Eles / Elas | They are | **They're** | *They're outside.* (Eles estão lá fora) |",
    "observacao_cards": [
      {
        "ingles": "I am (I'm)",
        "traducao": "Eu sou / Eu estou",
        "genero": "1ª Pessoa Singular",
        "motivo": "I e AM são gêmeos inseparáveis. No dia a dia falado, fundem-se em 'I'm' com som curto e fluido."
      },
      {
        "ingles": "You are (You're)",
        "traducao": "Você é/está · Vocês são/estão",
        "genero": "2ª Pessoa (Sing. e Plural)",
        "motivo": "YOU é democrático: trata uma única pessoa ou uma sala inteira com igualdade — sempre acompanhado de ARE."
      },
      {
        "ingles": "He is (He's)",
        "traducao": "Ele é / Ele está",
        "genero": "3ª Pessoa Masculina",
        "motivo": "Usado exclusivamente para homens e seres masculinos. A 3ª pessoa do singular carrega o som de 'S' como um sobrenome: He IS."
      },
      {
        "ingles": "She is (She's)",
        "traducao": "Ela é / Ela está",
        "genero": "3ª Pessoa Feminina",
        "motivo": "Usado para mulheres e seres femininos. Assim como 'He', recebe rigorosamente a forma 'IS'."
      },
      {
        "ingles": "It is (It's)",
        "traducao": "É / Está (neutro)",
        "genero": "3ª Pessoa Neutra",
        "motivo": "O guardião do inglês: como frases sem sujeito não existem, IT assume o lugar de objetos, animais, ideias, tempo e clima."
      },
      {
        "ingles": "We are (We're)",
        "traducao": "Nós somos / Nós estamos",
        "genero": "1ª Pessoa Plural",
        "motivo": "Expressa o coletivo que inclui você. No dia a dia contrai-se em 'We're' (/wɪər/)."
      },
      {
        "ingles": "They are (They're)",
        "traducao": "Eles/Elas são · estão",
        "genero": "3ª Pessoa Plural",
        "motivo": "O plural universal: substitui homens, mulheres, objetos ou animais quando no plural — sempre com ARE."
      }
    ],
    "tecnica": "Como construir qualquer frase afirmativa com To Be em 3 passos:\n\n**Passo 1 — Identifique o sujeito:**\n- Sou eu? → Use **I**\n- É a pessoa com quem você fala? → Use **You**\n- É outra pessoa no singular? → Use **He** (ele) ou **She** (ela)\n- É uma coisa, animal ou situação? → Use **It**\n- Somos nós? → Use **We**\n- São eles ou elas? → Use **They**\n\n**Passo 2 — Conecte a forma correta do verbo:**\n- I → **am** (I'm)\n- He / She / It → **is** (He's, She's, It's)\n- You / We / They → **are** (You're, We're, They're)\n\n**Passo 3 — Complete com a qualidade (ser) ou o local/estado (estar):**\n- *I am* + *Brazilian* (qualidade permanente: sou brasileiro)\n- *I am* + *in São Paulo* (local transitório: estou em São Paulo)\n- *It is* + *late* (estado transitório: está tarde)",
    "teoria": "### 1. A Dualidade Semântica: 'Ser' vs 'Estar'\n\nNa língua portuguesa, fazemos uma separação filosófica estrita entre a essência duradoura (*ser*) e a condição temporária (*estar*):\n- *Eu sou professor.* (permanente)\n- *Eu estou cansado.* (passageiro)\n\nEm inglês, essa distinção lexical inexiste: o verbo **To Be** assume ambos os papéis com maestria. O ouvinte identifica se você 'é' ou se você 'está' pelo contexto da frase:\n- *I am calm.* → Pode significar tanto 'Sou uma pessoa calma' quanto 'Estou calmo agora'.\n\n#### A Presença Obrigatória do Sujeito e o Papel do 'IT'\n\nNo português, é perfeitamente gramatical dizer frases de sujeito oculto ou inexistente:\n- *\"Está chovendo.\"*\n- *\"É importante estudar.\"*\n- *\"Sou brasileiro.\"*\n\nEm inglês moderno, **uma oração sem sujeito formal é agramatical**. O inglês exige um elemento ocupando a posição pré-verbal. É por essa razão que o pronome **IT** é fundamental:\n- *It is raining.* (Nunca: ~~Is raining~~)\n- *It is important to study.* (Nunca: ~~Is important~~)\n- *I am Brazilian.* (Nunca: ~~Am Brazilian~~)\n\n#### A Fonética das Contrações no Inglês Real\n\nFalantes nativos raramente usam a forma plena na conversação espontânea, reservando *I am* ou *She is* apenas para documentos formais ou ênfase dramática. No dia a dia:\n- *I am* → **/aɪm/** (uma só sílaba)\n- *He is* → **/hiːz/** (com som de Z suave no final)\n- *It is* → **/ɪts/** (rápido e estalado)\n- *They are* → **/ðeər/** (idêntico à pronúncia de *there* e *their*)",
    "ponte": "Em português, estamos acostumados com 3 hábitos mentais que precisam ser desarmados no inglês:\n\n**1. Ocultar o sujeito:**\n- PT: *\"Cheguei e estou pronto.\"*\n- EN: *\"I arrived and **I am** ready.\"* (O 'I' deve ser declarado!)\n\n**2. Expressar idade com o verbo 'ter':**\n- PT: *\"Eu tenho 30 anos.\"*\n- EN: *\"**I am** 30 years old.\"* (Em inglês você não *possui* seus anos, você *é* o tempo vivido!). Dizer ~~I have 30 years~~ soa incompreensível para um nativo.\n\n**3. Omitir artigos em profissões:**\n- PT: *\"Ela é médica.\"*\n- EN: *\"She is **a** doctor.\"* (Em inglês, profissões no singular exigem obrigatoriamente o artigo *a* ou *an*!).",
    "exemplos_prc": [
      {
        "oracao": "I am 28 years old and she is 30.",
        "pergunta": "Por que usamos o verbo To Be para falar de idades em vez do verbo ter (have)?",
        "resposta": "Porque em inglês a idade é considerada um estado de existência temporário que define a pessoa naquele momento, não uma posse material.",
        "conclusao": "Idade em inglês expressa-se sempre com To Be: I am X years old."
      },
      {
        "oracao": "It is very cold in Chicago today.",
        "pergunta": "Por que o pronome 'It' aparece no início da frase se não há nenhuma 'coisa' explícita?",
        "resposta": "Porque verbos meteorológicos em inglês exigem o pronome 'dummy' (sujeito neutro obrigatório) preenchendo a vaga gramatical.",
        "conclusao": "Para clima, horas e estados gerais use sempre: It is..."
      },
      {
        "oracao": "They are our new business partners from Toronto.",
        "pergunta": "Qual pronome usamos para falar de um grupo de pessoas de ambos os gêneros no plural?",
        "resposta": "O pronome 'They' é universal e neutro para o plural, exigindo a concordância com 'are'.",
        "conclusao": "They are = Eles são / Elas são."
      },
      {
        "oracao": "He is an architect at an international firm.",
        "pergunta": "Por que a palavra 'architect' é precedida por 'an' e acompanhada de 'is'?",
        "resposta": "'He' é 3ª pessoa do singular (exige 'is') e profissões singulares exigem o artigo indefinido (an antes de som vocálico).",
        "conclusao": "Profissão no singular: He is a/an [profissão]."
      }
    ],
    "armadilhas": [
      {
        "errado": "I have 25 years.",
        "certo": "I am 25 years old. (ou: I am 25.)",
        "motivo": "Em inglês idade é um estado de ser, não uma posse. O verbo correto é sempre 'To Be', nunca 'have'."
      },
      {
        "errado": "Is raining a lot today.",
        "certo": "It is raining a lot today.",
        "motivo": "O inglês não permite orações sem sujeito. Para tempo, clima e distâncias, o pronome neutro 'It' é estritamente obrigatório."
      },
      {
        "errado": "She is doctor.",
        "certo": "She is a doctor.",
        "motivo": "Diferente do português, em inglês é obrigatório usar o artigo indefinido 'a' ou 'an' antes de cargos e profissões no singular."
      },
      {
        "errado": "She am very happy today.",
        "certo": "She is very happy today.",
        "motivo": "'AM' é exclusivo para 'I'. A 3ª pessoa singular (He, She, It) exige invariavelmente 'IS'."
      }
    ],
    "coda": "Lembre-se da trindade do To Be: I am · He/She/It is · You/We/They are. Não oculte o sujeito e use o To Be para idade e apresentações!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a frase de apresentação: Hello, I ___ Michael and this is my friend Lucas.",
        "opcoes": ["is", "are", "am", "be"],
        "resposta": 2,
        "explicacao": "A 1ª pessoa do singular 'I' combina exclusivamente com 'am'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Como dizer corretamente em inglês: 'Nós somos do Brasil'?",
        "opcoes": ["We is from Brazil.", "We are from Brazil.", "We am from Brazil.", "We be from Brazil."],
        "resposta": 1,
        "explicacao": "'We' é a 1ª pessoa do plural e exige a forma 'are'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Para clima, diga: ___ is very cold outside.",
        "resposta": "It",
        "explicacao": "O pronome neutro 'It' é o sujeito obrigatório para tempo, clima e horas."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual é a forma correta para dizer 'Ela é arquiteta'?",
        "opcoes": ["She is architect.", "She is an architect.", "She are an architect.", "She am a architect."],
        "resposta": 1,
        "explicacao": "Em inglês, profissões exigem o artigo 'a/an'. Como 'architect' começa com som vocálico, usamos 'an'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Escreva a forma contraída de 'They are':",
        "dica": "Junte as duas palavras e use o apóstrofo",
        "resposta": "They're",
        "variantes": ["they're", "They are", "they are"],
        "explicacao": "'They are' contrai-se em 'They're'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Para dizer 'Eu tenho 30 anos', em inglês dizemos: I ___ 30 years old.",
        "resposta": "am",
        "explicacao": "Idade em inglês usa o verbo To Be (I am), nunca o verbo have."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual pronome substitui corretamente 'My brother and his wife' (meu irmão e a esposa dele)?",
        "opcoes": ["He", "She", "They", "We"],
        "resposta": 2,
        "explicacao": "Duas pessoas das quais estamos falando formam a 3ª pessoa do plural: 'They'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com o verbo To Be correto: She ___ a brilliant scientist.",
        "dica": "3ª pessoa do singular (ela)",
        "resposta": "is",
        "variantes": ["is", "'s"],
        "explicacao": "'She' exige 'is'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Complete com o pronome sujeito: Peter is tired. ___ is sleeping in the bedroom.",
        "resposta": "He",
        "explicacao": "'Peter' é um homem no singular, portanto o pronome adequado é 'He'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Identifique a frase gramaticalmente CORRETA:",
        "opcoes": [
          "Is late to leave now.",
          "It is late to leave now.",
          "Am late to leave now.",
          "It are late to leave now."
        ],
        "resposta": 1,
        "explicacao": "A frase exige o pronome sujeito 'It' e a concordância 'is'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete a frase com a forma plena do verbo: You and I ___ on the same team.",
        "dica": "You and I = We (nós)",
        "resposta": "are",
        "variantes": ["are"],
        "explicacao": "'You and I' equivale a 'We' (nós), que exige 'are'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Complete: Look at that building! ___ is the highest skyscraper in town.",
        "resposta": "It",
        "explicacao": "Para nos referirmos a um objeto ou edifício singular, usamos o pronome neutro 'It'."
      }
    ]
  },

  "a1-lez2": {
    "id": "a1-lez2",
    "num": "Lesson 2",
    "titulo": "Verb To Be (Negative & Questions)",
    "subtitulo": "Inversões e Negações — I am not, Are you?, Isn't",
    "cena": {
      "origem": "dialogo",
      "titulo": "At the Hotel Front Desk",
      "texto": "**Receptionist:** Good evening! Are you Mr. Anderson?\n**Guest:** No, I am not. I am Carlos Mendes from Brazil.\n**Receptionist:** Oh, excuse me, Mr. Mendes! Is your reservation for three nights?\n**Guest:** Yes, it is. But my colleagues aren't here yet. Are their rooms ready too?\n**Receptionist:** Yes, they are! Everything is set."
    },
    "fio": {
      "abertura": "Fazer uma pergunta ou negar uma informação é o teste definitivo de agilidade no idioma. Em português, para perguntar algo, nós apenas mudamos o tom da nossa voz. Mas escute o recepcionista do hotel: em inglês, as palavras trocam de lugar na frase como peças de xadrez.",
      "descoberta": "Notou a mágica? Ele não disse «You are Mr. Anderson?». Ele inverteu a ordem: «Are you Mr. Anderson?». E quando o hóspede negou, ele encaixou a palavra 'not' logo depois do verbo: «I am not».",
      "fecho": "Você acabou de desvendar a mecânica do To Be: nas perguntas ele salta para a frente do sujeito; nas negativas, recebe a palavra 'not' logo em seguida. Com esse padrão gravado, você nunca mais terá medo de perguntar ou corrigir alguém."
    },
    "alerta": "Ao contrário de outros verbos do inglês que precisam de auxiliares como 'do' e 'does', o verbo To Be é 100% autossuficiente: ele mesmo salta para a frente do sujeito para perguntar e ele mesmo acolhe o 'not' para negar.",
    "definicao": {
      "fenomeno": "Are you ready? · Is he your brother? · I am not tired · They aren't at home",
      "causa": "Como o ouvinte sabe instantaneamente se você está afirmando, perguntando ou negando?",
      "conceito": "A sintaxe inglesa é posicional: a posição da palavra define sua função. Na pergunta, o verbo To Be antecede o sujeito (Verbo + Sujeito); na negação, o advérbio 'NOT' é posicionado imediatamente após o verbo To Be (Sujeito + Verbo + NOT)."
    },
    "inventario": [
      "A estrutura interrogativa com inversão: Am I?, Are you?, Is he/she/it?, Are we/they?",
      "A estrutura negativa com partícula NOT: I am not, You are not, He is not...",
      "As contrações negativas cotidianas: aren't e isn't (atenção: 'I'm not' não vira ~~amn't~~)",
      "Respostas curtas completas: 'Yes, I am' / 'No, I'm not' (nunca contrair 'Yes, I'm')",
      "A entonação ascendente em perguntas de sim/não (Yes/No questions)"
    ],
    "tabela_visual": "| Sujeito | Afirmativa | Negativa Plena | Negativa Contraída | Pergunta Invertida | Resposta Curta |\n|---|---|---|---|---|---|\n| **I** | I am | I am not | **I'm not** | **Am I?** | Yes, you are. / No, you aren't. |\n| **You** | You are | You are not | **You aren't** | **Are you?** | Yes, I am. / No, I'm not. |\n| **He** | He is | He is not | **He isn't** | **Is he?** | Yes, he is. / No, he isn't. |\n| **She** | She is | She is not | **She isn't** | **Is she?** | Yes, she is. / No, she isn't. |\n| **It** | It is | It is not | **It isn't** | **Is it?** | Yes, it is. / No, it isn't. |\n| **We** | We are | We are not | **We aren't** | **Are we?** | Yes, we are. / No, we aren't. |\n| **They** | They are | They are not | **They aren't** | **Are they?** | Yes, they are. / No, they aren't. |",
    "observacao_cards": [
      {
        "ingles": "Are you...? / Is he...?",
        "traducao": "Você é/está...? · Ele é/está...?",
        "genero": "Interrogativa Invertida",
        "motivo": "Interrogação no inglês é ginástica: o verbo To Be dá um salto mortal e se posiciona ANTES do sujeito."
      },
      {
        "ingles": "I am not (I'm not)",
        "traducao": "Eu não sou / Eu não estou",
        "genero": "Negativa Singular",
        "motivo": "Atenção máxima: nunca existe a palavra ~~amn't~~. A contração natural é sempre I'm + not."
      },
      {
        "ingles": "Isn't (is not)",
        "traducao": "Não é / Não está",
        "genero": "Negativa 3ª Pessoa",
        "motivo": "'Is' e 'not' fundem-se: o 'O' de not some e dá lugar ao apóstrofo: isn't (/ˈɪz.ənt/)."
      },
      {
        "ingles": "Aren't (are not)",
        "traducao": "Não são / Não estão",
        "genero": "Negativa Plural",
        "motivo": "'Are' e 'not' fundem-se em uma sílaba forte: aren't (/ɑːnt/ no britânico, /ɑːrnt/ no americano)."
      },
      {
        "ingles": "Yes, I am.",
        "traducao": "Sim, eu sou / estou.",
        "genero": "Short Answer (Afirmativa)",
        "motivo": "Regra de ouro: respostas curtas afirmativas NUNCA são contraídas. Dizer ~~Yes, I'm~~ soa incompleto e incorreto."
      },
      {
        "ingles": "No, he isn't.",
        "traducao": "Não, ele não é / está.",
        "genero": "Short Answer (Negativa)",
        "motivo": "Nas respostas curtas negativas, a contração é amplamente preferida e natural."
      }
    ],
    "tecnica": "Como transformar qualquer afirmação em pergunta e negativa em 3 passos:\n\n**Passo 1 — Comece pela afirmação básica:**\n*You are a software engineer.*\n\n**Passo 2 — Para perguntar: troque as duas primeiras peças:**\n- Traga o verbo para o início: *Are*\n- Coloque o sujeito logo depois: *you*\n- Complete com o restante: *Are you a software engineer?*\n\n**Passo 3 — Para negar: devolva o verbo ao lugar e coloque NOT depois dele:**\n- *You are* + *not* + *a software engineer.* → Contraído: *You aren't a software engineer.*",
    "teoria": "### 1. A Autossuficiência do Verbo To Be\n\nNa maioria dos verbos em inglês (*speak, work, live*), para criar perguntas ou negações no presente, precisamos introduzir os verbos auxiliares *DO* ou *DOES* (*Do you speak English?* / *I do not work here*).\n\nCom o verbo **To Be**, no entanto, isso **nunca acontece**. Ele possui força modal própria:\n- Afirmação: *He is English.*\n- Pergunta: *Is he English?* (Nunca: ~~Does he be English?~~)\n- Negação: *He is not English.* (Nunca: ~~He doesn't be English~~)\n\n#### 2. Respostas Curtas (Short Answers): A Cortesia em Inglês\n\nEm português, quando alguém pergunta *\"Você é brasileiro?\"*, responder apenas *\"Sim\"* ou *\"Não\"* é neutro e perfeitamente aceitável.\n\nEm inglês, responder somente *\"Yes\"* ou *\"No\"* soa ríspido, seco ou mal-educado. O padrão polido e cultural é utilizar a **Short Answer**:\n- *\"Are you ready?\"* → *\"Yes, I am.\"* ou *\"No, I'm not.\"*\n- *\"Is she your sister?\"* → *\"Yes, she is.\"* ou *\"No, she isn't.\"*\n\n**PROIBIÇÃO FONÉTICA:** Jamais termine uma resposta curta afirmativa com contração. A palavra final precisa receber ênfase fonética cheia:\n- *Are you happy?* → *Yes, I am.* (Certo ✓) | ~~Yes, I'm.~~ (Totalmente errado ✗)\n- *Is he here?* → *Yes, he is.* (Certo ✓) | ~~Yes, he's.~~ (Totalmente errado ✗)",
    "ponte": "Em português, costumamos fazer perguntas simplesmente elevando o tom da voz no final da frase afirmada:\n- PT: *\"Você está com fome?\"* (ordem idêntica à afirmação *\"Você está com fome.\"*)\n- EN: Não basta mudar a entonação! Se você disser ~~You are hungry?~~, o nativo entenderá surpresa ou incredulidade, não uma pergunta formal. A ordem obrigatória para perguntar é: ***Are you hungry?***.\n\nNa negação, no português colocamos o *não* ANTES do verbo (*\"Eu não sou\"*). Em inglês, o *not* vem estritamente DEPOIS do verbo (*\"I am not\"*).",
    "exemplos_prc": [
      {
        "oracao": "Are you the new project manager?",
        "pergunta": "Como você identifica imediatamente que essa oração é uma pergunta, mesmo sem olhar para a pontuação final?",
        "resposta": "Porque a frase se inicia com o verbo auxiliar 'Are' antes do pronome sujeito 'you'.",
        "conclusao": "Inicie com Are/Is para criar perguntas diretas com To Be."
      },
      {
        "oracao": "She isn't available right now because she is in a conference.",
        "pergunta": "Qual é o significado e a composição da palavra 'isn't'?",
        "resposta": "É a fusão contraída de 'is + not', expressando a negação para a 3ª pessoa do singular (ela).",
        "conclusao": "is not = isn't."
      },
      {
        "oracao": "Is it difficult to learn English pronunciation?",
        "pergunta": "Por que o verbo 'Is' está antes de 'it'?",
        "resposta": "Por se tratar de uma pergunta interrogativa geral sobre uma situação singular neutra.",
        "conclusao": "Para perguntas sobre coisas e situações use: Is it...?"
      },
      {
        "oracao": "'Are they ready for the flight?' 'No, they aren't.'",
        "pergunta": "Por que a resposta curta utiliza 'they aren't' em vez de responder apenas 'No'?",
        "resposta": "Porque respostas curtas com sujeito e verbo auxiliar são a forma padrão de cortesia e naturalidade em inglês.",
        "conclusao": "Responda cortesmente com Short Answers."
      }
    ],
    "armadilhas": [
      {
        "errado": "You are married?",
        "certo": "Are you married?",
        "motivo": "Em inglês a inversão verbo-sujeito é mandatória em perguntas diretas. Não use a ordem afirmativa com entonação de pergunta."
      },
      {
        "errado": "I amn't tired.",
        "certo": "I am not tired. (ou: I'm not tired.)",
        "motivo": "A forma 'amn't' não existe no padrão da língua inglesa. A única contração permitida é 'I'm not'."
      },
      {
        "errado": "Yes, I'm.",
        "certo": "Yes, I am.",
        "motivo": "Respostas curtas afirmativas exigem a forma plena do verbo para sustentar o acento tônico final da oração."
      },
      {
        "errado": "He not is here.",
        "certo": "He is not here. (ou: He isn't here.)",
        "motivo": "Em inglês o advérbio 'not' deve ser posicionado estritamente após o verbo To Be, nunca antes."
      }
    ],
    "coda": "Perguntas: o verbo salta para a frente do sujeito (Are you? / Is he?). Negativas: o NOT vem colado logo depois do verbo (isn't / aren't / I'm not)!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Como perguntar corretamente em inglês: 'Eles estão em casa?'?",
        "opcoes": [
          "They are at home?",
          "Are they at home?",
          "Do they are at home?",
          "Is they at home?"
        ],
        "resposta": 1,
        "explicacao": "Para formar perguntas com 'they', invertemos: 'Are they...'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com a forma negativa contraída de 'is not': He ___ ready yet.",
        "dica": "Junte is + not com apóstrofo",
        "resposta": "isn't",
        "variantes": ["is not", "isn't"],
        "explicacao": "'is not' contraído torna-se 'isn't'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pergunta: 'Are you Brazilian?' Resposta curta afirmativa: 'Yes, I ___.'",
        "resposta": "am",
        "explicacao": "Em respostas curtas afirmativas, nunca contraímos (sempre 'Yes, I am', nunca 'Yes, I'm')."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual das opções apresenta a negação CORRETA para a primeira pessoa?",
        "opcoes": [
          "I amn't hungry.",
          "I not am hungry.",
          "I'm not hungry.",
          "I don't be hungry."
        ],
        "resposta": 2,
        "explicacao": "A negação de 'I am' contrai-se exclusivamente como 'I'm not'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Inverta para criar a pergunta: 'You are American' vira '___ you American?'",
        "dica": "O verbo vem para a frente",
        "resposta": "Are",
        "variantes": ["are", "Are"],
        "explicacao": "Invertendo o verbo com o sujeito temos: 'Are you American?'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Como responder polidamente 'Sim, ele é' à pergunta 'Is Michael your coworker?'?",
        "opcoes": [
          "Yes, he's.",
          "Yes, he is.",
          "Yes, he does.",
          "Yes, is."
        ],
        "resposta": 1,
        "explicacao": "A short answer afirmativa não aceita contração: 'Yes, he is'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Para dizer 'Ela não está em Londres', dizemos: She ___ not in London.",
        "resposta": "is",
        "explicacao": "A 3ª pessoa singular feminina requer 'is not' (ou 'isn't')."
      },
      {
        "tipo": "digitar",
        "pergunta": "Escreva a contração negativa de 'are not':",
        "dica": "Uma só palavra com apóstrofo",
        "resposta": "aren't",
        "variantes": ["aren't", "are not"],
        "explicacao": "'are not' contrai-se em 'aren't'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Identifique a pergunta que está INCORRETA:",
        "opcoes": [
          "Is your sister at university?",
          "Are we on time?",
          "You are ready to leave?",
          "Am I on the list?"
        ],
        "resposta": 2,
        "explicacao": "'You are ready to leave?' está na ordem afirmativa; para ser pergunta direta deve ser 'Are you ready to leave?'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Complete a pergunta com a forma correta do verbo: '___ it difficult?'",
        "resposta": "Is",
        "explicacao": "'It' é singular neutro e exige 'Is it...?'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com a palavra que falta: 'No, we ___ not interested in this offer.'",
        "dica": "Forma do verbo To Be para 'we'",
        "resposta": "are",
        "variantes": ["are"],
        "explicacao": "'We' combina com 'are not'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Pergunta: 'Are the documents signed?' Resposta curta negativa: 'No, they ___.'",
        "opcoes": ["not are", "aren't", "isn't", "don't"],
        "resposta": 1,
        "explicacao": "Para 'they', a forma negativa correta na resposta curta é 'aren't'."
      }
    ]
  },

  "a1-lez3": {
    "id": "a1-lez3",
    "num": "Lesson 3",
    "titulo": "Demonstrative Pronouns (This, That, These, Those)",
    "subtitulo": "Espaço e Distância — Isto, Aquilo, Estes, Aqueles",
    "cena": {
      "origem": "dialogo",
      "titulo": "Ordering at a London Bakery",
      "texto": "**Customer:** Good morning! Could I have this croissant here, please?\n**Baker:** Certainly! And would you like one of these muffins too?\n**Customer:** Hmm, those muffins look delicious, but what is that cake on the top shelf?\n**Baker:** That is our traditional British fruit cake. It is excellent!"
    },
    "fio": {
      "abertura": "Imagine estar em uma padaria em Londres ou apontando para um slide em uma reunião de negócios. Antes de saber o vocabulário de cada item, você precisa de apenas uma habilidade: apontar e dizer 'este aqui' ou 'aquele lá'.",
      "descoberta": "Preste atenção no cliente: para o croissant perto de suas mãos, ele disse «this croissant». Para os muffins logo à frente, «these muffins». Para o bolo lá no alto, longe de alcance, ele usou «that cake»!",
      "fecho": "O inglês organiza o espaço com apenas 4 palavras divididas em uma matriz perfeita: perto vs longe, singular vs plural. Dominando essa bússola, você nunca mais ficará sem saber como apontar para o mundo ao seu redor."
    },
    "alerta": "Pronomes demonstrativos são a ferramenta de sobrevivência mais rápida para compras, restaurantes e apresentações. Com apenas 4 palavras você consegue se referir a qualquer objeto ou documento sem travar.",
    "definicao": {
      "fenomeno": "This card (aqui) · That sign (lá) · These shoes (aqui) · Those cars (lá)",
      "causa": "Como o inglês estabelece se o objeto está próximo ou distante de quem fala?",
      "conceito": "Os demonstrativos ingleses cruzam duas variáveis: Distância (perto do falante vs longe do falante) e Quantidade (um único elemento vs múltiplos elementos)."
    },
    "inventario": [
      "THIS: perto e singular (este, esta, isto)",
      "THAT: longe e singular (aquele, aquela, aquilo, esse, essa, isso)",
      "THESE: perto e plural (estes, estas)",
      "THOSE: longe e plural (aqueles, aquelas, esses, essas)",
      "A diferença fonética crucial entre THIS (/ðɪs/) e THESE (/ðiːz/)",
      "Uso em apresentações telefônicas e no ambiente digital: 'This is John speaking'"
    ],
    "tabela_visual": "| Distância | Singular (1 item) | Plural (2+ itens) |\n|---|---|---|\n| **Perto** (ao alcance da mão / aqui) | **THIS** (*This is my phone.*) | **THESE** (*These are my keys.*) |\n| **Longe** (distante do falante / lá) | **THAT** (*That is my car.*) | **THOSE** (*Those are my friends.*) |",
    "observacao_cards": [
      {
        "ingles": "This (/ðɪs/)",
        "traducao": "Este / Esta / Isto",
        "genero": "Perto + Singular",
        "motivo": "Use quando você pode quase tocar o objeto. O som vocálico é curto e a consoante final é um 'S' sussurrado."
      },
      {
        "ingles": "That (/ðæt/)",
        "traducao": "Aquele / Aquela / Isso",
        "genero": "Longe + Singular",
        "motivo": "Use para apontar algo distante no espaço ou no tempo. No dia a dia falado contrai-se em 'That's'."
      },
      {
        "ingles": "These (/ðiːz/)",
        "traducao": "Estes / Estas",
        "genero": "Perto + Plural",
        "motivo": "Vários objetos perto de você. Atenção: a vogal é longa e o 'S' final vibra com som de abelha (Z)."
      },
      {
        "ingles": "Those (/ðoʊz/)",
        "traducao": "Aqueles / Aquelas",
        "genero": "Longe + Plural",
        "motivo": "Vários objetos distantes de quem fala. Sempre acompanhado do verbo no plural (Those are...)."
      },
      {
        "ingles": "This is... (Apresentações)",
        "traducao": "Este é... / Aqui é...",
        "genero": "Uso Social e Chamadas",
        "motivo": "Ao telefone ou ao apresentar alguém em uma sala, use sempre 'This is...': 'Hello, this is Bruno speaking'."
      },
      {
        "ingles": "That's right! / That's it!",
        "traducao": "Isso mesmo! / É isso!",
        "genero": "Expressão Idiomática",
        "motivo": "O 'That' é usado para se referir a ideias, frases e conceitos que a outra pessoa acabou de dizer."
      }
    ],
    "tecnica": "O teste da ponta dos dedos para acertar sempre em 3 passos:\n\n**Passo 1 — Quantos objetos são?**\n- Apenas 1? → Suas únicas opções são **THIS** ou **THAT**\n- 2 ou mais? → Suas únicas opções são **THESE** ou **THOSE**\n\n**Passo 2 — Onde eles estão?**\n- Ao alcance das mãos (aqui)? → Escolha **THIS** (1) ou **THESE** (2+)\n- Fora de alcance ou do outro lado (lá)? → Escolha **THAT** (1) ou **THOSE** (2+)\n\n**Passo 3 — Verifique o verbo To Be:**\n- *This / That* exigem obrigatoriamente **IS** (*This is / That is*)\n- *These / Those* exigem obrigatoriamente **ARE** (*These are / Those are*)",
    "teoria": "### 1. A Simplificação do Sistema Demonstrativo Inglês\n\nEm português, a gramática tradicional opera com um sistema ternário complexo:\n- *Isto / Este* (com quem fala: 1ª pessoa)\n- *Isso / Esse* (com quem ouve: 2ª pessoa)\n- *Aquilo / Aquele* (distante de ambos: 3ª pessoa)\n\nO inglês simplifica radicalmente essa lógica para um **sistema binário** de 2 polos:\n- **Pólo Proximal (Perto):** *This* (singular) e *These* (plural)\n- **Pólo Distal (Longe):** *That* (singular) e *Those* (plural)\n\nNão importa se o objeto está com seu interlocutor ou do outro lado da rua: se não está nas mãos de quem fala, o inglês utiliza **That** (ou **Those**).\n\n#### 2. Pronúncia Contrastiva: 'This' vs 'These'\n\nO maior tropeço de estudantes brasileiros é pronunciar *this* e *these* da mesma forma. A diferença fonética é nítida para ouvidos nativos:\n- **THIS:** Vogal curta e fechada /ɪ/ (som intermediário entre 'i' e 'ê') + 'S' mudo sem vibração: **/ðɪs/**.\n- **THESE:** Vogal longa /iː/ (sorriso aberto) + 'S' que vibra as cordas vocais com som de Z: **/ðiːz/**.\n\n#### 3. Uso em Ligações Telefônicas e Apresentações\n\nEm português dizemos: *\"Alô, sou eu, o Bruno.\"* ou *\"Quem é aí?\"*.\nEm inglês, ao telefone ou interfone, é proibido dizer ~~\"I am Bruno\"~~ ou ~~\"Who are you?\"~~. O protocolo culto exige pronomes demonstrativos:\n- Para se identificar: *\"Hello, **this is** Bruno.\"*\n- Para perguntar quem fala: *\"Who is **that**?\"*",
    "ponte": "No Brasil, é comum as pessoas misturarem 'esse' e 'este' na fala do dia a dia sem qualquer prejuízo de comunicação. No inglês, porém, trocar **This** por **These** quebra a concordância do verbo e confunde o ouvinte sobre a quantidade de objetos:\n- *This is my friend.* (Um amigo)\n- *These are my friends.* (Vários amigos)\n\nOutro ponto: em português os demonstrativos flexionam em gênero (*este / esta, esse / essa, aquele / aquela*). Em inglês, os demonstrativos são **100% invariáveis em gênero**: *This* serve tanto para 'este carro' quanto para 'esta caneta'.",
    "exemplos_prc": [
      {
        "oracao": "This is my passport and those are my boarding passes.",
        "pergunta": "Por que o falante usou 'This is' na primeira parte e 'those are' na segunda?",
        "resposta": "O passaporte é singular e está em suas mãos (This is); os cartões de embarque são múltiplos e estão mais afastados (those are).",
        "conclusao": "This is para 1 perto; Those are para vários longe."
      },
      {
        "oracao": "Are these your sunglasses on the table?",
        "pergunta": "Por que 'sunglasses' (óculos de sol) exige 'these' em vez de 'this'?",
        "resposta": "Porque em inglês 'sunglasses' é uma palavra gramaticalmente plural (duas lentes), exigindo demonstrativo e verbo no plural.",
        "conclusao": "Substantivos plurais exigem These ou Those."
      },
      {
        "oracao": "What was that loud noise outside?",
        "pergunta": "Por que o pronome 'that' foi escolhido para o barulho?",
        "resposta": "Porque se trata de um evento singular que aconteceu à distância (no exterior da casa) e no passado imediato.",
        "conclusao": "Eventos distantes ou passados pedem That."
      },
      {
        "oracao": "Hello, this is Dr. Foster. May I speak with Mr. Silva?",
        "pergunta": "Por que o médico diz 'this is' ao se apresentar ao telefone em vez de dizer 'I am'?",
        "resposta": "Porque em chamadas e apresentações formais à distância, a convenção padrão da língua inglesa é utilizar 'This is [nome]'.",
        "conclusao": "Ao telefone: This is [nome]."
      }
    ],
    "armadilhas": [
      {
        "errado": "These is my new car.",
        "certo": "This is my new car.",
        "motivo": "'These' é exclusivamente plural. Para um único carro no singular, deve-se usar 'This is'."
      },
      {
        "errado": "I want to buy this shoes.",
        "certo": "I want to buy these shoes.",
        "motivo": "'Shoes' (sapatos) é um substantivo plural e exige o demonstrativo plural 'these'."
      },
      {
        "errado": "On the phone: 'Hello, I am Robert.'",
        "certo": "On the phone: 'Hello, this is Robert.'",
        "motivo": "Em chamadas telefônicas em inglês, a convenção padrão para se apresentar é 'This is...', não 'I am'."
      },
      {
        "errado": "Those is very expensive.",
        "certo": "Those are very expensive.",
        "motivo": "'Those' refere-se ao plural e deve concordar obrigatoriamente com o verbo 'are'."
      }
    ],
    "coda": "Matriz rápida: Perto = This (1) / These (vários). Longe = That (1) / Those (vários). Concordância: This/That is · These/Those are!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Você está segurando uma caneta na mão e diz: '___ is my favorite pen.'",
        "opcoes": ["These", "Those", "This", "That"],
        "resposta": 2,
        "explicacao": "Objeto singular e em mãos (perto) exige 'This'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Você aponta para carros do outro lado da avenida: 'Look at ___ sports cars over there!'",
        "opcoes": ["this", "these", "that", "those"],
        "resposta": 3,
        "explicacao": "Plural e à distância (over there / longe) exige 'those'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Complete com o demonstrativo correto: '___ are my keys here in my pocket.'",
        "resposta": "These",
        "explicacao": "Chaves (keys) é plural e está no bolso (perto), portanto usamos 'These'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Escreva a contração comum de 'That is':",
        "dica": "Junte a palavra com apóstrofo e s",
        "resposta": "That's",
        "variantes": ["that's", "That is", "that is"],
        "explicacao": "'That is' contrai-se em 'That's'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Ao atender o telefone para se identificar, qual é a frase correta?",
        "opcoes": [
          "Hello, I am Patricia.",
          "Hello, this is Patricia speaking.",
          "Hello, that is Patricia.",
          "Hello, it am Patricia."
        ],
        "resposta": 1,
        "explicacao": "Em telefonemas, a convenção padrão em inglês é 'This is [nome] speaking'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Complete com o verbo To Be adequado: 'These documents ___ very important.'",
        "resposta": "are",
        "explicacao": "'These documents' é plural, portanto exige o verbo 'are'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com o oposto de 'this' (perto/singular): Para um item longe/singular usamos ___.",
        "dica": "Começa com T-H",
        "resposta": "that",
        "variantes": ["that", "That"],
        "explicacao": "O demonstrativo singular para itens distantes é 'that'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase apresenta erro de concordância?",
        "opcoes": [
          "This coffee is hot.",
          "These cookies are delicious.",
          "That building is tall.",
          "Those man are foreign."
        ],
        "resposta": 3,
        "explicacao": "'Those' exige substantivo no plural (men, não man) e verbo 'are'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Complete a pergunta apontando para algo distante: 'What is ___ in the sky?'",
        "resposta": "that",
        "explicacao": "Para algo único e distante (no céu), usamos 'that'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete: 'I love ___ photos right here in this album.' (perto e plural)",
        "dica": "Plural de this",
        "resposta": "these",
        "variantes": ["these", "These"],
        "explicacao": "Para fotos em mãos (perto e plural) usamos 'these'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete: 'Do you know ___ people standing over by the entrance?'",
        "opcoes": ["this", "that", "those", "these"],
        "resposta": 2,
        "explicacao": "Pessoas (plural) distantes junto à entrada (longe) exige 'those'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Complete: 'That ___ an interesting idea, let us discuss it.'",
        "resposta": "is",
        "explicacao": "'That' é singular e combina com 'is'."
      }
    ]
  },

  "a1-lez4": {
    "id": "a1-lez4",
    "num": "Lesson 4",
    "titulo": "Articles (A, An, The vs Zero Article)",
    "subtitulo": "Especificidade e Sons — A, An, The e Quando Omitir",
    "cena": {
      "origem": "dialogo",
      "titulo": "A Job Interview in New York",
      "texto": "**Interviewer:** Welcome! Are you an engineer or a software architect?\n**Candidate:** I am a software architect with an MBA in technology.\n**Interviewer:** Impressive! We are looking for someone with an innovative mindset. Did you bring the portfolio we requested?\n**Candidate:** Yes, the portfolio is on this flash drive, and I love working with technology!"
    },
    "fio": {
      "abertura": "Você sabia que a escolha entre 'a' e 'an' não tem nada a ver com a letra escrita, mas sim com o SOM que você pronuncia? Em inglês, os artigos foram desenhados para fazer as palavras soarem fluidas, sem solavancos na garganta.",
      "descoberta": "Veja o diálogo: o entrevistador disse «a software architect» (som de consoante), mas logo em seguida usou «an engineer» e «an MBA» (som de vogal!). E quando falaram de um documento específico já conhecido de ambos, usaram «the portfolio».",
      "fecho": "Artigos em inglês são simples: 'A' e 'AN' para coisas gerais (um/uma qualquer); 'THE' para coisas específicas (o/a que já conhecemos). E o segredo de mestre: para falar de ideias gerais no plural, você simplesmente não usa nada!"
    },
    "alerta": "O maior marcador de fluência de um brasileiro é saber usar 'a/an' com profissões e saber omitir o artigo quando falamos de coisas em geral. Dominar essa regra elimina na hora o vício de tradução literal.",
    "definicao": {
      "fenomeno": "A car · An apple · An hour · A university · The sun · Dogs are friendly",
      "causa": "Por que dizemos 'an hour' se começa com H, mas dizemos 'a university' se começa com U?",
      "conceito": "A regra do artigo indefinido baseia-se 100% no som fonético inicial da palavra seguinte: se a palavra começa com som de vogal, usa-se AN para evitar o choque glotal; se começa com som de consoante (incluindo o som semivocálico /j/), usa-se A."
    },
    "inventario": [
      "Artigo indefinido 'A': antes de som consonantal (*a table, a car, a European*)",
      "Artigo indefinido 'AN': antes de som vocálico (*an actor, an egg, an hour*)",
      "A regra do 'H': mudo recebe AN (*an honest man*); aspirado recebe A (*a hotel, a house*)",
      "Artigo definido 'THE': para elementos específicos, únicos ou já mencionados",
      "Pronúncia do 'THE': /ðə/ antes de consoante e /ðiː/ antes de vogal (*the apple*)",
      "Zero Article (ausência de artigo): generalizações no plural (*Cats are independent*) e substantivos incontáveis abstratos (*Love is patient*)"
    ],
    "tabela_visual": "| Tipo | Artigo | Quando Usar | Exemplos Práticos |\n|---|---|---|---|\n| **Indefinido** (Um / Uma) | **A** | Antes de som de consoante | *a doctor, a dog, a university, a European* |\n| **Indefinido** (Um / Uma) | **AN** | Antes de som de vogal | *an architect, an engineer, an hour, an MBA* |\n| **Definido** (O / A / Os / As) | **THE** | Específico, único ou já citado | *the moon, the president, the keys on the desk* |\n| **Zero Article** (Sem artigo) | **—** | Generalizações plurais ou abstratas | *Dogs bark. Money is useful. I like music.* |",
    "observacao_cards": [
      {
        "ingles": "A doctor / A teacher",
        "traducao": "Médico(a) / Professor(a)",
        "genero": "Profissão Obrigatória",
        "motivo": "Em português dizemos 'Sou médico'; em inglês profissão no singular exige SEMPRE 'a' ou 'an': 'I am a doctor'."
      },
      {
        "ingles": "An hour / An honest man",
        "traducao": "Uma hora / Um homem honesto",
        "genero": "H Mudo (Som de Vogal)",
        "motivo": "A letra H não é pronunciada nessas palavras (som de 'our'), logo a abertura vocálica exige 'AN'."
      },
      {
        "ingles": "A university / A union",
        "traducao": "Uma universidade / Uma união",
        "genero": "Som Semivocálico (/juː/)",
        "motivo": "Apesar de grafado com U, o som inicial é consonantal /j/ (como em 'yellow' ou 'iogurte'), exigindo 'A'."
      },
      {
        "ingles": "An MBA / An FBI agent",
        "traducao": "Um MBA / Um agente do FBI",
        "genero": "Siglas com Som Vocálico",
        "motivo": "A letra M pronuncia-se 'em' (/ɛm/), e a letra F pronuncia-se 'ef' (/ɛf/) — som inicial vocálico pede AN."
      },
      {
        "ingles": "The sun / The earth",
        "traducao": "O sol / A terra",
        "genero": "Único no Universo",
        "motivo": "Quando existe apenas um elemento único na natureza ou no contexto, usa-se 'THE'."
      },
      {
        "ingles": "I love Brazilian music.",
        "traducao": "Eu amo música brasileira.",
        "genero": "Zero Article (Generalização)",
        "motivo": "Não diga 'the Brazilian music'. Para falar de um conceito amplo em geral, o inglês não usa artigo."
      }
    ],
    "tecnica": "O teste do fone de ouvido para acertar o artigo em 3 passos:\n\n**Passo 1 — Você está falando de algo específico ou genérico?**\n- Específico (aquele que ambos conhecem)? → Use **THE** (*the blue car*)\n- Genérico (um qualquer entre muitos)? → Vá para o Passo 2\n- Conceito geral no plural ou abstrato? → Use **NADA (Zero Article)** (*I like cars*)\n\n**Passo 2 — Pronuncie em voz alta a primeira sílaba da palavra seguinte:**\n- Sua boca abriu com ar livre (som de A, E, I, O, U)? → Use **AN** (*an idea, an event*)\n- Sua língua, dentes ou lábios criaram atrito de consoante? → Use **A** (*a plane, a house*)\n\n**Passo 3 — Verifique as exceções de som:**\n- Letra U com som de 'You' (/juː/)? → É som consonantal: use **A** (*a user, a unit*)\n- Letra H sem som (mudo)? → É som vocálico: use **AN** (*an hour, an heir*)",
    "teoria": "### 1. A Lógica Fonológica: Evitando o Choque Glotal\n\nNo inglês antigo, a palavra para 'um' era *an*. Com a evolução da língua, percebeu-se que falar *an book* criava um atrito desnecessário antes de consoantes, reduzindo-se para *a book*.\n\nPorém, diante de palavras iniciadas por som vocálico (*apple, orange, engineer*), falar apenas *a apple* faria a garganta fechar num choque glotal incômodo (/ə.æp.əl/). A terminação nasal 'N' atua como uma ponte de ligação suave: **/ənˈæp.əl/**.\n\n#### 2. Os Falsos Amigos das Letras: Som vs Grafia\n\nA regra nunca foi sobre letras escritas, mas sim sobre **fonemas audíveis**:\n- **Letra H:**\n  - Som audível aspirado (vem do fundo da garganta, como em 'R' suave): *a house, a hero, a holiday, a hospital*.\n  - Som mudo (a palavra começa direto na vogal seguinte): *an hour, an honor, an honest person, an heir*.\n- **Letra U e EU:**\n  - Som /juː/ (consoante semivogal 'yod'): *a university, a uniform, a European country, a unique opportunity*.\n  - Som /ʌ/ (vogal aberta pura): *an umbrella, an uncle, an update, an urgent matter*.\n\n#### 3. O Artigo Omitido (Zero Article)\n\nEm português, é regra colocar artigos antes de quase tudo: *\"O café é gostoso\"*, *\"A vida é bela\"*, *\"Os cachorros são fiéis\"*.\n\nEm inglês, colocar artigo em generalizações é considerado um **erro grave de precisão**: muda o sentido de 'todos no mundo' para 'um grupo específico trancado em uma sala':\n- *Dogs are faithful.* = Cães em geral são fiéis. (Sentido universal ✓)\n- *The dogs are faithful.* = Aqueles cães específicos que nós vimos são fiéis.",
    "ponte": "Em português temos dois hábitos que precisamos desarmar imediatamente:\n\n**1. Omissão de artigo em profissões:**\n- PT: *\"Eu sou piloto.\"* / *\"Ele é advogado.\"*\n- EN: É obrigatório dizer *\"I am **a** pilot.\"* / *\"He is **a** lawyer.\"*.\n\n**2. Excesso de 'The' antes de substantivos gerais e nomes próprios:**\n- PT: *\"O Brasil é lindo.\"* / *\"O Pedro chegou.\"* / *\"Eu gosto de café.\"*\n- EN: Nomes de países (salvo uniões como *The USA* ou *The UK*) e nomes de pessoas nunca levam artigo (*\"Brazil is beautiful\"*, nunca ~~The Brazil~~; *\"Pedro arrived\"*, nunca ~~The Pedro~~). E café em geral é simplesmente *\"I like coffee\"* (nunca ~~I like the coffee~~).",
    "exemplos_prc": [
      {
        "oracao": "She is an honest lawyer who works in New York.",
        "pergunta": "Por que a palavra 'honest' recebe o artigo 'an' mesmo começando com a letra 'H'?",
        "resposta": "Porque a letra 'H' em 'honest' é completamente muda, fazendo a palavra iniciar sonoramente com a vogal /ɒ/.",
        "conclusao": "H mudo exige AN: an honest person, an hour."
      },
      {
        "oracao": "They want to build a European research center.",
        "pergunta": "Por que usamos 'a' e não 'an' antes de 'European' se a palavra começa com a vogal 'E'?",
        "resposta": "Porque a pronúncia de 'European' inicia com o som semivocálico /j/ (som de 'Y' em 'you'), que é consonantal.",
        "conclusao": "Som /juː/ exige A: a European, a university."
      },
      {
        "oracao": "Water is essential for life on Earth.",
        "pergunta": "Por que não há nenhum artigo antes de 'Water' e 'Life' nessa oração?",
        "resposta": "Porque se trata de uma afirmação genérica e universal sobre substantivos incontáveis.",
        "conclusao": "Generalizações abstratas não usam artigo (Zero Article)."
      },
      {
        "oracao": "Can you pass me the salt on the table, please?",
        "pergunta": "Por que o falante usou 'the salt' em vez de usar 'salt' puro?",
        "resposta": "Porque ele não está falando de todo o sal do planeta, mas sim daquele saleiro específico localizado em cima da mesa.",
        "conclusao": "Objeto específico do contexto exige THE."
      }
    ],
    "armadilhas": [
      {
        "errado": "He is architect.",
        "certo": "He is an architect.",
        "motivo": "Em inglês é obrigatório utilizar 'a' ou 'an' antes de profissões e cargos no singular."
      },
      {
        "errado": "I waited for a hour.",
        "certo": "I waited for an hour.",
        "motivo": "A letra 'H' em 'hour' é silenciosa. A palavra começa sonoramente com vogal, exigindo 'an'."
      },
      {
        "errado": "She studies at an university.",
        "certo": "She studies at a university.",
        "motivo": "'University' pronuncia-se com som consonantal /juː/ (como 'you'). Diante desse som, usa-se 'a'."
      },
      {
        "errado": "The life is beautiful.",
        "certo": "Life is beautiful.",
        "motivo": "Substantivos abstratos em sentido amplo e genérico não admitem artigo definido em inglês."
      }
    ],
    "coda": "Profissão no singular? Sempre com A ou AN! Som de vogal atrai AN. Som de consoante atrai A. Falando no geral de tudo? Não use artigo nenhum!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o artigo correto: 'She is ___ talented musician.'",
        "opcoes": ["a", "an", "the", "— (sem artigo)"],
        "resposta": 0,
        "explicacao": "'Talented' começa com som consonantal /t/, exigindo o artigo 'a'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a frase: 'We need to hire ___ accountant for our tax audit.'",
        "opcoes": ["a", "an", "the", "those"],
        "resposta": 1,
        "explicacao": "'Accountant' começa com som vocálico /ə/, exigindo 'an'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Para dizer 'uma hora', escrevemos: ___ hour.",
        "resposta": "an",
        "explicacao": "O 'H' em 'hour' é mudo, logo a palavra inicia com som de vogal e exige 'an'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com o artigo indefinido adequado: 'Studying abroad is ___ unique experience.'",
        "dica": "'Unique' começa com som de 'you' (/juː/)",
        "resposta": "a",
        "variantes": ["a", "A"],
        "explicacao": "'Unique' tem som inicial semivocálico consonantal /j/, exigindo 'a'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual das frases está gramaticalmente CORRETA em inglês?",
        "opcoes": [
          "The cats love milk.",
          "Cats love milk.",
          "A cats love milk.",
          "Cats love the milk."
        ],
        "resposta": 1,
        "explicacao": "Generalizações sobre gatos e leite em sentido amplo dispensam qualquer artigo: 'Cats love milk'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Complete a frase de profissão: 'My brother wants to be ___ pilot.'",
        "resposta": "a",
        "explicacao": "Profissões no singular exigem 'a' antes de som consonantal."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com 'a' ou 'an': 'He has ___ honest face.'",
        "dica": "O 'H' de honest é silencioso",
        "resposta": "an",
        "variantes": ["an", "An"],
        "explicacao": "'Honest' tem H mudo e som vocálico inicial, exigindo 'an'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete: 'Could you please turn on ___ air conditioner in this room?'",
        "opcoes": ["a", "an", "the", "—"],
        "resposta": 2,
        "explicacao": "Trata-se do aparelho específico existente naquela sala, portanto usa-se o artigo definido 'the'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Complete: 'Neil Armstrong was the first man to walk on ___ moon.'",
        "resposta": "the",
        "explicacao": "Para corpos celestes e elementos únicos no universo usa-se 'the'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Complete com 'a' ou 'an': 'She is applying for ___ MBA program in Boston.'",
        "dica": "A letra M pronuncia-se 'em' (som vocálico inicial)",
        "resposta": "an",
        "variantes": ["an", "An"],
        "explicacao": "A sigla MBA inicia com o som vocálico /ɛm/, exigindo 'an'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual das opções representa um erro comum de tradução literal do português?",
        "opcoes": [
          "I love Italian food.",
          "I am a software engineer.",
          "I love the music in general.",
          "The book on the table is mine."
        ],
        "resposta": 2,
        "explicacao": "Dizer 'the music in general' é um erro de transferência do português; em inglês geral deve ser apenas 'music'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Complete: 'He is wearing ___ uniform today.' (som /juː/)",
        "resposta": "a",
        "explicacao": "'Uniform' tem som de /juː/ consonantal, logo recebe 'a'."
      }
    ]
  },

  "a1-lez5": {
    "id": "a1-lez5",
    "num": "Lesson 5",
    "titulo": "Plural of Nouns (Regular & Irregular)",
    "subtitulo": "Regras Fonéticas e Plurais Irregulares — Children, People, Men",
    "cena": {
      "origem": "dialogo",
      "titulo": "At the Family Park Ticket Booth",
      "texto": "**Attendant:** Welcome to the safari park! How many tickets do you need?\n**Visitor:** We need tickets for two adults and three children, please.\n**Attendant:** Great! Are there any babies under two years old?\n**Visitor:** No, but there are five people in total, and we have two small boxes of snacks.\n**Attendant:** Perfect! Here are your passes. Watch out for the wild wolves in the reserve!"
    },
    "fio": {
      "abertura": "A primeira regra que todo mundo aprende em inglês é: 'basta colocar um S no final para fazer o plural'. Isso funciona para a maioria das palavras, mas se você tentar dizer 'two childs' ou 'three mans', qualquer nativo perceberá na hora a lacuna.",
      "descoberta": "Olhe as palavras no diálogo do parque: o visitante não disse «childs», ele disse «children»! Não disse «persons», disse «people». E para caixas, usou «boxes» com som extra de -ES, enquanto lobos virou «wolves»!",
      "fecho": "O plural do inglês preserva as raízes antigas da língua e a harmonia sonora dos sons chiantes. Ao dominar as pequenas regras de terminação e os 7 plurais irregulares de ouro, seu vocabulário se torna maduro e impecável."
    },
    "alerta": "Errar plurais irregulares como 'people', 'children' e 'women' é um dos tropeços mais frequentes de quem estuda inglês há anos. Aprender esses padrões agora evita vícios difíceis de corrigir depois.",
    "definicao": {
      "fenomeno": "Book → Books · Box → Boxes · City → Cities · Leaf → Leaves · Person → People",
      "causa": "Por que algumas palavras ganham -ES, outras trocam Y por IES, e outras mudam totalmente suas vogais internas?",
      "conceito": "Plurais regulares adaptam sua terminação para facilitar a pronúncia física dos sons finais (-s, -es, -ies, -ves). Já os plurais irregulares são heranças linguísticas germânicas preservadas através dos séculos pelo uso diário ininterrupto."
    },
    "inventario": [
      "Plural regular padrão: acréscimo de -S (*cars, cups, computers*)",
      "Terminações chiantes que exigem -ES: -s, -ss, -sh, -ch, -x, -z (*buses, kisses, watches, boxes*)",
      "Regra do Y: Consoante + Y vira -IES (*city → cities*); Vogal + Y ganha apenas -S (*boy → boys*)",
      "Regra do F/FE: troca de -f/-fe por -VES (*knife → knives, life → lives, wolf → wolves*)",
      "Os 7 grandes irregulares: man/men, woman/women, child/children, person/people, foot/feet, tooth/teeth, mouse/mice",
      "Palavras invariáveis que não mudam no plural (*fish, sheep, aircraft*)"
    ],
    "tabela_visual": "| Categoria | Singular | Plural | Regra de Formação |\n|---|---|---|---|\n| **Padrão Regular** | *car / day* | **cars / days** | Acrescenta apenas **-s** |\n| **Terminações Chiantes** (-s, -sh, -ch, -x, -z) | *box / watch* | **boxes / watches** | Acrescenta **-es** (cria sílaba extra /ɪz/) |\n| **Consoante + Y** | *city / baby* | **cities / babies** | Corta o Y e ganha **-ies** |\n| **Vogal + Y** | *boy / key* | **boys / keys** | Mantém o Y e ganha apenas **-s** |\n| **Terminação -f / -fe** | *knife / leaf* | **knives / leaves** | Troca por **-ves** |\n| **Irregulares Clássicos** | *person / child* | **people / children** | Mudança interna total |\n| **Invariáveis** | *fish / sheep* | **fish / sheep** | Forma idêntica no singular e plural |",
    "observacao_cards": [
      {
        "ingles": "Person → People",
        "traducao": "Pessoa → Pessoas",
        "genero": "Irregular Vital",
        "motivo": "No inglês moderno cotidiano, o plural de 'person' é sempre 'people'. Atenção: 'people' é plural e exige 'are' (People are happy)."
      },
      {
        "ingles": "Child → Children",
        "traducao": "Criança → Crianças",
        "genero": "Irregular Germânico",
        "motivo": "Nunca diga ~~childs~~! O plural correto é 'children' (/ˈtʃɪl.drən/), herdado do inglês antigo."
      },
      {
        "ingles": "Man → Men / Woman → Women",
        "traducao": "Homem/Homens · Mulher/Mulheres",
        "genero": "Mutação Vocálica",
        "motivo": "A vogal interna muda. Cuidado especial com a pronúncia de 'women' (/ˈwɪm.ɪn/), onde a primeira sílaba soa como 'wi'."
      },
      {
        "ingles": "Box → Boxes / Watch → Watches",
        "traducao": "Caixas / Relógios",
        "genero": "Regra do -ES Chiante",
        "motivo": "Tentar falar 'boxs' seria impossível sem engasgar. O -ES cria uma nova sílaba suave: /bɒk.sɪz/."
      },
      {
        "ingles": "Life → Lives / Knife → Knives",
        "traducao": "Vidas / Facas",
        "genero": "Troca F/FE por -VES",
        "motivo": "O som surdo de 'F' suaviza para a consoante sonora 'V' antes do 'S': life vira lives (/laɪvz/)."
      },
      {
        "ingles": "City → Cities vs Boy → Boys",
        "traducao": "Cidades vs Garotos",
        "genero": "A Regra do Y",
        "motivo": "Consoante antes do Y (cit-y) troca por -ies. Vogal antes do Y (bo-y) apenas recebe S."
      }
    ],
    "tecnica": "A árvore de decisão do plural em 3 checagens rápidas:\n\n**Checagem 1 — É um dos 7 irregulares sagrados?**\n- Person → **People**\n- Child → **Children**\n- Man / Woman → **Men / Women**\n- Foot / Tooth → **Feet / Teeth**\n- Mouse → **Mice**\n*(Se sim, aplique a forma irregular e pare aqui!)*\n\n**Checagem 2 — Olhe as últimas letras:**\n- Termina em som chiante (**-s, -ss, -sh, -ch, -x, -z**)? → Adicione **-ES** (*bus → buses*)\n- Termina em **Consoante + Y**? → Troque por **-IES** (*party → parties*)\n- Termina em **-F ou -FE**? → Troque por **-VES** (*wife → wives*)\n\n**Checagem 3 — Não se encaixou em nada acima?**\n- Regra geral: basta acrescentar o **-S** (*book → books, smartphone → smartphones*).",
    "teoria": "### 1. A Fonologia dos Sons Chiantes: Por que '-es'?\n\nToda regra ortográfica de plural no inglês existe para atender à musculatura da fala. Se você tentar adicionar um som de 'S' diretamente após palavras que já terminam em sons sibilantes ou chiantes (*bus, glass, brush, church, box*), a língua não consegue articular duas consoantes sibilantes seguidas sem uma vogal no meio.\n\nPor isso, o sufixo **-ES** não é apenas ortográfico: ele **cria uma sílaba adicional** com som /ɪz/:\n- *watch* (1 sílaba) → *watch-es* (2 sílabas: /ˈwɒtʃ.ɪz/)\n- *change* (1 sílaba) → *chang-es* (2 sílabas: /ˈtʃeɪn.dʒɪz/)\n\n#### 2. Os Falsos Amigos de Plural: Substantivos Incontáveis\n\nEm português, é natural pluralizarmos palavras como *informações*, *conselhos*, *bagagens* e *móveis*.\n\nEm inglês, esses substantivos são categorizados como **incontáveis (uncountable nouns)** e **NUNCA recebem 'S'** de plural:\n- *Information* (Nunca: ~~Informations~~) → *Can you give me some information?*\n- *Advice* (Nunca: ~~Advices~~) → *He gave me great advice.*\n- *Luggage / Baggage* (Nunca: ~~Luggages~~) → *All my luggage is in the car.*\n- *Furniture* (Nunca: ~~Furnitures~~) → *They bought new furniture.*\n\n#### 3. Concordância Crucial: 'People ARE'\n\nO erro mais comum cometido por brasileiros é tratar a palavra **people** como singular por confundi-la com 'o povo'. No inglês padrão contemporâneo, *people* é o plural de *person* e atua gramaticalmente como plural com o verbo **ARE** ou verbos sem o 's' de 3ª pessoa:\n- *People are waiting outside.* (Nunca: ~~People is waiting~~)\n- *Many people live in this city.* (Nunca: ~~People lives~~)",
    "ponte": "Em português, a grande maioria dos plurais resolve-se adicionando a letra 'S' (*livro/livros, mesa/mesas*). Por causa dessa simplicidade da língua materna, o brasileiro tende a regularizar tudo em inglês, criando palavras inexistentes como ~~childs~~, ~~womans~~ e ~~peoples~~.\n\nOutro choque importante: em português o adjetivo concorda em número com o substantivo (*\"carros vermelhos\"*). Em inglês, **os adjetivos NUNCA vão para o plural**: dizemos *\"red cars\"*, jamais ~~reds cars~~!",
    "exemplos_prc": [
      {
        "oracao": "There are many people waiting for the bus.",
        "pergunta": "Por que o verbo é 'are' e não 'is' junto da palavra 'people'?",
        "resposta": "Porque 'people' é o plural de 'person' e representa um coletivo plural, exigindo concordância no plural.",
        "conclusao": "People é plural: People are, people have, people want."
      },
      {
        "oracao": "The children are playing with their new toys.",
        "pergunta": "Qual é a forma singular da palavra 'children'?",
        "resposta": "O singular é 'child'. 'Children' é uma forma irregular preservada do inglês arcaico.",
        "conclusao": "One child → Two children."
      },
      {
        "oracao": "Keep the sharp knives away from small children.",
        "pergunta": "Como a palavra 'knife' (faca) formou o seu plural 'knives'?",
        "resposta": "Palavras terminadas em -fe trocam essas letras por -ves para suavizar a pronúncia fonética.",
        "conclusao": "knife vira knives; life vira lives."
      },
      {
        "oracao": "Big cities offer many job opportunities.",
        "pergunta": "Por que 'city' virou 'cities' com -ies, mas 'day' virou apenas 'days'?",
        "resposta": "Porque 'city' termina com consoante antes do Y (t+y = ies), enquanto 'day' tem uma vogal antes do Y (a+y = s).",
        "conclusao": "Consoante+Y vira -ies; Vogal+Y ganha apenas -s."
      }
    ],
    "armadilhas": [
      {
        "errado": "The people is very friendly here.",
        "certo": "The people are very friendly here.",
        "motivo": "'People' é uma palavra no plural em inglês e exige obrigatoriamente a concordância verbal no plural ('are')."
      },
      {
        "errado": "I have two childs.",
        "certo": "I have two children.",
        "motivo": "O plural de 'child' é irregular e forma-se como 'children'. A palavra ~~childs~~ não existe."
      },
      {
        "errado": "They have bigs houses.",
        "certo": "They have big houses.",
        "motivo": "Em inglês adjetivos são invariáveis: eles NUNCA recebem 'S' de plural, apenas o substantivo flexiona."
      },
      {
        "errado": "Could you give me some informations?",
        "certo": "Could you give me some information?",
        "motivo": "'Information' é incontável em inglês e nunca recebe a letra 'S' de plural."
      }
    ],
    "coda": "Sons chiantes recebem -ES (boxes, watches). Consoante + Y vira -IES (cities). F vira -VES (knives). E guarde com carinho: One person → Two people (e sempre people ARE)!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Qual é o plural correto da palavra 'child'?",
        "opcoes": ["childs", "childrens", "children", "childes"],
        "resposta": 2,
        "explicacao": "O plural irregular correto de 'child' é 'children'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o verbo correto: 'Many people ___ attending the online webinar.'",
        "opcoes": ["is", "are", "am", "be"],
        "resposta": 1,
        "explicacao": "'People' é plural e exige a concordância com 'are'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Qual é o plural de 'city'? Escreva a forma plural: 'Many ___ around the world.'",
        "resposta": "cities",
        "explicacao": "Como 'city' termina com consoante + Y, substituímos por '-ies': 'cities'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Escreva o plural de 'box' (caixa):",
        "dica": "Terminações em X ganham -es",
        "resposta": "boxes",
        "variantes": ["boxes", "Boxes"],
        "explicacao": "Substantivos terminados em som chiante como X recebem '-es': 'boxes'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual é o plural da palavra 'knife' (faca)?",
        "opcoes": ["knifes", "knives", "knifeses", "knifs"],
        "resposta": 1,
        "explicacao": "Palavras terminadas em -fe formam o plural trocando por '-ves': 'knives'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Qual é o plural de 'woman'? Complete: 'Three ___ were elected to parliament.'",
        "resposta": "women",
        "explicacao": "O plural de 'woman' é 'women' (/ˈwɪm.ɪn/)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Escreva o plural de 'person' no inglês do dia a dia:",
        "dica": "Começa com P e termina com E",
        "resposta": "people",
        "variantes": ["people", "People"],
        "explicacao": "O plural cotidiano de 'person' é 'people'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase está gramaticalmente CORRETA em inglês?",
        "opcoes": [
          "I have three blue cars.",
          "I have three blues cars.",
          "I have three car blues.",
          "I have three car blue."
        ],
        "resposta": 0,
        "explicacao": "Adjetivos em inglês nunca recebem plural (apenas o substantivo flexiona: 'blue cars')."
      },
      {
        "tipo": "revelar",
        "pergunta": "O plural de 'watch' (relógio de pulso) é: ___.",
        "resposta": "watches",
        "explicacao": "Terminação em -ch ganha '-es': 'watches'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Escreva o plural de 'man':",
        "dica": "A vogal interna muda para E",
        "resposta": "men",
        "variantes": ["men", "Men"],
        "explicacao": "O plural de 'man' é 'men'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual das seguintes palavras NUNCA recebe 's' de plural em inglês?",
        "opcoes": ["car", "computer", "information", "bottle"],
        "resposta": 2,
        "explicacao": "'Information' é incontável e nunca recebe plural em inglês."
      },
      {
        "tipo": "revelar",
        "pergunta": "Complete o plural de 'foot' (pé): 'My two ___ hurt after running.'",
        "resposta": "feet",
        "explicacao": "O plural irregular de 'foot' é 'feet'."
      }
    ]
  }
};

// Aplica a substituição nas lições correspondentes do Módulo A1
let countUpdated = 0;
for (const mod of data.moduli) {
  if (mod.id === 'A1') {
    for (let i = 0; i < mod.lezioni.length; i++) {
      const lez = mod.lezioni[i];
      if (wave1Lessons[lez.id]) {
        mod.lezioni[i] = wave1Lessons[lez.id];
        countUpdated++;
        console.log(`Lição ${lez.id} (${lez.num}) atualizada com sucesso para o Padrão Ouro!`);
      }
    }
  }
}

fs.writeFileSync(grammarPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`\n=== ONDA 1 CONCLUÍDA: ${countUpdated} lições enriquecidas em ${grammarPath} ===`);
