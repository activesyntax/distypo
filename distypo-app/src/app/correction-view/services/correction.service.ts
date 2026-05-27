import { Injectable, signal } from '@angular/core';
import { CorrectionId } from '@core/domain/model';

export type CorrectionStatus = 'pending' | 'kept' | 'fixed';

@Injectable()
export class CorrectionService {
  private readonly _selectedIds = signal<ReadonlySet<CorrectionId>>(new Set());
  private readonly _editingId = signal<CorrectionId | null>(null);
  private readonly _statuses = signal<ReadonlyMap<CorrectionId, CorrectionStatus>>(new Map());

  readonly selectedIds = this._selectedIds.asReadonly();
  readonly editingId = this._editingId.asReadonly();
  readonly statuses = this._statuses.asReadonly();

  // Selection
  select(id: CorrectionId) {
    this._selectedIds.set(new Set([id]));
  }

  toggle(id: CorrectionId) {
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
  keep(id: CorrectionId) { this.setStatus(id, 'kept'); }
  fix(id: CorrectionId) { this.setStatus(id, 'fixed'); }
  edit(id: CorrectionId) { this._editingId.set(id); }

  reset(id: CorrectionId) {
    this._statuses.update(m => {
      const n = new Map(m);
      n.delete(id);
      return n;
    });
  }
  private setStatus(id: CorrectionId, status: CorrectionStatus) {
    this._statuses.update(m => new Map(m).set(id, status));
  }
}
