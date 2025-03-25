import { useBoolean } from 'customHooks/useBoolean'
import { Path } from 'enum/pathE'
import { RoleE } from 'enum/roleE'
import { FC, useEffect, useState } from 'react'
import { generatePath, Link } from 'react-router-dom'
import { schoolSelector, selectUser } from 'selectors'
import { useAppSelector } from 'store/hooks'
import styles from './courseMiniCard.module.scss'
import { PeopleIconSvg } from 'components/StudentGroupMiniCard/assets/iconsComponents'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { settingsIconPath } from 'config/commonSvgIconsPath'
import bgImage from '../StudentGroupMiniCard/assets/image.png'
import { studentsGroupsT } from 'types/studentsGroup'

interface ICoursesMiniCard {
  title: string
  courseId: number
  groups: studentsGroupsT[]
}

export const CourseMiniCard: FC<ICoursesMiniCard> = ({ courseId, title, groups }) => {
  const { role } = useAppSelector(selectUser)
  const [isModalOpen, { on: close, off: open }] = useBoolean()
  const { schoolName } = useAppSelector(schoolSelector)
  const [quantityOfStudents, setStudents] = useState<number>()
  const [filteredGroups, setGroups] = useState<studentsGroupsT[]>()

  useEffect(() => {
    if (groups) {
      setGroups(groups?.filter(({ course_id }) => course_id === +courseId))
    }
    if (filteredGroups) {
      setStudents(filteredGroups.reduce((acc, group) => acc + group.students.length, 0))
    }
  }, [groups, filteredGroups])
  // const filteredGroups = groups?.filter(({ course_id }) => course_id === +courseId)
  // const quantutyOfStudents = filteredGroups.reduce((acc, group) => acc + group.students.length, 0)

  const pathLink = generatePath(
    role === RoleE.Teacher ? `${Path.School}${Path.CourseStudent}` : `${Path.School}${Path.Courses}${Path.CreateCourse}student`,
    {
      course_id: `${courseId}`,
      school_name: schoolName,
    },
  )
  return (
    <div className={`${styles.wrapper}`} style={{ background: `url(${bgImage}) rgb(119, 119, 119) 50% / cover no-repeat` }}>
      <Link to={pathLink} style={{ zIndex: 20 }}>
        <div className={styles.wrapper_text}>
          <p className={styles.wrapper_text_title}>{title}</p>
          <p className={styles.wrapper_text_description}>
            <PeopleIconSvg />
            {filteredGroups?.length} групп
          </p>
          <p className={styles.wrapper_text_description}>
            <PeopleIconSvg />
            {quantityOfStudents} учеников
          </p>
        </div>
      </Link>
      <div className={`${styles.wrapper_shadow}`} />
    </div>
  )
}
