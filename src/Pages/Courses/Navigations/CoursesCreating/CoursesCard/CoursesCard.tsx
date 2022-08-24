import React, { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../../../../components/common/Button/Button'
import { CoursesT } from '../../../../../store/redux/courses/slice'
import { Path } from '../../../../../enum/pathE'
import { createPath } from 'utils/createPath'
import Public from '../../../../../assets/img/createCourse/public.svg'
import notPublic from '../../../../../assets/img/createCourse/notPublic.svg'

import styles from '../coursePage.module.scss'

export const CoursesCard: FC<CoursesT> = memo(({ course_id, published, name, description, photo_url }) => {
  return (
    <div id={course_id && course_id} className={styles.course_card}>
      <div className={styles.course_card_img}>
        <img className={styles.course_card_img} src={photo_url} alt="" />
      </div>
      <div className={styles.course_card_about}>
        <span className={styles.course_card_status_show}>
          {published ? (
            <>
              <img src={Public} alt="status course" />
              <span className={styles.course_card_status_show_public}>Опубликован</span>
            </>
          ) : (
            <>
              <img src={notPublic} alt="status course" />
              <span className={styles.course_card_status_show_public}>Не публикован</span>
            </>
          )}
        </span>
        <h5>{name}</h5>
        <span className={styles.course_card_about_desc}>{description}</span>
        <Link
          to={createPath({
            path: Path.CreateCourse,
            params: { course_id: course_id },
          })}
        >
          <Button className={styles.btn} text={'Редактировать'} />
        </Link>
      </div>
    </div>
  )
})
