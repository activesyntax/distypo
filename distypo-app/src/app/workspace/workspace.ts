import { Component, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { DocumentView } from '@app/document-view/document-view';
import { Settings } from '@app/settings/settings';
import { DocumentInfo } from '@app/document-info/document-info';
import { Issues } from '@app/issues/issues';
import { About } from "@app/about/about";

type View = 'document' | 'settings' | 'about';

@Component({
  selector: 'app-workspace',
  imports: [
    MatSidenavModule, MatListModule, MatIconModule,
    DocumentView, Settings, About, DocumentInfo, Issues,
    About
  ],

  templateUrl: './workspace.html',
  styleUrl: './workspace.scss',
})
export class Workspace {

  view = signal<View>('document');
}

