import { useParams } from 'react-router-dom'

import { useAppSelector } from '../store/hooks'
import { allCoursesSelector } from '../selectors'
import { CoursesT, ICourses } from '../store/redux/courses/slice'

export const useFindCourse = (id?: string | number) => {
  const { courses }: ICourses = useAppSelector(allCoursesSelector)
  if (id) {
    return courses?.find((course: CoursesT) => course?.course_id === id)
  }
  const { course_id } = useParams()
  return courses?.find((course: CoursesT) => course?.course_id?.toString() === course_id)
}
