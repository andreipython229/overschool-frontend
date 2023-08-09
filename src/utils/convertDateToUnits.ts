export const formatTime = (date: Date) => {
  const currentDate = new Date()
  const messageDate = new Date(date)

  const hours = date.getHours()
  const minutes = date.getMinutes()

  if (isWithin24Hours(messageDate, currentDate)) {
    return `${hours}:${minutes}`
  } else if (isWithinOneWeek(date, currentDate)) {
    return new Intl.DateTimeFormat('ru-RU', { weekday: 'short' }).format(date)
  } else {
    const day = date.getDate()
    const month = new Intl.DateTimeFormat('ru-RU', { month: '2-digit' }).format(date)
    return `${day}.${month}`
  }
}

const isWithin24Hours = (date1: Date, date2: Date) => {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime())
  const hoursDiff = timeDiff / (1000 * 60 * 60)
  return hoursDiff < 24
}

const isWithinOneWeek = (date1: Date, date2: Date) => {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime())
  const daysDiff = timeDiff / (1000 * 60 * 60 * 24)
  return daysDiff < 7
}
