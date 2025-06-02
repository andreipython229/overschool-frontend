import { FC, useState, useEffect } from "react";
import { Link, useNavigate, generatePath } from "react-router-dom";
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
import Notification from '../../../components/common/IconSvg/NotificationIcon';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { selectUser } from '../../../selectors';
import { RoleE } from '../../../enum/roleE';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useLazyLogoutQuery } from 'api/userLoginService';
import { logoutState, role } from 'store/redux/users/slice';
import { clearUserProfile } from 'store/redux/users/profileSlice';
import { clearSchoolData } from 'store/redux/school/schoolSlice';
import { useCookies } from 'react-cookie';
import { Path } from 'enum/pathE';
import { useDispatch } from 'react-redux';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Tooltip from '@mui/material/Tooltip';

export const MobileHeaderAdmin: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSocialOpen, setIsPlatformOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isTariffOpen, setIsTariffOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isExitActive, setIsExitActive] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const navigate = useNavigate();
  const { role: userRole } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const dispatchRole = useDispatch();
  const [logout] = useLazyLogoutQuery();
  const [, , removeAccessCookie] = useCookies(['access_token']);
  const [, , removeRefreshCookie] = useCookies(['refresh_token']);
  const open = Boolean(anchorEl);

  // Добавляем обработчик клика вне меню
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (anchorEl && !anchorEl.contains(event.target as Node)) {
        handleMenuClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [anchorEl, open]);

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
  
  // Функция для выхода из системы
  const logOut = async () => {
    if (isLoggingOut) return;
    
    try {
      setIsLoggingOut(true);
      dispatch(clearUserProfile());
      dispatch(logoutState());
      dispatch(clearSchoolData());
      removeAccessCookie('access_token');
      removeRefreshCookie('refresh_token');
      localStorage.clear();
      
      await logout();
      
      setTimeout(() => {
        navigate(generatePath(Path.InitialPage), { replace: true });
        setIsLoggingOut(false);
      }, 800);
    } catch (error) {
      console.error('Logout error:', error);
      navigate(generatePath(Path.InitialPage), { replace: true });
      setIsLoggingOut(false);
    }
  };

  // Функция для перехода к выбору школы
  const goToChooseSchool = () => {
    dispatchRole(role(RoleE.Unknown));
    navigate(Path.ChooseSchool);
    setAnchorEl(null);
  };

  // Обработчик клика на иконку выхода
  const handleExitClick = (event: React.MouseEvent<HTMLElement>) => {
    // Активируем изменение цвета иконки для всех ролей
    setIsExitActive(!isExitActive);
    
    if (userRole === RoleE.Admin) {
      // Для администраторов открываем/закрываем меню при клике
      if (anchorEl) {
        setAnchorEl(null); // Закрываем меню при повторном клике
      } else {
        setAnchorEl(event.currentTarget); // Открываем меню
      }
    } else if (userRole === RoleE.Student) {
      // Для студентов сразу выполняем выход
      logOut();
    } else {
      // Для остальных ролей открываем меню как у администраторов
      if (anchorEl) {
        setAnchorEl(null);
      } else {
        setAnchorEl(event.currentTarget);
      }
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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

          {userRole === RoleE.Admin && (
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
          )}

          {userRole === RoleE.Admin && (
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
          )}

          {userRole !== RoleE.Admin && (
            <div
              className={`${styles.nav_item} ${styles.notification} ${isNotificationOpen ? styles.active : ''}`}
              onClick={() => setIsNotificationOpen((prev) => !prev)}
            >
              <Notification className={styles.item_icon} />
              {/* Счетчик уведомлений временно скрыт */}
              {/* <span>1</span> */}
            </div>
          )}

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
                {userRole === RoleE.Admin && (
                  <button>
                    Каталог
                  </button>
                )}
              </div>
            )}
          </div>

          <div 
            className={`${styles.nav_item} ${styles.exit_item} ${isExitActive ? styles.active : ''}`} 
            onClick={handleExitClick}
          >
            <Exit className={styles.item_icon} />
            <Menu
              anchorEl={anchorEl}
              id="exit-menu"
              open={open}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                  mt: 1.5,
                  bgcolor: userRole === RoleE.Admin ? 'rgba(207, 226, 255, 1)' : '#f8f6ff',
                  borderRadius: '14px',
                  '& .MuiMenuItem-root': {
                    px: 2,
                    py: 1,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'center', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
              disablePortal
              disableScrollLock
              disableRestoreFocus
              disableAutoFocus
              onBackdropClick={handleMenuClose}
            >
              <MenuItem onClick={goToChooseSchool}>
                <Link to={Path.ChooseSchool} style={{ 
                  color: userRole === RoleE.Admin ? '#324195' : '#ba75ff', 
                  textDecoration: 'none',
                  paddingLeft: userRole === RoleE.Admin ? '0' : '1rem'
                }}>
                  Вернуться к выбору платформы
                </Link>
              </MenuItem>
              <MenuItem onClick={logOut}>
                <Link to={Path.InitialPage} style={{ 
                  color: userRole === RoleE.Admin ? '#324195' : '#ba75ff', 
                  textDecoration: 'none',
                  paddingLeft: userRole === RoleE.Admin ? '0' : '1rem'
                }}>
                  Выйти из профиля
                </Link>
              </MenuItem>
            </Menu>
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
