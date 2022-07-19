import React, {memo} from 'react';
import styles from './admin.module.scss'
import {CoursePage} from "./CoursesCreating/CoursePage";

export const Platform = memo(() => {

    return (
        <div className={styles.container}>
            <CoursePage/>
        </div>
    );
});

