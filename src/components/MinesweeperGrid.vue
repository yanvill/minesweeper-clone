<script setup lang="ts">
import type {
  CellClickedEvent,
  GameBoard,
  GameHints,
} from "../types/minesweeper";
import MinesweeperCell from "./MinesweeperCell.vue";

defineProps<{
  gameBoard: GameBoard;
  hints: GameHints;
  disabled: boolean;
}>();

defineEmits<{
  (e: "cell-clicked", value: CellClickedEvent): void;
}>();
</script>

<template>
  <div class="minesweeper-grid">
    <table>
      <tr v-for="(row, x) in gameBoard" :key="`row-${x}`" :id="`row-${x}`">
        <MinesweeperCell
          v-for="(cellState, y) in row"
          :id="`col-${y}`"
          :loc="[x, y]"
          :key="`col-${y}`"
          :cellState="gameBoard[x][y]"
          :hint="hints[x][y]"
          :disabled="disabled"
          @clicked="handleCellClicked"
        />
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    MinesweeperCell: MinesweeperCell,
  },
  methods: {
    handleCellClicked(event: CellClickedEvent) {
      this.$emit("cell-clicked", event);
    },
  },
});
</script>

<style scoped>
.minesweeper-grid {
  display: flex;
  justify-content: center;
  text-align: center;
}

@media (min-width: 1024px) {
  .minesweeper-grid {
    text-align: center;
  }
}
</style>
