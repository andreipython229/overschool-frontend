import { Route, Routes, generatePath, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { PageNotFound } from 'Pages/PageNotFound/PageNotFound'
import { PersonalDataTreatmentPolicy } from 'Pages/PersonalDataTreatmentPolicy/PersonalDataTreatmentPolicy'
import { PWA } from 'Pages/PWA/PWA'
import { Initial } from 'Pages/Initial/Initial'
import { TariffPlans } from './Pages/TariffPlans/TariffPlans'
import { MainLayOut } from 'components/MainLayout/MainLayOut'
import { Path, FooterPath } from 'enum/pathE'
import { useAppSelector } from 'store/hooks'
import { authSelector, schoolNameSelector, selectUser } from 'selectors'
import { navByRolesConfig } from 'config'
import { SignUp } from 'Pages/SignUp'
import { scrollToTop } from 'utils/scrollToTop'
import { ChooseSchool } from './Pages/ChooseSchool/ChooseSchool'

import styles from './App.module.scss'
import { CreateNewSchool } from './Pages/CreateNewSchool/CreateNewSchool'
import { RoleE } from 'enum/roleE'
import { useSelector } from 'react-redux'

export const App = () => {
  const { role } = useAppSelector(selectUser)
  const isLogin = useAppSelector(authSelector)
  const schoolName = useSelector(schoolNameSelector)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogin && pathname !== Path.CreateSchool) {
      navigate(Path.InitialPage)
    }
  }, [isLogin, navigate])

  // useEffect(() => {
  //   if (isLogin && schoolName.length === 0) {
  //     navigate(Path.ChooseSchool)
  //   }
  // }, [schoolName, isLogin, navigate])

  useEffect(() => {
    if (pathname === '/') {
      navigate(Path.InitialPage)
    }
    if (schoolName && pathname.split('/')[2] !== schoolName && pathname.split('/')[1] === 'school') {
      navigate(
        generatePath(role !== RoleE.Teacher ? `${Path.School}${Path.Courses}` : `${Path.School}${Path.CourseStudent}`, { school_name: schoolName }),
      )
    }
  }, [])

  scrollToTop()

  return (
    <div className={styles.container}>
      <Routes>
        <Route path={Path.School} element={<MainLayOut />}>
          <Route path={FooterPath.PersonalDataTreatmentPolicy} element={<PersonalDataTreatmentPolicy />} />
        </Route>
        <Route path={FooterPath.Agreement} element={<MainLayOut />} />
        <Route path={Path.School} element={<MainLayOut />}>
          <Route path={FooterPath.PWA} element={<PWA />} />
        </Route>
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
