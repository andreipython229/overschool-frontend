import { FC, memo , ReactNode} from 'react'
import { generatePath, Link } from 'react-router-dom'

import { Button } from '../../../../components/common/Button/Button'
import { CoursesT } from '../../../../types/CoursesT'
import { Path } from '../../../../enum/pathE'
import { useAppDispatch } from '../../../../store/hooks'
import { addCourseId } from 'store/redux/course/slice'

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
