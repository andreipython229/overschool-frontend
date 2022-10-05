import { FC, memo } from 'react'
import { NavAccountBtn } from '../../../components/NavAccountBtn/NavAccountBtn'

import { RoleE } from 'enum/roleE'
import { SettingsPath } from 'enum/pathE'
import { useAppSelector } from '../../../store/hooks'
import { selectUser } from '../../../selectors'

import styles from './navAccount.module.scss'

export const NavAccount: FC = memo(() => {
  const { permission } = useAppSelector(selectUser)

  return (
    <div className={styles.nav_account}>
      <NavAccountBtn path={SettingsPath.Main} text={'Основные'} />
      <NavAccountBtn path={SettingsPath.Employees} text={'Сотрудники'} />
      {permission === RoleE.SuperAdmin && <NavAccountBtn path={SettingsPath.Logs} text={'Логи'} />}
      <NavAccountBtn path={SettingsPath.Decoration} text={'Оформление'} />
    </div>
  )
})
