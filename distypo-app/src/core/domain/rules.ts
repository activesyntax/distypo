export type Corrector = (match: RegExpMatchArray) => string

export type Rule = {
  name: string;
  description: string;
  regex: RegExp;
  corrector: Corrector;
}




