const fs = require('fs');

const timeToMs = (tStr) => {
  if (!tStr) return 0;
  const parts = tStr.split(':');
  if (parts.length === 2) return (parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10)) * 1000;
  return 0;
};

const data = JSON.parse(fs.readFileSync('data/canzoni.json', 'utf-8'));

const newSong = {
    'titulo': 'Believer',
    'artista': 'Imagine Dragons',
    'nivel': 'A2',
    'icone': '🎵',
    'estrofes': [
{'id': 1, 'line': 'First things first, I\'ma say all the words inside my head', 'translation': 'Em primeiro lugar, vou dizer todas as palavras dentro da minha cabeça', 'words': [{'w': 'First', 't': '0:14', 'm': 'Primeiro', 'hidden': false}, {'w': 'things', 't': '0:15', 'm': 'coisas', 'hidden': false}, {'w': 'first,', 't': '0:15', 'm': 'primeiro', 'hidden': false}, {'w': 'I\'ma', 't': '0:15', 'm': 'Eu vou', 'hidden': false}, {'w': 'say', 't': '0:16', 'm': 'dizer', 'hidden': false}, {'w': 'all', 't': '0:16', 'm': 'todas', 'hidden': false}, {'w': 'the', 't': '0:16', 'm': 'as', 'hidden': false}, {'w': 'words', 't': '0:17', 'm': 'palavras', 'hidden': true}, {'w': 'inside', 't': '0:17', 'm': 'dentro', 'hidden': false}, {'w': 'my', 't': '0:17', 'm': 'minha', 'hidden': false}, {'w': 'head', 't': '0:18', 'm': 'cabeça', 'hidden': false}]},
{'id': 2, 'line': 'I\'m fired up and tired of the way that things have been', 'translation': 'Estou animado e cansado do jeito que as coisas têm sido', 'words': [{'w': 'I\'m', 't': '0:19', 'm': 'Eu estou', 'hidden': false}, {'w': 'fired', 't': '0:19', 'm': 'incendiado', 'hidden': false}, {'w': 'up', 't': '0:20', 'm': 'para cima', 'hidden': false}, {'w': 'and', 't': '0:20', 'm': 'e', 'hidden': false}, {'w': 'tired', 't': '0:20', 'm': 'cansado', 'hidden': true}, {'w': 'of', 't': '0:21', 'm': 'de', 'hidden': false}, {'w': 'the', 't': '0:21', 'm': 'o', 'hidden': false}, {'w': 'way', 't': '0:22', 'm': 'jeito', 'hidden': false}, {'w': 'that', 't': '0:22', 'm': 'que', 'hidden': false}, {'w': 'things', 't': '0:22', 'm': 'coisas', 'hidden': false}, {'w': 'have', 't': '0:23', 'm': 'têm', 'hidden': false}, {'w': 'been', 't': '0:23', 'm': 'sido', 'hidden': false}]},
{'id': 3, 'line': 'The way that things have been, oh-ooh', 'translation': 'O jeito que as coisas têm sido, oh-ooh', 'words': [{'w': 'The', 't': '0:25', 'm': 'O', 'hidden': false}, {'w': 'way', 't': '0:25', 'm': 'jeito', 'hidden': false}, {'w': 'that', 't': '0:26', 'm': 'que', 'hidden': false}, {'w': 'things', 't': '0:26', 'm': 'coisas', 'hidden': false}, {'w': 'have', 't': '0:27', 'm': 'têm', 'hidden': false}, {'w': 'been,', 't': '0:27', 'm': 'sido', 'hidden': false}, {'w': 'oh-ooh', 't': '0:27', 'm': 'oh-ooh', 'hidden': false}]},
{'id': 4, 'line': 'Second thing second, don\'t you tell me what you think that I could be', 'translation': 'Em segundo lugar, não me diga o que você pensa que eu poderia ser', 'words': [{'w': 'Second', 't': '0:28', 'm': 'Segunda', 'hidden': false}, {'w': 'thing', 't': '0:28', 'm': 'coisa', 'hidden': false}, {'w': 'second,', 't': '0:29', 'm': 'segunda', 'hidden': false}, {'w': 'don\'t', 't': '0:29', 'm': 'não', 'hidden': false}, {'w': 'you', 't': '0:29', 'm': 'você', 'hidden': false}, {'w': 'tell', 't': '0:29', 'm': 'diga', 'hidden': false}, {'w': 'me', 't': '0:30', 'm': 'me', 'hidden': false}, {'w': 'what', 't': '0:30', 'm': 'o que', 'hidden': false}, {'w': 'you', 't': '0:30', 'm': 'você', 'hidden': false}, {'w': 'think', 't': '0:30', 'm': 'pensa', 'hidden': true}, {'w': 'that', 't': '0:31', 'm': 'que', 'hidden': false}, {'w': 'I', 't': '0:31', 'm': 'eu', 'hidden': false}, {'w': 'could', 't': '0:31', 'm': 'poderia', 'hidden': false}, {'w': 'be', 't': '0:31', 'm': 'ser', 'hidden': false}]},
{'id': 5, 'line': 'I\'m the one at the sail, I\'m the master of my sea', 'translation': 'Eu sou aquele no leme, eu sou o mestre do meu mar', 'words': [{'w': 'I\'m', 't': '0:32', 'm': 'Eu sou', 'hidden': false}, {'w': 'the', 't': '0:32', 'm': 'o', 'hidden': false}, {'w': 'one', 't': '0:32', 'm': 'um', 'hidden': false}, {'w': 'at', 't': '0:33', 'm': 'na', 'hidden': false}, {'w': 'the', 't': '0:33', 'm': 'a', 'hidden': false}, {'w': 'sail,', 't': '0:33', 'm': 'vela', 'hidden': false}, {'w': 'I\'m', 't': '0:34', 'm': 'Eu sou', 'hidden': false}, {'w': 'the', 't': '0:34', 'm': 'o', 'hidden': false}, {'w': 'master', 't': '0:35', 'm': 'mestre', 'hidden': true}, {'w': 'of', 't': '0:35', 'm': 'de', 'hidden': false}, {'w': 'my', 't': '0:36', 'm': 'meu', 'hidden': false}, {'w': 'sea', 't': '0:36', 'm': 'mar', 'hidden': false}]},
{'id': 6, 'line': 'The master of my sea, oh-ooh', 'translation': 'O mestre do meu mar, oh-ooh', 'words': [{'w': 'The', 't': '0:38', 'm': 'O', 'hidden': false}, {'w': 'master', 't': '0:39', 'm': 'mestre', 'hidden': false}, {'w': 'of', 't': '0:39', 'm': 'de', 'hidden': false}, {'w': 'my', 't': '0:40', 'm': 'meu', 'hidden': false}, {'w': 'sea,', 't': '0:40', 'm': 'mar', 'hidden': false}, {'w': 'oh-ooh', 't': '0:41', 'm': 'oh-ooh', 'hidden': false}]},
{'id': 7, 'line': 'I was broken from a young age', 'translation': 'Fui quebrado desde jovem', 'words': [{'w': 'I', 't': '0:42', 'm': 'Eu', 'hidden': false}, {'w': 'was', 't': '0:42', 'm': 'fui', 'hidden': false}, {'w': 'broken', 't': '0:42', 'm': 'quebrado', 'hidden': false}, {'w': 'from', 't': '0:42', 'm': 'desde', 'hidden': false}, {'w': 'a', 't': '0:43', 'm': 'uma', 'hidden': false}, {'w': 'young', 't': '0:43', 'm': 'jovem', 'hidden': true}, {'w': 'age', 't': '0:43', 'm': 'idade', 'hidden': false}]},
{'id': 8, 'line': 'Taking my sulking to the masses', 'translation': 'Levando meu mau humor para as massas', 'words': [{'w': 'Taking', 't': '0:44', 'm': 'Levando', 'hidden': false}, {'w': 'my', 't': '0:44', 'm': 'meu', 'hidden': false}, {'w': 'sulking', 't': '0:44', 'm': 'mau humor', 'hidden': false}, {'w': 'to', 't': '0:45', 'm': 'para', 'hidden': false}, {'w': 'the', 't': '0:45', 'm': 'as', 'hidden': false}, {'w': 'masses', 't': '0:45', 'm': 'massas', 'hidden': false}]},
{'id': 9, 'line': 'Writing my poems for the few', 'translation': 'Escrevendo meus poemas para os poucos', 'words': [{'w': 'Writing', 't': '0:45', 'm': 'Escrevendo', 'hidden': false}, {'w': 'my', 't': '0:45', 'm': 'meus', 'hidden': false}, {'w': 'poems', 't': '0:45', 'm': 'poemas', 'hidden': false}, {'w': 'for', 't': '0:46', 'm': 'para', 'hidden': false}, {'w': 'the', 't': '0:46', 'm': 'os', 'hidden': false}, {'w': 'few', 't': '0:46', 'm': 'poucos', 'hidden': false}]},
{'id': 10, 'line': 'That look at me, took to me, shook to me, feeling me', 'translation': 'Que olham para mim, se apegaram a mim, se abalaram comigo, me sentindo', 'words': [{'w': 'That', 't': '0:46', 'm': 'Que', 'hidden': false}, {'w': 'look', 't': '0:46', 'm': 'olham', 'hidden': false}, {'w': 'at', 't': '0:47', 'm': 'para', 'hidden': false}, {'w': 'me,', 't': '0:47', 'm': 'mim', 'hidden': false}, {'w': 'took', 't': '0:47', 'm': 'apegaram', 'hidden': false}, {'w': 'to', 't': '0:47', 'm': 'a', 'hidden': false}, {'w': 'me,', 't': '0:47', 'm': 'mim', 'hidden': false}, {'w': 'shook', 't': '0:48', 'm': 'abalaram', 'hidden': false}, {'w': 'to', 't': '0:48', 'm': 'a', 'hidden': false}, {'w': 'me,', 't': '0:48', 'm': 'mim', 'hidden': false}, {'w': 'feeling', 't': '0:48', 'm': 'sentindo', 'hidden': false}, {'w': 'me', 't': '0:48', 'm': 'me', 'hidden': false}]},
{'id': 11, 'line': 'Singing from heartache from the pain', 'translation': 'Cantando pela dor no coração, a partir da dor', 'words': [{'w': 'Singing', 't': '0:49', 'm': 'Cantando', 'hidden': true}, {'w': 'from', 't': '0:49', 'm': 'da', 'hidden': false}, {'w': 'heartache', 't': '0:50', 'm': 'dor no coração', 'hidden': false}, {'w': 'from', 't': '0:50', 'm': 'da', 'hidden': false}, {'w': 'the', 't': '0:51', 'm': 'a', 'hidden': false}, {'w': 'pain', 't': '0:51', 'm': 'dor', 'hidden': false}]},
{'id': 12, 'line': 'Taking my message from the veins', 'translation': 'Tirando minha mensagem das veias', 'words': [{'w': 'Taking', 't': '0:51', 'm': 'Pegando', 'hidden': false}, {'w': 'my', 't': '0:52', 'm': 'minha', 'hidden': false}, {'w': 'message', 't': '0:52', 'm': 'mensagem', 'hidden': false}, {'w': 'from', 't': '0:52', 'm': 'das', 'hidden': false}, {'w': 'the', 't': '0:53', 'm': 'as', 'hidden': false}, {'w': 'veins', 't': '0:53', 'm': 'veias', 'hidden': false}]},
{'id': 13, 'line': 'Speaking my lesson from the brain', 'translation': 'Falando minha lição do cérebro', 'words': [{'w': 'Speaking', 't': '0:53', 'm': 'Falando', 'hidden': false}, {'w': 'my', 't': '0:54', 'm': 'minha', 'hidden': false}, {'w': 'lesson', 't': '0:54', 'm': 'lição', 'hidden': false}, {'w': 'from', 't': '0:54', 'm': 'do', 'hidden': false}, {'w': 'the', 't': '0:55', 'm': 'o', 'hidden': false}, {'w': 'brain', 't': '0:55', 'm': 'cérebro', 'hidden': false}]},
{'id': 14, 'line': 'Seeing the beauty through the', 'translation': 'Vendo a beleza através da', 'words': [{'w': 'Seeing', 't': '0:55', 'm': 'Vendo', 'hidden': false}, {'w': 'the', 't': '0:56', 'm': 'a', 'hidden': false}, {'w': 'beauty', 't': '0:56', 'm': 'beleza', 'hidden': true}, {'w': 'through', 't': '0:56', 'm': 'através', 'hidden': false}, {'w': 'the', 't': '0:56', 'm': 'da', 'hidden': false}]},
{'id': 15, 'line': 'Pain!', 'translation': 'Dor!', 'words': [{'w': 'Pain!', 't': '0:57', 'm': 'Dor!', 'hidden': false}]},
{'id': 16, 'line': 'You made me a, you made me a believer, believer', 'translation': 'Você me fez um, você me fez um crente, crente', 'words': [{'w': 'You', 't': '0:58', 'm': 'Você', 'hidden': false}, {'w': 'made', 't': '0:58', 'm': 'fez', 'hidden': false}, {'w': 'me', 't': '0:59', 'm': 'me', 'hidden': false}, {'w': 'a,', 't': '0:59', 'm': 'um', 'hidden': false}, {'w': 'you', 't': '0:59', 'm': 'você', 'hidden': false}, {'w': 'made', 't': '1:00', 'm': 'fez', 'hidden': false}, {'w': 'me', 't': '1:00', 'm': 'me', 'hidden': false}, {'w': 'a', 't': '1:00', 'm': 'um', 'hidden': false}, {'w': 'believer,', 't': '1:00', 'm': 'crente', 'hidden': true}, {'w': 'believer', 't': '1:02', 'm': 'crente', 'hidden': false}]},
{'id': 17, 'line': 'Pain!', 'translation': 'Dor!', 'words': [{'w': 'Pain!', 't': '1:04', 'm': 'Dor!', 'hidden': false}]},
{'id': 18, 'line': 'You break me down and build me up, believer, believer', 'translation': 'Você me quebra e me constrói, crente, crente', 'words': [{'w': 'You', 't': '1:05', 'm': 'Você', 'hidden': false}, {'w': 'break', 't': '1:05', 'm': 'quebra', 'hidden': false}, {'w': 'me', 't': '1:05', 'm': 'me', 'hidden': false}, {'w': 'down', 't': '1:05', 'm': 'para baixo', 'hidden': false}, {'w': 'and', 't': '1:06', 'm': 'e', 'hidden': false}, {'w': 'build', 't': '1:06', 'm': 'constrói', 'hidden': true}, {'w': 'me', 't': '1:06', 'm': 'me', 'hidden': false}, {'w': 'up,', 't': '1:06', 'm': 'para cima', 'hidden': false}, {'w': 'believer,', 't': '1:07', 'm': 'crente', 'hidden': false}, {'w': 'believer', 't': '1:09', 'm': 'crente', 'hidden': false}]},
{'id': 19, 'line': 'Pain!', 'translation': 'Dor!', 'words': [{'w': 'Pain!', 't': '1:11', 'm': 'Dor!', 'hidden': false}]},
{'id': 20, 'line': 'Oh let the bullets fly, oh let them rain', 'translation': 'Oh, deixe as balas voarem, oh, deixe elas choverem', 'words': [{'w': 'Oh', 't': '1:12', 'm': 'Oh', 'hidden': false}, {'w': 'let', 't': '1:12', 'm': 'deixe', 'hidden': false}, {'w': 'the', 't': '1:12', 'm': 'as', 'hidden': false}, {'w': 'bullets', 't': '1:12', 'm': 'balas', 'hidden': false}, {'w': 'fly,', 't': '1:13', 'm': 'voarem', 'hidden': false}, {'w': 'oh', 't': '1:13', 'm': 'oh', 'hidden': false}, {'w': 'let', 't': '1:13', 'm': 'deixe', 'hidden': false}, {'w': 'them', 't': '1:14', 'm': 'elas', 'hidden': false}, {'w': 'rain', 't': '1:14', 'm': 'choverem', 'hidden': true}]},
{'id': 21, 'line': 'My life, my love, my drive, it came from', 'translation': 'Minha vida, meu amor, minha motivação, vieram da', 'words': [{'w': 'My', 't': '1:15', 'm': 'Minha', 'hidden': false}, {'w': 'life,', 't': '1:15', 'm': 'vida', 'hidden': true}, {'w': 'my', 't': '1:15', 'm': 'meu', 'hidden': false}, {'w': 'love,', 't': '1:16', 'm': 'amor', 'hidden': false}, {'w': 'my', 't': '1:16', 'm': 'minha', 'hidden': false}, {'w': 'drive,', 't': '1:16', 'm': 'motivação', 'hidden': false}, {'w': 'it', 't': '1:17', 'm': 'isso', 'hidden': false}, {'w': 'came', 't': '1:17', 'm': 'veio', 'hidden': false}, {'w': 'from', 't': '1:17', 'm': 'de', 'hidden': false}]},
{'id': 22, 'line': 'Pain!', 'translation': 'Dor!', 'words': [{'w': 'Pain!', 't': '1:18', 'm': 'Dor!', 'hidden': false}]},
{'id': 23, 'line': 'You made me a, you made me a believer, believer', 'translation': 'Você me fez um, você me fez um crente, crente', 'words': [{'w': 'You', 't': '1:19', 'm': 'Você', 'hidden': false}, {'w': 'made', 't': '1:19', 'm': 'fez', 'hidden': false}, {'w': 'me', 't': '1:19', 'm': 'me', 'hidden': false}, {'w': 'a,', 't': '1:20', 'm': 'um', 'hidden': false}, {'w': 'you', 't': '1:20', 'm': 'você', 'hidden': false}, {'w': 'made', 't': '1:20', 'm': 'fez', 'hidden': false}, {'w': 'me', 't': '1:20', 'm': 'me', 'hidden': false}, {'w': 'a', 't': '1:21', 'm': 'um', 'hidden': false}, {'w': 'believer,', 't': '1:21', 'm': 'crente', 'hidden': false}, {'w': 'believer', 't': '1:23', 'm': 'crente', 'hidden': false}]}
    ]
};

const formattedEstrofes = [];
const vocabularioChave = new Set();

for (const e of newSong.estrofes) {
  const words = e.words.map(w => ({ ...w, ms: timeToMs(w.t) }));
  const hiddenWord = words.find(w => w.hidden);
  const inicioMs = words[0] ? words[0].ms : 0;
  const palavraOcultaMs = hiddenWord ? hiddenWord.ms : null;

  let textoLacuna = '';
  if (hiddenWord) {
    // Regex case-insensitive whole-word replacement
    const regex = new RegExp('(?<![\\w\'])' + hiddenWord.w.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&') + '(?![\\w\'])', 'i');
    textoLacuna = e.line.replace(regex, '___');
    vocabularioChave.add(hiddenWord.w);
  }

  formattedEstrofes.push({
    id: e.id,
    texto_completo: e.line,
    traducao: e.translation,
    palavra_oculta: hiddenWord ? hiddenWord.w : '',
    dica: hiddenWord ? hiddenWord.m : '',
    texto_lacuna: textoLacuna,
    tempo: inicioMs / 1000,
    inicio_ms: inicioMs,
    palavra_oculta_ms: palavraOcultaMs,
    words: words
  });
}

const convertedSong = {
  id: 'can_custom_999',
  titulo: newSong.titulo,
  artista: newSong.artista,
  nivel: newSong.nivel,
  icone: newSong.icone,
  tema: 'custom',
  audio_url: 'believer_test.mp3',
  estrofes: formattedEstrofes,
  vocabulario_chave: Array.from(vocabularioChave),
  xp_recompensa: 50
};

data.canzoni.unshift(convertedSong);

fs.writeFileSync('data/canzoni.json', JSON.stringify(data, null, 2), 'utf-8');

console.log('Song Believer added successfully to data/canzoni.json!');
