export const createUrlWithParams = (url = '', filters: { [key: string]: string | number }): string => {
  let initialUrl = url

  if (filters) {
    Object.entries(filters).forEach(([key, value], index) => {
      if (!value || value === 'Все статусы') return
      if (index === Object.entries(filters).length - 1) {
        initialUrl += `${key}=${value}`
      } else {
        initialUrl += `${key}=${value}&`
      }
    })
  }

  return initialUrl
}
