import { Button } from '../../../components/common/Button/Button'
import groups from '../../../assets/img/manageSchool/groups.png'
import groups1 from '../../../assets/img/manageSchool/groups1.png'
import groups2 from '../../../assets/img/manageSchool/groups2.png'
import students4 from '../../../assets/img/createProject/students4.png'
import students5 from '../../../assets/img/createProject/students5.png'
import students6 from '../../../assets/img/createProject/students6.png'
import firstStep from '../../../assets/img/createProject/firstStep.png'
import secondStep from '../../../assets/img/createProject/secondStep.png'
import { useAppSelector } from '../../../store/hooks'
import {selectUser} from '../../../selectors'
import { Path } from 'enum/pathE'
import { generatePath, useNavigate } from 'react-router-dom'
import {logo} from "../../../assets/img/common";
import styles from '../HelpPage.module.scss'

export const HelpGroupSettings = () => {
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
        <section className={styles.HelpSchoolSettings}>
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
          <div className={styles.HelpSchoolSettings_FAQ}>
            <h1> Настройки группы </h1>
            <h2> Переходим к настройкам группы</h2>
            <p> 
              Для того, чтобы перейти к настройкам группы, на странице &quot;Пользователи курса&quot; в нужной вам
              группе кликните по &quot;Шестерёнке&quot;. В загрузившемся окне появятся настройки группы.
            </p>
            <div className={styles.HelpSchoolSettings_FAQ_images}>
              <img src={groups} alt="Кнопка настроек" className={styles.HelpSchoolSettings_FAQ_images_firstStep} />
            </div>
            <br/>
            <h2> Настройки группы</h2>
            <p>
              Здесь вы можете выбрать настройки для группы: блокировать возможность отправки домашних заданий, строгая
              последовательность занятий, доступ пользователей группы к пользованию OVER AI, возможность получения пользователями
              сертификата после прохождения курса. Также, если вы хотите ограничить срок обучения по времени, можно
              установить продолжительность обучения в днях.
            </p>
            <div className={styles.HelpSchoolSettings_FAQ_images}>
              <img src={groups1} alt="Пользователи платформы" className={styles.HelpSchoolSettings_FAQ_images_firstStep} />
            </div>
            <br/>
            <h2> Настройка доступа к урокам</h2>
            <p>
              Внизу окна есть кнопка &quot;Показать все уроки&quot;, при нажатии отображаются все уроки курса,
              а также появляется возможность настройки доступа к урокам.
            </p>
            <div className={styles.HelpSchoolSettings_FAQ_images}>
              <img src={groups2} alt="Настройки таблицы" className={styles.HelpSchoolSettings_FAQ_images_firstStep} />
            </div>
          </div>
          <div className={styles.HelpSchoolSettings_banner}>
            <div className={styles.HelpSchoolSettings_banner_createProject}>
              <h1>Создайте свой проект на OVERSCHOOL прямо сейчас!</h1>
              <p>Попробуйте весь функционал в процессе использования и познай, насколько он удобен</p>
              <Button onClick={handleRegistrationUser} text={'Создать проект'} variant={'create'} />
            </div>
            <div className={styles.HelpSchoolSettings_banner_images}>
              <img src={firstStep} alt="Создать проект" className={styles.HelpSchoolSettings_banner_images_firstStep} />
              <img src={secondStep} alt="Создать проект" className={styles.HelpSchoolSettings_banner_images_secondStep} />
            </div>
          </div>
        </section>
      )
    }