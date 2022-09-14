import { Button } from '../../components/common/Button/Button'
import styles from './TariffPlans.module.scss'

import React, {useState} from "react";
import firstStep from "../../assets/img/createProject/firstStep.png";
import secondStep from "../../assets/img/createProject/secondStep.png";


export const TariffPlans = () => {
    const [isCourseShown, setCourseIsShown] = useState<boolean>(true)
    const [isWebinarShown, setWebinarIsShown] = useState<boolean>(false)

    const handleCourseClick = () => {
        setWebinarIsShown(false)
        setCourseIsShown(true)
    };
    const handleWebinarClick = () => {
        setCourseIsShown(false)
        setWebinarIsShown(true)
    };

    return (
        <section className={styles.TariffPlansPage}>
            <div  className={styles.TariffPlansPage_plansBlock}>
                <p>стоимость и оплата</p>
                <h1>Тарифные планы</h1>
                <div  className={styles.TariffPlansPage_plansBlock_typeSelect}>

                    <div  className={isCourseShown ? styles.TariffPlansPage_plansBlock_typeSelect_courseEnabled: styles.TariffPlansPage_plansBlock_typeSelect_courseDisabled}>
                        <h5 onClick={handleCourseClick}>курсы</h5>
                        <hr/>
                    </div>

                    <div  className={isWebinarShown ? styles.TariffPlansPage_plansBlock_typeSelect_webinarEnabled :styles.TariffPlansPage_plansBlock_typeSelect_webinarDisabled}>
                        <h5 onClick={handleWebinarClick}>вебинар</h5>
                        <hr/>
                    </div>

                </div>
                {isCourseShown && ( <div className={styles.TariffPlansPage_plansBlock_cardGroup}>
                        <div className={styles.TariffPlansPage_plansBlock_cardGroup_card}>
                            <div className={styles.TariffPlansPage_plansBlock_cardGroup_card_text}>
                                <h3>Любитель</h3>
                                <hr/>
                                <ul>
                                    <li>Конструктор текстов</li>
                                    <li>Домашние задания</li>
                                    <li>API и Webhook</li>
                                </ul>
                                <Button text={'Купить'} variant={'create'} />
                            </div>
                        </div>
                        <div className={styles.TariffPlansPage_plansBlock_cardGroup_card}>
                            <div className={styles.TariffPlansPage_plansBlock_cardGroup_card_text}>
                                <h3>Профи</h3>
                                <hr/>
                                <ul>
                                    <li>Белимит ГБ</li>
                                    <li>Безлимит курсов</li>
                                    <li>Безлимит учеников</li>
                                    <li>10 сотрудников</li>
                                </ul>
                                <Button text={'Купить'} variant={'create'} />
                            </div>
                        </div>
                        <div className={styles.TariffPlansPage_plansBlock_cardGroup_card}>
                            <div className={styles.TariffPlansPage_plansBlock_cardGroup_card_text}>
                                <h3>Эксперт</h3>
                                <hr/>
                                <ul>
                                    <li>Белимит ГБ</li>
                                    <li>Безлимит курсов</li>
                                    <li>Безлимит учеников</li>
                                    <li>10 сотрудников</li>
                                </ul>
                                <Button text={'Купить'} variant={'create'} />
                            </div>
                        </div>
                        <div className={styles.TariffPlansPage_plansBlock_cardGroup_card}>
                            <div className={styles.TariffPlansPage_plansBlock_cardGroup_card_text}>
                                <h3>Бизнес</h3>
                                <hr/>
                                <ul>
                                    <li>Белимит ГБ</li>
                                    <li>Безлимит курсов</li>
                                    <li>Безлимит учеников</li>
                                    <li>Безлимит сотрудников</li>
                                </ul>
                                <Button text={'Купить'} variant={'create'} />
                            </div>
                        </div>
                    </div>
                )}

                {isWebinarShown && (
                    <ul>
                        <li>lol</li>
                        <li>kek</li>
                    </ul>
                )}
            </div>
            <div className={styles.TariffPlansPage_banner}>
                <div className={styles.TariffPlansPage_banner_createProject}>
                    <h1>Создайте свой проект на OVERSCHOOL прямо сейчас!</h1>
                    <p>Попробуйте весь функционал в процессе использования и познай, насколько он удобен</p>
                    <Button text={'Создать проект'} variant={'create'} />
                </div>
                <div className={styles.TariffPlansPage_banner_images}>
                    <img src={firstStep} alt="Создать проект"  className={styles.TariffPlansPage_banner_images_firstStep}/>
                    <img src={secondStep} alt="Создать проект"  className={styles.TariffPlansPage_banner_images_secondStep}/>
                </div>

            </div>
            <footer className={styles.TariffPlansPage_footer}>
                <div className={styles.TariffPlansPage_footer_links}>
                    <a>Возможности</a>
                    <a>Тарифы</a>
                    <a>Справочный центр</a>
                    <a>Правовая политика</a>
                </div>
                <h1>OVERSCHOOL</h1>
                <h5>@2022, все права защищены</h5>
            </footer>
        </section>
    )
}
