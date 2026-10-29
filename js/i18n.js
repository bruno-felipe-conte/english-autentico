// ============================================================
// js/i18n.js — Decoupled Internationalization Architecture (i18n)
// Supports external JSON files (data/locales/pt-BR.json, en-US.json)
// with Stale-While-Revalidate caching in localStorage + synchronous fallback
// ============================================================

const I18n = {
  _language: 'pt',
  get language() { return this._language; },
  set language(val) { this._language = val; },
  get idioma() { return this._language; },
  set idioma(val) { this._language = val; },

  localesMap: {
    pt: 'data/locales/pt-BR.json',
    en: 'data/locales/en-US.json'
  },

  // Base synchronous in-memory dictionary
  dict: {
  "ach_duro": {
    "pt": "Marque \"De Novo\" 50 vezes — a persistência compensa",
    "en": "Mark \"Again\" 50 times — persistence pays off"
  },
  "ach_duro_name": {
    "pt": "Persistente!",
    "en": "Persistent!"
  },
  "ach_english_autentico": {
    "pt": "Alcance o Nível 10",
    "en": "Reach Level 10"
  },
  "ach_english_autentico_name": {
    "pt": "English Autentico",
    "en": "English Autentico"
  },
  "ach_esploratore": {
    "pt": "Desbloqueie 5 templos",
    "en": "Unlock 5 temples"
  },
  "ach_esploratore_name": {
    "pt": "Explorador",
    "en": "Explorer"
  },
  "ach_fsrs_bullseye": {
    "pt": "Acerte 10 cartas de primeira!",
    "en": "Get 10 cards right on the first try!"
  },
  "ach_fsrs_bullseye_name": {
    "pt": "🎯 Bullseye",
    "en": "🎯 Bullseye"
  },
  "ach_fsrs_good_listener": {
    "pt": "Complete 10 sessões no Modo Escuta.",
    "en": "Complete 10 sessions in Listen Mode."
  },
  "ach_fsrs_good_listener_name": {
    "pt": "🎧 Good Listener",
    "en": "🎧 Good Listener"
  },
  "ach_fsrs_memory_master": {
    "pt": "Alcance >95% de retenção em 25 cartas.",
    "en": "Reach >95% retention on 25 cards."
  },
  "ach_fsrs_memory_master_name": {
    "pt": "🧠 Memory Master",
    "en": "🧠 Memory Master"
  },
  "ach_fsrs_temple": {
    "pt": "Domine um Templo (Retenção > 90%).",
    "en": "Master a Temple (Retention > 90%)."
  },
  "ach_fsrs_temple_name": {
    "pt": "🏛️ Temple Master",
    "en": "🏛️ Temple Master"
  },
  "ach_grammatico": {
    "pt": "Conclua 10 lições de gramática",
    "en": "Complete 10 grammar lessons"
  },
  "ach_grammatico_name": {
    "pt": "Gramático",
    "en": "Grammarian"
  },
  "ach_inprogress_section": {
    "pt": "🔒 Em progresso",
    "en": "🔒 In progress"
  },
  "ach_italiano_autentico": {
    "pt": "Atingir o Livello 10",
    "en": "Atingir o Livello 10"
  },
  "ach_maestro": {
    "pt": "Revise 500 flashcards",
    "en": "Review 500 flashcards"
  },
  "ach_maestro_name": {
    "pt": "Mestre",
    "en": "Master"
  },
  "ach_mattiniero": {
    "pt": "Estude antes das 7h",
    "en": "Study before 7 AM"
  },
  "ach_mattiniero_name": {
    "pt": "Madrugador",
    "en": "Early Bird"
  },
  "ach_notturno": {
    "pt": "Estude após as 22h",
    "en": "Study after 10 PM"
  },
  "ach_notturno_name": {
    "pt": "Coruja da Noite",
    "en": "Night Owl"
  },
  "ach_precisione": {
    "pt": "5 quizzes seguidos com mais de 80% de acertos",
    "en": "5 quizzes in a row with over 80% correct"
  },
  "ach_precisione_name": {
    "pt": "Precisão",
    "en": "Precision"
  },
  "ach_primeiro_passo": {
    "pt": "Conclua seu primeiro flashcard",
    "en": "Complete your first flashcard"
  },
  "ach_primeiro_passo_name": {
    "pt": "Primeiro Passo",
    "en": "First Step"
  },
  "ach_primo_tempio": {
    "pt": "Conclua os flashcards do Templo 1",
    "en": "Complete Temple 1 flashcards"
  },
  "ach_primo_tempio_name": {
    "pt": "Primeiro Templo",
    "en": "First Temple"
  },
  "ach_quiz_perfetto": {
    "pt": "10/10 respostas corretas em um quiz",
    "en": "10/10 correct answers in a quiz"
  },
  "ach_quiz_perfetto_name": {
    "pt": "Quiz Perfeito",
    "en": "Perfect Quiz"
  },
  "ach_studioso": {
    "pt": "Revise 100 flashcards",
    "en": "Review 100 flashcards"
  },
  "ach_studioso_name": {
    "pt": "Estudioso",
    "en": "Scholar"
  },
  "ach_um_mes": {
    "pt": "30 dias consecutivos de estudo",
    "en": "30 consecutive days of study"
  },
  "ach_um_mes_name": {
    "pt": "Um Mês",
    "en": "One Month"
  },
  "ach_uma_semana": {
    "pt": "7 dias consecutivos de estudo",
    "en": "7 consecutive days of study"
  },
  "ach_uma_semana_name": {
    "pt": "Uma Semana",
    "en": "One Week"
  },
  "ach_unlocked_section": {
    "pt": "✅ Desbloqueadas",
    "en": "✅ Unlocked"
  },
  "ach_unlocked_title": {
    "pt": "🏆 Conquista desbloqueada!",
    "en": "🏆 Achievement unlocked!"
  },
  "ach_vocabulario": {
    "pt": "Domine 50 palavras (3+ revisões)",
    "en": "Master 50 words (3+ reviews)"
  },
  "ach_vocabulario_name": {
    "pt": "Vocabulário Rico",
    "en": "Rich Vocabulary"
  },
  "btn_add_dialogo": {
    "pt": "➕ Adicionar Diálogo",
    "en": "➕ Add Dialogue"
  },
  "btn_add_song": {
    "pt": "➕ Adicionar Música",
    "en": "➕ Add Song"
  },
  "btn_cancelar": {
    "pt": "Cancelar",
    "en": "Cancel"
  },
  "btn_continuar": {
    "pt": "Continuar de Onde Parou",
    "en": "Continue Where You Left Off"
  },
  "btn_fechar": {
    "pt": "Fechar",
    "en": "Close"
  },
  "btn_pular_tudo": {
    "pt": "Pular Tudo ✕",
    "en": "Skip All ✕"
  },
  "btn_salvar": {
    "pt": "Salvar",
    "en": "Save"
  },
  "btn_som_ativo_title": {
    "pt": "Sons: ativados (clique para desligar)",
    "en": "Sounds: On (click to mute)"
  },
  "btn_som_desativo_title": {
    "pt": "Sons: desativados (clique para ligar)",
    "en": "Sounds: Off (click to unmute)"
  },
  "btn_via_ia": {
    "pt": "🤖 via IA",
    "en": "🤖 via IA"
  },
  "can_badge_minha": {
    "pt": "Minha",
    "en": "Minha"
  },
  "can_btn_adicionar": {
    "pt": "➕ Adicionar Música",
    "en": "➕ Add Song"
  },
  "can_btn_catalogo": {
    "pt": "← Catálogo de Músicas",
    "en": "← Catálogo de Músicas"
  },
  "can_btn_cloze_studio": {
    "pt": "🎙️ Áudio + Sincronia IA",
    "en": "Audio + AI Sync"
  },
  "can_btn_ia": {
    "pt": "🤖 via IA",
    "en": "Add via AI"
  },
  "can_btn_jogar_novamente": {
    "pt": "↻ Jogar novamente",
    "en": "↻ Jogar novamente"
  },
  "can_btn_ouvir_karaoke": {
    "pt": "🎤 Ouvir no Karaokê",
    "en": "🎤 Ouvir no Karaokê"
  },
  "can_btn_ouvir_verso": {
    "pt": "▶ Ouvir Verso",
    "en": "▶ Ouvir Verso"
  },
  "can_btn_pausar_audio": {
    "pt": "⏸ Pausar Áudio",
    "en": "⏸ Pausar Áudio"
  },
  "can_btn_yt": {
    "pt": "▶️ YouTube",
    "en": "▶️ YouTube"
  },
  "can_busca_ph": {
    "pt": "🔍 Título ou artista...",
    "en": "Search title or artist..."
  },
  "can_busca_placeholder": {
    "pt": "🔍 Título ou artista...",
    "en": "🔍 Title or artist..."
  },
  "can_cloze_anexar_audio": {
    "pt": "🎵 Anexar Áudio Local (.mp3)",
    "en": "🎵 Anexar Áudio Local (.mp3)"
  },
  "can_cloze_audio_carregado": {
    "pt": "Áudio pronto",
    "en": "Áudio pronto"
  },
  "can_cloze_concluido": {
    "pt": "🎉 Treino Cloze Concluído!",
    "en": "🎉 Treino Cloze Concluído!"
  },
  "can_cloze_densidade": {
    "pt": "Densidade de lacunas",
    "en": "Densidade de lacunas"
  },
  "can_cloze_iniciar": {
    "pt": "🚀 Iniciar Lyrics Cloze Player",
    "en": "🚀 Iniciar Lyrics Cloze Player"
  },
  "can_cloze_letra_desc": {
    "pt": "Cole o JSON gerado pelo Google Gemini com array de palavras contendo w, t e blank.",
    "en": "Cole o JSON gerado pelo Google Gemini com array de palavras contendo w, t e blank."
  },
  "can_cloze_letra_label": {
    "pt": "📝 Transcrição JSON com Timestamps por Palavra",
    "en": "📝 Transcrição JSON com Timestamps por Palavra"
  },
  "can_cloze_precisao": {
    "pt": "Precisão de 1ª tentativa",
    "en": "Precisão de 1ª tentativa"
  },
  "can_cloze_studio_title": {
    "pt": "Cloze Studio — Sincronização por Palavra com IA",
    "en": "Cloze Studio — Sincronização por Palavra com IA"
  },
  "can_cloze_upload_audio": {
    "pt": "📁 Arquivo de Áudio (.mp3, .wav, .ogg)",
    "en": "📁 Arquivo de Áudio (.mp3, .wav, .ogg)"
  },
  "can_cloze_upload_desc": {
    "pt": "Importe o áudio local para sincronização palavra por palavra e treino Cloze.",
    "en": "Importe o áudio local para sincronização palavra por palavra e treino Cloze."
  },
  "can_cloze_waiting_msg": {
    "pt": "⏸️ Música pausada na lacuna — selecione a palavra correta abaixo:",
    "en": "⏸️ Música pausada na lacuna — selecione a palavra correta abaixo:"
  },
  "can_cloze_wordbank_label": {
    "pt": "🎹 Banco de Palavras — antecipe ou complete na pausa:",
    "en": "🎹 Banco de Palavras — antecipe ou complete na pausa:"
  },
  "can_corretas": {
    "pt": "{a}/{b} correct",
    "en": "{a}/{b} correct"
  },
  "can_dica_label": {
    "pt": "💡 Dica:",
    "en": "💡 Dica:"
  },
  "can_editar_musica": {
    "pt": "Editar Música",
    "en": "Edit Song"
  },
  "can_escolha_palavra": {
    "pt": "Escolha a palavra",
    "en": "Choose the word"
  },
  "can_excluir_confirm": {
    "pt": "Delete \"{t}\"?",
    "en": "Delete \"{t}\"?"
  },
  "can_filtro_adicionadas": {
    "pt": "🤖 Adicionadas",
    "en": "Custom Added"
  },
  "can_filtro_classicos": {
    "pt": "📚 Clássicos em Inglês",
    "en": "Classics"
  },
  "can_btn_add_flashcards": {
    "pt": "📚 Adicionar vocabulário aos Flashcards",
    "en": "📚 Add vocabulary to Flashcards"
  },
  "can_flashcards_adicionados": {
    "pt": "Vocabulário da música adicionado aos Flashcards!",
    "en": "Song vocabulary added to Flashcards!"
  },
  "can_filtro_nivel": {
    "pt": "🎯 Nível",
    "en": "Level"
  },
  "can_filtro_todas": {
    "pt": "Todas",
    "en": "All"
  },
  "can_form_build_prompt": {
    "pt": "🤖 Gerar Prompt da IA (com exercícios)",
    "en": "🤖 Build AI Prompt (with exercises)"
  },
  "can_form_mode_parts_desc": {
    "pt": "💡 <strong>Modo 4 Partes:</strong> Para músicas longas, envie um prompt por conversa separada no Gemini. Cole o JSON de cada parte nas abas abaixo, depois clique em <strong>✅ Unir e Importar</strong>.",
    "en": "💡 <strong>4-Part Mode:</strong> For long songs, send one prompt per separate conversation in Gemini. Paste the JSON of each part in the tabs below, then click <strong>✅ Merge and Import</strong>."
  },
  "can_form_part": {
    "pt": "Parte {n}",
    "en": "Part {n}"
  },
  "can_form_part_desc": {
    "pt": "Prompt da Parte {n} — envie separadamente ao Gemini:",
    "en": "Prompt for Part {n} — send separately to Gemini:"
  },
  "can_form_remove_audio": {
    "pt": "🗑️ Remover áudio",
    "en": "🗑️ Remove audio"
  },
  "can_form_song_audio": {
    "pt": "🎵 Áudio da música (opcional)",
    "en": "🎵 Song audio (optional)"
  },
  "can_ia_cole_json": {
    "pt": "Cole o JSON gerado pela IA primeiro",
    "en": "Paste the AI-generated JSON first"
  },
  "can_ia_importados": {
    "pt": "{n} versos importados com sucesso",
    "en": "{n} verses imported from AI result"
  },
  "can_ia_json_invalido": {
    "pt": "JSON inválido. Verifique a resposta da IA e tente novamente.",
    "en": "Invalid JSON. Check the AI response and try again."
  },
  "can_ia_sem_versos": {
    "pt": "Nenhum verso válido no JSON",
    "en": "No valid verses found in the JSON"
  },
  "can_instrucao_lacuna": {
    "pt": "🎧 Ouça o verso e complete a lacuna:",
    "en": "🎧 Ouça o verso e complete a lacuna:"
  },
  "can_modo_cloze": {
    "pt": "🎧 Cloze Player (Sync)",
    "en": "🎧 Cloze Player (Sync)"
  },
  "can_modo_karaoke": {
    "pt": "🎤 Karaokê (Ouvir Tudo)",
    "en": "🎤 Karaokê (Ouvir Tudo)"
  },
  "can_modo_praticar": {
    "pt": "✏️ Praticar Lacunas",
    "en": "✏️ Praticar Lacunas"
  },
  "can_my_badge": {
    "pt": "Minha",
    "en": "Mine"
  },
  "can_nova_musica": {
    "pt": "Nova Música",
    "en": "New Song"
  },
  "can_oculta_notif": {
    "pt": "Música oculta. Use \"Restaurar\" para trazer de volta.",
    "en": "Song hidden. Use \"Restore\" to bring it back."
  },
  "can_ocultar_confirm": {
    "pt": "Ocultar \"{t}\"?\nSome da lista mas pode ser restaurada.",
    "en": "Hide \"{t}\"?\nIt disappears from the list but can be restored later."
  },
  "can_outras_musicas": {
    "pt": "‹ Other songs",
    "en": "‹ Other songs"
  },
  "can_ouvir_verso": {
    "pt": "▶ Ouvir Verso",
    "en": "▶ Ouvir Verso"
  },
  "can_ouvir_verso_n": {
    "pt": "🔊 Ouvir verso",
    "en": "🔊 Ouvir verso"
  },
  "can_pausar_audio": {
    "pt": "⏸ Pausar Áudio",
    "en": "⏸ Pausar Áudio"
  },
  "can_pill_adicionadas": {
    "pt": "🤖 Adicionadas",
    "en": "🤖 Adicionadas"
  },
  "can_pill_classicos": {
    "pt": "📚 Clássicos Inglêss",
    "en": "📚 Clássicos Inglêss"
  },
  "can_pill_todas": {
    "pt": "Todas",
    "en": "Todas"
  },
  "can_progress_counter": {
    "pt": "Palavras",
    "en": "Words"
  },
  "can_refrao_badge": {
    "pt": "🔁 Refrão",
    "en": "🔁 Refrão"
  },
  "can_repetir": {
    "pt": "🔄 Repeat",
    "en": "🔄 Repeat"
  },
  "can_res_catalogo": {
    "pt": "← Catálogo de Músicas",
    "en": "← Catálogo de Músicas"
  },
  "can_res_jogar_nov": {
    "pt": "↺ Jogar novamente",
    "en": "↺ Jogar novamente"
  },
  "can_res_karaoke": {
    "pt": "🎤 Ouvir no Karaokê",
    "en": "🎤 Ouvir no Karaokê"
  },
  "can_restauradas_notif": {
    "pt": "Músicas nativas restauradas!",
    "en": "Built-in songs restored!"
  },
  "can_restaurar": {
    "pt": "↩ Restaurar",
    "en": "↩ Restore"
  },
  "can_revelar": {
    "pt": "Clique para revelar 👆",
    "en": "Click to reveal 👆"
  },
  "can_salva": {
    "pt": "🎵 \"{t}\" saved!",
    "en": "🎵 \"{t}\" saved!"
  },
  "can_sec_titulo": {
    "pt": "Modo Música",
    "en": "Modo Música"
  },
  "can_sem_musica": {
    "pt": "Nenhuma música disponível.",
    "en": "Nenhuma música disponível."
  },
  "can_sem_musicas": {
    "pt": "Nenhuma música ainda.",
    "en": "No songs yet."
  },
  "can_sem_resultado": {
    "pt": "Nenhum resultado encontrado.",
    "en": "Nenhum resultado encontrado."
  },
  "can_sem_resultados": {
    "pt": "Sem resultados.",
    "en": "No results."
  },
  "can_substituir_versos": {
    "pt": "Isso vai substituir {a} verso(s) existente(s) por {b} versos importados. Continuar?",
    "en": "This will replace {a} existing verse(s) with {b} imported verses. Continue?"
  },
  "can_trad_pt": {
    "pt": "Tradução PT",
    "en": "Tradução PT"
  },
  "can_traducao_pt": {
    "pt": "Tradução PT",
    "en": "Tradução PT"
  },
  "can_verso_n": {
    "pt": "Verso",
    "en": "Verso"
  },
  "can_versos_count": {
    "pt": "versos",
    "en": "lines"
  },
  "can_vocab_chave_label": {
    "pt": "✨ Vocabulário-chave da música (clique para ouvir):",
    "en": "✨ Vocabulário-chave da música (clique para ouvir):"
  },
  "cc_agora_mesmo": {
    "pt": "agora mesmo",
    "en": "just now"
  },
  "cc_continuar_label": {
    "pt": "Continuar de onde parou",
    "en": "Continue where you left off"
  },
  "cc_ha_dias": {
    "pt": "há {n} dia(s)",
    "en": "{n} day(s) ago"
  },
  "cc_ha_horas": {
    "pt": "há {n}h",
    "en": "{n}h ago"
  },
  "cc_ha_minutos": {
    "pt": "há poucos minutos",
    "en": "a few minutes ago"
  },
  "cc_retomar": {
    "pt": "→ Retomar",
    "en": "→ Resume"
  },
  "cc_secao_gram": {
    "pt": "Gramática",
    "en": "Grammar"
  },
  "cc_secao_inicio": {
    "pt": "Início",
    "en": "Home"
  },
  "cc_secao_perfil": {
    "pt": "Perfil",
    "en": "Profile"
  },
  "cc_secao_vocab": {
    "pt": "Vocabulário",
    "en": "Vocabulary"
  },
  "cc_ultima_sessao": {
    "pt": "Última sessão:",
    "en": "Last session:"
  },
  "cfg_idioma_app": {
    "pt": "Idioma do App",
    "en": "App Language"
  },
  "cfg_idioma_it": {
    "pt": "Inglês (EN) - Imersão",
    "en": "English (EN) - Immersion"
  },
  "cfg_idioma_pt": {
    "pt": "Português (PT)",
    "en": "Portuguese (PT)"
  },
  "cfg_sons_desligados": {
    "pt": "Sons: Desligados",
    "en": "Sounds: Off"
  },
  "cfg_sons_ligados": {
    "pt": "Sons: Ligados",
    "en": "Sounds: On"
  },
  "cfg_tema_claro": {
    "pt": "Modo Claro",
    "en": "Light Mode"
  },
  "cfg_tema_escuro": {
    "pt": "Modo Escuro",
    "en": "Dark Mode"
  },
  "cfg_titulo": {
    "pt": "Configurações",
    "en": "Settings"
  },
  "config_perfil": {
    "pt": "Configurações & Perfil",
    "en": "Settings & Profile"
  },
  "dial_acertos": {
    "pt": "Correct: {a} / {b}",
    "en": "Correct: {a} / {b}"
  },
  "dial_back": {
    "pt": "‹ Voltar",
    "en": "‹ Back"
  },
  "dial_badge_meu": {
    "pt": "Meu",
    "en": "Meu"
  },
  "dial_btn_adicionar": {
    "pt": "➕ Adicionar Diálogo",
    "en": "➕ Add Dialogue"
  },
  "dial_btn_ia": {
    "pt": "🤖 via IA",
    "en": "🤖 via IA"
  },
  "dial_busca_ph": {
    "pt": "🔍 Cerca...",
    "en": "🔍 Cerca..."
  },
  "dial_busca_placeholder": {
    "pt": "🔍 Buscar diálogo...",
    "en": "🔍 Buscar diálogo..."
  },
  "dial_concluido": {
    "pt": "Dialogue Completed",
    "en": "Dialogue Completed"
  },
  "dial_continue": {
    "pt": "Continuar",
    "en": "Continue"
  },
  "dial_edit_dialogue": {
    "pt": "Editar Diálogo",
    "en": "Edit Dialogue"
  },
  "dial_excluir_confirm": {
    "pt": "Delete \"{t}\"?",
    "en": "Delete \"{t}\"?"
  },
  "dial_filtro_adicionados": {
    "pt": "🤖 Adicionados",
    "en": "🤖 Adicionados"
  },
  "dial_filtro_nativos": {
    "pt": "📚 Nativos",
    "en": "📚 Nativos"
  },
  "dial_filtro_nivel": {
    "pt": "🎯 Nível",
    "en": "🎯 Nível"
  },
  "dial_filtro_todos": {
    "pt": "Todos",
    "en": "Todos"
  },
  "dial_form_add_character": {
    "pt": "➕ Adicionar Fala de Personagem",
    "en": "➕ Add Character Line"
  },
  "dial_form_add_user": {
    "pt": "➕ Adicionar Resposta do Usuário",
    "en": "➕ Add User Response"
  },
  "dial_form_alt_correct": {
    "pt": " (correta)",
    "en": " (correct)"
  },
  "dial_form_alt_placeholder": {
    "pt": "Alternativa {n}",
    "en": "Alternative {n}"
  },
  "dial_form_alternatives_title": {
    "pt": "4 Alternativas (marque a correta):",
    "en": "4 Alternatives (mark the correct one):"
  },
  "dial_form_char_name": {
    "pt": "Nome do personagem",
    "en": "Character name"
  },
  "dial_form_character_line": {
    "pt": "🗣️ Fala de Personagem",
    "en": "🗣️ Character Line"
  },
  "dial_form_context": {
    "pt": "Contexto (descrição da situação)",
    "en": "Context (situation description)"
  },
  "dial_form_context_placeholder": {
    "pt": "Ex: Você entra em um café para pedir uma bebida.",
    "en": "Ex: You walk into a coffee shop to order a drink."
  },
  "dial_form_correct_eng_phrase": {
    "pt": "Frase em inglês correta *",
    "en": "Correct English phrase *"
  },
  "dial_form_eng_phrase": {
    "pt": "Frase em inglês *",
    "en": "English phrase *"
  },
  "dial_form_icon": {
    "pt": "Ícone",
    "en": "Icon"
  },
  "dial_form_ipa": {
    "pt": "IPA (opcional)",
    "en": "IPA (optional)"
  },
  "dial_form_level": {
    "pt": "Nível",
    "en": "Level"
  },
  "dial_form_pt_translation": {
    "pt": "Tradução em português",
    "en": "Portuguese translation"
  },
  "dial_form_save": {
    "pt": "💾 Salvar Diálogo",
    "en": "💾 Save Dialogue"
  },
  "dial_form_tip_body": {
    "pt": "💡 <strong>Tipo \"Fala de Personagem\":</strong> o personagem fala (o usuário apenas lê/ouve).<br>💡 <strong>Tipo \"Resposta do Usuário\":</strong> o usuário escolhe entre 4 opções — preencha as 4 alternativas e marque a correta.",
    "en": "💡 <strong>Type \"Character Line\":</strong> the character speaks (the user just reads/listens).<br>💡 <strong>Type \"User Response\":</strong> the user chooses from 4 options — fill in all 4 alternatives and mark the correct one."
  },
  "dial_form_title": {
    "pt": "Título *",
    "en": "Title *"
  },
  "dial_form_turns": {
    "pt": "💬 Turnos do Diálogo",
    "en": "💬 Dialogue Turns"
  },
  "dial_form_user_response": {
    "pt": "👤 Resposta do Usuário",
    "en": "👤 User Response"
  },
  "dial_my_badge": {
    "pt": "Meu",
    "en": "Mine"
  },
  "dial_new_dialogue": {
    "pt": "Novo Diálogo",
    "en": "New Dialogue"
  },
  "dial_no_dialogues": {
    "pt": "Nenhum diálogo ainda.",
    "en": "No dialogues yet."
  },
  "dial_no_results": {
    "pt": "Nenhum resultado.",
    "en": "No results."
  },
  "dial_practise_btn": {
    "pt": "Praticar Diálogo ✍️",
    "en": "Practise Dialogue ✍️"
  },
  "dial_praticar_btn": {
    "pt": "Praticar Diálogo ✍️",
    "en": "Praticar Diálogo ✍️"
  },
  "dial_praticar_novamente": {
    "pt": "Practice Again 🔄",
    "en": "Practice Again 🔄"
  },
  "dial_salvo": {
    "pt": "💬 \"{t}\" saved!",
    "en": "💬 \"{t}\" saved!"
  },
  "dial_search_placeholder": {
    "pt": "🔍 Buscar...",
    "en": "🔍 Search..."
  },
  "dial_select_level": {
    "pt": "🎯 Nível",
    "en": "🎯 Level"
  },
  "dial_sem_dialogo": {
    "pt": "Nenhum diálogo ainda.",
    "en": "Nenhum diálogo ainda."
  },
  "dial_sem_resultado": {
    "pt": "Nenhum resultado.",
    "en": "Nenhum resultado."
  },
  "dial_sua_vez": {
    "pt": "Sua vez de falar. Escolha a melhor resposta:",
    "en": "Sua vez de falar. Escolha a melhor resposta:"
  },
  "dial_user_name": {
    "pt": "Você",
    "en": "You"
  },
  "dial_vocab_chave": {
    "pt": "Key Vocabulary:",
    "en": "Key Vocabulary:"
  },
  "dial_voltar": {
    "pt": "‹ Back",
    "en": "‹ Back"
  },
  "dial_your_turn": {
    "pt": "Sua vez de falar. Escolha a melhor resposta:",
    "en": "Your turn to speak. Choose the best response:"
  },
  "fc_again_mensagem": {
    "pt": "Este cartão volta amanhã — você já o encontrou uma vez.",
    "en": "This card returns tomorrow — you've met it once."
  },
  "fc_btn_bom": {
    "pt": "✅ Bom",
    "en": "✅ Good"
  },
  "fc_btn_dificeis": {
    "pt": "⚠️ Difíceis",
    "en": "⚠️ Difficult"
  },
  "fc_btn_dificil": {
    "pt": "⚡ Difícil",
    "en": "⚡ Hard"
  },
  "fc_btn_esqueci": {
    "pt": "❌ Errei",
    "en": "❌ Again"
  },
  "fc_btn_facil": {
    "pt": "⭐ Fácil",
    "en": "⭐ Easy"
  },
  "fc_btn_favoritos": {
    "pt": "❤️ Favoritos",
    "en": "❤️ Favorites"
  },
  "fc_btn_imitar": {
    "pt": "🎤 Imitar",
    "en": "🎤 Imitate"
  },
  "fc_btn_praticar_todas": {
    "pt": "🔁 Praticar todas",
    "en": "🔁 Practice all"
  },
  "fc_btn_pronunciar": {
    "pt": "🔊 Pronunciar",
    "en": "🔊 Pronounce"
  },
  "fc_contexto_sem_exemplo": {
    "pt": "⚠️ Exemplo em contexto não disponível para este cartão.",
    "en": "⚠️ Context example not available for this card."
  },
  "fc_contexto_sem_exemplo_hint": {
    "pt": "Use o Modo Normal para estudar este item.",
    "en": "Switch to Normal mode to study this item."
  },
  "fc_dica_ouvir": {
    "pt": "Toque no cartão para ouvir novamente 🔊",
    "en": "Tap the card to listen again 🔊"
  },
  "fc_dica_palavra_falta": {
    "pt": "Qual palavra está faltando?",
    "en": "Which word is missing?"
  },
  "fc_dica_revelar": {
    "pt": "Clique para revelar",
    "en": "Click to reveal"
  },
  "fc_escolha_vocab": {
    "pt": "Escolha um conjunto de vocabulário para estudar",
    "en": "Choose a vocabulary set to study"
  },
  "fc_escuta_aguarde": {
    "pt": "Carregando cartão — aguarde.",
    "en": "Loading card — please wait."
  },
  "fc_estudando": {
    "pt": "Estudando:",
    "en": "Studying:"
  },
  "fc_estudando_label": {
    "pt": "Estudando:",
    "en": "Estudando:"
  },
  "fc_gravar_imitar": {
    "pt": "🎤 Imitar",
    "en": "🎤 Imitate"
  },
  "fc_gravar_parar": {
    "pt": "⏹ Parar",
    "en": "⏹ Stop"
  },
  "fc_novas": {
    "pt": "novas",
    "en": "new"
  },
  "fc_onboarding_contexto": {
    "pt": "📖 Modo Contexto: complete a frase com a palavra que falta. +5 XP bônus!",
    "en": "📖 Context mode: fill in the missing word. +5 XP bonus!"
  },
  "fc_onboarding_escuta": {
    "pt": "🎧 Modo Escuta: ouça a pronúncia e tente lembrar a palavra antes de ver. +5 XP bônus!",
    "en": "🎧 Listen mode: hear the pronunciation and try to recall the word. +5 XP bonus!"
  },
  "fc_onboarding_reverso": {
    "pt": "🔄 Modo Reverso: veja o português e pense na palavra em inglês antes de virar.",
    "en": "🔄 Reverse mode: see Portuguese and think of the English word before flipping."
  },
  "fc_resumo_acertos": {
    "pt": "acertos",
    "en": "correct"
  },
  "fc_resumo_cartas": {
    "pt": "cartões",
    "en": "cards"
  },
  "fc_resumo_continua": {
    "pt": "Continue praticando!",
    "en": "Keep practising!"
  },
  "fc_resumo_dominio": {
    "pt": "🎯 {n} cartões dominados nesta sessão.",
    "en": "🎯 {n} cards mastered this session."
  },
  "fc_resumo_em_dias": {
    "pt": "em {n} dia",
    "en": "in {n} day"
  },
  "fc_resumo_em_dias_plural": {
    "pt": "em {n} dias",
    "en": "in {n} days"
  },
  "fc_resumo_em_horas": {
    "pt": "em {n}h",
    "en": "in {n}h"
  },
  "fc_resumo_excelente": {
    "pt": "Excelente trabalho!",
    "en": "Excellent work!"
  },
  "fc_resumo_inicio": {
    "pt": "🏠 Início",
    "en": "🏠 Home"
  },
  "fc_resumo_muito_bom": {
    "pt": "Ótimo trabalho!",
    "en": "Great job!"
  },
  "fc_resumo_novas": {
    "pt": "🌱 {n} nova palavra aprendida!",
    "en": "🌱 {n} new word learned!"
  },
  "fc_resumo_novas_plural": {
    "pt": "🌱 {n} novas palavras aprendidas!",
    "en": "🌱 {n} new words learned!"
  },
  "fc_resumo_praticar": {
    "pt": "🔁 Praticar todas",
    "en": "🔁 Practice all"
  },
  "fc_resumo_proxima": {
    "pt": "⏰ Próxima revisão:",
    "en": "⏰ Next review:"
  },
  "fc_resumo_proximo_templo": {
    "pt": "➡️ Próximo templo",
    "en": "➡️ Next temple"
  },
  "fc_resumo_sem_agendamento": {
    "pt": "Sem agendamento",
    "en": "No schedule"
  },
  "fc_resumo_sessao_concluida": {
    "pt": "Sessão concluída!",
    "en": "Session complete!"
  },
  "fc_resumo_streak": {
    "pt": "Maior sequência da sessão: {n} acertos!",
    "en": "Best streak this session: {n} correct!"
  },
  "fc_reverso_acerto": {
    "pt": "Correto!",
    "en": "Correct!"
  },
  "fc_reverso_erro": {
    "pt": "Era: {alvo}",
    "en": "Answer: {alvo}"
  },
  "fc_reverso_placeholder": {
    "pt": "Digite a palavra em inglês (opcional)",
    "en": "Type the English word (optional)"
  },
  "fc_reverso_verificar": {
    "pt": "Verificar",
    "en": "Check"
  },
  "fc_revisao": {
    "pt": "revisar",
    "en": "to review"
  },
  "fc_revisao_geral": {
    "pt": "Revisão Geral",
    "en": "General Review"
  },
  "fc_revisao_geral_btn": {
    "pt": "Revisão Geral",
    "en": "Revisão Geral"
  },
  "fc_selecionar_templo": {
    "pt": "-- Selecione um templo --",
    "en": "-- Select a temple --"
  },
  "fc_selecione_tempio": {
    "pt": "Selecione um Templo",
    "en": "Select a Temple"
  },
  "fc_todas_estudadas": {
    "pt": "Todos os cartões estudados hoje.",
    "en": "All cards studied today."
  },
  "fc_use_seletor": {
    "pt": "↑ use o seletor acima",
    "en": "↑ use the selector above"
  },
  "fc_vazio_retorno": {
    "pt": "⏰ Seus cartões voltam {quando}.",
    "en": "⏰ Your cards return {quando}."
  },
  "fc_vazio_sem_agendamento": {
    "pt": "Nenhum cartão agendado no momento.",
    "en": "No cards scheduled right now."
  },
  "fc_volte_amanha": {
    "pt": "Volte amanhã para suas próximas revisões.",
    "en": "Come back tomorrow for your next reviews."
  },
  "fc_xp_bonus_contexto": {
    "pt": "+{n} XP bônus — Modo Contexto!",
    "en": "+{n} XP bonus — Context mode!"
  },
  "fc_xp_bonus_escuta": {
    "pt": "+{n} XP bônus — Modo Escuta!",
    "en": "+{n} XP bonus — Listen mode!"
  },
  "filtro_nativo": {
    "pt": "📚 Nativas",
    "en": "📚 Built-in"
  },
  "filtro_todos": {
    "pt": "Todos",
    "en": "All"
  },
  "fsrs_due_warning": {
    "pt": "⚠️ Você tem {num} cartas atrasadas! Salve sua retenção.",
    "en": "⚠️ You have {num} due cards! Save your retention."
  },
  "fsrs_onb_desc_1": {
    "pt": "Aqui você memoriza o vocabulário usando o algoritmo FSRS (Spaced Repetition).",
    "en": "Here you memorize vocabulary using the FSRS algorithm (Spaced Repetition)."
  },
  "fsrs_onb_desc_2": {
    "pt": "Clique no botão ou pressione ESPAÇO para ver a tradução.",
    "en": "Click the button or press SPACE to see the translation."
  },
  "fsrs_onb_desc_3": {
    "pt": "Seja sincero se foi difícil ou fácil. Isso calcula quando você verá a carta de novo!",
    "en": "Be honest if it was hard or easy. This calculates when you will see the card again!"
  },
  "fsrs_onb_desc_4": {
    "pt": "Alterne para Escuta ou Reverso para treinar outras habilidades.",
    "en": "Switch to Listen or Reverse to train other skills."
  },
  "fsrs_onb_title_1": {
    "pt": "Bem-vindo aos Flashcards!",
    "en": "Welcome to Flashcards!"
  },
  "fsrs_onb_title_2": {
    "pt": "Revelar",
    "en": "Reveal"
  },
  "fsrs_onb_title_3": {
    "pt": "Avaliação Honesta",
    "en": "Honest Rating"
  },
  "fsrs_onb_title_4": {
    "pt": "Modos de Estudo",
    "en": "Study Modes"
  },
  "gram_aba_estudo": {
    "pt": "Estudo & Teoria",
    "en": "Study & Theory"
  },
  "gram_aba_pratica": {
    "pt": "Exercícios & Prática",
    "en": "Practice & Exercises"
  },
  "gram_admin_senha_erro": {
    "pt": "Senha incorreta. Tente novamente.",
    "en": "Incorrect password. Try again."
  },
  "gram_admin_senha_ph": {
    "pt": "Digite a senha",
    "en": "Enter password"
  },
  "gram_admin_titulo": {
    "pt": "Acesso do Administrador",
    "en": "Administrator Access"
  },
  "gram_arm_certo": {
    "pt": "Certo",
    "en": "Correct"
  },
  "gram_arm_errado": {
    "pt": "Errado",
    "en": "Wrong"
  },
  "gram_avancar_exemplos": {
    "pt": "Avançar para Exemplos & Armadilhas →",
    "en": "Avançar para Exemplos & Armadilhas →"
  },
  "gram_badge_choose": {
    "pt": "🔘 Escolher",
    "en": "🔘 Escolher"
  },
  "gram_badge_reveal": {
    "pt": "👁️ Revelar",
    "en": "👁️ Revelar"
  },
  "gram_badge_type": {
    "pt": "⌨️ Digitar",
    "en": "⌨️ Digitar"
  },
  "gram_bom_resultado": {
    "pt": "Bom! Continue assim!",
    "en": "Bom! Continue assim!"
  },
  "gram_bonus_xp": {
    "pt": "+{a} XP bônus 🏆",
    "en": "+{a} XP bônus 🏆"
  },
  "gram_btn_acertei": {
    "pt": "Acertei",
    "en": "I got it right"
  },
  "gram_btn_cancelar": {
    "pt": "Cancelar",
    "en": "Cancel"
  },
  "gram_btn_confirmar": {
    "pt": "Confirmar",
    "en": "Confirm"
  },
  "gram_btn_errei": {
    "pt": "Errei",
    "en": "I got it wrong"
  },
  "gram_btn_iniciar_pratica": {
    "pt": "Praticar agora (Exercícios) 🚀",
    "en": "Practice now (Exercises) 🚀"
  },
  "gram_btn_proximo_arrow": {
    "pt": "Próximo →",
    "en": "Next →"
  },
  "gram_btn_refazer": {
    "pt": "Refazer",
    "en": "Retry"
  },
  "gram_capitulo_completo": {
    "pt": "Capítulo Concluído!",
    "en": "Capítulo Concluído!"
  },
  "gram_card_clique": {
    "pt": "Clique para revelar 👆",
    "en": "Click to reveal 👆"
  },
  "gram_card_padrao": {
    "pt": "O Padrão:",
    "en": "The Pattern:"
  },
  "gram_card_teoria_titulo": {
    "pt": "Teoria e Prática da Lição",
    "en": "Lesson Theory & Practice"
  },
  "gram_clique_revelar": {
    "pt": "👆 Toque em cada palavra para revelar a resposta uma a uma.",
    "en": "👆 Tap each word to reveal the answer one by one."
  },
  "gram_concluidas_info": {
    "pt": "{c}/{t} concluídas · {e} exercícios",
    "en": "{c}/{t} concluídas · {e} exercícios"
  },
  "gram_confirmar_sair": {
    "pt": "Tem certeza? O progresso nesta lição será perdido.",
    "en": "Tem certeza? O progresso nesta lição será perdido."
  },
  "gram_consulta_rapida": {
    "pt": "📋 Consulta Rápida da Regra (clique se precisar lembrar durante os exercícios)",
    "en": "📋 Consulta Rápida da Regra (clique se precisar lembrar durante os exercícios)"
  },
  "gram_conteudo_indisponivel": {
    "pt": "Conteúdo não disponível.",
    "en": "Content not available."
  },
  "gram_continue": {
    "pt": "Continue estudando — você consegue!",
    "en": "Continue estudando — você consegue!"
  },
  "gram_correto": {
    "pt": "Correto!",
    "en": "Correct!"
  },
  "gram_def_entenda": {
    "pt": "Entenda",
    "en": "Understand"
  },
  "gram_def_pense": {
    "pt": "Pense",
    "en": "Think"
  },
  "gram_def_veja": {
    "pt": "Veja",
    "en": "See"
  },
  "gram_definicao_label": {
    "pt": "🔍 Observar e entender",
    "en": "🔍 Observe and understand"
  },
  "gram_errado": {
    "pt": "Incorreto.",
    "en": "Incorrect."
  },
  "gram_etapa1_tab": {
    "pt": "📖 Aprender a Regra",
    "en": "📖 Aprender a Regra"
  },
  "gram_etapa2_tab": {
    "pt": "🔍 Exemplos & Armadilhas",
    "en": "🔍 Exemplos & Armadilhas"
  },
  "gram_etapa3_tab": {
    "pt": "✏️ Praticar ({n})",
    "en": "✏️ Praticar ({n})"
  },
  "gram_exemplos_prc_label": {
    "pt": "🗣️ Veja os exemplos (clique em 🔊 para ouvir)",
    "en": "🗣️ See examples (click 🔊 to listen)"
  },
  "gram_exercicio_de": {
    "pt": "Exercício {a} / {b}",
    "en": "Exercício {a} / {b}"
  },
  "gram_expandir_todos": {
    "pt": "↕ Expandir / Recolher Todos",
    "en": "↕ Expandir / Recolher Todos"
  },
  "gram_explicacao_completa": {
    "pt": "📚 Explicação Completa & Quadros de Referência",
    "en": "📚 Explicação Completa & Quadros de Referência"
  },
  "gram_fase2_label": {
    "pt": "🔎 Fase 2: Observar e Descobrir",
    "en": "🔎 Phase 2: Observe & Discover"
  },
  "gram_fase2_sub": {
    "pt": "Clique nos cartões abaixo para descobrir regras e padrões de forma prática!",
    "en": "Click the cards below to discover rules and patterns practically!"
  },
  "gram_fase3_label": {
    "pt": "📋 Fase 3: Tabela de Referência Rápida",
    "en": "📋 Phase 3: Quick Reference Table"
  },
  "gram_fase4_label": {
    "pt": "🗣️ Fase 4: Analisar os Exemplos",
    "en": "🗣️ Phase 4: Analyze Examples"
  },
  "gram_fase4_prc_conclusao": {
    "pt": "Conclusão",
    "en": "Conclusion"
  },
  "gram_fase4_prc_pergunta": {
    "pt": "Pergunta",
    "en": "Question"
  },
  "gram_fase4_prc_resposta": {
    "pt": "Resposta",
    "en": "Answer"
  },
  "gram_fase4_sub": {
    "pt": "Clique nos exemplos abaixo para praticar seu raciocínio antes de ver a resposta!",
    "en": "Click the examples below to practice your reasoning before seeing the answer!"
  },
  "gram_fase4_ver_detalhes": {
    "pt": "Ver detalhes ▾",
    "en": "See details ▾"
  },
  "gram_fase5_label": {
    "pt": "⚠️ Fase 5: Evitar Armadilhas Comuns",
    "en": "⚠️ Phase 5: Avoid Common Pitfalls"
  },
  "gram_fase5_porque": {
    "pt": "Por quê?",
    "en": "Why?"
  },
  "gram_fase5_sub": {
    "pt": "Erros comuns de quem está aprendendo e como evitá-los:",
    "en": "Common mistakes from learners and how to avoid them:"
  },
  "gram_frases_autenticas": {
    "pt": "🎧 Frases Autênticas para Ouvir e Repetir",
    "en": "🎧 Frases Autênticas para Ouvir e Repetir"
  },
  "gram_inventario_label": {
    "pt": "✅ O que você vai aprender",
    "en": "✅ What you will learn"
  },
  "gram_ir_exercicios": {
    "pt": "Ir para os Exercícios ({n}) ✏️ →",
    "en": "Ir para os Exercícios ({n}) ✏️ →"
  },
  "gram_licao_concluida": {
    "pt": "Lição Concluída!",
    "en": "Lição Concluída!"
  },
  "gram_meta_exercicios": {
    "pt": "exercícios",
    "en": "exercícios"
  },
  "gram_meta_teoria": {
    "pt": "📖 Teoria",
    "en": "📖 Teoria"
  },
  "gram_ocultar": {
    "pt": "Ocultar",
    "en": "Ocultar"
  },
  "gram_otimo": {
    "pt": "Ótimo trabalho! Quase perfeito!",
    "en": "Ótimo trabalho! Quase perfeito!"
  },
  "gram_ouvir_pronuncia_it": {
    "pt": "🔊 Ouvir pronúncia em inglês",
    "en": "🔊 Ouvir pronúncia em inglês"
  },
  "gram_pct_correto": {
    "pt": "{a}% correto",
    "en": "{a}% correto"
  },
  "gram_perfeito": {
    "pt": "Perfeito! Sem erros!",
    "en": "Perfeito! Sem erros!"
  },
  "gram_placeholder_resposta": {
    "pt": "Digite sua resposta...",
    "en": "Type your answer..."
  },
  "gram_ponte_label": {
    "pt": "🇵🇹 Em português é assim… em inglês é assim:",
    "en": "🇵🇹 In Portuguese it is like this... in English it is like this:"
  },
  "gram_por_que": {
    "pt": "Por quê?",
    "en": "Why?"
  },
  "gram_por_que_importa": {
    "pt": "Por que isso importa?",
    "en": "Why does it matter?"
  },
  "gram_proxima_licao": {
    "pt": "Próxima lição →",
    "en": "Próxima lição →"
  },
  "gram_proximo_cap": {
    "pt": "Próximo capítulo →",
    "en": "Próximo capítulo →"
  },
  "gram_refazer_ex": {
    "pt": "🔄 Refazer Exercícios",
    "en": "🔄 Refazer Exercícios"
  },
  "gram_requer_nivel": {
    "pt": "Requer Nível {n} (ou clique para desbloquear)",
    "en": "Requer Nível {n} (ou clique para desbloquear)"
  },
  "gram_resposta_era": {
    "pt": "A resposta era:",
    "en": "The answer was:"
  },
  "gram_revelar_resp": {
    "pt": "Revelar resposta",
    "en": "Revelar resposta"
  },
  "gram_revisar_teoria": {
    "pt": "📖 Revisar Teoria",
    "en": "📖 Revisar Teoria"
  },
  "gram_sec_titulo": {
    "pt": "Gramática Inglesa",
    "en": "Gramática Inglesa"
  },
  "gram_tecnica_label": {
    "pt": "📌 Como usar na prática",
    "en": "📌 How to use in practice"
  },
  "gram_todos_modulos": {
    "pt": "‹ Todos os módulos",
    "en": "‹ Todos os módulos"
  },
  "gram_ver_tabela": {
    "pt": "📋 Ver tabela de referência (use durante os exercícios)",
    "en": "📋 View reference table (use during exercises)"
  },
  "gram_verificar": {
    "pt": "✔ Verificar",
    "en": "✔ Verificar"
  },
  "gram_voltar_regra": {
    "pt": "← Voltar à Regra",
    "en": "← Voltar à Regra"
  },
  "hdr_lbl_ajuda": {
    "pt": "Ajuda",
    "en": "Help"
  },
  "hdr_lbl_meta": {
    "pt": "Meta",
    "en": "Goal"
  },
  "hdr_lbl_perfil": {
    "pt": "Perfil",
    "en": "Profile"
  },
  "hdr_lbl_som": {
    "pt": "Som",
    "en": "Sound"
  },
  "hdr_lbl_tema": {
    "pt": "Tema",
    "en": "Theme"
  },
  "hdr_lbl_voz": {
    "pt": "Voz",
    "en": "Voice"
  },
  "header.daily_goal": {
    "pt": "Meta Diária",
    "en": "Daily Goal"
  },
  "header.help": {
    "pt": "Ajuda",
    "en": "Help"
  },
  "header.profile": {
    "pt": "Perfil",
    "en": "Profile"
  },
  "header.sound": {
    "pt": "Som",
    "en": "Sound"
  },
  "header.theme": {
    "pt": "Tema",
    "en": "Theme"
  },
  "header.voice": {
    "pt": "Voz",
    "en": "Voice"
  },
  "hm_atividades": {
    "pt": "atividades em",
    "en": "activities in"
  },
  "hm_atividades_tooltip": {
    "pt": "atividades",
    "en": "activities"
  },
  "hm_dias": {
    "pt": "dias",
    "en": "days"
  },
  "hm_meno": {
    "pt": "Menos",
    "en": "Less"
  },
  "hm_piu": {
    "pt": "Mais",
    "en": "More"
  },
  "hm_sequencia": {
    "pt": "Sequência:",
    "en": "Streak:"
  },
  "hm_sua_atividade": {
    "pt": "🔥 Sua Atividade",
    "en": "🔥 Your Activity"
  },
  "hm_titulo": {
    "pt": "🔥 Sua Atividade",
    "en": "Your Activity"
  },
  "ia_remover_item": {
    "pt": "Remover este item?",
    "en": "Remove this item?"
  },
  "imit_almost": {
    "pt": "Quase! 👍",
    "en": "Almost! 👍"
  },
  "imit_btn_ouvir_exemplo": {
    "pt": "🔊 Listen to Example",
    "en": "🔊 Listen to Example"
  },
  "imit_clique_mic": {
    "pt": "Clique no microfone para falar",
    "en": "Clique no microfone para falar"
  },
  "imit_completed_desc": {
    "pt": "Você completou todas as {n} frases!",
    "en": "You completed all {n} phrases!"
  },
  "imit_dica_fonetica": {
    "pt": "Dica Fonética",
    "en": "Dica Fonética"
  },
  "imit_erro_ouvir": {
    "pt": "Erro ao ouvir. Tente novamente.",
    "en": "Error listening. Try again."
  },
  "imit_excellent": {
    "pt": "Excelente!",
    "en": "Excellent!"
  },
  "imit_filtro_adicionadas": {
    "pt": "🤖 Adicionadas",
    "en": "🤖 Added"
  },
  "imit_filtro_nativas": {
    "pt": "📚 Nativas",
    "en": "📚 Built-in"
  },
  "imit_filtro_nivel": {
    "pt": "🎯 Nível",
    "en": "🎯 Level"
  },
  "imit_filtro_todas": {
    "pt": "Todas",
    "en": "All"
  },
  "imit_mic_listening": {
    "pt": "Ouvindo... Fale agora!",
    "en": "Listening... Speak now!"
  },
  "imit_mic_processing": {
    "pt": "Processando...",
    "en": "Processing..."
  },
  "imit_mic_start": {
    "pt": "Clique no microfone para falar",
    "en": "Click on the microphone to speak"
  },
  "imit_ouvimos": {
    "pt": "We heard:",
    "en": "We heard:"
  },
  "imit_ouvindo": {
    "pt": "Ouvindo... Fale agora!",
    "en": "Ouvindo... Fale agora!"
  },
  "imit_ouvir_exemplo": {
    "pt": "Listen to the example and try again.",
    "en": "Listen to the example and try again."
  },
  "imit_perfect": {
    "pt": "Perfeito! 🌟",
    "en": "Perfect! 🌟"
  },
  "imit_phonetic_hint": {
    "pt": "Dica Fonética",
    "en": "Phonetic Hint"
  },
  "imit_phrase_indicator": {
    "pt": "Frase {a} de {b}",
    "en": "Phrase {a} of {b}"
  },
  "imit_processando": {
    "pt": "Processando...",
    "en": "Processando..."
  },
  "imit_pronunciar_melhor": {
    "pt": "Try to pronounce more clearly.",
    "en": "Try to pronounce more clearly."
  },
  "imit_proxima_frase": {
    "pt": "Next Phrase",
    "en": "Next Phrase"
  },
  "imit_remove_btn": {
    "pt": "🗑️ Remover",
    "en": "🗑️ Remove"
  },
  "imit_repeat": {
    "pt": "🔄 Repetir",
    "en": "🔄 Repeat"
  },
  "imit_return_home": {
    "pt": "Voltar ao Início",
    "en": "Return to Home"
  },
  "imit_sec_titulo": {
    "pt": "Ouvir e Repetir",
    "en": "Listen & Repeat"
  },
  "imit_tentar_novamente": {
    "pt": "Try Again",
    "en": "Try Again"
  },
  "imit_try_again": {
    "pt": "Tente novamente! 🔄",
    "en": "Try again! 🔄"
  },
  "imit_voce_disse": {
    "pt": "You said:",
    "en": "You said:"
  },
  "loading_text": {
    "pt": "Carregando...",
    "en": "Loading..."
  },
  "lv_levelup_btn": {
    "pt": "Vamos lá! →",
    "en": "Let's go! →"
  },
  "lv_levelup_label": {
    "pt": "Subiu de Nível! 🎉",
    "en": "Level Up! 🎉"
  },
  "lv_levelup_notif": {
    "pt": "🎉 Nível {n}! Continue assim!",
    "en": "🎉 Level {n}! Keep it up!"
  },
  "lvl_name_1": {
    "pt": "Principiante",
    "en": "Beginner"
  },
  "lvl_name_10": {
    "pt": "Avançado",
    "en": "Advanced"
  },
  "lvl_name_13": {
    "pt": "Especialista",
    "en": "Expert"
  },
  "lvl_name_16": {
    "pt": "Avançado Plus",
    "en": "Advanced Plus"
  },
  "lvl_name_19": {
    "pt": "Mestre",
    "en": "Master"
  },
  "lvl_name_2": {
    "pt": "Explorador",
    "en": "Explorer"
  },
  "lvl_name_20": {
    "pt": "Grão-Mestre",
    "en": "Grand Master"
  },
  "lvl_name_3": {
    "pt": "Aventureiro",
    "en": "Adventurer"
  },
  "lvl_name_5": {
    "pt": "Estudante",
    "en": "Student"
  },
  "lvl_name_7": {
    "pt": "Intermediário",
    "en": "Intermediate"
  },
  "meta_data": {
    "pt": "Até a data:",
    "en": "By date:"
  },
  "meta_definir": {
    "pt": "Definir Meta",
    "en": "Set Goal"
  },
  "meta_definir_prazo": {
    "pt": "Definir uma meta com prazo",
    "en": "Set a goal with a deadline"
  },
  "meta_diaria_xp": {
    "pt": "Meta Diária de XP",
    "en": "Daily XP Goal"
  },
  "meta_dias_restantes": {
    "pt": "{n} dias restantes",
    "en": "{n} days remaining"
  },
  "meta_do_dia": {
    "pt": "Meta Diária",
    "en": "Daily Goal"
  },
  "meta_do_dia_label": {
    "pt": "🎯 Meta Diária",
    "en": "🎯 Daily Goal"
  },
  "meta_minha": {
    "pt": "🎯 Minha Meta",
    "en": "🎯 My Goal"
  },
  "meta_nivel": {
    "pt": "Quero atingir o nível:",
    "en": "I want to reach level:"
  },
  "meta_no_ritmo": {
    "pt": "No ritmo atual:",
    "en": "At current pace:"
  },
  "meta_remover": {
    "pt": "Remover meta atual",
    "en": "Remove current goal"
  },
  "meta_xp_necessarios": {
    "pt": "XP/dia necessários",
    "en": "XP/day needed"
  },
  "nav.dialogues": {
    "pt": "Diálogos",
    "en": "Dialogues"
  },
  "nav.flashcards": {
    "pt": "Flashcards",
    "en": "Flashcards"
  },
  "nav.grammar": {
    "pt": "Gramática",
    "en": "Grammar"
  },
  "nav.pronunciation": {
    "pt": "Ouvir e Repetir",
    "en": "Listen & Repeat"
  },
  "nav.quiz": {
    "pt": "Quiz",
    "en": "Quiz"
  },
  "nav.reading": {
    "pt": "Leituras",
    "en": "Reading"
  },
  "nav.songs": {
    "pt": "Músicas",
    "en": "Songs"
  },
  "nav.temples": {
    "pt": "Templos",
    "en": "Temples"
  },
  "nav.vocab": {
    "pt": "Vocab",
    "en": "Vocab"
  },
  "nav_canzoni": {
    "pt": "Músicas",
    "en": "Songs"
  },
  "nav_dialogos": {
    "pt": "Diálogos",
    "en": "Dialogues"
  },
  "nav_flashcard": {
    "pt": "Flashcards",
    "en": "Flashcards"
  },
  "nav_gramatica": {
    "pt": "Grammar",
    "en": "Grammar"
  },
  "nav_imitacao": {
    "pt": "Ouvir e Repetir",
    "en": "Listen & Repeat"
  },
  "nav_inicio": {
    "pt": "Templos",
    "en": "Temples"
  },
  "nav_quiz": {
    "pt": "Quiz",
    "en": "Quiz"
  },
  "nav_storie": {
    "pt": "Leituras",
    "en": "Reading"
  },
  "nav_vocab": {
    "pt": "Vocab",
    "en": "Vocab"
  },
  "nivel_10": {
    "pt": "Nível 10 — Intermediário (A2)",
    "en": "Level 10 — Elementary (A2)"
  },
  "nivel_15": {
    "pt": "Nível 15 — Avançado (B1)",
    "en": "Level 15 — Intermediate (B1)"
  },
  "nivel_20": {
    "pt": "Nível 20 — Maestro (B2)",
    "en": "Level 20 — Advanced (B2)"
  },
  "nivel_5": {
    "pt": "Nível 5 — Principiante (A1)",
    "en": "Level 5 — Beginner (A1)"
  },
  "notif_arquivo_inv": {
    "pt": "❌ Arquivo inválido: ",
    "en": "❌ Invalid file: "
  },
  "notif_backup_exp": {
    "pt": "✅ Backup exportado com sucesso!",
    "en": "✅ Backup exported successfully!"
  },
  "notif_backup_imp": {
    "pt": "✅ Backup importado! Recarregando...",
    "en": "✅ Backup imported! Reloading..."
  },
  "notif_bloqueado": {
    "pt": "Temple not unlocked.",
    "en": "Temple not unlocked."
  },
  "notif_can_excluida": {
    "pt": "Música excluída.",
    "en": "Song deleted."
  },
  "notif_can_ocultada": {
    "pt": "Música ocultada. Use \"Restaurar\" para trazer de volta.",
    "en": "Música ocultada. Use \"Restaurar\" para trazer de volta."
  },
  "notif_can_restauradas": {
    "pt": "Músicas nativas restauradas!",
    "en": "Músicas nativas restauradas!"
  },
  "notif_can_sem_verso": {
    "pt": "Adicione pelo menos um verso com lacuna.",
    "en": "Add at least one verse with a blank."
  },
  "notif_can_titulo_obr": {
    "pt": "O título é obrigatório.",
    "en": "Title is required."
  },
  "notif_codice_errato": {
    "pt": "Código incorreto.",
    "en": "Incorrect code."
  },
  "notif_conteudo_exp": {
    "pt": "✅ Conteúdo exportado!",
    "en": "✅ Content exported!"
  },
  "notif_data_futura": {
    "pt": "O prazo deve ser uma data futura.",
    "en": "The deadline must be in the future."
  },
  "notif_dial_excluido": {
    "pt": "Diálogo excluído.",
    "en": "Dialogue deleted."
  },
  "notif_dial_sem_turnos": {
    "pt": "Adicione pelo menos 2 turnos.",
    "en": "Add at least 2 turns."
  },
  "notif_dial_titulo_obr": {
    "pt": "O título é obrigatório.",
    "en": "Title is required."
  },
  "notif_erro": {
    "pt": "An error occurred.",
    "en": "An error occurred."
  },
  "notif_fc_bloqueado": {
    "pt": "Templo não desbloqueado ainda!",
    "en": "Temple not unlocked yet!"
  },
  "notif_fc_dificeis_revisar": {
    "pt": "📚 {n} palavras difíceis para revisar",
    "en": "📚 {n} difficult words to review"
  },
  "notif_fc_erro_resposta": {
    "pt": "Erro ao salvar resposta. Tente novamente.",
    "en": "Error saving response. Try again."
  },
  "notif_fc_favorito_add": {
    "pt": "❤️ Adicionado aos favoritos",
    "en": "❤️ Added to favorites"
  },
  "notif_fc_favorito_rem": {
    "pt": "🤍 Removido dos favoritos",
    "en": "🤍 Removed from favorites"
  },
  "notif_fc_favoritos_nao_enc": {
    "pt": "Palavras favoritas não encontradas nos dados.",
    "en": "Favorite words not found in data."
  },
  "notif_fc_favoritos_revisar": {
    "pt": "❤️ {n} favoritos para revisar",
    "en": "❤️ {n} favorites to review"
  },
  "notif_fc_nao_ouviu": {
    "pt": "Não consegui ouvir. Tente novamente.",
    "en": "I could not hear you. Try again."
  },
  "notif_fc_sem_dificeis": {
    "pt": "Nenhuma palavra difícil encontrada! 🎉",
    "en": "No difficult words found! 🎉"
  },
  "notif_fc_sem_favoritos": {
    "pt": "Nenhum favorito ainda. Adicione com ❤️!",
    "en": "No favorites yet. Add with ❤️!"
  },
  "notif_fc_sem_voz": {
    "pt": "Seu browser não suporta reconhecimento de voz.",
    "en": "Your browser does not support voice recognition."
  },
  "notif_fc_vocab_nao_carregado": {
    "pt": "Vocabulário deste templo não carregado.",
    "en": "Vocabulary for this temple not loaded."
  },
  "notif_gram_capitolo": {
    "pt": "🏆 Capítulo concluído! +{xp} XP",
    "en": "🏆 Capítulo concluído! +{xp} XP"
  },
  "notif_meta_atingida": {
    "pt": "🎯 Meta diária atingida! Muito bem!",
    "en": "🎯 Daily goal reached! Well done!"
  },
  "notif_meta_def_ok": {
    "pt": "🎯 Meta definida! Boa sorte!",
    "en": "🎯 Goal set! Good luck!"
  },
  "notif_meta_definida": {
    "pt": "Meta: {val} XP/dia",
    "en": "Goal: {val} XP/day"
  },
  "notif_prog_reset": {
    "pt": "Progresso resetado. Recarregando...",
    "en": "Progress reset. Reloading..."
  },
  "notif_quiz_bloqueado": {
    "pt": "Templo bloqueado!",
    "en": "Temple not unlocked!"
  },
  "notif_quiz_conj_insuf": {
    "pt": "Dados de conjugação insuficientes.",
    "en": "Insufficient conjugation data."
  },
  "notif_quiz_gram_insuf": {
    "pt": "Dados de gramática insuficientes para este nível.",
    "en": "Insufficient grammar data for this level."
  },
  "notif_quiz_listen_insuf": {
    "pt": "Dados de escuta insuficientes.",
    "en": "Insufficient listening data."
  },
  "notif_quiz_morf_insuf": {
    "pt": "Dados de morfologia insuficientes para este templo.",
    "en": "Insufficient morphology data for this temple."
  },
  "notif_quiz_sem_perguntas": {
    "pt": "Nenhuma pergunta disponível para este templo.",
    "en": "No questions available for this temple."
  },
  "notif_quiz_sem_perguntas_todos": {
    "pt": "Nenhuma pergunta disponível nos templos desbloqueados.",
    "en": "No questions available for the unlocked temples."
  },
  "notif_salvo": {
    "pt": "Salvo com sucesso!",
    "en": "Saved successfully!"
  },
  "notif_sons_ativados": {
    "pt": "🔔 Sons ativados",
    "en": "🔔 Sound on"
  },
  "notif_sons_desativados": {
    "pt": "🔕 Sons desativados",
    "en": "🔕 Sound off"
  },
  "notif_templo_completato": {
    "pt": "🏆 Templo {n} concluído!",
    "en": "🏆 Temple {n} completed!"
  },
  "notif_templo_sbloccato": {
    "pt": "🏛️ Templo {n} desbloqueado!",
    "en": "🏛️ Temple {n} unlocked!"
  },
  "notif_tutti_sbloccati": {
    "pt": "Todos os templos desbloqueados! 🎉",
    "en": "All temples unlocked! 🎉"
  },
  "ob_como_comecar": {
    "pt": "É muito fácil começar sua jornada:",
    "en": "It is very easy to start your journey:"
  },
  "ob_descricao": {
    "pt": "Este aplicativo foi projetado para levar você do zero ao inglês falado de forma simples, natural e altamente eficaz. Cada sessão dura cerca de 10 minutos.",
    "en": "This app is designed to take you from zero to spoken English in a simple, natural and highly effective way. Each session lasts about 10 minutes."
  },
  "ob_get_started": {
    "pt": "Começar! 🚀",
    "en": "Get Started! 🚀"
  },
  "ob_gramatica": {
    "pt": "Gramática:",
    "en": "Grammar:"
  },
  "ob_inside_li1": {
    "pt": "🏛️ <strong>Templos:</strong> Acompanhe seu progresso por cidades de língua inglesa.",
    "en": "🏛️ <strong>Temples:</strong> Track your progress across English-speaking cities."
  },
  "ob_inside_li2": {
    "pt": "🃏 <strong>Flashcards:</strong> Memorize palavras com o algoritmo FSRS-4.5.",
    "en": "🃏 <strong>Flashcards:</strong> Memorise words with the FSRS-4.5 algorithm."
  },
  "ob_inside_li3": {
    "pt": "🎯 <strong>Quiz:</strong> Teste seus conhecimentos e ganhe XP.",
    "en": "🎯 <strong>Quiz:</strong> Test your knowledge and earn XP."
  },
  "ob_inside_li4": {
    "pt": "📖 <strong>Vocabulário:</strong> Tradução, pronúncia IPA e exemplos.",
    "en": "📖 <strong>Vocabulary:</strong> Translation, IPA pronunciation and examples."
  },
  "ob_inside_li5": {
    "pt": "📚 <strong>Gramática:</strong> Lições do nível A1 ao B2.",
    "en": "📚 <strong>Grammar:</strong> Lessons from A1 to B2."
  },
  "ob_inside_li6": {
    "pt": "📜 <strong>Leituras:</strong> Leia textos autênticos em modo imersão.",
    "en": "📜 <strong>Reading:</strong> Read authentic texts in immersion mode."
  },
  "ob_inside_li7": {
    "pt": "💬 <strong>Diálogos:</strong> Pratique conversas reais do dia a dia.",
    "en": "💬 <strong>Dialogues:</strong> Practise real everyday conversations."
  },
  "ob_inside_li8": {
    "pt": "🎵 <strong>Músicas:</strong> Aprenda com músicas em inglês.",
    "en": "🎵 <strong>Songs:</strong> Learn with English songs."
  },
  "ob_inside_li9": {
    "pt": "🎤 <strong>Ouvir e Repetir:</strong> Treine sua pronúncia.",
    "en": "🎤 <strong>Listen &amp; Repeat:</strong> Train your pronunciation."
  },
  "ob_inside_title": {
    "pt": "O que há dentro",
    "en": "What's Inside"
  },
  "ob_prev_btn": {
    "pt": "Voltar",
    "en": "Back"
  },
  "ob_slide3_li1": {
    "pt": "Vá para a aba de <strong>TEMPLOS</strong>",
    "en": "Go to the <strong>TEMPLES</strong> tab"
  },
  "ob_slide3_li2": {
    "pt": "Escolha o <strong>1º Templo (New York - The Foundations)</strong>",
    "en": "Choose the <strong>1st Temple (New York - The Foundations)</strong>"
  },
  "ob_slide3_li3": {
    "pt": "Estude usando os <strong>FLASHCARDS</strong>",
    "en": "Study using the <strong>FLASHCARDS</strong>"
  },
  "ob_slide3_li4": {
    "pt": "Pratique o que aprendeu respondendo os <strong>QUIZZES</strong>!",
    "en": "Practise what you learned by answering the <strong>QUIZZES</strong>!"
  },
  "ob_start_title": {
    "pt": "Por onde começar?",
    "en": "Where to Start?"
  },
  "ob_tour_hint": {
    "pt": "💡 Toque em <strong>❓</strong> no topo a qualquer momento para rever o tour interativo do app!",
    "en": "💡 Tap <strong>❓</strong> at the top at any time to replay the interactive app tour!"
  },
  "ob_vocabulario": {
    "pt": "Vocabulário:",
    "en": "Vocabulary:"
  },
  "ob_welcome_title": {
    "pt": "Bem-vindo!",
    "en": "Welcome!"
  },
  "pdd_estudar": {
    "pt": "📚 Estudar",
    "en": "📚 Study"
  },
  "pdd_ouvir": {
    "pt": "🔊 Ouvir",
    "en": "🔊 Listen"
  },
  "pdd_titulo_label": {
    "pt": "🇺🇸 Palavra do Dia",
    "en": "🇺🇸 Word of the Day"
  },
  "prof_acc_quiz": {
    "pt": "Precisão nos quizzes",
    "en": "Quiz Accuracy"
  },
  "prof_audio_speed": {
    "pt": "Velocidade do Áudio",
    "en": "Audio Speed"
  },
  "prof_azzera": {
    "pt": "⚠️ Apagar Tudo",
    "en": "⚠️ Delete All"
  },
  "backup_popup_titulo": {
    "pt": "⚠️ Salve seu Progresso!",
    "en": "⚠️ Save your Progress!"
  },
  "backup_popup_desc": {
    "pt": "Se o cache ou histórico do navegador forem limpos, sua evolução nos estudos (XP, flashcards e templos) será perdida. Faça um backup regular!",
    "en": "If your browser cache or history is cleared, your learning progress (XP, flashcards, and temples) will be lost. Back up your data regularly!"
  },
  "backup_popup_btn": {
    "pt": "💾 Fazer Backup Agora",
    "en": "💾 Back Up Now"
  },
  "backup_popup_fechar": {
    "pt": "Fechar",
    "en": "Close"
  },
  "prof_backup_desc": {
    "pt": "O English Autentico guarda seu progresso apenas neste navegador. Exporte regularmente para não perder caso limpe o cache.",
    "en": "English Autentico saves your progress only in this browser. Export regularly to avoid losing it if you clear the cache."
  },
  "prof_cards_est": {
    "pt": "Cartas estudadas",
    "en": "Cards Studied"
  },
  "prof_cards_estudados": {
    "pt": "Cards estudados",
    "en": "Cards studied"
  },
  "prof_categorias": {
    "pt": "📚 Categorias Mais Estudadas",
    "en": "📚 Top Categories"
  },
  "prof_cats_est": {
    "pt": "📚 Categorias Mais Estudadas",
    "en": "Categories Studied"
  },
  "prof_confirm_apagar1": {
    "pt": "⚠️ This will erase ALL your progress — XP, flashcards, achievements and streak. Are you sure?",
    "en": "⚠️ This will erase ALL your progress — XP, flashcards, achievements and streak. Are you sure?"
  },
  "prof_confirm_apagar2": {
    "pt": "This action is IRREVERSIBLE. Do you really want to start from scratch?",
    "en": "This action is IRREVERSIBLE. Do you really want to start from scratch?"
  },
  "prof_confirm_import_content": {
    "pt": "Import {c} songs and {d} dialogues? Existing content will be kept and merged.",
    "en": "Import {c} songs and {d} dialogues? Existing content will be kept and merged."
  },
  "prof_confirm_importar": {
    "pt": "This will replace all your current progress. Confirm?",
    "en": "This will replace all your current progress. Confirm?"
  },
  "prof_conquistas": {
    "pt": "🏆 Minhas Conquistas",
    "en": "🏆 My Achievements"
  },
  "prof_conteudo_criado": {
    "pt": "Conteúdo Criado por Mim",
    "en": "My Custom Content"
  },
  "prof_conteudo_criado_desc": {
    "pt": "Músicas, diálogos, histórias, imitações e vocabulário adicionados manualmente ou via IA.",
    "en": "Songs, dialogues, stories, listen phrases, and vocabulary added manually or via AI."
  },
  "prof_dias_ativos": {
    "pt": "Dias ativos",
    "en": "Active days"
  },
  "prof_erro_formato": {
    "pt": "Invalid format",
    "en": "Invalid format"
  },
  "prof_esta_semana": {
    "pt": "📅 Esta Semana",
    "en": "📅 This Week"
  },
  "prof_exp_backup": {
    "pt": "⬇️ Exportar Backup",
    "en": "⬇️ Export Backup"
  },
  "prof_exp_conteudo": {
    "pt": "⬇️ Exportar Músicas e Diálogos",
    "en": "⬇️ Export Content"
  },
  "prof_export_content": {
    "pt": "⬇️ Exportar Conteúdo",
    "en": "⬇️ Export Content"
  },
  "prof_fc_revisadas": {
    "pt": "Flashcards revisadas",
    "en": "Reviewed Cards"
  },
  "prof_fc_revisados": {
    "pt": "Flashcards Revisados",
    "en": "Flashcards Reviewed"
  },
  "prof_gestao_dati": {
    "pt": "⚙️ Gestão de Dados",
    "en": "⚙️ Data Management"
  },
  "prof_imp_backup": {
    "pt": "⬆️ Importar Backup",
    "en": "⬆️ Import Backup"
  },
  "prof_imp_conteudo": {
    "pt": "⬆️ Importar Conteúdo",
    "en": "⬆️ Import Content"
  },
  "prof_import_content": {
    "pt": "⬆️ Importar Conteúdo",
    "en": "⬆️ Import Content"
  },
  "prof_importar_conteudo": {
    "pt": "Importar conteúdo?\n• {nc} músicas\n• {nd} diálogos\n• {ns} histórias\n• {ni} frases\n• {nv} palavras",
    "en": "Import content?\n• {nc} songs\n• {nd} dialogues\n• {ns} stories\n• {ni} listen phrases\n• {nv} vocabulary words"
  },
  "prof_nivel_atual": {
    "pt": "Nível Atual",
    "en": "Current Level"
  },
  "prof_palavras_dif": {
    "pt": "Palavras Difíceis",
    "en": "Difficult Words"
  },
  "prof_palavras_dom": {
    "pt": "Palavras Dominadas",
    "en": "Words Mastered"
  },
  "prof_precisao_quiz": {
    "pt": "Precisão no Quiz",
    "en": "Quiz Accuracy"
  },
  "prof_reiniciar_tour": {
    "pt": "🗺️ Reiniciar Tour",
    "en": "🗺️ Restart Introduction Tour"
  },
  "prof_sec_titulo": {
    "pt": "Meu Perfil",
    "en": "Meu Perfil"
  },
  "prof_secao_titulo": {
    "pt": "Meu Perfil",
    "en": "My Profile"
  },
  "prof_sequencia_atual": {
    "pt": "Sequência Atual",
    "en": "Current Streak"
  },
  "prof_sessoes": {
    "pt": "Sessões totais",
    "en": "Total sessions"
  },
  "prof_stats_gerais": {
    "pt": "📊 Estatísticas Gerais",
    "en": "📊 General Stats"
  },
  "prof_streak_atual": {
    "pt": "Streak atual",
    "en": "Current Streak"
  },
  "prof_templos_desb": {
    "pt": "Templos desbloqueados",
    "en": "Temples Unlocked"
  },
  "prof_templos_desbloq": {
    "pt": "Templos Desbloqueados",
    "en": "Temples Unlocked"
  },
  "prof_tempo_est": {
    "pt": "Tempo estimado",
    "en": "Est. Study Time"
  },
  "prof_tempo_estimado": {
    "pt": "Tempo Estimado",
    "en": "Estimated Time"
  },
  "prof_test_audio": {
    "pt": "🔊 Testar Áudio",
    "en": "🔊 Test Audio"
  },
  "prof_testar_audio": {
    "pt": "🔊 Testar Áudio",
    "en": "Test Voice"
  },
  "prof_tot_sessoes": {
    "pt": "Total de sessoes",
    "en": "Total Sessions"
  },
  "prof_traguardi": {
    "pt": "🏆 Minhas Conquistas",
    "en": "Achievements"
  },
  "prof_velocidade_audio": {
    "pt": "🎧 Velocidade do Áudio",
    "en": "Audio Speed"
  },
  "prof_xp_ganho": {
    "pt": "XP ganho",
    "en": "XP earned"
  },
  "prof_xp_total": {
    "pt": "XP Total",
    "en": "Total XP"
  },
  "profile.backup.export": {
    "pt": "Exportar Backup",
    "en": "Export Backup"
  },
  "profile.backup.import": {
    "pt": "Restaurar Backup",
    "en": "Restore Backup"
  },
  "profile.reset.confirm": {
    "pt": "Tem certeza que deseja apagar todo o seu progresso?",
    "en": "Are you sure you want to reset all your progress?"
  },
  "quantos_xp": {
    "pt": "Quantos XP quer ganhar por dia?",
    "en": "How many XP do you want to earn per day?"
  },
  "quiz_bom_resultado": {
    "pt": "📚 Bom! Mas pode melhorar!",
    "en": "📚 Good! But you can do better!"
  },
  "quiz_combo_fire": {
    "pt": "🔥 {n}x combo!",
    "en": "🔥 {n}x combo!"
  },
  "quiz_continuar": {
    "pt": "Continuar →",
    "en": "Continue →"
  },
  "quiz_correto": {
    "pt": "✅ Correto!",
    "en": "✅ Correct!"
  },
  "quiz_empty_almost": {
    "pt": "🎓 Quase pronto!",
    "en": "🎓 Almost ready!"
  },
  "quiz_empty_almost_d": {
    "pt": "Adicione mais palavras aos seus templos para desbloquear os quizzes. Cada templo precisa de pelo menos 4 palavras.",
    "en": "Add more words to your temples to unlock quizzes. Each temple needs at least 4 words."
  },
  "quiz_empty_no_temples": {
    "pt": "📭 Nenhum templo carregado ainda",
    "en": "📭 No temples loaded yet"
  },
  "quiz_empty_no_temples_d": {
    "pt": "Os dados dos templos ainda estão carregando. Aguarde ou verifique sua conexão.",
    "en": "Temple data is still loading. Please wait or check your connection."
  },
  "quiz_gram_nao_carregado": {
    "pt": "Dados de gramática não carregados.",
    "en": "Grammar data not loaded."
  },
  "quiz_gram_nivel": {
    "pt": "📚 Level {n}",
    "en": "📚 Level {n}"
  },
  "quiz_gram_titulo": {
    "pt": "📚 Quiz de Gramática",
    "en": "📚 Grammar Quiz"
  },
  "quiz_list_titulo": {
    "pt": "🎧 Quiz de Escuta",
    "en": "🎧 Listening Quiz"
  },
  "quiz_means_example": {
    "pt": "\"{w}\" significa \"{t}\". Exemplo: {e}",
    "en": "\"{w}\" means \"{t}\". Example: {e}"
  },
  "quiz_means_simple": {
    "pt": "\"{w}\" significa \"{t}\".",
    "en": "\"{w}\" means \"{t}\"."
  },
  "quiz_mixed_title": {
    "pt": "🌍 Quiz Misto<br><small>Todos os templos</small>",
    "en": "🌍 Mixed Quiz<br><small>All temples combined</small>"
  },
  "quiz_morf_genero_exp": {
    "pt": "\"{w}\" é {g}",
    "en": "\"{w}\" is {g}"
  },
  "quiz_morf_genero_fem": {
    "pt": "feminino",
    "en": "feminine"
  },
  "quiz_morf_genero_masc": {
    "pt": "masculino",
    "en": "masculine"
  },
  "quiz_morf_genero_pergunta": {
    "pt": "Qual é o gênero de \"{w}\"?",
    "en": "What is the gender of \"{w}\"?"
  },
  "quiz_morf_plural_exp": {
    "pt": "O plural de \"{w}\" é \"{p}\".",
    "en": "The plural of \"{w}\" is \"{p}\"."
  },
  "quiz_morf_plural_pergunta": {
    "pt": "Qual é o plural de \"{w}\"?",
    "en": "What is the plural of \"{w}\"?"
  },
  "quiz_morf_titulo": {
    "pt": "🔤 Quiz de Morfologia (Gênero & Plural)",
    "en": "🔤 Morphology Quiz (Gender & Plural)"
  },
  "quiz_muito_bom": {
    "pt": "👏 Muito bom! Continue assim!",
    "en": "👏 Very good! Keep it up!"
  },
  "quiz_nao_desista": {
    "pt": "💪 Não desista! Continue estudando!",
    "en": "💪 Don't give up! Keep studying!"
  },
  "quiz_nivel_requerido": {
    "pt": "Nível {n}",
    "en": "Level {n}"
  },
  "quiz_no_items_review": {
    "pt": "Nenhum item para revisar agora!",
    "en": "No items to review right now!"
  },
  "quiz_no_quizzes_avail": {
    "pt": "Nenhum quiz de {t} disponível",
    "en": "No {t} quizzes available"
  },
  "quiz_onboarding_desc": {
    "pt": "Teste seus conhecimentos, ganhe XP com combos e acompanhe seu progresso. Comece pelo Templo 1!",
    "en": "Test your knowledge, earn XP with combos, and track your progress. Start with Temple 1!"
  },
  "quiz_onboarding_title": {
    "pt": "🎯 Bem-vindo ao Quiz!",
    "en": "🎯 Welcome to Quiz!"
  },
  "quiz_ouvir": {
    "pt": "🔊 Ouvir",
    "en": "🔊 Listen"
  },
  "quiz_perfeito": {
    "pt": "🏆 Perfeito! Você domina o inglês!",
    "en": "🏆 Perfect! You are a master of English!"
  },
  "quiz_pergunta_de": {
    "pt": "Pergunta {a} de {b}",
    "en": "Question {a} of {b}"
  },
  "quiz_pergunta_inicial": {
    "pt": "Question 1 of 10",
    "en": "Question 1 of 10"
  },
  "quiz_res_titulo": {
    "pt": "Resultado do Quiz",
    "en": "Resultado do Quiz"
  },
  "quiz_resposta_correta_era": {
    "pt": "❌ A resposta correta era:",
    "en": "❌ The correct answer was:"
  },
  "quiz_result_title": {
    "pt": "Resultado do Quiz",
    "en": "Quiz Results"
  },
  "quiz_resume_notif": {
    "pt": "↩️ Retomando da pergunta {n}",
    "en": "↩️ Resuming from question {n}"
  },
  "quiz_review_later": {
    "pt": "💡 Revisaremos isso depois.",
    "en": "💡 We'll review this later."
  },
  "quiz_review_mistakes": {
    "pt": "🔄 Revisar Erros ({n} itens)",
    "en": "🔄 Review Mistakes ({n} items)"
  },
  "quiz_reviewing_items": {
    "pt": "🔄 Revisando {n} itens que você errou",
    "en": "🔄 Reviewing {n} items you got wrong"
  },
  "quiz_sec_titulo": {
    "pt": "Verifique seus Conhecimentos",
    "en": "Verifique seus Conhecimentos"
  },
  "quiz_sentence_complete_exp": {
    "pt": "A frase completa é: \"{s}\"",
    "en": "The complete sentence is: \"{s}\""
  },
  "quiz_streak_achieved": {
    "pt": "🏆 Streak de 7 dias no Quiz alcançado!",
    "en": "🏆 7-day Quiz Streak achieved!"
  },
  "quiz_streak_banner": {
    "pt": "{f} Quiz Streak: {n} dia{s}! Continue assim!",
    "en": "{f} Quiz Streak: {n} day{s}! Keep it going!"
  },
  "quiz_tense_future": {
    "pt": "⏩ Futuro",
    "en": "⏩ Future"
  },
  "quiz_tense_past": {
    "pt": "⏪ Passado Simples",
    "en": "⏪ Past Simple"
  },
  "quiz_tense_present": {
    "pt": "⏱️ Presente",
    "en": "⏱️ Present"
  },
  "quiz_tipo_listening": {
    "pt": "Escuta",
    "en": "Listening"
  },
  "quiz_tipo_gramatica": {
    "pt": "Gramática",
    "en": "Grammar"
  },
  "quiz_tipo_morfologia": {
    "pt": "Morfologia",
    "en": "Morphology"
  },
  "quiz_tipo_vocabulario": {
    "pt": "Vocabulário",
    "en": "Vocabulary"
  },
  "quiz_titulo": {
    "pt": "Teste seu Conhecimento",
    "en": "Test your Knowledge"
  },
  "quiz_verbi_nao_carregado": {
    "pt": "Dados de conjugação não carregados.",
    "en": "Conjugation data not loaded."
  },
  "quiz_verbi_titulo": {
    "pt": "🇺🇸 Quiz de Conjugação Verbal",
    "en": "🇺🇸 Verb Conjugation Quiz"
  },
  "quiz_voltar": {
    "pt": "← Voltar aos Templos",
    "en": "← Back to Temples"
  },
  "quiz_was_said_exp": {
    "pt": "A palavra dita foi \"{w}\".",
    "en": "The word said was \"{w}\"."
  },
  "quiz_what_does_mean": {
    "pt": "O que significa \"{w}\"?",
    "en": "What does \"{w}\" mean?"
  },
  "quiz_what_was_said": {
    "pt": "Qual foi a palavra dita? ({p})",
    "en": "Which word was said? ({p})"
  },
  "quiz_xp_ganhos": {
    "pt": "+{n} XP ganhos",
    "en": "+{n} XP earned"
  },
  "sec_canzoni_titulo": {
    "pt": "Modo Música",
    "en": "Song Mode"
  },
  "sec_dialoghi": {
    "pt": "Dialogue Mode",
    "en": "Dialogue Mode"
  },
  "sec_imitazione_titulo": {
    "pt": "Ouvir e Repetir",
    "en": "Listen & Repeat"
  },
  "stats_level": {
    "pt": "Nível {n}",
    "en": "Level {n}"
  },
  "stats_temples": {
    "pt": "Templos: {a}/{b}",
    "en": "Temples: {a}/{b}"
  },
  "stats_words": {
    "pt": "Palavras: {n}",
    "en": "Words: {n}"
  },
  "storage_limite": {
    "pt": "Limite de armazenamento atingido! O app não consegue salvar seu progresso. Por favor, libere espaço no navegador ou exclua alguns flashcards.",
    "en": "Storage Limit Reached! The app cannot save your progress. Please clear some space in your browser data or delete unused flashcards."
  },
  "storage_limite_fc": {
    "pt": "Limite de armazenamento! Não é possível salvar novos flashcards. Executando limpeza automática...",
    "en": "Storage Limit Reached! Cannot save new flashcards. Running auto-cleanup of oldest inactive cards..."
  },
  "storie_all_btn": {
    "pt": "‹ Todas as histórias",
    "en": "‹ All stories"
  },
  "storie_already_saved": {
    "pt": "✅ Já salvo",
    "en": "✅ Already saved"
  },
  "storie_back": {
    "pt": "‹ Leituras",
    "en": "‹ Reading"
  },
  "storie_btn_concluir": {
    "pt": "✓ Concluir (+{xp} XP)",
    "en": "✓ Finished (+{xp} XP)"
  },
  "storie_btn_mostrar": {
    "pt": "👁️ Mostrar tradução",
    "en": "👁️ Show translation"
  },
  "storie_btn_ouvir_tudo": {
    "pt": "🔊 Ouvir tudo",
    "en": "🔊 Listen to all"
  },
  "storie_btn_relida": {
    "pt": "✓ Ler novamente",
    "en": "✓ Re-read"
  },
  "storie_btn_todas": {
    "pt": "‹ Todas as histórias",
    "en": "‹ All stories"
  },
  "storie_btn_traduzir": {
    "pt": "👁️ Ocultar tradução",
    "en": "👁️ Hide translation"
  },
  "storie_btn_via_ia": {
    "pt": "🤖 via IA",
    "en": "🤖 via AI"
  },
  "storie_escolha": {
    "pt": "Escolha uma história para começar a ler",
    "en": "Choose a story to start reading"
  },
  "storie_filter_all": {
    "pt": "Todas",
    "en": "All"
  },
  "storie_fine": {
    "pt": "Fim",
    "en": "Fine"
  },
  "storie_hide_trans": {
    "pt": "👁️ Ocultar tradução",
    "en": "👁️ Hide translation"
  },
  "storie_ho_finito": {
    "pt": "✓ Concluir (+{xp} XP)",
    "en": "✓ Finished (+{xp} XP)"
  },
  "storie_listen_all": {
    "pt": "🔊 Ouvir tudo",
    "en": "🔊 Listen to all"
  },
  "storie_no_results": {
    "pt": "Nenhum resultado.",
    "en": "No results."
  },
  "storie_no_stories": {
    "pt": "Nenhuma história ainda.",
    "en": "No stories yet."
  },
  "storie_notif_ja_lida": {
    "pt": "Você já leu esta história.",
    "en": "You have already read this story."
  },
  "storie_notif_lida": {
    "pt": "📖 +{xp} XP por concluir a história!",
    "en": "📖 +{xp} XP for finishing the story!"
  },
  "storie_remove": {
    "pt": "🗑️ Remover",
    "en": "🗑️ Remove"
  },
  "storie_riletta": {
    "pt": "✓ Relida",
    "en": "✓ Re-read"
  },
  "storie_save_review": {
    "pt": "⭐ Salvar nos Flashcards",
    "en": "⭐ Save to Flashcards"
  },
  "storie_search_placeholder": {
    "pt": "🔍 Título ou autor...",
    "en": "🔍 Title or author..."
  },
  "storie_show_trans": {
    "pt": "👁️ Mostrar tradução",
    "en": "👁️ Show translation"
  },
  "storie_titulo_secao": {
    "pt": "Leitura em Inglês",
    "en": "English Reading"
  },
  "storie_vocab_titulo": {
    "pt": "📚 Vocabulário ({n})",
    "en": "📚 Vocabulary ({n})"
  },
  "streak_dia": {
    "pt": "🔥 {n} dia",
    "en": "🔥 {n} day"
  },
  "streak_dias": {
    "pt": "🔥 {n} dias",
    "en": "🔥 {n} days"
  },
  "templi_secao_titulo": {
    "pt": "Os Dez Templos do Inglês",
    "en": "The Ten Temples of English"
  },
  "templi_sub": {
    "pt": "Explore os templos e domine o vocabulário.",
    "en": "Explore the temples and master the vocabulary."
  },
  "templi_titulo": {
    "pt": "Sua Jornada",
    "en": "Your Journey"
  },
  "templo_completo_badge": {
    "pt": "✅ Completo",
    "en": "Done"
  },
  "templo_palavras_dom": {
    "pt": "{a}/{b} palavras dominadas",
    "en": "words mastered"
  },
  "templo_requer": {
    "pt": "Requer Nível {n} para desbloquear",
    "en": "Requires Level {n} to unlock"
  },
  "templo_requer_ajuda": {
    "pt": "Continue estudando para subir de nível e desbloquear este templo!",
    "en": "Keep studying to level up and unlock this temple!"
  },
  "title_blur_it": {
    "pt": "Hides the English column to test your memory",
    "en": "Hides the English column to test your memory"
  },
  "title_blur_pt": {
    "pt": "Hides the Portuguese column to test your memory",
    "en": "Hides the Portuguese column to test your memory"
  },
  "title_contexto": {
    "pt": "Context: sentence with blank",
    "en": "Context: sentence with blank"
  },
  "title_dica": {
    "pt": "Show hint (level 1)",
    "en": "Show hint (level 1)"
  },
  "title_escuta": {
    "pt": "Listening: guess from audio",
    "en": "Listening: guess from audio"
  },
  "title_favorito": {
    "pt": "Add/remove from favorites",
    "en": "Add/remove from favorites"
  },
  "title_reverso": {
    "pt": "Reverse: PT→EN",
    "en": "Reverse: PT→EN"
  },
  "tm_access_code": {
    "pt": "Tem um código de acesso?",
    "en": "Have an access code?"
  },
  "tm_code_placeholder": {
    "pt": "Digite o código...",
    "en": "Enter code..."
  },
  "tm_estudar_vocab": {
    "pt": "📚 Estudar vocabulário",
    "en": "📚 Study vocabulary"
  },
  "tm_take_quiz": {
    "pt": "❓ Fazer o Quiz",
    "en": "❓ Take the Quiz"
  },
  "tm_unlock": {
    "pt": "Desbloquear",
    "en": "Unlock"
  },
  "top_nav_canzoni": {
    "pt": "Músicas",
    "en": "Songs"
  },
  "top_nav_dialoghi": {
    "pt": "Diálogos",
    "en": "Dialogues"
  },
  "top_nav_flashcard": {
    "pt": "Flashcards",
    "en": "Flashcards"
  },
  "top_nav_grammatica": {
    "pt": "Grammar",
    "en": "Grammar"
  },
  "top_nav_imitazione": {
    "pt": "Ouvir e Repetir",
    "en": "Listen & Repeat"
  },
  "top_nav_quiz": {
    "pt": "Quiz",
    "en": "Quiz"
  },
  "top_nav_storie": {
    "pt": "Leituras",
    "en": "Reading"
  },
  "top_nav_templi": {
    "pt": "Templos",
    "en": "Temples"
  },
  "top_nav_vocabolario": {
    "pt": "Vocabulário",
    "en": "Vocabulary"
  },
  "tour_canzoni_desc": {
    "pt": "Acompanhe as letras e preencha as lacunas das músicas. Adicione suas músicas favoritas com o importador de IA. A música ajuda a fixar o vocabulário!",
    "en": "Follow English song lyrics and fill in the missing words. Add any song with the 🤖 AI Import button. Music makes vocabulary stick!"
  },
  "tour_canzoni_title": {
    "pt": "🎵 Músicas — Aprenda Cantando",
    "en": "🎵 Songs — Learn with Music"
  },
  "tour_config_desc": {
    "pt": "Mude para o modo escuro, silencie sons e acesse as opções de Perfil no topo da tela.",
    "en": "Switch to dark mode, mute sounds and access Profile options at the top of the screen."
  },
  "tour_config_title": {
    "pt": "⚙️ Configurações & Perfil",
    "en": "⚙️ Settings & Profile"
  },
  "tour_confirm_exit": {
    "pt": "Sair do tour?",
    "en": "Exit the tour?"
  },
  "tour_dialoghi_desc": {
    "pt": "Pratique diálogos do dia a dia (café, aeroporto, entrevista). Ouça, leia e responda — ou crie os seus próprios diálogos usando Inteligência Artificial!",
    "en": "Practise everyday English scenarios: coffee shops, airports, job interviews. Listen, read and respond — or import your own via the 🤖 AI button!"
  },
  "tour_dialoghi_title": {
    "pt": "💬 Diálogos — Situações Reais",
    "en": "💬 Dialogues — Real Conversations"
  },
  "tour_done_btn": {
    "pt": "🎉 Vamos lá!",
    "en": "🎉 Let's go!"
  },
  "tour_flashcard_desc": {
    "pt": "Selecione um templo e estude usando repetição espaçada. O algoritmo FSRS-4.5 agenda cada palavra para você revisar exatamente antes de esquecer.",
    "en": "Select a temple and study its words with Spaced Repetition. The FSRS-4.5 algorithm schedules each word so you review it just before you would forget it."
  },
  "tour_flashcard_title": {
    "pt": "🃏 Flashcards Inteligentes (FSRS)",
    "en": "🃏 Smart Flashcards (FSRS)"
  },
  "tour_goal_desc": {
    "pt": "A barra fina sob o cabeçalho mostra sua meta diária de XP. Defina metas e acompanhe seu ritmo de estudos diário.",
    "en": "The thin bar under the header tracks your daily XP goal. Keep your rhythm going every single day."
  },
  "tour_goal_title": {
    "pt": "🎯 Meta Diária Integrada",
    "en": "🎯 Integrated Daily Goal"
  },
  "tour_grammatica_desc": {
    "pt": "Lições completas do A1 ao C1: teoria direta, explicações claras, armadilhas comuns, tabelas e exercícios interativos aplicados ao inglês real.",
    "en": "Comprehensive lessons from A1 to C1: direct rules, clear explanations, common pitfalls, tables, and practical interactive exercises."
  },
  "tour_grammatica_title": {
    "pt": "📚 Gramática Autêntica (A1 ao C1)",
    "en": "📚 Authentic Grammar (A1 to C1)"
  },
  "tour_imitazione_desc": {
    "pt": "Escute nativos falando, grave sua voz com reconhecimento de voz e receba pontuação com análise fonética instantânea.",
    "en": "Listen to native speakers, record your voice with speech recognition, and get instant phonetic feedback and scoring."
  },
  "tour_imitazione_title": {
    "pt": "🎙️ Pronunciation Dojo",
    "en": "🎙️ Pronunciation Dojo"
  },
  "tour_immersion_desc": {
    "pt": "Imersão prática completa: simule conversas cotidianas em Diálogos, leia textos reais em Leituras e aprenda cantando em Músicas com letras sincronizadas e importação via IA!",
    "en": "Complete immersion: practise everyday dialogues, read authentic stories with instant word translations, and sing along to synchronized song lyrics with AI import!"
  },
  "tour_immersion_title": {
    "pt": "💬 Diálogos, Leituras & Músicas",
    "en": "💬 Dialogues, Reading & Songs"
  },
  "tour_modes_desc": {
    "pt": "Normal (EN→PT) · Reverso (PT→EN) · Contexto (lacunas) · Escuta (áudio) · Escrita (desenho manual). Desenvolva todas as habilidades cognitivas!",
    "en": "Normal (EN→PT) · Reverse (PT→EN) · Context (fill the gap) · Listen (audio guess) · Writing (finger or stylus). Build comprehensive fluency!"
  },
  "tour_modes_title": {
    "pt": "🔄 5 Modos de Estudo",
    "en": "🔄 5 Study Modes"
  },
  "tour_next_btn": {
    "pt": "Próximo →",
    "en": "Next →"
  },
  "tour_phrasal_desc": {
    "pt": "Mais de 415 phrasal verbs classificados por tipo (separáveis, inseparáveis, intransitivos, 3 palavras). Treine a Regra de Ouro do pronome, filtre por partícula e expanda os cards para áudios e exemplos!",
    "en": "Over 415 phrasal verbs classified by type (separable, inseparable, intransitive, 3-word). Master the Golden Pronoun Rule, filter by particle, and expand cards for audio and examples!"
  },
  "tour_phrasal_title": {
    "pt": "🧩 Phrasal Verbs Lab",
    "en": "🧩 Phrasal Verbs Lab"
  },
  "tour_prev_btn": {
    "pt": "← Voltar",
    "en": "← Back"
  },
  "tour_progress": {
    "pt": "{{current}} de {{total}}",
    "en": "{{current}} of {{total}}"
  },
  "tour_pronun_desc": {
    "pt": "Escute nativos falando, grave sua voz com reconhecimento de voz e receba pontuação com análise fonética instantânea para uma pronúncia autêntica.",
    "en": "Listen to native speakers, record your voice with speech recognition, and receive instant phonetic feedback and scoring for authentic pronunciation."
  },
  "tour_pronun_title": {
    "pt": "🎙️ Pronunciation Dojo",
    "en": "🎙️ Pronunciation Dojo"
  },
  "tour_quiz_desc": {
    "pt": "Vocabulário, gramática, escuta e conjugação. 4 tipos de exercícios dinâmicos para consolidar a fixação e conquistar bônus de XP!",
    "en": "Vocabulary, grammar, listening and spelling. 4 dynamic exercise types to solidify retention and earn bonus XP!"
  },
  "tour_quiz_title": {
    "pt": "❓ Quiz — Fixação Ativa",
    "en": "❓ Quiz — Active Recall"
  },
  "tour_rate_desc": {
    "pt": "Errei = amanhã · Difícil = 1 dia · Bom = 3 dias · Fácil = 2 semanas. O algoritmo se ajusta com base na sua resposta — a honestidade traz os melhores resultados!",
    "en": "Again = tomorrow · Hard = 1 day · Good = 3 days · Easy = 2 weeks. The algorithm adjusts future intervals based on your answer — honesty beats the system!"
  },
  "tour_rate_title": {
    "pt": "⭐ Avalie com Honestidade",
    "en": "⭐ Rate Every Card Honestly"
  },
  "tour_reading_desc": {
    "pt": "Histórias reais em inglês do nível A1 ao B2. Toque em qualquer palavra para ver a tradução. Use o Modo Imersão para ocultar a tradução em português!",
    "en": "Real English stories at A1–B2 level. Tap any word to see its translation. Use Immersion Mode to hide the Portuguese and challenge yourself!"
  },
  "tour_reading_title": {
    "pt": "📜 Leituras — Textos Autênticos",
    "en": "📜 Reading — Authentic Texts"
  },
  "tour_sidebar_desc": {
    "pt": "Navegue com fluidez entre os 10 módulos de estudo. Passe o mouse para abrir e ver os nomes das abas, ou clique no alfinete (📌) para fixar o menu aberto.",
    "en": "Smoothly navigate between all 10 study modules. Hover to reveal tab titles, or click the pin button (📌) to lock the sidebar open."
  },
  "tour_sidebar_title": {
    "pt": "🏛️ Menu Lateral de Navegação",
    "en": "🏛️ Sidebar Navigation"
  },
  "tour_stats_desc": {
    "pt": "Cada atividade rende XP. Acumule XP para subir de nível e desbloquear novos templos. Mantenha sua sequência 🔥 ativa estudando todos os dias!",
    "en": "Every activity earns XP. Accumulate enough and your level rises, unlocking new temples. Keep your 🔥 streak alive by studying every day!"
  },
  "tour_stats_title": {
    "pt": "🏅 Nível, XP & Sequência",
    "en": "🏅 Level, XP & Streak"
  },
  "tour_templi_desc": {
    "pt": "Sua jornada é dividida em Templos temáticos (New York, London, Oxford...). Cada templo contém cerca de 20 palavras essenciais com fonética, áudio nativo e exemplos.",
    "en": "Your journey is divided into thematic Temples (New York, London, Oxford...). Each temple features ~20 essential words with phonetics, native audio and real contexts."
  },
  "tour_templi_title": {
    "pt": "🏛️ Templos do Conhecimento",
    "en": "🏛️ Temples of Knowledge"
  },
  "tour_vocabolario_desc": {
    "pt": "Dicionário completo com pronúncia em todas as palavras. Use os botões 'Ocultar EN' ou 'Ocultar PT' para testar ativamente sua memória antes de conferir.",
    "en": "Comprehensive vocabulary bank with audio for every word. Tap 'Hide EN' or 'Hide PT' to test your active recall before revealing."
  },
  "tour_vocabolario_title": {
    "pt": "📖 Vocabulário & Auto-Teste",
    "en": "📖 Vocabulary & Self-Test"
  },
  "tour_welcome_desc": {
    "pt": "Este tour interativo mostrará as principais ferramentas e recursos do app. Leva menos de 2 minutos — vamos lá!",
    "en": "This interactive tour walks you through all key tools and features. Takes under 2 minutes — let's go!"
  },
  "tour_welcome_title": {
    "pt": "👋 Bem-vindo ao English Autêntico!",
    "en": "👋 Welcome to English Autêntico!"
  },
  "vocab_btn_ia": {
    "pt": "🤖 Adicionar via IA",
    "en": "🤖 Adicionar via IA"
  },
  "vocab_busca_placeholder": {
    "pt": "Buscar em inglês ou português...",
    "en": "Buscar em inglês ou português..."
  },
  "vocab_click_listen": {
    "pt": "Clique para ouvir",
    "en": "Click to listen"
  },
  "vocab_ouvir_exemplo": {
    "pt": "Ouvir frase de exemplo",
    "en": "Listen to example sentence"
  },
  "vocab_dificeis": {
    "pt": "⚠️ Difíceis",
    "en": "⚠️ Difficult"
  },
  "vocab_e_mais": {
    "pt": "... and {n} more words. Use the filters to narrow down.",
    "en": "... and {n} more words. Use the filters to narrow down."
  },
  "vocab_estudar_filtro": {
    "pt": "🃏 Estudar este filtro",
    "en": "🃏 Study this filter"
  },
  "vocab_favoritos": {
    "pt": "❤️ Favoritos",
    "en": "❤️ Favorites"
  },
  "vocab_learning": {
    "pt": "Em aprendizado",
    "en": "Learning"
  },
  "vocab_mastered": {
    "pt": "Dominada",
    "en": "Mastered"
  },
  "vocab_nenhuma": {
    "pt": "Nenhuma palavra encontrada.",
    "en": "No words found."
  },
  "vocab_nenhuma_palavra": {
    "pt": "Nenhuma palavra carregada ainda.",
    "en": "No words loaded yet."
  },
  "vocab_new": {
    "pt": "Nova",
    "en": "New"
  },
  "vocab_ocultar_it": {
    "pt": "👁 Ocultar EN",
    "en": "👁 Hide EN"
  },
  "vocab_ocultar_pt": {
    "pt": "👁 Ocultar PT",
    "en": "👁 Hide PT"
  },
  "vocab_palavra_dificil": {
    "pt": "{n} palavra difícil (3+ erros)",
    "en": "{n} difficult word (3+ errors)"
  },
  "vocab_palavras_dificeis": {
    "pt": "{n} palavras difíceis (3+ erros)",
    "en": "{n} difficult words (3+ errors)"
  },
  "vocab_palavras_total": {
    "pt": "{n} palavras no total",
    "en": "{n} words total"
  },
  "vocab_parole_filtro": {
    "pt": "🃏 {n} palavras do filtro ativo",
    "en": "🃏 {n} words from active filter"
  },
  "vocab_pill_adicionadas": {
    "pt": "🤖 Adicionadas",
    "en": "🤖 Adicionadas"
  },
  "vocab_pill_nativas": {
    "pt": "📚 Nativas",
    "en": "📚 Nativas"
  },
  "vocab_pill_todas": {
    "pt": "Todas",
    "en": "Todas"
  },
  "vocab_resultados": {
    "pt": "{m} de {f} resultado(s) — {t} palavras no total",
    "en": "{m} of {f} result(s) — {t} words total"
  },
  "vocab_search_placeholder": {
    "pt": "🔍 Buscar em inglês ou português...",
    "en": "🔍 Search in English or Portuguese..."
  },
  "vocab_sec_titulo": {
    "pt": "O Vocabulário",
    "en": "O Vocabulário"
  },
  "vocab_tip_ocultar": {
    "pt": "💡 Dica: Use \"Ocultar PT\" ou \"Ocultar EN\" para testar sua memória!",
    "en": "💡 Vocab tip: Use \"Hide EN\" or \"Hide PT\" to test yourself!"
  },
  "vocab_todas_categorias": {
    "pt": "Todas as categorias",
    "en": "Todas as categorias"
  },
  "vocab_todas_cats": {
    "pt": "Todas as categorias",
    "en": "All categories"
  },
  "vocab_todos_templos": {
    "pt": "Todos os templos",
    "en": "All temples"
  }
},

  init() {
    const saved = localStorage.getItem('en_language') || localStorage.getItem('en_idioma') || 'pt';
    this._language = (saved === 'en' || saved === 'pt') ? saved : 'pt';

    // 1. Stale-While-Revalidate: Hydrate instantly from local cache if present
    this._hydrateLocalCache('pt');
    this._hydrateLocalCache('en');
    this.translateDOM();

    // 2. Revalidate external locale files in the background without blocking UI
    this._revalidateLocaleJSON('pt');
    this._revalidateLocaleJSON('en');
  },

  inicializar() {
    this.init();
  },

  _hydrateLocalCache(lang) {
    try {
      const raw = localStorage.getItem('en_locale_cache_' + lang);
      if (!raw) return;
      const obj = JSON.parse(raw);
      this._mergeDictionary(lang, obj);
    } catch (_) {}
  },

  _mergeDictionary(lang, obj) {
    if (!obj || typeof obj !== 'object') return;
    for (const [k, v] of Object.entries(obj)) {
      if (!this.dict[k]) this.dict[k] = {};
      this.dict[k][lang] = v;
    }
  },

  async _revalidateLocaleJSON(lang) {
    const url = this.localesMap[lang];
    if (!url) return;
    try {
      const resp = await fetch(url);
      if (!resp.ok) return;
      const json = await resp.json();
      this._mergeDictionary(lang, json);
      try {
        localStorage.setItem('en_locale_cache_' + lang, JSON.stringify(json));
      } catch (_) {}
      if (lang === this._language) {
        this.translateDOM();
      }
    } catch (_) {}
  },

  changeLanguage(lang) {
    if (lang !== 'pt' && lang !== 'en') return;
    document.body.classList.add('lang-switching'); // Visual fade out
    setTimeout(() => {
      this._language = lang;
      localStorage.setItem('en_language', lang);
      localStorage.setItem('en_idioma', lang);
      this.translateDOM();
      document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang } }));

      // Re-render grammar tab if currently open and cached
      if (typeof Grammar !== 'undefined' && Grammar.data) {
        if (Grammar.currentLesson) {
          const container = document.getElementById('grammar-container');
          if (container && Grammar._renderLessonHTML) {
            container.innerHTML = Grammar._renderLessonHTML(Grammar.currentLesson);
          }
        } else if (Grammar.renderSelector) {
          Grammar.renderSelector();
        }
      }

      if (typeof App !== 'undefined') {
        if (App.updateStats) App.updateStats();
        if (App.renderTemples) App.renderTemples();
      }

      document.body.classList.remove('lang-switching'); // Fade in

      if (typeof App !== 'undefined' && App.notify) {
        if (lang === 'en') {
          const firstTime = !localStorage.getItem('en_immersion_used');
          if (firstTime) {
            localStorage.setItem('en_immersion_used', '1');
            App.notify('Welcome! Immersion Mode activated 🇺🇸🇬🇧', 'alert');
          } else {
            App.notify('Language switched to English!', 'success');
          }
        } else {
          App.notify('Idioma alterado para Português!', 'success');
        }
      }
    }, 150);
  },

  mudarIdioma(lang) {
    this.changeLanguage(lang);
  },

  toggleLanguage() {
    this.changeLanguage(this._language === 'pt' ? 'en' : 'pt');
  },

  toggleIdioma() {
    this.toggleLanguage();
  },

  // Returns translated string by key
  t(key, fallback = null) {
    if (!this.dict[key]) {
      return fallback !== null ? fallback : key;
    }
    return this.dict[key][this._language] || this.dict[key]['pt'] || fallback || key;
  },

  traduzir(key, fallback = null) {
    return this.t(key, fallback);
  },

  // Translates all elements with data-i18n attributes in the DOM
  translateDOM() {
    // Translate textContent / value
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!this.dict[key]) return;
      const text = this.dict[key][this._language] || this.dict[key]['pt'];
      if (!text) return;

      if (el.tagName.toLowerCase() === 'input' && el.type === 'button') {
        el.value = text;
      } else if (el.tagName.toLowerCase() === 'button' && el.querySelector('span:not(.hdr-btn-ico):not(.nav-tab-icon)')) {
        el.querySelector('span:not(.hdr-btn-ico):not(.nav-tab-icon)').textContent = text;
      } else {
        el.textContent = text;
      }
    });

    // Translate placeholder attributes (data-i18n-placeholder)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (this.dict[key]) {
        const text = this.dict[key][this._language] || this.dict[key]['pt'];
        if (text) el.placeholder = text;
      }
    });

    // Translate title attributes (data-i18n-title)
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (this.dict[key]) {
        const text = this.dict[key][this._language] || this.dict[key]['pt'];
        if (text) el.title = text;
      }
    });

    // Translate innerHTML elements (data-i18n-html)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (this.dict[key]) {
        const text = this.dict[key][this._language] || this.dict[key]['pt'];
        if (text) el.innerHTML = text;
      }
    });

    // Update header language toggle pill
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      const ptSeg = document.getElementById('lang-pill-pt');
      const enSeg = document.getElementById('lang-pill-en') || document.getElementById('lang-pill-it');
      if (ptSeg) {
        ptSeg.classList.toggle('ativo', this._language === 'pt');
        ptSeg.classList.toggle('active', this._language === 'pt');
      }
      if (enSeg) {
        enSeg.classList.toggle('ativo', this._language === 'en');
        enSeg.classList.toggle('active', this._language === 'en');
      }
      langBtn.title = this._language === 'pt' ? 'Switch to English' : 'Mudar para Português';
    }
  },

  traduzirDOM() {
    this.translateDOM();
  }
};

window.I18n = I18n;
