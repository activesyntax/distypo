import { RawDocument } from './model';

export function fromContent(name: string, content: string): RawDocument {
  return { kind: 'raw', name, content };
}

export function empty(name: string): RawDocument {
  return { kind: 'raw', name, content: '' };
}
