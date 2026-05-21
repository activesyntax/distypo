
// import { Result, UniqId } from "@core/utils";

export type TextRange = Readonly<{
  readonly start: number;
  readonly end: number;
  readonly __brand: 'TextRange';
}>;

export type TextRangeError =
  | { kind: 'negative-start'; start: number }
  | { kind: 'start-after-end'; start: number; end: number }
  | { kind: 'end-out-of-bounds'; end: number; textLength: number };

// export const TextRange = {
//   create: (start: number, end: number, textLength: number): Result<TextRange, TextRangeError> => {
//     if (start < 0) return { ok: false, error: { kind: 'negative-start', start } };
//     if (start > end) return { ok: false, error: { kind: 'start-after-end', start, end } };
//     if (end > textLength) return { ok: false, error: { kind: 'end-out-of-bounds', end, textLength } };
//     return { ok: true, value: { start, end, __brand: 'TextRange' } as TextRange };
//   },
// };
//
