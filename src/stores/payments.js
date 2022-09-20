import { defineStore } from 'pinia'
import { Stripe } from '../repository'

const stripe = Stripe()

export const usePaymentsStore = defineStore('payments', {
  state: () => ({
    elements: null,
    loading: false,
    error: null
  }),
  getters: {
    getOne: state => id => state.payments.find(avatar => avatar.id === id)
  },
  actions: {
    async create(amount, description) {
      this.loading = true
      try {
        const { client_secret: clientSecret } = await stripe.post(`payment_intents?amount=${ amount * 100 }&currency=eur&description=${ description }&payment_method_types%5B%5D=card`)
        this.elements = window.stripe.elements({ clientSecret })
        const paymentElement = this.elements.create('payment')
        paymentElement.mount('#payment-element')
        return true
      } catch (e) {
        console.log(e)
        this.error = e
        return false
      } finally {
        this.loading = false
      }
    },
    async pay() {
      this.loading = true
    
      const { error } = await window.stripe.confirmPayment({
        elements: this.elements,
        redirect: 'if_required'
      })

      this.loading = false

      if (error) {
        alert('Nous ne pouvons pas régler votre réservation')
        return false
      }

      return true
    }
  }
})