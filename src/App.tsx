import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { PageNotFound } from 'Pages/PageNotFound/PageNotFound'
import { Initial } from 'Pages/Initial/Initial'
import { MainLayOut } from 'components/MainLayout/MainLayOut'
import { Path } from 'enum/pathE'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'
import { navByRolesConfig } from 'config'
import { SignUp } from 'Pages/SignUp'
//import { scrollToTop } from 'utils/scrollToTop'

import styles from './App.module.scss'

export const App = () => {
  const { role } = useAppSelector(selectUser)

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/') {
      navigate(Path.InitialPage)
    }
  }, [])

  // scrollToTop()

  return (
    <div className={styles.container}>
      <Routes>
        <Route path={Path.InitialPage} element={<Initial />} />
        <Route path={Path.InitialPage} element={<MainLayOut />}>
          {navByRolesConfig[role]}
        </Route>
        <Route path={Path.SignUp} element={<SignUp />} />
        <Route path={'*'} element={<PageNotFound />} />
      </Routes>
    </div>
  )
}
