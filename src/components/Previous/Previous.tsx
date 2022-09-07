import { FC, memo } from 'react'
import { useLocation } from 'react-router-dom'

import { GlobalPrevious } from './GlobalPrevious'
import { CoursePrevious } from './CoursePrevious'

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
      {pathname.includes('create-course') ? (
        <CoursePrevious />
      ) : (
        <GlobalPrevious about={about} onClick={onClick} buttonText={buttonText} />
      )}
    </>
  )
})
