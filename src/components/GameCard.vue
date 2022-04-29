<script>
import { useRouter } from 'vue-router'
import { contentHelper } from '../helpers/content'

export default {
  name: 'GameCard',
  props: ['game'],
  data: () => ({
    router: useRouter(),
    helper: contentHelper
  })
}
</script>

<template>
  <article
    :style="{
      background: 'linear-gradient(180deg, ' + game.fields.couleur + '1A 0%, ' + game.fields.couleur + ' 80%), url(' + game.fields.image[0].url + ') center / cover',
      boxShadow: '0px 6px 0px ' + game.fields.couleur + 'D9, 0px 6px 0px black, 0 24px 32px -8px ' + game.fields.couleur
    }"
    @click="router.push({ name: 'Game', params: { id: game.id }})"
    class="flex-none rounded-[16px] overflow-hidden duration-200 snap-start scroll-ml-9"
  >
    <div class="h-[208px] w-[152px] flex flex-col justify-end px-4 py-6 space-y-3.5">
      <h2 class="text-white font-bold uppercase">{{ game.fields.nom }}</h2>
      <p class="text-[12px] text-white/80 font-medium">
        {{ game.fields.tournois ? game.fields.tournois.length : 0 }}
        tournoi{{ helper.getPlural(game.fields.tournois ? game.fields.tournois.length : 0) }}
      </p>
    </div>
  </article>
</template>