import React, { FC, memo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import RedeemIcon from '@mui/icons-material/Redeem'
import { useAppSelector } from '../../store/hooks'
import { navlinkByRoles } from './config/navlinkByRoles'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { appealsIconPath, navMenuPath, tgNavPath } from './config/svgIconPath'
import { chatIconPath } from 'components/Navbar/config/svgIconPath'
import { useBoolean } from 'customHooks'
import { Portal } from 'components/Modal/Portal'
import { Chat } from 'components/Modal/Chat'
import classNames from 'classnames'

import styles from './navbar.module.scss'
import { contactLinkSelector, selectUser } from '../../selectors'
import Tooltip from '@mui/material/Tooltip'
import { Path } from '../../enum/pathE'
import Timer from '../Timer/Timer'
import Badge from '@mui/material/Badge'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/redux/store'
import { SvgIcon } from '@mui/material'

import { motion } from 'framer-motion'
import { role } from 'store/redux/users/slice'
import { RoleE } from 'enum/roleE'
import { MarkEmailUnreadRounded, SetMealSharp } from '@mui/icons-material'

import { coursesNavPath } from '../Navbar/config/svgIconPath'
import { GiftIconPath } from 'assets/Icons/svgIconPath'

interface IIsActive {
  isActive?: boolean
}

export const Navbar: FC = memo(() => {
  const { role: UserRole } = useAppSelector(selectUser)
  const school = useAppSelector(state => state.school)
  const unRead = useSelector((state: RootState) => state.unread.totalUnread)
  const unReadAppeals = useSelector((state: RootState) => state.unreadAppeals.totalUnreadAppeals)
  const totalMeetingCount = useSelector((state: RootState) => state.meetings.totalMeetingCount)
  const studentBonus = useSelector((state: RootState) => state.bonuses.studentBonus)
  const dispatchRole = useDispatch()
  const contactLink = useAppSelector(contactLinkSelector)

  const [isNavBarShow, setIsNavBarShow] = useState(false)
  const [isBtnToggled, setIsBtnToggled] = useState(false)
  const isActive = ({ isActive }: IIsActive) => (isActive ? styles.isActive : '')
  const [isChatOpen, { on, off }] = useBoolean()

  const handleHome = () => {
    dispatchRole(role(RoleE.Unknown))
  }

  const toggleNavBar = () => {
    setIsNavBarShow(prevState => !prevState)
    setIsBtnToggled(prevState => !prevState)
  }

  const getPathLabel = (path: Path): string => {
    switch (path) {
      case Path.Meetings:
        return 'Конференции'
      case Path.CourseStats:
        return 'Ученики'
      case Path.HomeWork:
        return 'Домашние задания'
      case Path.Settings:
        return 'Настройки'
      default:
        return ''
    }
  }

  return (
    <>
      <motion.nav
        className={classNames(styles.navbar, { [styles.isNavBarShow]: isNavBarShow })}
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
        // transition={{
        //   delay: 0.1,
        //   ease: 'easeInOut',
        //   duration: 0.5,
        // }}
        layout
      >
        <div onClick={toggleNavBar} className={styles.navbar_show_btn}>
          <div className={classNames(styles.navbar_show_btn_round, { [styles.isBtnToggled]: isBtnToggled })}>
            <div className={styles.navbar_show_btn_round_line}></div>
            <div className={styles.navbar_show_btn_round_line}></div>
            <div className={styles.navbar_show_btn_round_line}></div>
          </div>
        </div>

        <NavLink key={'Курсы'} to={Path.Courses} className={styles.navbar_menu}>
          <div>
            <IconSvg width={50} height={50} viewBoxSize={'0 0 50 50'} path={coursesNavPath} />
          </div>
          <p>Главная</p>
        </NavLink>

        {/* {UserRole === RoleE.Student && studentBonus.id > 0 && new Date(studentBonus.expire_date) > new Date() ? (
          <div style={{ marginTop: '35px' }}>
            <a key={'bonus'} href={studentBonus.link}>
              {studentBonus.logo ? (
                <div className={styles.navbar_menu} style={{ textAlign: 'center', padding: '0.40em' }}>
                  <img width={50} height={50} src={studentBonus.logo} alt="Logo" />
                </div>
              ) : (
                <SvgIcon className={styles.navbar_menu} style={{ opacity: '0.8', fontSize: '3.5em', padding: '0.15em' }}>
                  <RedeemIcon />
                </SvgIcon>
              )}
              <div style={{ fontSize: '0.7em', textAlign: 'center' }}>
                <Timer targetDate={new Date(studentBonus.expire_date)} target="bonus" />
              </div>
            </a>
          </div>
        ) : (
          <></>
        )} */}
        <div className={styles.navbar_setting_account}>
          {navlinkByRoles[UserRole].map(({ path, icon }, index: number) =>
            path !== 'doNotPath' ? (
              <NavLink key={index} to={path} className={styles.navbar_setting_account_icon_container}>
                <div>{icon}</div>
                <p>{getPathLabel(path as Path)}</p>
              </NavLink>
            ) : (
              <a className={styles.chatIcon_container} key={index + '_' + path} onClick={off}>
                <div className={styles.chatIcon}>
                  {/* className={`${styles.chatIcon} ${isChatOpen ? styles.chatIcon_active : ''}`}  */}
                  {Number(unRead) > 0 ? (
                    <Badge badgeContent={unRead} color="error">
                      <IconSvg width={50} height={50} viewBoxSize="0 0 50 50" path={chatIconPath} />
                    </Badge>
                  ) : (
                    <IconSvg width={50} height={50} viewBoxSize="0 0 50 50" path={chatIconPath} />
                  )}
                </div>
                <p>Чат</p>
              </a>
            ),
          )}

          <a
            className={styles.tg_container}
            key={'techsupport-data-link'}
            target="_blank"
            rel="noreferrer"
            href={
              UserRole === RoleE.Admin ? 'https://t.me/course_hb' : contactLink && contactLink.length > 0 ? contactLink : 'https://t.me/course_hb'
            }
          >
            <span>
              <IconSvg width={50} height={50} viewBoxSize={'0 0 50 50'} path={tgNavPath} />
            </span>
            <p>Тех поддержка</p>
          </a>
          {(UserRole === RoleE.Student || UserRole === RoleE.Teacher) && (
            <NavLink to={Path.Courses + Path.Bonus} className={styles.navbar_setting_account_icon_container}>
              <div>
                <IconSvg width={38} height={41} viewBoxSize={'0 0 38 41'} path={GiftIconPath} />
              </div>
              <p>Бонусы</p>
            </NavLink>
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
