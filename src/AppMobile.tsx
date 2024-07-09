import { Route, Routes, generatePath, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Path, Student, FooterPath } from 'enum/pathE'
import { MobileInitPage } from 'MobilePages/MobileInitPage/MobileInitPage'
import { MobileLayOut } from './MobilePages/MobileLayOut'
import { MobileCoursesPage } from 'MobilePages/MobileCoursesPage/MobileCoursesPage'
import { CourseModules } from 'MobilePages/CourseModules/CourseModules'
import { PageNotFound } from 'Pages/PageNotFound/PageNotFound'
import { StudentLessonPreview } from './MobilePages/StudentLessonPreview/'
import { Profile } from 'Pages/Profile/Profile'
import { ChooseSchool } from './Pages/ChooseSchool/ChooseSchool'
import { useAppSelector } from 'store/hooks'
import { selectUser, authSelector, schoolNameSelector } from 'selectors'
import { scrollToTop } from 'utils/scrollToTop'
import { navByRolesConfig } from 'config'
import { TariffPlans } from './Pages/TariffPlans/TariffPlans'
import { CreateNewSchool } from './Pages/CreateNewSchool/CreateNewSchool'
import { TariffPlansInfo } from './Pages/TariffPlans/TariffPlansInfo'
import { PersonalDataTreatmentPolicy } from 'Pages/PersonalDataTreatmentPolicy/PersonalDataTreatmentPolicy'
import { Agreement } from 'components/Agreement/Agreement'
import { PWA } from 'Pages/PWA/PWA'
import { HelpPage } from './Pages/HelpCenter/HelpPage'
import { HelpSchoolPage } from 'Pages/HelpCenter/HelpSchoolPage'
import { HelpCoursesPage } from './Pages/HelpCenter/HelpCoursesPage'
import { HelpUserAccount } from 'Pages/HelpCenter/HelpUserAccount'
import { HelpSchoolSettings } from 'Pages/HelpCenter/HelpSchoolSettings'
import { HelpStudentsPage } from 'Pages/HelpCenter/HelpStudentsPage'
import { HelpGroupSettings } from 'Pages/HelpCenter/HelpGroupSettings'
import { HelpOverAI } from 'Pages/HelpCenter/HelpOverAI'
import { HelpCheckHW } from 'Pages/HelpCenter/HelpCheckHW'
import { RoleE } from 'enum/roleE'
import { useSelector } from 'react-redux'
import styles from './App.module.scss'
import { ResetPassword } from 'Pages/ResetPassword'
import { Certificate } from 'Pages/Certificate/Certificate'
import { CourseCatalogPage } from 'Pages/CourseCatalog'
import { CoureCatalogPreview } from 'Pages/CourseCatalog/CoursePreview'
import { LoginPage } from 'Pages/Login/LoginPage'

export const AppMobile = () => {
  const { role } = useAppSelector(selectUser)
  const isLogin = useAppSelector(authSelector)
  const schoolName = useSelector(schoolNameSelector) || window.location.href.split('/')[4]

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (
      !isLogin &&
      pathname !== Path.CreateSchool &&
      pathname !== Path.CreateSchoolRef &&
      pathname !== Path.LoginPage &&
      pathname !== Path.InitialPage &&
      pathname !== Path.TariffPlansInfo &&
      pathname.split('/')[1] !== 'certificate' &&
      pathname.split('/')[1] !== 'course-catalog' &&
      pathname.split('/')[1] !== 'help' &&
      pathname.split('/')[1] !== 'token-validate'
    ) {
      navigate(Path.InitialPage)
    }
  }, [isLogin, navigate])

  useEffect(() => {
    if (pathname === '/') {
      navigate(Path.InitialPage)
    } else if (schoolName && role !== 0 && pathname.split('/')[2] !== schoolName && pathname.split('/')[1] === 'school') {
      navigate(
        generatePath(role !== RoleE.Teacher ? `${Path.School}${Path.Courses}` : `${Path.School}${Path.CourseStudent}`, { school_name: schoolName }),
      )
    }
  }, [])

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
      pathname.split('/')[1] !== 'token-validate'
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
      pathname.split('/')[1] !== 'token-validate'
    ) {
      navigate(Path.ChooseSchool)
    }
  }, [isLogin, schoolName, navigate])

  scrollToTop()

  return (
    <div className={styles.container}>
      <Routes>
        <Route path={Path.InitialPage} element={<MobileInitPage />} />
        <Route path={Path.CreateSchool} element={<CreateNewSchool />} />
        <Route path={Path.ChooseSchool} element={<ChooseSchool />} /> 
        
        <Route path={FooterPath.TariffPlans} element={<TariffPlans />} />
        <Route path={Path.TariffPlansInfo} element={<TariffPlansInfo />} />
        <Route path={Path.ResetPassword} element={<ResetPassword />} />
        <Route path={Path.Certificate} element={<Certificate />} />
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
        </Route>
        <Route path={Path.LoginPage} element={<LoginPage />} />
        <Route path={Path.Catalog}>
          <Route index element={<CourseCatalogPage />} />
          <Route path={Path.CatalogCourse} element={<CoureCatalogPreview />} />
        </Route>
        <Route path={Path.School} element={<MobileLayOut />}>
          <Route path={FooterPath.PersonalDataTreatmentPolicy} element={<PersonalDataTreatmentPolicy />} />
          <Route path={FooterPath.PWA} element={<PWA />} />
          <Route path={FooterPath.Agreement} element={<Agreement />} />
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