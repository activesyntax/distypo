// Domain types
export type {
  TextDocument,
  RawDocument,
  LintedDocument,
  PolishedDocument,
  Correction,
} from './domain/model';

export type { TextRange, TextRangeError } from './domain/text-range';


//  Pure operations
export { lint } from './operations/lint';
export { polish } from './operations/polish';

