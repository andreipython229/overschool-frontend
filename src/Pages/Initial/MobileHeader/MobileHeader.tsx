// import { FC, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { logoHeader, MenuIcon, CloseIcon, Personal, HelpIcon } from "../../../assets/img/common/index";
// import styles from "./mobileHeader.module.scss";
// import { ReactComponent as StatusUp } from '../../../assets/img/common/status-up.svg';
// import { ReactComponent as Book } from '../../../assets/img/common/book.svg';
// import { ReactComponent as Security } from '../../../assets/img/common/security.svg';
// import { ReactComponent as Timer } from '../../../assets/img/common/timer.svg';
// import { ReactComponent as ChatIcon } from '../../../assets/img/common/chat1.svg';
// import { ReactComponent as MedalStar } from '../../../assets/img/common/medal-star.svg';

// export const MobileHeader: FC = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isPlatformOpen, setIsPlatformOpen] = useState(false);
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const togglePlatformMenu = () => {
//     setIsPlatformOpen(!isPlatformOpen);
//   };

//   const toggleLoginMenu = () => {
//     setIsLoginOpen(!isLoginOpen);
//   };

//   return (
//     <header className={`${styles.mobile_header} ${menuOpen ? styles.menu_open : ""}`}>
//       <div className={styles.header_container}>
//         <div className={styles.logo} onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
//           <img src={logoHeader} alt="Logotype" />
//         </div>

//         <div className={`${styles.nav_links} ${menuOpen ? styles.hidden : ""}`}>
//           <div className={`${styles.nav_item} ${isPlatformOpen ? styles.active : ''}`} onClick={togglePlatformMenu}>
//             Платформа
//             {isPlatformOpen ? (
//               <span>▼</span>
//             ) : (
//               <span>▲</span>
//             )}
//             {isPlatformOpen && (
//               <div className={styles.submenu}>
//                 <a href="#">
//                   <StatusUp className={styles.icon} />
//                   <h5>Для начинающих экспертов</h5>
//                 </a>
//                 <a href="#">
//                   <Book className={styles.icon} />
//                   <h5>Для онлайн школ</h5>
//                 </a>
//                 <a href="#">
//                   <Security className={styles.icon} />
//                   <h5>Для обучения персонала</h5>
//                 </a>
//                 <a href="#">
//                   <Timer className={styles.icon} />
//                   <h5>Возможности</h5>
//                 </a>
//                 <a href="#">
//                   <ChatIcon className={styles.icon} />
//                   <h5>Отзывы пользователей</h5>
//                 </a>
//                 <a href="#">
//                   <MedalStar className={styles.icon} />
//                   <h5>Партнёрская программа</h5>
//                 </a>

//                 <div className={styles.Line}></div>

//                 <a href="#" className={styles.personal}>
//                   <h5>Тарифы</h5>
//                   <img src={Personal} alt="Personal" className={styles.icon} />
//                 </a>
//                 <a href="#" className={styles.personal}>
//                   <h5>Помощь</h5>
//                   <img src={HelpIcon} alt="HelpIcon" className={styles.icon} />
//                 </a>

//               </div>
//             )}
//           </div>
//           <div className={`${styles.nav_item} ${isLoginOpen ? styles.active : ''}`} onClick={toggleLoginMenu}>
//             Войти
//             {isLoginOpen && (
//               <div className={`${styles.submenu} ${styles.login}`}>
//                 <button>
//                   Создать платформу
//                 </button>
//                 <button>
//                   Вход
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className={styles.menu_icon} onClick={toggleMenu}>
//           {menuOpen ? (
//             <img src={CloseIcon} alt="Close menu" width={22} height={16} />
//           ) : (
//             <img src={MenuIcon} alt="Open menu" width={22} height={16} />
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };
