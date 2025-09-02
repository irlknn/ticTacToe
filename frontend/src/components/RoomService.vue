<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import io from 'socket.io-client'
import Join from './Join.vue'

const socket = io(import.meta.env.VITE_BACKEND_URL)
const router = useRouter()
const room = ref(Math.random().toString(36).substring(2, 9))

</script>

<template>
  <div class="container">
    <h2>Room id: {{ room }}</h2>
    <Join :roomId="room" />
  </div>
</template>

<style scoped>
h2 {
  font-weight: bold;
  margin-bottom: 20px;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  height: 40vh;
  gap: 20px;
}
</style>
