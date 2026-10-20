import fs from 'fs';

const grammarPath = 'data/grammar.json';
const data = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));

// Onda 2: Padrão Ouro para Lições A1.6 a A1.15
const wave2Lessons = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 6: Possessive Adjectives (My, Your, His, Her, Its, Our, Their)
  // ─────────────────────────────────────────────────────────────
  "a1-lez6": {
    "id": "a1-lez6",
    "num": "Lesson 6",
    "titulo": "Possessive Adjectives",
    "subtitulo": "Posse e Pertencimento — My, Your, His, Her, Its, Our, Their",
    "cena": {
      "origem": "dialogo",
      "titulo": "At the Airport Baggage Claim",
      "texto": "**Michael:** Excuse me, is this your suitcase?\n**Elena:** No, my suitcase is blue and larger.\n**Michael:** Oh, look over there! David is taking his luggage, and Sarah has her backpack already.\n**Elena:** Great! Where is our driver waiting for us?\n**Michael:** Our driver is outside with their company van."
    },
    "fio": {
      "abertura": "Observe como identificamos o que pertence a cada um. Em português costumamos usar 'o meu', 'a sua', misturando artigos com posse. No inglês a posse é direta e limpa.",
      "descoberta": "Notou como Michael diz «your suitcase» sem nenhum «the» na frente? E como ele usa «his» para David e «her» para Sarah? O possessivo inglês nunca muda pelo objeto que você possui, mas sim por quem é o dono.",
      "fecho": "Agora você compreende a lógica cristalina da posse em inglês: aponte quem é o dono, escolha o adjetivo possessivo e ligue direto ao substantivo, sem artigo algum."
    },
    "alerta": "No Brasil misturamos 'seu', 'sua' e 'dele' o tempo todo, gerando ambiguidade. Em inglês, a posse é cirúrgica: 'his' é dele, 'her' é dela, e não existe artigo antes do possessivo.",
    "definicao": {
      "fenomeno": "My car · Your phone · His job · Her apartment · Its battery · Our house · Their team",
      "causa": "Por que dizemos 'my cars' no plural sem colocar 's' em 'my'?",
      "conceito": "Adjetivos em inglês são invariáveis em gênero e número. 'My' serve para um livro (*my book*) ou para mil livros (*my books*). Além disso, eles dispensam totalmente o artigo definido (nunca diga *the my car*)."
    },
    "inventario": [
      "Os 7 adjetivos possessivos (my, your, his, her, its, our, their)",
      "A distinção vital entre 'his' (dele) e 'her' (dela)",
      "O uso de 'its' (sem apóstrofo) para objetos, empresas e animais",
      "A regra de ouro: nunca use 'the' antes de adjetivos possessivos",
      "A invariabilidade: o adjetivo possessivo nunca vai para o plural"
    ],
    "tabela_visual": "| Dono (Sujeito) | Adjetivo Possessivo | Tradução | Exemplo Real |\n|---|---|---|---|\n| **I** | **my** | meu, minha, meus, minhas | *My passport is here.* |\n| **You** | **your** | seu, sua, seus, suas (de você) | *What is your name?* |\n| **He** | **his** | dele, seu (de homem) | *His brother is a doctor.* |\n| **She** | **her** | dela, sua (de mulher) | *Her office is downtown.* |\n| **It** | **its** | dele, dela (neutro / coisa / animal) | *The company and its products.* |\n| **We** | **our** | nosso, nossa, nossos, nossas | *Our flight is on time.* |\n| **They** | **their** | deles, delas | *Their children speak English.* |",
    "observacao_cards": [
      {
        "ingles": "My",
        "traducao": "meu / minha / meus / minhas",
        "genero": "1ª Pessoa Singular",
        "motivo": "Invariável: 'my dog' (meu cão) e 'my dogs' (meus cães). Sem 'S' de plural no adjetivo."
      },
      {
        "ingles": "Your",
        "traducao": "seu / sua / seus / suas",
        "genero": "2ª Pessoa (Sing. e Plural)",
        "motivo": "Refere-se sempre ao interlocutor direto. 'Your keys' = as chaves da pessoa com quem falo."
      },
      {
        "ingles": "His",
        "traducao": "dele (posse de homem)",
        "genero": "3ª Pessoa Masculina",
        "motivo": "Concorda com o DONO masculino: 'his mother' (a mãe dele), 'his house' (a casa dele)."
      },
      {
        "ingles": "Her",
        "traducao": "dela (posse de mulher)",
        "genero": "3ª Pessoa Feminina",
        "motivo": "Concorda com o DONO feminino: 'her car' (o carro dela), 'her father' (o pai dela)."
      },
      {
        "ingles": "Its",
        "traducao": "dele / dela (de coisas, animais, cidades)",
        "genero": "3ª Pessoa Neutra",
        "motivo": "Atenção máxima: 'its' sem apóstrofo é posse ('its color' = sua cor). Com apóstrofo 'it's' é contração de 'it is'."
      },
      {
        "ingles": "Our",
        "traducao": "nosso / nossa / nossos / nossas",
        "genero": "1ª Pessoa Plural",
        "motivo": "Pronuncia-se como 'áuar' (/aʊər/). Abrange o grupo onde você está inserido: 'our team'."
      },
      {
        "ingles": "Their",
        "traducao": "deles / delas",
        "genero": "3ª Pessoa Plural",
        "motivo": "Pronúncia idêntica a 'there' e 'they're' (/ðɛər/). Refere-se a posse de um grupo externo."
      }
    ],
    "tecnica": "### Algoritmo de Aplicação Prática dos Possessivos:\n\n1. **Identifique quem é o possuidor (o dono):**\n   - O dono sou eu? → Use `my`.\n   - O dono é o homem de quem falo? → Use `his`.\n   - O dono é a mulher de quem falo? → Use `her`.\n   - O dono é uma empresa, objeto ou animal? → Use `its`.\n   - O dono somos nós? → Use `our`.\n   - O dono são eles/elas? → Use `their`.\n\n2. **Elimine o artigo 'o/a/os/as':**\n   - Em português: *O meu livro*.\n   - Em inglês: corte o 'The' → **My book**.\n\n3. **Mantenha o possessivo idêntico no singular e plural:**\n   - *My friend* (meu amigo) → *My friends* (meus amigos). Nunca adicione 's' ao possessivo.",
    "teoria": "### Estrutura Completa dos Adjetivos Possessivos\n\nAdjetivos possessivos vêm sempre **antes de um substantivo** (*noun*) para indicar a quem aquilo pertence ou com quem tem relação.\n\n#### A Grande Diferença com o Português: Concordância pelo Dono\nNo português, o possessivo concorda em gênero com a **coisa possuída**:\n* *O livro dela* (livro é masculino) vs *A casa dele* (casa é feminina).\n\nNo inglês, o possessivo concorda exclusivamente com a **pessoa que possui**:\n* Se o dono é John: *his book*, *his house*, *his mother*, *his friends*.\n* Se o dono é Mary: *her book*, *her house*, *her father*, *her friends*.\n\n<div class=\"gram-regola\"><strong>Regra de Ouro:</strong> Nunca coloque <em>the</em> antes de um adjetivo possessivo. Diga <em>This is my car</em>, jamais <em>This is the my car</em>.</div>\n\n#### Cuidado Vital: Its vs It's\nEsta é uma das maiores fontes de confusão até entre nativos:\n* **Its** (sem apóstrofo) = Adjetivo possessivo (*The dog ate its food* · *London is famous for its parks*).\n* **It's** (com apóstrofo) = Contração de *It is* ou *It has* (*It's cold today* = Está frio hoje).",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: Pontos de Ruptura\n\n1. **Supressão do Artigo Definido:**\n   - Português: *O meu amigo está aqui.* / *A minha mãe ligou.*\n   - Inglês: **My friend is here.** / **My mother called.** (Sem *The*!).\n\n2. **O falso 'Seu/Sua':**\n   - No Brasil, quando dizemos *\"Pedro foi com sua mãe\"*, pode significar a mãe de Pedro ou a mãe da pessoa com quem falo.\n   - Em inglês essa ambiguidade não existe:\n     - Se é a mãe de Pedro: **his mother**.\n     - Se é a sua mãe (de você): **your mother**.\n\n3. **Invariabilidade de Plural:**\n   - Português: *Nossos projetos*.\n   - Inglês: **Our projects** (nunca *ours projects* como adjetivo).",
    "exemplos_prc": [
      {
        "oracao": "Carlos called his sister yesterday.",
        "pergunta": "Por que usamos 'his' e não 'her', já que 'sister' é uma mulher?",
        "resposta": "Porque o possessivo concorda com quem possui (Carlos = homem → his), não com quem é possuído.",
        "conclusao": "Carlos ligou para a irmã dele."
      },
      {
        "oracao": "The hotel changed its policy on pets.",
        "pergunta": "Por que usamos 'its' sem apóstrofo?",
        "resposta": "Porque 'hotel' é uma entidade/coisa neutra, e 'its' indica posse. 'It's' com apóstrofo seria 'ele é'.",
        "conclusao": "O hotel mudou sua política sobre animais de estimação."
      },
      {
        "oracao": "We love our new apartment.",
        "pergunta": "Por que 'our' não recebe 's' mesmo com 'apartment' sendo uma aquisição plural de 'we'?",
        "resposta": "Adjetivos em inglês nunca flexionam em plural. 'Our' funciona tanto para 'our cat' quanto para 'our cats'.",
        "conclusao": "Nós amamos o nosso novo apartamento."
      },
      {
        "oracao": "Where are your keys, Lucas?",
        "pergunta": "Por que não dizemos 'Where are the your keys'?",
        "resposta": "Em inglês, adjetivos possessivos são determinantes plenos e repelem o artigo definido 'the'.",
        "conclusao": "Onde estão as suas chaves, Lucas?"
      }
    ],
    "armadilhas": [
      {
        "errado": "This is the my passport.",
        "certo": "This is my passport.",
        "motivo": "Em inglês não se usa artigo antes de possessivo. Elimine o 'the'."
      },
      {
        "errado": "Lucas loves her wife very much.",
        "certo": "Lucas loves his wife very much.",
        "motivo": "'Her' se refere a dona feminina. Se o marido é Lucas (homem), a esposa é dele: 'his wife'."
      },
      {
        "errado": "The cat licked it's paw.",
        "certo": "The cat licked its paw.",
        "motivo": "Posse de seres neutros e animais é 'its' sem apóstrofo. 'It's' significa 'ele é/está'."
      },
      {
        "errado": "These are ours computers.",
        "certo": "These are our computers.",
        "motivo": "Antes de substantivo usa-se o adjetivo possessivo 'our', que é invariável e nunca recebe 's'."
      }
    ],
    "coda": "Guarde a chave de ouro: O possessivo em inglês olha para o dono, não para o objeto — e nunca aceita 'the' antes de si.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o adjetivo possessivo correto:\n\n\"Julia is in ___ office right now.\"\n(= Julia está no escritório dela agora.)",
        "opcoes": ["his", "her", "its", "your"],
        "resposta": 1,
        "explicacao": "Julia é mulher (dona feminina) → use HER. 'His' é para homens e 'its' para neutros."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase está gramaticalmente CORRETA em inglês?",
        "opcoes": [
          "The my brother lives in London.",
          "My brother lives in London.",
          "Mine brother lives in London.",
          "The brother of my lives in London."
        ],
        "resposta": 1,
        "explicacao": "Em inglês nunca se usa 'the' antes de adjetivo possessivo. Diz-se diretamente 'My brother'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete sobre posse neutra:\n\n\"The company launched ___ new mobile application.\"\n(= A empresa lançou o seu novo aplicativo móvel.)",
        "opcoes": ["their", "it's", "its", "her"],
        "resposta": 2,
        "explicacao": "'The company' é uma organização no singular (neutro) → use ITS sem apóstrofo. 'It's' seria 'ela é'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a posse do casal:\n\n\"Tom and Sarah invited us to ___ wedding.\"\n(= Tom e Sarah nos convidaram para o casamento deles.)",
        "opcoes": ["our", "his", "her", "their"],
        "resposta": 3,
        "explicacao": "Tom e Sarah são 'eles' (They) → o possessivo de terceira pessoa plural é THEIR."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente a frase correta:\n\n\"___ car is very fast, but ___ mileage is low.\"\n(O carro dele é muito rápido, mas a quilometragem dele é baixa.)",
        "revelacao": "His car is very fast, but its mileage is low.",
        "explicacao": "Dono homem → 'His car'. Objeto possuindo característica → 'its mileage'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"We are very proud of ___ students.\"\n(Estamos muito orgulhosos dos nossos alunos.)",
        "revelacao": "We are very proud of our students.",
        "explicacao": "Sujeito 'We' → adjetivo possessivo invariável 'our'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"Is that ___ coat on the chair, Amanda?\"\n(Aquele é o seu casaco na cadeira, Amanda?)",
        "revelacao": "Is that your coat on the chair, Amanda?",
        "explicacao": "Falando diretamente com Amanda (você) → use 'your' sem nenhum artigo 'the'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"The dog is playing with ___ favorite toy.\"\n(O cachorro está brincando com seu brinquedo favorito.)",
        "revelacao": "The dog is playing with its favorite toy.",
        "explicacao": "Animal neutro → 'its' sem apóstrofo."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o possessivo que falta:\n\n\"Carlos washed ___ car this morning.\" (o carro dele)",
        "resposta": "his",
        "explicacao": "Dono masculino (Carlos) → 'his'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o possessivo neutro correto (sem apóstrofo):\n\n\"This camera has lost ___ lens cover.\" (a tampa dela)",
        "resposta": "its",
        "explicacao": "Câmera é um objeto inanimado singular → 'its'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o possessivo que falta:\n\n\"Emma called ___ parents yesterday evening.\" (os pais dela)",
        "resposta": "her",
        "explicacao": "Dona feminina (Emma) → 'her'."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o possessivo da 1ª pessoa do plural:\n\n\"We love ___ new neighborhood.\" (o nosso bairro)",
        "resposta": "our",
        "explicacao": "Sujeito 'We' → adjetivo possessivo 'our'."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 7: Possessive Pronouns & Genitive Case (Mine, Yours, John's)
  // ─────────────────────────────────────────────────────────────
  "a1-lez7": {
    "id": "a1-lez7",
    "num": "Lesson 7",
    "titulo": "Possessive Pronouns & Genitive Case",
    "subtitulo": "Pronomes de Substituição e Caso Genitivo — Mine, Yours, John's",
    "cena": {
      "origem": "dialogo",
      "titulo": "Lost and Found at the Reception",
      "texto": "**Receptionist:** Hello! Someone left a blue umbrella and a leather wallet on the counter.\n**Mark:** Oh, the umbrella is mine! I was looking for it everywhere.\n**Receptionist:** And whose wallet is this? Is it yours too?\n**Mark:** No, that wallet is Peter's. His driver's license is inside.\n**Receptionist:** Perfect, I will keep it until he arrives."
    },
    "fio": {
      "abertura": "Quando não queremos repetir a palavra 'carro' ou 'guarda-chuva', o que fazemos? Em português dizemos 'é meu', mas em inglês existe uma forma especial para quando o substantivo não aparece depois.",
      "descoberta": "Percebeu que Mark disse «the umbrella is mine» e não «my»? E quando apontou o dono da carteira, disse «Peter's» com um apóstrofo e um S? Essas duas ferramentas evitam repetições desnecessárias.",
      "fecho": "Agora você domina a diferença entre acompanhar um nome (*my car*) e substituí-lo (*it is mine*), além de dominar o elegante caso genitivo da língua inglesa."
    },
    "alerta": "O famoso apóstrofo com 'S' (*John's car*) confunde muitos brasileiros que insistem em dizer *the car of John*. Aprenda a estrutura nativa mais usada em placas, marcas e conversas reais.",
    "definicao": {
      "fenomeno": "It's my cup → It's mine · It's your turn → It's yours · The dog of John → John's dog",
      "causa": "Qual a diferença funcional entre 'my' e 'mine'?",
      "conceito": "'My' é um adjetivo e OBRIGATORIAMENTE precisa de um substantivo na frente (*my pen*). 'Mine' é um pronome substantivo e fica sozinho, substituindo o nome já citado (*the pen is mine*). O caso genitivo (*'s*) indica posse direta sem preposições."
    },
    "inventario": [
      "Os pronomes possessivos autônomos (mine, yours, his, hers, ours, theirs)",
      "A regra do Genitive Case ('s) para pessoas e animais",
      "Regras ortográficas: nomes terminados em 'S' e plurais regulares",
      "A pergunta 'Whose...?' (De quem...?)",
      "Quando NÃO usar 'of the' para posse humana"
    ],
    "tabela_visual": "| Sujeito | Com Substantivo (Adjetivo) | Sozinho / Substituto (Pronome) | Exemplo com Pronome |\n|---|---|---|---|\n| **I** | my book | **mine** | *This coffee is mine.* (É meu) |\n| **You** | your keys | **yours** | *Is this pen yours?* (É sua?) |\n| **He** | his phone | **his** | *The jacket is his.* (É dele) |\n| **She** | her bag | **hers** | *That idea was hers.* (Foi dela) |\n| **We** | our seats | **ours** | *Those seats are ours.* (São nossos) |\n| **They** | their house | **theirs** | *The victory is theirs.* (É deles) |",
    "observacao_cards": [
      {
        "ingles": "Mine",
        "traducao": "o meu / a minha / os meus / as minhas",
        "genero": "Pronome Absoluto",
        "motivo": "Fica sozinho no final da oração ou responde perguntas diretas: 'Whose cup is this? — Mine!' (Nunca 'My!')."
      },
      {
        "ingles": "Yours",
        "traducao": "o seu / a sua / os seus / as suas",
        "genero": "Pronome Absoluto",
        "motivo": "Ganha o 'S' de finalizador. 'My ticket is ready, where is yours?'"
      },
      {
        "ingles": "Hers",
        "traducao": "o dela / a dela / os dela / as dela",
        "genero": "Pronome Absoluto",
        "motivo": "Ganha 'S' para se tornar independente: 'her car' (com nome) vs 'the car is hers' (sem nome)."
      },
      {
        "ingles": "Ours / Theirs",
        "traducao": "o nosso / o deles",
        "genero": "Pronomes Plurais",
        "motivo": "Tanto 'our' quanto 'their' ganham 'S' quando usados sem substantivo seguinte."
      },
      {
        "ingles": "John's car",
        "traducao": "o carro do John",
        "genero": "Caso Genitivo ('s)",
        "motivo": "Fórmula: [Possuidor] + ['s] + [Coisa possuída]. Elimina a necessidade de 'of the'."
      },
      {
        "ingles": "Whose",
        "traducao": "De quem?",
        "genero": "Palavra Interrogativa",
        "motivo": "Usa-se para perguntar sobre a propriedade: 'Whose jacket is this?' = De quem é esta jaqueta?"
      }
    ],
    "tecnica": "### Como Aplicar o Caso Genitivo ('s):\n\n1. **Estrutura básica (Dono + 's + Objeto):**\n   - *Maria + 's + laptop* = **Maria's laptop**.\n\n2. **Plural com 'S' (adiciona apenas o apóstrofo ao final):**\n   - *The boys + '* + *room* = **The boys' room** (O quarto dos meninos).\n\n3. **Plural irregular sem 'S' (adiciona 's normalmente):**\n   - *The children + 's + toys* = **The children's toys** (Os brinquedos das crianças).\n\n4. **Dois donos juntos:**\n   - Posse conjunta: *Tom and Mary's house* (A casa de Tom e Mary).\n   - Posse individual: *Tom's and Mary's cars* (O carro de Tom e o carro de Mary).",
    "teoria": "### Pronomes Possessivos vs Caso Genitivo\n\nExistem duas maneiras fundamentais de expressar posse avançada em inglês:\n\n#### 1. Pronomes Possessivos Substantivos (*Possessive Pronouns*)\nEles são utilizados para **substituir** a expressão inteira e evitar repetições cansativas:\n* *Is this your phone?* — *No, it is **hers**.* (Em vez de *No, it is her phone*).\n\nNote que a maioria termina com 'S' (*yours, his, hers, ours, theirs*), com exceção de **mine**.\n\n#### 2. O Caso Genitivo (*Saxon Genitive*)\nPara pessoas e animais, a língua inglesa prefere quase que categoricamente o caso genitivo com apóstrofo em vez da preposição *of*:\n* Diga: **The doctor's office** (e não *The office of the doctor*).\n* Diga: **My sister's husband** (e não *The husband of my sister*).\n\n<div class=\"gram-regola\"><strong>Atenção para Coisas Inanimadas:</strong> Para objetos inanimados, usamos a preposição <em>of</em> ou a justaposição: <em>The door of the car</em> ou <em>The car door</em> (raramente <em>the car's door</em>).</div>",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: O Caso do Genitivo\n\n1. **A Ordem Invertida:**\n   - Português: [Coisa] + de + [Dono] (*A casa do Peter*).\n   - Inglês: [Dono] + 's + [Coisa] (**Peter's house**).\n\n2. **Resposta Curta com 'Mine':**\n   - Em português dizemos: *\"De quem é essa mala? — É minha!\"*.\n   - Em inglês, responder *\"It's my!\"* é um erro gravíssimo. A resposta correta exige o pronome absoluto: **It's mine!**\n\n3. **Whose vs Who's:**\n   - **Whose** = De quem (*Whose keys are these?*).\n   - **Who's** = Quem é / Quem está (*Who's that girl?*). A pronúncia é idêntica (/huːz/), mas a função é totalmente diferente.",
    "exemplos_prc": [
      {
        "oracao": "This is not my jacket; mine is black.",
        "pergunta": "Por que usamos 'my' na primeira oração e 'mine' na segunda?",
        "resposta": "Porque 'my' acompanha o substantivo 'jacket', enquanto 'mine' substitui 'my jacket' para não repetir a palavra.",
        "conclusao": "Esta não é minha jaqueta; a minha é preta."
      },
      {
        "oracao": "We stayed at Sarah's apartment in New York.",
        "pergunta": "Por que 'Sarah's apartment' e não 'the apartment of Sarah'?",
        "resposta": "Porque para pessoas a construção nativa e natural do inglês exige o genitivo saxão ('s).",
        "conclusao": "Ficamos no apartamento da Sarah em Nova York."
      },
      {
        "oracao": "Whose laptop is on the meeting table?",
        "pergunta": "Qual a função de 'whose' nesta frase?",
        "resposta": "Funciona como pronome interrogativo de posse, significando 'de quem'.",
        "conclusao": "De quem é o notebook que está na mesa de reuniões?"
      },
      {
        "oracao": "The teachers' lounge is on the second floor.",
        "pergunta": "Por que o apóstrofo está depois do 's' (teachers')?",
        "resposta": "Porque 'teachers' é um plural regular terminado em 's'. Adiciona-se apenas o apóstrofo ao final.",
        "conclusao": "A sala dos professores fica no segundo andar."
      }
    ],
    "armadilhas": [
      {
        "errado": "This coffee is my.",
        "certo": "This coffee is mine.",
        "motivo": "'My' nunca fica sozinho no final da frase. Quando o substantivo não aparece depois, use 'mine'."
      },
      {
        "errado": "I visited the house of my boss.",
        "certo": "I visited my boss's house.",
        "motivo": "Para posse de pessoas, a estrutura nativa obrigatória é o caso genitivo ('s)."
      },
      {
        "errado": "Who's notebook is this?",
        "certo": "Whose notebook is this?",
        "motivo": "'Who's' significa 'quem é'. Para perguntar 'de quem é', a grafia correta é 'Whose'."
      },
      {
        "errado": "This car is of John.",
        "certo": "This is John's car. / This car is John's.",
        "motivo": "A construção 'is of + pessoa' é tradução literal incorreta do português."
      }
    ],
    "coda": "Substantivo depois? Use adjetivo (my, your). Substantivo ausente? Use pronome (mine, yours). Dono humano? Use 's.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o pronome possessivo adequado:\n\n\"Your project is good, but ___ is much more practical.\"\n(= O seu projeto é bom, mas o nosso é muito mais prático.)",
        "opcoes": ["our", "ours", "us", "we"],
        "resposta": 1,
        "explicacao": "Como não há substantivo após a lacuna, usa-se o pronome possessivo substantivo OURS."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual é a forma correta do caso genitivo?\n\n\"O carro do médico está estacionado em frente ao hospital.\"",
        "opcoes": [
          "The car of the doctor is parked in front of the hospital.",
          "The doctor's car is parked in front of the hospital.",
          "The doctor car is parked in front of the hospital.",
          "The car's doctor is parked in front of the hospital."
        ],
        "resposta": 1,
        "explicacao": "Para pessoas, a forma natural em inglês é sempre [Possuidor] + 's + [Objeto]: The doctor's car."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a pergunta de posse:\n\n\"___ keys are these on the sofa?\"\n(= De quem são estas chaves no sofá?)",
        "opcoes": ["Who's", "Whose", "Who", "Whom"],
        "resposta": 1,
        "explicacao": "WHOSE é o pronome interrogativo usado para perguntar sobre posse ('de quem')."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o pronome substitutivo:\n\n\"I found my phone, but Emma couldn't find ___.\"\n(= Eu encontrei o meu telefone, mas Emma não conseguiu encontrar o dela.)",
        "opcoes": ["her", "hers", "she", "its"],
        "resposta": 1,
        "explicacao": "HERS substitui 'her phone' para evitar repetição."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente a resposta:\n\n\"Whose umbrella is this? — It is ___.\"\n(De quem é este guarda-chuva? — É meu.)",
        "revelacao": "Whose umbrella is this? — It is mine.",
        "explicacao": "Em respostas curtas ou isoladas usa-se 'mine', nunca 'my'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"We went to ___ birthday party on Saturday.\"\n(Fomos à festa de aniversário da Sarah no sábado.)",
        "revelacao": "We went to Sarah's birthday party on Saturday.",
        "explicacao": "Sarah + 's = Sarah's birthday party."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"The blue bag is yours, and the red one is ___.\"\n(A bolsa azul é sua, e a vermelha é deles.)",
        "revelacao": "The blue bag is yours, and the red one is theirs.",
        "explicacao": "Theirs é o pronome possessivo absoluto de 'they'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"That is the ___ bedroom.\"\n(Aquele é o quarto das crianças.)",
        "revelacao": "That is the children's bedroom.",
        "explicacao": "'Children' é plural irregular (sem 's' no fim), portanto recebe 's normalmente."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome possessivo que substitui 'my car':\n\n\"Your car is fast, but ___ is economical.\" (o meu)",
        "resposta": "mine",
        "explicacao": "Mine é a forma independente que fica sem substantivo."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma genitiva com apóstrofo:\n\n\"This is ___ office.\" (o escritório do David)",
        "resposta": "David's",
        "explicacao": "David + 's = David's."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a palavra interrogativa para 'de quem':\n\n\"___ bag is this on the floor?\"",
        "resposta": "Whose",
        "explicacao": "Whose pergunta a quem pertence algo."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome possessivo para 'dela' sem substantivo:\n\n\"I have my ticket, but she lost ___.\"",
        "resposta": "hers",
        "explicacao": "Hers é o pronome absoluto para posse feminina."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 8: Question Words 1 (What, Who, Where)
  // ─────────────────────────────────────────────────────────────
  "a1-lez8": {
    "id": "a1-lez8",
    "num": "Lesson 8",
    "titulo": "Question Words 1",
    "subtitulo": "Perguntas Essenciais de Informação — What, Who, Where",
    "cena": {
      "origem": "dialogo",
      "titulo": "New Student at the Campus",
      "texto": "**Guard:** Good morning! What is your name, please?\n**Lucas:** Good morning. My name is Lucas Silva.\n**Guard:** Welcome to the campus, Lucas. Who is your faculty advisor?\n**Lucas:** Dr. Reynolds from the Computer Science department.\n**Guard:** Excellent. Where is your student ID card?\n**Lucas:** It is right here in my wallet."
    },
    "fio": {
      "abertura": "Fazer perguntas é a forma mais rápida de sobreviver em qualquer país. Quando você não sabe algo, uma simples palavra no começo da frase destrava toda a informação necessária.",
      "descoberta": "Repare na posição dessas palavras: «What is», «Who is», «Where is». Elas vêm sempre em primeiríssimo lugar, seguidas imediatamente da inversão do verbo. Em inglês, a pergunta avisa de antemão o tipo de resposta esperada.",
      "fecho": "Agora você domina a tríade primordial de investigação em inglês: What (coisas/fatos), Who (pessoas) e Where (lugares)."
    },
    "alerta": "No inglês não basta mudar a entonação da voz para fazer uma pergunta de informação. A question word abre a oração e obriga a inversão do sujeito com o verbo.",
    "definicao": {
      "fenomeno": "What is this? · Who is that man? · Where are the keys?",
      "causa": "Por que a ordem das palavras muda em relação ao português?",
      "conceito": "As 'Wh-words' exigem inversão sujeito-verbo na oração interrogativa com o verbo To Be. A estrutura padrão é: [Wh-word] + [Verbo To Be] + [Sujeito]?"
    },
    "inventario": [
      "O significado e uso de WHAT (o que / qual)",
      "O significado e uso de WHO (quem)",
      "O significado e uso de WHERE (onde)",
      "A estrutura interrogativa com To Be: Wh-word + am/is/are + Sujeito",
      "As contrações comuns na fala: What's, Who's, Where's"
    ],
    "tabela_visual": "| Question Word | Significado Central | Foco da Resposta | Exemplo Real |\n|---|---|---|---|\n| **What** | O que / Qual | Coisas, ações, conceitos | *What is your email address?* |\n| **Who** | Quem | Pessoas e identidades | *Who is your English teacher?* |\n| **Where** | Onde / Aonde | Lugares e posições | *Where is the nearest subway station?* |",
    "observacao_cards": [
      {
        "ingles": "What",
        "traducao": "O que / Qual",
        "genero": "Pergunta sobre Coisas",
        "motivo": "Usa-se tanto para 'o que' (*What is that?*) quanto para 'qual' (*What is your phone number?*). Não use 'which' para escolhas abertas."
      },
      {
        "ingles": "Who",
        "traducao": "Quem",
        "genero": "Pergunta sobre Pessoas",
        "motivo": "Refere-se exclusivamente a seres humanos: 'Who is that woman? — She is our director.'"
      },
      {
        "ingles": "Where",
        "traducao": "Onde / Aonde",
        "genero": "Pergunta sobre Lugares",
        "motivo": "Usa-se para localização estática ou destino: 'Where are you from?' / 'Where is the bathroom?'"
      },
      {
        "ingles": "What's",
        "traducao": "O que é / Qual é",
        "genero": "Contração Cotidiana",
        "motivo": "Contração de 'What is'. É a forma padrão da fala diária: 'What's the problem?'"
      },
      {
        "ingles": "Where's",
        "traducao": "Onde está",
        "genero": "Contração Cotidiana",
        "motivo": "Contração de 'Where is'. 'Where's my passport?'"
      },
      {
        "ingles": "Who's",
        "traducao": "Quem é",
        "genero": "Contração Cotidiana",
        "motivo": "Contração de 'Who is'. Cuidado para não confundir com 'Whose' (de quem)."
      }
    ],
    "tecnica": "### Fórmula de Construção de Perguntas Abertas (com To Be):\n\n$$\\text{[Wh-Word]} + \\text{[am / is / are]} + \\text{[Sujeito]} + \\text{[Complemento]}?$$\n\n1. **Escolha o alvo da pergunta:**\n   - Quer saber uma coisa? → `What`\n   - Quer saber uma pessoa? → `Who`\n   - Quer saber um local? → `Where`\n\n2. **Insira a forma adequada do verbo To Be:**\n   - Sujeito singular (ele, ela, isto) → `is` (ou contraia `'s`).\n   - Sujeito plural ou 'você' → `are`.\n\n3. **Coloque o sujeito por último:**\n   - *Where is your hotel?* (e nunca *Where your hotel is?*).",
    "teoria": "### Perguntas de Informação (*Wh- Questions*)\n\nAo contrário das *Yes/No Questions* (que pedem apenas sim ou não como resposta), as perguntas iniciadas por *Question Words* solicitam **dados e informações concretas**.\n\n#### Diferença Crucial: What vs Which\n* **What** é usado quando o universo de respostas é aberto e infinito:\n  - *What is your favorite color?* (Entre todas as cores do mundo).\n* **Which** é usado quando há uma lista fechada e restrita de opções:\n  - *Which color do you prefer: red or blue?*\n\n#### Entonação na Fala Nativa\nEm inglês, perguntas abertas com *Wh-words* terminam tipicamente com **entonação descendente** (a voz cai no final da frase), ao contrário das perguntas de Sim/Não, onde a voz sobe.",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: Armadilhas de Estrutura\n\n1. **A tentação de não inverter o verbo:**\n   - Em português, perguntamos: *\"Onde o banheiro fica?\"* mantendo a ordem afirmativa.\n   - Em inglês, a ordem afirmativa *Where the bathroom is?* é incorreta. O verbo deve obrigatoriamente preceder o sujeito: **Where is the bathroom?**\n\n2. **A preposição no final da frase:**\n   - No português formal dizemos: *\"De onde você é?\"* (preposição antes da pergunta).\n   - No inglês falado, a preposição migra para o final: **Where are you from?**",
    "exemplos_prc": [
      {
        "oracao": "Where is the departure gate for flight 204?",
        "pergunta": "Por que o verbo 'is' vem antes de 'the departure gate'?",
        "resposta": "Porque em perguntas em inglês o verbo auxiliar ou o verbo To Be sempre antecede o sujeito.",
        "conclusao": "Onde fica o portão de embarque para o voo 204?"
      },
      {
        "oracao": "Who are those people standing near the entrance?",
        "pergunta": "Por que usamos 'are' e não 'is'?",
        "resposta": "Porque o sujeito 'those people' é plural (pessoas), exigindo a concordância com 'are'.",
        "conclusao": "Quem são aquelas pessoas paradas perto da entrada?"
      },
      {
        "oracao": "What is the Wi-Fi password in this cafeteria?",
        "pergunta": "Por que usamos 'What' e não 'Which'?",
        "resposta": "Porque a pergunta é aberta e solicita uma informação específica, sem uma lista prévia de alternativas.",
        "conclusao": "Qual é a senha do Wi-Fi nesta cafeteria?"
      },
      {
        "oracao": "Where are your colleagues today?",
        "pergunta": "Como responder adequadamente a essa pergunta?",
        "resposta": "Indicando um local: 'They are in the meeting room.'",
        "conclusao": "Onde estão seus colegas hoje?"
      }
    ],
    "armadilhas": [
      {
        "errado": "Where your hotel is?",
        "certo": "Where is your hotel?",
        "motivo": "Em perguntas com To Be o verbo deve vir antes do sujeito: Where + is + hotel."
      },
      {
        "errado": "Who is your job?",
        "certo": "What is your job?",
        "motivo": "'Who' é exclusivo para pessoas. Para profissões ou coisas, usa-se 'What'."
      },
      {
        "errado": "From where are you?",
        "certo": "Where are you from?",
        "motivo": "Em inglês a preposição 'from' vai para o final da pergunta."
      },
      {
        "errado": "What the time is?",
        "certo": "What time is it? / What is the time?",
        "motivo": "A inversão é indispensável para marcar gramaticalmente a oração interrogativa."
      }
    ],
    "coda": "Wh-word no comando, verbo logo em seguida e sujeito no final. Essa é a batida da pergunta em inglês.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete a pergunta sobre localização:\n\n\"___ is the nearest pharmacy?\"\n(= Onde fica a farmácia mais próxima?)",
        "opcoes": ["What", "Where", "Who", "How"],
        "resposta": 1,
        "explicacao": "WHERE pergunta sobre lugares e localizações."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a pergunta sobre identidade:\n\n\"___ is that new manager in the sales department?\"\n(= Quem é aquele novo gerente no departamento de vendas?)",
        "opcoes": ["What", "Who", "Where", "When"],
        "resposta": 1,
        "explicacao": "WHO refere-se exclusivamente a pessoas."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual é a ordem correta para a pergunta em inglês?",
        "opcoes": [
          "Where your parents are from?",
          "Where are your parents from?",
          "Where from your parents are?",
          "From where your parents are?"
        ],
        "resposta": 1,
        "explicacao": "A ordem canônica é Wh-word (Where) + Verbo (are) + Sujeito (your parents) + Preposição (from)."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a palavra correta:\n\n\"___ is your phone number?\"\n(= Qual é o seu número de telefone?)",
        "opcoes": ["Who", "What", "Where", "Which of"],
        "resposta": 1,
        "explicacao": "Para dados como telefone, nome, endereço e profissão, usa-se WHAT."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente a pergunta:\n\n\"___ is your favorite city in Europe?\"\n(Qual é a sua cidade favorita na Europa?)",
        "revelacao": "What is your favorite city in Europe?",
        "explicacao": "WHAT pergunta sobre coisas e preferências abertas."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"___ are my car keys? They were on the table.\"\n(Onde estão as chaves do meu carro? Elas estavam na mesa.)",
        "revelacao": "Where are my car keys? They were on the table.",
        "explicacao": "WHERE + are (chaves no plural)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"___ is that person sitting next to the CEO?\"\n(Quem é aquela pessoa sentada ao lado do CEO?)",
        "revelacao": "Who is that person sitting next to the CEO?",
        "explicacao": "WHO para identificar pessoas."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente a contração comum:\n\n\"___ the matter with the printer?\"\n(Qual é o problema com a impressora?)",
        "revelacao": "What's the matter with the printer?",
        "explicacao": "What's é a contração comum de What is."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a question word para lugares:\n\n\"___ are you going this weekend?\" (Aonde)",
        "resposta": "Where",
        "explicacao": "Where pergunta sobre locais e destinos."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a question word para pessoas:\n\n\"___ is responsible for this project?\" (Quem)",
        "resposta": "Who",
        "explicacao": "Who é a palavra interrogativa para pessoas."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a question word correta:\n\n\"___ is your surname, sir?\" (Qual)",
        "resposta": "What",
        "explicacao": "What é usado para perguntar sobrenome, nome, etc."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma contraída de 'Where is':\n\n\"___ my passport, honey?\" (Onde está)",
        "resposta": "Where's",
        "explicacao": "Where's é a contração padrão de Where is."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 9: Present Simple (Affirmative) — I, You, We, They
  // ─────────────────────────────────────────────────────────────
  "a1-lez9": {
    "id": "a1-lez9",
    "num": "Lesson 9",
    "titulo": "Present Simple (Affirmative)",
    "subtitulo": "Rotina, Hábitos e Fatos Gerais — I, You, We, They",
    "cena": {
      "origem": "dialogo",
      "titulo": "Daily Morning Routine",
      "texto": "**Liam:** What time do you wake up on weekdays, Carlos?\n**Carlos:** I wake up at 6:30 AM every day. I drink black coffee and read the news.\n**Liam:** That is very disciplined! My roommates and I live near the office, so we sleep until 7:30.\n**Carlos:** Do you walk to work?\n**Liam:** Yes, we walk together. It takes only fifteen minutes."
    },
    "fio": {
      "abertura": "Pense no que você faz todos os dias: acordar, tomar café, trabalhar, estudar. Para falar de rotina e fatos permanentes da sua vida, você precisa do Present Simple.",
      "descoberta": "Perceba como em inglês o verbo no infinitivo perde a partícula 'to' e fica totalmente puro: «I wake up», «we sleep», «they walk». Não há dezenas de terminações conjugadas como em português.",
      "fecho": "Você acaba de desbloquear a ferramenta que constrói toda a sua narrativa pessoal em inglês: descrever sua rotina com verbos limpos e diretos."
    },
    "alerta": "Ao contrário do português, onde cada pessoa ganha uma terminação diferente (*eu falo, você fala, nós falamos, eles falam*), em inglês o verbo para I, You, We e They é exatamente idêntico.",
    "definicao": {
      "fenomeno": "I live in Brazil · You work hard · We study English · They travel often",
      "causa": "Como o inglês consegue simplificar tanto a conjugação?",
      "conceito": "Para as pessoas I, You, We e They, o verbo no Present Simple permanece na sua **forma básica** (*base form*), sem nenhuma terminação ou alteração ortográfica. O pronome sujeito é obrigatório para indicar quem pratica a ação."
    },
    "inventario": [
      "O uso do Present Simple para rotinas, hábitos e verdades universais",
      "A forma básica do verbo com I, You, We e They (sem alterações)",
      "Verbos de ação cotidianos (live, work, study, eat, drink, sleep, go)",
      "Expressões de tempo habituais (every day, in the morning, on weekends)",
      "A obrigatoriedade de explicitar o pronome sujeito em cada oração"
    ],
    "tabela_visual": "| Sujeito | Verbo (Forma Básica) | Complemento | Tradução |\n|---|---|---|---|\n| **I** | **work** | in an international company | *Eu trabalho em uma empresa internacional.* |\n| **You** | **speak** | English very fluently | *Você fala inglês fluentemente.* |\n| **We** | **start** | work at nine o'clock | *Nós começamos a trabalhar às nove horas.* |\n| **They** | **live** | in a modern apartment | *Eles moram em um apartamento moderno.* |",
    "observacao_cards": [
      {
        "ingles": "I live",
        "traducao": "Eu moro / vivo",
        "genero": "Rotina Pessoal",
        "motivo": "Forma direta: retire o 'to' do infinitivo 'to live' e junte com 'I'. Simples e limpo."
      },
      {
        "ingles": "You speak",
        "traducao": "Você fala / Vocês falam",
        "genero": "2ª Pessoa",
        "motivo": "Idêntico para uma pessoa ou para cem pessoas: 'You speak great English'."
      },
      {
        "ingles": "We study",
        "traducao": "Nós estudamos",
        "genero": "1ª Pessoa Plural",
        "motivo": "Sem a terminação '-amos' do português. 'We study' basta."
      },
      {
        "ingles": "They work",
        "traducao": "Eles/Elas trabalham",
        "genero": "3ª Pessoa Plural",
        "motivo": "A mesma forma verbal dos demais: 'They work from home on Fridays'."
      },
      {
        "ingles": "Every day",
        "traducao": "Todos os dias",
        "genero": "Marcador Temporal",
        "motivo": "Marcador clássico do Present Simple que indica hábito repetido."
      },
      {
        "ingles": "On weekdays",
        "traducao": "Em dias de semana",
        "genero": "Marcador Temporal",
        "motivo": "Usa-se a preposição 'on' com dias e fins de semana: 'on weekdays', 'on weekends'."
      }
    ],
    "tecnica": "### Como Formular Afirmações de Rotina:\n\n1. **Selecione o sujeito:** `I`, `you`, `we` ou `they`.\n2. **Pegue o verbo na forma de dicionário (sem 'to'):**\n   - *To drink* → `drink`.\n   - *To understand* → `understand`.\n3. **Adicione o complemento e o marcador de frequência:**\n   - *I drink tea every morning.*\n4. **Regra de ouro:** NUNCA adicione verbo To Be (*am/are*) junto com o verbo de ação. Diga *I live here*, jamais *I am live here*.",
    "teoria": "### Usos Canônicos do Present Simple\n\nO Present Simple não é usado apenas para o momento presente, mas para:\n1. **Hábitos e Rotinas:** Ações que se repetem com frequência (*I drink coffee every day*).\n2. **Fatos Permanentes e Verdades Universais:** Leis da natureza ou estados duradouros (*Water boils at 100°C* · *They live in Canada*).\n3. **Horários e Programações Fixas:** Trens, aviões e reuniões (*The train leaves at 8:00 AM*).\n\n#### O Erro Comum: Inserção Indevida do To Be\nMuitos brasileiros habituados a frases como *\"Eu estou morando\"* tentam traduzir *\"I am live\"*. Em inglês, quando você fala de fatos e rotinas, o verbo de ação atua sozinho: **I live in São Paulo**.",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: Sujeito Oculto Proibido\n\n1. **A Proibição do Sujeito Oculto:**\n   - Em português: *\"Trabalho muito todos os dias.\"* (sujeito 'eu' oculto).\n   - Em inglês: O sujeito é estritamente obrigatório. Omitir o pronome torna a frase gramaticalmente agramatical: **I work hard every day.**\n\n2. **A Descomplicação Conjugal:**\n   - Português: *eu como, tu comes, você come, nós comemos, vós comeis, eles comem* (6 formas).\n   - Inglês: **eat** para praticamente todas as pessoas (com ajuste apenas no he/she/it).",
    "exemplos_prc": [
      {
        "oracao": "They take the subway to work every morning.",
        "pergunta": "Por que o verbo 'take' não tem nenhuma terminação especial?",
        "resposta": "Porque com o sujeito 'They' no Present Simple afirmativo o verbo permanece na forma básica.",
        "conclusao": "Eles pegam o metrô para o trabalho toda manhã."
      },
      {
        "oracao": "I understand the basic principles of this software.",
        "pergunta": "Por que não se diz 'I am understand'?",
        "resposta": "Porque 'understand' é um verbo de estado mental e atua sozinho; o verbo auxiliar 'am' não pode ser misturado.",
        "conclusao": "Eu entendo os princípios básicos deste software."
      },
      {
        "oracao": "We drink water throughout the day.",
        "pergunta": "Que ideia este verbo transmite aqui?",
        "resposta": "Transmite um hábito de saúde permanente, papel principal do Present Simple.",
        "conclusao": "Nós bebemos água ao longo do dia."
      },
      {
        "oracao": "You speak English with great confidence.",
        "pergunta": "Qual a diferença entre 'You speak' e 'You are speaking'?",
        "resposta": "'You speak' refere-se à habilidade permanente; 'You are speaking' seria a ação acontecendo exatamente neste segundo.",
        "conclusao": "Você fala inglês com grande confiança."
      }
    ],
    "armadilhas": [
      {
        "errado": "I am work in a hospital.",
        "certo": "I work in a hospital.",
        "motivo": "Não misture o verbo To Be (am) com verbos de ação na rotina. Use apenas 'I work'."
      },
      {
        "errado": "Live in Rio de Janeiro.",
        "certo": "I live in Rio de Janeiro.",
        "motivo": "Em inglês não existe sujeito oculto. O pronome 'I' é obrigatório."
      },
      {
        "errado": "We drinks coffee together.",
        "certo": "We drink coffee together.",
        "motivo": "O 'S' no final do verbo é exclusivo da 3ª pessoa do singular (he/she/it). Com 'We', use 'drink'."
      },
      {
        "errado": "They are agree with the proposal.",
        "certo": "They agree with the proposal.",
        "motivo": "'Agree' (concordar) já é um verbo pleno. Não use 'are agree'."
      }
    ],
    "coda": "Com I, You, We e They: o verbo fica puro, o sujeito nunca se esconde e o To Be fica de fora.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o verbo correto no Present Simple:\n\n\"We ___ in a software company in Austin.\"\n(= Nós trabalhamos em uma empresa de software em Austin.)",
        "opcoes": ["work", "works", "are work", "working"],
        "resposta": 0,
        "explicacao": "Com o sujeito 'We', usa-se a forma básica do verbo: WORK."
      },
      {
        "tipo": "escolha",
        "pergunta": "Identifique a frase gramaticalmente CORRETA em inglês:",
        "opcoes": [
          "I am study English every evening.",
          "I study English every evening.",
          "Study English every evening.",
          "I studies English every evening."
        ],
        "resposta": 1,
        "explicacao": "'I study English every evening' tem sujeito obrigatório e verbo puro sem To Be intrusivo."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a rotina matinal:\n\n\"They ___ breakfast at 7:30 AM before going to school.\"\n(= Eles tomam café da manhã às 7h30 antes de ir para a escola.)",
        "opcoes": ["has", "have", "are have", "haves"],
        "resposta": 1,
        "explicacao": "Com o sujeito 'They', a forma correta é 'have breakfast'."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete a frase:\n\n\"You ___ the instructions very clearly.\"\n(= Você entende as instruções muito claramente.)",
        "opcoes": ["understands", "understand", "are understand", "understanding"],
        "resposta": 1,
        "explicacao": "Com 'You', o verbo permanece na forma básica: understand."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente a frase de rotina:\n\n\"I ___ up early on weekdays.\"\n(Eu acordo cedo nos dias de semana.)",
        "revelacao": "I wake up early on weekdays.",
        "explicacao": "Wake up é o phrasal verb para despertar/acordar."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"We ___ fresh fruit at the local market.\"\n(Nós compramos frutas frescas no mercado local.)",
        "revelacao": "We buy fresh fruit at the local market.",
        "explicacao": "Sujeito 'We' + verbo 'buy'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"They ___ two languages fluently.\"\n(Eles falam dois idiomas fluentemente.)",
        "revelacao": "They speak two languages fluently.",
        "explicacao": "They speak (verbo puro)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"You ___ a lot of interesting people in your job.\"\n(Você conhece muitas pessoas interessantes no seu trabalho.)",
        "revelacao": "You meet a lot of interesting people in your job.",
        "explicacao": "Meet significa conhecer/encontrar."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o verbo que falta no presente:\n\n\"I ___ in a quiet apartment near the park.\" (morar)",
        "resposta": "live",
        "explicacao": "Forma básica do verbo morar: live."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o verbo que falta:\n\n\"We ___ coffee together every morning.\" (beber / tomar)",
        "resposta": "drink",
        "explicacao": "Forma básica de beber: drink."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o verbo que falta:\n\n\"They ___ to the gym three times a week.\" (ir)",
        "resposta": "go",
        "explicacao": "Forma básica do verbo ir com they: go."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite o pronome obrigatório que falta:\n\n\"___ work from home on Mondays.\" (Nós)",
        "resposta": "We",
        "explicacao": "O pronome sujeito é obrigatório: We."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 10: Present Simple (He/She/It) — Regras do -s, -es, -ies
  // ─────────────────────────────────────────────────────────────
  "a1-lez10": {
    "id": "a1-lez10",
    "num": "Lesson 10",
    "titulo": "Present Simple (He/She/It)",
    "subtitulo": "A Marca Registrada da 3ª Pessoa — Regras do -s, -es, -ies",
    "cena": {
      "origem": "dialogo",
      "titulo": "Talking About a Colleague",
      "texto": "**Manager:** How is Sarah adapting to the new team?\n**Colleague:** She adapts very quickly! She speaks three languages and manages our client accounts.\n**Manager:** Does she finish her reports on time?\n**Colleague:** Always. She works intensely, watches our performance metrics, and fixes any issue immediately."
    },
    "fio": {
      "abertura": "Na lição anterior você viu que o verbo fica puro com I, You, We e They. Mas quando apontamos para uma terceira pessoa — ele, ela ou aquilo —, o inglês exige um pequeno tributo sonoro.",
      "descoberta": "Notou como o colega disse «she speaks», «she works», «she watches» e «she fixes»? Toda vez que o sujeito é He, She ou It no presente afirmativo, o verbo OBRIGATORIAMENTE ganha um som de 'S'.",
      "fecho": "Agora você domina a regra mais cobrada em exames e a marca distintiva de quem fala inglês com precisão nativa: o 'S' da terceira pessoa."
    },
    "alerta": "O esquecimento do 'S' na 3ª pessoa do singular (*\"he work\"* em vez de *\"he works\"*) é o erro mais denunciador de estrangeiros. Automatizar esse som eleva instantaneamente o nível do seu inglês.",
    "definicao": {
      "fenomeno": "He works · She watches · He studies · It rains · The system runs",
      "causa": "Por que o verbo ganha 'S' apenas com He, She e It?",
      "conceito": "Historicamente, o inglês manteve uma única terminação de flexão no presente: o sufixo de 3ª pessoa do singular. A regra geral adiciona **-s**, verbos com sons sibilantes recebem **-es**, e consoante + Y troca por **-ies**."
    },
    "inventario": [
      "A regra geral: adição de '-s' ao verbo com He, She, It",
      "A regra dos verbos sibilantes (-ch, -sh, -ss, -x, -zz, -o): adição de '-es'",
      "A regra da consoante + y: troca por '-ies' (study → studies)",
      "A exceção vogal + y: adição normal de '-s' (play → plays)",
      "Verbos irregulares fundamentais: have → has / go → goes / do → does"
    ],
    "tabela_visual": "| Terminação do Verbo | Regra de Ajuste | Forma Base (I/You/We/They) | Forma 3ª Pessoa (He/She/It) |\n|---|---|---|---|\n| **Geral (maioria dos verbos)** | + **s** | work, live, eat, speak | *works, lives, eats, speaks* |\n| **Sibilantes (-ch, -sh, -ss, -x, -o)** | + **es** | watch, wash, kiss, fix, go | *watches, washes, kisses, fixes, goes* |\n| **Consoante + Y** | Y vira **ies** | study, fly, cry, try | *studies, flies, cries, tries* |\n| **Vogal + Y** | apenas + **s** | play, say, buy, stay | *plays, says, buys, stays* |\n| **Irregular vital** | forma própria | have | **has** |",
    "observacao_cards": [
      {
        "ingles": "He works",
        "traducao": "Ele trabalha",
        "genero": "Regra Geral (+s)",
        "motivo": "A imensa maioria dos verbos simplesmente recebe o 's' sonoro ao final."
      },
      {
        "ingles": "She watches",
        "traducao": "Ela assiste",
        "genero": "Regra Sibilante (+es)",
        "motivo": "Terminações em sons como 'ch' precisam de 'es' para criar uma sílaba audível (/wɒtʃɪz/)."
      },
      {
        "ingles": "He studies",
        "traducao": "Ele estuda",
        "genero": "Consoante + Y (+ies)",
        "motivo": "D + Y: a consoante expulsa o 'y' e introduz '-ies' (*study → studies*)."
      },
      {
        "ingles": "She plays",
        "traducao": "Ela joga / toca",
        "genero": "Vogal + Y (+s)",
        "motivo": "A + Y: quando há vogal antes do 'y', a regra geral prevalece e apenas ganha 's'."
      },
      {
        "ingles": "He has",
        "traducao": "Ele tem",
        "genero": "Irregular Vital",
        "motivo": "'Have' vira 'has'. Não existe 'haves' em inglês."
      },
      {
        "ingles": "She goes",
        "traducao": "Ela vai",
        "genero": "Terminação em -o (+es)",
        "motivo": "Verbos terminados em 'o' (*go, do*) recebem '-es' (*goes, does*)."
      }
    ],
    "tecnica": "### Árvore de Decisão Rápida para o Verbo na 3ª Pessoa:\n\n1. **O sujeito é He, She ou It (ou um nome singular como *John*, *the company*, *my father*)?**\n   - NÃO? → Deixe o verbo puro (*They work*).\n   - SIM? → Aplique o filtro ortográfico:\n\n2. **O verbo é 'have'?**\n   - SIM → Troque por `has`.\n\n3. **O verbo termina em -ch, -sh, -ss, -x, -zz ou -o?**\n   - SIM → Adicione `-es` (*watches, goes, fixes*).\n\n4. **O verbo termina em Consoante + Y?**\n   - SIM → Troque o 'y' por `-ies` (*studies, carries*).\n\n5. **Nenhum dos anteriores?**\n   - Adicione simplesmente `-s` (*works, runs, eats*).",
    "teoria": "### A Importância Linguística do 'S' na Terceira Pessoa\n\nNo inglês moderno, a quase totalidade das desinências verbais herdadas do inglês antigo desapareceu. Restou apenas esta:\n\n$$\\text{Sujeito Singular (3ª Pessoa)} \\longrightarrow \\text{Verbo} + \\mathbf{-s / -es / -ies}$$\n\n#### Atenção aos Sujeitos Ocultos em Substantivos Comuns:\nMuitos alunos acertam quando veem *He* ou *She*, mas erram quando o sujeito é um substantivo comum:\n* *The train* = **It** → *The train arrives at 6 PM* (com S!).\n* *My mother* = **She** → *My mother cooks well* (com S!).\n* *The company* = **It** → *The company produces software* (com S!).\n\nNo entanto, se o sujeito for plural:\n* *The trains* = **They** → *The trains arrive at 6 PM* (sem S no verbo!).",
    "ponte": "### 🇵🇹 Português vs 🇬🇧 Inglês: 'S' de Verbo NÃO É Plural!\n\n1. **O Curto-Circuito Mental do Brasileiro:**\n   - No português, a letra 'S' é associada instantaneamente ao **plural** (*carros, livros*).\n   - No inglês, nos substantivos o 'S' é plural (*two cars*), mas **NOS VERBOS O 'S' INDICA SINGULAR DE TERCEIRA PESSOA** (*He works = Ele trabalha*).\n   - Jamais pense que *\"He works\"* significa *\"Ele trabalham\"*.\n\n2. **A Terceira Pessoa Oculta de Conceitos Abstratos:**\n   - Em português: *\"O tempo passa rápido.\"*\n   - Em inglês: *Time* é neutro singular (It) → **Time passes quickly.**",
    "exemplos_prc": [
      {
        "oracao": "My brother lives in Toronto and works for an airline.",
        "pergunta": "Por que ambos os verbos ('lives' e 'works') receberam 'S'?",
        "resposta": "Porque o sujeito de ambas as ações é 'My brother', que equivale ao pronome 'He' (3ª pessoa singular).",
        "conclusao": "Meu irmão mora em Toronto e trabalha para uma companhia aérea."
      },
      {
        "oracao": "The software automatically fixes system bugs.",
        "pergunta": "Por que o verbo 'fix' recebeu '-es'?",
        "resposta": "Porque termina em 'x' (som sibilante) e o sujeito 'The software' é 3ª pessoa neutra (It).",
        "conclusao": "O software corrige automaticamente falhas do sistema."
      },
      {
        "oracao": "She studies data science at the university.",
        "pergunta": "Por que a grafia mudou de 'study' para 'studies'?",
        "resposta": "Porque 'study' termina em consoante (d) + y, o que exige a substituição do 'y' por '-ies'.",
        "conclusao": "Ela estuda ciência de dados na universidade."
      },
      {
        "oracao": "A professional athlete has a very strict diet.",
        "pergunta": "Por que se usou 'has' em vez de 'haves'?",
        "resposta": "Porque 'have' é irregular na 3ª pessoa do singular e se transforma em 'has'.",
        "conclusao": "Um atleta profissional tem uma dieta muito rigorosa."
      }
    ],
    "armadilhas": [
      {
        "errado": "He work in a bank.",
        "certo": "He works in a bank.",
        "motivo": "Sujeito 3ª pessoa singular (He) exige obrigatoriamente o 's' no verbo no presente."
      },
      {
        "errado": "She watch TV every night.",
        "certo": "She watches TV every night.",
        "motivo": "Verbos terminados em -ch recebem '-es' com he/she/it."
      },
      {
        "errado": "John haves a new car.",
        "certo": "John has a new car.",
        "motivo": "A forma correta de 3ª pessoa do verbo have é 'has'."
      },
      {
        "errado": "The baby crys when he is hungry.",
        "certo": "The baby cries when he is hungry.",
        "motivo": "Consoante (r) + y troca por '-ies': cry → cries."
      }
    ],
    "coda": "He, She ou It à vista? O verbo cobra o 'S' de pedágio. Fique atento a -es e -ies.",
    "exercicios": [
      {
        "tipo": "escolha",
        "pergunta": "Complete com o verbo na forma correta:\n\n\"David ___ English to foreign students.\"\n(= David ensina inglês para alunos estrangeiros.)",
        "opcoes": ["teach", "teaches", "teachies", "is teach"],
        "resposta": 1,
        "explicacao": "David é 'He' e o verbo 'teach' termina em -ch → adiciona-se '-es' (teaches)."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com a conjugação correta de 'have':\n\n\"My manager ___ three important meetings today.\"\n(= Meu gerente tem três reuniões importantes hoje.)",
        "opcoes": ["have", "haves", "has", "is having"],
        "resposta": 2,
        "explicacao": "My manager = He/She → a forma irregular de 3ª pessoa é HAS."
      },
      {
        "tipo": "escolha",
        "pergunta": "Complete com o verbo de estudo:\n\n\"Maria ___ medicine at a renowned university.\"\n(= Maria estuda medicina em uma universidade renomada.)",
        "opcoes": ["studys", "study", "studies", "is study"],
        "resposta": 2,
        "explicacao": "Consoante (d) + Y vira -IES com he/she/it → studies."
      },
      {
        "tipo": "escolha",
        "pergunta": "Qual frase está grafada com 100% de precisão?",
        "opcoes": [
          "The company produce high-quality devices.",
          "The company produces high-quality devices.",
          "The company produces high-quality device.",
          "The company is produce high-quality devices."
        ],
        "resposta": 1,
        "explicacao": "'The company' é singular (It) → o verbo exige o 's': produces."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente com a terminação correta:\n\n\"He ___ his teeth three times a day.\"\n(Ele escova os dentes três vezes ao dia. Verbo: brush)",
        "revelacao": "He brushes his teeth three times a day.",
        "explicacao": "Brush termina em -sh → adiciona-se -es (brushes)."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"She ___ to work by bicycle when the weather is good.\"\n(Ela vai para o trabalho de bicicleta quando o tempo está bom. Verbo: go)",
        "revelacao": "She goes to work by bicycle when the weather is good.",
        "explicacao": "Go termina em -o → vira 'goes'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"The technician ___ computer hardware problems.\"\n(O técnico conserta problemas de hardware de computador. Verbo: fix)",
        "revelacao": "The technician fixes computer hardware problems.",
        "explicacao": "Fix termina em -x → vira 'fixes'."
      },
      {
        "tipo": "revelar",
        "pergunta": "Escute e monte mentalmente:\n\n\"Lucas ___ video games with his friends on Friday nights.\"\n(Lucas joga videogame com os amigos nas noites de sexta. Verbo: play)",
        "revelacao": "Lucas plays video games with his friends on Friday nights.",
        "explicacao": "Vogal (a) + y apenas recebe 's' (plays)."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma do verbo 'work' para He:\n\n\"Carlos ___ at an international tech startup.\"",
        "resposta": "works",
        "explicacao": "Carlos = He → works."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma de 3ª pessoa do verbo 'fly' (voar):\n\n\"The pilot ___ to London twice a week.\"",
        "resposta": "flies",
        "explicacao": "Consoante + y vira -ies: flies."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma de 3ª pessoa do verbo 'have':\n\n\"She ___ a great passion for music.\"",
        "resposta": "has",
        "explicacao": "Forma correta de have para She é has."
      },
      {
        "tipo": "digitar",
        "pergunta": "Digite a forma de 3ª pessoa do verbo 'watch':\n\n\"He ___ the morning news every day.\"",
        "resposta": "watches",
        "explicacao": "Terminação -ch recebe -es: watches."
      }
    ]
  }
};

// Lições 11 a 15 serão mescladas na mesma execução
console.log('Carregando parte 1 da Onda 2 (Lições 6 a 10)...');

for (const [id, lessonData] of Object.entries(wave2Lessons)) {
  for (const mod of data.moduli) {
    const idx = mod.lezioni.findIndex(l => l.id === id);
    if (idx !== -1) {
      mod.lezioni[idx] = lessonData;
      console.log(`Lição ${id} (${lessonData.titulo}) enriquecida com sucesso!`);
    }
  }
}

fs.writeFileSync(grammarPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Parte 1 da Onda 2 gravada em data/grammar.json!');
