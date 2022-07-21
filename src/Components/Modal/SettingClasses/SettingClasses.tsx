import React, {FC, useState} from 'react';
import styles from '../Modal.module.scss'
import {Input} from "../../common/Input/Input/Input";
import {Button} from "../../common/Button/Button";

type SettingClassesPropsType = {
    goToBack: () => void
}

export const SettingClassesUsually: FC<SettingClassesPropsType> = ({goToBack}) => {
    const [nameClasses, setNameClasses] = useState('')
    return (
        <div className={styles.wrapper}>
            <div className={styles.classesContainer}>
                <div className={styles.usually_header}>
                    <svg width="60" height="53" viewBox="0 0 60 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.0397 33.2607L6.03949 33.2606C5.61903 33.0463 5.299 32.638 5.299 32.1355V20.6452L1.33925 18.5488L6.0397 33.2607ZM6.0397 33.2607L29.3487 45.1275L29.3491 45.1277M6.0397 33.2607L29.3491 45.1277M29.3491 45.1277C29.592 45.251 29.8609 45.3094 30.1245 45.3094C30.3996 45.3094 30.6835 45.2454 30.9356 45.1084C30.9357 45.1083 30.9359 45.1082 30.936 45.1082L42.3581 38.92V42.5305L37.9045 49.6038L37.9042 49.6042M29.3491 45.1277L37.9042 49.6042M37.9042 49.6042C37.6323 50.0371 37.667 50.5629 37.9764 50.9621L37.9773 50.9633M37.9042 49.6042L37.9773 50.9633M37.9773 50.9633C38.2735 51.3433 38.7594 51.5385 39.2362 51.5385H48.512C48.9897 51.5385 49.4748 51.3432 49.771 50.9633L49.7719 50.9621M37.9773 50.9633L49.7719 50.9621M49.7719 50.9621C50.0806 50.5637 50.1174 50.0374 49.8436 49.6034L45.3902 42.5305V37.2767L52.8375 33.2419C53.2408 33.0234 53.5425 32.6227 53.5425 32.1355V21.2177L58.5842 18.5486C58.9938 18.3317 59.3029 17.928 59.3029 17.4352C59.3029 16.943 58.9952 16.539 58.5848 16.3217L30.7595 1.59068M49.7719 50.9621L30.7595 1.59068M30.7595 1.59068C30.2717 1.3324 29.652 1.3324 29.1641 1.59068M30.7595 1.59068L29.1641 1.59068M29.1641 1.59068L1.33882 16.3217M29.1641 1.59068L1.33882 16.3217M1.33882 16.3217C0.929203 16.5386 0.620117 16.9423 0.620117 17.4352M1.33882 16.3217L0.620117 17.4352M0.620117 17.4352C0.620117 17.9273 0.927783 18.3314 1.33882 18.5486L0.620117 17.4352ZM30.7595 33.2802L30.5256 32.8383L30.7596 33.2802L42.3581 27.1395V35.8283L30.0996 42.47L8.33182 31.3878V22.2508L29.1641 33.2802L29.3981 32.8383L29.1641 33.2802C29.4129 33.4119 29.6908 33.4739 29.9618 33.4739C30.2329 33.4739 30.5108 33.4119 30.7595 33.2802ZM30.7596 16.3217L30.7593 16.3216C30.1102 15.9784 29.2147 16.092 28.7331 16.6661C28.4788 16.9692 28.3888 17.3509 28.4805 17.7155C28.5708 18.074 28.8235 18.3684 29.1641 18.5486C29.1642 18.5486 29.1642 18.5487 29.1642 18.5487L40.9736 24.8007L29.9618 30.6308L5.03741 17.4352L29.9618 4.24006L54.8862 17.4352L51.4803 19.2383C51.3085 19.295 51.1478 19.3788 51.0073 19.4889L43.8745 23.2653L30.7596 16.3217ZM45.9618 48.9242H41.7871L43.8745 45.609L45.9618 48.9242ZM50.5104 22.8233V31.4116L45.3909 34.1855V25.5338L50.5104 22.8233Z"
                            fill="#FFFFFF" stroke="#CACDD2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Настройте занятие</span>
                </div>

                <div className={styles.usually_nav}>
                    <span className={styles.usually_nav_btn}>Основные</span>
                    <span className={styles.usually_nav_btn}>Баллы за прохождение</span>
                </div>
                <div className={styles.usually_input}>
                    <span className={styles.usually_input_title}>Название занятие:</span>
                    <Input placeholder={'Основы языка HTML'} name={'name classes'}
                           onChange={(e) => setNameClasses(e.targetValue.value)} type={'text'}
                           value={nameClasses}/>
                </div>
                <div className={styles.usually_btnBlock}>
                    <Button onClick={goToBack} text={'Назад'}/>
                    <Button text={'Добавить занятие'} variant={'primary'}/>
                </div>

            </div>

        </div>
    );
};

