import { generatePath, useNavigate } from "react-router-dom";
import { Path } from "../../../enum/pathE";
import styles from "./HelpOverAI.module.scss";
import { logo } from "../../../assets/img/common";
import { Button } from "../../../components/common/Button/Button";
import overai_button from "../../../assets/img/overAI/overai_button.png";
import overai_chat from "../../../assets/img/overAI/overai_chat.png";
import overai_second_chat from '../../../assets/img/overAI/overai_second_chat.png';
import firstStep from '../../../assets/img/createProject/firstStep.png'
import secondStep from '../../../assets/img/createProject/secondStep.png'


export const HelpOverAI = () => {
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
                <h1>Работа с помощником OVERAI</h1>
                <h2>Как взаимодействовать с умным помощником на платформе</h2>
                <p>После авторизации на платформе вам будет доступен умный помощник OVERAI.<br />Он будет находиться на каждой странице в <b>правом нижнем углу экрана.</b> 
                </p>
                <div className={styles.HelpCenterPage_FAQ_images}>
                    <img src={overai_button} alt="кнопка OverAI" className={styles.HelpCenterPage_FAQ_images_firstStep} />
                </div>
                {/* <h2>Как создать занятие</h2> */}
                <p>После нажатия на иконку всплывет диалоговое окно с чатами. <br />
                    Здесь у вас будет возможность создать новый чат с помощником или продолжить ранее существующую с ним беседу . <br />
                </p>
                <div className={styles.HelpCenterPage_FAQ_images}>
                    <img src={overai_chat} alt="чат с помощником" className={styles.HelpCenterPage_FAQ_images_createLesson} />
                </div>
                <h2>Возможности умного помощника</h2>
                <p>
                OVERAI очень полезен благодаря своим возможностям генерации и анализа кода. Вот некоторые примеры того, как его можно использовать:
                </p>
                <p>
                    <b>Генерация кода</b>: OVERAI может помочь в написании фрагментов кода или даже целых программ на различных языках программирования.
                    <br />
                    <b>Обучение и поддержка</b>: OVERAI может служить инструментом для обучения новичков, объясняя синтаксис и основные концепции языков программирования.
                    <br />
                    <b>Автоматизация задач</b>: OVERAI может автоматизировать рутинные задачи, такие как написание шаблонного кода или юнит-тестов.
                    <br />
                    <b>Решение алгоритмических задач</b>: OVERAI может помочь найти решения для задач на алгоритмы и предоставить подробные объяснения.
                </p>
                    
                
                
                <div className={styles.HelpCenterPage_FAQ_images}>
                    <img src={overai_second_chat} alt="пример взаимодействия с помощником" className={styles.HelpCenterPage_FAQ_images_addStudents} />
                </div>
                <p>Стоит понимать что OVERAI может помочь вам в любой ситуации.
                    <br />
                    Однако, советуем вам самостоятельно практиковать материалы в курсах. А когда понадобиться помощь, то вы всегда можете обратиться к умному помощнику
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