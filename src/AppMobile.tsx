import { Route, Routes } from 'react-router-dom'

import { Path, Student } from 'enum/pathE'
import { MobileInitPage } from 'MobilePages/MobileInitPage/MobileInitPage'
import { MobileLayOut } from 'MobilePages/MobileLayOut'
import { MobileCoursesPage } from 'MobilePages/MobileCoursesPage/MobileCoursesPage'
import { CourseModules } from 'MobilePages/CourseModules/CourseModules'
import { PageNotFound } from 'Pages/PageNotFound/PageNotFound'
import { StudentLessonPreview } from './Pages/StudentCourse/StudentLessonPreview'
import { Profile } from 'Pages/Profile/Profile'
import { ChooseSchool } from './MobilePages/MobileChooseSchool/ChooseSchool'

import styles from './App.module.scss'

export const AppMobile = () => {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path={Path.InitialPage} element={<MobileInitPage />} />
        <Route path={Path.ChooseSchool} element={<ChooseSchool />} />
        <Route path={Path.InitialPage} element={<MobileLayOut />}>
          <Route path={Path.Courses}>
            <Route index element={<MobileCoursesPage />} />
            <Route path={Student.Course}>
              <Route index element={<CourseModules />} />
              <Route path={Student.Lesson} element={<StudentLessonPreview />} />
            </Route>
          </Route>
          <Route path={Path.Profile} element={<Profile />} />
        </Route>
        <Route path={'*'} element={<PageNotFound />} />
      </Routes>
    </div>
  )
}
