const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType, HeadingLevel,
  LevelFormat, VerticalAlign
} = require('docx');
const fs = require('fs');

// ─── HELPERS ────────────────────────────────────────────────────────────────

const GOLD = 'b8860b';
const GOLD_LIGHT = 'f5e6a3';
const DARK_BG = '0a1628';
const DARK_MID = '0d1f3c';
const DARK_CARD = '111f38';
const PROTOCOL_BG = '0a1f0a';
const WHITE = 'FFFFFF';
const LIGHT_GRAY = 'e8e0d0';
const MUTED = 'a89f8c';
const GREEN_ACCENT = '2d6a2d';
const GREEN_LIGHT = 'c8f0c8';
const NO_BORDER = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const NO_BORDERS = { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER };
const THIN_GOLD = { style: BorderStyle.SINGLE, size: 4, color: GOLD };

function garamond(text, opts = {}) {
  return new TextRun({ text, font: 'Garamond', ...opts });
}
function palatino(text, opts = {}) {
  return new TextRun({ text, font: 'Palatino Linotype', ...opts });
}
function para(children, opts = {}) {
  if (typeof children === 'string') children = [new TextRun({ text: children, font: 'Garamond', size: 22, color: LIGHT_GRAY })];
  return new Paragraph({ children, spacing: { before: 0, after: 120 }, ...opts });
}
function cell(children, opts = {}) {
  const { bg, width = 9360, borders = NO_BORDERS, margins, valign } = opts;
  const tcPr = { width: { size: width, type: WidthType.DXA }, borders, margins: margins || { top: 80, bottom: 80, left: 160, right: 160 } };
  if (bg) tcPr.shading = { fill: bg, type: ShadingType.CLEAR };
  if (valign) tcPr.verticalAlign = valign;
  return new TableCell({ ...tcPr, children: Array.isArray(children) ? children : [children] });
}
function fullTable(rows, opts = {}) {
  const { width = 9360 } = opts;
  return new Table({
    width: { size: width, type: WidthType.DXA },
    columnWidths: [width],
    borders: { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER, insideH: NO_BORDER, insideV: NO_BORDER },
    rows
  });
}
function spacer(pt = 120) {
  return new Paragraph({ children: [new TextRun('')], spacing: { before: 0, after: pt } });
}

// ─── COVER ──────────────────────────────────────────────────────────────────

function buildCover() {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    borders: { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER, insideH: NO_BORDER, insideV: NO_BORDER },
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: 9360, type: WidthType.DXA },
        borders: NO_BORDERS,
        shading: { fill: DARK_BG, type: ShadingType.CLEAR },
        margins: { top: 2400, bottom: 2400, left: 1440, right: 1440 },
        children: [
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 120 }, children: [garamond('MATRIZ CURRICULAR — EDIÇÃO COMPLETA', { bold: true, allCaps: true, color: GOLD, size: 24, characterSpacing: 120 })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 160 }, children: [garamond('A NATUREZA HUMANA', { bold: true, color: WHITE, size: 72 })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 360 }, children: [palatino('Do Fundamento ao Domínio Absoluto · 9 Eixos Completos', { italics: true, color: GOLD_LIGHT, size: 24 })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 120 }, border: { top: THIN_GOLD }, children: [garamond('9 Eixos Temáticos  ·  6 Níveis de Profundidade  ·  +120 Obras Canônicas', { color: LIGHT_GRAY, size: 20 })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 120 }, children: [palatino('Psicologia · Poder · Cognição · Evolução · Filosofia · Sociologia', { italics: true, color: MUTED, size: 18 })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0 }, children: [palatino('Arquitetura Comportamental · Controle Social · Inteligência Estratégica', { italics: true, color: MUTED, size: 18 })] }),
        ]
      })]
    })]
  });
}

// ─── INTRO ──────────────────────────────────────────────────────────────────

function buildIntro() {
  return [
    spacer(240),
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      columnWidths: [9360],
      borders: { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER, insideH: NO_BORDER, insideV: NO_BORDER },
      rows: [new TableRow({
        children: [new TableCell({
          width: { size: 9360, type: WidthType.DXA },
          borders: { top: THIN_GOLD, bottom: THIN_GOLD, left: NO_BORDER, right: NO_BORDER },
          shading: { fill: DARK_MID, type: ShadingType.CLEAR },
          margins: { top: 400, bottom: 400, left: 480, right: 480 },
          children: [
            new Paragraph({ spacing: { before: 0, after: 160 }, children: [garamond('O QUE ESTE DOCUMENTO É', { bold: true, color: GOLD, size: 22, allCaps: true, characterSpacing: 80 })] }),
            new Paragraph({ spacing: { before: 0, after: 120 }, children: [palatino('Este é um currículo de formação em inteligência humana — não no sentido de QI, mas no sentido de capacidade de ler, compreender e prever o comportamento de pessoas, organizações e nações.', { color: LIGHT_GRAY, size: 22 })] }),
            new Paragraph({ spacing: { before: 0, after: 120 }, children: [palatino('O documento está estruturado em 9 eixos temáticos, cada um com 6 níveis de profundidade que vão do zero absoluto até literatura técnica que psicólogos forenses, analistas de inteligência e estrategistas de alto nível usam no trabalho real. Esta edição contém todos os 9 eixos — da psicologia profunda à inteligência estratégica operacional.', { color: LIGHT_GRAY, size: 22 })] }),
            new Paragraph({ spacing: { before: 0, after: 120 }, children: [palatino('Para cada obra, você encontrará: a tese central do autor, a aplicação estratégica direta, a intensidade de leitura — e ', { color: LIGHT_GRAY, size: 22 }), palatino('protocolos de ativação de conhecimento', { color: GOLD_LIGHT, size: 22, bold: true }), palatino(': instruções precisas para converter leitura em capacidade real de previsão e integrar cada obra à prática diária.', { color: LIGHT_GRAY, size: 22 })] }),
            new Paragraph({ spacing: { before: 0, after: 0 }, children: [palatino('No total são mais de 120 obras canônicas em seis idiomas, organizadas para construção progressiva de um modelo interno do ser humano que se aplica independente de profissão, contexto ou escala.', { color: MUTED, size: 20, italics: true })] }),
          ]
        })]
      })]
    }),
    spacer(240),
  ];
}

// ─── AXIS HEADER ────────────────────────────────────────────────────────────

function buildAxisHeader(num, title, subtitle, conceptText) {
  return [
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      columnWidths: [9360],
      borders: { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER, insideH: NO_BORDER, insideV: NO_BORDER },
      rows: [new TableRow({
        children: [new TableCell({
          width: { size: 9360, type: WidthType.DXA },
          borders: NO_BORDERS,
          shading: { fill: DARK_BG, type: ShadingType.CLEAR },
          margins: { top: 600, bottom: 600, left: 720, right: 720 },
          children: [
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 80 }, children: [garamond(num, { bold: true, color: GOLD, size: 18, allCaps: true, characterSpacing: 200 })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 120 }, children: [garamond(title, { bold: true, color: WHITE, size: 40 })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0 }, children: [palatino(subtitle, { italics: true, color: GOLD_LIGHT, size: 22 })] }),
          ]
        })]
      })]
    }),
    spacer(120),
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      columnWidths: [9360],
      borders: { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER, insideH: NO_BORDER, insideV: NO_BORDER },
      rows: [new TableRow({
        children: [new TableCell({
          width: { size: 9360, type: WidthType.DXA },
          borders: { left: { style: BorderStyle.SINGLE, size: 12, color: GOLD } },
          shading: { fill: DARK_CARD, type: ShadingType.CLEAR },
          margins: { top: 240, bottom: 240, left: 480, right: 480 },
          children: [
            new Paragraph({ spacing: { before: 0, after: 80 }, children: [garamond('Conceito Central', { bold: true, color: GOLD, size: 18, allCaps: true, characterSpacing: 60 })] }),
            new Paragraph({ spacing: { before: 0, after: 0 }, children: [palatino(conceptText, { color: LIGHT_GRAY, size: 22, italics: true })] }),
          ]
        })]
      })]
    }),
    spacer(240),
  ];
}

// ─── LEVEL HEADER ───────────────────────────────────────────────────────────

function buildLevelHeader(text) {
  return [
    new Paragraph({
      spacing: { before: 320, after: 160 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: GOLD, space: 4 } },
      children: [garamond(text, { bold: true, color: GOLD, size: 20, allCaps: true, characterSpacing: 80 })]
    }),
  ];
}

// ─── BOOK ENTRY ─────────────────────────────────────────────────────────────

function buildBook(author, title, year, lang, tese, aplicacao, intensidade, protocolo) {
  const rows = [];
  rows.push(new TableRow({
    children: [new TableCell({
      width: { size: 9360, type: WidthType.DXA }, borders: NO_BORDERS,
      shading: { fill: DARK_MID, type: ShadingType.CLEAR },
      margins: { top: 240, bottom: 120, left: 360, right: 360 },
      children: [
        new Paragraph({ spacing: { before: 0, after: 80 }, children: [garamond(author, { bold: true, color: WHITE, size: 22 }), garamond('  ·  ', { color: GOLD, size: 22 }), palatino(title, { italics: true, color: GOLD_LIGHT, size: 22 })] }),
        new Paragraph({ spacing: { before: 0, after: 0 }, children: [garamond(`${year} · ${lang}`, { color: MUTED, size: 18 })] }),
      ]
    })]
  }));
  rows.push(new TableRow({
    children: [new TableCell({
      width: { size: 9360, type: WidthType.DXA }, borders: NO_BORDERS,
      shading: { fill: DARK_CARD, type: ShadingType.CLEAR },
      margins: { top: 160, bottom: 120, left: 360, right: 360 },
      children: [
        new Paragraph({ spacing: { before: 0, after: 60 }, children: [garamond('● TESE CENTRAL', { bold: true, color: GOLD, size: 18, allCaps: true, characterSpacing: 40 })] }),
        new Paragraph({ spacing: { before: 0, after: 0 }, children: [palatino(tese, { color: LIGHT_GRAY, size: 21 })] }),
      ]
    })]
  }));
  rows.push(new TableRow({
    children: [new TableCell({
      width: { size: 9360, type: WidthType.DXA },
      borders: { left: { style: BorderStyle.SINGLE, size: 8, color: GOLD } },
      shading: { fill: '0d1830', type: ShadingType.CLEAR },
      margins: { top: 160, bottom: 120, left: 360, right: 360 },
      children: [
        new Paragraph({ spacing: { before: 0, after: 60 }, children: [garamond('▶ APLICAÇÃO ESTRATÉGICA', { bold: true, color: GOLD, size: 18, allCaps: true, characterSpacing: 40 })] }),
        new Paragraph({ spacing: { before: 0, after: 0 }, children: [palatino(aplicacao, { color: LIGHT_GRAY, size: 21, italics: true })] }),
      ]
    })]
  }));
  rows.push(new TableRow({
    children: [new TableCell({
      width: { size: 9360, type: WidthType.DXA }, borders: NO_BORDERS,
      shading: { fill: DARK_MID, type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 120, left: 360, right: 360 },
      children: [new Paragraph({ spacing: { before: 0, after: 0 }, children: [garamond(`◆ Intensidade: ${intensidade}`, { color: MUTED, size: 18, italics: true })] })]
    })]
  }));
  rows.push(new TableRow({
    children: [new TableCell({
      width: { size: 9360, type: WidthType.DXA },
      borders: { top: { style: BorderStyle.SINGLE, size: 6, color: GREEN_ACCENT } },
      shading: { fill: PROTOCOL_BG, type: ShadingType.CLEAR },
      margins: { top: 200, bottom: 60, left: 360, right: 360 },
      children: [new Paragraph({ spacing: { before: 0, after: 0 }, children: [garamond('⟳ PROTOCOLO DE ATIVAÇÃO', { bold: true, color: GREEN_LIGHT, size: 18, allCaps: true, characterSpacing: 60 })] })]
    })]
  }));
  rows.push(new TableRow({
    children: [new TableCell({
      width: { size: 9360, type: WidthType.DXA },
      borders: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GREEN_ACCENT } },
      shading: { fill: PROTOCOL_BG, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 240, left: 360, right: 360 },
      children: protocolo.map((p, i) => new Paragraph({ spacing: { before: i === 0 ? 0 : 100, after: 0 }, children: [palatino(p, { color: GREEN_LIGHT, size: 20 })] }))
    })]
  }));
  return [
    new Table({
      width: { size: 9360, type: WidthType.DXA }, columnWidths: [9360],
      borders: { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER, insideH: NO_BORDER, insideV: NO_BORDER },
      rows
    }),
    spacer(200),
  ];
}

// ─── INTEGRATION ────────────────────────────────────────────────────────────

function buildIntegration() {
  const sectionCell = (label, text, bg) => new TableRow({
    children: [new TableCell({
      width: { size: 9360, type: WidthType.DXA }, borders: NO_BORDERS,
      shading: { fill: bg, type: ShadingType.CLEAR },
      margins: { top: 240, bottom: 240, left: 480, right: 480 },
      children: [
        new Paragraph({ spacing: { before: 0, after: 80 }, children: [garamond(label, { bold: true, color: GOLD, size: 20, allCaps: true, characterSpacing: 60 })] }),
        new Paragraph({ spacing: { before: 0, after: 0 }, children: [palatino(text, { color: LIGHT_GRAY, size: 21 })] }),
      ]
    })]
  });
  return [
    spacer(240),
    new Table({
      width: { size: 9360, type: WidthType.DXA }, columnWidths: [9360],
      borders: { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER, insideH: NO_BORDER, insideV: NO_BORDER },
      rows: [
        new TableRow({ children: [new TableCell({ width: { size: 9360, type: WidthType.DXA }, borders: NO_BORDERS, shading: { fill: DARK_BG, type: ShadingType.CLEAR }, margins: { top: 480, bottom: 240, left: 720, right: 720 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0 }, children: [garamond('PROTOCOLO DE INTEGRAÇÃO DOS EIXOS', { bold: true, color: GOLD, size: 28, allCaps: true, characterSpacing: 100 })] })] })] }),
        sectionCell('A Pirâmide do Conhecimento Aplicado', '', DARK_BG),
        sectionCell('Camada 1 — O Que o Ser Humano É', 'Eixos I a IV: Psicologia, Poder, Cognição, Evolução. Aqui você aprende a estrutura interna — o que move, o que trava, o que distorce o comportamento humano de dentro para fora.', DARK_CARD),
        sectionCell('Camada 2 — Como o Humano é Moldado de Fora', 'Eixos V a VIII: Filosofia, Sociedade, Arquitetura Comportamental, Controle Social. Aqui você aprende como ambientes, instituições, mídia e design moldam o comportamento sem que o sujeito perceba.', DARK_MID),
        sectionCell('Camada 3 — Como Ler, Prever e Navegar', 'Eixo IX: Inteligência Estratégica. Aqui estão as ferramentas operacionais para converter todo o conhecimento anterior em capacidade prática de leitura de pessoas e previsão de comportamentos.', DARK_CARD),
        new TableRow({ children: [new TableCell({ width: { size: 9360, type: WidthType.DXA }, borders: { top: THIN_GOLD, bottom: THIN_GOLD }, shading: { fill: DARK_BG, type: ShadingType.CLEAR }, margins: { top: 360, bottom: 360, left: 720, right: 720 }, children: [
          new Paragraph({ spacing: { before: 0, after: 80 }, alignment: AlignmentType.CENTER, children: [garamond('A PERGUNTA MESTRE', { bold: true, color: GOLD, size: 22, allCaps: true, characterSpacing: 80 })] }),
          new Paragraph({ spacing: { before: 0, after: 0 }, alignment: AlignmentType.CENTER, children: [palatino('Para qualquer pessoa, grupo, empresa ou nação que você esteja analisando, percorra mentalmente: Qual é a necessidade não-atendida? Qual é o medo dominante? Qual é o ambiente que está moldando o comportamento? Quem se beneficia do comportamento atual? Qual é a assinatura de personalidade? O que a história de comportamento passado prediz para esta situação? — Responder a essas seis perguntas com rigor, mesmo que parcialmente, coloca você décadas à frente da maioria das pessoas em qualquer negociação, análise ou decisão.', { color: LIGHT_GRAY, size: 21, italics: true })] }),
        ] })] }),
        new TableRow({ children: [new TableCell({ width: { size: 9360, type: WidthType.DXA }, borders: NO_BORDERS, shading: { fill: DARK_BG, type: ShadingType.CLEAR }, margins: { top: 480, bottom: 480, left: 720, right: 720 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0 }, children: [palatino('Conhecimento sem observação é erudição. Observação sem conhecimento é intuição. A combinação é inteligência.', { color: GOLD_LIGHT, size: 22, italics: true, bold: true })] })] })] }),
      ]
    }),
  ];
}

// ─── DATA — EIXO I ──────────────────────────────────────────────────────────

const eixo1 = {
  num: 'EIXO I',
  title: 'Psicologia Profunda e Estrutura da Personalidade',
  subtitle: 'Como a mente humana é estruturada, o que a move e o que a deforma',
  conceptText: 'Estrutura de caráter: toda personalidade é uma solução adaptativa às exigências do ambiente inicial — e continua operando essa solução mesmo quando o ambiente mudou e ela não é mais necessária nem eficiente. Conhecer a estrutura de alguém é conhecer as soluções que ele vai aplicar ao problema que você ainda não apresentou.',
  levels: [
    {
      label: 'NÍVEL 0 — Fundamentos Universais',
      books: [
        {
          author: 'Sigmund Freud', title: 'A Interpretação dos Sonhos', year: '1899', lang: 'Alemão',
          tese: 'O inconsciente como território de desejos reprimidos que determinam o comportamento consciente sem que o sujeito saiba. O sonho como via régia ao inconsciente — texto cifrado que revela o que a censura psíquica oculta durante a vigília.',
          aplicacao: 'Para entender comportamentos que contradizem a intenção declarada: a motivação real raramente é a declarada. O conceito de retorno do reprimido — o que é forçado para baixo retorna disfarçado — explica padrões de comportamento que o próprio sujeito não consegue explicar.',
          intensidade: '★★★☆☆ — Leitura histórica essencial',
          protocolo: [
            '1. DIÁRIO DE SONHOS (14 DIAS): Durante duas semanas, registre imediatamente ao acordar o conteúdo do sonho antes de verificar qualquer dispositivo. Não interprete — apenas registre. No fim das duas semanas, identifique temas recorrentes: o que aparece sempre? Qual emoção predomina? O padrão é mais informativo que qualquer sonho isolado.',
            '2. OBSERVAÇÃO DE ATOS FALHOS: Durante uma semana, registre seus lapsos verbais, esquecimentos e "acidentes" cotidianos. Freud os chama de parapraxias — atos que revelam intenção inconsciente. O que você "acidentalmente" disse? O que você "esqueceu"? Qual a relação entre o lapso e seu contexto emocional?',
            '3. ANÁLISE DE COMPORTAMENTOS CONTRADITÓRIOS: Identifique 3 comportamentos seus que contradizem suas intenções declaradas (você diz que quer X mas consistentemente age em direção a Y). Para cada um, mapeie: o que você estaria evitando se alcançasse X? Qual medo a contradição protege?',
            '4. LEITURA FREUDIANA DE OUTROS: Para as 3 pessoas mais difíceis na sua vida — aquelas cujo comportamento mais te frustra — identifique: qual necessidade o comportamento problemático está servindo? O que elas ganham com o que parece prejudicá-las? A pergunta "o que isso serve?" revela mais que "por que fazem isso?"',
          ]
        },
        {
          author: 'Carl Gustav Jung', title: 'Tipos Psicológicos', year: '1921', lang: 'Alemão',
          tese: 'A tipologia junguiana: introversão/extroversão como atitudes fundamentais e quatro funções psicológicas (pensamento, sentimento, sensação, intuição). Cada pessoa tem uma função dominante e uma inferior — e a inferior governa as reações mais primitivas e menos controladas.',
          aplicacao: 'Para análise de personalidade: a função inferior de alguém revela onde a racionalidade colapsa sob pressão. Um pensador dominante tem sentimento inferior — em situações de estresse emocional, perde o controle exatamente onde parecia mais sólido. Conhecer a tipologia é prever o ponto de colapso.',
          intensidade: '★★★★☆',
          protocolo: [
            '1. IDENTIFICAÇÃO DE TIPO DOMINANTE: Para as 5 pessoas mais importantes na sua vida, identifique a função dominante através de observação comportamental: Pensamento (prioriza lógica, causa-efeito, categorização), Sentimento (prioriza harmonia, valores, impacto nas pessoas), Sensação (prioriza fatos concretos, procedimentos, presente), Intuição (prioriza possibilidades, padrões, futuro). Registre evidências específicas, não impressões.',
            '2. MAPEAMENTO DA FUNÇÃO INFERIOR: A função oposta à dominante é a menos desenvolvida e mais primitiva. Observe especificamente como as pessoas reagem quando sua função inferior é exigida sob pressão: o pensador dominante em conflito emocional, o intuitivo forçado a lidar com detalhes práticos. Onde eles perdem a sofisticação habitual?',
            '3. ANÁLISE DA PRÓPRIA SOMBRA: A Sombra junguiana é o que você mais rejeita nos outros — e que existe em você não reconhecido. Liste 5 características que te irritam profundamente em outras pessoas. Para cada uma: onde essa característica existe em você, talvez em forma diferente? A irritação intensa é sempre parcialmente reconhecimento.',
            '4. ADAPTAÇÃO DE COMUNICAÇÃO POR TIPO: Para cada função dominante, adapte sua comunicação. Para Pensamento: estrutura lógica, dados, consequências. Para Sentimento: impacto em pessoas, valores, harmonia. Para Sensação: detalhes concretos, procedimentos, evidências tangíveis. Para Intuição: visão geral, possibilidades, conexões inesperadas. A mesma informação apresentada ao tipo errado falha sempre.',
          ]
        },
      ]
    },
    {
      label: 'NÍVEL 1 — Consolidação Teórica',
      books: [
        {
          author: 'Alfred Adler', title: 'Understanding Human Nature', year: '1927', lang: 'Alemão',
          tese: 'O sentimento de inferioridade como motor universal do comportamento humano — não patologia, mas ponto de partida universal. Cada pessoa desenvolve um estilo de vida único como estratégia de superação da inferioridade sentida. O interesse social como critério de saúde psicológica.',
          aplicacao: 'Para entender ambição, arrogância e comportamento compensatório: toda grandiosidade é resposta a um sentimento de pequenez. Para cada comportamento de dominância ou exibicionismo que você observar, identifique a inferioridade que está sendo compensada — isso revela a vulnerabilidade real.',
          intensidade: '★★★☆☆',
          protocolo: [
            '1. MAPEAMENTO DE INFERIORIDADES CENTRAIS: Identifique suas 3 inferioridades mais antigas — as áreas em que você se sentiu inadequado, menor ou deficiente na infância. Para cada uma: como você as compensa hoje? Quais conquistas, comportamentos ou evitações têm raiz nelas? A inferioridade não resolvida governa mais do que a pessoa reconhece.',
            '2. ANÁLISE DE ESTILO DE VIDA: O estilo de vida adleriano é a estratégia central que uma pessoa usa para navegar o mundo. Identifique o seu: você busca reconhecimento? Controle? Segurança? Pertencimento? Qual é o medo central que esse estilo evita? Onde ele te serve e onde te limita?',
            '3. LEITURA DE COMPENSAÇÕES ALHEIAS: Para cada pessoa que exibe comportamento de grandiosidade, arrogância ou controle excessivo, identifique a inferioridade provável por baixo. A arrogância intelectual compensa insegurança emocional. O controle compensa impotência sentida. Onde está a ferida que o comportamento protege?',
            '4. INTERESSE SOCIAL COMO BÚSSOLA: Adler usa o interesse social (Gemeinschaftsgefühl) — a capacidade de contribuir para além de si — como critério de maturidade psicológica. Avalie suas decisões recentes: quantas foram guiadas por interesse genuíno no outro vs. por necessidade de compensação pessoal? O balanço revela o nível atual de saúde psicológica.',
          ]
        },
        {
          author: 'Erik Erikson', title: 'Identity and the Life Cycle', year: '1959', lang: 'Inglês',
          tese: 'As oito crises de desenvolvimento: cada estágio da vida apresenta uma crise específica (confiança vs. desconfiança, autonomia vs. vergonha, identidade vs. confusão, etc.). A resolução de cada crise — bem ou mal — produz capacidades ou déficits que operam pelo resto da vida.',
          aplicacao: 'Para análise de personalidade adulta: comportamentos problemáticos frequentemente são crises de desenvolvimento não resolvidas que retornam. A dificuldade de confiar, a vergonha excessiva, a confusão de identidade — têm endereço developmental. Conhecer a crise não resolvida é conhecer o padrão que vai se repetir.',
          intensidade: '★★★★☆',
          protocolo: [
            '1. DIAGNÓSTICO DAS PRÓPRIAS CRISES: Percorra as oito crises eriksonianas e identifique quais foram resolvidas de forma robusta e quais deixaram déficits. Onde você tem dificuldade de confiar? Onde sente vergonha excessiva? Onde a identidade permanece confusa? Os déficits não resolvidos são os pontos onde o comportamento sob pressão regride.',
            '2. LEITURA DEVELOPMENTAL DE OUTROS: Para as pessoas mais importantes na sua vida, identifique qual crise eriksoniana está mais ativa no comportamento delas. O adulto que age como se precisasse provar autonomia constantemente provavelmente tem déficit na crise autonomia vs. vergonha. O comportamento atual aponta para a crise original.',
            '3. ANÁLISE DA CRISE DE IDENTIDADE EM CONTEXTO: Erikson mostra que identidade é renegociada em cada transição de vida. Identifique as transições que você fez nos últimos 5 anos (carreira, relacionamento, perda, mudança de papel). Qual aspecto de identidade foi desafiado? Como você respondeu? A resposta revela o recurso desenvolvido ou o déficit latente.',
            '4. MAPEAMENTO DE LEGADO E ESTAGNAÇÃO: A crise da meia-vida eriksoniana é generatividade vs. estagnação — o senso de estar contribuindo para além de si vs. o de estar girando em círculos. Para onde sua energia vai hoje? O que você está construindo que vai durar além de você? A ausência de resposta é dado diagnóstico, não apenas filosófico.',
          ]
        },
      ]
    },
    {
      label: 'NÍVEL 2 — Pensamento Sistêmico',
      books: [
        {
          author: 'Otto Kernberg', title: 'Borderline Conditions and Pathological Narcissism', year: '1975', lang: 'Inglês',
          tese: 'A teoria das relações de objeto: experiências precoces com cuidadores formam representações internas (objetos internos) de si mesmo e dos outros que governam todas as relações futuras. A divisão (splitting) como defesa primitiva: o mundo é bom ou mau, nunca ambos.',
          aplicacao: 'Para entender comportamentos de idealização e desvalorização que parecem inexplicáveis: pessoas com organização de personalidade borderline oscilam entre idealizar e depreciar o mesmo objeto. Compreender o mecanismo de splitting permite prever o colapso da idealização antes que aconteça.',
          intensidade: '★★★★★',
          protocolo: [
            '1. DETECÇÃO DE SPLITTING EM INTERAÇÕES: O sinal mais claro de splitting: a pessoa que ontem você era perfeito hoje é completamente decepcionante — sem gradação. Monitore nos próximos 30 dias interações onde alguém muda radicalmente a avaliação de uma pessoa ou situação sem fato novo substancial. Qual era a idealização anterior? O que ativou a desvalorização?',
            '2. ANÁLISE DE RELAÇÕES DE OBJETO PRÓPRIAS: Identifique os padrões de seus relacionamentos mais íntimos: você tende a idealizar inicialmente e decepcioná-los? A decepção é geralmente com o mesmo tipo de falha? O padrão repetitivo revela o objeto interno ativado — não apenas a pessoa à sua frente.',
            '3. MAPEAMENTO DE DEFESAS PRIMITIVAS vs. MADURAS: Kernberg distingue defesas primitivas (splitting, projeção, idealização) de maduras (repressão, racionalização, sublimação). Identifique quais defesas você usa mais sob estresse. As defesas primitivas indicam que a organização de personalidade está sendo testada além da capacidade atual.',
            '4. TESTE DA AMBIVALÊNCIA TOLERADA: A saúde psicológica kernbergiana é a capacidade de tolerar ambivalência — a mesma pessoa pode ser boa e má, amada e irritante, confiável e falha. Para cada relacionamento importante, você consegue manter ambos os polos simultaneamente? Onde a tolerância colapsa em divisão?',
          ]
        },
        {
          author: 'John Bowlby', title: 'Attachment and Loss, Vol. 1: Attachment', year: '1969', lang: 'Inglês',
          tese: 'A teoria do apego: o vínculo com o cuidador primário não é secundário às necessidades físicas — é necessidade primária. O modelo de trabalho interno formado nos primeiros anos governa todas as relações íntimas subsequentes através de expectativas sobre disponibilidade e responsividade do outro.',
          aplicacao: 'Para entender padrões de relacionamento que resistem à mudança consciente: o estilo de apego (seguro, ansioso, evitativo, desorganizado) é o sistema operacional das relações íntimas. Identificar o estilo de apego de alguém prediz como vai se comportar quando a relação é ameaçada.',
          intensidade: '★★★★★',
          protocolo: [
            '1. IDENTIFICAÇÃO DO ESTILO DE APEGO: Mapeie seu padrão em relacionamentos íntimos. Seguro: conforto com intimidade e autonomia. Ansioso: preocupação com abandono, necessidade de confirmação. Evitativo: desconforto com intimidade, autossuficiência defensiva. Desorganizado: oscilação entre aproximação e fuga. O padrão se revela mais claramente nos momentos de ameaça ou separação.',
            '2. ANÁLISE DE ATIVAÇÃO DO SISTEMA DE APEGO: Identifique os gatilhos específicos que ativam seu sistema de apego (sinais de rejeição, distância, imprevisibilidade do outro). O que especificamente dispara a ansiedade ou o fechamento? A especificidade do gatilho revela a experiência original que formou o modelo de trabalho interno.',
            '3. LEITURA DE ESTILOS DE APEGO ALHEIOS: Para cada relacionamento importante (profissional ou pessoal), identifique o estilo de apego da pessoa. O ansioso vai interpretar sua independência como rejeição. O evitativo vai recuar quando você se aproximar. O desorganizado vai oscilar inexplicavelmente. Conhecer o estilo é conhecer a resposta antes de agir.',
            '4. EXERCÍCIO DE SEGURANÇA INTERNA: O apego seguro pode ser desenvolvido mesmo quando não foi o padrão original. Uma vez por semana, identifique uma situação onde você respondeu a partir do apego inseguro (ansiedade ou evitação) e imagine como teria respondido com base segura: presença sem ansiedade, intimidade sem perda de si. O exercício de imaginação prepara para a resposta diferente.',
          ]
        },
      ]
    },
    {
      label: 'NÍVEL 3 — Domínio Técnico',
      books: [
        {
          author: 'Nancy McWilliams', title: 'Psychoanalytic Diagnosis', year: '1994', lang: 'Inglês',
          tese: 'O mapa clínico mais completo de estruturas de caráter: 14 tipos com dinâmicas específicas, mecanismos de defesa predominantes, padrões interpessoais, transferência e contratransferência. Distingue nível de organização (psicótico, borderline, neurótico) de tipo de personalidade.',
          aplicacao: 'Para profiling de personalidade em contexto não-clínico: cada estrutura de caráter tem uma "assinatura interpessoal" — o que a pessoa faz com as pessoas ao redor. O narcisista usa as pessoas como espelho. O depressivo as usa como juiz. O obsessivo as usa como adversário em uma competição de exatidão. Conhecer a estrutura é conhecer o papel que você será convidado a jogar.',
          intensidade: '★★★★★ — Literatura técnica essencial',
          protocolo: [
            '1. ESTUDO DE UM TIPO POR MÊS: McWilliams é literatura técnica — não leitura linear. Escolha um tipo de caráter por mês e estude a dinâmica interpessoal específica: qual papel o terapeuta (e qualquer outra pessoa próxima) é convocado a exercer? Quais são os padrões de relacionamento? Como o tipo se manifesta sob estresse? 14 meses constroem um mapa robusto.',
            '2. IDENTIFICAÇÃO DA CONVOCAÇÃO INTERPESSOAL: Cada estrutura de caráter "convoca" a outra pessoa para um papel específico. Na próxima semana, em cada interação significativa, identifique: para qual papel você está sendo convocado? Admirador? Juiz? Cuidador? Adversário? A convocação revela a estrutura do convocador mais claramente que qualquer declaração.',
            '3. ANÁLISE DE MECANISMOS DE DEFESA: McWilliams lista e descreve em detalhe os mecanismos de defesa por tipo. Identifique os mecanismos predominantes das 3 pessoas mais difíceis na sua vida: projeção? Negação? Intelectualização? Identificação projetiva? Nomear o mecanismo reduz o poder que tem sobre a interação.',
            '4. DISTINÇÃO DE NÍVEL DE ORGANIZAÇÃO: A distinção mais operacionalmente útil de McWilliams: nível psicótico (contato frágil com realidade), borderline (instabilidade, splitting) vs. neurótico (estrutura estável, conflito interno). Para cada pessoa importante, identifique o nível de organização — não o diagnóstico, mas a estabilidade da estrutura. Isso determina o que é possível em qualquer interação.',
          ]
        },
        {
          author: 'Aaron Beck', title: 'Cognitive Therapy and the Emotional Disorders', year: '1976', lang: 'Inglês',
          tese: 'Esquemas cognitivos: crenças centrais sobre si mesmo, o mundo e o futuro formadas em experiências precoces que filtram toda percepção subsequente. A tríade cognitiva da depressão (eu sou inadequado, o mundo é hostil, o futuro é sem esperança) como exemplo de esquema que cria e confirma sua própria realidade.',
          aplicacao: 'Para entender por que pessoas inteligentes tomam decisões sistematicamente distorcidas: não é irracionalidade — é racionalidade operando sobre premissas erradas. Identificar o esquema cognitivo central de alguém revela o filtro através do qual toda informação passa. Mude o esquema — mude o comportamento.',
          intensidade: '★★★★☆',
          protocolo: [
            '1. IDENTIFICAÇÃO DE ESQUEMAS PESSOAIS: Os esquemas centrais mais comuns: "Sou fundamentalmente inadequado", "Não sou amável", "O mundo é perigoso", "Preciso ser perfeito para ter valor", "Não posso confiar em ninguém". Identifique quais operam em você através das situações que geram reações emocionais desproporcionais — a intensidade da reação indica a profundidade do esquema.',
            '2. RASTREIO DE DISTORÇÕES COGNITIVAS: Beck identifica distorções específicas: catastrofização, leitura mental, personalização, pensamento tudo-ou-nada, abstração seletiva, generalização excessiva. Durante uma semana, registre pensamentos automáticos negativos e identifique qual distorção está ativa. O padrão de distorções revela o esquema subjacente.',
            '3. ANÁLISE DE ESQUEMAS ALHEIOS: Para as pessoas cujo comportamento é mais difícil de compreender, identifique o esquema provável que está gerando o comportamento. O chefe que interpreta qualquer questionamento como ataque pessoal provavelmente opera no esquema "preciso de controle para ser seguro". A compreensão do esquema converte a reação irritada em resposta estratégica.',
            '4. TESTE COMPORTAMENTAL: Beck usa experimentos comportamentais para testar a validade dos esquemas. Para um esquema que você identificou em si mesmo, projete um pequeno teste: se você acredita que "mostrar vulnerabilidade leva à rejeição", teste com uma pessoa segura. O objetivo não é eliminar o esquema — é gerar evidência de que ele pode ser impreciso.',
          ]
        },
      ]
    },
    {
      label: 'NÍVEL 4 — Síntese Avançada',
      books: [
        {
          author: 'Peter Fonagy, György Gergely, Elliot Jurist & Mary Target', title: 'Affect Regulation, Mentalization, and the Development of the Self', year: '2002', lang: 'Inglês',
          tese: 'Mentalização: a capacidade de compreender comportamento — próprio e alheio — em termos de estados mentais (desejos, intenções, emoções, crenças). Preditor mais robusto de saúde psicológica, qualidade de relacionamentos e resiliência. Desenvolvida (ou não) na relação com cuidadores que tratam a criança como ser com mente.',
          aplicacao: 'Para análise de conflitos interpessoais: a maioria dos conflitos resulta de falha de mentalização — a pessoa age como se o comportamento do outro fosse sem mente (mecânico, malicioso ou incompreensível). Restaurar a curiosidade sobre os estados mentais do outro é o ato clínico e estratégico mais poderoso disponível.',
          intensidade: '★★★★★',
          protocolo: [
            '1. EXERCÍCIO DE MENTALIZAÇÃO ATIVA: Uma vez por dia, escolha um comportamento de alguém que te irritou ou confundiu. Em vez de reagir ou julgar, passe 2 minutos formulando explicitamente: qual estado mental (intenção, emoção, crença, necessidade) poderia explicar esse comportamento? Formule pelo menos 3 hipóteses diferentes. A multiplicidade de hipóteses é o sinal de mentalização funcionando.',
            '2. MONITORAMENTO DE FALHAS DE MENTALIZAÇÃO: Identifique quando você cai em modo de equivalência psíquica (sua perspectiva = realidade objetiva), modo faz-de-conta (dissociação da realidade) ou modo teleológico (só o concreto e observável conta, estados mentais não existem). Esses modos são os pontos onde a mentalização falhou e o comportamento primitivo toma o lugar.',
            '3. AVALIAÇÃO DE CAPACIDADE DE MENTALIZAÇÃO ALHEIA: Para as pessoas mais importantes na sua vida, avalie: elas conseguem refletir sobre seus próprios estados mentais? Conseguem imaginar perspectivas diferentes da delas? São curiosas sobre o que você sente e pensa? A capacidade de mentalização é o preditor mais confiável de qualidade de relacionamento disponível.',
            '4. PRÁTICA DE MENTALIZAÇÃO EM CONFLITO: O momento mais crítico é quando a mentalização é mais necessária e mais difícil: em conflito emocional. Desenvolva um protocolo: quando sentir intensidade emocional alta, pause e formule explicitamente: qual é o estado mental provável do outro agora? Qual é o meu estado mental agora? Que perspectiva do outro eu poderia estar perdendo?',
          ]
        },
        {
          author: 'Bessel van der Kolk', title: 'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma', year: '2014', lang: 'Inglês',
          tese: 'Trauma como memória inscrita no corpo — não como narrativa, mas como resposta física. O trauma reorganiza o sistema nervoso, o cérebro (especialmente amígdala e córtex pré-frontal) e o sistema imunológico. O corpo re-encena o trauma em situações que o disparam, independente do que a mente racionalmente sabe.',
          aplicacao: 'Para entender comportamentos que resistem completamente à compreensão intelectual: não é irracionalidade — é o sistema nervoso operando em modo de sobrevivência ativado por gatilhos que a mente consciente não reconhece. Para análise de padrões relacionais: o trauma de apego governa a resposta ao outro antes de qualquer pensamento.',
          intensidade: '★★★★★',
          protocolo: [
            '1. MAPEAMENTO DE RESPOSTAS CORPORAIS A GATILHOS: Durante duas semanas, preste atenção às sensações físicas que acompanham reações emocionais intensas. Onde você sente no corpo? Constrição no peito, tensão nos ombros, nó no estômago? Mapear a assinatura corporal de cada emoção é o primeiro passo para reconhecê-la antes de reagir.',
            '2. IDENTIFICAÇÃO DE GATILHOS DE SOBREVIVÊNCIA: Identifique situações que produzem reações desproporcionais ao estímulo presente — onde a reação parece vir de outro lugar, outro tempo. Esses são os gatilhos traumáticos. O objetivo não é eliminar a reação, mas criar um momento de reconhecimento: "isso é passado, não presente."',
            '3. LEITURA SOMÁTICA DE OUTROS: Van der Kolk mostra que o corpo comunica o estado emocional antes da mente processar. Observe as respostas corporais das pessoas em situações de stress: respiração superficial, rigidez postural, hipervigilância, freeze. Esses sinais revelam o nível de ativação do sistema de ameaça — independente do que a pessoa diz.',
            '4. JANELA DE TOLERÂNCIA: Van der Kolk usa o conceito de janela de tolerância — a faixa de ativação onde a pessoa consegue processar experiência sem hiper ou hipoativação. Identifique a janela das pessoas com quem você trabalha. Interações que extrapolam a janela produzem defensividade, congelamento ou explosão — não aprendizagem ou colaboração.',
          ]
        },
      ]
    },
    {
      label: 'NÍVEL 5 — Fronteira do Conhecimento',
      books: [
        {
          author: 'Allan Schore', title: 'The Science of the Art of Psychotherapy', year: '2012', lang: 'Inglês',
          tese: 'A neurobiologia do apego e da regulação afetiva: os primeiros 2 anos de vida constroem literalmente o sistema nervoso autônomo e o hemisfério direito — sede da regulação emocional implícita, do processamento não-verbal e da comunicação corpo-a-corpo. O desenvolvimento psicológico é fundamentalmente neurobiológico.',
          aplicacao: 'Para entender por que a comunicação não-verbal governa o resultado de interações de alto risco: o hemisfério direito processa mais rápido que o esquerdo e opera fora da consciência. Em qualquer interação, os dois hemisférios direitos estão em comunicação direta antes que qualquer palavra seja processada. Regulação do estado do outro é a habilidade de liderança mais fundamental.',
          intensidade: '★★★★★ — Literatura técnica avançada',
          protocolo: [
            '1. DESENVOLVIMENTO DE PRESENÇA REGULATÓRIA: Schore mostra que o terapeuta (e qualquer figura de cuidado) regula o estado do outro através de sua própria regulação. Antes de qualquer interação de alta intensidade, regule seu próprio estado primeiro: respiração, relaxamento muscular, presença. Um estado regulado regula o ambiente — isso é neurobiologia, não metáfora.',
            '2. LEITURA DE COMUNICAÇÃO HEMISFÉRIO DIREITO: O hemisfério direito comunica através de prosódia (tom de voz), expressão facial, gesto, ritmo e timing. Passe uma semana focando especificamente nesses canais em todas as interações. O que o tom de voz comunica que as palavras negam? Onde o ritmo da conversa acelera ou desacelera — e o que isso indica?',
            '3. MONITORAMENTO DE SINCRONIZAÇÃO: Schore descreve a sincronização como o mecanismo central de todas as relações terapêuticas e de apego. Em interações próximas, observe: você e o outro estão sincronizados (ritmo, tom, postura) ou dessincronizados? A dessincronização crônica é o sinal mais confiável de problema relacional.',
            '4. ANÁLISE DE REPARAÇÃO APÓS RUPTURA: Toda relação tem rupturas de sincronização. O que distingue relações saudáveis não é ausência de ruptura — é a qualidade da reparação. Mapeie como as rupturas são reparadas nas relações mais importantes da sua vida. A reparação bem-sucedida cria mais segurança do que a ausência de ruptura.',
          ]
        },
        {
          author: 'Stephen Porges', title: 'The Polyvagal Theory: Neurophysiological Foundations of Emotions, Attachment, Communication, and Self-regulation', year: '2011', lang: 'Inglês',
          tese: 'A teoria polivagal: o sistema nervoso autônomo tem três níveis hierárquicos — segurança/conexão (sistema vagal ventral), mobilização/luta-fuga (simpático) e imobilização/colapso (vagal dorsal). O sistema nervoso avalia constantemente o ambiente em busca de sinais de segurança ou ameaça (neuroception) antes de qualquer percepção consciente.',
          aplicacao: 'Para entender comportamentos de shutdown, colapso e dissociação que parecem incompreensíveis: são respostas automáticas do sistema nervoso ao estado percebido de ameaça existencial. Para criar ambientes de segurança que ativam colaboração e aprendizagem: os sinais de segurança são específicos, identificáveis e reproduzíveis.',
          intensidade: '★★★★★',
          protocolo: [
            '1. IDENTIFICAÇÃO DE ESTADOS POLIVAGAIS: Aprenda a reconhecer os três estados em você e nos outros. Vagal ventral: engajamento social, tom de voz modulado, presença, curiosidade. Simpático: urgência, reatividade, hipervigilância, defensividade. Vagal dorsal: shutdown, apatia, dissociação, "não estou presente". O estado governa o comportamento mais do que qualquer intenção.',
            '2. DESIGN DE SEGURANÇA PARA INTERAÇÕES CRÍTICAS: Porges identifica os sinais específicos que ativam o sistema de segurança: prosódia vocal (voz melodiosa, não monótona), contato visual (não intenso, mas presente), expressão facial positiva, movimento lento e previsível. Antes de qualquer conversa difícil, projete deliberadamente esses sinais de segurança no ambiente.',
            '3. MONITORAMENTO DE NEUROCEPTION: A neuroception é a avaliação automática de segurança/ameaça que ocorre antes da percepção consciente. Desenvolva a habilidade de observar quando seu sistema nervoso avaliou algo como ameaçador antes de você ter consciência disso: qual foi o gatilho? Era real ou residual? Essa distinção é central para respostas não-reativas.',
            '4. ANÁLISE DE AMBIENTE ORGANIZACIONAL: Os princípios polivagais se aplicam a qualquer grupo. Identifique em organizações que você conhece: qual é o estado dominante do sistema nervoso coletivo? Segurança e engajamento ou vigilância e defesa? Quais sinais específicos no ambiente estão ativando cada estado? Ambientes que ativam cronicidade simpática destroem cognição e criatividade.',
          ]
        },
      ]
    },
  ]
};

// ─── DATA — EIXO II ──────────────────────────────────────────────────────────

const eixo2 = {
  num: 'EIXO II',
  title: 'Poder: Estrutura, Dinâmica e Operação',
  subtitle: 'Como o poder funciona, como é conquistado, mantido e perdido — da escala individual à civilizacional',
  conceptText: 'O poder não é ter — é fazer. É a capacidade de fazer outros fazerem o que não fariam espontaneamente, e de fazer isso parecer natural, desejável ou inevitável. Quem entende a mecânica do poder antes dos outros tem vantagem estrutural em qualquer escala — de uma negociação a uma nação.',
  levels: [
    {
      label: 'NÍVEL 0 — Fundamentos Universais',
      books: [
        {
          author: 'Nicolau Maquiavel', title: 'O Príncipe', year: '1513', lang: 'Italiano',
          tese: 'O realismo político como fundação: o poder opera por suas próprias leis, separadas da moral. Virtù (habilidade de moldar a fortuna) e Fortuna (circunstância) como os dois eixos do destino político. A necessidade de adaptar o caráter à situação — a raposa e o leão.',
          aplicacao: 'Leitura operacional, não histórica: cada capítulo descreve uma situação política recorrente. Para análise de líderes e organizações: qual é a relação deste líder com a necessidade? Com a crueldade necessária? Com a aparência de virtude? Maquiavel é o primeiro a separar política de ética para descrevê-la como realmente funciona.',
          intensidade: '★★★☆☆ — Leitura fundacional obrigatória',
          protocolo: [
            '1. LEITURA SITUACIONAL ATIVA: Releia O Príncipe identificando para cada conselho o tipo de situação que o activa. Não leia como máximas universais — leia como diagnósticos situacionais. "É melhor ser temido que amado" é verdadeiro em quais situações específicas? Falso em quais? A aplicação correta exige diagnóstico situacional preciso.',
            '2. ANÁLISE DE VIRTÙ vs. FORTUNA: Para cada grande sucesso e fracasso na sua vida profissional, divida o resultado entre virtù (o que você fez que determinou o resultado) e fortuna (o que a circunstância determinou independente de você). A proporção honesta revela onde seu senso de agência está inflado ou deflado.',
            '3. MAPEAMENTO DE NECESSIDADE POLÍTICA: Maquiavel é o filósofo da necessidade — o que a situação exige, independente da preferência pessoal. Identifique uma situação atual onde você está evitando uma ação necessária por conforto moral. Qual é o custo real de não agir? Maquiavel ensina que a crueldade tardia é sempre pior que a crueldade precoce.',
            '4. ANÁLISE DE APARÊNCIA vs. REALIDADE: Maquiavel é explícito: o príncipe deve parecer virtuoso mais do que ser virtuoso. Identifique líderes que você conhece aplicando esse princípio. Quais virtudes são performadas para audiências específicas? Onde a aparência e a realidade divergem mais? O que eles nunca seriam vistos fazendo?',
          ]
        },
        {
          author: 'Sun Tzu', title: 'A Arte da Guerra', year: '500 a.C.', lang: 'Chinês',
          tese: 'A vitória sem conflito como ideal estratégico supremo. Conhecimento de si e do inimigo como condição necessária para toda estratégia. Adaptação à situação (shih) como supremacia sobre força bruta. A guerra como engano — o objetivo é que o adversário capitule sem saber que foi derrotado.',
          aplicacao: 'Para qualquer competição — de negócios a negociação: a vitória antes da batalha (ganhar antes de lutar) como critério de excelência estratégica. Para análise de adversários: o que eles valorizam? O que os motiva? Onde estão vulneráveis? A resposta a essas perguntas determina a estratégia antes de qualquer ação.',
          intensidade: '★★★☆☆',
          protocolo: [
            '1. ANÁLISE DE CONHECIMENTO DE SI: Sun Tzu diz: conhece o inimigo, conhece-te a ti mesmo, em cem batalhas nunca serás derrotado. Para qualquer competição atual, faça uma avaliação honesta de suas forças e fraquezas reais — não as que você deseja ter. Onde sua avaliação de si mesmo provavelmente está inflada? Quem te diria a verdade que você está evitando?',
            '2. MAPEAMENTO DO TERRENO ANTES DA BATALHA: Sun Tzu é obsessivo com o terreno. Para qualquer negociação ou conflito importante, mapeie antes: quem tem mais a perder? Quem tem mais urgência? Quem tem mais alternativas? As respostas determinam quem tem o poder estrutural — independente de quem faz o discurso mais convincente.',
            '3. IDENTIFICAÇÃO DE PONTOS DE VAZIO: Sun Tzu ataca onde o inimigo está vazio (sem cobertura, sem força) e evita onde está sólido. Identifique em cada situação competitiva: onde o adversário está sobrecarregado, distraído ou descoberto? Onde está protegido e consolidado? Atacar o sólido é desperdiçar recursos; atacar o vazio é eficiência.',
            '4. ESTRATÉGIA DA NÃO-BATALHA: O teste de excelência estratégica: quantas vezes no último mês você conseguiu o que queria sem conflito direto? Sem desgaste de recursos? Sem criar ressentimento? A vitória sem batalha exige criatividade e paciência — e é sempre mais eficiente que a vitória por força.',
          ]
        },
      ]
    },
    {
      label: 'NÍVEL 1 — Consolidação Teórica',
      books: [
        {
          author: 'Robert Greene', title: 'As 48 Leis do Poder', year: '1998', lang: 'Inglês',
          tese: 'Destilação histórica de 3000 anos de comportamento humano em contextos de poder: como as pessoas realmente operam nos jogos de status, influência e dominância. Cada lei é ilustrada com casos históricos que mostram a lei em ação e em violação.',
          aplicacao: 'Para observação de dinâmicas organizacionais e políticas: as leis não são prescrições — são descrições do que acontece. Para cada situação de poder, identifique qual lei está em operação. O objetivo não é aplicar as leis cinicamente — é reconhecê-las quando outros as aplicam.',
          intensidade: '★★★★☆',
          protocolo: [
            '1. UMA LEI POR SEMANA: Não leia As 48 Leis de uma vez — uma lei por semana, com aplicação específica. Para cada lei: encontre um exemplo recente da sua vida onde a lei foi violada (sua ou de outro). Quais foram as consequências? Encontre um exemplo onde foi seguida conscientemente. O aprendizado é sempre através de casos concretos.',
            '2. LEITURA DEFENSIVA: O valor principal do livro para a maioria das pessoas não é ofensivo — é defensivo. Para as 10 leis mais relevantes ao seu contexto (trabalho, política, família), aprenda a reconhecer quando estão sendo aplicadas a você. Qual lei está sendo usada nesta conversa? Esta situação está sendo "desenhada" para me colocar em qual posição?',
            '3. ANÁLISE DO CONTRAEXEMPLO DE GREENE: Greene sempre mostra violações das leis que funcionaram ou leis que destruíram quem pareciam proteger. Identifique as condições que fazem a lei falhar. Nenhuma lei opera em todas as situações — o julgamento situacional é o que distingue o estudante do mestre.',
            '4. MAPEAMENTO DE CORTE: A Lei 23 (Concentre suas forças) e a Lei 36 (Despreze o que não pode ter) são as mais violadas. Para cada situação atual de poder: onde você está dispersando forças em muitas frentes? O que você está perseguindo que dá poder ao que você quer por mero desejo de tê-lo? Concentração e indiferença estratégica são as duas alavancas mais subestimadas.',
          ]
        },
        {
          author: 'Friedrich Nietzsche', title: 'Além do Bem e do Mal', year: '1886', lang: 'Alemão',
          tese: 'A crítica da moralidade como vontade de poder disfarçada: os valores morais não são descobertos — são criados por grupos específicos para servir seus interesses. A moralidade de escravos (ressentimento que transforma fraqueza em virtude) vs. a moralidade de senhores (criação de valores a partir da força). O filósofo do futuro como legislador de valores.',
          aplicacao: 'Para análise de ideologias, movimentos sociais e sistemas de valor: toda moralidade tem um genealogia de poder. Quem criou esses valores? Cujos interesses eles servem? A questão "quem se beneficia desse valor?" não invalida o valor — mas revela sua origem e seus limites.',
          intensidade: '★★★★★',
          protocolo: [
            '1. GENEALOGIA DOS PRÓPRIOS VALORES: Escolha 5 valores que você considera fundamentais (honestidade, lealdade, trabalho duro, humildade, etc.). Para cada um: de onde vieram? Quem os promoveu? Cujos interesses serviam quando foram ensinados a você? A genealogia não destrói o valor — mas distingue escolha refletida de herança não examinada.',
            '2. DETECÇÃO DE RESSENTIMENTO: Nietzsche define ressentimento como a transformação de fraqueza em virtude moral — o incapaz de agir que converte sua incapacidade em superioridade moral. Identifique na sua vida: onde você está usando a linguagem moral para mascarar impotência? Onde o "deveria" esconde o "não consigo"?',
            '3. ANÁLISE NIETZSCHIANA DE DISCURSOS MORAIS: Para cada movimento social ou campanha moral que você observa, pergunte: quem são os beneficiados pela adoção desses valores? O discurso moral está gerando poder para quem? A análise não é cinismo — é higiene intelectual.',
            '4. PRÁTICA DE CRIAÇÃO DE VALORES: A resposta de Nietzsche ao niilismo não é relativismo — é criação ativa de valores a partir da afirmação da vida. Identifique um valor que você escolheu conscientemente (não herdou, não absorveu por pressão social) e que orienta suas ações. Se você não consegue identificar nenhum, isso é dado diagnóstico importante.',
          ]
        },
      ]
    },
    {
      label: 'NÍVEL 2 — Pensamento Sistêmico',
      books: [
        {
          author: 'Max Weber', title: 'Economia e Sociedade', year: '1922', lang: 'Alemão',
          tese: 'A tipologia da dominação legítima: tradicional (autoridade do sempre foi assim), carismática (autoridade da excepcionalidade pessoal) e racional-legal (autoridade das normas e procedimentos). Cada tipo tem sua lógica de legitimação, seus pontos de força e seus mecanismos de colapso.',
          aplicacao: 'Para análise de organizações e regimes: qual tipo de dominação está em operação? A dominação carismática é instável por natureza — quando o carisma falha (doença, erro, derrota), o sistema colapsa. A dominação racional-legal é estável mas burocratizante. Identificar o tipo é prever a vulnerabilidade.',
          intensidade: '★★★★★',
          protocolo: [
            '1. DIAGNÓSTICO DE TIPO DE DOMINAÇÃO: Para cada organização que você conhece (empresa, governo, grupo social), identifique o tipo weberiano dominante. É a autoridade do fundador carismático? Das normas e procedimentos? Da tradição? O tipo determina o que é possível — e o que é impossível — em cada sistema.',
            '2. ANÁLISE DE ROTINIZAÇÃO DO CARISMA: Weber mostra que toda dominação carismática enfrenta o problema da sucessão — como transformar o carisma pessoal em estrutura duradoura (rotinização). Para líderes carismáticos que você observa: qual é o plano de rotinização? O que acontece quando o líder não está? A resposta revela a solidez da estrutura.',
            '3. MAPEAMENTO DE BUROCRATIZAÇÃO: A dominação racional-legal tende à burocratização crescente — a regra pela regra, o procedimento que substitui o objetivo. Identifique onde na sua organização procedimentos já não servem ao objetivo para o qual foram criados. A burocracia é poder institucional autorreferente — entendê-la como tal é a condição para navegá-la.',
            '4. ANÁLISE DE LEGITIMIDADE: Toda dominação precisa de legitimidade — a crença dos dominados de que a dominação é justificada. Para uma situação de poder que você observa: qual é a base de legitimidade invocada? É crível? O que ameaçaria essa legitimidade? A crise de legitimidade é sempre mais perigosa para o sistema do que qualquer ameaça externa.',
          ]
        },
        {
          author: 'Hannah Arendt', title: 'As Origens do Totalitarismo', year: '1951', lang: 'Inglês',
          tese: 'O totalitarismo como forma de poder radicalmente nova — não mera tirania ou ditadura, mas destruição sistemática da capacidade de ação e pensamento político. O terror como princípio operacional, não instrumento: não punição do oponente, mas dissolução de toda espontaneidade humana.',
          aplicacao: 'Para análise de regimes e organizações que buscam controle total: o totalitarismo começa com a destruição do espaço público (onde a ação política é possível) e da solidariedade (que torna a resistência possível). Identificar esses movimentos iniciais é identificar a trajetória antes do destino.',
          intensidade: '★★★★★',
          protocolo: [
            '1. IDENTIFICAÇÃO DE CONDIÇÕES PRECEDENTES: Arendt analisa as condições que tornam o totalitarismo possível: imperialismo, antissemitismo, dissolução de classes. Para o contexto contemporâneo: quais condições análogas estão presentes? Quais grupos estão sendo tornados supérfluos? Onde o espaço de pluralidade política está sendo corroído?',
            '2. ANÁLISE DO PAPEL DA PROPAGANDA TOTALITÁRIA: Arendt mostra que a propaganda totalitária não convence — ela destrói a capacidade de distinguir verdade de mentira. Onde você observa hoje não propaganda que argumenta, mas propaganda que confunde sistemicamente? A confusão epistemológica permanente é o objetivo, não o efeito colateral.',
            '3. ESTUDO DA BANALIDADE DO MAL: Eichmann em Jerusalém (obra correlata): o mal burocrático como ausência de pensamento — não maldade, mas irreflexão. Para cada sistema burocrático que você conhece: quais ações são realizadas "por procedimento" sem reflexão sobre suas consequências? Onde a ausência de pensamento produz consequências que ninguém escolheu individualmente?',
            '4. EXERCÍCIO DE PENSAMENTO ARENDTIANO: Arendt define pensamento como diálogo interno do eu consigo mesmo. Este diálogo é o que impede a banalidade do mal. Desenvolva uma prática de questionamento antes de ações com impacto em outros: o que estou fazendo? Por quê? Quais são as consequências para quem? A pergunta habitual é a diferença entre agente e instrumento.',
          ]
        },
      ]
    },
    {
      label: 'NÍVEL 3 — Domínio Técnico',
      books: [
        {
          author: 'Bertrand Russell', title: 'Power: A New Social Analysis', year: '1938', lang: 'Inglês',
          tese: 'Taxonomia sistemática do poder: poder sobre a natureza, poder sobre outros seres humanos e poder sobre si mesmo. As formas de poder sobre outros: poder físico (força), riqueza (incentivo) e persuasão (influência sobre crenças e desejos). O amor ao poder como motivação tão fundamental quanto o amor à riqueza ou ao prazer.',
          aplicacao: 'Para análise de motivação de líderes e estruturas de poder: a taxonomia de Russell permite classificar qualquer operação de poder segundo seus fundamentos. A persuasão é o mais eficiente e o menos visível — quem controla crenças controla comportamento sem custo de força ou riqueza.',
          intensidade: '★★★★☆',
          protocolo: [
            '1. ANÁLISE DE FORMAS DE PODER EM CADA SITUAÇÃO: Para qualquer situação de poder que você observa, classifique a forma predominante: força física, controle de recursos, persuasão de crenças ou autoridade de expertise. A forma revela os limites e os custos — poder baseado em força pura tem custo alto de manutenção; poder baseado em crença é autossustentado mas frágil se a crença é questionada.',
            '2. MAPEAMENTO DO AMOR AO PODER: Russell argumenta que o amor ao poder é subestimado como motivação. Para os líderes que você observa: qual é a proporção de motivação por poder vs. por riqueza vs. por aprovação vs. por realização de valores? A motivação real determina a estabilidade do comportamento e seus pontos de colapso.',
            '3. ANÁLISE DE PODER SOBRE SI MESMO: Russell valoriza poder sobre si (autodomínio) acima de poder sobre outros. Para você mesmo: onde você tem menos poder sobre seus próprios impulsos, reações e comportamentos? Esses são os pontos onde você é mais manipulável por quem identifica suas fraquezas.',
            '4. ESTUDO DE EQUILÍBRIO DE PODER: Russell é um dos primeiros a analisar sistematicamente o equilíbrio de poder como princípio de estabilidade política. Para organizações que você conhece: o poder está concentrado ou distribuído? Qual é o mecanismo de equilíbrio? Onde o desequilíbrio está crescendo? Sistemas com poder muito concentrado são instáveis — não necessariamente injustos, mas instáveis.',
          ]
        },
        {
          author: 'Robert Caro', title: 'The Power Broker: Robert Moses and the Fall of New York', year: '1974', lang: 'Inglês',
          tese: 'Biografia definitiva de Robert Moses como estudo do poder burocrático acumulado durante 44 anos: como controle de financiamento, informação e expertise permite a um único indivíduo remodelar uma cidade sem nunca ser eleito — e sem nunca poder ser removido pelos eleitos.',
          aplicacao: 'O caso mais documentado de acumulação e exercício de poder burocrático na história americana. Para entender como poder real funciona em organizações: não é hierarquia formal — é controle de recursos críticos, de informação e do timing de decisões. Moses controlava o fluxo de caixa de projetos que políticos eleitos dependiam para se reeleger.',
          intensidade: '★★★★★ — Leitura longa, indispensável',
          protocolo: [
            '1. MAPEAMENTO DE PODER ESTRUTURAL vs. FORMAL: Na organização onde você trabalha: quem tem poder formal (título, hierarquia) e quem tem poder estrutural (controle de recursos, informação, acesso)? Frequentemente são pessoas diferentes. Moses nunca teve o maior título — tinha o maior controle de recursos e informação.',
            '2. ANÁLISE DE CONTROLE DE INFORMAÇÃO: Moses mantinha o poder, em parte, sendo o único que entendia completamente os projetos que controlava — políticos não conseguiam questioná-lo por falta de expertise. Identifique em sua organização: quem detém conhecimento que ninguém mais tem? Esse conhecimento é poder acumulado que opera independente de hierarquia.',
            '3. IDENTIFICAÇÃO DE DEPENDÊNCIAS CRIADAS: Moses criou dependência ao tornar políticos eleitos dependentes de seus projetos para vitórias políticas. Mapeie as dependências na sua organização: quem depende de quem para quê? Quem criou uma dependência que não existia antes? Dependência criada é poder acumulado.',
            '4. TESTE DE DURABILIDADE DO PODER: O poder de Moses durou 44 anos porque era estruturalmente ancorado — não dependia de carisma pessoal, aprovação popular ou qualquer líder específico. Avalie o poder de figuras que você observa: está ancorado em estrutura ou em relações pessoais? Estrutura dura; relações mudam.',
          ]
        },
      ]
    },
    {
      label: 'NÍVEL 4 — Síntese Avançada',
      books: [
        {
          author: 'Elias Canetti', title: 'Massa e Poder', year: '1960', lang: 'Alemão',
          tese: 'Fenomenologia do poder e da massa: a multidão como entidade com dinâmica própria que dissolve o indivíduo. O comando como espinho: toda ordem obedecida deixa uma ferida no subordinado que quer ser revertida. A paranoia como estrutura do poder absoluto — o governante que sobreviveu a todos os seus contemporâneos.',
          aplicacao: 'Para análise de liderança carismática e dinâmica de massa: por que as pessoas se dissolvem em multidão? Por que ordens obedecidas geram ressentimento acumulado? Por que poder absoluto tende à paranoia? Canetti é insubstituível para entender a psicologia política profunda.',
          intensidade: '★★★★★',
          protocolo: [
            '1. ANÁLISE DO ESPINHO DO COMANDO: Canetti mostra que toda ordem obedecida deixa uma ferida que quer ser revertida — o subordinado quer dar de volta o comando. Para cada posição de autoridade que você ocupa: quais comandos você dá regularmente? Quem está acumulando o desejo de reversão? Onde esse ressentimento vai encontrar saída? Líderes que nunca pensam nisso são surpreendidos quando a reversão acontece.',
            '2. MAPEAMENTO DE DINÂMICA DE MASSA: Para qualquer movimento de massa que você observa, identifique os elementos de Canetti: o aumento de densidade (quando a multidão se comprime), a igualdade interna (todos iguais na massa), a direção (para onde a massa se move) e o pânico (quando a massa se inverte). Qual elemento está dominando agora?',
            '3. ANÁLISE DE PARANOIA DE PODER: Canetti mostra que quem sobrevive mais que todos os seus contemporâneos desenvolve paranoia estrutural — cada morte de aliado é interpretada como ameaça. Para líderes de longa data em qualquer campo: quantos dos aliados originais ainda estão? O que isso revela sobre o estado atual do poder?',
            '4. EXERCÍCIO DE INVERSÃO DO PODER: Canetti descreve a inversão como o movimento fundamental da história política — os dominados que se tornam dominantes. Para cada situação de dominância que você observa: onde está acumulando a pressão de inversão? Quem está contando os espinhos? O poder que não vê a inversão acumulando é sempre surpreendido por ela.',
          ]
        },
        {
          author: 'Gene Sharp', title: 'The Politics of Nonviolent Action', year: '1973', lang: 'Inglês',
          tese: 'A teoria do poder como consentimento: todo poder político depende da obediência e cooperação dos governados. Quando a cooperação é retirada sistematicamente, o poder colapsa — independente da força militar disponível. As 198 técnicas de ação não-violenta como engenharia de desobediência.',
          aplicacao: 'Para entender tanto o exercício quanto a resistência ao poder: a fonte do poder é sempre o consentimento dos subordinados. Governos que parecem absolutamente poderosos dependem de funcionários que obedecem, soldados que seguem ordens, juízes que validam decisões. Identificar os pilares de sustentação de qualquer poder é identificar seus pontos de colapso.',
          intensidade: '★★★★★',
          protocolo: [
            '1. ANÁLISE DOS PILARES DE PODER: Sharp identifica os pilares que sustentam qualquer sistema de poder: autoridade moral, recursos humanos, habilidades e conhecimento, fatores intangíveis (crenças, hábitos), recursos materiais, sanções. Para qualquer sistema de poder que você analisa: quais são seus pilares? Qual é mais frágil? Onde a retirada de cooperação produziria mais impacto?',
            '2. MAPEAMENTO DE OBEDIÊNCIA HABITUAL: Sharp mostra que a maioria da obediência é habitual — não pensada. Durante uma semana, identifique todos os casos em que você obedece a regras, procedimentos ou autoridades sem questionar. Qual porcentagem dessas obediências é escolha consciente vs. hábito não examinado?',
            '3. ANÁLISE DE PONTOS DE JUDO: Sharp desenvolve o conceito de judo político — usar a força do oponente contra ele. Para qualquer situação de conflito de poder: como as ações repressivas do oponente podem ser convertidas em fortalecimento da posição contrária? A repressão que cria mártires é o exemplo mais visível — mas opera em qualquer escala.',
            '4. ESTUDO DE CASOS DE COLAPSO: Pesquise casos históricos onde sistemas de poder aparentemente sólidos colapsaram rapidamente através de retirada de cooperação (Filipinas 1986, Europa do Leste 1989, etc.). Identifique em cada caso: qual pilar colapsou primeiro? Qual foi o ato de não-cooperação que precedeu os outros? O padrão é mais regular do que parece.',
          ]
        },
      ]
    },
    {
      label: 'NÍVEL 5 — Fronteira do Conhecimento',
      books: [
        {
          author: 'James C. Scott', title: 'Domination and the Arts of Resistance: Hidden Transcripts', year: '1990', lang: 'Inglês',
          tese: 'O transcript público vs. o transcript oculto: o que dominados dizem e fazem na presença dos dominadores vs. o que fazem e dizem fora da visão de poder. Toda dominação produz um espaço de resistência oculto — nas piadas, nos rituais, na linguagem cifrada. A explosão política como momento em que o transcript oculto se torna público.',
          aplicacao: 'Para análise de organizações e regimes: o transcript público (o que as pessoas dizem às autoridades) é sempre parcialmente falso. O transcript oculto (o que dizem entre si) revela o estado real do sistema. Para líderes: a ausência de crítica visível é sinal de saúde ou de transcript oculto desenvolvido?',
          intensidade: '★★★★★',
          protocolo: [
            '1. IDENTIFICAÇÃO DE TRANSCRIPTS OCULTOS: Em qualquer organização que você conhece, identifique o gap entre o transcript público (o que é dito nas reuniões formais, nos relatórios, para a liderança) e o transcript oculto (o que é dito nos corredores, nos almoços, nas conversas informais). O tamanho do gap é medida de disfunção organizacional.',
            '2. LEITURA DE RITUAIS DE RESISTÊNCIA: Scott mostra que dominados criam formas de resistência que são invisíveis ao poder: trabalho lento, fingimento de incompreensão, sabotagem sutil, piadas cifradas. Em organizações que você conhece: quais comportamentos que parecem ineficiência ou incompetência são provavelmente resistência ativa?',
            '3. ANÁLISE DE MOMENTOS DE EXPLOSÃO: Scott descreve a explosão política — quando o transcript oculto emerge publicamente — como os momentos de transformação histórica. Para situações de tensão acumulada que você observa: qual é o transcript oculto que está se desenvolvendo? O que seria necessário para que ele emergisse? Qual seria o gatilho?',
            '4. DESENVOLVIMENTO DE ESPAÇOS DE TRANSCRIPT OCULTO: Scott valoriza esses espaços como necessários para a dignidade dos dominados. Para líderes: estão criando espaços onde feedback honesto pode ser dado sem custo de punição? A ausência desses espaços não significa ausência de crítica — significa que a crítica vai para o transcript oculto, fora do seu alcance.',
          ]
        },
        {
          author: 'Michael Mann', title: 'The Sources of Social Power, Vol. 1', year: '1986', lang: 'Inglês',
          tese: 'As quatro fontes de poder social: ideológica, econômica, militar e política (IEMP). Nenhuma fonte domina permanentemente — a história é o resultado da interação entre as quatro. Organizações sociais emergem como redes de poder que cruzam múltiplas fontes.',
          aplicacao: 'Para análise geopolítica e organizacional: o poder raramente opera através de uma única fonte. Identificar qual combinação de fontes está sustentando um ator específico revela sua vulnerabilidade: onde está mais dependente de uma única fonte? O que acontece quando essa fonte é ameaçada?',
          intensidade: '★★★★★ — Literatura técnica de ciência política',
          protocolo: [
            '1. ANÁLISE IEMP DE ATORES: Para qualquer ator de poder que você analisa (empresa, governo, movimento, líder), mapeie as quatro fontes IEMP: qual é a base ideológica de legitimidade? Qual é o poder econômico? Qual é a capacidade de coerção ou força? Qual é a organização política e administrativa? Onde cada fonte é forte ou fraca?',
            '2. IDENTIFICAÇÃO DE DEPENDÊNCIA DE FONTE ÚNICA: Atores que dependem de uma única fonte de poder são mais vulneráveis. Identifique os atores no seu ambiente com dependência excessiva: o líder que só tem carisma (sem estrutura econômica ou institucional), a empresa que só tem capital (sem legitimidade ideológica). Onde está a concentração de risco?',
            '3. ANÁLISE DE MUDANÇA DE FONTE DOMINANTE: Mann mostra que diferentes períodos históricos têm fontes de poder dominantes diferentes. Para o seu contexto atual: qual fonte de poder está crescendo? Qual está declinando? Quem está bem posicionado na fonte ascendente? A análise de tendência de fontes é análise de poder futuro.',
            '4. MAPEAMENTO DE REDES INTERSTICIAIS: Mann usa o conceito de "poder intersticial" — poder que emerge nos espaços entre as grandes organizações existentes. Para o seu ambiente: onde estão as lacunas entre grandes estruturas de poder? Quem está ocupando esses espaços? As inovações disruptivas geralmente emergem dos espaços intersticiais, não das estruturas estabelecidas.',
          ]
        },
      ]
    },
  ]
};

// ─── DATA — EIXO III ─────────────────────────────────────────────────────────

const eixo3 = {
  num: 'EIXO III',
  title: 'Cognição, Vieses e Arquitetura do Pensamento',
  subtitle: 'Como a mente processa informação, onde erra sistematicamente e como treinar pensamento mais preciso',
  conceptText: 'Racionalidade ecológica: a mente humana não foi desenhada para pensar com precisão lógica — foi desenhada para sobreviver e reproduzir em ambientes específicos. Os "erros" cognitivos são frequentemente soluções adaptativas que viraram problemas em ambientes modernos. Entender a arquitetura cognitiva é entender o mapa de erros previsíveis — seus e dos outros.',
  levels: [
    {
      label: 'NÍVEL 0 — Fundamentos Universais',
      books: [
        {
          author: 'Daniel Kahneman', title: 'Thinking, Fast and Slow', year: '2011', lang: 'Inglês',
          tese: 'Sistema 1 (rápido, automático, heurístico, emocional) vs. Sistema 2 (lento, deliberativo, lógico). O Sistema 1 governa a maioria das decisões e é sistematicamente sujeito a vieses previsíveis: ancoragem, disponibilidade, representatividade, excesso de confiança, ilusão de validade.',
          aplicacao: 'Para análise de decisões — suas e dos outros: identificar qual sistema está operando e quais vieses são mais prováveis na situação. Para design de processos decisórios: quando o Sistema 2 precisa ser forçado a intervir? Como criar fricção que ativa deliberação onde o padrão seria automático?',
          intensidade: '★★★★★ — Leitura obrigatória',
          protocolo: [
            '1. INVENTÁRIO DE VIESES PESSOAIS: Kahneman descreve dezenas de vieses. Identifique os 5 que mais afetam você com base em evidência comportamental (não intuição). Excesso de confiança? Viés de confirmação? Ancoragem? Efeito de recência? Para cada um, identifique 3 decisões recentes onde o viés operou. Consciência específica é mais útil que conhecimento geral.',
            '2. PRÉ-MORTEM PARA DECISÕES IMPORTANTES: Kahneman recomenda o pré-mortem como técnica de ativação do Sistema 2. Antes de qualquer decisão importante, imagine que daqui a um ano a decisão claramente falhou. O que teria causado o fracasso? O exercício força a mente a considerar o que o otimismo do Sistema 1 suprime.',
            '3. IDENTIFICAÇÃO DE ANCORAGEM ALHEIA: Em negociações e discussões, identifique os números e enquadramentos lançados primeiro — eles funcionam como âncoras que puxam todo raciocínio subsequente. Quem lançou a âncora? Era favorável a ele? A consciência da âncora não a elimina — mas cria condição para questioná-la.',
            '4. TESTE DE CALIBRAÇÃO PRÓPRIA: Kahneman documenta o excesso de confiança como o viés mais perigoso. Faça um teste: para 10 afirmações do seu domínio de expertise, estime seu nível de confiança (70%, 90%, etc.) e depois verifique quantas estão corretas. A calibração típica: quem diz 90% de confiança está certo ~70% das vezes. O gap é o excesso de confiança.',
          ]
        },
        {
          author: 'Carol Dweck', title: 'Mindset: The New Psychology of Success', year: '2006', lang: 'Inglês',
          tese: 'Mentalidade fixa (talento é inato e imutável) vs. mentalidade de crescimento (habilidades são desenvolvíveis através de esforço e estratégia). A teoria implícita que uma pessoa tem sobre inteligência e talento determina como ela responde a desafios, fracassos e crítica.',
          aplicacao: 'Para diagnóstico de aprendizagem e resiliência: a mentalidade fixa produz evitação de desafio (para não revelar limitações), defensividade à crítica e colapso diante de fracasso. Para análise de liderança: líderes com mentalidade fixa cercam-se de espelhos, não de questionadores.',
          intensidade: '★★★☆☆',
          protocolo: [
            '1. DIAGNÓSTICO DE MENTALIDADE DOMÍNIO A DOMÍNIO: A mentalidade não é binária ou global — você pode ter mentalidade de crescimento em sua área de expertise e mentalidade fixa em outra. Identifique: em quais domínios você evita desafios porque teme revelar incompetência? Em quais busca ativamente feedback crítico? O padrão domínio a domínio é mais informativo que o rótulo geral.',
            '2. ANÁLISE DE REAÇÃO A FRACASSO: O teste mais confiável de mentalidade é a resposta ao fracasso. Para os últimos 3 fracassos significativos: qual foi a narrativa interna? "Eu não sirvo para isso" (fixa) ou "o que posso aprender para fazer diferente?" (crescimento). A primeira narrativa é dado diagnóstico — não julgamento moral.',
            '3. IDENTIFICAÇÃO DE MENTALIDADE EM OUTROS: Para as pessoas que lideram ou que você observa em posições de poder: como elas respondem ao questionamento? Ao erro? À sugestão de melhoria? Líderes com mentalidade fixa punem quem os questiona e promovem quem os confirma — o resultado é ambiente de informação degradado.',
            '4. CONSTRUÇÃO DE LINGUAGEM DE CRESCIMENTO: Dweck mostra que a linguagem específica usada com crianças (e consigo mesmo) forma a mentalidade. "Você é inteligente" fixa; "você trabalhou muito nisso" crescimento. Identifique as frases que você usa habitualmente consigo mesmo diante de desafio. Substitua por 2 semanas e observe o efeito comportamental.',
          ]
        },
      ]
    },
    {
      label: 'NÍVEL 1 — Consolidação Teórica',
      books: [
        {
          author: 'Nassim Nicholas Taleb', title: 'The Black Swan: The Impact of the Highly Improbable', year: '2007', lang: 'Inglês',
          tese: 'A falácia narrativa: a mente cria histórias coerentes sobre eventos passados que criam ilusão de previsibilidade. O problema da indução: observar mil cisnes brancos não exclui a existência de um cisne negro. Eventos de alto impacto e baixa probabilidade (cisnes negros) estruturam a história mais do que a média dos eventos.',
          aplicacao: 'Para análise de risco e planejamento: a maioria dos modelos de risco ignora os eventos que mais importam — os que estão fora da distribuição normal. Para análise de sucesso e fracasso: quanto do resultado é cisne negro (sorte ou azar extremo) vs. competência? A narrativa post-hoc sempre superestima a competência.',
          intensidade: '★★★★★',
          protocolo: [
            '1. AUDITORIA DE FALÁCIA NARRATIVA: Escolha um sucesso passado que você conta como história de competência. Agora identifique os elementos de sorte, timing e acidente que você minimizou na narrativa. Quanto do resultado era previsível ex ante vs. óbvio apenas ex post? A honestidade sobre a proporção de sorte não diminui competência — aumenta calibração.',
            '2. MAPEAMENTO DE EXPOSIÇÃO A CISNES NEGROS: Para cada área importante da sua vida (carreira, finanças, saúde, relacionamentos): qual seria o impacto de um evento de cauda (positivo ou negativo) que você não está prevendo? Você está estruturado para sobreviver a cisnes negros negativos? Posicionado para capturar cisnes negros positivos?',
            '3. PRÁTICA DE ANTIFRAGILIDADE: Taleb distingue frágil (quebrável pelo estresse), robusto (resistente) e antifrágil (que se fortalece com estresse). Para cada sistema importante na sua vida: em qual categoria está? O que precisaria mudar para torná-lo antifrágil — que se beneficia da incerteza em vez de ser destruído por ela?',
            '4. ANÁLISE DE MODELOS MENTAIS FRÁGEIS: Identifique os modelos que você usa para tomar decisões importantes (sobre mercados, pessoas, organizações). Quais desses modelos pressupõem normalidade e continuidade? O que os tornaria completamente errados? A fragilidade do modelo é o risco não contabilizado mais perigoso.',
          ]
        },
        {
          author: 'Jonathan Haidt', title: 'The Righteous Mind: Why Good People Are Divided by Politics and Religion', year: '2012', lang: 'Inglês',
          tese: 'O elefante e o cavaleiro: a razão é o cavaleiro que racionaliza post-hoc as decisões do elefante (emoção e intuição). As fundações morais (cuidado, justiça, lealdade, autoridade, pureza, liberdade) como matrizes de valores parcialmente incompatíveis que explicam divisões políticas irredutíveis.',
          aplicacao: 'Para entender por que argumentos racionais falham em mudar posições políticas e morais: você não está falhando na argumentação — está ignorando que o elefante já decidiu. Para análise de divisões políticas: identificar qual fundação moral está sendo ativada em cada lado revela por que cada lado considera o outro moralmente incompreensível.',
          intensidade: '★★★★★',
          protocolo: [
            '1. MAPEAMENTO DE FUNDAÇÕES MORAIS PRÓPRIAS: Faça o teste de fundações morais (disponível online: YourMorals.org). Identifique quais fundações você pondera mais e menos. Compare com a distribuição média de liberais e conservadores. A auto-consciência das fundações que você prioriza revela os pontos cegos morais que você tem em relação a quem prioriza outras.',
            '2. ANÁLISE DO ELEFANTE ANTES DO CAVALEIRO: Para cada posição política ou moral que você sustenta, identifique: qual foi a intuição emocional ou tribal que veio primeiro? Como o raciocínio veio depois para justificar? O exercício não é invalidar a posição — é reconhecer o processo real de formação da crença.',
            '3. TRADUÇÃO ENTRE FUNDAÇÕES: Para qualquer conflito ideológico que você observa, identifique as fundações morais de cada lado. Conservadores que valorizam autoridade e pureza precisam ouvir argumentos que falem a essas fundações — não apenas cuidado e justiça. A tradução moral entre fundações é a habilidade de persuasão mais rara e mais eficaz disponível.',
            '4. EXERCÍCIO DE BOAS INTENÇÕES DO LADO OPOSTO: Haidt mostra que as pessoas de todos os lados políticos acreditam genuinamente estar fazendo o bem. Para a posição política que você mais rejeita: construa o argumento mais forte possível para ela em termos das fundações morais de quem a sustenta. A capacidade de fazer isso é medida de sofisticação moral e política.',
          ]
        },
      ]
    },
    {
      label: 'NÍVEL 2 — Pensamento Sistêmico',
      books: [
        {
          author: 'Philip Tetlock & Dan Gardner', title: 'Superforecasting: The Art and Science of Prediction', year: '2015', lang: 'Inglês',
          tese: 'O que distingue previsores superiores (superprevisores) dos especialistas comuns: pensamento probabilístico (expressam incerteza em porcentagens), calibração constante (atualizam posições com novas evidências), humildade epistêmica e análise de base rates. Previsores superiores superam consistentemente especialistas com acesso privilegiado.',
          aplicacao: 'Para melhorar a qualidade de decisões em condições de incerteza: o conjunto de práticas dos superprevisores é ensinável. Para avaliar a qualidade de análises alheias: o analista expressa incerteza em probabilidades? Atualiza posições quando a evidência muda? A resistência a isso é sinal de motivação política, não epistêmica.',
          intensidade: '★★★★★',
          protocolo: [
            '1. PRÁTICA DE PREVISÃO PROBABILÍSTICA: Comece um diário de previsões: para cada evento futuro importante que você antecipa (resultado de negociação, comportamento de alguém, resultado de projeto), expresse em probabilidade (70%? 85%? 40%?). Registre e revise. Após 30 previsões, compare o padrão de acerto com as probabilidades declaradas. Sua calibração é provavelmente pior do que você acha.',
            '2. ANÁLISE DE BASE RATES: Antes de qualquer previsão, Tetlock recomenda começar com a taxa base: projetos como este têm qual taxa de sucesso historicamente? Negociações neste contexto chegam a acordo com qual frequência? A taxa base é o ponto de partida — então ajuste para fatores específicos. A maioria das pessoas não faz o primeiro passo.',
            '3. ATUALIZAÇÃO BAYESIANA: Desenvolva o hábito de, quando receber informação nova, perguntar: isso aumenta ou diminui a probabilidade da minha hipótese? Em quanto? Não mude de posição por cada nova informação — atualize sistematicamente. Identifique evidências que mudariam sua posição. Se não conseguir identificar nenhuma, você não está fazendo análise — está confirmando crença.',
            '4. POST-MORTEM DE PREVISÕES: Tetlock é explícito: o valor das previsões registradas é o feedback. Uma vez por mês, revise previsões anteriores que já podem ser avaliadas. Onde você estava calibrado? Onde superconfiante? Onde subconfiante? O padrão de erros revela vieses sistemáticos corrigíveis.',
          ]
        },
        {
          author: 'George Lakoff & Mark Johnson', title: 'Metaphors We Live By', year: '1980', lang: 'Inglês',
          tese: 'O pensamento humano é fundamentalmente metafórico. Metáforas conceituais — "argumento é guerra", "tempo é dinheiro", "teorias são edifícios" — não são figuras de linguagem: são estruturas cognitivas que determinam o que é pensável, o que é invisível e quais soluções parecem naturais.',
          aplicacao: 'Para análise de discurso político e persuasão: qual metáfora está sendo usada para enquadrar um problema determina as soluções que parecem óbvias. "Criminalidade é uma doença" → tratamento. "Criminalidade é uma guerra" → combate. A metáfora não é neutra — é o enquadramento político.',
          intensidade: '★★★★☆',
          protocolo: [
            '1. IDENTIFICAÇÃO DE METÁFORAS ESTRUTURANTES: Para cada área importante da sua vida (trabalho, relacionamentos, saúde, aprendizagem), identifique a metáfora conceitual que você usa para pensar sobre ela. "Meu trabalho é uma batalha"? "Meu relacionamento é uma construção"? "Aprendizagem é consumo"? A metáfora determina o que você pode e não pode fazer naquele domínio.',
            '2. ANÁLISE DE METÁFORAS POLÍTICAS: Escolha 3 debates políticos atuais. Para cada um, identifique a metáfora central que cada lado usa. Imigração como "invasão" vs. "fluxo"? Economia como "organismo" vs. "máquina"? Qual é a agenda política embutida em cada metáfora? A mudança da metáfora é a mudança da política possível.',
            '3. EXPERIMENTO DE REFRAMING: Para um problema que você considera insolúvel, mude deliberadamente a metáfora. Se você está pensando em um conflito profissional como "guerra", pense como "dança" ou "jogo". Quais soluções se tornam visíveis com a nova metáfora? Quais se tornam invisíveis? A metáfora não é apenas descrição — é gerador de possibilidades.',
            '4. CONSTRUÇÃO DE METÁFORAS PRODUTIVAS: Lakoff mostra que metáforas podem ser construídas deliberadamente. Para um domínio onde você quer mudar comportamento (seu ou de outros), projete a metáfora que tornaria o comportamento desejado natural. "Saúde como investimento" vs. "saúde como compliance". A metáfora certa reduz fricção comportamental.',
          ]
        },
      ]
    },
    {
      label: 'NÍVEL 3 — Domínio Técnico',
      books: [
        {
          author: 'Keith Stanovich', title: 'What Intelligence Tests Miss: The Psychology of Rational Thought', year: '2009', lang: 'Inglês',
          tese: 'Racionalidade como capacidade separada e dissociável de inteligência. As disposições cognitivas que produzem pensamento racional: abertura à experiência, necessidade de cognição, ausência de Myside Bias, calibração epistêmica. Pessoas inteligentes cometem erros de raciocínio sistemáticos — especialmente quando argumentam pelo próprio lado.',
          aplicacao: 'Para avaliação de qualidade de raciocínio — próprio e alheio: a inteligência não protege dos vieses mais perigosos em contextos de alta carga emocional ou identitária. O Myside Bias (favorecer evidências que confirmam a própria posição) aumenta com inteligência — pessoas mais inteligentes são mais hábeis em racionalizar.',
          intensidade: '★★★★★',
          protocolo: [
            '1. TESTE DE MYSIDE BIAS: Para qualquer posição que você sustenta fortemente, force-se a listar os melhores argumentos do lado oposto — não os mais fáceis de refutar, os mais fortes. Se você não consegue formular o argumento oposto melhor do que seus proponentes, você tem Myside Bias operando. A assimetria é o dado diagnóstico.',
            '2. ANÁLISE DE PENSAMENTO DISPOSICIONAL: Stanovich distingue a capacidade de raciocinar (algorítmica) da disposição de raciocinar bem (reflexiva). Identifique situações onde você tem capacidade mas não usa a disposição: onde você aceita conclusões convenientes sem questionar? Onde você não questiona a fonte? A disposição é o elo mais fraco.',
            '3. CONSTRUÇÃO DE STEELMAN: O oposto do straw man — formule a versão mais forte possível de cada posição que você tende a rejeitar. Não a versão que é fácil de atacar, a versão que é genuinamente difícil de refutar. A habilidade de fazer steelman é medida direta de baixo Myside Bias.',
            '4. PROTOCOLO DE CRENÇA ATUALIZADA: Stanovich recomenda distinguir crença atual de crença refletida. Para posições importantes que você sustenta, pergunte: esta é a crença que eu teria se tivesse examinado sistematicamente as evidências de todos os lados? Ou é a crença que eu herdei / que meu grupo tem / que soa bem? A distinção exige honestidade desconfortável.',
          ]
        },
        {
          author: 'Hugo Mercier & Dan Sperber', title: 'The Enigma of Reason', year: '2017', lang: 'Inglês',
          tese: 'A razão evoluiu primariamente para persuadir e avaliar argumentos alheios — não para descobrir verdade individual. A função original da razão é social e retórica: produzir argumentos que convencem outros e detectar argumentos deficientes de outros. Por isso somos melhores avaliando argumentos alheios do que os próprios.',
          aplicacao: 'Para entender por que raciocínio em grupo (com diversidade real de perspectivas e incentivos para defender posições) produz resultados epistemicamente superiores ao raciocínio individual. Para análise de decisões: processos que expõem a argumentação ao escrutínio adversarial são estruturalmente superiores.',
          intensidade: '★★★★★',
          protocolo: [
            '1. EXPLORAÇÃO DA ASSIMETRIA SOCIAL: Mercier e Sperber mostram que somos muito melhores avaliando argumentos dos outros do que os nossos. Teste isso: leia um argumento de alguém em posição oposta à sua e avalie criticamente. Depois leia um argumento do seu próprio lado e aplique o mesmo critério. A assimetria na qualidade da crítica é o viés em ação.',
            '2. DESIGN DE DELIBERAÇÃO ADVERSARIAL: Para qualquer decisão importante de grupo, estruture deliberação adversarial: designar alguém para defender explicitamente o lado oposto (advogado do diabo institucionalizado). Mercier e Sperber mostram que grupos com diversidade real de perspectivas e incentivo para defender posições convertem raciocínio em descoberta.',
            '3. ANÁLISE DE RACIOCÍNIO INDIVIDUAL vs. SOCIAL: Identifique 3 posições que você desenvolveu em isolamento vs. 3 que desenvolveu através de debate com opositores reais. As segundas são estruturalmente mais confiáveis — não necessariamente corretas, mas mais testadas. Quais posições importantes você nunca defendeu diante de oposição genuína?',
            '4. CONSTRUÇÃO DE AMBIENTES DE RACIOCÍNIO COLETIVO: A implicação prática: se você lidera uma equipe ou grupo, a qualidade do raciocínio coletivo depende da diversidade real de perspectivas e da segurança de defender posições minoritárias. Mapeie seu grupo: há diversidade epistêmica real? Alguém regularmente discorda sem custo? Se não, o raciocínio coletivo está degradado.',
          ]
        },
      ]
    },
    {
      label: 'NÍVEL 4 — Síntese Avançada',
      books: [
        {
          author: 'Gerd Gigerenzen', title: 'Gut Feelings: The Intelligence of the Unconscious', year: '2007', lang: 'Inglês',
          tese: 'Heurísticas simples como ferramentas superiores em ambientes de incerteza real — não falhas cognitivas a serem corrigidas pelo raciocínio formal. A heurística "tome a melhor pista e ignore o resto" supera modelos estatísticos complexos quando há pouca informação. A ecologia das heurísticas: cada ferramenta funciona em seu ambiente específico.',
          aplicacao: 'Para rever a relação com intuição profissional: em ambientes com alta incerteza e pouca informação confiável, intuição de expert (heurística sofisticada) supera análise formal. Para análise de quando confiar na intuição: a intuição de um cardíaco experiente com sintomas atípicos vs. de um iniciante — a mesma "intuição", confiabilidade completamente diferente.',
          intensidade: '★★★★☆',
          protocolo: [
            '1. MAPEAMENTO DE AMBIENTE-HEURÍSTICA: Gigerenzen mostra que cada heurística funciona em seu ambiente específico. Para as decisões mais importantes que você toma regularmente, identifique: este é um ambiente de alta incerteza com pouca informação confiável (onde heurísticas simples superam análise) ou de baixa incerteza com dados abundantes (onde análise formal supera intuição)? A distinção muda qual ferramenta usar.',
            '2. AVALIAÇÃO DE CONFIABILIDADE DA INTUIÇÃO EXPERT: Kahneman e Gigerenzen divergem sobre intuição — e ambos têm razão em domínios diferentes. Kahneman: intuição expert é confiável apenas em ambientes com feedback rápido e claro (xadrez, poker). Gigerenzen: mesmo sem feedback rápido, heurísticas são superiores com informação escassa. Para sua área: qual se aplica?',
            '3. ANÁLISE DE EXCESSO DE INFORMAÇÃO: Gigerenzen documenta o paradoxo da escolha informacional: mais informação pode piorar as decisões quando a informação adicional é ruidosa. Identifique áreas onde você está coletando mais informação do que o necessário para a decisão. Qual informação você poderia ignorar sem piora no resultado?',
            '4. CONSTRUÇÃO DE REGRAS SIMPLES: Gigerenzen defende regras de decisão simples (heurísticas) como alternativa superior a modelos complexos em ambientes incertos. Para uma área de decisão recorrente, construa uma regra simples de 1-3 critérios e aplique por 30 dias. Compare com suas decisões anteriores "analíticas". A regra simples frequentemente supera.',
          ]
        },
        {
          author: 'Richard Nisbett', title: 'Intelligence and How to Get It: Why Schools and Cultures Count', year: '2009', lang: 'Inglês',
          tese: 'A inteligência não é principalmente genética e imutável — é amplamente determinada por fatores ambientais, culturais e educacionais. Diferenças de QI entre grupos refletem diferenças de ambiente, não de capacidade inata. Programas ambientais específicos produzem ganhos de QI sustentáveis.',
          aplicacao: 'Para análise de desenvolvimento de capacidade em organizações e educação: as condições que produzem inteligência (desafio, feedback, autonomia, segurança para erro) são identificáveis e reproduzíveis. Para desmistificar diferenças de performance entre grupos: o ambiente explica mais do que o talento inato.',
          intensidade: '★★★★☆',
          protocolo: [
            '1. AUDITORIA DE AMBIENTE COGNITIVO: Nisbett mostra que ambientes específicos produzem inteligência específica. Avalie seu ambiente atual: há desafio cognitivo regularcrescente? Há feedback de qualidade? Há exposição a perspectivas radicalmente diferentes? Há segurança para erro? A qualidade do ambiente prediz o desenvolvimento cognitivo mais do que qualquer capacidade inata.',
            '2. ANÁLISE DE EXPECTATIVAS E DESEMPENHO: O efeito Pygmalion (expectativas altas produzem performance alta) é documentado. Para grupos que você lidera ou avalia: que expectativas você tem? Essas expectativas comunicam capacidade ou limitação? As expectativas se tornam realidade através de comportamentos sutis que você não percebe como comunicação.',
            '3. DESIGN DE DESAFIO ÓTIMO: Nisbett documenta o papel do desafio progressivo. Para qualquer habilidade que você quer desenvolver: o desafio atual está na zona de desenvolvimento proximal (difícil o suficiente para forçar crescimento, não tão difícil que produza colapso)? Mapeie a curva de desafio para os próximos 3 meses.',
            '4. ANÁLISE DE TRANSFERÊNCIA DE APRENDIZAGEM: Nisbett mostra que o que é aprendido frequentemente não transfere para domínios diferentes — o conhecimento fica ligado ao contexto. Para cada habilidade ou conhecimento importante que você adquiriu: em quantos contextos diferentes você consegue aplicá-lo? A falta de transferência indica aprendizagem superficial (procedural, não conceitual).',
          ]
        },
      ]
    },
    {
      label: 'NÍVEL 5 — Fronteira do Conhecimento',
      books: [
        {
          author: 'Andy Clark', title: 'Surfing Uncertainty: Prediction, Action, and the Embodied Mind', year: '2015', lang: 'Inglês',
          tese: 'O cérebro como máquina de predição: toda percepção é uma hipótese sobre a causa dos inputs sensoriais, não uma leitura passiva da realidade. O sistema cognitivo constantemente testa suas predições contra o mundo e atualiza quando há erro de predição. Ação como forma de testar hipóteses sobre o ambiente.',
          aplicacao: 'Para entender vieses perceptuais resistentes à correção: a percepção é top-down (o que esperamos molda o que percebemos) mais do que bottom-up. Para análise de conflito: duas pessoas com modelos preditivos diferentes vivem em mundos fenomenologicamente distintos. Mudar a percepção exige mudar o modelo preditivo — a exposição à evidência contrária raramente é suficiente.',
          intensidade: '★★★★★ — Literatura técnica de ciência cognitiva',
          protocolo: [
            '1. IDENTIFICAÇÃO DE MODELOS PREDITIVOS ATIVOS: Clark mostra que o cérebro filtra percepção através de modelos preditivos — você vê o que espera ver. Para uma semana, preste atenção a surpresas: o que esperava acontecer e não aconteceu? O que aconteceu que não esperava? Cada surpresa é um erro de predição que revela um modelo ativo. O mapa de surpresas é o mapa dos modelos.',
            '2. ANÁLISE DE PERCEPÇÃO TOP-DOWN: Escolha uma situação de conflito recorrente. Identifique: o que você prevê que a outra pessoa vai fazer/dizer/pensar antes que aconteça? Com que frequência você está certo? Com que frequência sua previsão molda o que você percebe como confirmação? A percepção confirmatória é top-down em ação.',
            '3. EXPERIMENTO DE MUDANÇA DE MODELO: Para uma crença importante sobre uma pessoa ou situação, projete um experimento comportamental (à la Beck) que testaria o modelo. Não um experimento que confirmaria — um que poderia refutar. A relutância em projetar experimentos refutadores é o sinal de que o modelo é mais identitário do que epistêmico.',
            '4. ANÁLISE DE CORPORIFICAÇÃO: Clark mostra que cognição é corporificada e extendida — o cérebro usa o corpo e o ambiente como recursos cognitivos. Identifique os andaimes externos que suportam seu pensamento: cadernos, rituais espaciais, sequências de ação que estruturam o pensamento. Remover andaimes degrada performance — e adicioná-los estrategicamente a aumenta.',
          ]
        },
        {
          author: 'Lisa Feldman Barrett', title: 'How Emotions Are Made: The Secret Life of the Brain', year: '2017', lang: 'Inglês',
          tese: 'A teoria da emoção construída: emoções não são reações automáticas a estímulos — são construções preditivas que o cérebro gera com base em experiência passada, contexto e conceitos disponíveis. Não há "circuito do medo" universal — diferentes culturas constroem emoções diferentes. Você tem mais agência sobre emoções do que parece.',
          aplicacao: 'Para trabalhar com estados emocionais em si mesmo e em outros: as emoções são construídas, não apenas recebidas. A granularidade emocional (ter mais conceitos emocionais) produz melhor regulação. Para análise intercultural: o que parece "obviamente" raiva ou medo em alguém de outra cultura pode ser construção completamente diferente.',
          intensidade: '★★★★★',
          protocolo: [
            '1. DESENVOLVIMENTO DE GRANULARIDADE EMOCIONAL: Barrett mostra que ter mais conceitos emocionais (distinguir frustração de decepção de melancolia em vez de apenas "estou mal") produz melhor regulação. Por uma semana, tente nomear cada estado emocional com o máximo de precisão possível. Pesquise termos emocionais de outras línguas sem equivalente em português (saudade, sehnsucht, schadenfreude). O vocabulário expande a percepção.',
            '2. ANÁLISE DE CONTEXTO NA CONSTRUÇÃO EMOCIONAL: Barrett mostra que o mesmo sinal fisiológico (coração acelerado) é construído como excitação ou ansiedade dependendo do contexto e das expectativas. Identifique situações onde sua interpretação de um estado físico é provavelmente contextualmente construída. Qual seria a interpretação alternativa?',
            '3. GESTÃO DE BUDGET CORPORAL: Barrett usa o conceito de budget corporal (allostasis) — o corpo constantemente prevê necessidades de recursos. Estados negativos crônicos são frequentemente reflexo de budget corporal deficiente: sono insuficiente, alimentação inadequada, movimento escasso. Antes de atribuir estados emocionais negativos a causas psicológicas, audite o budget corporal.',
            '4. CRIAÇÃO DE NOVOS CONCEITOS EMOCIONAIS: Barrett mostra que culturas com mais conceitos emocionais têm populações com melhor regulação emocional. Para estados emocionais recorrentes que você não consegue nomear adequadamente em português, crie ou adote conceitos: descreva o estado com precisão, nomeie-o, use o nome. A nomeação é o início da construção — e da regulação.',
          ]
        },
      ]
    },
  ]
};
