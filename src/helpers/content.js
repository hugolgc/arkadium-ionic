const months = {
  '01': 'janv',
  '02': 'févr',
  '03': 'mars',
  '04': 'avr',
  '05': 'mai',
  '06': 'juin',
  '07': 'juill',
  '08': 'août',
  '09': 'setp',
  '10': 'oct',
  '11': 'nov',
  '12': 'déc'
}

export const contentHelper = {
  getPlural(count) {
    return count > 1 ? 's' : ''
  },
  getDate(dtoDate) {
    const date = dtoDate.split('-').reverse()
    console.log(date)
    return `${ date[0] } ${ months[date[1]] }`
  }
}