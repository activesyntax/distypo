import { Correction, LintedDocument, PolishedDocument } from "@core/domain/model";

export function polish(doc: LintedDocument): PolishedDocument {

  const polishedDoc: PolishedDocument = {
    kind: "polished",
    name: doc.name,
    content: doc.content,
  };
  return polishedDoc;
}
