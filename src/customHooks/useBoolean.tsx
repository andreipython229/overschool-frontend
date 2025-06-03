import { useEffect, useMemo, useState } from 'react'

type returnData = [boolean, { onToggle: () => void; on: () => void; off: () => void }]

export const useBoolean = (defaultBoolean?: boolean): returnData => {
  const [toggle, setToggle] = useState<boolean>(!!defaultBoolean)

  const handlers = useMemo(
    () => ({
      onToggle: () => setToggle(prevToggle => !prevToggle),
      on: () => setToggle(true),
      off: () => setToggle(false),
    }),
    [],
  )

  useEffect(() => {
    setToggle(!!defaultBoolean)
  }, [defaultBoolean])

  return [toggle, handlers]
}
