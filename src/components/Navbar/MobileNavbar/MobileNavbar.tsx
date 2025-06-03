import React, { FC, memo, useState, useEffect } from 'react'
import { /*Link,*/ NavLink, /*generatePath,*/ useNavigate } from 'react-router-dom'
import { Path } from 'enum/pathE'
import { /*useLazyLogoutQuery*/ } from 'api/userLoginService'
import { /*useAppDispatch,*/ useAppSelector } from '../../../store/hooks'
import RedeemIcon from '@mui/icons-material/Redeem'
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
// import MenuIcon from '@mui/icons-material/Menu'

import { /*logoutState,*/ role } from 'store/redux/users/slice'
import { Chat } from 'components/Modal/Chat'
import { useBoolean } from 'customHooks'
import { chatIconPath, tgNavPath } from 'components/Navbar/config/svgIconPath'
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
import { /*clearUserProfile*/ } from 'store/redux/users/profileSlice'
import { /*useCookies*/ } from 'react-cookie'
import { RoleE } from 'enum/roleE'
// import { logOutIconPath } from './svgIconsPath'

// import Menu from '@mui/material/Menu'
// import MenuItem from '@mui/material/MenuItem'
import Timer from '../../Timer/Timer'
import { /*clearSchoolData*/ } from 'store/redux/school/schoolSlice'

// Компонент-обертка для применения стилей к иконкам
const DarkIconWrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  const iconStyle = {
    display: 'inline-block', // Сохраняем инлайн поведение
    color: '#212121',
  };

  return (
    <div style={iconStyle}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement, {
            // Применяем стили только к SVG элементам
            style: {
              ...(child.props.style || {}),
              color: '#212121',
              fill: '#212121',
            }
          });
        }
        return child;
      })}
    </div>
  );
};

interface IIsActive {
  isActive?: boolean
}

interface MobileNavbarProps {
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
}

export const MobileNavbar: FC<MobileNavbarProps> = memo(({ isCollapsed = false, toggleCollapse }) => {
  const unRead = useSelector((state: RootState) => state.unread.totalUnread)
  const { role: userRole } = useAppSelector(selectUser)
  const isActive = ({ isActive }: IIsActive) => (isActive ? styles.isActive : '')
  // const [logout] = useLazyLogoutQuery()
  // const dispatch = useAppDispatch()
  const [isChatOpen, { on, off }] = useBoolean()
  // const [, , removeAccessCookie] = useCookies(['access_token'])
  // const [, , removeRefreshCookie] = useCookies(['refresh_token'])
  const navigate = useNavigate()
  // const [anchorMob, setAnchorMob] = useState<null | HTMLElement>(null)
  // const open = Boolean(anchorMob)
  const dispatchRole = useDispatch()
  const studentBonus = useSelector((state: RootState) => state.bonuses.studentBonus)
  // const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [localIsCollapsed, setLocalIsCollapsed] = useState(isCollapsed)

  // Синхронизируем локальное состояние с пропсами
  useEffect(() => {
    setLocalIsCollapsed(isCollapsed);
  }, [isCollapsed]);

  // Добавляем CSS для переопределения цветов всех SVG элементов в навбаре
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .${styles.navbar_setting_account} svg,
      .${styles.navbar_setting_account} svg path,
      .${styles.navbar_setting_account} svg rect,
      .${styles.navbar_setting_account} svg circle {
        fill: #212121 !important;
        stroke: #212121 !important;
        color: #212121 !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // const toggleNavbar = () => {
  //   if (toggleCollapse) {
  //     toggleCollapse();
  //   } else {
  //     setLocalIsCollapsed(!localIsCollapsed);
  //   }
  // }

  // Сохраняем logOut в закомментированном виде, так как он может понадобиться в будущем
  // const logOut = async () => {
  //   if (isLoggingOut) return;
    
  //   try {
  //     setIsLoggingOut(true)
  //     dispatch(clearUserProfile())
  //     dispatch(logoutState())
  //     dispatch(clearSchoolData())
  //     removeAccessCookie('access_token')
  //     removeRefreshCookie('refresh_token')
  //     localStorage.clear()
      
  //     await logout()
      
  //     setTimeout(() => {
  //       navigate(generatePath(Path.InitialPage), { replace: true })
  //       setIsLoggingOut(false)
  //     }, 800)
  //   } catch (error) {
  //     console.error('Logout error:', error)
  //     navigate(generatePath(Path.InitialPage), { replace: true })
  //     setIsLoggingOut(false)
  //   }
  // }

  const goToChooseSchool = () => {
    dispatchRole(role(RoleE.Unknown))
    navigate(Path.ChooseSchool)
    // setAnchorMob(null)
  }

  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorMob(event.currentTarget)
  // }

  // const handleClose = () => {
  //   setAnchorMob(null)
  // }

  // Используем либо проп isCollapsed, либо локальное состояние
  const effectiveIsCollapsed = toggleCollapse ? isCollapsed : localIsCollapsed;

  return (
    <>
      {/* Навигационная панель */}
      <div className={`${styles.navbar_setting_account} ${effectiveIsCollapsed ? styles.collapsed : ''}`} 
           style={{ 
             display: 'flex', 
             justifyContent: 'space-evenly', 
             alignItems: 'center',
             paddingLeft: '10px',
             paddingRight: '10px'
           }}>
        {!effectiveIsCollapsed && (
          <>
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
                    <NavLink key={index} to={path} className={isActive} style={{ padding: '0 10px' }}>
                      <DarkIconWrapper>
                        {icon}
                      </DarkIconWrapper>
                    </NavLink>
                  </Tooltip>
                ) : (
                  <>
                    <Tooltip title={'Чаты'} arrow placement={'right'}>
                      <div className={`${styles.chatIcon}`} onClick={off} style={{ outline: 'none', padding: '0 10px' }}>
                        {Number(unRead) > 0 ? (
                          <Badge badgeContent={unRead} color="error">
                            <IconSvg 
                              width={50} 
                              height={50} 
                              viewBoxSize="0 0 50 50" 
                              path={chatIconPath} 
                              className={styles.svgIcon}
                              styles={{ color: '#212121' }}
                            />
                          </Badge>
                        ) : (
                          <IconSvg 
                            width={50} 
                            height={50} 
                            viewBoxSize="0 0 50 50" 
                            path={chatIconPath} 
                            className={styles.svgIcon}
                            styles={{ color: '#212121' }}
                          />
                        )}
                      </div>
                    </Tooltip>
                  </>
                ),
              )}

            {userRole === RoleE.Admin && (
              <Tooltip title={'Связаться с техподдержкой'} arrow placement={'right'}>
                <a key={'techsupport'} href={'https://t.me/coursehub_admin'} target="_blank" rel="noreferrer" style={{ padding: '0 10px' }}>
                  <div style={{ transform: 'scale(1.1)', transformOrigin: 'center center' }}>
                    <IconSvg 
                      width={60} 
                      height={60} 
                      viewBoxSize="0 0 50 50" 
                      path={tgNavPath} 
                      className={styles.svgIcon}
                      styles={{ color: '#212121' }} 
                    />
                  </div>
                </a>
              </Tooltip>
            )}

            {/* Восстановлена кнопка возврата к выбору платформы для студентов */}
            {userRole === RoleE.Student && (
              <React.Fragment>
                <Tooltip title={'Вернуться к выбору платформы'}>
                  <NavLink to={Path.ChooseSchool} onClick={goToChooseSchool} style={{ padding: '0 10px' }}>
                    <SvgIcon className={`${styles.navbar_exit} ${styles.navbarIcon} ${styles.homeIcon}`} style={{ transform: 'scale(2.8)', transformOrigin: 'center center', color: '#212121' }}>
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </SvgIcon>
                  </NavLink>
                </Tooltip>
                {/* Кнопка выхода из профиля закомментирована, так как эта функциональность перенесена в хедер
                <Tooltip title={'Выйти из профиля'} className={styles.navbar_exit}>
                  <IconSvg 
                    width={38} 
                    height={28} 
                    viewBoxSize="0 0 26 25" 
                    path={logOutIconPath} 
                    functionOnClick={logOut} 
                    className={styles.svgIcon}
                  />
                </Tooltip>
                */}
              </React.Fragment>
            )}

            {/* Закомментирован блок с кнопкой выхода для администраторов и других пользователей */}
            {/* {userRole !== RoleE.Student && userRole !== 0 && (
              <React.Fragment>
                <div className={styles.navbar_exit}>
                  <Tooltip title={'Выход'}>
                    <div className={styles.tariffPlan} style={{ textDecoration: 'none' }} onClick={handleClick}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        className={styles.logoutSvgIcon}
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
            )} */}
          </>
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
