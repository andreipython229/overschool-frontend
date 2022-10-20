import { FC, memo } from 'react'
import { NavLink } from 'react-router-dom'

import { useAppSelector } from '../../store/hooks'
import { navlinkByRoles } from './config/navlinkByRoles'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { navMenuPath } from './config/svgIconPath'

import styles from './navbar.module.scss'
import { selectUser } from '../../selectors'

interface IIsActive {
  isActive?: boolean
}

export const Navbar: FC = memo(() => {
  const { role } = useAppSelector(selectUser)

  const isActive = ({ isActive }: IIsActive) => (isActive ? styles.isActive : '')

  return (
    <nav className={styles.navbar}>
      <IconSvg className={styles.navbar_menu} width={30} height={25} viewBoxSize={'0 0 30 25'} path={navMenuPath} />
      <div className={styles.navbar_setting_account}>
        {navlinkByRoles[role].map(({ path, icon }, index: number) => (
          <NavLink key={index} to={path} className={isActive}>
            {icon}
          </NavLink>
        ))}
      </div>
    </nav>
  )
})
