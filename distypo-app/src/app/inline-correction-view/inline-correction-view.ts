import { Component, input } from '@angular/core';
import { InlineCorrectionSegment } from '@app/view-model/segments';

@Component({
  selector: 'app-inline-correction-view',
  imports: [],
  templateUrl: './inline-correction-view.html',
  styleUrl: './inline-correction-view.scss',
})
export class InlineCorrectionView {

  readonly segment = input.required<InlineCorrectionSegment>();
}
