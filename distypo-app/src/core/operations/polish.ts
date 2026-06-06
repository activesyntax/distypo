import { toSegments } from "@app/view-model/segment-operations";
import { LintedDocument, PolishedDocument } from "@core/domain/model";

export function polish(doc: LintedDocument): PolishedDocument {

  const polishedDoc: PolishedDocument = {
    kind: "polished",
    content: doc.content,
  };
  return polishedDoc;
}

// readonly segments = computed(() => {
//   const doc = this.documentState.linted();
//   return doc ? toSegments(doc) : [];
// });
//
// readonly plainText = computed(() => this.asPlainText());

// function asPlainText(lintedDocument: LintedDocument): string {
//   const segments = lintedDocument ? toSegments(lintedDocument) : [];
//
//   return segments
//     .filter(s => s.kind !== 'correction')
//     .map(s => (s.kind === 'text' ? s.text : this.correctionText(s)))
//     .join('');
// }

// correctionText(seg: InlineCorrectionSegment): string {
//
//   // TODO: to many parameters - simplify
//   return resolveCorrectionSegment(
//     seg,
//     this.documentState.linted()!.content,
//     id => this.corrections.statusOf(id),
//     id => this.rules.findRule(id)
//   )
// }
