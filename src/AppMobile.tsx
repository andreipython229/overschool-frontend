// import { useAppSelector } from './store/hooks'
// import { authSelector } from 'selectors'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Path, Student } from 'enum/pathE'

import styles from './App.module.scss'
import { MobileInitPage } from 'MobilePages/MobileInitPage/MobileInitPage'
import { MobileLayOut } from 'Pages/layout/MobileLayOut'
import { MobileCoursesPage } from 'MobilePages/MobileCoursesPage/MobileCoursesPage'
import { MobileCoursePage } from 'MobilePages/MobileCoursePage/MobileCoursePage'
import { PageNotFound } from 'Pages/PageNotFound/PageNotFound'

export const AppMobile = () => {
  // const isLogin = useAppSelector(authSelector)
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (!isLogin) {
  //     navigate(Path.InitialPage)
  //   } else {
  //     navigate(`${Path.InitialPage}${Student.Courses}`)
  //   }
  // }, [isLogin, navigate])

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
