import { Route, Routes } from 'react-router-dom'

import { CoursesStats } from './Pages/CoursesStats/CoursesStats'
import { PageNotFound } from 'Pages/PageNotFound/PageNotFound'
import { HomeWork } from 'Pages/HomeWork/HomeWork'
import { HelpCenter } from 'incomprehensiblePages/HelpCenter/HelpCenter'
import { TariffPlans } from 'incomprehensiblePages/TariffPlans/TariffPlans'
import { School } from 'Pages/School/School'
import { Initial } from 'Pages/Initial/Initial'
import { MainLayOut } from 'components/MainLayout/MainLayOut'
import { Path } from 'enum/pathE'

import { Profile } from 'Pages/Profile/Profile'
import { Settings } from 'Pages/Settings/Settings'

import styles from './App.module.scss'

export const App = () => {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path={Path.InitialPage} element={<Initial />} />
        <Route path={Path.InitialPage} element={<MainLayOut />}>
          <Route path={Path.Courses} element={<School />} />
          <Route path={Path.Profile} element={<Profile />} />
          <Route path={Path.CourseStats} element={<CoursesStats />} />
          <Route path={Path.Settings} element={<Settings />} />
          <Route path={Path.HomeWork} element={<HomeWork />} />
          <Route path={Path.HelpCenter} element={<HelpCenter />} />
          <Route path={Path.TariffPlans} element={<TariffPlans />} />
        </Route>
        <Route path={'*'} element={<PageNotFound />} />
      </Routes>
    </div>
  )
}
