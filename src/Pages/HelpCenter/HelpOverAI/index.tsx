import { generatePath, useNavigate } from "react-router-dom";
import { Path } from "@/enum/pathE";
import styles from "../HelpPagesCommon.module.scss";
import mainHelpStyles from "../HelpPage.module.scss";
import { Button } from "@/components/common/Button/Button";
import { InitPageHeader } from "@/Pages/Initial/newInitialPageHeader";
import { IconSvg } from '@/components/common/IconSvg/IconSvg'
import { ArrowLeftIconPath } from '@/assets/Icons/svgIconPath'
import { Footer } from "@/components/Footer/index";
import overAiWindow from '@/assets/img/help/overai_window.png'
import overAiOpportunity from '@/assets/img/help/overai_opportunity.png'
import ctaImage from '@/assets/img/common/cta-image.png'

export const HelpOverAI = () => {
    const navigate = useNavigate()

    const handleHelpPage = () => {
        navigate(generatePath(Path.HelpPage))
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

            <InitPageHeader />

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
                            src={overAiWindow}
                            alt="К настройкам группы"
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.img_part_t2}>
                        <img
                            src={overAiOpportunity}
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

            <div className={mainHelpStyles.ctaBlock}>
                <div className={mainHelpStyles.ctaTextRow}>
                    <div className={mainHelpStyles.ctaText}>
                        <h2>Создайте свой проект на Course Hub прямо сейчас!</h2>
                        <p>
                            Попробуйте весь функционал в процессе использования и познай, насколько он удобен
                        </p>
                        <Button text="Попробовать бесплатно" variant="newLeaveRequest" onClick={handleRegistrationUser} />
                        <div className={mainHelpStyles.ctaImage}>
                            <img src={ctaImage} alt="CTA-изображение" />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div >

    )
}