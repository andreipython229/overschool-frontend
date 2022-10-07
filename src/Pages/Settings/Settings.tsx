import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'

import { NavAccount } from '../School/NavAccount/NavAccount'
import { AddEmployeeModal } from 'components/Modal'
import { Portal } from '../../components/Modal/Portal'

type SettingsT = {
  isOpen: boolean
  closeModal: () => void
}

export const Settings: FC<SettingsT> = memo(({ isOpen, closeModal }) => {
  return (
    <>
      <NavAccount />
      {isOpen && (
        <Portal closeModal={closeModal}>
          <AddEmployeeModal setShowModal={closeModal} />
        </Portal>
      )}
      <Outlet />
    </>
  )
})
