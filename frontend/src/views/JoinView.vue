<script>
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    function goBack() {
      router.push('/')
    }
    return { goBack }
  },
}
</script>

<template>
  <div class="container">
    <input class="inputContainer" type="text" />
    <button>Join</button>
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

button {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: rgb(30, 105, 25);
  color: white;
  transition: background-color 0.3s ease;
}

#backButton {
  margin-top: 40px;
  background-color: rgb(105, 25, 25);
}
</style>
