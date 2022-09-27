import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'

import { AddCourseModal } from 'components/Modal'
import { useAppSelector } from '../../store/hooks'
import { useFetchCoursesQuery } from '../../api/coursesServices'
import { selectUser } from 'selectors'
import { useBoolean } from 'customHooks/useBoolean'

export const School: FC = memo(() => {
  const { permission } = useAppSelector(selectUser)
  const [isOpen, { onToggle }] = useBoolean()

  const { data: coursesList } = useFetchCoursesQuery()

  return (
    <>
      {isOpen && <AddCourseModal setShowModal={onToggle} />}
      <Outlet />
    </>
  )
})
