import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { CoursesStats } from './Pages/CoursesStats/CoursesStats'
import { PageNotFound } from 'Pages/PageNotFound/PageNotFound'
import { HomeWork } from 'Pages/HomeWork/HomeWork'
import { HelpCenter } from 'incomprehensiblePages/HelpCenter/HelpCenter'
import { TariffPlans } from 'incomprehensiblePages/TariffPlans/TariffPlans'
import { School } from 'Pages/School/School'
import { Initial } from 'Pages/Initial/Initial'
import { MainLayOut } from 'components/MainLayout/MainLayOut'
import { Path, Student } from 'enum/pathE'
import { useAppSelector } from './store/hooks'
import { Profile } from 'Pages/Profile/Profile'
import { Settings } from 'Pages/Settings/Settings'
import { authSelector } from 'selectors'
import { useFetchSchoolHeaderQuery } from './api/schoolHeaderService'
import { StudentCourse } from 'Pages/StudentCourse/index'

import styles from './App.module.scss'

export const App = () => {
  const isLogin = useAppSelector(authSelector)

  const navigate = useNavigate()
  const { data, isSuccess } = useFetchSchoolHeaderQuery(1)

  useEffect(() => {
    if (!isLogin) {
      navigate(Path.InitialPage)
    }
  }, [isLogin, navigate])

  useEffect(() => {
    if (isSuccess) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']")

      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.getElementsByTagName('head')[0].appendChild(link)
      }
      data?.favicon_url ? (link.href = data?.favicon_url) : (link.href = '../public/favicon.ico')
    }
  }, [data])

  return (
    <div className={styles.container}>
      <Routes>
        <Route path={Path.InitialPage} element={<Initial />} />
        <Route path={Path.InitialPage} element={<MainLayOut />}>
          <Route path={Path.Courses} element={<School />} />
          <Route path={Path.Profile} element={<Profile />} />
          <Route path={Path.CourseStats} element={<CoursesStats />} />
          <Route path={Path.Settings} element={<Settings />} />
          <Route path={Path.HomeWork} element={<HomeWork />} />
          <Route path={Path.HelpCenter} element={<HelpCenter />} />
          <Route path={Path.TariffPlans} element={<TariffPlans />} />
        </Route>
        <Route path={'*'} element={<PageNotFound />} />
      </Routes>
    </div>
  )
}
