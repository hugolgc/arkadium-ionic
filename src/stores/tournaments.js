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
      try {
        const tournament = await tournamentsRepository.patch({ records: [{
          id: id,
          fields: { joueurs: players }
        }]})
        
        const event = new Event('editPlayerTournament')
        if (tournament) window.dispatchEvent(event)
        console.log(tournament)
      } catch (e) {
        console.error(e)
        this.error = e
      } finally {
        this.loading = false
      }
    }
  }
})