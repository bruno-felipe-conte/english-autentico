# English Grammar JSON Spec

You are generating grammar lessons for an English learning app (Brazilian Portuguese speakers).
For each lesson assigned to you, you must output a valid JSON array of lesson objects.

## Lesson Object Schema

```json
{
  "id": "a1-lez1",
  "num": "Lesson 1",
  "titulo": "Personal Pronouns & Verb To Be",
  "subtitulo": "I am, You are...",
  "alerta": "Texto curto para ancorar o aluno (Por que isso importa?)",
  "observacao_cards": [
    {
      "italiano": "I am",
      "traducao": "Eu sou / estou",
      "genero": "1ª Pessoa",
      "motivo": "Sempre com 'M'"
    }
  ],
  "tabela_visual": "| Pronoun | Verb To Be |\n|---|---|\n| I | am |\n| You | are |",
  "exemplos_prc": [
    {
      "oracao": "I am from Brazil.",
      "pergunta": "O que indica o 'am'?",
      "resposta": "Indica 'eu sou'.",
      "conclusao": "I am = Eu sou"
    }
  ],
  "armadilhas": [
    {
      "errado": "I is a student.",
      "certo": "I am a student.",
      "explicacao": "A 1ª pessoa sempre leva 'am'."
    }
  ],
  "coda": "Resumo final encorajador.",
  "exercicios": [
    {
      "tipo": "escolha",
      "pergunta": "Qual a forma correta para 'They'?",
      "opcoes": ["am", "is", "are", "be"],
      "resposta": 2,
      "explicacao": "'They' é plural, portanto usa 'are'."
    },
    {
      "tipo": "revelar",
      "pergunta": "Complete: He ___ my friend.",
      "resposta": "is",
      "explicacao": "'He' é 3ª pessoa do singular."
    }
  ]
}
```

## Guidelines
1. The `observacao_cards` key expects objects with `italiano` (put the English term here), `traducao`, `genero` (a tag like "Pronoun" or "Rule"), and `motivo`.
2. Generate exactly 6 exercises per lesson (mix of `escolha` and `revelar`).
3. Return raw JSON text in a single array `[ { ... }, { ... } ]`. Do NOT wrap it in markdown codeblocks. I will parse it directly.
