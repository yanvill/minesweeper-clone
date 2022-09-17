<script setup lang="ts">
import MinesweeperGrid from "../components/MinesweeperGrid.vue";
</script>

<template>
  <div class="controller">
    <MinesweeperGrid :grid-height="10" :grid-width="10" />
  </div>
</template>
