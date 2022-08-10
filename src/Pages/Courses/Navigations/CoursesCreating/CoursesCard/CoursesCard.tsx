import React, { FC } from 'react'
import Public from '../../../../../assets/img/createCourse/public.svg'
import { Button } from '../../../../../components/common/Button/Button'

import styles from '../coursePage.module.scss'
import { CoursesT } from '../../../../../store/redux/courses/slice'

export const CoursesCard: FC<CoursesT> = ({
  course_id,
  created_at,
  updated_at,
  published,
  order,
  name,
  format,
  duration_days,
  price,
  description,
  photo,
  author_id,
}) => {
  return (
    <div className={styles.course_card}>
      <div className={styles.course_card_img} />
      <div className={styles.course_card_about}>
        <span className={styles.course_card_status_show}>
          <img src={Public} alt="status course" />
          <span className={styles.course_card_status_show_public}>Опубликован</span>
        </span>
        <h5>{name}</h5>
        <span className={styles.course_card_about_desc}>{description}</span>
        <Button className={styles.btn} text={'Редактировать'} />
      </div>
    </div>
  )
}
