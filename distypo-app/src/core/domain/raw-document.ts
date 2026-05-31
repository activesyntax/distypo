import { RawDocument } from './model';

export function rawDocument(content: string): RawDocument {
  return { kind: 'raw', content };
}
