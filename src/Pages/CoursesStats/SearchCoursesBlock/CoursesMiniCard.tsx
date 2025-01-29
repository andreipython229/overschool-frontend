import React, { FC, memo } from 'react'
import { generatePath, Link } from 'react-router-dom'

import { Path } from '../../../enum/pathE'
import { CoursesMiniCardT } from '../../../types/pageTypes'
import { getNounDeclension } from '../../../utils/getNounDeclension'
import { RoleE } from 'enum/roleE'


import styles from './course_mini_card.module.scss'
import {useAppSelector} from "../../../store/hooks";
import {selectUser} from "../../../selectors";
import bgImage from "../../../components/StudentGroupMiniCard/assets/image.png";
import {PeopleIconSvg} from "../../../components/StudentGroupMiniCard/assets/iconsComponents";

export const CoursesMiniCard: FC<CoursesMiniCardT> = memo(({ active, click,  photo, name, courseId, groups }) => {
  const filteredGroups = groups?.filter(({ course_id }) => course_id === +courseId)
  const quantutyOfStudents = filteredGroups.reduce((acc, group) => acc + group.students.length, 0)
  const { role } = useAppSelector(selectUser)

  const pathLink = generatePath( role === RoleE.Teacher ? `${Path.School}${Path.CourseStudent}` : `${Path.School}${Path.Courses}${Path.CreateCourse}student`, {
    course_id: `${courseId}`,
    school_name: `${localStorage.getItem('school') || window.location.href.split('/')[4]}`
  })

  return (
    // <Link to={pathLink}>
      <div className={`${active ? styles.active : ''} ${styles.wrapper}`} style={{ background: `url(${bgImage}) rgb(119, 119, 119) 50% / cover no-repeat` }}>
        <div className={styles.wrapper_text}>
          <p className={styles.wrapper_text_title}>{name}</p>
          <ul className={styles.wrapper_text_description}>
              <div className={styles.wrapper_text_description_row}>
                  <PeopleIconSvg />
                {filteredGroups.length} {getNounDeclension(filteredGroups.length, ['группа', 'группы', 'групп'])}
              </div>
              <div className={styles.wrapper_text_description_row}>
                  <PeopleIconSvg />
                {quantutyOfStudents} {getNounDeclension(quantutyOfStudents, ['ученик', 'ученика', 'учеников'])}
              </div>
          </ul>
      </div>
          <div className={`${styles.wrapper_shadow}`} onClick={() => click && click(courseId)} />
        </div>
    // </Link>
  )
})
