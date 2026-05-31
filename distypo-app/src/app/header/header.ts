import { Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { OutputDocument } from '@app/state/output-document';
import { DocumentService } from '@app/document-view/services/document.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatButton, MatIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  outputDocument = inject(OutputDocument);
  documentService = inject(DocumentService);

  save() {
    this.documentService.saveAsFile(this.outputDocument.plainText());
  }
}
