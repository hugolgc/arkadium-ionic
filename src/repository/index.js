import { mande } from 'mande'

const API = 'https://api.airtable.com/v0/appuKmgzK8uZNj4Ux/'
const TOKEN = 'keyewgm9mqGHbFBhY'

const STRIPE = 'https://api.stripe.com/v1'
const KEY = 'sk_test_51GvfkfLSldr7Tk8n5kVFWHIaEYq1mkFQF09yhVVhv3MoHU3gjOFmLYVhrxJUxQMWy9kIfTM2k3kEmau4L50f0lwR00l8DDTTLX'

export const Repository = route => mande(API + route, { headers: { Authorization: 'Bearer ' + TOKEN }})
export const Stripe = () => mande(STRIPE, { headers: { Authorization: 'Bearer ' + KEY }})