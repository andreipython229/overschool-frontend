import { useDeleteCoursesMutation } from 'api/coursesServices'
import React, { FC } from 'react'
import { Button } from '../../../../../../components/common/Button/Button'
import { CoursesT } from '../../../../../../store/redux/courses/slice'

type СourseActionsT = {
  courseFind: CoursesT | undefined
}

export const СourseActions: FC<СourseActionsT> = ({ courseFind }) => {
  const [deleteCourses, { data }] = useDeleteCoursesMutation()

  const handleDeleteCourse = () => {
    deleteCourses(courseFind?.course_id)
  }

  return (
    <div>
      <h4>Действия с курсом</h4>
      <Button onClick={handleDeleteCourse} text={'Удалить'} variant={'delete'} />
      <Button text={'Копировать'} variant={'secondary'} />
    </div>
  )
}
