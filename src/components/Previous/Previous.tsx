import { FC, memo } from 'react'
import { useLocation } from 'react-router-dom'
import { pathT, PreviousPropsT } from '../componentsTypes'
import { previousToShow } from './config/previousToShow'

export const Previous: FC<PreviousPropsT> = memo(() => {
  const { pathname } = useLocation()

  const splitedPathname = pathname.split('*')[0]

  return (
    <>
      {previousToShow.map(({ path, Component }: pathT) => {
        if (!pathname.includes('module')) {
          const pathWithoutParams = splitedPathname.split(/\d+/)[0]
          return pathWithoutParams.endsWith(path) && <Component key={path} />
        }
      })}
    </>
  )
})
