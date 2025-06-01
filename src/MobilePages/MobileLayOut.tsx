import { Outlet, useNavigate } from 'react-router-dom'
import { FC, memo, useEffect, useState } from 'react'

import { MobileNavbar } from 'components/Navbar/MobileNavbar/MobileNavbar'
import { Previous } from '../components/Previous/Previous'
// import { Header } from 'components/Header/Header'
import { useAppSelector } from '../store/hooks'
import { authSelector, schoolSelector, selectUser } from '../selectors'
import { useFetchSchoolHeaderQuery } from '../api/schoolHeaderService'
import { Path } from '../enum/pathE'

import styles from '../components/MainLayout/mainLayOut.module.scss'
// import MobileChatGPT from '../components/ChatGPT'
import { useBoolean as useBooleanHook } from '../customHooks'
import { useLazyFetchStudentsGroupQuery } from '../api/studentsGroupService'
import { FooterMobile } from 'components/Footer/index_mobile'
import { Footer } from 'components/Footer'
import { MobileHeaderAdmin } from '../Pages/Initial/MobileHeaderAdmin/MobileHeaderAdmin'
// import { MobileHeaderАuthorized } from '../Pages/Initial/MobileHeaderАuthorized/MobileHeaderАuthorized'

import { motion } from 'framer-motion'
import ChatGPT from '../components/ChatGPT'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

export const MobileLayOut: FC = memo(() => {
  const isLogin = useAppSelector(authSelector)

  const navigate = useNavigate()
  const { schoolName, headerId } = useAppSelector(schoolSelector)

  const { role: userRole } = useAppSelector(selectUser)
  const { data, isSuccess } = useFetchSchoolHeaderQuery(Number(headerId))
  const [getGroups, { data: allGroups }] = useLazyFetchStudentsGroupQuery()
  const [showChat, setShowChat] = useState<boolean>(false)
  const [showOverAI, setShowOverAI] = useState<boolean>(false)
  const [overaiLockExists, setOveraiLockExists] = useState(false)
  const [toggle, handlers] = useBooleanHook()
  const [currentTariff, setCurrentTariff] = useState<any | null>(null)
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState<boolean>(true)

  // Функция для переключения состояния навбара
  const toggleNavbar = () => {
    setIsNavbarCollapsed(prev => !prev);
  }

  useEffect(() => {
    if (userRole === 1) {
      console.log('Fetching groups for user role 1:', { schoolName })
      getGroups(schoolName)
    }
  }, [userRole, schoolName, getGroups])

  useEffect(() => {
    if (userRole === 1 && allGroups && allGroups.results) {
      const hasOveraiLock = allGroups.results.some(group => group.group_settings && group.group_settings.overai_lock)
      console.log('Checking overaiLock:', { 
        userRole, 
        hasGroups: !!allGroups, 
        hasResults: !!allGroups?.results,
        hasOveraiLock 
      })
      setOveraiLockExists(hasOveraiLock)
    }
  }, [userRole, allGroups])

  useEffect(() => {
    const currentPath = window.location.pathname
    const isInitialPage = currentPath === Path.InitialPage
    const isLoggingOut = currentPath.includes('logout')
    const isPublicRoute = [
      Path.InitialPage,
      Path.ChooseSchool,
      '/personal-data-treatment-policy',
      '/cookie-policy',
      '/cookie-policy-disclaimer',
      '/personal-data-processing',
      '/public-offer-agreement',
      '/pwa',
      '/agreement'
    ].some(path => currentPath.includes(path))

    if (!isLogin && !isInitialPage && !isLoggingOut && !isPublicRoute) {
      navigate(Path.InitialPage, { replace: true })
    }
  }, [isLogin, navigate])

  useEffect(() => {
    const shouldShowChat = !!(userRole === 2 || userRole === 3 || userRole === 4 || userRole === 5 || userRole === 6 || (userRole === 1 && overaiLockExists))
    console.log('Chat visibility check:', {
      userRole,
      overaiLockExists,
      shouldShowChat,
      isSuccess,
      data: !!data,
      conditions: {
        isRole2: userRole === 2,
        isRole3: userRole === 3,
        isRole4: userRole === 4,
        isRole5: userRole === 5,
        isRole6: userRole === 6,
        isRole1WithLock: userRole === 1 && overaiLockExists
      }
    })
    setShowChat(shouldShowChat)

    if (isSuccess) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']")

      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.getElementsByTagName('head')[0].appendChild(link)
      }
      data?.favicon_url ? (link.href = data?.favicon_url) : (link.href = '../public/favicon.ico')
    }
  }, [data, isSuccess, userRole, overaiLockExists])

  const updateTariff = (tariff: any) => {
    setCurrentTariff(tariff)
  }

  // Адаптируем стиль для контента
  const mainStyle = {
    paddingBottom: '40px'
  };

  // Стили для кнопки-ярлыка
  const toggleButtonStyle = {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '30px',
    height: '15px',
    borderRadius: '15px 15px 0 0', // Оставляем закругление только для кнопки
    backgroundColor: 'rgba(30, 30, 40, 0.5)', // Такой же цвет как у навбара
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)', // Для поддержки Safari
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.3)', // Усиленная тень
    zIndex: 9999,
    display: showOverAI ? 'none' : 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    bottom: isNavbarCollapsed ? '0' : '70px',
    transition: 'bottom 0.3s ease, transform 0.2s ease',
    border: '1px solid rgba(255, 255, 255, 0.1)', // Более тонкая и менее заметная граница
  } as React.CSSProperties;

  // Стили для иконок в кнопке-ярлыке
  const iconStyle = {
    color: 'rgba(50, 50, 60, 0.9)', // Темный цвет вместо белого, соответствует иконкам в навбаре
    fontSize: '12px',
    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))' // Тень для иконки
  } as React.CSSProperties;

  // Функция для эффекта нажатия
  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLDivElement;
    target.style.transform = 'translateX(-50%) scale(0.95)';
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLDivElement;
    target.style.transform = 'translateX(-50%)';
  };

  return (
    <motion.div
      className={`${styles.wrapper} ${isNavbarCollapsed ? styles.navbarCollapsed : ''}`}
      initial={{
        x: -2000,
      }}
      animate={{
        x: 0,
        y: 0,
      }}
      transition={{
        ease: 'easeInOut',
        duration: 0.4,
      }}
    >
      <main className={`${styles.main} ${isNavbarCollapsed ? styles.mainWithCollapsedNavbar : ''}`} style={mainStyle}>
        <Previous />
        <Outlet />
        <MobileHeaderAdmin />
        {/* Временно используется только MobileHeaderAdmin для всех ролей
        {userRole === RoleE.Admin ? (
          <MobileHeaderAdmin />
        ) : (
          <MobileHeaderАuthorized />
        )}
        */}
      </main>

      {showChat && isSuccess && <ChatGPT isDialogOpen={showOverAI} setIsDialogOpen={setShowOverAI} />}
      <FooterMobile schoolTariffPlan={updateTariff} />
      <nav className={`${styles.mobileFooter} ${isNavbarCollapsed ? styles.collapsed : ''}`}>
        <MobileNavbar isCollapsed={isNavbarCollapsed} toggleCollapse={toggleNavbar} />
      </nav>
      
      {/* Независимая кнопка-ярлык для переключения навбара, скрывается при открытом чате AI */}
      <div 
        onClick={toggleNavbar}
        style={toggleButtonStyle}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {isNavbarCollapsed ? (
          <KeyboardArrowUpIcon style={iconStyle} />
        ) : (
          <KeyboardArrowDownIcon style={iconStyle} />
        )}
      </div>
    </motion.div>
  )
})
