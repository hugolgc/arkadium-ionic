import { defineStore } from 'pinia'
import { Repository } from '../repository'

const preferencesRepository = Repository('preferences')

export const usePreferencesStore = defineStore('preferences', {
  state: () => ({
    preferences: null,
    loading: false,
    error: null
  }),
  getters: {
    getOne: state => id => state.preferences.find(preference => preference.id === id)
  },
  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const { records } = await preferencesRepository.get()
        this.preferences = records[0].fields
      } catch (e) {
        console.error(e)
        this.error = e
      } finally {
        this.loading = false
      }
    }
  }
})