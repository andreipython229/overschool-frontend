import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { InitialPage } from 'Pages/InitialPage/InitialPage'
import { Path } from 'enum/pathE'
import { MainLayOut } from 'Pages/layout/MainLayOut'
import { Platform } from 'Pages/Courses/Platform'
import { useAppSelector } from './store/hooks'
import { Profile } from 'Pages/Profile/Profile'
import { Settings } from 'Pages/Courses/Navigations/Settings/Settings'
import { PageNotFound } from 'Pages/PageNotFound/PageNotFound'
import { StudentsStats } from 'Pages/Courses/Navigations/StudentsStats/StudentsStats'
import { HomeWorkPage } from 'Pages/HomeWorkPage/HomeWorkPage'
import { authSelector } from 'selectors'

import styles from './App.module.scss'

export const App = () => {
  const isLogin = useAppSelector(authSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogin) {
      navigate(Path.InitialPage)
    }
  }, [isLogin, navigate])

  return (
    <div className={styles.container}>
      <Routes>
        <Route path={Path.InitialPage} element={<InitialPage />} />
        <Route path={Path.InitialPage} element={<MainLayOut />}>
          <Route path={Path.Courses} element={<Platform />} />
          <Route path={Path.Profile} element={<Profile />} />
          <Route path={Path.Settings} element={<Settings />} />
          <Route path={Path.StudentsStats} element={<StudentsStats />} />
          <Route path={Path.HomeWork} element={<HomeWorkPage />} />
        </Route>
        <Route path={'*'} element={<PageNotFound />} />
      </Routes>
    </div>
  )
}
