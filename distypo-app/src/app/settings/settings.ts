import { Component, inject } from '@angular/core';
import { RuleService } from '@app/config/rule.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RuleDemoView } from '@app/rule-demo-view/rule-demo-view';
import { ruleDemos, RuleDemo } from '@app/settings/rule-demo';
import { RuleId } from '@config/rules';

@Component({
  selector: 'app-settings',
  imports: [MatSlideToggleModule, RuleDemoView],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  readonly rules = inject(RuleService);

  private readonly demoMap = new Map<RuleId, RuleDemo>(
    ruleDemos.map(d => [d.ruleId as RuleId, d])
  );

  demoFor(ruleId: RuleId): RuleDemo | undefined {
    return this.demoMap.get(ruleId);
  }
}
