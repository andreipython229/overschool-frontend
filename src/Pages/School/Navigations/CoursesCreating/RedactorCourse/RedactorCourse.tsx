import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'

import { NavCreatingCourse } from '../../../NavAccount/NavCreatingCourse'

export const RedactorCourse: FC = memo(() => {
  return (
    <>
      <NavCreatingCourse />
      <Outlet/>
    </>
  )
})
