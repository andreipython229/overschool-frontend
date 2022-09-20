import { FC, memo , ReactNode} from 'react'

import { Button } from '../../../../components/common/Button/Button'
import { CoursesT } from '../../../../types/CoursesT'
import { Path } from '../../../../enum/pathE'

import Public from '../../../../assets/img/createCourse/public.svg'
import notPublic from '../../../../assets/img/createCourse/notPublic.svg'

import styles from './coursePage.module.scss'

type courseCard = {
  course: CoursesT
  renderProps: (course: CoursesT) => ReactNode
}

export const CoursesCard: FC<courseCard> = memo(({ course, renderProps }) => {

  return (
    <div id={course.course_id} className={styles.course_card}>
      {renderProps(course)}
    </div>
  )
})
