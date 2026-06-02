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


export const emptySource = (): ContentSource => ({
  kind: 'text',
  text: '',
});
