import { Outlet } from 'react-router-dom'

import { MobileNavbar } from 'components/Navbar/MobileNavbar/MobileNavbar'
import { Previous } from '../components/Previous/Previous'

import styles from '../components/MainLayout/mainLayOut.module.scss'

export const MobileLayOut = () => {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <Previous />
        <Outlet />
      </main>
      <nav className={styles.mobileFooter}>
        <MobileNavbar />
      </nav>
    </div>
  )
}
