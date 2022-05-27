import { defineStore } from 'pinia'
import { Repository } from '../repository'

const planningsRepository = Repository('plannings')

export const usePlanningsStore = defineStore('plannings', {
  state: () => ({
    plannings: [],
    loading: false,
    error: null
  }),
  getters: {
    getOne: state => id => state.plannings.find(planning => planning.id === id)
  },
  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const { records } = await planningsRepository.get()
        this.plannings = records
      } catch (e) {
        console.error(e)
        this.error = e
      } finally {
        this.loading = false
      }
    }
  }
})