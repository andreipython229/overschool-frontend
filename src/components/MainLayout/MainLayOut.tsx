import { FC, memo, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from 'components/Header/Header'
import { Navbar } from 'components/Navbar/Navbar'
import { Previous } from '../Previous/Previous'
import { useAppSelector } from '../../store/hooks'
import { authSelector } from '../../selectors'
import { useFetchSchoolHeaderQuery } from '../../api/schoolHeaderService'
import { Path } from '../../enum/pathE'

import styles from './mainLayOut.module.scss'
import { Footer } from 'components/Footer'

export const MainLayOut: FC = memo(() => {
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
      <Navbar />
      <Header />
      <main className={styles.container}>
        <Previous />
        <Outlet />
      </main>
      <Footer />
    </div>
  )
})
