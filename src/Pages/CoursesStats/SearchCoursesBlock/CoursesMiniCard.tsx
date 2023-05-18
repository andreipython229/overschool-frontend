import { FC, memo } from 'react'
import { generatePath, Link } from 'react-router-dom'

import { Path } from '../../../enum/pathE'
import { CoursesMiniCardT } from '../../../types/pageTypes'
import { getNounDeclension } from '../../../utils/getNounDeclension'

import styles from '../courses_stats.module.scss'

export const CoursesMiniCard: FC<CoursesMiniCardT> = memo(({ photo_url, name, courseId, groups }) => {
  const filteredGroups = groups?.filter(({ course_id }) => course_id === +courseId)
  const quantutyOfStudents = filteredGroups.reduce((acc, group) => acc + group.students[0], 0)

  return (
    <Link
      to={generatePath(`/login/courses/${Path.CreateCourse}`, {
        course_id: `${courseId}`,
      })}
    >
      <div className={styles.mini_card_container}>
        <img className={styles.mini_card_img} src={window.appConfig.imagePath + photo_url} alt="" width="52" height="52" />
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
