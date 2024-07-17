import React, { FC, memo } from 'react'
import { NavLink } from 'react-router-dom'
import RedeemIcon from '@mui/icons-material/Redeem';
import { useAppSelector } from '../../store/hooks'
import { navlinkByRoles } from './config/navlinkByRoles'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { appealsIconPath, navMenuPath } from './config/svgIconPath'
import { chatIconPath } from 'components/Navbar/config/svgIconPath'
import { useBoolean } from 'customHooks'
import { Portal } from 'components/Modal/Portal'
import { Chat } from 'components/Modal/Chat'

import styles from './navbar.module.scss'
import { selectUser } from '../../selectors'
import Tooltip from '@mui/material/Tooltip'
import { Path } from '../../enum/pathE'
import Timer from "../Timer/Timer";
import Badge from '@mui/material/Badge'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/redux/store'
import { SvgIcon } from '@mui/material'

import { motion } from 'framer-motion'
import { role } from 'store/redux/users/slice'
import { RoleE } from 'enum/roleE'
import { MarkEmailUnreadRounded } from '@mui/icons-material'

import { coursesNavPath } from '../Navbar/config/svgIconPath'

interface IIsActive {
  isActive?: boolean
}

export const Navbar: FC = memo(() => {
  const { role: UserRole } = useAppSelector(selectUser)
  const unRead = useSelector((state: RootState) => state.unread.totalUnread)
  const unReadAppeals = useSelector((state: RootState) => state.unreadAppeals.totalUnreadAppeals)
  const totalMeetingCount = useSelector((state: RootState) => state.meetings.totalMeetingCount);
  const studentBonus = useSelector((state: RootState) => state.bonuses.studentBonus);
  const dispatchRole = useDispatch()

  const isActive = ({ isActive }: IIsActive) => (isActive ? styles.isActive : '')
  const [isChatOpen, { on, off }] = useBoolean()
  const handleHome = () => {
    dispatchRole(role(RoleE.Unknown))
  }

  return (
    <>
      <motion.nav
        className={styles.navbar}
        initial={{
          y: -1000,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          delay: 0.1,
          ease: 'easeInOut',
          duration: 0.5,
        }}
        layout
      >
        <div className={styles.navbar_menu} >
          <Tooltip title={'Курсы'} key={'Курсы'}>
            <NavLink key={'Курсы'} to={Path.Courses} className={isActive}>
            <IconSvg width={38} height={32} viewBoxSize={'0 0 38 32'} path={coursesNavPath} />
            </NavLink>
          </Tooltip>
        </div>
        {UserRole === RoleE.Student && studentBonus.id > 0 && new Date(studentBonus.expire_date) > new Date() ?
            <div style={{ marginTop: '35px' }}>
              <Tooltip title={`Акции/бонусы. ${studentBonus.text}`} arrow placement={'right'} key={'bonus'}>
                <a key={'bonus'} href={studentBonus.link}>
                  {studentBonus.logo
                    ? <div className={styles.navbar_menu} style={{ textAlign: 'center', padding: '0.40em' }}>
                        <img width={42} height={40} src={studentBonus.logo} alt="Logo" />
                      </div>
                    : <SvgIcon className={styles.navbar_menu} style={{ opacity: '0.8', fontSize: '3.5em', padding: '0.15em' }}>
                        <RedeemIcon/>
                      </SvgIcon>}
                  <div style={{ fontSize: '0.7em', textAlign: 'center' }}>
                    <Timer targetDate={new Date(studentBonus.expire_date)} target='bonus'/>
                  </div>
                </a>
              </Tooltip>
            </div>
            :<div></div>}
        <div className={styles.navbar_setting_account}>
          {/* <Tooltip title={'Видеоконференции'} arrow placement={'right'} key={'meetings-data'}>
                  <NavLink to={Path.Meetings} className={isActive}>
                    <Badge badgeContent={totalMeetingCount} color="error">
                      <SvgIcon className={styles.navbar_menu} style={{ opacity: '0.8', fontSize: '3.5em', padding: '0.1em' }}>
                        <VideocamIcon/>
                      </SvgIcon>
                    </Badge>
                  </NavLink>
                </Tooltip> */}
          {navlinkByRoles[UserRole].map(({ path, icon }, index: number) =>
            path !== 'doNotPath' ? (
              <Tooltip
                title={
                    // path === Path.Courses
                    // ? 'Курсы'
                     path === Path.Meetings
                    ? 'Видеоконференции'
                    : path === Path.CourseStats
                    ? 'Ученики платформы'
                    : path === Path.HomeWork
                    ? 'Домашние задания'
                    : 'Настройки платформы'
                }
                key={index + '_' + path}
                arrow
                placement={'right'}
              >
                <NavLink key={index} to={path} className={isActive}>
                  {icon}
                </NavLink>
              </Tooltip>
            ) : (
              <div>
                <Tooltip title={'Чаты'} arrow placement={'right'} key={'chats_2'}>
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
            ),
          )}
          {UserRole === RoleE.Admin && (
            <div>
              <Tooltip title={'Заявки о поступлении на курс'} arrow placement={'right'} key={'appeals-data'}>
                <NavLink to={Path.Appeals} className={isActive}>

                  {unReadAppeals > 0 ? (
                    <Badge badgeContent={unReadAppeals} color="error">
                      <IconSvg width={48} height={44} viewBoxSize="0 0 24 24" path={appealsIconPath} />
                    </Badge>
                  ) : (
                      <IconSvg width={48} height={44} viewBoxSize="0 0 24 24" path={appealsIconPath} />
                  )}
                </NavLink>
              </Tooltip>
              <Tooltip title={'Связаться с техподдержкой'} arrow placement={'right'} key={'techsupport-data-link'}>
                <a key={'techsupport'} href={'https://t.me/over_school'} target="_blank" rel="noreferrer">
                  <SvgIcon
                    className={styles.navbar_menu}
                    viewBox={'0 0 508 508'}
                    xmlSpace="preserve"
                    style={{ opacity: '0.8', fontSize: '3.5em', padding: '0.15em', marginBottom: '-0.5rem' }}
                  >
                    <circle style={{ fill: '#54C0EB' }} cx="254" cy="254" r="254" />
                    <path
                      style={{ fill: '#FFFFFF' }}
                      d="M303.7,303.3c30.5-17.3,51-50.1,51-87.6c0-55.7-45.1-100.8-100.8-100.8S153.2,160,153.2,215.6
	c0,37.6,20.6,70.3,51,87.6C141,319.3,89.7,365,66,424.8c46.5,51.1,113.5,83.2,188,83.2s141.5-32.1,188-83.2
	C418.3,365,367,319.3,303.7,303.3z"
                    />
                    <path
                      style={{ fill: '#324A5E' }}
                      d="M401.6,182.3h-15.8C370.9,123.4,317.5,79.6,254,79.6s-116.9,43.7-131.8,102.7h-15.8
	c-5.4,0-9.8,4.4-9.8,9.8V240c0,5.4,4.4,9.8,9.8,9.8h20c6.1,0,10.8-5.5,9.7-11.4c-2-10.4-2.7-21.3-1.8-32.5
	c4.8-59.3,53.6-106.9,113.1-110.1c69.2-3.8,126.8,51.5,126.8,119.9c0,7.8-0.8,15.3-2.2,22.7c-1.2,6,3.6,11.5,9.6,11.5h1.8
	c-4.2,13-14.9,37.2-38.3,50.2c-19.6,10.9-44.3,11.9-73.4,2.8c-1.5-6.7-8.9-14.6-16.5-18.3c-9.8-4.9-15.9-0.8-19.4,6.2
	s-3,14.3,6.7,19.2c8.6,4.3,21.6,5.2,27,0.5c13.9,4.3,26.9,6.5,39,6.5c15,0,28.5-3.3,40.4-10c27.5-15.3,38.8-43.7,42.8-57.2h9.9
	c5.4,0,9.8-4.4,9.8-9.8v-47.9C411.4,186.7,407,182.3,401.6,182.3z"
                    />
                  </SvgIcon>
                </a>
              </Tooltip>
                          </div>
          )}
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
