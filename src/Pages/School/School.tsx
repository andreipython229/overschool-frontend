import { FC, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { CoursePage } from 'Pages/School/Navigations/CoursesCreating/CoursePage'
import { AddCourseModal } from 'components/Modal'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Path } from 'enum/pathE'
import { RedactorCourse } from './Navigations/CoursesCreating/RedactorCourse/RedactorCourse'
import { Settings } from '../Settings/Settings'
import { RoleE } from 'enum/roleE'
import { useFetchCoursesQuery } from '../../api/coursesServices'
import { getCourses } from '../../store/redux/courses/slice'
import { selectUser } from '../../selectors/index'
import { allCoursesSelector } from '../../selectors'
import { useBoolean } from '../../customHooks/useBoolean'

import styles from './school.module.scss'

export const School: FC = () => {
  const dispatch = useAppDispatch()
  const { permission } = useAppSelector(selectUser)
  const { courses } = useAppSelector(allCoursesSelector)
  const [isOpen, { onToggle }] = useBoolean()

  const { data: coursesList, isSuccess } = useFetchCoursesQuery(null)

  useEffect(() => {
    if (isSuccess) {
      dispatch(getCourses(coursesList))
    }
  }, [coursesList, courses])

  return (
    <div className={styles.container}>
      {isOpen && <AddCourseModal setShowModal={onToggle} />}
      <Routes>
        {permission === RoleE.SuperAdmin ? (
          <Route path={'/*'} element={<Settings />} />
        ) : (
          <Route path={'/*'} element={<CoursePage setShowModal={onToggle} courses={courses} />} />
        )}
        <Route path={Path.CreateCourse} element={<RedactorCourse />} />
      </Routes>
    </div>
  )
}
