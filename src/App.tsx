import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { InitialPage } from 'Pages/InitialPage/InitialPage'
import { Path } from 'enum/pathE'
import { MainLayOut } from 'Pages/layout/MainLayOut'
import { Platform } from 'Pages/Courses/Platform'
import { useAppSelector } from 'store/redux/store'
import { Profile } from 'Pages/Profile/Profile'
import { Settings } from 'Pages/Courses/Navigations/Settings/Settings'
import { PageNotFound } from 'Pages/PageNotFound/PageNotFound'
import { StudentsStats } from 'Pages/Courses/Navigations/StudentsStats/StudentsStats'
import { HomeWork } from 'Pages/Courses/Navigations/HomeWork/HomeWork'
import { authSelector } from 'store/redux/users/select'

import styles from './App.module.scss'

function App() {
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
          <Route path={Path.HomeWork} element={<HomeWork />} />
        </Route>
        <Route path={'*'} element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App
