<script setup lang="ts">
import type { CellChangeEvent } from "../types/minesweeper";
import MinesweeperCell from "./MinesweeperCell.vue";

defineEmits<{
  (e: "cell-changed", value: CellChangeEvent): void;
}>();

defineProps<{
  gridHeight: number;
  gridWidth: number;
  disabled: boolean;
  bombLocations: CellLocation[];
}>();
</script>

<template>
  <div class="minesweeper-grid">
    <table>
      <tr v-for="y in gridHeight" :key="y">
        <MinesweeperCell
          v-for="x in gridWidth"
          :key="x"
          :loc="[x, y]"
          :is-bomb="isBomb([x, y])"
          :disabled="disabled"
          @changed="handleCellChange"
        />
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import type { CellLocation } from "../types/minesweeper";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    MinesweeperCell: MinesweeperCell,
  },
  methods: {
    isBomb(loc: CellLocation) {
      var filteredLocs = this.bombLocations.filter((bombLoc) => {
        return loc[0] == bombLoc[0] && loc[1] == bombLoc[1];
      });
      return filteredLocs.length == 1;
    },
    handleCellChange(event: CellChangeEvent) {
      this.$emit("cell-changed", event);
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
