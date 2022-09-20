import { FC } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import { NavCreatingCourse } from '../../../NavAccount/NavCreatingCourse/NavCreatingCourse'
import { Constructor } from './Constructor/Constructor'
import { CreateCoursePath } from 'enum/pathE'
import { SettingCourse } from '../SettingCourse/SettingCourse'
import { StudentsStats } from '../../StudentsStats/StudentsStats'
import { useFetchCourseQuery } from 'api/coursesServices'
import { CoursesT } from 'types/CoursesT'

export const RedactorCourse: FC = () => {
  const { course_id: courseId } = useParams()
  const { data } = useFetchCourseQuery(courseId as string)

  return (
    <div>
      <NavCreatingCourse />
      <Routes>
        <Route path={'/*'} element={<Constructor />} />
        <Route path={CreateCoursePath.Student} element={<StudentsStats />} />
        <Route path={CreateCoursePath.Settings} element={<SettingCourse course={data as CoursesT} />} />
      </Routes>
    </div>
  )
}
