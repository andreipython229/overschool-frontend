import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCloneCourseMutation, useDeleteCoursesMutation } from 'api/coursesServices'
import { Button } from 'components/common/Button/Button'
import { CoursesDataT } from 'types/CoursesT'

type CourseActionsT = {
  courseFind: CoursesDataT
}

export const CourseActions: FC<CourseActionsT> = ({ courseFind }) => {
  const [deleteCourses, { isSuccess: isSuccessDelete }] = useDeleteCoursesMutation()
  const [clone, { isSuccess: isSuccessClone }] = useCloneCourseMutation()

  const navigate = useNavigate()

  const handleDeleteCourse = async () => {
    courseFind && (await deleteCourses(courseFind?.course_id))
  }

  const handleCloneCourse = async () => {
    courseFind && (await clone(courseFind?.course_id))
  }

  useEffect(() => {
    if (isSuccessDelete || isSuccessClone) {
      navigate('/login/courses/')
    }
  }, [isSuccessDelete, isSuccessClone])

  return (
    <div>
      <h4>Действия с курсом</h4>
      <Button onClick={handleCloneCourse} text={'Копировать'} variant={'secondary'} />
      <Button onClick={handleDeleteCourse} text={'Удалить'} variant={'delete'} />
    </div>
  )
}
