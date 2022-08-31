import React, { FC } from 'react'
import { useDeleteCoursesMutation } from 'api/coursesServices'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../../../../components/common/Button/Button'
import { CoursesT } from '../../../../../../store/redux/courses/slice'

type CourseActionsT = {
  courseFind: CoursesT | undefined
}

export const CourseActions: FC<CourseActionsT> = ({ courseFind }) => {
  const [deleteCourses] = useDeleteCoursesMutation()

  const navigate = useNavigate()
  const handleDeleteCourse = async () => {
    await deleteCourses(courseFind?.course_id)
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
