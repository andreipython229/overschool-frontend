import React, { FC, memo, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Path } from 'enum/pathE'
import { useAppSelector } from '../../../store/hooks'
import RedeemIcon from '@mui/icons-material/Redeem'
import { Chat } from 'components/Modal/Chat'
import { useBoolean } from 'customHooks'
import { chatIconPath, tgNavPath } from 'components/Navbar/config/svgIconPath'
import Tooltip from '@mui/material/Tooltip'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/redux/store'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import Badge from '@mui/material/Badge'
import { Portal } from 'components/Modal/Portal'
import { selectUser } from '../../../selectors'
import { navlinkByRoles } from '../config/navlinkByRoles'
import { SvgIcon } from '@mui/material'

import styles from '../navbar.module.scss'
import { RoleE } from 'enum/roleE'
import Timer from '../../Timer/Timer'

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
  const [isChatOpen, { on, off }] = useBoolean()
  const studentBonus = useSelector((state: RootState) => state.bonuses.studentBonus)
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
                    <NavLink key={index} to={path} className={isActive}>
                      <div className={styles.navIconContainer}>
                        <div className={styles.navIcon}>{icon}</div>
                      </div>
                    </NavLink>
                  </Tooltip>
                ) : (
                  <>
                    <Tooltip title={'Чаты'} arrow placement={'right'}>
                      <div className={`${styles.chatIcon}`} onClick={off} style={{ outline: 'none', padding: '0 10px' }}>
                        {Number(unRead) > 0 ? (
                          <Badge badgeContent={unRead} color="error">
                            <IconSvg width={50} height={50} viewBoxSize="0 0 50 50" path={chatIconPath} className={styles.navIcon} />
                          </Badge>
                        ) : (
                          <IconSvg width={50} height={50} viewBoxSize="0 0 50 50" path={chatIconPath} className={styles.navIcon} />
                        )}
                      </div>
                    </Tooltip>
                  </>
                ),
              )}

            {/* Иконка Telegram для связи с техподдержкой для всех ролей, кроме Unknown */}
            {userRole !== RoleE.Unknown && (
              <Tooltip title={'Связаться с техподдержкой'} arrow placement={'right'}>
                <a key={'techsupport'} href={'https://t.me/coursehub_admin'} target="_blank" rel="noreferrer" style={{ padding: '0 10px' }}>
                  <div style={{ transform: 'scale(1.1)', transformOrigin: 'center center' }}>
                    <IconSvg width={60} height={60} viewBoxSize="0 0 50 50" path={tgNavPath} className={styles.navIcon} />
                  </div>
                </a>
              </Tooltip>
            )}

            {userRole === RoleE.Student && (
              <React.Fragment>
              </React.Fragment>
            )}

            
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
