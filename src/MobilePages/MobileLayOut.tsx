import { Outlet, useNavigate } from 'react-router-dom'
import { FC, memo, useEffect, useState } from 'react'

import { MobileNavbar } from 'components/Navbar/MobileNavbar/MobileNavbar'
import { Previous } from '../components/Previous/Previous'
import { Header } from 'components/Header/Header'
import { useAppSelector } from '../store/hooks'
import { authSelector, schoolSelector, selectUser } from '../selectors'
import { useFetchSchoolHeaderQuery } from '../api/schoolHeaderService'
import { Path } from '../enum/pathE'

import styles from '../components/MainLayout/mainLayOut.module.scss'
import MobileChatGPT from '../components/ChatGPT'
import { useBoolean as useBooleanHook } from '../customHooks'
import { useLazyFetchStudentsGroupQuery } from '../api/studentsGroupService'
import { FooterMobile } from 'components/Footer/index_mobile'
import { Footer } from 'components/Footer'
import { MobileHeaderAdmin } from "../Pages/Initial/MobileHeaderAdmin/MobileHeaderAdmin";

import { motion } from 'framer-motion'

export const MobileLayOut: FC = memo(() => {
  const isLogin = useAppSelector(authSelector)

  const navigate = useNavigate()
  const { schoolName, headerId } = useAppSelector(schoolSelector)

  const { role: userRole } = useAppSelector(selectUser)
  const { data, isSuccess } = useFetchSchoolHeaderQuery(Number(headerId))
  const [getGroups, { data: allGroups }] = useLazyFetchStudentsGroupQuery()
  const [showChat, setShowChat] = useState<boolean>(false)
  const [overaiLockExists, setOveraiLockExists] = useState(false)
  const [toggle, handlers] = useBooleanHook()
  const [currentTariff, setCurrentTariff] = useState<any | null>(null)

  useEffect(() => {
    if (userRole === 1) {
      getGroups(schoolName)
    }
  }, [])

  useEffect(() => {
    if (userRole === 1 && allGroups && allGroups.results) {
      const hasOveraiLock = allGroups.results.some(group => group.group_settings && group.group_settings.overai_lock)
      setOveraiLockExists(hasOveraiLock)
    }
  }, [userRole, allGroups])

  useEffect(() => {
    if (!isLogin) {
      navigate(Path.InitialPage)
    }
  }, [isLogin, navigate])

  useEffect(() => {
    setShowChat(!!(userRole === 2 || userRole === 3 || userRole === 4 || userRole === 5 || userRole === 6 || (userRole === 1 && overaiLockExists)))

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

  const updateTariff = (tariff: any) => {
    setCurrentTariff(tariff)
  }

  return (
    <motion.div
      className={styles.wrapper}
      initial={{
        x: -2000,
      }}
      animate={{
        x: 0,
        y: 0,
      }}
      transition={{
        ease: 'easeInOut',
        duration: 0.4,
      }}
    >
      <main className={styles.main}>
        <Previous />
        <Outlet />
        <MobileHeaderAdmin />
      </main>

      {/* <MobileChatGPT openChatModal={handlers.onToggle} closeChatModal={handlers.off} /> */}

      <FooterMobile schoolTariffPlan={updateTariff} />
      <nav className={styles.mobileFooter}>
        <MobileNavbar />
      </nav>
    </motion.div>
  )
})
