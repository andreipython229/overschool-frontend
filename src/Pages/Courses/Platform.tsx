import React, { FC, memo, useEffect, useState } from 'react'
import { CoursePage } from 'Pages/Courses/Navigations/CoursesCreating/CoursePage'
import { AddCourseModal } from 'components/Modal'
import { Previous } from './Previous/Previous'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Route, Routes } from 'react-router-dom'
import { Path } from 'enum/pathE'
import { RedactorCourse } from './Navigations/CoursesCreating/RedactorCourse/RedactorCourse'
import { Settings } from './Navigations/Settings/Settings'
import { RoleE } from 'enum/roleE'
import { useFetchCoursesQuery } from '../../api/coursesServices'
import { getCourses } from '../../store/redux/courses/slice'
import { RootState } from '../../store/redux/store'
import { allCoursesSelector } from '../../selectors'

import styles from './courses.module.scss'
import noAvatar from '../../assets/img/noAvatar.svg'

export const Platform: FC = memo(() => {
  const dispatch = useAppDispatch()
  const role = useAppSelector((state: RootState) => state.user.permission)
  const avatar = useAppSelector((state: RootState) => state.user.avatar)
  const { courses } = useAppSelector(allCoursesSelector)

  const [showModal, setShowModal] = useState<boolean>(false)

  const { data: coursesList } = useFetchCoursesQuery(null)

  useEffect(() => {
    if (coursesList) {
      dispatch(getCourses(coursesList))
    }
  }, [coursesList])

  const setModal = () => {
    setShowModal(!showModal)
  }

  return (
    <div className={styles.container}>
      {showModal ? <AddCourseModal setShowModal={setModal} /> : null}
      <div>{role !== 0 && <Previous avatar={avatar || noAvatar} name={'Название'} about={'Онлайн-обучение'} description={'Краткое описание'} />}</div>
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
})
