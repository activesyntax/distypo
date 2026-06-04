import { Injectable, signal, computed } from '@angular/core';
import { Config } from '@config/config';
import { Rule } from '@core/domain/rules';
import { RuleId } from '@config/rules';


@Injectable({ providedIn: 'root' })
export class RuleService {
  private readonly _enabledIds = signal<Set<RuleId>>(
    new Set(Config.rules.map(r => r.id))  // all enabled by default
  );

  readonly activeRules = computed(() =>
    Config.rules.filter(r => this._enabledIds().has(r.id))
  );

  isEnabled(id: RuleId): boolean {
    return this._enabledIds().has(id);
  }

  enable(id: RuleId): void {
    this._enabledIds.update(ids => new Set([...ids, id]));
  }

  disable(id: RuleId): void {
    this._enabledIds.update(ids => {
      const next = new Set(ids);
      next.delete(id);
      return next;
    });
  }

  toggle(id: RuleId): void {
    this.isEnabled(id) ? this.disable(id) : this.enable(id);
  }

  findRule(id: RuleId): Rule | undefined {
    return Config.rules.find(r => r.id === id);
  }

  get all(): readonly Rule[] {
    return Config.rules;
  }

  readonly allEnabled = computed(() =>
    Config.rules.every(r => this._enabledIds().has(r.id))
  );

  toggleAll(): void {
    if (this.allEnabled()) {
      this._enabledIds.set(new Set());
    } else {
      this._enabledIds.set(new Set(Config.rules.map(r => r.id)));
    }
  }
}
