<script>
import { ref, onMounted } from 'vue'
import io from 'socket.io-client'
import { useRoute } from 'vue-router'

const socket = io(import.meta.env.VITE_BACKEND_URL)
const router = useRoute()

onMounted(() => {
  socket.emit('joinRoom', { roomId: props.roomId })
  console.log('Connected to room:', this.roomId)
  socket.on('resetGame', () => {
    this.content = ['', '', '', '', '', '', '', '', '']
    this.turn = true
    this.isOver = false
    this.isTie = false
    this.winner = null
  })
  socket.on('play', (index) => {
    console.log('received index: ', index)
    this.draw(index, true)
  })
})

export default {
  name: 'GameContainer',
  components: {},
  props: {
    roomId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      content: ['', '', '', '', '', '', '', '', ''],
      turn: true,
      isOver: false,
      isTie: false,
      winner: null,
      notification: '-',
    }
  },
  methods: {
    draw(index, drawFromOther) {
      if (this.content[index] == '') {
        this.content[index] = this.turn ? 'X' : 'O'

        if (!drawFromOther) {
          socket.emit('play', { roomId: this.roomId, index })
        }
        this.turn = !this.turn
        this.calculateWinner()
        this.calculateTie()
      }
    },
    calculateWinner() {
      const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ]
      for (let condition of winConditions) {
        let [a, b, c] = condition
        if (
          this.content[a] == this.content[b] &&
          this.content[a] == this.content[c] &&
          this.content[a] != ''
        ) {
          this.isOver = true
          this.winner = this.content[a]
        }
      }
    },
    calculateTie() {
      for (let i = 0; i <= 8; i++) {
        if (this.content[i] == '') {
          return
        }
      }
      if (!this.isOver) this.isTie = true
    },
    resetBoard() {
      socket.emit('resetGame', this.roomId)
    },
    leaveGame() {
      socket.emit('leaveRoom', this.roomId)
      socket.disconnect()
      this.$router.push('/')
    },
  },
}
</script>

<template>
  <div class="textContainer">
    <p class="text">room id {{ this.roomId }}</p>
  </div>
  <div class="cellContainer">
    <div id="cell0" class="cell" @click="draw(0, false)">{{ content[0] }}</div>
    <div id="cell1" class="cell" @click="draw(1, false)">{{ content[1] }}</div>
    <div id="cell2" class="cell" @click="draw(2, false)">{{ content[2] }}</div>
    <div id="cell3" class="cell" @click="draw(3, false)">{{ content[3] }}</div>
    <div id="cell4" class="cell" @click="draw(4, false)">{{ content[4] }}</div>
    <div id="cell5" class="cell" @click="draw(5, false)">{{ content[5] }}</div>
    <div id="cell6" class="cell" @click="draw(6, false)">{{ content[6] }}</div>
    <div id="cell7" class="cell" @click="draw(7, false)">{{ content[7] }}</div>
    <div id="cell8" class="cell" @click="draw(8, false)">{{ content[8] }}</div>
  </div>
  <div class="textContainer">
    <p class="text" v-if="!isOver && !isTie">Turn: {{ turn ? 'X' : 'O' }}</p>
    <p class="text" id="winner" v-if="isTie || isOver">
      {{ isTie ? 'Game is tie' : `Winner is ${winner}` }}
    </p>
    <button id="RestartButton" @click="resetBoard()" v-if="isOver || isTie">Reset Board</button>
  </div>
  <p class="text">{{ notification }}</p>
  <button id="backButton" @click="leaveGame()">Leave</button>
</template>

<style>
.text {
  font-family: 'Arial';
  font-weight: bold;
  font-size: 1.3rem;
  margin: 10px 0;
}

.textContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
}

.cell {
  font-family: 'Rock Salt', 'Arial';
  background-color: rgb(110, 110, 110);
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cell:hover {
  background-color: rgb(160, 160, 160);
}

.cellContainer {
  border: 10px solid rgb(218, 218, 218);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;

  background-color: rgba(218, 218, 218);
}

#RestartButton,
#backButton {
  padding: 10px 20px;
  font-size: 1.2rem;
  font-family: 'Arial';
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: rgb(110, 110, 110);
  color: white;
  transition: background-color 0.4s ease;
}

#RestartButton {
  margin-bottom: 20px;
}

#RestartButton:hover {
  background-color: rgb(30, 105, 25);
}

#backButton:hover {
  background-color: rgb(101, 20, 20);
}
</style>
