import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'

export const School: FC = memo(() => {
  return <Outlet />
})
