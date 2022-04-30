<script>
import { useRoute, useRouter } from 'vue-router'
import { useGamesStore } from '../stores/games'
import { contentHelper } from '../helpers/content'

export default {
  name: 'GameView',
  data: () => ({
    game: null,
    router: useRouter(),
    route: useRoute(),
    gamesStore: useGamesStore(),
    helper: contentHelper
  }),
  mounted() {
    this.game = this.gamesStore.getOne(this.route.params.id)
  }
}
</script>

<template>
  <div v-if="game">
    <div :style="{ background: game.fields.couleur }" class="fixed inset-0" ></div>
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
        <pre>{{ game.fields.tournois }}</pre>
        <ul v-if="game.fields.tournois" class="pb-[106px] space-y-5">
          <li
            v-for="tournament in game.fields.tournois"
            :key="tournament"
            class="flex items-center space-x-5"
          >
            <div class="h-[68px] w-[28vw] flex-none bg-grey rounded-[8px]"></div>
            <div class="space-y-1">
              <h3 class="font-semibold">FPL Road To The Top</h3>
              <p class="text-[12px] text-grey-dark font-medium">2,527 Viewers</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>