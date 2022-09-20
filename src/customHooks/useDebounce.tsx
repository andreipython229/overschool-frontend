import { useEffect, useState } from 'react'

export const useDebounce = (value: string, delay = 500): Array<string> => {
  const [debounced, setDebounce] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => setDebounce(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return [debounced]
}
