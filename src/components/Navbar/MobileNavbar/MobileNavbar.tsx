import { FC, memo, useState, useEffect } from 'react'
import { NavLink, generatePath, useNavigate } from 'react-router-dom'
import { Path } from 'enum/pathE'
import { useLazyLogoutQuery } from 'api/userLoginService'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'

import { auth, logoutState } from 'store/redux/users/slice'
import { Chat } from 'components/Modal/Chat'
import { useBoolean } from 'customHooks'
import { chatIconPath } from 'components/Navbar/config/svgIconPath'
import Tooltip from '@mui/material/Tooltip'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/redux/store'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import Badge from '@mui/material/Badge'
import { Portal } from 'components/Modal/Portal'
import { selectUser } from '../../../selectors'
import { navlinkByRoles } from '../config/navlinkByRoles'
import { ChatI, SenderI } from 'types/chatsT'
import { setTotalUnread } from '../../../store/redux/chats/unreadSlice'
import { setChats } from '../../../store/redux/chats/chatsSlice'
import { isEqual, omit } from 'lodash'
import { SvgIcon } from '@mui/material'

import styles from '../navbar.module.scss'
import { clearUserProfile } from 'store/redux/users/profileSlice'
import { removeSchoolId } from 'store/redux/school/schoolIdSlice'
import { removeHeaderId } from 'store/redux/school/headerIdSlice'
import { removeSchoolName } from 'store/redux/school/schoolSlice'
import { useCookies } from 'react-cookie'
import { useFetchProfileDataQuery } from 'api/profileService'
import { RoleE } from 'enum/roleE'

interface IIsActive {
  isActive?: boolean
}

export const MobileNavbar: FC = memo(() => {
  const unRead = useSelector((state: RootState) => state.unread.totalUnread)
  const { role: UserRole } = useAppSelector(selectUser)
  const isActive = ({ isActive }: IIsActive) => (isActive ? styles.isActive : '')
  const [logout] = useLazyLogoutQuery()
  const dispatch = useAppDispatch()
  const [isChatOpen, { on, off }] = useBoolean()
  const [totalUnreadMessages, setTotalUnreadMessages] = useState<number>(0)
  const chats = useAppSelector(state => state.chats.chats)
  const [fetchedChats, setFetchedChats] = useState<ChatI[]>([])
  const [, , removeAccessCookie] = useCookies(['access_token'])
  const [, , removeRefreshCookie] = useCookies(['refresh_token'])
  const navigate = useNavigate()
  const { data: profile, isSuccess: profileIsSuccess, isError, error } = useFetchProfileDataQuery()

  const logOut = async () => {
    await logout().then(data => {
      dispatch(clearUserProfile())
      dispatch(logoutState())
      dispatch(removeSchoolId())
      dispatch(removeHeaderId())
      dispatch(removeSchoolName())
      removeAccessCookie('access_token')
      removeRefreshCookie('refresh_token')
      localStorage.clear()
      dispatch(auth(false))
      navigate(generatePath(Path.InitialPage))
    })
  }

  useEffect(() => {
    if (isError) {
      logOut()
    }
  }, [isError])

  // Chat Info Update *******************************************************
  useEffect(() => {
    const totalUnread = totalUnreadMessages || 0
    dispatch(setTotalUnread(totalUnread.toString()))
  }, [totalUnreadMessages])

  const fetchChatsData = async () => {
    try {
      const response = await fetch('/api/chats/info/')
      if (response.ok) {
        const chatsInfo = await response.json()
        setTotalUnreadMessages(chatsInfo[0].total_unread)
        if (chatsInfo.length > 1 && chats) {
          const fetchChats: ChatI[] = chatsInfo.slice(1)
          if (fetchChats) {
            setFetchedChats(fetchChats)
          }
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchChatsData()
    const intervalId = setInterval(fetchChatsData, 10000)
    return () => clearInterval(intervalId)
  }, [])

  // Удаляем AVATAR
  const omitAvatar = (sender: SenderI): SenderI => {
    const { avatar, ...rest } = sender
    return rest
  }
  // Проходимся по всем чатас и у каждого сендера удаляем аватарку
  const processChats = (chats: ChatI[]): ChatI[] => {
    return chats.map(chat => ({
      ...chat,
      senders: chat.senders.map(omitAvatar),
    }))
  }

  useEffect(() => {
    if (chats && fetchedChats) {
      const chatsWithoutAvatar = processChats(chats)
      const fetchedChatsWithoutAvatar = processChats(fetchedChats)
      const checkChatsDifferent = isEqual(chatsWithoutAvatar, fetchedChatsWithoutAvatar)
      if (!checkChatsDifferent) {
        dispatch(setChats(fetchedChats))
      }
    }
  }, [chats, fetchedChats])
  // **************************************************************

  return (
    <>
      <div className={styles.navbar_setting_account}>
          {navlinkByRoles[UserRole].map(({ path, icon }, index: number) =>
            path !== 'doNotPath' ? (
              <Tooltip
                title={
                  path === Path.Courses
                    ? 'Курсы'
                    : path === Path.CourseStats
                    ? 'Ученики школы'
                    : path === Path.HomeWork
                    ? 'Домашние задания'
                    : 'Настройки школы'
                }
                key={index}
                arrow
                placement={'right'}
              >
                <NavLink key={index} to={path} className={isActive}>
                  {icon}
                </NavLink>
              </Tooltip>
            ) : (
              <>
                <Tooltip title={'Чаты'} arrow placement={'right'}>
                  <div className={`${styles.chatIcon} ${isChatOpen ? styles.chatIcon_active : ''}`} onClick={off}>
                    {Number(unRead) > 0 ? (
                      <Badge badgeContent={unRead} color="error">
                        <IconSvg width={38} height={34} viewBoxSize="0 0 28 24" path={chatIconPath} />
                      </Badge>
                    ) : (
                      <IconSvg width={38} height={34} viewBoxSize="0 0 28 24" path={chatIconPath} />
                    )}
                  </div>
                </Tooltip>
              </>
            ),
          )}

          {UserRole === RoleE.Admin && (
            <Tooltip title={'Связаться с техподдержкой'} arrow placement={'right'}>
              <a key={'techsupport'} href={'https://t.me/over_school'} target="_blank" rel="noreferrer">
                <SvgIcon
                  className={styles.navbar_menu}
                  viewBox={'0 0 508 508'}
                  xmlSpace="preserve"
                  style={{ opacity: '0.8', fontSize: '3.5em', padding: '0.15em', marginBottom: '-0.5rem' }}
                >
                  <circle style={{ fill: '#54C0EB' }} cx="254" cy="254" r="254" />
                  <path
                    style={{ fill: '#FFFFFF' }}
                    d="M303.7,303.3c30.5-17.3,51-50.1,51-87.6c0-55.7-45.1-100.8-100.8-100.8S153.2,160,153.2,215.6
	c0,37.6,20.6,70.3,51,87.6C141,319.3,89.7,365,66,424.8c46.5,51.1,113.5,83.2,188,83.2s141.5-32.1,188-83.2
	C418.3,365,367,319.3,303.7,303.3z"
                  />
                  <path
                    style={{ fill: '#324A5E' }}
                    d="M401.6,182.3h-15.8C370.9,123.4,317.5,79.6,254,79.6s-116.9,43.7-131.8,102.7h-15.8
	c-5.4,0-9.8,4.4-9.8,9.8V240c0,5.4,4.4,9.8,9.8,9.8h20c6.1,0,10.8-5.5,9.7-11.4c-2-10.4-2.7-21.3-1.8-32.5
	c4.8-59.3,53.6-106.9,113.1-110.1c69.2-3.8,126.8,51.5,126.8,119.9c0,7.8-0.8,15.3-2.2,22.7c-1.2,6,3.6,11.5,9.6,11.5h1.8
	c-4.2,13-14.9,37.2-38.3,50.2c-19.6,10.9-44.3,11.9-73.4,2.8c-1.5-6.7-8.9-14.6-16.5-18.3c-9.8-4.9-15.9-0.8-19.4,6.2
	s-3,14.3,6.7,19.2c8.6,4.3,21.6,5.2,27,0.5c13.9,4.3,26.9,6.5,39,6.5c15,0,28.5-3.3,40.4-10c27.5-15.3,38.8-43.7,42.8-57.2h9.9
	c5.4,0,9.8-4.4,9.8-9.8v-47.9C411.4,186.7,407,182.3,401.6,182.3z"
                  />
                </SvgIcon>
              </a>
            </Tooltip>
            
          )}
          <NavLink to={Path.InitialPage} title={'Выход из профиля'} onClick={logOut}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#e0dced"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </div>
        </NavLink>
        </div>
      {isChatOpen && (
        <Portal closeModal={on}>
          <Chat closeModal={on} />
        </Portal>
      )}
    </>
  )
})
