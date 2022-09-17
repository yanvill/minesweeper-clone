<script setup lang="ts">
import MinesweeperGrid from "../components/MinesweeperGrid.vue";
</script>

<template>
  <div class="controller">
    <MinesweeperGrid
      :grid-height="gridHeight"
      :grid-width="gridWidth"
      :disabled="gameDisabled"
      :bombLocations="bombLocations"
      @cell-changed="handleCellChange"
    />
  </div>
</template>

<script lang="ts">
import { CellState } from "../types/minesweeper";
import type {
  CellLocation,
  CellChangeEvent,
  GameScore,
} from "../types/minesweeper";
import { defineComponent } from "vue";

function getNewScore(height: number, width: number): GameScore {
  return {
    flagged: 0,
    cleared: 0,
    untouched: height * width,
    unsure: 0,
  };
}

function createBombLocations(
  height: number,
  width: number,
  numBombs: number
): CellLocation[] {
  // TODO: Randomly generate bombs
  return [
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
  ];
}

export default defineComponent({
  data() {
    return {
      gridHeight: 5,
      gridWidth: 5,
      numBombs: 5,
      gameDisabled: false,
      score: getNewScore(5, 5),
      clearedCount: 0,
      bombLocations: createBombLocations(5, 5, 5),
    };
  },
  methods: {
    resetScore(): GameScore {
      return getNewScore(this.gridHeight, this.gridWidth);
    },
    handleCellChange(event: CellChangeEvent) {
      if (event.new == CellState.Exploded) {
        this.handleExplosion();
        return;
      }
      this.handleScoreChange(event);
    },
    handleScoreChange(event: CellChangeEvent) {
      // TODO: Find a better way to update this using mapping
      if (event.new == CellState.Cleared) {
        this.score.cleared++;
      } else if (event.new == CellState.Flagged) {
        this.score.flagged++;
      } else if (event.new == CellState.Unsure) {
        this.score.unsure++;
      } else if (event.new == CellState.Untouched) {
        this.score.untouched++;
      }

      if (event.old == CellState.Cleared) {
        this.score.cleared--;
      } else if (event.old == CellState.Flagged) {
        this.score.flagged--;
      } else if (event.old == CellState.Unsure) {
        this.score.untouched--;
      } else if (event.old == CellState.Untouched) {
        this.score.untouched--;
      }
      var totalSquaresCompleted: number = this.score.cleared + this.numBombs;
      if (totalSquaresCompleted == this.gridHeight * this.gridWidth) {
        this.handleGameCleared();
      }
    },
    handleExplosion() {
      this.gameDisabled = true;
    },
    handleGameCleared() {
      window.alert("Congrats!");
      this.gameDisabled = true;
    },
  },
});
</script>
