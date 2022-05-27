<script>
import { contentHelper } from '../helpers/content'
import { usePlanningsStore } from '../stores/plannings'

export default {
  name: 'PlayersView',
  data: () => ({
    planningStore: usePlanningsStore(),
    helper: contentHelper
  }),
  async mounted() {
    await this.planningStore.fetchAll()
  }
}
</script>

<template>  
  <section
    v-if="planningStore.plannings.length"
    class="flex flex-auto px-5 pt-[42px] pb-[126px]"
  >
    <div
      :style="{ backgroundImage: `url(${ planningStore.plannings[0].fields.image[0].url })` }"
      class="h-full w-full bg-contain bg-center bg-no-repeat rounded-[16px] overflow-hidden"
    ></div>
  </section>
</template>