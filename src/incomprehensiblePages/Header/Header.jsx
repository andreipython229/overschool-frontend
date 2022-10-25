import { logo } from '../../assets/img/common/index'

import styles from './Header.module.scss'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__links}>
          <img className={styles.header__logo} src={logo} alt="logo" />
          <a className={styles.header__link} href="#">
            О платформе
          </a>
          <a className={styles.header__link} href="#">
            Тарифы
          </a>
          <a className={styles.header__link} href="#">
            Справочный цент
          </a>
        </div>
        <div className={styles.header__btns}>
          <a className={`${styles.header__login} ${styles.header__btn}`} href="/">
            Вход
          </a>
          <a className={`${styles.header__regist} ${styles.header__btn}`} href="/">
            Регистрация
          </a>
        </div>
      </div>
    </header>
  )
}
