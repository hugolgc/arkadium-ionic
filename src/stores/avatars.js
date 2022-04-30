import { defineStore } from 'pinia'
import { Repository } from '../repository'

const avatarsRepository = Repository('avatars')

export const useAvatarsStore = defineStore('avatars', {
  state: () => ({
    avatars: [],
    loading: false,
    error: null
  }),
  getters: {
    getOne: state => id => state.avatars.find(avatar => avatar.id === id)
  },
  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const { records } = await avatarsRepository.get()
        this.avatars = records
      } catch (e) {
        console.error(e)
        this.error = e
      } finally {
        this.loading = false
      }
    }
  }
})