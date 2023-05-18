import React, { FC } from 'react'
import { IsPublished } from '../isPublished'
import { generatePath, Link } from 'react-router-dom'
import { Path } from 'enum/pathE'
import { Button } from 'components/common/Button'
import { CoursesDataT } from 'types/CoursesT'

import styles from '../../../Navigations/CoursesCreating/coursePage.module.scss'

type AdminViewT = {
  course: CoursesDataT
}

export const AdminView: FC<AdminViewT> = ({ course }) => {
  return (
    <>
      <div className={styles.course_card_img}>
        <img className={styles.course_card_img} src={window.appConfig.imagePath + course?.photo_url} alt="" />
      </div>
      <div className={styles.course_card_about}>
        <span className={styles.course_card_status_show}>
          <IsPublished published={course?.public} />
        </span>
        <h5>{course.name}</h5>
        <span className={styles.course_card_about_desc}>{course?.description}</span>
        <Link
          to={generatePath(Path.CreateCourse, {
            course_id: `${course?.course_id}`,
          })}
        >
          <Button className={styles.btn} text={'Редактировать'} />
        </Link>
      </div>
    </>
  )
}
