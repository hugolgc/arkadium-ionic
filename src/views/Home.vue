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
          v-for="game in gamesStore.games.slice(0, 5)"
          :key="game.id"
          :game="game"
        />
      </div>
      <div v-else class="flex px-9 pb-16 space-x-4 overflow-hidden">
        <div
          v-for="item in Array(4)"
          :key="item"
          class="skeleton h-[208px] w-[152px] flex-none bg-grey-light rounded-[16px]"
        ></div>
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
      <div v-else class="pb-[110px] space-y-5">
        <div
          v-for="item in Array(6)"
          :key="item"
          class="flex items-center"
        >
          <div class="skeleton h-10 w-10 bg-grey-light rounded-full"></div>
          <div class="ml-2.5 mr-auto space-y-1">
            <div class="skeleton h-[16px] w-[20vw] bg-grey-light rounded-full"></div>
            <div class="skeleton h-[16px] w-[40vw] bg-grey-light rounded-full"></div>
          </div>
          <div class="skeleton h-6 w-8 bg-grey-light rounded-full"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.skeleton {
  position: relative;
  overflow: hidden;
}

.skeleton::before {
  content: '';
  display: block;
  position: absolute;
  left: -150px;
  top: 0;
  height: 100%;
  width: 150px;
  background: linear-gradient(to right, transparent 0%, #E8E8E8 50%, transparent 100%);
  animation: load 1s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
}

@keyframes load {
  from {
    left: -150px;
  }
  to   {
    left: 100%;
  }
}
</style>