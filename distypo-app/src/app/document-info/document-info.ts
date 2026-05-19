import { Component, computed, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-document-info',
  imports: [MatCardModule],
  templateUrl: './document-info.html',
  styleUrl: './document-info.scss',
})
export class DocumentInfo {

  filename = signal<string | undefined>('intro.txt');

  fileSize = signal(1234);          // bytes
  wordCount = signal(186);
  sentenceCount = signal(14);
  formattedSize = computed(() => formatBytes(this.fileSize()));
  lineCount = signal(22);
  hasFile = computed(() => this.filename() !== null);
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
