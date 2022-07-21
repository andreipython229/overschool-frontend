import React, {FC, useState} from 'react';
import styles from '../../Modal.module.scss'
import {Input} from "../../../common/Input/Input/Input";
import {Checkbox} from "../../../common/Checkbox/Checkbox";
import {SelectInput} from "../../../common/SelectInput/SelectInput";
import {Button} from "../../../common/Button/Button";
import {TextEditor} from "../../../common/TextEditor/TextEditor";

const arrNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60]
const arrTime = ['минут', 'часов', 'дней']


type TasksModalPropsT = {
    goToBack: () => void
}
export const TasksModal: FC<TasksModalPropsT> = ({goToBack}) => {
    const [nameClasses, setNameClasses] = useState<string>('')
    const [settingsActive, setSettingsActive] = useState<number>(0)
    const [checkbox, setCheckbox] = useState<boolean>(false)

    return (
        <div className={styles.wrapper}>
            <div className={styles.classesContainer}>
                <div className={styles.tasks}>
                    <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M56.5699 19.6927C56.5719 19.6913 56.574 19.6899 56.5761 19.6885C56.5821 19.6844 56.588 19.6802 56.5938 19.6758C56.9088 19.4396 57.233 19.0579 57.233 18.5229C57.233 18.0494 56.9668 17.5654 56.55 17.3396L32.6653 1.29111C32.6582 1.28635 32.651 1.28177 32.6437 1.27738C32.1716 0.994129 31.5345 0.994129 31.0624 1.27738C31.0555 1.28154 31.0487 1.28588 31.0419 1.29037L1.57335 20.9779C1.48998 21.0221 1.40448 21.0783 1.32509 21.1577C1.23591 21.2469 1.17591 21.3438 1.12946 21.4367C1.10768 21.4802 1.09246 21.5266 1.08413 21.5742C1.03282 21.6724 0.997499 21.7713 0.976569 21.876C0.950935 22.0042 0.951069 22.1268 0.951161 22.2108C0.951167 22.2157 0.951172 22.2204 0.951172 22.225V39.481C0.951172 39.9548 1.21783 40.4392 1.63513 40.6647L25.5204 56.5883C25.7336 56.7304 25.9612 56.8605 26.2998 56.8605C26.571 56.8605 26.8779 56.7767 27.1137 56.5652L56.6339 36.8851C56.6416 36.88 56.6492 36.8746 56.6565 36.8691C56.9715 36.6328 57.2958 36.2512 57.2958 35.7161C57.2958 35.6885 57.2935 35.6611 57.289 35.6339C57.2136 35.1813 56.9772 34.7015 56.5506 34.4704L52.1504 31.4973V22.6191L56.5699 19.6927ZM8.72399 24.7157C8.71432 24.7074 8.70492 24.6999 8.69587 24.6929C8.66111 24.6448 8.61761 24.6027 8.56675 24.569L4.92864 22.1615L31.884 4.25196L53.1908 18.4565L50.233 20.3943C50.0075 20.4813 49.7978 20.6211 49.6415 20.7671L26.2368 36.3703L8.72399 24.7157ZM9.23006 28.5557L25.3949 39.3323C25.4015 39.3367 25.4082 39.341 25.415 39.345C25.8871 39.6283 26.5242 39.6283 26.9963 39.345C27.0032 39.3409 27.0099 39.3366 27.0166 39.3321L49.2679 24.4777V30.9917L26.3586 46.1008L9.23006 35.1288V28.5557ZM7.04958 37.1201C7.05929 37.1273 7.06927 37.1343 7.07949 37.1408L25.6176 49.0403C25.7638 49.1657 25.9271 49.2197 26.0613 49.2441C26.193 49.2681 26.3268 49.268 26.412 49.2679L26.4253 49.2679C26.713 49.2679 26.9786 49.1757 27.1509 49.0896C27.1685 49.0808 27.1856 49.0709 27.202 49.0601L50.3912 33.8074L53.2004 35.7119L26.2375 53.6264L3.77089 38.6487V24.9074L6.41034 26.6367V35.9043C6.41034 36.4064 6.69971 36.8577 7.04958 37.1201Z"
                            fill="#CACDD2" stroke="#CACDD2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path
                            d="M27.5155 12.6548L27.5155 12.6548L27.5235 12.6603L38.6928 20.3157L38.6928 20.3157L38.6981 20.3193C38.9339 20.4765 39.2186 20.5915 39.4775 20.5915C39.7026 20.5915 39.9319 20.5459 40.1461 20.4253C40.3549 20.3079 40.5201 20.1359 40.649 19.9263C41.1254 19.2407 40.9038 18.3803 40.2701 17.9277L40.2701 17.9276L40.2632 17.9229L29.1597 10.2696C28.4721 9.78146 27.6037 10.0019 27.1483 10.6395C26.6566 11.3278 26.8767 12.1985 27.5155 12.6548Z"
                            fill="#CACDD2" stroke="#CACDD2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className={styles.classesContainer_title}>Настройте задания</span>
                </div>
                <div className={styles.navBtn}>
                    <span onClick={() => setSettingsActive(0)}
                          className={settingsActive === 0
                              ? styles.navBtn_btn + ' ' + styles.navBtn_active : styles.navBtn_btn}>
                        Основные</span>
                    <span onClick={() => setSettingsActive(1)}
                          className={settingsActive === 1
                              ? styles.navBtn_btn + ' ' + styles.navBtn_active : styles.navBtn_btn}>
                        Баллы за прохождение</span>
                </div>

                <div style={{marginTop: '15px'}} className={styles.usually_input}>
                    <span className={styles.usually_title}>Название занятие:</span>
                    <Input placeholder={'Основы языка HTML'} name={'name classes'}
                           onChange={(e) => setNameClasses(e.targetValue.value)} type={'text'}
                           value={nameClasses}/>
                </div>
                <div className={styles.tasks_checkbox}>
                    <Checkbox id={'autoTest'} name={'Auto test work'} checked={checkbox}
                              onChange={() => setCheckbox(!checkbox)}/>
                    <div className={styles.tasks_checkbox_desc}>
                        <span>Автоматически принимать работы спустя время</span>
                        <p>После отправки учеником работы спустя указанное количество времени будет автоматически
                            поставлен
                            зачет</p>
                    </div>
                </div>
                <div className={styles.tasks_credit}>
                    <span className={styles.tasks_credit_desc}>Поставить зачёт через</span>
                    <div className={styles.tasks_credit_select}>
                        <SelectInput optionsList={arrNumber}/>
                        <SelectInput optionsList={arrTime}/>
                    </div>
                    <span className={styles.tasks_credit_desc}>после отправки</span>
                </div>
                {checkbox && <TextEditor/>}
                <div className={styles.btnBlock}>
                    <Button onClick={goToBack} text={'Назад'}/>
                    <Button text={'Добавить занятие'} variant={'primary'}/>
                </div>
            </div>

        </div>
    );
};

