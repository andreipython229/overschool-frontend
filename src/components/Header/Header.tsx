import React, { memo, useState, useEffect } from 'react'
import { Link, NavLink, generatePath, useNavigate } from 'react-router-dom'

import { useFetchProfileDataQuery } from '../../api/profileService'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { auth, logoutState } from 'store/redux/users/slice'
import { Path } from 'enum/pathE'
import { useFetchSchoolHeaderQuery } from '../../api/schoolHeaderService'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { logOutIconPath } from './config/svgIconsPath'
import { useLazyLogoutQuery } from 'api/userLoginService'
import { selectUser } from '../../selectors'
import { logo } from '../../assets/img/common'
import { headerUserRoleName } from 'config/index'
import { profileT } from 'types/profileT'
import styles from './header.module.scss'
import { SimpleLoader } from '../Loaders/SimpleLoader'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { SvgIcon } from '@mui/material'
import { ChatI, SenderI } from 'types/chatsT'
import { setTotalUnread } from '../../store/redux/chats/unreadSlice'
import { setChats } from '../../store/redux/chats/chatsSlice'

import { ITariff, UserProfileT } from '../../types/userT'
import { setUserProfile, clearUserProfile } from '../../store/redux/users/profileSlice'
import { isEqual, omit } from 'lodash'
import { orangeTariffPlanIconPath, purpleTariffPlanIconPath, redTariffPlanIconPath } from 'config/commonSvgIconsPath'
import { RoleE } from 'enum/roleE'

import { useCookies } from 'react-cookie'
import { useFetchCurrentTariffPlanQuery, useFetchTariffPlanInfoQuery } from 'api/tariffPlanService'
import { setTariff } from 'store/redux/tariff/tariffSlice'
import { removeSchoolId } from '../../store/redux/school/schoolIdSlice'
import { removeHeaderId } from '../../store/redux/school/headerIdSlice'
import { removeSchoolName } from '../../store/redux/school/schoolSlice'

import { motion } from 'framer-motion'

export const Header = memo(() => {
  const dispatch = useAppDispatch()
  const { role } = useAppSelector(selectUser)
  const navigate = useNavigate()
  const [logout, { isLoading }] = useLazyLogoutQuery()
  const headerId = localStorage.getItem('header_id')
  const { data, isSuccess } = useFetchSchoolHeaderQuery(Number(headerId))
  const { data: profile, isSuccess: profileIsSuccess, isError, error } = useFetchProfileDataQuery()
  const { data: tariffPlan, isSuccess: tariffSuccess } = useFetchCurrentTariffPlanQuery()
  const [currentTariff, setCurrentTariff] = useState<ITariff>()
  const { data: tariff } = useFetchTariffPlanInfoQuery(currentTariff?.tariff)

  const [totalUnreadMessages, setTotalUnreadMessages] = useState<number>(0)
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

  const logOut = async () => {
    await logout()
    if (isLoading) {
      return <SimpleLoader />
    }
    setProfileData(undefined)
    dispatch(auth(false))
    dispatch(clearUserProfile())
    dispatch(logoutState())
    dispatch(removeSchoolId())
    dispatch(removeHeaderId())
    dispatch(removeSchoolName())
    removeAccessCookie('access_token')
    removeRefreshCookie('refresh_token')
    navigate(generatePath(Path.InitialPage))
    await localStorage.clear()
  }

  useEffect(() => {
    if (isError) {
      logOut()
    }
  }, [isError])

  useEffect(() => {
    if (isSuccess) {
      setLogo(data?.logo_school)
    }
  }, [data])

  useEffect(() => {
    profileIsSuccess && setProfileData(profile[0])
  }, [profile])

  useEffect(() => {
    if (tariffPlan && Object.keys(tariffPlan).length > 0) {
      setCurrentTariff(tariffPlan)
      dispatch(setTariff(tariffPlan))
    }
  }, [tariffSuccess])

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

  return (
    <motion.header className={styles.header}
    initial={{
      x:-1000,
    }}
    animate={{
      x:0,
    }}
    transition={{
      delay: 0.1,
    }}>
      <NavLink to={role === RoleE.Teacher ? Path.CourseStats : Path.Courses}>
        <img className={styles.header_logotype} src={logotype || logo} alt="Logotype IT Overone" />
      </NavLink>
      <div className={styles.header_block}>
        <React.Fragment>
          {role === RoleE.Admin && currentTariff && (
            <div>
              <Tooltip title={'Статистика тарифа'}>
                <div className={styles.tariffPlan} style={{ textDecoration: 'none' }} onClick={handleClick2}>
                  <div className={styles.tariffPlan_icon}>
                    <IconSvg width={23} height={19} viewBoxSize="0 0 23 19" path={purpleTariffPlanIconPath} />
                  </div>
                  <p className={styles.tariffPlan_text}>
                    {' Тариф '}
                    <span className={styles.tariffPlan_text_tariff}>{`"${currentTariff.tariff_name}"`}</span>
                    {currentTariff.days_left && <span style={{ color: '#BA75FF' }}>{` — ${currentTariff.days_left} дней`} </span>}
                    <br />
                  </p>
                </div>
              </Tooltip>
              <Menu anchorEl={anchorEl2} id="account-menu" open={open2} onClose={handleClose2} onClick={handleClose2}>
                <MenuItem>
                  <span style={{ color: 'slategrey' }}> Курсов:</span>
                  <span style={{ color: '#BA75FF', paddingLeft: '0.3rem' }}>
                    {`${currentTariff?.number_of_courses}/${tariff?.number_of_courses || 'ꝏ'}`}
                  </span>
                  <br />
                </MenuItem>
                <MenuItem>
                  <span style={{ color: 'slategrey' }}> Сотрудников:</span>
                  <span style={{ color: '#BA75FF', paddingLeft: '0.3rem' }}> {`${currentTariff?.staff}/${tariff?.number_of_staff || 'ꝏ'}`}</span>
                  <br />
                </MenuItem>
                <MenuItem>
                  <span style={{ color: 'slategrey' }}> Студентов:</span>
                  <span style={{ color: '#BA75FF', paddingLeft: '0.3rem' }}> {`${currentTariff?.students}/${tariff?.total_students || 'ꝏ'}`}</span>
                </MenuItem>
                <MenuItem onClick={goToChooseTariff}>
                  <SvgIcon
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#708090"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </SvgIcon>
                  <Link to={Path.TariffPlans} style={{ color: 'slategrey', paddingLeft: '0.5rem' }}>
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
                    {headerUserRoleName[role]}
                  </span>
                  <span className={styles.header_block_user_userName_name}>
                    {!profileData?.user.last_name && !profileData?.user.first_name
                      ? 'Без Имени'
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
                Смена школы
              </Link>
            </MenuItem>
          </Menu>
        </React.Fragment>
        <Tooltip title={'Выход из профиля'}>
          <div className={styles.header_block_logOut}>
            <IconSvg width={26} height={26} viewBoxSize="0 0 26 25" path={logOutIconPath} functionOnClick={logOut} />
          </div>
        </Tooltip>
      </div>
    </motion.header>
  )
})
