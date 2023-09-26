import { Link } from 'react-router-dom'

import { Path, FooterPath, SettingsPath } from 'enum/pathE'

import styles from './footer.module.scss'

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.wrapper}>
      <nav className={styles.wrapper_linksBlock}>
        <Link className={styles.wrapper_linksBlock_link} to={`${Path.Settings}`}>
          Договор
        </Link>
        <Link className={styles.wrapper_linksBlock_link} to={`${Path.PersonalDataTreatmentPolicy}`}>
          Политика обработки персональных данных
        </Link>
        <Link className={styles.wrapper_linksBlock_link} to={`${Path.HelpCenterForAdmin}`}>
          Справочный центр
        </Link>
        <Link className={styles.wrapper_linksBlock_link} to={`${FooterPath.TariffPlans}`}>
          Тарифы
        </Link>
      </nav>
      <div className={styles.wrapper_appName}>
        <strong>OVERSCHOOL</strong>
      </div>
      <div className={styles.wrapper_social}>@{currentYear}, все права защищены</div>
    </footer>
  )
}
