import React, {ChangeEvent, FC, useState} from 'react';
import styles from '../../Modal.module.scss'
import {Input} from "../../../common/Input/Input/Input";
import {Checkbox} from "../../../common/Checkbox/Checkbox";
import {Button} from "../../../common/Button/Button";
import {Radio} from "../../../common/Radio/Radio";

type TestModalPropsT = {
    goToBack: () => void
    addCourse: (name: string, type: string) => void
}

export const TestModal: FC<TestModalPropsT> = ({goToBack, addCourse}) => {

    const [nameClasses, setNameClasses] = useState<string>('')
    const [percent, setPercent] = useState<string>('60')
    const [settingsActive, setSettingsActive] = useState<number>(0)
    const [attempts, setAttempts] = useState<string>('1')
    const [randomQuestions, setRandomQuestions] = useState<boolean>(false)
    const [shuffleAnswers, setShuffleAnswers] = useState<boolean>(false)
    const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false)
    const [numberOfAttempts, setNumberOfAttempts] = useState<boolean>(false)

    const changeAttempts = (event: ChangeEvent<HTMLInputElement>) => {
        setAttempts(event.currentTarget.value)
    }


    const changeName = (event: ChangeEvent<HTMLInputElement>) => {
        setNameClasses(event.currentTarget.value)
    }
    const changePercent = (event: ChangeEvent<HTMLInputElement>) => {
        setPercent(event.currentTarget.value)
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.classesContainer}>
                <div className={styles.test}>
                    <svg width="47" height="63" viewBox="0 0 47 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M32.4156 6.2649V2.20029C32.4156 1.55462 31.8595 0.998535 31.2138 0.998535H16.1761C15.5305 0.998535 14.9744 1.55462 14.9744 2.20029V6.2649H4.56475C2.20592 6.2649 0.317383 8.15344 0.317383 10.5123V58.3537C0.317383 60.7126 2.20592 62.6011 4.56475 62.6011H42.3176C44.6765 62.6011 46.565 60.7126 46.565 58.3537V10.5123H46.5651L46.5649 10.5051C46.4977 8.15325 44.6143 6.2649 42.2542 6.2649H32.4156ZM16.1761 19.0742H31.2138C31.8595 19.0742 32.4156 18.5182 32.4156 17.8725V13.9982H38.5779V54.5505H8.24106V14.0617H14.9744V17.8725C14.9744 18.5925 15.5416 19.0742 16.1761 19.0742ZM30.0121 3.40204V12.7965V16.6707H17.3779V12.7965V7.40321V3.40204H30.0121ZM44.098 58.2903C44.098 59.2943 43.2582 60.1341 42.2542 60.1341H4.56475C3.56072 60.1341 2.72089 59.2943 2.72089 58.2903V10.5123C2.72089 9.50823 3.56071 8.66841 4.56475 8.66841H14.9744V11.6582H7.03931C6.39363 11.6582 5.83755 12.2143 5.83755 12.8599V55.8157C5.83755 56.4614 6.39363 57.0175 7.03931 57.0175H39.7796C40.4253 57.0175 40.9814 56.4614 40.9814 55.8157V12.8599C40.9814 12.2143 40.4253 11.6582 39.7796 11.6582H32.4156V8.66841H42.2542C43.2582 8.66841 44.098 9.50824 44.098 10.5123V58.2903Z"
                            fill="#CACDD2" stroke="#CACDD2" strokeWidth="0.5" strokeLinecap="round"
                            strokeLinejoin="round"/>
                        <path
                            d="M10.0898 29.547C10.0898 30.1926 10.6459 30.7487 11.2916 30.7487H35.7199C36.3656 30.7487 36.9217 30.1926 36.9217 29.547C36.9217 28.9013 36.3656 28.3452 35.7199 28.3452H11.2916C10.6459 28.3452 10.0898 28.9013 10.0898 29.547Z"
                            fill="#CACDD2" stroke="#CACDD2" strokeWidth="0.5" strokeLinecap="round"
                            strokeLinejoin="round"/>
                        <path
                            d="M35.7199 35.0078H11.2916C10.6459 35.0078 10.0898 35.5639 10.0898 36.2096C10.0898 36.8552 10.6459 37.4113 11.2916 37.4113H35.7199C36.3656 37.4113 36.9217 36.8552 36.9217 36.2096C36.9217 35.5639 36.3656 35.0078 35.7199 35.0078Z"
                            fill="#CACDD2" stroke="#CACDD2" strokeWidth="0.5" strokeLinecap="round"
                            strokeLinejoin="round"/>
                        <path
                            d="M35.7199 41.9873H11.2916C10.6459 41.9873 10.0898 42.5434 10.0898 43.1891C10.0898 43.8347 10.6459 44.3908 11.2916 44.3908H35.7199C36.3656 44.3908 36.9217 43.8347 36.9217 43.1891C36.9217 42.5434 36.3656 41.9873 35.7199 41.9873Z"
                            fill="#CACDD2" stroke="#CACDD2" strokeWidth="0.5" strokeLinecap="round"
                            strokeLinejoin="round"/>
                    </svg>
                    <span className={styles.classesContainer_title}>Настройте тест</span>
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
                    <span className={styles.usually_title}>Название теста:</span>
                    <Input placeholder={'Основы языка HTML'} name={'name classes'}
                           onChange={(e) => changeName(e)} type={'text'}
                           value={nameClasses}/>
                </div>

                {settingsActive === 0
                    ? <>
                        <div style={{marginTop: '15px'}} className={styles.usually_input}>
                            <span className={styles.usually_title}>Процент правильных ответов для выполнения:</span>
                            <Input placeholder={'Процент ответов'} name={'name classes'}
                                   onChange={(e) => changePercent(e)} type={'text'}
                                   value={percent}/>
                        </div>
                        <div className={styles.test_checkboxPack}>
                            <div className={styles.test_checkbox}>
                                <Checkbox id={'attempts'} name={'Number of attempts'} checked={numberOfAttempts}
                                          onChange={() => setNumberOfAttempts(!numberOfAttempts)}/>
                                <div>
                                    <span className={numberOfAttempts ? styles.test_checkbox_text_checked : ''}>Ограничить количество попыток</span>
                                </div>
                                {numberOfAttempts && <input className={styles.test_checkbox_attempts} type="text"
                                                            onChange={(event) => changeAttempts(event)}
                                                            value={attempts}/>}
                            </div>
                            <div className={styles.test_checkbox}>
                                <Checkbox id={'randomQuestions'} name={'Random Questions'} checked={randomQuestions}
                                          onChange={() => setRandomQuestions(!randomQuestions)}/>
                                <div className={styles.test_checkbox_text}>
                                    <span className={randomQuestions ? styles.test_checkbox_text_checked : ''}>Ограничить количество попыток</span>
                                    <span
                                        className={styles.test_checkbox_text_desc}>Вопросы будут задаваться в случайном порядке </span>
                                </div>
                            </div>
                            <div className={styles.test_checkbox}>
                                <Checkbox id={'shuffleAnswers'} name={'Shuffle Answer'} checked={shuffleAnswers}
                                          onChange={() => setShuffleAnswers(!shuffleAnswers)}/>
                                <div className={styles.test_checkbox_text}>
                                    <span className={shuffleAnswers ? styles.test_checkbox_text_checked : ''}>Перемешивать варианты ответов</span>
                                    <span
                                        className={styles.test_checkbox_text_desc}>Варианты ответов будут отображаться в случайном порядке</span>
                                </div>
                            </div>
                            <div className={styles.test_checkbox}>
                                <Checkbox id={'showCorrectAnswer'} name={'Show correct Answer'}
                                          checked={showCorrectAnswer}
                                          onChange={() => setShowCorrectAnswer(!showCorrectAnswer)}/>
                                <div className={styles.test_checkbox_text}>
                                    <span className={showCorrectAnswer ? styles.test_checkbox_text_checked : ''}>Показывать правильные варианты ответов</span>
                                    <span
                                        className={styles.test_checkbox_text_desc}>После завершения тестирования будут отображены правильные ответы на вопросы</span>
                                </div>
                            </div>
                        </div>
                    </>
                    : <div className={styles.test_grade}>
                        <span className={styles.test_grade_title}>Как выдавать баллы ученикам:</span>
                        <div className={styles.test_grade_radio}>
                            <Radio title={'За успешно пройденный тест'} id={'success'}/>
                            <div className={styles.test_grade_radio_input}>
                                <input type={'number'} placeholder={'0'} className={styles.usually_grade_points}/>
                                <span>баллов</span>
                            </div>
                        </div>
                        <div>
                            <Radio title={'За каждый правильный ответ'} id={'success'}/>
                            <div className={styles.test_grade_radio_input}>
                                <input type={'number'} placeholder={'0'} className={styles.usually_grade_points}/>
                                <span>баллов</span>
                            </div>
                        </div>
                    </div>

                }


                <div className={styles.btnBlock}>
                    <Button onClick={goToBack} text={'Назад'}/>
                    <Button onClick={() => addCourse(nameClasses, 'test')} text={'Добавить занятие'}
                            variant={'primary'}/>
                </div>

            </div>
        </div>
    );
};

