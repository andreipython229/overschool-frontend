import { ChangeEvent, FC, memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Path, FooterPath } from 'enum/pathE';

import styles from './footer.module.scss';

export const Footer = () => {

  return (
    <footer className={styles.wrapper}>
        <div className={styles.wrapper_linksBlock}>
            <Link className={styles.wrapper_linksBlock_link} to={`${FooterPath.TariffPlans}`}>
                Возможности
            </Link>
            <Link className={styles.wrapper_linksBlock_link} to={`${FooterPath.TariffPlans}`}>
                Тарифы
            </Link>
            <Link className={styles.wrapper_linksBlock_link} to={`${Path.Courses}`}>
                Справочный центр
            </Link>
            <Link className={styles.wrapper_linksBlock_link} to={`${Path.Courses}`}>
                Правовая политика
            </Link>
        </div>
        <div className={styles.wrapper_appName}>OVERSCHOOL</div>
        <div className={styles.wrapper_social}>@2022, все права защищены</div>   
    </footer>
  )
}