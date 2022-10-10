import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { useFetchModulesQuery } from '../../api/modulesServices'
import { StudentAccardion } from '../../components/StudentAccardion/StudentAccardion'

import styles from './CourseModules.module.scss'

export const CourseModules: FC = () => {
  const { course_id: courseId } = useParams()
  const { data: modules } = useFetchModulesQuery(courseId as string)

  return <div className={styles.container}>{modules ? <StudentAccardion modules={modules} /> : null}</div>
}
