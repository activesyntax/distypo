import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { OutputDocument } from '@app/state/output-document';
import { DocumentService } from '@app/document-view/services/document.service';
import { DocumentState } from '@app/state/document-state';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatButton, MatIcon, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  documentState = inject(DocumentState);
  outputDocument = inject(OutputDocument);
  documentService = inject(DocumentService);
  analyse() {
    this.documentService.analyse();
  }

  save() {
    this.documentService.saveAsFile(this.outputDocument.plainText());
  }
}
