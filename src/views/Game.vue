<script>
import { useRoute, useRouter } from 'vue-router'
import { useGamesStore } from '../stores/games'

export default {
  name: 'GameView',
  data: () => ({
    game: null,
    router: useRouter(),
    route: useRoute(),
    gamesStore: useGamesStore()
  }),
  methods: {
    getGame(id) {
      this.game = this.gamesStore.getOne(id)
    }
  },
  mounted() {
    this.getGame(this.route.params.id)
  }
}
</script>

<template>
  <div class="flex flex-auto flex-col overflow-y-auto">
    <section
      v-if="game"
      :style="{ background: 'radial-gradient(50% 50% at 50% 50%, ' + game.fields.couleur + '1A 0%, ' + game.fields.couleur + 'CC 100%), url(' + game.fields.image[0].url + ') center / cover' }"
      class="fixed top-0 left-0 right-0"
    >
      <div class="h-[458px] flex flex-none flex-col justify-end px-9 py-[84px]">
        <p class="flex space-x-2 text-[10px] text-black font-bold uppercase">
          <span
            v-for="console in game.fields.consoles"
            :key="console"
            class="block px-3 py-1.5 bg-white rounded-full"
          >{{ console }}</span>
        </p>
        <h1 class="pt-6 pb-8 text-[36px] text-white font-bold uppercase">{{ game.fields.nom }}</h1>
        <h3 class="text-[18px] text-white/80 font-medium">12 tournois</h3>
      </div>
    </section>
    <section class="z-20 relative flex-auto bg-white mt-[336px] px-9 py-12 rounded-t-[36px]">
      <span class="absolute top-[14px] left-1/2 -translate-x-1/2 h-1 w-20 bg-grey rounded-full"></span>
      <div class="flex justify-between items-center pb-8">
        <h2 class="text-[26px] text-blue-dark font-bold">Tournois à venir</h2>
        <button
          @click="router.push({ name: 'Tournaments' })"
          class="h-[34px] px-5 border border-grey rounded-full text-[10px] text-blue-dark font-bold"
        >Voir plus</button>
      </div>
      <ul class="space-y-4 overflow-y-auto">
        <li
          v-for="tournament in Array(20)"
          :key="tournament"
          class="flex items-center space-x-5"
        >
          <div class="h-[68px] w-[28vw] flex-none bg-grey rounded-[8px]"></div>
          <div class="space-y-1.5">
            <h3 class="font-bold">FPL Road To The Top</h3>
            <p class="text-[12px] text-grey-dark font-medium">2,527 Viewers</p>
          </div>
        </li>
      </ul>
      <div class="h-[90px]"></div>
    </section>
  </div>
</template>