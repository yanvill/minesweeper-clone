<script setup lang="ts">
import MinesweeperGrid from "@/components/MinesweeperGrid.vue";
import MinesweeperScoreboard from "@/components/MinesweeperScoreboard.vue";
</script>

<template>
  <div class="controller">
    <MinesweeperScoreboard :game-board="gameBoard" />
    <MinesweeperGrid
      :game-board="gameBoard"
      :hints="gameHints"
      :disabled="gameDisabled"
      @cell-clicked="handleCellClicked"
    />
  </div>
</template>

<script lang="ts">
import { CellState, type CellClickedEvent } from "../types/minesweeper";
import BoardUtility from "@/utils/MinesweeperBoardUtility";
import { defineComponent } from "vue";

const INITIAL_UTILITY = new BoardUtility(10, 10, 5);

export default defineComponent({
  data() {
    return {
      boardUtility: INITIAL_UTILITY,
      gameBoard: INITIAL_UTILITY.board,
      gameHints: INITIAL_UTILITY.hints,
      gameDisabled: false,
    };
  },
  computed: {
    boardWidth(): number {
      return this.gameBoard[0].length;
    },
    boardHeight(): number {
      return this.gameBoard.length;
    },
  },
  methods: {
    setupGame(height: number, width: number, numBombs: number) {
      this.boardUtility = new BoardUtility(height, width, numBombs);
      this.gameBoard = this.boardUtility.board;
      this.gameHints = this.boardUtility.hints;
    },
    handleCellClicked(event: CellClickedEvent) {
      if (this.gameDisabled) return;

      if (event.isRightClick) {
        this.handleRightClick(event.loc[0], event.loc[1]);
      } else {
        this.handleLeftClick(event.loc[0], event.loc[1]);
      }
    },
    handleLeftClick(x: number, y: number) {
      console.log("Handling left click on " + x + y);

      const nextStateMap = new Map<CellState, CellState>([
        [CellState.Untouched, CellState.Cleared],
        [CellState.UntouchedBomb, CellState.Exploded],
      ]);

      var current = this.gameBoard[x][y];
      var next = nextStateMap.get(current);

      if (next == undefined) return;

      this.gameBoard[x][y] = next;
      if (next == CellState.Exploded) this.handleExplosion();

      if (this.gameHints[x][y] == 0) this.clearAdjacentCells(x, y);
    },
    clearAdjacentCells(x: number, y: number) {
      const validStates = [CellState.UntouchedBomb, CellState.Exploded];
      return validStates.includes(this.gameBoard[x][y]);
    },
    handleRightClick(x: number, y: number) {
      const nextStateMap = new Map<CellState, CellState>([
        [CellState.Untouched, CellState.Flagged],
        [CellState.UntouchedBomb, CellState.Flagged],
        [CellState.Flagged, CellState.Unsure],
        [CellState.Unsure, CellState.Untouched],
      ]);

      var current = this.gameBoard[x][y];
      var next = nextStateMap.get(current);

      if (next == undefined) return;

      this.gameBoard[x][y] = next;
    },
    handleExplosion() {
      window.alert("Explosion!!");
      this.gameDisabled = true;
    },
    handleGameCleared() {
      window.alert("Congrats!");
      this.gameDisabled = true;
    },
  },
});
</script>
