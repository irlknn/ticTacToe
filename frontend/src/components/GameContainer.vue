<script>
import io from 'socket.io-client'
const socket = io('http://localhost:3000')

export default {
  name: 'GameContainer',
  components: {},
  data() {
    return {
      content: ['', '', '', '', '', '', '', '', ''],
      turn: true,
      isOver: false,
      isTie: false,
      winner: null,
    }
  },
  methods: {
    draw(index, drawFromOther) {
      if(this.content[index] == ''){
        if (this.turn ) {
          this.content[index] = 'X'
        } else {
          this.content[index] = 'O'
        }

        if (!drawFromOther) {
          socket.emit("play", index);
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
      this.isTie = true
    },
    resetBoard() {
      this.content = ['', '', '', '', '', '', '', '', '']
      this.turn = true
      this.isOver = false
      this.isTie = false
      this.winner = null
    },
  },
  created() {
    socket.on('play', (index) => {
      console.log('received index: ', index);
      this.draw(index, true);
    })
  },
}
</script>

<template>
  <button @click="state = !state">Toggle State {{ console.log(state) }}</button>

  <div class="cellContainer">
    <div id="cell0" class="cell" @click="draw(0, false)">{{ content[0] }}</div>
    <div id="cell1" class="cell" @click="draw(1, false)">{{ content[1] }}</div>
    <div id="cell2" class="cell" @click="draw(2, false)">{{ content[2] }}</div>
    <div id="cell3" class="cell" @click="draw(3, false)">{{ content[3] }}</div>
    <div id="cell4" class="cell" @click="draw(4, false)">{{ content[4] }}</div>
    <div id="cell5" class="cell" @click="draw(5, false)">{{ content[5] }}</div>
    <div id="cell6" class="cell" @click="draw(6, false)">{{ content[6] }}</div>
    <div id="cell7" class="cell" @click="draw(7, false)">{{ content[7] }}</div>
    <div id="cell7" class="cell" @click="draw(8, false)">{{ content[8] }}</div>
  </div>
  <h2 v-if="isTie">Game is tie</h2>
  <h2 id="winner" v-if="isOver">Winner is {{ winner }}</h2>
  <button id="RestartButton" @click="resetBoard()" v-if="isOver || isTie">Reset Game</button>
</template>

<style>
.cell {
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
</style>
