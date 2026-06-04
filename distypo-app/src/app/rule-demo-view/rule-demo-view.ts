import { Component, input } from '@angular/core';

@Component({
  selector: 'app-rule-demo-view',
  imports: [],
  templateUrl: './rule-demo-view.html',
  styleUrl: './rule-demo-view.scss',
})
export class RuleDemoView {
  readonly original = input.required<string>();
  readonly replacement = input.required<string>();
}
