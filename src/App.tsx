import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { CoursesStats } from './Pages/CoursesStats/CoursesStats'
import { PageNotFound } from 'Pages/PageNotFound/PageNotFound'
import { HomeWork } from 'Pages/HomeWork/HomeWork'
import { HelpCenter } from 'incomprehensiblePages/HelpCenter/HelpCenter'
import { TariffPlans } from 'incomprehensiblePages/TariffPlans/TariffPlans'
import { School } from 'Pages/School/School'
import { Initial } from 'Pages/Initial/Initial'
import { MainLayOut } from 'components/MainLayout/MainLayOut'
import { Path, Student, SettingsPath, CreateCoursePath } from 'enum/pathE'
import { CoursePage } from './Pages/School/Navigations/CoursesCreating/CoursePage'
import { StudentLessonPreview } from 'Pages/StudentCourse/StudentLessonPreview'
import { StudentCourse } from 'Pages/StudentCourse'
import { useAppSelector } from 'store/hooks'
import { RoleE } from 'enum/roleE'
import { selectUser } from 'selectors'
import { Main } from './Pages/Settings/Main/Main'
import { Employees } from './Pages/Settings/Employees/Employees'
import { Logs } from './Pages/Settings/Logs/Logs'
import { DecorPlatform } from './Pages/Settings/DecorPlatform/DecorPlatform'
import { RedactorCourse } from './Pages/School/Navigations/CoursesCreating/RedactorCourse/RedactorCourse'
import { Constructor } from 'Pages/School/Navigations/CoursesCreating/RedactorCourse/Constructor/Constructor'
import { SettingCourse } from 'Pages/School/Navigations/CoursesCreating/SettingCourse/SettingCourse'
import { StudentsStats } from 'Pages/School/StudentsStats/StudentsStats'
import { useBoolean } from './customHooks/useBoolean'
import { Profile } from 'Pages/Profile/Profile'
import { Settings } from 'Pages/Settings/Settings'

import styles from './App.module.scss'

export const App = () => {
  const { permission } = useAppSelector(selectUser)

  const [isOpen, { off: openModal, on: closeModal }] = useBoolean()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/') {
      navigate(Path.InitialPage)
    }
  }, [])

  return (
    <div className={styles.container}>
      <Routes>
        <Route path={Path.InitialPage} element={<Initial />} />
        <Route path={Path.InitialPage} element={<MainLayOut />}>
          {permission === RoleE.Student ? (
            <Route path={Path.Courses}>
              <Route index element={<CoursePage />} />
              <Route path={Student.Course}>
                <Route index element={<StudentCourse />} />
                <Route path={Student.Lesson} element={<StudentLessonPreview />} />
              </Route>
            </Route>
          ) : (
            <Route path={Path.Courses} element={<School />}>
              {permission === RoleE.SuperAdmin ? (
                <Route path={Path.Settings} element={<Settings isOpen={isOpen} closeModal={closeModal} />}>
                  <Route index element={<Main />} />
                  <Route path={SettingsPath.Main} element={<Main />} />
                  <Route path={SettingsPath.Employees} element={<Employees openModal={openModal} />} />
                  {permission === RoleE.SuperAdmin && <Route path={SettingsPath.Logs} element={<Logs />} />}
                  <Route path={SettingsPath.Decoration} element={<DecorPlatform />} />
                </Route>
              ) : (
                <>
                  <Route index element={<CoursePage />} />
                  <Route path={Path.CreateCourse} element={<RedactorCourse />}>
                    <Route index element={<Constructor />} />
                    <Route path={CreateCoursePath.Constructor} element={<Constructor />} />
                    <Route path={CreateCoursePath.Student} element={<StudentsStats />} />
                    <Route path={CreateCoursePath.Settings} element={<SettingCourse />} />
                  </Route>
                </>
              )}
            </Route>
          )}
          <Route path={Path.Profile} element={<Profile />} />
          <Route path={Path.CourseStats} element={<CoursesStats />} />
          <Route path={Path.Settings} element={<Settings isOpen={isOpen} closeModal={closeModal} />}>
            <Route index element={<Main />} />
            <Route path={SettingsPath.Main} element={<Main />} />
            <Route path={SettingsPath.Employees} element={<Employees openModal={openModal} />} />
            {permission === RoleE.SuperAdmin ? <Route path={SettingsPath.Logs} element={<Logs />} /> : null}
            <Route path={SettingsPath.Decoration} element={<DecorPlatform />} />
          </Route>
          <Route path={Path.HomeWork} element={<HomeWork />} />
          <Route path={Path.HelpCenter} element={<HelpCenter />} />
          <Route path={Path.TariffPlans} element={<TariffPlans />} />
        </Route>
        <Route path={'*'} element={<PageNotFound />} />
      </Routes>
    </div>
  )
}
