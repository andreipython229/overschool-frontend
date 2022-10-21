export const convertDate = (date: Date, divider = '.') => {
  const yyyy = date.getFullYear()
  const mm = date.getMonth() + 1
  const dd = date.getDate()
  const minutes = date.getMinutes()
  const hours = date.getHours()

  const fullmm = mm < 9 ? `0${mm}` : `${mm}`
  const fulldd = dd < 9 ? `0${dd}` : `${dd}`
  const fullHours = hours < 9 ? `0${hours}` : `${hours}`
  const fullMinutes = minutes < 9 ? `0${minutes}` : `${minutes}`

  const hoursAndMinutes = `${fullHours}:${fullMinutes}`

  const mmddyyyy = `${fulldd}${divider}${fullmm}${divider}${yyyy}`
  const reversedmmddyyyy = `${yyyy}${divider}${fullmm}${divider}${fulldd}`

  return { mmddyyyy, reversedmmddyyyy, hoursAndMinutes }
}
