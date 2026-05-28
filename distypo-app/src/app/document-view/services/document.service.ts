import { Injectable } from '@angular/core';

@Injectable()
export class DocumentService {
  copy(text: string): Promise<void> {
    return navigator.clipboard.writeText(text);
  }

  paste(): Promise<string> {
    return navigator.clipboard.readText();
  }

  // TODO: load(path) / save(...) once a transport is defined.
}
