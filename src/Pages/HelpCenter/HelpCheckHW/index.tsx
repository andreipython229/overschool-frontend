import { generatePath, useNavigate } from "react-router-dom";
import { Path } from "../../../enum/pathE";
import styles from "./HelpCheckHW.module.scss";
import { logo } from "../../../assets/img/common";
import { Button } from "../../../components/common/Button/Button";
import firstStep from '../../../assets/img/createProject/firstStep.png'
import secondStep from '../../../assets/img/createProject/secondStep.png'
import HW_mentor from '../../../assets/img/CheckHW/HW_mentor.png'
import HW_checkpage from '../../../assets/img/CheckHW/HW_checkpage.png'
import HW_checkhw from '../../../assets/img/CheckHW/HW_checkhw.png'


export const HelpCheckHW = () => {
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
                    <Button onClick={handleRegistrationUser} variant={'logIn'} style={{ fontSize: '18px', fontWeight: '700' }} text={'Создать школу'} />
                </div>
            </div>
            <div className={styles.HelpCenterPage_FAQ}>
                <h1>Проверка домашних заданий </h1>
                <h2>Менторы</h2>
                <p>После создания группы и последующего добавления в неё учеников, у вас появится возможность добавить одного и более менторов.
                    <br/>Они, в свою очередь, будут заниматься проверкой домашних заданий и поддержкой учеников в изучении материала.
                    <br/>
                </p>
                <div className={styles.HelpCenterPage_FAQ_images}>
                    <img src={HW_mentor} alt="кнопка OverAI" className={styles.HelpCenterPage_FAQ_images_firstStep} />
                </div>
                {/* <h2>Как создать занятие</h2> */}
                <h2>Как менторам проверять домашние задания</h2>
                <p>Посмотреть работы учеников можно в навигационной панели во вкладке <b>Домашние задания</b>.
                    <br/>На данной странице ментору будут доступны работы учеников, которые он может фильтровать по разным катергориям и статусам.
                </p>
                <div className={styles.HelpCenterPage_FAQ_images}>
                    <img src={HW_checkpage} alt="чат с помощником" className={styles.HelpCenterPage_FAQ_images_firstStep} />
                </div>
                <p>
                    Далее ментор проверяет домашнее задание, выставляет оценку(макс. 10 баллов), и присваивает статус <b>Принято</b> или <b>Отклонено</b> .
                    <br/> По желанию у ментора будет возможность оставить комментарии к заданию и прикрепить файл по необходимости. 
                </p>
                <div className={styles.HelpCenterPage_FAQ_images}>
                    <img src={HW_checkhw} alt="пример взаимодействия с помощником" className={styles.HelpCenterPage_FAQ_images_firstStep} />
                </div>
                <p>
                    Плюсом ко всему, ментору будет доступна история проверки работ учеников.
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
        </section >
    )
}