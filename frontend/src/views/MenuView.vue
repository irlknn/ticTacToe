<script>
import { ref } from 'vue'
import RoomIDComponent from '../components/RoomService.vue'
import { useRouter } from 'vue-router'

export default {
  components: { RoomIDComponent },
  setup() {
    const showBanner = ref(false)
    const router = useRouter()

    function showRoomIdBanner() {
      showBanner.value = true
    }
    function closeBanner() {
      showBanner.value = false
    }
    function goToJoin() {
      router.push('/join')
    }
    return { showBanner, showRoomIdBanner, closeBanner, goToJoin }
  },
}
</script>

<template>
  <div class="bannerContainer">
    <div v-if="showBanner" class="banner">
      <button class="closeBtn" @click="closeBanner">x</button>
      <RoomIDComponent />
    </div>
    <div class="menuContainer">
      <button id="createButton" @click="showRoomIdBanner">Create Game</button>
      <button id="joinButton" @click="goToJoin">Join Game</button>
    </div>
  </div>
</template>

<style scoped>
.bannerContainer {
  position: relative;
  width: 100%;
  min-height: 400px;
}

.banner {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  background: white;
  border: 2px solid rgb(110, 110, 110);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px 24px 16px 24px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.closeBtn {
  position: absolute;
  top: 8px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #888;
  cursor: pointer;
}

.menuContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 60px;
  min-height: 400px;
}

button {
  font-family: 'Arial';
  padding: 20px 40px;
  font-size: 1.5rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: rgb(110, 110, 110);
  color: white;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: rgb(149, 149, 149);
}

.joinLink {
  text-decoration: none;
  color: white;
}
</style>
