import { createRouter, createWebHistory } from '@ionic/vue-router'

const routes = [
  {
    path: '/',
    redirect: { name: 'Index' }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../layouts/Auth.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('../views/Index.vue')
      },
      {
        path: 'signin',
        name: 'SignIn',
        component: () => import('../views/SignIn.vue')
      },
      {
        path: 'signup',
        name: 'SignUp',
        component: () => import('../views/SignUp.vue')
      },
    ]
  },
  {
    path: '/app',
    name: 'App',
    component: () => import('../layouts/App.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'games',
        name: 'Games',
        component: () => import('../views/Games.vue')
      },
      {
        path: 'game/:id',
        name: 'Game',
        component: () => import('../views/Game.vue')
      },
      {
        path: 'tournaments',
        name: 'Tournaments',
        component: () => import('../views/Tournaments.vue')
      },
      {
        path: 'players',
        name: 'Players',
        component: () => import('../views/Players.vue')
      },
      {
        path: 'planning',
        name: 'Planning',
        component: () => import('../views/Planning.vue')
      },
      {
        path: 'room',
        name: 'Room',
        component: () => import('../views/Room.vue')
      }
    ]
  }
]

export const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes })
