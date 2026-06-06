import { PolishedDocument } from "@core/domain/model";

export function polish(content: string): PolishedDocument {

  const polishedDoc: PolishedDocument = {
    kind: "polished",
    content: content,
  };
  return polishedDoc;
}
