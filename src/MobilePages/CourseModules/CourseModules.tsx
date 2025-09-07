import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { sectionsT } from '../../types/sectionT'
import { useFetchModulesQuery } from '../../api/modulesServices'
import { StudentAccardion } from '../../components/StudentAccardion/StudentAccardion'

import styles from './CourseModules.module.scss'

export const CourseModules: FC = () => {
  const schoolName = window.location.href.split('/')[4]
  const { course_id: courseId } = useParams()
  const { data: modules } = useFetchModulesQuery({ id: courseId as string, schoolName })

  return (
    <div className={styles.container}>
      <StudentAccardion modules={modules as sectionsT} />
    </div>
  )
}
