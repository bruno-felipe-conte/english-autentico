// ============================================================
// diagnostico.js — Dynamic Vocabulary & Context Diagnostic (< 3 min)
// Computerized Adaptive Testing with Abbott False-Alarm Correction
// Feature: "O Espelho" (The Mirror) • English Edition
// Expanded with 25 Advanced Lemmata + 25 Authentic Contextual Sentences
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

  // 25 Palavras Avançadas (B1 a C2) calibradas para teste de amplitude léxica
  PALAVRAS_AVANCADAS: [
    { word: 'reluctant', band: 2, cefr: 'B1', pt: 'relutante, hesitante' },
    { word: 'thorough', band: 2, cefr: 'B1', pt: 'minucioso, completo' },
    { word: 'inevitable', band: 2, cefr: 'B2', pt: 'inevitável' },
    { word: 'resilient', band: 3, cefr: 'B2', pt: 'resiliente, resistente' },
    { word: 'subtle', band: 2, cefr: 'B2', pt: 'sutil, discreto' },
    { word: 'compelling', band: 3, cefr: 'B2', pt: 'convincente, fascinante' },
    { word: 'feasible', band: 3, cefr: 'B2', pt: 'viável, praticável' },
    { word: 'discrepancy', band: 3, cefr: 'B2', pt: 'discrepância, divergência' },
    { word: 'unprecedented', band: 3, cefr: 'B2', pt: 'sem precedentes, inédito' },
    { word: 'scrutinize', band: 3, cefr: 'C1', pt: 'examinar minuciosamente' },
    { word: 'articulate', band: 3, cefr: 'C1', pt: 'articulado, eloquente' },
    { word: 'pragmatic', band: 3, cefr: 'C1', pt: 'pragmático, prático' },
    { word: 'ubiquitous', band: 3, cefr: 'C1', pt: 'onipresente, ubíquo' },
    { word: 'plausible', band: 3, cefr: 'C1', pt: 'plausível, verossímil' },
    { word: 'meticulous', band: 3, cefr: 'C1', pt: 'meticuloso, detalhista' },
    { word: 'detrimental', band: 3, cefr: 'C1', pt: 'prejudicial, danoso' },
    { word: 'ambiguous', band: 3, cefr: 'C1', pt: 'ambíguo, vago' },
    { word: 'substantiate', band: 3, cefr: 'C1', pt: 'fundamentar, comprovar' },
    { word: 'volatile', band: 3, cefr: 'C1', pt: 'volátil, instável' },
    { word: 'inadvertent', band: 3, cefr: 'C1', pt: 'involuntário, inadvertido' },
    { word: 'poignant', band: 3, cefr: 'C2', pt: 'comovente, pungente' },
    { word: 'quintessential', band: 3, cefr: 'C2', pt: 'essencial, prototípico' },
    { word: 'exacerbate', band: 3, cefr: 'C2', pt: 'agravar, exacerbar' },
    { word: 'tenacity', band: 3, cefr: 'C2', pt: 'tenacidade, perseverança' },
    { word: 'fathom', band: 3, cefr: 'C2', pt: 'compreender, sondar' }
  ],

  // 25 Frases Autênticas em Contexto (A2 a C2) para teste de sintaxe e compreensão
  FRASES_DIAGNOSTICO: [
    {
      en: "I couldn't help laughing when I heard the news.",
      pt: "Não pude evitar de rir quando soube da notícia.",
      foco: "Estrutura idiomática (can't help + -ing)",
      cefr: "A2/B1"
    },
    {
      en: "We had to call off the outdoor match due to heavy rain.",
      pt: "Tivemos que cancelar a partida ao ar livre devido à chuva forte.",
      foco: "Phrasal Verb (call off = cancelar)",
      cefr: "B1"
    },
    {
      en: "I am really looking forward to meeting your family.",
      pt: "Estou realmente ansioso para conhecer sua família.",
      foco: "Regência preposicional (look forward to + -ing)",
      cefr: "B1"
    },
    {
      en: "He managed to figure out the puzzle all by himself.",
      pt: "Ele conseguiu desvendar o enigma totalmente sozinho.",
      foco: "Phrasal Verb (figure out = resolver/entender)",
      cefr: "B1"
    },
    {
      en: "If I had known about the delay, I would have taken the train.",
      pt: "Se eu soubesse do atraso, teria pegado o trem.",
      foco: "Third Conditional (hipótese irreal no passado)",
      cefr: "B1/B2"
    },
    {
      en: "I would rather you didn't share this conversation with anyone.",
      pt: "Eu preferiria que você não compartilhasse esta conversa com ninguém.",
      foco: "Subjuntivo de preferência (would rather + past simple)",
      cefr: "B2"
    },
    {
      en: "The board decided to put the acquisition on hold for now.",
      pt: "A diretoria decidiu suspender temporariamente a aquisição por enquanto.",
      foco: "Colocação idiomática (put on hold)",
      cefr: "B2"
    },
    {
      en: "Hardly had the bell rung when the students rushed out.",
      pt: "Mal o sinal havia tocado quando os alunos saíram correndo.",
      foco: "Inversão sintática com advérbio negativo (Hardly had...)",
      cefr: "B2/C1"
    },
    {
      en: "She made a point of thanking every volunteer individually.",
      pt: "Ela fez questão de agradecer a cada voluntário individualmente.",
      foco: "Expressão idiomática (make a point of)",
      cefr: "B2"
    },
    {
      en: "It is high time we addressed the underlying causes of the conflict.",
      pt: "Já passou da hora de abordarmos as causas profundas do conflito.",
      foco: "Estrutura temporal hipotética (it's high time + past)",
      cefr: "B2"
    },
    {
      en: "The findings are broadly consistent with previous empirical studies.",
      pt: "Os resultados são amplamente coerentes com estudos empíricos anteriores.",
      foco: "Linguagem acadêmica (consistent with)",
      cefr: "B2"
    },
    {
      en: "He was completely taken aback by the bluntness of her feedback.",
      pt: "Ele ficou completamente desconcertado com a franqueza do feedback dela.",
      foco: "Expressão idiomática (taken aback = atônito/surpreso)",
      cefr: "B2/C1"
    },
    {
      en: "Under no circumstances should the safety protocols be bypassed.",
      pt: "Sob nenhuma circunstância os protocolos de segurança devem ser ignorados.",
      foco: "Inversão enfática formal (Under no circumstances should...)",
      cefr: "C1"
    },
    {
      en: "The experimental device fell short of our performance benchmarks.",
      pt: "O dispositivo experimental ficou aquém das nossas metas de desempenho.",
      foco: "Colocação verbal (fall short of = ficar aquém)",
      cefr: "C1"
    },
    {
      en: "He took it for granted that the committee would approve the budget.",
      pt: "Ele deu como certo que a comissão aprovaria o orçamento.",
      foco: "Expressão idiomática (take for granted = dar como certo/pressupor)",
      cefr: "B2/C1"
    },
    {
      en: "This innovative initiative seeks to bridge the gap between disciplines.",
      pt: "Esta iniciativa inovadora busca estreitar a lacuna entre as disciplinas.",
      foco: "Metáfora conceitual (bridge the gap)",
      cefr: "B2"
    },
    {
      en: "The company was on the verge of bankruptcy before the turnaround.",
      pt: "A empresa estava à beira da falência antes da virada estratégica.",
      foco: "Expressão de proximidade (on the verge of)",
      cefr: "B2/C1"
    },
    {
      en: "Upon closer scrutiny, his hypothesis simply doesn't hold water.",
      pt: "Sob análise mais detalhada, sua hipótese simplesmente não se sustenta.",
      foco: "Expressão idiomática (hold water = ter fundamento/sustentar-se)",
      cefr: "C1"
    },
    {
      en: "In hindsight, we ought to have evaluated the secondary risks sooner.",
      pt: "Em retrospectiva, deveríamos ter avaliado os riscos secundários mais cedo.",
      foco: "Modais no passado com retrospectiva (In hindsight, ought to have)",
      cefr: "B2/C1"
    },
    {
      en: "The economic expansion came at the expense of environmental degradation.",
      pt: "A expansão econômica ocorreu às custas da degradação ambiental.",
      foco: "Conector causal/adversativo (at the expense of)",
      cefr: "C1"
    },
    {
      en: "Had it not been for the mentor's counsel, the venture would have collapsed.",
      pt: "Não fosse pelo conselho do mentor, o empreendimento teria colapsado.",
      foco: "Condicional invertido formal (Had it not been for...)",
      cefr: "C1"
    },
    {
      en: "She possesses an uncanny knack for discerning underlying motivations.",
      pt: "Ela possui um talento impressionante para perceber motivações ocultas.",
      foco: "Colocação avançada C1/C2 (uncanny knack)",
      cefr: "C1/C2"
    },
    {
      en: "The analyst's forecast paints a bleak picture of next quarter's revenue.",
      pt: "A previsão do analista desenha um panorama sombrio para o faturamento do próximo trimestre.",
      foco: "Expressão idiomática formal (paint a bleak picture)",
      cefr: "C1"
    },
    {
      en: "His argument, albeit plausible at first glance, unravels under pressure.",
      pt: "Seu argumento, embora plausível à primeira vista, desmorona sob pressão.",
      foco: "Conjunção concessiva arcaica/erudita (albeit)",
      cefr: "C2"
    },
    {
      en: "The essay deftly weaves philosophical musings with everyday observation.",
      pt: "O ensaio entrelaça com destreza reflexões filosóficas com observações cotidianas.",
      foco: "Vocabulário estilístico e literário avançado (deftly weaves)",
      cefr: "C2"
    }
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
   * Integrates vocabulary recognition (Abbott-corrected) with contextual sentence comprehension.
   * @param {Array<{word: string, isPseudoword: boolean, known: boolean, band?: number, tipo?: string}>} respostas
   */
  calcularScore(respostas) {
    if (!Array.isArray(respostas) || respostas.length === 0) {
      return {
        estimativa_passiva: 0,
        estimativa_ativa: 0,
        nivel_cefr: 'A1',
        total_testado: 0,
        total_palavras: 0,
        total_frases: 0,
        frases_acertos: 0,
        taxa_frases: 0,
        false_alarm_rate: 0,
        confiavel: true,
        ultimo_teste: Date.now()
      };
    }

    const pseudoWords = respostas.filter(r => r.isPseudoword);
    const realWords = respostas.filter(r => !r.isPseudoword && r.tipo !== 'frase');
    const frases = respostas.filter(r => r.tipo === 'frase');

    const falseAlarms = pseudoWords.filter(r => r.known).length;
    const falseAlarmRate = pseudoWords.length > 0 ? (falseAlarms / pseudoWords.length) : 0;
    const confiavel = falseAlarmRate < 0.5;

    // 1. Cálculo de Vocabulário Passivo
    let estimativaPassiva = 0;
    if (realWords.length > 0) {
      const presentBands = [1, 2, 3].filter(b => realWords.some(r => r.band === b));
      if (presentBands.length === 3) {
        presentBands.forEach(b => {
          const bandItems = realWords.filter(r => r.band === b);
          const hits = bandItems.filter(r => r.known).length;
          const hitRate = hits / bandItems.length;
          const adjustedRate = this.calcularAbbott(hitRate, falseAlarmRate);
          estimativaPassiva += adjustedRate * 1000;
        });
      } else {
        const hits = realWords.filter(r => r.known).length;
        const hitRate = hits / realWords.length;
        const adjustedRate = this.calcularAbbott(hitRate, falseAlarmRate);
        estimativaPassiva = Math.round(adjustedRate * 3000);
      }
    }

    estimativaPassiva = Math.max(0, Math.round(estimativaPassiva));
    const estimativaAtiva = Math.round(estimativaPassiva * 0.65);

    // 2. Cálculo de Compreensão de Frases
    let frasesAcertos = 0;
    let frasesTotal = frases.length;
    let taxaFrases = 1.0;
    if (frasesTotal > 0) {
      frasesAcertos = frases.filter(f => f.known).length;
      taxaFrases = Number((frasesAcertos / frasesTotal).toFixed(2));
    }

    // 3. Determinação Refinada do CEFR (combinando palavras + frases)
    let nivelCefr = 'A1';
    if (!confiavel) {
      nivelCefr = 'A1';
      estimativaPassiva = 0;
    } else if (frasesTotal > 0) {
      // Quando há frases, a determinação exige vocabulário E sintaxe
      if (estimativaPassiva >= 2600 && taxaFrases >= 0.80) {
        nivelCefr = 'C1/C2';
      } else if (estimativaPassiva >= 1800 && taxaFrases >= 0.65) {
        nivelCefr = 'B2';
      } else if (estimativaPassiva >= 1100 && taxaFrases >= 0.45) {
        nivelCefr = 'B1';
      } else if (estimativaPassiva >= 500 && taxaFrases >= 0.25) {
        nivelCefr = 'A2';
      } else {
        nivelCefr = 'A1';
      }
    } else {
      // Modo clássico (somente palavras)
      if (estimativaPassiva >= 2800) nivelCefr = 'C1/C2';
      else if (estimativaPassiva >= 2000) nivelCefr = 'B2';
      else if (estimativaPassiva >= 1200) nivelCefr = 'B1';
      else if (estimativaPassiva >= 600) nivelCefr = 'A2';
    }

    return {
      estimativa_passiva: estimativaPassiva,
      estimativa_ativa: Math.round(estimativaPassiva * 0.65),
      nivel_cefr: nivelCefr,
      total_testado: respostas.length,
      total_palavras: realWords.length,
      total_frases: frasesTotal,
      frases_acertos: frasesAcertos,
      taxa_frases: taxaFrases,
      false_alarm_rate: Number(falseAlarmRate.toFixed(3)),
      confiavel,
      ultimo_teste: Date.now()
    };
  },

  /**
   * Generates comprehensive item list:
   * 25 Advanced lemmata + 25 Contextual sentences + 12 Pseudowords
   */
  gerarItensTeste() {
    const itens = [];

    // 1. As 25 Palavras Avançadas
    this.PALAVRAS_AVANCADAS.forEach(item => {
      itens.push({
        tipo: 'palavra',
        word: item.word,
        isPseudoword: false,
        band: item.band,
        cefr: item.cefr,
        pt: item.pt
      });
    });

    // 2. As 25 Frases em Contexto
    this.FRASES_DIAGNOSTICO.forEach(item => {
      itens.push({
        tipo: 'frase',
        en: item.en,
        pt: item.pt,
        foco: item.foco,
        cefr: item.cefr,
        isPseudoword: false
      });
    });

    // 3. As 12 Pseudopalavras (Controle de Falso Alarme de Abbott)
    this.PSEUDOPALAVRAS.forEach(p => {
      itens.push({
        tipo: 'palavra',
        word: p,
        isPseudoword: true
      });
    });

    // Embaralha para que frases e palavras apareçam em fluxo dinâmico
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
      modal.setAttribute('aria-label', 'Diagnóstico de Vocabulário e Nível de Inglês');
      modal.innerHTML = `
        <div class="modal-card-diagnostico">
          <div class="diag-header">
            <h3>🔬 The Mirror — English CEFR Diagnostic</h3>
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

    if (item.tipo === 'frase') {
      palco.innerHTML = `
        <div class="diag-item-box diag-item-frase">
          <span class="diag-step-counter">${this._indiceAtual + 1} of ${total}</span>
          <div class="diag-tipo-badge">📝 SENTENCE IN CONTEXT · ${item.cefr || 'B1/B2'}</div>
          <div class="diag-frase-foco">🎯 <strong>Foco:</strong> ${item.foco || 'Sintaxe e Expressão'}</div>
          <blockquote class="diag-frase-destaque">“${item.en}”</blockquote>
          <p class="diag-pergunta-prompt">Do you fully understand the grammar, nuance and meaning of this sentence?</p>
          <div class="diag-botoes-row">
            <button type="button" class="btn-diag-nao" onclick="VocabDiagnostic.responder(false)">
              ❌ No / Not completely
            </button>
            <button type="button" class="btn-diag-sim" onclick="VocabDiagnostic.responder(true)">
              ✅ Yes, I do
            </button>
          </div>
          <div class="diag-dica-honestidade">
            💡 Evaluates real grammatical intuition, idioms, and syntactic comprehension in authentic English.
          </div>
        </div>
      `;
    } else {
      palco.innerHTML = `
        <div class="diag-item-box">
          <span class="diag-step-counter">${this._indiceAtual + 1} of ${total}</span>
          <div class="diag-tipo-badge">📖 VOCABULARY ${item.cefr ? '· ' + item.cefr : (item.band ? '· Band ' + item.band : '')}</div>
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
    }
  },

  responder(conhece) {
    if (!this._ativo) return;
    const item = this._itensTeste[this._indiceAtual];
    this._respostas.push({
      tipo: item.tipo || 'palavra',
      word: item.word || item.en,
      isPseudoword: Boolean(item.isPseudoword),
      known: Boolean(conhece),
      band: item.band,
      cefr: item.cefr,
      foco: item.foco,
      pt: item.pt
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

      const frasesInfo = resultado.total_frases > 0
        ? `<div class="diag-frases-resultado">
             📝 Compreensão de Frases em Contexto: <strong>${resultado.frases_acertos} de ${resultado.total_frases} (${Math.round(resultado.taxa_frases * 100)}%)</strong>
           </div>`
        : '';

      palco.innerHTML = `
        <div class="diag-resultado-box">
          <div class="diag-resultado-badge">SEU MAPA ATUAL DE INGLÊS</div>
          <div class="diag-cefr-destaque">${resultado.nivel_cefr}</div>
          <p class="diag-resumo-estimativa">
            Estimativa de vocabulário passivo: <strong>~${resultado.estimativa_passiva.toLocaleString()} palavras</strong><br>
            Vocabulário ativo estimado: <strong>~${resultado.estimativa_ativa.toLocaleString()} palavras</strong>
          </p>
          ${frasesInfo}
          ${alertaBluff}
          <div class="diag-distancia-alvo">
            <h4>🎯 Distância até a Fluência Autônoma (Laufer 95%):</h4>
            <div class="diag-metro-track">
              <div class="diag-metro-fill" style="width: ${Math.min(100, Math.round((resultado.estimativa_passiva / 3000) * 100))}%;"></div>
            </div>
            <div class="diag-metro-labels">
              <span>0 (A1)</span>
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
