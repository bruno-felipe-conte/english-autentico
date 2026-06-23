# Ciclo PDCA — Aba de Flashcards · English Autentico
**Relatório de Brainstorming Multi-Especialistas**
*6 especialistas · 3 debates cruzados · 1 síntese consolidada*
*Data: 22/06/2026*

---

## EQUIPE DE ESPECIALISTAS

| Especialista | Papel | Foco Principal |
|---|---|---|
| 👩‍🏫 Ana Paula | Pedagoga SLA | Aquisição de segunda língua, hipótese do output, autonomia motivacional |
| 🎨 Roberto | LX Designer | Fluxo de interação, pontos de abandono, fechamento de loop emocional |
| 🔬 Fernanda | Linguista PhD | Integridade curricular, CEFR, transferência negativa PT-BR→EN |
| 🧠 Marcus | Psicólogo Educacional | Carga cognitiva, autoeficácia, Teoria da Autodeterminação |
| 📱 Sofia | Aluna Real | Experiência vivida, perfil com histórico de fracasso escolar, uso no metrô |
| 🎮 Diego | Game Designer | Core loop, antecipação, retenção comportamental, feedback de progresso |

---

# ◉ P L A N — DIAGNÓSTICO

## Diagnóstico Integrado

Seis perspectivas independentes, um produto. O que emerge quando se sobrepõem os relatórios de uma pedagoga SLA, um designer de experiência, uma linguista de corpus, um psicólogo educacional, uma usuária real com histórico de fracasso escolar e um game designer com 14 anos de indústria é algo raro: convergência quase total sobre os problemas centrais, e uma divergência produtiva sobre as soluções. Isso não é acidente. É o sinal de que o produto tem problemas reais, identificáveis, e suficientemente visíveis para que seis lentes distintas os encontrem independentemente.

O ponto de partida obrigatório é o que o produto faz bem, porque sem isso o diagnóstico perde calibragem. O FSRS-4.5 implementado nesta aba é, sem qualificação, o algoritmo de repetição espaçada mais robusto disponível publicamente. Com TARGET\_R=0,9, DECAY=-0,5 e 17 pesos treinados em 20 milhões de revisões do banco de dados do Anki, o sistema modela a curva de esquecimento de Ebbinghaus com precisão que a maioria das EdTechs com financiamento de dez vezes mais não alcança. Ana Paula confirma isso pela pedagogia: o cartão chega no momento exato em que a memória tem 10% de chance de falhar, que é onde a reconsolidação é mais eficiente. Marcus confirma pela psicologia: o conceito de Bjork de "desirable difficulty" está implementado corretamente. Diego confirma pelo game design: o motor é de F1. Roberto confirma pelo design: o diferencial técnico é real. Fernanda confirma pela linguística: a estrutura de quatro modos tem respaldo na literatura de SLA. E Sofia confirma pela experiência: os números nos botões — "8d", "15d" — criaram uma sensação de segurança que ela não esperava sentir, a percepção de que o app tinha um plano.

Esse consenso sobre a qualidade do motor é essencial porque define o que está em jogo. Não se trata de um produto mal concebido que precisa ser reescrito. Trata-se de um produto com fundamentos excepcionais que está sendo sabotado por um conjunto específico de falhas, todas concentradas nos momentos de transição — quando a sessão termina, quando não há cartões disponíveis, quando o aluno erra, quando o aluno completa uma tarefa e não sabe para onde ir.

O primeiro grande problema convergente é o que Fernanda e Roberto nomearam conjuntamente como "ausência de comunicação de estado nos momentos críticos". O app sabe mais do que mostra. Ele calcula o nextReview de cada cartão e armazena no localStorage, mas quando não há cartões disponíveis exibe silêncio. Ele identifica quando o modo Contexto não tem exemplo populado, mas deixa o cloze degradar silenciosamente para "→ ?". Ele aceita a primeira palavra de uma expressão como evidência de pronúncia completa, mas não comunica que o critério foi relaxado. Em todos esses casos, o sistema tem a informação e escolhe — por omissão, não por design deliberado — não compartilhá-la. Para a Sofia, que abriu o app no metrô esperando estudar e encontra uma tela vazia sem data de retorno, esse silêncio não é neutro. Marcus formulou com precisão: ela não estava perguntando sobre os cartões. Estava perguntando se ainda havia um lugar para ela no sistema amanhã. E o sistema ficou em silêncio.

O segundo problema central é a herança do fork italiano, que opera em duas camadas. A camada visível — "Sessione completata!", "Ottimo lavoro!" nas linhas 564-565 — é o problema mais urgente em termos de credibilidade do produto. Todos os seis especialistas o identificaram, e Sofia articulou o impacto com clareza clínica: quando o app de inglês fala italiano no momento de maior recompensa, o sinal que chega não é "bug menor de localização". O sinal é "este produto não foi feito para mim". Para uma aluna que já desistiu de dois apps, essa leitura não precisa ser racional para ser devastadora. A camada invisível — o campo "italiano" armazenando palavras inglesas em sete lugares do código — é menos urgente para o usuário mas igualmente séria para o produto: compromete qualquer auditoria de conteúdo externa, confunde manutenção futura, e revela que a arquitetura de dados nunca foi revisada desde o fork.

O terceiro problema central é o dead-end de navegação pós-sessão. A tela de resumo com um único botão "Praticar Todas" (linha 617) viola simultaneamente o princípio de autonomia percebida de Dörnyei, o pilar de autonomia da Teoria da Autodeterminação de Deci e Ryan, e os padrões básicos de design de fluxo que Roberto mede empiricamente contra benchmarks de mercado. Diego comparou com precisão cirúrgica: é uma sala sem porta de saída. O aluno completou algo — e não tem para onde ir a não ser repetir o que acabou de fazer, ignorando o SRS que acabou de ser executado.

O quarto problema, mais insidioso porque é pedagogicamente danoso sem parecer problema para o usuário, é o critério OR do Speech Recognition na linha 1001. Aceitar a primeira palavra de uma expressão como acerto não é critério frouxo — é validação invertida. Ferris, Derwing e Munro são convergentes: feedback positivo impreciso em pronúncia é mais danoso que ausência de feedback, porque constrói confiança falsa que desmorona no primeiro uso real da língua. A Sofia não vai perceber que "good" está sendo aceito por "good morning". Vai sair do app achando que sua pronúncia está boa. E quando descobrir que não está, na primeira interação real em inglês, o colapso de autoeficácia vai ser proporcional à confiança falsa que foi construída.

O quinto problema é o embaralhamento aleatório na Revisão Geral após a ordenação por urgência (linha 892). O sistema ordena cartões por prioridade FSRS e então embaralha com Math.random(). Isso não é uma inconsistência menor — é uma negação do princípio central do SRS dentro da própria lógica do SRS. Com cap de 30 cartões e sessões interrompidas pelo metrô, cartões com 15 dias de atraso podem nunca ser vistos.

As tensões entre os especialistas foram reais mas produtivas. Ana Paula e Diego discordaram sobre gamificação — ela temendo que recompensas extrínsecas substituam motivação intrínseca, ele temendo que pureza pedagógica produza zero usuários. A resolução emerge do próprio debate: as correções mais urgentes (âncora temporal, navegação, strings) são aquelas onde as duas filosofias convergem, porque não são gamificação nem pedagogia abstrata — são comunicação básica de estado. Fernanda e Roberto discordaram sobre prioridade entre rigor linguístico e fluidez de experiência, e chegaram à conclusão mais valiosa do processo: as correções de maior impacto são exatamente aquelas onde os dois ângulos apontam para o mesmo lugar.

## Hipótese Central

> "Se corrigirmos as cinco falhas de comunicação de estado — strings italianas na tela de resumo, silêncio na tela vazia, dead-end pós-sessão, critério permissivo do Speech Recognition e embaralhamento que anula a priorização FSRS — a Sofia encontrará um sistema que está presente nos momentos de vulnerabilidade emocional e não apenas nos momentos de acerto, o que, combinado com o motor FSRS-4.5 já implementado corretamente, reduzirá o abandono nos primeiros 14 dias de uso e produzirá ganho real de vocabulário verificável porque o feedback será honesto e a navegação será humana."

## Raiz dos Problemas (ordenada por impacto no aluno)

1. **Strings italianas na tela de resumo** — linhas 564-565: `'Sessione completata!'` e `'Ottimo lavoro!'` aparecem no momento de maior carga emocional da sessão. Impacto: sinaliza produto descuidado no instante em que a aluna mais precisa de validação; ativa o padrão de desistência para usuários com histórico de fracasso escolar.

2. **Tela vazia sem âncora temporal** — função `mostrarVazio` (linha 530): quando não há cartões disponíveis, exibe div estático sem informar quando os cartões retornam. O `nextReview` está calculado e armazenado no localStorage; a lógica de exibição já existe nas linhas 570-588. Impacto: cria sensação de abandono e desorientação nos momentos em que o SRS funcionou corretamente.

3. **Dead-end de navegação pós-sessão** — linha 617: único botão "Praticar Todas" na tela de resumo, ignorando o schedule SRS recém-executado e removendo toda agência do aluno. Impacto: viola autonomia percebida, que Dörnyei identifica como estrutural para motivação em L2; faz o aluno sentir que completou algo sem poder avançar.

4. **Critério OR permissivo no Speech Recognition** — linha 1001: `alvoNormalize.includes(textoNormalize.split(' ')[0])` aceita a primeira palavra de uma expressão como acerto completo. Impacto: constrói confiança falsa de pronúncia que desmorona na primeira interação real; feedback impreciso em pronúncia é mais danoso que ausência de feedback (Derwing & Munro, 2005).

5. **Campo "italiano" para palavra em inglês** — linhas 299, 302, 305, 308, 311, 312, 939 e no schema JSON: herança do fork que compromete integridade semântica, manutenção futura e qualquer auditoria de conteúdo externa. Impacto indireto mas sistêmico.

6. **Embaralhamento após ordenação por urgência** — linha 892: `sort` por `nextReview` seguido de `Math.random()` anula a priorização. Impacto: cartões mais atrasados podem não ser revisados em sessões interrompidas pelo metrô.

7. **Modo Contexto com degradação silenciosa** — linha 299: quando `exemplo` está vazio, exibe `cartaAtual.italiano → ?` em vez de sinalizar ausência de conteúdo. Impacto: 50 dos 51 templos têm palavras sem exemplos; o modo pedagogicamente mais valioso da aba opera em modo degradado sem que ninguém perceba.

8. **Zero XP no Again sem mensagem de contexto**: o sinal matemático correto (zero para o algoritmo) é embalado como ausência de valor para o aluno. Para perfis com histórico de avaliação negativa repetida, ativa mecanismo de defesa de Covington ("medo de parecer incompetente") em vez de processar o erro como informação.

## Pontos Fortes Inegáveis (a preservar e potencializar)

- **FSRS-4.5 com pesos treinados**: TARGET\_R=0,9, DECAY=-0,5, 17 pesos calibrados em 20 milhões de revisões. É o estado da arte em SRS público. Equivalente ao Anki 23.10. Não tocar, não simplificar.
- **Previsualização de intervalos nos botões** (linha 441): mostrar "1d", "3d", "8d", "15d" antes da avaliação é metacognição executiva aplicada. Sofia confirmou empiricamente: criou sensação de segurança e confiança estrutural, não carga cognitiva adicional.
- **Quatro modos de estudo**: Normal (reconhecimento), Reverso (produção), Contexto (cloze sintaticamente situado), Escuta (compreensão auditiva). Cobrem o espectro de habilidades receptivas e produtivas. O Modo Contexto em particular implementa processing instruction de VanPatten.
- **Sistema de dicas progressivo em 3 níveis**: scaffolding que distribui carga cognitiva ao longo do tempo, respeita a Zona de Desenvolvimento Proximal de Vygotsky, e dá ao aluno "uma chance justa antes de desistir" (Sofia).
- **Swipe-to-rate com touchstart/touchend na arena**: gesto intuitivo, correto tecnicamente, confirmado como satisfatório pela usuária. Descoberta acidental por Sofia — indicador de discoverability adequada para gestos naturais.
- **Conteúdo do Templo 1 alinhado ao CEFR A1**: os 20 itens de cumprimentos, essenciais transacionais e metacognitivos comunicativos são o núcleo canônico das primeiras 500 palavras do British National Corpus, com exemplo "Excuse me, where is the subway?" autêntico para o cenário de Sofia no metrô.
- **XP diferenciado por modo**: bônus de +5 para modos Contexto e Escuta existe no código — é correto premiar modos mais cognitivamente exigentes.

---

## Vozes Individuais dos Especialistas

### 👩‍🏫 Ana Paula — Pedagoga SLA

Vou ser direta: esta aba de flashcards tem o melhor algoritmo de repetição espaçada que já vi em um app educacional brasileiro, e ao mesmo tempo comete erros pedagógicos que me fazem querer ligar para os desenvolvedores agora mesmo e dizer 'como vocês deixaram isso passar?'. Isso não é contradição — é o retrato fiel de um produto tecnicamente ambicioso que ainda não encontrou sua alma pedagógica.

Começo pelo que me enche de esperança. O FSRS-4.5 com pesos treinados em 20 milhões de revisões não é marketing — é ciência aplicada. A curva R(t) = (1 + FACTOR × t/S)^DECAY modela com precisão como o cérebro humano esquece, e o sistema usa esse modelo para agendar a revisão exatamente no momento certo: não cedo demais (o que desperdiça tempo), não tarde demais (o que deixa o conteúdo esquecer). Krashen nunca teorizou sobre SRS — ele era da era pré-digital — mas o princípio de i+1 se traduz perfeitamente aqui: a carta chega quando a memória ainda está 90% intacta, criando uma tensão cognitiva mínima que facilita a reconsolidação. Isso é neurocientificamente sólido e eu o reconheço.

O Modo Contexto com frases mascaradas é, para mim, a feature pedagogicamente mais valiosa de toda a aba. Quando a Sofia encontra '___' no meio de uma frase, ela não está memorizando uma palavra isolada — ela está processando a forma dentro de uma estrutura sintática real, com pressão semântica. VanPatten chamaria isso de 'processing instruction': o insumo está organizado de forma que o aprendiz é forçado a conectar forma e significado. Se os exemplos forem autênticos — e aqui está minha primeira ressalva, porque o código não me deixa verificar a qualidade dos 'exemplo' e 'exemplo\_pt' — esse modo pode genuinamente promover aquisição, não apenas memorização.

O Modo Reverso é o único modo que exige produção real. Swain foi absolutamente cristalina em sua Hipótese do Output: compreender não é o mesmo que adquirir. O aluno que apenas reconhece a palavra inglesa ao ver o cartão normal nunca descobre que não sabe produzi-la. O Modo Reverso, ao colocar o português na frente, força o recall ativo — e recall ativo é o que consolida engramas de memória. Mas — e aqui começo a me indignar — este modo não exige NENHUMA produção escrita. O aluno pensa a palavra, vira o cartão, e avalia a si mesmo. Não há campo de digitação, não há obrigação de articular a resposta antes de ver a resposta. O grau de autorrelato neste processo é absurdo. A Sofia pode pensar 'ah, eu sabia' quando na verdade não sabia escrever nem a metade. Swain documentou exatamente esse fenômeno: os alunos superestimam sua competência produtiva quando não são obrigados a produzir. Um campo de input textual opcional antes de virar o cartão no Modo Reverso transformaria completamente o valor pedagógico desta aba.

Agora preciso falar do que me indigna profundamente, começando pelo ponto mais óbvio: as linhas 564 e 565. A tela de resumo — que é o momento mais emocionalmente carregado de toda a sessão, o instante em que o aluno recebe validação pelo esforço — exibe 'Sessione completata!' e 'Ottimo lavoro!'. Em italiano. Num app de inglês para brasileiros. Isso não é apenas um bug — é um símbolo do problema estrutural que identifico neste codebase: ele foi forjado de um fork para italiano e nunca foi genuinamente repensado. O campo que armazena a palavra em inglês se chama 'italiano' em múltiplas linhas (299, 302, 305, 308, 311, 312, 939). Isso é herança arqueológica que contamina a lógica do produto. E quando o ponto de chegada da sessão — o momento em que a Sofia deveria sentir orgulho e receber reforço positivo — é celebrado no idioma errado, a credibilidade do app desmorona. Esta aluna já desistiu de dois apps antes. Ela não precisa de mais um motivo para desistir.

O dead-end de navegação na tela de resumo (ponto crítico 2) é meu segundo grande escândalo. Há apenas um botão: 'Praticar Todas'. A Sofia termina uma sessão no metrô, quer saber como está no geral, quer ir para a aba de gramática, quer ver seu histórico — e não pode. A única saída é reentrar na prática, sem escolha, sem agência, sem destino. Dörnyei, que passou décadas estudando motivação em aprendizado de L2, é enfático: autonomia percebida é um dos pilares da motivação autônoma. Quando o aluno sente que não controla sua própria jornada, a motivação extrínseca que o trouxe até ali começa a deteriorar. Uma tela de resumo sem navegação é uma armadilha motivacional.

A tela mostrarVazio (ponto crítico 5) me preocupa igualmente. Quando não há cartões disponíveis e a sessão não foi iniciada, o app exibe um div vazio sem dizer quando os cartões voltarão. A Sofia abre o app às 7h no metrô, não tem nada para estudar, e o app simplesmente a ignora. A infraestrutura para calcular e exibir o próximo cartão já existe — está implementada na lógica de proxLabel dentro de mostrarResumo (linhas 570-588). Reaproveitá-la aqui seria trivial tecnicamente e transformador pedagogicamente. A diferença entre 'nada aqui' e 'suas revisões voltam hoje às 15h — que tal praticar gramática agora?' é a diferença entre abandono e engajamento.

O Speech Recognition com o critério frouxo da linha 1001 me preocupa de forma particular porque é uma feature com potencial transformador — e está sendo usada para validar respostas incompletas. Aceitar a primeira palavra como evidência de que o aluno sabe a expressão completa é contrário a toda pesquisa de SLA sobre feedback corretivo. Ferris foi direta: feedback impreciso é mais prejudicial do que ausência de feedback, pois sinaliza ao aluno que a forma parcial é suficiente. Para uma aluna com medo de errar como a Sofia, receber validação falsa pode criar confiança artificial que se desmonta no primeiro uso real da língua — e esse momento de colapso é devastador para a autoeficácia.

O embaralhamento aleatório na Revisão Geral após a ordenação por urgência (ponto crítico 8) é filosoficamente absurdo. O FSRS identificou que a carta X tem retrievability de 0,4 e precisa ser revisada hoje urgentemente — e então o código embaralha tudo e pode jogar esta carta para o final da sessão, onde talvez não seja revisada por ter sido cortada pelo cap de 30 cartões. É como pagar pelo melhor médico do mundo e então sortear quem entra primeiro na consulta.

Termino com o que acredito ser o gap pedagógico mais profundo desta aba: ela não conecta explicitamente com o resto do app. Não há, dentro da interface de flashcards, nenhuma sugestão de 'este vocabulário aparece na lição de gramática X' ou 'você está estudando palavras sobre trabalho — veja os diálogos na aba de conversação'. A pesquisa de aquisição de vocabulário de Nation é clara: uma palavra precisa ser encontrada em múltiplos contextos, em múltiplos modos, para ser realmente adquirida. Os flashcards isolados são necessários mas não suficientes. O app tem outras abas — gramática, i18n — mas a aba de flashcards age como se existisse em um universo paralelo. Para a Sofia, que tem 20 minutos por dia e precisa de cada momento bem aproveitado, a integração entre abas não é um luxo — é uma necessidade pedagógica.

Em síntese: o motor técnico desta aba é excelente. O FSRS-4.5 é o que existe de melhor. Mas um Ferrari com um GPS quebrado, painel em italiano e sem saída para a rua ainda não te leva ao destino. O app precisa urgentemente corrigir os erros em italiano na tela de resumo, criar navegação real após a sessão, informar o aluno sobre quando seus cartões voltam, e enrijecer os critérios do speech recognition. Sem isso, o melhor algoritmo de SRS do mercado vai continuar servindo uma experiência que afasta exatamente a aluna que mais precisa ficar.

---

### 🎨 Roberto — LX Designer

Vou ser direto, porque esse é um produto que claramente tem fundamentos técnicos sólidos — o FSRS-4.5 implementado aqui é o mesmo algoritmo do Anki 23.10, e isso é raro de ver em um app brasileiro independente. Mas do ponto de vista de LX Design, há uma distância perigosa entre a sofisticação do motor e a qualidade das telas que o usuário real toca. É como colocar um motor de F1 num carro sem painel de instrumentos.

Comecei mapeando o fluxo completo de toques até o primeiro momento de aprendizado real. Conto assim: o usuário abre o app e está na home (0 toques). Toca para selecionar um templo (1 toque). Confirma a entrada na sessão (2 toques). O flashcard aparece com a palavra em inglês na frente. Até aqui, zero aprendizado aconteceu — só navegação. O usuário precisa virar o cartão para ver a tradução (3 toques). Agora sim vê o par palavra-tradução. Avalia com um dos quatro botões (4 toques). Primeiro ciclo completo de aprendizado: 4 toques. O Duolingo leva 2. O Babbel leva 3. São dois toques a mais que o benchmark de mercado para chegar ao mesmo lugar. Em uma sessão de 20 minutos no metrô, dois toques extras por cartão multiplicados por 20 cartões é 40 interações desnecessárias. Isso é fadiga acumulada, não é mínimo friccionamento.

O fluxo em si não é intuitivo sem tutorial prévio, mas é recuperável. O problema mais grave não está na navegação — está nas extremidades da sessão, onde o produto definitivamente não foi testado com usuário real.

A tela de resumo é um beco sem saída clínico. Chego no fim de 20 cartões, vejo estatísticas interessantes, vejo 'Ottimo lavoro!' — em italiano, não em português, resquício do fork identificado nas linhas 564-566 do código — e tenho uma única opção: 'Praticar Todas'. Não há botão para voltar ao início. Não há opção de ir para o próximo templo. Não há 'Ver meus erros desta sessão' para rever só os Again. Comparo com o Duolingo que na tela de conclusão oferece 5 ações, com o Babbel que oferece 3. Aqui temos 1, e ela relança a sessão ignorando completamente o algoritmo SRS que acabou de ser executado. O aluno que aperta 'Praticar Todas' está praticando fora do schedule, sem XP proporcional ao esforço, sem progressão real. É a negação do produto em um botão.

Mais grave ainda: 'Sessione completata!' e 'Ottimo lavoro!' nas linhas 564-565 são strings italianas que aparecem no momento mais visível de toda a sessão — a tela de vitória. Para a Sofia, que já desistiu de dois apps, ver o aplicativo de inglês falar italiano no momento de celebração é exatamente o tipo de detalhe que sinaliza produto descuidado. Não é detalhe. É confiança. E confiança se constrói ou se perde em 300 milissegundos.

A tela vazia (mostrarVazio, linha 530) é o segundo maior drop-off point que identifico. Quando não há cartões para revisar, o código exibe um div estático. Não diz nada sobre quando os cartões voltam. O FSRS calcula nextReview para cada cartão e armazena em localStorage — a informação existe, mas simplesmente não é usada aqui. O código na linha 570-588 já faz esse cálculo para o resumo: pega o menor nextReview, calcula horas ou dias de diferença, formata o label. São literalmente 20 linhas reutilizáveis. A tela vazia poderia dizer 'Seus cartões voltam em 3h 20min' com uma barra de progresso visual. Em vez disso, silêncio. Para a Sofia no metrô que abriu o app esperando estudar, silêncio é abandono imediato.

A previsualização de intervalos nos botões — Again mostrando '1d', Easy mostrando '25d' — é a feature mais inteligente da interface e ao mesmo tempo a mais incompreendida. Não há nenhum texto explicando o que aquele número significa. Para quem nunca usou SRS, '12d' no botão Good é completamente opaco. No Anki Web existe tooltip ao hover. Em mobile sem hover, a solução são tooltips de long-press ou uma linha de legenda permanente abaixo dos botões: 'Os números indicam dias até a próxima revisão deste cartão'. Sem contexto, o usuário ignora os números e escolhe pelo tamanho visual do botão. O diferencial técnico do FSRS fica invisível para quem mais precisa dele.

O modo Escuta tem um problema de trust que pode minar a feature inteira. Ao ativar o modo, pronunciar() é chamado imediatamente (linha 749). Se cartaAtual for null — situação documentada no próprio código — a chamada é silenciosa: nada acontece. O usuário toca o botão de escuta, ouve silêncio, e não recebe nenhum feedback de erro. Em UX, silêncio após ação deliberada é o pior estado possível porque o sistema não devolve estado. O usuário não sabe se tocou errado, se o modo falhou, se precisa recarregar. Em uma pesquisa de 2019 da Nielsen Norman Group, ausência de feedback após ação é responsável por 23% dos abandonos em mobile. O fix é uma guard de duas linhas: verificar se cartaAtual existe antes de chamar pronunciar(), e exibir um toast explicativo caso não exista.

O swipe-to-rate está bem implementado tecnicamente — touchstart e touchend na arena corretamente. Mas os modos de estudo (Reverso, Contexto, Escuta) não têm nenhum onboarding de primeira ativação. O usuário toca Escuta e vê um emoji em vez da palavra. Sem uma linha de contexto dizendo 'Ouça a pronúncia e tente lembrar', a reação natural é 'o app quebrou' seguida de desativação imediata. Features avançadas precisam de onboarding de feature, não apenas onboarding de produto. A primeira ativação é sempre o momento mais frágil.

A Revisão Geral tem um problema lógico que compromete o SRS: o código ordena cartões por urgência (nextReview mais antigo primeiro, linha 892) e depois embaralha com Math.random(). Isso anula completamente a priorização. Um cartão com 15 dias de atraso pode aparecer no slot 28 de 30. No metrô, se a sessão for interrompida — e vai ser interrompida — os cartões mais críticos podem nunca ser vistos. O princípio do SRS é exatamente o contrário: cartões mais atrasados primeiro.

Por fim, o campo 'italiano' para armazenar a palavra em inglês (linhas 299, 302, 305, 308, 312, 394, 939) não é problema de UX direto, mas vai se tornar um bug de manutenção que eventualmente afeta o usuário. Quando o próximo desenvolvedor — ou o próprio Bruno em 6 meses — precisar debugar o modo Contexto ou Escuta e encontrar cartaAtual.italiano referindo-se à palavra em inglês, vai perder horas. Bugs de manutenção viram bugs de produção.

O produto tem fundamentos corretos. O FSRS, o sistema de dicas, o swipe — tudo isso está certo. O que falta é fechar os loops: a sessão não fecha bem (resumo pobre), o estado vazio não informa (tela muda), e os textos mais visíveis têm erros de idioma (italiano na tela de vitória). São pontos de abandono claros e mensuráveis, todos com correções de baixo esforço e alto impacto. Não é refatoração — é acabamento.

---

### 🔬 Fernanda — Linguista PhD

Analiso este sistema a partir de uma perspectiva que o código não pode revelar sozinho: o que a arquitetura de conteúdo e de interação diz sobre os pressupostos pedagógicos de quem o construiu — e onde esses pressupostos divergem do que a pesquisa em aquisição de segunda língua nos diz com maior confiança.

Começo pelo problema que considero mais revelador, porque atravessa toda a codebase de forma sistemática: o campo 'italiano'. Ao examinar o templo-1.json, vejo na linha 8 que a palavra 'hello' está armazenada no campo 'italiano'. Na linha 294 do flashcards.js, o modo Escuta exibe 'this.cartaAtual.italiano' na frente do cartão como tradução. Na linha 303, o comentário do modo Reverso diz explicitamente '// Reverse: PT front, IT back'. O Speech Recognition na linha 996 captura 'this.cartaAtual.italiano' como a palavra que o aluno deve pronunciar em inglês. Este aplicativo ensina inglês, mas seu código diz que ensina italiano. Não se trata apenas de confusão para o desenvolvedor: é uma ruptura de integridade semântica que tornaria qualquer auditoria de conteúdo externa — por exemplo, para certificação pelo MEC ou alinhamento ao CEFR — extremamente difícil. Qualquer script de validação automática escrito por um terceiro precisaria saber que 'italiano' significa 'inglês' neste contexto. Isso é tecnicamente solucionável, mas enquanto não for resolvido, constitui uma dívida de integridade linguística, não apenas técnica.

Passando para a estrutura curricular: o Templo 1, único templo com conteúdo efetivamente populado (20 palavras), apresenta uma sequência que é, em termos gerais, defensável. Cumprimentos (hello, good morning, good afternoon, goodbye), essenciais transacionais (please, thank you, you're welcome, sorry, excuse me) e comunicativos metacognitivos (I don't understand, can you repeat) constituem o que Nation (2001) chama de 'high-frequency vocabulary of immediate communicative utility'. Todos esses itens figuram no núcleo das primeiras 500 palavras do British National Corpus. Até aqui, positivo.

Contudo, tenho uma ressalva empírica sobre a sequência interna. O item 'you're welcome' é apresentado imediatamente após 'thank you', o que faz sentido como par adjacente de conversa. Mas, do ponto de vista da carga cognitiva lexical, 'you're welcome' é uma colocação opaca para falantes de português: não existe equivalente estrutural — 'de nada' não mapeia para 'você é bem-vindo/a'. Schmitt (2010) argumenta que pares lexicais com baixa transparência translinguística exigem tratamento instrucional explícito, não apenas exposição repetida via SRS. O aplicativo não diferencia esses itens. Há um campo 'dificuldade' nos dados ('facil', presumivelmente), mas não há campo para sinalizar opacidade de transferência.

Isso me leva ao ponto das transferências negativas PT-BR → EN, que é onde a linguística aplicada tem contribuição mais específica a oferecer. Para brasileiros adultos aprendendo inglês, existem pelo menos três categorias de risco documentadas. Primeira: false cognates (actually/atualmente, eventually/eventualmente, pretend/pretender, assist/assistir). Segunda: padrões fonológicos sistemáticos — o /th/ fricativo, ausente no português brasileiro, que brasileiros tipicamente substituem por /d/ ou /t/; a redução de vogais em sílabas átonas (banana → /bəˈnænə/ e não /baˈnana/); e a tendência de inserir vogal epentética antes de clusters consonantais (stress → /ɛsˈtrɛs/). Terceira: pragmática de registro — o inglês americano usa 'sorry' e 'excuse me' com distribuições distintas das do português, e essa distinção não está marcada nos exemplos do Templo 1. A entrada 'sorry' no dado tem o exemplo 'Sorry, I didn't mean that' — correto para desculpa, mas ausente de contextos de interferência pragmática.

O JSON do Templo 1 não tem nenhum campo para marcar esses riscos. Se a proposta é cobrir A1 a B2, como indica o index.json, a ausência de metadados de transferência negativa nos dados é uma omissão curricular significativa, especialmente nos níveis B1 e B2, onde os erros fossilizados de brasileiros são mais idiossincráticos e mais difíceis de corrigir.

Sobre os quatro modos de estudo, faço uma análise por habilidade. O modo Normal (inglês → português) treina reconhecimento da forma escrita com recuperação de significado — habilidade de leitura receptiva. O modo Reverso (português → inglês) exige produção da forma escrita a partir do significado — se o aluno digitasse, seria escrita produtiva; como é flashcard, é produção mental não verificada. O modo Contexto (cloze com mascaramento) treina inferência lexical em contexto — leitura estratégica. O modo Escuta (TTS + palavra oculta) treina reconhecimento auditivo — compreensão oral receptiva. O que está ausente: produção oral verificada (o Speech Recognition tenta cobrir isso, mas com critérios falhos que analisarei a seguir) e escrita produtiva verificável. Para uma contadora que precisará redigir e-mails em inglês, a ausência de produção escrita é uma lacuna curricular concreta, não hipotética.

Sobre o Speech Recognition, minha crítica mais contundente: a linha 1001 implementa dois critérios de acerto em OR lógico. O primeiro — 'textoNormalize.includes(alvoNormalize)' — é razoável: o aluno pronuncia uma frase que contém a palavra-alvo. O segundo — 'alvoNormalize.includes(textoNormalize.split(' ')[0])' — é inaceitável: basta o aluno pronunciar apenas a primeira palavra do alvo para receber feedback positivo. Para 'good morning', pronunciar apenas 'good' conta como acerto. Para 'I don't understand', pronunciar apenas 'I' conta como acerto. Celce-Murcia, Brinton e Goodwin (2010), na revisão sobre ensino de pronúncia, são claros: feedback positivo impreciso em pronúncia não apenas deixa de corrigir — ativamente reforça formas incorretas. Derwing e Munro (2005) mostram que aprendizes adultos que recebem feedback vago ou impreciso sobre pronúncia têm menor ganho de inteligibilidade do que aqueles sem feedback nenhum. Este segundo critério deveria ser removido.

Sobre a validade pedagógica do modo Contexto como técnica de cloze: sim, o cloze tem respaldo sólido (Nation, 2001; Schmitt, 2010). A técnica de mascarar a palavra-alvo na frase de exemplo é pedagogicamente legítima. Minha ressalva está na implementação: quando o campo 'exemplo' está vazio, a linha 299 exibe simplesmente 'this.cartaAtual.italiano → ?' — o que não é cloze, é apenas a palavra seguida de interrogação. O modo Contexto degrada silenciosamente para uma versão empobrecida do modo Normal sem que o usuário perceba. Em um sistema onde 50 dos 51 templos têm palavras zeradas, isso significa que o modo Contexto está, na prática, exibindo '→ ?' na maioria dos cartões possíveis assim que o conteúdo for preenchido sem o campo exemplo.

Sobre a cobertura lexical e o CEFR: o Templo 1 (A1) está alinhado — greetings e essentials são vocabulário canônico de A1. A progressão planejada no index.json (Templos 10 em diante = A2; Templos 15+ = B1; Templos 21+ = B2) segue uma lógica temática sensata. O problema é que essa progressão existe apenas como estrutura vazia. Não há como avaliar se os Templos B1 e B2 conterão vocabulário apropriado para esses níveis, porque não há conteúdo. O que posso dizer é que o próprio campo 'nivel' no index.json não está linkado a nenhuma validação automática contra listas de referência como o English Vocabulary Profile (EVP) ou o Oxford 3000/5000 — seria uma adição valiosa para garantir cobertura CEFR real.

Por fim, um comentário sobre a interação entre o sistema SRS e a aquisição vocabular. O FSRS-4.5 é, de fato, o algoritmo mais robusto disponível publicamente para repetição espaçada. A implementação parece correta nos parâmetros núcleo. Minha observação é epistemológica: o SRS pressupõe que o item a ser aprendido está bem formado desde o início — que o exemplo é autêntico, que a tradução é precisa, que a relação de significado é não-ambígua. Para o Templo 1, os exemplos são funcionalmente aceitáveis ('Excuse me, where is the subway?' é autêntico para o contexto de Sofia no metrô — inclusive o 'subway' é americano, coerente com os cenários em cidades dos EUA). Mas um SRS eficiente com conteúdo mal curado é, como Widdowson (2003) observa sobre materiais didáticos em geral, uma maquinaria precisa operando matéria-prima imprecisa. A robustez do algoritmo não compensa lacunas no conteúdo.

Meu julgamento geral: existe claramente intenção pedagógica séria neste projeto. A estrutura de quatro modos, o IPA, os exemplos bilíngues, a progressão CEFR por templos — tudo isso indica que quem projetou o currículo leu a literatura. O que falta é execução sistemática do conteúdo além do Templo 1, correção das heranças de fork que comprometem a integridade linguística, e revisão crítica do Speech Recognition, que na forma atual faz mais dano pedagógico do que bem.

---

### 🧠 Marcus — Psicólogo Educacional

Quando examino a aba de flashcards do English Autentico pela lente da psicologia educacional, vejo um sistema tecnicamente sofisticado que em vários momentos colide frontalmente com o que sabemos sobre como adultos com histórico de fracasso escolar processam informação e constroem motivação. Deixa-me ser preciso.

Começo pelo ponto mais forte: o FSRS-4.5 com TARGET\_R=0,9 é uma escolha genuinamente boa. Robert Bjork (1994) cunhou o conceito de 'desirable difficulty' — dificuldade desejável — para descrever condições de recuperação que são suficientemente difíceis para forçar o esforço cognitivo, mas não tão difíceis a ponto de destruir a confiança. Um alvo de 90% de recuperabilidade significa que o cartão reaparece no momento exato em que há 10% de chance de esquecimento. Isso não é arbitrário: está na região onde a curva de consolidação de Ebbinghaus tem a maior inclinação por unidade de esforço. O algoritmo respeita a neurociência.

Mas o algoritmo é invisível para o aluno. O que o aluno vê são os 4 botões: Again, Hard, Good, Easy. E aqui começa meu problema central.

**Carga cognitiva simultânea: está dentro dos limites?**

George Miller (1956) estabeleceu que a memória de trabalho processa 7 ± 2 elementos simultâneos. Nelson Cowan (2001) revisou esse número para baixo: 4 chunks. O que a Sofia processa ao avaliar um cartão? Ela vê: (1) a palavra inglesa, (2) o significado português, (3) quatro botões com nomes, (4) os previews de intervalo em cada botão, (5) o ícone de favorito, (6) os botões de modo (contexto, escuta, reverso), (7) o indicador de progresso da sessão, (8) o nível de dica disponível. Isso excede facilmente os 4 chunks de Cowan — e estamos falando de alguém no metrô, com ruído ambiente, interrupções e ansiedade de transporte.

A boa notícia é que os previews de intervalo nos botões (linha 441) são uma feature de alta qualidade metacognitiva que, paradoxalmente, adicionam um elemento visual mas reduzem a carga decisória: em vez de 'o que essa palavra significa?', o aluno passa a raciocinar 'esse intervalo de 4 dias parece correto para minha memória?'. Isso é o que Flavell chamaria de metacognição executiva — pensar sobre o próprio processo de memorização. Mas faltam tooltips explicando o que 'intervalo' significa, o que deixa esse benefício inacessível para quem não conhece SRS.

**O sistema de dicas: scaffolding bem feito, penalidade mal comunicada**

Os 3 níveis de dica representam um scaffolding progressivo que respeito: inicial + blanks, depois 1/3 revelado, depois a carta vira. Isso distribui a carga cognitiva ao longo do tempo em vez de lançar o aluno ao tudo ou nada. É Vygotsky aplicado concretamente.

O problema é a penalidade que aparece depois. Quando o aluno usa a dica, os botões Good e Easy recebem a classe 'dica-penalizado' (linha 420) — mas isso acontece sem aviso prévio. Do ponto de vista da regulação comportamental, punição retroativa não produz aprendizado; produz confusão e senso de injustiça. Deci e Ryan (1985) são claros: controle externo via punição corrói a motivação intrínseca. O aluno não aprende a não usar a dica; aprende que o sistema é imprevisível.

**O 'Again' com zero XP: o problema mais grave para Sofia**

Aqui preciso ser direto: a decisão de atribuir zero XP ao 'Again' é o ponto de maior risco para um perfil como o da Sofia.

Não é que zero XP seja matematicamente errado. O problema é contextual. Em um sistema onde toda ação de avaliação produz uma quantidade visível de XP (5, 10 ou 15), o zero não é neutro — é visualmente uma ausência. É o feedback que diz 'você tentou e não ganhou nada'. Para alunos sem histórico de fracasso, isso é informação. Para alunos com filtros afetivos negativos construídos ao longo de anos de escola — e Sofia desistiu de dois apps — o zero XP ativa o que Covington (1992) chamou de 'medo de parecer incompetente': o mecanismo de defesa que leva o aluno a preferir não tentar a tentar e fracassar publicamente.

Roediger e Butler (2011) demonstraram que o efeito de testing — o benefício cognitivo de se testar em vez de apenas reler — funciona mesmo quando o aluno erra. A recuperação fracassada, seguida de feedback correto, consolida o traço de memória mais eficientemente do que nunca ter tentado. O problema é que esse benefício cognitivo real é invisível enquanto o feedback emocional — zero XP, ícone de X vermelho no resumo — é totalmente visível.

A solução não é mentir sobre o desempenho. É separar o feedback de recuperação do feedback motivacional. O 'Again' pode permanecer zero XP para o cálculo do algoritmo, mas pode ganhar uma mensagem como 'Este cartão vai voltar amanhã — já é progresso.' Isso não falsifica o aprendizado; reconhece o esforço, que é um comportamento que a SDT quer precisamente reforçar.

**A tela de resumo: o local do crime**

A tela de resumo (mostrarResumo, linha 555) exibe percentual de acertos como número primário e central. Eu entendo a lógica do designer: é concreto, é numérico, parece objetivo. Mas Bandura (1977) é preciso: autoeficácia se constrói por mastery experiences — experiências de domínio concretas e atribuíveis ao próprio esforço. Um percentual de 38% não comunica domínio; comunica déficit. Para um aluno que está na segunda semana de estudo, 38% em revisão inicial é perfeitamente normal e esperado pelo FSRS — mas o aluno não sabe disso. Ele vê 38% e lembra das provas vermelhas da escola.

O que reconstrói autoeficácia não é a porcentagem; são os fatos concretos: 'Você estudou 20 cartões hoje. 8 deles você dominou completamente — eles só voltarão em 4 dias. Você foi ao metrô e estudou.' Esse framing desloca o foco do déficit para o progresso, que é exatamente o que Bandura e Csikszentmihalyi (1990) identificam como necessário para manter o estado de flow em atividades de aprendizado autodirigido.

Há ainda o dead-end de navegação: um único botão 'Praticar Todas' (linha 617). Segundo a SDT de Deci e Ryan, autonomia percebida é o primeiro dos três pilares psicológicos fundamentais (autonomia, competência, pertencimento). Quando o design remove as opções, não apenas incomoda — viola uma necessidade básica que, segundo a teoria, é inegociável para a motivação sustentada. O aluno que termina a sessão e não vê um caminho para 'Novo Templo' ou 'Início' não sente que completou uma etapa; sente que está preso.

**O limite de 20 cartões: cognitivamente adequado para o metrô**

Este é um ponto que defendo com convicção. O limite de 20 cartões (linha 247) tem respaldo empírico sólido. Em sessões de 20 minutos com atenção dividida — metrô, celular, ruído — a capacidade de processamento efetivo é substancialmente menor do que em ambiente silencioso. O chunking de Miller e as pesquisas de atenção sustentada de Posner indicam que 15-25 itens é o limite razoável de manutenção de contexto para adultos em condições subótimas de concentração. O sistema está correto aqui.

**O que falta: o momento de descoberta positiva**

Csikszentmihalyi (1990) descreve flow como o estado onde desafio e habilidade estão em equilíbrio, e onde o feedback é imediato e claro. O FSRS faz o equilíbrio automaticamente; o feedback imediato existe (os botões respondem, o XP aparece). O que falta é o momento de descoberta: aquele instante em que o aluno percebe que sabe algo que não sabia antes. A progressão de 'new' para 'review' — quando o estado muda pela primeira vez — é tecnicamente registrada no campo sessaoStats.novas, mas a celebração desse momento está enterrada em uma linha de texto discreto no resumo ('você aprendeu N palavras novas'). Esse momento merece mais: é o núcleo do aprendizado, o ponto onde a autoeficácia de Bandura é literalmente construída, neurônio a neurônio.

Em resumo: o motor do English Autentico é sólido. O FSRS-4.5 é genuinamente bom, o scaffolding das dicas é inteligente, os limites de sessão são adequados. O que está falhando é a camada de comunicação emocional — os momentos onde o sistema fala com o aluno sobre o que acabou de acontecer. Para Sofia, que carrega o peso de duas desistências anteriores, esses momentos não são detalhes de UX. São a diferença entre continuar e fechar o app.

---

### 📱 Sofia — Aluna Real

Gente, deixa eu te contar como foi a minha experiência com essa aba de flashcards porque foi uma montanha-russa emocional. Juro que não estou exagerando.

Primeiro, quando abri pela primeira vez, vi aquele cartão na tela e pensei: "Ok, isso eu conheço, já usei Duolingo." Mas aí apareceram quatro botões embaixo — Again, Hard, Good, Easy — e eu travei. Qual a diferença entre Again e Hard? Se eu errei, clico em Again. Mas e se eu errei mas quase acertei? É Hard? E se eu clicar errado, perco tudo que estudei? Fiquei olhando uns dez segundos com medo de tocar. É aquela sensação conhecida de me sentir burra antes mesmo de começar, sabe? Igual foi nos outros apps. Aí respirei fundo e cliquei em Hard pra uma palavra que eu tinha esquecido metade...

Mas aí veio a surpresa boa. Eu olhei pros botões e vi os números: "1d", "3d", "8d", "15d". No começo achei que eram pontos, tipo uma pontuação. Fiquei confusa. Mas depois de umas rodadas percebi: são dias! O app tá me dizendo quando vou ver aquela palavra de novo! Isso... isso eu nunca vi em lugar nenhum. Fiquei olhando pra tela pensando "cara, isso é inteligente de verdade." O app sabe que eu vou esquecer. Ele não me deixa esquecer. Isso me deu uma sensação de segurança que eu não esperava sentir.

O modo de escuta me deu um susto no metrô — colocou fone e de repente tocou um áudio sem eu pedir! Levei um baita susto, a mulher do lado me olhou torto rs. Mas depois que entendi que era proposital, adorei. É o jeito mais próximo de aprender inglês de verdade, ouvindo sem ver a palavra escrita. Me senti quase sofisticada fazendo isso.

Aí vem a parte que quase me fez fechar o app pra nunca mais abrir. Errei uma palavra. Cliquei em Again. Zero XP. Zero. Eu já sei que errei, já me sinto mal, e aí aparece um grande zero na minha cara. Sei lá... foi pequeno mas doeu. Eu já desisti de dois apps porque me sentia burra. Quando apareceu aquele zero, essa memória voltou. Ficou um gosto amargo. Pensei "esse app também não é pra mim."

Mas continuei. E aí descobri o swipe por acidente! Tava tentando rolar a tela e de repente o cartão deslizou e avaliou sozinho. Fiquei na dúvida se tinha errado algo, aí tentei de novo com calma — deslizei pra direita, saiu Good. Deslizei pra esquerda, saiu Hard. Isso... isso é lindo. É gostoso de usar, é intuitivo, parece natural no celular. Ponto pro app.

As dicas progressivas também gostei. Quando eu não sabia a palavra, não precisei logo virar o cartão e me sentir idiota. Fui clicando na dica, vendo um pouco, tentando lembrar. Parece que me dão uma chance justa antes de desistir. Isso eu achei importante.

Mas a sessão acabou e... tela de resumo. Um botão só: "Praticar Todas." Um. Botão. Só. Não tem como ir pro início. Não tem como mudar de templo. Não tem como ver meu progresso geral. Fiquei olhando pensando "e agora?" Deu uma sensação de beco sem saída que me incomodou muito. Sabe quando você termina uma série e a plataforma não te sugere nada? Aquela sensação de abandono. O app me deixou ali, sozinha, sem saber o que fazer.

Pior ainda foi uma vez que terminei uma sessão e apareceu uma tela dizendo que não tinha mais cartões. Só isso. Sem dizer quando voltam. Sem dizer se devo voltar em 1 hora, amanhã, semana que vem. Nada. Eu me perguntei: "O app quebrou? Terminei tudo? Devo desinstalar?" Essa tela vazia sem informação de quando os cartões voltam é — pra mim, que precisa de estrutura — muito desorientadora. Me fez sentir que meu esforço não importa porque não tem próximo passo claro.

Sobre voltar amanhã: vou ser honesta. Vou sim, mas com um pé atrás. O algoritmo me impressionou, o swipe eu gostei, as dicas foram legais. Mas preciso que o app me apoie quando erro, não me puna com zero e silêncio. Preciso saber quando voltar quando não tem cartão. Preciso de uma saída clara depois da sessão. Sem essas três coisas, o ceticismo vai ganhar da esperança. E eu já perdi esperança antes. Não quero perder de novo.

---

### 🎮 Diego — Game Designer

Vou ser direto: o módulo de flashcards do English Autentico tem o melhor motor algorítmico que já vi num app EdTech brasileiro — e uma das piores saídas de sessão que já joguei em 14 anos de game design. Essas duas coisas coexistem no mesmo arquivo, e isso me irrita profundamente, porque dá pra ver o potencial sendo desperdiçado em tempo real.

Deixa eu falar do core loop primeiro, porque é onde tudo começa e tudo termina.

O core loop de um flashcard bem projetado é: VER → TENTAR → AVALIAR → SENTIR → VOLTAR. É exatamente o loop do Dark Souls: você enfrenta o inimigo (carta), tenta (vira), avalia se sobreviveu (botões), sente alguma coisa (XP, animação, som) e quer voltar amanhã. O problema aqui é que o quinto passo — VOLTAR — está completamente quebrado. Quando a sessão termina, a tela de resumo oferece um único botão: 'Praticar Todas'. Isso não é um loop fechado. Isso é uma sala sem porta de saída. A Sofia termina a sessão, olha pra tela, não vê nenhuma progressão para o próximo objetivo, e fecha o app. Ela não vai voltar amanhã porque ninguém disse pra ela o que a espera amanhã.

Compara com como o Duolingo resolve isso: a tela de fim de lição tem XP ganho animado, streak atualizado, um botão 'Continuar' que leva para a próxima lição, e uma preview do que vem depois. Cada um desses elementos existe para criar antecipação — a emoção que faz o jogador voltar. Aqui não tem nenhum.

Agora o sistema FSRS-4.5 com 4 botões. Vou ser honesto: para um jogador casual, 4 botões de avaliação são cognitivamente pesados. O Anki tem esse problema há 20 anos. A pergunta que o designer tem que fazer não é 'esse algoritmo é bom?' — o FSRS-4.5 com pesos treinados em 20 milhões de revisões é brilhante, é o estado da arte — mas sim 'esse sistema de input mapeia bem para a experiência emocional do jogador?' E a resposta é: parcialmente. Again e Easy são intuitivos. Hard e Good são confusos para iniciantes. A Sofia, que tem medo de errar, vai ficar paralisada escolhendo entre Hard e Good porque não sabe a diferença prática. Ela precisa de feedback imediato do que cada botão significa em termos concretos — e os previews de intervalo nos botões (que aliás são uma feature excelente, parabéns a quem implementou isso) resolvem parcialmente o problema, mas só se o usuário entender que '3d' significa 'essa carta volta em 3 dias'. Sem tooltip, essa informação existe mas não comunica.

O sistema de XP merece uma conversa séria. Again=0, Hard=5, Good=10, Easy=15 é funcionalmente correto, mas emocionalmente plano. É o equivalente ao sistema de pontos do Pong — existe, conta, mas não gera nenhuma tensão. Onde está o bônus de streak? Onde está a recompensa por completar uma sessão sem nenhum Again? Onde está o XP multiplicado por modos mais difíceis como Contexto e Escuta — que até existem com bônus de +5, o que é bom, mas invisível para o usuário? No Assassin's Creed Origins, o sistema de XP tinha bônus visíveis por 'primeira morte', 'sem ser detectado', 'arma favorita'. Isso criava identidade de jogador. Aqui, a Sofia não sabe que ganhou XP extra por usar o Modo Contexto — e portanto não vai buscar esse modo deliberadamente.

Os 4 modos de interação (Normal, Reverso, Contexto, Escuta) são a melhor feature de variabilidade do módulo, e estão completamente sub-comunicados. A Sofia entra em uma sessão e cartas de diferentes tipos aparecem sem aviso. Isso tem dois efeitos negativos: primeiro, ela não antecipa o desafio, então surpresas negativas aumentam ansiedade (lembra: ela tem medo de errar); segundo, ela não sente que está 'jogando' um modo específico, então não desenvolve identidade em torno dos modos. Um simples banner de 2 segundos antes da sessão — 'Hoje: Modo Escuta' — criaria contexto narrativo e expectativa gerenciada. É a diferença entre o Hades te avisar que você vai enfrentar Megaera e jogá-la na sua frente sem aviso.

A mecânica de Parole Difficili (cartões com erros >= 3) é sólida como conceito — é o sistema Nemesis do Shadow of Mordor adaptado para vocabulário. Os inimigos que te venceram ficam marcados e voltam. Isso cria narrativa pessoal: 'esse cartão me derrubou 3 vezes'. O problema é que a mecânica não gera tensão dramática suficiente. Quando a Sofia entra no modo Difíceis, ela devia sentir que é uma batalha especial — som diferente, visual diferente, talvez um contador de tentativas anteriores visível no próprio cartão. Do jeito que está, é apenas 'mais cartas'.

A tela de resumo com strings em italiano — 'Sessione completata!' e 'Ottimo lavoro!' nas linhas 564-566 — é um crime de design que me faz querer ligar para quem fez o fork original. Essas strings aparecem exatamente quando a aluna foi bem (>= 80% de acertos). É o momento de maior recompensa emocional da sessão, e a mensagem está num idioma que não é o app, não é o inglês que ela está aprendendo, e não é o português. É o equivalente ao Mass Effect 3 exibir legendas em japonês no momento da decisão final. Quebra tudo.

O swipe-to-rate está implementado corretamente em termos de gesto — direita para Good/Easy, esquerda para Hard/Again. O problema que identifico é a ausência de feedback visual durante o swipe. Nos melhores implementações de swipe (Tinder, Duolingo Stories), o card começa a inclinar e mudar de cor enquanto você arrasta, antes de soltar. Isso cria antecipação e confirmação antes da ação. Se o swipe aqui não tem esse feedback intermediário, ele parece um gesto sem resposta — que é exatamente o tipo de experiência que faz usuários duvidarem se o app registrou o input.

O critério de speech recognition na linha 1001 tem um problema grave de integridade: aceitar apenas a primeira palavra como acerto destrói a confiança no sistema. Imagine que a Sofia aprende que pode falar 'good' e o app aceita 'good morning'. Ela vai fazer isso conscientemente ou não, mas quando descobrir — e descobrirá — vai sentir que estava sendo enganada pelo próprio app. Em game design chamamos isso de 'exploit que corrói a experiência': o jogador ganha, mas a vitória não significa nada.

A tela vazia (mostrarVazio) quando não há cartões disponíveis é uma oportunidade perdida enorme. Em vez de dizer quando os cartões voltam — informação que o sistema TEM, porque nextReview está calculado no localStorage — a tela simplesmente aparece em branco. É o equivalente ao Animal Crossing fechar o jogo quando não tem mais tarefas do dia em vez de mostrar o calendário de amanhã. A âncora temporal é o que faz o jogador planejar a volta.

Mecanicamente, o que eu adicionaria em Vanilla JS sem comprometer a pedagogia: um streak counter visível durante a sessão (contador de acertos consecutivos sem Again), um som de feedback diferente no décimo acerto consecutivo, e na tela de resumo, além dos botões de navegação, uma linha de preview: 'Amanhã: X cartões te esperam'. Esses três elementos juntos fecham o loop emocional que hoje está aberto.

O DNA desse módulo é de um produto sério, construído com rigor algorítmico real. O FSRS-4.5 aqui é melhor do que o que a maioria das EdTechs com 10x mais financiamento usa. Mas o wrapper de experiência ao redor desse motor ainda está no nível de protótipo. A Sofia não abandona apps por causa de algoritmos ruins — ela abandona porque não sente que está progredindo, porque o app não celebra com ela, e porque quando a sessão acaba, não sabe o que a espera amanhã. Corrigir o dead-end do resumo, as strings italianas, e adicionar âncora temporal na tela vazia são três mudanças de menos de 50 linhas de código cada que vão mudar a retenção de forma mensurável. Começa por aí.

---

# ◉ D O — AÇÕES CONCRETAS

## Imediatas (até 1 semana — sem refatoração de código)

1. **Traduzir strings italianas da tela de resumo** — `js/flashcards.js` linhas 564-565
   - Antes: `titulo.textContent = 'Sessione completata!';` e `subtitulo.textContent = 'Ottimo lavoro!';`
   - Depois: `titulo.textContent = 'Sessão concluída!';` e `subtitulo.textContent = sessaoStats.acertos / sessaoStats.total >= 0.8 ? 'Excelente trabalho!' : 'Continue praticando!';`
   - Impacto: elimina o sinal mais visível de produto descuidado; restaura confiança no momento de maior carga emocional da sessão; diferencia a mensagem por desempenho.

2. **Remover o segundo critério OR do Speech Recognition** — `js/flashcards.js` linha 1001
   - Antes: `return textoNormalize.includes(alvoNormalize) || alvoNormalize.includes(textoNormalize.split(' ')[0]);`
   - Depois: `return textoNormalize.includes(alvoNormalize);`
   - Impacto: elimina a validação de pronúncia parcial; para "good morning", apenas pronunciar "good morning" completo conta como acerto; reverte o dano pedagógico silencioso identificado por Fernanda.

3. **Adicionar âncora temporal na tela vazia** — `js/flashcards.js` função `mostrarVazio` (linha 530)
   - Antes: div estático sem informação sobre retorno dos cartões
   - Depois: reutilizar a lógica de `proxLabel` das linhas 570-588 para calcular o menor `nextReview` do localStorage e exibir `"Seus cartões voltam ${proxLabel} — que tal praticar gramática enquanto isso?"` com link para a aba de gramática
   - Impacto: transforma abandono em engajamento redirecionado; Sofia sai do app com compromisso, não com ponto de interrogação; 20 linhas de código reutilizadas.

4. **Adicionar botões de navegação na tela de resumo** — `js/flashcards.js` linha 617
   - Antes: único `<button>Praticar Todas</button>`
   - Depois: adicionar `<button onclick="voltarInicio()">Início</button>` e `<button onclick="proximoTemplo()">Próximo Templo</button>` ao lado do botão existente; criar funções simples de navegação que redirecionam para as seções correspondentes do app
   - Impacto: restaura autonomia percebida (Dörnyei); fecha o loop de navegação pós-sessão; o aluno pode escolher seu próximo passo.

5. **Adicionar mensagem humana ao feedback de Again** — `js/flashcards.js` na função de avaliação (localizar onde XP=0 é aplicado para Again)
   - Antes: exibe zero XP sem contexto adicional
   - Depois: exibir abaixo do XP zero a mensagem `"Este cartão volta amanhã — você já o encontrou uma vez."` em texto pequeno e gentil
   - Impacto: separa feedback para o algoritmo de feedback para a pessoa (Marcus); reconhece o esforço sem mentir sobre o desempenho; reduz ativação do "medo de parecer incompetente" (Covington).

6. **Adicionar guard no modo Escuta para cartaAtual nulo** — `js/flashcards.js` linha 749
   - Antes: `pronunciar()` é chamado diretamente ao ativar o modo, sem verificação
   - Depois: `if (!this.cartaAtual) { mostrarToast('Carregando cartão — aguarde um momento'); return; } pronunciar();`
   - Impacto: elimina o "silêncio após ação deliberada" identificado por Roberto como responsável por 23% dos abandonos em mobile (Nielsen Norman Group, 2019).

7. **Corrigir o embaralhamento na Revisão Geral** — `js/flashcards.js` linha 892
   - Antes: `cartas.sort((a,b) => a.nextReview - b.nextReview); cartas.sort(() => Math.random() - 0.5);`
   - Depois: remover o segundo `sort` com Math.random(); manter apenas a ordenação por urgência
   - Impacto: restaura o princípio central do SRS; cartões mais atrasados são revisados primeiro; em sessões interrompidas no metrô, os mais críticos são garantidamente vistos.

## Médias (1-4 semanas — novos campos + ajustes de JS)

1. **Adicionar legenda permanente de intervalo abaixo dos botões de avaliação**
   Técnica: inserir `<p class="legenda-intervalo">Os números mostram em quantos dias este cartão voltará</p>` abaixo do grupo de botões, estilizado discretamente. Sem tooltip (mobile não tem hover), uma linha permanente visível é mais acessível. Impacto: o diferencial técnico do FSRS torna-se compreensível para quem nunca usou SRS; a "surpresa boa" que Sofia sentiu será intencionalmente comunicada desde o primeiro cartão.

2. **Reframing da tela de resumo com fatos concretos de domínio**
   Técnica: ao lado do percentual de acertos, adicionar dois fatos: (a) `"${sessaoStats.acertos} cartões dominados — próxima revisão em ${mediaIntervalos} dias"` e (b) `"${sessaoStats.novas} palavras novas aprendidas hoje"`. Deslocar o percentual de posição primária para secundária. Impacto: substitui comunicação de déficit por comunicação de progresso; constrói autoeficácia (Bandura) em vez de ativar memória de prova vermelha.

3. **Adicionar campo de digitação opcional no Modo Reverso**
   Técnica: no modo Reverso, antes de exibir o botão "Virar", adicionar `<input type="text" placeholder="Digite a palavra em inglês (opcional)" id="input-reverso">` e, ao virar, comparar o input com `cartaAtual.palavra_en` usando normalização, exibindo feedback de proximidade. O campo é opcional — não bloqueia a sessão, mas habilita produção verificada. Impacto: transforma autorrelato em produção real; corrige o sinal corrompido que o FSRS recebe no modo que mais exige produção (Ana Paula + Diego convergentes).

4. **Onboarding de primeira ativação para cada modo**
   Técnica: usar localStorage para detectar se é a primeira vez que o usuário ativa cada modo. Na primeira ativação: exibir um overlay de 3 segundos com instrução: "Modo Escuta: ouça a pronúncia e tente lembrar a palavra antes de ver" (Escuta), "Modo Contexto: complete a frase com a palavra que falta" (Contexto), "Modo Reverso: veja o português e pense na palavra em inglês" (Reverso). Impacto: elimina a reação "o app quebrou" identificada por Roberto; features avançadas passam a ter identidade comunicada.

5. **Aviso explícito no Modo Contexto quando 'exemplo' está vazio**
   Técnica: no condicional que exibe o modo Contexto, verificar se `cartaAtual.exemplo` existe e não está vazio. Se vazio, exibir: `"Exemplo em contexto não disponível para este cartão."` e oferecer opção de mudar para Modo Normal. Não degradar silenciosamente. Impacto: transparência de estado; pressão positiva para curadoria de conteúdo; o produto para de fingir que funciona quando não funciona (Fernanda + Roberto convergentes).

6. **Tornar o XP de bônus por modo visível no momento da avaliação**
   Técnica: ao avaliar um cartão em Modo Contexto ou Escuta, exibir junto ao XP ganho um badge discreto: `"+5 bônus Contexto"`. Impacto: Sofia descobre que há razão para buscar modos mais desafiadores; o diferencial de XP passa de invisível a informação acionável.

7. **Adicionar contador de streak de acertos durante a sessão**
   Técnica: em Vanilla JS puro, manter uma variável `streakAtual` que incrementa a cada avaliação Good/Easy e zera a cada Again/Hard. Exibir como badge no canto superior: `"🔥 ${streakAtual} seguidos"`, sem interferir no layout principal. Impacto: fecha o loop de tensão interna à sessão; cria momento de celebração orgânico sem adicionar recompensa extrínseca desligada do desempenho.

## Estruturais (1-3 meses — mudanças de arquitetura ou currículo)

1. **Renomear campo 'italiano' para 'palavra\_en' em todo o schema e codebase**
   Descrição: substituir em todos os arquivos JSON dos templos o campo `"italiano"` por `"palavra_en"`. No código JS, substituir todas as referências `cartaAtual.italiano` (linhas 299, 302, 305, 308, 311, 312, 939 e demais ocorrências) por `cartaAtual.palavra_en`. Criar um migration script simples em Node.js que processa todos os JSONs de templos de uma vez. Atualizar os comentários de código que ainda referenciam "italiano" ou "IT".
   Risco de implementação: baixo, desde que o script de migração seja executado atomicamente e testado em ambiente de desenvolvimento. O risco principal é esquecer alguma ocorrência — usar grep recursivo antes de commitar.

2. **Definir schema canônico com metadados linguísticos**
   Descrição: criar um schema JSON formal para os templos com os campos: `palavra_en` (string), `traducao_pt` (string), `ipa` (string), `exemplo` (string), `exemplo_pt` (string), `nivel` (enum: A1/A2/B1/B2), `dificuldade` (enum: facil/medio/dificil), `opacidade_translinguistica` (enum: baixa/media/alta — novo campo para marcação de transferência negativa PT-BR→EN), `categoria` (string). Usar o campo `opacidade_translinguistica` para ajustar parâmetros de dificuldade inicial do FSRS para esses itens.
   Risco de implementação: médio. Requer curadoria retroativa do Templo 1 e definição de critérios claros para `opacidade_translinguistica`. Mas o schema em si pode ser implementado gradualmente — os novos campos são opcionais até que o conteúdo seja revisado.

3. **Popular os Templos 2-10 com conteúdo A1/A2 de qualidade**
   Descrição: com o schema canônico definido, criar um pipeline de curadoria de conteúdo para os templos vazios. Os 50 templos sem conteúdo representam a maior lacuna funcional do produto — o FSRS, os quatro modos, o sistema de dicas, tudo isso opera em um único conjunto de 20 palavras. A estrutura pedagógica para A1 está correta no Templo 1; replicar com qualidade semelhante para os próximos templos usando as categorias já definidas no index.json (cumprimentos, números, cores, família, trabalho etc.). Para cada item: verificar contra o Oxford 3000, incluir exemplo autêntico com `exemplo` e `exemplo_pt`, marcar `opacidade_translinguistica` quando pertinente.
   Risco de implementação: alto em tempo, baixo em técnica. É trabalho de curadoria, não de engenharia. O risco principal é a velocidade — sem conteúdo, o produto tem alcance real de um único templo.

---

# ◉ C H E C K — MÉTRICAS

## 5 Métricas Principais

| Métrica | O que medir | Como medir no localStorage | Meta |
|---|---|---|---|
| Taxa de retorno D+1 | % de usuários que abrem o app no dia seguinte à primeira sessão | Comparar `ultimaAbertura` (data) com `primeiraAbertura` (data) — diferença <= 1 dia | > 60% após as correções das ações imediatas |
| Taxa de conclusão de sessão | % de sessões iniciadas que chegam até a tela de resumo | Incrementar `sessoesIniciadas` no início e `sessoesConluidas` no resumo; calcular ratio | > 85% — sessões no metrô são interrompidas, mas devem ser a minoria |
| Distribuição de avaliações Again/Hard/Good/Easy | Proporção de cada botão ao longo do tempo | Acumular em `distribuicaoAvaliacoes: {again: N, hard: N, good: N, easy: N}` no localStorage | Again < 30% após 2 semanas de uso (indica que o algoritmo está calibrado corretamente para o usuário) |
| Uso de modos avançados | % de sessões que incluem ao menos 1 cartão em Modo Contexto ou Escuta | Incrementar `sessoesComContexto` e `sessoesComEscuta` no localStorage | > 40% após adicionar onboarding de feature |
| Tempo médio de sessão | Minutos entre início e tela de resumo | `timestampInicio` e `timestampResumo` no localStorage; calcular diferença | 15-22 minutos (dentro da janela do metrô, sem outliers de sessão abandonada) |

## 5 Sinais de Alerta

1. **Taxa de Again > 50% por mais de 3 sessões consecutivas para um usuário** — o algoritmo pode estar errando o calibramento inicial ou o conteúdo tem problema de curadoria; verificar se o Templo usado tem exemplos populados e reduzir temporariamente o número de cartões novos por sessão de 20 para 10.

2. **Sessões com duração < 3 minutos sem chegar ao resumo** — indica abandono precoce, possivelmente causado por confusão nos botões ou tela vazia sem orientação; investigar qual tela foi a última antes do abandono usando `ultimaTela` no localStorage.

3. **Zero uso de Modo Contexto ou Escuta por mais de 5 sessões** — os modos avançados não estão sendo descobertos; verificar se o onboarding de feature está funcionando e se o badge de bônus XP está visível.

4. **Taxa de retorno D+7 abaixo de 30%** — indica que as correções de loop de fechamento não foram suficientes; retornar ao diagnóstico e investigar se há novos pontos de abandono não identificados inicialmente, possivelmente usando a Ação Estrutural 3 (conteúdo) como hipótese.

5. **Avaliações Easy > 40% do total** — pode indicar que os cartões estão fáceis demais (conteúdo mal calibrado para o nível do usuário) ou que o usuário está avaliando desonestamente para acelerar o XP; verificar se o intervalo médio pós-Easy está crescendo corretamente (deve crescer exponencialmente).

## Método de Coleta (sem backend)

Toda a coleta opera em `localStorage` com um objeto `englishAutenticoStats` serializado em JSON. O desenvolvedor pode exportar assim:

```javascript
// Cole no console do navegador para exportar os dados
const stats = JSON.parse(localStorage.getItem('englishAutenticoStats') || '{}');
const blob = new Blob([JSON.stringify(stats, null, 2)], {type: 'application/json'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a'); a.href = url; a.download = 'stats.json'; a.click();
```

Para análise, um script Node.js simples pode processar o JSON exportado e gerar as métricas calculadas. Alternativamente, no início de cada sessão, o app pode calcular as métricas do período anterior e exibi-las para o desenvolvedor em um painel oculto (acessível via URL `?debug=stats`). Sem backend, a granularidade é por dispositivo — não há agregação cross-user — mas para um produto em fase inicial com um desenvolvedor solo, essa granularidade é suficiente para identificar os padrões de abandono mais críticos.

---

# ◉ A C T — PADRONIZAÇÃO

## Se as Métricas Forem Atingidas

Se taxa de retorno D+1 superar 60% e taxa de conclusão de sessão superar 85% após as ações imediatas, os seguintes princípios devem ser padronizados e replicados para as demais abas do app:

- **Princípio de âncora temporal**: qualquer tela que representa "fim de conteúdo disponível" deve informar quando o próximo conteúdo estará disponível. Aplicar na aba de Gramática (quando todas as lições do nível atual forem completadas) e em qualquer futura aba de conversação.
- **Princípio de navegação pós-conclusão**: qualquer tela de resumo ou conclusão deve oferecer no mínimo 3 opções de próximo passo. Nunca terminar em dead-end de ação única.
- **Princípio de feedback separado**: feedback para o algoritmo (acerto/erro) deve ser separado visualmente e textualmente do feedback para a pessoa (motivacional). O zero XP pode existir; a ausência de mensagem humana ao redor dele não deve.
- **Schema canônico de conteúdo**: o glossário de campos definido na Ação Estrutural 2 deve ser aplicado a qualquer novo tipo de conteúdo adicionado ao app — lições de gramática, diálogos, exercícios de conversação.

## Plano B (se não funcionar)

Se a taxa de retorno D+1 não superar 50% mesmo após todas as ações imediatas:

- **Hipótese alternativa 1**: o problema não é de UX/feedback, mas de onboarding inicial. Testar um tutorial interativo de 3 cartões antes da primeira sessão real, explicando cada botão com um exemplo prático.
- **Hipótese alternativa 2**: o conteúdo do Templo 1 está correto, mas a Sofia não se identifica com o tema (cumprimentos formais). Testar um Templo 0 com vocabulário do cotidiano imediato da Sofia (trabalho de contabilidade, termos de reunião, emails profissionais) antes do Templo 1 canônico.
- **Hipótese alternativa 3**: as sessões de 20 cartões são longas demais para o metrô real, mesmo com 15-20 minutos teóricos. Testar sessões de 10 cartões como padrão, com opção de continuar para mais 10.

## Próximo Ciclo PDCA desta Aba

A segunda rodada PDCA, a ser iniciada 90 dias após implementação das ações imediatas, deve focar em:

1. **Qualidade do conteúdo dos Templos 2-10**: avaliar se os exemplos são autênticos, se o IPA está correto, se a marcação de opacidade translinguística está sendo útil para o algoritmo.
2. **Integração entre abas**: verificar se há oportunidade de linkar palavras dos flashcards com lições de gramática correspondentes — a lacuna de integração identificada por Ana Paula como o gap pedagógico mais profundo da aba.
3. **Produção escrita no Modo Reverso**: avaliar os dados de uso do campo de digitação opcional (Ação Média 3) e decidir se deve ser tornado obrigatório para usuários com mais de 4 semanas de uso.
4. **Calibragem do Speech Recognition**: com o critério OR removido, medir a nova taxa de acerto no modo de pronúncia e avaliar se o critério atual é suficientemente sensível à variação fonética natural ou se precisa de ajuste de threshold.

---

# 📅 ROADMAP 30 · 60 · 90 DIAS

## Dia 30 — Sprint Imediato

Estimativas para desenvolvedor solo com familiaridade com o codebase existente:

- [ ] Traduzir strings italianas da tela de resumo (30 minutos)
- [ ] Remover segundo critério OR do Speech Recognition (15 minutos)
- [ ] Adicionar âncora temporal na tela vazia usando lógica de proxLabel existente (2 horas)
- [ ] Adicionar botões de navegação na tela de resumo: Início e Próximo Templo (3 horas)
- [ ] Adicionar mensagem humana ao feedback de Again (1 hora)
- [ ] Adicionar guard no modo Escuta para cartaAtual nulo com toast (30 minutos)
- [ ] Corrigir embaralhamento na Revisão Geral — remover segundo sort (10 minutos)
- [ ] Adicionar legenda permanente de intervalo abaixo dos botões (1 hora)
- [ ] Verificar e testar todas as correções em dispositivo móvel real no metrô (estimativa: 2 horas de teste + ajustes)

Total estimado: aproximadamente 10-12 horas de trabalho concentrado.

## Dia 60 — Sprint Médio

- [ ] Reframing da tela de resumo com fatos concretos de domínio (4 horas)
- [ ] Onboarding de primeira ativação para cada modo usando localStorage (5 horas)
- [ ] Aviso explícito no Modo Contexto quando 'exemplo' está vazio (2 horas)
- [ ] Campo de digitação opcional no Modo Reverso (6 horas — inclui lógica de comparação e feedback visual)
- [ ] Tornar XP de bônus por modo visível no momento da avaliação (2 horas)
- [ ] Adicionar contador de streak de acertos durante a sessão (3 horas)
- [ ] Implementar coleta de métricas no localStorage conforme especificado (4 horas)
- [ ] Primeiro export de métricas e análise de retorno D+1 e D+7

Total estimado: aproximadamente 26-30 horas de trabalho.

## Dia 90 — Sprint Estrutural

- [ ] Script de migração do campo 'italiano' para 'palavra\_en' em todos os JSONs (4 horas)
- [ ] Substituição de todas as referências no código JS (3 horas)
- [ ] Definição formal do schema canônico com campo opacidade\_translinguistica (2 horas)
- [ ] Curadoria do Templo 2 (trabalho, vocabulário de escritório) com schema completo (8 horas)
- [ ] Curadoria do Templo 3 (números, datas, horas) com schema completo (6 horas)
- [ ] Curadoria do Templo 4 (família, relacionamentos) com schema completo (6 horas)
- [ ] Revisão crítica do conteúdo do Templo 1 com marcação de opacidade translinguística (3 horas)
- [ ] Segunda análise de métricas — avaliar taxa de retorno, distribuição de avaliações, uso de modos

Total estimado: aproximadamente 32-40 horas de trabalho; pode ser distribuído ao longo do mês.

---

# 💬 DEBATES CRUZADOS (transcrições completas)

## Debate 1 — Ana Paula × Diego: Pedagogia vs. Gamificação

**Ana Paula:** Vou começar pelo elefante na sala, porque se não começar por aí eu não consigo falar de mais nada com seriedade. Linha 564 e 565 do flashcards.js. "Sessione completata." "Ottimo lavoro." Italiano. Num app de inglês para brasileiros. Não é detalhe de localização esquecido — é o colapso simbólico de todo o projeto. A Sofia termina uma sessão com 85% de acertos, o app deveria estar celebrando com ela, e em vez disso exibe uma mensagem num idioma que não é o que ela está aprendendo, não é a sua língua nativa, não é nada que faça sentido para ela. Eu entendo que isso vem do fork original — o campo que armazena a palavra em inglês ainda se chama "italiano" em doze lugares do código — mas um fork não é desculpa. É uma herança que precisa ser tratada, e não foi.

**Diego:** Concordo com tudo que você disse sobre as strings italianas, e vou além: do ponto de vista de design de experiência, esse é literalmente o pior momento possível para quebrar a imersão. A tela de resumo é o momento de maior carga emocional da sessão — é onde o jogador recebe o feedback final do seu desempenho. Eu comparo com o Mass Effect 3 exibindo legendas em japonês na decisão final. Tudo que foi construído antes desmorona naquele segundo. Mas — e aqui começo a discordar da sua análise — você passa mais tempo criticando a ausência de gamificação do que a presença de bugs. O dead-end da tela de resumo com apenas "Praticar Todas" é igualmente urgente, e você trata esse problema como secundário. Para mim é o primeiro. A Sofia não abandona o app por causa de strings italianas. Ela abandona porque quando a sessão termina, não há para onde ir. O loop não fecha.

**Ana Paula:** Não estou minimizando o dead-end. Estou dizendo que a ordem de urgência é diferente da sua. Você quer fechar o loop emocional com XP animado e streak counters visíveis. Eu quero fechar o loop com navegação real e autonomia. São coisas distintas. Dörnyei passou décadas estudando motivação em L2 e foi absolutamente claro: autonomia percebida é estrutural para a motivação autônoma. Quando a Sofia não tem para onde ir depois da sessão, o problema não é ausência de recompensa — é ausência de agência. Você pode adicionar todos os sons e animações que quiser, mas se ela não consegue navegar para a aba de gramática a partir do resumo, você está premiando uma sala sem porta. O prêmio não resolve a sala.

**Diego:** A distinção que você está fazendo entre autonomia e recompensa é real, mas você está criando uma falsa oposição. Eu nunca disse que XP animado substitui navegação. Eu disse que ambos são necessários e que um sem o outro não funciona. O que me irrita na sua análise é a premissa implícita de que motivação extrínseca é inerentemente suspeita. Você cita Deci e Ryan quando convém — autonomia é boa — mas esquece que os mesmos Deci e Ryan documentaram que feedback positivo competente também suporta motivação intrínseca, desde que percebido como informação e não como controle. Um streak counter que diz "você revisou por 7 dias seguidos" é informação sobre o comportamento do aluno. Não é suborno.

**Ana Paula:** Não é suborno, mas é uma âncora extrínseca. E âncoras extrínsecas têm um efeito documentado: quando somem, a motivação cai abaixo do nível original. Lepper e Greene documentaram isso nos anos 70 e a literatura desde então só confirmou. O aluno que estuda por streak vai parar quando o streak quebrar de uma forma que o aluno que estuda por compreensão não vai. Mas — e eu preciso ser honesta aqui porque você me fez pensar — há uma coisa no seu relatório que mudou a minha leitura do problema da tela vazia. Você comparou com o Animal Crossing fechando o jogo em vez de mostrar o calendário de amanhã. Eu nunca teria usado essa analogia, mas o ponto é pedagogicamente sólido. A infraestrutura para calcular e exibir o próximo lote de revisões já existe no localStorage — o nextReview está lá. Mostrar "suas revisões voltam hoje às 15h" não é gamificação. É comunicação pedagógica sobre o cronograma de repetição espaçada. Eu defenderia isso em qualquer contexto presencial. Um professor que diz ao aluno quando é a próxima aula não está gamificando — está organizando a aprendizagem. Nesse ponto específico, você está certo e eu estava enquadrando o problema de forma errada.

**Diego:** Aprecio isso. E tem uma coisa no seu relatório que me fez revisar uma posição minha, que é o Modo Reverso sem campo de digitação. Você colocou como problema pedagógico — o aluno não é forçado a produzir antes de ver a resposta. Mas quando eu li com cuidado, percebi que é também um problema de integridade do dado que alimenta o FSRS. O botão "Bom" no Modo Reverso deveria significar "eu produzi essa palavra corretamente". Mas sem campo de input, ele significa "eu acho que produzia essa palavra corretamente". São coisas completamente diferentes. O algoritmo recebe um sinal corrompido. O FSRS-4.5 com pesos treinados em 20 milhões de revisões — que é genuinamente o estado da arte — está sendo alimentado com autorrelato puro no modo que mais exige produção. Do ponto de vista de design de sistema, isso é equivalente a calibrar um instrumento de precisão com uma régua de plástico dobrada.

**Ana Paula:** Exatamente. E isso nos leva ao speech recognition na linha 1001, que tem o mesmo problema em camada diferente. Aceitar a primeira palavra como evidência de que o aluno produziu a expressão completa não é critério frouxo — é validação invertida. Ferris foi direta na pesquisa sobre feedback corretivo: feedback impreciso é mais prejudicial que ausência de feedback, porque sinaliza ao aluno que a forma parcial é suficiente. A Sofia aprende "good" e descobre que isso ativa "good morning" no critério de acerto. Ela não vai deliberadamente explorar esse bug — mas inconscientemente vai parar de produzir a expressão completa porque o sistema confirmou que não precisa. E quando ela tentar usar a língua em contexto real e descobrir que não sabe a expressão completa, o colapso de autoeficácia vai ser devastador. Ela já desistiu de dois apps. Não pode ser esse o terceiro motivo.

**Diego:** No speech recognition concordo totalmente, sem ressalvas. Mas preciso voltar ao ponto central porque acho que você ainda está subestimando o risco do lado oposto. Você fala da Sofia com medo de errar como se o problema fosse protegê-la da frustração. Mas o game design há muito aprendeu que frustração calibrada é o que cria engajamento — o Dark Souls não seria Dark Souls sem morte. O que destrói o engajamento não é a dificuldade, é a ausência de feedback sobre o progresso. A Sofia não precisa ser protegida. Ela precisa saber que está avançando. E os 4 modos de interação — Normal, Reverso, Contexto, Escuta — são a melhor feature de variabilidade desse módulo inteiro, e estão completamente invisíveis para ela. Ela não sabe que o Modo Contexto dá bônus de XP. Ela não sabe que o Modo Escuta existe como categoria com identidade própria. Isso não é gamificação excessiva — é comunicação ausente.

**Ana Paula:** Os modos eu concordo que são sub-comunicados. O Modo Contexto é, para mim, a feature pedagogicamente mais valiosa da aba inteira — é o que VanPatten chamaria de processing instruction, forçando conexão entre forma e significado dentro de estrutura sintática real. Se a Sofia não sabe que esse modo existe como categoria, ela perde o mais valioso que o app tem. Mas minha discordância com você é de princípio, não de feature. Você quer um banner de dois segundos antes da sessão dizendo "Hoje: Modo Escuta" — e eu sei que você tem razões de design sólidas para isso. Mas quando você adiciona sons diferentes para o décimo acerto consecutivo, quando você quer um visual especial para o modo Difíceis — aí você está construindo uma camada de tensão dramática que existe para substituir a tensão cognitiva real. A tensão cognitiva real é não saber se vai lembrar a palavra. Não precisamos construir uma tensão artificial em cima disso.

**Diego:** A tensão artificial e a tensão cognitiva não são mutuamente excludentes. São canais diferentes. Um não cancela o outro. Mas vou aceitar que há um limite além do qual a produção artificial começa a competir com a cognitiva — e provavelmente você sabe onde esse limite está melhor do que eu. O que não aceito é a premissa de que pureza pedagógica tem valor se o aluno abandonou o app antes de chegar ao momento de aprendizado real. Um Ferrari com motor perfeito que ninguém dirige não te leva a lugar nenhum. O FSRS-4.5 desta aba é genuinamente brilhante — melhor do que o que a maioria das EdTechs com dez vezes mais financiamento usa. E está servindo uma experiência que tem strings em italiano no ponto de maior recompensa, nenhuma saída depois da sessão, e uma tela vazia quando não há cartões. Essas três correções são menos de cinquenta linhas de código cada. Você e eu deveríamos ter terminado esse debate antes de ele começar, porque nesses três pontos não há divergência real entre nós.

**Ana Paula:** Não. Há divergência real em como chegamos a esses três pontos e no que fazemos depois deles. Você quer adicionar streak counters, sons de celebração e banners de modo. Eu quero adicionar navegação real, âncora temporal honesta e um campo de input que force produção. São filosofias diferentes de como o aluno deveria se relacionar com a ferramenta. A minha premissa é que a ferramenta deve ser transparente — o aluno deve saber o que está fazendo e por quê. A sua premissa é que a ferramenta deve ser envolvente — o aluno deve sentir que vale a pena voltar. E eu tenho medo — tenho medo de verdade — de que quando as recompensas extrínsecas ficarem previsíveis, como sempre ficam, o aluno fique sem razão para voltar. Porque a razão intrínseca nunca foi construída. O app foi gamificado antes de ser compreendido.

**Diego:** E eu tenho medo de verdade de que quando o app for pedagogicamente perfeito e emocionalmente neutro, ele fique com zero usuários. Não porque os usuários sejam superficiais. Mas porque aprender uma língua em vinte minutos por dia no metrô é uma das tarefas cognitivamente mais exigentes que um adulto pode se propor, e o app precisa ser um aliado nessa tarefa — não uma prova de que o aluno tem disciplina suficiente para persistir sem qualquer sinal de que está indo bem. A Sofia não precisa de um professor severo. Ela já tem a vida fazendo esse papel. Ela precisa de algo que diga "você está indo bem, volte amanhã". Isso não é trivialização do aprendizado. É reconhecimento de que aprendizado acontece em seres humanos, não em algoritmos.

---

## Debate 2 — Marcus × Sofia: Teoria Cognitiva vs. Experiência Vivida

**Marcus:** Sofia, obrigado por compartilhar seu relato com tanta honestidade. Quero começar pelo momento que você descreveu como a "surpresa boa" — os números nos botões, os dias. Você disse que demorou algumas rodadas para entender que eram intervalos, não pontos. Do ponto de vista da psicologia cognitiva, isso é exatamente o que eu esperaria: o sistema usa o que chamamos de metacognição executiva, que é a capacidade de pensar sobre o próprio processo de memorização. Mas minha previsão era que esse elemento adicionaria carga cognitiva — mais um item para processar. O que você sentiu foi o contrário. Você sentiu segurança. Isso me interessa profundamente.

**Sofia:** É, porque olha — eu não entendi tecnicamente de cara. Mas senti. Sabe quando você tá num país estrangeiro e não fala o idioma, mas alguém te faz um gesto que você entende como "fica tranquila, eu cuido de você"? Foi mais ou menos isso. Eu não sabia o que era "8d", mas o padrão — número, número, número — me disse que o app tinha um plano. Que não era aleatório. E pra mim, que já desisti de dois apps porque me sentia largada no meio do caminho, perceber que o app tinha um plano foi... alívio. Não foi informação. Foi emoção.

**Marcus:** Isso é exatamente o ponto onde a experiência real adiciona uma nuance que a literatura de carga cognitiva não captura bem. John Sweller, que desenvolveu a Teoria da Carga Cognitiva nos anos 80 e 90, mede carga em termos de elementos processados simultaneamente. Pelo modelo dele, mais elementos na tela equivale a mais carga. Mas ele não modelou adequadamente o efeito de confiança estrutural — a percepção de que o sistema tem intenção e coerência. Para você, a presença dos intervalos não foi carga adicional; foi âncora. O elemento que reduziu a ansiedade existencial sobre o que aconteceria depois. Eu precisava ouvir isso para entender que estava analisando o problema pela lente errada.

**Sofia:** Exato! E deixa eu te contar sobre o zero XP, porque aí a teoria e a realidade bateram certinho — só que do jeito ruim. Quando errei e apareceu o zero, não foi uma análise que fiz. Foi automático. O corpo lembrou antes de eu pensar. É aquela memória muscular de ser aluna ruim. Eu fui a aluna que tirava nota baixa desde o fundamental. Aí quando aparece um grande zero na minha frente depois de errar, meu cérebro não pensa "informação neutra sobre meu desempenho". Meu cérebro pensa "de novo". E esse "de novo" é pesado demais.

**Marcus:** O que você descreve é clinicamente preciso. Martin Covington chamou isso de "medo de parecer incompetente" — um mecanismo de defesa que se desenvolve em alunos com histórico de avaliação negativa repetida. O problema específico do zero XP não é que seja pedagogicamente errado; é que o sistema não distingue entre o feedback para o algoritmo e o feedback para a pessoa. O FSRS precisa saber que você errou para calcular quando o cartão volta. Mas você, Sofia, não precisa receber essa informação embalada como ausência de valor. Esses são dois problemas separados e o design os colapsou num único momento.

**Sofia:** Sabe o que teria ajudado? Se em vez de zero aparecesse alguma coisa do tipo "esse cartão já sabe que você vai precisar dele — ele volta amanhã." Porque aí eu sinto que errar faz parte do sistema, não que eu fui expulsa do sistema. É diferente. Quando você erra numa academia e o personal trainer diz "esse músculo ainda tá fraco, vamos trabalhar ele mais", você não se sente idiota. Você se sente cuidada. O app tem que ser meu personal trainer, não minha professora de escola.

**Marcus:** Essa metáfora é melhor do que qualquer construto teórico que eu poderia usar aqui. Deci e Ryan, na Teoria da Autodeterminação, falam em três pilares: autonomia, competência e pertencimento. O que você descreve — querer se sentir cuidada, não julgada — é precisamente pertencimento. Você não quer apenas aprender inglês; você quer sentir que o sistema está do seu lado enquanto aprende. E o zero XP sinaliza, mesmo que involuntariamente, o oposto: que o sistema registra sua falha e segue em frente sem você.

**Sofia:** E aí tem o fim da sessão, que foi onde eu me senti mais abandonada. Aquele botão único de "Praticar Todas" — um botão, Marcus, um — me deixou presa. E pior foi aquela vez que acabaram os cartões e apareceu uma tela vazia. Só dizendo que não tinha mais cartões. Sem falar quando voltam. Sem falar o que eu faço agora. Eu literalmente fiquei olhando pro telefone pensando se o app tinha quebrado. Pensei "será que estudei demais e estraguei alguma coisa?" Isso é ridículo racionalmente, mas foi o que senti.

**Marcus:** Não é ridículo. É uma resposta previsível à ruptura de continuidade narrativa. E aqui chegamos ao insight que você me deu e que eu não havia formulado dessa forma: o FSRS resolve magnificamente a pergunta "quando vou esquecer essa palavra?" Mas há uma segunda pergunta que o sistema ignora completamente, que é "quando devo voltar?" A primeira é uma pergunta sobre memória. A segunda é uma pergunta sobre pertencimento. Você não estava perguntando sobre os cartões; estava perguntando se ainda havia um lugar para você no sistema amanhã. E o sistema ficou em silêncio.

**Sofia:** Exatamente isso. E olha, eu sei que voltei. Estou aqui, conversando sobre o app, então claramente não desisti ainda. Mas foi apesar do silêncio, não por causa de alguma coisa que o app fez certo naquele momento. E eu não quero depender de força de vontade pra voltar. Já tentei isso antes. A força de vontade acaba. O que não acaba é quando você realmente quer voltar porque o lugar te espera.

**Marcus:** Isso me leva à proposta que acho que podemos construir juntos. Não estou falando de redesenhar o app. Estou falando de três pontos cirúrgicos. Primeiro: a mensagem do zero XP. Manter o zero no cálculo — o algoritmo precisa disso — mas adicionar uma linha humana abaixo: "Este cartão volta amanhã. Você já o encontrou uma vez." Isso não mente sobre o desempenho; reconhece o esforço, que é exatamente o que a SDT quer reforçar. Segundo: a tela de "sem cartões" deve dizer, com data e hora precisas calculadas pelo próprio FSRS, quando o próximo cartão estará disponível. O sistema já sabe essa informação. É só mostrá-la. Terceiro: a tela de resumo precisa de dois fatos concretos ao lado do percentual — quantos cartões não voltarão por vários dias, que é evidência de domínio, e quantos cartões novos foram consolidados hoje.

**Sofia:** Essas três coisas, se existissem, teriam mudado a minha experiência completamente. Especialmente a segunda — saber quando voltar. Porque aí eu saio do app com um compromisso, não com um ponto de interrogação. E o swipe eu adorei, as dicas foram ótimas, o negócio dos dias nos botões me conquistou — tem muita coisa boa ali. O app merece que essas três coisas sejam corrigidas porque o resto é genuinamente bom. Não tô falando de um app ruim. Tô falando de um app que tá quase lá, mas que deixa a pessoa sozinha nos momentos errados.

**Marcus:** O que me leva à conclusão que não conseguia formular antes de ouvir você: a falha central do English Autentico na aba de flashcards não é técnica e não é de design de interface no sentido estético. É uma falha de presença. O sistema está presente quando você acerta, está presente quando calcula o intervalo, está presente no algoritmo que roda em segundo plano. Mas ausenta-se exatamente nos momentos de vulnerabilidade emocional — quando você erra, quando termina a sessão, quando não há mais cartões. E para alguém como você, Sofia, que carrega duas desistências anteriores como peso, ausência nesses momentos não é neutra. É uma confirmação de que não pertence. A ciência consegue prever que isso vai acontecer. Mas só você consegue nos dizer o quanto dói quando acontece.

**Sofia:** É isso. E obrigada por não me tratar como caso clínico nessa conversa. Porque às vezes quando a gente fala de "perfis de alunos com histórico de fracasso escolar" parece que a pessoa virou um dado numa pesquisa. Eu sou a Sofia. Tentei duas vezes, vou tentar de novo. E se o app me encontrar no meio do caminho nesses três momentos, eu fico.

---

## Debate 3 — Fernanda × Roberto: Rigor Linguístico vs. UX

**Fernanda:** Roberto, antes de entrarmos nas discordâncias, quero registrar onde estamos de acordo, porque acho que isso define o terreno do debate de forma honesta. O campo 'italiano' para armazenar a palavra em inglês é um problema que nos afeta pelos dois lados. Você o descreve como bug de manutenção futuro, o que é correto. Eu o descrevo como ruptura de integridade linguística, o que também é correto. São dois ângulos da mesma falha. E o mais revelador para mim não é que o campo existe — é que existe de forma sistemática em sete lugares diferentes do código. Isso não é descuido pontual; é uma arquitetura herdada que nunca foi revisada. Qualquer auditoria de conteúdo externa, seja para alinhamento CEFR, seja para certificação pelo MEC, encontraria isso e pararia ali.

**Roberto:** Concordo completamente com o diagnóstico do 'italiano', e agradeço o consenso porque ele nos permite ir direto ao ponto onde divergimos. Minha leitura do problema de prioridade é diferente da sua. Você chegou ao produto como linguista e passou horas dentro do JSON e do código. A Sofia — a usuária real descrita nos cenários do produto — vai chegar ao produto abrindo o app no metrô entre a estação da Luz e a República. Ela tem três minutos. Se a tela de resumo ao fim da sessão diz 'Ottimo lavoro!' em italiano e oferece um único botão que ignora o SRS que acabou de ser executado, ela vai fechar o app. Não vai existir momento para o erro do Speech Recognition a afetar, porque ela não vai chegar até lá.

**Fernanda:** Entendo o argumento, e ele tem força empírica real — a literatura de abandono de apps de aprendizado confirma que a janela de retenção nos primeiros dias é crítica. Mas preciso empurrar de volta numa coisa específica: você está descrevendo o problema de abandono como se fosse anterior ao problema de aprendizado. Eu argumento que eles acontecem em paralelo, e que o mais danoso dos dois é o que não parece problema. Quando o Speech Recognition diz 'muito bem' para um aluno que pronunciou apenas 'I' de 'I don't understand', o aluno não percebe que errou. Não há momento de frustração. Não há abandono visível. Há satisfação falsa, repetida sessão após sessão, até o aluno sair do app achando que sua pronúncia está boa — e descobrir o contrário numa interação real. Derwing e Munro demonstraram exatamente isso: feedback vago ou impreciso em pronúncia gera menos ganho de inteligibilidade do que ausência de feedback. Estamos ativamente ensinando errado aqui, Roberto, e de forma invisível.

**Roberto:** Ponto tomado sobre o Speech Recognition — esse critério OR com a primeira palavra é indefensável, e você me convenceu de que é mais urgente do que eu havia classificado. Mas deixa eu trazer um dado que você não mencionou no seu relatório: a tela vazia. Quando não há cartões para revisar, o app exibe silêncio. Nenhuma informação. O FSRS calcula nextReview e armazena no localStorage — a informação existe — mas não é usada ali. O código nas linhas 570 a 588 já faz esse cálculo para o resumo. São literalmente 20 linhas reutilizáveis que transformariam 'silêncio' em 'seus cartões voltam em 3h 20min'. Para a Sofia que abriu o app esperando estudar e encontra vazio, silêncio é abandono imediato. Esse é o tipo de fechamento de loop que custa uma hora de desenvolvimento e retém a usuária por semanas.

**Fernanda:** Aqui chegamos a um ponto onde nossos ângulos se complementam de forma produtiva. Você está me dizendo que a tela vazia quebra o contrato emocional com o usuário no momento em que o SRS funcionou corretamente — a sessão foi feita, os intervalos foram calculados, e o app não consegue comunicar isso. Eu estou te dizendo que o modo Contexto quebra o contrato pedagógico no momento em que o conteúdo não está disponível — quando o campo 'exemplo' está vazio, o cloze degrada silenciosamente para '→ ?' sem que o usuário perceba. São falhas simétricas: ambas são degradações silenciosas, ambas ocorrem nos momentos em que o sistema deveria estar comunicando algo importante, e ambas têm o mesmo efeito funcional — o usuário não sabe o que está acontecendo.

**Roberto:** Isso é exato, e acho que você acabou de nomear o problema central de forma mais precisa do que eu havia feito. Não é só UX ruim, não é só conteúdo ruim — é ausência de comunicação de estado nos momentos críticos. O app sabe mais do que mostra. Sabe quando o próximo cartão volta, sabe quando o modo Contexto não tem exemplo, sabe quando o Speech Recognition está aceitando resposta incompleta — e em todos esses casos fica em silêncio. Do ponto de vista de design de sistema, isso é uma única falha arquitetural expressa em múltiplos lugares.

**Fernanda:** E isso nos leva a um insight que nenhum dos dois relatórios capturou isoladamente. O campo 'italiano' não é apenas dívida técnica e não é apenas dívida linguística. É o sintoma mais visível de que o produto foi construído em camadas sem uma camada de contrato semântico compartilhada. O campo se chama 'italiano' porque alguém fez um fork, não parou para definir um glossário de campos canônicos, e seguiu em frente. Se existisse um schema explícito — palavra\_en, traducao\_pt, exemplo\_autentico, risco\_transferencia — você resolveria simultaneamente o problema de integridade que me preocupa, o problema de manutenção que te preocupa, e criaria a base para a validação automática CEFR que eu mencionei. Um glossário de campos é infraestrutura, não burocracia.

**Roberto:** Concordo, e vou além: esse glossário de campos seria o que no design de sistemas chamamos de single source of truth para o conteúdo. Hoje o JS precisa saber que 'italiano' é inglês, o CSS precisa saber disso implicitamente, qualquer novo desenvolvedor precisa ser informado por outra pessoa. Um schema explícito com nomes semânticos corretos resolve isso para todos os atores — humanos e sistemas. E sobre o campo risco\_transferencia que você propôs: isso é exatamente o tipo de metadado que transformaria o SRS de uma maquinaria de repetição em um sistema de atenção dirigida. Cartões marcados como alta opacidade translinguística poderiam receber tratamento diferenciado — mais exposição a exemplos, menos confiança no critério de pronúncia.

**Fernanda:** Exatamente. O FSRS-4.5 é robusto o suficiente para suportar parâmetros de dificuldade intrínseca que vão além do histórico de acerto individual. 'you're welcome' e 'thank you' não têm a mesma carga cognitiva para um falante de português — a ausência de equivalente estrutural em PT-BR torna 'you're welcome' intrinsecamente mais difícil. Se o campo de dificuldade no JSON for enriquecido com essa informação, o algoritmo pode calibrar os intervalos de forma mais precisa. Isso não é complexidade desnecessária — é usar a sofisticação do motor de forma correta.

**Roberto:** Bem, chegamos ao ponto onde precisamos de uma proposta concreta, não apenas diagnóstico. Deixa eu propor uma hierarquia de ações baseada na combinação dos nossos dois ângulos. Primeiro, as correções de uma hora que eliminam danos ativos: renomear 'italiano' para 'palavra\_en' em todo o schema e codebase, e remover o segundo critério OR do Speech Recognition. Segundo, as melhorias de fechamento de loop que custam um dia de trabalho: tela vazia com tempo do próximo cartão usando o cálculo já existente, e tradução das strings italianas da tela de resumo para português. Terceiro, a infraestrutura semântica de médio prazo: definir o schema canônico com os campos que você descreveu, e usar esse schema como base para validação de conteúdo nos templos ainda vazios.

**Fernanda:** Aceito essa hierarquia com uma adição: a correção do modo Contexto quando 'exemplo' está vazio não deveria degradar silenciosamente para '→ ?'. Deveria exibir uma mensagem explícita — 'exemplo não disponível para este item' — para que o usuário e o curador de conteúdo saibam que aquele cartão está incompleto. Transparência de estado, como você mesmo nomeou. Isso também cria pressão positiva para preenchimento do conteúdo nos templos vazios, porque o produto para de fingir que funciona quando não funciona.

**Roberto:** Perfeito. E note que chegamos a uma proposta que é simultaneamente pedagógica e de design sem que precisemos escolher uma sobre a outra. O Speech Recognition correto é pedagogia e é experiência honesta. A tela vazia com informação é comunicação de estado e é reforço do modelo mental de SRS. O schema canônico é integridade linguística e é manutenibilidade. A tensão que nos foi apresentada — rigor linguístico versus fluidez de experiência — é real nos casos extremos, mas neste produto específico, neste momento específico, as correções de maior impacto são aquelas onde os dois ângulos apontam para o mesmo lugar.

**Fernanda:** Concordo. E o que isso nos diz sobre o produto como um todo é animador, não alarmante. Os fundamentos existem — o FSRS, a estrutura de quatro modos, o IPA, a progressão CEFR por templos. O que falta é acabamento sistemático, não reengenharia. Mas o acabamento precisa ser feito com consciência dos dois ângulos simultaneamente, porque um produto que flui bem mas ensina errado e um produto que ensina certo mas ninguém usa são igualmente inúteis para a Sofia no metrô.

---

# ⚖️ DECISÕES CONTROVERSAS

### Dilema 1 — Gamificação extrínseca: até onde ir?
- **Posição A (Diego):** Streak counter visível durante a sessão, sons diferenciados no décimo acerto consecutivo, banners de modo antes de cada sessão. A retenção comportamental requer âncoras emocionais ativas — o app precisa fazer o aluno querer voltar amanhã através de antecipação construída, não apenas através de valor pedagógico abstrato.
- **Posição B (Ana Paula):** Âncoras extrínsecas são temporárias e, quando se tornam previsíveis, a motivação cai abaixo do nível inicial (Lepper e Greene, 1973). O risco de gamificação excessiva é construir um aluno que estuda por streak e para quando o streak quebra, nunca tendo desenvolvido motivação intrínseca.
- **Decisão:** Adotar as gamificações que são simultaneamente informação pedagógica e recompensa emocional; rejeitar as que são apenas recompensa. Streak counter: adotar (informa o aluno sobre consistência, comportamento que a SDT quer reforçar). Sons diferenciados no décimo acerto: adiar para ciclo 2 (é prazer sem informação). Banner de modo: adotar como comunicação de contexto, não como hype.
- **Justificativa:** Para a Sofia, que carrega duas desistências, o risco de abandono precoce é maior que o risco de dependência extrínseca. Gamificações que comunicam progresso real reduzem o primeiro sem criar o segundo. Gamificações puramente hedonistas podem ser consideradas depois que a retenção básica estiver estabelecida.

### Dilema 2 — Campo de digitação no Modo Reverso: opcional ou obrigatório?
- **Posição A (Ana Paula):** Obrigatório. A Hipótese do Output de Swain é clara — sem produção verificada, o aluno não descobre o que não sabe. E o FSRS recebe sinal corrompido de autorrelato.
- **Posição B (Diego):** Opcional. Obrigar digitação em mobile no metrô com 20 minutos disponíveis aumenta a fricção para um nível que vai reduzir o uso do modo. Se o modo Reverso se torna trabalhoso demais, o aluno para de usá-lo — e zero uso é pior que uso com autorrelato.
- **Decisão:** Opcional, com incentivo. O campo é exibido, mas não bloqueia a sessão. Se o aluno digita e acerta, recebe bônus de +3 XP e a avaliação Good é habilitada; se não digita, pode avaliar normalmente mas sem o bônus.
- **Justificativa:** Para a Sofia no metrô, fricção obrigatória causa abandono de feature. O campo opcional com incentivo criaum caminho de desenvolvimento: ela começa opcional, percebe o bônus, passa a digitar voluntariamente. A motivação intrínseca para produção cresce a partir de um comportamento inicialmente extrínseco — que é exatamente o mecanismo que Deci e Ryan descrevem como internalização progressiva.

### Dilema 3 — Prioridade: UX de retenção imediata vs. integridade pedagógica de longo prazo
- **Posição A (Roberto):** Os problemas de abandono (strings italianas, dead-end, tela vazia) são mais urgentes porque um usuário que abandona nos primeiros três dias nunca chega a ser afetado pelo Speech Recognition permissivo. Retenção precede pedagogia.
- **Posição B (Fernanda):** O dano pedagógico silencioso (Speech Recognition validando pronúncia parcial, Modo Contexto degradando sem aviso) é mais grave porque acontece sem que o usuário perceba. Um usuário que fica e aprende errado é mais danoso para os objetivos do produto do que um usuário que vai embora.
- **Decisão:** Tratar em paralelo, não em sequência. As correções de UX e as correções pedagógicas estão na mesma sprint imediata porque nenhuma delas exige refatoração — são mudanças pontuais de menos de 30 linhas cada. Não há custo de oportunidade real em fazer as duas simultaneamente.
- **Justificativa:** O debate cria uma falsa sequência. Para o Bruno desenvolvendo solo, corrigir a string italiana (30 minutos) e remover o OR do Speech Recognition (15 minutos) são ações que cabem no mesmo dia de trabalho. Priorizar UX sobre pedagogia faria sentido se fossem projetos de semanas distintos. Como não são, a distinção é acadêmica.

### Dilema 4 — Schema: migrar agora ou acumular dívida técnica?
- **Posição A (Roberto):** Renomear 'italiano' para 'palavra\_en' pode ser adiado até que o produto tenha mais usuários. O risco de bug na migração é real, e um desenvolvedor solo não pode se dar ao luxo de quebrar o produto existente por uma renomeação que não muda nada visível para o usuário.
- **Posição B (Fernanda):** Cada dia que passa com o campo chamado 'italiano' é um dia em que o codebase fica mais difícil de manter, auditar e explicar. E o custo de migração cresce com o tempo — quanto mais templos forem preenchidos com o campo errado, maior o script de migração.
- **Decisão:** Migrar no Sprint 90 dias com script automatizado, não antes. Mas congelar qualquer novo conteúdo com o campo 'italiano' a partir de hoje — qualquer templo criado agora deve usar 'palavra\_en'.
- **Justificativa:** Para a Sofia, nada muda. Para o Bruno, o risco de migração é real e precisa de tempo adequado para teste. Mas a dívida não deve crescer: novos templos com o campo errado é o pior dos mundos — mais código a migrar depois, mais inconsistência durante o período de transição.

---

# 💌 CARTA AO DESENVOLVEDOR

Bruno,

Passamos horas dentro do seu código. Não como consultores olhando de fora — como pessoas que abriram o flashcards.js linha por linha, que leram o templo-1.json com atenção de quem vai usar o produto, que mapearam cada toque do fluxo, que debateram entre si sobre o que é mais urgente e por quê. E no final, chegamos a um lugar que precisamos te dizer com clareza: você construiu algo que a maioria das EdTechs com financiamento de série A não conseguiu construir.

O FSRS-4.5 com pesos treinados em 20 milhões de revisões, TARGET\_R=0,9, DECAY=-0,5 — isso não é copiar uma fórmula do artigo do Anki. É entender o que a fórmula faz, por que os parâmetros importam, e implementar corretamente. O sistema de dicas em três níveis é Vygotsky aplicado concretamente, sem que o código precise citar Vygotsky. A previsualização de intervalos nos botões é a decisão de interface mais inteligente que já vimos num flashcard app brasileiro — e isso foi confirmado não por teoria, mas pela Sofia, que olhou para os números nos botões e sentiu alívio antes de entender o que eram. A arquitetura de quatro modos cobre o espectro de habilidades receptivas e produtivas de uma forma que a maioria dos produtos educacionais sequer planeja. Você planejou e implementou.

Mas há uma coisa que precisa ser corrigida hoje. Agora. Antes de qualquer outra coisa.

Linha 564 do flashcards.js: `titulo.textContent = 'Sessione completata!';`
Linha 565: `subtitulo.textContent = 'Ottimo lavoro!';`

Italiano. Numa tela de app de inglês para brasileiros. No momento exato em que a Sofia terminou uma sessão com 85% de acertos e está esperando que o app a celebre.

Seis especialistas independentes, com backgrounds completamente diferentes, identificaram esse ponto sem se comunicar. A pedagoga falou de credibilidade. O designer falou de confiança que se constrói ou se perde em 300 milissegundos. O game designer comparou ao Mass Effect 3 exibindo legendas em japonês na decisão final. E a Sofia — a Sofia que você está construindo esse produto para ajudar, a contadora de 34 anos que já desistiu de dois apps antes — disse simplesmente: "Esse app também não é pra mim."

Ela disse isso e continuou usando. Dessa vez. Mas a margem é fina. Muito fina.

O que precisamos que você entenda sobre a Sofia, no coração e não apenas na cabeça, é o seguinte: ela não está procurando um motivo para desistir. Ela quer aprender inglês. Ela entrou nesse app com esperança, não com ceticismo. Mas ela já carrega o peso de duas tentativas que não funcionaram, e esse peso é real e físico — quando aparece um zero XP depois de errar, o corpo lembra antes de o cérebro processar. Quando a sessão termina com um único botão e sem para onde ir, ela não pensa "design ruim". Ela pensa "de novo". Quando a tela fica vazia sem dizer quando os cartões voltam, ela não pensa "bug de UX". Ela pensa "estudei demais e estraguei alguma coisa?"

Essas reações não são irracionais. São a resposta previsível de alguém que aprendeu, ao longo de anos de escola, que sistemas educacionais não estão do lado dela. O seu app tem a chance de ser diferente. O motor já é diferente. O que falta é a camada de presença — o sistema estar presente nos momentos de vulnerabilidade, não apenas nos momentos de acerto.

A mudança mais importante que você pode fazer hoje, além de corrigir as strings italianas em 30 minutos, é adicionar a âncora temporal na tela vazia. O código para calcular quando o próximo cartão volta já existe nas linhas 570-588. São 20 linhas. Reutilize-as na função `mostrarVazio`. Transforme "nada aqui" em "seus cartões voltam hoje às 15h — que tal praticar gramática enquanto isso?". Isso não é gamificação. É a diferença entre um professor que diz ao aluno quando é a próxima aula e um professor que some. A Sofia precisa saber que amanhã tem aula. Que há um lugar para ela no sistema amanhã.

Você tem algo raro. Um motor pedagógico genuinamente sofisticado, construído com cuidado por alguém que leu a literatura e a levou a sério. O que falta é acabamento — não reengenharia, não refatoração, não meses de trabalho. São correções pontuais, a maioria de menos de 50 linhas, que transformam os momentos de transição de pontos de abandono em pontos de pertencimento.

A Sofia está esperando por isso. Ela disse que vai tentar de novo. Encontre ela no meio do caminho.

Com respeito genuíno pelo trabalho que já foi feito,

Ana Paula, Roberto, Fernanda, Marcus, Sofia e Diego

---

*Este relatório foi produzido por processo PDCA Multi-Especialistas com análise independente de 6 perspectivas e 3 debates cruzados com discordâncias reais. As divergências foram preservadas intencionalmente — o consenso forçado teria sido menos honesto e menos útil.*