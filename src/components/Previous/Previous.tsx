import React, { FC, memo } from 'react'
import { GlobalPrevious } from './GlobalPrevious'
import { CoursePrevious } from './CoursePrevious'
import { useLocation } from 'react-router-dom'

type PreviousPropsT = {
  avatar: string
  description?: string
  name: string
  about?: string
  buttonText?: string
  onClick?: () => void
}

export const Previous: FC<PreviousPropsT> = memo(({ avatar, name, about, description, onClick, buttonText }) => {
  const { pathname } = useLocation()

  return (
    <>
      {pathname.includes('create-course') ? (
        <CoursePrevious />
      ) : (
        <GlobalPrevious avatar={avatar} name={name} about={about} description={description} onClick={onClick} buttonText={buttonText} />
      )}
    </>
  )
})
