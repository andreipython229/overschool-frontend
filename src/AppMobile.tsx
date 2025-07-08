import { Route, Routes, generatePath, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, Suspense, lazy } from 'react'
import { Path, FooterPath } from '@/enum/pathE'
import { useAppSelector } from '@/store/hooks'
import { selectUser, authSelector, schoolNameSelector } from '@/selectors'
import { scrollToTop } from '@/utils/scrollToTop'
import { navByRolesConfig } from '@/config'
import { RoleE } from '@/enum/roleE'
import { useSelector } from 'react-redux'
import styles from './App.module.scss'
import { LoadingSpinner } from './App'

// Lazy components
const MobileInitPage = lazy(() => import('@/MobilePages/MobileInitPage/MobileInitPage').then(module => ({ default: module.MobileInitPage })))
const MobileLayOut = lazy(() => import('@/MobilePages/MobileLayOut').then(module => ({ default: module.MobileLayOut })))
const PageNotFound = lazy(() => import('@/Pages/PageNotFound/PageNotFound').then(module => ({ default: module.PageNotFound })))
const Profile = lazy(() => import('@/Pages/Profile/Profile').then(module => ({ default: module.Profile })))
const ChooseSchool = lazy(() => import('./Pages/ChooseSchool/ChooseSchool').then(module => ({ default: module.ChooseSchool })))
const TariffPlans = lazy(() => import('./Pages/TariffPlans/TariffPlans').then(module => ({ default: module.TariffPlans })))
const CreateNewSchool = lazy(() => import('./Pages/CreateNewSchool/CreateNewSchool').then(module => ({ default: module.CreateNewSchool })))
const TariffPlansInfo = lazy(() => import('./Pages/TariffPlans/TariffPlansInfo').then(module => ({ default: module.TariffPlansInfo })))
const PersonalDataTreatmentPolicy = lazy(() =>
  import('@/Pages/PersonalDataTreatmentPolicy/PersonalDataTreatmentPolicy').then(module => ({ default: module.PersonalDataTreatmentPolicy })),
)
const CookiePolicy = lazy(() => import('@/Pages/CookiePolicy/CookiePolicy').then(module => ({ default: module.CookiePolicy })))
const CookiePolicyDisclaimer = lazy(() =>
  import('@/Pages/CookiePolicyDisclaimer/CookiePolicyDisclaimer').then(module => ({ default: module.CookiePolicyDisclaimer })),
)
const PersonalDataProcessing = lazy(() =>
  import('@/Pages/PersonalDataProcessing/PersonalDataProcessing').then(module => ({ default: module.PersonalDataProcessing })),
)
const PublicOfferAgreement = lazy(() =>
  import('@/Pages/PublicOfferAgreement/PublicOfferAgreement').then(module => ({ default: module.PublicOfferAgreement })),
)
const Agreement = lazy(() => import('@/components/Agreement/Agreement').then(module => ({ default: module.Agreement })))
const PWA = lazy(() => import('@/Pages/PWA/PWA').then(module => ({ default: module.PWA })))
const HelpPage = lazy(() => import('./Pages/HelpCenter/HelpPage').then(module => ({ default: module.HelpPage })))
const HelpSchoolPage = lazy(() => import('@/Pages/HelpCenter/HelpSchoolPage').then(module => ({ default: module.HelpSchoolPage })))
const HelpCoursesPage = lazy(() => import('./Pages/HelpCenter/HelpCoursesPage').then(module => ({ default: module.HelpCoursesPage })))
const HelpUserAccount = lazy(() => import('@/Pages/HelpCenter/HelpUserAccount').then(module => ({ default: module.HelpUserAccount })))
const HelpSchoolSettings = lazy(() => import('@/Pages/HelpCenter/HelpSchoolSettings').then(module => ({ default: module.HelpSchoolSettings })))
const HelpStudentsPage = lazy(() => import('@/Pages/HelpCenter/HelpStudentsPage').then(module => ({ default: module.HelpStudentsPage })))
const HelpGroupSettings = lazy(() => import('@/Pages/HelpCenter/HelpGroupSettings').then(module => ({ default: module.HelpGroupSettings })))
const HelpOverAI = lazy(() => import('@/Pages/HelpCenter/HelpOverAI').then(module => ({ default: module.HelpOverAI })))
const HelpCheckHW = lazy(() => import('@/Pages/HelpCenter/HelpCheckHW').then(module => ({ default: module.HelpCheckHW })))
const HelpDomainLink = lazy(() => import('@/Pages/HelpCenter/HelpDomainLink').then(module => ({ default: module.HelpDomainLink })))
const ResetPassword = lazy(() => import('@/Pages/ResetPassword').then(module => ({ default: module.ResetPassword })))
const Certificate = lazy(() => import('@/Pages/Certificate/Certificate').then(module => ({ default: module.Certificate })))
const CourseCatalogPage = lazy(() => import('@/Pages/CourseCatalog').then(module => ({ default: module.CourseCatalogPage })))
const CoureCatalogPreview = lazy(() => import('@/Pages/CourseCatalog/CoursePreview').then(module => ({ default: module.CoureCatalogPreview })))
const LoginPage = lazy(() => import('@/Pages/Login/LoginPage').then(module => ({ default: module.LoginPage })))
const SocialAuthPage = lazy(() => import('@/ServicePages/SocialAuthPage').then(module => ({ default: module.SocialAuthPage })))


export const AppMobile = () => {
  const { role } = useAppSelector(selectUser)
  const isLogin = useAppSelector(authSelector)
  const schoolName = useSelector(schoolNameSelector) || window.location.href.split('/')[4]

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (
      !isLogin &&
      pathname !== Path.SocialAuth &&
      pathname !== Path.CreateSchool &&
      pathname.split('/').at(-1) !== 'personalDataTreatmentPolicy' &&
      pathname.split('/').at(-1) !== 'publicOfferAgreement' &&
      pathname.split('/').at(-1) !== 'personalDataProcessing' &&
      pathname.split('/').at(-1) !== 'cookiePolicyDisclaimer' &&
      pathname.split('/').at(-1) !== 'cookiePolicy' &&
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
        generatePath(role !== RoleE.Teacher ? `${Path.School}/${Path.Courses}` : `${Path.School}/${Path.CourseStudent}`, {
          school_name: schoolName,
          course_id: null,
        }),
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
        <Route
          path={Path.InitialPage}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <MobileInitPage />
            </Suspense>
          }
        />
        <Route
          path={Path.CreateSchool}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <CreateNewSchool />
            </Suspense>
          }
        />
        <Route
          path={Path.ChooseSchool}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <ChooseSchool />
            </Suspense>
          }
        />

        <Route
          path={FooterPath.TariffPlans}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <TariffPlans />
            </Suspense>
          }
        />
        <Route
          path={Path.TariffPlansInfo}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <TariffPlansInfo />
            </Suspense>
          }
        />
        <Route
          path={Path.ResetPassword}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <ResetPassword />
            </Suspense>
          }
        />
        <Route
          path={Path.Certificate}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Certificate />
            </Suspense>
          }
        />
        <Route path={Path.HelpPage}>
          <Route
            index
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <HelpPage />
              </Suspense>
            }
          />
          <Route
            path={Path.Help}
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <HelpSchoolPage />
              </Suspense>
            }
          />
          <Route
            path={Path.HelpUserAccount}
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <HelpUserAccount />
              </Suspense>
            }
          />
          <Route
            path={Path.HelpSchoolSettings}
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <HelpSchoolSettings />
              </Suspense>
            }
          />
          <Route
            path={Path.HelpOverAI}
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <HelpOverAI />
              </Suspense>
            }
          />
          <Route
            path={Path.HelpCourses}
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <HelpCoursesPage />
              </Suspense>
            }
          />
          <Route
            path={Path.HelpGroupSettings}
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <HelpGroupSettings />
              </Suspense>
            }
          />
          <Route
            path={Path.HelpStudents}
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <HelpStudentsPage />
              </Suspense>
            }
          />
          <Route
            path={Path.HelpCheckHW}
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <HelpCheckHW />
              </Suspense>
            }
          />
          <Route
            path={Path.HelpDomainLink}
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <HelpDomainLink />
              </Suspense>
            }
          />
        </Route>
        <Route
          path={Path.LoginPage}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path={Path.SocialAuth}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <SocialAuthPage />
            </Suspense>
          }
        />
        <Route path={Path.Catalog}>
          <Route
            index
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <CourseCatalogPage />
              </Suspense>
            }
          />
          <Route
            path={Path.CatalogCourse}
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <CoureCatalogPreview />
              </Suspense>
            }
          />
        </Route>
        <Route
          path={Path.School}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <MobileLayOut />
            </Suspense>
          }
        >
          <Route
            path={FooterPath.PersonalDataTreatmentPolicy}
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <PersonalDataTreatmentPolicy />
              </Suspense>
            }
          />
          <Route
            path={FooterPath.CookiePolicy}
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <CookiePolicy />
              </Suspense>
            }
          />
          <Route
            path={FooterPath.CookiePolicyDisclaimer}
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <CookiePolicyDisclaimer />
              </Suspense>
            }
          />
          <Route
            path={FooterPath.PersonalDataProcessing}
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <PersonalDataProcessing />
              </Suspense>
            }
          />
          <Route
            path={FooterPath.PublicOfferAgreement}
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <PublicOfferAgreement />
              </Suspense>
            }
          />
          <Route
            path={FooterPath.PWA}
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <PWA />
              </Suspense>
            }
          />
          <Route
            path={FooterPath.Agreement}
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Agreement />
              </Suspense>
            }
          />
          {navByRolesConfig[role]}

          <Route
            path={Path.Profile}
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Profile />
              </Suspense>
            }
          />
        </Route>
        <Route
          path={`${Path.DefaultSchool}${FooterPath.PersonalDataTreatmentPolicy}`}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <PersonalDataTreatmentPolicy />
            </Suspense>
          }
        />
        <Route
          path={`${Path.DefaultSchool}${FooterPath.CookiePolicy}`}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <CookiePolicy />
            </Suspense>
          }
        />
        <Route
          path={`${Path.DefaultSchool}${FooterPath.CookiePolicyDisclaimer}`}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <CookiePolicyDisclaimer />
            </Suspense>
          }
        />
        <Route
          path={`${Path.DefaultSchool}${FooterPath.PersonalDataProcessing}`}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <PersonalDataProcessing />
            </Suspense>
          }
        />
        <Route
          path={`${Path.DefaultSchool}${FooterPath.PublicOfferAgreement}`}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <PublicOfferAgreement />
            </Suspense>
          }
        />
        <Route
          path={'*'}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <PageNotFound />
            </Suspense>
          }
        />
      </Routes>
    </div>
  )
}
