<script>
import { useReservationsStore } from '../stores/reservations'
import Button from './Button.vue'
import moment from 'moment'

export default {
  name: 'ReservationComponent',
  components: {
    Button
  },
  data: () => ({
    date: moment().format('YYYY-MM-DD'),
    reservationsStore: useReservationsStore(),
    debut: null,
    fin: null,
  }),
  methods: {
    setDate(state) {
      const date = new Date(this.date)
      date.setDate(date.getDate() + (state ? 1 : -1))
      this.date = date.toISOString().split('T')[0]
      this.debut = null
      this.fin = null
    },
    getHourClass(dateTime) {
      if (new Date(this.date).getDay() === 1) return 'text-blue-dark/25 pointer-events-none'
      if (dateTime === this.debut) return 'border border-blue-dark'
      return 'text-blue-dark'
    },
    getButtonType() {
      if (this.fin) return { type: 'primary', text: 'Je valide Samedi de 13:00 à 16:00' }
      if (this.debut) return { type: 'secondary', text: 'Choisir une heure de départ' }
      return { type: 'secondary', text: 'Choisir une heure d\'arrivée' }
    }
  },
  computed: {
    reservationsOfTheDay() {
      return this.reservationsStore.reservations.filter(reservation => reservation.fields.debut.includes(this.date))
    }
  },
  mounted() {
    this.reservationsStore.fetchAll()
  }
}
</script>

<template>
  <div class="z-40 fixed inset-0 flex px-[18px]">
    <div class="absolute inset-0 bg-black/50"></div>
    <div class="z-10 min-h-[290px] w-full m-auto p-[18px] space-y-[18px] bg-white rounded-3xl overflow-y-auto">
      <div class="flex justify-between space-x-[18px]">
        <button
          @click="setDate(false)"
          class="h-8 w-8 flex-none flex bg-grey-light rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 m-auto text-blue-dark" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        <input
          type="date"
          v-model="date"
          class="flex-auto text-blue-dark text-center font-semibold"
        />
        <button
          @click="setDate(true)"
          class="h-8 w-8 flex-none flex bg-grey-light rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 m-auto text-blue-dark" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <ul class="grid grid-cols-4 gap-[9px]">
        

        <template
          v-for="(index, hour) in Array(8)"
          :key="hour"
        >
          <li
            :class="getHourClass('')"
            class="p-2.5 bg-grey-light rounded-[8px] text-center text-[12px] font-medium"
          >{{ (hour + 15) + ':00' }}</li>
          <li
            :class="getHourClass('')"
            class="p-2.5 bg-grey-light rounded-[8px] text-center text-[12px] font-medium"
          >{{ (hour + 15) + ':30' }}</li>
          <li
            v-if="(hour + 15) === 22"
            :class="getHourClass('')"
            class="p-2.5 bg-grey-light rounded-[8px] text-center text-[12px] font-medium"
          >{{ '23:00' }}</li>
        </template>
        

      </ul>
      <Button :type="getButtonType().type" class="rounded-[8px]">{{ getButtonType().text }}</Button>
    </div>
  </div>
</template>

<style>
button.bg-red {
  box-shadow: 0 10px 15px -10px #F70048;
}
</style>