import React, { FC, memo, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import RedeemIcon from '@mui/icons-material/Redeem'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { navlinkByRoles } from './config/navlinkByRoles'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { tgNavPath } from './config/svgIconPath'
import { chatIconPath } from 'components/Navbar/config/svgIconPath'
import { useBoolean } from 'customHooks'
import { Portal } from 'components/Modal/Portal'
import { Chat } from 'components/Modal/Chat'
import classNames from 'classnames'
import OverAiIcon from '../../assets/img/common/newIconModal.svg'

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import styles from './navbar.module.scss'
import { contactLinkSelector, inviteProgramSelector, schoolSelector, selectUser } from '../../selectors'
import { Path } from '../../enum/pathE'
import Timer from '../Timer/Timer'
import Badge from '@mui/material/Badge'

import { useSelector } from 'react-redux'
import { RootState } from '../../store/redux/store'
import { SvgIcon, Tooltip } from '@mui/material'

import { motion } from 'framer-motion'
import { RoleE } from 'enum/roleE'
import Zoom from '@mui/material/Zoom'
import { coursesNavPath } from '../Navbar/config/svgIconPath'
import { GiftIconPath } from 'assets/Icons/svgIconPath'
import { useLazyFetchInvitesProgramQuery, useLazyFetchStudentInvitesProgramLinkQuery } from 'api/schoolService'
import { setInviteProgram } from 'store/redux/inviteProgram/inviteProgramSlice'

interface NavbarProps {
  onToggleChat: () => void
}

export const Navbar: FC<NavbarProps> = memo(({ onToggleChat }) => {
  const { role: UserRole } = useAppSelector(selectUser)
  const { schoolName } = useAppSelector(schoolSelector)
  const inviteLink = useAppSelector(inviteProgramSelector)
  const dispatch = useAppDispatch()
  const unRead = useSelector((state: RootState) => state.unread.totalUnread)
  const studentBonus = useSelector((state: RootState) => state.bonuses.studentBonus)
  const contactLink = useAppSelector(contactLinkSelector)
  const [isNavBarShow, setIsNavBarShow] = useState(false)
  const [isBtnToggled, setIsBtnToggled] = useState(false)
  const [isChatOpen, { on, off }] = useBoolean()
  const [fetchInvites, { data: inviteLinkDataStudent }] = useLazyFetchStudentInvitesProgramLinkQuery()
  const [fetchAdminInvites, { data: inviteLinkDataAdmin }] = useLazyFetchInvitesProgramQuery()

  useEffect(() => {
    if (
      (!inviteLink && UserRole === RoleE.Student && !inviteLinkDataStudent) ||
      (inviteLink && !inviteLink.is_active && UserRole === RoleE.Student)
    ) {
      fetchInvites(schoolName)
        .unwrap()
        .then(data => dispatch(setInviteProgram(data)))
    } else if (
      (!inviteLink && UserRole === RoleE.Admin && !inviteLinkDataAdmin) ||
      (inviteLink && !inviteLink.is_active && UserRole === RoleE.Admin)
    ) {
      fetchAdminInvites(schoolName)
        .unwrap()
        .then(data => {
          if (data.length > 0) {
            dispatch(setInviteProgram(data[0]))
          }
        })
    }
  }, [])

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
        {UserRole === RoleE.Student && studentBonus.id > 0 && new Date(studentBonus.expire_date) > new Date() ? (
          <Tooltip
            title={studentBonus.text}
            slots={{
              transition: Zoom,
            }}
            arrow
          >
            <div style={{ marginTop: '100px', width: '100%' }}>
              <a key={'bonus-school'} href={studentBonus.link} target="_blank" rel="noreferrer">
                {studentBonus.logo ? (
                  <div className={styles.navbar_menu} style={{ textAlign: 'center', padding: '0.40em' }}>
                    <img width={65} height={65} src={studentBonus.logo} alt="Logo" style={{ marginBottom: '10px' }} />
                    <div style={{ fontSize: '14px', textAlign: 'center', fontWeight: '600' }}>
                      <Timer targetDate={new Date(studentBonus.expire_date)} target="bonus" />
                    </div>
                  </div>
                ) : (
                  <SvgIcon className={styles.navbar_menu} style={{ opacity: '0.8', fontSize: '3.5em', padding: '0.15em' }}>
                    <RedeemIcon sx={{ color: 'black' }} />
                    <div style={{ fontSize: '14px', textAlign: 'center' }}>
                      <Timer targetDate={new Date(studentBonus.expire_date)} target="bonus" />
                    </div>
                  </SvgIcon>
                )}
              </a>
            </div>
          </Tooltip>
        ) : null}
        {inviteLink && inviteLink.is_active && inviteLink.link && (
          <div style={{ marginTop: 'auto', width: '100%' }} title="Ссылка на программу заработка">
            <a
              key={'invite-link'}
              href={inviteLink.link}
              target="_blank"
              rel="noreferrer"
              className={styles.navbar_menu}
              style={{ width: '100%', padding: '0 2px 10px', display: 'flex', flexDirection: 'column', textDecoration: 'none' }}
            >
              <SvgIcon style={{ opacity: '0.8', fontSize: '3.5em', padding: '0.15em' }}>
                <MonetizationOnIcon sx={{ color: 'black' }} />
              </SvgIcon>
              <p style={{ textWrap: 'wrap', textAlign: 'center', fontSize: '14px' }}>Заработок</p>
            </a>
          </div>
        )}
        {UserRole !== RoleE.Teacher && (
          <NavLink key={'Курсы'} to={Path.Courses} className={({ isActive }) => `${styles.navbar_menu} ${isActive ? styles.navbar_menu_active : ''}`}>
            <div>
              <IconSvg width={50} height={50} viewBoxSize={'0 0 50 50'} path={coursesNavPath} />
            </div>
            <p style={{ fontSize: '14px' }}>Главная</p>
            <div className={styles.mobile_active_indicator}></div>
          </NavLink>
        )}
        <div className={styles.navbar_setting_account}>
          <div className={styles.navbar_setting_account_mob_empty}></div>
          {navlinkByRoles[UserRole].map(({ path, icon }, index: number) =>
            path !== 'doNotPath' ? (
              <NavLink
                key={index}
                to={path}
                className={({ isActive }) =>
                  `${styles.navbar_setting_account_icon_container} ${isActive ? styles.navbar_setting_account_icon_container_active : ''}`
                }
              >
                <div>{icon}</div>
                <p>{getPathLabel(path as Path)}</p>
                <div className={styles.mobile_active_indicator}></div>
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
                <div className={styles.mobile_active_indicator}></div>
              </a>
            ),
          )}

          <a
            className={styles.tg_container}
            key={'techsupport-data-link'}
            target="_blank"
            rel="noreferrer"
            href={
              UserRole === RoleE.Admin
                ? 'https://t.me/coursehub_admin'
                : contactLink && contactLink.length > 0
                ? contactLink
                : 'https://t.me/coursehub_admin'
            }
          >
            <span>
              <IconSvg width={50} height={50} viewBoxSize={'0 0 50 50'} path={tgNavPath} />
            </span>
            <p>Тех поддержка</p>
          </a>
          {(UserRole === RoleE.Student || UserRole === RoleE.Teacher) && (
            <NavLink
              to={Path.Courses + Path.Bonus}
              className={({ isActive }) =>
                `${styles.navbar_setting_account_icon_container} ${isActive ? styles.navbar_setting_account_icon_container_active : ''}`
              }
            >
              <div>
                <IconSvg width={38} height={41} viewBoxSize={'0 0 38 41'} path={GiftIconPath} />
              </div>
              <p>Бонусы</p>
            </NavLink>
          )}

          <div className={styles.mobile_overai_btn_container} onClick={onToggleChat}>
            <img className={`${styles.chatGptButton_Pushed}`} src={OverAiIcon} alt="OverAI Icon" />
          </div>
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
