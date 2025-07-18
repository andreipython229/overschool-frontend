import { ReactNode, Suspense } from 'react'
import { Route, Navigate } from 'react-router-dom'

import { RoleE } from 'enum/roleE'
import { TariffPlans } from 'Pages/TariffPlans/TariffPlans'
import { Path, Student, SettingsPath, CreateCoursePath } from 'enum/pathE'
import { LoadingSpinner } from '../App'

// Import lazy components
import {
  Profile,
  Settings,
  School,
  CoursePage,
  RedactorCourse,
  Constructor,
  SettingCourse,
  StudentsStats,
  CoursePageConstruct,
  Comments,
  Group,
  Passport,
  SchoolAppeals,
  PaymentMethods,
  SchoolMeetings,
  Webinars,
  StudentSchoolMeeting,
  Materials,
  CourseMaterials,
  DomainSettings,
  PromotionSettings,
  EmailNewsLetter,
  NotificationBanner,
  Rating,
  AdminOrTeacherReplyHomework,
  BonusesPage,
  BonusesSettings,
  SettingsInvitesProgram,
  CertificateComponent,
  StudentCourse,
  StudentLessonPreview,
  HomeWork,
  CoursesStats,
  HelpCenter,
  Main,
  Employees,
  Logs,
  AccessLogs,
  DecorPlatform,
  PWA,
} from './lazyComponents'

// Wrapper component for Suspense
const LazyComponent = ({ component: Component }: { component: React.ComponentType }) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
)

export const navByRolesConfig: { [key: number]: ReactNode } = {
  [RoleE.SuperAdmin]: (
    <>
      <Route path={Path.Profile} element={<LazyComponent component={Profile} />} />
      <Route path={Path.Settings} element={<LazyComponent component={Settings} />}>
        <Route index element={<LazyComponent component={Main} />} />
        <Route path={SettingsPath.Main} element={<LazyComponent component={Main} />} />
        <Route path={SettingsPath.Employees} element={<LazyComponent component={Employees} />} />
        <Route path={SettingsPath.Logs} element={<LazyComponent component={Logs} />} />
        <Route path={SettingsPath.PaymentMethods} element={<LazyComponent component={PaymentMethods} />} />
        <Route path={SettingsPath.Decoration} element={<LazyComponent component={DecorPlatform} />} />
        <Route path={SettingsPath.SchoolPassport} element={<LazyComponent component={Passport} />} />
        <Route path={SettingsPath.DomainSettings} element={<LazyComponent component={DomainSettings} />} />
        <Route path={SettingsPath.PromotionSettings} element={<LazyComponent component={PromotionSettings} />} />
        <Route path={SettingsPath.Bonuses} element={<LazyComponent component={BonusesSettings} />} />
        <Route path={SettingsPath.Referal} element={<LazyComponent component={SettingsInvitesProgram} />} />
      </Route>
      <Route path={Path.HelpCenter} element={<LazyComponent component={HelpCenter} />} />
      <Route path={Path.TariffPlans} element={<TariffPlans />} />
      <Route path={Path.PWA} element={<LazyComponent component={PWA} />} />
    </>
  ),
  [RoleE.Student]: (
    <>
      <Route path={Path.Profile} element={<LazyComponent component={Profile} />} />
      <Route path={Path.Courses}>
        <Route index element={<LazyComponent component={CoursePage} />} />
        <Route path={Path.Bonus} element={<LazyComponent component={BonusesPage} />} />
        <Route path={Student.Course}>
          <Route index element={<LazyComponent component={StudentCourse} />} />
          <Route path={Student.Lesson} element={<LazyComponent component={StudentLessonPreview} />} />
        </Route>
      </Route>
      <Route path={Path.HelpCenter} element={<LazyComponent component={HelpCenter} />} />
      <Route path={Path.TariffPlans} element={<TariffPlans />} />
      <Route path={Path.Meetings} element={<LazyComponent component={StudentSchoolMeeting} />} />
      <Route path={Path.Rating} element={<LazyComponent component={Rating} />} />
      <Route path={Path.PWA} element={<LazyComponent component={PWA} />} />
    </>
  ),
  [RoleE.Admin]: (
    <>
      <Route path={Path.Courses} element={<LazyComponent component={School} />}>
        <Route index element={<LazyComponent component={CoursePage} />} />
        <Route path={Path.Group} element={<LazyComponent component={Group} />} />
        <Route path={Path.CreateCourse} element={<LazyComponent component={RedactorCourse} />}>
          <Route index element={<Navigate to={CreateCoursePath.Constructor} />} />
          <Route path={CreateCoursePath.Constructor} element={<LazyComponent component={Constructor} />} />
          <Route path={CreateCoursePath.Student} element={<LazyComponent component={StudentsStats} />} />
          <Route path={CreateCoursePath.Settings} element={<LazyComponent component={SettingCourse} />} />
          <Route path={CreateCoursePath.Page} element={<LazyComponent component={CoursePageConstruct} />} />
          <Route path={CreateCoursePath.Comments} element={<LazyComponent component={Comments} />} />
          <Route path={CreateCoursePath.Materials} element={<LazyComponent component={CourseMaterials} />} />
          <Route path={CreateCoursePath.Certificates} element={<LazyComponent component={CertificateComponent} />} />
        </Route>
      </Route>
      <Route path={Path.Profile} element={<LazyComponent component={Profile} />} />
      <Route path={Path.CourseStats} element={<LazyComponent component={CoursesStats} />} />
      <Route path={Path.Settings} element={<LazyComponent component={Settings} />}>
        <Route index element={<Navigate to={SettingsPath.Main} />} />
        <Route path={SettingsPath.Main} element={<LazyComponent component={Main} />} />
        <Route path={SettingsPath.Employees} element={<LazyComponent component={Employees} />} />
        <Route path={SettingsPath.Decoration} element={<LazyComponent component={DecorPlatform} />} />
        <Route path={SettingsPath.SchoolPassport} element={<LazyComponent component={Passport} />} />
        <Route path={SettingsPath.PaymentMethods} element={<LazyComponent component={PaymentMethods} />} />
        <Route path={SettingsPath.DomainSettings} element={<LazyComponent component={DomainSettings} />} />
        <Route path={SettingsPath.PromotionSettings} element={<LazyComponent component={PromotionSettings} />} />
        <Route path={SettingsPath.EmailNewsLetter} element={<LazyComponent component={EmailNewsLetter} />} />
        <Route path={SettingsPath.Banner} element={<LazyComponent component={NotificationBanner} />} />
        <Route path={SettingsPath.Bonuses} element={<LazyComponent component={BonusesSettings} />} />
        <Route path={SettingsPath.Referal} element={<LazyComponent component={SettingsInvitesProgram} />} />
      </Route>
      <Route path={Path.HomeWork} element={<LazyComponent component={School} />}>
        <Route index element={<LazyComponent component={HomeWork} />} />
        <Route path={Path.CheckHomeWork} element={<LazyComponent component={AdminOrTeacherReplyHomework} />} />
      </Route>
      <Route path={Path.HelpCenter} element={<LazyComponent component={HelpCenter} />} />
      <Route path={Path.TariffPlans} element={<TariffPlans />} />
      <Route path={Path.Appeals} element={<LazyComponent component={SchoolAppeals} />} />
      <Route path={Path.Meetings} element={<LazyComponent component={SchoolMeetings} />} />
      <Route path={Path.Webinars} element={<LazyComponent component={Webinars} />} />
      <Route path={Path.Rating} element={<LazyComponent component={Rating} />} />
      <Route path={Path.AccessLogs} element={<LazyComponent component={AccessLogs} />} />
      <Route path={Path.PWA} element={<LazyComponent component={PWA} />} />
    </>
  ),
  [RoleE.Teacher]: (
    <>
      <Route path={Path.Profile} element={<LazyComponent component={Profile} />} />
      <Route path={Path.Group} element={<LazyComponent component={Group} />} />
      <Route path={Path.HomeWork} element={<LazyComponent component={School} />}>
        <Route index element={<LazyComponent component={HomeWork} />} />
        <Route path={Path.CheckHomeWork} element={<LazyComponent component={AdminOrTeacherReplyHomework} />} />
      </Route>
      <Route path={Path.CourseStats} element={<LazyComponent component={CoursesStats} />} />
      <Route path={Path.Courses} element={<LazyComponent component={School} />}>
        <Route path={Path.Bonus} element={<LazyComponent component={BonusesPage} />} />
      </Route>
      <Route path={Path.CourseStudent} element={<LazyComponent component={StudentsStats} />} />
      <Route path={Path.HelpCenter} element={<LazyComponent component={HelpCenter} />} />
      <Route path={Path.TariffPlans} element={<TariffPlans />} />
      <Route path={Path.Meetings} element={<LazyComponent component={StudentSchoolMeeting} />} />
      <Route path={Path.PWA} element={<LazyComponent component={PWA} />} />
    </>
  ),
}
