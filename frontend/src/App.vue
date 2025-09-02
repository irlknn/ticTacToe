<script setup>
import { RouterLink, RouterView } from 'vue-router'
import GameContainer from './components/GameBoard.vue'
import Menu from './views/MenuView.vue'
console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

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
  font-family: 'Permanent Marker', 'Rock Salt', 'Arial', cursive;
  font-weight: 700;
}
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  text-align: center;
  font-family: 'Permanent Marker', 'Rock Salt', 'Arial', cursive;
}
</style>
