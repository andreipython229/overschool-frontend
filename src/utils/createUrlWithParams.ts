export const createUrlWithParams = (url = '', filters: { [key: string]: string | number }): string => {
  let initialUrl = url

  Object.entries(filters).forEach(([key, value]) => {
    if (!value || value === 'Все статусы') return
    initialUrl += `&${key}=${value}`
  })

  return initialUrl
}
