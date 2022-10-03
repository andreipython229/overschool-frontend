import { FC, ReactNode } from 'react'
import { CoursesDataT } from '../../../../types/CoursesT'

import styles from './coursePage.module.scss'

type courseCard = {
  course: CoursesDataT
  renderProps: (course: CoursesDataT) => ReactNode
}

export const CoursesCard: FC<courseCard> = ({ course, renderProps }) => {
  return (
    <div id={course?.course_id} className={styles?.course_card}>
      {renderProps(course)}
    </div>
  )
}
