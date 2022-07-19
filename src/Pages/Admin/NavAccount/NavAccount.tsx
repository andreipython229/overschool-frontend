import React, {memo} from 'react';
import {NavAccountBtn} from "./NavAccountBtn/NavAccountBtn";
import styles from './navAccount.module.scss'

export const NavAccount = memo(() => {
    return (
        <div className={styles.nav_account}>
            <NavAccountBtn path={`main`} text={'Основные'}/>
            <NavAccountBtn path={`employees`} text={'Сотрудники'}/>
            <NavAccountBtn path={`logs`} text={'Логи'}/>
            <NavAccountBtn path={`decoration`} text={'Оформление'}/>
        </div>
    );
});

