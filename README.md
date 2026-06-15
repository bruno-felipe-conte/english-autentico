# 🇺🇸 English Autentico

**🔗 App online:** https://bruno-felipe-conte.github.io/english-autentico/

Bem-vindo ao **English Autentico**, a evolução definitiva da plataforma de aprendizado de idiomas! Originalmente focado no italiano, este PWA agora é uma suíte completa, robusta e imersiva projetada para te levar do **A1 (Básico) ao C2 (Fluência Master)** no idioma inglês.

> **📱 100% Offline & PWA:** Após o primeiro acesso, o aplicativo inteiro (incluindo áudios gerados e todo o material gramatical) funciona sem internet! O seu progresso é salvo diretamente no cache do navegador. Instale como app: no Chrome/Edge clique em `⊕` na barra de endereço; no Safari iOS use `Compartilhar → Adicionar à Tela de Início`.

---

## ✨ Módulos Principais

O aplicativo é dividido em **8 Pilares de Imersão**, garantindo que você treine leitura, audição, gramática, conversação e vocabulário:

| Módulo | Descrição |
|---|---|
| **🏛️ Temples** | 51 "Templos" geográficos (cidades dos EUA/Reino Unido) cobrindo vocabulário focado, desde rotinas até Business English, com sistema de progressão. |
| **💬 Dialogues** | Histórias e diálogos do mundo real. Agora conta com importação nativa de diálogos via **IA (ChatGPT/Claude)**! |
| **🎵 Songs** | Pratique o "listening" com músicas (Fill-in-the-blanks style) também importáveis via IA. |
| **🗣️ Listen** | Shadowing e imitação (Listen & Repeat) para melhorar a pronúncia com áudio nativo (TTS embarcado). |
| **📚 Grammar** | Currículo colossal de **90 Lições (A1 ao C2)**. Construído com a rigorosa e eficaz **Metodologia NMA (Napoleão Mendes de Almeida)**. |
| **🃏 Flashcards** | Sistema de repetição espaçada integrado. Memorização visual com blur-reveal e áudio nativo. |
| **❓ Quiz** | Teste prático do conteúdo absorvido nos Templos e na Gramática. |
| **📖 Vocab** | Seu dicionário unificado com barra de buscas universal. |

---

## 🌎 Modo de Imersão Bilingue

O **English Autentico** suporta duas interfaces de estudo nativas:
- **PT (Português):** Foco em alunos iniciantes (A1/A2). Interface amigável e explicativa.
- **EN (English Immersion):** Foco em alunos intermediários/avançados. Todo o aplicativo, menus, feedbacks e modais mudam para o Inglês, para forçar o pensamento direto no idioma.

---

## 🧠 A Gramática NMA (Nova Metodologia Autêntica)

Nossa gramática não é um simples "tópico e regra". Cada uma das **90 Lições** foi esculpida com base num fluxo cognitivo de 7 passos para garantir retenção permanente:

1. **Alerta:** Aviso imediato sobre "por que o brasileiro costuma errar isso".
2. **Observação de Cards:** Análise lado a lado de frases em inglês e português.
3. **Tabela Visual:** O padrão da regra entregue de forma esquemática.
4. **Exemplos P→R→C:** Fluxo de Pergunta, Resposta e Conclusão guiada.
5. **Armadilhas Clássicas:** O formato "Não diga X, Diga Y".
6. **Exercícios Interativos:** Prática imediata clicável no final da lição.
7. **Coda:** Conclusão teórica para sedimentar a lição.

---

## ⚙️ Tecnologias e Deploy

O aplicativo é um triunfo de **Vanilla JavaScript (Sem frameworks pesados)**:
- **HTML5 / CSS3** limpo, rápido e altamente otimizado (UI Glassmorphism, Dark/Light mode).
- **Service Workers (PWA)** para cache agressivo offline (Atualiza transparentemente em segundo plano).
- Geração de Voz Text-To-Speech (TTS) no próprio dispositivo.
- **Nenhum Backend Necessário:** Seus dados (XP, Ofensiva, Streaks) nunca saem do seu dispositivo, tudo vive no `localStorage` sob a chave do seu perfil.

### 🚀 Rodando Localmente

Para contribuir ou testar o código-fonte na sua máquina:

```bash
# Inicie um servidor local simples
npx serve -l 5500 .
```
Acesse `http://localhost:5500` no seu computador ou no celular (pelo IP local).

### 🌿 Versionamento e Publicação (GitHub Pages)

O projeto usa branch unificada de `master` para `gh-pages`:

```bash
# Após commitar suas melhorias na branch master:
git push origin master
git checkout gh-pages
git merge master --ff-only
git push origin gh-pages
git checkout master
```
*A nuvem cuidará do resto e os alunos receberão a atualização (via `sw.js` cache bumping).*

---

### *"A different language is a different vision of life."* — Federico Fellini 🇺🇸🇬🇧
