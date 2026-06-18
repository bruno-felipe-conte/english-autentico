// ============================================================
// i18n.js — Localization System (Total Immersion in English)
// ============================================================

const I18n = {
  idioma: 'en',
  
  dict: {
    // ── Abas de Navegação (Bottom / Mobile) ──
    'nav_inicio': { pt: 'Temples', en: 'Temples' },
    'nav_dialogos': { pt: 'Dialogues', en: 'Dialogues' },
    'nav_canzoni': { pt: 'Songs', en: 'Songs' },
    'nav_imitacao': { pt: 'Listen', en: 'Listen' },
    'nav_flashcard': { pt: 'Flashcards', en: 'Flashcards' },
    'nav_quiz': { pt: 'Quiz', en: 'Quiz' },
    'nav_vocab': { pt: 'Vocab', en: 'Vocab' },
    'nav_gramatica': { pt: 'Grammar', en: 'Grammar' },
    'nav_storie':    { pt: 'Reading', en: 'Reading' },

    // ── Abas de Navegação (Top / Desktop) ──
    'top_nav_templi': { pt: 'Temples', en: 'Temples' },
    'top_nav_dialoghi': { pt: 'Dialogues', en: 'Dialogues' },
    'top_nav_canzoni': { pt: 'Songs', en: 'Songs' },
    'top_nav_imitazione': { pt: 'Listen & Repeat', en: 'Listen & Repeat' },
    'top_nav_flashcard': { pt: 'Flashcards', en: 'Flashcards' },
    'top_nav_quiz': { pt: 'Quiz', en: 'Quiz' },
    'top_nav_vocabolario': { pt: 'Vocabulary', en: 'Vocabulary' },
    'top_nav_grammatica': { pt: 'Grammar', en: 'Grammar' },
    'top_nav_storie':     { pt: 'Reading',  en: 'Reading' },

    // ── Elementos Globais ──
    'meta_do_dia': { pt: 'Daily Goal', en: 'Daily Goal' },
    'config_perfil': { pt: 'Configurações & Perfil', en: 'Settings & Profile' },
    'btn_fechar': { pt: 'Fechar', en: 'Close' },
    'btn_cancelar': { pt: 'Cancelar', en: 'Cancel' },
    'btn_salvar': { pt: 'Salvar', en: 'Save' },

    // ── Modal de Configurações ──
    'cfg_titulo': { pt: 'Configurações', en: 'Settings' },
    'cfg_idioma_app': { pt: 'Idioma do App', en: 'App Language' },
    'cfg_idioma_pt': { pt: 'Português (PT)', en: 'Portuguese (PT)' },
    'cfg_idioma_it': { pt: 'English (EN) - Immersion', en: 'English (EN) - Immersion' },
    'cfg_tema_claro': { pt: 'Modo Claro', en: 'Light Mode' },
    'cfg_tema_escuro': { pt: 'Modo Escuro', en: 'Dark Mode' },
    'cfg_sons_ligados': { pt: 'Sons: Ligados', en: 'Sounds: On' },
    'cfg_sons_desligados': { pt: 'Sons: Desligados', en: 'Sounds: Off' },
    
    // ── Modal Meta de XP (Configurações) ──
    'meta_diaria_xp': { pt: 'Meta Diária de XP', en: 'Daily XP Goal' },
    'quantos_xp': { pt: 'Quantos XP quer ganhar por dia?', en: 'How many XP do you want to earn per day?' },

    // ── Modal Meta com Prazo ──
    'meta_minha': { pt: '🎯 Minha Meta', en: '🎯 My Goal' },
    'meta_nivel': { pt: 'Quero atingir o nível:', en: 'I want to reach level:' },
    'meta_data': { pt: 'Até a data:', en: 'By date:' },
    'meta_definir': { pt: 'Definir Meta', en: 'Set Goal' },
    'meta_remover': { pt: 'Remover meta atual', en: 'Remove current goal' },
    'nivel_5': { pt: 'Nível 5 — Principiante (A1)', en: 'Level 5 — Beginner (A1)' },
    'nivel_10': { pt: 'Nível 10 — Intermediário (A2)', en: 'Level 10 — Elementary (A2)' },
    'nivel_15': { pt: 'Nível 15 — Avançado (B1)', en: 'Level 15 — Intermediate (B1)' },
    'nivel_20': { pt: 'Nível 20 — Maestro (B2)', en: 'Level 20 — Advanced (B2)' },
    
    // ── Perfil e Gestão de Dados ──
    'prof_gestao_dati': { pt: '⚙️ Gestão de Dados', en: '⚙️ Data Management' },
    'prof_backup_desc': { pt: 'O English Autentico guarda seu progresso apenas neste navegador. Exporte regularmente para não perder caso limpe o cache.', en: 'English Autentico saves your progress only in this browser. Export regularly to avoid losing it if you clear the cache.' },
    'prof_audio_speed': { pt: 'Velocidade do Áudio', en: 'Audio Speed' },
    'prof_test_audio': { pt: '🔊 Testar Áudio', en: '🔊 Test Audio' },
    'prof_exp_backup': { pt: '⬇️ Exportar Backup', en: '⬇️ Export Backup' },
    'prof_imp_backup': { pt: '⬆️ Importar Backup', en: '⬆️ Import Backup' },
    'prof_azzera': { pt: '⚠️ Apagar Tudo', en: '⚠️ Delete All' },
    'prof_conteudo_criado': { pt: 'Conteúdo Criado por Mim', en: 'My Custom Content' },
    'prof_exp_conteudo': { pt: '⬇️ Exportar Músicas e Diálogos', en: '⬇️ Export Content' },
    'prof_imp_conteudo': { pt: '⬆️ Importar Conteúdo', en: '⬆️ Import Content' },
    
    // ── Seção Templos ──
    'templi_titulo': { pt: 'Sua Jornada', en: 'Your Journey' },
    'templi_sub': { pt: 'Explore os templos e domine o vocabulário.', en: 'Explore the temples and master the vocabulary.' },
    'btn_continuar': { pt: 'Continuar de Onde Parou', en: 'Continue Where You Left Off' },

    // ── Feedback e Notificações (Usados no JS) ──
    'notif_salvo': { pt: 'Salvo com sucesso!', en: 'Saved successfully!' },
    'notif_erro': { pt: 'An error occurred.', en: 'An error occurred.' },
    'notif_bloqueado': { pt: 'Temple not unlocked.', en: 'Temple not unlocked.' },

    // ── Core / Temples ──
    'notif_templo_sbloccato': { pt: '🏛️ Temple {n} unlocked!', en: '🏛️ Temple {n} unlocked!' },
    'notif_templo_completato': { pt: '🏆 Temple {n} completed!', en: '🏆 Temple {n} completed!' },
    'notif_codice_errato': { pt: 'Incorrect code.', en: 'Incorrect code.' },
    'notif_tutti_sbloccati': { pt: 'All temples unlocked! 🎉', en: 'All temples unlocked! 🎉' },
    'notif_data_futura': { pt: 'The deadline must be in the future.', en: 'The deadline must be in the future.' },
    'notif_meta_definida': { pt: 'Goal: {val} XP/day', en: 'Goal: {val} XP/day' },
    'meta_do_dia_label': { pt: '🎯 Daily Goal', en: '🎯 Daily Goal' },

    // ── Áudio ──
    'notif_sons_ativados': { pt: '🔔 Sound on', en: '🔔 Sound on' },
    'notif_sons_desativados': { pt: '🔕 Sound off', en: '🔕 Sound off' },

    // ── Flashcards ──
    'notif_fc_bloqueado': { pt: 'Templo não desbloqueado ainda!', en: 'Temple not unlocked yet!' },
    'notif_fc_vocab_nao_carregado': { pt: 'Vocabulário deste templo não carregado.', en: 'Vocabulary for this temple not loaded.' },
    'notif_fc_erro_resposta': { pt: 'Error saving response. Try again.', en: 'Error saving response. Try again.' },
    'notif_fc_favorito_add': { pt: '❤️ Added to favorites', en: '❤️ Added to favorites' },
    'notif_fc_favorito_rem': { pt: '🤍 Removed from favorites', en: '🤍 Removed from favorites' },
    'notif_fc_sem_favoritos': { pt: 'No favorites yet. Add with ❤️!', en: 'No favorites yet. Add with ❤️!' },
    'notif_fc_favoritos_nao_enc': { pt: 'Favorite words not found in data.', en: 'Favorite words not found in data.' },
    'notif_fc_favoritos_revisar': { pt: '❤️ {n} favorites to review', en: '❤️ {n} favorites to review' },
    'notif_fc_sem_dificeis': { pt: 'No difficult words found! 🎉', en: 'No difficult words found! 🎉' },
    'notif_fc_dificeis_revisar': { pt: '📚 {n} difficult words to review', en: '📚 {n} difficult words to review' },
    'notif_fc_sem_voz': { pt: 'Seu browser não suporta reconhecimento de voz.', en: 'Your browser does not support voice recognition.' },
    'notif_fc_nao_ouviu': { pt: 'Não consegui ouvir. Tente novamente.', en: 'I could not hear you. Try again.' },

    // ── Gramática ──
    'notif_gram_capitolo': { pt: '🏆 Chapter completed! +{xp} XP', en: '🏆 Chapter completed! +{xp} XP' },

    // ── Songs (custom) ──
    'notif_can_titulo_obr': { pt: 'Title is required.', en: 'Title is required.' },
    'notif_can_sem_verso': { pt: 'Add at least one verse with a blank.', en: 'Add at least one verse with a blank.' },
    'notif_can_excluida': { pt: 'Song deleted.', en: 'Song deleted.' },

    // ── Dialogues (custom) ──
    'notif_dial_titulo_obr': { pt: 'Title is required.', en: 'Title is required.' },
    'notif_dial_sem_turnos': { pt: 'Add at least 2 turns.', en: 'Add at least 2 turns.' },
    'notif_dial_excluido': { pt: 'Dialogue deleted.', en: 'Dialogue deleted.' },

    // ── Core — templates renderizados ──
    'cc_continuar_label': { pt: 'Continuar de onde parou', en: 'Continue where you left off' },
    'cc_retomar': { pt: '→ Resume', en: '→ Resume' },
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
    'templo_requer': { pt: 'Requires Level {n} · Tap to enter code', en: 'Requires Level {n} · Tap to enter code' },

    // ── Heatmap ──
    'hm_atividades': { pt: 'activities in', en: 'activities in' },
    'hm_dias': { pt: 'days', en: 'days' },
    'hm_sequencia': { pt: 'Streak:', en: 'Streak:' },
    'hm_atividades_tooltip': { pt: 'activities', en: 'activities' },

    // ── Progression ──
    'notif_meta_atingida': { pt: '🎯 Daily goal reached! Well done!', en: '🎯 Daily goal reached! Well done!' },
    'notif_meta_def_ok': { pt: '🎯 Goal set! Good luck!', en: '🎯 Goal set! Good luck!' },

    // ── Quiz ──
    'notif_quiz_bloqueado': { pt: 'Temple not unlocked!', en: 'Temple not unlocked!' },
    'notif_quiz_sem_perguntas': { pt: 'No questions available for this temple.', en: 'No questions available for this temple.' },
    'notif_quiz_sem_perguntas_todos': { pt: 'No questions available for the unlocked temples.', en: 'No questions available for the unlocked temples.' },
    'notif_quiz_morf_insuf': { pt: 'Insufficient morphology data for this temple.', en: 'Insufficient morphology data for this temple.' },
    'notif_quiz_conj_insuf': { pt: 'Insufficient conjugation data.', en: 'Insufficient conjugation data.' },
    'notif_quiz_listen_insuf': { pt: 'Insufficient listening data.', en: 'Insufficient listening data.' },
    'notif_quiz_gram_insuf': { pt: 'Insufficient grammar data for this level.', en: 'Insufficient grammar data for this level.' },

    // ── Profilo ──
    'notif_backup_exp': { pt: '✅ Backup exported successfully!', en: '✅ Backup exported successfully!' },
    'notif_backup_imp': { pt: '✅ Backup imported! Reloading...', en: '✅ Backup imported! Reloading...' },
    'notif_arquivo_inv': { pt: '❌ Invalid file: ', en: '❌ Invalid file: ' },
    'notif_prog_reset': { pt: 'Progress reset. Reloading...', en: 'Progress reset. Reloading...' },
    'notif_conteudo_exp': { pt: '✅ Content exported!', en: '✅ Content exported!' },

    // ── Achievements ──
    'ach_primeiro_passo': { pt: 'Complete your first flashcard', en: 'Complete your first flashcard' },
    'ach_uma_semana': { pt: '7 consecutive days of study', en: '7 consecutive days of study' },
    'ach_studioso': { pt: 'Review 100 flashcards', en: 'Review 100 flashcards' },
    'ach_quiz_perfetto': { pt: '10/10 correct answers in a quiz', en: '10/10 correct answers in a quiz' },
    'ach_primo_tempio': { pt: 'Complete Temple 1 flashcards', en: 'Complete Temple 1 flashcards' },
    'ach_vocabulario': { pt: 'Master 50 words (3+ reviews)', en: 'Master 50 words (3+ reviews)' },
    'ach_duro': { pt: 'Mark "Again" 50 times — persistence pays off', en: 'Mark "Again" 50 times — persistence pays off' },
    'ach_english_autentico': { pt: 'Reach Level 10', en: 'Reach Level 10' },
    'ach_um_mes': { pt: '30 consecutive days of study', en: '30 consecutive days of study' },
    'ach_maestro': { pt: 'Review 500 flashcards', en: 'Review 500 flashcards' },
    'ach_esploratore': { pt: 'Unlock 5 temples', en: 'Unlock 5 temples' },
    'ach_grammatico': { pt: 'Complete 10 grammar lessons', en: 'Complete 10 grammar lessons' },
    'ach_precisione': { pt: '5 quizzes in a row with over 80% correct', en: '5 quizzes in a row with over 80% correct' },
    'ach_notturno': { pt: 'Study after 10 PM', en: 'Study after 10 PM' },
    'ach_mattiniero': { pt: 'Study before 7 AM', en: 'Study before 7 AM' },

    // ── Flashcard — empty state ──
    'fc_todas_estudadas': { pt: 'All cards studied today.', en: 'All cards studied today.' },

    // ── Flashcard — card hints ──
    'fc_dica_ouvir': { pt: 'Tap the card to listen again 🔊', en: 'Tap the card to listen again 🔊' },
    'fc_dica_palavra_falta': { pt: 'Which word is missing?', en: 'Which word is missing?' },
    'fc_dica_revelar': { pt: 'Click to reveal', en: 'Click to reveal' },

    // ── Flashcard — session summary ──
    'fc_resumo_muito_bom': { pt: 'Great job!', en: 'Great job!' },
    'fc_resumo_continua': { pt: 'Keep practising!', en: 'Keep practising!' },
    'fc_resumo_sem_agendamento': { pt: 'No schedule', en: 'No schedule' },
    'fc_resumo_em_dias': { pt: 'in {n} day', en: 'in {n} day' },
    'fc_resumo_em_dias_plural': { pt: 'in {n} days', en: 'in {n} days' },
    'fc_resumo_em_horas': { pt: 'in {n}h', en: 'in {n}h' },
    'fc_resumo_cartas': { pt: 'cards', en: 'cards' },
    'fc_resumo_acertos': { pt: 'correct', en: 'correct' },
    'fc_resumo_proxima': { pt: '⏰ Next review:', en: '⏰ Next review:' },
    'fc_resumo_novas': { pt: '🌱 {n} new word learned!', en: '🌱 {n} new word learned!' },
    'fc_resumo_novas_plural': { pt: '🌱 {n} new words learned!', en: '🌱 {n} new words learned!' },
    'fc_resumo_praticar': { pt: '🔁 Practice all', en: '🔁 Practice all' },
    'fc_gravar_parar': { pt: '⏹ Stop', en: '⏹ Stop' },
    'fc_gravar_imitar': { pt: '🎤 Imitate', en: '🎤 Imitate' },

    // ── Quiz — feedback and results ──
    'quiz_correto': { pt: '✅ Correct!', en: '✅ Correct!' },
    'quiz_resposta_correta_era': { pt: '❌ The correct answer was:', en: '❌ The correct answer was:' },
    'quiz_xp_ganhos': { pt: '+{n} XP earned', en: '+{n} XP earned' },

    // ── Quiz — morphology ──
    'quiz_morf_genero_pergunta': { pt: 'What is the gender of "{w}"?', en: 'What is the gender of "{w}"?' },
    'quiz_morf_genero_masc': { pt: 'masculine', en: 'masculine' },
    'quiz_morf_genero_fem': { pt: 'feminine', en: 'feminine' },
    'quiz_morf_genero_exp': { pt: '"{w}" is {g}', en: '"{w}" is {g}' },
    'quiz_morf_plural_pergunta': { pt: 'What is the plural of "{w}"?', en: 'What is the plural of "{w}"?' },
    'quiz_morf_plural_exp': { pt: 'The plural of "{w}" is "{p}".', en: 'The plural of "{w}" is "{p}".' },

    // ── Listen & Repeat ──
    'imit_erro_ouvir': { pt: 'Error listening. Try again.', en: 'Error listening. Try again.' },

    // ── Reading — interactive reading ──
    'storie_titulo_secao':   { pt: 'Leitura em Inglês', en: 'English Reading' },
    'storie_escolha':        { pt: 'Choose a story to start reading', en: 'Choose a story to start reading' },
    'storie_btn_traduzir':   { pt: '👁️ Hide translation', en: '👁️ Hide translation' },
    'storie_btn_mostrar':    { pt: '👁️ Show translation', en: '👁️ Show translation' },
    'storie_btn_ouvir_tudo': { pt: '🔊 Listen to all', en: '🔊 Listen to all' },
    'storie_btn_concluir':   { pt: '✓ Finished (+{xp} XP)', en: '✓ Finished (+{xp} XP)' },
    'storie_btn_relida':     { pt: '✓ Re-read', en: '✓ Re-read' },
    'storie_btn_todas':      { pt: '‹ All stories', en: '‹ All stories' },
    'storie_notif_lida':     { pt: '📖 +{xp} XP for finishing the story!', en: '📖 +{xp} XP for finishing the story!' },
    'storie_notif_ja_lida':  { pt: 'You have already read this story.', en: 'You have already read this story.' },
    'storie_vocab_titulo':   { pt: '📚 Vocabulary ({n})', en: '📚 Vocabulary ({n})' },

    // ── Onboarding ──
    'ob_descricao': { pt: 'This app is designed to take you from zero to spoken English in a simple, natural and highly effective way. Each session lasts about 10 minutes.', en: 'This app is designed to take you from zero to spoken English in a simple, natural and highly effective way. Each session lasts about 10 minutes.' },
    'ob_como_comecar': { pt: 'It is very easy to start your journey:', en: 'It is very easy to start your journey:' },

    // ── Flashcard — inline labels ──
    'fc_novas': { pt: 'new', en: 'new' },
    'fc_revisao': { pt: 'to review', en: 'to review' },
    'fc_escolha_vocab': { pt: 'Choose a vocabulary set to study', en: 'Choose a vocabulary set to study' },
    'fc_selecione_tempio': { pt: 'Select a Temple', en: 'Select a Temple' },
    'fc_use_seletor': { pt: '↑ use the selector above', en: '↑ use the selector above' },
    'fc_volte_amanha': { pt: 'Come back tomorrow for your next reviews.', en: 'Come back tomorrow for your next reviews.' },
    'fc_btn_pronunciar': { pt: '🔊 Pronounce', en: '🔊 Pronounce' },
    'fc_btn_imitar': { pt: '🎤 Imitate', en: '🎤 Imitate' },
    'fc_btn_esqueci': { pt: '❌ Again', en: '❌ Again' },
    'fc_btn_dificil': { pt: '⚡ Hard', en: '⚡ Hard' },
    'fc_btn_bom': { pt: '✅ Good', en: '✅ Good' },
    'fc_btn_facil': { pt: '⭐ Easy', en: '⭐ Easy' },
    'fc_btn_favoritos': { pt: '❤️ Favorites', en: '❤️ Favorites' },
    'fc_btn_dificeis': { pt: '⚠️ Difficult', en: '⚠️ Difficult' },
    'fc_btn_praticar_todas': { pt: '🔁 Practice all', en: '🔁 Practice all' },

    // ── Quiz ──
    'quiz_morf_titulo': { pt: '🔤 Morphology Quiz (Gender & Plural)', en: '🔤 Morphology Quiz (Gender & Plural)' },
    'quiz_list_titulo': { pt: '🎧 Listening Quiz', en: '🎧 Listening Quiz' },
    'quiz_gram_titulo': { pt: '📚 Grammar Quiz', en: '📚 Grammar Quiz' },
    'quiz_gram_nao_carregado': { pt: 'Grammar data not loaded.', en: 'Grammar data not loaded.' },
    'quiz_verbi_titulo': { pt: '🇺🇸 Verb Conjugation Quiz', en: '🇺🇸 Verb Conjugation Quiz' },
    'quiz_verbi_nao_carregado': { pt: 'Conjugation data not loaded.', en: 'Conjugation data not loaded.' },
    'quiz_pergunta_de': { pt: 'Question {a} of {b}', en: 'Question {a} of {b}' },
    'quiz_ouvir': { pt: '🔊 Listen', en: '🔊 Listen' },
    'quiz_continuar': { pt: 'Continue →', en: 'Continue →' },
    'quiz_voltar': { pt: '← Back to Temples', en: '← Back to Temples' },

    // ── Vocabulary ──
    'vocab_dificeis': { pt: '⚠️ Difficult', en: '⚠️ Difficult' },
    'vocab_favoritos': { pt: '❤️ Favorites', en: '❤️ Favorites' },
    'vocab_palavras_total': { pt: '{n} words total', en: '{n} words total' },
    'vocab_palavra_dificil': { pt: '{n} difficult word (3+ errors)', en: '{n} difficult word (3+ errors)' },
    'vocab_palavras_dificeis': { pt: '{n} difficult words (3+ errors)', en: '{n} difficult words (3+ errors)' },
    'vocab_resultados': { pt: '{m} of {f} result(s) — {t} words total', en: '{m} of {f} result(s) — {t} words total' },
    'vocab_nenhuma': { pt: 'No words found.', en: 'No words found.' },
    'vocab_ocultar_pt': { pt: '👁 Hide PT', en: '👁 Hide PT' },
    'vocab_ocultar_it': { pt: '👁 Hide EN', en: '👁 Hide EN' },

    // ── Core — streak ──
    'streak_dia': { pt: '🔥 {n} day', en: '🔥 {n} day' },
    'streak_dias': { pt: '🔥 {n} days', en: '🔥 {n} days' },

    // ── Grammar — feedback ──
    'gram_conteudo_indisponivel': { pt: 'Conteúdo não disponível.', en: 'Contenuto non disponibile.' },
    'gram_placeholder_resposta': { pt: 'Digite sua resposta...', en: 'Scrivi la tua risposta...' },
    'gram_por_que': { pt: 'Por quê?', en: 'Why?' },
    'gram_correto': { pt: 'Correto!', en: 'Correct!' },
    'gram_errado': { pt: 'Incorreto.', en: 'Wrong.' },
    'gram_resposta_era': { pt: 'A resposta era:', en: 'The answer was:' },
    'gram_por_que_importa': { pt: 'Por que isso importa?', en: 'Why does it matter?' },
    'gram_arm_errado': { pt: 'Errado', en: 'Wrong' },
    'gram_arm_certo': { pt: 'Certo', en: 'Correct' },

    // ── Quiz — gramática ──
    'quiz_gram_nivel': { pt: '📚 Level {n}', en: '📚 Level {n}' },

    // ── Vocab — overflow ──
    'vocab_e_mais': { pt: '... and {n} more words. Use the filters to narrow down.', en: '... and {n} more words. Use the filters to narrow down.' },

    // ── Listen & Repeat — results ──
    'imit_voce_disse': { pt: 'You said:', en: 'You said:' },
    'imit_ouvimos': { pt: 'We heard:', en: 'We heard:' },
    'imit_proxima_frase': { pt: 'Next Phrase', en: 'Next Phrase' },
    'imit_tentar_novamente': { pt: 'Try Again', en: 'Try Again' },
    'imit_pronunciar_melhor': { pt: 'Try to pronounce more clearly.', en: 'Try to pronounce more clearly.' },
    'imit_ouvir_exemplo': { pt: 'Listen to the example and try again.', en: 'Listen to the example and try again.' },

    // ── Songs — result ──
    'can_corretas': { pt: '{a}/{b} correct', en: '{a}/{b} correct' },
    'can_repetir': { pt: '🔄 Repeat', en: '🔄 Repeat' },
    'can_outras_musicas': { pt: '‹ Other songs', en: '‹ Other songs' },
    'can_salva': { pt: '🎵 "{t}" saved!', en: '🎵 "{t}" saved!' },

    // ── Dialogues — result ──
    'dial_concluido': { pt: 'Dialogue Completed', en: 'Dialogue Completed' },
    'dial_acertos': { pt: 'Correct: {a} / {b}', en: 'Correct: {a} / {b}' },
    'dial_vocab_chave': { pt: 'Key Vocabulary:', en: 'Key Vocabulary:' },
    'dial_voltar': { pt: '‹ Back', en: '‹ Back' },
    'dial_salvo': { pt: '💬 "{t}" saved!', en: '💬 "{t}" saved!' },

    // ── Onboarding slide 2 ──
    'ob_vocabulario': { pt: 'Vocabulary:', en: 'Vocabulary:' },
    'ob_gramatica': { pt: 'Grammar:', en: 'Grammar:' },

    // ── Dialogues ──
    'dial_praticar_novamente': { pt: 'Practice Again 🔄', en: 'Practice Again 🔄' },
    'dial_excluir_confirm': { pt: 'Delete "{t}"?', en: 'Delete "{t}"?' },

    // ── Songs ──
    'can_excluir_confirm': { pt: 'Delete "{t}"?', en: 'Delete "{t}"?' },

    // ── Profile — destructive confirms ──
    'prof_confirm_importar': { pt: 'This will replace all your current progress. Confirm?', en: 'This will replace all your current progress. Confirm?' },
    'prof_confirm_apagar1': { pt: '⚠️ This will erase ALL your progress — XP, flashcards, achievements and streak. Are you sure?', en: '⚠️ This will erase ALL your progress — XP, flashcards, achievements and streak. Are you sure?' },
    'prof_confirm_apagar2': { pt: 'This action is IRREVERSIBLE. Do you really want to start from scratch?', en: 'This action is IRREVERSIBLE. Do you really want to start from scratch?' },
    'prof_confirm_import_content': { pt: 'Import {c} songs and {d} dialogues? Existing content will be kept and merged.', en: 'Import {c} songs and {d} dialogues? Existing content will be kept and merged.' },
    'prof_erro_formato': { pt: 'Invalid format', en: 'Invalid format' },

    // ── Quiz — initial label ──
    'quiz_pergunta_inicial': { pt: 'Question 1 of 10', en: 'Question 1 of 10' },

    // ── index.html — section titles ──
    'sec_dialoghi': { pt: 'Dialogue Mode', en: 'Dialogue Mode' },

    // ── Grammar — NMA layer labels ──
    'gram_fase2_label': { pt: '🔎 Fase 2: Observar e Descobrir', en: '🔎 Phase 2: Observe and Discover' },
    'gram_fase2_sub':   { pt: 'Clique nos cartões abaixo para descobrir regras e padrões de forma prática!', en: 'Click the cards below to discover rules and patterns in a practical way!' },
    'gram_fase3_label': { pt: '📋 Fase 3: Tabela de Referência Rápida', en: '📋 Phase 3: Quick Reference Table' },
    'gram_fase4_label': { pt: '🗣️ Fase 4: Analisar os Exemplos', en: '🗣️ Phase 4: Analyse the Examples' },
    'gram_fase4_sub':   { pt: 'Clique nos exemplos abaixo para praticar seu raciocínio antes de ver a resposta!', en: 'Click the examples below to practise your reasoning before seeing the answer!' },
    'gram_fase4_prc_pergunta': { pt: 'Pergunta', en: 'Question' },
    'gram_fase4_prc_resposta': { pt: 'Resposta', en: 'Answer' },
    'gram_fase4_prc_conclusao': { pt: 'Conclusão', en: 'Conclusion' },
    'gram_fase4_ver_detalhes': { pt: 'Ver detalhes ▾', en: 'See details ▾' },
    'gram_fase5_label': { pt: '⚠️ Fase 5: Evitar Armadilhas Comuns', en: '⚠️ Phase 5: Avoid Common Pitfalls' },
    'gram_fase5_sub':   { pt: 'Erros comuns de quem está aprendendo e como evitá-los:', en: 'Common mistakes made by learners and how to avoid them:' },
    'gram_fase5_porque': { pt: 'Por quê?', en: 'Why?' },
    'gram_inventario_label': { pt: '✅ O que você vai aprender', en: '✅ What you will learn' },
    'gram_definicao_label': { pt: '🔍 Observar e entender', en: '🔍 Observe and understand' },
    'gram_def_veja':    { pt: 'Veja', en: 'See' },
    'gram_def_pense':   { pt: 'Pense', en: 'Think' },
    'gram_def_entenda': { pt: 'Entenda', en: 'Understand' },
    'gram_tecnica_label': { pt: '📌 Como usar na prática', en: '📌 How to use it in practice' },
    'gram_exemplos_prc_label': { pt: '🗣️ Veja os exemplos (clique em 🔊 para ouvir)', en: '🗣️ See the examples (click 🔊 to listen)' },
    'gram_ponte_label': { pt: '🇵🇹 Em português é assim… em inglês é assim:', en: '🇵🇹 In Portuguese it is like this… in English it is like this:' },

    // ── Tooltips — flashcard buttons ──
    'title_reverso':   { pt: 'Reverse: PT→EN', en: 'Reverse: PT→EN' },
    'title_contexto':  { pt: 'Context: sentence with blank', en: 'Context: sentence with blank' },
    'title_escuta':    { pt: 'Listening: guess from audio', en: 'Listening: guess from audio' },
    'title_dica':      { pt: 'Show hint (level 1)', en: 'Show hint (level 1)' },
    'title_favorito':  { pt: 'Add/remove from favorites', en: 'Add/remove from favorites' },
    'title_blur_pt':   { pt: 'Hides the Portuguese column to test your memory', en: 'Hides the Portuguese column to test your memory' },
    'title_blur_it':   { pt: 'Hides the English column to test your memory', en: 'Hides the English column to test your memory' },

    // ── Onboarding slide 3 ──
    'ob_slide3_li1': { pt: 'Go to the <strong>TEMPLES</strong> tab', en: 'Go to the <strong>TEMPLES</strong> tab' },
    'ob_slide3_li2': { pt: 'Choose the <strong>1st Temple (New York - The Foundations)</strong>', en: 'Choose the <strong>1st Temple (New York - The Foundations)</strong>' },
    'ob_slide3_li3': { pt: 'Study using the <strong>FLASHCARDS</strong>', en: 'Study using the <strong>FLASHCARDS</strong>' },
    'ob_slide3_li4': { pt: 'Practise what you learned by answering the <strong>QUIZZES</strong>!', en: 'Practise what you learned by answering the <strong>QUIZZES</strong>!' },

    // ── Dialogues / Songs — create buttons ──
    'dial_btn_adicionar': { pt: '➕ Adicionar Diálogo', en: '➕ Add Dialogue' },
    'can_btn_adicionar':  { pt: '➕ Adicionar Música',  en: '➕ Add Song' },

    // ── Listen & Repeat — listen button ──
    'imit_btn_ouvir_exemplo': { pt: '🔊 Listen to Example', en: '🔊 Listen to Example' },

    // ── Tour ──
    'tour_templi_title': { pt: '🏛️ Temples (Your Journey)', en: '🏛️ Temples (Your Journey)' },
    'tour_templi_desc': { pt: 'This is the heart of your learning. Unlock new temples and reach your daily experience goal.', en: 'This is the heart of your learning. Unlock new temples and reach your daily experience goal.' },
    'tour_dialoghi_title': { pt: '💬 Dialogues', en: '💬 Dialogues' },
    'tour_dialoghi_desc': { pt: 'Read and listen to real dialogues to get the rhythm, context and improve your listening comprehension.', en: 'Read and listen to real dialogues to get the rhythm, context and improve your listening comprehension.' },
    'tour_canzoni_title': { pt: '🎵 Songs', en: '🎵 Songs' },
    'tour_canzoni_desc': { pt: 'Learn vocabulary while enjoying popular English songs.', en: 'Learn vocabulary while enjoying popular English songs.' },
    'tour_imitazione_title': { pt: '🎙️ Listen & Repeat', en: '🎙️ Listen & Repeat' },
    'tour_imitazione_desc': { pt: 'Listen to a native speaker and record your own voice. The secret to authentic pronunciation.', en: 'Listen to a native speaker and record your own voice. The secret to authentic pronunciation.' },
    'tour_flashcard_title': { pt: '🧠 Flashcards', en: '🧠 Flashcards' },
    'tour_flashcard_desc': { pt: 'Review vocabulary at the exact moment you are about to forget, using our spaced repetition algorithm.', en: 'Review vocabulary at the exact moment you are about to forget, using our spaced repetition algorithm.' },
    'tour_quiz_title': { pt: '📝 Quiz', en: '📝 Quiz' },
    'tour_quiz_desc': { pt: 'Test your knowledge with quick exercise batches and earn XP.', en: 'Test your knowledge with quick exercise batches and earn XP.' },
    'tour_grammatica_title': { pt: '📚 Grammar', en: '📚 Grammar' },
    'tour_grammatica_desc': { pt: 'Structural questions? Quickly look up all grammar rules here.', en: 'Structural questions? Quickly look up all grammar rules here.' },
    'tour_vocabolario_title': { pt: '📖 Vocabulary', en: '📖 Vocabulary' },
    'tour_vocabolario_desc': { pt: 'Your master glossary. Search for any word learned so far.', en: 'Your master glossary. Search for any word learned so far.' },
    'tour_config_title': { pt: '⚙️ Settings & Profile', en: '⚙️ Settings & Profile' },
    'tour_config_desc': { pt: 'Switch to dark mode, mute sounds and access Profile options at the top of the screen.', en: 'Switch to dark mode, mute sounds and access Profile options at the top of the screen.' },

    // ── Profile — stats labels ──
    'prof_stats_gerais':     { pt: '📊 Estatísticas Gerais',       en: '📊 General Stats' },
    'prof_nivel_atual':      { pt: 'Nível Atual',                   en: 'Current Level' },
    'prof_xp_total':         { pt: 'XP Total',                     en: 'Total XP' },
    'prof_sequencia_atual':  { pt: 'Sequência Atual',               en: 'Current Streak' },
    'prof_fc_revisados':     { pt: 'Flashcards Revisados',          en: 'Flashcards Reviewed' },
    'prof_palavras_dom':     { pt: 'Palavras Dominadas',            en: 'Words Mastered' },
    'prof_palavras_dif':     { pt: 'Palavras Difíceis',             en: 'Difficult Words' },
    'prof_tempo_estimado':   { pt: 'Tempo Estimado',                en: 'Estimated Time' },
    'prof_templos_desbloq':  { pt: 'Templos Desbloqueados',         en: 'Temples Unlocked' },
    'prof_precisao_quiz':    { pt: 'Precisão no Quiz',              en: 'Quiz Accuracy' },
    'prof_esta_semana':      { pt: '📅 Esta Semana',                en: '📅 This Week' },
    'prof_sessoes':          { pt: 'Sessões totais',                en: 'Total sessions' },
    'prof_cards_estudados':  { pt: 'Cards estudados',               en: 'Cards studied' },
    'prof_xp_ganho':         { pt: 'XP ganho',                     en: 'XP earned' },
    'prof_dias_ativos':      { pt: 'Dias ativos',                   en: 'Active days' },
    'prof_categorias':       { pt: '📚 Categorias Mais Estudadas',  en: '📚 Top Categories' },
    'prof_conquistas':       { pt: '🏆 Minhas Conquistas',          en: '🏆 My Achievements' },
    'prof_reiniciar_tour':   { pt: '🗺️ Reiniciar Tour',             en: '🗺️ Restart Introduction Tour' },
    'prof_export_content':   { pt: '⬇️ Exportar Conteúdo',         en: '⬇️ Export Content' },
    'prof_import_content':   { pt: '⬆️ Importar Conteúdo',         en: '⬆️ Import Content' },

    // ── Songs — additional UI ──
    'can_busca_placeholder': { pt: '🔍 Título ou artista...',       en: '🔍 Title or artist...' },
    'can_sem_resultados':    { pt: 'Sem resultados.',                en: 'No results.' },
    'can_sem_musicas':       { pt: 'Nenhuma música ainda.',          en: 'No songs yet.' },
    'can_editar_musica':     { pt: 'Editar Música',                  en: 'Edit Song' },
    'can_nova_musica':       { pt: 'Nova Música',                    en: 'New Song' },
    'can_escolha_palavra':   { pt: 'Escolha a palavra',              en: 'Choose the word' },
    'can_revelar':           { pt: 'Clique para revelar 👆',         en: 'Click to reveal 👆' },
    'can_ocultar_confirm':   { pt: 'Ocultar "{t}"?\nSome da lista mas pode ser restaurada.', en: 'Hide "{t}"?\nIt disappears from the list but can be restored later.' },
    'can_oculta_notif':      { pt: 'Música oculta. Use "Restaurar" para trazer de volta.', en: 'Song hidden. Use "Restore" to bring it back.' },
    'can_restauradas_notif': { pt: 'Músicas nativas restauradas!',   en: 'Built-in songs restored!' },
    'can_restaurar':         { pt: '↩ Restaurar',                    en: '↩ Restore' },

    // ── Grammar — navigation & exercises ──
    'gram_todos_modulos':    { pt: '‹ Todos os módulos',             en: '‹ All modules' },
    'gram_confirmar_sair':   { pt: 'Tem certeza? O progresso nesta lição será perdido.', en: 'Are you sure? Progress on this lesson will be lost.' },
    'gram_exercicio_de':     { pt: 'Exercício {a} / {b}',            en: 'Exercise {a} / {b}' },
    'gram_verificar':        { pt: '✔ Verificar',                    en: '✔ Verify' },
    'gram_revelar_resp':     { pt: 'Revelar resposta',               en: 'Reveal answer' },
    'gram_ocultar':          { pt: 'Ocultar',                        en: 'Hide' },
    'gram_clique_revelar':   { pt: '👆 Clique nas palavras para revelar, ou clique em "Revelar resposta"', en: '👆 Click on the words to reveal, or click "Reveal answer"' },
    'gram_continue':         { pt: 'Continue estudando — você consegue!', en: 'Keep studying — you can do it!' },
    'gram_perfeito':         { pt: 'Perfeito! Sem erros!',            en: 'Perfect! No mistakes!' },
    'gram_otimo':            { pt: 'Ótimo trabalho! Quase perfeito!', en: 'Great work! Almost perfect!' },
    'gram_bom_resultado':    { pt: 'Bom! Continue assim!',            en: 'Good! Keep it up!' },
    'gram_proximo_cap':      { pt: 'Próximo capítulo →',              en: 'Next chapter →' },
    'gram_capitulo_completo':{ pt: 'Capítulo Concluído!',             en: 'Chapter Complete!' },
    'gram_pct_correto':      { pt: '{a}% correto',                    en: '{a}% correct' },
    'gram_bonus_xp':         { pt: '+{a} XP bônus 🏆',               en: '+{a} XP bonus 🏆' },
    'gram_badge_reveal':     { pt: '👁️ Revelar',                     en: '👁️ Reveal' },
    'gram_badge_type':       { pt: '⌨️ Digitar',                     en: '⌨️ Type' },
    'gram_badge_choose':     { pt: '🔘 Escolher',                    en: '🔘 Choose' },

    // ── Vocabulary — additional UI ──
    'vocab_todos_templos':   { pt: 'Todos os templos',               en: 'All temples' },
    'vocab_todas_cats':      { pt: 'Todas as categorias',            en: 'All categories' },
    'vocab_nenhuma_palavra': { pt: 'Nenhuma palavra carregada ainda.', en: 'No words loaded yet.' },
    'vocab_estudar_filtro':  { pt: '🃏 Estudar este filtro',         en: '🃏 Study this filter' },

    // ── Quiz — result messages ──
    'quiz_perfeito':         { pt: '🏆 Perfeito! Você domina o inglês!', en: '🏆 Perfect! You are a master of English!' },
    'quiz_muito_bom':        { pt: '👏 Muito bom! Continue assim!',  en: '👏 Very good! Keep it up!' },
    'quiz_bom_resultado':    { pt: '📚 Bom! Mas pode melhorar!',     en: '📚 Good! But you can do better!' },
    'quiz_nao_desista':      { pt: '💪 Não desista! Continue estudando!', en: '💪 Don\'t give up! Keep studying!' },

    // ── Quiz / Flashcard — untranslated UI ──
    'quiz_titulo':           { pt: 'Teste seu Conhecimento',    en: 'Test your Knowledge' },
    'fc_estudando':          { pt: 'Estudando:',                en: 'Studying:' },
    'fc_selecionar_templo':  { pt: '-- Selecione um templo --', en: '-- Select a temple --' },
    'fc_revisao_geral':      { pt: 'Revisão Geral',             en: 'General Review' },
    'quiz_nivel_requerido':  { pt: 'Nível {n}',                 en: 'Level {n}' },

    // ── Home / Temples section ──
    'hm_sua_atividade':      { pt: '🔥 Sua Atividade',              en: '🔥 Your Activity' },
    'pdd_titulo_label':      { pt: '🇺🇸 Palavra do Dia',            en: '🇺🇸 Word of the Day' },
    'pdd_ouvir':             { pt: '🔊 Ouvir',                      en: '🔊 Listen' },
    'pdd_estudar':           { pt: '📚 Estudar',                    en: '📚 Study' },
    'sec_canzoni_titulo':    { pt: 'Modo Canção',                    en: 'Song Mode' },
    'sec_imitazione_titulo': { pt: 'Ouvir e Repetir',               en: 'Listen & Repeat' },
    'btn_add_dialogo':       { pt: '➕ Adicionar Diálogo',           en: '➕ Add Dialogue' },
    'btn_add_song':          { pt: '➕ Adicionar Música',            en: '➕ Add Song' },
    'btn_via_ia':            { pt: '🤖 via IA',                     en: '🤖 via IA' },
    'filtro_todos':          { pt: 'Todos',                          en: 'All' },
    'filtro_nativo':         { pt: '📚 Nativas',                    en: '📚 Built-in' },

    // ── Temple modal ──
    'tm_estudar_vocab':      { pt: '📚 Estudar vocabulário',        en: '📚 Study vocabulary' },
    'tm_take_quiz':          { pt: '❓ Fazer o Quiz',               en: '❓ Take the Quiz' },
    'tm_access_code':        { pt: 'Tem um código de acesso?',      en: 'Have an access code?' },
    'tm_code_placeholder':   { pt: 'Digite o código...',            en: 'Enter code...' },
    'tm_unlock':             { pt: 'Desbloquear',                   en: 'Unlock' },

    // ── Imitazione filter bar ──
    'imit_filtro_todas':     { pt: 'Todas',                         en: 'All' },
    'imit_filtro_adicionadas':{ pt: '🤖 Adicionadas',              en: '🤖 Added' },
    'imit_filtro_nativas':   { pt: '📚 Nativas',                   en: '📚 Built-in' },
    'imit_filtro_nivel':     { pt: '🎯 Nível',                     en: '🎯 Level' },

    // ── Alerts / confirms ──
    'can_ia_cole_json':      { pt: 'Cole o JSON gerado pela IA primeiro',                                             en: 'Paste the AI-generated JSON first' },
    'can_ia_json_invalido':  { pt: 'JSON inválido. Verifique a resposta da IA e tente novamente.',                    en: 'Invalid JSON. Check the AI response and try again.' },
    'can_ia_sem_versos':     { pt: 'Nenhum verso válido no JSON',                                                      en: 'No valid verses found in the JSON' },
    'can_ia_importados':     { pt: '{n} versos importados com sucesso',                                                en: '{n} verses imported from AI result' },
    'can_substituir_versos': { pt: 'Isso vai substituir {a} verso(s) existente(s) por {b} versos importados. Continuar?', en: 'This will replace {a} existing verse(s) with {b} imported verses. Continue?' },
    'prof_importar_conteudo':{ pt: 'Importar conteúdo?\n• {nc} músicas\n• {nd} diálogos\n• {ns} histórias\n• {ni} frases\n• {nv} palavras', en: 'Import content?\n• {nc} songs\n• {nd} dialogues\n• {ns} stories\n• {ni} listen phrases\n• {nv} vocabulary words' },
    'ia_remover_item':       { pt: 'Remover este item?',           en: 'Remove this item?' },
    'storage_limite':        { pt: 'Limite de armazenamento atingido! O app não consegue salvar seu progresso. Por favor, libere espaço no navegador ou exclua alguns flashcards.', en: 'Storage Limit Reached! The app cannot save your progress. Please clear some space in your browser data or delete unused flashcards.' },
    'storage_limite_fc':     { pt: 'Limite de armazenamento! Não é possível salvar novos flashcards. Executando limpeza automática...', en: 'Storage Limit Reached! Cannot save new flashcards. Running auto-cleanup of oldest inactive cards...' }
  },

  inicializar() {
    this.idioma = localStorage.getItem('en_idioma') || 'en';
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



