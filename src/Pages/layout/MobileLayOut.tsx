import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from 'Pages/layout/mainLayOut.module.scss'
import { MobileNavbar } from 'components/Navbar/MobileNavbar/MobileNavbar'

export const MobileLayOut = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.mobileHeader} />
      <div>
        <Outlet />
      </div>
      <nav className={styles.mobileFooter}>
        <MobileNavbar />
      </nav>
    </div>
  )
}
