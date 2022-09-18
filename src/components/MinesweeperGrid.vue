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
    <br />
    <table>
      <tr v-for="i in gameBoard.length" :key="`row-${i}`" :id="`row-${i}`">
        <MinesweeperCell
          v-for="j in gameBoard[0].length"
          :id="`col-${j}`"
          :loc="[i - 1, j - 1]"
          :key="`col-${j}`"
          :cellState="gameBoard[i - 1][j - 1]"
          :hint="hints[i - 1][j - 1]"
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
