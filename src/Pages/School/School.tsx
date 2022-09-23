import { FC, memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import { CoursePage } from 'Pages/School/Navigations/CoursesCreating/CoursePage'
import { AddCourseModal } from 'components/Modal'
import { useAppSelector } from '../../store/hooks'
import { Path, Student } from 'enum/pathE'
import { RedactorCourse } from './Navigations/CoursesCreating/RedactorCourse/RedactorCourse'
import { Settings } from '../Settings/Settings'
import { RoleE } from 'enum/roleE'
import { useFetchCoursesQuery } from '../../api/coursesServices'
import { CoursesT } from '../../types/CoursesT'
import { selectUser } from 'selectors'
import { useBoolean } from 'customHooks/useBoolean'

import styles from './school.module.scss'

export const School: FC = memo(() => {
  const { permission } = useAppSelector(selectUser)
  const [isOpen, { onToggle }] = useBoolean()

  const { data: coursesList } = useFetchCoursesQuery()

  return (
    <div className={styles.container}>
      {isOpen && <AddCourseModal setShowModal={onToggle} />}
      <Routes>
        {permission === RoleE.SuperAdmin ? (
          <Route path={'/*'} element={<Settings />} />
        ) : (
          <Route path={'/*'} element={<CoursePage setShowModal={onToggle} courses={coursesList as CoursesT[]} />} />
        )}
        <Route path={Path.CreateCourse} element={<RedactorCourse />} />
      </Routes>
    </div>
  )
})
