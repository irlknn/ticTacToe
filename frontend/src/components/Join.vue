<script setup>
import { useRouter } from 'vue-router'
import io from 'socket.io-client'
import { defineProps } from 'vue'

const props = defineProps({
  roomId: { type: String, required: true }
})

const socket = io('http://localhost:3000')
const router = useRouter()

function joinRoom(roomId) {
  socket.emit('joinRoom', { roomId: props.roomId })

  socket.once('roomJoined', () => {
    router.push(`/game/${props.roomId}`)
  })

  socket.on('roomJoinError', ({ error }) => {
    console.error(error)
  })

  console.log(`Joining room: ${roomId}`)
}
</script>

<template>
  <button @click="joinRoom(props.roomId)" class="joinButton">Join</button>
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
.joinButton {
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