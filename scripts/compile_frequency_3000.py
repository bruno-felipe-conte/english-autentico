#!/usr/bin/env python3
"""
Compila o dataset das 3.000 palavras mais frequentes do inglês para o English Autêntico.
Banda 1: 1 - 1000 (A1 - A2: Fundamental)
Banda 2: 1001 - 2000 (B1: Intermediário)
Banda 3: 2001 - 3000 (B2: Avançado / Autonomia)
"""

import json
import os
import re
import urllib.request

DEST_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '../data/frequency_3000.json'))
CORPUS_URL = 'https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-usa-no-swears.txt'

def main() -> None:
    print("Baixando corpus de frequência...")
    req = urllib.request.Request(CORPUS_URL, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=15) as resp:
        raw_words = resp.read().decode('utf-8').splitlines()

    valid_words = []
    seen = set()

    for w in raw_words:
        clean = w.strip().lower()
        if not clean or clean in seen:
            continue
        # Aceita apenas palavras alfabéticas
        if not re.match(r'^[a-z]+$', clean):
            continue
        # Letras únicas apenas 'a' e 'i'
        if len(clean) == 1 and clean not in ('a', 'i'):
            continue
        seen.add(clean)
        valid_words.append(clean)
        if len(valid_words) == 3000:
            break

    if len(valid_words) < 3000:
        raise ValueError(f"Não foi possível obter 3000 palavras válidas (obtidas: {len(valid_words)})")

    lemmi = []
    for idx, lemma in enumerate(valid_words, start=1):
        if idx <= 1000:
            banda = 1
        elif idx <= 2000:
            banda = 2
        else:
            banda = 3
        lemmi.append({
            "lemma": lemma,
            "rank": idx,
            "banda": banda
        })

    dataset = {
        "versione": "1.0-EN-3000",
        "totale_lemmi": 3000,
        "bande": {
            "1": { "nome": "1k_fundamental", "range": [1, 1000], "dimensione": 1000 },
            "2": { "nome": "2k_intermediario", "range": [1001, 2000], "dimensione": 1000 },
            "3": { "nome": "3k_avancado", "range": [2001, 3000], "dimensione": 1000 }
        },
        "lemmi": lemmi
    }

    os.makedirs(os.path.dirname(DEST_PATH), exist_ok=True)
    with open(DEST_PATH, 'w', encoding='utf-8') as fp:
        json.dump(dataset, fp, ensure_ascii=False, indent=2)

    size_kb = os.path.getsize(DEST_PATH) / 1024
    print(f"Sucesso! Gerado {DEST_PATH} com {len(lemmi)} lemas ({size_kb:.2f} KB).")

if __name__ == '__main__':
    main()
