import React, { useEffect } from 'react'
import { useAppSelector } from 'store/redux/store'
import { authSelector } from 'store/redux/users/select'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Path } from 'enum/pathE'

import styles from './App.module.scss'
import { MobileInitPage } from 'MobilePages/MobileInitPage/MobileInitPage'
import { MobileLayOut } from 'Pages/layout/MobileLayOut'
import { MobileCoursesPage } from 'MobilePages/MobileCoursesPage/MobileCoursesPage'

export const AppMobile = () => {
  const isLogin = useAppSelector(authSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogin) {
      navigate(Path.InitialPage)
    } else {
      navigate(`${Path.InitialPage}${Path.Courses}`)
    }
  }, [isLogin, navigate])

  return (
    <div className={styles.container}>
      <Routes>
        <Route path={Path.InitialPage} element={<MobileInitPage />} />
        <Route path={Path.InitialPage} element={<MobileLayOut />}>
          <Route path={Path.Courses} element={<MobileCoursesPage />} />
        </Route>
      </Routes>
    </div>
  )
}
