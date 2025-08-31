<script setup>
import { RouterLink, RouterView } from 'vue-router'
import GameContainer from './components/GameContainer.vue'
import Menu from './views/MenuView.vue'
</script>

<template>
  <h1>Tic Tac Toe</h1>
  <div id="app" class="app">
    <RouterView />
  </div>
</template>

<style scoped>
h1{
  font-weight: 700;
}
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;

  text-align: center;
  font-family: 'Permanent Marker', cursive;
}
</style>
