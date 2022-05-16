<script>
import { useRouter } from 'vue-router'
import { useTournamentsStore } from '../stores/tournaments'
import { useGamesStore } from '../stores/games'
import { contentHelper } from '../helpers/content'

export default {
  name: 'TournamentsView',
  data: () => ({
    tournamentsStore: useTournamentsStore(),
    gamesStore: useGamesStore(),
    router: useRouter(),
    helper: contentHelper,
    loading: null
  }),
  async mounted() {
    await this.gamesStore.fetchAll()
  }
}
</script>

<template>
  <section class="flex-auto bg-white px-9 pt-[42px] pb-12 rounded-t-[36px] overflow-y-auto">
    <h1 class="pb-8 text-[30px] text-blue-dark font-bold">👾 Jeux</h1>
    <ul v-if="gamesStore.games.length" class="pb-[70px] space-y-7">
      <li
        v-for="game in gamesStore.games"
        :key="game.id"
      > 
        <figure class="space-y-7">
          <img
            @click="router.push({ name: 'Game', params: { id: game.id }})"
            :src="game.fields.image[0].url"
            class="aspect-video object-cover rounded-[8px]"
          />
          <figcaption class="flex justify-between items-center">
            <div class="space-y-1">
              <h2 class="text-[18px] font-bold uppercase">{{ game.fields.nom }}</h2>
              <p class="flex space-x-2 text-[12px] text-grey-dark font-medium">
                <template
                  v-for="console in game.fields.consoles"
                  :key="console"
                >{{ console }}&nbsp;</template> •
                <template v-if="game.fields.tournois">
                  {{ game.fields.tournois.length }} tournoi{{ helper.getPlural(game.fields.tournois.length) }}
                </template>
                <template v-else>0 tournoi</template>
              </p>
            </div>
            <button
              @click="router.push({ name: 'Game', params: { id: game.id }})"
              class="h-[34px] px-5 flex-none border border-grey rounded-full text-[10px] text-blue-dark font-bold"
            >Voir</button>
          </figcaption>
        </figure>
      </li>
    </ul>
  </section>
</template>