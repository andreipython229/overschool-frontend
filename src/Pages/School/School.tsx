import { FC, memo, useEffect, useState } from 'react'
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

import styles from './school.module.scss'

export const School: FC = memo(() => {
  const dispatch = useAppDispatch()
  const { permission } = useAppSelector(selectUser)
  const { courses } = useAppSelector(allCoursesSelector)
  const { data: coursesList, isSuccess } = useFetchCoursesQuery(null)

  const [showModal, setShowModal] = useState<boolean>(false)


  useEffect(() => {
    if (isSuccess) {
      dispatch(getCourses(coursesList))
    }
  }, [coursesList, courses])

  const setModal = () => {
    setShowModal(!showModal)
  }

  return (
    <div className={styles.container}>
      {showModal ? <AddCourseModal setShowModal={setModal} /> : null}

      <Routes>
        {permission === RoleE.SuperAdmin ? (
          <Route path={'/*'} element={<Settings />} />
        ) : (
          <Route path={'/*'} element={<CoursePage setShowModal={setModal} courses={courses} />} />
        )}
        <Route path={Path.CreateCourse} element={<RedactorCourse />} />
      </Routes>
    </div>
  )
})
