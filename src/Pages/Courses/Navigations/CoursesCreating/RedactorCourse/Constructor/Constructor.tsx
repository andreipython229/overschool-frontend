import React, {useState} from 'react';
import styles from "./constructor.module.scss";
import Lesson from "../../../../../../assets/img/createCourse/lesson.svg";
import {Button} from "../../../../../../Components/common/Button/Button";
import {ModalTypeClasses} from "../../../../../../Components/Modal";
import {
    SettingClassesUsually
} from "../../../../../../Components/Modal";
import {useAppDispatch} from "../../../../../../store/redux/store";
import {TasksModal} from "../../../../../../Components/Modal";
import {addClasses} from '../../../../../../store/redux/course/slice';
import {TestModal} from "../../../../../../Components/Modal";
import {WebinarModal} from "../../../../../../Components/Modal";
import {ClassesSettings} from "./ClassesSettings/ClassesSettings";

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

    const closedAllModal = () => {
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

            {activeTypeClasses === 0 &&
                <SettingClassesUsually closedAll={closedAllModal} addCourse={addCourse} goToBack={goToBack}/>}

            {activeTypeClasses === 1 &&
                <TasksModal closedAll={closedAllModal} addCourse={addCourse} goToBack={goToBack}/>}

            {activeTypeClasses === 2 &&
                <TestModal closedAll={closedAllModal} goToBack={goToBack} addCourse={addCourse}/>}
            {activeTypeClasses === 3 &&
                <WebinarModal closedAll={closedAllModal} addCourse={addCourse} goToBack={goToBack}/>}

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
            <ClassesSettings/>
        </div>
    );
};
