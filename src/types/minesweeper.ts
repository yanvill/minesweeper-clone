// Probably a better way to do this with a .d.ts file

export enum CellState {
  Untouched,
  UntouchedBomb,
  Exploded,
  Flagged,
  Unsure,
  Cleared,
}

export type GameBoard = CellState[][];

export type GameHints = number[][];

export type CellLocation = [number, number];

export interface CellClickedEvent {
  loc: CellLocation;
  isRightClick: boolean;
}
