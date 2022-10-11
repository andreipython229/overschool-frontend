import { memo, useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { useFetchProfileDataQuery } from '../../api/profileService'
import { useAppDispatch } from '../../store/hooks'
import { auth, token } from 'store/redux/users/slice'
import { Path } from 'enum/pathE'
import { useFetchSchoolHeaderQuery } from '../../api/schoolHeaderService'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { logOutIconPath } from './config/svgIconsPath'
import { useLogoutMutation } from 'api/userLoginService'
import { logo } from '../../assets/img/common/index'

import styles from './header.module.scss'

export const Header = memo(() => {
  const dispatch = useAppDispatch()
  const [logout] = useLogoutMutation()
  const { data, isSuccess } = useFetchSchoolHeaderQuery(1)
  const { data: profile } = useFetchProfileDataQuery(1)

  const logOut = (): void => {
    dispatch(token({ access_token: '' }))
    logout()
    dispatch(auth(false))
  }

  const [logotype, setLogo] = useState<string | undefined>('')

  useEffect(() => {
    if (isSuccess) {
      setLogo(data?.logo_school_url)
    }
  }, [data])

  return (
    <header className={styles.header}>
      <NavLink to={Path.Courses}>
        <img className={styles.header_logotype} src={logotype || logo} alt="Logotype IT Overone" />
      </NavLink>
      <div className={styles.header_block}>
        <Link style={{ textDecoration: 'none' }} to={Path.Profile}>
          <div className={styles.header_block_user}>
            {profile?.avatar_url ? (
              <img width={'50'} height={'50'} className={styles.header_block_user_avatar} src={profile?.avatar_url} alt="avatar" />
            ) : (
              <div className={styles.header_block_user_div}>
                {profile?.user.last_name[0]} {profile?.user.first_name[0]}
              </div>
            )}
            <div className={styles.header_block_user_userName}>
              <span style={{ color: '#BA75FF' }} className={styles.header_block_user_userName_status}>
                Супер пользователь
              </span>
              <span className={styles.header_block_user_userName_name}>
                {profile?.user.last_name} {profile?.user.first_name}
              </span>
            </div>
          </div>
        </Link>

        <IconSvg
          className={styles.header_block_logOut}
          width={26}
          height={26}
          viewBoxSize="0 0 26 25"
          path={logOutIconPath}
          functionOnClick={logOut}
        />
      </div>
    </header>
  )
})
