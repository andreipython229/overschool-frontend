import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoHeader, MenuIcon, CloseIcon } from "../../../assets/img/common/index";
import styles from "./MobileHeaderAdmin.module.scss";
import Social from '../../../components/common/IconSvg/SocialIcon';
import Telegram from '../../../components/common/IconSvg/TelegramIcon';
import Instagram from '../../../components/common/IconSvg/InstagramIcon';
import X from '../../../components/common/IconSvg/XIcon';
import Youtube from '../../../components/common/IconSvg/YoutubeIcon';
import VK from '../../../components/common/IconSvg/VKIcon';
import Social_meniu from '../../../components/common/IconSvg/Social_meniu_Icon';
import Profile from '../../../components/common/IconSvg/ProfileIcon';
import Tariff from '../../../components/common/IconSvg/TariffIcon';
import Exit from '../../../components/common/IconSvg/ExitIcon';
import MessageIcon from '../../../components/common/IconSvg/MessageIcon';

export const MobileHeaderAdmin: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSocialOpen, setIsPlatformOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isTariffOpen, setIsTariffOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const togglePlatformMenu = () => {
    setIsPlatformOpen(!isSocialOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleMessageMenu = () => {
    setIsMessageOpen(!isMessageOpen);
  };

  const toggleTariffMenu = () => {
    setIsTariffOpen(!isTariffOpen);
  };

  return (
    <header className={`${styles.mobile_header} ${styles.authorized} ${menuOpen ? styles.menu_open : ""}`}>
      <div className={styles.header_container}>
        <div className={styles.logo} onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <img src={logoHeader} alt="Logotype" />
        </div>

        <div className={`${styles.nav_links} ${menuOpen ? styles.hidden : ""}`}>
          <div className={`${styles.nav_item} ${styles.social} ${isSocialOpen ? styles.active : ''}`} onClick={togglePlatformMenu}>
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

          <div className={`${styles.nav_item} ${styles.tariff} ${isTariffOpen ? styles.active : ''}`} onClick={toggleTariffMenu}>
            <Tariff className={styles.item_icon} />
            {isTariffOpen && (
              <div className={`${styles.submenu} ${styles.tariff}`}>
                <div className={styles.tariff_title}>
                  Тариф «Senior» 200 дней
                </div>
                <div className={styles.tariff_text}>
                  Курсов:<span>10/50</span>
                </div>
                <div className={styles.tariff_text}>
                  Сотрудников:<span>3/безлимит</span>
                </div>
                <div className={styles.tariff_text}>
                  Студентов:<span>20/500</span>
                </div>
                <div className={styles.tariff_text}>
                  Студентов в месяц:<span>20/100</span>
                </div>
                <div className={styles.tariff_button}>
                  Перейти на тариф
                  <img src={require("../../../assets/img/common/prizePersonal.png")}alt="Окно входа"/>
                </div>
              </div>
            )}
          </div>

          <div className={`${styles.nav_item} ${styles.message} ${isMessageOpen ? styles.active : ''}`} onClick={toggleMessageMenu}>
            <MessageIcon className={styles.item_icon} />
            {isMessageOpen && (
              <div className={`${styles.submenu} ${styles.message}`}>
                <a href="#">
                  Отправить сообщение студентам в телеграм
                </a>
              </div>
            )}
          </div>
          <div className={`${styles.nav_item} ${styles.profile_item} ${isProfileOpen ? styles.active : ''}`} onClick={toggleProfileMenu}>
            <Profile className={styles.item_icon} />
            {isProfileOpen && (
              <div className={`${styles.submenu} ${styles.profile}`}>
                <button>
                  Открыть профиль
                </button>
                <button>
                  Смена школы
                </button>
                <button>
                  Каталог
                </button>
              </div>
            )}
          </div>

          <div className={styles.nav_item}>
            <Exit className={styles.item_icon} />
          </div>
        </div>

        <div className={styles.menu_icon} onClick={toggleMenu}>
          {menuOpen ? (
            <img src={CloseIcon} alt="Close menu" width={22} height={16} />
          ) : (
            <img src={MenuIcon} alt="Open menu" width={22} height={16} />
          )}
        </div>
      </div>
    </header>
  );
};
