<script>
import moment from 'moment'
import Button from './Button.vue'
import { useReservationsStore } from '../stores/reservations'

export default {
  name: 'ReservationComponent',
  components: {
    Button
  },
  data: () => ({
    reservationsStore: useReservationsStore(),
    daySelected: moment().startOf('day').format('YYYY-MM-DD'),
    debut: null,
    fin: null
  }),
  methods: {
    getMomentDaySelected() {
      return moment(this.daySelected, 'YYYY-MM-DD')
    },
    setDay(state) {
      const newDay = this.getMomentDaySelected()
      if (state) newDay.add(1, 'days')
      else newDay.subtract(1, 'days')
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
    getClass(hour) {
      const hourFormat = hour.format('YYYY-MM-DDTHH:mm:00')

      if (
        this.reservationsOfTheDay.find(reservation => reservation.fields.debut.split('.')[0] === hourFormat && hourFormat.includes('15:00:00')) ||
        this.reservationsOfTheDay.find(reservation => reservation.fields.fin.split('.')[0] === hourFormat && hourFormat.includes('01:00:00')) ||
        this.reservationsOfTheDay.map(reservation => hour.isBetween(
          reservation.fields.debut.split('.')[0],
          reservation.fields.fin.split('.')[0],
        )).includes(true)
      ) return 'text-blue-dark/25 border border-transparent pointer-events-none'
      
      if (
        this.reservationsOfTheDay.find(reservation => reservation.fields.debut.split('.')[0] === hourFormat) &&
        this.reservationsOfTheDay.find(reservation => reservation.fields.fin.split('.')[0] === hourFormat)
      ) return 'text-blue-dark/25 border border-transparent pointer-events-none'

      if (this.debut && hour.isBefore(this.debut)) return 'text-blue-dark/25 border border-transparent pointer-events-none'

      if (
        this.debut &&
        this.reservationsOfTheDay.filter(reservation => moment(reservation.fields.debut.split('.')[0]).isBetween(this.debut, hourFormat)).length
      ) return 'text-blue-dark/25 border border-transparent pointer-events-none'

      if (hourFormat === this.debut || hourFormat === this.fin) return 'border border-blue-dark'

      return 'text-blue-dark border border-transparent cursor-pointer'
    }
  },
  computed: {
    reservationsOfTheDay() {
      const startDay = `${ this.daySelected }T02:00:00`
      const endDay = moment(startDay).add(28, 'hour').format('YYYY-MM-DDTHH:mm:00')
      return this.reservationsStore.reservations.filter(reservation => moment(reservation.fields.debut.split('.')[0]).isBetween(startDay, endDay))
    },
    buttonStyle() {
      return { type: 'primary', value: 'Je valide Samedi de 13:00 à 18:00' }
    },
    hours() {
      return [...Array(21)].map((el, index) => (index / 2 + 15 === 25.5) ? null : this.getMomentDaySelected().add(index / 2 + 15, 'hours'))
    }
  },
  mounted() {
    this.reservationsStore.fetchAll()
    setTimeout(() => console.log(this.reservationsOfTheDay), 2000)
  }
}
</script>

<template>
  <div class="z-40 fixed inset-0 flex px-[18px]">
    <div class="absolute inset-0 bg-black/50"></div>
    <div class="z-10 min-h-[290px] w-full m-auto p-[18px] space-y-[18px] bg-white rounded-3xl overflow-y-auto">
      <div class="flex justify-between space-x-[18px]">
        <button
          @click="setDay(false)"
          class="h-8 w-8 flex-none flex bg-grey-light rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 m-auto text-blue-dark" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        <input
          type="date"
          v-model="daySelected"
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
      <ul class="grid grid-cols-4 gap-[9px]">
        <li
          v-for="(hour, key) in hours"
          :key="key"
          :class="getClass(hour)"
          @click="setChoice(hour)"
          class="p-2.5 bg-grey-light rounded-[8px] text-center text-[12px] font-medium"
        >{{ hour.format('HH:mm') }}</li>
      </ul>
      <Button :type="buttonStyle.type" class="rounded-[8px]">{{ buttonStyle.value }}</Button>
    </div>
  </div>
</template>

<style>
button.bg-red {
  box-shadow: 0 10px 15px -10px #F70048;
}
</style>