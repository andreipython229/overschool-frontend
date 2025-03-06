import { FC, memo, useEffect } from 'react'
import { Link, generatePath, useNavigate, Params } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Path } from 'enum/pathE'
import { Button } from 'components/common/Button/Button'
import { authSelector, schoolNameSelector } from 'selectors'
import { InitPageHeaderPT } from '../../types/pageTypes'
import { full_logo } from '../../assets/img/common/index'
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
import { clearUserProfile } from 'store/redux/users/profileSlice'

export const InitPageHeader: FC<InitPageHeaderPT> = memo(({ setLoginShow, setRegistrationShow }) => {
  const DefaultDomains = ['localhost', 'overschool.by', 'sandbox.overschool.by']
  const isLogin = useAppSelector(authSelector)
  const { role: userRole, userName: name } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const [logout] = useLazyLogoutQuery()
  const navigate = useNavigate()
  const [fetchAuth, { data }] = useLazyFetchProfileDataQuery()
  const currentDomain = window.location.hostname
  const schoolName = useAppSelector(schoolNameSelector)

  const handleLoginUser = () => {
    setLoginShow(true)
  }
  const handleLoginPage = () => {
    navigate(generatePath(Path.LoginPage))
  }

  const handleRegistrationUser = () => {
    const paramsString = localStorage.getItem('utmParams')
    if (paramsString !== null) {
      const parsedParams = JSON.parse(paramsString)
      const queryParams = Object.keys(parsedParams)
        .map(key => `${key}=${parsedParams[key]}`)
        .join('&')
      const pathWithParams = `${Path.CreateSchool}?${queryParams}`
      navigate(pathWithParams)
    } else {
      navigate(Path.CreateSchool)
    }
  }

  const handleTariffPage = () => {
    navigate(generatePath(Path.TariffPlansInfo))
  }

  const handleCatalog = () => {
    navigate(generatePath(Path.Catalog))
  }

  const handleHelpPage = () => {
    navigate(generatePath(Path.HelpPage))
  }

  const logOut = async () => {
    await localStorage.clear()
    await logout()
      .unwrap()
      .then(() => {
        dispatch(logoutState())
        dispatch(clearUserProfile())
      })
    window.location.reload()
  }
  const handlePlatformEntry = () => {
    if (DefaultDomains.includes(currentDomain)) {
      navigate(generatePath(Path.ChooseSchool))
    } else {
      navigate(generatePath(Path.School + Path.Courses, { school_name: schoolName }))
    }
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
        <div className={styles.init_header_logo} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src={full_logo} alt="Logotype ITOVERONE" />
        </div>
        <Tooltip title={'Связаться с нами'}>
          <a target="_blank" href="https://t.me/course_hb" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <TelegramIcon className={styles.animatedIcon} sx={{ height: '100%', width: '40px', color: '#229ED9' }} />
          </a>
        </Tooltip>
      </div>
      <div className={styles.btn_block}>
        {isLogin ? (
          <div className={styles.header_block}>
            <Button onClick={handleCatalog} variant={'logIn'} text={'Каталог'} />
            <Button onClick={handleHelpPage} variant={'logIn'} text={'Помощь'} />
            <div className={styles.header_block_logIn}>
              <Button
                className={styles.header_block_logIn}
                type={'button'}
                text={'Ко входу на платформу'}
                style={{ marginRight: '-0.2em' }}
                onClick={handlePlatformEntry}
              />
            </div>
            <Tooltip title={'Выход из профиля'}>
              <div className={styles.header_block_logOut}>
                <IconSvg width={26} height={26} viewBoxSize="0 0 26 25" path={logOutIconPath} functionOnClick={logOut} />
              </div>
            </Tooltip>
          </div>
        ) : (
          <div className={styles.header_block}>
            <Button onClick={handleTariffPage} variant={'logIn'} text={'Тарифы'} />
            <Button onClick={handleHelpPage} variant={'logIn'} text={'Помощь'} />
            <Button onClick={handleLoginPage} variant={'logIn'} text={'Войти'} />
            <Button onClick={handleRegistrationUser} variant={'logIn'} text={'Создать платформу'} />
            <Button onClick={handleCatalog} variant={'logIn'} text={'Каталог'} />
          </div>
        )}
      </div>
    </header>
  )
})
