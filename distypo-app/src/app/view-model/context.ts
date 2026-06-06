import { Correction } from "@core/index";
import { interval, Interval } from "@utils/interval";

const isWhitespace = (ch: string): boolean => /[\s]/.test(ch);

export function contextRange(content: string, correction: Correction): Interval {

  const start = contextStart(content, correction);
  const end = contextEnd(content, correction);

  return interval(start, end);
}

function contextEnd(content: string, correction: Correction) {

  for (let end = correction.range.end; end <= content.length; end++) {
    if (isWhitespace(content[end])) {
      return end;
    }
  }
  return content.length - 1;
}

function contextStart(content: string, correction: Correction) {

  for (let start = correction.range.start; start >= 0; start--) {
    if (isWhitespace(content[start])) {
      return start;
    }
  }
  return 0;
}

