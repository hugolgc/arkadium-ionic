<script>
import { useRouter } from 'vue-router'
import { useGamesStore } from '../stores/games'
import { gamesServices } from '../services/games'
import GameCard from '../components/GameCard.vue'

export default {
  name: "HomeView",
  components: {
    GameCard
  },
  data: () => ({
      router: useRouter(),
      gamesStore: useGamesStore()
  }),
  methods: {
      async getGames() {
          const games = await gamesServices.getAll();
          if (games === "error")
              return;
          this.gamesStore.games = games;
      }
  },
  async mounted() {
      await this.getGames();
  }
}
</script>

<template>
  <section class="flex-auto bg-white rounded-t-[36px]">
    <div class="flex justify-between items-center px-9 pt-[54px] pb-[42px]">
      <h1 class="text-blue-dark text-[30px] font-bold">Notre selection</h1>
      <button class="h-9 w-9 flex bg-blue-dark rounded-full text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
    <div class="flex px-9 space-x-4">
      <GameCard
        v-for="game in gamesStore.games"
        :key="game.id"
        :game="game"
      />
    </div>
  </section>
</template>