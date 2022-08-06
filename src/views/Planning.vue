<script>
import { contentHelper } from '../helpers/content'
import { usePreferencesStore } from '../stores/preferences'

export default {
  name: 'PlanningView',
  data: () => ({
    preferencesStore: usePreferencesStore(),
    helper: contentHelper
  }),
  async mounted() {
    await this.preferencesStore.fetchAll()
  }
}
</script>

<template>
  <section
    v-if="preferencesStore.preferences"
    class="flex flex-auto px-5 pt-[42px] pb-[126px]"
  >
    <div
      :style="{ backgroundImage: `url(${ preferencesStore.preferences.planning[0].url })` }"
      class="h-full w-full bg-contain bg-center bg-no-repeat rounded-[16px] overflow-hidden"
    ></div>
  </section>
</template>