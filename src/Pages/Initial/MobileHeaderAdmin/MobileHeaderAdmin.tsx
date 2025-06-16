import { FC, useState, useEffect, useRef } from "react";
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
// import MessageIcon from '../../../components/common/IconSvg/MessageIcon';
// import Notification from '../../../components/common/IconSvg/NotificationIcon';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { selectUser, schoolSelector } from '../../../selectors';
import { RoleE } from '../../../enum/roleE';
import { useLazyLogoutQuery } from 'api/userLoginService';
import { logoutState, role } from 'store/redux/users/slice';
import { clearUserProfile } from 'store/redux/users/profileSlice';
import { clearSchoolData } from 'store/redux/school/schoolSlice';
import { useCookies } from 'react-cookie';
import { Path, FooterPath } from 'enum/pathE';
import { useDispatch } from 'react-redux';
import { useFetchSchoolQuery } from '../../../api/schoolService';
import { useFetchCurrentTariffPlanQuery } from 'api/tariffPlanService';

export const MobileHeaderAdmin: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSocialOpen, setIsPlatformOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isTariffOpen, setIsTariffOpen] = useState(false);
  // const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isExitActive, setIsExitActive] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const socialMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const tariffMenuRef = useRef<HTMLDivElement>(null);

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

  // Эффект для закрытия меню по клику вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Проверяем, был ли клик вне всех открытых меню
      const clickedOutsideSocial = socialMenuRef.current && !socialMenuRef.current.contains(event.target as Node);
      const clickedOutsideProfile = profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node);
      const clickedOutsideTariff = userRole === RoleE.Admin && tariffMenuRef.current && !tariffMenuRef.current.contains(event.target as Node);

      // Проверяем, если клик был вне всех *видимых* меню
      if (
        (socialMenuRef.current === null || clickedOutsideSocial) &&
        (profileMenuRef.current === null || clickedOutsideProfile) &&
        (userRole !== RoleE.Admin || (tariffMenuRef.current === null || clickedOutsideTariff))
      ) {
        // Сбрасываем только те состояния, чьи меню были открыты
        if (isSocialOpen) setIsPlatformOpen(false);
        if (isProfileOpen) setIsProfileOpen(false);
        if (isTariffOpen) setIsTariffOpen(false);
      }
    };

    // Добавляем слушатель события клика
    document.addEventListener('mousedown', handleClickOutside);

    // Удаляем слушатель события при размонтировании компонента
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [socialMenuRef, profileMenuRef, tariffMenuRef, isSocialOpen, isProfileOpen, isTariffOpen]); // Зависимости эффекта

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const togglePlatformMenu = () => {
    setIsPlatformOpen(!isSocialOpen);
    setIsProfileOpen(false);
    setIsTariffOpen(false);
    setIsExitActive(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsPlatformOpen(false);
    setIsTariffOpen(false);
    setIsExitActive(false);
  };
  // Временно закомментирован функционал отправки сообщений студентам в телеграм, так как он специфичен и не соответствует общей модали из десктопной версии.
  // const toggleMessageMenu = () => {
  //   setIsMessageOpen(!isMessageOpen);
  // };

  const toggleTariffMenu = () => {
    setIsTariffOpen(!isTariffOpen);
    setIsPlatformOpen(false);
    setIsProfileOpen(false);
    setIsExitActive(false);
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
  // Функция смены профиля для админа и пользователей
  const goToProfile = () => {
    navigate(Path.Profile); // путь к странице профиля
    setIsProfileOpen(false);
  };

  // Обработчик клика на иконку выхода
  const handleExitClick = (/* event: React.MouseEvent<HTMLElement> */) => {
    // Активируем изменение цвета иконки для всех ролей
    setIsExitActive(!isExitActive);
    setIsPlatformOpen(false);
    setIsProfileOpen(false);
    setIsTariffOpen(false);
    
    // Выполняем выход из профиля для всех ролей при клике на иконку выхода
    logOut();
  };

  // Функция для перехода на страницу тарифных планов
  const goToTariffPlans = () => {
    navigate(FooterPath.TariffPlans);
    setIsTariffOpen(false); // Закрываем выпадающее меню тарифа после перехода
  };

  return (
    <header className={`${styles.mobile_header} ${styles.authorized} ${menuOpen ? styles.menu_open : ""}`}>
      <div className={styles.header_container}>
        <div className={styles.logo} onClick={() => navigate(generatePath(Path.Courses))} style={{ cursor: "pointer" }}>
          <img src={logoHeader} alt="Logotype" />
        </div>

        <div className={`${styles.nav_links} ${menuOpen ? styles.hidden : ""}`}>
          {(schoolData?.extra_link || schoolData?.telegram_link || schoolData?.instagram_link || schoolData?.twitter_link || schoolData?.youtube_link || schoolData?.vk_link) && (
            <div className={`${styles.nav_item} ${styles.social} ${isSocialOpen ? styles.active : ''}`} onClick={togglePlatformMenu} ref={socialMenuRef}>
            <Social_meniu className={styles.item_icon} />
            {isSocialOpen && (
              <div className={styles.submenu}>
                {schoolData?.extra_link && (
                  <a href={schoolData?.extra_link} target="_blank" rel="noopener noreferrer">
                    <Social className={styles.icon} />
                  </a>
                )}
                {schoolData?.telegram_link && (
                  <a href={schoolData?.telegram_link} target="_blank" rel="noopener noreferrer">
                    <Telegram className={styles.icon} />
                  </a>
                )}
                {schoolData?.instagram_link && (
                  <a href={schoolData?.instagram_link} target="_blank" rel="noopener noreferrer">
                    <Instagram className={styles.icon} />
                  </a>
                )}
                {schoolData?.twitter_link && (
                  <a href={schoolData?.twitter_link} target="_blank" rel="noopener noreferrer">
                    <X className={styles.icon} />
                  </a>
                )}
                {schoolData?.youtube_link && (
                  <a href={schoolData?.youtube_link} target="_blank" rel="noopener noreferrer">
                    <Youtube className={styles.icon} />
                  </a>
                )}
                {schoolData?.vk_link && (
                  <a href={schoolData?.vk_link} target="_blank" rel="noopener noreferrer">
                    <VK className={styles.icon} />
                  </a>
                )}
              </div>
            )}
          </div>
          )}

          {userRole === RoleE.Admin && (
            <div className={`${styles.nav_item} ${styles.tariff} ${isTariffOpen ? styles.active : ''}`} onClick={toggleTariffMenu} ref={tariffMenuRef}>
              <Tariff className={styles.item_icon} />
              {/* Если есть данные по тарифу и нет ошибки, показываем обычное меню тарифа */}
              {isTariffOpen && currentTariffData && !('error' in currentTariffData) && (  
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
                  <div className={styles.tariff_button} onClick={goToTariffPlans}>
                    Перейти на тариф
                    <img src={require("../../../assets/img/common/prizePersonal.png")}alt="Окно входа"/>
                  </div>
                </div>
              )}
              {/* Если тариф истёк или нет сведений, показываем альтернативное меню */}
              {isTariffOpen && (!currentTariffData || ('error' in currentTariffData)) && (
                <div className={`${styles.submenu} ${styles.tariff}`} style={{alignItems: 'center', textAlign: 'center'}}>
                  <div className={styles.tariff_title}>
                    <span style={{color: '#d32f2f', fontWeight: 600}}>Тариф истёк</span>
                  </div>
                  <div className={styles.tariff_text}>
                    <span style={{fontSize: '13px', color: '#324195'}}>Выберите тарифный план</span>
                  </div>
                  <div className={styles.tariff_button} onClick={goToTariffPlans}>
                    Перейти на тариф
                    <img src={require("../../../assets/img/common/prizePersonal.png")} alt="Окно входа"/>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Временно закомментирован функционал отправки сообщений студентам в телеграм, так как он специфичен и не соответствует общей модали из десктопной версии. */}
          {/* {userRole === RoleE.Admin && (
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
          )} */}
          

          {/* Временно закомментирован функционал уведомлений, так как он специфичен и не соответствует общей модали из десктопной версии. */}
          {/* {userRole !== RoleE.Admin && ( */}
            {/* <div
              className={`${styles.nav_item} ${styles.notification} ${isNotificationOpen ? styles.active : ''}`}
              onClick={() => setIsNotificationOpen((prev) => !prev)}
            > */}
              {/* <Notification className={styles.item_icon} /> */}
              {/* Счетчик уведомлений временно скрыт */}
              {/* <span>1</span> */}
            {/* </div> */}
          {/* )} */}

          <div className={`${styles.nav_item} ${styles.profile_item} ${isProfileOpen ? styles.active : ''}`} onClick={toggleProfileMenu} ref={profileMenuRef}>
            <Profile className={styles.item_icon} />
            {isProfileOpen && (
              <div className={`${styles.submenu} ${styles.profile}`}>
                <button onClick={goToProfile}>Открыть профиль</button>
                <button onClick={goToChooseSchool}>Смена платформы</button>
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
