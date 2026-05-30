import { Component, computed, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DocumentState } from '@app/state/document-state';

@Component({
  selector: 'app-document-info',
  imports: [MatCardModule],
  templateUrl: './document-info.html',
  styleUrl: './document-info.scss',
})
export class DocumentInfo {

  documentState = inject(DocumentState);

  filename = signal<string | undefined>('intro.txt');

  formattedSize = computed(() => formatBytes(this.documentState.contentSizeBytes()));
  hasFile = computed(() => this.filename() !== null);
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
