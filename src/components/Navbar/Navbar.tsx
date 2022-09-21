import { FC, memo } from 'react'
import { NavLink } from 'react-router-dom'

import { useAppSelector } from '../../store/hooks'
import { RoleE } from 'enum/roleE'
import { Path } from 'enum/pathE'
import { RootState } from '../../store/redux/store'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { navMenuPath, coursesNavPath, coursesStatsNavPath, homeworkNavPath, settingsNavPath } from './config/svgIconPath'

import styles from './navbar.module.scss'
import { selectUser } from '../../selectors'

interface IIsActive {
  isActive?: boolean
}

export const Navbar: FC = memo(() => {
  const { permission } = useAppSelector(selectUser)

  const isActive = ({ isActive }: IIsActive) => (isActive ? styles.isActive : '')

  return (
    <>
      <div className={styles.navbar}>
        <IconSvg className={styles.navbar_menu} width={30} height={25} viewBoxSize={'0 0 30 25'} path={navMenuPath} />
        <div className={styles.navbar_setting_account}>
          <NavLink to={Path.Courses} className={isActive}>
            <IconSvg width={38} height={32} viewBoxSize={'0 0 38 32'} path={coursesNavPath} />
          </NavLink>
          {permission !== RoleE.Student && (
            <>
              <NavLink to={Path.CourseStats} className={isActive}>
                <IconSvg width={36} height={36} viewBoxSize={'0 0 36 36'} path={coursesStatsNavPath} />
              </NavLink>

              <NavLink to={Path.HomeWork} className={isActive}>
                <IconSvg width={39} height={33} viewBoxSize={'0 0 39 33'} path={homeworkNavPath} />
              </NavLink>

              <NavLink to={Path.Settings} className={isActive}>
                <IconSvg width={35} height={35} viewBoxSize={'0 0 35 35'} path={settingsNavPath} />
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  )
})
