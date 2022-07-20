import React, {FC, memo, useState} from 'react';
import {Previous} from "../Previous/Previous";
import noAvatar from '../../../assets/img/noAvatar.svg'
import {useAppSelector} from "../../../store/redux/store";
import styles from './coursePage.module.scss'
import Public from '../../../assets/img/createCourse/public.svg'
import DontShow from '../../../assets/img/createCourse/notPublic.svg'
import Hide from '../../../assets/img/createCourse/dontShow.svg'
import {Button} from "../../../Components/common/Button/Button";
import {AddCourseModal} from "../../../Components/Modal/CoursesModal/AddCourseModal";

export const CoursePage: FC = memo(() => {
    const avatar = useAppSelector(state => state.user.avatar)
    const [showModal, setShowModal] = useState<boolean>(false)
    const show = 'public'
    const dontShow = 'notPublic'
    const hide = 'hide'
    const setModal = () => {
        setShowModal(!showModal)
    }
    return (
        <div className={styles.container}>
            {showModal ? <AddCourseModal setShowModal={setModal}/> : null}
            <div>
                <Previous avatar={avatar || noAvatar} name={'Название'}/>
            </div>
            <div>
                <input className={styles.input} type="text" placeholder={'Поиск по курсам и категориям'}/>
            </div>

            <div className={styles.course}>
                <div className={styles.course_card}>
                    <div className={styles.course_card_img}/>
                    <div className={styles.course_card_about}>
                    <span className={styles.course_card_status_show}>
                        <img src={Public} alt="status course"/>
                        <span className={styles.course_card_status_show_public}>Опубликован</span>
                    </span>
                        <h5>The Way Python</h5>
                        <span className={styles.course_card_about_desc}>
                        Индивидуальное обучение по программе The Way Python! Ты станешь востребованным IT-разработчиком! У тебя 100% все получится! Здесь и сейчас!
                    </span>
                        <Button className={styles.btn}
                                text={'Редактировать'}/>
                    </div>
                </div>

                <div className={styles.course_card}>
                    <div className={styles.course_card_img}/>
                    <div className={styles.course_card_about}>
                     <span className={styles.course_card_status_show}>
                          <img src={DontShow} alt="status course"/>
                         <span className={styles.course_card_status_show_hide}>Не опубликован</span>
                    </span>
                        <h5>The Way Python</h5>
                        <span className={styles.course_card_about_desc}>
                        Индивидуальное обучение по программе The Way Python! Ты станешь востребованным IT-разработчиком! У тебя 100% все получится! Здесь и сейчас!
                    </span>
                        <Button className={styles.btn}
                                text={'Редактировать'}/>
                    </div>
                </div>


                <div className={styles.course_card}>
                    <div className={styles.course_card_img}/>
                    <div className={styles.course_card_about}>
                     <span className={styles.course_card_status_show}>
                       <img src={Hide} alt="status course"/>
                         <span className={styles.course_card_status_show_hide}>Скрыт настройсками курса</span>
                    </span>
                        <h5>The Way Python</h5>
                        <span className={styles.course_card_about_desc}>
                        Индивидуальное обучение по программе The Way Python! Ты станешь востребованным IT-разработчиком! У тебя 100% все получится! Здесь и сейчас!
                    </span>
                        <Button className={styles.btn}
                                text={'Редактировать'}/>
                    </div>
                </div>

                <div onClick={setModal} className={styles.course_card}>
                    <div className={styles.course_addCourse}>
                        <span>Создать курс</span>
                    </div>
                </div>
            </div>
        </div>


    );
});

