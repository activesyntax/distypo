import { Component, inject, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { DocumentView } from '@app/document-view/document-view';
import { Settings } from '@app/settings/settings';
import { HelpPage } from '@app/help-page/help-page';
import { DocumentInfo } from '@app/document-info/document-info';
import { Issues } from '@app/issues/issues';
import { RenderedDocument } from '@app/view-model/rendered-document';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import { DocumentService } from '@app/document-view/services/document.service';
import { DocumentState } from '@app/state/document-state';

type View = 'document' | 'settings' | 'help-page';

@Component({
  selector: 'app-workspace',
  imports: [
    MatSidenavModule, MatListModule, MatIconModule,
    DocumentView, Settings, HelpPage, DocumentInfo, Issues
  ],

  providers: [RenderedDocument, DocumentService, CorrectionService, DocumentState],
  templateUrl: './workspace.html',
  styleUrl: './workspace.scss',
})
export class Workspace {

  view = signal<View>('document');

  openFile() { /* … */ }
  saveFile() { /* … */ }
}

