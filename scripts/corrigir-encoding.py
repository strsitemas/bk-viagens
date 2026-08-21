from pathlib import Path

roots = [Path("app"), Path("components")]
exts = {".ts", ".tsx"}

marcadores = ("Ã", "Â", "â", "ð", "�")

corrigidos = []

for root in roots:
    for path in root.rglob("*"):
        if not path.is_file() or path.suffix not in exts:
            continue

        texto = path.read_text(encoding="utf-8-sig")

        if not any(m in texto for m in marcadores):
            continue

        original = texto

        # Corrige mojibake UTF-8 interpretado como Windows-1252.
        # Repete porque alguns trechos podem ter sido corrompidos mais de uma vez.
        for _ in range(3):
            try:
                novo = texto.encode("cp1252").decode("utf-8")
            except (UnicodeEncodeError, UnicodeDecodeError):
                break

            if novo == texto:
                break

            texto = novo

        if texto != original:
            path.write_text(texto, encoding="utf-8", newline="\n")
            corrigidos.append(str(path))

print("Arquivos corrigidos:")
for arquivo in corrigidos:
    print(" -", arquivo)

print(f"\nTotal: {len(corrigidos)}")
