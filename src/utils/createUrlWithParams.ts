export const createUrlWithParams = (url = '', filters: { [key: string]: string | number }): string => {
  let initialUrl = url.trim()

  if (filters) {
    const queryParams = Object.entries(filters)
      .filter(([key, value]) => value && value !== 'Все статусы')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')

    if (queryParams) {
      initialUrl += initialUrl.includes('?') || initialUrl.includes('=') ? '&' : '?'
      initialUrl += queryParams
    }
  }

  return initialUrl
}
