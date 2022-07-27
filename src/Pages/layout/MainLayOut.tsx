import React, {FC, memo} from 'react';
import {Outlet} from 'react-router-dom';
import {Header} from "components/Header/Header";
import {Navbar} from "components/Navbar/Navbar";
import styles from './mainLayOut.module.scss'

export const MainLayOut: FC = memo(() => {
    return (
        <div className={styles.wrapper}>
            <Navbar/>
            <Header/>
            <main className={styles.container}>
                <Outlet/>
            </main>
        </div>
    );
})

