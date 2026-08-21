from pathlib import Path
import re

roots = [Path("app"), Path("components")]

# Sequências típicas de mojibake
pattern = re.compile(r'[^\s"''<>={}()\[\],;:`]+')

def tentar_corrigir(token):
    atual = token

    for _ in range(3):
        if not any(x in atual for x in ("Ã", "Â", "â", "ð")):
            break

        try:
            novo = atual.encode("cp1252").decode("utf-8")
        except (UnicodeEncodeError, UnicodeDecodeError):
            break

        if novo == atual:
            break

        atual = novo

    return atual

corrigidos = []

for root in roots:
    for path in root.rglob("*"):
        if not path.is_file() or path.suffix not in {".ts", ".tsx"}:
            continue

        texto = path.read_text(encoding="utf-8-sig")

        novo = pattern.sub(
            lambda m: tentar_corrigir(m.group(0)),
            texto
        )

        if novo != texto:
            path.write_text(novo, encoding="utf-8", newline="\n")
            corrigidos.append(str(path))

print("Arquivos corrigidos:")
for arquivo in corrigidos:
    print(" -", arquivo)

print("\nTotal:", len(corrigidos))
