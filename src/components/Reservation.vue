<script>
import { usePlayersStore } from '../stores/players';
import { useReservationsStore } from '../stores/reservations';
import moment from 'moment'
import Button from './Button.vue'
import { usePreferencesStore } from '../stores/preferences';
import { usePaymentsStore } from '../stores/payments';

export default {
  name: 'ReservationComponent',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  components: {
    Button
  },
  data: () => ({
    paymentsStore: usePaymentsStore(),
    playersStore: usePlayersStore(),
    reservationsStore: useReservationsStore(),
    preferencesStore: usePreferencesStore(),
    daySelected: moment().startOf('day').format('YYYY-MM-DD'),
    debut: null,
    fin: null,
    daysOfWeek: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    paymentStep: false
  }),
  methods: {
    closeModal() {
      this.paymentStep = false
      this.$emit('update:modelValue', false)
    },
    getMomentDaySelected() {
      return moment(this.daySelected, 'YYYY-MM-DD')
    },
    getHours() {
      const start = this.getMomentDaySelected().day() === 0
      ? { hour: 16, length: 9 }
      : { hour: 15, length: 10 }

      return [...Array(start.length)].map((_, index) => this.getMomentDaySelected().add(index + start.hour, 'hours'))
    },
    updateDay() {
      let newDay = this.getMomentDaySelected()
      if (newDay.isBefore(moment(), 'days')) newDay = moment().startOf('day')
      this.daySelected = newDay.format('YYYY-MM-DD')
      this.debut = null
      this.fin = null
    },
    setDay(state) {
      let newDay = this.getMomentDaySelected()
      
      if (state) newDay.add(1, 'days')
      else newDay.subtract(1, 'days')

      if (newDay.isBefore(moment(), 'days')) newDay = moment().startOf('day')

      this.daySelected = newDay.format('YYYY-MM-DD')
      this.debut = null
      this.fin = null
    },
    setChoice(hour) {
      const hourFormat = hour.format('YYYY-MM-DDTHH:mm:00')

      if (!this.debut && !this.fin) {
        this.debut = hourFormat
        return
      }

      if (this.debut && !this.fin && this.debut === hourFormat) {
        this.debut = null
        return
      }

      if (this.debut && this.fin && this.fin === hourFormat) {
        this.debut = null
        this.fin = null
        return
      }

      if (this.debut && !this.fin) {
        this.fin = hourFormat
        return
      }

      if (this.debut && this.fin) {
        this.debut = hourFormat
        this.fin = null
      }
    },
    getHourIncrement(hourFormat) {
      const hour = moment(hourFormat)
      hour.add(1, 'hours')
      return hour.format('HH')
    },
    getClass(hour) {
      const hourFormat = hour.format('YYYY-MM-DDTHH:mm:00')
      const availableClass = 'border border-blue-dark'
      const disableClass = 'text-blue-dark/25 border border-transparent pointer-events-none'

      // Si l'heure est passée
      if (hour.isBefore()) return disableClass

      // Si l'heure est entre une réservation
      if (this.reservationsOfTheDay.map(reservation =>
        hour.isSameOrAfter(reservation.fields.debut.split('.')[0]) &&
        hour.isBefore(reservation.fields.fin.split('.')[0])
      ).includes(true)) return disableClass

      // Si l'heure est selectionnée
      if (hourFormat === this.debut || hourFormat === this.fin) return availableClass

      // Si l'heure est avant le début
      if (this.debut && hour.isBefore(this.debut)) return disableClass

      // Si une réservation est entre le début et l'heure
      if (this.debut && this.reservationsOfTheDay.map(reservation =>
        moment(reservation.fields.debut.split('.')[0]).isBetween(this.debut, hour) && (
          moment(reservation.fields.fin.split('.')[0]).isBetween(this.debut, hour) ||
          moment(reservation.fields.fin.split('.')[0]).isSame(hour)
        )
      ).includes(true)) return disableClass

      return 'text-blue-dark border border-transparent cursor-pointer'
    },
    async showPayment() {
      if (!this.debut && !this.fin) return

      if (this.debut && this.fin) {
        this.fin = moment(this.fin).add(1, 'hours').format('YYYY-MM-DDTHH:mm:00')
      }

      if (this.debut && !this.fin) {
        this.fin = moment(this.debut).add(1, 'hours').format('YYYY-MM-DDTHH:mm:00')
      }

      this.paymentStep = true

      const createPaymentState = await this.paymentsStore.create(this.amountByDuration, `
        Joueur n°${ this.playersStore.player.id } (${ this.playersStore.player.fields.pseudo }) - réservation
        le ${ this.daysOfWeek[moment(this.debut).day()] }
        de ${ this.debut.split('T')[1].slice(0, -3) }
        à ${ this.fin.split('T')[1].slice(0, -3) }
      `)
      
      if (!createPaymentState) {
        alert('Une erreur est survenue')
        this.paymentStep = false
      }
    },
    async handlePayment() {
      const paymentState = await this.paymentsStore.pay()
      if (paymentState) this.handleReservation()
    },
    async handleReservation() {
      const handleState = await this.reservationsStore.createOne({
        joueurs: [this.playersStore.player.id],
        debut: this.debut,
        fin: this.fin
      })

      if (handleState) {
        alert('Votre réservation est enregistrée 😃')
        this.closeModal()
        return
      }
      
      alert('Nous ne pouvons pas enregistrer votre réservation. Le paiement à bien été pris en compte, contactez nous.')
    }
  },
  computed: {
    reservationsOfTheDay() {
      const hoursOfTheDay = this.getHours()
      const startOfTheDay = hoursOfTheDay[0].subtract(1, 'hours').format('YYYY-MM-DDTHH:mm:00')
      const endOfTheDay = hoursOfTheDay[hoursOfTheDay.length - 1].add(1, 'hours').format('YYYY-MM-DDTHH:mm:00')
      return this.reservationsStore.reservations.filter(
        reservation => moment(reservation.fields.debut.split('.')[0]).isBetween(startOfTheDay, endOfTheDay)
      )
    },
    buttonStyle() {
      if (this.debut && !this.fin) return {
        type: 'primary',
        value: `
          Je valide ${ this.daysOfWeek[moment(this.debut).day()] }
          de ${ this.debut.split('T')[1].slice(0, -6) }h
          à ${ this.getHourIncrement(this.debut.split('.')[0]) }h
        `
      }
      if (this.debut && this.fin) return {
        type: 'primary',
        value: `
          Je valide ${ this.daysOfWeek[moment(this.debut).day()] }
          de ${ this.debut.split('T')[1].slice(0, -6) }h
          à ${ this.getHourIncrement(this.fin.split('.')[0]) }h
        `
      }
      return { type: 'secondary', value: 'Choisir un / des créneau(x)' }
    },
    amountByDuration() {
      if (!this.debut || !this.fin || !this.preferencesStore.preferences) return 0
      const duration = moment.duration(moment(this.fin).diff(this.debut))
      return this.preferencesStore.preferences.prix / 60 * duration.asMinutes()
    },
  }
}
</script>

<template>
  <div
    v-if="modelValue"
    class="z-40 fixed inset-0 flex px-[18px]"
  >
    <div
      @click="closeModal()"
      class="absolute inset-0 bg-black/50"
    ></div>
    <div class="z-10 min-h-[320px] w-full m-auto p-[18px] space-y-[18px] bg-white rounded-3xl overflow-y-auto">
      <div
        v-if="!paymentStep"  
        class="flex justify-between space-x-[18px]"
      >
        <button
          @click="setDay(false)"
          class="h-8 w-8 flex-none flex bg-grey-light rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 m-auto text-blue-dark" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        <input
          v-model="daySelected"
          @change="updateDay()"
          type="date"
          class="flex-auto text-blue-dark text-center font-semibold"
        />
        <button
          @click="setDay(true)"
          class="h-8 w-8 flex-none flex bg-grey-light rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 m-auto text-blue-dark" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>


      <ul 
        v-if="!paymentStep"  
        class="grid grid-cols-2 gap-[9px]"
      >
        <li
          v-for="(hour, key) in getHours()"
          :key="key"
          :class="getClass(hour)"
          @click="setChoice(hour)"
          class="p-2.5 bg-grey-light rounded-[8px] text-center text-[12px] font-medium"
        >{{ hour.format('HH') }}h - {{ getHourIncrement(hour.format()) }}h</li>
      </ul>


      <Button
        v-if="!paymentStep"
        @click="showPayment()"
        :type="buttonStyle.type"
        class="rounded-[8px]"
      >{{ buttonStyle.value }}</Button>


      <form
        v-if="paymentStep"
        @submit.prevent="handlePayment()"
      >
        <div id="payment-element"></div>
        <Button
          type="primary"
          :class="paymentsStore.loading ? 'animate-pulse' : ''"
          class="rounded-[8px]"
        >Payer {{ amountByDuration }}€</Button>
        <div id="payment-message" class="hidden"></div>
      </form>


    </div>
  </div>
</template>