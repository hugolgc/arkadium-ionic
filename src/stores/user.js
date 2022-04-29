import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    load: true,
    // user: null
    user: {
      id: "recCNnIbMIIlAgQL6",
      createdTime: "2022-04-24T22:34:57.000Z",
      fields: {
        pseudo: "hugolgc",
        email: "hugo@test.fr",
        password: "----",
        tournois: [
          "recPo9dzioiDzoivA",
          "rec9ECgkWpBRhBaq4"
        ],
        victoires: 4,
        points: 86,
        avatar: [
          "reccJnhZSUGAbLcYK"
        ]
      }
    }
  })
})