import { Component, computed, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { Document } from '@app/document/document';
import { Settings } from '@app/settings/settings';
import { HelpPage } from '@app/help-page/help-page';

type View = 'document' | 'settings' | 'help-page';

const RING_RADIUS = 42;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

@Component({
  selector: 'app-workspace',
  imports: [
    MatSidenavModule, MatListModule, MatIconModule,
    MatDividerModule, MatCardModule,
    Document, Settings, HelpPage
  ],
  templateUrl: './workspace.html',
  styleUrl: './workspace.scss',
})
export class Workspace {
  view = signal<View>('document');
  filename = signal<string | null>('intro.txt');

  fileSize = signal(1234);          // bytes
  wordCount = signal(186);
  sentenceCount = signal(14);
  lineCount = signal(22);
  detectedIssues = signal(20);
  resolvedIssues = signal(12);

  hasFile = computed(() => this.filename() !== null);
  remainingIssues = computed(() => this.detectedIssues() - this.resolvedIssues());
  formattedSize = computed(() => formatBytes(this.fileSize()));

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

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
