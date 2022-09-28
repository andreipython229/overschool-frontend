import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'

import { NavAccount } from '../School/NavAccount/NavAccount'
import { AddEmployeeModal } from 'components/Modal'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../selectors'

type SettingsT = {
  isOpen: boolean
  closeModal: () => void
}

export const Settings: FC<SettingsT> = memo(({ isOpen, closeModal }) => {
  const { permission } = useAppSelector(selectUser)

  return (
    <>
      <NavAccount role={permission} />
      {isOpen && <AddEmployeeModal setShowModal={closeModal} />}
      <Outlet />
    </>
  )
})
