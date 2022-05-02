<script>
import { RouterView, useRouter } from 'vue-router'
import { usePlayersStore } from '../stores/players'

export default {
  name: 'AuthLayout',
  props: {
    title: String
  },
  components: {
    RouterView
  },
  data: () => ({
    loading: true,
    router: useRouter(),
    playersStore: usePlayersStore()
  }),
  methods: {
    async loginUser() {
      const player = this.playersStore.findOne('hugo@test.fr', '---')
      this.loading = false

      if (!player) return
      this.playersStore.player = player
      this.router.push({ name: 'Home' })
    }
  },
  async mounted() {
    await this.playersStore.fetchAll()
    await this.loginUser()

  }
}
</script>

<template>
  <main class="relative h-screen flex flex-col justify-between px-9 pt-32 pb-20 bg-grey-light overflow-hidden">
    <Transition>
      <div v-if="loading" class="absolute inset-0 flex bg-grey-light">
        <img
          @click="router.push({ name: 'Index' })"
          src="../assets/logo.png"
          alt="Logo Arkadium Bar"
          class="max-w-[192px] m-auto"
        />
      </div>
    </Transition>
    <section>
      <router-view />
    </section>
    <img
      @click="router.push({ name: 'Index' })"
      src="../assets/logo.png"
      alt="Logo Arkadium Bar"
      class="max-w-[192px] mx-auto"
    />
  </main>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>