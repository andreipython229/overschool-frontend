import React, { useState, useEffect, useRef, memo } from 'react'
import { Link, NavLink, generatePath, useLocation, useNavigate } from 'react-router-dom'
import { useFetchProfileDataQuery } from '../../api/profileService'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { auth, logoutState, role } from 'store/redux/users/slice'
import { Path } from 'enum/pathE'
import { useFetchSchoolHeaderQuery, useGetSchoolProgressionDataMutation } from '../../api/schoolHeaderService'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { logOutIconPath } from './config/svgIconsPath'
import { useLazyLogoutQuery } from 'api/userLoginService'
import { schoolProgressSelector, selectUser } from '../../selectors'
import { logo } from '../../assets/img/common'
import { headerUserRoleName } from 'config/index'
import { profileT } from 'types/profileT'
import styles from './header.module.scss'
import { SimpleLoader } from '../Loaders/SimpleLoader'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Checkbox from '@mui/material/Checkbox'
import { SvgIcon, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material'
import { ChatI, SenderI, UserInformAppealsI, UserInformI } from 'types/chatsT'
import { setTotalUnread } from '../../store/redux/chats/unreadSlice'
import { setChats } from '../../store/redux/chats/chatsSlice'

import { ITariff, UserProfileT } from '../../types/userT'
import { setUserProfile, clearUserProfile } from '../../store/redux/users/profileSlice'
import { isEqual } from 'lodash'
import { orangeTariffPlanIconPath, purpleTariffPlanIconPath, redTariffPlanIconPath } from 'config/commonSvgIconsPath'
import { RoleE } from 'enum/roleE'

import { useCookies } from 'react-cookie'
import { useLazyFetchCurrentTariffPlanQuery } from 'api/tariffPlanService'
import { setTariff } from 'store/redux/tariff/tariffSlice'
import { removeSchoolId } from '../../store/redux/school/schoolIdSlice'
import { removeHeaderId } from '../../store/redux/school/headerIdSlice'
import { removeSchoolName } from '../../store/redux/school/schoolSlice'
import { useDispatch } from 'react-redux'

import { motion } from 'framer-motion'
import { w3cwebsocket } from 'websocket'
import { setTotalUnreadAppeals } from '../../store/redux/info/unreadAppealsSlice'
import { useFetchNotificationsQuery, useUpdateTgMessageMutation } from 'api/tgNotificationsServices'
import warning from '../../assets/img/notifications/warning.svg'
import { TgMessage } from 'types/tgNotifications'
import { useFetchStudentsGroupQuery } from 'api/studentsGroupService'
import { useFetchCoursesQuery } from 'api/coursesServices'
import { CoursesDataT } from 'types/CoursesT'
import { Button } from 'components/common/Button/Button'
import { updateSchoolTask } from 'store/redux/newSchoolProgression/slice'
import { useAcceptBannerMutation, useLazyGetStudentBannerQuery } from 'api/schoolBonusService'
import { useBoolean } from 'customHooks'

type WebSocketHeaders = {
  [key: string]: string | string[] | number
}

export const Header = memo(() => {
  const schoolName = window.location.href.split('/')[4]
  const dispatch = useAppDispatch()
  const dispatchRole = useDispatch()
  const [getBanner, { data: banner }] = useLazyGetStudentBannerQuery()
  const [showBanner, { off: openBanner, on: closeBanner }] = useBoolean(false)
  const { role: userRole, authState, userId } = useAppSelector(selectUser)
  const { data: schoolProgress } = useAppSelector(schoolProgressSelector)
  const schoolNameR = useAppSelector(state => state.school.schoolName)
  const [socketConnect, setSocketConnect] = useState<boolean>(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [logout, { isLoading }] = useLazyLogoutQuery()
  const headerId = localStorage.getItem('header_id')
  const { data, isSuccess } = useFetchSchoolHeaderQuery(Number(headerId))
  const { data: profile, isSuccess: profileIsSuccess, isError, error, refetch: refetchUser } = useFetchProfileDataQuery()
  const [fetchCurrentTarrif, { data: tariffPlan, isSuccess: tariffSuccess }] = useLazyFetchCurrentTariffPlanQuery()
  const [currentTariff, setCurrentTariff] = useState<ITariff>({
    tariff_name: '',
    days_left: null,
    staff: null,
    students: null,
    number_of_courses: null,
    tariff: null,
    tariff_details: {
      price_rf_rub: 0,
      id: 0,
      name: '',
      number_of_courses: null,
      number_of_staff: null,
      students_per_month: null,
      total_students: null,
      price: '',
      student_count_by_month: null,
    },
  })
  const [getProgress, { data: schoolProgressData, isSuccess: progressReady, isLoading: isLoadingProgress, isError: notFound }] =
    useGetSchoolProgressionDataMutation()
  const [totalUnreadMessages, setTotalUnreadMessages] = useState<number>(0)
  const [unreadAppeals, setUnreadAppeals] = useState<number>(0)
  const chats = useAppSelector(state => state.chats.chats)
  const [fetchedChats, setFetchedChats] = useState<ChatI[]>([])
  const [, , removeAccessCookie] = useCookies(['access_token'])
  const [, , removeRefreshCookie] = useCookies(['refresh_token'])

  const [profileData, setProfileData] = useState<profileT>()
  const [logotype, setLogo] = useState<string | undefined>('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null)
  const open2 = Boolean(anchorEl2)
  const path = useLocation()
  const [timerId, setTimerId] = useState<number | null>(null)

  const { data: studentsGroups, isSuccess: groupsSuccess } = useFetchStudentsGroupQuery(schoolName)
  const { data: Courses, isSuccess: coursesSuccess } = useFetchCoursesQuery(schoolName)
  const [selectedCourse, setSelectedCourse] = useState<CoursesDataT | null>(null)
  const [acceptBanner] = useAcceptBannerMutation()

  const { data: notificationsResponseData, isSuccess: notificaionsSuccess } = useFetchNotificationsQuery()
  const [showTgMessageForm, setShowTgMessageForm] = useState(false)
  const [createTgMessage] = useUpdateTgMessageMutation()
  const [tgMessage, setTgMessage] = useState<TgMessage>({
    message: '',
    students_groups: [],
  })

  const logOut = async () => {
    await logout().then(data => {
      setProfileData(undefined)
      dispatch(clearUserProfile())
      dispatch(logoutState())
      dispatch(removeSchoolId())
      dispatch(removeHeaderId())
      dispatch(removeSchoolName())
      removeAccessCookie('access_token')
      removeRefreshCookie('refresh_token')
      window.location.reload()
      localStorage.clear()
      dispatch(auth(false))
      navigate(generatePath(Path.InitialPage))
      setSocketConnect(false)

      if (informSocketRef.current !== null) {
        informSocketRef.current.close()
        informSocketRef.current = null
      }
    })
  }

  const handleCloseBanner = () => {
    if (userRole === RoleE.Student && banner) {
      acceptBanner({ id: banner.id, schoolName: schoolName })
        .unwrap()
        .then(() => closeBanner())
    }
  }

  useEffect(() => {
    if (isError && 'originalStatus' in error && error.originalStatus === 401) {
      logOut()
    }
  }, [isError])

  useEffect(() => {
    if (isSuccess) {
      setLogo(data?.logo_school)
    }
  }, [data])

  useEffect(() => {
    if (userRole === RoleE.Admin) {
      fetchCurrentTarrif(schoolName)
    } else if (userRole === RoleE.Student) {
      getBanner(schoolName)
    }
  }, [schoolName])

  useEffect(() => {
    profileIsSuccess && setProfileData(profile[0])
  }, [profile])

  useEffect(() => {
    if (banner && !banner.is_accepted_by_user) {
      openBanner()
    }
  }, [banner, getBanner])

  useEffect(() => {
    if (
      userRole === RoleE.Admin &&
      schoolProgress &&
      schoolProgress.completion_percentage < 100 &&
      !notFound &&
      !schoolProgressData &&
      !isLoadingProgress
    ) {
      getProgress(schoolName)
        .unwrap()
        .then(data => dispatch(updateSchoolTask(data)))
    }
  }, [schoolProgress, schoolProgressData, isLoadingProgress])

  useEffect(() => {
    if (tariffPlan && Object.keys(tariffPlan).length > 1) {
      setCurrentTariff(tariffPlan)
      dispatch(setTariff(tariffPlan))
    }
  }, [tariffSuccess, tariffPlan])

  useEffect(() => {
    if (profileData) {
      const newProfileData: UserProfileT = {
        id: profileData.profile_id || 0,
        username: profileData.user.username || '',
        first_name: profileData.user.first_name || '',
        last_name: profileData.user.last_name || '',
        email: profileData.user.email || '',
        phone_number: profileData.user.phone_number || '',
        avatar: profileData.avatar || '',
      }

      if (newProfileData) {
        dispatch(setUserProfile(newProfileData))
      }
    }
  }, [profileData])

  // Socket INFO Update *****************************************************

  const informSocketRef = useRef<w3cwebsocket | null>(null)

  useEffect(() => {
    if (profileIsSuccess) {
      if (informSocketRef.current === null || informSocketRef.current?.readyState !== w3cwebsocket.OPEN) {
        connectWebSocket()
      }
    }
  }, [profileIsSuccess])

  const connectWebSocket = () => {
    if ((informSocketRef.current === null || informSocketRef.current?.readyState !== w3cwebsocket.OPEN) && userId) {
      informSocketRef.current = new w3cwebsocket(`ws://sandbox.coursehb.ru/ws/info/${schoolName || ''}?user_id=${userId}`)
      // informSocketRef.current = new w3cwebsocket(`wss://apidev.coursehb.ru/ws/info/${schoolName || ''}?user_id=${userId}`)
      // informSocketRef.current = new w3cwebsocket(`ws://localhost:8000/ws/info/${schoolName || ''}?user_id=${userId}`)

      informSocketRef.current.onmessage = event => {
        if (typeof event.data === 'string') {
          const receivedMessage: UserInformI = JSON.parse(event.data)
          if (receivedMessage.type === 'short_chat_info') {
            setTotalUnreadMessages(receivedMessage.message.total_unread)
          } else if (receivedMessage.type === 'full_chat_info') {
            setTotalUnreadMessages(receivedMessage.message.total_unread)

            if (receivedMessage.message.chats.length > 0 && chats) {
              const fetchChats: ChatI[] = receivedMessage.message.chats
              if (fetchChats) {
                setFetchedChats(fetchChats)
              }
            }
          } else if (receivedMessage.type === 'unread_appeals_count') {
            const unreadMessAppeals: UserInformAppealsI = JSON.parse(event.data)
            setUnreadAppeals(unreadMessAppeals.unread_count)
          }
        }
      }

      informSocketRef.current.onclose = () => {
        console.log('INFO WebSocket disconnected')
        // Переподключение при закрытии соединения
        // if (timerId === null) {
        //   const tId = setTimeout(() => {
        //     connectWebSocket()
        //   }, 5000) as unknown as number;
        //   setTimerId(tId);
        // }
      }
    }
  }

  useEffect(() => {
    return () => {
      if (informSocketRef.current !== null) {
        informSocketRef.current.close()
      }
    }
  }, [])

  useEffect(() => {
    const route = generatePath(Path.School + Path.Courses, { school_name: schoolName })
    if (pathname === route) {
      refetchUser()
    }
  }, [pathname])

  // Chat Info Update *******************************************************
  useEffect(() => {
    const totalUnread = totalUnreadMessages || 0
    dispatch(setTotalUnread(totalUnread.toString()))
  }, [totalUnreadMessages])

  // Appeals Unread Update
  useEffect(() => {
    dispatch(setTotalUnreadAppeals(unreadAppeals || 0))
  }, [unreadAppeals])

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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget)
  }

  const goToProfile = () => {
    navigate(Path.Profile)
    setAnchorEl(null)
  }

  const goToChooseSchool = () => {
    // if (timerId) {
    //   clearTimeout(timerId);
    // }
    if (informSocketRef.current !== null) {
      informSocketRef.current.close()
      informSocketRef.current = null
    }
    dispatchRole(role(RoleE.Unknown))
    setSocketConnect(false)
    navigate(Path.ChooseSchool)
    setAnchorEl(null)
  }

  // useEffect(() => {
  //   if (socketConnect) {
  //     if (informSocketRef.current !== null) {
  //       informSocketRef.current.close()
  //       informSocketRef.current = null
  //       console.log("stop socket by button")
  //   }
  //   }
  // }, [socketConnect]);

  // useEffect(() => {
  //   setSocketConnect(true)
  //   console.log("USE EFFECT school Redux = ", schoolNameR)
  // }, [schoolNameR]);

  const handleClose = () => {
    setAnchorEl(null)
  }

  const goToChooseTariff = () => {
    navigate(Path.TariffPlans)
    setAnchorEl2(null)
  }

  const handleClose2 = () => {
    setAnchorEl2(null)
  }

  const handleSendTgMessage = () => {
    createTgMessage({
      data: tgMessage,
    })
    setShowTgMessageForm(false)
  }

  const handleAddTgMessageForm = () => {
    setTgMessage({
      ...tgMessage,
      students_groups: [],
    })
    setShowTgMessageForm(true)
  }

  const handleCourseChange = (courseId: number) => {
    setSelectedCourse(Courses?.results.find(course => course.course_id === courseId) || null)
  }

  return (
    <motion.header
      className={styles.header}
      initial={{
        x: -1000,
      }}
      animate={{
        x: 0,
      }}
      transition={{
        delay: 0.1,
        ease: 'easeInOut',
        duration: 0.5,
      }}
    >
      {banner && (
        <Dialog open={showBanner} onClose={closeBanner} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle sx={{ minWidth: 600 }} id="alert-dialog-title">
            {banner.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ marginBottom: '1rem' }} id="alert-dialog-description">
              {banner.description}
            </DialogContentText>
            <a href={banner.link} target="_blank" rel="noreferrer">
              <Button text={'Перейти по ссылке'} />
            </a>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseBanner}
              autoFocus
              text={banner.is_accepted_by_user ? 'Закрыть' : 'Подтвердить и закрыть'}
              variant={'primary'}
            />
          </DialogActions>
        </Dialog>
      )}

      <NavLink to={userRole === RoleE.Teacher ? Path.CourseStats : Path.Courses}>
        <img className={styles.header_logotype} src={logotype || logo} alt="Logotype IT Overone" />
      </NavLink>
      {currentTariff && !currentTariff.days_left && tariffSuccess && (
        <p
          style={{
            margin: '0 8%',
            color: '#C02020',
            marginTop: '8px',
            fontSize: '15px',
            fontWeight: '600',
            textAlign: 'center',
            fontFamily: '"Inter", sans-serif',
          }}
        >
          Время действия тарифного плана истекло. Ученики и учителя не имеют доступа к школе, необходимо активировать тарифный план. Для активации
          тарифного плана нажмите <a href={generatePath(Path.School + Path.TariffPlans, { school_name: schoolName })}>здесь</a>
        </p>
      )}
      <div className={styles.header_block}>
        {userRole === RoleE.Student && notificationsResponseData && notificationsResponseData.length === 0 ? (
          <Tooltip title={'Включите телеграм уведомления'}>
            <Link to={Path.Profile}>
              <div className={styles.notifications}>
                <img
                  src={warning}
                  alt=""
                  style={{
                    width: '20px',
                    paddingRight: '5px',
                  }}
                />
                <p>Включите уведомления</p>
              </div>
            </Link>
          </Tooltip>
        ) : null}

        <React.Fragment>
          {userRole === RoleE.Admin && (
            <Tooltip title={'Отправить оповещение студентам в телеграме'}>
              <div className={styles.header_block}>
                <Button className={styles.generateMeetingButton} onClick={handleAddTgMessageForm} text="Оповещения" />
                <Dialog
                  open={showTgMessageForm}
                  onClose={() => setShowTgMessageForm(false)}
                  PaperProps={{ style: { maxHeight: '100vh', maxWidth: '600px', width: '100%' } }}
                >
                  <DialogTitle>Отправить оповещение студентам</DialogTitle>
                  <DialogContent>
                    <div style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                      <TextareaAutosize
                        style={{
                          maxWidth: '34vh',
                          minWidth: '34vh',
                          minHeight: '10vh',
                          maxHeight: '20vh',
                          borderColor: 'gray',
                          borderRadius: '4px',
                          overflow: 'auto',
                        }}
                        className={styles.textarea}
                        id="message"
                        placeholder="Введите сообщение"
                        value={tgMessage.message}
                        minLength={1}
                        onChange={e => setTgMessage({ ...tgMessage, message: e.target.value })}
                      />
                    </div>
                    <div>
                      <h2
                        style={{
                          margin: '0',
                          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                          fontWeight: '500',
                          lineHeight: '1.6',
                          fontSize: '1.25rem',
                          padding: '16px 10px',
                        }}
                      >
                        Выберите одну или несколько групп:
                      </h2>
                    </div>
                    {studentsGroups &&
                      studentsGroups.results.map(group => {
                        return (
                          <div key={group.group_id}>
                            <Checkbox
                              style={{
                                color: '#ba75ff',
                              }}
                              onChange={e => {
                                const isChecked = e.target.checked
                                if (isChecked) {
                                  setTgMessage(
                                    (prevData: TgMessage) =>
                                      ({
                                        ...prevData,
                                        students_groups: [...prevData.students_groups, group.group_id],
                                      } as TgMessage),
                                  )
                                } else {
                                  setTgMessage((prevData: TgMessage) => ({
                                    ...prevData,
                                    students_groups: prevData.students_groups.filter(id => id !== group.group_id),
                                  }))
                                }
                              }}
                            />
                            {group.name}
                            <span> (Кол-во студентов: {group.students.length})</span>
                          </div>
                        )
                      })}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleSendTgMessage} text="Отправить" />
                    <Button onClick={() => setShowTgMessageForm(false)} text="Отмена" />
                  </DialogActions>
                </Dialog>
              </div>
            </Tooltip>
          )}
        </React.Fragment>

        <React.Fragment>
          {userRole === RoleE.Admin && currentTariff && currentTariff.days_left && (
            <div>
              <Tooltip title={'Статистика тарифа'}>
                <div className={styles.tariffPlan} style={{ textDecoration: 'none' }} onClick={handleClick2}>
                  <div className={styles.tariffPlan_icon}>
                    <IconSvg
                      width={23}
                      height={19}
                      viewBoxSize="0 0 23 19"
                      path={
                        currentTariff.days_left > 10
                          ? purpleTariffPlanIconPath
                          : currentTariff.days_left > 5
                          ? orangeTariffPlanIconPath
                          : redTariffPlanIconPath
                      }
                    />
                  </div>
                  <p className={styles.tariffPlan_text}>
                    {' Тариф '}
                    <span className={styles.tariffPlan_text_tariff}>{`"${currentTariff.tariff_name}"`}</span>
                    {currentTariff.days_left && (
                      <span
                        style={
                          currentTariff.days_left > 10 ? { color: '#BA75FF' } : currentTariff.days_left > 5 ? { color: 'orange' } : { color: 'red' }
                        }
                      >
                        {` — ${currentTariff.days_left} дней`}{' '}
                      </span>
                    )}
                    <br />
                  </p>
                </div>
              </Tooltip>
              <Menu anchorEl={anchorEl2} id="account-menu" open={open2} onClose={handleClose2} onClick={handleClose2}>
                <MenuItem>
                  <span style={{ color: 'slategrey' }}> Курсов:</span>
                  <span style={{ color: '#BA75FF', paddingLeft: '0.3rem' }}>
                    {`${currentTariff?.number_of_courses}/${currentTariff?.tariff_details.number_of_courses || 'ꝏ'}`}
                  </span>
                  <br />
                </MenuItem>
                <MenuItem>
                  <span style={{ color: 'slategrey' }}> Сотрудников:</span>
                  <span style={{ color: '#BA75FF', paddingLeft: '0.3rem' }}>
                    {' '}
                    {`${currentTariff?.staff}/${currentTariff?.tariff_details?.number_of_staff || 'ꝏ'}`}
                  </span>
                  <br />
                </MenuItem>
                <MenuItem>
                  <span style={{ color: 'slategrey' }}> Студентов:</span>
                  <span style={{ color: '#BA75FF', paddingLeft: '0.3rem' }}>
                    {' '}
                    {`${currentTariff?.students}/${currentTariff?.tariff_details?.total_students || 'ꝏ'}`}
                  </span>
                </MenuItem>
                <MenuItem>
                  <span style={{ color: 'slategrey' }}> Студентов в месяц:</span>
                  <span style={{ color: '#BA75FF', paddingLeft: '0.3rem' }}>
                    {' '}
                    {`${currentTariff?.tariff_details.student_count_by_month}/${currentTariff?.tariff_details.students_per_month}`}
                  </span>
                </MenuItem>
                <MenuItem onClick={goToChooseTariff}>
                  <Link to={Path.TariffPlans} style={{ color: '#ba75ff' }}>
                    Все тарифы
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          )}
        </React.Fragment>
        <React.Fragment>
          <Tooltip title={'Аккаунт пользователя'}>
            <div style={{ textDecoration: 'none', cursor: 'pointer' }} onClick={handleClick}>
              <div className={styles.header_block_user}>
                {profileData?.avatar ? (
                  <img width={'50'} height={'50'} className={styles.header_block_user_avatar} src={profileData?.avatar} alt="avatar" />
                ) : (
                  <div className={styles.header_block_user_avatar_div}>
                    {profileData?.user.last_name[0] || 'Б'}
                    {profileData?.user.first_name[0] || 'И'}
                  </div>
                )}
                <div className={styles.header_block_user_userName}>
                  <span style={{ color: '#BA75FF' }} className={styles.header_block_user_userName_status}>
                    {headerUserRoleName[userRole]}
                  </span>
                  <span className={styles.header_block_user_userName_name}>
                    {!profileData?.user.last_name && !profileData?.user.first_name
                      ? ''
                      : `${profileData?.user.last_name} ${profileData?.user.first_name}`}
                  </span>
                </div>
              </div>
            </div>
          </Tooltip>
          <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}>
            <MenuItem onClick={goToProfile}>
              <Avatar style={{ width: '1.5em', height: '1.5em', display: 'flex', marginLeft: '-0.15em', marginRight: '0.35em' }} />
              <Link to={Path.Profile} style={{ color: 'slategrey' }}>
                Открыть профиль
              </Link>
            </MenuItem>
            <MenuItem onClick={goToChooseSchool}>
              <SvgIcon color="disabled" fontSize={'large'} viewBox="3 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </SvgIcon>
              <Link to={Path.ChooseSchool} style={{ color: 'slategrey' }}>
                Смена платформы
              </Link>
            </MenuItem>
          </Menu>
        </React.Fragment>
        <Tooltip title={'Выход из профиля'}>
          <div className={styles.header_block_logOut}>
            {isLoading ? (
              <SimpleLoader style={{ position: 'fixed', width: '30px', height: '30px' }} />
            ) : (
              <IconSvg width={26} height={26} viewBoxSize="0 0 26 25" path={logOutIconPath} functionOnClick={logOut} />
            )}
          </div>
        </Tooltip>
      </div>
    </motion.header>
  )
})
