import json

path = 'data/grammar.json'
with open(path, encoding='utf-8') as f:
    g = json.load(f)

def cho(q, opts, ans, exp):
    return {"tipo":"escolha","pergunta":q,"opcoes":opts,"resposta":ans,"explicacao":exp}
def dig(q, ans, hint, exp):
    return {"tipo":"digitar","pergunta":q,"resposta":ans,"dica":hint,"explicacao":exp}
