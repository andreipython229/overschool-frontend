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
            <h1>lol kek</h1>
        </section>
    )
}
