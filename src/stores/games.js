import { defineStore } from 'pinia'
import { Repository } from '../repository'

const gamesRepository = Repository('jeux')

export const useGamesStore = defineStore('games', {
  state: () => ({
    games: [],
    loading: false,
    error: null
  }),
  getters: {
    getOne: state => id => state.games.find(game => game.id === id)
  },
  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const { records } = await gamesRepository.get()
        this.games = records
      } catch (e) {
        console.error(e)
        this.error = e
      } finally {
        this.loading = false
      }
    }
  }
})