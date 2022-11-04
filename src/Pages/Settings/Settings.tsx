import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'

import { NavAccount } from '../Courses/NavAccount/NavAccount'

export const Settings: FC = memo(() => {
  return (
    <>
      <NavAccount />
      <Outlet />
    </>
  )
})
