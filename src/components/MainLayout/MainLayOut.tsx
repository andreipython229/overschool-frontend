import { FC, memo, useEffect, useState } from 'react'
import { generatePath, Outlet, useNavigate } from 'react-router-dom'
import { Header } from 'components/Header/Header'
import { Navbar } from 'components/Navbar/Navbar'
import { Previous } from '../Previous/Previous'
import { useAppSelector } from '../../store/hooks'
import { authSelector, schoolProgressSelector, selectUser } from '../../selectors'
import { useFetchSchoolHeaderQuery } from '../../api/schoolHeaderService'
import { Path } from '../../enum/pathE'
import styles from './mainLayOut.module.scss'
import { Footer } from 'components/Footer'
import { useBoolean as useBooleanHook } from '../../customHooks/useBoolean'
import ChatGPT from '../../components/ChatGPT'
import { useLazyFetchStudentsGroupQuery } from 'api/studentsGroupService'

import { motion } from 'framer-motion'
import { NewSchoolProgress } from 'components/NewSchoolProgress'
import { auth } from '../../store/redux/users/slice'
import { useDispatch } from 'react-redux'
import { useLazyLogoutQuery } from '../../api/userLoginService'
import { RoleE } from 'enum/roleE'
import { BackgroundAnimation } from '../BackgroundAnimation'

export const MainLayOut: FC = memo(() => {
  const isLogin = useAppSelector(authSelector)
  const dispatch = useDispatch()
  const [logout] = useLazyLogoutQuery()

  const navigate = useNavigate()
  const schoolName = window.location.href.split('/')[4]
  const headerId = localStorage.getItem('header_id')
  const { data: progress } = useAppSelector(schoolProgressSelector)

  const { role: userRole } = useAppSelector(selectUser)
  const { data, isSuccess } = useFetchSchoolHeaderQuery(Number(headerId))
  const [getGroups, { data: allGroups, error: groupsError }] = useLazyFetchStudentsGroupQuery()
  const [toggle, handlers] = useBooleanHook()

  const [currentTariff, setCurrentTariff] = useState<any | null>(null)
  const [showChat, setShowChat] = useState<boolean>(false)
  const [overaiLockExists, setOveraiLockExists] = useState(false)
  const routesWithoutPrevious = [`/school/${schoolName}/meetings/`]

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
    setShowChat(!!(userRole === 2 || userRole === 3 || userRole === 4 || userRole === 5 || userRole === 6 || (userRole === 1 && overaiLockExists)))

    if (isSuccess) {
      document.title = `${data?.name}`
    }
  }, [isSuccess, overaiLockExists])

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

  useEffect(() => {
    getGroups(schoolName)
    if (groupsError && 'originalStatus' in groupsError && groupsError.originalStatus === 404) {
      localStorage.clear()
      logout()
      dispatch(auth(false))
      navigate(generatePath(Path.InitialPage))
    }
  }, [groupsError, navigate])

  return (
    <>
      <div className={styles.wrapper}>
        <BackgroundAnimation />
        {userRole === RoleE.Admin && progress.completion_percentage < 100 && <NewSchoolProgress />}
        <Navbar />
        <Header />
        <motion.main
          className={styles.container}
          initial={{
            x: -1000,
            y: -1000,
          }}
          animate={{
            x: 0,
            y: 0,
          }}
          transition={{
            delay: 0.1,
            ease: 'easeInOut',
            duration: 1.2,
          }}
        >
          {!routesWithoutPrevious.includes(location.pathname) && <Previous />}
          <Outlet />
        </motion.main>
        {showChat && isSuccess && <ChatGPT openChatModal={handlers.onToggle} closeChatModal={handlers.off} />}
        <Footer />
      </div>
    </>
  )
})
