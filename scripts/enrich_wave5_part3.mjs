import fs from 'fs';

const grammarPath = 'data/grammar.json';
const data = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));

// Onda 5 — Parte 3: Lições B1.11 a B1.15 (Conclusão do Módulo B1)
const wave5Part3Lessons = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 11: Question Tags
  // ─────────────────────────────────────────────────────────────
  "b1-lez11": {
    "id": "b1-lez11",
    "num": "Lesson 11",
    "titulo": "Question Tags",
    "subtitulo": "Isn't it?, Do you?, Haven't they? — A Arte da Confirmação Conversacional",
    "cena": {
      "origem": "dialogo",
      "titulo": "Casual Conversation at the London Train Platform",
      "texto": "**Oliver:** It is quite chilly this morning, isn't it?\n**Grace:** Yes, it is freezing! You live in North London, don't you?\n**Oliver:** Actually, I moved to Greenwich last month. You haven't visited Greenwich Park yet, have you?\n**Grace:** No, I haven't. Let's go together this weekend, shall we?\n**Oliver:** That sounds lovely! We are meeting at ten o'clock, aren't we?"
    },
    "fio": {
      "abertura": "Em português, quando queremos que a outra pessoa concorde conosco, jogamos um simples 'né?', 'não é?' ou 'certo?' no final de quase qualquer frase. No inglês britânico e internacional, essa dança social é feita através das elegantes **Question Tags**.",
      "descoberta": "Repare na simetria de espelho de Oliver e Grace: se a frase é afirmativa («It is chilly»), a tag é negativa («isn't it?»). Se a frase é negativa («You haven't visited»), a tag é afirmativa («have you?»)! E para o convite com Let's, usaram a charmosa exceção «shall we?». O auxiliar da frase é exatamente o mesmo que ecoa na pergunta final!",
      "fecho": "Agora você domina o recurso mais britânico e diplomático de toda a conversação. Guarde a regra do balanço: Frase positiva ➔ Tag negativa; Frase negativa ➔ Tag positiva."
    },
    "alerta": "Brasileiros tentam colocar 'right?' ou 'yes?' no final de todas as frases em inglês para imitar o 'né?'. Embora 'right?' seja aceito informalmente, o uso fluido de Question Tags reais demonstra sofisticação e domínio nativo de nível intermediário.",
    "definicao": {
      "fenomeno": "You are British, aren't you? · She doesn't like spicy food, does she? · They have arrived, haven't they? · You will help me, won't you?",
      "causa": "Como funciona o mecanismo de espelho das Question Tags?",
      "conceito": "A Question Tag é uma mini-pergunta acoplada ao final de uma oração declarativa. Ela opera por polaridade invertida: declaração afirmativa exige tag negativa; declaração negativa exige tag afirmativa. O verbo auxiliar e o pronome sujeito espelham fielmente a oração principal."
    },
    "inventario": [
      "A Regra da Polaridade Invertida: (+) Frase Afirmativa ➔ (-) Tag Negativa contraída",
      "A Regra da Polaridade Invertida: (-) Frase Negativa ➔ (+) Tag Afirmativa",
      "O Verbo Auxiliar de Espelho: To Be (is/are/was/were), Modais (can/will/should), ou DO/DOES/DID para verbos comuns no Presente e Passado",
      "A entonação de voz: Entonação DESCENDENTE (↘) = certeza, busca apenas concordância; Entonação ASCENDENTE (↗) = dúvida real, pergunta genuína",
      "As 3 Exceções Clássicas de Ouro: 1) 'I am right, **aren't I?**'; 2) 'Let's go, **shall we?**'; 3) Imperativo: 'Close the door, **will you?**'"
    ],
    "tabela_visual": "| Oração Principal | Verbo / Auxiliar | Question Tag Espelho | Exemplo Completo |\n|---|---|---|---|\n| **To Be Presente (+)** | is / are | **isn't / aren't** + pronome | *She **is** an architect, **isn't she**?* |\n| **To Be Presente (-)** | isn't / aren't | **is / are** + pronome | *They **aren't** late, **are they**?* |\n| **Verbo Comum Presente (+)** | verbo com -s / base | **doesn't / don't** + pronome | *You **live** in Madrid, **don't you**?* |\n| **Verbo Comum Presente (-)** | don't / doesn't | **do / does** + pronome | *He **doesn't smoke**, **does he**?* |\n| **Passado Simples (+)** | verbo regular/irregular | **didn't** + pronome | *She **called** yesterday, **didn't she**?* |\n| **Present Perfect (+)** | have / has | **haven't / hasn't** + pronome | *You **have met** him, **haven't you**?* |\n| **Futuro com Will (+)** | will | **won't** + pronome | *You **will come**, **won't you**?* |\n| **Exceção de 1ª Pessoa** | I am | **aren't I** (*nunca amn't*) | *I **am** invited, **aren't I**?* |\n| **Exceção com Let's** | Let's | **shall we** | *Let's have coffee, **shall we**?* |",
    "observacao_cards": [
      {
        "ingles": "Isn't it? / Aren't they?",
        "traducao": "não é? / né?",
        "genero": "Tag com To Be",
        "motivo": "Espelha o verbo to be: 'The weather is great, isn't it?'"
      },
      {
        "ingles": "Don't you? / Doesn't he?",
        "traducao": "não é mesmo?",
        "genero": "Tag com Verbos Normais",
        "motivo": "Verbos comuns no presente exigem do/does na tag: 'You love pizza, don't you?'"
      },
      {
        "ingles": "Aren't I? (Exceção Vital)",
        "traducao": "não sou? / não estou?",
        "genero": "Exceção Gramatical",
        "motivo": "Como a forma 'amn't I' não existe no inglês padrão, a língua consagrou 'aren't I?': 'I am right, aren't I?'"
      },
      {
        "ingles": "Shall we? (com Let's)",
        "traducao": "vamos?",
        "genero": "Tag de Convite",
        "motivo": "Propostas coletivas com Let's usam exclusivamente 'shall we?': 'Let's take a break, shall we?'"
      }
    ],
    "tecnica": "A Construção da Question Tag em 3 passos:\n\n**Passo 1** — Identifique o VERBO AUXILIAR da frase:\n- Se já tem *be, have, can, will, should*, use esse mesmo auxiliar.\n- Se o verbo for comum (*live, speak, worked*), chame **do, does ou did**.\n\n**Passo 2** — INVERTA A POLARIDADE:\n- Frase positiva (+) ➔ Tag negativa com 'not' contraído (-).\n- Frase negativa (-) ➔ Tag afirmativa (+).\n\n**Passo 3** — Adicione o PRONOME PESSOAL correspondente ao sujeito:\n→ *David is...* ➔ **isn't he?** / *Your friends don't...* ➔ **do they?**",
    "teoria": "### Tratado Teórico: A Entonação e a Função Interacional das Question Tags\n\nEm fonética e pragmática conversacional, a função de uma Question Tag muda radicalmente conforme o contorno da **curva melódica de entonação** (*intonation contour*):\n\n#### 1. Entonação Descendente (Falling Intonation ↘): Busca de Solidariedade\nQuando a voz cai no final da tag, o falante NÃO está fazendo uma pergunta real; ele tem certeza do fato e está apenas solicitando confirmação empática, polidez ou engajamento social:\n- *It's a beautiful morning, isn't it?* ↘ (Ambos estão vendo o sol; é apenas um convite à simpatia).\n- *You're not angry with me, are you?* ↘\n\n#### 2. Entonação Ascendente (Rising Intonation ↗): Dúvida Real\nQuando a voz sobe no final da tag, o falante tem uma dúvida genuína e deseja uma resposta informativa real (equivale a um *Is that true?*):\n- *You haven't seen my car keys anywhere, have you?* ↗ (Realmente não sei onde estão e preciso de ajuda!).\n- *We're meeting at 3:00 PM, aren't we?* ↗ (Preciso confirmar o horário na minha agenda).\n\n#### 3. Palavras com Sentido Seminegativo\nPalavras como *never, rarely, seldom, hardly, barely, nobody, nothing* tornam a oração principal **negativa**, exigindo uma tag **afirmativa**:\n- *You **never** listen to me, **do you**?* (Never é negativo ➔ tag afirmativa *do you*).\n- *Nobody called while I was out, **did they**?* (Nobody exige tag afirmativa no plural *did they*).",
    "ponte": "Em português usamos o curinga universal 'né?' (contração de 'não é?'): 'Você mora em Londres, né?', 'Ela não vem, né?', 'Eles já almoçaram, né?'.\n\nNo inglês, não existe um curinga único aceito formalmente:\n- 'Você mora aqui, né?' → **You live here, don't you?**\n- 'Ela é médica, né?' → **She is a doctor, isn't she?**\n- 'Eles não ligaram, né?' → **They didn't call, did they?**\n- 'Você vai me ajudar, né?' → **You will help me, won't you?**.",
    "exemplos_prc": [
      {
        "oracao": "You have met our new marketing director, haven't you?",
        "pergunta": "Como a Question Tag foi formada a partir da oração afirmativa no Present Perfect?",
        "resposta": "Auxiliar 'have' afirmativo inverteu para 'haven't' negativo acompanhado do pronome 'you'.",
        "conclusao": "haven't you = não conheceu? / né?"
      },
      {
        "oracao": "Lucas doesn't eat meat or fish, does he?",
        "pergunta": "Por que a tag é 'does he' afirmativa?",
        "resposta": "Porque a oração principal contém o auxiliar negativo 'doesn't', exigindo polaridade invertida positiva.",
        "conclusao": "does he = come? / né?"
      },
      {
        "oracao": "I am next in line to see the doctor, aren't I?",
        "pergunta": "Por que foi usado 'aren't I' com o sujeito 'I'?",
        "resposta": "Trata-se da consagração gramatical da exceção da 1ª pessoa singular afirmativa.",
        "conclusao": "aren't I = não sou? / não estou?"
      },
      {
        "oracao": "Let's organize a farewell party for Sarah, shall we?",
        "pergunta": "Qual tag é exigida após uma proposta com 'Let's'?",
        "resposta": "Propostas e sugestões que iniciam com 'Let's' usam exclusivamente a tag 'shall we?'.",
        "conclusao": "shall we = vamos?"
      }
    ],
    "armadilhas": [
      {
        "errado": "You speak English, isn't it?",
        "certo": "You speak English, don't you?",
        "motivo": "Não use 'isn't it' para verbos comuns; o verbo speak no presente exige 'don't you'."
      },
      {
        "errado": "I am right, amn't I?",
        "certo": "I am right, aren't I?",
        "motivo": "A forma 'amn't I' não existe no inglês padrão; usa-se a consagrada exceção 'aren't I'."
      },
      {
        "errado": "She didn't call, didn't she?",
        "certo": "She didn't call, did she?",
        "motivo": "Frase negativa exige tag afirmativa: 'didn't call, did she?'."
      },
      {
        "errado": "You will come to the wedding, will not you?",
        "certo": "You will come to the wedding, won't you?",
        "motivo": "A negação na Question Tag deve estar sempre na forma contraída (won't you)."
      }
    ],
    "coda": "Frase positiva pede tag negativa; frase negativa pede tag afirmativa. E o auxiliar da frase dita as regras do espelho!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com a Question Tag correta para o verbo to be no presente:\n\n\"The food at this Italian restaurant is delicious, ___?\"",
        "opcoes": ["isn't it", "doesn't it", "is it", "aren't they"],
        "resposta": 0,
        "explicacao": "Frase afirmativa com 'is' e sujeito singular (food) exige 'isn't it'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a tag para verbo comum no presente:\n\n\"You work at the university hospital, ___?\"",
        "opcoes": ["don't you", "aren't you", "do you", "isn't it"],
        "resposta": 0,
        "explicacao": "Verbo de rotina afirmativo com 'you' exige 'don't you'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a exceção clássica de 1ª pessoa:\n\n\"I am in charge of the presentation today, ___?\"",
        "opcoes": ["aren't I", "amn't I", "am I not", "don't I"],
        "resposta": 0,
        "explicacao": "A contração padrão obrigatória para 'I am' em question tags é 'aren't I'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete para convite coletivo com 'Let's':\n\n\"Let's grab a coffee before the seminar begins, ___?\"",
        "opcoes": ["shall we", "will we", "don't we", "aren't we"],
        "resposta": 0,
        "explicacao": "Propostas que começam com 'Let's' usam exclusivamente a tag 'shall we'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na tag para frase negativa antes de revelar:\n\n\"David hasn't finished the budget report yet, ___?\"\n(David ainda não terminou o relatório do orçamento, terminou?)",
        "resposta": "David hasn't finished the budget report yet, has he?",
        "revelacao": "David hasn't finished the budget report yet, has he?",
        "dica": "Frase negativa com has ➔ tag positiva",
        "explicacao": "A tag de 'hasn't finished' é 'has he?'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na tag para o passado com 'didn't' antes de revelar:\n\n\"She didn't tell you the secret, ___?\"\n(Ela não te contou o segredo, contou?)",
        "resposta": "She didn't tell you the secret, did she?",
        "revelacao": "She didn't tell you the secret, did she?",
        "dica": "Didn't ➔ did she",
        "explicacao": "Frase negativa com didn't exige 'did she?'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na tag para o futuro com 'will' antes de revelar:\n\n\"You will remember to lock the laboratory doors, ___?\"\n(Você vai se lembrar de trancar as portas do laboratório, não vai?)",
        "resposta": "You will remember to lock the laboratory doors, won't you?",
        "revelacao": "You will remember to lock the laboratory doors, won't you?",
        "dica": "Will afirmativo ➔ won't you negativo",
        "explicacao": "A tag de will é a contração 'won't you?'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na tag com palavra seminegativa 'never' antes de revelar:\n\n\"They never arrive on time for the morning meetings, ___?\"\n(Eles nunca chegam na hora para as reuniões da manhã, chegam?)",
        "resposta": "They never arrive on time for the morning meetings, do they?",
        "revelacao": "They never arrive on time for the morning meetings, do they?",
        "dica": "Never torna a frase negativa ➔ tag afirmativa",
        "explicacao": "'Never' é seminegativo, logo exige tag afirmativa: 'do they?'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a Question Tag de duas palavras para: \"She is your sister, ___?\"",
        "resposta": "isn't she",
        "explicacao": "A tag é 'isn't she'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a Question Tag de duas palavras para: \"You don't like seafood, ___?\"",
        "resposta": "do you",
        "explicacao": "A tag é 'do you'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a Question Tag de duas palavras para: \"They can swim very well, ___?\"",
        "resposta": "can't they",
        "explicacao": "A tag é 'can't they'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a Question Tag de duas palavras com 'Let's': \"Let's take a taxi, ___?\"",
        "resposta": "shall we",
        "explicacao": "A tag é 'shall we'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 12: Reflexive Pronouns
  // ─────────────────────────────────────────────────────────────
  "b1-lez12": {
    "id": "b1-lez12",
    "num": "Lesson 12",
    "titulo": "Reflexive Pronouns",
    "subtitulo": "Myself, Yourself, Himself, Herself — Ações Espelhadas e Autonomia",
    "cena": {
      "origem": "dialogo",
      "titulo": "Cooking a Masterpiece Dinner",
      "texto": "**Liam:** Wow, this three-course dinner looks and smells incredible! Who helped you cook it?\n**Emma:** Nobody helped me, I prepared everything by myself!\n**Liam:** That is amazing! Be careful with that sharp carving knife, though. Don't cut yourself.\n**Emma:** Don't worry! Help yourself to some wine, and let's enjoy ourselves tonight."
    },
    "fio": {
      "abertura": "Quando o sujeito que faz a ação e o objeto que sofre a ação são a mesmíssima pessoa, usamos os pronomes reflexivos: eu olho no espelho e vejo a mim mesmo. E quando você faz algo totalmente sozinho, sem a ajuda de ninguém, o inglês tem a expressão consagrada 'by myself'.",
      "descoberta": "Repare nas expressões de Emma e Liam: «I prepared everything by myself» (sozinha!), «Don't cut yourself» (não corte a si mesmo!), «Help yourself» (sirva-se à vontade!) e «enjoy ourselves» (divertir-se). Os pronomes terminam em '-self' no singular e '-selves' no plural!",
      "fecho": "Agora você domina o espelho da gramática inglesa. Guarde os dois usos vitais: o reflexo da ação no próprio sujeito e a autonomia de fazer algo 'by yourself'."
    },
    "alerta": "O maior tropeço de brasileiros com pronomes reflexivos é a supertradução: em português dizemos 'eu me sinto bem', 'eu me lavo', 'eu me sento', 'eu me lembro'. No inglês, verbos como **feel, relax, wash, shave, dress, sit down** NUNCA são reflexivos (*I feel good*, NUNCA *I feel myself* — dizer *I feel myself* tem conotação sexual constrangedora!).",
    "definicao": {
      "fenomeno": "He looked at himself in the mirror · She taught herself to play the piano · I live by myself · We enjoyed ourselves at the party",
      "causa": "Por que dizemos 'He cut himself', mas dizemos 'He cut him' com significados totalmente diferentes?",
      "conceito": "'He cut him' significa que o homem cortou outra pessoa do sexo masculino (dois indivíduos distintos). Já 'He cut himself' emprega o pronome anafórico reflexivo para indicar obrigatoriamente a correferencialidade: o autor do corte e a vítima ferida são o mesmo indivíduo."
    },
    "inventario": [
      "A tabela completa dos 8 pronomes reflexivos: myself, yourself, himself, herself, itself (singular) / ourselves, yourselves, themselves (plural)",
      "A mudança morfológica: -self no singular vira -selves no plural",
      "O uso idiomático com BY: 'by myself / by herself' = sozinho(a), sem companhia e sem ajuda de ninguém",
      "A função enfática de prestígio: 'The President himself called me' (O próprio presidente em pessoa)",
      "A lista negra de verbos NÃO-reflexivos em inglês: feel, relax, shave, dress, wash, sit down, concentrate"
    ],
    "tabela_visual": "| Sujeito | Pronome Reflexivo Singular (-self) | Pronome Reflexivo Plural (-selves) | Exemplo de Uso Real |\n|---|---|---|---|\n| **I** | **myself** | — | *I cut **myself** shaving this morning.* |\n| **You** | **yourself** (uma pessoa) | **yourselves** (vocês) | *Take care of **yourself**! / Help **yourselves**!* |\n| **He** | **himself** | — | *He taught **himself** how to code.* |\n| **She** | **herself** | — | *She bought **herself** a diamond necklace.* |\n| **It** | **itself** | — | *The cat cleaned **itself** in the sun.* |\n| **We** | — | **ourselves** | *We thoroughly enjoyed **ourselves**.* |\n| **They** | — | **themselves** | *They built the house **themselves**.* |\n| **Autonomia** | **by myself** | = alone / without any help | *I traveled across Europe **by myself**.* |",
    "observacao_cards": [
      {
        "ingles": "Myself / Yourself / Himself",
        "traducao": "a mim mesmo / a ti mesmo / a si mesmo",
        "genero": "Singular (-self)",
        "motivo": "Termina em -self quando se refere a 1 única pessoa: 'He hurt himself'."
      },
      {
        "ingles": "Ourselves / Themselves",
        "traducao": "a nós mesmos / a si mesmos",
        "genero": "Plural (-selves)",
        "motivo": "Muda para -selves no plural: 'We introduced ourselves' (nunca 'ourself')."
      },
      {
        "ingles": "By myself = Alone",
        "traducao": "sozinho / por conta própria",
        "genero": "Expressão de Autonomia",
        "motivo": "Indica ausência de ajuda ou companhia: 'She lives by herself in a studio apartment'."
      },
      {
        "ingles": "I feel good (Sem Reflexivo!)",
        "traducao": "Eu me sinto bem",
        "genero": "Alerta Máximo",
        "motivo": "Verbos de sensação e higiene não usam reflexivo em inglês: 'I feel tired', 'He shaved', 'She dressed'."
      }
    ],
    "tecnica": "A Bússola do Reflexivo em 3 passos:\n\n**Passo 1** — O sujeito que fez a ação e a pessoa que a recebeu são a MESMA PESSOA?\n→ Se sim, use o pronome reflexivo terminado em **-self** (singular) ou **-selves** (plural).\n\n**Passo 2** — Você quer dizer 'sozinho' ou 'sem ajuda de ninguém'?\n→ Adicione a preposição **BY**: *by myself, by yourself, by himself, by herself*.\n\n**Passo 3** — O verbo é *feel, relax, wash, shave, dress, concentrate*?\n→ NUNCA adicione reflexivo! Use o verbo puro: *I feel great, let's relax, he shaved*.",
    "teoria": "### Tratado Teórico: A Teoria da Ligação e a Anáfora Reflexiva\n\nNa Teoria da Regência e Ligação (*Binding Theory*) de Noam Chomsky, os pronomes reflexivos são categorizados como **anáforas** (*Principle A*):\n\n#### 1. Princípio A da Teoria da Ligação\nUma anáfora reflexiva DEVE ser vinculada (*bound*) a um antecedente no mesmo domínio sintático local (a mesma oração):\n- *John$_i$ blamed **himself**$_i$.* (Himself refere-se obrigatoriamente a John).\n- *John$_i$ blamed **him**$_j$.* (Him refere-se obrigatoriamente a outra pessoa masculina, nunca a John).\n\n#### 2. Uso Enfático ou Intensificador (*Emphatic Pronouns*)\nO pronome reflexivo pode ser usado imediatamente após o substantivo ou no final da frase para enfatizar que a pessoa realizou a ação pessoalmente, sem intermediários:\n- *I spoke to the CEO **myself**.* (Falei pessoalmente com ele, ninguém falou por mim).\n- *The Queen **herself** attended the ceremony.*\n\n#### 3. Expressões Idiomáticas Consagradas\n- *Help yourself!* (Sirva-se à vontade com comida/bebida).\n- *Make yourself at home!* (Sinta-se em casa!).\n- *Behave yourself!* (Comporte-se bem!).\n- *Enjoy yourself!* (Divirta-se!).",
    "ponte": "Em português, o pronome 'se / me' é usado em quase todo verbo: 'Eu me levantei', 'Ela se vestiu', 'Eles se sentaram', 'Eu me sinto bem'.\n\nNo inglês, esses verbos são intransitivos puros:\n- 'Eu me sinto ótimo' → **I feel great** (proibido dizer *I feel myself*).\n- 'Ele se barbeou' → **He shaved** (não diga *he shaved himself* a menos que ele tenha se barbeado sozinho pela primeira vez como rito de passagem).\n- 'Nós nos divertimos muito' → **We enjoyed ourselves very much** (aqui sim o reflexivo é obrigatório com enjoy!).\n- 'Fiz isso sozinho' → **I did it by myself**.",
    "exemplos_prc": [
      {
        "oracao": "She taught herself how to play the classical guitar by watching video tutorials.",
        "pergunta": "Qual sentido o pronome 'herself' confere à frase?",
        "resposta": "Mostra que ela foi sua própria professora (autodidata), sem auxílio de um professor físico.",
        "conclusao": "taught herself = aprendeu sozinha / ensinou a si mesma."
      },
      {
        "oracao": "Be careful with that boiling water, or you will burn yourself!",
        "pergunta": "Por que 'yourself' foi usado nesta advertência?",
        "resposta": "Porque o sujeito oculto do imperativo é 'you', e a vítima da queimadura seria você mesmo.",
        "conclusao": "burn yourself = queimar-se."
      },
      {
        "oracao": "After living with roommates for years, he finally decided to live by himself.",
        "pergunta": "O que a locução 'by himself' significa com precisão?",
        "resposta": "Significa morar sozinho, sem a presença de colegas de quarto ou familiares.",
        "conclusao": "live by himself = morar sozinho."
      },
      {
        "oracao": "We thoroughly enjoyed ourselves at the company annual gala dinner.",
        "pergunta": "Por que o verbo 'enjoy' exigiu o reflexivo 'ourselves'?",
        "resposta": "Em inglês, 'enjoy' é verbo transitivo e exige um objeto: para dizer 'divertir-se', usa-se enjoy oneself.",
        "conclusao": "enjoyed ourselves = nos divertimos."
      }
    ],
    "armadilhas": [
      {
        "errado": "I feel myself very tired today.",
        "certo": "I feel very tired today.",
        "motivo": "O verbo 'feel' nunca deve ser acompanhado de pronome reflexivo para estados de saúde e cansaço."
      },
      {
        "errado": "He shaved himself and dressed himself.",
        "certo": "He shaved and dressed.",
        "motivo": "Verbos de rotina de higiene pessoal (shave, wash, dress) dispensam reflexivos no inglês padrão."
      },
      {
        "errado": "I went to the cinema by my own.",
        "certo": "I went to the cinema by myself. (ou: on my own)",
        "motivo": "Use 'by myself' ou 'on my own'. Nunca misture as duas estruturas dizendo *by my own*."
      },
      {
        "errado": "We introduced ourself to the new neighbors.",
        "certo": "We introduced ourselves to the new neighbors.",
        "motivo": "O pronome reflexivo de 'we' no plural é 'ourselves' (com -ves), nunca 'ourself'."
      }
    ],
    "coda": "Ação que volta para você: termina em -SELF no singular e -SELVES no plural. Feito sozinho? BY MYSELF!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o pronome reflexivo correto para 'He':\n\n\"He looked at ___ in the polished glass window.\"",
        "opcoes": ["himself", "him", "hisself", "himselves"],
        "resposta": 0,
        "explicacao": "O pronome reflexivo de He é 'himself'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete para expressar autonomia ('sozinha'):\n\n\"My little daughter can tie her shoelaces by ___ now.\"",
        "opcoes": ["herself", "her", "she", "by her own"],
        "resposta": 0,
        "explicacao": "Autonomia com 'by' para ela usa 'by herself'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual das frases está gramaticalmente PERFEITA sem reflexivo intruso?",
        "opcoes": [
          "I feel very happy today.",
          "I feel myself very happy today.",
          "I feel me very happy today.",
          "I feel myself happy."
        ],
        "resposta": 0,
        "explicacao": "'Feel' não aceita reflexivo em inglês: 'I feel very happy today'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete o plural com o pronome reflexivo de 'We':\n\n\"We bought ___ tickets to the London West End theatre.\"",
        "opcoes": ["ourselves", "ourself", "us", "ours"],
        "resposta": 0,
        "explicacao": "O plural reflexivo de 'we' é 'ourselves'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no pronome para 'eles mesmos' antes de revelar:\n\n\"The children are old enough to look after ___ for a couple of hours.\"\n(As crianças têm idade suficiente para cuidar de si mesmas por algumas horas.)",
        "resposta": "The children are old enough to look after themselves for a couple of hours.",
        "revelacao": "The children are old enough to look after themselves for a couple of hours.",
        "dica": "Plural de they (themselves)",
        "explicacao": "O reflexivo plural de they é 'themselves'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na expressão hospitaleira antes de revelar:\n\n\"Welcome to the buffet! Please help ___ to the fresh salads and desserts.\"\n(Bem-vindos ao bufê! Por favor sirvam-se à vontade com as saladas frescas...) [falando com várias pessoas]",
        "resposta": "Please help yourselves to the fresh salads and desserts.",
        "revelacao": "Please help yourselves to the fresh salads and desserts.",
        "dica": "Vocês (plural: yourselves)",
        "explicacao": "Falando com várias pessoas usa-se o plural 'help yourselves'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no pronome enfático de autor antes de revelar:\n\n\"The author ___ signed my copy of the book after the lecture.\"\n(O próprio autor em pessoa autografou meu exemplar do livro após a palestra.)",
        "resposta": "The author himself signed my copy of the book after the lecture.",
        "revelacao": "The author himself signed my copy of the book after the lecture.",
        "dica": "Himself (enfático)",
        "explicacao": "O autor homem em pessoa: 'The author himself'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na autonomia de 1ª pessoa antes de revelar:\n\n\"I painted the whole living room by ___ over the weekend.\"\n(Pintei toda a sala de estar sozinho no fim de semana.)",
        "resposta": "I painted the whole living room by myself over the weekend.",
        "revelacao": "I painted the whole living room by myself over the weekend.",
        "dica": "By myself = sozinho",
        "explicacao": "Autonomia de 1ª pessoa: 'by myself'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome reflexivo de 1ª pessoa do singular:\n\n\"I introduced ___ to the new team members.\"",
        "resposta": "myself",
        "explicacao": "O pronome é 'myself'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome reflexivo de 3ª pessoa feminina:\n\n\"She cut ___ while preparing vegetables for the soup.\"",
        "resposta": "herself",
        "explicacao": "O pronome é 'herself'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome reflexivo de 1ª pessoa do plural (-selves):\n\n\"We really enjoyed ___ at the music festival.\"",
        "resposta": "ourselves",
        "explicacao": "O pronome é 'ourselves'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a preposição de duas letras usada com reflexivos para significar 'sozinho':\n\n\"He traveled to Japan all ___ himself.\"",
        "resposta": "by",
        "explicacao": "A preposição é 'by'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 13: Both, Either, Neither
  // ─────────────────────────────────────────────────────────────
  "b1-lez13": {
    "id": "b1-lez13",
    "num": "Lesson 13",
    "titulo": "Both, Either, Neither",
    "subtitulo": "Falando Sobre Duas Opções, Pessoas ou Alternativas",
    "cena": {
      "origem": "dialogo",
      "titulo": "Hiring Candidates for the Design Lead Position",
      "texto": "**Recruiter:** We interviewed two finalists today: Marco and Elena. Both candidates are exceptionally talented.\n**Director:** That's great! Do they speak French? The client is in Paris.\n**Recruiter:** Unfortunately, neither candidate speaks French. Neither Marco nor Elena has international experience.\n**Director:** What about availability? Can either of them start immediately next Monday?\n**Recruiter:** Yes, either candidate can start next week. Both of them are ready!"
    },
    "fio": {
      "abertura": "Quando estamos diante de duas opções, duas pessoas ou dois caminhos, a língua inglesa ativa um trio de palavras muito específico: Both (os dois juntos), Either (um ou outro) e Neither (nenhum dos dois). Dominá-las é o passaporte para negociar e tomar decisões com elegância.",
      "descoberta": "Repare na precisão do recrutador: «Both candidates are talented» (verbo no plural: os dois são!), mas quando fala da falta de francês: «neither candidate speaks French» (verbo no singular e sem palavra 'not'!). E para a pergunta de disponibilidade: «Can either of them start?» (qualquer um dos dois!).",
      "fecho": "Agora você domina a geometria das duas opções: **Both** soma os dois (2/2); **Either** escolhe um dos dois (1/2); e **Neither** descarta os dois com classe (0/2)."
    },
    "alerta": "O erro mais perigoso de estudantes com 'Neither' é cometer a dupla negação: dizer *'Neither of them doesn't know'* (ERRADO!). A palavra **neither** já é intrinsecamente negativa! Ela exige que o verbo da oração fique na forma AFIRMATIVA (*Neither of them knows*).",
    "definicao": {
      "fenomeno": "Both brothers are doctors (2 de 2) · You can take either bus (1 de 2: qualquer um) · Neither restaurant is open (0 de 2: nenhum dos dois)",
      "causa": "Por que 'neither' exige o verbo na forma afirmativa?",
      "conceito": "'Neither' é a contração etimológica de 'not either' (nenhum de dois). Como a carga semântica de negação já reside no próprio pronome, inserir outro auxiliar negativo como 'not' ou 'doesn't' viola a regra canônica inglesa que proíbe duplas negações no registro formal."
    },
    "inventario": [
      "BOTH (+): refere-se aos dois elementos juntos; exige SEMPRE verbo no plural (Both are ready)",
      "EITHER (+/-): refere-se a um ou outro (qualquer um dos dois); com substantivo singular exige verbo singular",
      "NEITHER (-): refere-se a nenhum dos dois; exige verbo na forma afirmativa (Neither is correct)",
      "Os pares correlativos de conexão: 'both... and' (tanto... quanto), 'either... or' (ou... ou), 'neither... nor' (nem... nem)",
      "A estrutura partitiva com 'OF': both of them, either of us, neither of the books"
    ],
    "tabela_visual": "| Quantificador Dual | Sentido Matemático | Concordância Verbal | Exemplo Canônico |\n|---|---|---|---|\n| **BOTH (ambos)** | **2 de 2** (os dois juntos) | Sempre **PLURAL** | *Both cars **are** electric.* |\n| **EITHER (um ou outro)** | **1 de 2** (qualquer dos dois) | **SINGULAR** (com subst. sing.) | *Either day **is** fine with me.* |\n| **NEITHER (nenhum dos dois)**| **0 de 2** (rejeita ambos) | **SINGULAR** (verbo afirmativo) | *Neither car **is** available.* |\n| **Both... and** | Adição conjunta | Plural | *She speaks **both** English **and** German.* |\n| **Either... or** | Alternativa excludente | Concorda com o mais próximo | *You can have **either** tea **or** coffee.* |\n| **Neither... nor** | Negação dupla correta | Verbo afirmativo | *He speaks **neither** French **nor** Spanish.* |",
    "observacao_cards": [
      {
        "ingles": "Both (+)",
        "traducao": "ambos / os dois",
        "genero": "Soma Dual",
        "motivo": "Exige verbo no plural: 'Both books are fascinating' / 'Both of my parents are teachers'."
      },
      {
        "ingles": "Either (Opção)",
        "traducao": "um ou outro / qualquer um dos dois",
        "genero": "Alternativa Dual",
        "motivo": "Dá escolha: 'You can take either bus, they both go downtown'."
      },
      {
        "ingles": "Neither (-)",
        "traducao": "nenhum dos dois",
        "genero": "Negação Dual Pura",
        "motivo": "Verbo fica afirmativo: 'Neither of them is ready' (nunca 'neither isn't')."
      },
      {
        "ingles": "Neither... nor",
        "traducao": "nem... nem",
        "genero": "Par Correlativo Negativo",
        "motivo": "Nega os dois itens: 'Neither Lucas nor Daniel attended the meeting'."
      }
    ],
    "tecnica": "A Escolha Dual em 3 passos:\n\n**Passo 1** — Você quer dizer que OS DOIS elementos estão incluídos (2 de 2)?\n→ Use **BOTH** com verbo no plural (*Both of them are here*).\n\n**Passo 2** — Você quer oferecer UMA ESCOLHA entre dois caminhos (1 de 2)?\n→ Use **EITHER** (*You can choose either option*).\n\n**Passo 3** — Você quer dizer que NENHUM DOS DOIS é verdadeiro (0 de 2)?\n→ Use **NEITHER** com verbo afirmativo (*Neither answer is correct*).",
    "teoria": "### Tratado Teórico: A Semântica dos Determinantes Duais\n\nNa semântica formal de quantificadores (*generalized quantifier theory*), *both, either* e *neither* são restritos a domínios de cardinalidade dois ($|D| = 2$):\n\n#### 1. Proibição de Uso com Três ou Mais Elementos\nSe o conjunto tiver 3 ou mais itens, o trio dual não pode ser usado:\n- Para 3 ou mais afirmativo: use **ALL** (em vez de *both*): *All three candidates were great.*\n- Para 3 ou mais em escolha: use **ANY** (em vez de *either*): *You can take any of the five buses.*\n- Para 3 ou mais negativo: use **NONE** (em vez de *neither*): *None of the ten students passed.*\n\n#### 2. Concordância Gramatical Formal com 'Neither of'\nEm gramática prescritiva tradicional e redação culta, *neither of + plural noun* exige verbo no **singular**:\n- *Neither of the candidates **is** qualified.* (Gramática formal de concurso e exames).\n- Na fala coloquial diária, ouve-se nativos usando o plural (*Neither of them are...*), mas em exames IELTS/Cambridge, o singular é considerado o único 100% correto.\n\n#### 3. Regra de Concordância com 'Neither... nor' e 'Either... or'\nO verbo concorda com o sujeito que estiver mais próximo dele (*proximity principle*):\n- *Neither the teacher nor the **students were** prepared.*\n- *Neither the students nor the **teacher was** prepared.*",
    "ponte": "Em português usamos 'ambos' para os dois, mas nos confundimos nas negações e opções:\n- 'Ambos os livros são bons' → **Both books are good**.\n- 'Qualquer um dos dois dias serve' → **Either day is fine**.\n- 'Nenhum dos dois restaurantes está aberto' → **Neither restaurant is open** (o verbo fica no singular e afirmativo: *is*, não *isn't*!).\n- 'Eu não falo nem alemão nem russo' → **I speak neither German nor Russian**.",
    "exemplos_prc": [
      {
        "oracao": "Both of my brothers work as software engineers in Silicon Valley.",
        "pergunta": "Por que o verbo 'work' está no plural sem -s?",
        "resposta": "Porque 'Both' abrange os dois irmãos juntos, exigindo concordância no plural.",
        "conclusao": "Both of my brothers work = Ambos os meus irmãos trabalham."
      },
      {
        "oracao": "Neither of the two hotels had a swimming pool available.",
        "pergunta": "Qual é o sentido exato de 'neither of the two hotels'?",
        "resposta": "Significa que o Hotel A não tinha piscina e o Hotel B também não tinha (zero de dois).",
        "conclusao": "Neither hotel had = Nenhum dos dois hotéis tinha."
      },
      {
        "oracao": "You can park on either side of the street on Sundays.",
        "pergunta": "O que 'either side' autoriza o motorista a fazer?",
        "resposta": "Estacionar em qualquer um dos dois lados da rua (no lado esquerdo OU no lado direito).",
        "conclusao": "on either side = em qualquer um dos dois lados."
      },
      {
        "oracao": "She speaks neither Italian nor Spanish, only Portuguese.",
        "pergunta": "Por que o verbo 'speaks' está na forma afirmativa com -s?",
        "resposta": "Porque o par correlativo 'neither... nor' já confere toda a negação da frase.",
        "conclusao": "speaks neither... nor = não fala nem... nem."
      }
    ],
    "armadilhas": [
      {
        "errado": "Neither of them doesn't know the answer.",
        "certo": "Neither of them knows the answer.",
        "motivo": "'Neither' já é negativo. Usar 'doesn't' gera dupla negação proibida no inglês culto."
      },
      {
        "errado": "Both of the three boys were fast.",
        "certo": "All three boys were fast.",
        "motivo": "'Both' só pode ser usado para exatamente dois elementos. Para três ou mais, use 'all'."
      },
      {
        "errado": "Neither of the two phones are working. (escrita formal)",
        "certo": "Neither of the two phones is working.",
        "motivo": "No padrão culto formal, 'neither of' rege o verbo no singular (is working)."
      },
      {
        "errado": "Either John and David can help you.",
        "certo": "Both John and David can help you. (ou: Either John or David)",
        "motivo": "'And' faz par com 'Both'. 'Either' faz par exclusivamente com 'Or'."
      }
    ],
    "coda": "Os dois juntos? BOTH! Qualquer um dos dois? EITHER! Nenhum dos dois (com verbo afirmativo)? NEITHER!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o quantificador dual correto para 'ambos':\n\n\"___ of my parents were born in small Italian villages.\"",
        "opcoes": ["Both", "Either", "Neither", "Every"],
        "resposta": 0,
        "explicacao": "Para os dois juntos com verbo no plural (were), usamos 'Both'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a negação dual correta:\n\n\"I tried on two pairs of shoes, but ___ of them fitted comfortably.\"",
        "opcoes": ["neither", "either", "both", "none"],
        "resposta": 0,
        "explicacao": "Nenhum dos dois pares serviu: usamos 'neither of them'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a escolha entre duas datas:\n\n\"Would you prefer Monday or Tuesday? — ___ day is fine with me, I am completely free.\"",
        "opcoes": ["Either", "Both", "Neither", "All"],
        "resposta": 0,
        "explicacao": "Qualquer um dos dois dias serve: usamos 'Either day'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete o par correlativo: \"She is ___ intelligent and hardworking.\"",
        "opcoes": ["both", "either", "neither", "whether"],
        "resposta": 0,
        "explicacao": "O par correlativo com 'and' é 'both... and'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no par correlativo negativo antes de revelar:\n\n\"He drinks ___ tea nor coffee; he drinks only water.\"\n(Ele não bebe nem chá nem café; ele bebe apenas água.)",
        "resposta": "He drinks neither tea nor coffee; he drinks only water.",
        "revelacao": "He drinks neither tea nor coffee; he drinks only water.",
        "dica": "Neither faz par com nor",
        "explicacao": "O par correlativo é 'neither... nor'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no verbo singular afirmativo com neither antes de revelar:\n\n\"There are two elevators in the building, but neither of them ___ working today.\"\n(Há dois elevadores no prédio, mas nenhum dos dois está funcionando hoje.)",
        "resposta": "There are two elevators in the building, but neither of them is working today.",
        "revelacao": "There are two elevators in the building, but neither of them is working today.",
        "dica": "Neither rege verbo no singular (is)",
        "explicacao": "No padrão culto, 'neither of them' exige verbo singular: 'is working'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no par correlativo de opção antes de revelar:\n\n\"You can pay ___ by credit card or in cash at the counter.\"\n(Você pode pagar ou com cartão de crédito ou em dinheiro no balcão.)",
        "resposta": "You can pay either by credit card or in cash at the counter.",
        "revelacao": "You can pay either by credit card or in cash at the counter.",
        "dica": "Either faz par com or",
        "explicacao": "O par correlativo de opção é 'either... or'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no quantificador dual plural antes de revelar:\n\n\"___ my sister and I love classical music and theatre.\"\n(Tanto a minha irmã quanto eu adoramos música clássica e teatro.)",
        "resposta": "Both my sister and I love classical music and theatre.",
        "revelacao": "Both my sister and I love classical music and theatre.",
        "dica": "Both... and",
        "explicacao": "A conjunção aditiva dupla é 'Both... and'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que faz par com 'nor' (7 letras):\n\n\"She has ___ a car nor a motorcycle.\"",
        "resposta": "neither",
        "explicacao": "A palavra é 'neither'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra de 4 letras que significa 'ambos':\n\n\"___ candidates passed the background check.\"",
        "resposta": "Both",
        "explicacao": "A palavra é 'Both'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que faz par com 'or' para opções (6 letras):\n\n\"You can choose ___ the red or the blue shirt.\"",
        "resposta": "either",
        "explicacao": "A palavra é 'either'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra correlativa de 3 letras que faz par com 'neither':\n\n\"Neither Marco ___ Elena attended the ceremony.\"",
        "resposta": "nor",
        "explicacao": "A palavra é 'nor'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 14: As... As / Not as... As
  // ─────────────────────────────────────────────────────────────
  "b1-lez14": {
    "id": "b1-lez14",
    "num": "Lesson 14",
    "titulo": "As... As / Not as... As",
    "subtitulo": "Comparações de Igualdade e Inferioridade Diplomática",
    "cena": {
      "origem": "dialogo",
      "titulo": "Comparing Laptops at the Electronics Store",
      "texto": "**Customer:** Is this lightweight ultra-thin laptop as powerful as the desktop workstation?\n**Salesman:** In terms of everyday tasks, it is just as fast as the desktop. But it is not as heavy as your old laptop!\n**Customer:** That sounds great. And what about the display quality?\n**Salesman:** The screen is as bright as modern OLED televisions, and the battery lasts twice as long as the previous model."
    },
    "fio": {
      "abertura": "Você já aprendeu a comparar dizendo quem é mais alto (*taller*) ou mais caro (*more expensive*). Mas como você diz que duas coisas têm o mesmo nível de qualidade? Ou como você diz com delicadeza que um produto 'não é tão bom quanto o outro'? Entramos no mundo das comparações de igualdade com **As... As**.",
      "descoberta": "Repare na facilidade que o vendedor teve para equiparar os aparelhos: «as powerful as», «as fast as», «as bright as». Não importa se o adjetivo é curto ou longo: você apenas coloca a palavra pura recheada entre dois 'AS'! E para a comparação negativa: «not as heavy as»!",
      "fecho": "Agora você domina a comparação mais elegante e diplomática do inglês. Use **as + adjetivo + as** para igualdade, e **not as... as** para dizer que algo é inferior sem soar agressivo."
    },
    "alerta": "Brasileiros frequentemente dizem *'so... like'* ou *'as... than'* tentando traduzir 'tão... quanto'. Lembre-se: em comparações de igualdade, o par é SEMPRE **as + adjetivo + as** (nunca use 'than' aqui!).",
    "definicao": {
      "fenomeno": "Rome is as beautiful as Paris · My car is as fast as yours · London is not as warm as Madrid · He is twice as old as me",
      "causa": "Por que 'as... as' é muito mais simples que os comparativos comuns com '-er' e 'more'?",
      "conceito": "Na estrutura de equatividade (*equative comparison*), o adjetivo NUNCA muda de forma. Ele permanece 100% puro na sua forma positiva básica (big, expensive, tall, fast), ficando emoldurado entre os dois operadores correlativos 'as'."
    },
    "inventario": [
      "A estrutura afirmativa de igualdade: AS + Adjetivo Puro + AS (as tall as, as expensive as)",
      "A estrutura negativa de inferioridade suave: NOT AS + Adjetivo Puro + AS (not as expensive as = cheaper than)",
      "A alternativa clássica na negativa: NOT SO... AS (He is not so tall as his brother)",
      "O uso com advérbios de modo: as quickly as, as fluently as, as well as",
      "Multiplicadores de quantidade e proporção: twice as... as (duas vezes mais), three times as... as, as much as / as many as"
    ],
    "tabela_visual": "| Tipo de Comparação | Estrutura | Exemplo Autêntico | Significado Equivalente |\n|---|---|---|---|\n| **Igualdade Exata (=)** | **as** + adjetivo + **as** | *She is **as tall as** her sister.* | As duas têm exatamente a mesma altura |\n| **Inferioridade Suave (<)** | **not as** + adjetivo + **as** | *Silver is **not as expensive as** gold.* | O ouro é mais caro que a prata |\n| **Com Advérbio** | **as** + advérbio + **as** | *He drives **as carefully as** a professional.* | Modos de dirigir idênticos |\n| **Multiplicador (2x)** | **twice as** + adj. + **as** | *This house is **twice as big as** mine.* | A casa tem o dobro do tamanho |\n| **Quantidade (Massa)** | **as much** + subst. + **as** | *I don't have **as much money as** Bill Gates.* | Menos dinheiro que ele |\n| **Quantidade (Contável)** | **as many** + subst. + **as** | *She has **as many books as** the library.* | A mesma quantidade de livros |",
    "observacao_cards": [
      {
        "ingles": "As... As (Igualdade)",
        "traducao": "tão... quanto / tanto... quanto",
        "genero": "Comparação Equativa",
        "motivo": "O adjetivo fica inalterado no meio: 'as old as', 'as fast as', 'as intelligent as'."
      },
      {
        "ingles": "Not as... As (Inferioridade Suave)",
        "traducao": "não tão... quanto",
        "genero": "Comparação Negativa",
        "motivo": "Forma diplomática de dizer 'menos': 'It is not as cold as yesterday' (está mais quente)."
      },
      {
        "ingles": "Twice as long as",
        "traducao": "duas vezes mais longo que",
        "genero": "Multiplicador Proporcional",
        "motivo": "Multiplicador vem antes do primeiro as: 'twice as big as' / 'three times as expensive as'."
      },
      {
        "ingles": "As soon as possible (ASAP)",
        "traducao": "o mais rápido possível",
        "genero": "Expressão Consagrada",
        "motivo": "A famosa sigla ASAP vem desta estrutura: as soon (tão logo) as possible (quanto possível)."
      }
    ],
    "tecnica": "A Balança de Equivalência em 3 passos:\n\n**Passo 1** — Pegue o adjetivo na sua forma mais PURA (sem -er, sem more, sem alterações):\n→ *fast, big, beautiful, expensive*.\n\n**Passo 2** — Coloque **AS** antes e **AS** depois:\n→ **as fast as**, **as beautiful as**.\n\n**Passo 3** — Quer dizer que NÃO é tão equivalente?\n→ Adicione **not**: **not as fast as** (*My car is not as fast as yours*).",
    "teoria": "### Tratado Teórico: A Semântica das Comparações de Equatividade\n\nEm semântica escalar (*scalar semantics*), as construções equativas estabelecem uma relação de equivalência de graus dentro de uma dimensão mensurável:\n\n#### 1. Pronome Sujeito vs Objeto após o Segundo 'As'\nNa língua formal e em exames internacionais, o pronome que segue o segundo *as* deve ser teoricamente um pronome reto acompanhado do verbo auxiliar elíptico, enquanto a língua falada utiliza o pronome oblíquo:\n- **Padrão Culto Formal:** *She is as tall as **I am**.* (ou *as he is*).\n- **Uso Oral Coloquial Comum:** *She is as tall as **me**.* (ou *as him*).\nAmbos são amplamente compreendidos, mas o formato *as I am* é o predileto de redações acadêmicas.\n\n#### 2. Not as... as como Ferramenta de Atenuação Diplomática (*Euphemism*)\nEm ambientes profissionais e etiqueta social em inglês, dizer que algo é 'pior' (*worse*) ou 'mais feio' (*uglier*) soa agressivo e indelicado. Os nativos preferem usar o *not as... as* para suavizar a crítica:\n- Direto e ríspido: *Your presentation was worse than his.*\n- Diplomático e elegante: *Your presentation was **not quite as detailed as** his.*\n\n#### 3. Expressões Idiomáticas Cristalizadas com As... As (*Similes*)\nO inglês possui dezenas de comparações metafóricas fixas:\n- *as quiet as a mouse* (tão quieto quanto um rato / super silencioso)\n- *as blind as a bat* (cego como uma toupeira/morcego)\n- *as light as a feather* (leve como uma pena)\n- *as cool as a cucumber* (super calmo e sereno sob pressão)",
    "ponte": "Em português usamos 'tão... quanto' ou 'tão... como': 'Ela é tão alta quanto eu', 'Este livro não é tão bom quanto o outro'.\n\nNo inglês, o 'tão' e o 'quanto' são expressos pela mesmíssima palavra: **AS**:\n- 'tão rápido quanto' → **as fast as**\n- 'não tão caro quanto' → **not as expensive as**\n- 'tão logo quanto possível' → **as soon as possible**\n\n⚠️ Nunca use *than* com as: dizer *as tall than* é um erro primário!",
    "exemplos_prc": [
      {
        "oracao": "This modern electric car is as quiet as a whisper on the road.",
        "pergunta": "Como a comparação de igualdade foi construída nesta oração descritiva?",
        "resposta": "Emoldurando o adjetivo puro 'quiet' entre os dois operadores 'as... as'.",
        "conclusao": "as quiet as = tão silencioso quanto."
      },
      {
        "oracao": "The second interview was not as stressful as the first one.",
        "pergunta": "Qual sentido a forma negativa 'not as stressful as' comunica?",
        "resposta": "Comunica que a segunda entrevista foi menos estressante que a primeira (inferioridade suave).",
        "conclusao": "not as stressful as = não tão estressante quanto."
      },
      {
        "oracao": "He speaks Spanish as fluently as a native speaker from Madrid.",
        "pergunta": "Por que usamos o advérbio 'fluently' em vez de um adjetivo?",
        "resposta": "Porque a comparação refere-se ao modo como ele fala (verbo speak), mantendo a estrutura as... as.",
        "conclusao": "as fluently as = tão fluentemente quanto."
      },
      {
        "oracao": "Our new corporate office is twice as big as our previous location.",
        "pergunta": "Onde o multiplicador de proporção 'twice' deve ser posicionado?",
        "resposta": "O multiplicador posiciona-se imediatamente antes do primeiro 'as': twice as big as.",
        "conclusao": "twice as big as = duas vezes maior que / o dobro do tamanho de."
      }
    ],
    "armadilhas": [
      {
        "errado": "He is as taller as his father.",
        "certo": "He is as tall as his father.",
        "motivo": "Na estrutura 'as... as', o adjetivo nunca recebe -er nem more: use a forma básica pura (tall)."
      },
      {
        "errado": "This phone is as good than that one.",
        "certo": "This phone is as good as that one.",
        "motivo": "Nunca use 'than' em comparações de igualdade; o par correto é sempre 'as... as'."
      },
      {
        "errado": "London is so expensive like New York.",
        "certo": "London is as expensive as New York.",
        "motivo": "Para equiparar qualidades, use a fórmula padrão 'as + adjetivo + as'."
      },
      {
        "errado": "I don't have as many money as you.",
        "certo": "I don't have as much money as you.",
        "motivo": "'Money' é incontável, logo exige 'as much money', não 'as many'."
      }
    ],
    "coda": "Para comparar igualdades: AS + Adjetivo Puro + AS! Para atenuar críticas com elegância: NOT AS + Adjetivo + AS!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com a estrutura de igualdade correta:\n\n\"My old laptop is ___ fast ___ this brand-new model.\"",
        "opcoes": ["as / as", "so / than", "as / than", "more / as"],
        "resposta": 0,
        "explicacao": "A comparação de igualdade usa a fórmula 'as... as'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase está gramaticalmente PERFEITA sem flexão incorreta?",
        "opcoes": [
          "She is as intelligent as her professor.",
          "She is as more intelligent as her professor.",
          "She is as intelligent than her professor.",
          "She is so intelligent like her professor."
        ],
        "resposta": 0,
        "explicacao": "O adjetivo permanece na forma pura entre os dois 'as': 'as intelligent as'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o multiplicador proporcional correto:\n\n\"The penthouse suite is ___ as expensive as the standard room.\"",
        "opcoes": ["twice", "two", "double than", "twice more"],
        "resposta": 0,
        "explicacao": "A expressão de dobro proporcional é 'twice as... as'."
      },
      {
        "tipo": "escolha",
        "pergunta": "O que a frase *\"Silver is not as valuable as gold\"* significa com precisão?",
        "opcoes": [
          "O ouro é mais valioso que a prata.",
          "A prata é mais valiosa que o ouro.",
          "A prata e o ouro têm o mesmo valor.",
          "Nenhum dos dois tem valor."
        ],
        "resposta": 0,
        "explicacao": "'Not as valuable as' indica inferioridade: a prata é menos valiosa que o ouro."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no adjetivo puro antes de revelar:\n\n\"He is not as ___ as his younger brother.\"\n(Ele não é tão alto quanto seu irmão mais novo.)",
        "resposta": "He is not as tall as his younger brother.",
        "revelacao": "He is not as tall as his younger brother.",
        "dica": "Adjetivo alto puro (tall)",
        "explicacao": "O adjetivo fica na forma pura: 'tall'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no quantificador de substantivo contável plural antes de revelar:\n\n\"I don't have as ___ books on philosophy as the professor.\"\n(Eu não tenho tantos livros sobre filosofia quanto o professor.)",
        "resposta": "I don't have as many books on philosophy as the professor.",
        "revelacao": "I don't have as many books on philosophy as the professor.",
        "dica": "Books é contável plural (many)",
        "explicacao": "Substantivos contáveis no plural usam 'as many books as'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na expressão fixa clássica antes de revelar:\n\n\"Please send me the quarterly financial report as ___ as possible.\"\n(Por favor me envie o relatório financeiro trimestral o mais rápido possível.)",
        "resposta": "Please send me the quarterly financial report as soon as possible.",
        "revelacao": "Please send me the quarterly financial report as soon as possible.",
        "dica": "Soon = rápido/cedo (ASAP)",
        "explicacao": "A expressão universal é 'as soon as possible'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no advérbio de modo antes de revelar:\n\n\"She sings as ___ as a professional opera singer.\"\n(Ela canta tão bem quanto uma cantora lírica profissional.)",
        "resposta": "She sings as well as a professional opera singer.",
        "revelacao": "She sings as well as a professional opera singer.",
        "dica": "Advérbio de modo para sing (well)",
        "explicacao": "Para qualificar o verbo cantar usa-se o advérbio 'well': 'as well as'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra de 2 letras que preenche ambos os lados da comparação de igualdade:\n\n\"He is ___ strong ___ an ox.\"",
        "resposta": "as",
        "explicacao": "A palavra que emoldura o adjetivo é 'as'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma pura do adjetivo 'good' na estrutura equativa:\n\n\"This movie is just as ___ as the book.\" (bom)",
        "resposta": "good",
        "explicacao": "O adjetivo permanece puro: 'good'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra de 4 letras para quantidade incontável de tempo:\n\n\"I don't have as ___ free time as I used to.\"",
        "resposta": "much",
        "explicacao": "Time é incontável: 'as much free time as'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a partícula negativa de 3 letras para criar a comparação de inferioridade:\n\n\"Today is ___ as hot as yesterday.\"",
        "resposta": "not",
        "explicacao": "A partícula negativa é 'not'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 15: Gerund vs Infinitive (Verbos com Mudança Radical de Sentido)
  // ─────────────────────────────────────────────────────────────
  "b1-lez15": {
    "id": "b1-lez15",
    "num": "Lesson 15",
    "titulo": "Gerund vs Infinitive",
    "subtitulo": "Stop to Do vs Stop Doing — O Clímax do Nível B1",
    "cena": {
      "origem": "dialogo",
      "titulo": "A Road Trip Conversation",
      "texto": "**Leo:** I am feeling very tired, Maya. Can we stop to have a cup of coffee at the next petrol station?\n**Maya:** Of course! I stopped drinking energy drinks last year, so coffee sounds perfect.\n**Leo:** Did you remember to lock the front door of the apartment before we left?\n**Maya:** Yes, I clearly remember turning the key twice. And I will never forget seeing the Grand Canyon for the first time!"
    },
    "fio": {
      "abertura": "Chegamos à Lição 15, o cume dourado do Módulo B1! Você já sabe que alguns verbos pedem infinitivo (*want to go*) e outros pedem gerúndio (*enjoy dancing*). Mas existe um grupo de elite de verbos que aceita OS DOIS formatos, só que com uma pegadinha fascinante: o sentido da frase muda completamente!",
      "descoberta": "Repare no diálogo entre Leo e Maya: Leo disse «Can we stop to have coffee?» (ele quer interromper a viagem PARA tomar café!). Já Maya disse «I stopped drinking energy drinks» (ela interrompeu e ABANDONOU o consumo do energético!). E Maya disse «Remember to lock» (lembre-se do dever futuro) vs «Remember turning the key» (lembrança viva de um momento passado)! Uma nuance de tirar o fôlego!",
      "fecho": "Parabéns por alcançar o ápice do Módulo B1! Dominar a sutil fronteira entre 'Stop to do' e 'Stop doing' é a prova definitiva de fluência e precisão em inglês."
    },
    "alerta": "Dizer 'I stopped smoking' significa que você abandonou o vício do cigarro e salvou sua saúde. Dizer 'I stopped to smoke' significa que você estava caminhando, parou o que estava fazendo, tirou o isqueiro do bolso e acendeu um cigarro! Trocar essa estrutura pode mudar completamente a sua mensagem.",
    "definicao": {
      "fenomeno": "He stopped to smoke (parou para fumar) vs He stopped smoking (parou de fumar) · Remember to lock the door (dever futuro) vs I remember locking it (memória do passado)",
      "causa": "Por que o sentido do verbo muda tão radicalmente entre o infinitivo e o gerúndio?",
      "conceito": "O Infinitivo com 'TO' carrega inerentemente uma orientação para o **futuro**, para o **propósito** e para uma ação subsequente (parar *a fim de fazer* outra coisa). O Gerúndio em '-ING' carrega uma orientação para o **passado**, para a **experiência em si** ou para o ato contínuo que está sendo abandonado."
    },
    "inventario": [
      "STOP: Stop to do (interromper uma ação para iniciar outra) vs Stop doing (cessar/abandonar um hábito de vez)",
      "REMEMBER: Remember to do (lembrar-se de cumprir um dever futuro) vs Remember doing (lembrar-se de uma memória vivida no passado)",
      "FORGET: Forget to do (esquecer-se de realizar uma tarefa) vs Forget doing (esquecer uma experiência marcante do passado)",
      "TRY: Try to do (fazer um esforço árduo para superar um obstáculo) vs Try doing (fazer um teste/experimento como alternativa)",
      "REGRET: Regret to tell/inform (lamentar dar uma má notícia profissional agora) vs Regret doing (arrepender-se de algo que fez no passado)"
    ],
    "tabela_visual": "| Verbo | Seguido de INFINITIVO (TO + Verbo) | Seguido de GERÚNDIO (Verbo + ING) |\n|---|---|---|\n| **STOP** | **Parar PARA fazer outra coisa**<br>*He stopped to drink water.* (Fez uma pausa) | **Parar DE fazer (abandonar o hábito)**<br>*He stopped drinking soda.* (Nunca mais bebeu) |\n| **REMEMBER** | **Lembrar de cumprir um dever**<br>*Remember to call your mom.* (Não se esqueça) | **Recordar-se de uma memória passada**<br>*I remember meeting her in Paris.* (Tenho a lembrança) |\n| **FORGET** | **Esquecer de realizar uma tarefa**<br>*I forgot to lock the door.* (A porta ficou aberta) | **Esquecer uma experiência do passado**<br>*I will never forget seeing the sea.* (Memória inesquecível) |\n| **TRY** | **Fazer esforço físico/mental árduo**<br>*I tried to lift the heavy box.* (Tentei com força) | **Testar como experimento/solução**<br>*Try restarting your computer.* (Faça esse teste) |\n| **REGRET** | **Lamento formal ao dar má notícia**<br>*We regret to inform you that...* (Comunicação) | **Arrepender-se de um ato passado**<br>*I regret saying those angry words.* (Remorso) |",
    "observacao_cards": [
      {
        "ingles": "Stop to smoke vs Stop smoking",
        "traducao": "parar para fumar vs parar de fumar",
        "genero": "Diferença Vital",
        "motivo": "Stop to smoke = interrompe a caminhada para acender o cigarro. Stop smoking = largou o vício."
      },
      {
        "ingles": "Remember to call vs Remember calling",
        "traducao": "lembrar de ligar vs lembrar de ter ligado",
        "genero": "Dever vs Memória",
        "motivo": "Remember to call = lembre-se do dever futuro. Remember calling = lembro da conversa que tive no passado."
      },
      {
        "ingles": "Try to open vs Try restarting",
        "traducao": "tentar com esforço vs testar como alternativa",
        "genero": "Esforço vs Experimento",
        "motivo": "Try to open: a porta está emperrada e faço força. Try restarting: teste reiniciar para ver se resolve."
      },
      {
        "ingles": "I will never forget meeting you",
        "traducao": "Nunca esquecerei de ter te conhecido",
        "genero": "Memória Afetiva",
        "motivo": "Forget com -ing expressa a recordação inesquecível de uma vivência do passado."
      }
    ],
    "tecnica": "A Bússola do Sentido em 3 passos:\n\n**Passo 1** — É o verbo STOP?\n- Parou no meio do caminho com o objetivo de fazer outra coisa? ➔ Use **TO + Verbo** (*stopped to eat*).\n- Abandonou ou cessou a atividade de vez? ➔ Use **Verbo-ING** (*stopped eating sugar*).\n\n**Passo 2** — É REMEMBER ou FORGET?\n- É um compromisso, dever ou tarefa que precisa ser feita? ➔ Use **TO + Verbo** (*remember to buy milk*).\n- É uma memória ou cena gravada na sua cabeça do passado? ➔ Use **Verbo-ING** (*I remember visiting Rome*).\n\n**Passo 3** — É o verbo TRY?\n- Exige força e você pode fracassar na tentativa? ➔ Use **TO + Verbo** (*try to push the car*).\n- É um conselho de teste ('experimente fazer isso')? ➔ Use **Verbo-ING** (*try taking an aspirin*).",
    "teoria": "### Tratado Teórico: A Gramática da Complementação Verbal e o Controle Semântico\n\nEm sintaxe gerativa contemporânea e semântica de complementos verbais, a alternância entre infinitivo e gerúndio reflete o contraste entre **potencialidade prospectiva** e **realidade fática**:\n\n#### 1. A Teleologia do Infinitivo (To Infinitive)\nA partícula *to* tem origem preposicional de direção física. Quando aplicada à complementação verbal, ela preserva sua conotação de **movimento em direção a um objetivo futuro**:\n- *He stopped **to buy** petrol.* = O ato de parar tinha como alvo futuro a compra de combustível.\n- *Please remember **to post** this letter.* = O ato de postar está situado no futuro do ato de lembrar.\n\n#### 2. A Faticidade do Gerúndio (-ING Form)\nA terminação *-ing* nominaliza o evento como algo consolidado, em andamento ou factual no mundo real (*factuality*):\n- *He stopped **smoking**.* = O evento 'fumar' era uma realidade factual na vida dele, e agora foi interrompido.\n- *I remember **locking** the door.* = O evento 'trancar a porta' é um fato consumado no passado gravado na minha memória autobiográfica.\n\n#### 3. O Verbo Regret: Formalidade vs Remorso\n- **Regret to + verbo (Comunicação formal presente):**\n  - *We **regret to announce** that flight 302 has been cancelled.* (Lamentamos comunicar agora).\n- **Regret + verbo-ing (Remorso autobiográfico de ação passada):**\n  - *I **regret quitting** university in my final year.* (Tenho remorso de ter largado no passado).",
    "ponte": "Em português, a preposição 'de' ou 'para' resolve essa diferença com facilidade: 'Parou de fumar' vs 'Parou para fumar'. 'Lembre-se de ligar' vs 'Lembro de ter ligado'.\n\nNo inglês, não há preposição extra; a mágica é feita inteiramente pela forma do verbo seguinte:\n- 'Parou para conversar' → **Stopped to talk**.\n- 'Parou de conversar (ficou em silêncio)' → **Stopped talking**.\n- 'Lembre-se de trancar a porta' → **Remember to lock the door**.\n- 'Lembro de ter trancado' → **I remember locking the door**.\n- 'Tentei abrir a porta emperrada' → **I tried to open the door**.\n- 'Experimente tomar um chá de camomila' → **Try drinking chamomile tea**.",
    "exemplos_prc": [
      {
        "oracao": "On our long drive to Scotland, we stopped to admire the breathtaking scenery.",
        "pergunta": "O que significa 'we stopped to admire'?",
        "resposta": "Significa que eles estacionaram o carro com o objetivo e propósito de contemplar a paisagem.",
        "conclusao": "stopped to admire = paramos para admirar."
      },
      {
        "oracao": "My father smoked for thirty years, but he stopped smoking when my daughter was born.",
        "pergunta": "Por que 'stopped smoking' foi usado e não 'stopped to smoke'?",
        "resposta": "Porque ele abandonou definitivamente o hábito do tabagismo.",
        "conclusao": "stopped smoking = parou de fumar."
      },
      {
        "oracao": "Did you remember to turn off the oven before leaving the kitchen?",
        "pergunta": "Qual é o sentido de 'remember to turn off'?",
        "resposta": "Pergunta se a pessoa se lembrou de cumprir o dever de desligar o fogão.",
        "conclusao": "remember to turn off = lembrar-se de desligar."
      },
      {
        "oracao": "If your throat hurts, try drinking warm herbal tea with honey and lemon.",
        "pergunta": "Por que 'try drinking' usa o gerúndio nesta recomendação médica caseira?",
        "resposta": "Porque é uma sugestão de teste experimental como remédio para avaliar se alivia a dor.",
        "conclusao": "try drinking = experimente beber."
      }
    ],
    "armadilhas": [
      {
        "errado": "I stopped to smoke because it is bad for my health.",
        "certo": "I stopped smoking because it is bad for my health.",
        "motivo": "Abandonar o vício do tabagismo exige o gerúndio: 'stopped smoking'."
      },
      {
        "errado": "Don't forget locking the front door.",
        "certo": "Don't forget to lock the front door.",
        "motivo": "Lembrar de cumprir uma tarefa futura exige o infinitivo com 'to': 'forget to lock'."
      },
      {
        "errado": "I remember to meet the Queen in London when I was ten.",
        "certo": "I remember meeting the Queen in London when I was ten.",
        "motivo": "Recordar uma memória afetiva do passado exige o gerúndio: 'remember meeting'."
      },
      {
        "errado": "We regret informing you that your application was unsuccessful.",
        "certo": "We regret to inform you that your application was unsuccessful.",
        "motivo": "A fórmula padrão formal para comunicar más notícias em cartas e emails é 'regret to inform'."
      }
    ],
    "coda": "Para propósito futuro ou tarefa a cumprir: TO + Verbo. Para hábito abandonado ou memória viva do passado: Verbo com -ING!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Como dizer corretamente que alguém abandonou o vício do cigarro?",
        "opcoes": [
          "He stopped smoking three years ago.",
          "He stopped to smoke three years ago.",
          "He stopped for smoke three years ago.",
          "He stopped of smoking three years ago."
        ],
        "resposta": 0,
        "explicacao": "Cessar e abandonar um hábito de vez exige 'stopped smoking'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o sentido de interrupção com propósito de descanso:\n\n\"We were exhausted after hiking, so we ___ some water and rest.\"",
        "opcoes": ["stopped to drink", "stopped drinking", "stopped drink", "stopping to drink"],
        "resposta": 0,
        "explicacao": "Parar com a finalidade de beber água exige infinitivo de propósito: 'stopped to drink'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a instrução de dever antes de sair de casa:\n\n\"Please remember ___ the windows before you leave!\"",
        "opcoes": ["to close", "closing", "close", "for closing"],
        "resposta": 0,
        "explicacao": "Lembrar de cumprir uma obrigação futura exige 'remember to close'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete para uma memória inesquecível da infância:\n\n\"I will never forget ___ the Eiffel Tower illuminated at night for the first time.\"",
        "opcoes": ["seeing", "to see", "see", "saw"],
        "resposta": 0,
        "explicacao": "Recordar uma experiência mágica do passado com forget exige gerúndio: 'forget seeing'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no teste experimental antes de revelar:\n\n\"If the WiFi is not connecting, try ___ your router.\"\n(Se o Wi-Fi não estiver conectando, experimente reiniciar o seu roteador.)",
        "resposta": "If the WiFi is not connecting, try restarting your router.",
        "revelacao": "If the WiFi is not connecting, try restarting your router.",
        "dica": "Try + gerúndio (experimento)",
        "explicacao": "Testar uma solução experimental usa 'try restarting'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no esforço árduo antes de revelar:\n\n\"The door was completely stuck, but I tried ___ it with a metal crowbar.\"\n(A porta estava completamente emperrada, mas tentei forçá-la com um pé de cabra.)",
        "resposta": "The door was completely stuck, but I tried to force it with a metal crowbar.",
        "revelacao": "The door was completely stuck, but I tried to force it with a metal crowbar.",
        "dica": "Try + infinitivo (esforço físico)",
        "explicacao": "Fazer esforço árduo contra obstáculo usa 'tried to force'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na memória afetiva viva antes de revelar:\n\n\"I distinctly remember ___ my car keys on the hallway table.\"\n(Eu lembro nitidamente de ter colocado minhas chaves do carro na mesa do corredor.)",
        "resposta": "I distinctly remember putting my car keys on the hallway table.",
        "revelacao": "I distinctly remember putting my car keys on the hallway table.",
        "dica": "Remember + gerúndio (lembrança passada)",
        "explicacao": "Memória de ação realizada no passado usa 'remember putting'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no comunicado formal de má notícia antes de revelar:\n\n\"We regret ___ that the flight to Edinburgh has been cancelled.\"\n(Lamentamos informar que o voo para Edimburgo foi cancelado.)",
        "resposta": "We regret to inform that the flight to Edinburgh has been cancelled.",
        "revelacao": "We regret to inform that the flight to Edinburgh has been cancelled.",
        "dica": "Regret to inform (fórmula culta)",
        "explicacao": "Dar má notícia profissional usa 'regret to inform'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma verbal de 'buy' para significar 'parou para comprar café':\n\n\"He was walking downtown and stopped ___ a coffee.\"",
        "resposta": "to buy",
        "explicacao": "Parar com o propósito de comprar usa 'to buy'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma com -ing de 'eat' para significar 'parou de comer fast food':\n\n\"She stopped ___ fast food to improve her health.\"",
        "resposta": "eating",
        "explicacao": "Abandonar o hábito usa 'eating'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma verbal com 'to' de 'lock' para cumprir o dever:\n\n\"Did you remember ___ the front door?\"",
        "resposta": "to lock",
        "explicacao": "Dever a cumprir usa 'to lock'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma de 'visit' com -ing para a memória inesquecível:\n\n\"I will never forget ___ Rome for the first time.\"",
        "resposta": "visiting",
        "explicacao": "Memória inesquecível de evento passado usa 'visiting'."
      }
    ]
  }
};

console.log('Aplicando Onda 5 — Parte 3 (Lições B1.11 a B1.15: Conclusão do Módulo B1)...');

for (const [id, lessonData] of Object.entries(wave5Part3Lessons)) {
  for (const mod of data.moduli) {
    const idx = mod.lezioni.findIndex(l => l.id === id);
    if (idx !== -1) {
      mod.lezioni[idx] = lessonData;
      console.log(`✓ Lição ${id} (${lessonData.titulo}) enriquecida com sucesso!`);
    }
  }
}

fs.writeFileSync(grammarPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Onda 5 — Parte 3 gravada com sucesso em data/grammar.json!');
