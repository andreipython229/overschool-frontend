import { useBoolean } from 'customHooks/useBoolean'
import { Path } from 'enum/pathE'
import { RoleE } from 'enum/roleE'
import { FC, useEffect, useState } from 'react'
import { generatePath, Link } from 'react-router-dom'
import { schoolSelector, selectUser } from 'selectors'
import { useAppSelector } from 'store/hooks'
import styles from './courseMiniCard.module.scss'
import { PeopleIconSvg } from 'components/StudentGroupMiniCard/assets/iconsComponents'
import { groupsIconPath } from "config/commonSvgIconsPath"
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import bgImage from '../StudentGroupMiniCard/assets/image.png'
import { studentsGroupsT } from 'types/studentsGroup'
import { getNounDeclension } from 'utils/getNounDeclension'

interface ICoursesMiniCard {
  title: string
  courseId: number
  groups: studentsGroupsT[]
}

export const CourseMiniCard: FC<ICoursesMiniCard> = ({ courseId, title, groups }) => {
  const { role } = useAppSelector(selectUser)
  const { schoolName } = useAppSelector(schoolSelector)
  const [quantityOfStudents, setStudents] = useState<number>()
  const [filteredGroups, setGroups] = useState<studentsGroupsT[]>()

  useEffect(() => {
    if (groups && !Array.isArray(filteredGroups)) {
      setGroups(groups?.filter(({ course_id }) => course_id === +courseId))
    }
  }, [groups])

  useEffect(() => {
    if (filteredGroups) {
      setStudents(filteredGroups.reduce((acc, group) => acc + group.students.length, 0))
    }
  }, [filteredGroups])

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
            <IconSvg path={groupsIconPath} viewBoxSize="0 0 25 24" width={25} height={24} />
            {filteredGroups?.length + ' ' + getNounDeclension(Number(filteredGroups?.length), ['группа', 'группы', 'групп'])}
          </p>
          <p className={styles.wrapper_text_description}>
            <PeopleIconSvg />
            {quantityOfStudents + ' ' + getNounDeclension(Number(quantityOfStudents), ['ученик', 'ученика', 'учеников'])}
          </p>
        </div>
      </Link>
      <div className={`${styles.wrapper_shadow}`} />
      {!Array.isArray(filteredGroups) && <div className={styles.blurLoad} />}
    </div>
  )
}
