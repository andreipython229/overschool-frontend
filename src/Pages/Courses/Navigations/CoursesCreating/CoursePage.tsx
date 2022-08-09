import React, { FC, memo } from 'react'
import { useAppSelector } from '../../../../store/hooks'
import styles from 'Pages/Courses/Navigations/CoursesCreating/coursePage.module.scss'
import Public from 'assets/img/createCourse/public.svg'
import DontShow from 'assets/img/createCourse/notPublic.svg'
import Hide from 'assets/img/createCourse/dontShow.svg'
import { Button } from 'components/common/Button/Button'

type CoursePagePropsT = {
  setShowModal: () => void
}

export const CoursePage: FC<CoursePagePropsT> = memo(({ setShowModal }) => {
  // const avatar = useAppSelector((state): any => state.user?.avatar)
  const show = 'public'
  const dontShow = 'notPublic'
  const hide = 'hide'
  return (
    <div className={styles.container}>
      <div>
        <input className={styles.input} type="text" placeholder={'Поиск по курсам и категориям'} />
      </div>

      <div className={styles.course}>
        <div className={styles.course_card}>
          <div className={styles.course_card_img} />
          <div className={styles.course_card_about}>
            <span className={styles.course_card_status_show}>
              <img src={Public} alt="status course" />
              <span className={styles.course_card_status_show_public}>Опубликован</span>
            </span>
            <h5>The Way Python</h5>
            <span className={styles.course_card_about_desc}>
              Индивидуальное обучение по программе The Way Python! Ты станешь востребованным
              IT-разработчиком! У тебя 100% все получится! Здесь и сейчас!
            </span>
            <Button className={styles.btn} text={'Редактировать'} />
          </div>
        </div>

        <div className={styles.course_card}>
          <div className={styles.course_card_img} />
          <div className={styles.course_card_about}>
            <span className={styles.course_card_status_show}>
              <img src={DontShow} alt="status course" />
              <span className={styles.course_card_status_show_hide}>Не опубликован</span>
            </span>
            <h5>The Way Python</h5>
            <span className={styles.course_card_about_desc}>
              Индивидуальное обучение по программе The Way Python! Ты станешь востребованным
              IT-разработчиком! У тебя 100% все получится! Здесь и сейчас!
            </span>
            <Button className={styles.btn} text={'Редактировать'} />
          </div>
        </div>

        <div className={styles.course_card}>
          <div className={styles.course_card_img} />
          <div className={styles.course_card_about}>
            <span className={styles.course_card_status_show}>
              <img src={Hide} alt="status course" />
              <span className={styles.course_card_status_show_hide}>Скрыт настройсками курса</span>
            </span>
            <h5>The Way Python</h5>
            <span className={styles.course_card_about_desc}>
              Индивидуальное обучение по программе The Way Python! Ты станешь востребованным
              IT-разработчиком! У тебя 100% все получится! Здесь и сейчас!
            </span>
            <Button className={styles.btn} text={'Редактировать'} />
          </div>
        </div>

        <div onClick={setShowModal} className={styles.course_card}>
          <div className={styles.course_addCourse}>
            <span>Создать курс</span>
          </div>
        </div>
      </div>
    </div>
  )
})
