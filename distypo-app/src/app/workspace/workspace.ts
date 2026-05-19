import { Component, computed, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Document } from '@app/document/document';
import { Settings } from '@app/settings/settings';
import { HelpPage } from '@app/help-page/help-page';
import { DocumentInfo } from '@app/document-info/document-info';
import { Issues } from '@app/issues/issues';

type View = 'document' | 'settings' | 'help-page';


@Component({
  selector: 'app-workspace',
  imports: [
    MatSidenavModule, MatListModule, MatIconModule,
    MatDividerModule, Issues,
    Document, Settings, HelpPage, DocumentInfo
  ],
  templateUrl: './workspace.html',
  styleUrl: './workspace.scss',
})
export class Workspace {
  view = signal<View>('document');

  openFile() { /* … */ }
  saveFile() { /* … */ }
}

