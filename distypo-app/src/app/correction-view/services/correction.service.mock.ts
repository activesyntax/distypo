import { signal } from '@angular/core';
import { CorrectionId } from '@core/domain/model';
import {
  CorrectionService,
  CorrectionStatus,
  PENDING,
} from './correction.service';

export class CorrectionServiceMock implements Partial<CorrectionService> {
  private readonly _editingId = signal<CorrectionId | null>(null);
  private readonly _statuses =
    signal<ReadonlyMap<CorrectionId, CorrectionStatus>>(new Map());

  readonly editingId = this._editingId.asReadonly();
  readonly statuses = this._statuses.asReadonly();

  statusOf = (_id: CorrectionId): CorrectionStatus => PENDING;

  keep = (_id: CorrectionId): void => { };
  fix = (_id: CorrectionId): void => { };
  commitEdit = (_id: CorrectionId, _customReplacement: string): void => { };
  edit = (_id: CorrectionId): void => { };
  cancelEdit = (): void => { };
  reset = (_id: CorrectionId): void => { };
}

/** Drop-in providers entry for TestBed.configureTestingModule. */
export const provideCorrectionServiceMock = () => ({
  provide: CorrectionService,
  useClass: CorrectionServiceMock,
});
