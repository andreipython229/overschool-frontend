import React, { FC, memo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { NavAccount } from '../School/NavAccount/NavAccount'
import { AddEmployeeModal } from 'components/Modal'
import { Main } from './Main/Main'
import { Employees } from './Employees/Employees'
import { useAppSelector } from '../../store/hooks'
import { SettingsPath } from 'enum/pathE'
import { RoleE } from 'enum/roleE'
import { Logs } from './Logs/Logs'
import { DecorPlatform } from './DecorPlatform/DecorPlatform'
import { RootState } from '../../store/redux/store'

export const Settings: FC = memo(() => {
  const role = useAppSelector((state: RootState) => state.user.permission)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const setModal = () => {
    setModalIsOpen(!modalIsOpen)
  }

  return (
    <>
      <NavAccount role={role} />
      {modalIsOpen ? <AddEmployeeModal setModal={setModal} /> : null}
      <Routes>
        <Route path={'/*'} element={<Main />} />
        <Route path={SettingsPath.Employees} element={<Employees setModal={setModal} />} />
        {role === RoleE.SuperAdmin ? <Route path={SettingsPath.Logs} element={<Logs />} /> : null}
        <Route path={SettingsPath.Decoration} element={<DecorPlatform />} />
      </Routes>
    </>
  )
})
