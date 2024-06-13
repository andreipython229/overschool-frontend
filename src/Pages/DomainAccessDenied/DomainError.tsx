import {FC, memo, useEffect, useState} from 'react'
import styles from './DomainError.module.scss'

const DomainError: FC = () => {
    return (
        <div className={styles.main}>
            <div className={styles.main_container}>
                <h2>Доступ запрещен</h2>
                <p>Вы пытаетесь получить доступ к ресурсу с неразрешенного домена.</p>
                <p>Пожалуйста, проверьте URL и попробуйте снова. Если проблема не устранена, обратитесь к администратору системы.</p>
            </div>
        </div>
    );
};

export default DomainError;