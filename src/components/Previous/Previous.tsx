import { FC, memo } from 'react'
import { useLocation } from 'react-router-dom'
import { pathT, PreviousPropsT } from '../componentsTypes'
import { previousToShow } from './config/previousToShow'

export const Previous: FC<PreviousPropsT> = memo(() => {
  const { pathname } = useLocation()

  return (
    <>
      {previousToShow.map(({ path, Component }: pathT) => {
        return pathname.includes(path) && <Component key={path} />
      })}
    </>
  )
})
