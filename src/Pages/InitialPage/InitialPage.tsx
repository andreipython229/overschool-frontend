import React, {memo, useState} from 'react';
import styles from './initialPage.module.scss'
import {InitPageHeader} from "./InitPageHeader/InitPageHeader";
import {CourseImg} from "./CourseImgBlock/CourseImg";
import {RegistrationModal} from "../../components/Modal/RegistrationModal/RegistrationModal";
import {LoginModal} from "../../components/Modal/LoginModal/LoginModal";
import Python from '../../assets/img/course/python.jpeg'
import Frontend from '../../assets/img/course/frontend.jpg'
import QA from '../../assets/img/course/qa.jpg'
import UI from '../../assets/img/course/ui.jpg'
import java from '../../assets/img/course/java.jpg'
import {useAppDispatch} from "../../store/redux/store";
import {loginUser} from "../../store/redux/users/slice";

export const InitialPage = memo (() => {
    const dispatch = useAppDispatch()

    const [currentCourse, setCurrentCourse] = useState<string>('1')
    const [registrationShow, setRegistrationShow] = useState<boolean>(false)
    const [loginShow, setLoginShow] = useState<boolean>(false)

    const logIn = (value: string | number) => {
        dispatch(loginUser({value}))
    }

    const changeCurrentCourse = (id: string) => setCurrentCourse(id)

    return (
        <div className={styles.init}>
            {registrationShow ? <RegistrationModal setShowModal={setRegistrationShow}/> : null}
            {loginShow ? <LoginModal logIn={logIn} setShowModal={setLoginShow}/> : null}
            <InitPageHeader setLoginShow={setLoginShow} setRegistrationShow={setRegistrationShow}/>
            <div className={styles.init_main}>
                <section>
                    <h1 className={styles.init_main__title}>Маркетплейс образовательных курсов</h1>
                    <div className={styles.init_main__link}>
                        <div>Найди своё направление</div>
                        <div>Вперёд</div>
                    </div>
                </section>
                <CourseImg currentCourse={currentCourse} changeCurrentCourse={changeCurrentCourse}
                           id={'1'} alt={'Python course'} title={'Python'} img={Python}/>
                <CourseImg currentCourse={currentCourse} changeCurrentCourse={changeCurrentCourse}
                           id={'2'} alt={'Java course'} title={'Java'} img={java}/>
                <CourseImg currentCourse={currentCourse} changeCurrentCourse={changeCurrentCourse}
                           id={'3'} alt={'Frontend course'} title={'Front-end'} img={Frontend}/>
                <CourseImg currentCourse={currentCourse} changeCurrentCourse={changeCurrentCourse}
                           id={'4'} alt={'UI/UX course'} title={'UX/UI Design'} img={UI}/>
                <CourseImg currentCourse={currentCourse} changeCurrentCourse={changeCurrentCourse}
                           id={'5'} alt={'QA course'} title={'QA'} img={QA}/>

            </div>
        </div>
    );
});

