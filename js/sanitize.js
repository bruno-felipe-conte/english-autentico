// ============================================================
// sanitize.js — XSS prevention utilities
// ============================================================

const Sanitize = {
  /**
   * Escapes HTML special characters to prevent XSS
   * @param {string} str - Input string
   * @returns {string} - Escaped string safe for HTML insertion
   */
  escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  /**
   * Sanitizes HTML string - allows only safe tags/attributes
   * @param {string} html - HTML string to sanitize
   * @returns {string} - Sanitized HTML
   */
  sanitizeHtml(html) {
    if (typeof html !== 'string') return '';
    return this.escapeHtml(html);
  },

  /**
   * Safe innerHTML setter - sanitizes content before setting
   * @param {HTMLElement} el - Target element
   * @param {string} html - HTML content
   */
  safeInnerHtml(el, html) {
    if (!el) return;
    el.innerHTML = this.sanitizeHtml(html);
  },

  /**
   * Safe textContent setter
   * @param {HTMLElement} el - Target element
   * @param {string} text - Text content
   */
  safeText(el, text) {
    if (!el) return;
    el.textContent = text;
  },

  /**
   * Escapes string for safe use in onclick handlers
   * @param {string} str - Input string
   * @returns {string} - Escaped string safe for JS string literal
   */
  escapeJsString(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t');
  },

  /**
   * Creates safe onclick handler attribute
   * @param {string} fnName - Function name
   * @param {...string} args - Arguments
   * @returns {string} - Safe onclick attribute value
   */
  safeOnClick(fnName, ...args) {
    const escapedArgs = args.map(arg => typeof arg === 'string' ? `'${this.escapeJsString(arg)}'` : String(arg)).join(',');
    return `onclick="${fnName}(${escapedArgs})"`;
  }
};

if (typeof window !== 'undefined') {
  window.Sanitize = Sanitize;
  window.escapeHtml = Sanitize.escapeHtml.bind(Sanitize);
  window.sanitizeHtml = Sanitize.sanitizeHtml.bind(Sanitize);
  window.safeInnerHtml = Sanitize.safeInnerHtml.bind(Sanitize);
  window.safeText = Sanitize.safeText.bind(Sanitize);
  window.escapeJsString = Sanitize.escapeJsString.bind(Sanitize);
  window.safeOnClick = Sanitize.safeOnClick.bind(Sanitize);
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Sanitize;
}
