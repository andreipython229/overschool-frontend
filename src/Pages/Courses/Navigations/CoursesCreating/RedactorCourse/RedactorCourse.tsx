import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { NavCreatingCourse } from '../../../NavAccount/NavCreatingCourse/NavCreatingCourse'
import { Constructor } from './Constructor/Constructor'
import { CreateCoursePath, Path } from 'enum/pathE'
import { SettingCourse } from '../SettingCourse/SettingCourse'
import { createPath } from '../../../../../utils/createPath'

export const RedactorCourse: FC = () => {
  return (
    <div>
      <NavCreatingCourse />
      <Routes>
        <Route path={'/*'} element={<Constructor />} />
        <Route path={CreateCoursePath.Student} element={'/'} />
        <Route path={CreateCoursePath.Settings} element={<SettingCourse />} />
      </Routes>
    </div>
  )
}
// to={createPath({
//                  path: Path.CreateCourse,
//                  params: { course_id: course_id },
//                })}
