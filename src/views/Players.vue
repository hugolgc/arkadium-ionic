<script>
import { contentHelper } from '../helpers/content'
import { useAvatarsStore } from '../stores/avatars'
import { usePlayersStore } from '../stores/players'

export default {
  name: 'PlayersView',
  data: () => ({
    avatarsStore: useAvatarsStore(),
    playersStore: usePlayersStore(),
    helper: contentHelper
  }),
  async mounted() {
    await this.avatarsStore.fetchAll()
    await this.playersStore.fetchAll()
  }
}
</script>

<template>
  <section class="flex-auto bg-white px-9 pt-[42px] pb-12 rounded-t-[36px] overflow-y-auto">
    <h1 class="pb-8 text-[30px] text-blue-dark font-bold">🏆 Classement</h1>
    <ul
      v-if="playersStore.players.length && avatarsStore.avatars.length"
      class="pb-[62px] space-y-5"
    >
      <li
        v-for="player in playersStore.getByScore()"
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
          <h3
            :class="playersStore.player.id === player.id ? 'text-red' : ''"
            class="font-semibold"
          >{{ player.fields.pseudo }} {{ playersStore.player.id === player.id ? '📌' : '' }}</h3>
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
</template>