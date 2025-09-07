import { FC, memo } from 'react'
import { useLocation } from 'react-router-dom'

import { pathT, PreviousPropsT } from '@/types/componentsTypes'
import { previousToShow } from './config/previousToShow'

export const Previous: FC<PreviousPropsT> = memo(() => {
  const { pathname } = useLocation()

  const splitedPathname = pathname.split('*')[0]

  return (
    <>
      {previousToShow.map(({ path, Component }: pathT) => {
        if (!pathname.includes('module')) {
          console.log(splitedPathname.endsWith(path))
          console.log(path)
          // const pathWithoutParams = splitedPathname.split(/\d+/)[0]
          return splitedPathname.endsWith(path) && <Component key={path} />
        }
      })}
    </>
  )
})
