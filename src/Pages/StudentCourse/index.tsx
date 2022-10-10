import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { useFetchModulesQuery } from '../../api/modulesServices'
import { StudentAccardion } from 'components/StudentAccardion/StudentAccardion'

export const StudentCourse: FC = () => {
  const { course_id: courseId } = useParams()
  const { data: modules } = useFetchModulesQuery(courseId as string)

  return modules ? <StudentAccardion modules={modules} /> : null
}
