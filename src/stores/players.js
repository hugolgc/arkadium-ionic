import { defineStore } from 'pinia'

export const usePlayersStore = defineStore('players', {
  state: () => ({
    players: []
  }),
  getters: {
    getByScore: state => () => state.players.sort((a, b) => b.fields.points - a.fields.points),
    getOne: state => id => state.players.find(player => player.id === id)
  }
})