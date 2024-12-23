import React, { useState, useEffect, useRef, memo} from 'react'
import { Link, generatePath, useLocation, useNavigate } from 'react-router-dom'
import { useFetchProfileDataQuery, useLazyFetchProfileDataQuery } from '../../api/profileService'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logoutState, role, id, authState as setAuthState } from 'store/redux/users/slice'
import { Path } from 'enum/pathE'
import { useFetchSchoolHeaderQuery, useGetSchoolProgressionDataMutation } from '../../api/schoolHeaderService'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { logOutIconPath } from './config/svgIconsPath'
import { useLazyLogoutQuery } from 'api/userLoginService'
import { schoolProgressSelector, selectUser } from '../../selectors'
import { logoHeader } from '../../assets/img/common'
import { headerUserRoleName } from 'config/index'
import { additionalRoleT, profileT } from 'types/profileT'
import styles from './header.module.scss'
import { SimpleLoader } from '../Loaders/SimpleLoader'
import tariffImg from './config/image.png'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Checkbox from '@mui/material/Checkbox'
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material'
import { ChatI, SenderI, UserInformAppealsI, UserInformI } from 'types/chatsT'
import { setTotalUnread } from '../../store/redux/chats/unreadSlice'
import { setChats } from '../../store/redux/chats/chatsSlice'
import { ITariff, UserProfileT } from '../../types/userT'
import { setUserProfile, clearUserProfile } from '../../store/redux/users/profileSlice'
import { isEqual } from 'lodash'
import { orangeTariffPlanIconPath, purpleTariffPlanIconPath, redTariffPlanIconPath } from 'config/commonSvgIconsPath'
import TeacherIcon from '../../assets/img/common/teacher.svg'
import StudentIcon from '../../assets/img/common/student.svg'
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
import { TgMessage } from 'types/tgNotifications'
import { useFetchStudentsGroupWithParamsQuery } from 'api/studentsGroupService'
import { useFetchCoursesQuery } from 'api/coursesServices'
import { useLoginMutation } from '../../api/userLoginService'
import { CoursesDataT } from 'types/CoursesT'
import { Button } from 'components/common/Button/Button'
import { updateSchoolTask } from 'store/redux/newSchoolProgression/slice'
import { useAcceptBannerMutation, useLazyGetStudentBannerQuery } from 'api/schoolBonusService'
import { useBoolean } from 'customHooks'
import HTMLReactParser from 'html-react-parser'
import {
  HomeIconPath,
  MessageConvertIconPath,
  UserIconPath,
} from 'assets/Icons/svgIconPath'
import { SocialMediaButton } from 'components/SocialMediaButton'
import {useFetchSchoolQuery} from "../../api/schoolService";

type WebSocketHeaders = {
  [key: string]: string | string[] | number
}

export const Header = memo(() => {
  const schoolName = window.location.href.split('/')[4]
  const schoolId = localStorage.getItem('school_id')
  const dispatch = useAppDispatch()
  const dispatchRole = useDispatch()
  const [isMenuHover, { onToggle: toggleHover }] = useBoolean(false)
  const [getBanner, { data: banner }] = useLazyGetStudentBannerQuery()
  const [showBanner, { off: openBanner, on: closeBanner }] = useBoolean(false)
  const { role: userRole, userId } = useAppSelector(selectUser)
  const { data: schoolProgress } = useAppSelector(schoolProgressSelector)
  const [socketConnect, setSocketConnect] = useState<boolean>(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [logout, { isLoading }] = useLazyLogoutQuery()
  const headerId = localStorage.getItem('header_id')
  const school_id = Number(localStorage.getItem('school_id'))
  const { data, isSuccess } = useFetchSchoolHeaderQuery(Number(headerId))
  const { data: profileD, isSuccess: profileIsSuccess, isError, error, refetch: refetchUser } = useFetchProfileDataQuery()
  let profile = profileD
  const [fetchProfile, profileDt] = useLazyFetchProfileDataQuery()
  const [fetchCurrentTarrif, { data: tariffPlan, isSuccess: tariffSuccess }] = useLazyFetchCurrentTariffPlanQuery()
  const { data: schoolData, isLoading: schoolDataLoading, error: schoolDataErorr } = useFetchSchoolQuery(Number(schoolId))
  const [loginUser] = useLoginMutation()
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
  const [getProgress, { data: schoolProgressData, isLoading: isLoadingProgress, isError: notFound }] =
    useGetSchoolProgressionDataMutation()
  const [totalUnreadMessages, setTotalUnreadMessages] = useState<number>(0)
  const [unreadAppeals, setUnreadAppeals] = useState<number>(0)
  const chats = useAppSelector(state => state.chats.chats)
  const [fetchedChats, setFetchedChats] = useState<ChatI[]>([])
  const [, , removeAccessCookie] = useCookies(['access_token'])
  const [, , removeRefreshCookie] = useCookies(['refresh_token'])

  const [profileData, setProfileData] = useState<profileT>()
  const [schoolRoles, setSchoolRoles] = useState<additionalRoleT | undefined>(undefined)
  const [logotype, setLogo] = useState<string | undefined>('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null)
  const open2 = Boolean(anchorEl2)

  const { data: studentsGroups } = useFetchStudentsGroupWithParamsQuery({ schoolName: schoolName, params: 's=100' })
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
  const [allGroups, setAllGroups] = useState<boolean>(false)

  const restrictedEmails = ['admin@coursehub.ru', 'teacher@coursehub.ru', 'student@coursehub.ru']
  const canChangePlatform = profileData?.user?.email ? !restrictedEmails.includes(profileData.user.email) : false

  const logOut = async () => {
    await logout().then(() => {
      setProfileData(undefined)
      dispatch(clearUserProfile())
      dispatch(logoutState())
      dispatch(removeSchoolId())
      dispatch(removeHeaderId())
      dispatch(removeSchoolName())
      removeAccessCookie('access_token')
      removeRefreshCookie('refresh_token')
      localStorage.clear()
      navigate(generatePath(Path.InitialPage))
      setSocketConnect(false)

      if (informSocketRef.current !== null) {
        informSocketRef.current.close()
        informSocketRef.current = null
      }
    })
  }

  const handleLogin = async (login: string, password: string) => {
    try {
      const formData = { login, password }
      const result = await loginUser(formData).unwrap()
      if (result) {
        const { access, refresh, user } = result

        dispatch(setAuthState({ access, refresh }))
        dispatch(id(user.id))
        let userRole
        if (user.email === 'admin@coursehub.ru') {
          userRole = 6
        } else if (user.email === 'teacher@coursehub.ru') {
          userRole = 2
        } else if (user.email === 'student@coursehub.ru') {
          userRole = 1
        } else {
          userRole = 0
        }

        dispatch(role(userRole))
        await fetchProfile()
        profile = profileDt.data
        localStorage.setItem('id', user.id.toString())
        localStorage.setItem('email', user.email)
      }
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  const handleCloseBanner = () => {
    if (userRole === RoleE.Student && banner) {
      acceptBanner({ id: banner.id, schoolName: schoolName })
        .unwrap()
        .then(() => closeBanner())
    }
  }

  useEffect(() => {
    if (profileIsSuccess && profile) {
      const profileData = Array.isArray(profile) ? profile[0] : profile

      if ('additional_roles' in profileData) {
        const rolesForSchool = profileData.additional_roles.find((role: additionalRoleT) => role.school_id === school_id)

        setSchoolRoles(rolesForSchool)
      }
    }
  }, [profile, profileIsSuccess, school_id])

  useEffect(() => {
    if (isError && error && 'originalStatus' in error && error.originalStatus === 401) {
      logOut()
    }
  }, [isError])

  useEffect(() => {
    if (coursesSuccess && Courses) {
      const courseData: { [key: string]: boolean } = {}

      Courses.results.forEach(course => {
        courseData[course.course_id] = course.is_copy
      })

      localStorage.setItem('course_data', JSON.stringify(courseData))
    }
  }, [coursesSuccess, Courses])

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
    profile && profileIsSuccess && setProfileData(profile[0])
  }, [profile])

  useEffect(() => {
    if (banner && 'is_accepted_by_user' in banner && !banner.is_accepted_by_user) {
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
      const socketPath =
        process.env.REACT_APP_RUN_MODE === 'PRODUCTION'
          ? `wss://apidev.coursehb.ru/ws/info/${schoolName || ''}?user_id=${userId}`
          : `ws://sandbox.coursehb.ru/ws/info/${schoolName || ''}?user_id=${userId}`
      informSocketRef.current = new w3cwebsocket(socketPath)
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

  const handleAllGroups = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isAll = event.target.checked
    setAllGroups(isAll)
    const groupsIds = studentsGroups?.results.map(group => Number(group.group_id))
    if (isAll) {
      setTgMessage(
        (prevData: TgMessage) =>
          ({
            ...prevData,
            students_groups: groupsIds,
          } as TgMessage),
      )
    } else {
      setTgMessage((prevData: TgMessage) => ({
        ...prevData,
        students_groups: [],
      }))
    }
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

  useEffect(() => {
    if ((anchorEl || anchorEl2) && !isMenuHover) {
      toggleHover()
    } else if (!anchorEl && !anchorEl2 && isMenuHover) {
      toggleHover()
    }
  }, [anchorEl, anchorEl2, isMenuHover])

  return (
    <motion.header
      className={`${isMenuHover && styles.headerActive} ${styles.header}`}
      initial={{
        x: -1000,
      }}
      animate={{
        x: '-50%',
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
              {typeof banner.description === 'string' && HTMLReactParser(banner.description)}
            </DialogContentText>
            <a href={banner.link} target="_blank" rel="noreferrer">
              <Button text={'Перейти по ссылке'} type="button" />
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
      <div className={styles.header_logo} onClick={() => navigate(generatePath(Path.Courses))}>
        <img src={logoHeader} alt="Logotype ITOVERONE" />
      </div>
      <div className={styles.header_hiddenBlock}>
        <React.Fragment>
          {userRole === RoleE.Admin && (
            <div className={styles.header_block}>
              <Button className={styles.messageBtn} variant="newSecondary" onClick={handleAddTgMessageForm} text="Оповещения">
                <IconSvg viewBoxSize="0 0 18 18" width={18} height={18} path={MessageConvertIconPath} />
              </Button>
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
                        padding: '16px 0',
                      }}
                    >
                      Выберите одну или несколько групп:
                    </h2>
                  </div>
                  {studentsGroups && (
                    <div>
                      <Checkbox
                        style={{ color: '#357EEB' }}
                        checked={allGroups}
                        onChange={e => {
                          handleAllGroups(e)
                        }}
                      />
                      <span>
                        <b>выбрать все группы</b>
                      </span>
                    </div>
                  )}
                  {studentsGroups && (
                    <div className={styles.wrapper_content_groups}>
                      {Object.entries(
                        studentsGroups.results.reduce<Record<string, typeof studentsGroups.results>>((acc, group) => {
                          const courseName = group.course_name
                          if (courseName) {
                            if (!acc[courseName]) {
                              acc[courseName] = []
                            }
                            acc[courseName].push(group)
                          }
                          return acc
                        }, {}),
                      ).map(([courseName, groups]) => (
                        <div key={courseName} style={{ marginBlockStart: '3px' }}>
                          <b>{courseName}</b>
                          {groups.map((group, index) => (
                            <div key={group.group_id} style={{ marginBlockStart: index === 0 ? '3px' : '-10px' }}>
                              <Checkbox
                                style={{ color: '#357EEB' }}
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
                                    setAllGroups(false)
                                    setTgMessage((prevData: TgMessage) => ({
                                      ...prevData,
                                      students_groups: prevData.students_groups.filter(id => id !== group.group_id),
                                    }))
                                  }
                                }}
                                checked={new Set(tgMessage.students_groups).has(Number(group.group_id))}
                              />
                              {group.name}
                              <span> (Кол-во студентов: {group.students.length})</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleSendTgMessage} text="Отправить" />
                  <Button onClick={() => setShowTgMessageForm(false)} text="Отмена" />
                </DialogActions>
              </Dialog>
            </div>
          )}
        </React.Fragment>

        <React.Fragment>
          {userRole === RoleE.Admin && currentTariff && currentTariff.days_left && (
            <div>
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
                  <span className={styles.tariffPlan_text_tariff}>{`${'Тариф'} "${currentTariff.tariff_name}"`}</span>
                  {currentTariff.days_left && (
                    <span
                      style={
                        currentTariff.days_left > 10 ? { color: '#357EEB' } : currentTariff.days_left > 5 ? { color: 'orange' } : { color: 'red' }
                      }
                    >
                      {`${currentTariff.days_left} дней`}
                    </span>
                  )}
                </p>
              </div>
              <Menu anchorEl={anchorEl2} id="account-menu" open={open2} onClose={handleClose2} onClick={handleClose2} className={styles.popoverWrapper}>
                <MenuItem>
                  <span> Курсов:</span>
                  <span style={{ paddingLeft: '0.3rem' }}>
                    {`${currentTariff?.number_of_courses}/${currentTariff?.tariff_details.number_of_courses || 'ꝏ'}`}
                  </span>
                  <br />
                </MenuItem>
                <MenuItem>
                  <span> Сотрудников:</span>
                  <span style={{ paddingLeft: '0.3rem' }}>
                    {' '}
                    {`${currentTariff?.staff}/${currentTariff?.tariff_details?.number_of_staff || 'ꝏ'}`}
                  </span>
                  <br />
                </MenuItem>
                <MenuItem>
                  <span > Студентов:</span>
                  <span style={{ paddingLeft: '0.3rem' }}>
                    {' '}
                    {`${currentTariff?.students}/${currentTariff?.tariff_details?.total_students || 'ꝏ'}`}
                  </span>
                </MenuItem>
                <MenuItem>
                  <span> Студентов в месяц:</span>
                  <span style={{ paddingLeft: '0.3rem' }}>
                    {' '}
                    {`${currentTariff?.tariff_details.student_count_by_month}/${currentTariff?.tariff_details.students_per_month}`}
                  </span>
                </MenuItem>
                <div onClick={goToChooseTariff} className={styles.goToTariff}>
                  <p>Перейти на тариф</p>
                  <img src={tariffImg} alt='tariffs-page'/>
                </div>
              </Menu>
            </div>
          )}
        </React.Fragment>
        <div className={styles.header_socialIcons}>
  {schoolData && (
    <>
      <SocialMediaButton variant="Telegram" url={schoolData.telegram_link || 'https://t.me/course_hb'} />
      <SocialMediaButton variant="Instagram" url={schoolData.instagram_link || 'https://instagram.com/'} />
      <SocialMediaButton variant="X" url={schoolData.twitter_link || "https://x.com/"} />
      <SocialMediaButton variant="Youtube" url={schoolData.youtube_link || "https://youtube.com/"} />
      <SocialMediaButton variant="VK" url={schoolData.vk_link ||"https://vk.ru/"} />
      <SocialMediaButton variant="Link" url={schoolData.extra_link ||"#"} />
    </>
  )}
</div>
        <React.Fragment>
          <Button variant="newPrimary" text={headerUserRoleName[userRole]} onClick={handleClick} style={{ fontSize: '16px' }}>
            <IconSvg width={18} height={18} viewBoxSize="0 0 24 24" path={UserIconPath} />
          </Button>
          <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose} className={styles.popoverWrapper}>
            <MenuItem onClick={goToProfile}>
              <IconSvg viewBoxSize="0 0 24 24" width={18} height={18} path={UserIconPath}/>
              <Link to={Path.Profile}>
                Открыть профиль
              </Link>
            </MenuItem>
            {canChangePlatform && (
              <MenuItem onClick={goToChooseSchool}>
                <IconSvg viewBoxSize='0 0 24 24' width={18} height={18} path={HomeIconPath}/>
                <Link to={Path.ChooseSchool}>
                  Смена платформы
                </Link>
              </MenuItem>
            )}
            {schoolRoles && schoolRoles.roles.includes('Студент') && (
              <MenuItem onClick={() => handleLogin('student@coursehub.ru', 'ac4LMPEzwy')}>
                <img src={StudentIcon} alt="Student Icon" width="24px" height="24px" />
                <Link to={Path.ChooseSchool} style={{ marginLeft: '10px', color: 'slategrey' }}>
                  Сменить роль на Студент
                </Link>
              </MenuItem>
            )}
            {schoolRoles && schoolRoles.roles.includes('Учитель') && (
              <MenuItem onClick={() => handleLogin('teacher@coursehub.ru', 'm4OjkNzZPh')}>
                <img src={TeacherIcon} alt="Teacher Icon" width="24px" height="24px" />
                <Link to={Path.ChooseSchool} style={{ marginLeft: '10px', color: 'slategrey' }}>
                  Сменить роль на Учитель
                </Link>
              </MenuItem>
            )}
            {schoolRoles && schoolRoles.roles.includes('Администратор') && (
              <MenuItem onClick={() => handleLogin('admin@coursehub.ru', 'yQoJ5TaFpK')}>
                <img src={TeacherIcon} alt="Teacher Icon" width="24px" height="24px" />
                <Link to={Path.ChooseSchool} style={{ marginLeft: '10px', color: 'slategrey' }}>
                  Сменить роль на Администратор
                </Link>
              </MenuItem>
            )}
          </Menu>
        </React.Fragment>
        <div className={styles.header_logOut} onClick={logOut}>
          <p>Выйти</p>
          {isLoading ? (
            <SimpleLoader style={{ position: 'fixed', width: '30px', height: '30px' }} loaderColor="#357EEB" />
          ) : (
            <IconSvg width={26} height={26} viewBoxSize="0 0 26 25" path={logOutIconPath} />
          )}
        </div>
      </div>
    </motion.header>
  )
})
