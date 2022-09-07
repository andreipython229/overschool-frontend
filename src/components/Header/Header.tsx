import { memo } from 'react'
import { Link, NavLink } from 'react-router-dom'


import { useAppDispatch } from '../../store/hooks'
import { auth, token } from 'store/redux/users/slice'

import { Path } from 'enum/pathE'
import { useFetchSchoolHeaderQuery } from '../../api/schoolHeaderService'
import { IconSvg } from '../common/IconSvg/IconSvg'
import { logOutSvgIcon } from '../../constants/iconSvgConstants'

import Logotype from '../../assets/img/logotype.svg'
import Avatar from '../../assets/img/avatar.svg'

import styles from './header.module.scss'

export const Header = memo(() => {
  const dispatch = useAppDispatch()

  
  const logOut = (): void => {
    dispatch(token(''))
    dispatch(auth(false))
  }

    // const { logotype } = useAppSelector(platformSelector)
    const { data, isSuccess } = useFetchSchoolHeaderQuery(1)

    // const [logo, setLogo] = useState<string>('')
  
    // useEffect(() => {
    //   if (isSuccess) {
    //     setLogo(data.logo_school_url)
    //   }
    // }, [isSuccess])

  return (
    <header className={styles.header}>
      <NavLink to={Path.Courses}>
        <img className={styles.header_logotype} src={data?.logo_school_url || Logotype} alt="Logotype IT Overone" />
      </NavLink>

      <div className={styles.header_block}>
        <Link style={{ textDecoration: 'none' }} to={Path.Profile}>
          <div className={styles.header_block_user}>
            <img className={styles.header_block_user_avatar} src={Avatar} alt="User Avatar" />
            <div className={styles.header_block_user_userName}>
              <span style={{ color: '#BA75FF' }} className={styles.header_block_user_userName_status}>
                Супер пользователь
              </span>
              <span className={styles.header_block_user_userName_name}>Без имени</span>
            </div>
          </div>
        </Link>

        <IconSvg
          className={styles.header_block_logOut}
          width={26}
          height={26}
          fill="#6B7280"
          d={logOutSvgIcon.dor}
          viewBoxSize="0 0 26 25"
          d2={logOutSvgIcon.arrow}
          fillRule="evenodd"
          clipRule="evenodd"
          functionOnClick={logOut}
        />
      </div>
    </header>
  )
})
