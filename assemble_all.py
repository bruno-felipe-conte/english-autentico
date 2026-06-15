import json
import sys

def load_units(prefix, count):
    all_units = []
    for i in range(1, count + 1):
        path = f"data/grammar_{prefix}_{i}.json"
        with open(path, "r", encoding="utf-8") as f:
            content = f.read().strip()
            if content.startswith("```json"): content = content[7:]
            if content.startswith("```"): content = content[3:]
            if content.endswith("```"): content = content[:-3]
            data = json.loads(content.strip())
            all_units.extend(data)
    
    # Re-assign IDs properly
    for idx, unit in enumerate(all_units):
        unit["id"] = f"{prefix.replace('_', '')}-lez{idx + 1}"
        unit["num"] = f"Lesson {idx + 1}"
    return all_units

units_b1 = load_units("b1", 3)
units_b2 = load_units("b2", 3)
units_c1 = load_units("c1", 2)

# Load existing grammar.json
with open("data/grammar.json", "r", encoding="utf-8-sig") as f:
    master_json = json.load(f)

# Append B1
master_json["moduli"].append({
    "id": "B1",
    "nome": "B1 — Intermediate",
    "nivel_minimo": 6,
    "cor": "linear-gradient(135deg, #F39C12, #D35400)",
    "unidades": units_b1
})

# Append B2
master_json["moduli"].append({
    "id": "B2",
    "nome": "B2 — Upper Intermediate",
    "nivel_minimo": 10,
    "cor": "linear-gradient(135deg, #8E44AD, #4A235A)",
    "unidades": units_b2
})

# Append C1
master_json["moduli"].append({
    "id": "C1",
    "nome": "C1/C2 — Advanced Mastery",
    "nivel_minimo": 15,
    "cor": "linear-gradient(135deg, #2C3E50, #17202A)",
    "unidades": units_c1
})

print(json.dumps(master_json, ensure_ascii=False, indent=2))
