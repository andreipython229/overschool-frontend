import { Route, Routes, useLocation, useNavigate  } from 'react-router-dom'
import { useEffect } from 'react'

import { Path, Student, FooterPath } from 'enum/pathE'
import { MobileInitPage } from 'MobilePages/MobileInitPage/MobileInitPage'
import { MobileLayOut } from './MobilePages/MobileLayOut'
import { MobileCoursesPage } from 'MobilePages/MobileCoursesPage/MobileCoursesPage'
import { CourseModules } from 'MobilePages/CourseModules/CourseModules'
import { PageNotFound } from 'Pages/PageNotFound/PageNotFound'
import { StudentLessonPreview } from './MobilePages/StudentLessonPreview/'
import { Profile } from 'Pages/Profile/Profile'
import { ChooseSchool } from './MobilePages/MobileChooseSchool/ChooseSchool'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'
import { scrollToTop } from 'utils/scrollToTop'
import { navByRolesConfig } from 'config'
import { TariffPlans } from './Pages/TariffPlans/TariffPlans'
import { MainLayOut } from 'components/MainLayout/MainLayOut'



import styles from './App.module.scss'

export const AppMobile = () => {


    const { role } = useAppSelector(selectUser)
  
    const navigate = useNavigate()
    const { pathname } = useLocation()
  
    useEffect(() => {
      if (pathname === '/') {
        navigate(Path.InitialPage)
      }
    }, [])
  
    scrollToTop()


  return (
    <div className={styles.container}>
      <Routes>
        <Route path={Path.InitialPage} element={<MobileInitPage />} />
        <Route path={Path.ChooseSchool} element={<ChooseSchool />} />
        <Route path={FooterPath.TariffPlans} element={<TariffPlans />} />
        <Route path={Path.School} element={<MobileLayOut />}>
          {navByRolesConfig[role]}
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
