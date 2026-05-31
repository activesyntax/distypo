import { InputFile } from '@core/index';

export type ContentSource =
  | { kind: 'file'; file: InputFile }
  | { kind: 'text'; text: string };

export const defaultSource = (): ContentSource => ({
  kind: 'file',
  file: { name: 'demo.txt', path: '/assets/data/demo.txt' },
});

export const toInputFile = (src: ContentSource): InputFile =>
  src.kind === 'file'
    ? src.file
    : { name: 'clipboard.txt', path: '' };

export const toFileUrl = (src: ContentSource): string | undefined =>
  src.kind === 'file' ? src.file.path : undefined;
