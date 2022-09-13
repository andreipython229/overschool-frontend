import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDeleteCoursesMutation } from 'api/coursesServices'
import { Button } from '../../../../../components/common/Button/Button'
import { CoursesT } from '../../../../../types/CoursesT'

type CourseActionsT = {
  courseFind: CoursesT
}

export const CourseActions: FC<CourseActionsT> = ({ courseFind }) => {
  const [deleteCourses] = useDeleteCoursesMutation()

  const navigate = useNavigate()
  const handleDeleteCourse = async () => {
    courseFind && (await deleteCourses(courseFind?.course_id))
    navigate('/login/courses/')
  }

  return (
    <div>
      <h4>Действия с курсом</h4>
      <Button text={'Копировать'} variant={'secondary'} />
      <Button onClick={handleDeleteCourse} text={'Удалить'} variant={'delete'} />
    </div>
  )
}
