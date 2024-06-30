import { FC, memo, useEffect } from 'react'
import { NavAccountBtn } from '../../../components/NavAccountBtn/NavAccountBtn'

import { RoleE } from 'enum/roleE'
import { SettingsPath } from 'enum/pathE'
import { useAppSelector } from '../../../store/hooks'
import { selectUser } from '../../../selectors'

import styles from './navAccount.module.scss'

export const NavAccount: FC = memo(() => {
  const { role } = useAppSelector(selectUser)

  return (
    <nav className={styles.nav_account}>
      <NavAccountBtn path={SettingsPath.Main} text={'Основные'} />
      <NavAccountBtn path={SettingsPath.Employees} text={'Сотрудники'} />
      {role === RoleE.SuperAdmin && <NavAccountBtn path={SettingsPath.Logs} text={'Логи'} />}
      <NavAccountBtn path={SettingsPath.SchoolPassport} text={'Печати и подписи'} />
      {(role === RoleE.SuperAdmin  || role === RoleE.Admin) && <NavAccountBtn path={SettingsPath.PaymentMethods} text={'Оплата'} />}
        <NavAccountBtn path={SettingsPath.DomainSettings} text={'Домены'} />
      <NavAccountBtn path={SettingsPath.Bonuses} text={'Бонусы / акции'} />
    </nav>
  )
})
