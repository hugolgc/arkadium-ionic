<script>
import { useRouter } from 'vue-router' 
import { Storage } from '@ionic/storage'
import { usePlayersStore } from '../stores/players'
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'

export default {
  name: 'SignIn',
  components: {
    Input,
    Button
  },
  data: () => ({
    email: '',
    password: '',
    loading: false,
    router: useRouter(),
    playersStore: usePlayersStore(),
    storage: new Storage()
  }),
  computed: {
    formIsComplete() {
      return this.email.length && this.password.length
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.formIsComplete || this.loading) return
      this.loading = true
      
      const player = await this.playersStore.findOne(this.email, this.password)
      this.loading = false

      if (!player) return alert("Nous n'avons pas trouvé votre compte")
      this.storage.set('email', this.email)
      this.storage.set('password', this.password)
      this.playersStore.player = player
      this.router.push({ name: 'Home' })
    }
  },
  async mounted() {
    await this.storage.create()
  }
}
</script>

<template>
  <h1 class="pb-3 text-[36px] text-blue-dark font-bold">Connexion</h1>
  <div>
    <Input v-model="email" type="email" label="EMAIL" />
    <Input v-model="password" type="password" label="MOT DE PASSE" :isVisible="true" />
    <p
      @click="router.push({ name: 'SignUp' })"
      class="mt-8 text-pink-light text-[10px] font-semibold"
    >PAS ENCORE INSCRIT ?</p>
    <Button
      :type="formIsComplete ? 'primary' : 'secondary'"
      @click="handleSubmit()"
    >
      <span v-if="loading" class="block">
        <svg class="animate-spin h-5 w-5 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-40" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </span>
      <span v-else>SE CONNECTER</span>
    </Button>
  </div>
</template>