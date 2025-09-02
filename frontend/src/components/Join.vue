<script setup>
import { useRouter } from 'vue-router'
import io from 'socket.io-client'
import { defineProps, ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  roomId: { type: String, required: true },
})

const socket = io(import.meta.env.VITE_BACKEND_URL)
const router = useRouter()

const notification = ref('Click Join to enter the game room')
const isDisabled = ref(false)

function onRoomJoinError({ error }) {
  notification.value = error
  isDisabled.value = true
}
function onRoomJoined(roomId) {
  router.push(`/game/${props.roomId}`)
}

onMounted(() => {
  socket.on('roomJoinError', onRoomJoinError)
  socket.once('roomJoined', onRoomJoined)
})

onUnmounted(() => {
  socket.off('roomJoinError', onRoomJoinError)
  socket.off('roomJoined', onRoomJoined)
})

watch(
  () => props.roomId,
  (newVal) => {
    notification.value = 'Click Join to enter the game room'
    isDisabled.value = false
  },
)

function joinRoom(roomId) {
  if (!props.roomId) {
    notification.value = 'Please enter a valid Room ID'
    return
  }

  socket.emit('joinRoom', props.roomId)
  console.log(`Joining room: ${roomId}`)
}
</script>

<template>
  <button
    @click="joinRoom(props.roomId)"
    class="joinButton"
    :disabled="isDisabled || !props.roomId"
  >
    Join
  </button>
  <p class="text">{{ notification }}</p>
</template>
<!-- <script>
import io from 'socket.io-client'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
    roomId: {
        type: String,
        required: true
    }
})
const socket = io('http://localhost:3000')
const router = useRouter()

function joinRoom(roomId) {
    socket.emit('joinRoom', { roomId: roomId })

    socket.on('roomJoined', (data) => {
        console.log(data)
        router.push(`/game/${roomId}`)
    })

    socket.on('roomJoinError', ({ error }) => {
        console.error(error)
    })

    console.log(`Joining room: ${roomId}`)
}
</script>

<template>
    <button @click="joinRoom(props.roomId)" class="joinButton">Join</button>
</template> -->

<style>
.text {
  font-family: 'Arial';
  font-weight: bold;
  font-size: 1.3rem;
  margin: 10px 0;
}

.joinButton {
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: rgb(30, 105, 25);
  color: white;
  transition: background-color 0.3s ease;
  font-family: 'Arial';
}
</style>
