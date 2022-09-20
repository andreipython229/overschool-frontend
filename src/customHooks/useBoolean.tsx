import { useMemo, useState } from 'react'

type returnData = [boolean, { onToggle: () => void; on: () => void; off: () => void }]

export const useBoolean = (): returnData => {
  const [toggle, setToggle] = useState<boolean>(false)

  const handlers = useMemo(
    () => ({
      onToggle: () => setToggle(!toggle),
      on: () => setToggle(false),
      off: () => setToggle(true),
    }),
    [toggle],
  )

  return [toggle, handlers]
}
