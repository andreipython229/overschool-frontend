import { memo, useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { useFetchProfileDataQuery } from '../../api/profileService'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { auth } from 'store/redux/users/slice'
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
import {useCookies} from "react-cookie";

export const Header = memo(() => {
  const dispatch = useAppDispatch()
  const { role } = useAppSelector(selectUser)
  const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token']);

  const [logout] = useLazyLogoutQuery()

  const { data, isSuccess } = useFetchSchoolHeaderQuery(1)
  const { data: profile, isSuccess: profileIsSuccess } = useFetchProfileDataQuery()

  const logOut = (): void => {
    localStorage.setItem('school', '')
    removeCookie('access_token')
    removeCookie('refresh_token')
    logout()

    dispatch(auth(false))
  }

  const [profileData, setProfileData] = useState<profileT>()
  const [logotype, setLogo] = useState<string | undefined>('')

  useEffect(() => {
    if (isSuccess) {
      setLogo(data?.logo_school)
    }
  }, [data])

  useEffect(() => {
    profileIsSuccess && setProfileData(profile[0])
  }, [profileIsSuccess])

  return (
    <header className={styles.header}>
      <NavLink to={Path.Courses}>
        <img className={styles.header_logotype} src={logotype || logo} alt="Logotype IT Overone" />
      </NavLink>
      <div className={styles.header_block}>
        <Link style={{ textDecoration: 'none' }} to={Path.Profile}>
          <div className={styles.header_block_user}>
            {profileData?.avatar ? (
              <img
                width={'50'}
                height={'50'}
                className={styles.header_block_user_avatar}
                src={profileData?.avatar}
                alt="avatar"
              />
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
                {profileData?.user.last_name || 'Без'} {profileData?.user.first_name || 'Имени'}
              </span>
            </div>
          </div>
        </Link>
        <div
          className={styles.header_block_logOut}>
        <IconSvg
          width={26}
          height={26}
          viewBoxSize="0 0 26 25"
          path={logOutIconPath}
          functionOnClick={logOut}
        />
        </div>
      </div>
    </header>
  )
})
