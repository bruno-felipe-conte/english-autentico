import json
import os

all_a2_units = []
for i in range(1, 5):
    path = f"data/grammar_a2_{i}.json"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read().strip()
        if content.startswith("```json"): content = content[7:]
        if content.startswith("```"): content = content[3:]
        if content.endswith("```"): content = content[:-3]
        data = json.loads(content.strip())
        all_a2_units.extend(data)

# Re-assign IDs properly
for idx, unit in enumerate(all_a2_units):
    unit["id"] = f"a2-lez{idx + 1}"
    unit["num"] = f"Lesson {idx + 1}"

# Load existing grammar.json
with open("data/grammar.json", "r", encoding="utf-8-sig") as f:
    master_json = json.load(f)

# Append A2 module
master_json["moduli"].append({
    "id": "A2",
    "nome": "A2 — Expansion",
    "nivel_minimo": 3,
    "cor": "linear-gradient(135deg, #2980B9, #1A5276)",
    "lezioni": all_a2_units
})

# Save it back
print(json.dumps(master_json, ensure_ascii=False, indent=2))
