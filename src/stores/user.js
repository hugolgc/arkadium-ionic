import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    load: true,
    // user: null
    user: {
      id: 'recCNnIbMIIlAgQL6',
      createdTime: '2022-04-24T22:34:57.000Z',
      fields: {
        email: 'lagache.hugo@hotmail.fr',
        password: '----',
        pseudo: 'hugolgc'
      }
    }
  })
})