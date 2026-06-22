// ============================================================
// i18n.js — Localization System (Total Immersion in English)
// ============================================================

const I18n = {
  idioma: 'en',
  
  dict: {
    // ── Abas de Navegação (Bottom / Mobile) ──
    'nav_inicio': { pt: 'Templos', en: 'Temples' },
    'nav_dialogos': { pt: 'Diálogos', en: 'Dialogues' },
    'nav_canzoni': { pt: 'Músicas', en: 'Songs' },
    'nav_imitacao': { pt: 'Ouvir e Repetir', en: 'Listen' },
    'nav_flashcard': { pt: 'Flashcards', en: 'Flashcards' },
    'nav_quiz': { pt: 'Quiz', en: 'Quiz' },
    'nav_vocab': { pt: 'Vocab', en: 'Vocab' },
    'nav_gramatica': { pt: 'Grammar', en: 'Grammar' },
    'nav_storie':    { pt: 'Leituras', en: 'Reading' },

    // ── Abas de Navegação (Top / Desktop) ──
    'top_nav_templi': { pt: 'Templos', en: 'Temples' },
    'top_nav_dialoghi': { pt: 'Diálogos', en: 'Dialogues' },
    'top_nav_canzoni': { pt: 'Músicas', en: 'Songs' },
    'top_nav_imitazione': { pt: 'Ouvir e Repetir', en: 'Listen & Repeat' },
    'top_nav_flashcard': { pt: 'Flashcards', en: 'Flashcards' },
    'top_nav_quiz': { pt: 'Quiz', en: 'Quiz' },
    'top_nav_vocabolario': { pt: 'Vocabulário', en: 'Vocabulary' },
    'top_nav_grammatica': { pt: 'Grammar', en: 'Grammar' },
    'top_nav_storie':     { pt: 'Leituras',  en: 'Reading' },

    // ── Elementos Globais ──
    'meta_do_dia': { pt: 'Meta Diária', en: 'Daily Goal' },
    'config_perfil': { pt: 'Configurações & Perfil', en: 'Settings & Profile' },
    'btn_fechar': { pt: 'Fechar', en: 'Close' },
    'btn_cancelar': { pt: 'Cancelar', en: 'Cancel' },
    'btn_salvar': { pt: 'Salvar', en: 'Save' },

    // ── Modal de Configurações ──
    'cfg_titulo': { pt: 'Configurações', en: 'Settings' },
    'cfg_idioma_app': { pt: 'Idioma do App', en: 'App Language' },
    'cfg_idioma_pt': { pt: 'Português (PT)', en: 'Portuguese (PT)' },
    'cfg_idioma_it': { pt: 'Inglês (EN) - Imersão', en: 'English (EN) - Immersion' },
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
    'notif_templo_sbloccato': { pt: '🏛️ Templo {n} desbloqueado!', en: '🏛️ Temple {n} unlocked!' },
    'notif_templo_completato': { pt: '🏆 Templo {n} concluído!', en: '🏆 Temple {n} completed!' },
    'notif_codice_errato': { pt: 'Código incorreto.', en: 'Incorrect code.' },
    'notif_tutti_sbloccati': { pt: 'Todos os templos desbloqueados! 🎉', en: 'All temples unlocked! 🎉' },
    'notif_data_futura': { pt: 'O prazo deve ser uma data futura.', en: 'The deadline must be in the future.' },
    'notif_meta_definida': { pt: 'Meta: {val} XP/dia', en: 'Goal: {val} XP/day' },
    'meta_do_dia_label': { pt: '🎯 Meta Diária', en: '🎯 Daily Goal' },

    // ── Áudio ──
    'notif_sons_ativados': { pt: '🔔 Sons ativados', en: '🔔 Sound on' },
    'notif_sons_desativados': { pt: '🔕 Sons desativados', en: '🔕 Sound off' },

    // ── Flashcards ──
    'notif_fc_bloqueado': { pt: 'Templo não desbloqueado ainda!', en: 'Temple not unlocked yet!' },
    'notif_fc_vocab_nao_carregado': { pt: 'Vocabulário deste templo não carregado.', en: 'Vocabulary for this temple not loaded.' },
    'notif_fc_erro_resposta': { pt: 'Erro ao salvar resposta. Tente novamente.', en: 'Error saving response. Try again.' },
    'notif_fc_favorito_add': { pt: '❤️ Adicionado aos favoritos', en: '❤️ Added to favorites' },
    'notif_fc_favorito_rem': { pt: '🤍 Removido dos favoritos', en: '🤍 Removed from favorites' },
    'notif_fc_sem_favoritos': { pt: 'Nenhum favorito ainda. Adicione com ❤️!', en: 'No favorites yet. Add with ❤️!' },
    'notif_fc_favoritos_nao_enc': { pt: 'Palavras favoritas não encontradas nos dados.', en: 'Favorite words not found in data.' },
    'notif_fc_favoritos_revisar': { pt: '❤️ {n} favoritos para revisar', en: '❤️ {n} favorites to review' },
    'notif_fc_sem_dificeis': { pt: 'Nenhuma palavra difícil encontrada! 🎉', en: 'No difficult words found! 🎉' },
    'notif_fc_dificeis_revisar': { pt: '📚 {n} palavras difíceis para revisar', en: '📚 {n} difficult words to review' },
    'notif_fc_sem_voz': { pt: 'Seu browser não suporta reconhecimento de voz.', en: 'Your browser does not support voice recognition.' },
    'notif_fc_nao_ouviu': { pt: 'Não consegui ouvir. Tente novamente.', en: 'I could not hear you. Try again.' },

    // ── Gramática ──
    'notif_gram_capitolo': { pt: '🏆 Capítulo concluído! +{xp} XP', en: '🏆 Capítulo concluído! +{xp} XP' },

    // ── Songs (custom) ──
    'notif_can_titulo_obr': { pt: 'O título é obrigatório.', en: 'Title is required.' },
    'notif_can_sem_verso': { pt: 'Adicione pelo menos um verso com lacuna.', en: 'Add at least one verse with a blank.' },
    'notif_can_excluida': { pt: 'Música excluída.', en: 'Song deleted.' },

    // ── Dialogues (custom) ──
    'notif_dial_titulo_obr': { pt: 'O título é obrigatório.', en: 'Title is required.' },
    'notif_dial_sem_turnos': { pt: 'Adicione pelo menos 2 turnos.', en: 'Add at least 2 turns.' },
    'notif_dial_excluido': { pt: 'Diálogo excluído.', en: 'Dialogue deleted.' },

    // ── Core — templates renderizados ──
    'cc_continuar_label': { pt: 'Continuar de onde parou', en: 'Continue where you left off' },
    'cc_retomar': { pt: '→ Retomar', en: '→ Resume' },
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
    'templo_requer': { pt: 'Requer Nível {n} · Toque para inserir o código', en: 'Requires Level {n} · Tap to enter code' },

    // ── Heatmap ──
    'hm_atividades': { pt: 'atividades em', en: 'activities in' },
    'hm_dias': { pt: 'dias', en: 'days' },
    'hm_sequencia': { pt: 'Sequência:', en: 'Streak:' },
    'hm_atividades_tooltip': { pt: 'atividades', en: 'activities' },

    // ── Progression ──
    'notif_meta_atingida': { pt: '🎯 Meta diária atingida! Muito bem!', en: '🎯 Daily goal reached! Well done!' },
    'notif_meta_def_ok': { pt: '🎯 Meta definida! Boa sorte!', en: '🎯 Goal set! Good luck!' },

    // ── Quiz ──
    'notif_quiz_bloqueado': { pt: 'Templo bloqueado!', en: 'Temple not unlocked!' },
    'notif_quiz_sem_perguntas': { pt: 'Nenhuma pergunta disponível para este templo.', en: 'No questions available for this temple.' },
    'notif_quiz_sem_perguntas_todos': { pt: 'Nenhuma pergunta disponível nos templos desbloqueados.', en: 'No questions available for the unlocked temples.' },
    'notif_quiz_morf_insuf': { pt: 'Dados de morfologia insuficientes para este templo.', en: 'Insufficient morphology data for this temple.' },
    'notif_quiz_conj_insuf': { pt: 'Dados de conjugação insuficientes.', en: 'Insufficient conjugation data.' },
    'notif_quiz_listen_insuf': { pt: 'Dados de escuta insuficientes.', en: 'Insufficient listening data.' },
    'notif_quiz_gram_insuf': { pt: 'Dados de gramática insuficientes para este nível.', en: 'Insufficient grammar data for this level.' },

    // ── Profilo ──
    'notif_backup_exp': { pt: '✅ Backup exportado com sucesso!', en: '✅ Backup exported successfully!' },
    'notif_backup_imp': { pt: '✅ Backup importado! Recarregando...', en: '✅ Backup imported! Reloading...' },
    'notif_arquivo_inv': { pt: '❌ Arquivo inválido: ', en: '❌ Invalid file: ' },
    'notif_prog_reset': { pt: 'Progresso resetado. Recarregando...', en: 'Progress reset. Reloading...' },
    'notif_conteudo_exp': { pt: '✅ Conteúdo exportado!', en: '✅ Content exported!' },

    // ── Achievements ──
    'ach_primeiro_passo': { pt: 'Conclua seu primeiro flashcard', en: 'Complete your first flashcard' },
    'ach_primeiro_passo_name': { pt: 'Primeiro Passo', en: 'First Step' },
    'ach_uma_semana': { pt: '7 dias consecutivos de estudo', en: '7 consecutive days of study' },
    'ach_uma_semana_name': { pt: 'Uma Semana', en: 'One Week' },
    'ach_studioso': { pt: 'Revise 100 flashcards', en: 'Review 100 flashcards' },
    'ach_studioso_name': { pt: 'Estudioso', en: 'Scholar' },
    'ach_quiz_perfetto': { pt: '10/10 respostas corretas em um quiz', en: '10/10 correct answers in a quiz' },
    'ach_quiz_perfetto_name': { pt: 'Quiz Perfeito', en: 'Perfect Quiz' },
    'ach_primo_tempio': { pt: 'Conclua os flashcards do Templo 1', en: 'Complete Temple 1 flashcards' },
    'ach_primo_tempio_name': { pt: 'Primeiro Templo', en: 'First Temple' },
    'ach_vocabulario': { pt: 'Domine 50 palavras (3+ revisões)', en: 'Master 50 words (3+ reviews)' },
    'ach_vocabulario_name': { pt: 'Vocabulário Rico', en: 'Rich Vocabulary' },
    'ach_duro': { pt: 'Marque "De Novo" 50 vezes — a persistência compensa', en: 'Mark "Again" 50 times — persistence pays off' },
    'ach_duro_name': { pt: 'Persistente!', en: 'Persistent!' },
    'ach_english_autentico': { pt: 'Alcance o Nível 10', en: 'Reach Level 10' },
    'ach_english_autentico_name': { pt: 'English Autentico', en: 'English Autentico' },
    'ach_um_mes': { pt: '30 dias consecutivos de estudo', en: '30 consecutive days of study' },
    'ach_um_mes_name': { pt: 'Um Mês', en: 'One Month' },
    'ach_maestro': { pt: 'Revise 500 flashcards', en: 'Review 500 flashcards' },
    'ach_maestro_name': { pt: 'Mestre', en: 'Master' },
    'ach_esploratore': { pt: 'Desbloqueie 5 templos', en: 'Unlock 5 temples' },
    'ach_esploratore_name': { pt: 'Explorador', en: 'Explorer' },
    'ach_grammatico': { pt: 'Conclua 10 lições de gramática', en: 'Complete 10 grammar lessons' },
    'ach_grammatico_name': { pt: 'Gramático', en: 'Grammarian' },
    'ach_precisione': { pt: '5 quizzes seguidos com mais de 80% de acertos', en: '5 quizzes in a row with over 80% correct' },
    'ach_precisione_name': { pt: 'Precisão', en: 'Precision' },
    'ach_notturno': { pt: 'Estude após as 22h', en: 'Study after 10 PM' },
    'ach_notturno_name': { pt: 'Coruja da Noite', en: 'Night Owl' },
    'ach_mattiniero': { pt: 'Estude antes das 7h', en: 'Study before 7 AM' },
    'ach_mattiniero_name': { pt: 'Madrugador', en: 'Early Bird' },
    'ach_unlocked_section': { pt: '✅ Desbloqueadas', en: '✅ Unlocked' },
    'ach_inprogress_section': { pt: '🔒 Em progresso', en: '🔒 In progress' },

    // ── Flashcard — empty state ──
    'fc_todas_estudadas': { pt: 'Todos os cartões estudados hoje.', en: 'All cards studied today.' },

    // ── Flashcard — card hints ──
    'fc_dica_ouvir': { pt: 'Toque no cartão para ouvir novamente 🔊', en: 'Tap the card to listen again 🔊' },
    'fc_dica_palavra_falta': { pt: 'Qual palavra está faltando?', en: 'Which word is missing?' },
    'fc_dica_revelar': { pt: 'Clique para revelar', en: 'Click to reveal' },

    // ── Flashcard — session summary ──
    'fc_resumo_muito_bom': { pt: 'Ótimo trabalho!', en: 'Great job!' },
    'fc_resumo_continua': { pt: 'Continue praticando!', en: 'Keep practising!' },
    'fc_resumo_sem_agendamento': { pt: 'Sem agendamento', en: 'No schedule' },
    'fc_resumo_em_dias': { pt: 'em {n} dia', en: 'in {n} day' },
    'fc_resumo_em_dias_plural': { pt: 'em {n} dias', en: 'in {n} days' },
    'fc_resumo_em_horas': { pt: 'em {n}h', en: 'in {n}h' },
    'fc_resumo_cartas': { pt: 'cartões', en: 'cards' },
    'fc_resumo_acertos': { pt: 'acertos', en: 'correct' },
    'fc_resumo_proxima': { pt: '⏰ Próxima revisão:', en: '⏰ Next review:' },
    'fc_resumo_novas': { pt: '🌱 {n} nova palavra aprendida!', en: '🌱 {n} new word learned!' },
    'fc_resumo_novas_plural': { pt: '🌱 {n} novas palavras aprendidas!', en: '🌱 {n} new words learned!' },
    'fc_resumo_praticar': { pt: '🔁 Praticar todas', en: '🔁 Practice all' },
    'fc_gravar_parar': { pt: '⏹ Parar', en: '⏹ Stop' },
    'fc_gravar_imitar': { pt: '🎤 Imitar', en: '🎤 Imitate' },

    // ── Quiz — feedback and results ──
    'quiz_correto': { pt: '✅ Correto!', en: '✅ Correct!' },
    'quiz_resposta_correta_era': { pt: '❌ A resposta correta era:', en: '❌ The correct answer was:' },
    'quiz_xp_ganhos': { pt: '+{n} XP ganhos', en: '+{n} XP earned' },

    // ── Quiz — morphology ──
    'quiz_morf_genero_pergunta': { pt: 'Qual é o gênero de "{w}"?', en: 'What is the gender of "{w}"?' },
    'quiz_morf_genero_masc': { pt: 'masculino', en: 'masculine' },
    'quiz_morf_genero_fem': { pt: 'feminino', en: 'feminine' },
    'quiz_morf_genero_exp': { pt: '"{w}" é {g}', en: '"{w}" is {g}' },
    'quiz_morf_plural_pergunta': { pt: 'Qual é o plural de "{w}"?', en: 'What is the plural of "{w}"?' },
    'quiz_morf_plural_exp': { pt: 'O plural de "{w}" é "{p}".', en: 'The plural of "{w}" is "{p}".' },

    // ── Listen & Repeat ──
    'imit_erro_ouvir': { pt: 'Erro ao ouvir. Tente novamente.', en: 'Error listening. Try again.' },

    // ── Reading — interactive reading ──
    'storie_titulo_secao':   { pt: 'Leitura em Inglês', en: 'English Reading' },
    'storie_escolha':        { pt: 'Escolha uma história para começar a ler', en: 'Choose a story to start reading' },
    'storie_btn_traduzir':   { pt: '👁️ Ocultar tradução', en: '👁️ Hide translation' },
    'storie_btn_mostrar':    { pt: '👁️ Mostrar tradução', en: '👁️ Show translation' },
    'storie_btn_ouvir_tudo': { pt: '🔊 Ouvir tudo', en: '🔊 Listen to all' },
    'storie_btn_concluir':   { pt: '✓ Concluir (+{xp} XP)', en: '✓ Finished (+{xp} XP)' },
    'storie_btn_relida':     { pt: '✓ Ler novamente', en: '✓ Re-read' },
    'storie_btn_todas':      { pt: '‹ Todas as histórias', en: '‹ All stories' },
    'storie_notif_lida':     { pt: '📖 +{xp} XP por concluir a história!', en: '📖 +{xp} XP for finishing the story!' },
    'storie_notif_ja_lida':  { pt: 'Você já leu esta história.', en: 'You have already read this story.' },
    'storie_vocab_titulo':   { pt: '📚 Vocabulário ({n})', en: '📚 Vocabulary ({n})' },

    // ── Onboarding ──
    'ob_descricao': { pt: 'Este aplicativo foi projetado para levar você do zero ao inglês falado de forma simples, natural e altamente eficaz. Cada sessão dura cerca de 10 minutos.', en: 'This app is designed to take you from zero to spoken English in a simple, natural and highly effective way. Each session lasts about 10 minutes.' },
    'ob_como_comecar': { pt: 'É muito fácil começar sua jornada:', en: 'It is very easy to start your journey:' },
    'ob_get_started': { pt: 'Começar! 🚀', en: 'Get Started! 🚀' },

    // ── Flashcard — inline labels ──
    'fc_novas': { pt: 'novas', en: 'new' },
    'fc_revisao': { pt: 'revisar', en: 'to review' },
    'fc_escolha_vocab': { pt: 'Escolha um conjunto de vocabulário para estudar', en: 'Choose a vocabulary set to study' },
    'fc_selecione_tempio': { pt: 'Selecione um Templo', en: 'Select a Temple' },
    'fc_use_seletor': { pt: '↑ use o seletor acima', en: '↑ use the selector above' },
    'fc_volte_amanha': { pt: 'Volte amanhã para suas próximas revisões.', en: 'Come back tomorrow for your next reviews.' },
    'fc_btn_pronunciar': { pt: '🔊 Pronunciar', en: '🔊 Pronounce' },
    'fc_btn_imitar': { pt: '🎤 Imitar', en: '🎤 Imitate' },
    'fc_btn_esqueci': { pt: '❌ Errei', en: '❌ Again' },
    'fc_btn_dificil': { pt: '⚡ Difícil', en: '⚡ Hard' },
    'fc_btn_bom': { pt: '✅ Bom', en: '✅ Good' },
    'fc_btn_facil': { pt: '⭐ Fácil', en: '⭐ Easy' },
    'fc_btn_favoritos': { pt: '❤️ Favoritos', en: '❤️ Favorites' },
    'fc_btn_dificeis': { pt: '⚠️ Difíceis', en: '⚠️ Difficult' },
    'fc_btn_praticar_todas': { pt: '🔁 Praticar todas', en: '🔁 Practice all' },

    // ── Quiz ──
    'quiz_morf_titulo': { pt: '🔤 Quiz de Morfologia (Gênero & Plural)', en: '🔤 Morphology Quiz (Gender & Plural)' },
    'quiz_list_titulo': { pt: '🎧 Quiz de Escuta', en: '🎧 Listening Quiz' },
    'quiz_gram_titulo': { pt: '📚 Quiz de Gramática', en: '📚 Grammar Quiz' },
    'quiz_gram_nao_carregado': { pt: 'Dados de gramática não carregados.', en: 'Grammar data not loaded.' },
    'quiz_verbi_titulo': { pt: '🇺🇸 Quiz de Conjugação Verbal', en: '🇺🇸 Verb Conjugation Quiz' },
    'quiz_verbi_nao_carregado': { pt: 'Dados de conjugação não carregados.', en: 'Conjugation data not loaded.' },
    'quiz_pergunta_de': { pt: 'Pergunta {a} de {b}', en: 'Question {a} of {b}' },
    'quiz_ouvir': { pt: '🔊 Ouvir', en: '🔊 Listen' },
    'quiz_continuar': { pt: 'Continuar →', en: 'Continue →' },
    'quiz_voltar': { pt: '← Voltar aos Templos', en: '← Back to Temples' },

    // ── Vocabulary ──
    'vocab_dificeis': { pt: '⚠️ Difíceis', en: '⚠️ Difficult' },
    'vocab_favoritos': { pt: '❤️ Favoritos', en: '❤️ Favorites' },
    'vocab_palavras_total': { pt: '{n} palavras no total', en: '{n} words total' },
    'vocab_palavra_dificil': { pt: '{n} palavra difícil (3+ erros)', en: '{n} difficult word (3+ errors)' },
    'vocab_palavras_dificeis': { pt: '{n} palavras difíceis (3+ erros)', en: '{n} difficult words (3+ errors)' },
    'vocab_resultados': { pt: '{m} de {f} resultado(s) — {t} palavras no total', en: '{m} of {f} result(s) — {t} words total' },
    'vocab_nenhuma': { pt: 'Nenhuma palavra encontrada.', en: 'No words found.' },
    'vocab_ocultar_pt': { pt: '👁 Ocultar PT', en: '👁 Hide PT' },
    'vocab_ocultar_it': { pt: '👁 Ocultar EN', en: '👁 Hide EN' },

    // ── Core — streak ──
    'streak_dia': { pt: '🔥 {n} dia', en: '🔥 {n} day' },
    'streak_dias': { pt: '🔥 {n} dias', en: '🔥 {n} days' },

    // ── Grammar — feedback ──
    'gram_conteudo_indisponivel': { pt: 'Conteúdo não disponível.', en: 'Content not available.' },
    'gram_placeholder_resposta': { pt: 'Digite sua resposta...', en: 'Type your answer...' },
    'gram_por_que': { pt: 'Por quê?', en: 'Why?' },
    'gram_correto': { pt: 'Correto!', en: 'Correct!' },
    'gram_errado': { pt: 'Incorreto.', en: 'Incorrect.' },
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
    'ob_vocabulario': { pt: 'Vocabulário:', en: 'Vocabulary:' },
    'ob_gramatica': { pt: 'Gramática:', en: 'Grammar:' },

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
    'gram_fase2_label': { pt: '🔎 Fase 2: Observar e Descobrir', en: '🔎 Phase 2: Observe & Discover' },
    'gram_fase2_sub':   { pt: 'Clique nos cartões abaixo para descobrir regras e padrões de forma prática!', en: 'Click the cards below to discover rules and patterns practically!' },
    'gram_fase3_label': { pt: '📋 Fase 3: Tabela de Referência Rápida', en: '📋 Phase 3: Quick Reference Table' },
    'gram_fase4_label': { pt: '🗣️ Fase 4: Analisar os Exemplos', en: '🗣️ Phase 4: Analyze Examples' },
    'gram_fase4_sub':   { pt: 'Clique nos exemplos abaixo para praticar seu raciocínio antes de ver a resposta!', en: 'Click the examples below to practice your reasoning before seeing the answer!' },
    'gram_fase4_prc_pergunta': { pt: 'Pergunta', en: 'Question' },
    'gram_fase4_prc_resposta': { pt: 'Resposta', en: 'Answer' },
    'gram_fase4_prc_conclusao': { pt: 'Conclusão', en: 'Conclusion' },
    'gram_fase4_ver_detalhes': { pt: 'Ver detalhes ▾', en: 'See details ▾' },
    'gram_fase5_label': { pt: '⚠️ Fase 5: Evitar Armadilhas Comuns', en: '⚠️ Phase 5: Avoid Common Pitfalls' },
    'gram_fase5_sub':   { pt: 'Erros comuns de quem está aprendendo e como evitá-los:', en: 'Common mistakes from learners and how to avoid them:' },
    'gram_fase5_porque': { pt: 'Por quê?', en: 'Why?' },
    'gram_inventario_label': { pt: '✅ O que você vai aprender', en: '✅ What you will learn' },
    'gram_definicao_label': { pt: '🔍 Observar e entender', en: '🔍 Observe and understand' },
    'gram_def_veja':    { pt: 'Veja', en: 'See' },
    'gram_def_pense':   { pt: 'Pense', en: 'Think' },
    'gram_def_entenda': { pt: 'Entenda', en: 'Understand' },
    'gram_tecnica_label': { pt: '📌 Como usar na prática', en: '📌 How to use in practice' },
    'gram_exemplos_prc_label': { pt: '🗣️ Veja os exemplos (clique em 🔊 para ouvir)', en: '🗣️ See examples (click 🔊 to listen)' },
    'gram_ponte_label': { pt: '🇵🇹 Em português é assim… em inglês é assim:', en: '🇵🇹 In Portuguese it is like this... in English it is like this:' },
    'gram_card_clique': { pt: 'Clique para revelar 👆', en: 'Click to reveal 👆' },
    'gram_card_padrao': { pt: 'O Padrão:', en: 'The Pattern:' },

    // ── Tooltips — flashcard buttons ──
    'title_reverso':   { pt: 'Reverse: PT→EN', en: 'Reverse: PT→EN' },
    'title_contexto':  { pt: 'Context: sentence with blank', en: 'Context: sentence with blank' },
    'title_escuta':    { pt: 'Listening: guess from audio', en: 'Listening: guess from audio' },
    'title_dica':      { pt: 'Show hint (level 1)', en: 'Show hint (level 1)' },
    'title_favorito':  { pt: 'Add/remove from favorites', en: 'Add/remove from favorites' },
    'title_blur_pt':   { pt: 'Hides the Portuguese column to test your memory', en: 'Hides the Portuguese column to test your memory' },
    'title_blur_it':   { pt: 'Hides the English column to test your memory', en: 'Hides the English column to test your memory' },

    // ── Onboarding slide 3 ──
    'ob_slide3_li1': { pt: 'Vá para a aba de <strong>TEMPLOS</strong>', en: 'Go to the <strong>TEMPLES</strong> tab' },
    'ob_slide3_li2': { pt: 'Escolha o <strong>1º Templo (New York - The Foundations)</strong>', en: 'Choose the <strong>1st Temple (New York - The Foundations)</strong>' },
    'ob_slide3_li3': { pt: 'Estude usando os <strong>FLASHCARDS</strong>', en: 'Study using the <strong>FLASHCARDS</strong>' },
    'ob_slide3_li4': { pt: 'Pratique o que aprendeu respondendo os <strong>QUIZZES</strong>!', en: 'Practise what you learned by answering the <strong>QUIZZES</strong>!' },

    // ── Dialogues / Songs — create buttons ──
    'dial_btn_adicionar': { pt: '➕ Adicionar Diálogo', en: '➕ Add Dialogue' },
    'can_btn_adicionar':  { pt: '➕ Adicionar Música',  en: '➕ Add Song' },

    // ── Listen & Repeat — listen button ──
    'imit_btn_ouvir_exemplo': { pt: '🔊 Listen to Example', en: '🔊 Listen to Example' },

    // ── Tour ──
    'tour_next_btn': { pt: 'Próximo →', en: 'Next →' },
    'tour_prev_btn': { pt: '← Voltar', en: '← Back' },
    'tour_done_btn': { pt: '🎉 Vamos lá!', en: '🎉 Let\'s go!' },
    'tour_progress': { pt: '{{current}} de {{total}}', en: '{{current}} of {{total}}' },
    'tour_confirm_exit': { pt: 'Sair do tour?', en: 'Exit the tour?' },
    'tour_welcome_title': { pt: '👋 Bem-vindo ao English Autentico!', en: '👋 Welcome to English Autentico!' },
    'tour_welcome_desc': { pt: 'Este tour de 13 passos mostrará as principais funcionalidades do app. Leva menos de 2 minutos — vamos lá!', en: 'This 13-step tour shows you the main features. It takes less than 2 minutes — let\'s go!' },
    'tour_stats_title': { pt: '🏅 Nível, XP & Sequência', en: '🏅 Level, XP & Streak' },
    'tour_stats_desc': { pt: 'Cada atividade rende XP. Acumule XP para subir de nível e desbloquear novos templos. Mantenha sua sequência 🔥 ativa estudando todos os dias!', en: 'Every activity earns XP. Accumulate enough and your level rises, unlocking new temples. Keep your 🔥 streak alive by studying every day!' },
    'tour_templi_title': { pt: '🏛️ Templos (Sua Jornada)', en: '🏛️ Temples — Your Vocabulary Packs' },
    'tour_templi_desc': { pt: 'Cada templo contém cerca de 20 palavras de uma cidade de língua inglesa. Comece pelo Templo 1 (New York). Novos templos se desbloqueiam ao subir de nível.', en: 'Each temple is a set of ~20 words from an English-speaking city. Start with Temple 1 (New York). New temples unlock as your level grows.' },
    'tour_goal_title': { pt: '🎯 Defina uma Meta com Prazo', en: '🎯 Set a Goal with a Deadline' },
    'tour_goal_desc': { pt: 'Escolha um nível alvo e uma data limite. O app calcula quantos XP por dia você precisa e mostra seu progresso no topo.', en: 'Pick a target level and a deadline date. The app calculates how many XP per day you need and shows your daily progress bar at the top.' },
    'tour_flashcard_title': { pt: '🃏 Flashcards Inteligentes (FSRS)', en: '🃏 Smart Flashcards (FSRS)' },
    'tour_flashcard_desc': { pt: 'Selecione um templo e estude usando repetição espaçada. O algoritmo FSRS-4.5 agenda cada palavra para você revisar exatamente antes de esquecer.', en: 'Select a temple and study its words with Spaced Repetition. The FSRS-4.5 algorithm schedules each word so you review it just before you would forget it.' },
    'tour_modes_title': { pt: '🔄 Quatro Modos de Estudo', en: '🔄 Four Study Modes' },
    'tour_modes_desc': { pt: 'Normal (EN→PT) · Reverso (PT→EN) · Contexto (lacunas) · Escuta (áudio). Mude de modo para desenvolver todas as habilidades!', en: 'Normal (EN→PT) · Reverse (PT→EN) · Context (fill the gap) · Listen (guess from audio). Switch modes to build all-round mastery!' },
    'tour_rate_title': { pt: '⭐ Avalie com Honestidade', en: '⭐ Rate Every Card Honestly' },
    'tour_rate_desc': { pt: 'Errei = amanhã · Difícil = 1 dia · Bom = 3 dias · Fácil = 2 semanas. O algoritmo se ajusta com base na sua resposta — a honestidade traz os melhores resultados!', en: 'Again = tomorrow · Hard = 1 day · Good = 3 days · Easy = 2 weeks. The algorithm adjusts future intervals based on your answer — honesty beats the system!' },
    'tour_quiz_title': { pt: '❓ Quiz — 4 Tipos de Exercícios', en: '❓ Quiz — 4 Exercise Types' },
    'tour_quiz_desc': { pt: 'Vocabulário, gramática, escuta e conjugação. Conclua quizzes para ganhar bônus de XP e fixar o conteúdo!', en: 'Vocabulary, Grammar, Listening and Spelling. Complete a quiz to unlock the next temple and earn bonus XP!' },
    'tour_grammatica_title': { pt: '📚 Gramática — A1 ao B2', en: '📚 Grammar — A1 to B2' },
    'tour_grammatica_desc': { pt: '90 lições do iniciante ao intermediário superior. Cada lição tem alertas práticos, explicações dos cards, exemplos e exercícios.', en: '90 lessons from beginner to upper-intermediate. Each lesson has theory cards, examples, common traps and exercises — all in English.' },
    'tour_vocabolario_title': { pt: '📖 Vocabulário — Auto-Teste', en: '📖 Vocabulary — Self-Test Mode' },
    'tour_vocabolario_desc': { pt: 'Toque em "Ocultar EN" ou "Ocultar PT" para testar sua memória. Filtre por templo ou categoria e ouça a pronúncia de qualquer palavra.', en: 'Tap \'Hide EN\' or \'Hide PT\' to cover a column and test yourself. Filter by temple or category and click any word to hear it.' },
    'tour_reading_title': { pt: '📜 Leituras — Textos Autênticos', en: '📜 Reading — Authentic Texts' },
    'tour_reading_desc': { pt: 'Histórias reais em inglês do nível A1 ao B2. Toque em qualquer palavra para ver a tradução. Use o Modo Imersão para ocultar a tradução em português!', en: 'Real English stories at A1–B2 level. Tap any word to see its translation. Use Immersion Mode to hide the Portuguese and challenge yourself!' },
    'tour_dialoghi_title': { pt: '💬 Diálogos — Situações Reais', en: '💬 Dialogues — Real Conversations' },
    'tour_dialoghi_desc': { pt: 'Pratique diálogos do dia a dia (café, aeroporto, entrevista). Ouça, leia e responda — ou crie os seus próprios diálogos usando Inteligência Artificial!', en: 'Practise everyday English scenarios: coffee shops, airports, job interviews. Listen, read and respond — or import your own via the 🤖 AI button!' },
    'tour_canzoni_title': { pt: '🎵 Músicas — Aprenda Cantando', en: '🎵 Songs — Learn with Music' },
    'tour_canzoni_desc': { pt: 'Acompanhe as letras e preencha as lacunas das músicas. Adicione suas músicas favoritas com o importador de IA. A música ajuda a fixar o vocabulário!', en: 'Follow English song lyrics and fill in the missing words. Add any song with the 🤖 AI Import button. Music makes vocabulary stick!' },
    'tour_config_title': { pt: '⚙️ Configurações & Perfil', en: '⚙️ Settings & Profile' },
    'tour_config_desc': { pt: 'Mude para o modo escuro, silencie sons e acesse as opções de Perfil no topo da tela.', en: 'Switch to dark mode, mute sounds and access Profile options at the top of the screen.' },

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
    'gram_todos_modulos':    { pt: '‹ Todos os módulos',             en: '‹ Todos os módulos' },
    'gram_confirmar_sair':   { pt: 'Tem certeza? O progresso nesta lição será perdido.', en: 'Tem certeza? O progresso nesta lição será perdido.' },
    'gram_exercicio_de':     { pt: 'Exercício {a} / {b}',            en: 'Exercício {a} / {b}' },
    'gram_verificar':        { pt: '✔ Verificar',                    en: '✔ Verificar' },
    'gram_revelar_resp':     { pt: 'Revelar resposta',               en: 'Revelar resposta' },
    'gram_ocultar':          { pt: 'Ocultar',                        en: 'Ocultar' },
    'gram_clique_revelar':   { pt: '👆 Toque em cada palavra para revelar a resposta uma a uma.', en: '👆 Tap each word to reveal the answer one by one.' },
    'gram_continue':         { pt: 'Continue estudando — você consegue!', en: 'Continue estudando — você consegue!' },
    'gram_perfeito':         { pt: 'Perfeito! Sem erros!',            en: 'Perfeito! Sem erros!' },
    'gram_otimo':            { pt: 'Ótimo trabalho! Quase perfeito!', en: 'Ótimo trabalho! Quase perfeito!' },
    'gram_bom_resultado':    { pt: 'Bom! Continue assim!',            en: 'Bom! Continue assim!' },
    'gram_proximo_cap':      { pt: 'Próximo capítulo →',              en: 'Próximo capítulo →' },
    'gram_capitulo_completo':{ pt: 'Capítulo Concluído!',             en: 'Capítulo Concluído!' },
    'gram_pct_correto':      { pt: '{a}% correto',                    en: '{a}% correto' },
    'gram_bonus_xp':         { pt: '+{a} XP bônus 🏆',               en: '+{a} XP bônus 🏆' },
    'gram_badge_reveal':     { pt: '👁️ Revelar',                     en: '👁️ Revelar' },
    'gram_badge_type':       { pt: '⌨️ Digitar',                     en: '⌨️ Digitar' },
    'gram_badge_choose':     { pt: '🔘 Escolher',                    en: '🔘 Escolher' },
    'gram_aba_estudo':       { pt: 'Estudo & Teoria',                en: 'Study & Theory' },
    'gram_aba_pratica':      { pt: 'Exercícios & Prática',           en: 'Practice & Exercises' },
    'gram_card_teoria_titulo':{ pt: 'Teoria e Prática da Lição',       en: 'Lesson Theory & Practice' },
    'gram_btn_iniciar_pratica':{ pt: 'Praticar agora (Exercícios) 🚀', en: 'Practice now (Exercises) 🚀' },

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
    'sec_canzoni_titulo':    { pt: 'Modo Música',                    en: 'Song Mode' },
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
    'storage_limite_fc':     { pt: 'Limite de armazenamento! Não é possível salvar novos flashcards. Executando limpeza automática...', en: 'Storage Limit Reached! Cannot save new flashcards. Running auto-cleanup of oldest inactive cards...' },

    // ── Sons / Audio ──
    'btn_som_ativo_title':    { pt: 'Sons: ativados (clique para desligar)', en: 'Sounds: On (click to mute)' },
    'btn_som_desativo_title': { pt: 'Sons: desativados (clique para ligar)', en: 'Sounds: Off (click to unmute)' },

    // ── Dialoghi ──
    'dial_search_placeholder': { pt: '🔍 Buscar...', en: '🔍 Search...' },
    'dial_select_level':       { pt: '🎯 Nível', en: '🎯 Level' },
    'dial_no_results':         { pt: 'Nenhum resultado.', en: 'No results.' },
    'dial_no_dialogues':       { pt: 'Nenhum diálogo ainda.', en: 'No dialogues yet.' },
    'dial_new_dialogue':       { pt: 'Novo Diálogo', en: 'New Dialogue' },
    'dial_edit_dialogue':      { pt: 'Editar Diálogo', en: 'Edit Dialogue' },
    'dial_form_title':         { pt: 'Título *', en: 'Title *' },
    'dial_form_level':         { pt: 'Nível', en: 'Level' },
    'dial_form_icon':          { pt: 'Ícone', en: 'Icon' },
    'dial_form_context':       { pt: 'Contexto (descrição da situação)', en: 'Context (situation description)' },
    'dial_form_context_placeholder': { pt: 'Ex: Você entra em um café para pedir uma bebida.', en: 'Ex: You walk into a coffee shop to order a drink.' },
    'dial_form_turns':         { pt: '💬 Turnos do Diálogo', en: '💬 Dialogue Turns' },
    'dial_form_tip_body':      { pt: '💡 <strong>Tipo "Fala de Personagem":</strong> o personagem fala (o usuário apenas lê/ouve).<br>💡 <strong>Tipo "Resposta do Usuário":</strong> o usuário escolhe entre 4 opções — preencha as 4 alternativas e marque a correta.', en: '💡 <strong>Type "Character Line":</strong> the character speaks (the user just reads/listens).<br>💡 <strong>Type "User Response":</strong> the user chooses from 4 options — fill in all 4 alternatives and mark the correct one.' },
    'dial_form_add_character': { pt: '➕ Adicionar Fala de Personagem', en: '➕ Add Character Line' },
    'dial_form_add_user':      { pt: '➕ Adicionar Resposta do Usuário', en: '➕ Add User Response' },
    'dial_form_save':          { pt: '💾 Salvar Diálogo', en: '💾 Save Dialogue' },
    'dial_form_character_line':{ pt: '🗣️ Fala de Personagem', en: '🗣️ Character Line' },
    'dial_form_user_response': { pt: '👤 Resposta do Usuário', en: '👤 User Response' },
    'dial_form_char_name':     { pt: 'Nome do personagem', en: 'Character name' },
    'dial_form_ipa':           { pt: 'IPA (opcional)', en: 'IPA (optional)' },
    'dial_form_eng_phrase':    { pt: 'Frase em inglês *', en: 'English phrase *' },
    'dial_form_pt_translation':{ pt: 'Tradução em português', en: 'Portuguese translation' },
    'dial_form_correct_eng_phrase': { pt: 'Frase em inglês correta *', en: 'Correct English phrase *' },
    'dial_form_alternatives_title': { pt: '4 Alternativas (marque a correta):', en: '4 Alternatives (mark the correct one):' },
    'dial_form_alt_placeholder': { pt: 'Alternativa {n}', en: 'Alternative {n}' },
    'dial_form_alt_correct':   { pt: ' (correta)', en: ' (correct)' },
    'dial_practise_btn':       { pt: 'Praticar Diálogo ✍️', en: 'Practise Dialogue ✍️' },
    'dial_your_turn':          { pt: 'Sua vez de falar. Escolha a melhor resposta:', en: 'Your turn to speak. Choose the best response:' },
    'dial_continue':           { pt: 'Continuar', en: 'Continue' },
    'dial_back':               { pt: '‹ Voltar', en: '‹ Back' },
    'dial_my_badge':           { pt: 'Meu', en: 'Mine' },

    // ── Canzoni ──
    'can_form_song_audio':     { pt: '🎵 Áudio da música (opcional)', en: '🎵 Song audio (optional)' },
    'can_form_remove_audio':   { pt: '🗑️ Remover áudio', en: '🗑️ Remove audio' },
    'can_form_build_prompt':   { pt: '🤖 Gerar Prompt da IA (com exercícios)', en: '🤖 Build AI Prompt (with exercises)' },
    'can_form_mode_parts_desc':{ pt: '💡 <strong>Modo 4 Partes:</strong> Para músicas longas, envie um prompt por conversa separada no Gemini. Cole o JSON de cada parte nas abas abaixo, depois clique em <strong>✅ Unir e Importar</strong>.', en: '💡 <strong>4-Part Mode:</strong> For long songs, send one prompt per separate conversation in Gemini. Paste the JSON of each part in the tabs below, then click <strong>✅ Merge and Import</strong>.' },
    'can_form_part':           { pt: 'Parte {n}', en: 'Part {n}' },
    'can_form_part_desc':      { pt: 'Prompt da Parte {n} — envie separadamente ao Gemini:', en: 'Prompt for Part {n} — send separately to Gemini:' },
    'can_my_badge':            { pt: 'Minha', en: 'Mine' },

    // ── Storie ──
    'storie_back':             { pt: '‹ Leituras', en: '‹ Reading' },
    'storie_hide_trans':       { pt: '👁️ Ocultar tradução', en: '👁️ Hide translation' },
    'storie_show_trans':       { pt: '👁️ Mostrar tradução', en: '👁️ Show translation' },
    'storie_listen_all':       { pt: '🔊 Ouvir tudo', en: '🔊 Listen to all' },
    'storie_fine':             { pt: 'Fim', en: 'Fine' },
    'storie_already_saved':    { pt: '✅ Já salvo', en: '✅ Already saved' },
    'storie_save_review':      { pt: '⭐ Salvar para revisão', en: '⭐ Save for review' },
    'storie_remove':           { pt: '🗑️ Remover', en: '🗑️ Remove' },
    'storie_all_btn':          { pt: '‹ Todas as histórias', en: '‹ All stories' },
    'storie_riletta':          { pt: '✓ Relida', en: '✓ Re-read' },
    'storie_ho_finito':        { pt: '✓ Concluir (+{xp} XP)', en: '✓ Finished (+{xp} XP)' },

    // ── Imitazione ──
    'imit_phrase_indicator':   { pt: 'Frase {a} de {b}', en: 'Phrase {a} of {b}' },
    'imit_remove_btn':         { pt: '🗑️ Remover', en: '🗑️ Remove' },
    'imit_phonetic_hint':      { pt: 'Dica Fonética', en: 'Phonetic Hint' },
    'imit_mic_start':          { pt: 'Clique no microfone para falar', en: 'Click on the microphone to speak' },
    'imit_mic_listening':      { pt: 'Ouvindo... Fale agora!', en: 'Listening... Speak now!' },
    'imit_mic_processing':     { pt: 'Processando...', en: 'Processing...' },
    'imit_perfect':            { pt: 'Perfeito! 🌟', en: 'Perfect! 🌟' },
    'imit_almost':             { pt: 'Quase! 👍', en: 'Almost! 👍' },
    'imit_try_again':          { pt: 'Tente novamente! 🔄', en: 'Try again! 🔄' },
    'imit_excellent':          { pt: 'Excelente!', en: 'Excellent!' },
    'imit_completed_desc':     { pt: 'Você completou todas as {n} frases!', en: 'You completed all {n} phrases!' },
    'imit_repeat':             { pt: '🔄 Repetir', en: '🔄 Repeat' },
    'imit_return_home':        { pt: 'Voltar ao Início', en: 'Return to Home' },

    // ── Vocab ──
    'vocab_mastered':          { pt: 'Dominada', en: 'Mastered' },
    'vocab_learning':          { pt: 'Em aprendizado', en: 'Learning' },
    'vocab_new':               { pt: 'Nova', en: 'New' },
    'vocab_click_listen':      { pt: 'Clique para ouvir', en: 'Click to listen' },
    'vocab_parole_filtro':     { pt: '🃏 {n} palavras do filtro ativo', en: '🃏 {n} words from active filter' },

    // ── Quiz ──
    'quiz_what_does_mean':     { pt: 'O que significa "{w}"?', en: 'What does "{w}" mean?' },
    'quiz_means_example':      { pt: '"{w}" significa "{t}". Exemplo: {e}', en: '"{w}" means "{t}". Example: {e}' },
    'quiz_means_simple':       { pt: '"{w}" significa "{t}".', en: '"{w}" means "{t}".' },
    'quiz_what_was_said':      { pt: 'Qual foi a palavra dita? ({p})', en: 'Which word was said? ({p})' },
    'quiz_was_said_exp':       { pt: 'A palavra dita foi "{w}".', en: 'The word said was "{w}".' },
    'quiz_sentence_complete_exp': { pt: 'A frase completa é: "{s}"', en: 'The complete sentence is: "{s}"' },
    'quiz_mixed_title':        { pt: '🌍 Quiz Misto<br><small>Todos os templos</small>', en: '🌍 Mixed Quiz<br><small>All temples combined</small>' },

    // ── Quiz Types & Extra Keys ──
    'quiz_tipo_vocabulario':   { pt: 'Vocabulário', en: 'Vocabulary' },
    'quiz_tipo_morfologia':    { pt: 'Morfologia', en: 'Morphology' },
    'quiz_tipo_listening':     { pt: 'Escuta', en: 'Listening' },
    'quiz_tipo_gramática':     { pt: 'Gramática', en: 'Grammar' },
    'quiz_tipo_conjugação':    { pt: 'Conjugação', en: 'Conjugation' },
    'quiz_resume_notif':       { pt: '↩️ Retomando da pergunta {n}', en: '↩️ Resuming from question {n}' },

    // ── Profile custom content description ──
    'prof_conteudo_criado_desc': { pt: 'Músicas, diálogos, histórias, imitações e vocabulário adicionados manualmente ou via IA.', en: 'Songs, dialogues, stories, listen phrases, and vocabulary added manually or via AI.' },

    // ── Stories Extra Keys ──
    'storie_filter_all':       { pt: 'Todas', en: 'All' },
    'storie_search_placeholder': { pt: '🔍 Título ou autor...', en: '🔍 Title or author...' },
    'storie_no_stories':       { pt: 'Nenhuma história ainda.', en: 'No stories yet.' },
    'storie_no_results':       { pt: 'Nenhum resultado.', en: 'No results.' },

    // ── Onboarding Extra Keys ──
    'ob_welcome_title':        { pt: 'Bem-vindo!', en: 'Welcome!' },
    'ob_inside_title':         { pt: 'O que há dentro', en: 'What\'s Inside' },
    'ob_start_title':          { pt: 'Por onde começar?', en: 'Where to Start?' },
    'ob_tour_hint':            { pt: '💡 Toque em <strong>❓</strong> no topo a qualquer momento para rever o tour interativo do app!', en: '💡 Tap <strong>❓</strong> at the top at any time to replay the interactive app tour!' },
    'ob_prev_btn':             { pt: 'Voltar', en: 'Back' },
    'ob_inside_li1':           { pt: '🏛️ <strong>Templos:</strong> Acompanhe seu progresso por cidades de língua inglesa.', en: '🏛️ <strong>Temples:</strong> Track your progress across English-speaking cities.' },
    'ob_inside_li2':           { pt: '🃏 <strong>Flashcards:</strong> Memorize palavras com o algoritmo FSRS-4.5.', en: '🃏 <strong>Flashcards:</strong> Memorise words with the FSRS-4.5 algorithm.' },
    'ob_inside_li3':           { pt: '🎯 <strong>Quiz:</strong> Teste seus conhecimentos e ganhe XP.', en: '🎯 <strong>Quiz:</strong> Test your knowledge and earn XP.' },
    'ob_inside_li4':           { pt: '📖 <strong>Vocabulário:</strong> Tradução, pronúncia IPA e exemplos.', en: '📖 <strong>Vocabulary:</strong> Translation, IPA pronunciation and examples.' },
    'ob_inside_li5':           { pt: '📚 <strong>Gramática:</strong> Lições do nível A1 ao B2.', en: '📚 <strong>Grammar:</strong> Lessons from A1 to B2.' },
    'ob_inside_li6':           { pt: '📜 <strong>Leituras:</strong> Leia textos autênticos em modo imersão.', en: '📜 <strong>Reading:</strong> Read authentic texts in immersion mode.' },
    'ob_inside_li7':           { pt: '💬 <strong>Diálogos:</strong> Pratique conversas reais do dia a dia.', en: '💬 <strong>Dialogues:</strong> Practise real everyday conversations.' },
    'ob_inside_li8':           { pt: '🎵 <strong>Músicas:</strong> Aprenda com músicas em inglês.', en: '🎵 <strong>Songs:</strong> Learn with English songs.' },
    'ob_inside_li9':           { pt: '🎤 <strong>Ouvir e Repetir:</strong> Treine sua pronúncia.', en: '🎤 <strong>Listen &amp; Repeat:</strong> Train your pronunciation.' },

    // ── Progression / Level Up ──
    'lv_levelup_label':        { pt: 'Subiu de Nível! 🎉', en: 'Level Up! 🎉' },
    'lv_levelup_btn':          { pt: 'Vamos lá! →', en: 'Let\'s go! →' },
    'lv_levelup_notif':        { pt: '🎉 Nível {n}! Continue assim!', en: '🎉 Level {n}! Keep it up!' },
    'lvl_name_1':              { pt: 'Principiante', en: 'Beginner' },
    'lvl_name_2':              { pt: 'Explorador', en: 'Explorer' },
    'lvl_name_3':              { pt: 'Aventureiro', en: 'Adventurer' },
    'lvl_name_5':              { pt: 'Estudante', en: 'Student' },
    'lvl_name_7':              { pt: 'Intermediário', en: 'Intermediate' },
    'lvl_name_10':             { pt: 'Avançado', en: 'Advanced' },
    'lvl_name_13':             { pt: 'Especialista', en: 'Expert' },
    'lvl_name_16':             { pt: 'Avançado Plus', en: 'Advanced Plus' },
    'lvl_name_19':             { pt: 'Mestre', en: 'Master' },
    'lvl_name_20':             { pt: 'Grão-Mestre', en: 'Grand Master' },

    // ── Achievements ──
    'ach_unlocked_title':      { pt: '🏆 Conquista desbloqueada!', en: '🏆 Achievement unlocked!' },

    // ── Stats ──
    'stats_level':             { pt: 'Nível {n}', en: 'Level {n}' },
    'stats_temples':           { pt: 'Templos: {a}/{b}', en: 'Temples: {a}/{b}' },
    'stats_words':             { pt: 'Palavras: {n}', en: 'Words: {n}' },

    // ── General ──
    'loading_text':            { pt: 'Carregando...', en: 'Loading...' },
    'quiz_result_title':       { pt: 'Resultado do Quiz', en: 'Quiz Results' },
    'templi_secao_titulo':     { pt: 'Os Dez Templos do Inglês', en: 'The Ten Temples of English' },
    'vocab_search_placeholder': { pt: '🔍 Buscar em inglês ou português...', en: '🔍 Search in English or Portuguese...' },
    'prof_secao_titulo':       { pt: 'Meu Perfil', en: 'My Profile' }
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

    // Traduz atributo placeholder (data-i18n-placeholder)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const chave = el.getAttribute('data-i18n-placeholder');
      if (this.dict[chave]) el.placeholder = this.dict[chave][this.idioma] || this.dict[chave]['pt'];
    });

    // Onboarding slide 2 — contém HTML (negrito), usa innerHTML
    for (let i = 1; i <= 9; i++) {
      const el = document.getElementById(`onb-inside-li${i}`);
      const key = `ob_inside_li${i}`;
      if (el && this.dict[key]) el.innerHTML = this.dict[key][this.idioma] || this.dict[key]['pt'];
    }

    // Onboarding slide 3 — contém HTML (negrito), usa innerHTML
    ['onb-li1','onb-li2','onb-li3','onb-li4'].forEach((id, i) => {
      const el = document.getElementById(id);
      const key = `ob_slide3_li${i+1}`;
      if (el && this.dict[key]) el.innerHTML = this.dict[key][this.idioma] || this.dict[key]['pt'];
    });

    // Onboarding tour hint
    const hintEl = document.getElementById('onb-tour-hint');
    if (hintEl && this.dict['ob_tour_hint']) hintEl.innerHTML = this.dict['ob_tour_hint'][this.idioma] || this.dict['ob_tour_hint']['pt'];

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



