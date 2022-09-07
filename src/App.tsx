import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { CoursesStats } from './Pages/CoursesStats/CoursesStats'
import { PageNotFound } from 'Pages/PageNotFound/PageNotFound'
import { HomeWork } from 'Pages/HomeWork/HomeWork'
import { School } from 'Pages/School/School'
import { Initial } from 'Pages/Initial/Initial'
import { MainLayOut } from 'MobilePages/layout/MainLayOut'
import { Path } from 'enum/pathE'
import { useAppSelector } from './store/hooks'
import { Profile } from 'Pages/Profile/Profile'
import { Settings } from 'Pages/Settings/Settings'
import { authSelector, platformSelector } from 'selectors'

import styles from './App.module.scss'

export const App = () => {
  const isLogin = useAppSelector(authSelector)
  const { favicon } = useAppSelector(platformSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogin) {
      navigate(Path.InitialPage)
    }
  }, [isLogin, navigate])

  useEffect(() => {
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']")

    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.getElementsByTagName('head')[0].appendChild(link)
    }
    favicon ? (link.href = favicon) : (link.href = '../public/favicon.ico')
  }, [favicon])

  return (
    <div className={styles.container}>
      <Routes>
        <Route path={Path.InitialPage} element={<Initial />} />
        <Route path={Path.InitialPage} element={<MainLayOut />}>
          <Route path={Path.Courses} element={<School />} />
          <Route path={Path.Profile} element={<Profile />} />
          <Route path={Path.Settings} element={<Settings />} />
          <Route path={Path.CourseStats} element={<CoursesStats />} />
          <Route path={Path.HomeWork} element={<HomeWork />} />
        </Route>
        <Route path={'*'} element={<PageNotFound />} />
      </Routes>
    </div>
  )
}
