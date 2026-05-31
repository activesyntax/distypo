import { Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DocumentState } from '@app/state/document-state';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatButton, MatIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  docuemntState = inject(DocumentState);

  async paste() {
    await this.docuemntState.paste();
  }
}
