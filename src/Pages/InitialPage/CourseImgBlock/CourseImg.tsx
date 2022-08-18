import React, { FC, memo } from 'react'
import styles from '../initialPage.module.scss'

type CourseImgPropsT = {
  currentCourse: string
  changeCurrentCourse: (id: string) => void
  id: string
  // alt: string;
  style: object
  title: string
}

export const CourseImg: FC<CourseImgPropsT> = memo(
  ({ currentCourse, changeCurrentCourse, id, style, title }) => {
    return (
      <section className={styles.init_main_course}>
        <div
          className={
            currentCourse === id
              ? styles.init_main_course_block
              : styles.init_main_course_block + ' ' + styles.smallImg
          }
          style={style}
          onMouseEnter={() => changeCurrentCourse(id)}
          onMouseLeave={() => changeCurrentCourse('')}
        >
          <h2
            className={
              currentCourse === id
                ? styles.init_main_course_block_title
                : styles.init_main_course_block_title + ' ' + styles.title_rotate
            }
          >
            {title}
          </h2>
        </div>
      </section>
    )
  },
)
