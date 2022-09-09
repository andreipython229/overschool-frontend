import { FC, memo } from 'react'
import { useLocation } from 'react-router-dom'

import { previousToShow } from './config/previousToShow'

type PreviousPropsT = {
  // avatar?: string
  // description?: string
  // name?: string
  about?: string
  buttonText?: string
  onClick?: () => void
}

export const Previous: FC<PreviousPropsT> = memo(({ about, onClick, buttonText }) => {
  const { pathname } = useLocation()

  return (
    <>
      {previousToShow.map(({ path, Component }) => {
        return pathname.includes(path) && <Component />
      })}
    </>
  )
})
