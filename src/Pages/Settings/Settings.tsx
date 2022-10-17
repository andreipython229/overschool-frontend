import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'

import { NavAccount } from '../School/NavAccount/NavAccount'

export const Settings: FC = memo(() => {
  return (
    <>
      <NavAccount />
      <Outlet />
    </>
  )
})
