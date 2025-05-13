import { Route, Routes, generatePath, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PageNotFound } from 'Pages/PageNotFound/PageNotFound'
import { PersonalDataTreatmentPolicy } from 'Pages/PersonalDataTreatmentPolicy/PersonalDataTreatmentPolicy'
import { CookiePolicy } from 'Pages/CookiePolicy/CookiePolicy'
import { CookiePolicyDisclaimer } from 'Pages/CookiePolicyDisclaimer/CookiePolicyDisclaimer'
import { PersonalDataProcessing } from 'Pages/PersonalDataProcessing/PersonalDataProcessing'
import { PublicOfferAgreement } from 'Pages/PublicOfferAgreement/PublicOfferAgreement'
import { Agreement } from 'components/Agreement/Agreement'
import { PWA } from 'Pages/PWA/PWA'
import { Initial } from 'Pages/Initial/newInitial'
import { TariffPlans } from './Pages/TariffPlans/TariffPlans'
import { TariffPlansInfo } from './Pages/TariffPlans/TariffPlansInfo'
import { MainLayOut } from 'components/MainLayout/MainLayOut'
import { Path, FooterPath } from 'enum/pathE'
import { useAppSelector } from 'store/hooks'
import { authSelector, schoolSelector, selectUser } from 'selectors'
import { navByRolesConfig } from 'config'
import { scrollToTop } from 'utils/scrollToTop'
import { ChooseSchool } from './Pages/ChooseSchool/ChooseSchool'
import styles from './App.module.scss'
import { CreateNewSchool } from './Pages/CreateNewSchool/CreateNewSchool'
import { Certificate } from 'Pages/Certificate/Certificate'
import { CourseCatalogPage } from 'Pages/CourseCatalog'
import { ResetPassword } from 'Pages/ResetPassword'
import { LoginPage } from './Pages/Login/LoginPage'
import { HelpPage } from './Pages/HelpCenter/HelpPage'
import { HelpSchoolPage } from 'Pages/HelpCenter/HelpAddEmployee'
import { CoureCatalogPreview } from 'Pages/CourseCatalog/CoursePreview'
import { HelpCoursesPage } from './Pages/HelpCenter/HelpCoursesPage'
import { HelpUserAccount } from 'Pages/HelpCenter/HelpUserAccount'
import { HelpSchoolSettings } from 'Pages/HelpCenter/HelpSchoolSettings'
import { HelpPlatformSettings } from 'Pages/HelpCenter/HelpPlatformSettings'
import { HelpStudentsPage } from 'Pages/HelpCenter/HelpStudentsPage'
import { HelpGroupSettings } from 'Pages/HelpCenter/HelpGroupSettings'
import { HelpOverAI } from 'Pages/HelpCenter/HelpOverAI'
import { HelpChat } from './Pages/HelpCenter/HelpChat'
import { HelpCheckHW } from 'Pages/HelpCenter/HelpCheckHW'
import { HelpDomainLink } from 'Pages/HelpCenter/HelpDomainLink'
import { HelpGidStart } from 'Pages/HelpCenter/HelpGidStart'
import DomainError from './Pages/DomainAccessDenied/DomainError'
import { TechnicalWorks } from 'Pages/TechnicalWorks/TechnicalWorks'
import { SocialAuthPage } from 'ServicePages/SocialAuthPage'
import { Toaster } from 'react-hot-toast'

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
      navigate(generatePath(`${Path.School}${Path.Courses}`, { school_name: schoolName }))
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
      <Toaster position="bottom-right" reverseOrder={true} />
      <Routes>
        <Route path={Path.Catalog}>
          <Route index element={<CourseCatalogPage />} />
          <Route path={Path.CatalogCourse} element={<CoureCatalogPreview />} />
        </Route>
        <Route path={Path.Certificate} element={<Certificate />} />
        <Route path={Path.InitialPage} element={<Initial />} />
        <Route path={Path.TariffPlansInfo} element={<TariffPlansInfo />} />
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
          <Route path={Path.Courses} element={<HelpCoursesPage />} />
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
    </div>
  )
}
