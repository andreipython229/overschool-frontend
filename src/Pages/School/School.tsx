import React, { FC, useEffect, useState } from 'react'
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
import { RootState } from '../../store/redux/store'
import { allCoursesSelector } from '../../selectors'

import styles from './school.module.scss'

export const School: FC = () => {
  const dispatch = useAppDispatch()
  const role = useAppSelector((state: RootState) => state.user.permission)

  const [showModal, setShowModal] = useState<boolean>(false)

  const { data: coursesList, isSuccess } = useFetchCoursesQuery(null)

  const { courses } = useAppSelector(allCoursesSelector)

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
        {role === RoleE.SuperAdmin ? (
          <Route path={'/*'} element={<Settings />} />
        ) : (
          <Route path={'/*'} element={<CoursePage setShowModal={setModal} courses={courses} />} />
        )}
        <Route path={Path.CreateCourse} element={<RedactorCourse />} />
      </Routes>
    </div>
  )
}
