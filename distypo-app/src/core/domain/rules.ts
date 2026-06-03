import { UniqId } from "@utils/identity";

export type Corrector = (match: RegExpMatchArray) => string

export type Rule = {
  id: UniqId<"RuleId">;
  name: string;
  description: string;
  hint: string;
  regex: RegExp;
  corrector: Corrector;
}




