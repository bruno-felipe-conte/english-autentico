#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Script para esvaziar templos 11-50 mantendo estrutura válida (placeholder format)."""

import json
import glob
import os

print("🧹 Limpando templos 11-50...")
print("=" * 60)

# Estrutura vazia válida de templo (placeholder)
empty_templs_structure = {
    "templo": 0,
    "cidade": "",
    "nivel": "A1",
    "palavras": [],
    "quizzes": []
}

total_removidos = 0
total_atualizados = 0

# Processar templos-11.json até templo-51.json
for i in range(11, 52):
    caminho = f"data/templo-{i}.json"
    if not os.path.exists(caminho):
        print(f"⚠️  Não existe: {caminho}")
        continue
    
    with open(caminho, 'r', encoding='utf-8') as f:
        try:
            dados = json.load(f)
        except json.JSONDecodeError:
            # Arquivo corrompido ou vazio — sobrescrever com placeholder
            with open(caminho, 'w', encoding='utf-8') as f:
                json.dump(empty_templs_structure.copy(), f, indent=2)
            total_removidos += 1
            print(f"✅ ESVAZIADO: {caminho} (arquivo corrompido)")
        else:
            # Arquivo válido — remover conteúdo mas manter estrutura
            dados["palavras"] = []
            dados["quizzes"] = []
            if "cidade" not in dados or not dados.get("cidade"):
                dados["cidade"] = f"Cidade {i}"  # Placeholder genérico
            
            with open(caminho, 'w', encoding='utf-8') as f:
                json.dump(dados, f, indent=2)
            total_atualizados += 1

print("=" * 60)
print(f"✅ FEITO! Total limpo/esvaziado:")
print(f"   • {total_removidos} arquivos corrompidos → sobrescritos")
print(f"   • {total_atualizados} arquivos válidos → esvaziados")
print(f"   • Total: {total_removidos + total_atualizados} templos 11-50 limpos")

# Verificar tamanho total de dados removidos
print("\n📊 Tamanho de arquivos antes da limpeza (estimado):")
for i in range(11, 26):
    caminho = f"data/templo-{i}.json"
    if os.path.exists(caminho):
        size = os.path.getsize(caminho)
        print(f"   • templo-{i}.json: {size} bytes")

print("\n✅ Pronto! Templos 11-50 agora são placeholders vazios.")
