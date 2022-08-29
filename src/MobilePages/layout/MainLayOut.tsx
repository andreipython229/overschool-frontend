import React, { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from 'components/Header/Header'
import { Navbar } from 'components/Navbar/Navbar'
import styles from './mainLayOut.module.scss'
import { Previous } from '../../components/Previous/Previous'

export const MainLayOut: FC = memo(() => {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <Header />
      <main className={styles.container}>
        <Previous avatar={''} name={'school name'} description={'супер крутая школа'} />
        <Outlet />
      </main>
    </div>
  )
})
