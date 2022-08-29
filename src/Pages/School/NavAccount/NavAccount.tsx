import React, { FC, memo } from 'react'
import { NavAccountBtn } from './NavAccountBtn/NavAccountBtn'
import styles from './navAccount.module.scss'
import { RoleE } from 'enum/roleE'
import { SettingsPath } from 'enum/pathE'

type NavAccountPropsT = {
  role: number
}
export const NavAccount: FC<NavAccountPropsT> = memo(({ role }) => {
  return (
    <div className={styles.nav_account}>
      <NavAccountBtn path={SettingsPath.Main} text={'Основные'} />
      <NavAccountBtn path={SettingsPath.Employees} text={'Сотрудники'} />
      {role === RoleE.SuperAdmin ? <NavAccountBtn path={SettingsPath.Logs} text={'Логи'} /> : null}
      <NavAccountBtn path={SettingsPath.Decoration} text={'Оформление'} />
    </div>
  )
})
