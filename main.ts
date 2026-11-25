import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve paths from this file's location, never from the working directory:
// the grader runs the program from elsewhere, so relative paths would fail.
const here = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

// The confession: two parts, a To: line and one message line, exactly as typed.
const recipient = "Maya";
const message =
  "I still have the library book you lent me in 2019. " +
  "I kept it because returning it meant admitting I stopped calling first.";

const entry = `To: ${recipient}\n${message}`;

const lines = entry.split("\n");
if (lines.length !== 2 || !lines[0].startsWith("To: ")) {
  throw new Error("entry must be exactly a To: line plus one message line");
}

const totalLength = [...entry].length;
const messageLength = [...message].length;

if (totalLength < 1 || totalLength > 260) {
  throw new Error(`entry is ${totalLength} characters, must be 1-260`);
}
if (messageLength > 200) {
  throw new Error(`message line is ${messageLength} characters, max 200`);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, entry, "utf8");
console.log(`wrote ${outputPath} (${totalLength} chars total, ${messageLength} in message)`);
