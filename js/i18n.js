// ============================================================
// i18n.js — Sistema de Localização (Imersão Total em Italiano)
// ============================================================

const I18n = {
  idioma: 'pt',
  
  dict: {
    // ── Abas de Navegação (Bottom / Mobile) ──
    'nav_inicio': { pt: 'Início', en: 'Home' },
    'nav_dialogos': { pt: 'Diálogos', en: 'Dialogues' },
    'nav_canzoni': { pt: 'Canzoni', en: 'Songs' },
    'nav_imitacao': { pt: 'Imitação', en: 'Imitation' },
    'nav_flashcard': { pt: 'Flashcard', en: 'Flashcard' },
    'nav_quiz': { pt: 'Quiz', en: 'Quiz' },
    'nav_vocab': { pt: 'Vocab', en: 'Vocabulary' },
    'nav_gramatica': { pt: 'Gramática', en: 'Grammar' },
    'nav_storie':    { pt: 'Storie', en: 'Storie' },
    
    // ── Abas de Navegação (Top / Desktop) ──
    'top_nav_templi': { pt: 'Templi', en: 'Templi' },
    'top_nav_dialoghi': { pt: 'Dialoghi', en: 'Dialogues' },
    'top_nav_canzoni': { pt: 'Canzoni', en: 'Songs' },
    'top_nav_imitazione': { pt: 'Imitazione', en: 'Imitation' },
    'top_nav_flashcard': { pt: 'Flashcard', en: 'Flashcard' },
    'top_nav_quiz': { pt: 'Quiz', en: 'Quiz' },
    'top_nav_vocabolario': { pt: 'Vocabolario', en: 'Vocabulary' },
    'top_nav_grammatica': { pt: 'Gramática', en: 'Grammar' },
    'top_nav_storie':     { pt: 'Storie',     en: 'Stories' },

    // ── Elementos Globais ──
    'meta_do_dia': { pt: 'Meta do dia', en: 'Goal of the day' },
    'config_perfil': { pt: 'Configurações & Perfil', en: 'Settings & Profile' },
    'btn_fechar': { pt: 'Fechar', en: 'Close' },
    'btn_cancelar': { pt: 'Cancelar', en: 'Cancel' },
    'btn_salvar': { pt: 'Salvar', en: 'Save' },

    // ── Modal de Configurações ──
    'cfg_titulo': { pt: 'Configurações', en: 'Settings' },
    'cfg_idioma_app': { pt: 'Idioma do App', en: 'Lingua dell\'App' },
    'cfg_idioma_pt': { pt: 'Português (PT)', en: 'Portuguese (PT)' },
    'cfg_idioma_it': { pt: 'Italiano (IT) - Imersão', en: 'English (EN) - Immersion' },
    'cfg_tema_claro': { pt: 'Modo Claro', en: 'Light Mode' },
    'cfg_tema_escuro': { pt: 'Modo Escuro', en: 'Dark Mode' },
    'cfg_sons_ligados': { pt: 'Sons: Ligados', en: 'Sounds: On' },
    'cfg_sons_desligados': { pt: 'Sons: Desligados', en: 'Sounds: Off' },
    
    // ── Modal Meta de XP (Configurações) ──
    'meta_diaria_xp': { pt: 'Meta Diária de XP', en: 'Daily XP Goal' },
    'quantos_xp': { pt: 'Quantos XP quer ganhar por dia?', en: 'How many XP do you want to earn per day?' },

    // ── Modal Meta com Prazo ──
    'meta_minha': { pt: '🎯 Minha Meta', en: '🎯 Il Mio Obiettivo' },
    'meta_nivel': { pt: 'Quero atingir o nível:', en: 'I want to reach level:' },
    'meta_data': { pt: 'Até a data:', en: 'By date:' },
    'meta_definir': { pt: 'Definir Meta', en: 'Set Goal' },
    'meta_remover': { pt: 'Remover meta atual', en: 'Remove current goal' },
    'nivel_5': { pt: 'Nível 5 — Principiante (A1)', en: 'Livello 5 — Principiante (A1)' },
    'nivel_10': { pt: 'Nível 10 — Intermediário (A2)', en: 'Livello 10 — Intermedio (A2)' },
    'nivel_15': { pt: 'Nível 15 — Avançado (B1)', en: 'Livello 15 — Avanzato (B1)' },
    'nivel_20': { pt: 'Nível 20 — Maestro (B2)', en: 'Livello 20 — Maestro (B2)' },
    
    // ── Perfil e Gestão de Dados ──
    'prof_gestao_dati': { pt: '⚙️ Gestão de Dados', en: '⚙️ Gestione Dati' },
    'prof_backup_desc': { pt: 'O Italiano Autentico guarda seu progresso localmente no seu dispositivo. Faça backup regularmente para não perder seus dados caso limpe o histórico do navegador.', en: 'English Autentico saves your progress locally on your device. Back up regularly to avoid losing data if you clear your browser history.' },
    'prof_exp_backup': { pt: '⬇️ Exportar Backup', en: '⬇️ Esporta Backup' },
    'prof_imp_backup': { pt: '⬆️ Importar Backup', en: '⬆️ Importa Backup' },
    'prof_azzera': { pt: '⚠️ Apagar Tudo', en: '⚠️ Azzera Tutto' },
    'prof_conteudo_criado': { pt: 'Conteúdo Criado por Mim', en: 'My Custom Content' },
    'prof_exp_conteudo': { pt: '⬇️ Exportar Músicas e Diálogos', en: '⬇️ Esporta Canzoni e Dialoghi' },
    'prof_imp_conteudo': { pt: '⬆️ Importar Conteúdo', en: '⬆️ Importa Contenuto' },
    
    // ── Seção Templos ──
    'templi_titulo': { pt: 'Sua Jornada', en: 'Your Journey' },
    'templi_sub': { pt: 'Explore os templos e domine o vocabulário.', en: 'Explore the temples and master the vocabulary.' },
    'btn_continuar': { pt: 'Continuar de Onde Parou', en: 'Continue Where You Left Off' },

    // ── Feedback e Notificações (Usados no JS) ──
    'notif_salvo': { pt: 'Salvo com sucesso!', en: 'Saved successfully!' },
    'notif_erro': { pt: 'Ocorreu um erro.', en: 'Si è verificato un errore.' },
    'notif_bloqueado': { pt: 'Templo não desbloqueado.', en: 'Temple not unlocked.' },

    // ── Core / Templos ──
    'notif_templo_sbloccato': { pt: '🏛️ Templo {n} desbloqueado!', en: '🏛️ Tempio {n} sbloccato!' },
    'notif_templo_completato': { pt: '🏆 Templo {n} completado!', en: '🏆 Tempio {n} completato!' },
    'notif_codice_errato': { pt: 'Código incorreto.', en: 'Incorrect code.' },
    'notif_tutti_sbloccati': { pt: 'Todos os templos desbloqueados! 🎉', en: 'Tutti i templi sbloccati! 🎉' },
    'notif_data_futura': { pt: 'A data limite deve ser no futuro.', en: 'The deadline must be in the future.' },
    'notif_meta_definida': { pt: 'Meta: {val} XP/dia', en: 'Goal: {val} XP/day' },
    'meta_do_dia_label': { pt: '🎯 Meta do dia', en: '🎯 Obiettivo del giorno' },

    // ── Áudio ──
    'notif_sons_ativados': { pt: '🔔 Sons ativados', en: '🔔 Suoni attivati' },
    'notif_sons_desativados': { pt: '🔕 Sons desativados', en: '🔕 Suoni disattivati' },

    // ── Flashcards ──
    'notif_fc_bloqueado': { pt: 'Templo não desbloqueado ainda!', en: 'Temple not unlocked yet!' },
    'notif_fc_vocab_nao_carregado': { pt: 'Vocabulário deste templo não carregado.', en: 'Vocabulary for this temple not loaded.' },
    'notif_fc_erro_resposta': { pt: 'Erro ao registrar resposta. Tente novamente.', en: 'Errore nel registrare la risposta. Riprova.' },
    'notif_fc_favorito_add': { pt: '❤️ Adicionado aos favoritos', en: '❤️ Aggiunto ai preferiti' },
    'notif_fc_favorito_rem': { pt: '🤍 Removido dos favoritos', en: '🤍 Rimosso dai preferiti' },
    'notif_fc_sem_favoritos': { pt: 'Nenhum favorito ainda. Adicione com o ❤️!', en: 'Nessun preferito ancora. Aggiungi con il ❤️!' },
    'notif_fc_favoritos_nao_enc': { pt: 'Palavras favoritas não encontradas nos dados.', en: 'Favorite words not found in data.' },
    'notif_fc_favoritos_revisar': { pt: '❤️ {n} favoritos para revisar', en: '❤️ {n} preferiti da ripassare' },
    'notif_fc_sem_dificeis': { pt: 'Nenhuma palavra difícil encontrada! 🎉', en: 'Nessuna parola difficile trovata! 🎉' },
    'notif_fc_dificeis_revisar': { pt: '📚 {n} palavras difíceis para revisar', en: '📚 {n} parole difficili da ripassare' },
    'notif_fc_sem_voz': { pt: 'Seu browser não suporta reconhecimento de voz.', en: 'Your browser does not support voice recognition.' },
    'notif_fc_nao_ouviu': { pt: 'Não consegui ouvir. Tente novamente.', en: 'I could not hear you. Try again.' },

    // ── Gramática ──
    'notif_gram_capitolo': { pt: '🏆 Capítulo completado! +{xp} XP', en: '🏆 Capitolo completato! +{xp} XP' },

    // ── Canzoni (custom) ──
    'notif_can_titulo_obr': { pt: 'O título é obrigatório.', en: 'Il titolo è obbligatorio.' },
    'notif_can_sem_verso': { pt: 'Adicione pelo menos um verso com lacuna.', en: 'Add at least one verse with a blank.' },
    'notif_can_excluida': { pt: 'Música excluída.', en: 'Song deleted.' },

    // ── Dialoghi (custom) ──
    'notif_dial_titulo_obr': { pt: 'O título é obrigatório.', en: 'Il titolo è obbligatorio.' },
    'notif_dial_sem_turnos': { pt: 'Adicione pelo menos 2 turnos.', en: 'Add at least 2 turns.' },
    'notif_dial_excluido': { pt: 'Diálogo excluído.', en: 'Dialogue deleted.' },

    // ── Core — templates renderizados ──
    'cc_continuar_label': { pt: 'Continuar de onde parou', en: 'Continue where you left off' },
    'cc_retomar': { pt: '→ Retomar', en: '→ Riprendi' },
    'cc_ultima_sessao': { pt: 'Última sessão:', en: 'Last session:' },
    'cc_agora_mesmo': { pt: 'agora mesmo', en: 'just now' },
    'cc_ha_minutos': { pt: 'há poucos minutos', en: 'a few minutes ago' },
    'cc_ha_horas': { pt: 'há {n}h', en: '{n}h ago' },
    'cc_ha_dias': { pt: 'há {n} dia(s)', en: '{n} day(s) ago' },
    'cc_secao_inicio': { pt: 'Início', en: 'Home' },
    'cc_secao_vocab': { pt: 'Vocabulário', en: 'Vocabulary' },
    'cc_secao_gram': { pt: 'Gramática', en: 'Grammar' },
    'cc_secao_perfil': { pt: 'Perfil', en: 'Profile' },
    'meta_definir_prazo': { pt: 'Definir uma meta com prazo', en: 'Set a goal with a deadline' },
    'meta_dias_restantes': { pt: '{n} dias restantes', en: '{n} days remaining' },
    'meta_no_ritmo': { pt: 'No ritmo atual:', en: 'At current pace:' },
    'meta_xp_necessarios': { pt: 'XP/dia necessários', en: 'XP/day needed' },
    'templo_requer': { pt: 'Requer Livello {n} · Toque para inserir código', en: 'Richiede Livello {n} · Tocca per inserire il codice' },

    // ── Heatmap ──
    'hm_atividades': { pt: 'atividades em', en: 'attività in' },
    'hm_dias': { pt: 'dias', en: 'days' },
    'hm_sequencia': { pt: 'Sequência:', en: 'Streak:' },
    'hm_atividades_tooltip': { pt: 'atividades', en: 'attività' },

    // ── Progression ──
    'notif_meta_atingida': { pt: '🎯 Meta diária atingida! Ottimo!', en: '🎯 Obiettivo giornaliero raggiunto! Ottimo!' },
    'notif_meta_def_ok': { pt: '🎯 Meta definida! Boa sorte!', en: '🎯 Obiettivo impostato! Buona fortuna!' },

    // ── Quiz ──
    'notif_quiz_bloqueado': { pt: 'Tempio não desbloqueado!', en: 'Tempio non sbloccato!' },
    'notif_quiz_sem_perguntas': { pt: 'Nenhuma pergunta disponível para este tempio.', en: 'Nessuna domanda disponibile per questo tempio.' },
    'notif_quiz_sem_perguntas_todos': { pt: 'Nenhuma pergunta disponível para os templos desbloqueados.', en: 'Nessuna domanda disponibile per i templi sbloccati.' },
    'notif_quiz_morf_insuf': { pt: 'Dados de morfologia insuficientes para este tempio.', en: 'Dati morfologici insufficienti per questo tempio.' },
    'notif_quiz_conj_insuf': { pt: 'Dados de conjugação insuficientes.', en: 'Dati di coniugazione insufficienti.' },
    'notif_quiz_listen_insuf': { pt: 'Dados insuficientes para listening.', en: 'Dati insufficienti per il listening.' },
    'notif_quiz_gram_insuf': { pt: 'Dados insuficientes de gramática para este nível.', en: 'Dati grammaticali insufficienti per questo livello.' },

    // ── Profilo ──
    'notif_backup_exp': { pt: '✅ Backup exportado com sucesso!', en: '✅ Backup esportato con successo!' },
    'notif_backup_imp': { pt: '✅ Backup importado! Recarregando...', en: '✅ Backup importato! Ricaricamento...' },
    'notif_arquivo_inv': { pt: '❌ Arquivo inválido: ', en: '❌ File non valido: ' },
    'notif_prog_reset': { pt: 'Progresso resetado. Recarregando...', en: 'Progresso azzerato. Ricaricamento...' },
    'notif_conteudo_exp': { pt: '✅ Conteúdo exportado!', en: '✅ Contenuto esportato!' },

    // ── Conquistas — descrições ──
    'ach_primeiro_passo': { pt: 'Complete seu primeiro flashcard', en: 'Completa il tuo primo flashcard' },
    'ach_uma_semana': { pt: '7 dias consecutivos de estudo', en: '7 giorni consecutivi di studio' },
    'ach_studioso': { pt: 'Revisar 100 cartas nos flashcards', en: 'Ripassa 100 carte nei flashcard' },
    'ach_quiz_perfetto': { pt: '10/10 acertos em um quiz', en: '10/10 risposte corrette in un quiz' },
    'ach_primo_tempio': { pt: 'Completar o Tempio 1 nos flashcards', en: 'Completa il Tempio 1 nei flashcard' },
    'ach_vocabulario': { pt: 'Dominar 50 palavras (3+ revisões)', en: 'Padroneggia 50 parole (3+ revisioni)' },
    'ach_duro': { pt: 'Marcar "Esqueci" 50 vezes — a perseverança tem recompensa', en: 'Segna "Non ricordo" 50 volte — la perseveranza ha la sua ricompensa' },
    'ach_italiano_autentico': { pt: 'Atingir o Livello 10', en: 'Raggiungere il Livello 10' },
    'ach_um_mes': { pt: '30 dias consecutivos de estudo', en: '30 giorni consecutivi di studio' },
    'ach_maestro': { pt: 'Revisar 500 cartas nos flashcards', en: 'Ripassa 500 carte nei flashcard' },
    'ach_esploratore': { pt: 'Desbloquear 5 templos', en: 'Sblocca 5 templi' },
    'ach_grammatico': { pt: 'Completar 10 lições de gramática', en: 'Completa 10 lezioni di grammatica' },
    'ach_precisione': { pt: '5 quizzes seguidos com mais de 80% de acerto', en: '5 quiz consecutivi con più dell\'80% di risposte corrette' },
    'ach_notturno': { pt: 'Estudar após as 22h', en: 'Studiare dopo le 22:00' },
    'ach_mattiniero': { pt: 'Estudar antes das 7h da manhã', en: 'Studiare prima delle 7:00 del mattino' },

    // ── Flashcard — estado vazio ──
    'fc_todas_estudadas': { pt: 'Todas as cartas estudadas hoje.', en: 'Tutte le carte studiate oggi.' },

    // ── Flashcard — dicas no card ──
    'fc_dica_ouvir': { pt: 'Toque no card para ouvir novamente 🔊', en: 'Tocca la carta per ascoltare di nuovo 🔊' },
    'fc_dica_palavra_falta': { pt: 'Que palavra falta?', en: 'Quale parola manca?' },
    'fc_dica_revelar': { pt: 'Clique para revelar', en: 'Clicca per rivelare' },

    // ── Flashcard — resumo da sessão ──
    'fc_resumo_muito_bom': { pt: 'Muito bom!', en: 'Molto bene!' },
    'fc_resumo_continua': { pt: 'Continua a praticare!', en: 'Continua a praticare!' },
    'fc_resumo_sem_agendamento': { pt: 'Sem agendamento', en: 'Nessuna programmazione' },
    'fc_resumo_em_dias': { pt: 'em {n} dia', en: 'tra {n} giorno' },
    'fc_resumo_em_dias_plural': { pt: 'em {n} dias', en: 'tra {n} giorni' },
    'fc_resumo_em_horas': { pt: 'em {n}h', en: 'tra {n}h' },
    'fc_resumo_cartas': { pt: 'cartas', en: 'carte' },
    'fc_resumo_acertos': { pt: 'acertos', en: 'risposte corrette' },
    'fc_resumo_proxima': { pt: '⏰ Próxima revisão:', en: '⏰ Prossima revisione:' },
    'fc_resumo_novas': { pt: '🌱 {n} palavra nova aprendida!', en: '🌱 {n} parola nuova appresa!' },
    'fc_resumo_novas_plural': { pt: '🌱 {n} palavras novas aprendidas!', en: '🌱 {n} parole nuove apprese!' },
    'fc_resumo_praticar': { pt: '🔁 Praticar todas', en: '🔁 Pratica tutte' },
    'fc_gravar_parar': { pt: '⏹ Parar', en: '⏹ Ferma' },
    'fc_gravar_imitar': { pt: '🎤 Imitar', en: '🎤 Imita' },

    // ── Quiz — feedback e resultado ──
    'quiz_correto': { pt: '✅ Correto!', en: '✅ Corretto!' },
    'quiz_resposta_correta_era': { pt: '❌ A resposta correta era:', en: '❌ La risposta corretta era:' },
    'quiz_xp_ganhos': { pt: '+{n} XP ganhos', en: '+{n} XP guadagnati' },

    // ── Quiz — morfologia (gerado dinamicamente) ──
    'quiz_morf_genero_pergunta': { pt: 'Qual o gênero de "{w}"?', en: 'Qual è il genere di "{w}"?' },
    'quiz_morf_genero_masc': { pt: 'masculino', en: 'maschile' },
    'quiz_morf_genero_fem': { pt: 'feminino', en: 'femminile' },
    'quiz_morf_genero_exp': { pt: '"{w}" é {g}', en: '"{w}" è {g}' },
    'quiz_morf_plural_pergunta': { pt: 'Qual o plural de "{w}"?', en: 'Qual è il plurale di "{w}"?' },
    'quiz_morf_plural_exp': { pt: 'O plural de "{w}" é "{p}".', en: 'Il plurale di "{w}" è "{p}".' },

    // ── Imitazione ──
    'imit_erro_ouvir': { pt: 'Erro ao ouvir. Tente novamente.', en: 'Errore nell\'ascolto. Riprova.' },

    // ── Storie — leitura interativa ──
    'storie_titulo_secao':   { pt: 'Storie Italiane', en: 'Storie Italiane' },
    'storie_escolha':        { pt: 'Escolha uma história para começar a leitura', en: 'Scegli una storia per iniziare la lettura' },
    'storie_btn_traduzir':   { pt: '👁️ Ocultar tradução', en: '👁️ Nascondi traduzione' },
    'storie_btn_mostrar':    { pt: '👁️ Mostrar tradução', en: '👁️ Mostra traduzione' },
    'storie_btn_ouvir_tudo': { pt: '🔊 Ouvir tudo', en: '🔊 Ascolta tutto' },
    'storie_btn_concluir':   { pt: '✓ Concluí (+{xp} XP)', en: '✓ Ho finito (+{xp} XP)' },
    'storie_btn_relida':     { pt: '✓ Relida', en: '✓ Riletta' },
    'storie_btn_todas':      { pt: '‹ Todas as histórias', en: '‹ Tutte le storie' },
    'storie_notif_lida':     { pt: '📖 +{xp} XP por terminar a história!', en: '📖 +{xp} XP per aver finito la storia!' },
    'storie_notif_ja_lida':  { pt: 'Você já leu esta história.', en: 'Hai già letto questa storia.' },
    'storie_vocab_titulo':   { pt: '📚 Vocabulário ({n})', en: '📚 Vocabolario ({n})' },

    // ── index.html — onboarding e strings estáticas ──
    'ob_descricao': { pt: 'Este app foi desenhado para te levar do zero ao italiano falado de forma simples, natural e altamente eficaz. Cada sessão dura aproximadamente 10 minutos.', en: 'Questa app è stata progettata per portarti da zero all\'italiano parlato in modo semplice, naturale e altamente efficace. Ogni sessione dura circa 10 minuti.' },
    'ob_como_comecar': { pt: 'É muito fácil começar sua jornada:', en: 'È molto facile iniziare il tuo viaggio:' },

    // ── Flashcard — labels inline ──
    'fc_novas': { pt: 'novas', en: 'nuove' },
    'fc_revisao': { pt: 'revisão', en: 'da ripassare' },
    'fc_escolha_vocab': { pt: 'Escolha um conjunto de vocabulário para estudar', en: 'Scegli un insieme di vocabolario da studiare' },
    'fc_selecione_tempio': { pt: 'Selecione um Tempio', en: 'Seleziona un Tempio' },
    'fc_use_seletor': { pt: '↑ use o seletor acima', en: '↑ usa il selettore sopra' },
    'fc_volte_amanha': { pt: 'Volte amanhã para as próximas revisões.', en: 'Torna domani per le prossime revisioni.' },
    'fc_btn_pronunciar': { pt: '🔊 Pronunciar', en: '🔊 Pronuncia' },
    'fc_btn_imitar': { pt: '🎤 Imitar', en: '🎤 Imita' },
    'fc_btn_esqueci': { pt: '❌ Esqueci', en: '❌ Non ricordo' },
    'fc_btn_dificil': { pt: '⚡ Difícil', en: '⚡ Difficile' },
    'fc_btn_bom': { pt: '✅ Bom', en: '✅ Bene' },
    'fc_btn_facil': { pt: '⭐ Fácil', en: '⭐ Facile' },
    'fc_btn_favoritos': { pt: '❤️ Favoritos', en: '❤️ Preferiti' },
    'fc_btn_dificeis': { pt: '⚠️ Difíceis', en: '⚠️ Difficili' },
    'fc_btn_praticar_todas': { pt: '🔁 Praticar todas', en: '🔁 Pratica tutte' },

    // ── Quiz ──
    'quiz_morf_titulo': { pt: '🔤 Quiz de Morfologia (Gênero & Plural)', en: '🔤 Quiz di Morfologia (Genere & Plurale)' },
    'quiz_list_titulo': { pt: '🎧 Quiz de Listening (Ascolto)', en: '🎧 Quiz di Listening (Ascolto)' },
    'quiz_gram_titulo': { pt: '📚 Quiz de Gramática (Grammatica)', en: '📚 Quiz di Grammatica' },
    'quiz_gram_nao_carregado': { pt: 'Dados de gramática não carregados.', en: 'Grammar data not loaded.' },
    'quiz_verbi_titulo': { pt: '🇮🇹 Quiz de Conjugação Verbal', en: '🇮🇹 Quiz di Coniugazione Verbale' },
    'quiz_verbi_nao_carregado': { pt: 'Dados de conjugação não carregados.', en: 'Conjugation data not loaded.' },
    'quiz_pergunta_de': { pt: 'Pergunta {a} de {b}', en: 'Question {a} of {b}' },
    'quiz_ouvir': { pt: '🔊 Ouvir', en: '🔊 Ascolta' },
    'quiz_continuar': { pt: 'Continuar →', en: 'Continua →' },
    'quiz_voltar': { pt: '← Voltar aos Templi', en: '← Torna ai Templi' },

    // ── Vocab ──
    'vocab_dificeis': { pt: '⚠️ Difíceis', en: '⚠️ Difficili' },
    'vocab_favoritos': { pt: '❤️ Favoritos', en: '❤️ Preferiti' },
    'vocab_palavras_total': { pt: '{n} palavras no total', en: '{n} parole in totale' },
    'vocab_palavra_dificil': { pt: '{n} palavra difícil (3+ erros)', en: '{n} parola difficile (3+ errori)' },
    'vocab_palavras_dificeis': { pt: '{n} palavras difíceis (3+ erros)', en: '{n} parole difficili (3+ errori)' },
    'vocab_resultados': { pt: '{m} de {f} resultado(s) — {t} palavras totais', en: '{m} di {f} risultati — {t} parole totali' },
    'vocab_nenhuma': { pt: 'Nenhuma palavra encontrada.', en: 'Nessuna parola trovata.' },
    'vocab_ocultar_pt': { pt: '👁 Ocultar PT', en: '👁 Nascondi PT' },
    'vocab_ocultar_it': { pt: '👁 Ocultar IT', en: '👁 Nascondi IT' },

    // ── Core — streak ──
    'streak_dia': { pt: '🔥 {n} dia', en: '🔥 {n} giorno' },
    'streak_dias': { pt: '🔥 {n} dias', en: '🔥 {n} giorni' },

    // ── Grammar — feedback ──
    'gram_conteudo_indisponivel': { pt: 'Conteúdo não disponível.', en: 'Contenuto non disponibile.' },
    'gram_placeholder_resposta': { pt: 'Digite sua resposta...', en: 'Scrivi la tua risposta...' },
    'gram_por_que': { pt: 'Por que?', en: 'Perché?' },
    'gram_correto': { pt: 'Correto!', en: 'Corretto!' },
    'gram_errado': { pt: 'Errado.', en: 'Sbagliato.' },
    'gram_resposta_era': { pt: 'A resposta era:', en: 'La risposta era:' },
    'gram_por_que_importa': { pt: 'Por que isso importa?', en: 'Perché è importante?' },
    'gram_arm_errado': { pt: 'Errado', en: 'Sbagliato' },
    'gram_arm_certo': { pt: 'Certo', en: 'Corretto' },

    // ── Quiz — gramática ──
    'quiz_gram_nivel': { pt: '📚 Nível {n}', en: '📚 Livello {n}' },

    // ── Vocab — overflow ──
    'vocab_e_mais': { pt: '... e mais {n} palavras. Use os filtros para refinar.', en: '... e altre {n} parole. Usa i filtri per affinare.' },

    // ── Imitazione — resultados ──
    'imit_voce_disse': { pt: 'Você disse:', en: 'Hai detto:' },
    'imit_ouvimos': { pt: 'Ouvimos:', en: 'Abbiamo sentito:' },
    'imit_proxima_frase': { pt: 'Próxima Frase', en: 'Frase Successiva' },
    'imit_tentar_novamente': { pt: 'Tentar Novamente', en: 'Riprova' },
    'imit_pronunciar_melhor': { pt: 'Tente pronunciar mais claramente.', en: 'Prova a pronunciare più chiaramente.' },
    'imit_ouvir_exemplo': { pt: 'Ouça o exemplo e tente de novo.', en: 'Ascolta l\'esempio e riprova.' },

    // ── Canzoni — resultado ──
    'can_corretas': { pt: '{a}/{b} corretas', en: '{a}/{b} corrette' },
    'can_repetir': { pt: '🔄 Repetir', en: '🔄 Ripeti' },
    'can_outras_musicas': { pt: '‹ Outras músicas', en: '‹ Altre canzoni' },
    'can_salva': { pt: '🎵 "{t}" salva!', en: '🎵 "{t}" salvata!' },

    // ── Dialoghi — resultado ──
    'dial_concluido': { pt: 'Diálogo Concluído', en: 'Dialogo Completato' },
    'dial_acertos': { pt: 'Acertos: {a} / {b}', en: 'Risposte corrette: {a} / {b}' },
    'dial_vocab_chave': { pt: 'Vocabulário Chave:', en: 'Vocabolario Chiave:' },
    'dial_voltar': { pt: '‹ Voltar', en: '‹ Torna' },
    'dial_salvo': { pt: '💬 "{t}" salvo!', en: '💬 "{t}" salvato!' },

    // ── Onboarding slide 2 ──
    'ob_vocabulario': { pt: 'Vocabulário:', en: 'Vocabolario:' },
    'ob_gramatica': { pt: 'Gramática:', en: 'Grammatica:' },

    // ── Dialoghi ──
    'dial_praticar_novamente': { pt: 'Praticar Novamente 🔄', en: 'Pratica di nuovo 🔄' },
    'dial_excluir_confirm': { pt: 'Excluir "{t}"?', en: 'Eliminare "{t}"?' },

    // ── Canzoni ──
    'can_excluir_confirm': { pt: 'Excluir "{t}"?', en: 'Eliminare "{t}"?' },

    // ── Perfil — confirms destrutivos ──
    'prof_confirm_importar': { pt: 'Isso vai substituir todo o seu progresso atual. Confirmar?', en: 'Questo sostituirà tutti i tuoi progressi attuali. Confermi?' },
    'prof_confirm_apagar1': { pt: '⚠️ Isso apagará TODO o seu progresso — XP, flashcards, conquistas e streak. Tem certeza?', en: '⚠️ Questo cancellerà TUTTI i tuoi progressi — XP, flashcard, traguardi e sequenza. Sei sicuro?' },
    'prof_confirm_apagar2': { pt: 'Esta ação é IRREVERSÍVEL. Deseja mesmo começar do zero?', en: 'Questa azione è IRREVERSIBILE. Vuoi davvero ricominciare da zero?' },
    'prof_confirm_import_content': { pt: 'Importar {c} músicas e {d} diálogos? O conteúdo existente será mantido e mesclado.', en: 'Importare {c} canzoni e {d} dialoghi? Il contenuto esistente sarà mantenuto e unito.' },
    'prof_erro_formato': { pt: 'Formato inválido', en: 'Formato non valido' },

    // ── Quiz — initial label ──
    'quiz_pergunta_inicial': { pt: 'Pergunta 1 de 10', en: 'Domanda 1 di 10' },

    // ── index.html — section titles ──
    'sec_dialoghi': { pt: 'Modo Diálogo', en: 'Modo Dialogo' },

    // ── Grammar — NMA layer labels ──
    'gram_fase2_label': { pt: '🔎 Fase 2: Observe e Descubra', en: '🔎 Fase 2: Osserva e Scopri' },
    'gram_fase2_sub':   { pt: 'Clique nos cards abaixo para descobrir as regras e padrões de forma prática!', en: 'Click the cards to discover rules and patterns in a practical way!' },
    'gram_fase3_label': { pt: '📋 Fase 3: Tabela de Referência Rápida', en: '📋 Fase 3: Tabella di Riferimento Rapido' },
    'gram_fase4_label': { pt: '🗣️ Fase 4: Analise os Exemplos', en: '🗣️ Fase 4: Analizza gli Esempi' },
    'gram_fase4_sub':   { pt: 'Clique nos exemplos abaixo para exercitar seu raciocínio antes de ver a resposta!', en: 'Click the examples to practice reasoning before seeing the answer!' },
    'gram_fase4_prc_pergunta': { pt: 'Pergunta', en: 'Question' },
    'gram_fase4_prc_resposta': { pt: 'Resposta', en: 'Answer' },
    'gram_fase4_prc_conclusao': { pt: 'Conclusão', en: 'Conclusion' },
    'gram_fase4_ver_detalhes': { pt: 'Ver detalhes ▾', en: 'Vedi dettagli ▾' },
    'gram_fase5_label': { pt: '⚠️ Fase 5: Evite Armadilhas Comuns', en: '⚠️ Fase 5: Evita le Trappole Comuni' },
    'gram_fase5_sub':   { pt: 'Erros comuns cometidos por estudantes de português e como evitá-los:', en: 'Common mistakes made by students and how to avoid them:' },
    'gram_fase5_porque': { pt: 'Porquê?', en: 'Perché?' },
    'gram_inventario_label': { pt: '✅ O que você vai aprender', en: '✅ Cosa imparerai' },
    'gram_definicao_label': { pt: '🔍 Observe e entenda', en: '🔍 Osserva e capisci' },
    'gram_def_veja':    { pt: 'Veja', en: 'See' },
    'gram_def_pense':   { pt: 'Pense', en: 'Think' },
    'gram_def_entenda': { pt: 'Entenda', en: 'Understand' },
    'gram_tecnica_label': { pt: '📌 Como usar na prática', en: '📌 Come usarlo in pratica' },
    'gram_exemplos_prc_label': { pt: '🗣️ Veja os exemplos (clique 🔊 para ouvir)', en: '🗣️ Vedi gli esempi (clicca 🔊 per ascoltare)' },
    'gram_ponte_label': { pt: '🇧🇷 Em português é assim… em italiano é assim:', en: '🇧🇷 In portoghese è così… in italiano è così:' },

    // ── Tooltips — flashcard buttons ──
    'title_reverso':   { pt: 'Reverso: PT→IT', en: 'Inverso: PT→IT' },
    'title_contexto':  { pt: 'Contexto: frase com lacuna', en: 'Context: sentence with blank' },
    'title_escuta':    { pt: 'Escuta: adivinhe pelo áudio', en: 'Ascolto: indovina dall\'audio' },
    'title_dica':      { pt: 'Ver dica (nível 1)', en: 'Show hint (level 1)' },
    'title_favorito':  { pt: 'Adicionar/remover favorito', en: 'Add/remove from favorites' },
    'title_blur_pt':   { pt: 'Oculta a coluna em português para testar sua memória', en: 'Hides the Portuguese column to test your memory' },
    'title_blur_it':   { pt: 'Oculta a coluna em italiano para testar sua memória', en: 'Hides the English column to test your memory' },

    // ── Onboarding slide 3 ──
    'ob_slide3_li1': { pt: 'Acesse a aba <strong>TEMPLOS</strong>', en: 'Go to the <strong>TEMPLES</strong> tab' },
    'ob_slide3_li2': { pt: 'Escolha o <strong>1º Templo (Roma - Le Fondamenta)</strong>', en: 'Scegli il <strong>1° Tempio (Roma - Le Fondamenta)</strong>' },
    'ob_slide3_li3': { pt: 'Estude usando os <strong>FLASHCARDS</strong>', en: 'Study with <strong>FLASHCARDS</strong>' },
    'ob_slide3_li4': { pt: 'Pratique o que aprendeu respondendo aos <strong>QUIZZES</strong>!', en: 'Test yourself with <strong>QUIZZES</strong>!' },

    // ── Dialoghi / Canzoni — botões de criação ──
    'dial_btn_adicionar': { pt: '➕ Adicionar Diálogo', en: '➕ Aggiungi Dialogo' },
    'can_btn_adicionar':  { pt: '➕ Adicionar Música',  it: '➕ Aggiungi Canzone' },

    // ── Imitazione — botão ouvir ──
    'imit_btn_ouvir_exemplo': { pt: '🔊 Ouvir Exemplo', en: '🔊 Ascolta l\'Esempio' },

    // ── Tour ──
    'tour_templi_title': { pt: '🏛️ Templi (Sua Jornada)', en: '🏛️ Templi (Il Tuo Viaggio)' },
    'tour_templi_desc': { pt: 'Aqui é o coração do seu aprendizado. Desbloqueie novos templos e alcance sua meta diária de experiência.', en: 'Questo è il cuore del tuo apprendimento. Sblocca nuovi templi e raggiungi il tuo obiettivo quotidiano di esperienza.' },
    'tour_dialoghi_title': { pt: '💬 Dialoghi', en: '💬 Dialoghi' },
    'tour_dialoghi_desc': { pt: 'Leia e escute diálogos reais para pegar o ritmo, contexto e melhorar sua compreensão auditiva.', en: 'Read and listen to real dialogues to get the rhythm, context and improve your listening comprehension.' },
    'tour_canzoni_title': { pt: '🎵 Canzoni', en: '🎵 Canzoni' },
    'tour_canzoni_desc': { pt: 'Aprenda vocabulário se divertindo com os clássicos da música italiana.', en: 'Learn vocabulary while enjoying popular American songs.' },
    'tour_imitazione_title': { pt: '🎙️ Imitazione', en: '🎙️ Imitazione' },
    'tour_imitazione_desc': { pt: 'Escute um nativo falando e grave sua própria voz. O segredo para uma dicção autêntica.', en: 'Listen to a native speaker and record your own voice. The secret to authentic pronunciation.' },
    'tour_flashcard_title': { pt: '🧠 Flashcard', en: '🧠 Flashcard' },
    'tour_flashcard_desc': { pt: 'Revise o vocabulário no momento exato em que estiver prestes a esquecer, usando nosso algoritmo espaçado.', en: 'Review vocabulary at the exact moment you are about to forget, using our spaced repetition algorithm.' },
    'tour_quiz_title': { pt: '📝 Quiz', en: '📝 Quiz' },
    'tour_quiz_desc': { pt: 'Teste seus conhecimentos em baterias de exercícios rápidos e conquiste moedas.', en: 'Test your knowledge with batches of quick exercises and earn XP.' },
    'tour_grammatica_title': { pt: '📚 Grammatica', en: '📚 Grammatica' },
    'tour_grammatica_desc': { pt: 'Dúvidas estruturais? Consulte rapidamente todas as regras de gramática aqui.', en: 'Structural doubts? Quickly consult all grammar rules here.' },
    'tour_vocabolario_title': { pt: '📖 Vocabolario', en: '📖 Vocabolario' },
    'tour_vocabolario_desc': { pt: 'Seu glossário mestre. Pesquise por qualquer palavra aprendida até o momento.', en: 'Your master glossary. Search for any word learned so far.' },
    'tour_config_title': { pt: '⚙️ Configurações & Perfil', en: '⚙️ Impostazioni & Profilo' },
    'tour_config_desc': { pt: 'Mude para o modo escuro, silencie os sons e acesse as opções de Perfil no topo da tela.', en: 'Passa alla modalità scura, silenzia i suoni e accedi alle opzioni del Profilo in cima allo schermo.' }
  },

  inicializar() {
    this.idioma = localStorage.getItem('en_idioma') || 'pt';
    this.traduzirDOM();
  },

  mudarIdioma(lang) {
    if (lang !== 'pt' && lang !== 'en') return;
    document.body.classList.add('lang-switching');       // fade out
    setTimeout(() => {
      this.idioma = lang;
      localStorage.setItem('en_idioma', lang);
      this.traduzirDOM();
      document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang } }));
      // Força recarregamento dos dados de gramática na próxima visita à aba
      if (typeof Grammatica !== 'undefined') Grammatica.dados = null;
      document.body.classList.remove('lang-switching'); // fade in
      if (typeof App !== 'undefined') {
        if (lang === 'en') {
          const primeiraVez = !localStorage.getItem('en_imersao_usada');
          if (primeiraVez) {
            localStorage.setItem('en_imersao_usada', '1');
            App.notificar('Welcome! You are now in Immersion Mode 🇺🇸', 'alerta');
          } else {
            App.notificar('Language changed to English!', 'sucesso');
          }
        } else {
          App.notificar('Idioma alterado para Português!', 'sucesso');
        }
      }
    }, 180);
  },

  toggleIdioma() {
    this.mudarIdioma(this.idioma === 'pt' ? 'en' : 'pt');
  },

  // Retorna a string traduzida baseada na chave
  t(chave) {
    if (!this.dict[chave]) return chave; // Retorna a chave se não existir tradução
    return this.dict[chave][this.idioma] || this.dict[chave]['pt'];
  },

  // Busca todos os elementos com data-i18n e substitui o innerText (ou HTML mantendo ícones)
  traduzirDOM() {
    // Traduz textContent / value
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const chave = el.getAttribute('data-i18n');
      if (!this.dict[chave]) return;
      const texto = this.dict[chave][this.idioma] || this.dict[chave]['pt'];
      if (el.tagName.toLowerCase() === 'input' && el.type === 'button') {
        el.value = texto;
      } else if (el.tagName.toLowerCase() === 'button' && el.querySelector('span')) {
        el.querySelector('span').textContent = texto;
      } else {
        el.textContent = texto;
      }
    });

    // Traduz atributo title (data-i18n-title)
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const chave = el.getAttribute('data-i18n-title');
      if (this.dict[chave]) el.title = this.dict[chave][this.idioma] || this.dict[chave]['pt'];
    });

    // Onboarding slide 3 — contém HTML (negrito), usa innerHTML
    ['onb-li1','onb-li2','onb-li3','onb-li4'].forEach((id, i) => {
      const el = document.getElementById(id);
      const key = `ob_slide3_li${i+1}`;
      if (el && this.dict[key]) el.innerHTML = this.dict[key][this.idioma] || this.dict[key]['pt'];
    });

    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      const ptSeg = document.getElementById('lang-pill-pt');
      const enSeg = document.getElementById('lang-pill-it');
      if (ptSeg) ptSeg.classList.toggle('ativo', this.idioma === 'pt');
      if (enSeg) enSeg.classList.toggle('ativo', this.idioma === 'en');
      langBtn.title = this.idioma === 'pt' ? 'Switch to English' : 'Mudar para Português';
    }
  }
};



