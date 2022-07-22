import React, {memo} from 'react';
import styles from '../superAdmin.module.scss'
import {UserLogs} from "./UserLogs/UserLogs";

export const Logs = memo (() => {
    return (
        <div className={styles.wrapper_actions}>
            <div className={styles.logs}>
                <div className={styles.logs_title}>Логи</div>
                <div className={styles.logs_table}>
                    <div className={styles.logs_table_title}>
                        <div>Пользователь</div>
                        <div>Роль</div>
                        <div>Время</div>
                    </div>
                    <UserLogs
                        contacts={'Email/Номер телефона юзера'}
                        whatDoing={'Что сделал'}
                        time={'12:34'}/>
                </div>
            </div>
        </div>
    );
});

