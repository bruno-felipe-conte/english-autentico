# scripts/apply_quiz_fixes.py
with open('js/quiz.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Normalize CRLF to LF
content = content.replace('\r\n', '\n')

# 1. In _gerarPerguntas, add ingles: termoStr
target1 = '''      const termoStr = p.ingles;
      perguntas.push({
        id: `gen_${p.id}`,
        templo: temploNum,
        tipo: 'vocabulario',
        nivel: data.nivel || 'A1',
        pergunta: I18n.t('quiz_what_does_mean').replace('{w}', termoStr),'''

repl1 = '''      const termoStr = p.ingles;
      perguntas.push({
        id: `gen_${p.id}`,
        templo: temploNum,
        tipo: 'vocabulario',
        nivel: data.nivel || 'A1',
        ingles: termoStr,
        pergunta: I18n.t('quiz_what_does_mean').replace('{w}', termoStr),'''

assert target1 in content, 'Target 1 not found'
content = content.replace(target1, repl1)

# 2. In mostrarPergunta, normalize badge type and ensure dataset.ingles
target2 = '''    // Question type badge
    const tipoBadge = document.getElementById('quiz-tipo');
    if (tipoBadge) tipoBadge.textContent = I18n.t('quiz_tipo_' + p.tipo) || p.tipo || I18n.t('quiz_tipo_vocabulario');

    // Question text
    const perguntaEl = document.getElementById('quiz-pergunta');
    if (perguntaEl) {
      perguntaEl.textContent = p.pergunta;
      const tLang = p.ingles;
      if (tLang) perguntaEl.dataset.ingles = tLang;
      else delete perguntaEl.dataset.ingles;
    }

    const btnOuvir = document.getElementById('btn-ouvir-quiz');
    if (btnOuvir) {
      if (p.tipo === 'listening') {
        btnOuvir.style.display = 'flex';
        // Auto play audio when question appears
        const tLang = p.ingles;
        if (tLang) setTimeout(() => { if (typeof App !== 'undefined' && App.pronunciar) App.pronunciar(tLang); }, 400);
      } else {
        btnOuvir.style.display = 'none';
      }
    }'''

repl2 = '''    // Question type badge
    const tipoBadge = document.getElementById('quiz-tipo');
    const rawTipo = (p.tipo || 'vocabulario').toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
    if (tipoBadge) tipoBadge.textContent = I18n.t('quiz_tipo_' + rawTipo) || p.tipo || I18n.t('quiz_tipo_vocabulario');

    // Question text
    const perguntaEl = document.getElementById('quiz-pergunta');
    if (perguntaEl) {
      perguntaEl.textContent = p.pergunta;
      const tLang = p.ingles || (p.tipo === 'vocabulario' ? p.pergunta.match(/\"([^\"]+)\"/)?.[1] : null) || p.resposta_correta;
      if (tLang) perguntaEl.dataset.ingles = tLang;
      else delete perguntaEl.dataset.ingles;
    }

    const btnOuvir = document.getElementById('btn-ouvir-quiz');
    if (btnOuvir) {
      if (p.tipo === 'listening' || p.tipo === 'vocabulario') {
        btnOuvir.style.display = 'flex';
        if (p.tipo === 'listening') {
          const tLang = p.ingles || p.resposta_correta;
          if (tLang) setTimeout(() => { if (typeof App !== 'undefined' && App.pronunciar) App.pronunciar(tLang); }, 400);
        }
      } else {
        btnOuvir.style.display = 'none';
      }
    }'''

assert target2 in content, 'Target 2 not found'
content = content.replace(target2, repl2)

# 3. In _gerarGramatica, set tipo: 'gramatica'
target3 = '''          perguntas.push({
            id: `gram_${livello}_${ex.pergunta.slice(0,32).replace(/\\s+/g,'_')}`,
            tipo: 'gramática','''

repl3 = '''          perguntas.push({
            id: `gram_${livello}_${ex.pergunta.slice(0,32).replace(/\\s+/g,'_')}`,
            tipo: 'gramatica','''

assert target3 in content, 'Target 3 not found'
content = content.replace(target3, repl3)

# 4. In mostrarResultado, add return to selector button
target4 = '''      acoesContainer.innerHTML = `
        <button class=\"btn-secondario\" onclick=\"App.navegar('home')\" data-i18n=\"fc_resumo_inicio\">${I18n.t('fc_resumo_inicio') || 'Início'}</button>
        ${reviewBtn}
        <button class=\"btn-primario\" onclick=\"Quiz._proximoTemploDisponivel()\" data-i18n=\"fc_resumo_proximo_templo\">${I18n.t('fc_resumo_proximo_templo') || 'Próximo Templo'}</button>
      `;
    }
    
    // Hide old button
    const btnVelho = resultado.querySelector('button[onclick=\"Quiz.voltarSelector()\"]');
    if (btnVelho) btnVelho.style.display = 'none';'''

repl4 = '''      acoesContainer.innerHTML = `
        <button class=\"btn-primario\" onclick=\"Quiz.voltarSelector()\" data-i18n=\"quiz_voltar\">${I18n.t('quiz_voltar') || '← Voltar ao Seletor'}</button>
        ${reviewBtn}
        <button class=\"btn-secondario\" onclick=\"Quiz._proximoTemploDisponivel()\" data-i18n=\"fc_resumo_proximo_templo\">${I18n.t('fc_resumo_proximo_templo') || 'Próximo Templo'}</button>
        <button class=\"btn-secondario\" onclick=\"App.navegar('home')\" data-i18n=\"fc_resumo_inicio\">${I18n.t('fc_resumo_inicio') || 'Início'}</button>
      `;
    }'''

assert target4 in content, 'Target 4 not found'
content = content.replace(target4, repl4)

# 5. History reading in renderizarSeletor
target5 = '''    let historico = [];
    try { historico = JSON.parse(localStorage.getItem('en_quiz_historico') || '[]'); } catch (_) {}'''

repl5 = '''    let historico = [];
    try { historico = JSON.parse(localStorage.getItem('en_quiz_history') || localStorage.getItem('en_quiz_historico') || '[]'); } catch (_) {}'''

assert target5 in content, 'Target 5 not found'
content = content.replace(target5, repl5)

# 6. History saving in mostrarResultado
target6 = '''      try {
        const historico = JSON.parse(localStorage.getItem('en_quiz_historico') || '[]');
        historico.unshift({
          templo: this.temploAtual,
          pontuacao: pct,
          xp_ganho: this.xpTotal,
          acertos: this.pontuacao,
          total: total,
          data: Date.now()
        });
        localStorage.setItem('en_quiz_historico', JSON.stringify(historico.slice(0, 50)));
      } catch (e) { /* ignore */ }'''

repl6 = '''      try {
        const historico = JSON.parse(localStorage.getItem('en_quiz_history') || localStorage.getItem('en_quiz_historico') || '[]');
        historico.unshift({
          templo: this.temploAtual,
          pontuacao: pct,
          xp_ganho: this.xpTotal,
          acertos: this.pontuacao,
          total: total,
          data: Date.now()
        });
        const histJson = JSON.stringify(historico.slice(0, 50));
        localStorage.setItem('en_quiz_history', histJson);
        localStorage.setItem('en_quiz_historico', histJson);
      } catch (e) { /* ignore */ }'''

assert target6 in content, 'Target 6 not found'
content = content.replace(target6, repl6)

# 7. Add window.Quiz export
if 'window.Quiz = Quiz;' not in content:
    content += '\n\nwindow.Quiz = Quiz;\n'

with open('js/quiz.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('SUCCESS: All targets updated in js/quiz.js!')
