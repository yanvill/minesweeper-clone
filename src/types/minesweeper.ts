// Probably a better way to do this with a .d.ts file

export enum CellState {
  Untouched,
  Exploded,
  Flagged,
  Unsure,
  Cleared,
}

export type CellLocation = [number, number];

export interface CellChangeEvent {
  loc: CellLocation;
  old: CellState;
  new: CellState;
}

export interface GameScore {
  flagged: number;
  cleared: number;
  untouched: number;
  unsure: number;
}
