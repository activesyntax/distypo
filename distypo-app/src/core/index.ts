// Domain types
export type {
  TextDocument,
  RawDocument,
  LintedDocument,
  PolishedDocument,
  Correction,
  InputFile,
} from './domain/model';


//  Pure operations
export { lint } from './operations/lint';
export { polish } from './operations/polish';

