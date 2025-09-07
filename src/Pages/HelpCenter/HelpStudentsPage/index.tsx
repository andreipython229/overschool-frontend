import { Button } from '../../../components/common/Button/Button'
import students1 from '../../../assets/img/createProject/students1.png'
import students2 from '../../../assets/img/createProject/students2.png'
import students3 from '../../../assets/img/createProject/students3.png'
import students4 from '../../../assets/img/createProject/students4.png'
import students5 from '../../../assets/img/createProject/students5.png'
import students6 from '../../../assets/img/createProject/students6.png'
import firstStep from '../../../assets/img/createProject/firstStep.png'
import secondStep from '../../../assets/img/createProject/secondStep.png'
import { Path } from '@/enum/pathE'
import { generatePath, useNavigate } from 'react-router-dom'
import { logo } from '@/assets/img/common'
import styles from '../HelpPage.module.scss'

export const HelpStudentsPage = () => {
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
        <h1> Пользователи платформы </h1>
        <h2> Переходим на страницу пользователи платформы</h2>
        <p>
          Кликните в боковой левой панели по иконке &quot;Пользователи платформы&quot;. В загрузившемся окне появится таблица со всеми пользователями
          платформы.
        </p>
        <div className={styles.HelpCenterPage_FAQ_images}>
          <img src={students1} alt="Пользователи платформы" className={styles.HelpCenterPage_FAQ_images_firstStep} />
        </div>

        <h2> Настроим таблицу с пользователями </h2>
        <p>Для настройки таблицы нажмите на &quot;Шестерёнку&quot; в правом верхнем углу таблицы.</p>
        <div className={styles.HelpCenterPage_FAQ_images}>
          <img src={students2} alt="Кнопка настроек" className={styles.HelpCenterPage_FAQ_images_firstStep} />
        </div>
        <p>
          Здесь вы можете выбрать какие колонки будут отображаться в вашей таблице с пользователями кроме имя и Email: суммарный бал, курс, дата
          регистрации, группа, средний балл, дата добавления и дата удаления из группы, а также прогресс пользователя. Для отображения в таблице
          можете выбрать до 5 колонок.
        </p>
        <div className={styles.HelpCenterPage_FAQ_images}>
          <img src={students3} alt="Настройки таблицы" className={styles.HelpCenterPage_FAQ_images_firstStep} />
        </div>
        <h2> Использование фильтрации</h2>
        <p>
          Для применения фильтров нажмите на кнопку &quot;Добавить фильтры&quot;, расположенную слева над таблицей. Выберите критерии фильтрации:
          суммарный балл, средний балл, последняя активность и спрятать удаленных пользователей.
        </p>
        <div className={styles.HelpCenterPage_FAQ_images}>
          <img src={students4} alt="Фильтры" className={styles.HelpCenterPage_FAQ_images_firstStep} />
        </div>
        <h2> Выбор курса</h2>
        <p>
          Также для отображения таблицы с пользователями определенного курса, а не всей платформы, кликнете на вкладку &quot;Показать все курсы&quot;.
        </p>
        <div className={styles.HelpCenterPage_FAQ_images}>
          <img src={students5} alt="Выбор курса" className={styles.HelpCenterPage_FAQ_images_firstStep} />
        </div>
        <p>Отобразятся все курсы вашей платформы. Кликнете на нужный курс и вы попадете на страницу с пользователями данного курса.</p>
        <h2> Выгрузка таблицы с пользователями в Excel </h2>
        <p>
          Для выгрузки таблицы с пользователями в Excel нажмите на кнопку над таблицей &quot;Выгрузка таблицы с пользователями&quot;, как показано на
          рисунке ниже:
        </p>
        <div className={styles.HelpCenterPage_FAQ_images}>
          <img src={students6} alt="Выгрузка в excel " className={styles.HelpCenterPage_FAQ_images_firstStep} />
        </div>
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
