import { Component, computed, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { Document } from '@app/document/document';
import { Settings } from '@app/settings/settings';
import { HelpPage } from '@app/help-page/help-page';
import { DocumentInfo } from '@app/document-info/document-info';

type View = 'document' | 'settings' | 'help-page';

const RING_RADIUS = 42;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

@Component({
  selector: 'app-workspace',
  imports: [
    MatSidenavModule, MatListModule, MatIconModule,
    MatDividerModule, MatCardModule,
    Document, Settings, HelpPage, DocumentInfo
  ],
  templateUrl: './workspace.html',
  styleUrl: './workspace.scss',
})
export class Workspace {
  view = signal<View>('document');
  detectedIssues = signal(20);
  resolvedIssues = signal(12);

  remainingIssues = computed(() => this.detectedIssues() - this.resolvedIssues());

  // Progress ring
  readonly ringCircumference = RING_CIRCUMFERENCE;
  ringOffset = computed(() => {
    const total = this.detectedIssues();
    const progress = total === 0 ? 1 : this.resolvedIssues() / total;
    return RING_CIRCUMFERENCE * (1 - progress);
  });

  openFile() { /* … */ }
  saveFile() { /* … */ }
}

