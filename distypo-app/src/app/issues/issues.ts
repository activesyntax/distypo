import { Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DocumentState } from '@app/state/document-state';
import { CorrectionService } from '@app/correction-view/services/correction.service';
import { DocumentService } from '@app/document-view/services/document.service';

const RING_RADIUS = 42;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

@Component({
  selector: 'app-issues',
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './issues.html',
  styleUrl: './issues.scss',
})
export class Issues {

  private documentState = inject(DocumentState);
  private corrections = inject(CorrectionService);
  private documentService = inject(DocumentService);

  detectedIssues = computed(() =>
    this.documentState.linted()?.corrections.length ?? 0
  );

  resolvedIssues = computed(() => {
    const doc = this.documentState.linted();
    if (!doc) return 0;
    return doc.corrections
      .filter(c => this.corrections.statusOf(c.id).kind !== 'pending')
      .length;
  });

  remainingIssues = computed(() => this.detectedIssues() - this.resolvedIssues());

  // Progress ring
  readonly ringCircumference = RING_CIRCUMFERENCE;
  ringOffset = computed(() => {
    const total = this.detectedIssues();
    const progress = total === 0 ? 1 : this.resolvedIssues() / total;
    return RING_CIRCUMFERENCE * (1 - progress);
  });

  fixAll() {
    this.documentService.fixAllPending();
  }


}
