import React from 'react';
import styles from './pageNotFound.module.scss'
import {useNavigate} from "react-router-dom";


export const PageNotFound = () => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }
    return (
        <div className={styles.main}>

            <div className={styles.main_container}><p> Извините, но страница не существует или не найдена.</p>
                <button className={styles.main_link} onClick={goBack}>Back to start</button>
            </div>
        </div>
    );
};

