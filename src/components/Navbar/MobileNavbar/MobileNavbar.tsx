import React, { FC, memo, useState } from 'react'
import { Link, NavLink, generatePath, useNavigate } from 'react-router-dom'
import { Path } from 'enum/pathE'
import { useLazyLogoutQuery } from 'api/userLoginService'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import RedeemIcon from '@mui/icons-material/Redeem'

import { logoutState, role } from 'store/redux/users/slice'
import { Chat } from 'components/Modal/Chat'
import { useBoolean } from 'customHooks'
import { chatIconPath } from 'components/Navbar/config/svgIconPath'
import Tooltip from '@mui/material/Tooltip'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store/redux/store'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import Badge from '@mui/material/Badge'
import { Portal } from 'components/Modal/Portal'
import { selectUser } from '../../../selectors'
import { navlinkByRoles } from '../config/navlinkByRoles'
import { SvgIcon } from '@mui/material'

import styles from '../navbar.module.scss'
import { clearUserProfile } from 'store/redux/users/profileSlice'
import { useCookies } from 'react-cookie'
import { RoleE } from 'enum/roleE'
import { logOutIconPath } from './svgIconsPath'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Timer from '../../Timer/Timer'
import { clearSchoolData } from 'store/redux/school/schoolSlice'

interface IIsActive {
  isActive?: boolean
}

export const MobileNavbar: FC = memo(() => {
  const unRead = useSelector((state: RootState) => state.unread.totalUnread)
  const { role: userRole } = useAppSelector(selectUser)
  const isActive = ({ isActive }: IIsActive) => (isActive ? styles.isActive : '')
  const [logout] = useLazyLogoutQuery()
  const dispatch = useAppDispatch()
  const [isChatOpen, { on, off }] = useBoolean()
  const [, , removeAccessCookie] = useCookies(['access_token'])
  const [, , removeRefreshCookie] = useCookies(['refresh_token'])
  const navigate = useNavigate()
  const [anchorMob, setAnchorMob] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorMob)
  const dispatchRole = useDispatch()
  const studentBonus = useSelector((state: RootState) => state.bonuses.studentBonus)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const logOut = async () => {
    if (isLoggingOut) return;
    
    try {
      setIsLoggingOut(true)
      dispatch(clearUserProfile())
      dispatch(logoutState())
      dispatch(clearSchoolData())
      removeAccessCookie('access_token')
      removeRefreshCookie('refresh_token')
      localStorage.clear()
      
      await logout()
      
      setTimeout(() => {
        navigate(generatePath(Path.InitialPage), { replace: true })
        setIsLoggingOut(false)
      }, 800)
    } catch (error) {
      console.error('Logout error:', error)
      navigate(generatePath(Path.InitialPage), { replace: true })
      setIsLoggingOut(false)
    }
  }

  const goToChooseSchool = () => {
    dispatchRole(role(RoleE.Unknown))
    navigate(Path.ChooseSchool)
    setAnchorMob(null)
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMob(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorMob(null)
  }

  return (
    <>
      <div className={styles.navbar_setting_account}>
        {userRole === RoleE.Student && studentBonus.id > 0 && new Date(studentBonus.expire_date) > new Date() ? (
          <div style={{ marginTop: '35px' }}>
            <Tooltip title={`Акции/бонусы. ${studentBonus.text}`} arrow placement={'right'} key={'bonus'}>
              <a key={'bonus'} href={studentBonus.link}>
                {studentBonus.logo ? (
                  <div className={styles.navbar_menu} style={{ textAlign: 'center', padding: '0.40em' }}>
                    <img width={42} height={40} src={studentBonus.logo} alt="Logo" />
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
            </Tooltip>
          </div>
        ) : (
          <></>
        )}
        {userRole !== 0 &&
          navlinkByRoles[userRole].map(({ path, icon }, index: number) =>
            path !== 'doNotPath' ? (
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
            ) : (
              <>
                <Tooltip title={'Чаты'} arrow placement={'right'}>
                  <div className={`${styles.chatIcon} ${isChatOpen ? styles.chatIcon_active : ''}`} onClick={off}>
                    {Number(unRead) > 0 ? (
                      <Badge badgeContent={unRead} color="error">
                        <IconSvg width={50} height={50} viewBoxSize="0 0 50 50" path={chatIconPath} />
                      </Badge>
                    ) : (
                      <IconSvg width={50} height={50} viewBoxSize="0 0 50 50" path={chatIconPath} />
                    )}
                  </div>
                </Tooltip>
              </>
            ),
          )}

        {userRole === RoleE.Admin && (
          <Tooltip title={'Связаться с техподдержкой'} arrow placement={'right'}>
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
        )}

        {userRole === RoleE.Student ? (
          <React.Fragment>
            <Tooltip title={'Вернуться к выбору платформы'}>
              <NavLink to={Path.ChooseSchool} onClick={goToChooseSchool}>
                <SvgIcon className={styles.navbar_exit} style={{ opacity: '0.8', fontSize: '3.5em', padding: '0.1em' }}>
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </SvgIcon>
              </NavLink>
            </Tooltip>
            <Tooltip title={'Выйти из профиля'} className={styles.navbar_exit}>
              <IconSvg width={38} height={28} viewBoxSize="0 0 26 25" path={logOutIconPath} functionOnClick={logOut} />
            </Tooltip>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className={styles.navbar_exit}>
              <Tooltip title={'Выход'}>
                <div className={styles.tariffPlan} style={{ textDecoration: 'none' }} onClick={handleClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#e0dced"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </div>
              </Tooltip>
              <Menu anchorEl={anchorMob} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}>
                <MenuItem onClick={goToChooseSchool}>
                  <Link to={Path.ChooseSchool} style={{ color: '#ba75ff', paddingLeft: '1rem' }}>
                    Вернуться к выбору платформы
                  </Link>
                </MenuItem>
                <MenuItem onClick={logOut}>
                  <Link to={Path.InitialPage} style={{ color: '#ba75ff', paddingLeft: '1rem' }}>
                    Выйти из профиля
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          </React.Fragment>
        )}
      </div>
      {isChatOpen && (
        <Portal closeModal={on}>
          <Chat closeModal={on} />
        </Portal>
      )}
    </>
  )
})
