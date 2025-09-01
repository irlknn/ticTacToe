import { createRouter, createWebHistory } from 'vue-router'
import JoinView from '../views/JoinView.vue'
import Menu from '../views/MenuView.vue'
import GameBoard from '../components/GameBoard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Menu,
    },
    {
      path: '/join',
      name: 'join',
      component: JoinView,
    },
    {
      path: '/game/:roomId',
      name: 'gameBoard',
      component: GameBoard,
      props: true,
    },
  ],
})

export default router
