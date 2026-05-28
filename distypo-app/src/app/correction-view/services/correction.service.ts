import { Injectable, signal } from '@angular/core';
import { CorrectionId } from '@core/domain/model';

type Pending = { kind: 'pending' };
type Kept = { kind: 'kept' };
type Fixed = { kind: 'fixed'; customReplacement?: string };

export type CorrectionStatus = Pending | Kept | Fixed;

export const PENDING: Pending = { kind: 'pending' };

@Injectable()
export class CorrectionService {
  private readonly _editingId = signal<CorrectionId | null>(null);
  private readonly _statuses = signal<ReadonlyMap<CorrectionId, CorrectionStatus>>(new Map());

  readonly editingId = this._editingId.asReadonly();
  readonly statuses = this._statuses.asReadonly();

  statusOf(id: CorrectionId): CorrectionStatus {
    return this._statuses().get(id) ?? PENDING;
  }

  keep(id: CorrectionId) { this.setStatus(id, { kind: 'kept' }); }
  fix(id: CorrectionId) { this.setStatus(id, { kind: 'fixed' }); }

  commitEdit(id: CorrectionId, customReplacement: string) {
    this.setStatus(id, { kind: 'fixed', customReplacement });
    this._editingId.set(null);
  }

  edit(id: CorrectionId) { this._editingId.set(id); }
  cancelEdit() { this._editingId.set(null); }

  reset(id: CorrectionId) {
    this._statuses.update(m => {
      const n = new Map(m);
      n.delete(id);
      return n;
    });
    if (this._editingId() === id) this._editingId.set(null);
  }

  private setStatus(id: CorrectionId, status: CorrectionStatus) {
    this._statuses.update(m => new Map(m).set(id, status));
  }
}
