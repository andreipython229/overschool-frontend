import {generatePath, useNavigate} from "react-router-dom";
import {Path} from "../../../enum/pathE";
import styles from "../HelpPage.module.scss";
import {logo} from "../../../assets/img/common";
import {Button} from "../../../components/common/Button/Button";
import firstStep from "../../../assets/img/createProject/firstStep.png";
import secondStep from "../../../assets/img/createProject/secondStep.png";
import createLesson from '../../../assets/img/createProject/createLesson.png'
import addStudents from '../../../assets/img/createProject/addStudents.png'


export const HelpCoursesPage = () => {
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
        <h1>Как создать курс в онлайн-платформе OVERSCHOOL </h1>
          <h2>Шаги по созданию курса</h2>
        <p>В личном кабинете вашей школы выберите опцию &quot;Создать курс&quot;.<br/>После ввода названия курса он станет доступен для редактирования.
            Теперь вы можете создать структуру курса, добавляя тематические модули и наполняя их занятиями. Следующим этапом станет добавление пользователей.
        </p>
         <div className={styles.HelpCenterPage_FAQ_images}>
          <img src={firstStep} alt="Создать курс" className={styles.HelpCenterPage_FAQ_images_firstStep} />
        </div>
        <h2>Как создать занятие</h2>
          <p>После создания модулей, добавьте в них занятия. Занятия могут быть трех типов: обычные, домашние задания и тесты. <br/>
              При создании занятия можно использовать текст, видео, изображения и код, а также прикреплять необходимые файлы. <br/>
    Для создания занятия-теста укажите название теста и требуемый процент правильных ответов.
    Затем укажите вопросы и варианты ответов на них, которые могут быть представлены как текстом, так и картинками.
        </p>
          <div className={styles.HelpCenterPage_FAQ_images}>
          <img src={createLesson} alt="Создать занятие" className={styles.HelpCenterPage_FAQ_images_createLesson} />
        </div>
          <h2>Как добавить пользователей</h2>
          <p>Для добавления пользователей создайте требуемое количество групп, выберете нужную вам группу и нажмите добавить пользователей. Заполните форму данными пользователей и отправьте приглашение.
              </p>
          <div className={styles.HelpCenterPage_FAQ_images}>
          <img src={addStudents} alt="Добавление пользователей" className={styles.HelpCenterPage_FAQ_images_addStudents} />
        </div>
          <p>Также для групп есть возможность добавления менторов. Для этого необходимо выбрать менторов, доступных в вашей школе. Добавить менторов в школу можно в настройках, в разделе &quot;Сотрудники&quot;.</p>
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

