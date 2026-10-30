// =============================================================================
// THEME_STUDIO.JS --- Estúdio de Personalização de Aparência & Arte Vetorial SVG
// English Autentico PWA
// =============================================================================

const ThemeStudio = {

  STORAGE_KEY: 'ea_custom_theme',

  // ── Prompt Base Curado para IAs Externas (ChatGPT, Claude, Gemini) ───────────
  PROMPT_BASE: `Você é um especialista em Design de Interfaces (UI/UX) e Arte Vetorial SVG Generativa.
Sua missão é analisar a imagem de referência fornecida e gerar um tema visual personalizado para o aplicativo "English Autêntico".

DIRETRIZES DO TEMA:
1. Extraia da imagem uma paleta refinada, equilibrando legibilidade e elegância.
2. O fundo DEVE ser uma arte vetorial geométrica abstrata ("Vector flat design, complex overlapping geometric shapes, infinite scalability, sharp edges, clean lines, minimalist abstract composition").
3. O SVG deve ser desenhado para repetição (tiling 400x400px), mas use rotações angulares internas (ex: 0°, 15°, 45°, -25°) e sobreposição de formas entre quadrantes para QUEBRAR a monotonia de um grid óbvio.
4. Mantenha opacidades suaves nas formas de fundo (fill-opacity entre 0.08 e 0.25) para que o fundo nunca dispute a atenção com o texto principal do aplicativo.

REGRAS DE FORMATAÇÃO E SEGURANÇA (OBRIGATÓRIO):
- Retorne EXCLUSIVAMENTE um bloco de código JSON válido.
- Não escreva saudações, introduções ou explicações antes ou depois do JSON.
- No SVG, utilize apenas elementos vetoriais puros: <svg>, <defs>, <g>, <path>, <polygon>, <rect>, <circle>, <linearGradient>, <radialGradient>, <stop>.
- NUNCA inclua tags de script, foreignObject, filtros pesados ou imagens bitmap dentro do SVG.

ESTRUTURA DO JSON RETORNADO:
\`\`\`json
{
  "themeName": "Nome Curto do Tema",
  "colors": {
    "background": "#0D1B2A",
    "surface": "#1B263B",
    "surfaceBorder": "rgba(212, 168, 67, 0.35)",
    "textPrimary": "#F8FAFC",
    "textSecondary": "#CBD5E1",
    "brandPrimary": "#00509D",
    "brandSecondary": "#002855",
    "accentGold": "#D4A843",
    "badgeBg": "rgba(212, 168, 67, 0.18)"
  },
  "backgroundPattern": {
    "tileWidth": 400,
    "tileHeight": 400,
    "svgContent": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' width='400' height='400'><defs><linearGradient id='g1' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='#00509D' stop-opacity='0.2'/><stop offset='100%' stop-color='#D4A843' stop-opacity='0.08'/></linearGradient></defs><g><polygon points='0,0 200,0 120,200' fill='url(#g1)'/><polygon points='200,0 400,80 320,260 160,180' fill='#00509D' fill-opacity='0.12' transform='rotate(15 280 130)'/><polygon points='0,200 180,240 80,400' fill='#D4A843' fill-opacity='0.15' transform='rotate(-20 90 300)'/><polygon points='200,200 400,160 380,400 180,360' fill='url(#g1)' transform='rotate(40 290 280)'/></g></svg>"
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
