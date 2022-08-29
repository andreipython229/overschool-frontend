import { Route, Routes } from 'react-router-dom'
import { Path, Student } from 'enum/pathE'

import styles from './App.module.scss'
import { MobileInitPage } from 'MobilePages/MobileInitPage/MobileInitPage'
import { MobileLayOut } from 'MobilePages/layout/MobileLayOut'
import { MobileCoursesPage } from 'MobilePages/MobileCoursesPage/MobileCoursesPage'
import { MobileCoursePage } from 'MobilePages/MobileCoursePage/MobileCoursePage'
import { PageNotFound } from 'Pages/PageNotFound/PageNotFound'

export const AppMobile = () => {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path={Path.InitialPage} element={<MobileInitPage />} />
        <Route path={Path.InitialPage} element={<MobileLayOut />}>
          <Route path={Student.Courses} element={<MobileCoursesPage />} />
          <Route path={Student.Course} element={<MobileCoursePage />} />
        </Route>
        <Route path={'*'} element={<PageNotFound />} />
      </Routes>
    </div>
  )
}
