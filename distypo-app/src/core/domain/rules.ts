export type Corrector = (match: RegExpMatchArray) => string

export type Rule = {
  name: string;
  description: string;
  hint: string;
  regex: RegExp;
  corrector: Corrector;
}




