// ============================================================
// error-boundary.js — Error Boundary global para a SPA
// ============================================================
// Captura erros não tratados e mostra UI de fallback em vez de tela branca

const ErrorBoundary = {
  _container: null,
  _errorLog: [],
  _inicializado: false,

  init(containerId) {
    // Load persisted error log
    try { this._errorLog = JSON.parse(localStorage.getItem("en_error_log") || "[]").slice(-20); } catch(_) {}
    this._container = document.getElementById(containerId);
    if (!this._container) return;
    this._inicializado = true;

    // Capturar erros não tratados
    window.addEventListener('error', (event) => {
      this._handleError(event.error || new Error(event.message), event.filename, event.lineno);
    });

    // Capturar promises rejeitadas
    window.addEventListener('unhandledrejection', (event) => {
      this._handleError(event.reason || new Error('Promise rejeitada'), 'promise', 0);
    });
  },

  _handleError(error, source = 'unknown', line = 0) {
    const errorInfo = {
      message: error?.message || 'Erro desconhecido',
      source,
      line,
      timestamp: new Date().toISOString(),
      stack: error?.stack || '',
    };

    this._errorLog.push(errorInfo);
    if (this._errorLog.length > 20) this._errorLog.shift();
    try { localStorage.setItem("en_error_log", JSON.stringify(this._errorLog)); } catch(_) {}
    console.error('[ErrorBoundary]', errorInfo);

    // Mostrar UI de erro
    if (this._container) {
      this._container.innerHTML = `
        <div role="alert" style="text-align:center;padding:2rem 1rem;max-width:500px;margin:2rem auto">
          <div style="font-size:3rem;margin-bottom:0.8rem">⚠️</div>
          <div style="font-weight:700;font-size:1.1rem;margin-bottom:0.5rem;color:#C0392B">Oops! Algo deu errado</div>
          <div style="color:var(--cor-pietra);margin-bottom:1rem;font-size:0.9rem">O app encontrou um erro inesperado. Você pode tentar recarregar.</div>
          <div style="display:flex;gap:0.5rem;justify-content:center;flex-wrap:wrap">
            <button onclick="location.reload()" style="padding:0.6rem 1.4rem;background:#27AE60;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer">🔄 Recarregar</button>
            <button onclick="ErrorBoundary.limparErro()" style="padding:0.6rem 1.4rem;background:#aaa;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer">✕ Ignorar</button>
            <button onclick="ErrorBoundary.mostrarDetalhes()" style="padding:0.6rem 1.4rem;background:#1A5276;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer">🔍 Detalhes</button>
            <button onclick="ErrorBoundary.exportarLogs()" style="padding:0.6rem 1.4rem;background:#8E44AD;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer">📋 Exportar Logs</button>
          </div>
          <div id="error-boundary-detalhes" style="display:none;margin-top:1rem;text-align:left;background:#f8f8f8;padding:0.8rem;border-radius:6px;font-size:0.75rem;font-family:monospace;white-space:pre-wrap;max-height:200px;overflow-y:auto;color:#333"></div>
        </div>`;
    }
  },

  limparErro() {
    if (this._container) {
      this._container.innerHTML = '';
    }
  },

  mostrarDetalhes() {
    const el = document.getElementById('error-boundary-detalhes');
    if (el) {
      el.style.display = el.style.display === 'none' ? 'block' : 'none';
      if (el.style.display === 'block') {
        el.textContent = this._errorLog.map(e =>
          `[${e.timestamp}] ${e.message}\n  em ${e.source}:${e.line}${e.stack ? '\n  ' + e.stack.split('\n').slice(1, 3).join('\n  ') : ''}`
        ).join('\n\n');
      }
    }
  },

  // Wrapper seguro para funções que podem lançar erros
  seguro(fn, fallback = null) {
    try {
      return fn();
    } catch (e) {
      this._handleError(e, 'funcao-wrapper', 0);
      return fallback;
    }
  },

  exportarLogs() {
    const dados = {
      app: 'English Autêntico',
      exportadoEm: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
      url: typeof location !== 'undefined' ? location.href : 'N/A',
      totalErros: this._errorLog.length,
      erros: this._errorLog
    };
    const jsonStr = JSON.stringify(dados, null, 2);

    // Tenta copiar para o clipboard
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(jsonStr)
        .then(() => {
          if (typeof window !== 'undefined' && window.App && typeof window.App.toast === 'function') {
            window.App.toast('📋 Logs copiados para a área de transferência!');
          } else {
            alert('📋 Logs copiados para a área de transferência!');
          }
        })
        .catch(() => this._baixarArquivoLog(jsonStr));
    } else {
      this._baixarArquivoLog(jsonStr);
    }
    return jsonStr;
  },

  _baixarArquivoLog(conteudo) {
    if (typeof document === 'undefined') return;
    try {
      const blob = new Blob([conteudo], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `english-autentico-error-log-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Falha ao baixar arquivo de log:', err);
    }
  }
};

if (typeof window !== 'undefined') {
  window.ErrorBoundary = ErrorBoundary;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ErrorBoundary;
}
