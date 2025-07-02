import { lazy } from 'react'

// Lazy loaded components
export const Profile = lazy(() => import('../Pages/Profile/Profile').then(module => ({ default: module.Profile })))
export const Settings = lazy(() => import('../Pages/Settings/Settings').then(module => ({ default: module.Settings })))
export const School = lazy(() => import('../Pages/School/School').then(module => ({ default: module.School })))
export const CoursePage = lazy(() => import('../Pages/School/Navigations/CoursesCreating/CoursePage').then(module => ({ default: module.CoursePage })))
export const RedactorCourse = lazy(() => import('../Pages/School/Navigations/CoursesCreating/RedactorCourse/RedactorCourse').then(module => ({ default: module.RedactorCourse })))
export const Constructor = lazy(() => import('../Pages/School/Navigations/CoursesCreating/RedactorCourse/Constructor/Constructor').then(module => ({ default: module.Constructor })))
export const SettingCourse = lazy(() => import('../Pages/School/Navigations/CoursesCreating/SettingCourse/SettingCourse').then(module => ({ default: module.SettingCourse })))
export const StudentsStats = lazy(() => import('../Pages/School/StudentsStats/StudentsStats').then(module => ({ default: module.StudentsStats })))
export const CoursePageConstruct = lazy(() => import('../Pages/School/Navigations/CoursesCreating/RedactorCourse/CoursePage/CoursePage').then(module => ({ default: module.CoursePageConstruct })))
export const Comments = lazy(() => import('../Pages/School/Navigations/CoursesCreating/RedactorCourse/Comments/Comments').then(module => ({ default: module.Comments })))
export const Group = lazy(() => import('../Pages/Group').then(module => ({ default: module.Group })))
export const Passport = lazy(() => import('../Pages/Settings/Passport').then(module => ({ default: module.Passport })))
export const SchoolAppeals = lazy(() => import('../Pages/SchoolAppeals').then(module => ({ default: module.SchoolAppeals })))
export const PaymentMethods = lazy(() => import('../Pages/Settings/PaymentMethods').then(module => ({ default: module.PaymentMethods })))
export const SchoolMeetings = lazy(() => import('../components/Meetings').then(module => ({ default: module.SchoolMeetings })))
export const Webinars = lazy(() => import('../components/Autowebinars/AutoWebinars').then(module => ({ default: module.Webinars })))
export const StudentSchoolMeeting = lazy(() => import('../components/StudentsMeetings').then(module => ({ default: module.default })))
export const Materials = lazy(() => import('../Pages/School/Navigations/CoursesCreating/MaterialsPage').then(module => ({ default: module.Materials })))
export const CourseMaterials = lazy(() => import('../Pages/School/Navigations/CoursesCreating/RedactorCourse/CourseMaterials/CourseMaterials').then(module => ({ default: module.CourseMaterials })))
export const DomainSettings = lazy(() => import('../Pages/Settings/Domain').then(module => ({ default: module.DomainSettings })))
export const PromotionSettings = lazy(() => import('../Pages/Settings/Promotions/Bonuses').then(module => ({ default: module.PromotionSettings })))
export const EmailNewsLetter = lazy(() => import('../Pages/Settings/EmailNewsLetter').then(module => ({ default: module.EmailNewsLetter })))
export const NotificationBanner = lazy(() => import('../Pages/Settings/NotificationBannerSettings').then(module => ({ default: module.NotificationBanner })))
export const Rating = lazy(() => import('../Pages/Rating').then(module => ({ default: module.Rating })))
export const AdminOrTeacherReplyHomework = lazy(() => import('../Pages/HomeWork/AdminOrTeacherReply').then(module => ({ default: module.AdminOrTeacherReplyHomework })))
export const BonusesPage = lazy(() => import('../Pages/Bonuses').then(module => ({ default: module.BonusesPage })))
export const BonusesSettings = lazy(() => import('../Pages/Settings/Bonuses').then(module => ({ default: module.BonusesSettings })))
export const SettingsInvitesProgram = lazy(() => import('../Pages/Settings/InviteProgram').then(module => ({ default: module.SettingsInvitesProgram })))
export const CertificateComponent = lazy(() => import('../Pages/School/Navigations/CoursesCreating/RedactorCourse/Certificates/Certificate').then(module => ({ default: module.default })))
export const StudentCourse = lazy(() => import('../Pages/StudentCourse').then(module => ({ default: module.StudentCourse })))
export const StudentLessonPreview = lazy(() => import('../Pages/StudentCourse/StudentLessonPreview').then(module => ({ default: module.StudentLessonPreview })))
export const HomeWork = lazy(() => import('../Pages/HomeWork/HomeWork').then(module => ({ default: module.HomeWork })))
export const CoursesStats = lazy(() => import('../Pages/CoursesStats/CoursesStats').then(module => ({ default: module.CoursesStats })))
export const HelpCenter = lazy(() => import('../Pages/HelpCenter/HelpCenter').then(module => ({ default: module.HelpCenter })))
export const Main = lazy(() => import('../Pages/Settings/Main/Main').then(module => ({ default: module.Main })))
export const Employees = lazy(() => import('../Pages/Settings/Employees/Employees').then(module => ({ default: module.Employees })))
export const Logs = lazy(() => import('../Pages/Settings/Logs/Logs').then(module => ({ default: module.Logs })))
export const DecorPlatform = lazy(() => import('../Pages/Settings/DecorPlatform/DecorPlatform').then(module => ({ default: module.DecorPlatform })))

// Loading component
export const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '200px',
    fontSize: '18px',
    color: '#357EEB'
  }}>
    Загрузка...
  </div>
) 