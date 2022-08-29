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
    },
    async createOne(reservationDto) {
      this.loading = true
      try {
        await reservationsRepository.post({ records: [{ fields: reservationDto }]})
        await this.fetchAll()
        return true
      } catch (e) {
        console.error(e)
        this.error = e
        return false
      } finally {
        this.loading = false
      }
    },
    async eraseOne(reservationId) {
      console.log(reservationId)
      this.loading = true
      try {
        await reservationsRepository.delete(reservationId)
        this.reservations = this.reservations.filter(reservation => reservation.id !== reservationId)
      } catch (e) {
        console.error(e)
        this.error = e
      } finally {
        this.loading = false
      }
    }
  }
})