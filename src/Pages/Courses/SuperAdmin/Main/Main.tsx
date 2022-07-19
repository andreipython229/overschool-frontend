import React, {memo} from 'react';
import styles from '../superAdmin.module.scss'

export const Main = memo(() => {
    return (
        <div className={styles.wrapper_actions}>
        <div className={styles.main}>
            <div className={styles.main_title}>Основные настройки школы</div>
            <div className={styles.main_project}>Название проекта</div>
            <p className={styles.main_description}>Название проекта отображается в шапке на главной странице
                проекта</p>
            <div>
                <input className={styles.main_input} type="text" placeholder={"Название"}/>
                <button className={styles.main_btn}>Применить</button>
            </div>
        </div>
        </div>
    );
})

