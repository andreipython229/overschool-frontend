import { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import { LoginParamsT, validateLogin } from 'utils/validationLogin'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { auth, authState, id, logoutState, role, userEmail, userName } from 'store/redux/users/slice'
import { useLoginMutation, useLazyGetUserInfoQuery, useLazyLogoutQuery } from '../../api/userLoginService'
import { Input } from 'components/common/Input/Input/Input'
import { facebook, google, isSecurity, maillog, unSecurity, yandex } from '../../assets/img/common'
import { useForgotPasswordMutation, useResetPasswordMutation, useVerifyEmailCodeMutation } from 'api/forgotPassword'
import { Toast } from 'primereact/toast'
import { generatePath, useNavigate } from 'react-router-dom'
import { Button } from '../../components/common/Button/Button'
import { InputAuth } from '../../components/common/Input/InputAuth/InputAuth'
import { Path } from '../../enum/pathE'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import styles from './loginPage.module.scss'
import { setHeaderId, setSchoolId, setSchoolName } from '../../store/redux/school/schoolSlice'
import { RoleE } from '../../enum/roleE'
import { SchoolT } from '../ChooseSchool/ChooseSchool'
import { useFetchConfiguredDomainsQuery } from '../../api/DomainService'
import { useGetSchoolsMutation } from '../../api/getSchoolService'

import {logoHeaderLogin, leftArrow} from '../../assets/img/common/index'
import {selectUser} from 'selectors'
import {LoaderLayout} from 'components/Loaders/LoaderLayout'
import {BackgroundAnimation} from 'components/BackgroundAnimation'
import {clearUserProfile} from 'store/redux/users/profileSlice'
import {LogoHeader} from "./LogoHeader";

interface INotification {
  state: boolean
  text: string
}

type FirstFormValuesT = {
  email: string
}
type LoginModalPropsT = {
  setShowModal: (value: boolean) => void
}

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

  const forgotPass = (event: any) => {
    event.preventDefault()
    setIsShown(!isShown)
    setIsHidden(!isHidden)
  }

  const handleEmail = (event: any) => {
    setEmail(event.target.value)
  }

  const handleCode = (event: any) => {
    setCode(event.target.value)
  }

  const handleNewPassword = (event: any) => {
    setPassword(event.target.value)
  }

  const handleNewPasswordC = (event: any) => {
    setPasswordConfirmation(event.target.value)
  }
  const changeSecurityStatus = () => {
    setSecurity(!security)
  }

  useEffect(() => {
    if (authetificationState) {
      navigate(generatePath(Path.ChooseSchool))
    }
  }, [authetificationState])

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
        await attemptAccess(user)
          .unwrap()
          .then(data => {
            dispatch(authState({ access: data.access, refresh: data.refresh }))
            dispatch(id(data.user.id))
            dispatch(userEmail(data.user.email))
            localStorage.setItem('id', data.user.id.toString())
          })
      } catch {
        console.log('smth went wrong')
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
      getUserInfo()
        .unwrap()
        .then(resp => {
          dispatch(auth(true))
          dispatch(userName(resp[0]?.username))
          // dispatch(id(resp[0]?.id))
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
              } else {
                console.error('No current domain data found.')
              }
            } else {
              console.error('DomainData is not available.')
            }
          }
        })
        .catch(() => console.log('Error fetching user data'))
    }
  }, [isSuccess, isLoading])

  //   const handleClose = () => {
  // //     setShowModal(false)
  //   }

  const submitformikforgot = async (event: any) => {
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

  const submitCode = async (event: any) => {
    event.preventDefault()
    const formdata = new FormData()
    formdata.append('email', email)
    formdata.append('token', code)
    await verifyCode(formdata)
      .unwrap()
      .then(data => {
        toast.current?.show({
          severity: 'success',
          summary: 'Успешно',
          detail: `Токен принят и введен верно!`,
          life: 3000,
        })
        setStep(3)
      })
      .catch(error => {
        toast.current?.show({
          severity: 'error',
          summary: 'Ошибка',
          detail: `Проверьте правильность ввода токена!`,
          life: 3000,
        })
      })
  }

  const submitNewPassword = async (event: any) => {
    event.preventDefault()
    if (password === passwordConfirmation && password.length !== 0) {
      const formdata = new FormData()
      formdata.append('email', email)
      formdata.append('new_password', password)
      formdata.append('new_password_again', passwordConfirmation)
      await resetPassword(formdata)
        .unwrap()
        .then(data => {
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
          <svg className={styles.iconDefault} width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="44" height="44" rx="14" fill="#CFE2FF" />
            <path
              d="M26.2636 9.13464C26.5565 9.13464 26.8495 9.24255 27.0807 9.4738C27.5278 9.92089 27.5278 10.6609 27.0807 11.108L17.029 21.1596C16.289 21.8996 16.289 23.1021 17.029 23.8421L27.0807 33.8938C27.5278 34.3409 27.5278 35.0809 27.0807 35.528C26.6336 35.9751 25.8936 35.9751 25.4465 35.528L15.3949 25.4763C14.6086 24.6901 14.1615 23.6263 14.1615 22.5009C14.1615 21.3755 14.5932 20.3117 15.3949 19.5255L25.4465 9.4738C25.6778 9.25797 25.9707 9.13464 26.2636 9.13464Z"
              fill="#332F36"
            />
          </svg>

                    <svg className={styles.iconHover} width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="44" height="44" rx="14" fill="#357EEB"/>
                        <path
                            d="M26.2636 9.13464C26.5565 9.13464 26.8495 9.24255 27.0807 9.4738C27.5278 9.92089 27.5278 10.6609 27.0807 11.108L17.029 21.1596C16.289 21.8996 16.289 23.1021 17.029 23.8421L27.0807 33.8938C27.5278 34.3409 27.5278 35.0809 27.0807 35.528C26.6336 35.9751 25.8936 35.9751 25.4465 35.528L15.3949 25.4763C14.6086 24.6901 14.1615 23.6263 14.1615 22.5009C14.1615 21.3755 14.5932 20.3117 15.3949 19.5255L25.4465 9.4738C25.6778 9.25797 25.9707 9.13464 26.2636 9.13464Z"
                            fill="white"/>
                    </svg>
                </a>
            </div>
            <div className={styles.loginPage_logoWrapper}>
               <LogoHeader/>
            </div>
            <div className={styles.loginPage_formWrapper}>
                {isHidden && (
                    <form className={styles.loginPage_formWrapper_form} onSubmit={formik.handleSubmit}>
                        <p className={styles.loginPage_formWrapper_form_title}>Авторизация</p>
                        <p className={styles.loginPage_formWrapper_form_title_comment}>Введите свои учетные данные</p>
                        <div className={styles.loginPage_formWrapper_form_eMailWrapper}>
                            <p className={styles.loginPage_formWrapper_form_eMailWrapper_title}></p>
                            <InputAuth
                                name={authVariant}
                                type={authVariant === 'email' ? 'email' : 'tel'}
                                onChange={formik.handleChange}
                                value={authVariant === 'email' ? formik.values.email : formik.values.phone.replace(/\D/g, '')}
                                placeholder={'Адрес электронной почты'}
                                error={error ? true : false}
                            />
                            {/* <AuthSelect getInputVariant={getInputVariant}/> */}
                            <div
                                className={styles.errors}>{formik.errors.email || (error && 'Неверный логин или пароль')}</div>
                        </div>
                        <div className={styles.loginPage_formWrapper_form_passwordWrapper}>
                            <p className={styles.loginPage_formWrapper_form_passwordWrapper_title}></p>
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
                            {/* <p>Нет Аккаунта?</p>
              <div className={styles.btn} style={{ marginBottom: '10px' }}>
                <Button
                  onClick={handleRegistrationUser}
                  type="submit"
                  text={'Зарегистрироваться'}
                  style={{ borderRadius: '10px' }}
                  variant={'newLogInHeader'}
                />
              </div> */}
                            <div className={styles.btn}>
                                <Button type="submit" text={'Вход'} style={{borderRadius: '10px'}}
                                        variant={'newPrimary'}/>
                            </div>
                            <div className={styles.loginPage_formWrapper_form_btnCreateWrapper_btn}>
                                <a className={styles.loginPage_formWrapper_form_btnCreateWrapper_btn_a} href=""
                                   onClick={forgotPass}>
                                    Забыли пароль?
                                </a>
                            </div>
                            <div className={styles.loginPage_formWrapper_form_btnCreateWrapper_or}>
                                <div className={styles.loginPage_formWrapper_form_btnCreateWrapper_or_lineLeft}></div>
                                <p>Или</p>
                                <div className={styles.loginPage_formWrapper_form_btnCreateWrapper_or_lineRight}></div>
                            </div>
                            <div className={styles.loginPage_formWrapper_form_btnCreateWrapper_socialMedia}>
                                <a
                                    href={`${
                                        process.env.REACT_APP_RUN_MODE === 'PRODUCTION' ? 'https://apidev.coursehb.ru' : 'http://sandbox.coursehb.ru'
                                    }/accounts/google/login/`}
                                    className={styles.socialIcon}
                                    style={{padding: '8px'}}
                                    title="Google"
                                >
                                    <img src={google} alt="google" style={{objectFit: 'fill', width: '100%'}}/>
                                </a>
                                <a
                                    href={`${
                                        process.env.REACT_APP_RUN_MODE === 'PRODUCTION' ? 'https://apidev.coursehb.ru' : 'http://sandbox.coursehb.ru'
                                    }/accounts/yandex/login/`}
                                    className={styles.socialIcon}
                                    title="Yandex"
                                >
                                    <img src={yandex} alt="yandex" style={{objectFit: 'fill', width: '100%'}}/>
                                </a>
                            </div>
                        </div>
                    </form>
                )}
                {isShown && step === 1 && (
                    <div className={styles.loginPage_formWrapper_form}>
                        <div className={styles.loginPage_formWrapper_form_title} style={{margin: '15px 0 30px 0'}}>
                            Введите почту:
                        </div>
                        <div className={styles.loginPage_formWrapper_form_eMailWrapper}>
                            <div style={{display: 'flex'}}>
                                <Input className={styles.input_container} name="email" type="text"
                                       onChange={handleEmail} value={email} placeholder="Email"/>
                            </div>
                            <div className={styles.errors_forgot}>{errorSend && 'Неверная почта'}</div>
                        </div>
                        <div className={styles.loginPage_formWrapper_form_btnCreateWrapper}>
                            <Button
                                onClick={submitformikforgot}
                                variant={email.length === 0 ? 'disabled' : 'primary'}
                                disabled={email.length === 0 || sendLoading}
                                text={
                                    sendLoading ?
                                        <SimpleLoader style={{position: 'relative', width: '95px', height: '25px'}}
                                                      loaderColor="white"/> : 'Отправить'
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
                        <div className={styles.loginPage_formWrapper_form_title_next}
                             style={{margin: '10px 0 30px 0 '}}>
                            Введите код подтверждения, который был выслан на Ваш email:
                        </div>
                        <div className={styles.loginPage_formWrapper_form_passwordWrapper}>
                            <div style={{display: 'flex'}}>
                                <Input name="code" type="text" onChange={handleCode} value={code}
                                       placeholder="Код подтверждения"/>
                            </div>
                            <div className={styles.errors_forgot}>{errorCode && 'Неверный код'}</div>
                        </div>
                        <div className={styles.loginPage_formWrapper_form_btnCreateWrapper}>
                            <Button
                                onClick={submitCode}
                                variant={code.length === 0 ? 'disabled' : 'primary'}
                                disabled={code.length === 0 || codeLoading}
                                text={
                                    codeLoading ?
                                        <SimpleLoader style={{position: 'relative', width: '95px', height: '25px'}}
                                                      loaderColor="white"/> : 'Отправить'
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
                        <div className={styles.loginPage_formWrapper_form_title_next}
                             style={{margin: '10px 0 30px 0 '}}>
                            Введите новый пароль для вашей учетной записи:
                        </div>
                        <div className={styles.loginPage_formWrapper_form_passwordWrapper}>
                            <div style={{display: 'flex'}}>
                                <Input name="newPassword" type="text" onChange={handleNewPassword} value={password}
                                       placeholder="Новый пароль"/>
                            </div>
                        </div>
                        <div className={styles.loginPage_formWrapper_form_passwordWrapper}>
                            <div style={{display: 'flex'}}>
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
                            <Button
                                onClick={submitNewPassword}
                                variant={(password.length === 0 || passwordConfirmation.length === 0) && password !== passwordConfirmation ? 'disabled' : 'primary'}
                                disabled={password.length === 0 || passwordConfirmation.length === 0 || password !== passwordConfirmation || resetLoading}
                                text={
                                    resetLoading ?
                                        <SimpleLoader style={{position: 'relative', width: '95px', height: '25px'}}
                                                      loaderColor="white"/> : 'Отправить'
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
                <Toast position="top-left" ref={toast}/>
            </div>
        </section>
    )
}
