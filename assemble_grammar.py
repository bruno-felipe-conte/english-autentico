import json
import os

all_units = []
for i in range(1, 7):
    path = f"data/grammar_a1_{i}.json"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read().strip()
        if content.startswith("```json"): content = content[7:]
        if content.startswith("```"): content = content[3:]
        if content.endswith("```"): content = content[:-3]
        data = json.loads(content.strip())
        all_units.extend(data)

for idx, unit in enumerate(all_units):
    unit["id"] = f"a1-lez{idx + 1}"
    unit["num"] = f"Lesson {idx + 1}"

master_json = {
    "versao": "4.0",
    "moduli": [
        {
            "id": "A1",
            "nome": "A1 — Foundations",
            "nivel_minimo": 1,
            "cor": "linear-gradient(135deg, #27AE60, #145A32)",
            "lezioni": all_units
        }
    ]
}

print(json.dumps(master_json, ensure_ascii=False, indent=2))
