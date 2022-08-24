import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../../store/hooks'
import { getIdSelector } from '../../../../selectors'
import { useFindCourse } from '../../../../customHooks/useFindCourse'
import { Button } from '../../../../components/common/Button/Button'
import { Path } from '../../../../enum/pathE'

import styles from '../previou.module.scss'

export const CoursePrevious = () => {
  const id = useAppSelector(getIdSelector)
  const editableCourse = useFindCourse(id)

  return (
    <div className={styles.previous}>
      <img className={styles.background_image_course} src={editableCourse?.photo_url} alt="" />

      <Link className={styles.back_all_course} to={`${Path.Courses}`}>
        <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.625 1.1875L1.3125 6.5L6.625 11.8125" stroke="#BA75FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Все курсы</span>
      </Link>
      <div className={styles.previous_title_name}>{editableCourse?.name}</div>

      <div className={styles.previous_btn}>
        <Button
          variant={'primary'}
          style={{
            width: '220px',
            fontSize: '10px',
            fontWeight: '800',
          }}
          text={'Опубликовать курс'}
          // onClick={onClick}
        />
      </div>
    </div>
  )
}
