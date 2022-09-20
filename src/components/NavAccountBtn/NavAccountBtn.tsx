import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { IIsActive, NavAccountBtnPropsT } from '../../Pages/CoursesStats/coursesStatsTypes'

import styles from './navAccountBtn.module.scss'

export const NavAccountBtn: FC<NavAccountBtnPropsT> = ({ text, path }) => {
  const isActive = ({ isActive }: IIsActive): string => (isActive ? styles.nav_btn + ' ' + styles.active : styles.nav_btn)
  return (
    <NavLink to={path} replace={true} className={isActive}>
      {text}
    </NavLink>
  )
}
