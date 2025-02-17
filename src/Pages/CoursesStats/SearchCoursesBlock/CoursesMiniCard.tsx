import { FC, memo } from 'react'
import { generatePath, Link } from 'react-router-dom'

import { Path } from '../../../enum/pathE'
import { CoursesMiniCardT } from '../../../types/pageTypes'
import { getNounDeclension } from '../../../utils/getNounDeclension'
import { RoleE } from 'enum/roleE'

import styles from '../courses_stats.module.scss'
import {useAppSelector} from "../../../store/hooks";
import {selectUser} from "../../../selectors";

export const CoursesMiniCard: FC<CoursesMiniCardT> = memo(({ photo, name, courseId, groups }) => {
  const filteredGroups = groups?.filter(({ course_id }) => course_id === +courseId)
  const quantutyOfStudents = filteredGroups.reduce((acc, group) => acc + group.students.length, 0)
  const { role } = useAppSelector(selectUser)

  const pathLink = generatePath( role === RoleE.Teacher ? `${Path.School}${Path.CourseStudent}` : `${Path.School}${Path.Courses}${Path.CreateCourse}student`, {
    course_id: `${courseId}`,
    school_name: `${localStorage.getItem('school') || window.location.href.split('/')[4]}`
  })

  return (
    <Link to={pathLink}>
      <div className={styles.mini_card_container}>
        <img className={styles.mini_card_img} src={photo} alt="" width="52" height="52" />
        <div>
          <p className={styles.mini_card_name}>{name}</p>
          <ul className={styles.mini_card_list}>
            <li>
              <span>
                {filteredGroups.length} {getNounDeclension(filteredGroups.length, ['группа', 'группы', 'групп'])}
              </span>
            </li>
            <li>
              <span>
                {quantutyOfStudents} {getNounDeclension(quantutyOfStudents, ['ученик', 'ученика', 'учеников'])}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </Link>
  )
})
