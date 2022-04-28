import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    load: false,
    user: null
  })
})