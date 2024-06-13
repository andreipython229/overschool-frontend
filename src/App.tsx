import { Route, Routes, generatePath, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { PageNotFound } from 'Pages/PageNotFound/PageNotFound'
import { PersonalDataTreatmentPolicy } from 'Pages/PersonalDataTreatmentPolicy/PersonalDataTreatmentPolicy'
import { Agreement } from 'components/Agreement/Agreement'
import { PWA } from 'Pages/PWA/PWA'
import { Initial } from 'Pages/Initial/Initial'
import { TariffPlans } from './Pages/TariffPlans/TariffPlans'
import { TariffPlansInfo } from './Pages/TariffPlans/TariffPlansInfo'
import { MainLayOut } from 'components/MainLayout/MainLayOut'
import { Path, FooterPath } from 'enum/pathE'
import { useAppSelector } from 'store/hooks'
import { authSelector, selectUser } from 'selectors'
import { navByRolesConfig } from 'config'
import { SignUp } from 'Pages/SignUp'
import { scrollToTop } from 'utils/scrollToTop'
import { ChooseSchool } from './Pages/ChooseSchool/ChooseSchool'

import styles from './App.module.scss'
import { CreateNewSchool } from './Pages/CreateNewSchool/CreateNewSchool'
import { RoleE } from 'enum/roleE'
import { Certificate } from 'Pages/Certificate/Certificate'
import { CourseCatalogPage } from 'Pages/CourseCatalog'
import { ResetPassword } from 'Pages/ResetPassword'
import { LoginPage } from './Pages/Login/LoginPage'
import { HelpPage } from './Pages/HelpCenter/HelpPage'
import { HelpSchoolPage } from 'Pages/HelpCenter/HelpSchoolPage'
import { CoureCatalogPreview } from 'Pages/CourseCatalog/CoursePreview'
import { HelpCoursesPage } from './Pages/HelpCenter/HelpCoursesPage'
import { HelpUserAccount } from 'Pages/HelpCenter/HelpUserAccount'
import { HelpSchoolSettings } from 'Pages/HelpCenter/HelpSchoolSettings'
import { HelpStudentsPage } from 'Pages/HelpCenter/HelpStudentsPage'
import { HelpGroupSettings } from 'Pages/HelpCenter/HelpGroupSettings'
import { HelpOverAI } from 'Pages/HelpCenter/HelpOverAI'
import {HelpChat} from "./Pages/HelpCenter/HelpChat";
import { HelpCheckHW } from 'Pages/HelpCenter/HelpCheckHW'
import   DomainError   from "./Pages/DomainAccessDenied/DomainError";

export const App = () => {
  const { role } = useAppSelector(selectUser)
  const isLogin = useAppSelector(authSelector)
  const schoolName = window.location.href.split('/')[4]
  const { pathname } = useLocation()
  const [utmParams, setUtmParams] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate()

  useEffect(() => {
    if (
      !isLogin &&
      pathname !== Path.CreateSchool &&
      pathname !== Path.LoginPage &&
      pathname !== Path.InitialPage &&
      pathname !== Path.TariffPlansInfo &&
      pathname.split('/')[1] !== 'certificate' &&
      pathname.split('/')[1] !== 'course-catalog' &&
      pathname.split('/')[1] !== 'help' &&
      pathname.split('/')[1] !== 'token-validate' &&
        pathname !== '/access-denied'
    ) {
      navigate(`${Path.InitialPage}?utm_source=${utmParams.utm_source}&utm_medium=${utmParams.utm_medium}&utm_campaign=${utmParams.utm_campaign}&utm_term=${utmParams.utm_term}&utm_content=${utmParams.utm_content}`);
    }
  }, [isLogin, navigate])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params: { [key: string]: string } = {};
    for (const [key, value] of searchParams) {
      if (typeof key === 'string' && key.startsWith('utm_')) {
        params[key] = value;
      }
    }

    setUtmParams(params);
    localStorage.setItem('utmParams', JSON.stringify(params));
  }, []);
  
  useEffect(() => {
    if (pathname === '/') {
      const queryParams = Object.keys(utmParams)
        .filter(([_, value]) => value !== 'undefined')
        .map(key => `${key}=${utmParams[key]}`)
        .join('&');
      const pathWithParams = `${Path.InitialPage}${queryParams ? `?${queryParams}` : ''}`;
      navigate(pathWithParams);
    } else if (schoolName && role !== 0 && pathname.split('/')[2] !== schoolName && pathname.split('/')[1] === 'school') {
      navigate(
        generatePath(role !== RoleE.Teacher ? `${Path.School}${Path.Courses}` : `${Path.School}${Path.CourseStudent}`, { school_name: schoolName }),
      )
    }
  }, [utmParams])

  useEffect(() => {
    if (
      isLogin &&
      !schoolName &&
      pathname !== Path.InitialPage &&
      pathname !== '/' &&
      pathname !== Path.ChooseSchool &&
      pathname !== Path.TariffPlansInfo &&
      pathname.split('/')[1] !== 'certificate' &&
      pathname.split('/')[1] !== 'course-catalog' &&
      pathname.split('/')[1] !== 'help' &&
      pathname.split('/')[1] !== 'token-validate' &&
        pathname !== '/access-denied'
    ) {
      navigate(Path.ChooseSchool)
    }

    if (
      !role &&
      isLogin &&
      pathname !== Path.InitialPage &&
      pathname !== '/' &&
      pathname !== Path.ChooseSchool &&
      pathname !== Path.TariffPlansInfo &&
      pathname.split('/')[1] !== 'certificate' &&
      pathname.split('/')[1] !== 'course-catalog' &&
      pathname.split('/')[1] !== 'help' &&
      pathname.split('/')[1] !== 'token-validate' &&
        pathname !== '/access-denied'
    ) {
      navigate(Path.ChooseSchool)
    }
  }, [isLogin, schoolName, navigate])

  scrollToTop()

  return (
    <div className={styles.container}>
      <Routes>
        <Route path={Path.Catalog}>
          <Route index element={<CourseCatalogPage />} />
          <Route path={Path.CatalogCourse} element={<CoureCatalogPreview />} />
        </Route>
        <Route path={Path.School} element={<MainLayOut />}>
          <Route path={FooterPath.PersonalDataTreatmentPolicy} element={<PersonalDataTreatmentPolicy />} />
          <Route path={FooterPath.PWA} element={<PWA />} />
          <Route path={FooterPath.Agreement} element={<Agreement />} />
        </Route>
        <Route path={Path.Certificate} element={<Certificate />} />
        <Route path={Path.InitialPage} element={<Initial />} />
        <Route path={Path.TariffPlansInfo} element={<TariffPlansInfo />} />
        <Route path={Path.CreateSchool} element={<CreateNewSchool />} />
        <Route path={Path.LoginPage} element={<LoginPage />} />
        <Route path={Path.HelpPage}>
          <Route index element={<HelpPage />} />
          <Route path={Path.Help} element={<HelpSchoolPage />} />
          <Route path={Path.HelpUserAccount} element={<HelpUserAccount />} />
          <Route path={Path.HelpSchoolSettings} element={<HelpSchoolSettings />} />
          <Route path={Path.HelpOverAI} element={<HelpOverAI />} />
          <Route path={Path.Courses} element={<HelpCoursesPage />} />
          <Route path={Path.HelpGroupSettings} element={<HelpGroupSettings />} />
          <Route path={Path.HelpStudents} element={<HelpStudentsPage />} />
          <Route path={Path.HelpCheckHW} element={<HelpCheckHW />} />
          <Route path={Path.HelpChat} element={<HelpChat />} />
        </Route>
        <Route path={Path.ChooseSchool} element={<ChooseSchool />} />
        <Route path={FooterPath.TariffPlans} element={<TariffPlans />} />
        <Route path={Path.School} element={<MainLayOut />}>
          {navByRolesConfig[role]}
        </Route>
        <Route path={Path.ResetPassword} element={<ResetPassword />} />
        <Route path={Path.SignUp} element={<SignUp />} />
        <Route path={'*'} element={<PageNotFound />} />
        <Route path="/access-denied" element={<DomainError />} />
      </Routes>
    </div>
  )
}
