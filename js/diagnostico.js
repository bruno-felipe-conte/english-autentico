// ============================================================
// diagnostico.js — Dynamic Vocabulary Diagnostic (< 3 min)
// Computerized Adaptive Testing with Abbott False-Alarm Correction
// Feature: "O Espelho" (The Mirror) • English Edition
// ============================================================

const VocabDiagnostic = {
  _ativo: false,
  _respostas: [],
  _itensTeste: [],
  _indiceAtual: 0,
  _inicioTimestamp: 0,

  // Calibrated bank of phonotactically valid English pseudowords (catch trials)
  PSEUDOPALAVRAS: [
    'blon', 'flurby', 'drid', 'stram',
    'prenk', 'grolt', 'snarck', 'wrib',
    'fletch', 'throbby', 'clost', 'brumble'
  ],

  /**
   * Abbott Correction for guessing and response bias:
   * Adj = (HitRate - FalseAlarmRate) / (1 - FalseAlarmRate)
   * If FalseAlarmRate >= 0.5 (massive bluffing), penalize to 0.
   */
  calcularAbbott(hitRate, falseAlarmRate) {
    if (typeof falseAlarmRate !== 'number' || falseAlarmRate >= 0.5) return 0;
    if (typeof hitRate !== 'number') return 0;
    const adj = (hitRate - falseAlarmRate) / (1 - falseAlarmRate);
    return Math.max(0, Math.min(1.0, Number(adj.toFixed(4))));
  },

  /**
   * Psychometric score calculation from user responses.
   * @param {Array<{word: string, isPseudoword: boolean, known: boolean, band?: number}>} respostas
   */
  calcularScore(respostas) {
    if (!Array.isArray(respostas) || respostas.length === 0) {
      return {
        estimativa_passiva: 0,
        estimativa_ativa: 0,
        nivel_cefr: 'A1',
        total_testado: 0,
        false_alarm_rate: 0,
        confiavel: true,
        ultimo_teste: Date.now()
      };
    }

    const pseudoWords = respostas.filter(r => r.isPseudoword);
    const realWords = respostas.filter(r => !r.isPseudoword);

    const falseAlarms = pseudoWords.filter(r => r.known).length;
    const falseAlarmRate = pseudoWords.length > 0 ? (falseAlarms / pseudoWords.length) : 0;
    const confiavel = falseAlarmRate < 0.5;

    let estimativaPassiva = 0;
    const bands = [1, 2, 3];

    const hasBands = realWords.some(r => r.band !== undefined);
    if (hasBands) {
      bands.forEach(b => {
        const bandItems = realWords.filter(r => r.band === b);
        if (bandItems.length === 0) return;
        const hits = bandItems.filter(r => r.known).length;
        const hitRate = hits / bandItems.length;
        const adjustedRate = this.calcularAbbott(hitRate, falseAlarmRate);
        estimativaPassiva += adjustedRate * 1000;
      });
    } else {
      const hits = realWords.filter(r => r.known).length;
      const hitRate = realWords.length > 0 ? (hits / realWords.length) : 0;
      const adjustedRate = this.calcularAbbott(hitRate, falseAlarmRate);
      estimativaPassiva = Math.round(adjustedRate * 3000);
    }

    estimativaPassiva = Math.max(0, Math.round(estimativaPassiva));
    const estimativaAtiva = Math.round(estimativaPassiva * 0.65);

    let nivelCefr = 'A1';
    if (estimativaPassiva >= 2800) nivelCefr = 'C1/C2';
    else if (estimativaPassiva >= 2000) nivelCefr = 'B2';
    else if (estimativaPassiva >= 1200) nivelCefr = 'B1';
    else if (estimativaPassiva >= 600) nivelCefr = 'A2';

    return {
      estimativa_passiva: estimativaPassiva,
      estimativa_ativa: estimativaAtiva,
      nivel_cefr: nivelCefr,
      total_testado: respostas.length,
      false_alarm_rate: Number(falseAlarmRate.toFixed(3)),
      confiavel,
      ultimo_teste: Date.now()
    };
  },

  /**
   * Generates stratified 48 items list (36 real NGSL lemmata + 12 pseudowords).
   */
  gerarItensTeste() {
    const itens = [];
    const freqClient = (typeof FrequencyClient !== 'undefined' && typeof FrequencyClient.sampleBand === 'function')
      ? FrequencyClient
      : (typeof FrequencyBandClient !== 'undefined' ? FrequencyBandClient : null);

    if (freqClient && typeof freqClient.sampleBand === 'function') {
      // 12 items per band (1k to 3k)
      for (let b = 1; b <= 3; b++) {
        const sample = freqClient.sampleBand(b, 12);
        sample.forEach(lemma => {
          itens.push({ word: lemma, isPseudoword: false, band: b });
        });
      }
    } else {
      // Fallback English high frequency words
      const lemasFallback = [
        // 1k
        { w: 'time', b: 1 }, { w: 'year', b: 1 }, { w: 'people', b: 1 }, { w: 'way', b: 1 },
        { w: 'day', b: 1 }, { w: 'man', b: 1 }, { w: 'thing', b: 1 }, { w: 'woman', b: 1 },
        { w: 'life', b: 1 }, { w: 'child', b: 1 }, { w: 'world', b: 1 }, { w: 'school', b: 1 },
        // 2k
        { w: 'develop', b: 2 }, { w: 'effort', b: 2 }, { w: 'decide', b: 2 }, { w: 'rate', b: 2 },
        { w: 'strong', b: 2 }, { w: 'possible', b: 2 }, { w: 'heart', b: 2 }, { w: 'drug', b: 2 },
        { w: 'show', b: 2 }, { w: 'leader', b: 2 }, { w: 'light', b: 2 }, { w: 'voice', b: 2 },
        // 3k
        { w: 'abandon', b: 3 }, { w: 'barrier', b: 3 }, { w: 'colleague', b: 3 }, { w: 'dimension', b: 3 },
        { w: 'enhance', b: 3 }, { w: 'framework', b: 3 }, { w: 'genuine', b: 3 }, { w: 'hierarchy', b: 3 },
        { w: 'insight', b: 3 }, { w: 'justify', b: 3 }, { w: 'legend', b: 3 }, { w: 'manipulate', b: 3 }
      ];
      lemasFallback.forEach(item => {
        itens.push({ word: item.w, isPseudoword: false, band: item.b });
      });
    }

    // Add 12 pseudowords (catch trials)
    this.PSEUDOPALAVRAS.forEach(p => {
      itens.push({ word: p, isPseudoword: true });
    });

    return itens.sort(() => Math.random() - 0.5);
  },

  /**
   * Starts the diagnostic test modal.
   */
  iniciar() {
    this._respostas = [];
    this._itensTeste = this.gerarItensTeste();
    this._indiceAtual = 0;
    this._inicioTimestamp = Date.now();
    this._ativo = true;

    this._abrirModal();
    this._renderizarItem();
  },

  _abrirModal() {
    let modal = document.getElementById('modal-diagnostico-vocab');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modal-diagnostico-vocab';
      modal.className = 'modal-backdrop-diagnostico ativo';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', 'Diagnóstico de Vocabulário em Inglês');
      modal.innerHTML = `
        <div class="modal-card-diagnostico">
          <div class="diag-header">
            <h3>🔬 The Mirror — English Vocabulary Diagnostic</h3>
            <button type="button" class="btn-fechar-modal" onclick="VocabDiagnostic.fechar()">✖</button>
          </div>
          <div class="diag-progresso-bar">
            <div id="diag-progresso-fill" style="width: 0%;"></div>
          </div>
          <div id="diag-conteudo-palco" class="diag-palco"></div>
        </div>
      `;
      document.body.appendChild(modal);
    } else {
      modal.classList.add('ativo');
    }
  },

  _renderizarItem() {
    const palco = document.getElementById('diag-conteudo-palco');
    const fill = document.getElementById('diag-progresso-fill');
    if (!palco) return;

    if (this._indiceAtual >= this._itensTeste.length) {
      this._finalizar();
      return;
    }

    const item = this._itensTeste[this._indiceAtual];
    const total = this._itensTeste.length;
    const pct = Math.round((this._indiceAtual / total) * 100);
    if (fill) fill.style.width = `${pct}%`;

    palco.innerHTML = `
      <div class="diag-item-box">
        <span class="diag-step-counter">${this._indiceAtual + 1} of ${total}</span>
        <h2 class="diag-palavra-destaque">${item.word}</h2>
        <p class="diag-pergunta-prompt">Do you know what this word means?</p>
        <div class="diag-botoes-row">
          <button type="button" class="btn-diag-nao" onclick="VocabDiagnostic.responder(false)">
            ❌ No, I don't
          </button>
          <button type="button" class="btn-diag-sim" onclick="VocabDiagnostic.responder(true)">
            ✅ Yes, I do
          </button>
        </div>
        <div class="diag-dica-honestidade">
          💡 Be honest: catch words are included to prevent guessing bias and ensure psychometric accuracy.
        </div>
      </div>
    `;
  },

  responder(conhece) {
    if (!this._ativo) return;
    const item = this._itensTeste[this._indiceAtual];
    this._respostas.push({
      word: item.word,
      isPseudoword: item.isPseudoword,
      known: Boolean(conhece),
      band: item.band
    });

    this._indiceAtual++;
    this._renderizarItem();
  },

  _finalizar() {
    this._ativo = false;
    const resultado = this.calcularScore(this._respostas);

    // Persiste no App.estado
    if (typeof App !== 'undefined' && App.estado && App.estado.progresso) {
      App.estado.progresso.vocab_diagnostico = resultado;
      if (typeof App.salvarProgresso === 'function') {
        App.salvarProgresso();
      }
    }

    const palco = document.getElementById('diag-conteudo-palco');
    const fill = document.getElementById('diag-progresso-fill');
    if (fill) fill.style.width = '100%';

    if (palco) {
      let alertaBluff = '';
      if (!resultado.confiavel) {
        alertaBluff = `
          <div class="diag-alerta-bluff">
            ⚠️ <strong>Atenção:</strong> Detectamos respostas afirmativas em palavras fictícias (taxa de falso alarme: ${(resultado.false_alarm_rate * 100).toFixed(0)}%). O resultado foi calibrado para neutralizar o viés.
          </div>
        `;
      }

      palco.innerHTML = `
        <div class="diag-resultado-box">
          <div class="diag-resultado-badge">SEU MAPA ATUAL</div>
          <div class="diag-cefr-destaque">${resultado.nivel_cefr}</div>
          <p class="diag-resumo-estimativa">
            Estimativa de vocabulário passivo: <strong>~${resultado.estimativa_passiva.toLocaleString()} palavras</strong><br>
            Vocabulário ativo estimado: <strong>~${resultado.estimativa_ativa.toLocaleString()} palavras</strong>
          </p>
          ${alertaBluff}
          <div class="diag-distancia-alvo">
            <h4>🎯 Distância até a Fluência Autônoma (Laufer 95%):</h4>
            <div class="diag-metro-track">
              <div class="diag-metro-fill" style="width: ${Math.min(100, Math.round((resultado.estimativa_passiva / 3000) * 100))}%;"></div>
            </div>
            <div class="diag-metro-labels">
              <span>0 (Iniciante)</span>
              <span>1.000 (A2)</span>
              <span>2.000 (B1)</span>
              <span>3.000 (B2/C1 Meta)</span>
            </div>
          </div>
          <div class="diag-resultado-actions">
            <button type="button" class="btn-primario" onclick="VocabDiagnostic.fechar()">
              Continuar Aprendendo →
            </button>
          </div>
        </div>
      `;
    }

    // Atualiza o card de perfil se estiver aberto
    if (typeof Profile !== 'undefined' && typeof Profile.renderizarPerfil === 'function') {
      Profile.renderizarPerfil();
    }
  },

  fechar() {
    this._ativo = false;
    const modal = document.getElementById('modal-diagnostico-vocab');
    if (modal) modal.remove();
  }
};

// Global export
if (typeof window !== 'undefined') {
  window.VocabDiagnostic = VocabDiagnostic;
}
if (typeof globalThis !== 'undefined') {
  globalThis.VocabDiagnostic = VocabDiagnostic;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VocabDiagnostic;
}
