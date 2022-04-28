import { Repository } from '../repository'

const gamesRepository = Repository('jeux')

export const gamesServices = {
  async getAll() {
    try {
      const { records } = await gamesRepository.get()
      return records
    } catch (e) {
      console.error(e)
      return 'error'
    }
  },
  async getOne(id) {
    try {
      const game = await gamesRepository.get(id)
      return game
    } catch (e) {
      console.error(e)
      return 'not found'
    }
  }
}