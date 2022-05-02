<script>
import { useRouter } from 'vue-router'
import { useGamesStore } from '../stores/games'
import { usePlayersStore } from '../stores/players'
import { useAvatarsStore } from '../stores/avatars'
import { contentHelper } from '../helpers/content'
import GameCard from '../components/GameCard.vue'

export default {
  name: 'HomeView',
  components: {
    GameCard
  },
  data: () => ({
    router: useRouter(),
    gamesStore: useGamesStore(),
    playersStore: usePlayersStore(),
    avatarsStore: useAvatarsStore(),
    helper: contentHelper
  }),
  async mounted() {
    await this.avatarsStore.fetchAll()
    await this.playersStore.fetchAll()
  }
}
</script>

<template>
  <div class="flex-auto bg-white rounded-t-[36px] overflow-y-auto">
    <section>
      <div class="flex justify-between items-center px-9 py-[42px]">
        <h1 class="text-blue-dark text-[30px] font-bold">👾 Jeux</h1>
        <button
          @click="router.push({ name: 'Games' })"
          class="h-9 w-9 flex bg-blue-dark rounded-full text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
      <div v-if="gamesStore.games.length" class="flex px-9 pb-16 space-x-4 snap-x snap-mandatory overflow-x-auto">
        <GameCard
          v-for="game in gamesStore.games"
          :key="game.id"
          :game="game"
        />
      </div>
    </section>
    <section class="px-9">
      <div class="flex justify-between items-center pb-8">
        <h2 class="text-[26px] text-blue-dark font-bold">🏆 Classement</h2>
        <button
          @click="router.push({ name: 'Players' })"
          class="h-[34px] px-5 border border-grey rounded-full text-[10px] text-blue-dark font-bold"
        >Voir plus</button>
      </div>
      <ul
        v-if="playersStore.players.length && avatarsStore.avatars.length"
        class="pb-[110px] space-y-5"
      >
        <li
          v-for="player in playersStore.getByScore().slice(0, 5)"
          :key="player.id"
          class="flex items-center"
        >
          <div
            :style="{ borderColor: avatarsStore.getOne(player.fields.avatar[0]).fields.couleur }"
            class="mr-2.5 p-[2px] border-2 rounded-full"
          >
            <img
              :src="avatarsStore.getOne(player.fields.avatar[0]).fields.image[0].url"
              class="h-8 w-8"
            />
          </div>
          <div class="space-y-1">
            <h3 class="font-semibold">{{ player.fields.pseudo }}</h3>
            <p class="text-[12px] text-grey-dark font-medium">
              <span
                :style="{ color: avatarsStore.getOne(player.fields.avatar[0]).fields.couleur }"
                class="font-semibold"
              >
                {{ player.fields.victoires }} victoire{{ helper.getPlural(player.fields.victoires) }}
              </span>
              • {{ player.fields.participations }} participation{{ helper.getPlural(player.fields.participations) }}
            </p>
          </div>
          <p class="ml-auto font-semibold">{{ player.fields.points }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>