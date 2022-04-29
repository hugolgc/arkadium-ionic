<script>
import { useRouter } from 'vue-router'
import { useGamesStore } from '../stores/games'
import { usePlayersStore } from '../stores/players'
import { gamesServices } from '../services/games'
import { playersService } from '../services/players'
import GameCard from '../components/GameCard.vue'

export default {
  name: "HomeView",
  components: {
    GameCard
  },
  data: () => ({
    router: useRouter(),
    gamesStore: useGamesStore(),
    playersStore: usePlayersStore()
  }),
  methods: {
    async getGames() {
      const games = await gamesServices.getAll()
      if (games === 'error') return
      this.gamesStore.games = games
    },
    async getPlayers() {
      const players = await playersService.getAll()
      if (players === 'error') return
      this.playersStore.players = players
    },
    getPositionStyle(position) {
      if (position === 0) return 'text-red'
      if (position === 1) return 'text-orange'
      if (position === 2) return 'text-blue'
      return 'text-grey-dark'
    }
  },
  async mounted() {
    await this.getGames()
    await this.getPlayers()
  }
}
</script>

<template>
  <div class="flex-auto bg-white rounded-t-[36px] overflow-y-auto">
    <section>
      <div class="flex justify-between items-center px-9 pt-[54px] pb-[42px]">
        <h1 class="text-blue-dark text-[30px] font-bold">👾 Jeux</h1>
        <button class="h-9 w-9 flex bg-blue-dark rounded-full text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
      <div class="flex px-9 pb-16 space-x-4 snap-x snap-mandatory overflow-x-auto">
        <GameCard
          v-for="game in gamesStore.games"
          :key="game.id"
          :game="game"
        />
      </div>
    </section>
    <section v-if="playersStore.players.length" class="px-9">
      <div class="flex justify-between items-center pb-8">
        <h2 class="text-[26px] text-blue-dark font-bold">🏆 Classement</h2>
        <button
          @click="router.push({ name: 'Players' })"
          class="h-[34px] px-5 border border-grey rounded-full text-[10px] text-blue-dark font-bold"
        >Voir plus</button>
      </div>
      <ul class="pb-[110px] space-y-5">
        <li
          v-for="(player, index) in playersStore.getByScore().slice(0, 5)"
          :key="player.id"
          class="flex items-center"
        >
          <div class="h-[42px] w-[42px] mr-2.5 bg-grey rounded-full"></div>
          <div class="space-y-1">
            <h3 class="font-semibold">{{ player.fields.pseudo }}</h3>
            <p class="text-[12px] text-grey-dark font-medium">
              <span :class="getPositionStyle(index)">{{ player.fields.victoires }} Victoires</span>
              • {{ player.fields.tournois ? player.fields.tournois.length : 0 }} Tournois
            </p>
          </div>
          <p class="ml-auto font-semibold">{{ player.fields.points }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>