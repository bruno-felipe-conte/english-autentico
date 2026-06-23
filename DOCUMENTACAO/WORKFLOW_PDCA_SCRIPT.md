# Script de Workflow PDCA — Como Executar Aqui no Claude Code

## Para executar uma análise PDCA de qualquer aba

Diga ao Claude Code:

> "Execute o workflow PDCA na aba de [NOME]"

O Claude Code usará o script parametrizado abaixo e substituirá automaticamente o contexto da aba.

---

## Abas e seus parâmetros

### Aba: Flashcards
```
ABA: Flashcards (SRS)
JS: js/flashcards.js
DADOS: localStorage (en_flashcards)
FOCO: algoritmo SRS, intervalo de repetição, auto-avaliação blur-reveal
```

### Aba: Diálogos
```
ABA: Diálogos
JS: js/dialoghi.js
DADOS: data/dialogi.json
FOCO: fill-in-the-blank, TTS por personagem, progressão entre diálogos
```

### Aba: Músicas
```
ABA: Músicas (Canzoni)
JS: js/canzoni.js
DADOS: data/canzoni.json
FOCO: sincronização áudio+letra, blanks, validação de resposta com música tocando
```

### Aba: Listen & Repeat (Imitação)
```
ABA: Listen & Repeat / Imitação
JS: js/imitazione.js
DADOS: data/imitazioni.json
FOCO: SpeechRecognition API, comparação fonética, fallback sem microfone
```

### Aba: Histórias
```
ABA: Histórias (Storie)
JS: js/storie.js
DADOS: data/storie.json
FOCO: progressão de leitura, questões de compreensão, TTS de textos longos
```

### Aba: Templos (Vocabulário Temático)
```
ABA: Templos / Vocabulário
JS: (renderer principal — verificar index.html)
DADOS: data/templo-1.json ... data/templo-51.json, data/index.json
FOCO: lazy loading dos 51 conjuntos, TTS por palavra, marcação de aprendido, busca
```

### Aba: Perfil
```
ABA: Perfil / Progresso
JS: js/profilo.js, js/heatmap.js, js/conquistas.js, js/progression.js
DADOS: localStorage (en_progresso, en_xp, en_conquistas)
FOCO: backup/restore, heatmap semanal, sistema de conquistas, resetar progresso
```

---

## Comando para executar

Quando o usuário disser "execute o workflow PDCA na aba de X", rodar o Workflow com o script parametrizado para aquela aba, substituindo:

- `[ABA_NOME]` → nome da aba
- `[ABA_JS]` → arquivo(s) JS relevantes
- `[ABA_DADOS]` → arquivo(s) de dados JSON
- `[ABA_STORAGE]` → chaves do localStorage
- `[ABA_DESCRICAO]` → o que a aba faz em 2-3 frases
- `[ABA_CONTEXTO_EXTRA]` → particularidades técnicas da aba

O resultado é salvo em `DOCUMENTACAO/PDCA_[ABA_NOME_MAIUSCULO].md`.
