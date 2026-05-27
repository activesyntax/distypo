import { Injectable, signal } from '@angular/core';

export type CorrectionStatus = 'pending' | 'kept' | 'fixed';

@Injectable()
export class CorrectionService {
  private readonly _selectedIds = signal<ReadonlySet<string>>(new Set());
  private readonly _editingId = signal<string | null>(null);
  private readonly _statuses = signal<ReadonlyMap<string, CorrectionStatus>>(new Map());

  readonly selectedIds = this._selectedIds.asReadonly();
  readonly editingId = this._editingId.asReadonly();
  readonly statuses = this._statuses.asReadonly();

  // Selection
  select(id: string) {
    this._selectedIds.set(new Set([id]));
  }

  toggle(id: string) {
    this._selectedIds.update(s => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }

  clearSelection() {
    this._selectedIds.set(new Set());
  }

  // Per-correction actions
  keep(id: string) { this.setStatus(id, 'kept'); }
  fix(id: string) { this.setStatus(id, 'fixed'); }
  edit(id: string) { this._editingId.set(id); }

  private setStatus(id: string, status: CorrectionStatus) {
    this._statuses.update(m => new Map(m).set(id, status));
  }
}
