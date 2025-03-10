import React, { useState, useEffect, useRef, memo } from 'react'
import { Link, generatePath, useNavigate } from 'react-router-dom'
import { useLazyFetchProfileDataQuery } from '../../api/profileService'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logoutState, role, id, authState as setAuthState } from 'store/redux/users/slice'
import { Path } from 'enum/pathE'
import { useFetchSchoolHeaderQuery, useGetSchoolProgressionDataMutation } from '../../api/schoolHeaderService'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { logOutIconPath } from './config/svgIconsPath'
import { useLazyLogoutQuery } from 'api/userLoginService'
import { schoolProgressSelector, schoolSelector, selectUser, selectUserProfile } from '../../selectors'
import { logoHeader } from '../../assets/img/common'
import CloseIcon from '../../assets/img/common/close.svg'
import { headerUserRoleName } from 'config/index'
import { additionalRoleT } from 'types/profileT'
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
import { ITariff } from '../../types/userT'
import { setUserProfile, clearUserProfile } from '../../store/redux/users/profileSlice'
import { isEqual } from 'lodash'
import { orangeTariffPlanIconPath, purpleTariffPlanIconPath, redTariffPlanIconPath } from 'config/commonSvgIconsPath'
import TeacherIcon from '../../assets/img/common/teacher.svg'
import StudentIcon from '../../assets/img/common/student.svg'
import { RoleE } from 'enum/roleE'
import { useLazyFetchCurrentTariffPlanQuery } from 'api/tariffPlanService'
import { setTariff } from 'store/redux/tariff/tariffSlice'
import { clearSchoolData } from '../../store/redux/school/schoolSlice'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { w3cwebsocket } from 'websocket'
import { setTotalUnreadAppeals } from '../../store/redux/info/unreadAppealsSlice'
import { useUpdateTgMessageMutation } from 'api/tgNotificationsServices'
import { TgMessage } from 'types/tgNotifications'
import { useLazyFetchStudentsGroupWithParamsQuery } from 'api/studentsGroupService'
import { useFetchCoursesQuery } from 'api/coursesServices'
import { useLoginMutation } from '../../api/userLoginService'
import { CoursesDataT } from 'types/CoursesT'
import { Button } from 'components/common/Button/Button'
import { updateSchoolTask } from 'store/redux/newSchoolProgression/slice'
import { useAcceptBannerMutation, useLazyGetStudentBannerQuery } from 'api/schoolBonusService'
import { useBoolean } from 'customHooks'
import HTMLReactParser from 'html-react-parser'
import { HomeIconPath, MessageConvertIconPath, UserIconPath } from 'assets/Icons/svgIconPath'
import { SocialMediaButton } from 'components/SocialMediaButton'
import { useFetchSchoolQuery } from '../../api/schoolService'

export const Header = memo(() => {
  const schoolName = window.location.href.split('/')[4]

  const dispatch = useAppDispatch()
  const dispatchRole = useDispatch()
  const navigate = useNavigate()
  const { schoolId, headerId } = useAppSelector(schoolSelector)
  const { userProfile } = useAppSelector(selectUserProfile)
  const { role: userRole, userId } = useAppSelector(selectUser)
  const { data: schoolProgress } = useAppSelector(schoolProgressSelector)
  const chats = useAppSelector(state => state.chats.chats)

  const [isMenuHover, { onToggle: toggleHover }] = useBoolean(false)
  const [showBanner, { off: openBanner, on: closeBanner }] = useBoolean(false)
  const [socketConnect, setSocketConnect] = useState<boolean>(false)
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
      discount_12_months_byn: 0,
    },
  })
  const [totalUnreadMessages, setTotalUnreadMessages] = useState<number>(0)
  const [unreadAppeals, setUnreadAppeals] = useState<number>(0)
  const [fetchedChats, setFetchedChats] = useState<ChatI[]>([])
  const [schoolRoles, setSchoolRoles] = useState<additionalRoleT | undefined>(undefined)
  const [logotype, setLogo] = useState<string | undefined>('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null)
  const open2 = Boolean(anchorEl2)
  const [tgMessage, setTgMessage] = useState<TgMessage>({
    message: '',
    students_groups: [],
  })
  const [allGroups, setAllGroups] = useState<boolean>(false)
  const [showTgMessageForm, setShowTgMessageForm] = useState(false)
  const { data, isSuccess } = useFetchSchoolHeaderQuery(Number(headerId))
  const [logout, { isLoading }] = useLazyLogoutQuery()
  const [getBanner, { data: banner }] = useLazyGetStudentBannerQuery()
  const [refetchUser, { isSuccess: profileIsSuccess, isError, error }] = useLazyFetchProfileDataQuery()
  const [fetchCurrentTarrif, { data: tariffPlan, isSuccess: tariffSuccess }] = useLazyFetchCurrentTariffPlanQuery()
  const { data: schoolData } = useFetchSchoolQuery(Number(schoolId))
  const [loginUser] = useLoginMutation()
  const [getProgress, { data: schoolProgressData, isLoading: isLoadingProgress, isError: notFound }] = useGetSchoolProgressionDataMutation()
  const [fetchGroups, { data: studentsGroups }] = useLazyFetchStudentsGroupWithParamsQuery()
  const { data: Courses, isSuccess: coursesSuccess } = useFetchCoursesQuery(schoolName)
  const [acceptBanner] = useAcceptBannerMutation()
  const [createTgMessage] = useUpdateTgMessageMutation()

  const restrictedEmails = ['admin@coursehub.ru', 'teacher@coursehub.ru', 'student@coursehub.ru']
  const canChangePlatform = userProfile?.email ? !restrictedEmails.includes(userProfile.email) : false

  const logOut = async () => {
    await logout().then(() => {
      dispatch(clearUserProfile())
      dispatch(logoutState())
      dispatch(clearSchoolData())
      localStorage.clear()
      navigate(generatePath(Path.InitialPage))
      setSocketConnect(false)

      if (informSocketRef.current !== null) {
        informSocketRef.current.close()
        informSocketRef.current = null
      }
    })
  }

  useEffect(() => {
    if (userRole === RoleE.Admin) {
      fetchGroups({ schoolName: schoolName, params: 's=100' })
    }
  }, [])

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
        await refetchUser()
          .unwrap()
          .then(data =>
            dispatch(
              setUserProfile({
                id: data[0].profile_id,
                first_name: data[0].user.first_name,
                last_name: data[0].user.last_name,
                email: String(data[0].user.email),
                username: String(data[0].user.username),
                phone_number: String(data[0].user.phone_number),
                avatar: data[0].avatar,
                additional_roles: data[0].additional_roles,
              }),
            ),
          )
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
    if (userProfile) {
      if ('additional_roles' in userProfile && userProfile.additional_roles.length > 0) {
        const rolesForSchool = userProfile.additional_roles.find((role: additionalRoleT) => role.school_id === schoolId)

        setSchoolRoles(rolesForSchool)
      }
    }
  }, [userProfile])

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
    if (!userProfile) {
      refetchUser()
        .unwrap()
        .then(data =>
          dispatch(
            setUserProfile({
              id: data[0].profile_id,
              first_name: data[0].user.first_name,
              last_name: data[0].user.last_name,
              email: String(data[0].user.email),
              username: String(data[0].user.username),
              phone_number: String(data[0].user.phone_number),
              avatar: data[0].avatar,
              additional_roles: data[0].additional_roles,
            }),
          ),
        )
    }
  }, [userProfile])

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
    if (informSocketRef.current !== null) {
      informSocketRef.current.close()
      informSocketRef.current = null
    }
    dispatchRole(role(RoleE.Unknown))
    dispatch(clearSchoolData())
    setSocketConnect(false)
    navigate(Path.ChooseSchool)
    setAnchorEl(null)
  }

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

  const handleAllGroups = (isAll: boolean) => {
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
        <div>
          {userRole === RoleE.Admin && (
            <div className={styles.header_block}>
              <Button className={styles.messageBtn} variant="newSecondary" onClick={handleAddTgMessageForm} text="Оповещения">
                <IconSvg viewBoxSize="0 0 18 18" width={18} height={18} path={MessageConvertIconPath} />
              </Button>
              <Dialog
                open={showTgMessageForm}
                onClose={() => setShowTgMessageForm(false)}
                PaperProps={{
                  style: {
                    maxHeight: '100vh',
                    borderRadius: 'min(20px, 2.8vw)',
                    padding: 'min(20px, 2.8vw) min(84px, 11.75vw)',
                    margin: '0',
                    fontFamily: "'SFPRORegular', sans-serif",
                    maxWidth: '715px',
                    width: 'min(715px, 100vw)',
                  },
                }}
              >
                <DialogTitle
                  style={{
                    fontFamily: "'SFPRORegular', sans-serif",
                    fontSize: 'clamp(14px, 3.35vw, 24px)',
                    padding: '0',
                    paddingLeft: '0',
                  }}
                >
                  Отправить сообщения студентам
                  <button className={styles.closeButton} onClick={() => setShowTgMessageForm(false)}>
                    <img src={CloseIcon} alt="Close" style={{ width: 'min(16px, 2.24vw)' }} />
                  </button>
                </DialogTitle>
                <div
                  style={{
                    fontSize: 'clamp(12px, 2.24vw, 16px)',
                    paddingLeft: 'min(10px, 1.4vw)',
                    paddingBottom: 'min(16px, 2.24vw)',
                    paddingTop: 'min(8.39px, 1.4vw)',
                    fontFamily: "'SFPRORegular', sans-serif",
                  }}
                >
                  Выберите одну или несколько ШКОЛ
                </div>

                <div className={styles.textAreaBack}>
                  <TextareaAutosize
                    style={{
                      width: 'min(515px, 72.03vw)',
                      height: 'min(18.8vh, 29.51vw)',
                      maxHeight: '211px',
                      borderRadius: '4px',
                      overflow: 'auto',
                    }}
                    className={styles.textarea}
                    id="message"
                    placeholder="Text"
                    value={tgMessage.message}
                    minLength={1}
                    onChange={e => setTgMessage({ ...tgMessage, message: e.target.value })}
                  />
                  <DialogActions style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button
                      onClick={handleSendTgMessage}
                      className={styles.customButton}
                      style={{
                        backgroundColor: '#357EEB',
                        flex: '1',
                        color: 'white',
                      }}
                      text="Отправить"
                    />
                    <Button
                      onClick={() => setShowTgMessageForm(false)}
                      className={styles.customButton}
                      style={{
                        backgroundColor: '#cfe2ff',
                        color: '#357EEB',
                        flex: '1',
                        border: '1px solid #357EEB',
                      }}
                      text="Отмена"
                    />
                  </DialogActions>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Button
                    onClick={() => handleAllGroups(true)}
                    className={styles.customButton}
                    style={{
                      backgroundColor: '#357EEB',
                      padding: 'min(8.39px, 1.4vw) min(50px, 6.99vw)',
                      marginTop: 'min(12px, 1.68vw)',
                      color: 'white',
                      display: 'block',
                    }}
                    text="Выбрать все группы"
                  />
                  <Button
                    onClick={() => handleAllGroups(false)}
                    className={styles.customButton}
                    style={{
                      backgroundColor: 'white',
                      color: '#357EEB',
                      padding: 'min(8.39px, 1.4vw) min(50px, 6.99vw)',
                      marginTop: 'min(10.91px, 1.82vw)',
                      marginBottom: 'min(10.91px, 1.82vw)',
                      border: '1px solid #357EEB',
                    }}
                    text="Снять выделение со всех групп"
                  />
                </div>

                <DialogContent className={styles.MuiDialogContent_root} style={{ padding: '0' }}>
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
                        <div key={courseName} style={{ marginBlockStart: 'min(2.52px, 0.42vw)' }}>
                          <Checkbox
                            className={styles.customCheckbox}
                            sx={{
                              '& .MuiSvgIcon-root': {
                                width: 'min(24px, 3.35vw)',
                                height: 'min(24px, 3.35vw)',
                              },
                            }}
                            onChange={e => {
                              const isChecked = e.target.checked
                              if (isChecked) {
                                setTgMessage(
                                  (prevData: TgMessage) =>
                                    ({
                                      ...prevData,
                                      students_groups: [...prevData.students_groups, ...groups.map(group => group.group_id)],
                                    } as TgMessage),
                                )
                              } else {
                                setAllGroups(false)
                                setTgMessage((prevData: TgMessage) => ({
                                  ...prevData,
                                  students_groups: prevData.students_groups.filter(id => !groups.some(group => group.group_id === id)),
                                }))
                              }
                            }}
                            checked={groups.every(group => new Set(tgMessage.students_groups).has(Number(group.group_id)))}
                          />
                          <b style={{ fontSize: 'clamp(14px, 2.8vw, 16.78px)', fontFamily: "'SFPRORegular', sans-serif", color: 'grey' }}>
                            {courseName} (групп: {groups.length})
                          </b>
                          {groups.some(group => tgMessage.students_groups.includes(group.group_id ?? 0)) &&
                            groups.map((group, index) => (
                              <div
                                key={group.group_id}
                                style={{
                                  marginLeft: 'min(12.59px, 2.1vw)',
                                  fontSize: 'clamp(14px, 2.8vw, 16.78px)',
                                  fontFamily: "'SFPRORegular', sans-serif",
                                  color: 'grey',
                                }}
                              >
                                <Checkbox
                                  className={styles.customCheckbox}
                                  sx={{
                                    '& .MuiSvgIcon-root': {
                                      width: 'min(24px, 3.35vw)',
                                      height: 'min(24px, 3.35vw)',
                                    },
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
                                      setAllGroups(false)
                                      setTgMessage((prevData: TgMessage) => ({
                                        ...prevData,
                                        students_groups: prevData.students_groups.filter(id => id !== group.group_id),
                                      }))
                                    }
                                  }}
                                  checked={new Set(tgMessage.students_groups).has(Number(group.group_id))}
                                />

                                <b>
                                  {group.name} (Кол-во студентов: {group.students.length})
                                </b>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
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
              <Menu
                anchorEl={anchorEl2}
                id="account-menu"
                open={open2}
                onClose={handleClose2}
                onClick={handleClose2}
                className={styles.popoverWrapper}
              >
                <MenuItem>
                  <span> Курсов:</span>
                  <span style={{ paddingLeft: '0.3rem' }}>
                    {`${currentTariff?.number_of_courses}/${currentTariff?.tariff_details.number_of_courses || 'ꝏ'}`}
                  </span>
                  <br />
                </MenuItem>
                <MenuItem>
                  <span> Сотрудников:</span>
                  <span style={{ paddingLeft: '0.3rem' }}> {`${currentTariff?.staff}/${currentTariff?.tariff_details?.number_of_staff || 'ꝏ'}`}</span>
                  <br />
                </MenuItem>
                <MenuItem>
                  <span> Студентов:</span>
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
                  <img src={tariffImg} alt="tariffs-page" />
                </div>
              </Menu>
            </div>
          )}
          {userRole === RoleE.Admin && tariffPlan && 'error' in tariffPlan && (
            <div
              className={styles.tariffPlan}
              style={{ textDecoration: 'none', gap: '10px' }}
              onClick={() => navigate(generatePath(Path.TariffPlans))}
            >
              <div className={styles.tariffPlan_icon}>
                <IconSvg width={23} height={19} viewBoxSize="0 0 23 19" path={orangeTariffPlanIconPath} />
              </div>
              <p className={styles.tariffPlan_text}>
                <span className={styles.tariffPlan_text_tariff}>{`Тариф истёк`}</span>
                <span style={{ color: '#357EEB', fontSize: '10px', fontFamily: 'SFPRORegular' }}>{`Выберите тарифный план`}</span>
              </p>
            </div>
          )}
        </React.Fragment>
        <div className={userRole === RoleE.Admin ? styles.header_socialIcons : styles.header_socialIcons2}>
          {schoolData && (
            <>
              <SocialMediaButton variant="Telegram" url={schoolData.telegram_link || 'https://t.me/course_hb'} />
              <SocialMediaButton variant="Instagram" url={schoolData.instagram_link || 'https://instagram.com/'} />
              <SocialMediaButton variant="X" url={schoolData.twitter_link || 'https://x.com/'} />
              <SocialMediaButton variant="Youtube" url={schoolData.youtube_link || 'https://youtube.com/'} />
              <SocialMediaButton variant="VK" url={schoolData.vk_link || 'https://vk.ru/'} />
              <SocialMediaButton variant="Link" url={schoolData.extra_link || '#'} />
            </>
          )}
        </div>
        <React.Fragment>
          <Button variant="newPrimary" text={headerUserRoleName[userRole]} onClick={handleClick} style={{ fontSize: '16px' }}>
            <IconSvg width={18} height={18} viewBoxSize="0 0 24 24" path={UserIconPath} />
          </Button>
          <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose} className={styles.popoverWrapper}>
            <MenuItem onClick={goToProfile}>
              <IconSvg viewBoxSize="0 0 24 24" width={18} height={18} path={UserIconPath} />
              <Link to={Path.Profile}>Открыть профиль</Link>
            </MenuItem>
            {canChangePlatform && (
              <MenuItem onClick={goToChooseSchool}>
                <IconSvg viewBoxSize="0 0 24 24" width={18} height={18} path={HomeIconPath} />
                <Link to={Path.ChooseSchool}>Смена платформы</Link>
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
          {window.innerWidth > 1154 && <p>Выйти</p>}
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
