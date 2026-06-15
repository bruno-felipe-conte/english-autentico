import json
import os

jsonFile = r"C:\Users\bruno\Documents\english-learning-app-pro\data\dialogi.json"
part1 = r"C:\Users\bruno\.gemini\antigravity\brain\2f0f85d2-af4d-481d-950f-5f147c36b94b\dial_part1.json"
part2 = r"C:\Users\bruno\.gemini\antigravity\brain\2f0f85d2-af4d-481d-950f-5f147c36b94b\dial_part2.json"
part3 = r"C:\Users\bruno\.gemini\antigravity\brain\2f0f85d2-af4d-481d-950f-5f147c36b94b\dial_part3.json"

with open(jsonFile, 'r', encoding='utf-8') as f:
    data = json.load(f)

for part_file in [part1, part2, part3]:
    with open(part_file, 'r', encoding='utf-8') as f:
        part_data = json.load(f)
        data['dialogi'].extend(part_data)

new_file = "dialogi_new.json"
with open(new_file, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

os.replace(new_file, jsonFile)

print(f"Successfully merged. Total dialogues now: {len(data['dialogi'])}")
