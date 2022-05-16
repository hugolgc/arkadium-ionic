<script>
import { useRouter } from 'vue-router'
import { Storage } from '@ionic/storage'
import { useAvatarsStore } from '../stores/avatars'
import { usePlayersStore } from '../stores/players'
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'

export default {
  name: 'SignUp',
  components: {
    Input,
    Button
  },
  data: () => ({
    username: '',
    email: '',
    password: '',
    loading: false,
    router: useRouter(),
    avatarsStore: useAvatarsStore(),
    playersStore: usePlayersStore(),
    storage: new Storage()
  }),
  computed: {
    formIsComplete() {
      return this.username.length && this.email.length && this.password.length
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.formIsComplete || this.loading) return
      this.loading = true

      if (this.playersStore.getOneByUsername(this.username)) {
        alert('Ce pseudo est déjà utilisé')
        this.loading = false
        return
      }

      if (this.playersStore.getOneByEmail(this.email)) {
        alert('Cette email est déjà utilisée')
        this.loading = false
        return
      }

      if (this.password.length < 8) {
        alert('Le mot de passe doit contenir au moins 8 caractères')
        this.loading = false
        return
      }

      const playerDto = {
        username: this.username,
        email: this.email,
        password: this.password,
        avatarId: this.avatarsStore.avatars[0].id
      }

      const players = await this.playersStore.create(playerDto)
      if (!players) {
        alert('Une erreur est survenue durant la création du compte')
        this.loading = false
        return
      }
      
      this.storage.set('email', playerDto.email)
      this.storage.set('password', playerDto.password)
      this.playersStore.player = players.records[0]
      this.router.push({ name: 'Home' })
    }
  },
  async mounted() {
    await this.storage.create()
  }
}
</script>

<template>
  <h1 class="pb-3 text-[36px] text-blue-dark font-bold">Inscription</h1>
  <div>
    <Input v-model="username" type="text" label="PSEUDO" />
    <Input v-model="email" type="email" label="EMAIL" />
    <Input v-model="password" type="password" label="MOT DE PASSE" :isVisible="true" />
    <p
      @click="router.push({ name: 'SignIn' })"
      class="mt-8 text-pink-light text-[10px] font-semibold"
    >J'AI DÉJÀ UN COMPTE !</p>
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
      <span v-else>S'INSCRIRE</span>
    </Button>
  </div>
</template>