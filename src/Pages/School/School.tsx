import { FC, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { CoursePage } from 'Pages/School/Navigations/CoursesCreating/CoursePage'
import { AddCourseModal } from 'components/Modal'
import { useAppSelector } from '../../store/hooks'
import { Path, Student } from 'enum/pathE'
import { RedactorCourse } from './Navigations/CoursesCreating/RedactorCourse/RedactorCourse'
import { Settings } from '../Settings/Settings'
import { RoleE } from 'enum/roleE'
import { StudentCourse } from 'Pages/StudentCourse'
import { useFetchCoursesQuery } from '../../api/coursesServices'
import { CoursesT } from '../../types/CoursesT'
import { selectUser } from '../../selectors/index'
import { useBoolean } from '../../customHooks/useBoolean'
import { StudentLessonPreview } from '../../Pages/StudentCourse/StudentLessonPreview/index'

import styles from './school.module.scss'

export const School: FC = () => {
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

        {permission === RoleE.Student ? (
          <>
            <Route path={'/*'} element={<CoursePage setShowModal={onToggle} courses={coursesList as CoursesT[]} />} />
            <Route path={Student.Course} element={<StudentCourse />} />
            <Route path={Student.Course + Student.Lesson} element={<StudentLessonPreview />} />
          </>
        ) : (
          <Route path={Path.CreateCourse} element={<RedactorCourse />} />
        )}
      </Routes>
    </div>
  )
}
