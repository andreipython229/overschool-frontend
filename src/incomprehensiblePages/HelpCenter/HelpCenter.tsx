import { Button } from '../../components/common/Button/Button'
import { Input } from '../../components/common/Input/Input/Input'
import styles from './HelpCenter.module.scss'

import React from "react";

export const HelpCenter = () => {
    return (
        <section className={styles.HelpCenterPage}>
            <div  className={styles.HelpCenterPage_pageHeader}>
                <p>Более 100 инструкций и ответы на часто задаваемые вопросы</p>
                <h1>Справочный центр</h1>
                <div className={styles.HelpCenterPage_pageHeader_inputGroup}>
                    <Input className={styles.HelpCenterPage_pageHeader_inputGroup_input} name="" type="search" value={''} onChange={() => console.log('заглушка')} placeholder="Введите запрос, который Вас интересует" >
                    </Input>
                    <Button text={'Поиск'} variant={'create'} />
                </div>
            </div>
            <div  className={styles.HelpCenterPage_quickStart}>
                <h1>Начало работы</h1>
                <div  className={styles.HelpCenterPage_quickStart_userSelect}>
                    <h5>Для авторов курса</h5>
                    <h5>Для обучающихся</h5>
                </div>
                <div className={styles.HelpCenterPage_quickStart_cardGroup}>
                    <div className={styles.HelpCenterPage_quickStart_cardGroup_card}>
                        <div className={styles.HelpCenterPage_quickStart_cardGroup_card_text}>
                        <h3>Гид по началу работ</h3>
                        <p>Не знаете с чего начать? Начните с нашего гида по началу работы на OVERSCHOOL</p>
                            </div>
                    </div>
                    <div className={styles.HelpCenterPage_quickStart_cardGroup_card}>
                        <div className={styles.HelpCenterPage_quickStart_cardGroup_card_text}>
                        <h3>Как создать курс</h3>
                        <p>Пошаговая инструкция по созданию и настройке курсов на платформе</p>
                            </div>
                    </div>
                    <div className={styles.HelpCenterPage_quickStart_cardGroup_card}>
                        <div className={styles.HelpCenterPage_quickStart_cardGroup_card_text}>
                        <h3>Как провести вебинар</h3>
                        <p>Детальная инструкция по проведению и настройке вебинаров на OVERSCHOOL</p>
                            </div>
                    </div>
                    <div className={styles.HelpCenterPage_quickStart_cardGroup_card}>
                        <div className={styles.HelpCenterPage_quickStart_cardGroup_card_text}>
                        <h3>Как добавить учеников</h3>
                        <p>Инструкция по всем способам: ручным и автоматическим</p>
                            </div>
                    </div>
                </div>

            </div>



            <h1>lol kek</h1>
        </section>
    )
}
