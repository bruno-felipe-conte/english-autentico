import json

path = r"C:\Users\bruno\Documents\english-learning-app-pro\data\grammar.json"
with open(path, encoding="utf-8") as f:
    data = json.load(f)

modulo_a1 = next(m for m in data["moduli"] if m["id"] == "A1")
licoes = modulo_a1["lezioni"][10:30]  # Lessons 11 to 30

for lez in licoes[:3]:  # Show first 3 as a sample of current state
    print(f"\n=== {lez['num']}: {lez['titulo']} ===")
    print(f"alerta: {lez.get('alerta')!r}")
    print("observacao_cards (first 2):")
    for card in lez.get("observacao_cards", [])[:2]:
        print(f"  - '{card.get('italiano')}' -> motive: {card.get('motivo')!r}")
    print("exemplos_prc (first):")
    for ex in lez.get("exemplos_prc", [])[:1]:
        print(f"  - oracao: {ex.get('oracao')!r}")
        print(f"    resposta: {ex.get('resposta')!r}")
        print(f"    conclusao: {ex.get('conclusao')!r}")
    print("armadilhas (first):")
    for arm in lez.get("armadilhas", [])[:1]:
        print(f"  - errado: {arm.get('errado')!r} -> certo: {arm.get('certo')!r}")
        print(f"    explicacao: {arm.get('explicacao')!r}")
    print(f"coda: {lez.get('coda')!r}")
