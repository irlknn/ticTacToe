<script setup>
import { ref } from 'vue'
const testID = ref('12345')
</script>

<template>
  <div class="container">
    <h2>Room id</h2>
    <p>{{ testID }}</p>
    <button>Join</button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  height: 40vh;
  gap: 20px;
}

button {
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: rgb(30, 105, 25);
  color: white;
  transition: background-color 0.3s ease;
}
</style>
