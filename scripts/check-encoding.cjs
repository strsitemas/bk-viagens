const fs = require("fs");
const path = require("path");

const roots = ["app", "components", "lib"];
const extensions = new Set([".ts", ".tsx", ".js", ".jsx"]);

const patterns = [
  /Ã[\x80-\xBF]/,
  /Â[\x80-\xBF]/,
  /â(?:†|€|™|œ|ž)/,
  /\uFFFD/,
];

const problems = [];

function scan(dir) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      scan(fullPath);
      continue;
    }

    if (!extensions.has(path.extname(entry.name))) continue;

    const text = fs.readFileSync(fullPath, "utf8");
    const lines = text.split(/\r?\n/);

    lines.forEach((line, index) => {
      if (patterns.some((pattern) => pattern.test(line))) {
        problems.push({
          file: fullPath,
          line: index + 1,
          text: line.trim(),
        });
      }
    });
  }
}

roots.forEach(scan);

if (problems.length) {
  console.error("\n[STR] BUILD BLOQUEADO - possível texto corrompido:\n");

  for (const problem of problems) {
    console.error(`${problem.file}:${problem.line}`);
    console.error(`  ${problem.text}\n`);
  }

  process.exit(1);
}

console.log("[STR] Encoding verificado: OK.");
