import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { PageNotFound } from 'Pages/PageNotFound/PageNotFound'
import { Initial } from 'Pages/Initial/Initial'
import { TariffPlans } from './Pages/TariffPlans/TariffPlans'
import { MainLayOut } from 'components/MainLayout/MainLayOut'
import { Path, FooterPath } from 'enum/pathE'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'
import { navByRolesConfig } from 'config'
import { SignUp } from 'Pages/SignUp'
import { scrollToTop } from 'utils/scrollToTop'
import { ChooseSchool } from './Pages/ChooseSchool/ChooseSchool'

import styles from './App.module.scss'
import {CreateNewSchool} from "./Pages/CreateNewSchool/CreateNewSchool";

export const App = () => {
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
        <Route path={Path.InitialPage} element={<Initial />} />
        <Route path={Path.CreateSchool} element={<CreateNewSchool />} />
        <Route path={Path.ChooseSchool} element={<ChooseSchool />} />
        <Route path={FooterPath.TariffPlans} element={<TariffPlans />} />
        <Route path={Path.School} element={<MainLayOut />}>
          {navByRolesConfig[role]}
        </Route>
        <Route path={Path.SignUp} element={<SignUp />} />
        <Route path={'*'} element={<PageNotFound />} />
      </Routes>
    </div>
  )
}
