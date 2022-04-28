<script>
import { useRouter } from 'vue-router'
import Button from '../components/Button.vue'

export default {
  name: 'IndexView',
  components: {
    Button
  },
  data: () => ({
    router: useRouter()
  })
}
</script>

<template>
  <h1 class="pb-3 text-[36px] text-blue-dark font-bold">Bienvenue ! 👋</h1>
  <Button type="primary" @click="router.push({ name: 'SignIn' })">SE CONNECTER</Button>
  <Button type="secondary" @click="router.push({ name: 'SignUp' })">S'INSCRIRE</Button>
</template>