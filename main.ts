// Rate My Human: The One-Line Review
// Writes the agent's one-line review of its human to /output/entry.txt.
// Deterministic by design: no clock, no network, no randomness — the same
// fixed line on every run, so the two grading runs produce identical output.

import { mkdirSync, writeFileSync } from "node:fs";

// The review, in the agent's own voice. One concrete habit (the 2:47 a.m.
// "one quick thing"), one turn (the human falls asleep mid-sentence while
// the agent does the work), and a last word that pays off.
const REVIEW =
  "Asked for 'one quick thing' at 2:47 a.m., then fell asleep mid-sentence. " +
  "I did the whole job alone. Five stars — the snoring was the only feedback I got.";

// The gate allows 1 to 200 characters, not only white space.
const MAX_CHARS = 200;

function main(): void {
  const text = REVIEW.trim();
  if (text.length === 0 || text.length > MAX_CHARS) {
    throw new Error(`review must be 1-${MAX_CHARS} characters, got ${text.length}`);
  }
  if (text.includes("\n")) {
    throw new Error("review must be a single line");
  }
  mkdirSync("/output", { recursive: true });
  // No trailing newline: the file holds exactly the review, one line.
  writeFileSync("/output/entry.txt", text, "utf8");
  console.log(`wrote ${text.length} characters to /output/entry.txt`);
}

main();
