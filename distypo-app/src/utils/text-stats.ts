/** Count words by splitting on whitespace runs. */
export function countWords(text: string): number {
  if (!text) return 0;
  // Match runs of non-whitespace. Handles leading/trailing whitespace,
  // multiple spaces, tabs, newlines, and non-breaking spaces uniformly.
  return text.match(/\S+/gu)?.length ?? 0;
}

/** Count sentence terminators (. ! ? plus their full-width and ellipsis forms). */
export function countSentences(text: string): number {
  if (!text) return 0;
  // Match runs of terminators so "What?!" counts once, not twice.
  return text.match(/[.!?…]+(?=\s|$)/gu)?.length ?? 0;
}

/** Count lines, including a possibly-unterminated final line. */
export function countLines(text: string): number {
  if (!text) return 0;
  // Split handles \n, \r\n, and \r; final non-empty line counts.
  const lines = text.split(/\r\n|\r|\n/);
  const last = lines[lines.length - 1];
  return last === '' ? lines.length - 1 : lines.length;
}
