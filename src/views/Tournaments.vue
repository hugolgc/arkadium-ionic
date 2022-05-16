<script>
import { useTournamentsStore } from '../stores/tournaments'
import { usePlayersStore } from '../stores/players'
import { useGamesStore } from '../stores/games'
import { contentHelper } from '../helpers/content'

export default {
  name: 'TournamentsView',
  data: () => ({
    tournamentsStore: useTournamentsStore(),
    playersStore: usePlayersStore(),
    gamesStore: useGamesStore(),
    helper: contentHelper,
    loading: null
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
    await this.tournamentsStore.fetchAll()
    window.addEventListener('editPlayerTournament', () => this.loading = false)
  }
}
</script>

<template>
  <section class="flex-auto bg-white px-9 pt-[42px] pb-12 rounded-t-[36px] overflow-y-auto">
    <h1 class="pb-8 text-[30px] text-blue-dark font-bold">⚡️ Tournois</h1>
    <ul v-if="tournamentsStore.tournaments.length" class="pb-[70px] space-y-7">
      <li
        v-for="tournament in tournamentsStore.getByDate()"
        :key="tournament.id"
      > 
        <figure class="space-y-7">
          <img
            @click="editRegister(tournament.id)"
            :src="gamesStore.getOne(tournament.fields.jeu[0]).fields.image[0].url"
            class="aspect-video object-cover rounded-[8px]"
          />
          <figcaption class="flex justify-between items-center">
            <div class="space-y-1">
              <h2 class="text-[18px] font-bold uppercase">{{ gamesStore.getOne(tournament.fields.jeu[0]).fields.nom }}</h2>
              <p class="flex space-x-2 text-[12px] text-grey-dark font-medium">
                <template
                  v-for="console in gamesStore.getOne(tournament.fields.jeu[0]).fields.consoles"
                  :key="console"
                >{{ console }}&nbsp;</template> •
                <template v-if="tournament.fields.joueurs">
                  {{ tournament.fields.joueurs.length }} participant{{ helper.getPlural(tournament.fields.joueurs.length) }}
                </template>
                <template v-else>0 participant</template>
                • {{ helper.getDate(tournament.fields.date) }}
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
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </button>
          </figcaption>
        </figure>
      </li>
    </ul>
  </section>
</template>