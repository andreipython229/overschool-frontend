import React, { FC } from 'react'
import styles from 'MobilePages/MobileCoursesPage/mobileCoursesPage.module.scss'
import { Button } from 'components/common/Button/Button'
import { Link, generatePath} from 'react-router-dom'
import { Student } from 'enum/pathE'

type MobileCoursePropsT = {
  progress: string
  name: string
  desc: string
  img?: string,
  id?: any
}

export const MobileCourseBlock: FC<MobileCoursePropsT> = ({ progress, name, desc, img, id }) => {
  return (
    <div className={styles.courseBlock}>
      <div style={{ backgroundImage: `url(${img})` }} className={styles.courseBlock_image} />
      <div className={styles.progress__inner}>
        <div className={styles.progress__fill} style={{width: `${progress}%`}}></div>
      </div>
      <div className={styles.courseBlock_desc}>
        <span>
          <svg
            width="15"
            height="17"
            viewBox="0 0 15 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="7.5" cy="8.8125" r="7.5" fill="#C7BCE9" />
            <path
              d="M13.5 4.31152C12.8188 3.6002 12 2.81152 11 2.31152C10.0984 1.91504 8.98466 1.33278 7.99998 1.3115L7.66875 9.32887L13.5 4.31152Z"
              fill="#BA75FF"
            />
          </svg>
          {progress}% пройдено
        </span>
        <span>{name}</span>
        <span>{desc}</span>
      </div>
      <div className={styles.courseBlock_desc_btn}>
        <Link to={generatePath(Student.Course, {course_id: id, name})}>
          <Button variant={'disabled'} text={'Продолжить обучение'} />
        </Link>
      </div>
    </div>
  )
}
