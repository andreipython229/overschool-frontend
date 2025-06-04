import { FC, useState, useEffect } from "react";
import { useNavigate, generatePath } from "react-router-dom";
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
// import Notification from '../../../components/common/IconSvg/NotificationIcon';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { selectUser, schoolSelector } from '../../../selectors';
import { RoleE } from '../../../enum/roleE';
import { useLazyLogoutQuery } from 'api/userLoginService';
import { logoutState, role } from 'store/redux/users/slice';
import { clearUserProfile } from 'store/redux/users/profileSlice';
import { clearSchoolData } from 'store/redux/school/schoolSlice';
import { useCookies } from 'react-cookie';
import { Path } from 'enum/pathE';
import { useDispatch } from 'react-redux';
import { useFetchSchoolQuery } from '../../../api/schoolService';
import { useFetchCurrentTariffPlanQuery } from 'api/tariffPlanService';

export const MobileHeaderAdmin: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSocialOpen, setIsPlatformOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isTariffOpen, setIsTariffOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isExitActive, setIsExitActive] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const navigate = useNavigate();
  const { role: userRole } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const dispatchRole = useDispatch();
  const [logout] = useLazyLogoutQuery();
  const [, , removeAccessCookie] = useCookies(['access_token']);
  const [, , removeRefreshCookie] = useCookies(['refresh_token']);
  const { schoolId } = useAppSelector(schoolSelector);
  const { data: schoolData } = useFetchSchoolQuery(Number(schoolId));
  
  // Загружаем данные текущего тарифного плана
  // Используем schoolData?.name как параметр запроса
  // skip: true если schoolData?.name еще не доступен
  const { 
    data: currentTariffData,
    refetch: refetchTariff
  } = useFetchCurrentTariffPlanQuery(schoolData?.name as string, { 
    skip: !schoolData?.name 
  });

  // Эффект для повторной загрузки тарифных данных при изменении schoolId или schoolData?.name
  useEffect(() => {
    if (schoolId !== null && currentTariffData === undefined && schoolData?.name) {
      console.log('schoolId updated, currentTariffData is undefined, and schoolData?.name is available. Attempting to refetch tariff...');
      refetchTariff();
    } else if (schoolId !== null && !schoolData?.name) {
      console.log('Tariff query is likely skipped because schoolData?.name is not available. schoolId:', schoolId);
    }
  }, [schoolId, currentTariffData, refetchTariff, schoolData?.name]);

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

  // Функция для перехода к выбору профиля
  const goToChooseSchool = () => {
    dispatchRole(role(RoleE.Unknown));
    navigate(Path.ChooseSchool);
    setIsProfileOpen(false);
  };
  // // Функция смены профиля для админа и пользователей, не реализована
  //   const goToProfile = () => {
  //   navigate('/profile'); // путь к странице профиля, не реализовано
  //   setIsProfileOpen(false);
  // };

  // Функция перехода на страницу каталога (курсов) по пути path.courses
  const goToCatalog = () => {
    navigate(Path.Courses);
    setIsProfileOpen(false);
  };

  // Обработчик клика на иконку выхода
  const handleExitClick = (/* event: React.MouseEvent<HTMLElement> */) => {
    // Активируем изменение цвета иконки для всех ролей
    setIsExitActive(!isExitActive);
    
    // Выполняем выход из профиля для всех ролей при клике на иконку выхода
    logOut();
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
                <a href={schoolData?.extra_link || '#'} target={schoolData?.extra_link ? '_blank' : undefined} rel="noopener noreferrer" tabIndex={schoolData?.extra_link ? undefined : -1} aria-disabled={!schoolData?.extra_link}>
                  <Social className={styles.icon} />
                </a>
                <a href={schoolData?.telegram_link || '#'} target={schoolData?.telegram_link ? '_blank' : undefined} rel="noopener noreferrer" tabIndex={schoolData?.telegram_link ? undefined : -1} aria-disabled={!schoolData?.telegram_link}>
                  <Telegram className={styles.icon} />
                </a>
                <a href={schoolData?.instagram_link || '#'} target={schoolData?.instagram_link ? '_blank' : undefined} rel="noopener noreferrer" tabIndex={schoolData?.instagram_link ? undefined : -1} aria-disabled={!schoolData?.instagram_link}>
                  <Instagram className={styles.icon} />
                </a>
                <a href={schoolData?.twitter_link || '#'} target={schoolData?.twitter_link ? '_blank' : undefined} rel="noopener noreferrer" tabIndex={schoolData?.twitter_link ? undefined : -1} aria-disabled={!schoolData?.twitter_link}>
                  <X className={styles.icon} />
                </a>
                <a href={schoolData?.youtube_link || '#'} target={schoolData?.youtube_link ? '_blank' : undefined} rel="noopener noreferrer" tabIndex={schoolData?.youtube_link ? undefined : -1} aria-disabled={!schoolData?.youtube_link}>
                  <Youtube className={styles.icon} />
                </a>
                <a href={schoolData?.vk_link || '#'} target={schoolData?.vk_link ? '_blank' : undefined} rel="noopener noreferrer" tabIndex={schoolData?.vk_link ? undefined : -1} aria-disabled={!schoolData?.vk_link}>
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
                  {/* Отображаем название тарифа и оставшееся количество дней */}
                  <div className={styles.tariff_title}>
                    Тариф:<span> {currentTariffData?.tariff_name} {currentTariffData?.days_left} {currentTariffData?.days_left ? 'дней' : 'дней'}</span>
                  </div>
                  {/* Отображаем количество использованных/доступных курсов */}
                  <div className={styles.tariff_text}>
                    Курсов:<span>{currentTariffData?.number_of_courses}/{currentTariffData?.tariff_details?.number_of_courses || '∞'}</span>
                  </div>
                  {/* Отображаем количество использованных/доступных сотрудников */}
                  <div className={styles.tariff_text}>
                    Сотрудников:<span>{currentTariffData?.staff}/{currentTariffData?.tariff_details?.number_of_staff || '∞'}</span>
                  </div>
                  {/* Отображаем количество использованных/доступных студентов */}
                  <div className={styles.tariff_text}>
                    Студентов:<span>{currentTariffData?.students}/{currentTariffData?.tariff_details?.total_students || '∞'}</span>
                  </div>
                  {/* Отображаем количество студентов в месяц */}
                  <div className={styles.tariff_text}>
                    Студентов в месяц:<span>{currentTariffData?.tariff_details?.student_count_by_month || 0}/{currentTariffData?.tariff_details?.students_per_month || '∞'}</span>
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

          {/* {userRole !== RoleE.Admin && ( */}
            <div
              className={`${styles.nav_item} ${styles.notification} ${isNotificationOpen ? styles.active : ''}`}
              onClick={() => setIsNotificationOpen((prev) => !prev)}
            >
              {/* <Notification className={styles.item_icon} /> */}
              {/* Счетчик уведомлений временно скрыт */}
              {/* <span>1</span> */}
            </div>
          {/* )} */}

          <div className={`${styles.nav_item} ${styles.profile_item} ${isProfileOpen ? styles.active : ''}`} onClick={toggleProfileMenu}>
            <Profile className={styles.item_icon} />
            {isProfileOpen && (
              <div className={`${styles.submenu} ${styles.profile}`}>
                {/* <button onClick={goToProfile}>Открыть профиль</button>  // пункт для админа и пользователей, не реализовано */}
                <button onClick={goToChooseSchool}>Смена платформы</button>
                {userRole === RoleE.Admin && (
                   // кнопка перехода на страницу каталога (курсов) по пути path.courses
                   <button onClick={goToCatalog}> 
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
