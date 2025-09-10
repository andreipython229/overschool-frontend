import { useEffect, useRef, useState, useMemo } from 'react'
import { useFormik } from 'formik'
import { LoginParamsT, validateLogin } from '@/utils/validationLogin'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { auth, authState, id, logoutState, role, userEmail, userName } from '@/store/redux/users/slice'
import { useLoginMutation, useLazyGetUserInfoQuery, useLazyLogoutQuery } from '@/api/userLoginService'
import { Input } from 'components/common/Input/Input/Input'
import { google, isSecurity, unSecurity, yandex } from '@/assets/img/common'
import { useForgotPasswordMutation, useResetPasswordMutation, useVerifyEmailCodeMutation } from '@/api/forgotPassword'
import { Toast } from 'primereact/toast'
import { generatePath, useNavigate } from 'react-router-dom'
import { Button } from '@/components/common/Button/Button'
import { InputAuth } from '@/components/common/Input/InputAuth/InputAuth'
import { Path } from '@/enum/pathE'
import { SimpleLoader } from '@/components/Loaders/SimpleLoader'
import styles from './loginPage.module.scss'
import { setHeaderId, setSchoolId, setSchoolName } from '@/store/redux/school/schoolSlice'
import { RoleE } from '@/enum/roleE'
import { SchoolT } from '../ChooseSchool/ChooseSchool'
import { useFetchConfiguredDomainsQuery } from '@/api/DomainService'
import { useGetSchoolsMutation } from '@/api/getSchoolService'
import { selectUser } from '@/selectors'
import { LoaderLayout } from '@/components/Loaders/LoaderLayout'
import { BackgroundAnimation } from '@/components/BackgroundAnimation'
import { clearUserProfile } from '@/store/redux/users/profileSlice'
import { LogoHeader } from './LogoHeader'
import { Back } from './Back'
import { store } from '@/store/redux/store'

export const LoginPage = () => {
  const DefaultDomains = ['localhost', 'overschool.by', 'sandbox.overschool.by']
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const toast = useRef<Toast>(null)
  const [step, setStep] = useState<number>(1)
  const [email, setEmail] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
  const [forgotPasswordFunc, { error: errorSend, isLoading: sendLoading }] = useForgotPasswordMutation()
  const [verifyCode, { error: errorCode, isLoading: codeLoading }] = useVerifyEmailCodeMutation()
  const [resetPassword, { error: errorReset, isLoading: resetLoading }] = useResetPasswordMutation()
  const [getSchools, { isLoading: isFetching }] = useGetSchoolsMutation()
  const { data: DomainData, isSuccess: DomainSuccess } = useFetchConfiguredDomainsQuery()
  const [logout] = useLazyLogoutQuery()
  const [security, setSecurity] = useState<boolean>(true)
  const [authVariant, setAuthVariant] = useState<keyof LoginParamsT>('email')
  const { auth: authetificationState } = useAppSelector(selectUser)

  const [attemptAccess, { error, isSuccess, isLoading }] = useLoginMutation()
  const [getUserInfo] = useLazyGetUserInfoQuery()

  const [isShown, setIsShown] = useState(false)
  const [isHidden, setIsHidden] = useState(true)
  const currentDomain = window.location.hostname

  const authBaseUrl = useMemo(() => (process.env.PUBLIC_RUN_MODE === 'PRODUCTION' ? 'https://apidev.coursehb.ru' : 'http://sandbox.coursehb.ru'), [])

  const forgotPass = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setIsShown(!isShown)
    setIsHidden(!isHidden)
  }

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value)
  }

  const handleNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleNewPasswordC = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(event.target.value)
  }

  const changeSecurityStatus = () => {
    setSecurity(!security)
  }

  useEffect(() => {
    if (authetificationState) {
      navigate(generatePath(Path.ChooseSchool))
    }
  }, [authetificationState, navigate])

  const formik = useFormik({
    validate: values => validateLogin(values, authVariant),
    initialValues: {
      email: '',
      phone: '',
      password: '',
    },
    onSubmit: async () => {
      const { email, password, phone } = formik.values
      const user = { login: phone ? phone : email, password }

      try {
        console.log('=== BEFORE LOGIN API CALL ===')
        console.log('Current Redux state:', store.getState())
        console.log('Current authState:', store.getState().user.authState)
        console.log('Current user object:', store.getState().user)
        console.log('=== END BEFORE LOGIN ===')

        console.log('LOGIN: Attempting login with:', user)

        const result = await attemptAccess(user).unwrap()

        console.log('LOGIN SUCCESS:', result)
        console.log('LOGIN: Full result object:', result)
        console.log('LOGIN: result type:', typeof result)

        // Парсим JSON строку в объект
        let parsedResult = result
        if (typeof result === 'string') {
          try {
            parsedResult = JSON.parse(result)
            console.log('LOGIN: Parsed result:', parsedResult)
          } catch (error) {
            console.error('LOGIN ERROR: Failed to parse JSON:', error)
            return
          }
        }

        console.log('LOGIN: parsedResult.access:', parsedResult.access)
        console.log('LOGIN: parsedResult.refresh:', parsedResult.refresh)
        console.log('LOGIN: parsedResult.user:', parsedResult.user)
        console.log('LOGIN: parsedResult keys:', Object.keys(parsedResult))

        // Проверяем, что parsedResult.user существует
        if (!parsedResult.user) {
          console.error('LOGIN ERROR: User object is missing:', parsedResult)
          return
        }

        console.log('LOGIN: User object found:', parsedResult.user)
        console.log('LOGIN: User ID type:', typeof parsedResult.user.id)
        console.log('LOGIN: User ID value:', parsedResult.user.id)

        // Проверяем, что parsedResult.user.id существует и валиден
        if (parsedResult.user.id === undefined || parsedResult.user.id === null || parsedResult.user.id === '' || parsedResult.user.id === 0) {
          console.error('LOGIN ERROR: User ID is missing or invalid:', parsedResult.user.id)
          return
        }

        console.log('LOGIN: User data validation passed:', parsedResult.user)

        // Проверяем токены перед dispatch
        if (!parsedResult.access || !parsedResult.refresh) {
          console.error('LOGIN ERROR: Tokens are missing!')
          console.error('LOGIN ERROR: parsedResult.access:', parsedResult.access)
          console.error('LOGIN ERROR: parsedResult.refresh:', parsedResult.refresh)
          return
        }

        console.log('LOGIN: Tokens validation passed')
        console.log('LOGIN: Access token:', parsedResult.access)
        console.log('LOGIN: Refresh token:', parsedResult.refresh)

        // Сохраняем токены в Redux
        dispatch(authState({ access: parsedResult.access, refresh: parsedResult.refresh }))
        dispatch(id(parsedResult.user.id))
        dispatch(userEmail(parsedResult.user.email))
        dispatch(auth(true))

        // Сохраняем токены в localStorage
        localStorage.setItem('access_token', parsedResult.access)
        localStorage.setItem('refresh_token', parsedResult.refresh)
        localStorage.setItem('id', parsedResult.user.id.toString())
        localStorage.setItem('email', parsedResult.user.email)

        console.log('LOGIN: Tokens dispatched to Redux')
        console.log('LOGIN: Tokens saved to localStorage')

        // Проверим Redux store сразу после dispatch
        console.log('LOGIN: Redux state immediately after dispatch:', store.getState())
        console.log('LOGIN: authState after dispatch:', store.getState().user.authState)

        // Проверим Redux store через небольшую задержку
        setTimeout(() => {
          console.log('LOGIN: Checking Redux store after 100ms...')
          console.log('LOGIN: Redux state after 100ms:', store.getState())
          console.log('LOGIN: authState after 100ms:', store.getState().user.authState)
        }, 100)

        // Проверим Redux store через большую задержку
        setTimeout(() => {
          console.log('LOGIN: Checking Redux store after 500ms...')
          console.log('LOGIN: Redux state after 500ms:', store.getState())
          console.log('LOGIN: authState after 500ms:', store.getState().user.authState)
        }, 500)
      } catch (error) {
        console.log('LOGIN ERROR:', error)
      }
    },
  })

  const handleSchool = (school: SchoolT) => {
    dispatch(setSchoolName(school.name))
    dispatch(setSchoolId(school.school_id))
    dispatch(setHeaderId(school.header_school))
    const roleValue = Object.entries(RoleE).find(([key, value]) => key === school.role)?.[1]
    roleValue && dispatch(role(+roleValue))
  }

  useEffect(() => {
    if (isSuccess) {
      console.log('LOGIN SUCCESS - GETTING USER INFO')
      console.log('LOGIN: Redux state before getUserInfo:', store.getState())
      console.log('LOGIN: authState before getUserInfo:', store.getState().user.authState)

      // Добавляем задержку для обновления Redux состояния
      setTimeout(() => {
        console.log('LOGIN: Delayed getUserInfo call - Redux state:', store.getState())
        console.log('LOGIN: Delayed getUserInfo call - authState:', store.getState().user.authState)

        getUserInfo()
          .unwrap()
          .then(resp => {
            console.log('LOGIN: getUserInfo success:', resp)
            dispatch(auth(true))
            dispatch(userName(resp[0]?.username))

            if (DefaultDomains.includes(currentDomain)) {
              navigate(generatePath(Path.ChooseSchool))
            } else {
              if (DomainSuccess && DomainData) {
                const currentDomainData = DomainData.find(domain => domain.domain_name === currentDomain)
                if (currentDomainData) {
                  const currentSchoolId = currentDomainData.school
                  dispatch(role(RoleE.Unknown))
                  getSchools()
                    .unwrap()
                    .then((data: SchoolT[]) => {
                      const school = data.find(school => school.school_id === currentSchoolId)
                      if (school) {
                        handleSchool(school)
                        navigate(Path.School + Path.Courses)
                      }
                    })
                    .catch(err => {
                      if (err.status === 401) {
                        localStorage.clear()
                        logout()
                        dispatch(logoutState())
                        dispatch(clearUserProfile())
                        navigate(generatePath(Path.InitialPage))
                      }
                    })
                }
              }
            }
          })
          .catch(error => {
            console.log('Error fetching user data:', error)
            console.log('LOGIN: Redux state after getUserInfo error:', store.getState())
            console.log('LOGIN: authState after getUserInfo error:', store.getState().user.authState)
          })
      }, 100) // Задержка 100ms для обновления Redux состояния
    }
  }, [isSuccess, isLoading, DomainSuccess, DomainData, currentDomain, navigate, dispatch, getSchools, logout])

  const submitformikforgot = async (event: React.FormEvent) => {
    event.preventDefault()
    const formdata = new FormData()
    formdata.append('email', email)
    await forgotPasswordFunc(formdata)
      .unwrap()
      .then(() => {
        toast.current?.show({
          severity: 'success',
          summary: 'Успешно',
          detail: `Ссылка для сброса пароля успешно отправлена на почту ${email}`,
          life: 5000,
        })
        setTimeout(() => navigate(Path.InitialPage), 3000)
      })
      .catch(() => {
        toast.current?.show({
          severity: 'error',
          summary: 'Ошибка',
          detail: `Проверьте правильность ввода email`,
          life: 5000,
        })
      })
  }

  const submitCode = async (event: React.FormEvent) => {
    event.preventDefault()
    const formdata = new FormData()
    formdata.append('email', email)
    formdata.append('token', code)
    await verifyCode(formdata)
      .unwrap()
      .then(() => {
        toast.current?.show({
          severity: 'success',
          summary: 'Успешно',
          detail: `Токен принят и введен верно!`,
          life: 3000,
        })
        setStep(3)
      })
      .catch(() => {
        toast.current?.show({
          severity: 'error',
          summary: 'Ошибка',
          detail: `Проверьте правильность ввода токена!`,
          life: 3000,
        })
      })
  }

  const submitNewPassword = async (event: React.FormEvent) => {
    event.preventDefault()
    if (password === passwordConfirmation && password.length !== 0) {
      const formdata = new FormData()
      formdata.append('email', email)
      formdata.append('new_password', password)
      formdata.append('new_password_again', passwordConfirmation)
      await resetPassword(formdata)
        .unwrap()
        .then(() => {
          toast.current?.show({
            severity: 'success',
            summary: 'Успех',
            detail: 'Пароль успешно изменен!',
            life: 3000,
          })
        })
    }
  }

  return (
    <section className={styles.loginPage}>
      {isFetching || (isLoading && <LoaderLayout />)}
      <BackgroundAnimation />
      <div className={styles.loginPage_btnBack}>
        <a href={Path.InitialPage}>
          <Back className={styles.back} />
        </a>
      </div>
      <div className={styles.loginPage_logoWrapper}>
        <LogoHeader />
      </div>
      <div className={styles.loginPage_formWrapper}>
        {isHidden && (
          <form className={styles.loginPage_formWrapper_form} onSubmit={formik.handleSubmit}>
            <p className={styles.loginPage_formWrapper_form_title}>Авторизация</p>
            <p className={styles.loginPage_formWrapper_form_title_comment}>Введите свои учетные данные</p>
            <div className={styles.loginPage_formWrapper_form_eMailWrapper}>
              <InputAuth
                name={authVariant}
                type={authVariant === 'email' ? 'email' : 'tel'}
                onChange={formik.handleChange}
                value={authVariant === 'email' ? formik.values.email : formik.values.phone.replace(/\D/g, '')}
                placeholder={'Адрес электронной почты'}
                error={error ? true : false}
              />
              <div className={styles.errors}>{formik.errors.email || (error && 'Неверный логин или пароль')}</div>
            </div>
            <div className={styles.loginPage_formWrapper_form_passwordWrapper}>
              <InputAuth
                name={'password'}
                type={security ? 'password' : 'text'}
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder={'Пароль'}
                onClick={changeSecurityStatus}
                icon={security ? isSecurity : unSecurity}
                error={formik.errors.password && formik.errors.password.length > 0 ? true : false}
              />
              <div className={styles.errors}>{formik.errors.password}</div>
            </div>
            <div className={styles.loginPage_formWrapper_form_btnCreateWrapper}>
              <div className={styles.btn}>
                <Button type="submit" text={'Вход'} style={{ borderRadius: '10px' }} variant={'newPrimary'} />
              </div>
              <div className={styles.loginPage_formWrapper_form_btnCreateWrapper_btn}>
                <a className={styles.loginPage_formWrapper_form_btnCreateWrapper_btn_a} href="" onClick={forgotPass}>
                  Забыли пароль?
                </a>
              </div>
              <div className={styles.loginPage_formWrapper_form_btnCreateWrapper_or}>
                <div className={styles.loginPage_formWrapper_form_btnCreateWrapper_or_lineLeft}></div>
                <p>Или</p>
                <div className={styles.loginPage_formWrapper_form_btnCreateWrapper_or_lineRight}></div>
              </div>
              <div className={styles.loginPage_formWrapper_form_btnCreateWrapper_socialMedia}>
                <a href={`${authBaseUrl}/accounts/google/login/`} className={styles.socialIcon} style={{ padding: '8px' }} title="Google">
                  <img src={google} alt="google" style={{ objectFit: 'fill', width: '100%' }} />
                </a>
                <a href={`${authBaseUrl}/accounts/yandex/login/`} className={styles.socialIcon} style={{ padding: '8px' }} title="Yandex">
                  <img src={yandex} alt="yandex" style={{ objectFit: 'fill', width: '100%' }} />
                </a>
              </div>
            </div>
          </form>
        )}
        {isShown && step === 1 && (
          <div className={styles.loginPage_formWrapper_form}>
            <div className={styles.loginPage_formWrapper_form_title} style={{ margin: '15px 0 30px 0' }}>
              Введите почту:
            </div>
            <div className={styles.loginPage_formWrapper_form_eMailWrapper}>
              <div style={{ display: 'flex' }}>
                <Input className={styles.input_container} name="email" type="text" onChange={handleEmail} value={email} placeholder="Email" />
              </div>
              <div className={styles.errors_forgot}>{errorSend && 'Неверная почта'}</div>
            </div>
            <div className={styles.loginPage_formWrapper_form_btnCreateWrapper}>
              <Button
                onClick={submitformikforgot}
                variant={email.length === 0 ? 'disabled' : 'primary'}
                disabled={email.length === 0 || sendLoading}
                text={
                  sendLoading ? <SimpleLoader style={{ position: 'relative', width: '95px', height: '25px' }} loaderColor="white" /> : 'Отправить'
                }
              />
            </div>
            <div>
              <p className={styles.loginPage_formWrapper_form_btnCreateWrapper_help}>
                <a href={Path.InitialPage}>Вернуться на главную</a>
              </p>
            </div>
          </div>
        )}
        {isShown && step === 2 && (
          <div className={styles.loginPage_formWrapper_form}>
            <div className={styles.loginPage_formWrapper_form_title_next} style={{ margin: '10px 0 30px 0 ' }}>
              Введите код подтверждения, который был выслан на Ваш email:
            </div>
            <div className={styles.loginPage_formWrapper_form_passwordWrapper}>
              <div style={{ display: 'flex' }}>
                <Input name="code" type="text" onChange={handleCode} value={code} placeholder="Код подтверждения" />
              </div>
              <div className={styles.errors_forgot}>{errorCode && 'Неверный код'}</div>
            </div>
            <div className={styles.loginPage_formWrapper_form_btnCreateWrapper}>
              <Button
                onClick={submitCode}
                variant={code.length === 0 ? 'disabled' : 'primary'}
                disabled={code.length === 0 || codeLoading}
                text={
                  codeLoading ? <SimpleLoader style={{ position: 'relative', width: '95px', height: '25px' }} loaderColor="white" /> : 'Отправить'
                }
              />
            </div>
            <div>
              <p className={styles.loginPage_formWrapper_form_btnCreateWrapper_help}>
                <a href={Path.InitialPage}>Вернуться на главную</a>
              </p>
            </div>
          </div>
        )}
        {isShown && step === 3 && (
          <div className={styles.loginPage_formWrapper_form}>
            <div className={styles.loginPage_formWrapper_form_title_next} style={{ margin: '10px 0 30px 0 ' }}>
              Введите новый пароль для вашей учетной записи:
            </div>
            <div className={styles.loginPage_formWrapper_form_passwordWrapper}>
              <div style={{ display: 'flex' }}>
                <Input name="newPassword" type="text" onChange={handleNewPassword} value={password} placeholder="Новый пароль" />
              </div>
            </div>
            <div className={styles.loginPage_formWrapper_form_passwordWrapper}>
              <div style={{ display: 'flex' }}>
                <Input
                  name="confirmPassword"
                  type="text"
                  onChange={handleNewPasswordC}
                  value={passwordConfirmation}
                  placeholder="Подтвердите пароль"
                />
              </div>
              <div className={styles.errors_forgot}>{errorReset && 'Пароли не совпадают'}</div>
            </div>
            <div className={styles.loginPage_formWrapper_form_btnCreateWrapper}>
              <div className={styles.btn}>
                <Button
                  onClick={submitNewPassword}
                  variant={(password.length === 0 || passwordConfirmation.length === 0) && password !== passwordConfirmation ? 'disabled' : 'primary'}
                  disabled={password.length === 0 || passwordConfirmation.length === 0 || password !== passwordConfirmation || resetLoading}
                  text={
                    resetLoading ? <SimpleLoader style={{ position: 'relative', width: '95px', height: '25px' }} loaderColor="white" /> : 'Отправить'
                  }
                />
              </div>
            </div>
            <div>
              <p className={styles.loginPage_formWrapper_form_btnCreateWrapper_help}>
                <a href={Path.InitialPage}>Вернуться на главную</a>
              </p>
            </div>
          </div>
        )}
        <Toast position="top-left" ref={toast} />
      </div>
    </section>
  )
}
