import { Repository } from '../repository'

const avatarsRepository = Repository('avatars')

export const avatarsService = {
  async getAll() {
    try {
      const { records } = await avatarsRepository.get()
      return records
    } catch (e) {
      console.error(e)
      return 'error'
    }
  },
  async getOne(id) {
    try {
      const avatar = avatarsRepository.get(id)
      return avatar
    } catch (e) {
      console.error(e)
      return 'not found'
    }
  }
}