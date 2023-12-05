import { FC, memo, useEffect, useState } from 'react'
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

import { motion } from 'framer-motion'

export const MainLayOut: FC = memo(() => {
  const isLogin = useAppSelector(authSelector)

  const navigate = useNavigate()
  const headerId = localStorage.getItem('header_id')
  const { data, isSuccess } = useFetchSchoolHeaderQuery(Number(headerId))

  useEffect(() => {
    if (isSuccess) {
    document.title = `${data?.name}`
    }
  }, [isSuccess]);

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
      data?.logo_school ? (link.href = data?.logo_school) : (link.href = '')
    }
  }, [data])
  

  
  

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <Header />
      <motion.main className={styles.container}
       initial={{
        x:-1000,
        y: -1000,
      }}
      animate={{
        x:0,
        y: 0,
      }}
      transition={{
        delay: 0.1,
      }}>
        <Previous />
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  )
})
