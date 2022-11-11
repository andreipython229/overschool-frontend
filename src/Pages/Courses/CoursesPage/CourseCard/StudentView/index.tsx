import React, { FC } from 'react'
import { generatePath, Link } from 'react-router-dom'
import { Student } from 'enum/pathE'
import { Button } from 'components/common/Button'
import { AdminAndStudentViewT } from '../AdminView'

import pie from 'assets/img/studentPage/folder-todo.png'

import styles from '../../../Navigations/CoursesCreating/coursePage.module.scss'

export const StudentView: FC<AdminAndStudentViewT> = ({ course }) => {
  return (
    <>
      <figure className={styles.course_card_img}>
        <img width="242" height="146" className={styles.course_card_img} src={course?.photo_url} alt={course.name} />
      </figure>
      <div className={styles.course_card_progressBar}>
        <div className={styles.course_card_progressBar_line}> </div>
      </div>
      <div className={styles.course_card_about}>
        <Link
          to={generatePath(Student.Course, {
            course_id: `${course?.course_id}`,
          })}
        >
          <div className={styles.course_card_about_progressWrapper}>
            <img src={pie} alt="pie" />
            <span className={styles.course_card_about_progressWrapper_title}>13% пройдено</span>
          </div>
          <span className={styles.course_card_status_show}> </span>
          <h5>{course.name}</h5>
          <span className={styles.course_card_about_desc}>{course?.description}</span>

          <Button className={styles.btn} text={'Продолжить обучение'} />
        </Link>
      </div>
    </>
  )
}
