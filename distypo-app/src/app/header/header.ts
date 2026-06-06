import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DocumentService } from '@app/document-view/services/document.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatButton, MatIcon, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  documentService = inject(DocumentService);

  analyse() {
    this.documentService.analyse();
  }

  save() {
    this.documentService.saveAsFile('corrected-document.txt');
  }
}
