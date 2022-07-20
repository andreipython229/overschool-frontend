import React, {memo, useState} from 'react';
import styles from './courses.module.scss'
import {CoursePage} from "./Navigations/CoursesCreating/CoursePage/CoursePage";
import {AddCourseModal} from "../../Components/Modal/CoursesModal/AddCourseModal";
import {Previous} from "./Previous/Previous";
import noAvatar from "../../assets/img/noAvatar.svg";
import {useAppSelector} from "../../store/redux/store";
import {Route, Routes} from 'react-router-dom';
import {Path} from "../../enum/pathE";
import {RedactorCourse} from "./Navigations/CoursesCreating/RedactorCourse/RedactorCourse";

export const Platform = memo(() => {

    const avatar = useAppSelector(state => state.user.avatar)
    const [showModal, setShowModal] = useState<boolean>(false)

    const setModal = () => {
        setShowModal(!showModal)
    }

    return (
        <div className={styles.container}>
            {showModal ? <AddCourseModal setShowModal={setModal}/> : null}
            <div>
                <Previous avatar={avatar || noAvatar} name={'Название'}/>
            </div>
            <Routes>
                {/*<Route path={Path.Courses} element={<CoursePage/>}/>*/}
                <Route path={Path.CreateCourse} element={<RedactorCourse/>}/>
            </Routes>
            <CoursePage setShowModal={setModal}/>
        </div>
    );
});

