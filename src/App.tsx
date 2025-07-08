import { Route, Routes, generatePath, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState, Suspense, lazy } from 'react'
import { Path, FooterPath } from '@/enum/pathE'
import { useAppSelector } from '@/store/hooks'
import { authSelector, schoolSelector, selectUser } from '@/selectors'
import { navByRolesConfig } from '@/config'
import { scrollToTop } from 'utils/scrollToTop'
import styles from './App.module.scss'
import { Toaster } from 'react-hot-toast'
import { SimpleLoader } from './components/Loaders/SimpleLoader'

// Lazy components
const PageNotFound = lazy(() => import('@/Pages/PageNotFound/PageNotFound').then(module => ({ default: module.PageNotFound })))
const PersonalDataTreatmentPolicy = lazy(() => import('@/Pages/PersonalDataTreatmentPolicy/PersonalDataTreatmentPolicy').then(module => ({ default: module.PersonalDataTreatmentPolicy })))
const CookiePolicy = lazy(() => import('@/Pages/CookiePolicy/CookiePolicy').then(module => ({ default: module.CookiePolicy })))
const CookiePolicyDisclaimer = lazy(() => import('@/Pages/CookiePolicyDisclaimer/CookiePolicyDisclaimer').then(module => ({ default: module.CookiePolicyDisclaimer })))
const PersonalDataProcessing = lazy(() => import('@/Pages/PersonalDataProcessing/PersonalDataProcessing').then(module => ({ default: module.PersonalDataProcessing })))
const PublicOfferAgreement = lazy(() => import('@/Pages/PublicOfferAgreement/PublicOfferAgreement').then(module => ({ default: module.PublicOfferAgreement })))
const Agreement = lazy(() => import('@/components/Agreement/Agreement').then(module => ({ default: module.Agreement })))
const PWA = lazy(() => import('Pages/PWA/PWA').then(module => ({ default: module.PWA })))
const Initial = lazy(() => import('Pages/Initial/newInitial').then(module => ({ default: module.Initial })))
const TariffPlans = lazy(() => import('./Pages/TariffPlans/TariffPlans').then(module => ({ default: module.TariffPlans })))
const TariffPlansInfo = lazy(() => import('./Pages/TariffPlans/TariffPlansInfo').then(module => ({ default: module.TariffPlansInfo })))
const TariffPlansInfoYear = lazy(() => import('./Pages/TariffPlans/TariffPlansInfoYear').then(module => ({ default: module.TariffPlansInfoYear })))
const MainLayOut = lazy(() => import('@/components/MainLayout/MainLayOut').then(module => ({ default: module.MainLayOut })))
const ChooseSchool = lazy(() => import('./Pages/ChooseSchool/ChooseSchool').then(module => ({ default: module.ChooseSchool })))
const CreateNewSchool = lazy(() => import('./Pages/CreateNewSchool/CreateNewSchool').then(module => ({ default: module.CreateNewSchool })))
const Certificate = lazy(() => import('@/Pages/Certificate/Certificate').then(module => ({ default: module.Certificate })))
const CourseCatalogPage = lazy(() => import('@/Pages/CourseCatalog').then(module => ({ default: module.CourseCatalogPage })))
const ResetPassword = lazy(() => import('@/Pages/ResetPassword').then(module => ({ default: module.ResetPassword })))
const LoginPage = lazy(() => import('./Pages/Login/LoginPage').then(module => ({ default: module.LoginPage })))
const HelpPage = lazy(() => import('./Pages/HelpCenter/HelpPage').then(module => ({ default: module.HelpPage })))
const HelpSchoolPage = lazy(() => import('@/Pages/HelpCenter/HelpAddEmployee').then(module => ({ default: module.HelpSchoolPage })))
const CoureCatalogPreview = lazy(() => import('@/Pages/CourseCatalog/CoursePreview').then(module => ({ default: module.CoureCatalogPreview })))
const HelpCoursesPage = lazy(() => import('./Pages/HelpCenter/HelpCoursesPage').then(module => ({ default: module.HelpCoursesPage })))
const HelpUserAccount = lazy(() => import('@/Pages/HelpCenter/HelpUserAccount').then(module => ({ default: module.HelpUserAccount })))
const HelpSchoolSettings = lazy(() => import('@/Pages/HelpCenter/HelpSchoolSettings').then(module => ({ default: module.HelpSchoolSettings })))
const HelpPlatformSettings = lazy(() => import('@/Pages/HelpCenter/HelpPlatformSettings').then(module => ({ default: module.HelpPlatformSettings })))
const HelpStudentsPage = lazy(() => import('@/Pages/HelpCenter/HelpStudentsPage').then(module => ({ default: module.HelpStudentsPage })))
const HelpGroupSettings = lazy(() => import('@/Pages/HelpCenter/HelpGroupSettings').then(module => ({ default: module.HelpGroupSettings })))
const HelpOverAI = lazy(() => import('@/Pages/HelpCenter/HelpOverAI').then(module => ({ default: module.HelpOverAI })))
const HelpChat = lazy(() => import('./Pages/HelpCenter/HelpChat').then(module => ({ default: module.HelpChat })))
const HelpCheckHW = lazy(() => import('@/Pages/HelpCenter/HelpCheckHW').then(module => ({ default: module.HelpCheckHW })))
const HelpDomainLink = lazy(() => import('@/Pages/HelpCenter/HelpDomainLink').then(module => ({ default: module.HelpDomainLink })))
const HelpGidStart = lazy(() => import('@/Pages/HelpCenter/HelpGidStart').then(module => ({ default: module.HelpGidStart })))
const DomainError = lazy(() => import('./Pages/DomainAccessDenied/DomainError').then(module => ({ default: module.default })))
const TechnicalWorks = lazy(() => import('@/Pages/TechnicalWorks/TechnicalWorks').then(module => ({ default: module.TechnicalWorks })))
const SocialAuthPage = lazy(() => import('@/ServicePages/SocialAuthPage').then(module => ({ default: module.SocialAuthPage })))
const WebinarPage = lazy(() => import('@/Pages/Webinar/webinarPage').then(module => ({ default: module.default })))

// Loading component
export const LoadingSpinner = () => <SimpleLoader loaderColor="#357EEB" style={{ width: '100px', height: '100px', margin: 'auto', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }} />


export const App = () => {
  const { role } = useAppSelector(selectUser)
  const isLogin = useAppSelector(authSelector)
  const { schoolName } = useAppSelector(schoolSelector)
  const { pathname } = useLocation()
  const [utmParams, setUtmParams] = useState<{ [key: string]: string }>({})
  const navigate = useNavigate()

  useEffect(() => {
    const email = localStorage.getItem('email')
    const validEmails = ['admin@coursehub.ru', 'teacher@coursehub.ru', 'student@coursehub.ru']
    if (email && validEmails.includes(email) && schoolName) {
      navigate(generatePath(`${Path.School}/${Path.Courses}`, { school_name: schoolName as string }))
    }
  }, [isLogin])

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
      pathname.split('/')[1] !== 'create-school' &&
      pathname !== Path.LoginPage &&
      pathname !== Path.InitialPage &&
      pathname !== Path.TariffPlansInfo &&
      pathname !== Path.TariffPlansInfoYear &&
      pathname.split('/')[1] !== 'certificate' &&
      pathname.split('/')[1] !== 'course-catalog' &&
      pathname.split('/')[1] !== 'help' &&
      pathname.split('/')[1] !== 'token-validate' &&
      pathname !== '/access-denied'
    ) {
      if (utmParams.utm_source) {
        navigate(
          `${Path.InitialPage}?utm_source=${utmParams.utm_source}&utm_medium=${utmParams.utm_medium}&utm_campaign=${utmParams.utm_campaign}&utm_term=${utmParams.utm_term}&utm_content=${utmParams.utm_content}`,
        )
      } else {
        navigate(Path.InitialPage)
      }
    }
  }, [isLogin, navigate])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const params: { [key: string]: string } = {}
    for (const [key, value] of searchParams) {
      if (typeof key === 'string' && key.startsWith('utm_')) {
        params[key] = value
      }
    }

    setUtmParams(params)
    localStorage.setItem('utmParams', JSON.stringify(params))
  }, [])

  useEffect(() => {
    if (
      isLogin &&
      pathname !== Path.SocialAuth &&
      !schoolName &&
      pathname !== Path.InitialPage &&
      pathname !== '/' &&
      pathname !== Path.ChooseSchool &&
      pathname !== Path.TariffPlansInfo &&
      pathname !== Path.TariffPlansInfoYear &&
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
      pathname !== Path.SocialAuth &&
      pathname !== Path.InitialPage &&
      pathname !== '/' &&
      pathname !== Path.ChooseSchool &&
      pathname !== Path.TariffPlansInfo &&
      pathname !== Path.TariffPlansInfoYear &&
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
      <Toaster position="bottom-right" reverseOrder={true} />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path={Path.WebinarPage} element={<WebinarPage />} />
          <Route path={Path.Catalog}>
            <Route index element={<CourseCatalogPage />} />
            <Route path={Path.CatalogCourse} element={<CoureCatalogPreview />} />
          </Route>
          <Route path={Path.Certificate} element={<Certificate />} />
          <Route path={Path.InitialPage} element={<Initial />} />
          <Route path={Path.TariffPlansInfo} element={<TariffPlansInfo />} />
          <Route path={Path.TariffPlansInfoYear} element={<TariffPlansInfoYear />} />
          <Route path={Path.CreateSchool} element={<CreateNewSchool />} />
          <Route path={Path.LoginPage} element={<LoginPage />} />
          <Route path={Path.SocialAuth} element={<SocialAuthPage />} />
          <Route path={Path.HelpPage}>
            <Route index element={<HelpPage />} />
            <Route path={Path.Help} element={<HelpSchoolPage />} />
            <Route path={Path.HelpUserAccount} element={<HelpUserAccount />} />
            <Route path={Path.HelpSchoolSettings} element={<HelpSchoolSettings />} />
            <Route path={Path.HelpPlatformSettings} element={<HelpPlatformSettings />} />
            <Route path={Path.HelpOverAI} element={<HelpOverAI />} />
            <Route path={Path.HelpCourses} element={<HelpCoursesPage />} />
            <Route path={Path.HelpGroupSettings} element={<HelpGroupSettings />} />
            <Route path={Path.HelpStudents} element={<HelpStudentsPage />} />
            <Route path={Path.HelpCheckHW} element={<HelpCheckHW />} />
            <Route path={Path.HelpDomainLink} element={<HelpDomainLink />} />
            <Route path={Path.HelpGidStart} element={<HelpGidStart />} />
            <Route path={Path.HelpChat} element={<HelpChat />} />
          </Route>
          <Route path={Path.ChooseSchool} element={<ChooseSchool />} />
          <Route path={FooterPath.TariffPlans} element={<TariffPlans />} />
          <Route path={Path.School} element={<MainLayOut />}>
            {navByRolesConfig[role]}
            <Route path={FooterPath.PersonalDataTreatmentPolicy} element={<PersonalDataTreatmentPolicy />} />
            <Route path={FooterPath.CookiePolicy} element={<CookiePolicy />} />
            <Route path={FooterPath.CookiePolicyDisclaimer} element={<CookiePolicyDisclaimer />} />
            <Route path={FooterPath.PersonalDataProcessing} element={<PersonalDataProcessing />} />
            <Route path={FooterPath.PublicOfferAgreement} element={<PublicOfferAgreement />} />
            <Route path={FooterPath.PWA} element={<PWA />} />
            <Route path={FooterPath.Agreement} element={<Agreement />} />
          </Route>
          <Route path={`${Path.DefaultSchool}${FooterPath.PersonalDataTreatmentPolicy}`} element={<PersonalDataTreatmentPolicy />} />
          <Route path={`${Path.DefaultSchool}${FooterPath.CookiePolicy}`} element={<CookiePolicy />} />
          <Route path={`${Path.DefaultSchool}${FooterPath.CookiePolicyDisclaimer}`} element={<CookiePolicyDisclaimer />} />
          <Route path={`${Path.DefaultSchool}${FooterPath.PersonalDataProcessing}`} element={<PersonalDataProcessing />} />
          <Route path={`${Path.DefaultSchool}${FooterPath.PublicOfferAgreement}`} element={<PublicOfferAgreement />} />
          <Route path={Path.ResetPassword} element={<ResetPassword />} />
          <Route path={'*'} element={<PageNotFound />} />
          <Route path="/access-denied" element={<DomainError />} />
          <Route path="/technical-works" element={<TechnicalWorks />} />
        </Routes>
      </Suspense>
    </div>
  )
}





