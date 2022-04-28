import { defineStore } from 'pinia'

export const useGamesStore = defineStore('games', {
  state: () => ({
    games: []
  }),
  getters: {
    getOne: state => id => state.games.find(game => game.id === id)
  }
})