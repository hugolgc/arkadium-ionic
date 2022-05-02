import { defineStore } from 'pinia'
import { Repository } from '../repository'

const playersRepository = Repository('joueurs')

export const usePlayersStore = defineStore('players', {
  state: () => ({
    players: [],
    player: {
      id: 'recCNnIbMIIlAgQL6',
      createdTime: '2022-04-24T22:34:57.000Z',
      fields: {
        avatar: [
          'reccJnhZSUGAbLcYK'
        ],
        victoires: 4,
        email: 'hugo@test.fr',
        participations: 5,
        points: 86,
        password: '----',
        tournois: [
          'recPo9dzioiDzoivA',
          'rec9ECgkWpBRhBaq4'
        ],
        pseudo: 'hugolgc'
      }
    },
    loading: false,
    error: null
  }),
  getters: {
    getByScore: state => () => state.players.sort((a, b) => b.fields.points - a.fields.points),
    getOne: state => id => state.players.find(player => player.id === id)
  },
  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const { records } = await playersRepository.get()
        this.players = records
      } catch (e) {
        console.error(e)
        this.error = e
      } finally {
        this.loading = false
      }
    },
    findOne(email, password) {
      return this.players.find(player => player.fields.email === email && player.fields.password === password)
    }
  }
})