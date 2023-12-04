import { FC, memo } from 'react'
import { NavLink } from 'react-router-dom'

import { useAppSelector } from '../../store/hooks'
import { navlinkByRoles } from './config/navlinkByRoles'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { navMenuPath } from './config/svgIconPath'
import { chatIconPath } from 'components/Navbar/config/svgIconPath'
import { useBoolean } from 'customHooks'
import { Portal } from 'components/Modal/Portal'
import { Chat } from 'components/Modal/Chat'

import styles from './navbar.module.scss'
import { selectUser } from '../../selectors'
import Tooltip from '@mui/material/Tooltip'
import { Path } from '../../enum/pathE'

import Badge from '@mui/material/Badge'

import { useSelector } from 'react-redux'
import { RootState } from '../../store/redux/store'
import { Icon, SvgIcon } from '@mui/material'

import { motion } from 'framer-motion'

interface IIsActive {
  isActive?: boolean
}

export const Navbar: FC = memo(() => {
  const { role } = useAppSelector(selectUser)
  const unRead = useSelector((state: RootState) => state.unread.totalUnread)

  const isActive = ({ isActive }: IIsActive) => (isActive ? styles.isActive : '')
  const [isChatOpen, { on, off }] = useBoolean()

  return (
    <>
      <motion.nav className={styles.navbar}
      initial={{
        y:-1000,
      }}
      animate={{
        y:0,
      }}
      transition={{
        delay: 0.1,
      }}>
        <Tooltip title={'Вернуться на главную'}>
          <NavLink key={'home'} to={Path.InitialPage} className={isActive}>
            <SvgIcon className={styles.navbar_menu} style={{opacity: '0.8', fontSize: '3.5em', padding: '0.1em'}}>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>
          </NavLink>
        </Tooltip>
        <div className={styles.navbar_setting_account}>
          {navlinkByRoles[role].map(({ path, icon }, index: number) => (
            <Tooltip
              title={
                path === Path.Courses
                  ? 'Курсы'
                  : path === Path.CourseStats
                  ? 'Ученики школы'
                  : path === Path.HomeWork
                  ? 'Домашние задания'
                  : 'Настройки школы'
              }
              key={index}
              arrow
              placement={'right'}
            >
              <NavLink key={index} to={path} className={isActive}>
                {icon}
              </NavLink>
            </Tooltip>
          ))}
          <Tooltip title={'Чаты'} arrow placement={'right'}>
            <div className={`${styles.chatIcon} ${isChatOpen ? styles.chatIcon_active : ''}`} onClick={off}>
              {Number(unRead) > 0 ? (
                <Badge badgeContent={unRead} color="error">
                  <IconSvg width={38} height={34} viewBoxSize="0 0 28 24" path={chatIconPath} />
                </Badge>
              ) : (
                <IconSvg width={38} height={34} viewBoxSize="0 0 28 24" path={chatIconPath} />
              )}
            </div>
          </Tooltip>
        </div>
      </motion.nav>
      {isChatOpen && (
        <Portal closeModal={on}>
          <Chat closeModal={on} />
        </Portal>
      )}
    </>
  )
})
