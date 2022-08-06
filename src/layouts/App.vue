<script>
import { RouterView, useRouter, useRoute } from 'vue-router'
import { usePlayersStore } from '../stores/players'
import { useAvatarsStore } from '../stores/avatars'
import { useGamesStore } from '../stores/games'
import { useTournamentsStore } from '../stores/tournaments'
import { usePreferencesStore } from '../stores/preferences'
import { useReservationsStore } from '../stores/reservations'

export default {
  name: 'AppLayout',
  components: {
    RouterView
  },
  data: () => ({
    route: useRoute(),
    router: useRouter(),
    gamesStore: useGamesStore(),
    avatarsStore: useAvatarsStore(),
    playersStore: usePlayersStore(),
    tournamentsStore: useTournamentsStore(),
    preferencesStore: usePreferencesStore(),
    reservationsStore: useReservationsStore()

  }),
  async mounted() {
    if (!this.playersStore.player) {
      this.router.push({ name: 'Index' })
    }

    await this.gamesStore.fetchAll()
    await this.avatarsStore.fetchAll()
    await this.playersStore.fetchAll()
    await this.tournamentsStore.fetchAll()
    await this.preferencesStore.fetchAll()
    await this.reservationsStore.fetchAll()
  }
}
</script>

<template>
  <main v-if="playersStore.player" class="h-screen flex flex-col bg-black overflow-hidden">
    <header class="z-10 h-[86px] flex flex-none items-center px-9 text-white">
      <div class="flex items-center space-x-2.5 ml-auto">
        <p class="text-[12px] font-semibold uppercase">{{ playersStore.player.fields.pseudo }}</p>
        <div
          v-if="avatarsStore.avatars.length"
          class="h-8 w-8 p-[3px] border border-white rounded-full"
        >
          <img :src="avatarsStore.getOne(playersStore.player.fields.avatar[0]).fields.image[0].url" />
        </div>
      </div>
    </header>
    <router-view />
  </main>
  <footer class="z-30 fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] body-shadow">
    <nav class="h-[90px] flex justify-evenly items-center">
      <div
        @click="router.push({ name: 'Home' })"
        :class="route.name === 'Home' || route.name === 'Players' ? 'relative text-black' : 'text-grey-dark'"
        class="duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span
          v-show="route.name === 'Home' || route.name === 'Players'"
          class="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] w-2.5 rounded-full bg-red"
        ></span>
      </div>
      <div
        @click="router.push({ name: 'Games' })"
        :class="route.name === 'Game' || route.name === 'Games' ? 'relative text-black' : 'text-grey-dark'"
        class="duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <span
          v-show="route.name === 'Game' || route.name === 'Games'"
          class="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] w-2.5 rounded-full bg-red"
        ></span>
      </div>
      <div
        @click="router.push({ name: 'Tournaments' })"
        :class="route.name === 'Tournaments' ? 'relative text-black' : 'text-grey-dark'"
        class="duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
        <span
          v-show="route.name === 'Tournaments'"
          class="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] w-2.5 rounded-full bg-red"
        ></span>
      </div>
      <!-- <div
        @click="router.push({ name: 'Players' })"
        :class="route.name === 'Players' ? 'relative text-black' : 'text-grey-dark'"
        class="duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span
          v-show="route.name === 'Players'"
          class="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] w-2.5 rounded-full bg-red"
        ></span>
      </div> -->
      <div
        @click="router.push({ name: 'Room' })"
        :class="route.name === 'Room' ? 'relative text-black' : 'text-grey-dark'"
        class="duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
        <span
          v-show="route.name === 'Room'"
          class="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] w-2.5 rounded-full bg-red"
        ></span>
      </div>
      <div
        @click="router.push({ name: 'Planning' })"
        :class="route.name === 'Planning' ? 'relative text-black' : 'text-grey-dark'"
        class="duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span
          v-show="route.name === 'Planning'"
          class="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] w-2.5 rounded-full bg-red"
        ></span>
      </div>
    </nav>
  </footer>
</template>

<style scoped>
footer {
  box-shadow: 0px -18px 36px -9px rgba(0, 0, 0, .08);
}

footer nav div {
  margin: 0 0 12px;
}
</style>