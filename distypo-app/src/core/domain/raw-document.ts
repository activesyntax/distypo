import { RawDocument } from './model';

export function from(name: string, content: string): RawDocument {
  return { kind: 'raw', name, content };
}

export function empty(name: string): RawDocument {
  return { kind: 'raw', name, content: '' };
}
