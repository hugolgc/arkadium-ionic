<script>
import { usePreferencesStore } from '../stores/preferences'
import { useReservationsStore } from '../stores/reservations'
import { usePlayersStore } from '../stores/players'
import Reservation from '../components/Reservation.vue'
import Button from '../components/Button.vue'

export default {
  name: 'RoomView',
  components: {
    Reservation,
    Button
  },
  data: () => ({
    preferencesStore: usePreferencesStore(),
    reservationsStore: useReservationsStore(),
    playersStore: usePlayersStore()
  }),
  async mounted() {
    await this.preferencesStore.fetchAll()
    await this.reservationsStore.fetchAll()
  }
}
</script>

<template>  
  <section class="flex-auto bg-white px-9 pt-[42px] pb-[110px] rounded-t-[36px] overflow-y-auto">
    <h1
      v-if="preferencesStore.preferences"
      class="text-[30px] text-blue-dark font-bold"
    >🕹 Salle Privée</h1>
    <video
      v-if="preferencesStore.preferences"
      :src="preferencesStore.preferences.video[0].url"
      autoplay muted class="mt-8 mb-5 rounded-[8px]"
    ></video>
    <p
      v-if="preferencesStore.preferences"
      class="text-[12px] text-justify text-blue-dark font-medium"
    >{{ preferencesStore.preferences.description }}</p>
    <Button
      type="primary"
      class="rounded-[8px]"
    >Réserver une séance</Button>
    <p
      v-if="!reservationsStore.reservations.length"
      class="mt-5 text-[12px] text-grey-dark text-center italic"
    >Aucune réservation</p>
    <Button
      v-for="reservation in reservationsStore.reservations.filter(reservation => reservation.fields.joueurs[0] === playersStore.player.id)"
      :key="reservation.id"
      type="secondary"
      class="flex justify-between items-center px-4 rounded-[8px] cursor-default"
    >
      <span class="capitalize">{{ new Date(reservation.fields.debut).toLocaleString('fr-FR', { day: 'numeric', weekday: 'long', month: 'short' }) }}</span>
      <span>{{ reservation.fields.debut.split('T')[1].slice(0, 5) }} - {{ reservation.fields.fin.split('T')[1].slice(0, 5) }}</span>
    </Button>
  </section>
  <Reservation />
</template>