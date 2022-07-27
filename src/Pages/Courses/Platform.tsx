import React, {memo, useState} from 'react';
import styles from './courses.module.scss'
import {CoursePage} from "./Navigations/CoursesCreating/CoursePage/CoursePage";
import {AddCourseModal} from "../../components/Modal/CoursesModal/AddCourseModal";
import {Previous} from "./Previous/Previous";
import noAvatar from "../../assets/img/noAvatar.svg";
import {useAppSelector} from "../../store/redux/store";
import {Route, Routes} from 'react-router-dom';
import {Path} from "../../enum/pathE";
import {RedactorCourse} from "./Navigations/CoursesCreating/RedactorCourse/RedactorCourse";
import {Settings} from "./Navigations/Settings/Settings";

export const Platform = memo(() => {

    const {avatar, role} = useAppSelector(state => state.user)
    const [showModal, setShowModal] = useState<boolean>(false)

    const setModal = () => {
        setShowModal(!showModal)
    }

    return (
        <div className={styles.container}>
            {showModal ? <AddCourseModal setShowModal={setModal}/> : null}
            <div>
                {role !== 0 && <Previous avatar={avatar || noAvatar} name={'Название'} about={'Онлайн-обучение'}
                                         description={'Краткое описание'}/>}
            </div>
            <Routes>
                {role === 0
                    ? <Route path={'/*'} element={<Settings/>}/>
                    : <Route path={'/*'} element={<CoursePage setShowModal={setModal}/>}/>}

                <Route path={Path.CreateCourse} element={<RedactorCourse/>}/>
            </Routes>

        </div>
    );
});

