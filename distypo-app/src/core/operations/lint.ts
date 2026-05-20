import { Correction, LintedDocument, RawDocument } from "@core/domain/model";

export function lint(doc: RawDocument): LintedDocument {

  const corrections: Correction[] = [];
  const lintedDoc: LintedDocument = {
    kind: "linted",
    name: doc.name,
    content: doc.content,
    corrections,
  };
  return lintedDoc;
}
