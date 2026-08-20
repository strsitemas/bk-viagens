import { put } from "@vercel/blob";
import "dotenv/config";

async function main() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  console.log("Token carregado:", Boolean(token));
  console.log("Tamanho:", token?.length ?? 0);

  const blob = await put(
    `teste-str-${Date.now()}.txt`,
    "Teste Buckart STR",
    {
      access: "public",
      token,
    }
  );

  console.log("SUCESSO!");
  console.log("URL:", blob.url);
}

main().catch((error) => {
  console.error("ERRO:");
  console.error(error.message);
  process.exit(1);
});
