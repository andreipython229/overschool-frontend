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
      if (data?.tariff && data?.owner) {
        schoolTariffPlan(data?.tariff);
        localStorage.setItem("schoolTariff", data.tariff);
        localStorage.setItem("owner", data.owner.toString());
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
        <Link className={styles.wrapper_linksBlock_link_tariff} to={`${FooterPath.TariffPlans}`}>
          Тарифы
        </Link>
        <Link className={styles.wrapper_linksBlock_link_mobile} to={`${FooterPath.PWA}`}> 
          Мобильное приложение
        </Link>
      </nav>
      <div className={styles.wrapper_appName}>
        <strong>OVERSCHOOL</strong>
      </div>
      <div className={styles.wrapper_social}>@{currentYear}, все права защищены</div>
      <div className={styles.wrapper_requisites}>
        <p> ООО Оверван </p>
        <p>г. Минск ул. Сурганова 43-508</p>
        <p>р/с BY55 ALFA 3012 2639 1200 1027 0000 в ЗАО Альфа-Банк,</p>
        <p>БИК ALFABY2X</p>
        <p>УНП 193417722</p>
        <p> e-mail: it@overone.by </p>
      </div>
    </footer>
  )
}
