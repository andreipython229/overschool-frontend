import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from 'components/Header/Header'
import { Navbar } from 'components/Navbar/Navbar'
import { Previous } from '../Previous/Previous'

import styles from './mainLayOut.module.scss'
import { StudentAccardion } from 'components/StudentAccardion/StudentAccardion'

export const MainLayOut: FC = memo(() => {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <Header />
      <main className={styles.container}>
        <Previous />
        <Outlet />
        {/* <StudentAccardion /> */}
      </main>
    </div>
  )
})
