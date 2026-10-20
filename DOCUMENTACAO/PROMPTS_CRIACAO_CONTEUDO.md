# Canonical AI Content Generation Prompts Guide
## English Autêntico (PWA Offline-First)

This canonical guide defines the standardized **system prompts and AI generation templates** for each module of the application, mirroring the data schemas in `data/*.json` and the import routines in `js/ia-import.js`.

---

## 1. Module: 💬 Dialogues (Situational Dialogues)

### Data Structure (`data/dialogues.json` & `en_dialogues_custom`)
- Each dialogue contains context, CEFR level (`A1` to `C1`), icon, key vocabulary, XP, and sequential turns.
- **Character Turns:** passive speech (`speaker`, `line`, `translation`, `audio_ipa`).
- **User Turns ("You"):** active interactive response with 4 options and `correct_index` (numeric index 0 to 3).

### Standard Prompt
```text
Create a situational dialogue in American English for Brazilian Portuguese students. Return ONLY the JSON, without any introductory or conversational text before or after.

MANDATORY RULES:
1. "id": unique identifier (e.g. "dial_custom_001")
2. "title": short thematic title in English
3. "icon": representative emoji
4. "level": strictly choose from "A1", "A2", "B1", "B2", or "C1"
5. "context": clear practical description in Portuguese (1-2 sentences)
6. "turns": ordered array alternating character turn and user ("You") turn:
   - Character Turn:
     * "id": sequential number (1, 2, 3...)
     * "speaker": interlocutor name (e.g. "Barista", "Front Desk", "Waiter", "Doctor")
     * "line": natural spoken American English
     * "translation": precise translation in Brazilian Portuguese
     * "audio_ipa": optional phonetic IPA transcription (or "")
   - "You" Turn (user response):
     * "id": sequential number
     * "speaker": "You"
     * "line": the CORRECT answer in English
     * "translation": Portuguese translation of the correct answer
     * "audio_ipa": ""
     * "options": array with 4 plausible options in English (including the correct one)
     * "correct_index": numeric index (0, 1, 2, or 3) pointing to the correct option
7. "key_vocabulary": array of 3 to 5 core terms in base form
8. "xp_reward": integer number (e.g. 50)

EXAMPLE JSON STRUCTURE:
{
  "id": "dial_custom_001",
  "title": "At the Coffee Shop",
  "icon": "☕",
  "level": "A1",
  "context": "Você está pedindo um café em Nova York.",
  "turns": [
    {
      "id": 1,
      "speaker": "Barista",
      "line": "Good morning! What can I get for you today?",
      "translation": "Bom dia! O que posso preparar para você hoje?",
      "audio_ipa": ""
    },
    {
      "id": 2,
      "speaker": "You",
      "line": "I'd like an iced latte with oat milk, please.",
      "translation": "Eu gostaria de um latte gelado com leite de aveia, por favor.",
      "audio_ipa": "",
      "options": [
        "I'd like an iced latte with oat milk, please.",
        "I don't drink coffee.",
        "Where is the train station?",
        "How much is a ticket to Boston?"
      ],
      "correct_index": 0
    }
  ],
  "key_vocabulary": ["iced latte", "oat milk", "order"],
  "xp_reward": 50
}
```

---

## 2. Module: 🎵 Songs (Karaoke Cloze Player)

### Data Structure (`data/songs.json` & `en_songs_custom`)
- Supports word-level timestamps with `lines[].words[].{ text, start_ms, end_ms, hidden }`.
- When `hidden: true`, the cloze player initiates a soft fade-out and pause, displaying the Word Bank.

### Standard Prompt
```text
Generate song study data with word-level timestamps in American/British English. Return ONLY the JSON, without any surrounding text.

SCHEMA:
{
  "id": "song_custom_001",
  "title": "Song Title",
  "artist": "Artist Name",
  "level": "B1",
  "icon": "🎵",
  "audio_url": "",
  "lines": [
    {
      "id": 1,
      "line": "Every breath you take every move you make",
      "translation": "A cada respiração sua, a cada movimento que fizer",
      "words": [
        { "text": "Every", "start_ms": 1200, "end_ms": 1500 },
        { "text": "breath", "start_ms": 1500, "end_ms": 1900, "hidden": true },
        { "text": "you", "start_ms": 1900, "end_ms": 2100 },
        { "text": "take", "start_ms": 2100, "end_ms": 2500 }
      ]
    }
  ],
  "xp_reward": 80
}
```

---

## 3. Module: 📖 Stories (3D Antique Book Reader)

### Data Structure (`data/stories.json` & `en_stories_custom`)
- Features high-density editorial line-budget pagination, chapter structuring, and vocabulary highlights.

### Standard Prompt
```text
Write a graded reading story in English for Portuguese-speaking learners. Return ONLY the JSON, without markdown backticks.

SCHEMA:
{
  "id": "story_custom_001",
  "title": "A Walk Through Central Park",
  "title_pt": "Um Passeio pelo Central Park",
  "level": "A2",
  "icon": "🌳",
  "author": "English Autentico",
  "theme": "Travel & Exploration",
  "description": "Discovering New York on an autumn afternoon.",
  "description_pt": "Descobrindo Nova York em uma tarde de outono.",
  "xp_reward": 90,
  "paragraphs": [
    {
      "id": "p1",
      "english": "Autumn had arrived in New York, and Central Park was covered with golden leaves.",
      "portuguese": "O outono havia chegado em Nova York, e o Central Park estava coberto de folhas douradas.",
      "vocabulary": [
        { "english": "golden", "translation": "douradas", "ipa": "/ˈɡoʊl.dən/", "category": "adjective" },
        { "english": "leaves", "translation": "folhas", "ipa": "/liːvz/", "category": "noun" }
      ]
    }
  ]
}
```

---

## 4. Module: 🗣️ Pronunciation (Dojo & Speech Recognition)

### Data Structure (`data/pronunciation.json` & `en_pronunciation_custom`)
- Evaluated via native Web Speech API (`en-US`) and comparative user audio recording.

### Standard Prompt
```text
Create a set of idiomatic pronunciation training sentences in English. Return ONLY the JSON.

SCHEMA:
{
  "pronunciation": [
    {
      "id": "pr_custom_001",
      "phrase_english": "Could you please give me a hand?",
      "phrase_portuguese": "Você poderia me dar uma mãozinha?",
      "level": "A2",
      "context": "Polite request for assistance in daily situations.",
      "audio_ipa": "/kʊd juː pliːz ɡɪv miː ə hænd/",
      "xp_reward": 20
    }
  ]
}
```

---

## 5. Module: 🃏 Vocabulary & Flashcards

### Data Structure (`data/temple-*.json` & `en_vocab_custom`)
- Filtered through anti-duplication comparison against all 51 temples before insertion.

### Standard Prompt
```text
Create vocabulary expansion cards in English. Return ONLY the JSON.

SCHEMA:
[
  {
    "english": "breakthrough",
    "portuguese": "avanço / descoberta marcante",
    "ipa": "/ˈbreɪk.θruː/",
    "category": "noun",
    "example_english": "Scientists made a major breakthrough in cancer research.",
    "example_portuguese": "Os cientistas fizeram um grande avanço na pesquisa do câncer."
  }
]
```
