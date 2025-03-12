import { Link } from 'react-router-dom'
import { FC } from 'react'
import { FooterPath } from 'enum/pathE'
import { footerlogo, locationfooter, mailfooter, line } from '../../assets/img/common/index'

import styles from './footer.module.scss'
interface IFooter {
  schoolTariffPlan?: (tariff: any) => void
}

export const Footer: FC<IFooter> = ({ schoolTariffPlan }) => {
  // ******** НЕ ИСПОЛЬЗУЕТСЯ ЭТОТ ФУНКЦИОНАЛ ЗАКОММЕНТИРОВАЛ **********

  // const currentYear = new Date().getFullYear()
  // const { schoolId } = useAppSelector(schoolSelector)
  // const { data } = useFetchSchoolQuery(Number(schoolId))
  // const [agreementUrl, setAgreementUrl] = useState<string>('')

  // useEffect(() => {
  //   if (data) {
  //     setAgreementUrl(data?.offer_url)
  //   }
  // }, [data])

  // ****************************

  return (
    <footer className={styles.wrapper}>
      <div className={styles.wrapper_img}>
        <img src={footerlogo} alt="footerlogo" />
      </div>
      <div style={{ width: '100%' }}>
        <img src={line} alt="line" style={{ width: '100%', objectFit: 'cover' }} />
      </div>
      <div className={styles.wrapper_box}>
        <div className={styles.wrapper_box_contact}>
          <h1>КОНТАКТЫ</h1>
          {/* ********* !!!!!!!!! ******** НЕ УДАЛЯТЬ ****** !!!!! ***** */}

          {/* <div className={styles.wrapper_box_contact_pack}>
            <img src={callfooter} alt="callfooter" />
            <a href="tel:+375292532151" type="tel">
              {' '}
              +375 (29) 253 21 51{' '}
            </a>
          </div> */}

          {/* *********************************** */}
          <div className={styles.wrapper_box_contact_pack}>
            <img src={mailfooter} alt="mailfooter" />
            <a href="mailto:admin@coursehb.ru" type="email">
              {' '}
              admin@coursehb.ru
            </a>
          </div>
          <div className={styles.wrapper_box_contact_pack}>
            <img src={locationfooter} alt="locationfooter" />
            <p>
              {' '}
              220013, Республика Беларусь,
              <br /> г. Минск, ул.Некрасова, д. 5,
              <br />
              оф. 511.
            </p>
          </div>
        </div>
        <div className={styles.wrapper_box_directions}>
          <h1>Направления</h1>
          <p>Возможности</p>
          <Link className={styles.wrapper_box_directions_link} to={`${FooterPath.TariffPlans}`}>
            <p>Тарифы</p>
          </Link>
          <Link className={styles.wrapper_box_directions_link} to={`${FooterPath.HelpPage}`}>
            <p>Помощь</p>
          </Link>
        </div>
        <div className={styles.wrapper_box_networks}>
          <h1>СОЦ.СЕТИ</h1>
          <p>Instagram</p>
          <p>Вконтакте</p>
          <a href="https://t.me/@course_hb" target="_blank" rel="noopener noreferrer">
            <p>Telegram</p>
          </a>
        </div>
        <div className={styles.wrapper_box_users}>
          <h1>ПОЛЬЗОВАТЕЛЯМ</h1>
          <p>Политика в отношении обработки cookie</p>
          <p>Политика обработки персональных данных</p>
          <p>Отказ в отношении обработки cookie</p>
          <p>Отзыв согласия обработки персональных данных</p>
        </div>
      </div>
    </footer>
  )
}
