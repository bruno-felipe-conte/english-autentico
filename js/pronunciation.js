// ============================================================
// pronunciation.js — Pronunciation Dojo & Phonetics
// Speech recognition, word-by-word phonetic analysis,
// dual-speed playback and comparative self-listening (MediaRecorder)
// ============================================================

const Pronunciation = {
  dados: null,
  itemAtual: 0,
  recognition: null,
  isRecording: false,
  _filtroNivel: '',
  _filtroOrigem: '',
  _listaAtual: null,

  // Gravação de áudio do usuário (MediaRecorder para auto-escuta comparativa)
  _mediaRecorder: null,
  _mediaStream: null,
  _audioChunks: [],
  _userAudioUrl: null,
  _userAudioPlayer: null,
  _recordedMimeType: '',

  _isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      || (navigator.maxTouchPoints > 0 && /Macintosh|Mac OS/.test(navigator.userAgent))
      || (window.innerWidth <= 768 && 'ontouchstart' in window);
  },

  _verificarContextoSeguro() {
    const host = (typeof window !== 'undefined' && window.location && window.location.hostname) || (typeof location !== 'undefined' ? location.hostname : '');
    if (typeof window !== 'undefined' && window.isSecureContext === false && !['localhost', '127.0.0.1'].includes(host)) {
      return false;
    }
    return true;
  },

  _obterMimeTypeGravador() {
    if (typeof MediaRecorder === 'undefined' || !MediaRecorder.isTypeSupported) return '';
    const tipos = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/mp4',
      'audio/aac',
      'audio/ogg;codecs=opus',
      'audio/wav'
    ];
    for (const t of tipos) {
      try {
        if (MediaRecorder.isTypeSupported(t)) return t;
      } catch (_) {}
    }
    return '';
  },

  async load() {
    if (!this.dados) {
      try {
        const cached = localStorage.getItem('en_swr_pronunciation');
        if (cached) {
          this.dados = JSON.parse(cached);
          fetch('data/pronunciation.json')
            .then(r => r.ok ? r.json() : null)
            .then(fresh => {
              if (fresh && (Array.isArray(fresh.pronunciation) || Array.isArray(fresh.imitazioni))) {
                this.dados = fresh;
                try { localStorage.setItem('en_swr_pronunciation', JSON.stringify(fresh)); } catch (_) {}
              }
            })
            .catch(() => {});
        }
      } catch (_) {}
    }

    if (!this.dados) {
      try {
        const r = await fetch('data/pronunciation.json');
        this.dados = await r.json();
        try { localStorage.setItem('en_swr_pronunciation', JSON.stringify(this.dados)); } catch (_) {}
      } catch (e) {
        console.error('Erro ao carregar pronunciation.json', e);
        this.dados = { pronunciation: [] };
      }
    }

    // Mescla frases customizadas — custom primeiro
    try {
      const custom = JSON.parse(localStorage.getItem('en_pronunciation_custom') || '[]');
      const nativas = (this.dados?.imitazioni || []).filter(x => !x._custom && !x.custom);
      this.dados.imitazioni = [...custom, ...nativas];
    } catch (e) {}
  },

  async render() {
    await this.load();
    this._applyFilter();
  },

  _applyFilter() {
    let todas = this.dados?.imitazioni || [];
    if (this._filtroOrigem === 'custom') todas = todas.filter(f => f._custom || f.custom);
    if (this._filtroOrigem === 'nativo') todas = todas.filter(f => !f._custom && !f.custom);
    this._listaAtual = this._filtroNivel
      ? todas.filter(f => f.nivel === this._filtroNivel)
      : todas;
    this.itemAtual = 0;
    this._renderFilters();
    this.showChallenge();
  },

  _renderFilters() {
    const c = (document.getElementById('pronunciation-container') || document.getElementById('imitazione-container'));
    if (!c) return;

    const todasRaw = this.dados?.imitazioni || [];
    const niveis = ['A1','A2','B1','B2','C1'];
    const counts = {};
    todasRaw.forEach(f => { counts[f.nivel] = (counts[f.nivel]||0)+1; });
    const nC = todasRaw.filter(f => f._custom || f.custom).length;
    const nN = todasRaw.length - nC;
    const _o = this._filtroOrigem;
    const _n = this._filtroNivel;

    let bar = document.getElementById('imit-filtro-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'imit-filtro-bar';
      bar.className = 'dojo-filtro-bar';
      c.parentElement?.insertBefore(bar, c);
    }

    const pillOrigem = (v, label, count) => `
      <button class="dojo-level-pill ${_o === v ? 'ativo' : ''}"
              onclick="Pronunciation._filtroOrigem='${v}';Pronunciation._applyFilter()">
        ${label} (${count})
      </button>
    `;

    const pillNivel = (lvl) => `
      <button class="dojo-level-pill ${_n === lvl ? 'ativo' : ''}"
              onclick="Pronunciation._filtroNivel='${_n === lvl ? '' : lvl}';Pronunciation._applyFilter()">
        ${lvl} (${counts[lvl] || 0})
      </button>
    `;

    bar.innerHTML = `
      <div class="dojo-level-pills">
        <button class="btn-ia-add" onclick="IAImport.openModal('pronunciation')" style="margin-right:0.3rem">🤖 + IA</button>
        ${pillOrigem('', 'Todas', todasRaw.length)}
        ${nC ? pillOrigem('custom', '🤖 Adicionadas', nC) : ''}
        ${nN ? pillOrigem('nativo', '📚 Nativas', nN) : ''}
      </div>
      <div class="dojo-level-pills">
        <span style="font-size:0.75rem;font-weight:700;color:var(--cor-pietra);margin-right:0.2rem">NÍVEL:</span>
        ${niveis.map(lvl => pillNivel(lvl)).join('')}
      </div>
    `;
  },

  // Reprodução em velocidade dupla do modelo nativo
  playModel(taxa = 1.0) {
    const lista = this._listaAtual || this.dados?.imitazioni || [];
    const item = lista[this.itemAtual];
    if (!item) return;
    const frase = item.frase_ingles || item.sentence || item.phrase || item.frase;

    const wave = document.getElementById('dojo-wave');
    if (wave) wave.classList.add('active');

    App.speak(frase, taxa);

    setTimeout(() => {
      const w = document.getElementById('dojo-wave');
      if (w) w.classList.remove('active');
    }, Math.max(1200, frase.length * 75 * (1 / taxa)));
  },

  // Inicializa a gravação local de áudio (MediaRecorder para auto-escuta comparativa)
  async _iniciarGravacaoMidia() {
    this._audioChunks = [];
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this._mediaStream = stream;
      const mime = this._obterMimeTypeGravador();
      this._recordedMimeType = mime;
      this._mediaRecorder = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
      this._mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) this._audioChunks.push(e.data);
      };
      this._mediaRecorder.onstop = () => {
        if (this._audioChunks.length > 0) {
          const tipo = this._recordedMimeType || 'audio/webm';
          const blob = new Blob(this._audioChunks, { type: tipo });
          if (this._userAudioUrl) URL.revokeObjectURL(this._userAudioUrl);
          this._userAudioUrl = URL.createObjectURL(blob);
          this._atualizarBtnReplay();
        }
        if (this._mediaStream) {
          this._mediaStream.getTracks().forEach(t => { try { t.stop(); } catch (_) {} });
          this._mediaStream = null;
        }
      };
      this._mediaRecorder.start();
    } catch (err) {
      console.warn('MediaRecorder não disponível ou permissão negada:', err);
      if (this._mediaStream) {
        this._mediaStream.getTracks().forEach(t => { try { t.stop(); } catch (_) {} });
        this._mediaStream = null;
      }
    }
  },

  _pararGravacaoMidia() {
    if (this._mediaRecorder && this._mediaRecorder.state !== 'inactive') {
      try { this._mediaRecorder.stop(); } catch (_) {}
    } else if (this._mediaStream) {
      this._mediaStream.getTracks().forEach(t => { try { t.stop(); } catch (_) {} });
      this._mediaStream = null;
    }
  },

  _atualizarBtnReplay() {
    const toolbar = document.querySelector('.dojo-replay-toolbar');
    if (toolbar && this._userAudioUrl && !toolbar.querySelector('.btn-meu-audio')) {
      const btn = document.createElement('button');
      btn.className = 'btn-dojo-replay btn-meu-audio';
      btn.onclick = () => Pronunciation.playMyRecording();
      btn.innerHTML = '<span>🎧</span> Ouvir Minha Gravação';
      toolbar.insertBefore(btn, toolbar.firstChild);
    }
  },

  playMyRecording() {
    if (!this._userAudioUrl) return;
    if (this._userAudioPlayer) {
      this._userAudioPlayer.pause();
      this._userAudioPlayer.currentTime = 0;
    }
    this._userAudioPlayer = new Audio(this._userAudioUrl);
    this._userAudioPlayer.play().catch(e => {
      console.warn('Erro ao reproduzir áudio do usuário:', e);
    });
  },

  initSpeechRecognition() {
    if (!this._verificarContextoSeguro()) {
      const msg = '🔒 O microfone requer conexão HTTPS no celular. Navegadores bloqueiam o microfone em conexões HTTP. Acesse via HTTPS (GitHub Pages).';
      if (typeof App !== 'undefined' && App.notificar) App.notificar(msg, 'alerta');
      const st = document.getElementById('dojo-mic-status');
      if (st) st.innerText = msg;
      return false;
    }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      return false;
    }

    try {
      this.recognition = new SR();
      this.recognition.lang = 'en-US';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.isRecording = true;
        const btn = document.getElementById('dojo-btn-mic');
        if (btn) btn.classList.add('recording');
        const st = document.getElementById('dojo-mic-status');
        if (st) st.innerHTML = '<span style="color:#E74C3C">●</span> Ouvindo... Fale com confiança!';
      };

      this.recognition.onresult = (event) => {
        if (event.results && event.results[0] && event.results[0][0]) {
          const speechResult = event.results[0][0].transcript;
          this.evaluatePronunciation(speechResult);
        }
      };

      this.recognition.onerror = (event) => {
        console.error('Erro de reconhecimento: ', event.error);
        this.isRecording = false;
        this._pararGravacaoMidia();
        const btn = document.getElementById('dojo-btn-mic');
        if (btn) btn.classList.remove('recording');
        const st = document.getElementById('dojo-mic-status');

        let erroTexto = I18n.t('imit_erro_ouvir') || 'Erro ao ouvir. Tente novamente.';
        if (event.error === 'not-allowed') {
          erroTexto = '🔒 Permissão de microfone negada. Ative o microfone nas permissões do navegador.';
        } else if (event.error === 'service-not-allowed') {
          erroTexto = '⚠️ Ditado por voz desativado no sistema (no iOS, ative em Ajustes > Teclado).';
        } else if (event.error === 'audio-capture') {
          erroTexto = '🎙️ Microfone indisponível ou ocupado por outro app.';
        } else if (event.error === 'network') {
          erroTexto = '🌐 Erro de rede ao conectar ao serviço de voz.';
        } else if (event.error === 'no-speech') {
          erroTexto = '🔇 Nenhuma fala detectada. Fale mais perto do microfone.';
        }
        if (st) st.innerText = erroTexto;
        if (typeof App !== 'undefined' && App.notificar && (event.error === 'not-allowed' || event.error === 'service-not-allowed')) {
          App.notificar(erroTexto, 'erro');
        }
      };

      this.recognition.onend = () => {
        this.isRecording = false;
        this._pararGravacaoMidia();
        const btn = document.getElementById('dojo-btn-mic');
        if (btn) btn.classList.remove('recording');
        const st = document.getElementById('dojo-mic-status');
        if (st && st.innerText.includes('Ouvindo')) {
          st.innerText = 'Processando dicção...';
        }
      };

      return true;
    } catch (e) {
      console.warn('Falha ao inicializar SpeechRecognition:', e);
      return false;
    }
  },

  toggleRecording() {
    if (!this._verificarContextoSeguro()) {
      const msg = '🔒 O microfone requer conexão HTTPS no celular. Navegadores bloqueiam o microfone em conexões HTTP. Acesse via HTTPS (GitHub Pages).';
      if (typeof App !== 'undefined' && App.notificar) App.notificar(msg, 'alerta');
      const st = document.getElementById('dojo-mic-status');
      if (st) st.innerText = msg;
      return;
    }

    const suportaSR = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

    // Se o navegador NÃO suporta Web Speech API (ex: Firefox mobile), ativa modo gravador comparativo
    if (!suportaSR) {
      this._toggleGravacaoFallback();
      return;
    }

    if (!this.recognition) {
      if (!this.initSpeechRecognition()) {
        this._toggleGravacaoFallback();
        return;
      }
    }

    if (this.isRecording) {
      try { this.recognition.stop(); } catch (_) {}
      this._pararGravacaoMidia();
      this.isRecording = false;
      const btn = document.getElementById('dojo-btn-mic');
      if (btn) btn.classList.remove('recording');
      const st = document.getElementById('dojo-mic-status');
      if (st) st.innerText = 'Processando dicção...';
    } else {
      // SÍNCRONO: chama recognition.start() diretamente no frame de toque/clique do usuário
      // Sem await antes para não expirar o gesto do usuário no Safari iOS e Chrome mobile
      try {
        this.recognition.start();
        this.isRecording = true;
      } catch (e) {
        console.warn('Erro síncrono ao iniciar reconhecimento:', e);
        try {
          this.recognition.abort();
          this.recognition.start();
          this.isRecording = true;
        } catch (e2) {
          console.error('Falha crítica ao iniciar reconhecimento:', e2);
          this._toggleGravacaoFallback();
          return;
        }
      }

      // Em desktop, grava áudio simultâneo para auto-escuta comparativa se suportado.
      // Em mobile, NÃO gravamos via getUserMedia simultaneamente para evitar hardware lock.
      if (!this._isMobile()) {
        this._iniciarGravacaoMidia().catch(() => {});
      }
    }
  },

  // Modo fallback: Gravação e auto-escuta quando SpeechRecognition não existe (ex: Firefox mobile)
  async _toggleGravacaoFallback() {
    const btn = document.getElementById('dojo-btn-mic');
    const st = document.getElementById('dojo-mic-status');

    if (this.isRecording) {
      this._pararGravacaoMidia();
      this.isRecording = false;
      if (btn) btn.classList.remove('recording');
      if (st) st.innerText = 'Áudio gravado! Use os botões abaixo para ouvir e comparar.';
      this._mostrarResultadoFallback();
    } else {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        const msg = 'Seu navegador não suporta captura de microfone.';
        if (st) st.innerText = msg;
        if (typeof App !== 'undefined' && App.notificar) App.notificar(msg, 'alerta');
        return;
      }
      this.isRecording = true;
      if (btn) btn.classList.add('recording');
      if (st) st.innerHTML = '<span style="color:#E74C3C">●</span> Gravando sua voz... Fale a frase e clique no mic para parar!';
      await this._iniciarGravacaoMidia();
    }
  },

  _mostrarResultadoFallback() {
    const resContainer = document.getElementById('pronunciation-result') || document.getElementById('imitazione-resultado');
    if (!resContainer) return;
    resContainer.style.display = 'block';

    resContainer.innerHTML = `
      <div style="font-size:1.4rem;font-weight:700;color:#27AE60;margin-bottom:0.4rem;font-family:'Cinzel',serif">
        Áudio Gravado com Sucesso! 🎧
      </div>
      <div style="font-size:0.95rem;color:var(--cor-inchiostro);margin-bottom:1rem">
        Seu navegador não possui motor de transcrição por voz nativo (Web Speech API). Ouça sua gravação e compare com a pronúncia do modelo nativo:
      </div>
      <div class="dojo-replay-toolbar">
        ${this._userAudioUrl ? `
          <button class="btn-dojo-replay" onclick="Pronunciation.playMyRecording()">
            <span>🎧</span> Ouvir Minha Gravação
          </button>
        ` : ''}
        <button class="btn-dojo-replay" onclick="Pronunciation.playModel(1.0)">
          <span>🔊</span> Ouvir Modelo Nativo
        </button>
      </div>
      <div style="display:flex;gap:0.8rem;justify-content:center;margin-top:1.25rem;flex-wrap:wrap">
        <button class="btn-secondario" onclick="Pronunciation.showChallenge()">
          🔄 Gravar Novamente
        </button>
        <button class="btn-primario" onclick="Pronunciation.next()">
          ➡️ Próxima Frase
        </button>
      </div>
    `;
    resContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  },

  normalizeText(text) {
    return (text || '').toLowerCase().replace(/[.,!?;:«»""'’]/g, '').trim();
  },

  // Avaliação analítica palavra por palavra
  evaluatePronunciation(textoOuvido) {
    const lista = this._listaAtual || this.dados.imitazioni;
    const item = lista[this.itemAtual];
    const esperadoFrase = item.frase_ingles || item.sentence || item.phrase || item.frase;

    const palavrasEsperadas = esperadoFrase.split(/\s+/);
    const palavrasOuvidas = this.normalizeText(textoOuvido).split(/\s+/);

    let acertos = 0;
    const tokensDiagnostico = palavrasEsperadas.map(palavraAlvo => {
      const alvoNorm = this.normalizeText(palavraAlvo);
      if (!alvoNorm) return { palavra: palavraAlvo, status: 'correta' };

      // 1. Acerto exato
      if (palavrasOuvidas.includes(alvoNorm)) {
        acertos++;
        return { palavra: palavraAlvo, status: 'correta' };
      }

      // 2. Acerto aproximado (tolerância fonética / prefixo)
      const quase = palavrasOuvidas.some(o => {
        if (Math.abs(o.length - alvoNorm.length) > 2) return false;
        let matches = 0;
        for (let i = 0; i < Math.min(o.length, alvoNorm.length); i++) {
          if (o[i] === alvoNorm[i]) matches++;
        }
        return (matches / Math.max(o.length, alvoNorm.length)) >= 0.7;
      });

      if (quase) {
        acertos += 0.8;
        return { palavra: palavraAlvo, status: 'proxima' };
      }

      // 3. Necessita atenção
      return { palavra: palavraAlvo, status: 'revisar' };
    });

    const precisao = Math.min(100, Math.round((acertos / palavrasEsperadas.length) * 100));

    const resContainer = document.getElementById('pronunciation-result') || document.getElementById('imitazione-resultado');
    if (!resContainer) return;
    resContainer.style.display = 'block';

    let titulo = '';
    let cor = '';
    let xpGanho = 0;

    if (precisao >= 80) {
      titulo = 'Excellent! 🌟';
      cor = '#27AE60';
      xpGanho = item.xp_recompensa || 15;
      if (typeof Progressao !== 'undefined') Progressao.ganhar(xpGanho);
      else if (typeof App !== 'undefined') App.ganharXP(xpGanho);
    } else if (precisao >= 50) {
      titulo = 'Almost! 👍';
      cor = '#E67E22';
      xpGanho = Math.round((item.xp_recompensa || 15) * 0.5);
      if (typeof Progressao !== 'undefined') Progressao.ganhar(xpGanho);
    } else {
      titulo = 'Try Again! 🔄';
      cor = '#C0392B';
    }

    resContainer.innerHTML = `
      <div style="font-size:2rem;font-weight:700;color:${cor};margin-bottom:0.4rem;font-family:'Cinzel',serif">
        ${titulo}
      </div>
      <div style="font-size:1.1rem;color:var(--cor-inchiostro);margin-bottom:1rem">
        Precisão de Dicção: <strong>${precisao}%</strong>
        ${xpGanho > 0 ? ` <span style="background:rgba(212,168,67,0.2);color:#003E8A;padding:0.15rem 0.6rem;border-radius:999px;font-weight:800;font-size:0.82rem;margin-left:0.5rem">+${xpGanho} XP</span>` : ''}
      </div>

      <div style="font-size:0.85rem;color:var(--cor-pietra);margin-bottom:0.5rem">
        Diagnóstico Palavra por Palavra (toque em qualquer palavra para ouvir o som isolado):
      </div>

      <div class="dojo-words-breakdown">
        ${tokensDiagnostico.map(t => `
          <button class="dojo-word-pill ${t.status}"
                  onclick="App.speak('${t.palavra.replace(/'/g, "\\'")}')"
                  title="Ouvir pronúncia de '${t.palavra}'">
            <span>${t.status === 'correta' ? '✓' : (t.status === 'proxima' ? '≈' : '•')}</span>
            <span>${t.palavra}</span>
          </button>
        `).join('')}
      </div>

      <div style="font-size:0.9rem;color:#666;font-style:italic;margin-top:0.6rem">
        Ouvimos: "${textoOuvido}"
      </div>

      <!-- Barra de comparação de áudio -->
      <div class="dojo-replay-toolbar">
        ${this._userAudioUrl ? `
          <button class="btn-dojo-replay" onclick="Pronunciation.playMyRecording()">
            <span>🎧</span> Ouvir Minha Gravação
          </button>
        ` : ''}
        <button class="btn-dojo-replay" onclick="Pronunciation.playModel(1.0)">
          <span>🔊</span> Ouvir Modelo Nativo
        </button>
      </div>

      <div style="display:flex;gap:0.8rem;justify-content:center;margin-top:1.25rem;flex-wrap:wrap">
        <button class="btn-secondario" onclick="Pronunciation.showChallenge()">
          🔄 Tentar Novamente
        </button>
        <button class="btn-primario" onclick="Pronunciation.next()">
          ➡️ Próxima Frase
        </button>
      </div>
    `;

    resContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  },

  next() {
    this.itemAtual++;
    const lista = this._listaAtual || this.dados?.imitazioni || [];
    if (this.itemAtual >= lista.length) {
      this.showCompletion();
    } else {
      this.showChallenge();
    }
  },

  showChallenge() {
    const c = (document.getElementById('pronunciation-container') || document.getElementById('imitazione-container'));
    if (!c) return;
    const lista = this._listaAtual || this.dados?.imitazioni || [];
    const item = lista[this.itemAtual];
    if (!item) { this.showCompletion(); return; }

    const frase = item.frase_ingles || item.sentence || item.phrase || item.frase;
    const traducao = item.frase_portugues || item.traducao;
    const contexto = item.contexto || 'Common conversational expression.';

    c.innerHTML = `
      <div class="pronunciation-dojo imitazione-dojo">
        <div class="dojo-progress-hud">
          <span>Frase <strong>${this.itemAtual + 1}</strong> de ${lista.length}</span>
          <span style="background:rgba(26,54,93,0.1);color:#1A365D;padding:0.15rem 0.6rem;border-radius:999px;font-weight:700">${item.nivel || 'A1'}</span>
        </div>

        <div class="dojo-hero-card">
          <div class="dojo-hero-badge">
            <span>🎙️ Pronunciation Studio</span>
            ${item._custom ? ` · <button onclick="IAImport.excluir('pronunciation','${item.id}')" style="background:none;border:none;color:#C0392B;cursor:pointer;font-size:0.75rem;font-weight:700">🗑️ Excluir</button>` : ''}
          </div>

          <div class="dojo-hero-frase">"${frase}"</div>
          <div class="dojo-hero-traducao">"${traducao}"</div>

          <div class="dojo-info-grid">
            <div class="dojo-info-box contexto">
              <div class="dojo-info-title">🏛️ Context & Cultural Origin</div>
              <div class="dojo-info-content">${contexto}</div>
            </div>

            <div class="dojo-info-box fonetica">
              <div class="dojo-info-title">🎵 Rhythm & Intonation Tip</div>
              <div class="dojo-info-content">${item.dica_fonetica || 'Speak with clear articulation and natural rhythm.'}</div>
            </div>
          </div>

          <!-- Estúdio de Áudio do Modelo Nativo -->
          <div class="dojo-audio-station">
            <button class="btn-dojo-audio normal" onclick="Pronunciation.playModel(1.0)">
              <span>🔊</span> Ouvir Modelo (1.0x)
            </button>
            <button class="btn-dojo-audio slow" onclick="Pronunciation.playModel(0.75)">
              <span>🐢</span> Didático Lento (0.75x)
            </button>
            <div class="dojo-soundwave" id="dojo-wave">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>

          <!-- Painel Dinâmico de Diagnóstico e Feedback -->
          <div id="pronunciation-result" class="pronunciation-result imitazione-resultado dojo-feedback-panel" style="display:none;margin-top:1.5rem">
          </div>

          <!-- Estúdio de Gravação do Aluno (Fixado na parte inferior da tela / Colado ao chão) -->
          <div class="dojo-mic-studio">
            <div class="dojo-mic-btn-wrapper">
              <button id="dojo-btn-mic" class="dojo-mic-btn" onclick="Pronunciation.toggleRecording()" title="Clique para falar">
                🎙️
              </button>
            </div>
            <div id="dojo-mic-status" class="dojo-mic-status">
              Clique no microfone e fale a frase acima
            </div>
          </div>
        </div>
      </div>
    `;
  },

  showCompletion() {
    const c = (document.getElementById('pronunciation-container') || document.getElementById('imitazione-container'));
    if (!c) return;
    const lista = this._listaAtual || this.dados?.imitazioni || [];
    c.innerHTML = `
      <div class="pronunciation-dojo imitazione-dojo">
        <div class="dojo-hero-card" style="padding:3.5rem 1.5rem">
          <div style="font-size:4.5rem;margin-bottom:1rem">🏆</div>
          <h3 style="font-family:'Cinzel',serif;color:#1A365D;font-size:2.2rem;margin-bottom:0.8rem">Awesome Job!</h3>
          <p style="font-size:1.15rem;color:var(--cor-inchiostro);margin-bottom:1.5rem;max-width:500px;margin-left:auto;margin-right:auto">
            Você completou com sucesso todas as ${lista.length} frases do treinamento auditivo e fonético!
          </p>
          <div style="display:flex;gap:0.75rem;justify-content:center;flex-wrap:wrap">
            <button class="btn-secondario" onclick="Pronunciation._applyFilter()">
              🔄 Repetir Lições
            </button>
            <button class="btn-primario" onclick="App.navegar('temples')">
              🏛️ Voltar aos Templos
            </button>
          </div>
        </div>
      </div>
    `;
  }
};


// Backward-compatibility aliases
Pronunciation.carregar = () => Pronunciation.load();
Pronunciation.renderizar = () => Pronunciation.render();
Pronunciation.tocarModelo = (r) => Pronunciation.playModel(r);
Pronunciation.tocarMinhaGravacao = () => Pronunciation.playMyRecording();
Pronunciation.toggleGravacao = () => Pronunciation.toggleRecording();
Pronunciation.avaliarPronuncia = (t) => Pronunciation.evaluatePronunciation(t);
Pronunciation.avancar = () => Pronunciation.next();

window.Pronunciation = Pronunciation;
window.Imitazione = Pronunciation;
