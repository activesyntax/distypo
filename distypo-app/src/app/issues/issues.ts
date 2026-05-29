import { Component, computed, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const RING_RADIUS = 42;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

@Component({
  selector: 'app-issues',
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './issues.html',
  styleUrl: './issues.scss',
})
export class Issues {

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

  fixAll() { }

}
