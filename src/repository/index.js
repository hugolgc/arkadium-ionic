import { mande } from 'mande'

const API = 'https://api.airtable.com/v0/appuKmgzK8uZNj4Ux/'
const TOKEN = 'keyewgm9mqGHbFBhY'

export const Repository = route => mande(API + route, { headers: { Authorization: 'Bearer ' + TOKEN }})