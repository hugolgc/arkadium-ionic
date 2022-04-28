import { Repository } from '../repository'

const playersRepository = Repository('joueurs')

export const playersService = {
  async getAll() {
    try {
      const { records } = await playersRepository.get()
      return records
    } catch (e) {
      console.error(e)
      return 'error'
    }
  },
  async findOne(email, password) {
      const players = await this.getAll()
      if (players === 'error') return players

      const player = players.find(player => player.fields.email === email && player.fields.password === password)
      return player ? player : 'not found'
  }
}