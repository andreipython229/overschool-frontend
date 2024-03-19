import { Link } from 'react-router-dom'
import { useEffect, useState, FC } from "react"

import { Path, FooterPath, SettingsPath } from 'enum/pathE'
import { useFetchSchoolQuery } from 'api/schoolService'

import styles from './footer.module.scss'

interface FooterProps {
  schoolTariffPlan: (tariffPlan: string) => void;
}


export const Footer: FC<FooterProps> = ({ schoolTariffPlan }) => {

  const currentYear = new Date().getFullYear();
  const schoolId = localStorage.getItem("school_id");
  const { data } = useFetchSchoolQuery(Number(schoolId));
  const [agreementUrl, setAgreementUrl] = useState<string>('');

  useEffect(() => {
    if (data) {
      setAgreementUrl(data?.offer_url);
      if (data?.tariff) {
        schoolTariffPlan(data?.tariff);
        localStorage.setItem("schoolTariff", data.tariff);
      }
    }
  }, [data])

  return (
    <footer className={styles.wrapper}>
      <nav className={styles.wrapper_linksBlock}>
        {agreementUrl ? <a href={agreementUrl} className={styles.wrapper_linksBlock_link}>Договор</a>
        : <Link className={styles.wrapper_linksBlock_link} to={`${FooterPath.Agreement}`}>
            Договор
          </Link>}
        <Link className={styles.wrapper_linksBlock_link} to={`${FooterPath.PersonalDataTreatmentPolicy}`}>
          Политика обработки персональных данных
        </Link>
        <Link className={styles.wrapper_linksBlock_link} to={`${FooterPath.TariffPlans}`}>
          Тарифы
        </Link>
        <Link className={styles.wrapper_linksBlock_link} to={`${FooterPath.PWA}`}>
          Мобильное приложение
        </Link>
      </nav>
      <div className={styles.wrapper_appName}>
        <strong>OVERSCHOOL</strong>
      </div>
      <div className={styles.wrapper_social}>@{currentYear}, все права защищены</div>
    </footer>
  )
}
