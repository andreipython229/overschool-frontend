import { Outlet } from 'react-router-dom'

import { MobileNavbar } from 'components/Navbar/MobileNavbar/MobileNavbar'

import styles from '../components/MainLayout/mainLayOut.module.scss';

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
