import { Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DocumentState } from '@app/state/document-state';
import { formatBytes } from '@utils/format';

@Component({
  selector: 'app-document-info',
  imports: [MatCardModule],
  templateUrl: './document-info.html',
  styleUrl: './document-info.scss',
})
export class DocumentInfo {
  documentState = inject(DocumentState);
  formattedSize = computed(() => formatBytes(this.documentState.contentSizeBytes()));
}

