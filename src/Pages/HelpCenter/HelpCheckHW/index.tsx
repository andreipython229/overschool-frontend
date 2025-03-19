import { generatePath, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Path } from "../../../enum/pathE";
import styles from "../HelpPagesCommon.module.scss";
import mainHelpStyles from "../HelpPage.module.scss";
import { Button } from "../../../components/common/Button/Button";
import { InitPageHeader } from "../../Initial/newInitialPageHeader";
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { ArrowLeftIconPath } from '../../../assets/Icons/svgIconPath'
import { Footer } from "../../../components/Footer/index";



export const HelpCheckHW = () => {
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

            <InitPageHeader />

            <div className={styles.sections}>
                <div className={styles.section}>
                    <div className={styles.help_title_container}>
                        <div onClick={handleHelpPage} className={styles.back_btn}>
                            <IconSvg path={ArrowLeftIconPath} viewBoxSize="0 0 9 14" height={24} width={18} />
                        </div>
                        <p>Проверка домашних заданий</p>
                        <div></div>
                    </div>
                </div>



                <div className={styles.section}>
                    <div className={styles.text_part}>
                        <div className={styles.section_title}>
                            <div className={styles.section_number}>1</div>
                            <h3 className={styles.section_title_text}>Менторы</h3>
                        </div>
                        <p className={styles.section_text}>{`После создания группы и последующего добавления в неё пользователей, у вас появится возможность добавить одного и более менторов.`}</p>
                        <p className={styles.section_text}>{`Они, в свою очередь, будут заниматься проверкой домашних заданий и поддержкой пользователей в изучении материала.`}</p>
                    </div>
                    <div className={styles.img_part}>
                        <img
                            src={require("../../../assets/img/CheckHW/hw_checkpag.png")}
                            alt="Окно входа"
                        />
                    </div>
                </div>

                <div className={styles.section}>
                <div className={styles.img_part}>
                        <img
                            src={require("../../../assets/img/CheckHW/hw_checkhaw.png")}
                            alt="чат с помощником"
                        />
                    </div>
                    <div className={styles.text_part}>
                        <div className={styles.section_title}>
                            <div className={styles.section_number}>2</div>
                            <h3 className={styles.section_title_text}>Как менторам проверять домашние задания</h3>
                        </div>
                        <p className={styles.section_text}>{`Посмотреть работы пользователей можно в навигационной панели во вкладке Домашние задания. На данной странице ментору будут доступны работы пользователей, которые он может фильтровать по разным катергориям и статусам.`}</p>
                        <p className={styles.section_text}>{`Далее ментор проверяет домашнее задание, выставляет оценку(макс. 10 баллов), и присваивает статус Принято или Отклонено.По желанию у ментора будет возможность оставить комментарии к заданию и прикрепить файл по необходимости.`}
                        </p>
                    </div>
                </div>
            </div>

            <div className={mainHelpStyles.ctaBlock}>
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
        </div>

)
}