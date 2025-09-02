<script>
import Join from '../components/Join.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export default {
  components: { Join },
  setup() {
    const router = useRouter()
    const inputValue = ref('')

    function goBack() {
      router.push('/')
    }

    return { goBack, inputValue }
  },
}
</script>

<template>
  <div class="container">
    <input id="inputId" class="inputContainer" type="text" v-model="inputValue" />
    <Join :roomId="inputValue" />
  </div>
  <button id="backButton" @click="goBack">Back</button>
</template>

<style scoped>
.inputContainer {
  padding: 10px;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 5px;
  width: 200px;
  margin-right: 10px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

#backButton {
  margin-top: 40px;
  font-family: 'Arial';
  background-color: rgb(105, 25, 25);
}
</style>
