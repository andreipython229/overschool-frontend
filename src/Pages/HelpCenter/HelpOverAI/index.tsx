import { generatePath, useNavigate } from "react-router-dom";
import { FC, memo, useState } from "react";
import { Path } from "../../../enum/pathE";
import styles from "../HelpPagesCommon.module.scss";
import mainHelpStyles from "../HelpPage.module.scss";
import { logo } from "../../../assets/img/common";
import { Button } from "../../../components/common/Button/Button";
import firstStep from '../../../assets/img/createProject/firstStep.png'
import secondStep from '../../../assets/img/createProject/secondStep.png'
import { InitPageHeader } from "../../Initial/newInitialPageHeader";
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { ArrowLeftIconPath } from '../../../assets/Icons/svgIconPath'
import { Footer } from "../../../components/Footer/index";


export const HelpOverAI = () => {
    const navigate = useNavigate()
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isRegistrationOpen, setRegistrationOpen] = useState(false);

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

            <InitPageHeader setLoginShow={setLoginOpen} setRegistrationShow={setRegistrationOpen} />

            <div className={styles.sections}>
                <div className={styles.section}>
                    <div className={styles.help_title_container}>
                        <div onClick={handleHelpPage} className={styles.back_btn}>
                            <IconSvg path={ArrowLeftIconPath} viewBoxSize="0 0 9 14" height={24} width={18} />
                        </div>
                        <p>Over Ai</p>
                        <div></div>
                    </div>
                </div>



                <div className={styles.section}>
                    <div className={styles.text_part}>
                        <div className={styles.section_title}>
                            <div className={styles.section_number}>1</div>
                            <h3 className={styles.section_title_text}>Как взаимодействовать с умным помощником на платформе</h3>
                        </div>
                        <p className={styles.section_text}>После авторизации на платформе вам будет доступен умный помощник Over Ai.
                            Он будет находиться на каждой странице в <span className={styles.text_bold}>правом нижнем углу экрана</span>.</p>
                        <p className={styles.section_text}>{`После нажатия на иконку всплывет диалоговое окно с чатами. 
                        Здесь у вас будет возможность создать новый чат с помощником или продолжить ранее существующую с ним беседу.`}</p>

                    </div>
                    <div className={styles.img_part}>
                        <img
                            src={require("../../../assets/img/help/overai_window.png")}
                            alt="К настройкам группы"
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.img_part_t2}>
                        <img
                            src={require("../../../assets/img/help/overai_opportunity.png")}
                            alt="Настройки группы"
                        />
                    </div>
                    <div className={styles.text_part}>
                        <div className={styles.section_title}>
                            <div className={styles.section_number}>2</div>
                            <h3 className={styles.section_title_text}>Возможности умного помощника</h3>
                        </div>
                        <p className={styles.section_text}>{`Over Ai очень полезен благодаря своим возможностям генерации и анализа кода. Вот некоторые примеры того, как его можно использовать:`}</p>

                        <ul className={styles.text_list}>

                            <li><p className={styles.section_text}><span className={styles.text_bold}>Генерация кода</span>: может помочь в написании фрагментов кода или даже целых программ на различных языках программирования.</p></li>

                            <li><p className={styles.section_text}><span className={styles.text_bold}>Обучение и поддержка</span>: может служить инструментом для обучения новичков, объясняя синтаксис и основные концепции языков программирования.</p></li>

                            <li><p className={styles.section_text}><span className={styles.text_bold}>Автоматизация задач</span>: может автоматизировать рутинные задачи, такие как написание шаблонного кода или юнит-тестов.</p></li>

                            <li><p className={styles.section_text}><span className={styles.text_bold}>Решение алгоритмических задач</span>: может помочь найти решения для задач на алгоритмы, предоставить подробные объяснения.</p></li>
                        </ul>
                        <p className={styles.section_text}>{`Однако, советуем вам самостоятельно практиковать материалы в курсах. А когда понадобиться помощь, то вы всегда можете обратиться к умному помощнику`}</p>
                    </div>
                </div>
            </div>

            <div className={`${mainHelpStyles.ctaBlock} ${styles.ctaBlock}`}>
                <div className={mainHelpStyles.ctaText}>
                    <h2>Создайте свой проект на Course Hub прямо сейчас!</h2>
                    <p>
                        Попробуйте весь функционал в процессе использования и узнайте, как
                        удобно работать на нашей платформе.
                    </p>
                    <Button
                        text="Попробовать бесплатно"
                        variant="newLeaveRequest"
                        onClick={handleRegistrationUser}
                    />
                </div>
                <div className={mainHelpStyles.ctaImage}>
                    <img
                        src={require("../../../assets/img/common/cta-image.png")}
                        alt="CTA-изображение"
                    />
                </div>
            </div>

            <Footer />
        </div >

    )
}