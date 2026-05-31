import { LintedDocument, PolishedDocument } from "@core/domain/model";

export function polish(doc: LintedDocument): PolishedDocument {

  const polishedDoc: PolishedDocument = {
    kind: "polished",
    content: doc.content,
  };
  return polishedDoc;
}
