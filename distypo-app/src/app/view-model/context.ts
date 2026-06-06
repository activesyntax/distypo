import { Correction } from "@core/index";
import { interval, Interval } from "@utils/interval";

const isWhitespace = (ch: string): boolean => /[\s]/.test(ch);

export function contextRange(content: string, correction: Correction): Interval {

  const start = contextStart(content, correction);
  const end = contextEnd(content, correction);

  return interval(start, end);
}

function contextStart(content: string, correction: Correction): number {
  for (let i = correction.range.start - 1; i >= 0; i--) {
    if (isWhitespace(content[i])) {
      return i + 1;
    }
  }
  return 0;
}

function contextEnd(content: string, correction: Correction): number {
  for (let i = correction.range.end; i < content.length; i++) {
    if (isWhitespace(content[i])) {
      return i;
    }
  }
  return content.length;
}

