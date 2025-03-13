import { generatePath, useNavigate } from 'react-router-dom'
import { Path } from '../../../enum/pathE'
import styles from '../HelpPagesCommon.module.scss'
import mainHelpStyles from '../HelpPage.module.scss'
import { Button } from '../../../components/common/Button/Button'
import { InitPageHeader } from '../../Initial/newInitialPageHeader'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { ArrowLeftIconPath } from '../../../assets/Icons/svgIconPath'
import { Footer } from '../../../components/Footer/index'

export const HelpDomainLink = () => {
  const navigate = useNavigate()

  const handleHelpPage = () => {
    navigate(generatePath(Path.HelpPage))
  }

  const handleLoginPage = () => {
    navigate(generatePath(Path.LoginPage))
  }

  const handleRegistrationUser = () => {
    navigate(generatePath(Path.CreateSchool))
  }
  return (
    <div className={`${mainHelpStyles.helpPage} ${styles.helpPage}`}>
      <div className={mainHelpStyles.bg}>
        <div className={mainHelpStyles.bg_wrap1}></div>
        <div className={mainHelpStyles.bg_wrap2}></div>
        <div className={mainHelpStyles.bg_wrap3}></div>
        <div className={mainHelpStyles.bg_wrap4}></div>
      </div>

      <InitPageHeader />

      <div className={styles.sections}>
        <div className={styles.section}>
          <div className={styles.help_title_container}>
            <div onClick={handleHelpPage} className={styles.back_btn}>
              <IconSvg path={ArrowLeftIconPath} viewBoxSize="0 0 9 14" height={24} width={18} />
            </div>
            <p>Как открыть онлайн-платформу на Course Hub</p>
            <div></div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.text_part}>
            <div className={styles.section_title}>
              <div className={styles.section_number}>1</div>
              <h3 className={styles.section_title_text}>Регистрация аккаунта для онлайн-платформы</h3>
            </div>
            <p className={styles.section_text}>{`Прежде всего создадим аккаунт.`}</p>
            <p className={styles.section_text}>{`Аккаунт онлайн-платформы — отдельный проект
                    с уникальным адресом на  платформе Course Hb.`}</p>
            <p
              className={styles.section_text}
            >{`Внутри аккаунта у вас есть личный кабинет  владельца, где вы можете создавать курсы и управлять платформой.`}</p>
            <p
              className={styles.section_text}
            >{`Для регистрации введите название платформы, электронную почту, номер телефона и пароль на официальном сайте.`}</p>
          </div>
          <div className={styles.img_part}>
            <img src={require('../../../assets/img/help/login.png')} alt="Окно входа" />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.img_part}>
            <img src={require('../../../assets/img/help/login_btn.png')} alt="Кнопка входа" />
          </div>
          <div className={styles.text_part}>
            <div className={styles.section_title}>
              <div className={styles.section_number}>2</div>
              <h3 className={styles.section_title_text}>Как войти в свой аккаунт</h3>
            </div>
            <p className={styles.section_text}>{`После регистрации аккаунта вы попадаете на главную страницу сайта. Для  входа на страницу созданной
                             онлайн-платформы нажмите на кнопку "Войти" в  правом верхнем углу страницы.`}</p>
            <p className={styles.section_text}>
              {`Для входа потребуется ввести электронную почту
                        и пароль, котрые вы  указали при регистрации платформы. Вы сразу попадёте на учебный портал,
                        где сможете собирать курсы и продавать клиентам.`}
            </p>
          </div>
        </div>
      </div>

      <div className={mainHelpStyles.ctaBlock}>
        <div className={mainHelpStyles.ctaText}>
          <h2>Создайте свой проект на Course Hub прямо сейчас!</h2>
          <p>Попробуйте весь функционал в процессе использования и узнайте, как удобно работать на нашей платформе.</p>
          <Button text="Попробовать бесплатно" variant="newLeaveRequest" onClick={handleRegistrationUser} />
        </div>
        <div className={mainHelpStyles.ctaImage}>
          <img src={require('../../../assets/img/common/cta-image.png')} alt="CTA-изображение" />
        </div>
      </div>

      <Footer />
    </div>
  )
}
