<script setup lang="ts">
import MinesweeperController from "../components/MinesweeperController.vue";
</script>

<template>
  <div class="minesweeper">
    <h1>Minesweeper</h1>
    <MinesweeperController />
  </div>
</template>

<style>
.minesweeper {
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
}

@media (min-width: 1024px) {
  .minesweeper {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
