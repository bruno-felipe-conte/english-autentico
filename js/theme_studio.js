// =============================================================================
// THEME_STUDIO.JS --- Estúdio de Personalização de Aparência & Arte Vetorial SVG
// English Autentico PWA
// =============================================================================

const ThemeStudio = {

  STORAGE_KEY: 'ea_custom_theme',

  // ── Prompt Base Curado para IAs Externas (ChatGPT, Claude, Gemini) ───────────
  PROMPT_BASE: `Você é um especialista sênior em Design de Interfaces (UI/UX), Ergonomia Cognitiva, Acessibilidade Digital (WCAG AAA) e Ilustração Vetorial SVG Generativa.
Sua missão é analisar a imagem de referência fornecida, identificar seu objeto/elemento central e gerar um tema visual ergonômico e elegante para o aplicativo "English Autêntico", garantindo legibilidade absoluta onde o texto e o fundo NUNCA disputem atenção.

1. IDENTIFICAÇÃO E VETORIZAÇÃO DO OBJETO CENTRAL (ÍCONE SVG):
- Analise a foto e IDENTIFIQUE o objeto, símbolo ou figura focal central (ex: monumento, estátua, instrumento musical, xícara, animal, veículo, torre, elemento arquitetônico).
- No código SVG, crie um grupo específico <g id="objeto-central"> que funcione como um ÍCONE ou SILHUETA GEOMÉTRICA ESTILIZADA desse objeto central, composto por figuras geométricas limpas (<path>, <polygon>, <circle>, <rect>).
- Integre esse ícone ao centro ou quadrante do tile vetorial (400x400px), acompanhado de poucas formas geométricas complementares amplas.

2. FIM DA COMPETIÇÃO VISUAL (TEXTO SOBRE FUNDO — ZERO RUÍDO):
- O aplicativo é uma plataforma de estudo e leitura prolongada: a tipografia tem prioridade total e o fundo deve funcionar apenas como uma "marca d'água silenciosa de luxo".
- Opacidade Ultra-Sutil (OBRIGATÓRIO): "fill-opacity" ou "stop-opacity" de TODAS as formas do SVG (incluindo o objeto central) DEVEM ficar ESTRITAMENTE entre 0.02 e 0.05 (2% a 5%).
- Proibição de Cores Claras/Vivas no Fundo: NUNCA use branco, amarelo, "accentGold" ou tons saturados no SVG. Utilize EXCLUSIVAMENTE "brandSecondary" ou "surface" com a opacidade mínima exigida.

3. DIRETRIZES DE ERGONOMIA DE CORES (DARK UI & WCAG AAA):
- Fundo Profundo (60%): "background" deve ser ultra-escuro e sereno (luminosidade entre 4% e 8%, ex: #080D12, #0A0F14).
- Placas de Leitura ("surface"): "surface" deve ter luminosidade entre 10% e 14% (ex: #121A22, #16202A) para que os cards funcionem como escudos sólidos de leitura contra o fundo. "surfaceBorder" deve ter opacidade sutil (0.12 a 0.18).
- Tipografia de Contraste Supremo: "textPrimary" DEVE ser branco límpido suave (#F8FAFC ou #FFFFFF, luminosidade > 95%), garantindo taxa de contraste superior a 14:1 (WCAG AAA). "textSecondary" deve ser cinza/bege neutro dessaturado (#94A3B8 a #CBD5E1).
- Acentos Controlados (30% e 10%): Use a cor mais nobre da imagem em "brandPrimary" (botões principais) e "accentGold" (estrelas, badges e destaques).

REGRAS DE FORMATAÇÃO E SEGURANÇA (OBRIGATÓRIO):
- Retorne EXCLUSIVAMENTE um bloco de código JSON válido.
- Não escreva saudações, explicações ou comentários antes ou depois do JSON.
- No SVG, utilize apenas elementos vetoriais puros: <svg>, <defs>, <g>, <path>, <polygon>, <rect>, <circle>, <linearGradient>, <radialGradient>, <stop>.
- NUNCA inclua scripts, foreignObject, filtros pesados ou imagens bitmap dentro do SVG.

ESTRUTURA DO JSON RETORNADO:
\`\`\`json
{
  "themeName": "Nome Curto do Tema",
  "colors": {
    "background": "#080D12",
    "surface": "#121A22",
    "surfaceBorder": "rgba(148, 163, 184, 0.15)",
    "textPrimary": "#F8FAFC",
    "textSecondary": "#94A3B8",
    "brandPrimary": "#2563EB",
    "brandSecondary": "#1E3A8A",
    "accentGold": "#D4A843",
    "badgeBg": "rgba(212, 168, 67, 0.15)"
  },
  "backgroundPattern": {
    "tileWidth": 400,
    "tileHeight": 400,
    "svgContent": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' width='400' height='400'><defs><linearGradient id='gIcon' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='#2563EB' stop-opacity='0.05'/><stop offset='100%' stop-color='#1E3A8A' stop-opacity='0.02'/></linearGradient></defs><g id='fundo-suave'><polygon points='0,0 260,0 120,260' fill='#1E3A8A' fill-opacity='0.03'/><polygon points='200,200 400,160 380,400 160,360' fill='#1E3A8A' fill-opacity='0.02' transform='rotate(20 280 280)'/></g><g id='objeto-central' transform='translate(130, 130)'><circle cx='70' cy='70' r='55' fill='none' stroke='#2563EB' stroke-width='2' stroke-opacity='0.04'/><polygon points='70,20 115,110 25,110' fill='url(#gIcon)'/><circle cx='70' cy='75' r='16' fill='#1E3A8A' fill-opacity='0.04'/><rect x='64' y='110' width='12' height='20' rx='3' fill='#2563EB' fill-opacity='0.03'/></g></svg>"
  }
}
\`\`\``,

  // ── Presets Nativos de Alta Fidelidade ──────────────────────────────────────
  PRESETS: [
    {
      id: 'default',
      name: 'British Academia (Padrão)',
      colors: {
        background: '#F5EDD8',
        surface: '#FAF7F2',
        surfaceBorder: 'rgba(0, 62, 138, 0.18)',
        textPrimary: '#2E1B0E',
        textSecondary: '#6B4C3B',
        brandPrimary: '#003E8A',
        brandSecondary: '#002D65',
        accentGold: '#D4A843',
        badgeBg: 'rgba(212, 168, 67, 0.18)'
      },
      backgroundPattern: null // Usa o fundo padrão do app
    },
    {
      id: 'cyber-navy',
      name: 'Midnight Cyber Navy',
      colors: {
        background: '#0B132B',
        surface: '#1C2541',
        surfaceBorder: 'rgba(74, 144, 226, 0.35)',
        textPrimary: '#F0F4F8',
        textSecondary: '#9BB1C9',
        brandPrimary: '#00509D',
        brandSecondary: '#002855',
        accentGold: '#D4A843',
        badgeBg: 'rgba(0, 80, 157, 0.3)'
      },
      backgroundPattern: {
        tileWidth: 400,
        tileHeight: 400,
        svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
          <defs>
            <linearGradient id="cn-g1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#4A90E2" stop-opacity="0.22"/>
              <stop offset="100%" stop-color="#003E8A" stop-opacity="0.05"/>
            </linearGradient>
            <linearGradient id="cn-g2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#D4A843" stop-opacity="0.18"/>
              <stop offset="100%" stop-color="#4A90E2" stop-opacity="0.04"/>
            </linearGradient>
          </defs>
          <g>
            <polygon points="0,0 220,40 140,240 0,160" fill="url(#cn-g1)" transform="rotate(12 110 120)"/>
            <polygon points="180,0 400,0 360,200 160,140" fill="#00509D" fill-opacity="0.16" transform="rotate(-15 280 100)"/>
            <polygon points="40,180 240,220 180,400 0,360" fill="url(#cn-g2)" transform="rotate(35 120 290)"/>
            <polygon points="220,180 400,160 380,400 160,340" fill="#4A90E2" fill-opacity="0.14" transform="rotate(-28 290 280)"/>
            <circle cx="200" cy="200" r="48" fill="#D4A843" fill-opacity="0.08"/>
          </g>
        </svg>`
      }
    },
    {
      id: 'emerald-geometry',
      name: 'Emerald Botanical Geometry',
      colors: {
        background: '#0F241D',
        surface: '#18382E',
        surfaceBorder: 'rgba(82, 183, 136, 0.3)',
        textPrimary: '#E8F5E9',
        textSecondary: '#A3C9A8',
        brandPrimary: '#2D6A4F',
        brandSecondary: '#1B4332',
        accentGold: '#D4A843',
        badgeBg: 'rgba(82, 183, 136, 0.2)'
      },
      backgroundPattern: {
        tileWidth: 400,
        tileHeight: 400,
        svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
          <defs>
            <linearGradient id="em-g1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#52B788" stop-opacity="0.25"/>
              <stop offset="100%" stop-color="#1B4332" stop-opacity="0.06"/>
            </linearGradient>
          </defs>
          <g>
            <polygon points="0,0 200,60 120,220 0,140" fill="url(#em-g1)" transform="rotate(18 100 110)"/>
            <polygon points="200,0 400,80 340,240 180,180" fill="#40916C" fill-opacity="0.15" transform="rotate(-22 290 120)"/>
            <polygon points="0,200 220,240 140,400 0,380" fill="#74C69D" fill-opacity="0.12" transform="rotate(30 110 300)"/>
            <polygon points="200,200 400,180 360,400 160,360" fill="url(#em-g1)" transform="rotate(-35 280 290)"/>
            <polygon points="160,160 240,160 200,240" fill="#D4A843" fill-opacity="0.1" transform="rotate(45 200 200)"/>
          </g>
        </svg>`
      }
    },
    {
      id: 'golden-minimal',
      name: 'Minimal Gold Architecture',
      colors: {
        background: '#FAF6EE',
        surface: '#FFFFFF',
        surfaceBorder: 'rgba(212, 168, 67, 0.35)',
        textPrimary: '#2C221E',
        textSecondary: '#665349',
        brandPrimary: '#003E8A',
        brandSecondary: '#002047',
        accentGold: '#B8860B',
        badgeBg: 'rgba(212, 168, 67, 0.22)'
      },
      backgroundPattern: {
        tileWidth: 400,
        tileHeight: 400,
        svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
          <defs>
            <linearGradient id="gm-g1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#D4A843" stop-opacity="0.22"/>
              <stop offset="100%" stop-color="#003E8A" stop-opacity="0.04"/>
            </linearGradient>
          </defs>
          <g>
            <polygon points="0,0 240,0 160,200 0,160" fill="url(#gm-g1)" transform="rotate(8 120 100)"/>
            <polygon points="200,20 400,0 360,220 180,160" fill="#D4A843" fill-opacity="0.14" transform="rotate(-18 290 110)"/>
            <polygon points="20,180 220,240 160,400 0,340" fill="#003E8A" fill-opacity="0.09" transform="rotate(25 110 290)"/>
            <polygon points="200,200 400,180 340,400 160,380" fill="url(#gm-g1)" transform="rotate(-30 280 290)"/>
            <rect x="175" y="175" width="50" height="50" fill="#D4A843" fill-opacity="0.12" transform="rotate(45 200 200)"/>
          </g>
        </svg>`
      }
    }
  ],

  // ── Sanitizador de SVG Rigoroso (Zero XSS) ──────────────────────────────────
  sanitizarSvg(rawSvg) {
    if (!rawSvg || typeof rawSvg !== 'string') return '';

    // Remove qualquer menção a scripts, iframes, objetos externos e eventos
    let limpo = rawSvg
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<foreignobject\b[^<]*(?:(?!<\/foreignobject>)<[^<]*)*<\/foreignobject>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
      .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
      .replace(/<use\b[^>]*>/gi, '')
      .replace(/\bon\w+\s*=\s*(["'])[\s\S]*?\1/gi, '') // onmouseover, onload, etc
      .replace(/\bon\w+\s*=\s*[^\s>]+/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/data:\s*text\/html/gi, '');

    // Verifica se tem tag svg básica
    if (!limpo.includes('<svg')) {
      return '';
    }

    return limpo.trim();
  },

  // ── Extração Inteligente de JSON (Suporta markdown ```json ...) ─────────────
  extrairJson(inputStr) {
    if (!inputStr || typeof inputStr !== 'string') {
      throw new Error('Entrada vazia.');
    }

    let texto = inputStr.trim();

    // Se estiver em bloco de código Markdown ```json ... ```
    const matchBloco = texto.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (matchBloco && matchBloco[1]) {
      texto = matchBloco[1].trim();
    } else {
      // Tenta localizar o primeiro '{' e o último '}'
      const primeiroAbre = texto.indexOf('{');
      const ultimoFecha = texto.lastIndexOf('}');
      if (primeiroAbre !== -1 && ultimoFecha !== -1 && ultimoFecha > primeiroAbre) {
        texto = texto.substring(primeiroAbre, ultimoFecha + 1);
      }
    }

    const parsed = JSON.parse(texto);
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('O formato não é um objeto JSON válido.');
    }

    return parsed;
  },

  // ── Conversor de SVG para CSS Background Data-URI Seguro ────────────────────
  svgParaDataUri(svgString) {
    if (!svgString) return 'none';
    const clean = this.sanitizarSvg(svgString);
    if (!clean) return 'none';

    // Formata SVG em data-uri compatível com CSS
    const encoded = encodeURIComponent(clean)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22');

    return `url("data:image/svg+xml;utf8,${encoded}")`;
  },

  // ── Aplicação do Tema na UI ────────────────────────────────────────────────
  aplicarTema(temaObj, salvar = true) {
    if (!temaObj || !temaObj.colors) {
      throw new Error('Tema inválido: ausência de paleta de cores.');
    }

    const c = temaObj.colors;
    const root = document.documentElement;

    // Aplicação das variáveis CSS
    if (c.background) {
      root.style.setProperty('--cor-pergaminho', c.background);
    }
    if (c.surface) {
      root.style.setProperty('--cor-marmore', c.surface);
    }
    if (c.surfaceBorder) {
      root.style.setProperty('--cor-pietra', c.surfaceBorder);
    }
    if (c.textPrimary) {
      root.style.setProperty('--cor-inchiostro', c.textPrimary);
    }
    if (c.textSecondary) {
      root.style.setProperty('--cor-inchiostro-claro', c.textSecondary);
    }
    if (c.brandPrimary) {
      root.style.setProperty('--cor-veneziano', c.brandPrimary);
    }
    if (c.brandSecondary) {
      root.style.setProperty('--cor-veneziano-escuro', c.brandSecondary);
    }
    if (c.accentGold) {
      root.style.setProperty('--cor-toscano', c.accentGold);
    }

    // Aplicação da Arte Vetorial SVG como Background
    const bgContainer = document.getElementById('app-dynamic-bg');
    if (bgContainer) {
      if (temaObj.backgroundPattern && temaObj.backgroundPattern.svgContent) {
        const bgDataUri = this.svgParaDataUri(temaObj.backgroundPattern.svgContent);
        const tileW = temaObj.backgroundPattern.tileWidth || 400;
        const tileH = temaObj.backgroundPattern.tileHeight || 400;
        bgContainer.style.backgroundImage = bgDataUri;
        bgContainer.style.backgroundSize = `${tileW}px ${tileH}px`;
        bgContainer.style.backgroundColor = c.background || 'transparent';
        bgContainer.style.display = 'block';
      } else {
        bgContainer.style.backgroundImage = 'none';
        bgContainer.style.backgroundColor = 'transparent';
      }
    }

    if (salvar) {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(temaObj));
      } catch (e) {
        console.warn('[ThemeStudio] Erro ao salvar tema no localStorage:', e);
      }
    }

    this._atualizarIndicadorTemaAtivo(temaObj.themeName || 'Personalizado');
    return true;
  },

  // ── Restauração do Padrão do Sistema ───────────────────────────────────────
  resetarPadrao() {
    const root = document.documentElement;
    // Remove variáveis sobrescritas
    root.style.removeProperty('--cor-pergaminho');
    root.style.removeProperty('--cor-marmore');
    root.style.removeProperty('--cor-pietra');
    root.style.removeProperty('--cor-inchiostro');
    root.style.removeProperty('--cor-inchiostro-claro');
    root.style.removeProperty('--cor-veneziano');
    root.style.removeProperty('--cor-veneziano-escuro');
    root.style.removeProperty('--cor-toscano');

    const bgContainer = document.getElementById('app-dynamic-bg');
    if (bgContainer) {
      bgContainer.style.backgroundImage = 'none';
      bgContainer.style.backgroundColor = 'transparent';
    }

    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch(e) {}

    this._atualizarIndicadorTemaAtivo('British Academia (Padrão)');
    if (typeof App !== 'undefined' && typeof App.notificar === 'function') {
      App.notificar('Tema original restaurado!', 'sucesso');
    }
  },

  // ── Carrega Tema Salvo na Inicialização ─────────────────────────────────────
  carregarTemaSalvo() {
    try {
      const salvo = localStorage.getItem(this.STORAGE_KEY);
      if (salvo) {
        const tema = JSON.parse(salvo);
        this.aplicarTema(tema, false);
      }
    } catch (e) {
      console.warn('[ThemeStudio] Erro ao carregar tema salvo:', e);
    }
  },

  // ── Copiar Prompt Base para o Clipboard ────────────────────────────────────
  async copiarPromptBase() {
    const btn = document.getElementById('btn-copy-theme-prompt');
    const texto = this.PROMPT_BASE;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(texto);
      } else {
        // Fallback para navegadores legados
        const ta = document.createElement('textarea');
        ta.value = texto;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }

      if (btn) {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '✅ Prompt Copiado!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.classList.remove('copied');
        }, 2500);
      }

      if (typeof App !== 'undefined' && typeof App.notificar === 'function') {
        App.notificar('Prompt copiado! Cole no ChatGPT ou Claude junto com sua imagem.', 'sucesso');
      }
    } catch (err) {
      console.error('[ThemeStudio] Falha ao copiar prompt:', err);
      alert('Não foi possível copiar automaticamente. Selecione e copie manualmente o texto do prompt.');
    }
  },

  // ── Aplicar Código Colado no Textarea ───────────────────────────────────────
  aplicarDoInput() {
    const ta = document.getElementById('theme-code-input');
    if (!ta || !ta.value.trim()) {
      if (typeof App !== 'undefined' && typeof App.notificar === 'function') {
        App.notificar('Cole o código JSON/SVG retornado pela IA antes de aplicar.', 'aviso');
      }
      return;
    }

    try {
      const tema = this.extrairJson(ta.value);
      this.aplicarTema(tema, true);
      ta.classList.remove('is-invalid');
      ta.classList.add('is-valid');
      if (typeof App !== 'undefined' && typeof App.notificar === 'function') {
        App.notificar(`Tema "${tema.themeName || 'Personalizado'}" aplicado com sucesso!`, 'sucesso');
      }
    } catch (err) {
      ta.classList.remove('is-valid');
      ta.classList.add('is-invalid');
      if (typeof App !== 'undefined' && typeof App.notificar === 'function') {
        App.notificar(`Erro no código: ${err.message}`, 'erro');
      } else {
        alert(`Erro no código: ${err.message}`);
      }
    }
  },

  // ── Selecionar Preset Nativo ───────────────────────────────────────────────
  selecionarPreset(presetId) {
    const preset = this.PRESETS.find(p => p.id === presetId);
    if (!preset) return;

    if (preset.id === 'default') {
      this.resetarPadrao();
      return;
    }

    this.aplicarTema(preset, true);
    if (typeof App !== 'undefined' && typeof App.notificar === 'function') {
      App.notificar(`Preset "${preset.name}" aplicado!`, 'sucesso');
    }
  },

  // ── Atualização Visual do Status de Tema Ativo ─────────────────────────────
  _atualizarIndicadorTemaAtivo(nome) {
    const el = document.getElementById('theme-active-name');
    if (el) el.textContent = nome;

    // Atualiza chips de preset
    const chips = document.querySelectorAll('.theme-preset-btn');
    chips.forEach(c => {
      const id = c.getAttribute('data-preset-id');
      const isCur = (id === 'default' && nome.includes('Padrão')) || (c.textContent.includes(nome));
      c.classList.toggle('active', isCur);
    });
  },

  // ── Renderização do Card de Personalização em Perfil/Configurações ─────────
  renderCard() {
    let temaAtualNome = 'British Academia (Padrão)';
    try {
      const salvo = localStorage.getItem(this.STORAGE_KEY);
      if (salvo) {
        const obj = JSON.parse(salvo);
        if (obj && obj.themeName) temaAtualNome = obj.themeName;
      }
    } catch(e) {}

    return `
      <div class="theme-studio-card" id="theme-studio-card">
        <div class="theme-studio-header">
          <h3 class="theme-studio-title">
            <span>🎨 Personalização de Aparência</span>
          </h3>
          <span class="theme-badge-ia">Arte Vetorial IA</span>
        </div>
        <p class="theme-studio-desc">
          Crie temas exclusivos com paletas elegantes e fundos dinâmicos de <strong>Arte Geométrica Abstrata (SVG)</strong> gerados por IA a partir de qualquer imagem de referência.
        </p>

        <!-- Etapa 1: Obter Prompt -->
        <div class="theme-step-box">
          <div class="theme-step-title">
            <span>Passo 1</span> • Copie o Prompt Base
          </div>
          <p class="theme-step-guide">
            Copie o prompt de sistema abaixo, abra o <strong>ChatGPT</strong>, <strong>Claude</strong> ou <strong>Gemini</strong>, anexe uma imagem de seu gosto e envie. A IA retornará o código pronto para colagem.
          </p>
          <button type="button" id="btn-copy-theme-prompt" class="theme-copy-prompt-btn" onclick="ThemeStudio.copiarPromptBase()">
            <span>📋 Copiar Prompt Base para IA</span>
          </button>
        </div>

        <!-- Etapa 2: Input Box -->
        <div class="theme-input-wrap">
          <div class="theme-step-title" style="margin-bottom:0.5rem">
            <span>Passo 2</span> • Cole o Código do Tema
          </div>
          <textarea id="theme-code-input" class="theme-code-textarea" placeholder="Cole aqui o código JSON/SVG retornado pela IA..."></textarea>
        </div>

        <!-- Barra de Ações -->
        <div class="theme-actions-bar">
          <button type="button" class="theme-btn-apply" onclick="ThemeStudio.aplicarDoInput()">
            <span>✨ Aplicar Novo Tema</span>
          </button>
          <button type="button" class="theme-btn-secondary" onclick="document.getElementById('theme-code-input').value = ''">
            <span>Limpar</span>
          </button>
          <button type="button" class="theme-btn-reset" onclick="ThemeStudio.resetarPadrao()">
            <span>🔄 Restaurar Padrão</span>
          </button>
        </div>

        <!-- Status do Tema Ativo -->
        <div class="theme-status-card">
          <div class="theme-info-left">
            <span class="theme-name-label">Tema em Uso</span>
            <span class="theme-name-value" id="theme-active-name">${temaAtualNome}</span>
          </div>
          <div class="theme-swatches-grid" title="Cores Ativas">
            <span class="theme-swatch-dot" style="background:var(--cor-veneziano)" title="Brand Primary"></span>
            <span class="theme-swatch-dot" style="background:var(--cor-veneziano-escuro)" title="Brand Secondary"></span>
            <span class="theme-swatch-dot" style="background:var(--cor-toscano)" title="Destaque"></span>
            <span class="theme-swatch-dot" style="background:var(--cor-pergaminho)" title="Fundo Geral"></span>
            <span class="theme-swatch-dot" style="background:var(--cor-marmore)" title="Cards/Superfície"></span>
          </div>
        </div>

        <!-- Presets Nativos -->
        <div class="theme-presets-section">
          <div class="theme-presets-title">Presets Geométricos Disponíveis</div>
          <div class="theme-presets-grid">
            ${this.PRESETS.map(p => `
              <button type="button" class="theme-preset-btn ${p.name === temaAtualNome ? 'active' : ''}" data-preset-id="${p.id}" onclick="ThemeStudio.selecionarPreset('${p.id}')">
                <div class="preset-preview-disc" style="background:linear-gradient(135deg, ${p.colors.brandPrimary}, ${p.colors.accentGold || p.colors.background})"></div>
                <span class="preset-title">${p.name}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
};

// ── Global Attachment & Auto-Init ─────────────────────────────────────────────
if (typeof window !== 'undefined') {
  window.ThemeStudio = ThemeStudio;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ThemeStudio.carregarTemaSalvo());
  } else {
    ThemeStudio.carregarTemaSalvo();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeStudio;
}
