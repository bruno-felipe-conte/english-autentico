// ============================================================
// js/app/templos.js — Temples System & Word of the Day
// ============================================================

const AppTemplos = {
  TEMPLO_CORES: [
    null,
    'linear-gradient(135deg, #003E8A, #002D65)',   // 1  New York
    'linear-gradient(135deg, #E65100, #BF360C)',   // 2  Los Angeles
    'linear-gradient(135deg, #37474F, #263238)',   // 3  Chicago
    'linear-gradient(135deg, #1B5E20, #2E7D32)',   // 4  Nashville
    'linear-gradient(135deg, #0277BD, #01579B)',   // 5  San Francisco
    'linear-gradient(135deg, #4A148C, #6A1B9A)',   // 6  Boston
    'linear-gradient(135deg, #880E4F, #AD1457)',   // 7  New Orleans
    'linear-gradient(135deg, #004D40, #00695C)',   // 8  Atlanta
    'linear-gradient(135deg, #BF360C, #E64A19)',   // 9  Austin
    'linear-gradient(135deg, #1A237E, #283593)',   // 10 Washington DC
    'linear-gradient(135deg, #2C3E50, #1A252F)',   // 11
    'linear-gradient(135deg, #1ABC9C, #148F77)',   // 12
    'linear-gradient(135deg, #E74C3C, #CB4335)',   // 13
    'linear-gradient(135deg, #3498DB, #2980B9)',   // 14
    'linear-gradient(135deg, #27AE60, #1E8449)',   // 15
    'linear-gradient(135deg, #F39C12, #D68910)',   // 16
    'linear-gradient(135deg, #8E44AD, #7D3C98)',   // 17
    'linear-gradient(135deg, #16A085, #148F77)',   // 18
    'linear-gradient(135deg, #D35400, #BA4A00)',   // 19
    'linear-gradient(135deg, #2980B9, #1A5276)',   // 20
    'linear-gradient(135deg, #1565C0, #0D47A1)',   // 21
    'linear-gradient(135deg, #27AE60, #196F3D)',   // 22
    'linear-gradient(135deg, #8E44AD, #512E6D)',   // 23
    'linear-gradient(135deg, #E67E22, #CA6F1E)',   // 24
    'linear-gradient(135deg, #2E86C1, #154360)',   // 25
    'linear-gradient(135deg, #6C3483, #512E6D)',   // 26
    'linear-gradient(135deg, #1A5276, #0E3460)',   // 27
    'linear-gradient(135deg, #117A65, #0B5345)',   // 28
    'linear-gradient(135deg, #9B59B6, #7D3C98)',   // 29
    'linear-gradient(135deg, #B7950B, #7D6608)',   // 30
    'linear-gradient(135deg, #1F618D, #154360)',   // 31
    'linear-gradient(135deg, #922B21, #7B241C)',   // 32
    'linear-gradient(135deg, #1E8449, #196F3D)',   // 33
    'linear-gradient(135deg, #CA6F1E, #A04000)',   // 34
    'linear-gradient(135deg, #148F77, #0E6655)',   // 35
    'linear-gradient(135deg, #2980B9, #1F618D)',   // 36
    'linear-gradient(135deg, #6D4C41, #4E342E)',   // 37
    'linear-gradient(135deg, #455A64, #263238)',   // 38
    'linear-gradient(135deg, #283593, #1A237E)',   // 39
    'linear-gradient(135deg, #00695C, #004D40)',   // 40
    'linear-gradient(135deg, #4A148C, #38006B)',   // 41
    'linear-gradient(135deg, #BF360C, #870000)',   // 42
    'linear-gradient(135deg, #827717, #5D4037)',   // 43
    'linear-gradient(135deg, #1B5E20, #003300)',   // 44
    'linear-gradient(135deg, #0D47A1, #002171)',   // 45
    'linear-gradient(135deg, #880E4F, #560027)',   // 46
    'linear-gradient(135deg, #E65100, #BF360C)',   // 47
    'linear-gradient(135deg, #37474F, #1C313A)',   // 48
    'linear-gradient(135deg, #4E342E, #3E2723)',   // 49
    'linear-gradient(135deg, #0D47A1, #002171)',   // 50
    'linear-gradient(135deg, #1A5276, #0E3460)',   // 51 Oxford
    'linear-gradient(135deg, #C0392B, #962D22)',   // 52 London
    'linear-gradient(135deg, #003E8A, #002855)',   // 53 Cambridge
    'linear-gradient(135deg, #1E8449, #145A32)',   // 54 Edinburgh
    'linear-gradient(135deg, #7D3C98, #512E6D)',   // 55 Manchester
    'linear-gradient(135deg, #D4AC0D, #B7950B)',   // 56 Bristol
    'linear-gradient(135deg, #BA4A00, #873600)',   // 57 Glasgow
    'linear-gradient(135deg, #2E86C1, #1B4F72)',   // 58 Belfast
    'linear-gradient(135deg, #A93226, #78281F)',   // 59 Liverpool
    'linear-gradient(135deg, #117A65, #0B5345)',   // 60 Cardiff
    'linear-gradient(135deg, #229954, #196F3D)',   // 61 Dublin
    'linear-gradient(135deg, #2874A6, #1B4F72)',   // 62 Galway
    'linear-gradient(135deg, #B9770E, #7E5109)',   // 63 Cork
    'linear-gradient(135deg, #2C3E50, #1A252F)',   // 64 Toronto
    'linear-gradient(135deg, #16A085, #0E6655)',   // 65 Vancouver
    'linear-gradient(135deg, #8E44AD, #6C3483)',   // 66 Montreal
    'linear-gradient(135deg, #27AE60, #1E8449)',   // 67 Ottawa
    'linear-gradient(135deg, #CA6F1E, #935116)',   // 68 Calgary
    'linear-gradient(135deg, #2980B9, #1F618D)',   // 69 Sydney
    'linear-gradient(135deg, #D35400, #A04000)',   // 70 Melbourne
    'linear-gradient(135deg, #0E6251, #0B4C3E)',   // 71 Brisbane
    'linear-gradient(135deg, #1A5276, #154360)',   // 72 Perth
    'linear-gradient(135deg, #6C3483, #4A235A)',   // 73 Auckland
    'linear-gradient(135deg, #1F618D, #17486B)',   // 74 Wellington
    'linear-gradient(135deg, #B03A2E, #78281F)',   // 75 Singapore
    'linear-gradient(135deg, #003E8A, #D4A843)',   // 76 Cape Town
  ],

  TEMPLO_NOMES: [
    null,
    'The Foundations',          // 1
    'The Everyday Journey',     // 2
    'The Road Ahead',           // 3
    'Taste & Tradition',        // 4
    'Clockwork',                // 5
    'Structure & Syntax',       // 6
    'Conversation Flow',        // 7
    'Cultural Depths',          // 8
    'Professional Edge',        // 9
    'Literary Arts',            // 10
    'History Unveiled',         // 11
    'Life\'s Rhythm',           // 12
    'Everyday Moments',         // 13
    'The City Life',            // 14
    'Family & Home',            // 15
    'Creative Expression',      // 16
    'Business World',           // 17
    'Health & Wellness',        // 18
    'The Workplace',            // 19
    'World Travel',             // 20
    'Education & Study',        // 21
    'Feelings & Mind',          // 22
    'Social Life',              // 23
    'Digital Era',              // 24
    'Culinary Arts',            // 25
    'Sports & Leisure',         // 26
    'Art & Music',              // 27
    'Nature & Outdoors',        // 28
    'Financial Matters',        // 29
    'Law & Society',            // 30
    'Public Affairs',           // 31
    'Cultural Heritage',        // 32
    'Media & News',             // 33
    'Ethics & Ideas',           // 34
    'Science & Fact',           // 35
    'Historical Eras',          // 36
    'Geography & Land',         // 37
    'Myths & Legends',          // 38
    'Beliefs & Faith',          // 39
    'Language Patterns',        // 40
    'Memory & Mind',            // 41
    'Public Speaking',          // 42
    'Career Ambitions',         // 43
    'Social Dynamics',          // 44
    'Leadership Roles',         // 45
    'Teamwork in Action',       // 46
    'Conflict & Peace',         // 47
    'Global Perspectives',      // 48
    'Mastering Structure',      // 49
    'The Summit',               // 50
    'Academic Excellence',      // 51
    'Urban Transit',            // 52
    'Academia & Study',         // 53
    'Highland Weather',         // 54
    'Home & Living',            // 55
    'Market & Shopping',        // 56
    'Kitchen & Flavors',        // 57
    'Health & Well-being',      // 58
    'Music & Sound',            // 59
    'Coast & Horizons',         // 60
    'Bonds & Social Life',      // 61
    'Travel & Sightseeing',     // 62
    'Career & Ambition',        // 63
    'Commerce & Finance',       // 64
    'Athletics & Energy',       // 65
    'Media & Connection',       // 66
    'Earth & Climate',          // 67
    'Justice & Civil Rights',   // 68
    'Emotional Insight',        // 69
    'Idioms & Nuance',          // 70
    'Strategy & Deals',         // 71
    'Tech Frontiers',           // 72
    'Arts & Literature',        // 73
    'Global Diplomacy',         // 74
    'Global Trade Hub',         // 75
    'Rhetoric & Mind'           // 76
  ],

  TEMPLO_CIDADES: [
    null,
    'London', 'Manchester', 'Edinburgh', 'Cardiff', 'Belfast',
    'Dublin', 'Glasgow', 'Bristol', 'Newcastle', 'Leeds',
    'Birmingham', 'Liverpool', 'Coventry', 'Leicester', 'Sheffield',
    'Norwich', 'Reading', 'Oxford', 'Cambridge', 'Southampton',
    'London', 'Manchester', 'Edinburgh', 'Cardiff', 'Belfast',
    'Dublin', 'Glasgow', 'Bristol', 'Newcastle', 'Leeds',
    'Birmingham', 'Liverpool', 'Coventry', 'Leicester', 'Sheffield',
    'Norwich', 'Reading', 'Oxford', 'Cambridge', 'Southampton',
    'London', 'Manchester', 'Edinburgh', 'Cardiff', 'Belfast',
    'Dublin', 'Glasgow', 'Bristol', 'Newcastle', 'Leeds',
    'Oxford',
    'London', 'Cambridge', 'Edinburgh', 'Manchester', 'Bristol',
    'Glasgow', 'Belfast', 'Liverpool', 'Cardiff', 'Dublin',
    'Galway', 'Cork', 'Toronto', 'Vancouver', 'Montreal',
    'Ottawa', 'Calgary', 'Sydney', 'Melbourne', 'Brisbane',
    'Perth', 'Auckland', 'Wellington', 'Singapore', 'Cape Town'
  ],

  TEMPLO_NIVEL_MINIMO: {
    1:1,  2:2,  3:4,  4:6,  5:8,  6:10, 7:13, 8:15, 9:17, 10:20,
    36:99, // T36 desativado
    11:2, 12:2, 13:2, 14:2, 15:2, 17:2, 18:2, 19:2,
    22:2, 23:2, 25:2, 28:2, 33:2, 34:2,
    16:4, 20:4, 21:4, 24:4, 29:4, 32:4, 35:4,
    26:7, 27:7, 30:7, 31:7, 37:7, 38:7, 43:7, 46:7,
    39:11, 40:11, 42:11, 44:11, 45:11,
    41:15, 47:15, 48:15, 49:15, 50:15, 51:22,
    52:2, 53:2, 54:2, 55:2, 56:2, 57:2, 58:2, 59:2, 60:2,
    61:4, 62:4, 63:4, 64:4, 65:4, 66:4, 67:4, 68:4, 69:4, 70:4,
    71:7, 72:7, 73:7, 74:7, 75:11, 76:15
  },

  get UNLOCK_CODE() {
    try {
      return (typeof localStorage !== 'undefined' ? localStorage.getItem('en_unlock_code') : null) || '2012';
    } catch (_) {
      return '2012';
    }
  },

  TEMPLO_DESC: [
    null,
    'New York is where everything begins. In this temple you take your first steps in English: greetings, numbers, introductions. "Hello", "thank you", "excuse me" — the foundations of every conversation. The city that never sleeps is waiting for you.',
    'Los Angeles is sun, family, and everyday life. In this temple you talk about your home, your family, and daily routines. Who is your sister? Where do you live? What do you do on weekends? The language of life.',
    'Chicago is always on the move. Here you master travel vocabulary: airports, trains, hotels, directions. This temple prepares you for any journey through the English-speaking world.',
    'Nashville is music, food, and culture. In this temple you discover American flavors and traditions: food, drinks, recipes, restaurants. To talk about food is to talk about a culture.',
    'San Francisco moves fast and thinks ahead. This temple teaches you to manage time in English — schedules, appointments, seasons — and to describe your routine with clarity and confidence.',
    'Boston, home to some of the world\'s greatest universities, is the ideal place to study the structure of the language. Here you tackle complex grammar, relative clauses, and advanced structures. You learn to think in English.',
    'New Orleans is jazz, debate, and eloquence. In this temple you explore argumentation, formal conversation, and elegant expression. How do you defend an opinion? How do you negotiate with grace? Fluent English awaits.',
    'Atlanta is a crossroads of cultures, stories, and voices. This temple opens you to American cultural heritage — history, civil rights, music, regional traditions of a vast and fascinating country.',
    'Austin is the city of tech, creativity, and work. This temple gives you professional vocabulary: resumes, meetings, negotiations, emails. The English of the workplace demands precision and respect.',
    'Washington DC is the home of American literature, rhetoric, and ideas. In the tenth temple you reach the summit: the language of literature, speeches, philosophy, and artistic expression. Words don\'t just communicate — they inspire.',
    'Philadelphia holds the secrets of the past. Explore history, milestones, and historical narratives in this temple.',
    'Phoenix is energy and movement. Talk about schedules, time management, and the patterns of daily life.',
    'San Antonio is warm and welcoming. Learn to describe routine tasks, hobbies, and simple daily interactions.',
    'San Diego is beach and city combined. Navigate urban spaces, neighborhoods, and the dynamic environment of city living.',
    'Dallas is about home and community. Discuss family connections, household objects, and comfortable living spaces.',
    'San Jose is innovation and art. Express your thoughts, creative ideas, hobbies, and design concepts.',
    'Austin drives tech and commerce. Master vocabulary for companies, products, startup life, and basic economics.',
    'Jacksonville promotes a healthy life. Discuss symptoms, fitness routines, nutrition, and wellness practices.',
    'Fort Worth values diligence. Learn terms for workplace duties, projects, tools, and professional achievements.',
    'Columbus is a hub of travelers. Acquire key phrases for airports, hotels, bookings, and navigating foreign countries.',
    'Charlotte is a center for learning. Master the vocabulary of classrooms, studies, assignments, and research basics.',
    'Seattle inspires introspection. Learn terms for emotions, habits, self-improvement, and future plans.',
    'Denver is about community. Talk about friendship, social gatherings, celebrations, and networking.',
    'Portland lives in the future. Discover words for software, hardware, internet tools, and digital communication.',
    'Las Vegas is culinary diversity. Master the vocabulary of restaurants, menus, cooking methods, and tastes.',
    'Memphis moves with energy. Talk about outdoor sports, leisure activities, games, and fitness.',
    'Detroit is soul and industry. Express your ideas about concerts, musical instruments, paintings, and performances.',
    'Oklahoma City values the land. Discuss nature, weather phenomena, climate, and conservation.',
    'St. Louis is about commerce. Understand vocabulary for banking, saving money, personal finance, and shopping.',
    'Louisville demands order. Learn about rules, rights, agreements, and public regulations.',
    'Baltimore is a civic center. Discuss social issues, government systems, community projects, and public opinions.',
    'Milwaukee celebrates diversity. Explore traditions, festivals, cultural backgrounds, and history.',
    'Albuquerque is always connected. Learn to describe news events, media channels, articles, and public reports.',
    'Tucson invites deep reflection. Discuss values, ethical choices, abstract concepts, and logical arguments.',
    'Fresno is growth and observation. Learn terms for science experiments, facts, and logical deductions.',
    'Sacramento is rich in history. Relive historical moments, eras, and major global events.',
    'Kansas City lies at the heart. Master words for landscapes, countries, borders, and global geography.',
    'Mesa holds ancient stories. Discover tales of heroes, myths, folklore, and cultural legends.',
    'Atlanta values spiritual history. Explore terms for beliefs, traditions, world religions, and philosophies.',
    'Virginia Beach is a window to communication. Study grammar terms, idioms, and language learning strategies.',
    'Omaha is about focus. Learn to describe mental processes, recall techniques, and brain exercises.',
    'Colorado Springs rises high. Master presentation skills, debate vocabulary, and speech delivery.',
    'Raleigh is full of opportunity. Prepare for job interviews, resume reviews, and career discussions.',
    'Miami is social energy. Connect with people, exchange contacts, and talk about collaborations.',
    'Long Beach inspires guidance. Talk about teams, strategies, management, and leading projects.',
    'Oakland is about collaboration. Learn vocabulary for group work, division of labor, and collective effort.',
    'Minneapolis values peace. Express disagreement, negotiation points, and how to reach common ground.',
    'Wichita welcomes the world. Discuss cultural differences, global customs, and international communication.',
    'New Orleans flows with complex structures. Master advanced relative clauses, conditionals, and subtle grammar rules.',
    'Tampa is the final summit. Refine your advanced English expressions, nuances, and idioms for perfect fluency.',
    'Oxford is the world-renowned center of excellence. Master advanced scientific terms, citations, peer reviews, and academic thesis writing.',
    'London is the heartbeat of global movement. Master transit vocabulary: underground lines, commuters, stations, and bustling streets. Travel the metropolis like a local.',
    'Cambridge is world-renowned for scholarship and discovery. Learn essential academic tools: textbooks, syllabi, tutors, and research methods. Step into a world of knowledge.',
    'Edinburgh sweeps across dramatic hills and unpredictable skies. Describe seasons, weather phenomena, highland mists, and the natural world with clarity.',
    'Manchester blends historic charm with modern comfort. Master the vocabulary of home spaces, furniture, cozy corners, and daily domestic life.',
    'Bristol buzzes with independent spirit and vibrant markets. Navigate supermarket aisles, artisan produce, receipts, and friendly bargains.',
    'Glasgow celebrates hospitality and warm dining. Explore culinary terminology: cooking utensils, savory herbs, baking dough, and delicious starters.',
    'Belfast embodies resilience and care. Master health essentials: clinics, symptoms, bandages, body parts, and clinical recovery.',
    'Liverpool is the birthplace of legendary musical revolutions. Speak the language of rhythm, stages, amplifiers, recitals, and vibrant applause.',
    'Cardiff opens outward to dramatic Welsh coastlines and green ravines. Describe breathtaking shores, tides, valleys, and hiking adventures.',
    'Dublin is legendary for warm storytelling and deep camaraderie. Learn the vocabulary of heartfelt friendships, family bonds, and lively conversation.',
    'Galway is the gateway to wild Atlantic journeys. Master travel planning, backpacks, scenic landmarks, excursions, and adventurous treks.',
    'Cork is an energetic hub of business and innovation. Discuss workplace dynamics, career growth, flextime, morale, and leadership.',
    'Toronto drives international markets and enterprise. Understand personal finance, assets, equity, investments, and economic resilience.',
    'Vancouver thrives outdoors between mountains and ocean. Talk about sportsmanship, training, endurance, playoffs, and fitness victories.',
    'Montreal is a cultural crossroads of digital media and dialogue. Master the vocabulary of newscasts, broadcasts, online feeds, and press freedom.',
    'Ottawa champions sustainability and stewardship of nature. Discuss renewable power, climate action, river basins, and environmental care.',
    'Calgary values fairness and community governance. Explore legal principles: courtrooms, due process, affidavits, and democratic rights.',
    'Sydney inspires optimism and personal growth. Describe inner emotional states, serenity, benevolence, courage, and genuine sincerity.',
    'Melbourne celebrates artistic subtlety and street-smart wit. Master iconic English idioms, figurative expressions, and conversational flair.',
    'Brisbane navigates Pacific corporate trade. Master corporate strategy, joint ventures, due diligence, compliance, and contract negotiations.',
    'Perth looks to the future with resource engineering and cutting-edge software. Discuss neural networks, semiconductors, automation, and microprocessors.',
    'Auckland inspires vibrant Pacific creativity and dramatic literature. Analyze poetic prose, parables, stage soliloquies, and aesthetic design.',
    'Wellington is a capital of statecraft and peace. Discuss international treaties, diplomatic accords, national sovereignty, and global cooperation.',
    'Singapore is the world undisputed crossroads of maritime commerce. Master supply chain logistics, freight, customs clearance, and global transit.',
    'Cape Town stands at the majestic meeting point of two oceans. Reach the pinnacle of English fluency: classical oratory, dialectics, philosophy, and cogent thought.'
  ],

  renderizarParolaDia() {
    const container = document.getElementById('word-of-the-day') || document.getElementById('parola-del-giorno');
    if (!container) return;

    const desbloqueados = (this.estado.progresso?.templos_desbloqueados) || [1];
    const vocab = [];
    desbloqueados.forEach(i => {
      const d = this.estado.templosData[i];
      if (d && d.palavras) d.palavras.forEach(p => vocab.push({ ...p, _templo: i }));
    });
    if (vocab.length === 0) { container.style.display = 'none'; return; }

    const now   = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const dayN  = Math.floor((now - start) / 86400000);

    let cached = null;
    try { cached = JSON.parse(localStorage.getItem('en_palavra_dia') || 'null'); } catch (e) { console.error("[core:templos] Cache error:", e); }
    const todayStr = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    let palavra;
    if (cached && cached.data === todayStr) {
      palavra = vocab.find(p => p.id === cached.id) || vocab[dayN % vocab.length];
    } else {
      palavra = vocab[dayN % vocab.length];
      try { localStorage.setItem('en_palavra_dia', JSON.stringify({ data: todayStr, id: palavra.id })); } catch (e) { console.error("[core:templos] Cache set error:", e); }
    }
    if (!palavra) { container.style.display = 'none'; return; }

    const ipa = palavra.audio_ipa
      ? (palavra.audio_ipa.startsWith('/') ? palavra.audio_ipa : `/${palavra.audio_ipa}/`)
      : '';
    const data = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    const isFav = this.estado.progresso && this.estado.progresso.favoritos && this.estado.progresso.favoritos.includes(palavra.id);
    const favEmoji = isFav ? '❤️' : '🤍';
    const termo = palavra.ingles || palavra.english || palavra.word || palavra.italiano || '';
    const traducao = palavra.portugues || palavra.translation || '';
    const cat = palavra.categoria || palavra.category || '';
    const ex = palavra.exemplo || palavra.example || '';
    const exPt = palavra.exemplo_pt || palavra.example_pt || '';

    const safeTermo = typeof Sanitize !== 'undefined' ? Sanitize.escapeHtml(termo) : termo;
    const safeTraducao = typeof Sanitize !== 'undefined' ? Sanitize.escapeHtml(traducao) : traducao;
    const safeCat = typeof Sanitize !== 'undefined' ? Sanitize.escapeHtml(cat) : cat;
    const safeEx = typeof Sanitize !== 'undefined' ? Sanitize.escapeHtml(ex) : ex;
    const safeExPt = typeof Sanitize !== 'undefined' ? Sanitize.escapeHtml(exPt) : exPt;
    const safeJsTermo = typeof Sanitize !== 'undefined' ? Sanitize.escapeJsString(termo) : termo.replace(/'/g, "\\'");

    container.innerHTML = `
      <div class="pdd-header">
        <span class="pdd-label">${I18n.t('pdd_titulo_label')}</span>
        <span class="pdd-data">${data}</span>
      </div>
      <div class="pdd-body">
        <div class="pdd-palavra">${safeTermo}</div>
        ${ipa ? `<div class="pdd-ipa">${ipa}</div>` : ''}
        <div class="pdd-traducao">${safeTraducao}</div>
        ${safeCat ? `<span class="pdd-cat">${safeCat}</span>` : ''}
        ${safeEx ? `<div class="pdd-exemplo">"${safeEx}"${safeExPt ? ` — ${safeExPt}` : ''}</div>` : ''}
      </div>
      <div class="pdd-acoes">
        <button class="pdd-btn" onclick="App.pronunciar('${safeJsTermo}')">${I18n.t('pdd_ouvir')}</button>
        <button class="pdd-btn pdd-btn-study" onclick="App.estudarPalavra('${palavra.id}',${palavra._templo})">${I18n.t('pdd_estudar')}</button>
        <button class="pdd-btn" style="color: ${isFav ? '#e74c3c' : 'inherit'}" onclick="App.toggleFavorito('${palavra.id}'); const fav = (App.estado.progresso?.favoritos || []).includes('${palavra.id}'); this.innerHTML = (fav ? '❤️' : '🤍') + ' Fav'; this.style.color = fav ? '#e74c3c' : 'inherit';">
          ${favEmoji} Fav
        </button>
      </div>
    `;
    container.style.display = 'block';
  },

  renderizarCardContinuar() {
    const p = this.estado.progresso;
    if (!p || !p.ultimo_estudo) return '';

    const diffHoras = (Date.now() - p.ultimo_estudo) / 3600000;
    const quando = diffHoras < 0.1 ? I18n.t('cc_agora_mesmo')
                 : diffHoras < 1   ? I18n.t('cc_ha_minutos')
                 : diffHoras < 24  ? I18n.t('cc_ha_horas').replace('{n}', Math.round(diffHoras))
                 :                   I18n.t('cc_ha_dias').replace('{n}', Math.round(diffHoras/24));

    const ultimaSecao = p.ultima_secao || 'flashcards';
    let secaoNome = 'Flashcards';
    if (ultimaSecao === 'temples' || ultimaSecao === 'templi')           secaoNome = I18n.t('cc_secao_inicio');
    if (ultimaSecao === 'quiz')                                          secaoNome = 'Quiz';
    if (ultimaSecao === 'vocab' || ultimaSecao === 'vocabolario')        secaoNome = I18n.t('cc_secao_vocab');
    if (ultimaSecao === 'grammar' || ultimaSecao === 'grammatica')      secaoNome = I18n.t('cc_secao_gram');
    if (ultimaSecao === 'profile' || ultimaSecao === 'profilo')         secaoNome = I18n.t('cc_secao_perfil');
    if (ultimaSecao === 'dialogues' || ultimaSecao === 'dialoghi')      secaoNome = I18n.t('top_nav_dialoghi');
    if (ultimaSecao === 'songs' || ultimaSecao === 'canzoni')           secaoNome = I18n.t('top_nav_canzoni');
    if (ultimaSecao === 'pronunciation' || ultimaSecao === 'imitazione')secaoNome = I18n.t('top_nav_imitazione');
    if (ultimaSecao === 'stories' || ultimaSecao === 'storie')          secaoNome = I18n.t('top_nav_storie');

    return `<div class="card-continuar" onclick="App.navegar('${ultimaSecao}')">
      <div>
        <div class="cc-label">${I18n.t('cc_continuar_label')}</div>
        <div class="cc-info">${I18n.t('cc_ultima_sessao')} <strong>${quando}</strong> (${secaoNome})</div>
      </div>
      <div class="cc-cta">${I18n.t('cc_retomar')}</div>
    </div>`;
  },

  renderizarTemplos() {
    const contContainer = document.getElementById('continuar-container');
    if (contContainer) {
      contContainer.innerHTML = this.renderizarCardContinuar();
    }

    const metaContainer = document.getElementById('meta-prazo-container');
    if (metaContainer) {
      metaContainer.innerHTML = this._renderizarMetaPrazo();
    }

    const grid = document.getElementById('temples-grid');
    if (!grid) return;
    grid.innerHTML = '';

    for (let i = 1; i <= 76; i++) {
      if (!this.estado.templosData[i] && !this.TEMPLO_NIVEL_MINIMO[i]) continue;
      const data = this.estado.templosData[i];
      const desbloqueado = this.estado.progresso.templos_desbloqueados.includes(i);
      const concluido = this.estado.progresso.templos_concluidos.includes(i);
      const nivelMinimo = this.TEMPLO_NIVEL_MINIMO[i] || i;
      const cor = this.TEMPLO_CORES[i] || this.TEMPLO_CORES[1];

      const nome = (data && data.nome) ? data.nome : (this.TEMPLO_NOMES[i] || `Temple ${i}`);
      const cidade = (data && data.cidade) ? data.cidade : (this.TEMPLO_CIDADES[i] || '—');
      const nivel = data ? data.nivel : '—';
      const totalPalavras = data && data.palavras ? data.palavras.length : 0;

      let dominadas = 0;
      if (data && data.palavras) {
        dominadas = data.palavras.filter(p => {
          const sm = this.estado.flashcardData[p.id];
          if (!sm) return false;
          return (sm.reps >= 3) || (sm.repeticoes >= 3) || (sm.stability > 7);
        }).length;
      }

      const progPercent = totalPalavras > 0 ? Math.round((dominadas / totalPalavras) * 100) : 0;
      const card = document.createElement('div');
      card.className = `temple-card templo-card${desbloqueado ? ' desbloqueado' : ' bloqueado'}${concluido ? ' concluido' : ''}`;

      const badgeCompleto = concluido ? `<span class="nivel-badge templo-concluido-badge">${I18n.t('templo_completo_badge')}</span>` : '';
      const txtDominadas = I18n.t('templo_palavras_dom').includes('{dom}')
        ? I18n.t('templo_palavras_dom').replace('{dom}', dominadas).replace('{tot}', totalPalavras)
        : `${dominadas}/${totalPalavras} ${I18n.t('templo_palavras_dom')}`;
      const txtNum = `${I18n.idioma === 'en' ? 'Temple' : 'Templo'} ${i}`;

      const safeNome = typeof Sanitize !== 'undefined' ? Sanitize.escapeHtml(nome) : nome;
      const safeCidade = typeof Sanitize !== 'undefined' ? Sanitize.escapeHtml(cidade) : cidade;

      if (desbloqueado) {
        card.style.cursor = 'pointer';
        card.onclick = () => this.estudarTemplo(i);
        card.innerHTML = `
          <div class="temple-header templo-header" style="background:${cor}">
            <div class="temple-num templo-num">${txtNum}</div>
            <div class="temple-name templo-nome">${safeNome}</div>
            <div class="temple-meta templo-meta">
              <span class="temple-city templo-cidade">📍 ${safeCidade}</span>
              <span class="nivel-badge">${nivel}</span>
              ${badgeCompleto}
            </div>
          </div>
          <div class="temple-body templo-body">
            <div class="progresso-label templo-progresso-label">${txtDominadas}</div>
            <div class="progresso-bar-container templo-progresso">
              <div class="progresso-bar-fill templo-progresso-fill" style="width:${progPercent}%"></div>
            </div>
          </div>
        `;
      } else {
        card.style.cursor = 'pointer';
        card.onclick = () => this.abrirModalTemplo(i);
        card.innerHTML = `
          <div class="temple-header templo-header" style="background:${cor}; filter:grayscale(0.6)">
            <div class="temple-num templo-num">${txtNum}</div>
            <div class="temple-name templo-nome">🔒 ${safeNome}</div>
            <div class="temple-meta templo-meta">
              <span class="temple-city templo-cidade">📍 ${safeCidade}</span>
              <span class="nivel-badge">${nivel}</span>
            </div>
          </div>
          <div class="temple-body templo-body">
            <div class="lock-info">${I18n.t('templo_requer').replace('{n}', nivelMinimo)}</div>
            <div class="progresso-bar-container templo-progresso">
              <div class="progresso-bar-fill templo-progresso-fill" style="width:0%"></div>
            </div>
          </div>
        `;
      }
      grid.appendChild(card);
    }
    this.renderizarParolaDia();
  },

  estudarTemplo(temploNum) {
    this.navegar('flashcard');
    const sel = document.getElementById('flashcard-temple-select') || document.getElementById('flashcard-templo-select');
    if (sel) sel.value = temploNum;
    if (typeof Flashcards !== 'undefined') Flashcards.init(temploNum);
  },

  estudarPalavra(palavraId, temploNum) {
    this.navegar('flashcard');
    const sel = document.getElementById('flashcard-temple-select') || document.getElementById('flashcard-templo-select');
    if (sel) sel.value = temploNum;
    if (typeof Flashcards === 'undefined') return;
    Flashcards.init(temploNum);
    const idx = Flashcards.cartasDisponiveis.findIndex(p => p.id === palavraId);
    if (idx > 0) {
      const [carta] = Flashcards.cartasDisponiveis.splice(idx, 1);
      Flashcards.cartasDisponiveis.unshift(carta);
      Flashcards.indiceAtual = 0;
      Flashcards.mostrarCarta();
    }
  },

  quizTemplo(temploNum) {
    this.navegar('quiz');
    if (typeof Quiz !== 'undefined') {
      Quiz.iniciar(temploNum);
    }
  },

  abrirModalTemplo(i) {
    const data = this.estado.templosData[i];
    const desbloqueado = this.estado.progresso?.templos_desbloqueados?.includes(i) ?? false;
    const concluido    = this.estado.progresso?.templos_concluidos?.includes(i) ?? false;
    const cor          = this.TEMPLO_CORES[i] || this.TEMPLO_CORES[1];
    const nome         = (data && data.nome) ? data.nome : (this.TEMPLO_NOMES[i] || `Temple ${i}`);
    const cidade       = (data && data.cidade) ? data.cidade : (this.TEMPLO_CIDADES[i] || '—');
    const nivel        = data ? data.nivel : '—';
    const desc         = this.TEMPLO_DESC[i] || '';
    const nivelMinimo  = this.TEMPLO_NIVEL_MINIMO[i] || i;
    const totalPalavras = data && data.palavras ? data.palavras.length : 0;

    let dominadas = 0;
    if (data && data.palavras) {
      dominadas = data.palavras.filter(p => {
        const sm = this.estado.flashcardData[p.id];
        if (!sm) return false;
        return (sm.reps >= 3) || (sm.repeticoes >= 3) || (sm.stability > 7);
      }).length;
    }
    const progPercent = totalPalavras > 0 ? Math.round((dominadas / totalPalavras) * 100) : 0;
    const isEn = typeof I18n !== 'undefined' && I18n.idioma === 'en';
    const txtDominadas = `${dominadas} / ${totalPalavras} ${isEn ? 'words mastered' : 'palavras dominadas'} · ${progPercent}%`;

    const body = document.getElementById('temple-modal-body') || document.getElementById('templo-modal-body');
    if (!body) return;

    const safeNome = typeof Sanitize !== 'undefined' ? Sanitize.escapeHtml(nome) : nome;
    const safeCidade = typeof Sanitize !== 'undefined' ? Sanitize.escapeHtml(cidade) : cidade;
    const safeDesc = typeof Sanitize !== 'undefined' ? Sanitize.escapeHtml(desc) : desc;

    body.innerHTML = `
      <div class="tm-header" style="background:${cor}${!desbloqueado ? ';filter:grayscale(0.5)' : ''}">
        <button class="tm-close" onclick="App.fecharModalTemplo()" title="Close">✕</button>
        <div class="tm-num">${isEn ? 'Temple' : 'Templo'} ${i}</div>
        <div class="tm-nome">${safeNome}</div>
        <div class="tm-meta">
          <span class="tm-badge">📍 ${safeCidade}</span>
          <span class="tm-badge">${nivel}</span>
          ${concluido ? `<span class="tm-badge">${I18n.t('templo_completo_badge')}</span>` : ''}
        </div>
      </div>
      <div class="tm-content">
        ${desbloqueado ? `
          <div class="tm-progress-wrap">
            <div class="tm-progress-label">${txtDominadas}</div>
            <div class="tm-progress-bar"><div class="tm-progress-fill" style="width:${progPercent}%"></div></div>
          </div>
        ` : `<div class="tm-lock-banner">🔒 ${I18n.t('templo_requer').replace('{n}', nivelMinimo)}</div>`}
        <p class="tm-desc">${safeDesc}</p>
        ${desbloqueado ? `
          <div class="tm-actions">
            <button class="tm-btn-primary" onclick="App.fecharModalTemplo();App.estudarTemplo(${i})">${I18n.t('tm_estudar_vocab')}</button>
            <button class="tm-btn-quiz" onclick="App.fecharModalTemplo();App.quizTemplo(${i})">${I18n.t('tm_take_quiz')}</button>
          </div>
        ` : `
          <details class="tm-unlock-area">
            <summary>${I18n.t('tm_access_code')}</summary>
            <div class="tm-unlock-form">
              <input id="tm-code-input" type="password" placeholder="${I18n.t('tm_code_placeholder')}" class="tm-code-input"
                onkeydown="if(event.key==='Enter')App.tentarDesbloquear(${i})">
              <button onclick="App.tentarDesbloquear(${i})" class="tm-btn-unlock">${I18n.t('tm_unlock')}</button>
            </div>
          </details>
        `}
      </div>
    `;

    const modalEl = document.getElementById('temple-modal') || document.getElementById('templo-modal');
    if (modalEl) modalEl.classList.add('ativo');
    document.body.style.overflow = 'hidden';
  },

  fecharModalTemplo() {
    const modalEl = document.getElementById('temple-modal') || document.getElementById('templo-modal');
    if (modalEl) modalEl.classList.remove('ativo');
    document.body.style.overflow = '';
  },

  pedirSenhaTemplo(temploNum) {
    const nome = this.TEMPLO_NOMES[temploNum] || `Temple ${temploNum}`;
    const codigo = prompt(`🔒 Temple ${temploNum} — ${nome}\n\n${I18n.t('tm_code_placeholder')}`);
    if (codigo === null) return;
    if (codigo.trim() === this.UNLOCK_CODE) {
      const p = this.estado.progresso;
      if (!p.templos_desbloqueados.includes(temploNum)) {
        p.templos_desbloqueados.push(temploNum);
        p.templos_desbloqueados.sort((a, b) => a - b);
      }
      this.salvarProgresso();
      this.renderizarTemplos();
      this.atualizarStats();
      if (typeof Progressao !== 'undefined') Progressao.verificarDesbloqueioTemplos();
      this.notificar(I18n.t('notif_templo_sbloccato').replace('{n}', temploNum), 'sucesso');
    } else {
      this.notificar('notif_codice_errato', 'erro');
    }
  },

  tentarDesbloquear(temploNum) {
    const input = document.getElementById('tm-code-input');
    if (!input) return;
    if (input.value.trim() === this.UNLOCK_CODE) {
      const p = this.estado.progresso;
      p.templos_desbloqueados = Array.from({length: 76}, (_, i) => i + 1);
      this.salvarProgresso();
      this.fecharModalTemplo();
      this.renderizarTemplos();
      this.atualizarStats();
      if (typeof Progressao !== 'undefined') Progressao.verificarDesbloqueioTemplos();
      if (typeof Flashcards !== 'undefined') Flashcards.atualizarSelectTemplo?.();
      this.notificar('notif_tutti_sbloccati', 'sucesso');
    } else {
      input.style.borderColor = '#003E8A';
      input.value = '';
      input.placeholder = I18n.t('notif_codice_errato');
      setTimeout(() => { input.style.borderColor = ''; input.placeholder = I18n.t('tm_code_placeholder'); }, 2000);
    }
  }
};

if (typeof window !== 'undefined') {
  window.AppTemplos = AppTemplos;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AppTemplos;
}
