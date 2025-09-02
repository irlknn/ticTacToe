<script>
import { ref } from 'vue'
import RoomIDComponent from '../components/RoomService.vue'
import JoinComponent from '../components/JoinComponent.vue'

export default {
  components: { RoomIDComponent, JoinComponent },
  setup() {
    const roomBanner = ref(false)
    const joinBanner = ref(false)

    function showRoomIdBanner() {
      roomBanner.value = true
    }
    function showJoinBanner() {
      joinBanner.value = true
    }
    function closeBanner() {
      roomBanner.value = false
      joinBanner.value = false
    }
    return { joinBanner, roomBanner, showRoomIdBanner, showJoinBanner, closeBanner, }
  },
}
</script>

<template>
  <div class="bannerContainer">
    <div v-if="joinBanner" class="joinBanner">
      <button class="closeButton" @click="closeBanner">x</button>
      <JoinComponent />
    </div>
    <div v-if="roomBanner" class="roomBanner">
      <button class="closeButton" @click="closeBanner">x</button>
      <RoomIDComponent />
    </div>
    <div class="menuContainer">
      <button id="createButton" @click="showRoomIdBanner">Create Game</button>
      <button id="joinButton" @click="showJoinBanner">Join Game</button>
    </div>
  </div>
</template>

<style scoped>
.bannerContainer {
  position: relative;
  width: 100%;
  align-items: center;
}

.roomBanner,
.joinBanner {
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
  /* min-height: 350px; */
}

.closeButton {
  position: absolute;
  top: 15px;
  right: 20px;
  padding: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: rgb(110, 110, 110);
  cursor: pointer;
}

.closeButton:hover {
  color: #555;
}

.menuContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 60px;
  min-height: 400px;
}

#createButton,
#joinButton {
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

#createButton:hover,
#joinButton:hover {
  background-color: rgb(149, 149, 149);
}

.joinLink {
  text-decoration: none;
  color: white;
}
</style>
