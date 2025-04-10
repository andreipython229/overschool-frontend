import { FC, memo, useEffect } from 'react'
import { generatePath, useNavigate, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Path } from 'enum/pathE'
import { Button } from 'components/common/Button/Button'
import { authSelector, schoolNameSelector, schoolSelector, selectUser } from 'selectors'
import { logoHeader, plus, hat } from '../../assets/img/common/index'
import TelegramIcon from '@mui/icons-material/Telegram'
import styles from './newInitial.module.scss'
import { logOutIconPath } from '../../components/Header/config/newSvgIconsPath'
import { IconSvg } from '../../components/common/IconSvg/IconSvg'
import { logoutState } from '../../store/redux/users/slice'
import { useLazyLogoutQuery } from '../../api/userLoginService'
import Tooltip from '@mui/material/Tooltip'
import { useLazyFetchProfileDataQuery } from 'api/profileService'
import { clearUserProfile } from 'store/redux/users/profileSlice'
import { clearSchoolData } from 'store/redux/school/schoolSlice'

export const InitPageHeader: FC = memo(() => {
  const DefaultDomains = ['localhost', 'platform.coursehb.ru', 'sandbox.coursehb.ru']
  const isLogin = useAppSelector(authSelector)
  const dispatch = useAppDispatch()
  const [logout] = useLazyLogoutQuery()
  const navigate = useNavigate()
  const [fetchAuth] = useLazyFetchProfileDataQuery()
  const currentDomain = window.location.hostname
  const { schoolName } = useAppSelector(schoolSelector)

  useEffect(() => {
    if (isLogin && !schoolName) {
      dispatch(clearSchoolData())
    }
  }, [])

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
    await logout()
      .unwrap()
      .finally(() => {
        localStorage.clear()
        dispatch(clearUserProfile())
        dispatch(logoutState())
      })
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
        if (err.status === 401 || err.status === 403) {
          logOut()
        }
      })
    }
  }, [])

  return (
    <header className={styles.init_header}>
      <div className={styles.btn_block}>
        <div className={styles.init_header_logo} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src={logoHeader} alt="Logotype" />
        </div>

        {isLogin ? (
          <div className={styles.header_block}>
            <div className={styles.header_block_menu}>
              <div className={styles.header_block_menu_platforma}>
                <Button onClick={handleCatalog} variant={'newSecondaryHeader'} text={'Платформа'} />
                <div className={styles.header_block_menu_platforma_content}>
                  <Link to={generatePath(Path.Catalog)} className={styles.catalogLink}>
                    <img src={hat} alt="hat" />
                    <h5>Каталог</h5>
                  </Link>
                  <a href="https://coursehb.ru/dlya-nachinayushchih">
                    <img src={hat} alt="hat" />
                    <h5>Для начинающих экспертов</h5>
                  </a>
                  <a href="#">
                    <img src={hat} alt="hat" />
                    <h5>Для онлайн школ</h5>
                  </a>
                  <a href="https://coursehb.ru/page4">
                    <img src={hat} alt="hat" />
                    <h5>Для обучения персонала</h5>
                  </a>
                  <a href="https://coursehb.ru/page5">
                    <img src={hat} alt="hat" />
                    <h5>Возможности</h5>
                  </a>
                  <a href="https://coursehb.ru/page6">
                    <img src={hat} alt="hat" />
                    <h5>Отзывы пользователей</h5>
                  </a>
                  <a href="https://coursehb.ru/page7">
                    <img src={hat} alt="hat" />
                    <h5>Партнёрская программа</h5>
                  </a>
                </div>
              </div>
              <Button onClick={handleHelpPage} variant={'newSecondaryHeader'} text={'Помощь'} />
              <Tooltip title={'Связаться с нами'}>
                <a target="_blank" href="https://t.me/course_hb" rel="noreferrer" style={{ textDecoration: 'none' }}>
                  <TelegramIcon className={styles.animatedIcon} sx={{ height: '30px', width: '32.56px', color: '#357EEB' }} />
                </a>
              </Tooltip>
            </div>
            <Button onClick={handlePlatformEntry} variant={'newLogInHeader'} text={'Ко входу на платформу'} />
            <Tooltip title={'Выход из профиля'}>
              <div className={styles.header_block_logOut}>
                <IconSvg width={26} height={26} viewBoxSize="0 0 26 25" path={logOutIconPath} functionOnClick={logOut} />
              </div>
            </Tooltip>
          </div>
        ) : (
          <div className={styles.header_block}>
            <div className={styles.header_block_menu}>
              <div className={styles.header_block_menu_platforma}>
                <Button onClick={handleCatalog} variant={'newSecondaryHeader'} text={'Платформа'} />
                <div className={styles.header_block_menu_platforma_content}>
                  <Link to={generatePath(Path.Catalog)} className={styles.catalogLink}>
                    <img src={hat} alt="hat" />
                    <h5>Каталог</h5>
                  </Link>
                  <a href="https://coursehb.ru/dlya-nachinayushchih">
                    <img src={hat} alt="hat" />
                    <h5>Для начинающих экспертов</h5>
                  </a>
                  <a href="#">
                    <img src={hat} alt="hat" />
                    <h5>Для онлайн школ</h5>
                  </a>
                  <a href="https://coursehb.ru/page4">
                    <img src={hat} alt="hat" />
                    <h5>Для обучения персонала</h5>
                  </a>
                  <a href="https://coursehb.ru/page5">
                    <img src={hat} alt="hat" />
                    <h5>Возможности</h5>
                  </a>
                  <a href="https://coursehb.ru/page6">
                    <img src={hat} alt="hat" />
                    <h5>Отзывы пользователей</h5>
                  </a>
                  <a href="https://coursehb.ru/page7">
                    <img src={hat} alt="hat" />
                    <h5>Партнёрская программа</h5>
                  </a>
                </div>
              </div>
              <Button onClick={handleTariffPage} variant={'newSecondaryHeader'} text={'Тарифы'} />
              <Button onClick={handleHelpPage} variant={'newSecondaryHeader'} text={'Помощь'} />
              <Tooltip title={'Связаться с нами'}>
                <a target="_blank" href="https://t.me/course_hb" rel="noreferrer" style={{ textDecoration: 'none' }}>
                  <TelegramIcon
                    className={styles.animatedIcon}
                    sx={{
                      height: '24',
                      width: '24',
                      color: '#357EEB',
                      marginRight: '0.5rem',
                      '@media screen and (min-width: 800px) and (max-width: 1150px)': {
                        marginRight: '-0.5rem',
                      },
                      '@media only screen and (min-width: 390px) and (max-width: 435px)': {
                        marginRight: '-0.4rem',
                        width: '14px',
                      },
                    }}
                  />
                </a>
              </Tooltip>
            </div>
            <Button onClick={handleLoginPage} variant={'newLogInHeader'} text={'Войти'} />
            <Button onClick={handleRegistrationUser} variant={'newCreateHeader'} text={'Создать платформу'}>
              <img className={styles.header_block_plus} src={plus} alt="Plus" />
            </Button>
          </div>
        )}
      </div>
    </header>
  )
})
