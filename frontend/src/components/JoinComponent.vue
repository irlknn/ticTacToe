<script>
import Join from '../components/Join.vue'
import { ref } from 'vue'

export default {
  components: { Join },
  setup() {
    const inputValue = ref('')
    return { inputValue }
  },
}
</script>

<template>
  <div class="container">
    <input id="inputId" class="inputContainer" type="text" v-model="inputValue" />
    <Join :roomId="inputValue" />
  </div>
</template>

<style scoped>
.inputContainer {
  padding: 10px;
  font-size: 1rem;
  border: 2px solid rgb(110, 110, 110);
  border-radius: 5px;
  width: 200px;
  margin-right: 10px;
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
