<script>
import { useRoute, useRouter } from 'vue-router'
import { useGamesStore } from '../stores/games'
import { contentHelper } from '../helpers/content'
import { useTournamentsStore } from '../stores/tournaments'
import { usePlayersStore } from '../stores/players'

export default {
  name: 'GameView',
  data: () => ({
    game: null,
    loading: null,
    router: useRouter(),
    route: useRoute(),
    gamesStore: useGamesStore(),
    tournamentsStore: useTournamentsStore(),
    playersStore: usePlayersStore(),
    helper: contentHelper
  }),
  methods: {
    isRegisterInTournament(tournamentId) {
      const tournament = this.tournamentsStore.getOne(tournamentId)
      return tournament.fields.joueurs && tournament.fields.joueurs.includes(this.playersStore.player.id)
    },
    async editRegister(tournamentId) {
      if (this.loading) return
      
      this.loading = tournamentId
      setTimeout(() => this.loading = false, 8000)
      const tournament = this.tournamentsStore.getOne(tournamentId)

      if (this.isRegisterInTournament(tournament.id)) {
        tournament.fields.joueurs = tournament.fields.joueurs.filter(id => id !== this.playersStore.player.id)
      } else {
        if (!tournament.fields.joueurs) tournament.fields.joueurs = []
        tournament.fields.joueurs.push(this.playersStore.player.id)
      }

      await this.tournamentsStore.edit(tournament.id, tournament.fields.joueurs)
    }
  },
  async mounted() {
    this.game = this.gamesStore.getOne(this.route.params.id)
    await this.tournamentsStore.fetchAll()
    window.addEventListener('editPlayerTournament', () => this.loading = false)
  }
}
</script>

<template>
  <div v-if="game">
    <div :style="{ background: game.fields.couleur }" class="fixed inset-0"></div>
    <section
      :style="{ background: 'radial-gradient(50% 50% at 50% 50%, ' + game.fields.couleur + '1A 0%, ' + game.fields.couleur + 'CC 100%), url(' + game.fields.image[0].url + ') center / cover' }"
      class="fixed top-0 inset-x-0 h-[458px] flex flex-none flex-col justify-end px-9 py-[84px]"
    >
      <p class="flex space-x-2 text-[10px] text-black font-bold uppercase">
        <span
          v-for="console in game.fields.consoles"
          :key="console"
          class="block px-3 py-1.5 bg-white rounded-full"
        >{{ console }}</span>
      </p>
      <h1 class="pt-6 pb-8 text-[36px] text-white font-bold uppercase">{{ game.fields.nom }}</h1>
      <h3 class="text-[18px] text-white/80 font-medium">
        {{ game.fields.tournois ? game.fields.tournois.length : 0 }}
        tournoi{{ helper.getPlural(game.fields.tournois ? game.fields.tournois.length : 0) }}
      </h3>
    </section>
    <section class="z-20 fixed inset-0 pt-[422px] overflow-y-auto">
      <div class="relative min-h-full bg-white px-9 py-12 rounded-t-[36px] overflow-hidden">
        <span class="absolute top-[14px] left-1/2 -translate-x-1/2 h-1 w-20 bg-grey rounded-full"></span>
        <div class="flex justify-between items-center pb-8">
          <h2 class="text-[26px] text-blue-dark font-bold">⚡️ Tournois</h2>
          <button
            @click="router.push({ name: 'Tournaments' })"
            class="h-[34px] px-5 border border-grey rounded-full text-[10px] text-blue-dark font-bold"
          >Voir plus</button>
        </div>
        <ul v-if="game.fields.tournois && tournamentsStore.tournaments.length" class="pb-[62px] space-y-5">
          <template
            v-for="tournament in tournamentsStore.tournaments"
            :key="tournament.id"
            
          >
            <li
              v-if="game.fields.tournois.includes(tournament.id)"
              class="flex justify-between items-center space-x-5"
            >
              <div class="space-y-1">
                <h3 class="font-semibold">{{ helper.getDate(tournament.fields.date) }}</h3>
                <p class="text-[12px] text-grey-dark font-medium">
                  {{ tournament.fields.joueurs ? tournament.fields.joueurs.length : 0 }} participant{{ helper.getPlural(tournament.fields.joueurs ? tournament.fields.joueurs.length : 0) }}
                </p>
              </div>
              <button
                @click="editRegister(tournament.id)"
                :class="isRegisterInTournament(tournament.id) ? 'bg-red' : 'bg-grey'"
                class="h-9 w-9 flex-none rounded-full duration-200"
              >
                <svg v-if="loading === tournament.id" class="animate-spin h-4 w-4 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-40" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </button>
            </li>
          </template>
        </ul>
      </div>
    </section>
  </div>
</template>