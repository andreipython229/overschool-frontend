import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'

import { NavAccount } from '../School/NavAccount/NavAccount'
import { AddEmployeeModal } from 'components/Modal'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../selectors'
import { useBoolean } from '../../customHooks/useBoolean'

export const Settings: FC = memo(() => {
  const { permission } = useAppSelector(selectUser)

  const [isOpen, { onToggle }] = useBoolean()

  return (
    <>
      <NavAccount role={permission} />
      {isOpen && <AddEmployeeModal onToggle={onToggle} />}
      <Outlet />
    </>
  )
})
