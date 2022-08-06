import { defineStore } from 'pinia'
import { Repository } from '../repository'

const reservationsRepository = Repository('reservations')

export const useReservationsStore = defineStore('reservations', {
  state: () => ({
    reservations: [],
    loading: false,
    error: null
  }),
  getters: {
    getOne: state => id => state.reservations.find(reservation => reservation.id === id)
  },
  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const { records } = await reservationsRepository.get()
        this.reservations = records
      } catch (e) {
        console.error(e)
        this.error = e
      } finally {
        this.loading = false
      }
    }
  }
})