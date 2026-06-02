export type FileContentSource = { kind: 'file', name: string; path: string };
export type TextContentSource = { kind: 'text'; text: string };

export type ContentSource =
  | FileContentSource
  | TextContentSource;

export const defaultSource = (): ContentSource => ({
  kind: 'file',
  name: 'demo.txt',
  path: '/assets/data/demo.txt',
});


export const toFileUrl = (src: ContentSource): string | undefined =>
  src.kind === 'file' ? src.path : undefined;
