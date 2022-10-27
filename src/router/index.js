import { createRouter, createWebHistory } from '@ionic/vue-router'
import Auth from '../layouts/Auth.vue'
import App from '../layouts/App.vue'
import Index from '../views/Index.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Home from '../views/Home.vue'
import Games from '../views/Games.vue'
import Game from '../views/Game.vue'
import Tournaments from '../views/Tournaments.vue'
import Players from '../views/Players.vue'
import Planning from '../views/Planning.vue'
import Room from '../views/Room.vue'

const routes = [
  {
    path: '/',
    redirect: { name: 'Index' }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    children: [
      {
        path: '',
        name: 'Index',
        component: Index
      },
      {
        path: 'signin',
        name: 'SignIn',
        component: SignIn
      },
      {
        path: 'signup',
        name: 'SignUp',
        component: SignUp
      },
    ]
  },
  {
    path: '/app',
    name: 'App',
    component: () => App,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'games',
        name: 'Games',
        component: Games
      },
      {
        path: 'game/:id',
        name: 'Game',
        component: Game
      },
      {
        path: 'tournaments',
        name: 'Tournaments',
        component: Tournaments
      },
      {
        path: 'players',
        name: 'Players',
        component: Players
      },
      {
        path: 'planning',
        name: 'Planning',
        component: Planning
      },
      {
        path: 'room',
        name: 'Room',
        component: Room
      }
    ]
  }
]

export const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes })
