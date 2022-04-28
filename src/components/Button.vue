<script>
export default {
  name: 'ButtonComponent',
  props: {
    type: String
  },
  computed: {
    getStyle() {
      if (this.type === 'primary') return 'bg-red text-white font-semibold'
      if (this.type === 'secondary') return 'bg-grey text-blue-dark font-bold'
      return ''
    }
  }
}
</script>

<template>
  <button :class="getStyle" class="h-12 w-full mt-5 rounded-[2px] text-[12px] duration-200">
    <slot />
  </button>
</template>

<style>
button.bg-red {
  box-shadow: 0 10px 15px -10px #F70048;
}
</style>