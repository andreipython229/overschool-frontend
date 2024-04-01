import { FC, memo, useEffect } from 'react'
import { Link, generatePath, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Path } from 'enum/pathE'
import { Button } from 'components/common/Button/Button'
import { authSelector } from 'selectors'
import { InitPageHeaderPT } from '../../types/pageTypes'
import { logo } from '../../assets/img/common/index'
import { selectUser } from 'selectors/index'
import { RoleE } from 'enum/roleE'
import TelegramIcon from '@mui/icons-material/Telegram'
import styles from './initial.module.scss'
import { logOutIconPath } from '../../components/Header/config/svgIconsPath'
import { IconSvg } from '../../components/common/IconSvg/IconSvg'
import { auth, logoutState } from '../../store/redux/users/slice'
import { useLazyLogoutQuery } from '../../api/userLoginService'
import Tooltip from '@mui/material/Tooltip'
import { useLazyFetchProfileDataQuery } from 'api/profileService'

export const InitPageHeader: FC<InitPageHeaderPT> = memo(({ setLoginShow, setRegistrationShow }) => {
  const isLogin = useAppSelector(authSelector)
  const { role: userRole, userName: name } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const [logout] = useLazyLogoutQuery()
  const navigate = useNavigate()
  const [fetchAuth, { data }] = useLazyFetchProfileDataQuery()

  const handleLoginUser = () => {
    setLoginShow(true)
  }
  const handleLoginPage = () => {
    navigate(generatePath(Path.LoginPage))
  }

  const handleRegistrationUser = () => {
    navigate(generatePath(Path.CreateSchool))
  }

  const handleTariffPage = () => {
    navigate(generatePath(Path.TariffPlansInfo))
  }

  const logOut = async () => {
    await localStorage.clear()
    dispatch(logoutState())
    await logout()
    window.location.reload()

    dispatch(auth(false))
  }

  useEffect(() => {
    if (isLogin) {
      fetchAuth().catch(err => {
        if (err.status === 401) {
          logOut()
        }
      })
    }
  }, [])

  return (
    <header className={styles.init_header}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <div className={styles.init_header_logo}>
          <img src={logo} alt="Logotype ITOVERONE" />
          <p> IT OVERONE</p>
        </div>
        <Tooltip title={'Связаться с нами'}>
          <a target="_blank" href="https://t.me/over_school" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <TelegramIcon className={styles.animatedIcon} sx={{ height: '100%', width: '40px', color: '#229ED9' }} />
          </a>
        </Tooltip>
      </div>
      <div className={styles.btn_block}>
        {isLogin ? (
          <div className={styles.header_block}>
            <Link className={styles.header_block_logIn} to={Path.ChooseSchool}>
              <Button type={'button'} text={'Перейти к выбору школы'} style={{ marginRight: '-0.2em' }} />
            </Link>
            <Tooltip title={'Выход из профиля'}>
              <div className={styles.header_block_logOut}>
                <IconSvg width={26} height={26} viewBoxSize="0 0 26 25" path={logOutIconPath} functionOnClick={logOut} />
              </div>
            </Tooltip>
          </div>
        ) : (
          <div className={styles.header_block}>
            <Button onClick={handleTariffPage} variant={'logIn'} text={'Тарифы'} />
            <Button onClick={handleLoginPage} variant={'logIn'} text={'Войти'} />
            <Button onClick={handleRegistrationUser} variant={'logIn'} text={'Создать школу'} />
          </div>
        )}
      </div>
    </header>
  )
})
