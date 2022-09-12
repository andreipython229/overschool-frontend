import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { NavCreatingCourse } from '../../../NavAccount/NavCreatingCourse/NavCreatingCourse'
import { Constructor } from './Constructor/Constructor'
import { CreateCoursePath } from 'enum/pathE'
import { SettingCourse } from '../SettingCourse/SettingCourse'
import { StudentsStats } from '../../StudentsStats/StudentsStats'

export const RedactorCourse: FC = () => {
  return (
    <div>
      <NavCreatingCourse />
      <Routes>
        <Route path={'/*'} element={<Constructor />} />
        <Route path={CreateCoursePath.Student} element={<StudentsStats />} />
        <Route path={CreateCoursePath.Settings} element={<SettingCourse />} />
      </Routes>
    </div>
  )
}
