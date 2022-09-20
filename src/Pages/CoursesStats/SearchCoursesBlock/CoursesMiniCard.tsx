import { FC } from 'react'
import { generatePath, Link } from 'react-router-dom'

import { Path } from '../../../enum/pathE'
import { addCourseId } from '../../../store/redux/course/slice'
import { useAppDispatch } from '../../../store/hooks'
import { studentsGroupT } from '../../../types/studentsGroup'

import styles from '../courses_stats.module.scss'

type CoursesMiniCardT = {
  photo_url?: string
  name: string
  courseId: string
  groups: studentsGroupT[]
}

// need to change logic of labels' naming  

export const CoursesMiniCard: FC<CoursesMiniCardT> = ({ photo_url, name, courseId, groups }) => {
  const dispatch = useAppDispatch()

  const dispatchIdCourses = () => {
    dispatch(addCourseId(courseId))
  }

  const filteredGroups = groups?.filter(({ course_id }) => course_id === +courseId)
  const quantutyOfStudents = filteredGroups.reduce((acc, group) => acc + group.students[0], 0)

  return (
    <Link
      to={generatePath(`/login/courses/${Path.CreateCourse}`, {
        course_id: courseId,
      })}
    >
      <div onClick={dispatchIdCourses} className={styles.mini_card_container}>
        <img className={styles.mini_card_img} src={photo_url} alt="" width="52" height="52" />
        <div>
          <p className={styles.mini_card_name}>{name}</p>
          <ul className={styles.mini_card_list}>
            <li>
              <span>
                {filteredGroups.length === 1 || filteredGroups.length % 10 === 1
                  ? `${filteredGroups.length} группа`
                  : `${filteredGroups.length} группы`}
              </span>
            </li>
            <li>
              <span>
                {quantutyOfStudents === 1 || quantutyOfStudents % 10 === 1 ? `${quantutyOfStudents} ученик` : `${quantutyOfStudents} ученика`}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </Link>
  )
}
