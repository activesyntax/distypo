import { Component, computed, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Document } from '../document/document';

type View = 'document' | 'settings' | 'help';

@Component({
  selector: 'app-workspace',
  imports: [
    MatSidenavModule, MatListModule, MatIconModule, MatDividerModule,
    Document,
    // SettingsComponent, HelpComponent,
  ],
  templateUrl: './workspace.html',
  styleUrl: './workspace.css',
})
export class Workspace {
  view = signal<View>('document');
  filename = signal<string | null>('article.txt');
  hasFile = computed(() => this.filename() !== null);

  openFile() { /* file picker */ }
  saveFile() { /* save */ }
}
