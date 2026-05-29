type Pending = { kind: 'pending' };
type Kept = { kind: 'kept' };
type Fixed = { kind: 'fixed'; customReplacement?: string };

export type CorrectionStatus = Pending | Kept | Fixed;

export const PENDING: Pending = { kind: 'pending' };

