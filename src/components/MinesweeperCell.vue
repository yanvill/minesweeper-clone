<script setup lang="ts">
import type { CellLocation, CellChangeEvent } from "../types/minesweeper";

defineProps<{
  loc: CellLocation;
  isBomb: boolean;
}>();

defineEmits<{
  (e: "changed", value: CellChangeEvent): void;
}>();
</script>

<template>
  <td
    class="minesweeper-cell"
    @click="handleLeftClick"
    @contextmenu.prevent="handleRightClick"
    :class="cellClass"
  ></td>
</template>

<script lang="ts">
import { CellState } from "../types/minesweeper";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      cellState: CellState.Untouched,
    };
  },
  computed: {
    isLeftClickable() {
      return this.cellState == CellState.Untouched;
    },
    isRightClickable() {
      const validStates = [
        CellState.Untouched,
        CellState.Flagged,
        CellState.Marked,
      ];
      return validStates.includes(this.cellState);
    },
    cellClass() {
      const newClassMap = new Map<CellState, string>([
        [CellState.Untouched, "untouched"],
        [CellState.Exploded, "exploded"],
        [CellState.Flagged, "flagged"],
        [CellState.Marked, "marked"],
        [CellState.Cleared, "cleared"],
      ]);

      var cellClass = newClassMap.get(this.cellState);

      if (cellClass == undefined) {
        throw new Error(
          `Uh oh, we were supposed to know what the new cell class from ${this.cellState} would be`
        );
      }
      return cellClass;
    },
  },
  methods: {
    handleLeftClick() {
      if (!this.isLeftClickable) {
        return;
      }
      var newState = CellState.Cleared;

      if (this.isBomb) {
        newState = CellState.Exploded;
      }

      this.$emit("changed", {
        loc: this.loc,
        old: this.cellState,
        new: newState,
      });
      this.cellState = newState;
    },
    handleRightClick() {
      if (!this.isRightClickable) {
        return;
      }
      const newStateMap = new Map<CellState, CellState>([
        [CellState.Untouched, CellState.Flagged],
        [CellState.Flagged, CellState.Marked],
        [CellState.Marked, CellState.Untouched],
      ]);
      var newState = newStateMap.get(this.cellState);

      if (newState == undefined) {
        throw new Error(
          `Uh oh, we were supposed to know what the new state from ${this.cellState} would be`
        );
      }

      this.$emit("changed", {
        loc: this.loc,
        old: this.cellState,
        new: newState,
      });
      this.cellState = newState;
    },
  },
});
</script>

<style scoped>
.minesweeper-cell {
  height: 2.5em;
  width: 2.5em;
}

.minesweeper-cell.untouched {
  background: grey;
}

.minesweeper-cell.exploded {
  background: darkred;
}
.minesweeper-cell.flagged {
  background: lightblue;
}

.minesweeper-cell.marked {
  background: orchid;
}

.minesweeper-cell.cleared {
  background: lightgreen;
}
</style>
