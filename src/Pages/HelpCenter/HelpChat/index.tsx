import {generatePath, useNavigate} from "react-router-dom";
import {Path} from "../../../enum/pathE";
import styles from "./HelpChat.module.scss";
import {logo} from "../../../assets/img/common";
import {Button} from "../../../components/common/Button/Button";
import firstStep from "../../../assets/img/createProject/firstStep.png";
import secondStep from "../../../assets/img/createProject/secondStep.png";
import SelectChat from "../../../assets/img/chat/SelectChat.png";
import OpenChat from "../../../assets/img/chat/OpenChat.png";


export const HelpChat = () => {
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
                    <img src={logo} alt="Logotype ITOVERONE"/>
                    <p> IT OVERONE</p>
                </a>
                <div className={styles.header_block}>
                    <Button onClick={handleHelpPage} variant={'logIn'} style={{fontSize: '18px', fontWeight: '700'}}
                            text={'Помощь'}/>
                    <Button onClick={handleLoginPage} variant={'logIn'} style={{fontSize: '18px', fontWeight: '700'}}
                            text={'Войти'}/>
                    <Button onClick={handleRegistrationUser} variant={'logIn'}
                            style={{fontSize: '18px', fontWeight: '700'}} text={'Создать платформу'}/>
                </div>
            </div>
            <div className={styles.HelpCenterPage_FAQ}>
                <h1>Как создать чат с пользователем в онлайн-платформе OVERSCHOOL </h1>
                <h2>Создание чата</h2>
                <p>В онлайн-школе вы можете общаться с пользователем через групповые и индивидуальные чаты.
                    <br/>Для создания группового чата просто создайте группу пользователей, и чат автоматически создастся с
                    участниками этой группы.
                    <br/>Для доступа ко всем вашим чатам, вы можете нажать на иконку &quot;Чаты&quot; на навигационной
                    панели слева.
                    Там вы найдете все созданные вами чаты, чтобы легко переключаться между ними и общаться с
                    пользователями.
                </p>
                <div className={styles.HelpCenterPage_FAQ_images}>
                    <img src={SelectChat} alt="Выбрать чат" className={styles.HelpCenterPage_FAQ_images_Chat}/>
                </div>
                <p> Также для чата с отдельным пользователем вы можете перейти на вкладку &quot;Пользователи курса&quot; и нажать
                    кнопку чата рядом с его именем.</p>
                <div className={styles.HelpCenterPage_FAQ_images}>
                    <img src={OpenChat} alt="Открыть чаты" className={styles.HelpCenterPage_FAQ_images_Chat}/>
                </div>
            </div>
            <div className={styles.HelpCenterPage_banner}>
                <div className={styles.HelpCenterPage_banner_createProject}>
                    <h1>Создайте свой проект на OVERSCHOOL прямо сейчас!</h1>
                    <p>Попробуйте весь функционал в процессе использования и познай, насколько он удобен</p>
                    <Button onClick={handleRegistrationUser} text={'Создать проект'} variant={'create'}/>
                </div>
                <div className={styles.HelpCenterPage_banner_images}>
                    <img src={firstStep} alt="Создать проект"
                         className={styles.HelpCenterPage_banner_images_firstStep}/>
                    <img src={secondStep} alt="Создать проект"
                         className={styles.HelpCenterPage_banner_images_secondStep}/>
                </div>
            </div>
        </section>
    )
}