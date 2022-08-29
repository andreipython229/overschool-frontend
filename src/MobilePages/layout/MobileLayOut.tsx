import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from 'MobilePages/layout/mainLayOut.module.scss'
import { MobileNavbar } from 'components/Navbar/MobileNavbar/MobileNavbar'

export const MobileLayOut = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.mobileHeader} />
      <main className={styles.main}>
        <Outlet />
      </main>
      <nav className={styles.mobileFooter}>
        <MobileNavbar />
      </nav>
    </div>
  )
}
