<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import io from 'socket.io-client'
import Join from './Join.vue'

const socket = io(window.location.origin)
const router = useRouter()
const room = ref(Math.random().toString(36).substring(2, 9))

function createAndGo() {
  socket.emit('joinRoom', { roomId: room.value })
  socket.on('roomJoined', () => {
    router.push(`/game/${room.value}`)
  })
}
</script>

<template>
  <div class="container">
    <h2>Room id</h2>
    <p>{{ room }}</p>
    <Join :roomId="room" />
  </div>
</template>
<!-- <script>
import Join from './Join.vue'
import io from 'socket.io-client'

const roomId = () => Math.random().toString(36).substring(2, 9)
const socket = io('http://localhost:3000')

export default {
  name: 'RoomIDComponent',
  components: { Join },
  data() {
    return {
      room: roomId(),
    }
  },
  methods: {
    joinRoom(roomId) {
      return new Promise((rs, rj) => {
        socket.emit('joinRoom', { roomId });
        socket.on('roomJoined', () => { rs(data); });
        socket.on('roomJoinErroe', ({ error }) => { rj(error); });
        console.log(`Joining room: ${roomId}`)
      })
    },
    createRoom() { },
  },
  created() {
    socket.on('createRoom', (room) => {
      console.log(`room ${room} created`)

      console.log('connected to server')
    })
  },
}
</script>

<template>
  <div class="container">
    <h2>Room id</h2>
    <p>{{ this.room }}</p>
    <!-- <button @click="joinRoom(room)">Join Room</button> -
    <Join :roomId="this.room" />
  </div>
</template> -->

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
</style>
