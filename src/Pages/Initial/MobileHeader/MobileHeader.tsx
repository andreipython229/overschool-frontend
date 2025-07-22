import { FC, useState } from 'react'
import { useNavigate, generatePath } from 'react-router-dom'
import { logoHeader, MenuIcon, CloseIcon, Personal, HelpIcon } from '../../../assets/img/common/index'
import styles from './mobileHeader.module.scss'
import StatusUp from '../../../components/common/IconSvg/StatusIcon'
import Book from '../../../components/common/IconSvg/BookIcon'
import Security from '../../../components/common/IconSvg/SecurityIcon'
import Timer from '../../../components/common/IconSvg/TimerIcon'
import ChatIcon from '../../../components/common/IconSvg/ChatIcon'
import MedalStar from '../../../components/common/IconSvg/MedalStarIcon'
import TelegramIcon from '@mui/icons-material/Telegram'
import { Path } from 'enum/pathE'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { authSelector } from '../../../selectors'
import { logoutState } from '@/store/redux/users/slice'

export const MobileHeader: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isPlatformOpen, setIsPlatformOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const navigate = useNavigate()
  const isLogin = useAppSelector(authSelector)
  const dispatch = useAppDispatch()
  const telegramLink = isLogin ? 'https://t.me/course_hb' : 'https://t.me/coursehub_admin'

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const togglePlatformMenu = () => {
    setIsPlatformOpen(!isPlatformOpen)
  }

  const toggleLoginMenu = () => {
    setIsLoginOpen(!isLoginOpen)
  }

  const handleLoginPage = () => {
    navigate(generatePath(Path.LoginPage))
  }

  const handleLogout = () => {
    dispatch(logoutState())
    navigate(Path.InitialPage)
  }

  const handleChoosePlatform = () => {
    navigate(Path.ChooseSchool)
  }

  const handleRegistrationUser = () => {
    const paramsString = localStorage.getItem('utmParams')
    if (paramsString !== null) {
      const parsedParams = JSON.parse(paramsString)
      const queryParams = Object.keys(parsedParams)
        .map(key => `${key}=${parsedParams[key]}`)
        .join('&')
      const pathWithParams = `${Path.CreateSchool}?${queryParams}`
      navigate(pathWithParams)
    } else {
      navigate(Path.CreateSchool)
    }
  }

  return (
    <header className={`${styles.mobile_header} ${menuOpen ? styles.menu_open : ''}`}>
      <div className={styles.header_container}>
        <div className={styles.logo} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src={logoHeader} alt="Logotype" />
        </div>

        <div className={`${styles.nav_links} ${menuOpen ? styles.hidden : ''}`}>
          <div className={`${styles.nav_item} ${isPlatformOpen ? styles.active : ''}`} onClick={togglePlatformMenu}>
            Платформа
            {isPlatformOpen ? <span>▼</span> : <span>▲</span>}
            {isPlatformOpen && (
              <div className={styles.submenu}>
                <a href="https://coursehb.ru/dlya-nachinayushchih">
                  <StatusUp className={styles.icon} />
                  <h5>Для начинающих экспертов</h5>
                </a>
                <a href="https://coursehb.ru/dlya-online-shkol">
                  <Book className={styles.icon} />
                  <h5>Для онлайн школ</h5>
                </a>
                <a href="https://coursehb.ru/dlya-obucheniya-personala">
                  <Security className={styles.icon} />
                  <h5>Для обучения персонала</h5>
                </a>
                <a href="https://coursehb.ru/vozmozhnosti">
                  <Timer className={styles.icon} />
                  <h5>Возможности</h5>
                </a>
                <a href="https://coursehb.ru/otzyvy-platforma">
                  <ChatIcon className={styles.icon} />
                  <h5>Отзывы пользователей</h5>
                </a>
                <a href="https://coursehb.ru/partners-program">
                  <MedalStar className={styles.icon} />
                  <h5>Партнёрская программа</h5>
                </a>

                <div className={styles.Line}></div>

                <a href="/tariff-plans-info" className={styles.personal}>
                  <h5>Тарифы</h5>
                  <img src={Personal} alt="Personal" className={styles.icon} />
                </a>
                <a href="/help" className={styles.personal}>
                  <h5>Помощь</h5>
                  <img src={HelpIcon} alt="HelpIcon" className={styles.icon} />
                </a>
              </div>
            )}
          </div>
          <div className={styles.nav_item}>
            <a href={telegramLink} target="_blank" rel="noopener noreferrer">
              <TelegramIcon className={styles.icon} style={{ color: '#357EEB', width: 24, height: 24 }} />
            </a>
          </div>
          <div className={`${styles.nav_item} ${isLoginOpen ? styles.active : ''}`} onClick={toggleLoginMenu}>
            {isLogin ? 'Выйти' : 'Войти'}
            {isLoginOpen && (
              <div className={`${styles.submenu} ${styles.login}`}>
                <button onClick={isLogin ? handleChoosePlatform : handleRegistrationUser}>{isLogin ? 'Выбрать платформу' : 'Создать платформу'}</button>
                <button onClick={isLogin ? handleLogout : handleLoginPage}>{isLogin ? 'Выйти из профиля' : 'Войти в профиль'}</button>
              </div>
            )}
          </div>
        </div>

        <div className={styles.menu_icon} onClick={toggleMenu}>
          {menuOpen ? <img src={CloseIcon} alt="Close menu" width={22} height={16} /> : <img src={MenuIcon} alt="Open menu" width={22} height={16} />}
        </div>
      </div>
    </header>
  )
}
