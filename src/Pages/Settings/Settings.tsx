import { FC, memo } from 'react'
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
import { selectUser } from '../../selectors/index'
import { useBoolean } from '../../customHooks/useBoolean'

export const Settings: FC = memo(() => {
  const { permission } = useAppSelector(selectUser)

  const [isOpen, { onToggle }] = useBoolean()

  return (
    <>
      <NavAccount role={permission} />
      {isOpen && <AddEmployeeModal onToggle={onToggle} />}
      <Routes>
        <Route path={'/*'} element={<Main />} />
        <Route path={SettingsPath.Employees} element={<Employees onToggle={onToggle} />} />
        {permission === RoleE.SuperAdmin ? <Route path={SettingsPath.Logs} element={<Logs />} /> : null}
        <Route path={SettingsPath.Decoration} element={<DecorPlatform />} />
      </Routes>
    </>
  )
})
