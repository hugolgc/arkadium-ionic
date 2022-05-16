import { defineStore } from 'pinia'
import { Repository } from '../repository'

const tournamentsRepository = Repository('tournois')

export const useTournamentsStore = defineStore('tournaments', {
  state: () => ({
    tournaments: [],
    loading: false,
    error: null
  }),
  getters: {
    getByDate: state => () => state.tournaments.sort((a, b) => {
      let dateA = new Date(a.fields.date), dateB = new Date(b.fields.date)
      return dateA - dateB
    }),
    getOne: state => id => state.tournaments.find(tournament => tournament.id === id)
  },
  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const { records } = await tournamentsRepository.get()
        this.tournaments = records
      } catch (e) {
        console.error(e)
        this.error = e
      } finally {
        this.loading = false
      }
    },
    async edit(id, players) {
      this.loading = true
      const event = new Event('editPlayerTournament')
      try {
        await tournamentsRepository.patch({ records: [{
          id: id,
          fields: { joueurs: players }
        }]})
      } catch (e) {
        console.error(e)
        this.error = e
      } finally {
        this.loading = false
        window.dispatchEvent(event)
      }
    }
  }
})