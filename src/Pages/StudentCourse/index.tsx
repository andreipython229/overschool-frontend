import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { StudentCourseHeader } from './StudentCourseHeader'
import { useFetchCourseQuery } from '../../api/coursesServices'
import { useFetchModulesQuery } from '../../api/modulesServices'
import { CoursesT } from '../../types/CoursesT'
import { StudentAccardion } from 'components/StudentAccardion/StudentAccardion'

export const StudentCourse: FC = () => {
  const { course_id: courseId } = useParams()
  const { data: course } = useFetchCourseQuery(courseId as string)
  const { data: modules } = useFetchModulesQuery(courseId as string)

  return (
    <>
      <StudentCourseHeader course={course as CoursesT} />
      <StudentAccardion modules={modules} />
    </>
  )
}
