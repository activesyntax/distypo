import { Component, input, output } from '@angular/core';
import { Correction } from '@core/index';

@Component({
  selector: 'app-correction-view',
  imports: [],
  templateUrl: './correction-view.html',
  styleUrl: './correction-view.scss',
})
export class CorrectionView {
  readonly correction = input.required<Correction>();
  readonly selected = input<boolean>(false);

  readonly select = output<void>();
  readonly keep = output<void>();
  readonly fix = output<void>();
  readonly edit = output<void>();
}
