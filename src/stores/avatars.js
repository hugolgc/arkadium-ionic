import { defineStore } from 'pinia'

export const useAvatarsStore = defineStore('avatars', {
  state: () => ({
    avatars: []
  }),
  getters: {
    getOne: state => id => state.avatars.find(avatar => avatar.id === id)
  }
})