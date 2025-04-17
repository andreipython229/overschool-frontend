import { Button } from '../../../components/common/Button/Button'
import register from '../../../assets/img/createProject/register.png'
import register2 from '../../../assets/img/createProject/register2.png'
import firstStep from '../../../assets/img/createProject/firstStep.png'
import secondStep from '../../../assets/img/createProject/secondStep.png'
import { headerUserRoleName } from '../../../config/headerUserRoleName'
import { useAppSelector } from '../../../store/hooks'
import {selectUser} from '../../../selectors'
import { Path } from 'enum/pathE'
import { generatePath, useNavigate } from 'react-router-dom'
import {logo} from "../../../assets/img/common";
import styles from '../HelpPage.module.scss'

export const HelpSchoolPage = () => {
   const {role} = useAppSelector(selectUser)
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
    <section className={styles.HelpCenterPage}>
      <div className={styles.init_header}>
           <a
              href={Path.InitialPage}
              className={styles.init_header_logo}
              style={{
                 textDecoration: 'none',
                 color: '#ba75ff',
                 fontWeight: 'bold',
                 padding: '0.5rem',
                 borderRadius: '10px',
              }}
            >
               <img src={logo} alt="Logotype ITOVERONE" />
               <p> IT OVERONE</p>
            </a>
            <div className={styles.header_block}>
               <Button onClick={handleHelpPage} variant={'logIn'} style={{ fontSize: '18px', fontWeight: '700' }} text={'Помощь'} />
               <Button onClick={handleLoginPage} variant={'logIn'} style={{ fontSize: '18px', fontWeight: '700' }} text={'Войти'} />
               <Button onClick={handleRegistrationUser} variant={'logIn'} style={{ fontSize: '18px', fontWeight: '700' }} text={'Создать платформу'} />
            </div>
      </div>
      <div className={styles.HelpCenterPage_FAQ}>
        <h1>Как открыть онлайн-платформу на OVERSCHOOL </h1>
        <h2>Регистрация аккаунта для онлайн-платформы</h2>
        <p>Прежде всего создадим аккаунт.<br/> Аккаунт онлайн-платформы — отдельный проект с уникальным адресом на платформе OVERSCHOOL.
         Внутри аккаунта у вас есть личный кабинет владельца, где вы можете создавать курсы и управлять платформой.<br/>
         Для регистрации введите название платформы, электронную почту, номер телефона и пароль
         <a style={{ color: '#BA75FF', fontWeight: '600' }} href="https://overschool.by/create-school/"> на официальном сайте. </a><br/>
        </p>
        <div className={styles.HelpCenterPage_FAQ_images}>
          <img src={register} alt="Создать проект" className={styles.HelpCenterPage_FAQ_images_firstStep} />
        </div>
        <br/><br/>
        <h2>Как войти в свой аккаунт</h2>
        <p> После регистрации аккаунта вы попадаете на главную страницу сайта. Для входа на страницу созданной онлайн-платформы
            нажмите на кнопку &quot;Войти&quot; в правом верхнем углу страницы.
        </p>
        <div className={styles.HelpCenterPage_FAQ_images}>
          <img src={register2} alt="Главнвя страница" className={styles.HelpCenterPage_FAQ_images_firstStep} />
        </div>
        <p>
           Для входа потребуется ввести электронную почту и пароль, котрые вы указали при регистрации платформы.
           Вы сразу попадёте на учебный портал, где сможете собирать курсы и продавать клиентам.
        </p>

      </div>
      <div className={styles.HelpCenterPage_banner}>
        <div className={styles.HelpCenterPage_banner_createProject}>
          <h1>Создайте свой проект на OVERSCHOOL прямо сейчас!</h1>
          <p>Попробуйте весь функционал в процессе использования и познай, насколько он удобен</p>
          <Button onClick={handleRegistrationUser} text={'Создать проект'} variant={'create'} />
        </div>
        <div className={styles.HelpCenterPage_banner_images}>
          <img src={firstStep} alt="Создать проект" className={styles.HelpCenterPage_banner_images_firstStep} />
          <img src={secondStep} alt="Создать проект" className={styles.HelpCenterPage_banner_images_secondStep} />
        </div>
      </div>
    </section>
  )
}
