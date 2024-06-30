import { ReactNode } from 'react'
import { Route, Navigate } from 'react-router-dom'

import { RoleE } from 'enum/roleE'
import { CoursesStats } from 'Pages/CoursesStats/CoursesStats'
import { HomeWork } from 'Pages/HomeWork/HomeWork'
import { HelpCenter } from 'Pages/HelpCenter/HelpCenter'
import { TariffPlans } from 'Pages/TariffPlans/TariffPlans'
import { School } from 'Pages/School/School'
import { Path, Student, SettingsPath, CreateCoursePath } from 'enum/pathE'
import { CoursePage } from 'Pages/School/Navigations/CoursesCreating/CoursePage'
import { StudentLessonPreview } from 'Pages/StudentCourse/StudentLessonPreview'
import { StudentCourse } from 'Pages/StudentCourse'
import { Main } from 'Pages/Settings/Main/Main'
import { Employees } from 'Pages/Settings/Employees/Employees'
import { Logs } from 'Pages/Settings/Logs/Logs'
import { DecorPlatform } from 'Pages/Settings/DecorPlatform/DecorPlatform'
import { RedactorCourse } from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/RedactorCourse'
import { Constructor } from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/Constructor/Constructor'
import { SettingCourse } from 'Pages/School/Navigations/CoursesCreating/SettingCourse/SettingCourse'
import { StudentsStats } from 'Pages/School/StudentsStats/StudentsStats'
import { Comments } from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/Comments/Comments'
import { Profile } from 'Pages/Profile/Profile'
import { Settings } from 'Pages/Settings/Settings'
import { Group } from '../Pages/Group'
import { Passport } from 'Pages/Settings/Passport'
import { SchoolAppeals } from 'Pages/SchoolAppeals'
import { PaymentMethods } from 'Pages/Settings/PaymentMethods'
import {SchoolMeetings} from "../components/Meetings";
import StudentSchoolMeeting from "../components/StudentsMeetings";
import { Materials } from 'Pages/School/Navigations/CoursesCreating/MaterialsPage'
import { CourseMaterials } from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/CourseMaterials/CourseMaterials'
import {DomainSettings} from "../Pages/Settings/Domain";
import {Bonuses} from "Pages/Settings/Bonuses/Bonuses";

export const navByRolesConfig: { [key: number]: ReactNode } = {
  [RoleE.SuperAdmin]: (
    <>
      <Route path={Path.Profile} element={<Profile />} />
      <Route path={Path.Settings} element={<Settings />}>
        <Route index element={<Main />} />
        <Route path={SettingsPath.Main} element={<Main />} />
        <Route path={SettingsPath.Employees} element={<Employees />} />
        <Route path={SettingsPath.Logs} element={<Logs />} />
        <Route path={SettingsPath.PaymentMethods} element={<PaymentMethods />} />
        <Route path={SettingsPath.Decoration} element={<DecorPlatform />} />
        <Route path={SettingsPath.SchoolPassport} element={<Passport />} />
        <Route path={SettingsPath.DomainSettings} element={<DomainSettings />} />
        <Route path={SettingsPath.Bonuses} element={<Bonuses />} />
      </Route>
      <Route path={Path.HelpCenter} element={<HelpCenter />} />
      <Route path={Path.TariffPlans} element={<TariffPlans />} />
    </>
  ),
  [RoleE.Student]: (
    <>
      <Route path={Path.Profile} element={<Profile />} />
      <Route path={Path.Courses}>
        <Route index element={<CoursePage />} />
        <Route path={Student.Course}>
          <Route index element={<StudentCourse />} />
          <Route path={Student.Lesson} element={<StudentLessonPreview />} />
        </Route>
      </Route>
      <Route path={Path.HelpCenter} element={<HelpCenter />} />
      <Route path={Path.TariffPlans} element={<TariffPlans />} />
        <Route path={Path.Meetings} element={<StudentSchoolMeeting />} />
    </>
  ),
  [RoleE.Admin]: (
    <>
      <Route path={Path.Courses} element={<School />}>
        <Route index element={<CoursePage />} />
        <Route path={Path.Group} element={<Group />} />
        <Route path={Path.CreateCourse} element={<RedactorCourse />}>
          <Route index element={<Navigate to={CreateCoursePath.Constructor} />} />
          <Route path={CreateCoursePath.Constructor} element={<Constructor />} />
          <Route path={CreateCoursePath.Student} element={<StudentsStats />} />
          <Route path={CreateCoursePath.Settings} element={<SettingCourse />} />
          <Route path={CreateCoursePath.Comments} element={<Comments />} />
        </Route>
      </Route>
      <Route path={Path.Profile} element={<Profile />} />
      <Route path={Path.CourseStats} element={<CoursesStats />} />
      <Route path={Path.Settings} element={<Settings />}>
        <Route index element={<Navigate to={SettingsPath.Main} />} />
        <Route path={SettingsPath.Main} element={<Main />} />
        <Route path={SettingsPath.Employees} element={<Employees />} />
        <Route path={SettingsPath.Decoration} element={<DecorPlatform />} />
        <Route path={SettingsPath.SchoolPassport} element={<Passport />} />
        <Route path={SettingsPath.PaymentMethods} element={<PaymentMethods />} />
        <Route path={SettingsPath.DomainSettings} element={<DomainSettings />} />
        <Route path={SettingsPath.Bonuses} element={<Bonuses />} />
      </Route>
      <Route path={Path.HomeWork} element={<HomeWork />} />
      <Route path={Path.HelpCenter} element={<HelpCenter />} />
      <Route path={Path.TariffPlans} element={<TariffPlans />} />
      <Route path={Path.Appeals} element={<SchoolAppeals />} />
      <Route path={Path.Meetings} element={<SchoolMeetings />} />
    </>
  ),
  [RoleE.Teacher]: (
    <>
      <Route path={Path.Profile} element={<Profile />} />
      <Route path={Path.Group} element={<Group />} />
      <Route path={Path.HomeWork} element={<HomeWork />} />
      <Route path={Path.CourseStats} element={<CoursesStats />} />
      <Route path={Path.Courses} element={<School />}>
      <Route index element={<Materials />} />
      <Route path={Path.CreateCourse} element={<RedactorCourse />}>
          <Route index element={<Navigate to={CreateCoursePath.Materials} />} />
          <Route path={CreateCoursePath.Materials} element={<CourseMaterials />} />
        </Route>
      </Route>
      <Route path={Path.CourseStudent} element={<StudentsStats />} />
      <Route path={Path.HelpCenter} element={<HelpCenter />} />
      <Route path={Path.TariffPlans} element={<TariffPlans />} />
      <Route path={Path.Meetings} element={<StudentSchoolMeeting />} />
    </>
  ),
}
