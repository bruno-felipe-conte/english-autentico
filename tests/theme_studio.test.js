// ============================================================
// tests/theme_studio.test.js
// Validação do Estúdio de Personalização de Aparência (SVG + IA)
// ============================================================
const assert = require('assert');
const test = require('node:test');

test('🎨 Estúdio de Personalização de Aparência e Arte Vetorial SVG', async (t) => {

  // Prepara mock de DOM
  const rootStyle = {};
  const bgStyle = {};

  const mockRoot = {
    style: {
      setProperty: (k, v) => { rootStyle[k] = v; },
      removeProperty: (k) => { delete rootStyle[k]; }
    }
  };

  const mockBg = {
    id: 'app-dynamic-bg',
    style: bgStyle
  };

  const storage = {};
  global.localStorage = {
    getItem: (k) => storage[k] || null,
    setItem: (k, v) => { storage[k] = String(v); },
    removeItem: (k) => { delete storage[k]; }
  };

  global.document = {
    documentElement: mockRoot,
    getElementById: (id) => (id === 'app-dynamic-bg' ? mockBg : null),
    querySelectorAll: () => [],
    addEventListener: () => {}
  };

  global.window = global;
  global.App = {
    notificar: () => {}
  };

  const ThemeStudio = require('../js/theme_studio.js');

  await t.test('1. Deve extrair JSON puro e JSON envolto em Markdown code blocks', () => {
    const rawJson = '{"themeName":"Cyber Dawn","colors":{"background":"#001122"}}';
    const parsed1 = ThemeStudio.extrairJson(rawJson);
    assert.strictEqual(parsed1.themeName, 'Cyber Dawn');
    assert.strictEqual(parsed1.colors.background, '#001122');

    const mdJson = 'Aqui está seu tema:\n```json\n{"themeName":"Neon Forest","colors":{"surface":"#223344"}}\n```\nAproveite!';
    const parsed2 = ThemeStudio.extrairJson(mdJson);
    assert.strictEqual(parsed2.themeName, 'Neon Forest');
    assert.strictEqual(parsed2.colors.surface, '#223344');

    assert.throws(() => {
      ThemeStudio.extrairJson('texto sem json');
    }, /JSON/);
  });

  await t.test('2. Deve sanitizar SVG neutralizando scripts, foreignObject e event handlers XSS', () => {
    const maliciousSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <script>alert('XSS')</script>
        <foreignObject width="100" height="100"><div>hack</div></foreignObject>
        <polygon points="0,0 50,50 0,50" fill="#003E8A" onload="stealCookies()" onmouseover="doEvil()"/>
      </svg>
    `;

    const cleanSvg = ThemeStudio.sanitizarSvg(maliciousSvg);
    assert.strictEqual(cleanSvg.includes('<script>'), false, 'Não deve conter tag script');
    assert.strictEqual(cleanSvg.includes('alert('), false, 'Não deve conter payload de script');
    assert.strictEqual(cleanSvg.includes('<foreignObject'), false, 'Não deve conter foreignObject');
    assert.strictEqual(cleanSvg.includes('onload='), false, 'Não deve conter onload');
    assert.strictEqual(cleanSvg.includes('onmouseover='), false, 'Não deve conter onmouseover');
    assert.ok(cleanSvg.includes('<polygon points="0,0 50,50 0,50" fill="#003E8A"'), 'Deve preservar os elementos gráficos válidos');
  });

  await t.test('3. Deve converter SVG para CSS Data-URI seguro', () => {
    const validSvg = '<svg viewBox="0 0 10 10"><rect width="10" height="10" fill="#f00"/></svg>';
    const uri = ThemeStudio.svgParaDataUri(validSvg);
    assert.ok(uri.startsWith('url("data:image/svg+xml;utf8,'));
    assert.strictEqual(ThemeStudio.svgParaDataUri(''), 'none');
  });

  await t.test('4. Deve aplicar variáveis CSS e background pattern persistindo no localStorage', () => {
    const customTheme = {
      themeName: 'Emerald Dawn',
      colors: {
        background: '#0a1f18',
        surface: '#123328',
        surfaceBorder: 'rgba(82,183,136,0.3)',
        textPrimary: '#ffffff',
        textSecondary: '#a3c9a8',
        brandPrimary: '#2d6a4f',
        brandSecondary: '#1b4332',
        accentGold: '#d4a843'
      },
      backgroundPattern: {
        tileWidth: 360,
        tileHeight: 360,
        svgContent: '<svg viewBox="0 0 360 360"><polygon points="0,0 180,0 90,180" fill="#2d6a4f"/></svg>'
      }
    };

    ThemeStudio.aplicarTema(customTheme, true);

    // Valida variáveis CSS injetadas no root
    assert.strictEqual(rootStyle['--cor-pergaminho'], '#0a1f18');
    assert.strictEqual(rootStyle['--cor-marmore'], '#123328');
    assert.strictEqual(rootStyle['--cor-inchiostro'], '#ffffff');
    assert.strictEqual(rootStyle['--cor-veneziano'], '#2d6a4f');

    // Valida background pattern dinâmico
    assert.ok(bgStyle.backgroundImage.includes('data:image/svg+xml;utf8,'));
    assert.strictEqual(bgStyle.backgroundSize, '360px 360px');

    // Valida persistência
    const saved = JSON.parse(storage['ea_custom_theme']);
    assert.strictEqual(saved.themeName, 'Emerald Dawn');
  });

  await t.test('5. Deve restaurar o padrão do sistema limpando customizações', () => {
    ThemeStudio.resetarPadrao();

    // Variáveis devem ter sido removidas do root
    assert.strictEqual(rootStyle['--cor-pergaminho'], undefined);
    assert.strictEqual(rootStyle['--cor-marmore'], undefined);
    assert.strictEqual(rootStyle['--cor-veneziano'], undefined);

    // Fundo deve voltar a none
    assert.strictEqual(bgStyle.backgroundImage, 'none');

    // Storage limpo
    assert.strictEqual(storage['ea_custom_theme'], undefined);
  });

  await t.test('6. Todos os presets embarcados devem ter estrutura válida', () => {
    assert.ok(ThemeStudio.PRESETS.length >= 3, 'Deve ter pelo menos 3 presets');
    for (const p of ThemeStudio.PRESETS) {
      assert.ok(p.id, 'Preset deve ter id');
      assert.ok(p.name, 'Preset deve ter name');
      assert.ok(p.colors, 'Preset deve ter colors');
      assert.ok(p.colors.background, 'Preset deve ter colors.background');
      assert.ok(p.colors.surface, 'Preset deve ter colors.surface');
      assert.ok(p.colors.textPrimary, 'Preset deve ter colors.textPrimary');
      assert.ok(p.colors.brandPrimary, 'Preset deve ter colors.brandPrimary');
      if (p.backgroundPattern) {
        assert.ok(p.backgroundPattern.svgContent.includes('<svg'), 'SVG do preset deve ser válido');
      }
    }
  });

  await t.test('7. Prompt Base deve conter diretrizes de vetorização do objeto central e proteção visual da tipografia', () => {
    const prompt = ThemeStudio.PROMPT_BASE;
    assert.ok(prompt.includes('WCAG AAA'), 'Deve incluir diretriz WCAG AAA');
    assert.ok(prompt.includes('objeto-central') || prompt.includes('objeto central'), 'Deve exigir vetorização/ícone do objeto central');
    assert.ok(prompt.includes('0.05'), 'Deve limitar opacidade a no máximo 5% para evitar disputa com o texto');
    assert.ok(prompt.includes('tile') || prompt.includes('tiling'), 'Deve conter especificação do tile');
    assert.ok(prompt.includes('JSON'), 'Deve instruir retorno estrito em JSON');
  });
});
