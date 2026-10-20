import fs from 'fs';

const grammarPath = 'data/grammar.json';
const data = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));

// Onda 3 — Parte 2: Lições A1.21 a A1.25
const wave3Part2Lessons = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 21: Quantifiers 1: Some vs Any
  // ─────────────────────────────────────────────────────────────
  "a1-lez21": {
    "id": "a1-lez21",
    "num": "Lesson 21",
    "titulo": "Quantifiers 1: Some vs Any",
    "subtitulo": "Afirmativas, Negativas, Dúvidas e Ofertas Polidas",
    "cena": {
      "origem": "dialogo",
      "titulo": "Cooking Dinner Together",
      "texto": "**Liam:** Let's make pasta tonight! Do we have any garlic?\n**Sophie:** Yes, we have some garlic and some fresh tomatoes. But we don't have any olive oil.\n**Liam:** No problem, I can buy some at the grocery store. Would you like some wine while you wait?\n**Sophie:** Oh, yes please! That would be lovely."
    },
    "fio": {
      "abertura": "Quando não precisamos dizer a quantidade exata (se são 2, 5 ou 100 itens), usamos quantificadores indefinidos. Em português dizemos 'um pouco de', 'algum' ou simplesmente omitimos a palavra. No inglês, 'some' e 'any' são os guardiões do ritmo natural da frase.",
      "descoberta": "Reparou no jogo entre Liam e Sophie? Ele perguntou «Do we have any garlic?», ela respondeu «we have some garlic» e depois negou «we don't have any olive oil». Mas no final ele ofereceu vinho dizendo «Would you like some wine?». Por que 'some' em uma pergunta?",
      "fecho": "Agora você domina a regra geral e a famosa exceção de ouro: 'Some' em afirmações e ofertas gentis; 'Any' em perguntas normais e negativas com 'not'."
    },
    "alerta": "O erro mais comum de brasileiros é traduzir 'any' sempre como 'qualquer'. Em perguntas cotidianas, 'Do you have any questions?' significa apenas 'Você tem dúvidas?'. E quando você oferece algo de comer ou beber com carinho, o inglês exige 'some', nunca 'any'.",
    "definicao": {
      "fenomeno": "I have some money · She bought some apples · I don't have any cash · Do you have any pens? · Would you like some coffee?",
      "causa": "Por que usamos 'any' para perguntas comuns, mas mudamos para 'some' ao oferecer um cafezinho?",
      "conceito": "'Some' expressa existência positiva real no mundo ou a expectativa confiante de uma resposta 'Sim' (por isso é usado em ofertas e pedidos educados). 'Any' expressa neutralidade aberta ou inexistência total (em negativas com not ou perguntas onde não se sabe se a coisa existe)."
    },
    "inventario": [
      "O uso padrão de 'some' em sentenças afirmativas (com contáveis no plural e incontáveis)",
      "O uso padrão de 'any' em sentenças negativas com verbo negativo (don't have any, isn't any)",
      "O uso padrão de 'any' em perguntas genuínas de dúvida (Is there any...? / Do you have any...?)",
      "A regra de ouro das ofertas e pedidos: 'Would you like some...?' e 'Can I have some...?' usam SEMPRE some",
      "Compostos derivados que seguem a mesmíssima lógica (someone/anyone, something/anything, somewhere/anywhere)"
    ],
    "tabela_visual": "| Contexto Sintático | Quantificador | Exemplo com Contável Plural | Exemplo com Incontável |\n|---|---|---|---|\n| **Afirmativa (+) Realidade** | **some** | *I have **some** friends in London.* | *There is **some** milk in the fridge.* |\n| **Negativa (-) com Not** | **any** | *I don't have **any** brothers.* | *There isn't **any** sugar left.* |\n| **Pergunta (?) Dúvida Geral** | **any** | *Are there **any** seats available?* | *Do you have **any** information?* |\n| **Oferta / Pedido Polido** | **some** | *Would you like **some** cookies?* | *Can I have **some** water, please?* |",
    "observacao_cards": [
      {
        "ingles": "Some (+)",
        "traducao": "algum, alguns, um pouco de",
        "genero": "Afirmativas e Ofertas",
        "motivo": "Pressupõe existência real: 'We need some chairs' / 'Would you like some tea?'"
      },
      {
        "ingles": "Any (-)",
        "traducao": "nenhum, nenhuma (em negativas)",
        "genero": "Negativas com Not",
        "motivo": "Usa-se após verbo negativo: 'I haven't got any time' (NÃO use no + any)."
      },
      {
        "ingles": "Any (?)",
        "traducao": "algum, alguma (em perguntas)",
        "genero": "Perguntas Abertas",
        "motivo": "Dúvida honesta sobre existência: 'Do you have any brothers?'"
      },
      {
        "ingles": "Would you like some...?",
        "traducao": "Você aceita um pouco de...?",
        "genero": "Oferta Cortês",
        "motivo": "Exceção obrigatória: em hospitalidade e convites usa-se 'some' para encorajar a aceitação."
      }
    ],
    "tecnica": "A Bússola Some vs Any em 3 passos:\n\n**Passo 1** — A oração é uma AFIRMATIVA comum?\n→ Use **some** (*I bought some books / There is some soup*).\n\n**Passo 2** — A oração tem uma NEGAÇÃO explícita (*not, don't, isn't, haven't*)?\n→ Use **any** (*I don't have any money / There aren't any tickets*).\n\n**Passo 3** — É uma PERGUNTA?\n- Se for oferta ou pedido educado de comida/ajuda (*Would you like...? / Can I have...?*) → Use **some** (*Can I have some water?*).\n- Se for apenas checagem neutra de existência (*Do you have...? / Is there...?*) → Use **any** (*Do you have any coins?*).",
    "teoria": "### Tratado Teórico: A Polaridade de Some e Any\n\nEm gramática gerativa e semântica formal, *some* e *any* são conhecidos como itens de polaridade positiva (*Positive Polarity Items - PPI*) e sensíveis a polaridade negativa (*Negative Polarity Items - NPI*).\n\n#### 1. Some (Polaridade Positiva & Asserção)\n- Utilizado quando o falante assume ou sabe que a quantidade existe:\n  - *There are **some** typos in your essay.* (Afirmação empírica).\n- Utilizado em solicitações (*requests*) e convites (*offers*) porque a convenção social espera uma resposta afirmativa:\n  - *Can you lend me **some** money?* (Espera-se que a pessoa empreste).\n  - *Would you like **some** dessert?* (Hospitalidade: oferece-se para que o convidado coma).\n\n#### 2. Any (Polaridade Negativa & Domínio Irrestrito)\n- Em orações negativas, *any* expressa ausência total sem incorrer no erro da dupla negação:\n  - *I don't know **anybody** here.* (Correto: not + any).\n  - ❌ *I don't know nobody.* (Dupla negação incorreta no padrão formal).\n- Em orações condicionais com *if*:\n  - *If you have **any** problems, call me immediately.*\n- Em orações afirmativas com sentido de 'não importa qual / qualquer um':\n  - *You can take **any** bus; they all go to the center.* (Qualquer ônibus serve).\n\n#### 3. Tabela Comparativa de Pronomes Compostos\n| Sentido | Base com SOME | Base com ANY |\n|---|---|---|\n| **Pessoas** | *someone / somebody* (alguém) | *anyone / anybody* (alguém? / ninguém com not) |\n| **Coisas** | *something* (algo, alguma coisa) | *anything* (algo? / nada com not) |\n| **Lugares** | *somewhere* (algum lugar) | *anywhere* (algum lugar? / nenhum lugar com not) |",
    "ponte": "Em português, costumamos omitir esses termos: 'Comprei maçãs', 'Não tenho dinheiro', 'Tem café?'.\n\nNo inglês, a fala soa abrupta e incompleta se você omitir o quantificador:\n- Dizer *'I bought apples'* soa como manchete de jornal. O nativo diz naturalmente: **I bought some apples**.\n- Dizer *'I don't have money'* soa seco. O nativo diz: **I don't have any money**.\n- Oferecer cafezinho: em vez de *Do you want coffee?*, use a fórmula de polidez diplomática: **Would you like some coffee?**.",
    "exemplos_prc": [
      {
        "oracao": "We need to buy some fresh vegetables for the salad.",
        "pergunta": "Por que 'some' foi usado nesta sentença afirmativa?",
        "resposta": "Porque expressa uma necessidade positiva de quantidade indefinida com substantivo plural.",
        "conclusao": "some fresh vegetables = alguns vegetais frescos."
      },
      {
        "oracao": "She didn't make any mistakes during her presentation.",
        "pergunta": "Por que 'any' é obrigatório aqui e não 'some'?",
        "resposta": "Porque a oração possui o auxiliar negativo 'didn't' (not + any = nenhum erro).",
        "conclusao": "didn't make any mistakes = não cometeu nenhum erro."
      },
      {
        "oracao": "Would you like some more orange juice?",
        "pergunta": "Por que esta pergunta usa 'some' em vez de 'any'?",
        "resposta": "Porque é uma oferta hospitaleira de bebida, onde a resposta 'sim' é esperada e encorajada.",
        "conclusao": "Would you like some = Você aceita um pouco de / mais suco?"
      },
      {
        "oracao": "Do you have any experience with web design?",
        "pergunta": "Por que 'any' foi usado nesta pergunta de entrevista?",
        "resposta": "É uma dúvida neutra onde o entrevistador não sabe se a pessoa tem ou não experiência.",
        "conclusao": "any experience = alguma experiência."
      }
    ],
    "armadilhas": [
      {
        "errado": "I don't have some money today.",
        "certo": "I don't have any money today.",
        "motivo": "Com o verbo negativo (don't have), usa-se obrigatoriamente 'any'."
      },
      {
        "errado": "Would you like any coffee?",
        "certo": "Would you like some coffee?",
        "motivo": "Ofertas e convites corteses de comida/bebida exigem sempre 'some'."
      },
      {
        "errado": "Can I have any water, please?",
        "certo": "Can I have some water, please?",
        "motivo": "Pedidos educados de consumo usam 'some' para soar natural e afável."
      },
      {
        "errado": "I have not no money.",
        "certo": "I haven't got any money. (ou: I have no money.)",
        "motivo": "Evite dupla negação: use 'not + any' ou apenas 'no' com verbo afirmativo."
      }
    ],
    "coda": "Afirmativa é SOME; negativa com not e dúvida é ANY; mas para oferecer cafezinho com carinho: use sempre SOME!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a oração afirmativa:\n\n\"There are ___ interesting books on the shelf.\"\n(= Há alguns livros interessantes na estante.)",
        "opcoes": ["some", "any", "no", "a"],
        "resposta": 0,
        "explicacao": "Frases afirmativas com substantivos no plural usam 'some'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a oração negativa:\n\n\"I looked in the fridge, but there isn't ___ milk.\"\n(= Olhei na geladeira, mas não tem leite nenhum.)",
        "opcoes": ["any", "some", "a", "no"],
        "resposta": 0,
        "explicacao": "Com o verbo negativo (isn't), usamos 'any'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a oferta educada:\n\n\"Would you like ___ cookies with your tea?\"\n(= Você aceita uns biscoitos com seu chá?)",
        "opcoes": ["some", "any", "no", "an"],
        "resposta": 0,
        "explicacao": "Ofertas hospitaleiras exigem 'some'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a pergunta neutra:\n\n\"Do you have ___ questions about the contract?\"\n(= Você tem alguma dúvida sobre o contrato?)",
        "opcoes": ["any", "some", "no", "much"],
        "resposta": 0,
        "explicacao": "Perguntas de dúvida geral usam 'any'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no pedido polido antes de revelar:\n\n\"Could you lend me ___ money until tomorrow?\"\n(Você poderia me emprestar um pouco de dinheiro até amanhã?)",
        "resposta": "Could you lend me some money until tomorrow?",
        "revelacao": "Could you lend me some money until tomorrow?",
        "dica": "Pedido educado (request)",
        "explicacao": "Pedidos educados esperam resposta favorável, usando 'some'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na negativa plural antes de revelar:\n\n\"We don't have ___ clean towels in the bathroom.\"\n(Não temos toalhas limpas nenhumas no banheiro.)",
        "resposta": "We don't have any clean towels in the bathroom.",
        "revelacao": "We don't have any clean towels in the bathroom.",
        "dica": "Verbo negativo 'don't have'",
        "explicacao": "Negativas com don't exigem 'any'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no composto afirmativo antes de revelar:\n\n\"There is ___ at the door waiting for you.\"\n(Tem alguém na porta esperando por você.)",
        "resposta": "There is someone at the door waiting for you.",
        "revelacao": "There is someone at the door waiting for you.",
        "dica": "Alguém em frase afirmativa",
        "explicacao": "Para afirmações usamos compostos com some: 'someone' ou 'somebody'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no composto interrogativo antes de revelar:\n\n\"Did ___ call while I was out?\"\n(Alguém ligou enquanto eu estava fora?)",
        "resposta": "Did anyone call while I was out?",
        "revelacao": "Did anyone call while I was out?",
        "dica": "Dúvida em pergunta",
        "explicacao": "Em perguntas abertas de dúvida usamos compostos com any: 'anyone' ou 'anybody'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o quantificador correto para a oferta:\n\n\"Would you like ___ cake?\" (um pedaço de / um pouco de)",
        "resposta": "some",
        "explicacao": "Ofertas gentis usam 'some'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o quantificador para a negativa:\n\n\"They don't have ___ children yet.\" (nenhum)",
        "resposta": "any",
        "explicacao": "Negativas com don't usam 'any'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o quantificador para a afirmativa:\n\n\"I found ___ interesting coins in the old box.\"",
        "resposta": "some",
        "explicacao": "Afirmações usam 'some'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o quantificador para a pergunta de dúvida:\n\n\"Are there ___ vegetarian dishes on the menu?\"",
        "resposta": "any",
        "explicacao": "Perguntas de dúvida sobre existência usam 'any'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 22: Quantifiers 2: Much, Many, A lot of
  // ─────────────────────────────────────────────────────────────
  "a1-lez22": {
    "id": "a1-lez22",
    "num": "Lesson 22",
    "titulo": "Quantifiers 2: Much, Many, A lot of",
    "subtitulo": "Quantidades Grandes em Afirmativas, Negativas e Perguntas",
    "cena": {
      "origem": "dialogo",
      "titulo": "Organizing a Major Tech Conference",
      "texto": "**Director:** How is the event preparation going? Do we have much time left?\n**Coordinator:** We don't have much time, only two days! But we have a lot of volunteers helping us.\n**Director:** That's great! Are there many international speakers registered?\n**Coordinator:** Yes, there are many speakers and a lot of attendees from all over the world."
    },
    "fio": {
      "abertura": "Para falar de 'muito' ou 'muita' em português, apenas variamos a palavra pelo gênero. No inglês, a chave mestre depende de uma pergunta simples: o que você está medindo pode ser contado em unidades ou é uma massa contínua?",
      "descoberta": "Reparou como o coordenador disse «we don't have much time» (tempo é incontável = much), mas disse «many international speakers» (palestrantes são contáveis = many)? E quando quis falar com naturalidade em frases afirmativas, usou o coringa «a lot of volunteers»!",
      "fecho": "Agora você domina a tríade das grandes quantidades: **Much** para massa e tempo; **Many** para pessoas e coisas plurais; e **A lot of** como o grande amigo de todas as afirmativas."
    },
    "alerta": "Nativos raramente dizem 'I have much money' ou 'I have much time' em afirmativas comuns. Soa artificial e quase arcaico! O natural para afirmações é sempre **a lot of** (*I have a lot of time*). Reserve 'much' para perguntas e negativas.",
    "definicao": {
      "fenomeno": "Much traffic · Many cars · A lot of traffic · A lot of cars · Not much water · Not many people",
      "causa": "Por que soa estranho dizer 'I have much friends' ou 'I drank much water'?",
      "conceito": "'Much' é exclusivo de substantivos incontáveis e seu uso natural concentra-se em negativas e perguntas (*I don't have much money*). 'Many' é exclusivo de substantivos contáveis no plural (*many friends*). 'A lot of' (ou 'lots of') é neutro e funciona com perfeição em afirmativas com ambos os tipos de substantivo."
    },
    "inventario": [
      "A regra de ouro de 'much': apenas com incontáveis (tempo, dinheiro, trânsito, paciência), focado em negativas e perguntas",
      "A regra de ouro de 'many': apenas com contáveis no plural (amigos, livros, países, ideias)",
      "A regra do coringa 'a lot of': usado com contáveis e incontáveis, preferido universalmente em afirmativas",
      "O registro formal vs informal: 'lots of' para bate-papo informal descontraído",
      "As expressões de excesso e insuficiência: 'too much' (demais para incontáveis) e 'too many' (demais para contáveis)"
    ],
    "tabela_visual": "| Quantificador | Tipo de Substantivo | Uso Típico | Exemplo Autêntico |\n|---|---|---|---|\n| **Much** | **Incontável** (Água, Tempo, Dinheiro) | Negativas (-) & Perguntas (?) | *We don't have **much** time.* |\n| **Many** | **Contável Plural** (Livros, Cidades, Pessoas) | Negativas (-), Perguntas (?) & Formal (+) | *Are there **many** tourists in town?* |\n| **A lot of** | **Ambos** (Incontável e Contável Plural) | **Afirmativas (+)** em estilo natural | *She has **a lot of** friends and **a lot of** energy.* |\n| **Too much** | Incontável (Excesso prejudicial) | Todos os tipos de frase | *There is **too much** noise in here.* |\n| **Too many** | Contável Plural (Excesso numérico) | Todos os tipos de frase | *There are **too many** cars on the bridge.* |",
    "observacao_cards": [
      {
        "ingles": "Much (Incontáveis)",
        "traducao": "muito / muita",
        "genero": "Massa / Volume",
        "motivo": "Usa-se em negativas e dúvidas: 'I don't drink much coffee' / 'Is there much milk?'"
      },
      {
        "ingles": "Many (Contáveis)",
        "traducao": "muitos / muitas",
        "genero": "Plurais Numéricos",
        "motivo": "Usa-se para contáveis: 'many people', 'many mistakes', 'many opportunities'."
      },
      {
        "ingles": "A lot of (Coringa)",
        "traducao": "muito(a) / muitos(as) / um monte de",
        "genero": "Neutro Universal",
        "motivo": "O preferido em afirmativas: 'I have a lot of work' (incontável) e 'a lot of friends' (contável)."
      },
      {
        "ingles": "Too much vs Too many",
        "traducao": "demais (excesso)",
        "genero": "Intensificador de Excesso",
        "motivo": "Too much salt (sal em excesso) vs Too many people (gente demais)."
      }
    ],
    "tecnica": "Como escolher entre Much, Many e A Lot Of em 3 passos:\n\n**Passo 1** — É uma frase AFIRMATIVA comum?\n→ Diga **a lot of** para não correr o risco de soe pedante ou incorreto (*I have a lot of books / I drank a lot of water*).\n\n**Passo 2** — É uma NEGATIVA ou PERGUNTA sobre coisa que NÃO se conta no plural (dinheiro, tempo, café, sal)?\n→ Use **much** (*I don't have much cash / Is there much traffic?*).\n\n**Passo 3** — É sobre coisas plurais que se contam individualmente (pessoas, carros, dias, perguntas)?\n→ Use **many** (*I don't have many questions / There aren't many cars*).",
    "teoria": "### Tratado Teórico: A Gramática da Quantificação Aprofundada\n\nQuantificadores funcionam como determinantes que especificam o escopo de um sintagma nominal:\n\n#### 1. Por que evitar 'Much' em Afirmativas Simples?\nEm inglês contemporâneo nativo, orações afirmativas do tipo *'I have much work'* soam arcaicas ou formais demais. A língua falada e escrita cotidiana substituiu essa construção por **a lot of**, **lots of** ou **plenty of**:\n- ❌ *He has much knowledge.* (Soa rígido/arcaico).\n- ✅ *He has **a lot of** knowledge.* (Natural e elegante).\n- Exceção: 'Much' é perfeitamente afirmativo quando precedido de **too**, **so**, **as**:\n  - *Thank you **so much**!*\n  - *You eat **too much** sugar.*\n  - *Take **as much** time **as** you need.*\n\n#### 2. Many em Afirmativas Formais\nAo contrário de 'much', 'many' é totalmente natural em afirmativas quando o contexto é formal, acadêmico ou jornalístico:\n- *Many scientists agree on this conclusion.*\n- *Many people believe that education is the key.*\nPorém, em bate-papo informal cotidiano, 'a lot of' ainda reina soberano: *I took a lot of photos yesterday.*\n\n#### 3. Concordância do Verbo com 'A lot of'\nO verbo concorda com o substantivo que vem DEPOIS do 'of':\n- *A lot of **money was** spent.* ('money' é incontável → verbo singular *was*).\n- *A lot of **people were** present.* ('people' é plural contável → verbo plural *were*).",
    "ponte": "No Brasil usamos 'muito' para tudo: 'muito café' e 'muitos amigos'.\n\nEm inglês precisamos separar:\n- 'Não tenho muito dinheiro' → **I don't have much money** (incontável).\n- 'Não tenho muitos amigos aqui' → **I don't have many friends here** (contável plural).\n- 'Tenho muito dinheiro e muitos amigos' → **I have a lot of money and a lot of friends** (ambos afirmativos com a lot of!).",
    "exemplos_prc": [
      {
        "oracao": "There isn't much petrol in the tank, we need to stop soon.",
        "pergunta": "Por que usamos 'much' e não 'many'?",
        "resposta": "Porque gasolina (petrol) é um líquido incontável em uma oração negativa.",
        "conclusao": "isn't much petrol = não há muita gasolina."
      },
      {
        "oracao": "She speaks many different foreign languages fluently.",
        "pergunta": "Por que 'many' foi selecionado aqui?",
        "resposta": "Porque idiomas (languages) é um substantivo contável no plural.",
        "conclusao": "many languages = muitos idiomas."
      },
      {
        "oracao": "They received a lot of useful feedback from their customers.",
        "pergunta": "Por que 'a lot of' é a melhor escolha nesta oração afirmativa?",
        "resposta": "Porque em afirmativas 'a lot of' soa natural e combina perfeitamente com feedback (incontável).",
        "conclusao": "a lot of useful feedback = muitos feedbacks úteis."
      },
      {
        "oracao": "Don't eat too many candies before dinner!",
        "pergunta": "Por que usamos 'too many' e não 'too much'?",
        "resposta": "Doces (candies) é contável no plural: o excesso exige 'too many'.",
        "conclusao": "too many candies = doces demais."
      }
    ],
    "armadilhas": [
      {
        "errado": "I have much work to do today.",
        "certo": "I have a lot of work to do today.",
        "motivo": "Em frases afirmativas comuns, 'a lot of' é a opção nativa natural; 'much' soa artificial."
      },
      {
        "errado": "There aren't much people here.",
        "certo": "There aren't many people here.",
        "motivo": "'People' é o plural de person (contável), logo exige 'many', nunca 'much'."
      },
      {
        "errado": "There are too much cars on the avenue.",
        "certo": "There are too many cars on the avenue.",
        "motivo": "Carros são contáveis: excesso exige 'too many'."
      },
      {
        "errado": "A lot of students is waiting outside.",
        "certo": "A lot of students are waiting outside.",
        "motivo": "O verbo concorda com o substantivo após of: students é plural, logo exige 'are'."
      }
    ],
    "coda": "Incontável em negativa/dúvida é MUCH; contável no plural é MANY; para afirmações naturais use sempre A LOT OF!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete para substantivo incontável em negativa:\n\n\"Hurry up! We don't have ___ time before the gate closes.\"\n(= Depressa! Não temos muito tempo antes do portão fechar.)",
        "opcoes": ["much", "many", "a lot", "few"],
        "resposta": 0,
        "explicacao": "Tempo (time) é incontável: em negativa usamos 'much'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete para substantivo contável no plural:\n\n\"Are there ___ vegetarian restaurants in this neighborhood?\"\n(= Há muitos restaurantes vegetarianos neste bairro?)",
        "opcoes": ["many", "much", "a lot", "any of"],
        "resposta": 0,
        "explicacao": "Restaurantes (restaurants) é contável no plural, logo exige 'many'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual é a opção mais natural para esta frase afirmativa?\n\n\"David has ___ experience in international finance.\"",
        "opcoes": ["a lot of", "much", "many", "too many"],
        "resposta": 0,
        "explicacao": "Em frases afirmativas comuns, 'a lot of' é a escolha padrão de nativos."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete para excesso com coisa incontável (açúcar):\n\n\"This dessert is too sweet, it has ___ sugar in it.\"",
        "opcoes": ["too much", "too many", "a lot", "many"],
        "resposta": 0,
        "explicacao": "Açúcar é incontável: excesso prejudicial exige 'too much'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no quantificador para contável plural antes de revelar:\n\n\"I didn't take ___ photos during the trip because of the rain.\"\n(Não tirei muitas fotos durante a viagem por causa da chuva.)",
        "resposta": "I didn't take many photos during the trip because of the rain.",
        "revelacao": "I didn't take many photos during the trip because of the rain.",
        "dica": "Photos é contável no plural em negativa",
        "explicacao": "Contáveis no plural em negativas usam 'many'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no excesso de contáveis antes de revelar:\n\n\"There are ___ tourists in Venice during the summer.\"\n(Há turistas demais em Veneza durante o verão.)",
        "resposta": "There are too many tourists in Venice during the summer.",
        "revelacao": "There are too many tourists in Venice during the summer.",
        "dica": "Excesso com pessoas/turistas (contável)",
        "explicacao": "Excesso com contáveis plurais usa 'too many'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no coringa afirmativo antes de revelar:\n\n\"We bought ___ fresh fruits at the weekend market.\"\n(Compramos muitas frutas frescas na feira do fim de semana.)",
        "resposta": "We bought a lot of fresh fruits at the weekend market.",
        "revelacao": "We bought a lot of fresh fruits at the weekend market.",
        "dica": "Expressão natural afirmativa",
        "explicacao": "Para afirmações naturais e fluídas usa-se 'a lot of'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no quantificador incontável antes de revelar:\n\n\"Does he drink ___ coffee every day?\"\n(Ele bebe muito café todo dia?)",
        "resposta": "Does he drink much coffee every day?",
        "revelacao": "Does he drink much coffee every day?",
        "dica": "Café é incontável em pergunta",
        "explicacao": "Incontáveis em perguntas usam 'much'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o quantificador correto para 'dinheiro' em frase negativa:\n\n\"I don't earn ___ money in my current job.\"",
        "resposta": "much",
        "explicacao": "Money é incontável: a negativa exige 'much'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o quantificador correto para 'livros' em pergunta:\n\n\"Do you read ___ books per year?\"",
        "resposta": "many",
        "explicacao": "Books é contável no plural, exigindo 'many'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a expressão coringa completa (3 palavras) para afirmações:\n\n\"She has ___ patience with small children.\"",
        "resposta": "a lot of",
        "explicacao": "A expressão coringa é 'a lot of'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que falta para indicar excesso em incontáveis:\n\n\"There is too ___ noise in this café.\"",
        "resposta": "much",
        "explicacao": "Noise é incontável: 'too much noise'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 23: How much vs How many
  // ─────────────────────────────────────────────────────────────
  "a1-lez23": {
    "id": "a1-lez23",
    "num": "Lesson 23",
    "titulo": "How Much vs How Many",
    "subtitulo": "Perguntando Preços, Quantidades e Volumes com Precisão",
    "cena": {
      "origem": "dialogo",
      "titulo": "Shopping at the Vintage Market",
      "texto": "**Buyer:** Good afternoon! How much is this leather jacket, please?\n**Seller:** That jacket is eighty dollars. It is genuine Italian leather.\n**Buyer:** It looks great! And how many pockets does it have?\n**Seller:** It has four outside pockets and two inside pockets. How much time do you have to decide?"
    },
    "fio": {
      "abertura": "Fazer perguntas sobre preços e quantidades é a ferramenta mais prática da vida diária no exterior: comprar comida, abastecer o carro, reservar hotéis ou negociar prazos.",
      "descoberta": "Reparou como o comprador perguntou «How much is this jacket?» para o preço, mas quando quis saber o número de bolsos perguntou «How many pockets does it have?»? Preço e volume de massa usam How much; itens contáveis usam How many!",
      "fecho": "Agora você domina as duas grandes chaves de interrogação de quantidade: 'How much' para preços e massa, e 'How many' para contagem de unidades plurais."
    },
    "alerta": "Brasileiros frequentemente perguntam 'How many is it?' ao querer saber o preço de uma mercadoria. Isso é um erro imediato! Para perguntar preço, o inglês usa sempre e exclusivamente **How much is it?**.",
    "definicao": {
      "fenomeno": "How much does it cost? · How much water? · How many brothers? · How many days?",
      "causa": "Por que usamos 'How much' para preço se moedas e cédulas podem ser contadas?",
      "conceito": "'Money' (dinheiro) e 'cost' (custo) são categorias incontáveis de valor contínuo no inglês, por isso preços sempre exigem **How much**. Para saber o número exato de unidades individuais plurais, a pergunta exige **How many**."
    },
    "inventario": [
      "A pergunta universal de preço: 'How much is it?' / 'How much are they?'",
      "How much com substantivos incontáveis: How much time / water / luggage / sugar?",
      "How many com substantivos contáveis no plural: How many people / rooms / tickets / hours?",
      "A estrutura da pergunta: How much/many + substantivo + auxiliar + sujeito + verbo principal",
      "A distinção prática temporal: 'How much time' (quanto tempo) vs 'How many hours / days' (quantas horas / dias)"
    ],
    "tabela_visual": "| Pergunta | Aplicação Principal | O que vem a seguir | Exemplos de Uso Real |\n|---|---|---|---|\n| **How much** | **Preço / Valor monetário** | Verbo to be ou cost | *How much is this watch?* / *How much does it cost?* |\n| **How much** | **Volume / Incontáveis** | Substantivo incontável | *How much time do we have?* / *How much water do you drink?* |\n| **How many** | **Número de itens contáveis** | Substantivo contável no plural | *How many languages do you speak?* / *How many people live here?* |",
    "observacao_cards": [
      {
        "ingles": "How much is it?",
        "traducao": "Quanto custa? / Quanto é?",
        "genero": "Pergunta de Preço",
        "motivo": "A pergunta mais importante em viagens e compras internacionais: 'How much is this, please?'"
      },
      {
        "ingles": "How much (Incontáveis)",
        "traducao": "quanto / quanta",
        "genero": "Massa e Abstração",
        "motivo": "Usa-se para líquidos, tempo, açúcar: 'How much luggage do you have?'"
      },
      {
        "ingles": "How many (Contáveis)",
        "traducao": "quantos / quantas",
        "genero": "Unidades Plurais",
        "motivo": "Exige sempre substantivo no plural: 'How many days are you staying?'"
      },
      {
        "ingles": "How much time vs How many hours",
        "traducao": "quanto tempo vs quantas horas",
        "genero": "Distinção Temporal",
        "motivo": "'Time' é incontável (How much time), mas 'hours/minutes' são contáveis plurais (How many hours)."
      }
    ],
    "tecnica": "O Seletor de Perguntas em 3 passos:\n\n**Passo 1** — Você quer saber o PREÇO de alguma coisa?\n→ Pergunte imediatamente: **How much is...?** ou **How much are...?** (nunca how many!).\n\n**Passo 2** — O substantivo após a pergunta está no PLURAL (tem 's' ou é plural irregular como *people/children*)?\n→ Use **How many** (*How many apples? / How many people?*).\n\n**Passo 3** — O substantivo é INCONTÁVEL (água, tempo, trânsito, bagagem)?\n→ Use **How much** (*How much water? / How much time?*).",
    "teoria": "### Tratado Teórico: A Sintaxe Interrogativa de Mensuração\n\nAs locuções interrogativas *How much* e *How many* funcionam como sintagmas determinantes interrogativos (*Wh-determiner phrases*):\n\n#### 1. Estrutura Gramatical Completa da Sentença\nA ordem dos elementos na oração interrogativa segue o padrão rigoroso de inversão com auxiliar:\n$$\\text{How much / How many} + \\text{[Substantivo]} + \\text{[Auxiliar]} + \\text{[Sujeito]} + \\text{[Verbo Principal]} + ?$$\n- *How many **books** (substantivo) **did** (auxiliar) **you** (sujeito) **read** (verbo)?*\n- *How much **coffee** **do** **they** **drink**?*\n\n#### 2. Quando o Substantivo é Omitido (Elipse)\nQuando o objeto de referência já foi mencionado na conversa anterior, o substantivo pode ser omitido:\n- *The apples look delicious. **How many** would you like?* (Entende-se: *how many apples*).\n- *There is plenty of juice. **How much** do you want?* (Entende-se: *how much juice*).\n\n#### 3. Concordância no Preço: Singular vs Plural\n- Para um único item: *How much **is** this shirt?* → *It is \\$25.*\n- Para itens compostos ou plurais: *How much **are** these shoes?* → *They are \\$60.*",
    "ponte": "Em português usamos:\n- 'Quanto custa?' / 'Quanto é?' → **How much is it?**\n- 'Quantos anos você tem?' → Cuidado! Em inglês não se usa 'how many years', pergunta-se o quão velho você é: **How old are you?**\n- 'Quanto tempo dura?' → **How long does it last?** ou **How much time does it take?**\n- 'Quantas pessoas vieram?' → **How many people came?** (lembre-se que *people* é plural!).",
    "exemplos_prc": [
      {
        "oracao": "How much does a return ticket to Oxford cost?",
        "pergunta": "Por que foi usado 'How much' nesta pergunta de bilhete?",
        "resposta": "Porque estamos indagando o preço e custo financeiro da passagem.",
        "conclusao": "How much does it cost = Quanto custa (a passagem de ida e volta)?"
      },
      {
        "oracao": "How many cups of coffee do you drink every morning?",
        "pergunta": "Por que usamos 'How many' se o café é líquido?",
        "resposta": "Porque a pergunta é sobre as xícaras ('cups', contável plural), e não sobre o líquido em massa.",
        "conclusao": "How many cups = Quantas xícaras de café?"
      },
      {
        "oracao": "How much luggage can we take on this flight?",
        "pergunta": "Por que 'How much' para bagagem?",
        "resposta": "Porque a palavra 'luggage' é um substantivo incontável em inglês.",
        "conclusao": "How much luggage = Quanta bagagem?"
      },
      {
        "oracao": "How many siblings do you have in your family?",
        "pergunta": "Por que 'How many' para irmãos?",
        "resposta": "Porque 'siblings' (irmãos e irmãs) é um substantivo contável no plural.",
        "conclusao": "How many siblings = Quantos irmãos?"
      }
    ],
    "armadilhas": [
      {
        "errado": "How many is this jacket?",
        "certo": "How much is this jacket?",
        "motivo": "Para saber o preço de uma mercadoria, usa-se sempre 'How much'."
      },
      {
        "errado": "How much people live in this city?",
        "certo": "How many people live in this city?",
        "motivo": "'People' é contável no plural (pessoas), exigindo 'How many'."
      },
      {
        "errado": "How many time do we have?",
        "certo": "How much time do we have?",
        "motivo": "'Time' (tempo) é incontável: pergunta-se 'How much time'."
      },
      {
        "errado": "How much are these shoe?",
        "certo": "How much are these shoes?",
        "motivo": "Calçados (shoes) estão no plural e exigem concordância correta com 'these shoes'."
      }
    ],
    "coda": "Para saber o preço ou medir massa: How much! Para contar coisas plurais que terminam com 'S' ou pessoas: How many!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Qual é a pergunta correta para saber o preço de um item?\n\n\"Excuse me, ___ is this digital camera?\"",
        "opcoes": ["How much", "How many", "How price", "How cost"],
        "resposta": 0,
        "explicacao": "Para perguntar preço usamos 'How much'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a opção correta para contáveis plurais:\n\n\"___ days are you planning to stay in New York?\"",
        "opcoes": ["How many", "How much", "How long", "How often"],
        "resposta": 0,
        "explicacao": "Dias (days) é substantivo contável no plural, exigindo 'How many'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a opção para 'água':\n\n\"___ water should a healthy person drink each day?\"",
        "opcoes": ["How much", "How many", "How more", "How lots"],
        "resposta": 0,
        "explicacao": "Água (water) é substância líquida incontável, exigindo 'How much'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a pergunta sobre pessoas:\n\n\"___ employees work at your company?\"",
        "opcoes": ["How many", "How much", "How any", "How lots"],
        "resposta": 0,
        "explicacao": "Funcionários (employees) é contável no plural: 'How many'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na pergunta de preço para itens plurais antes de revelar:\n\n\"___ are those leather boots in the window?\"\n(Quanto custam aquelas botas de couro na vitrine?)",
        "resposta": "How much are those leather boots in the window?",
        "revelacao": "How much are those leather boots in the window?",
        "dica": "Preço de item plural (boots)",
        "explicacao": "Preço de plural usa 'How much are...'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na pergunta de tempo antes de revelar:\n\n\"___ time do you spend studying English every week?\"\n(Quanto tempo você gasta estudando inglês toda semana?)",
        "resposta": "How much time do you spend studying English every week?",
        "revelacao": "How much time do you spend studying English every week?",
        "dica": "Tempo é incontável",
        "explicacao": "Tempo é incontável: 'How much time'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na pergunta de unidades contáveis antes de revelar:\n\n\"___ emails do you receive per day?\"\n(Quantos e-mails você recebe por dia?)",
        "resposta": "How many emails do you receive per day?",
        "revelacao": "How many emails do you receive per day?",
        "dica": "Emails é contável plural",
        "explicacao": "Substantivo contável no plural exige 'How many'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no substantivo incontável de açúcar antes de revelar:\n\n\"___ sugar do you take in your coffee?\"\n(Quanto açúcar você coloca no seu café?)",
        "resposta": "How much sugar do you take in your coffee?",
        "revelacao": "How much sugar do you take in your coffee?",
        "dica": "Açúcar é incontável",
        "explicacao": "Açúcar é substância de massa, exigindo 'How much'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que falta para perguntar preço:\n\n\"How ___ is a cup of cappuccino here?\"",
        "resposta": "much",
        "explicacao": "Preço exige 'How much'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que falta para perguntar o número de línguas:\n\n\"How ___ foreign languages can you speak?\"",
        "resposta": "many",
        "explicacao": "Languages é contável no plural, exigindo 'How many'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que falta para perguntar sobre dinheiro:\n\n\"How ___ money do we need for the trip?\"",
        "resposta": "much",
        "explicacao": "Money é incontável: 'How much money'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra que falta para perguntar sobre passageiros:\n\n\"How ___ passengers were on the flight?\"",
        "resposta": "many",
        "explicacao": "Passengers é contável no plural, exigindo 'How many'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 24: Present Continuous (Affirmative)
  // ─────────────────────────────────────────────────────────────
  "a1-lez24": {
    "id": "a1-lez24",
    "num": "Lesson 24",
    "titulo": "Present Continuous (Affirmative)",
    "subtitulo": "Ações Acontecendo Agora — To Be + Verbo com -ing",
    "cena": {
      "origem": "dialogo",
      "titulo": "A Busy Afternoon at the Design Agency",
      "texto": "**Alex:** Hi Jessica! What is happening right now? The office is full of energy.\n**Jessica:** Lucas is designing the new mobile app interface, and Maya is preparing the slides for the client.\n**Alex:** And where is the director?\n**Jessica:** He is talking on the phone with the investors in New York. We are working very hard today!"
    },
    "fio": {
      "abertura": "Quando queremos narrar o filme da nossa vida acontecendo exatamente neste segundo — o que seus olhos estão vendo, o que suas mãos estão fazendo agora —, usamos o Present Continuous.",
      "descoberta": "Repare na fala de Jessica: «Lucas is designing», «Maya is preparing», «He is talking», «We are working». Toda ação tem duas metades inseparáveis: o verbo To Be no presente + o verbo principal com a terminação '-ing'.",
      "fecho": "Agora você domina o tempo verbal do movimento ao vivo. Lembre-se: nunca deixe o verbo sem o To Be e nunca esqueça o '-ing'."
    },
    "alerta": "O erro mais frequente de brasileiros é omitir o verbo 'To Be' por pressa: dizer 'I working' em vez de 'I am working'. Em inglês, o gerúndio sozinho não forma tempo verbal. O To Be é o motor que empurra o '-ing'!",
    "definicao": {
      "fenomeno": "I am writing an email · You are learning English · She is cooking dinner · They are playing soccer",
      "causa": "Por que precisamos de duas palavras ('is' + 'cooking') para dizer uma ação?",
      "conceito": "O Present Continuous é uma estrutura composta: o verbo 'to be' atua como verbo auxiliar indicando o tempo presente e a pessoa gramatical (*am/is/are*), enquanto a forma em '-ing' do verbo principal carrega o sentido da ação contínua em andamento."
    },
    "inventario": [
      "A fórmula matemática de duas engrenagens: Sujeito + AM/IS/ARE + Verbo-ING",
      "As contrações orais essenciais: I'm working, He's cooking, We're studying",
      "Regras ortográficas de acréscimo de -ing: verbos terminados em -e mudo (write → writing)",
      "A regra CVC (Consoante-Vogal-Consoante): duplicação da última consoante (run → running, sit → sitting)",
      "Marcadores temporais típicos de ação imediata: now, right now, at the moment, currently"
    ],
    "tabela_visual": "| Sujeito | Verbo To Be (Auxiliar) | Verbo Principal + ING | Exemplo Completo |\n|---|---|---|---|\n| **I** | **am** (*I'm*) | **working** | *I'm working on the budget.* |\n| **He / She / It** | **is** (*He's / She's / It's*) | **studying** | *She's studying for her exam.* |\n| **You / We / They** | **are** (*You're / We're / They're*) | **traveling** | *They're traveling to Chicago.* |\n| **Regra Especial -E** | drop the 'e' | make → **making** | *He is making coffee.* |\n| **Regra Especial CVC** | dobra consoante | run → **running** | *The dog is running in the park.* |",
    "observacao_cards": [
      {
        "ingles": "I am working / I'm working",
        "traducao": "Eu estou trabalhando",
        "genero": "1ª Pessoa Singular",
        "motivo": "Duas engrenagens: 'am' indica o tempo e quem faz; 'working' é a ação em curso."
      },
      {
        "ingles": "She is reading / She's reading",
        "traducao": "Ela está lendo",
        "genero": "3ª Pessoa Singular",
        "motivo": "Usa 'is' + verbo-ing: 'She's reading a fascinating novel right now'."
      },
      {
        "ingles": "Writing / Making (Drop -E)",
        "traducao": "escrevendo / fazendo",
        "genero": "Ortografia do -E Mudo",
        "motivo": "Verbos terminados em consoante + 'e' perdem o 'e' antes de receber -ing: write → writing, make → making."
      },
      {
        "ingles": "Running / Swimming (CVC)",
        "traducao": "correndo / nadando",
        "genero": "Duplicação de Consoante",
        "motivo": "Verbos monossílabos com Consoante-Vogal-Consoante dobram a última letra: run → running, swim → swimming."
      }
    ],
    "tecnica": "A Fórmula 1-2-3 do Present Continuous em 3 passos:\n\n**Passo 1** — Escolha o Sujeito e seu verbo auxiliar TO BE correto:\n→ *I am / You are / He is / She is / It is / We are / They are*.\n\n**Passo 2** — Pegue o Verbo da Ação e verifique o final:\n- Termina em -E mudo? Corte o 'e' (*dance → dancing*).\n- É monossílabo com Consoante + Vogal + Consoante? Dobre a letra final (*get → getting, stop → stopping*).\n- Caso normal? Apenas adicione **-ing** (*play → playing, read → reading*).\n\n**Passo 3** — Conecte as duas engrenagens sem nunca esquecer o To Be:\n→ *She + is + playing tennis now.*",
    "teoria": "### Tratado Teórico: O Aspecto Progressivo no Presente\n\nEm linguística inglesa, o Present Continuous denota o **aspecto progressivo** (*progressive aspect*), enfatizando a duração, o processo e a incompletude de um evento que se desenrola no momento do discurso:\n\n#### 1. Usos Primários\n- **Ação em andamento exato agora:** *Look! It is raining outside.*\n- **Situação temporária no período atual:** *I am living with my parents until I find an apartment.* (Não é definitivo, é temporário).\n- **Tendências e mudanças contemporâneas:** *The climate is changing rapidly.* / *Prices are going up.*\n\n#### 2. Regras Ortográficas Rigorosas para Adição de -ING\n1. **Regra Geral:** Adiciona-se simplesmente `-ing` à forma base:\n   - *work → working, eat → eating, listen → listening, sleep → sleeping*.\n2. **Verbos terminados em -e mudo:** Elimina-se o `-e` antes de adicionar `-ing`:\n   - *write → writing, drive → driving, smile → smiling, take → taking*.\n   - *Exceção:* Verbos com `-ee` mantêm as letras: *see → seeing, agree → agreeing*.\n3. **Regra Consoante + Vogal + Consoante (CVC):** Em verbos de 1 sílaba terminados em CVC, dobra-se a consoante final:\n   - *run → running, sit → sitting, swim → swimming, plan → planning, stop → stopping*.\n   - *Atenção:* Não se dobram consoantes como `w, x, y`: *snow → snowing, fix → fixing, play → playing*.\n4. **Verbos terminados em -ie:** O `-ie` transforma-se em `-y` antes do `-ing`:\n   - *die → dying, lie → lying, tie → tying*.",
    "ponte": "Em português usamos o gerúndio (-ando, -endo, -indo) com o verbo estar: 'Estou estudando', 'Ela está comendo'.\n\nNo inglês, a correspondência é perfeita:\n- 'Estou estudando' → **I am studying**.\n- 'Ela está comendo' → **She is eating**.\n- 'Eles estão dormindo' → **They are sleeping**.\n\n⚠️ O grande perigo para brasileiros: na pressa, comer o verbo auxiliar e dizer *'I studying'* ou *'He working'*. Lembre-se: em inglês, dizer *I working* soa como linguagem truncada de homem das cavernas!",
    "exemplos_prc": [
      {
        "oracao": "Listen to the birds! They are singing in the garden.",
        "pergunta": "Por que o Present Continuous foi usado aqui?",
        "resposta": "Porque a palavra 'Listen!' alerta para um evento sonoro acontecendo ao vivo agora.",
        "conclusao": "They are singing = Eles estão cantando."
      },
      {
        "oracao": "My father is cooking an authentic Italian pasta for us.",
        "pergunta": "Como foi construída a forma verbal nesta frase?",
        "resposta": "Sujeito de 3ª pessoa 'father' usa o auxiliar 'is' + verbo cook com terminação '-ing'.",
        "conclusao": "is cooking = está cozinhando."
      },
      {
        "oracao": "We are planning our summer vacation to Greece.",
        "pergunta": "Por que a letra 'n' foi dobrada em 'planning'?",
        "resposta": "O verbo plan é monossílabo terminado em Consoante-Vogal-Consoante (P-L-A-N), logo dobra o n.",
        "conclusao": "are planning = estamos planejando."
      },
      {
        "oracao": "She is writing a detailed report for the marketing director.",
        "pergunta": "O que aconteceu com a letra 'e' do verbo write?",
        "resposta": "Verbos terminados em 'e' mudo perdem a letra antes de receber o sufixo '-ing'.",
        "conclusao": "is writing = está escrevendo."
      }
    ],
    "armadilhas": [
      {
        "errado": "I working at the office right now.",
        "certo": "I am working at the office right now.",
        "motivo": "Nunca omita o verbo auxiliar To Be (am/is/are) no Present Continuous."
      },
      {
        "errado": "She is writeing an email.",
        "certo": "She is writing an email.",
        "motivo": "Verbos terminados em -e mudo perdem o 'e' antes do -ing: write → writing."
      },
      {
        "errado": "The boy is runing fast.",
        "certo": "The boy is running fast.",
        "motivo": "O verbo 'run' é CVC monossílabo e deve dobrar a consoante final: running."
      },
      {
        "errado": "They are makeing a lot of noise.",
        "certo": "They are making a lot of noise.",
        "motivo": "O verbo 'make' perde a letra 'e': making."
      }
    ],
    "coda": "Ação acontecendo agora exige duas peças: o verbo To Be no presente + o verbo principal com -ING!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o Present Continuous correto:\n\n\"Quiet, please! The baby ___ in the next room.\"\n(= Silêncio, por favor! O bebê está dormindo no quarto ao lado.)",
        "opcoes": ["is sleeping", "sleeping", "are sleeping", "sleeps"],
        "resposta": 0,
        "explicacao": "Para o bebê (singular), usamos 'is sleeping'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual é a grafia correta do verbo 'write' no Present Continuous?",
        "opcoes": ["writing", "writeing", "writting", "writng"],
        "resposta": 0,
        "explicacao": "O 'e' mudo é eliminado: writing."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual é a grafia correta do verbo 'swim' no Present Continuous?",
        "opcoes": ["swimming", "swiming", "swimeing", "swimmng"],
        "resposta": 0,
        "explicacao": "Monossílabo CVC dobra a consoante final: swimming."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a forma para 'They':\n\n\"Look at them! They ___ soccer in the rain.\"",
        "opcoes": ["are playing", "is playing", "playing", "am playing"],
        "resposta": 0,
        "explicacao": "Para 'They', o auxiliar é 'are': are playing."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na frase completa antes de revelar:\n\n\"I ___ an interesting article about artificial intelligence.\"\n(Eu estou lendo um artigo interessante sobre inteligência artificial.)",
        "resposta": "I am reading an interesting article about artificial intelligence.",
        "revelacao": "I am reading an interesting article about artificial intelligence.",
        "dica": "I + am + reading",
        "explicacao": "1ª pessoa exige 'am reading'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense no verbo com CVC dobrado antes de revelar:\n\n\"The train is ___ at the central station now.\"\n(O trem está parando na estação central agora.)",
        "resposta": "The train is stopping at the central station now.",
        "revelacao": "The train is stopping at the central station now.",
        "dica": "Stop termina em CVC (dobra o p)",
        "explicacao": "Stop vira stopping."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na oração contínua antes de revelar:\n\n\"We ___ dinner at a charming French bistro.\"\n(Nós estamos jantando em um bistrô francês charmoso.)",
        "resposta": "We are having dinner at a charming French bistro.",
        "revelacao": "We are having dinner at a charming French bistro.",
        "dica": "We + are + having",
        "explicacao": "We exige 'are having' (have perde o e)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na ação temporária antes de revelar:\n\n\"Sarah is ___ for her final university exams this week.\"\n(Sarah está estudando para seus exames finais da universidade esta semana.)",
        "resposta": "Sarah is studying for her final university exams this week.",
        "revelacao": "Sarah is studying for her final university exams this week.",
        "dica": "Study + ing (mantém o y)",
        "explicacao": "Verbos em -y simplesmente recebem -ing: studying."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma com -ing do verbo 'drive':\n\n\"He is ___ to work right now.\"",
        "resposta": "driving",
        "explicacao": "Corta o 'e': driving."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma com -ing do verbo 'run':\n\n\"They are ___ a marathon in Chicago.\"",
        "resposta": "running",
        "explicacao": "Dobra o 'n': running."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma com -ing do verbo 'make':\n\n\"She is ___ a fresh pot of coffee.\"",
        "resposta": "making",
        "explicacao": "Corta o 'e': making."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o verbo auxiliar que falta para 'We':\n\n\"We ___ watching a great documentary on TV.\"",
        "resposta": "are",
        "explicacao": "O auxiliar para We é 'are'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 25: Present Continuous (Negative & Questions)
  // ─────────────────────────────────────────────────────────────
  "a1-lez25": {
    "id": "a1-lez25",
    "num": "Lesson 25",
    "titulo": "Present Continuous (Negative & Questions)",
    "subtitulo": "Negações, Inversão Interrogativa e Respostas Curtas",
    "cena": {
      "origem": "dialogo",
      "titulo": "Checking on the Remote Team",
      "texto": "**Manager:** Hello Daniel! Are you working on the financial report right now?\n**Daniel:** No, I am not working on the report at the moment. I am waiting for the updated data from the auditor.\n**Manager:** Is Sarah assisting you with the numbers?\n**Daniel:** No, she isn't. She is attending a webinar. What are the marketing specialists doing?"
    },
    "fio": {
      "abertura": "Falar de ações em andamento exige saber checar o que os outros estão fazendo e negar o que não está acontecendo. Como o verbo auxiliar já é o próprio To Be, negar e perguntar é extremamente simples e intuitivo.",
      "descoberta": "Repare na facilidade da mecânica: para perguntar, o gerente inverteu «Are you working...?» e «Is Sarah assisting...?». E para negar, Daniel apenas adicionou o 'not': «I am not working», «she isn't». Não precisamos do verbo 'do' para nada aqui!",
      "fecho": "Agora você domina o ciclo completo do Present Continuous. O To Be cuida das negativas e das perguntas, enquanto o '-ing' segue firme no verbo principal."
    },
    "alerta": "Muitos estudantes se confundem e tentam usar 'do' ou 'does' em perguntas do Present Continuous (*Do you working?* - ERRADO!). Como o verbo To Be já está presente na frase como auxiliar, é ele quem faz a inversão e recebe o 'not'. Nunca chame o 'do'!",
    "definicao": {
      "fenomeno": "I am not sleeping · He isn't working · Are you listening? · What are you doing? · Yes, I am · No, he isn't",
      "causa": "Por que não podemos perguntar 'Do you sleeping?' se é uma pergunta no presente?",
      "conceito": "O Present Continuous já possui seu próprio verbo auxiliar nativo: o verbo 'to be'. Por definição sintática, quando uma sentença já conta com 'be' como auxiliar, é estritamente proibido inserir 'do' ou 'does'. O próprio 'be' vai para a frente do sujeito na pergunta e recebe o 'not' na negação."
    },
    "inventario": [
      "A estrutura negativa: Sujeito + AM NOT / ISN'T / AREN'T + Verbo-ING",
      "A contração negativa padrão: I'm not, he isn't, she isn't, we aren't, they aren't",
      "A inversão interrogativa direta: Am I...? / Is he...? / Are you...? + Verbo-ING",
      "Perguntas com Wh- Words: What are you doing? / Where is she going? / Why are they laughing?",
      "Respostas curtas elegantes: Yes, I am / No, I'm not / Yes, she is / No, she isn't"
    ],
    "tabela_visual": "| Tipo de Frase | Estrutura Sintática | Exemplo Completo | Resposta Curta |\n|---|---|---|---|\n| **Afirmativa (+)** | Sujeito + be + V-ing | *They are studying now.* | — |\n| **Negativa (-)** | Sujeito + be + not + V-ing | *They **aren't** studying now.* | — |\n| **Pergunta Sim/Não** | Be + Sujeito + V-ing? | ***Are** they studying now?* | *Yes, they are. / No, they aren't.* |\n| **Pergunta com Wh-** | Wh- + be + Sujeito + V-ing? | ***What are** they studying?* | *They are studying physics.* |\n| **Atenção: 1ª Pessoa** | I am not (*I'm not*) | *I'm not working today.* | *No, I'm not.* |",
    "observacao_cards": [
      {
        "ingles": "I am not / I'm not",
        "traducao": "Eu não estou",
        "genero": "1ª Pessoa Negativa",
        "motivo": "A única contração possível é 'I'm not'. A forma *amn't* não existe no inglês padrão."
      },
      {
        "ingles": "He isn't / She isn't",
        "traducao": "Ele não está / Ela não está",
        "genero": "3ª Pessoa Negativa",
        "motivo": "Contração de is not: 'He isn't driving' (ou: he's not driving)."
      },
      {
        "ingles": "Are you doing...?",
        "traducao": "Você está fazendo...?",
        "genero": "Interrogação Invertida",
        "motivo": "O 'Are' vem para a frente: 'Are you listening to me?' (sem 'do'!)."
      },
      {
        "ingles": "What are you doing?",
        "traducao": "O que você está fazendo?",
        "genero": "Wh- Question",
        "motivo": "A pergunta mais comum do dia a dia em mensagens e ligações: Wh-word + are + you + doing."
      }
    ],
    "tecnica": "A Mecânica de Negação e Pergunta em 3 passos:\n\n**Passo 1** — Quer NEGAR uma ação em andamento?\n→ Coloque **not** logo após o To Be (*I'm not, isn't, aren't*) e mantenha o verbo com **-ing** (*She isn't sleeping*).\n\n**Passo 2** — Quer fazer uma pergunta de SIM ou NÃO?\n→ Mova o To Be para antes do sujeito: **Is he working?** / **Are they coming?**.\n\n**Passo 3** — Quer fazer uma pergunta com O QUE, ONDE, POR QUE (*What, Where, Why*)?\n→ Coloque a Wh-word em primeiríssimo lugar, seguida do To Be, do sujeito e do verbo-ing: **Where are you going?**.",
    "teoria": "### Tratado Teórico: A Sintaxe Interrogativa e Negativa do Aspecto Contínuo\n\nNo modelo gerativo clássico, o verbo *To Be* atua como operador de movimento sintático:\n\n#### 1. Inversão Sujeito-Auxiliar (Subject-Auxiliary Inversion - SAI)\nAo transformar uma afirmativa em pergunta, o verbo auxiliar *be* salta por cima do sujeito para a posição do núcleo do sintagma complementizador (C):\n- Afirmativa: *[You] [are] [working].*\n- Pergunta: *[Are] [you] [working]?*\nSe houver uma partícula interrogativa (*Wh-operator*), ela ocupa a posição mais à esquerda (*Spec, CP*):\n- *[Why] [are] [you] [working] so late?*\n\n#### 2. Respostas Curtas (Short Answers)\nAo responder a perguntas no Present Continuous, repetimos apenas o pronome e o verbo auxiliar To Be, SEM o verbo com -ing:\n- *Are you having lunch now?*\n  - ✅ **Yes, I am.** / **No, I'm not.**\n  - ❌ *Yes, I am having.* (Incorreto no padrão nativo).\n- *Is the director waiting for us?*\n  - ✅ **Yes, he is.** / **No, he isn't.**\n  - ❌ *Yes, he's.* (Em respostas curtas afirmativas, contrações como *he's* ou *I'm* são proibidas ao final da frase!).",
    "ponte": "Em português, fazemos perguntas apenas mudando a entonação da voz: 'Você está trabalhando?' soa igual na afirmativa e na pergunta, só muda o ponto de interrogação.\n\nNo inglês, a inversão da ordem das palavras é obrigatória:\n- Afirmativa: **You are working.**\n- Pergunta: **Are you working?** (Nunca diga *You are working?* em padrão culto).\n- 'O que você está fazendo?' → **What are you doing?**\n- 'Para onde você está indo?' → **Where are you going?**.",
    "exemplos_prc": [
      {
        "oracao": "Are you watching this movie, or can I turn off the television?",
        "pergunta": "Como a pergunta foi formulada no Present Continuous?",
        "resposta": "Invertendo o auxiliar 'Are' para antes do sujeito 'you', mantendo o verbo 'watching'.",
        "conclusao": "Are you watching = Você está assistindo (a este filme)?"
      },
      {
        "oracao": "She isn't wearing her glasses today, so she can't see the board.",
        "pergunta": "Como foi feita a negação nesta oração?",
        "resposta": "Acoplando o 'not' contraído ao auxiliar 'is' (isn't) seguido do verbo principal 'wearing'.",
        "conclusao": "isn't wearing = não está usando / vestindo."
      },
      {
        "oracao": "What are the architects discussing in the conference room?",
        "pergunta": "Qual é a estrutura desta pergunta com Wh-word?",
        "resposta": "What (o que) + are (auxiliar) + the architects (sujeito) + discussing (verbo-ing).",
        "conclusao": "What are they discussing = O que eles estão discutindo?"
      },
      {
        "oracao": "Is it raining outside right now? — No, it isn't.",
        "pergunta": "Como foi formulada a pergunta sobre o clima e sua resposta curta?",
        "resposta": "Pergunta invertida com 'Is it raining' e resposta curta negativa precisa 'No, it isn't'.",
        "conclusao": "Is it raining = Está chovendo?"
      }
    ],
    "armadilhas": [
      {
        "errado": "Do you working right now?",
        "certo": "Are you working right now?",
        "motivo": "Nunca use o auxiliar 'do' com verbos em -ing. O auxiliar correto é o verbo To Be (Are you)."
      },
      {
        "errado": "Why she is crying?",
        "certo": "Why is she crying?",
        "motivo": "Em perguntas com Wh-words, o verbo auxiliar 'is' deve vir antes do sujeito 'she'."
      },
      {
        "errado": "Are you coming with us? — Yes, I'm.",
        "certo": "Are you coming with us? — Yes, I am.",
        "motivo": "Em respostas curtas afirmativas, o verbo auxiliar não pode ser contraído no final da frase."
      },
      {
        "errado": "I am not know what to do.",
        "certo": "I don't know what to do.",
        "motivo": "O verbo 'know' é um verbo de estado mental e não aceita Present Continuous: usa-se don't know."
      }
    ],
    "coda": "No Present Continuous, o To Be faz todo o trabalho: recebe o NOT na negação e salta para a frente na pergunta!",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Qual é a pergunta correta para saber o que alguém está fazendo agora?",
        "opcoes": [
          "What are you doing?",
          "What do you doing?",
          "What you are doing?",
          "What is you doing?"
        ],
        "resposta": 0,
        "explicacao": "A estrutura correta é Wh-word + are + you + doing."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a oração negativa para 'He':\n\n\"He ___ his homework right now; he is playing video games.\"",
        "opcoes": ["isn't doing", "doesn't doing", "aren't doing", "not doing"],
        "resposta": 0,
        "explicacao": "A negativa de He com Present Continuous é 'isn't doing'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual é a resposta curta correta para a pergunta:\n\n\"Are they coming to the party tonight?\"",
        "opcoes": [
          "Yes, they are.",
          "Yes, they're.",
          "Yes, they do.",
          "Yes, they coming."
        ],
        "resposta": 0,
        "explicacao": "Respostas curtas afirmativas não usam contração: 'Yes, they are.'"
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a pergunta com inversão:\n\n\"___ to the radio, or can I turn it off?\"",
        "opcoes": [
          "Are you listening",
          "Do you listening",
          "You are listening",
          "Is you listening"
        ],
        "resposta": 0,
        "explicacao": "A pergunta direta inverte o auxiliar: 'Are you listening...?'"
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na pergunta com 'Where' antes de revelar:\n\n\"Where ___ they ___ this evening?\"\n(Para onde eles estão indo esta noite?)",
        "resposta": "Where are they going this evening?",
        "revelacao": "Where are they going this evening?",
        "dica": "Where + are + they + going",
        "explicacao": "Wh-word + are + they + going."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na negação de 1ª pessoa antes de revelar:\n\n\"I ___ my car today, I am taking the train.\"\n(Não estou usando meu carro hoje, estou pegando o trem.)",
        "resposta": "I am not using my car today, I am taking the train.",
        "revelacao": "I am not using my car today, I am taking the train.",
        "dica": "I am not using (use perde o e)",
        "explicacao": "A negativa para I é 'I am not using' ou 'I'm not using'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na pergunta sobre ela antes de revelar:\n\n\"___ she ___ for a new apartment downtown?\"\n(Ela está procurando um novo apartamento no centro?)",
        "resposta": "Is she looking for a new apartment downtown?",
        "revelacao": "Is she looking for a new apartment downtown?",
        "dica": "Is + she + looking",
        "explicacao": "Pergunta de 3ª pessoa com 'she' inicia com 'Is'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Pense na resposta curta negativa antes de revelar:\n\n\"Is it snowing in Chicago?\"\n\"No, ___.\"",
        "resposta": "No, it isn't.",
        "revelacao": "No, it isn't.",
        "dica": "Resposta curta negativa para it",
        "explicacao": "A resposta curta negativa é 'No, it isn't'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma contraída negativa para 'They' no Present Continuous:\n\n\"They ___ paying attention to the presentation.\" (não estão)",
        "resposta": "aren't",
        "explicacao": "A forma contraída de are not é 'aren't'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra auxiliar que inicia a pergunta para 'you':\n\n\"___ you waiting for the airport shuttle?\"",
        "resposta": "Are",
        "explicacao": "Perguntas para 'you' iniciam com 'Are'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra auxiliar que inicia a pergunta para 'he':\n\n\"___ he sleeping in the guest room?\"",
        "resposta": "Is",
        "explicacao": "Perguntas para 'he' iniciam com 'Is'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma contraída de 'is not':\n\n\"The computer ___ working properly today.\"",
        "resposta": "isn't",
        "explicacao": "A forma contraída é 'isn't'."
      }
    ]
  }
};

console.log('Aplicando Onda 3 — Parte 2 (Lições 21 a 25)...');

for (const [id, lessonData] of Object.entries(wave3Part2Lessons)) {
  for (const mod of data.moduli) {
    const idx = mod.lezioni.findIndex(l => l.id === id);
    if (idx !== -1) {
      mod.lezioni[idx] = lessonData;
      console.log(`✓ Lição ${id} (${lessonData.titulo}) enriquecida com sucesso!`);
    }
  }
}

fs.writeFileSync(grammarPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Onda 3 — Parte 2 gravada com sucesso em data/grammar.json!');
