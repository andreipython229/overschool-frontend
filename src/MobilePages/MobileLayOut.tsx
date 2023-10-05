import { Outlet, useNavigate } from 'react-router-dom'
import { FC, memo, useEffect } from 'react'


import { MobileNavbar } from 'components/Navbar/MobileNavbar/MobileNavbar'
import { Previous } from '../components/Previous/Previous'
import { Header } from 'components/Header/Header'
import { useAppSelector } from '../store/hooks'
import { authSelector } from '../selectors'
import { useFetchSchoolHeaderQuery } from '../api/schoolHeaderService'
import { Path } from '../enum/pathE'

import styles from '../components/MainLayout/mainLayOut.module.scss'

export const MobileLayOut : FC = memo(() => {
  const isLogin = useAppSelector(authSelector)

  const navigate = useNavigate()
  const headerId = localStorage.getItem('header_id')
  const { data, isSuccess } = useFetchSchoolHeaderQuery(Number(headerId))
  
  
  useEffect(() => {
    if (!isLogin) {
      navigate(Path.InitialPage)
    }
  }, [isLogin, navigate])

  useEffect(() => {
    if (isSuccess) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']")

      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.getElementsByTagName('head')[0].appendChild(link)
      }
      data?.favicon_url ? (link.href = data?.favicon_url) : (link.href = '../public/favicon.ico')
    }
  }, [data])

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
})
