import { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import { LoginParamsT, validateLogin } from 'utils/validationLogin'
import { useAppDispatch } from '../../store/hooks'
import { auth, id, userName } from 'store/redux/users/slice'
import { useLoginMutation, useLazyGetUserInfoQuery } from '../../api/userLoginService'
import { Input } from 'components/common/Input/Input/Input'
import { isSecurity, unSecurity } from '../../assets/img/common'
import { useForgotPasswordMutation, useResetPasswordMutation, useVerifyEmailCodeMutation } from 'api/forgotPassword'
import { Toast } from 'primereact/toast'
import { generatePath, useNavigate } from 'react-router-dom'
import { Button } from '../../components/common/Button/Button'
import { InputAuth } from '../../components/common/Input/InputAuth/InputAuth'
import { Path } from '../../enum/pathE'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import styles from './loginPage.module.scss'

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
import { motion } from 'framer-motion'

export const LoginPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const toast = useRef<Toast>(null)
  const [step, setStep] = useState<number>(1)
  const [email, setEmail] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
  const [forgotPasswordFunc, { error: errorSend, isSuccess: sendSuccess, isLoading: sendLoading }] = useForgotPasswordMutation()
  const [verifyCode, { error: errorCode, isSuccess: codeSuccess, isLoading: codeLoading }] = useVerifyEmailCodeMutation()
  const [resetPassword, { error: errorReset, isSuccess: resetSuccess, isLoading: resetLoading }] = useResetPasswordMutation()

  const [security, setSecurity] = useState<boolean>(true)
  const [authVariant, setAuthVariant] = useState<keyof LoginParamsT>('email')

  const [attemptAccess, { error, isSuccess, isLoading }] = useLoginMutation()
  const [getUserInfo, { data, isFetching, isError, isSuccess: userSuccess }] = useLazyGetUserInfoQuery()
  const [notification, setNotification] = useState<INotification>()

  const [isShown, setIsShown] = useState(false)
  const [isHidden, setIsHidden] = useState(true)

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

  const getInputVariant = (variant: keyof LoginParamsT): void => {
    setAuthVariant(variant)
  }
  const changeSecurityStatus = () => {
    setSecurity(!security)
  }

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
      await attemptAccess(user)
    },
  })

  useEffect(() => {
    if (isSuccess) {
      getUserInfo()
        .unwrap()
        .then(resp => {
          dispatch(auth(true))
          dispatch(userName(resp[0]?.username))
          dispatch(id(resp[0]?.id))
          navigate(Path.ChooseSchool)
        })
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
      .then(data => {
        toast.current?.show({
          severity: 'success',
          summary: 'Успешно',
          detail: `Ссылка для сброса пароля успешно отправлена на почту ${email}`,
          life: 5000,
        })
        setTimeout(() => navigate(Path.InitialPage), 3000)
      })
      .catch(error => {
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
      <div className={styles.loginPage_logoWrapper}>
        <div className={styles.loginPage_logoWrapper_container} onClick={() => navigate(generatePath(Path.InitialPage))}>
          <svg width="230" height="103" viewBox="0 0 230 103" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M174.192 -0.000967405C174.904 -0.00278475 175.589 0.265959 176.117 0.752598L210.92 32.9128L229.043 49.3535C230.294 50.4876 230.322 52.4704 229.104 53.6405L216.612 65.6498L181.693 101.708C181.157 102.26 180.429 102.571 179.669 102.573L136.491 102.684C133.936 102.69 132.661 99.5321 134.482 97.7044L179.251 52.7929C179.93 52.0414 179.888 51.7491 179.251 51.0602L170.272 41.4769L131.505 5.15145C129.594 3.36052 130.832 0.110076 133.429 0.1034L174.192 -0.000967405Z"
              fill="url(#paint0_linear_1323_4107)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M68.4455 74.6878C67.4499 75.8543 67.5243 77.6104 68.614 78.6856L91.5215 101.278C92.7028 102.443 94.6034 102.352 95.6726 101.08L176.552 4.79767C178.139 2.90863 176.818 -0.00723445 174.377 -0.000966474L133.392 0.103958C132.569 0.106072 131.787 0.470392 131.246 1.10331L68.4455 74.6878Z"
              fill="url(#paint1_linear_1323_4107)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.0084 26.3669L46.0685 1.16134C46.6015 0.620036 47.3227 0.315242 48.0754 0.313313L90.3417 0.205088C92.8834 0.198561 94.1643 3.32724 92.3713 5.16357L48.7023 49.8892C48.3891 50.2232 48.3837 50.4334 48.7023 50.8181L95.3713 97.8173C97.1716 99.6447 95.9061 102.778 93.3651 102.785L90.656 102.792C90.6366 102.792 90.6175 102.792 90.5981 102.792L52.2512 102.891C52.2328 102.891 52.2145 102.891 52.1962 102.89L51.538 102.892C50.7604 102.894 50.0157 102.572 49.4761 102.002L0.798224 50.4967C-0.289989 49.3451 -0.262078 47.5144 0.86075 46.3981L21.0084 26.3669Z"
              fill="url(#paint2_linear_1323_4107)"
            />
            <defs>
              <linearGradient id="paint0_linear_1323_4107" x1="140.844" y1="0.0844086" x2="209.849" y2="59.4753" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9228FF" />
                <stop offset="1" stopColor="#EC40FF" />
              </linearGradient>
              <linearGradient id="paint1_linear_1323_4107" x1="150.641" y1="0.0597811" x2="67.4794" y2="103.714" gradientUnits="userSpaceOnUse">
                <stop stopColor="#CD99FF" />
                <stop offset="1" stopColor="#6D1CBA" />
              </linearGradient>
              <linearGradient id="paint2_linear_1323_4107" x1="8.10532" y1="38.9434" x2="70.8075" y2="102.291" gradientUnits="userSpaceOnUse">
                <stop stopColor="#61A3ED" />
                <stop offset="1" stopColor="#5048D8" />
              </linearGradient>
            </defs>
          </svg>
          <p className={styles.loginPage_logoWrapper_container_title}>OVERSCHOOL</p>
        </div>
      </div>
      <div className={styles.loginPage_formWrapper}>
        {isFetching ||
          (isLoading && (
            <div className={styles.loader}>
              <SimpleLoader style={{ width: '50px', height: '50px' }} />
            </div>
          ))}
        {isHidden && (
          <form className={styles.loginPage_formWrapper_form} onSubmit={formik.handleSubmit}>
            <p className={styles.loginPage_formWrapper_form_title}>Войти</p>
            <div className={styles.loginPage_formWrapper_form_eMailWrapper}>
              <p className={styles.loginPage_formWrapper_form_eMailWrapper_title}></p>
              <InputAuth
                name={authVariant}
                type={authVariant === 'email' ? 'email' : 'tel'}
                onChange={formik.handleChange}
                value={authVariant === 'email' ? formik.values.email : formik.values.phone.replace(/\D/g, '')}
                placeholder={'Электронная почта'}
              />
              {/* <AuthSelect getInputVariant={getInputVariant}/> */}
              <div className={styles.errors}>{formik.errors.email || (error && 'Неверный логин или пароль')}</div>
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
              />
              <div className={styles.errors}>{formik.errors.password}</div>
            </div>
            <div className={styles.loginPage_formWrapper_form_btnCreateWrapper}>
              <div className={styles.main_btn}>
                <Button type="submit" text={'Войти'} style={{ width: '246px' }} variant={'primary'} />
              </div>
              <div className={styles.loginPage_formWrapper_form_btnCreateWrapper_btn}>
                <a href="" onClick={forgotPass} className={styles.main_btn_href}>
                  Забыли пароль?
                </a>
              </div>
              <p className={styles.loginPage_formWrapper_form_btnCreateWrapper_help}>
                <a href={Path.InitialPage}>Вернуться на главную</a>
              </p>
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
              <Button
                onClick={submitNewPassword}
                variant={(password.length === 0 || passwordConfirmation.length === 0) && password !== passwordConfirmation ? 'disabled' : 'primary'}
                disabled={password.length === 0 || passwordConfirmation.length === 0 || password !== passwordConfirmation || resetLoading}
                text={
                  resetLoading ? <SimpleLoader style={{ position: 'relative', width: '95px', height: '25px' }} loaderColor="white" /> : 'Отправить'
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
        <Toast position="top-left" ref={toast} />
      </div>
    </section>
  )
}
