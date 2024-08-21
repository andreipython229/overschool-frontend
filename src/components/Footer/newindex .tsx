import { Link } from 'react-router-dom'
import { useEffect, useState, FC } from 'react'

import { Path, FooterPath, SettingsPath } from 'enum/pathE'
import { useFetchSchoolQuery } from 'api/schoolService'
import { callfooter, footerlogo, locationfooter, mailfooter, line } from '../../assets/img/common/index'

import styles from './newfooter.module.scss'

interface IFooter {
  schoolTariffPlan?: (tariff: any) => void
}

export const Footer: FC<IFooter> = ({schoolTariffPlan}) => {
  const currentYear = new Date().getFullYear()
  const schoolId = localStorage.getItem('school_id')
  const { data } = useFetchSchoolQuery(Number(schoolId))
  const [agreementUrl, setAgreementUrl] = useState<string>('')


  useEffect(() => {
    if (data) {
      setAgreementUrl(data?.offer_url)
    }
  }, [data])


  return (
    <footer className={styles.wrapper}>
      <div className={styles.wrapper_img}>
        <img src={footerlogo} alt="footerlogo" />
      </div>
      <div><img src={line} alt="line" /></div>
      <div className={styles.wrapper_box}>
        <div className={styles.wrapper_box_contact}>
          <h1>КОНТАКТЫ</h1>
          <div className={styles.wrapper_box_contact_pack}>
            <img src={callfooter} alt="callfooter" /> 
            <p> +375 (33) 33 33 193 </p>
          </div>
          <div className={styles.wrapper_box_contact_pack}>
            <img src={mailfooter} alt="mailfooter" /> 
            <p> it@overone.by</p>
          </div>
          <div className={styles.wrapper_box_contact_pack}>
            <img src={locationfooter} alt="locationfooter" /> 
            <p> 220013, Республика Беларусь,<br /> г. Минск, ул. Сурганова, д.43,< br />
            оф. 508.</p>
          </div>
          
        </div>
        <div className={styles.wrapper_box_directions}>
          <h1>Направления</h1>
          <p>Возможности</p>
          <Link className={styles.wrapper_box_directions_link} to={`${FooterPath.TariffPlans}`}>
            Тарифы
          </Link>
          <Link className={styles.wrapper_box_directions_link}  to={`${FooterPath.HelpPage}`}>
            Помощь
          </Link>
        </div>
        <div className={styles.wrapper_box_networks}>
          <h1>СОЦ.СЕТИ</h1>
          <p>Instagram</p>
          <p>Вконтакте</p>
          <p>Telegram</p>
        </div>
        <div className={styles.wrapper_box_users}>
          <h1>ПОЛЬЗОВАТЕЛЯМ</h1>
          <p>Политика в отношении
          обработки cookie</p>
          <p>Политика обработки
          персональных данных</p>
          <p>Отказ в отношении
          обработки cookie</p>
          <p>Отзыв согласия обработки
          персональных данных</p>
        </div>
      </div>      
    </footer>
  )
}
