import { Button } from '../../../components/common/Button/Button'
import main_page from '../../../assets/img/manageAccount/main_page.png'
import account_page from '../../../assets/img/manageAccount/account_page.png'
import account_page_finish from '../../../assets/img/manageAccount/account_page_finish.png'
import firstStep from '../../../assets/img/createProject/firstStep.png'
import secondStep from '../../../assets/img/createProject/secondStep.png'
import { useAppSelector } from '../../../store/hooks'
import {selectUser} from '../../../selectors'
import { Path } from 'enum/pathE'
import { generatePath, useNavigate } from 'react-router-dom'
import {logo} from "../../../assets/img/common";
import styles from '../HelpPage.module.scss'

export const HelpUserAccount = () => {
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
            <h1> Как настроить аккаунт </h1>
            <h2> Переходим на страничку акканута </h2>
            <p> 
              Кликните в правом верхнем углу по иконке пользователя. 
              В появившемся контекстном меню выберите пункт &quot;Открыть профиль&quot;
            </p>
            <div className={styles.HelpCenterPage_FAQ_images}>
              <img src={main_page} alt="страничка выбора курса" className={styles.HelpCenterPage_FAQ_images_firstStep} />
            </div>
            <h2> Заполнение профиля </h2>
            <p>
              В загрузившемся окне появится форма для заполнения.
            </p>
            <div className={styles.HelpCenterPage_FAQ_images}>
              <img src={account_page} alt="страничка аккаунта" className={styles.HelpCenterPage_FAQ_images_firstStep} />
            </div>
            <p>
              Для изменения автара щёлкните по изображению пользователя в графе &quot;Аватар&quot; 
              и выберите фото с вашего устройства. После заполнения всех полей нажмите 
              кнопку &quot;Сохранить&quot;, которая расположена в самом низу
            </p>
            <div className={styles.HelpCenterPage_FAQ_images}>
              <img src={account_page_finish} alt="сохранение данных пользователя" className={styles.HelpCenterPage_FAQ_images_firstStep} />
            </div>
            <p>
              После этого вся информация будет сохранена. Для выхода из странички редактирования вы можете воспользоваться
              навигационной панелью, расположенной слева
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