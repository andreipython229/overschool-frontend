import { Link, useParams } from 'react-router-dom'
import { FC } from 'react'
import { FooterPath, Path } from 'enum/pathE'
import { footerlogo, locationfooter, mailfooter, line } from '../../assets/img/common/index'
import { useFetchSchoolQuery } from 'api/schoolService'
import { useAppSelector } from 'store/hooks'
import { schoolSelector } from '../../selectors'
import styles from './footer_mobile.module.scss'
import { FooterSection } from './FooterSection/FooterSection';
import { mailIconPath, phoneIconPath } from 'config/commonSvgIconsPath';
import { IconSvg } from 'components/common/IconSvg/IconSvg';
interface IFooter {
  schoolTariffPlan?: (tariff: any) => void
}

export const FooterMobile: FC<IFooter> = ({ schoolTariffPlan }) => {
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
  const { school_name } = useParams<{ school_name?: string }>();
  const defaultSchoolName = school_name || "Coursehub";
  const { schoolId } = useAppSelector(schoolSelector)
  const { data } = useFetchSchoolQuery(Number(schoolId))
  const offerUrl = data?.offer_url;

  return (
    <footer className={styles.wrapper}>
      <div className={styles.wrapper_box}>
        <FooterSection title="COURSEHUB">
          <p>Возможности</p>
          <Link to={FooterPath.TariffPlans}><p>Тарифы</p></Link>
          <Link to={FooterPath.HelpPage} style={{ marginBottom: '20px' }}><p>Помощь</p></Link>
        </FooterSection>
        <FooterSection title="СОЦ.СЕТИ">
          <p>Instagram</p>
          <a href="https://t.me/@course_hb" target="_blank" rel="noopener noreferrer" style={{ marginBottom: '20px' }}>
            <p>Telegram</p>
          </a>
        </FooterSection>
        <FooterSection title="ПОЛЬЗОВАТЕЛЯМ">
          <Link to={`/school/${defaultSchoolName}/${FooterPath.CookiePolicy}`}>
            <p>Политика в отношении обработки cookie</p>
          </Link>
          <Link to={`/school/${defaultSchoolName}/${FooterPath.PersonalDataTreatmentPolicy}`}>
            <p>Политика обработки персональных данных</p>
          </Link>
          <Link to={`/school/${defaultSchoolName}/${FooterPath.CookiePolicyDisclaimer}`}>
            <p>Отказ в отношении обработки cookie</p>
          </Link>
          <Link to={`/school/${defaultSchoolName}/${FooterPath.PersonalDataProcessing}`}>
            <p>Отзыв согласия обработки персональных данных</p>
          </Link>
          {offerUrl ? (
            <a href={offerUrl} target="_blank" rel="noopener noreferrer" style={{ marginBottom: '20px' }}>
              <p>Публичный договор оферты</p>
            </a>
          ) : (
            <Link to={`/school/${defaultSchoolName}/${FooterPath.PublicOfferAgreement}`} style={{ marginBottom: '20px' }}>
              <p>Публичный договор оферты</p>
            </Link>
          )}
        </FooterSection>
        <div className={styles.wrapper_box_contact}>
          <h1>ПОЧТА</h1>
          <div className={styles.wrapper_box_contact_pack} style={{ marginBottom: '20px' }}>
            <IconSvg path={mailIconPath} viewBoxSize="0 0 15 14" width={15} height={14} />
            <a href="mailto:admin@coursehb.ru" type="email">
              {' '}
              admin@coursehb.ru
            </a>
          </div>
        </div>
        <div className={styles.wrapper_box_contact} style={{ marginBottom: '20px' }}>
          <h1>НОМЕР</h1>
          <div className={styles.wrapper_box_contact_pack} style={{ marginBottom: '0' }}>
            <IconSvg path={phoneIconPath} viewBoxSize="0 0 12 12" width={15} height={14} />
            <a href="tel:+375292532151" type="tel">
              {' '}
              +375 (29) 253 21 51{' '}
            </a>
          </div>
        </div>
      </div>
      <div style={{ width: '100%' }}>
        <img src={line} alt="line" style={{ width: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ width: '100%' }}>
        <p className={styles.footer_ptext}>© 2024, ООО &quot;Курсхаб&quot;. Все права защищены.</p>
      </div>

    </footer>
  )
}
