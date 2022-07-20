import React from 'react';
import {NavAccountBtn} from "../NavAccountBtn/NavAccountBtn";
import {createCoursePath} from "../../../../enum/pathE";
import styles from './navCreatingCourse.module.scss'

export const NavCreatingCourse = () => {
    return (
        <div className={styles.creatingCourse}>
            <NavAccountBtn text={'Конструктор'} path={createCoursePath.Constructor}/>
            <NavAccountBtn text={'Ученики курса'} path={createCoursePath.Student}/>
            <NavAccountBtn text={'Настройки курса'} path={createCoursePath.Settings}/>
        </div>
    );
};

