<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app" class="app">
    <h1>Tic Tac Toe</h1>
    <RouterView />
  </div>
</template>

<style scoped>
h1 {
  position: fixed;
  top: 10px;
  font-family: 'Rock Salt', 'Arial';
  font-weight: 700;
}
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  text-align: center;
  font-family: 'Arial';
}
</style>
