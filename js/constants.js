// ============================================================
// constants.js — Centralized magic numbers and configuration
// ============================================================

const CONFIG = {
  // Unlock code default
  UNLOCK_CODE_DEFAULT: "2012",

  // Energy system
  MAX_ENERGIA: 50,
  ENERGY_REGEN_MINUTES: 5,

  // Flashcards / FSRS
  FSRS_MAX_CARDS_PER_SESSION: 20,
  FSRS_REVIEW_GENERAL_MAX_CARDS: 30,

  // Vocab
  VOCAB_DISPLAY_LIMIT: 100,
  VOCAB_PAGE_SIZE: 50,

  // Stories translation rate limit (ms between requests)
  TRANSLATION_RATE_LIMIT_MS: 500,

  // Quiz
  QUIZ_QUESTIONS_PER_SESSION: 10,
  QUIZ_SRS_INTERVALS_MS: [60000, 600000, 3600000, 86400000, 259200000],

  // Audio
  AUDIO_SPEED_DEFAULT: 0.85,
  AUDIO_SPEED_MIN: 0.5,
  AUDIO_SPEED_MAX: 2.0,

  // XP
  DAILY_GOAL_DEFAULT: 100,

  // Line budget for stories pagination
  LINE_BUDGET: {
    MOBILE: { HEADER_OFFSET: 170, LINE_HEIGHT_WITH_TRANS: 24, LINE_HEIGHT_WITHOUT_TRANS: 26, CHARS_PER_LINE_MIN: 36, CHARS_PER_LINE_MAX: 48, COVER_LINES_RATIO: 0.45 },
    DESKTOP: { HEADER_OFFSET: 200, LINE_HEIGHT_WITH_TRANS: 25, LINE_HEIGHT_WITHOUT_TRANS: 28, CHARS_PER_LINE_MIN: 58, CHARS_PER_LINE_MAX: 76, COVER_LINES_RATIO: 0.45 }
  }
};

if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CONFIG };
}
