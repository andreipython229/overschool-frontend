import { FC, memo, useEffect, useState } from 'react'
import { generatePath, Outlet, useNavigate } from 'react-router-dom'
import { Header } from 'components/Header/Header'
import { Navbar } from 'components/Navbar/Navbar'
import { Previous } from '../Previous/Previous'
import { useAppSelector } from '../../store/hooks'
import { authSelector, schoolProgressSelector, schoolSelector, selectUser } from '../../selectors'
import { useFetchSchoolHeaderQuery } from '../../api/schoolHeaderService'
import { Path } from '../../enum/pathE'
import styles from './mainLayOut.module.scss'
import { Footer } from 'components/Footer'
import { useBoolean as useBooleanHook } from '../../customHooks/useBoolean'
import { ChatGPT } from '../../components/ChatGPT/ChatGPT'
import { useLazyFetchStudentsGroupQuery } from 'api/studentsGroupService'

import { motion } from 'framer-motion'
import { NewSchoolProgress } from 'components/NewSchoolProgress'
import { logoutState } from '../../store/redux/users/slice'
import { useDispatch } from 'react-redux'
import { useLazyLogoutQuery } from '../../api/userLoginService'
import { RoleE } from 'enum/roleE'
import { BackgroundAnimation } from '../BackgroundAnimation'
import { clearUserProfile } from 'store/redux/users/profileSlice'
import { clearSchoolData } from 'store/redux/school/schoolSlice'

export const MainLayOut: FC = memo(() => {
  const isLogin = useAppSelector(authSelector)
  const dispatch = useDispatch()
  const [logout] = useLazyLogoutQuery()

  const navigate = useNavigate()
  const { schoolName, headerId } = useAppSelector(schoolSelector)
  const { data: progress } = useAppSelector(schoolProgressSelector)

  const { role: userRole } = useAppSelector(selectUser)
  const { data, isSuccess } = useFetchSchoolHeaderQuery(Number(headerId))
  const [getGroups, { data: allGroups, error: groupsError }] = useLazyFetchStudentsGroupQuery()
  const [toggle, handlers] = useBooleanHook()
  const [showChat, setShowChat] = useState<boolean>(false)
  const [overaiLockExists, setOveraiLockExists] = useState(false)
  const routesWithoutPrevious = [`/school/${schoolName}/meetings/`]

  const [showOverAI, setShowOverAI] = useState<boolean>(false)

  const toggleChatModal = () => {
    setShowOverAI(prev => !prev);   
  };

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
    if (groupsError) {
      getGroups(schoolName)
      if (groupsError && 'originalStatus' in groupsError && groupsError.originalStatus === 404) {
        localStorage.clear()
        logout()
          .unwrap()
          .finally(() => {
            dispatch(logoutState())
            dispatch(clearUserProfile())
            dispatch(clearSchoolData())
            navigate(generatePath(Path.InitialPage))
          })
      }
    }
  }, [groupsError, navigate])

  return (
    <>
      <div className={styles.wrapper}>
        <BackgroundAnimation />
        {userRole === RoleE.Admin && progress.completion_percentage < 100 && <NewSchoolProgress />}
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
          <Navbar onToggleChat={toggleChatModal} />
          {!routesWithoutPrevious.includes(location.pathname) && <Previous />}
          <Outlet />
        </motion.main>
        {showChat && isSuccess && <ChatGPT isDialogOpen={showOverAI} onClose={() => setShowOverAI(false)} />}
        <Footer />
      </div>
    </>
  )
})
