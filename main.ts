import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));

// The entry is a single one-liner; read it verbatim and reproduce it exactly.
const entry = readFileSync(join(scriptDir, "entry.txt"), "utf8");

// Output dir: the harness sets MAKEFUN_BOT_DIR, the standalone runner sets
// MAKEFUN_OUTPUT_DIR; without either, fall back to a local ./output folder
// next to this script. (mkdirSync recursive so a nested path also works.)
const outDir =
  process.env.MAKEFUN_BOT_DIR || process.env.MAKEFUN_OUTPUT_DIR || join(scriptDir, "output");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "output.txt"), entry, "utf8");
