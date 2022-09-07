import { FC } from 'react'
import { generatePath, Link } from 'react-router-dom'


import { Path } from '../../../enum/pathE'
import { addCourseId } from '../../../store/redux/course/slice'
import { useAppDispatch } from '../../../store/hooks'

import styles from '../courses_stats.module.scss'

type CoursesMiniCardT = {
  photo_url?: string
  name: string
  course_id: string
}

export const CoursesMiniCard: FC<CoursesMiniCardT> = ({ photo_url, name, course_id }) => {
  const dispatch = useAppDispatch()

  const dispatchIdCourses = () => {
    dispatch(addCourseId(course_id))
  }

  return (
    <Link
      to={generatePath(`/login/courses/${Path.CreateCourse}`, {
        course_id: course_id,
      })}
    >
      <div onClick={dispatchIdCourses} className={styles.mini_card_container}>
        <img className={styles.mini_card_img} src={photo_url} alt="" width="52" height="52" />
        <div>
          <p className={styles.mini_card_name}>{name}</p>
          <ul className={styles.mini_card_list}>
            <li>
              <span>23 группы</span>
            </li>
            <li>
              <span>1123 ученика</span>
            </li>
          </ul>
        </div>
      </div>
    </Link>
  )
}
