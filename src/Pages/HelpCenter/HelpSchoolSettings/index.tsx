import { Button } from '../../../components/common/Button/Button'
import school_settings_button from '../../../assets/img/manageSchool/school_settings_button.png'
import school_settings_header from '../../../assets/img/manageSchool/school_settings_header.png'
import school_settings_header_set from '../../../assets/img/manageSchool/school_settings_header_set.png'
import school_settings_general from '../../../assets/img/manageSchool/school_settings_general.png'
import school_settings_personal from '../../../assets/img/manageSchool/school_settings_personal.png'
import school_settings_personal_mentor from '../../../assets/img/manageSchool/school_settings_personal_mentor..png'
import school_settings_stamp from '../../../assets/img/manageSchool/school_settings_stamp.png'
import school_settings_payment from '../../../assets/img/manageSchool/school_settings_payment.png'
import firstStep from '../../../assets/img/createProject/firstStep.png'
import secondStep from '../../../assets/img/createProject/secondStep.png'
import { useAppSelector } from '../../../store/hooks'
import {selectUser} from '../../../selectors'
import { Path } from 'enum/pathE'
import { generatePath, useNavigate } from 'react-router-dom'
import {logo} from "../../../assets/img/common";
import styles from '../HelpPage.module.scss'

export const HelpSchoolSettings = () => {
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
            <h1> Настройки платформы </h1>

            <h2> Переходим на страничку настроек платформы </h2>
            <p> 
              Кликните на панели слева по &quot;Шестерёнке&quot;.
            </p>
            <div className={styles.HelpCenterPage_FAQ_images}>
              <img src={school_settings_button} alt="кнопка перехода" className={styles.HelpCenterPage_FAQ_images_firstStep} />
            </div>

            <h2> Настроим оформление шапки вашей платформы </h2>
            <p>
              Для редактирования оформления нажмите кнопку &quot;Настроить страницу курсов&quot;. Найти её можно чуть 
              ниже иконки пользователя
            </p>
            <div className={styles.HelpCenterPage_FAQ_images}>
              <img src={school_settings_header} alt="кнопка изменения шапки" className={styles.HelpCenterPage_FAQ_images_firstStep} />
            </div>
            <p>
              Здесь вы сможете изменить фон секции, короткое описание, а также название и аватар платформы. После внесения всех 
              изменений нажмите кнопку &quot;Завершить настройку курсов&quot;
            </p>
            <div className={styles.HelpCenterPage_FAQ_images}>
              <img src={school_settings_header_set} alt="изменения шапки" className={styles.HelpCenterPage_FAQ_images_firstStep} />
            </div>

            <h2> Основные настройки платформы </h2>
            <p> 
              Для перехода к основным настройкам кликните вкладку &quot;Основные&quot;
            </p>
            <div className={styles.HelpCenterPage_FAQ_images}>
              <img src={school_settings_general} alt="Настройки основные" className={styles.HelpCenterPage_FAQ_images_firstStep} />
            </div>
            <p>
              Здесь можно поменять название платформы, которое будет отображаться в адресах, относящихся к вашей платформе.
              Если вы делились с кем либо url ссылками на вашу платформу - то после изменения по старым url адресам она 
              будет не доступна. Частая смена не рекомендуется.
              <br/><br/>
              Также здесь можно внести ссылку на адрес публичного договора оферты (web-ссылка на ваш договор, 
              по которой можно перейти и ознакомится) и ссылку на связь с руководством платформы (сслыка на вашу страничку или группу
              в любой социальной сети, где с вами можно связаться по вопросам платформы)
            </p>

            <h2> Управление сотрудниками платформы </h2>
            <p> 
              Для перехода к настройке персонала кликните вкладку &quot;Сотрудники&quot;
            </p>
            <div className={styles.HelpCenterPage_FAQ_images}>
              <img src={school_settings_personal} alt="Настройки сотрудников" className={styles.HelpCenterPage_FAQ_images_firstStep} />
            </div>
            <p>
              Здесь вы сможете добавлять новых сотрудников платформы. При добавлении нового сотрудника вы указываете егоё email, 
              на который позже ему придёт сообщение с данными для входа.
              <br/><br/>
              По ролям на выбор будут предлагаться два варианта: ментор и администратор. Внешний вид страницы платформы пользователя 
              с ролью &quot;Администратор&quot; никак не отличается от вашего. Но у пользователя с ролью &quot;Ментор&quot; 
              будет ряд ограничений, ему не будут доступны настрйоки платформы, а внешний вид страницы школы будет следующим:
            </p>
            <div className={styles.HelpCenterPage_FAQ_images}>
              <img src={school_settings_personal_mentor} alt="Вид страницы у ментора" className={styles.HelpCenterPage_FAQ_images_firstStep} />
            </div>

            <h2> Добавление печатей и подписей </h2>
            <p>
              Для того, чтобы ваши ученики получали сертификаты с вашими печатью и подписью, их нужно добавить, перейдя во вкладку
              &quot;Печати и подписи&quot;
            </p>
            <div className={styles.HelpCenterPage_FAQ_images}>
              <img src={school_settings_stamp} alt="Страница печати и подписи" className={styles.HelpCenterPage_FAQ_images_firstStep} />
            </div>
            <p>
              Следует отметить, что к добавлению подлежат только изображения, отвечающие следующим рекомендациям:
              <br/>1. Формат файла PNG (без заднего фона)
              <br/>2. Размер файла не более 2 мб
              <br/>3. Оптимальный размер печати 200px х 200px
            </p>

            <h2> Оплата курсов </h2>
            <p>
              Для того, чтобы получать оплату за курсы, нужно выбрать одну из платёжных систем:
              <a style={{ color: '#BA75FF', fontWeight: '600' }} href="https://prodamus.ru/"> Prodamus </a> 
              ,
              <a style={{ color: '#BA75FF', fontWeight: '600' }} href="https://express-pay.by/"> ExpressPay </a> 
              <br/><br/>
              Выберите подходящую для вас и зарегситрируйтесь на ней. После перейдите во вкладку 
              &quot;Оплата курсов&quot;, там нажать кнопку &quot;Добавить способ оплаты&quot; и внести 
              все необходимые реквизиты в форму:
            </p>
            <div className={styles.HelpCenterPage_FAQ_images}>
              <img src={school_settings_payment} alt="Оплата курсов" className={styles.HelpCenterPage_FAQ_images_firstStep} />
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