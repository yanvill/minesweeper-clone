export enum CellState {
  Untouched,
  Exploded,
  Flagged,
  Marked,
  Cleared,
}

export type CellLocation = [number, number];

export interface CellChangeEvent {
  loc: CellLocation;
  old: CellState;
  new: CellState;
}
