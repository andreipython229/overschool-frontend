import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logoHeader, MenuIcon, CloseIcon } from '../../../assets/img/common/index'
import styles from './MobileHeaderАuthorized.module.scss'
import Social from '../../../components/common/IconSvg/SocialIcon'
import Telegram from '../../../components/common/IconSvg/TelegramIcon'
import Instagram from '../../../components/common/IconSvg/InstagramIcon'
import X from '../../../components/common/IconSvg/XIcon'
import Youtube from '../../../components/common/IconSvg/YoutubeIcon'
import VK from '../../../components/common/IconSvg/VKIcon'
import Social_meniu from '../../../components/common/IconSvg/Social_meniu_Icon'
import Profile from '../../../components/common/IconSvg/ProfileIcon'
import Notification from '../../../components/common/IconSvg/NotificationIcon'
import Exit from '../../../components/common/IconSvg/ExitIcon'

export const MobileHeaderАuthorized: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isSocialOpen, setIsPlatformOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const togglePlatformMenu = () => {
    setIsPlatformOpen(!isSocialOpen)
  }

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  return (
    <header className={`${styles.mobile_header} ${styles.authorized} ${menuOpen ? styles.menu_open : ''}`}>
      <div className={styles.header_container}>
        <div className={styles.logo} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src={logoHeader} alt="Logotype" />
        </div>

        <div className={`${styles.nav_links} ${menuOpen ? styles.hidden : ''}`}>
          <div className={`${styles.nav_item} ${isSocialOpen ? styles.active : ''}`} onClick={togglePlatformMenu}>
            <Social_meniu className={styles.item_icon} />
            {isSocialOpen && (
              <div className={styles.submenu}>
                <a href="#">
                  <Social className={styles.icon} />
                </a>
                <a href="#">
                  <Telegram className={styles.icon} />
                </a>
                <a href="#">
                  <Instagram className={styles.icon} />
                </a>
                <a href="#">
                  <X className={styles.icon} />
                </a>
                <a href="#">
                  <Youtube className={styles.icon} />
                </a>
                <a href="#">
                  <VK className={styles.icon} />
                </a>
              </div>
            )}
          </div>

          <div className={`${styles.nav_item} ${styles.notification} ${styles.active}`}>
            <Notification className={styles.item_icon} />
            <span>1</span>
          </div>

          <div className={`${styles.nav_item} ${styles.profile_item} ${isProfileOpen ? styles.active : ''}`} onClick={toggleProfileMenu}>
            <Profile className={styles.item_icon} />
            {isProfileOpen && (
              <div className={`${styles.submenu} ${styles.profile}`}>
                <button>Открыть профиль</button>
                <button>Смена школы</button>
              </div>
            )}
          </div>

          <div className={styles.nav_item}>
            <Exit className={styles.item_icon} />
          </div>
        </div>

        <div className={styles.menu_icon} onClick={toggleMenu}>
          {menuOpen ? <img src={CloseIcon} alt="Close menu" width={22} height={16} /> : <img src={MenuIcon} alt="Open menu" width={22} height={16} />}
        </div>
      </div>
    </header>
  )
}
