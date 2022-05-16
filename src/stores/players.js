import { defineStore } from 'pinia'
import { Repository } from '../repository'

const playersRepository = Repository('joueurs')

export const usePlayersStore = defineStore('players', {
  state: () => ({
    players: [],
    player: null,
    loading: false,
    error: null
  }),
  getters: {
    getByScore: state => () => state.players.sort((a, b) => b.fields.points - a.fields.points),
    getOne: state => id => state.players.find(player => player.id === id),
    getOneByEmail: state => email => state.players.find(player => player.fields.email === email),
    getOneByUsername: state => username => state.players.find(player => player.fields.pseudo === username)
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
    },
    async create(player) {
      this.loading = true
      try {
        return await playersRepository.post({ records: [{ fields: {
          pseudo: player.username,
          email: player.email,
          password: player.password,
          avatar: [player.avatarId],
          participations: 0,
          victoires: 0,
          points: 0
        }}]})
      } catch (e) {
        console.error(e)
        this.error = e
      } finally {
        this.loading = false
      }
    }
  }
})