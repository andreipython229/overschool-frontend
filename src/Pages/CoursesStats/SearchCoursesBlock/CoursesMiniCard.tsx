import { FC, memo } from 'react'
import { generatePath, Link } from 'react-router-dom'
import bgImage from './assets/image-searchblock.png'
import { PeopleIconSvg } from './assets/iconsComponents'
import { groupsIconPath } from 'config/commonSvgIconsPath'
import { IconSvg } from '@/components/common/IconSvg/IconSvg'
import { Path } from '@/enum/pathE'
import { CoursesMiniCardT } from '@/types/pageTypes'
import { getNounDeclension } from '@/utils/getNounDeclension'
import { RoleE } from 'enum/roleE'

import styles from '../courses_stats.module.scss'
import { useAppSelector } from '@/store/hooks'
import { schoolSelector, selectUser } from '@/selectors'

export const CoursesMiniCard: FC<CoursesMiniCardT> = memo(({ name, courseId, groups, click }) => {
  const filteredGroups = groups?.filter(({ course_id }) => course_id === +courseId)
  const quantutyOfStudents = filteredGroups.reduce((acc, group) => acc + group.students.length, 0)
  const { role } = useAppSelector(selectUser)
  const { schoolName } = useAppSelector(schoolSelector)

  const pathLink = generatePath(
    role === RoleE.Teacher ? `${Path.School}/${Path.CourseStudent}` : `${Path.School}/${Path.Courses}/${Path.CreateCourse}student`,
    {
      course_id: `${courseId}`,
      school_name: schoolName,
    },
  )

  return (
    <>
      <div className={styles.wrapper} style={{ background: `url(${bgImage}) rgb(119, 119, 119) 50% / cover no-repeat` }}>
        <Link to={pathLink} style={{ zIndex: 20 }}>
          <div className={styles.wrapper_text}>
            <p className={styles.wrapper_text_title}>{name}</p>
            <p className={styles.wrapper_text_description}>
              <IconSvg path={groupsIconPath} viewBoxSize="0 0 25 24" width={25} height={24} />
              {filteredGroups.length} {getNounDeclension(filteredGroups.length, ['группа', 'группы', 'групп'])}
            </p>
            <p className={styles.wrapper_text_description}>
              <PeopleIconSvg />
              {quantutyOfStudents} {getNounDeclension(quantutyOfStudents, ['ученик', 'ученика', 'учеников'])}
            </p>
          </div>
        </Link>
        {/* {RoleE.Admin && (
          <div className={styles.wrapper_settings} onClick={open}>
            <IconSvg path={settingsIconPath} viewBoxSize="0 0 24 24" height={24} width={24} />
          </div>
        )} */}
        <div className={`${styles.wrapper_shadow}`} onClick={() => click && click(courseId)} />
      </div>
      {/* <Link to={pathLink}>
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
    </Link> */}
    </>
  )
})
