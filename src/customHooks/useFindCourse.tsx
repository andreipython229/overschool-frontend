import { useParams } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { allCoursesSelector } from '../selectors'
import { CoursesT, ICourses } from '../store/redux/courses/slice'

export const useFindCourse = () => {
  const { course_id } = useParams()

  const { courses }: ICourses = useAppSelector(allCoursesSelector)

  return courses?.find((course: CoursesT) => course?.course_id?.toString() === course_id)
}
