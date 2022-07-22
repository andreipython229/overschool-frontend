import React, {useState} from 'react';
import styles from "./constructor.module.scss";
import Lesson from "../../../../../../assets/img/createCourse/lesson.svg";
import {Button} from "../../../../../../Components/common/Button/Button";
import {Toggle} from "@skbkontur/react-ui";
import {ContentBtn} from "../ContentBtn/ContentBtn";
import Text from "../../../../../../assets/img/createCourse/text.svg";
import Video from "../../../../../../assets/img/createCourse/video.svg";
import Audio from "../../../../../../assets/img/createCourse/audio.svg";
import Code from "../../../../../../assets/img/createCourse/code.svg";
import {ModalTypeClasses} from "../../../../../../Components/Modal/ModalTypeClasses/ModalTypeClasses";
import {
    SettingClassesUsually
} from "../../../../../../Components/Modal/ModalTypeClasses/UsuallyClasses/UsuallyClasses";
import {useAppDispatch} from "../../../../../../store/redux/store";
import {TasksModal} from "../../../../../../Components/Modal/ModalTypeClasses/TasksModal/TasksModal";
import {addClasses} from '../../../../../../store/redux/course/slice';
import {TestModal} from "../../../../../../Components/Modal/ModalTypeClasses/TestModal/TestModal";

export const Constructor = () => {
    const dispatch = useAppDispatch()
    const [typeClassesModal, setTypeClassesModal] = useState<boolean>(false)
    const [activeTypeClasses, setActiveTypeClasses] = useState<null | number>(null)


    const setModalTypeClasses = () => {
        setTypeClassesModal(!typeClassesModal)
    }

    const goToBack = () => {
        setModalTypeClasses()
        setActiveTypeClasses(null)
    }

    const setTypeModal = (id: number) => {
        setActiveTypeClasses(id)
        setModalTypeClasses()
    }

    const addCourse = (name: string, type: string) => {
        setActiveTypeClasses(null)
        dispatch(addClasses({name, type}))
    }

    return (

        <div className={styles.redactorCourse}>

            {typeClassesModal && <ModalTypeClasses changeClasses={setTypeModal} closeModal={setModalTypeClasses}/>}

            {activeTypeClasses === 0 && <SettingClassesUsually addCourse={addCourse} goToBack={goToBack}/>}

            {activeTypeClasses === 1 && <TasksModal addCourse={addCourse} goToBack={goToBack}/>}

            {activeTypeClasses === 2 && <TestModal goToBack={goToBack} addCourse={addCourse}/>}


            <div className={styles.redactorCourse_leftSide}>
                <h5 className={styles.redactorCourse_leftSide_title}>Структура курса</h5>
                <div className={styles.redactorCourse_leftSide_desc}>
                    <span className={styles.redactorCourse_leftSide_desc_title}>Первый модуль</span>
                    <span className={styles.redactorCourse_leftSide_desc_lesson}>
                            <img src={Lesson} alt="Lessons"/>
                            Первый урок
                        </span>
                    <Button onClick={setModalTypeClasses} style={{width: '236px'}} text={'+ Занятие'}/>
                    <div className={styles.hl}/>
                    <Button style={{width: '236px'}} text={'+ Модуль'} variant={'primary'}/>
                </div>
            </div>
            <div className={styles.redactorCourse_rightSide}>
                <div className={styles.redactorCourse_rightSide_header}>
                    <span className={styles.redactorCourse_rightSide_title}>Первый урок</span>
                    <div className={styles.redactorCourse_rightSide_header_btnBlock}>
                        <Button text={' Настройки'}/> <Button text={'delete'}/>
                    </div>
                </div>
                <div className={styles.redactorCourse_rightSide_functional}>
                    <div className={styles.redactorCourse_rightSide_functional_content}>
                        <span className={styles.redactorCourse_rightSide_title}>Содержание занятия</span>
                        <div>
                                <span
                                    className={styles.redactorCourse_rightSide_functional_content_preview}>Предпросмотр</span>
                            <Toggle/>
                        </div>
                    </div>
                    <section className={styles.redactorCourse_rightSide_functional_creating}>
                        <div className={styles.redactorCourse_rightSide_functional_creating_title}>Добавить
                            контент
                        </div>
                        <div className={styles.redactorCourse_rightSide_functional_creating_function}>
                            <ContentBtn text={'Текс'} alt={'Add text for lesson'} src={Text}/>
                            <ContentBtn text={'Видео'} alt={'Add video for lesson'} src={Video}/>
                            <ContentBtn text={'Аудио'} alt={'Add audio for lesson'} src={Audio}/>
                            <ContentBtn text={'Код'} alt={'Add code for lesson'} src={Code}/>
                        </div>
                    </section>
                    <span className={styles.redactorCourse_rightSide_title}>Прикреплённые файлы</span>
                    <Button style={{marginTop: '16px', marginBottom: '8px'}} text={'Прикрепить файлы'}/>
                    <span
                        className={styles.redactorCourse_rightSide_desc}>Любые файлы размером не более 2 гигабайта</span>
                </div>
            </div>
        </div>
    );
};
