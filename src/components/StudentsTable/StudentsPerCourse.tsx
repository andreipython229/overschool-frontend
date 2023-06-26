import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { useFetchCourseStatQuery } from '../../api/courseStat'
import { StudentsTableWrapper } from 'components/StudentsTableWrapper'
import { studentsTableInfoT } from 'types/courseStatT'

export const StudentsPerCourse: FC = () => {
  const { course_id } = useParams()

  const { data, isLoading } = useFetchCourseStatQuery(course_id as string)

  return <StudentsTableWrapper students={data as studentsTableInfoT} isLoading={isLoading} />
}
