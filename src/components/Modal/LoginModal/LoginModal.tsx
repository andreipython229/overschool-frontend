import { FC, useEffect, useRef, useState } from 'react'
import { FormikHelpers, useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { InputAuth } from '../../common/Input/InputAuth/InputAuth'
import { Button } from '../../common/Button/Button'
import { LoginParamsT, validateLogin } from 'utils/validationLogin'
import { useAppDispatch } from '../../../store/hooks'
import { auth, id, userName, role } from 'store/redux/users/slice'
import { useLoginMutation, useLazyGetUserInfoQuery } from '../../../api/userLoginService'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { crossIconPath } from '../../../config/commonSvgIconsPath'
import { Input } from 'components/common/Input/Input/Input'
import { isSecurity, unSecurity } from '../../../assets/img/common'
import { Path } from '../../../enum/pathE'
import { LoginModalPropsT } from '../ModalTypes'
import styles from '../Modal.module.scss'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import { useForgotPasswordMutation, useResetPasswordMutation, useVerifyEmailCodeMutation } from 'api/forgotPassword'
import { Toast } from 'primereact/toast'

interface INotification {
  state: boolean
  text: string
}

type FirstFormValuesT = {
  email: string
}

import { motion } from 'framer-motion'

export const LoginModal: FC<LoginModalPropsT> = ({ setShowModal }) => {
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
          setShowModal(false)
          dispatch(auth(true))
          dispatch(userName(resp[0]?.username))
          dispatch(id(resp[0]?.id))
          navigate(Path.ChooseSchool)
        })
    }
  }, [isSuccess, isLoading])

  const handleClose = () => {
    setShowModal(false)
  }

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
          detail: `Код подтверждения отправлен на почту ${email}.`,
          life: 5000,
        })
        setStep(2)
      })
      .catch(error => {
        console.log(error.message)
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
          setShowModal(false)
        })
    }
  }

  return (
    <motion.div
      className={styles.main}
      initial={{
        scale: 0.1,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        delay: 0.5,
      }}
    >
      {isFetching ||
        (isLoading && (
          <div className={styles.loader}>
            <SimpleLoader style={{ width: '50px', height: '50px' }} />
          </div>
        ))}
      {isHidden && (
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.container}>
            <span className={styles.main_closed} onClick={handleClose}>
              <IconSvg width={17} height={17} viewBoxSize="0 0 16 16" path={crossIconPath} />
            </span>

            <div>
              <div className={styles.main_title}>Войти</div>
              <div className={styles.inputs_block}>
                <div>
                  <div style={{ display: 'flex' }}>
                    <InputAuth
                      name={authVariant}
                      type={authVariant === 'email' ? 'email' : 'tel'}
                      onChange={formik.handleChange}
                      value={authVariant === 'email' ? formik.values.email : formik.values.phone.replace(/\D/g, '')}
                      placeholder={"Электронная почта"}
                    />
                    {/* <AuthSelect getInputVariant={getInputVariant}/> */}
                  </div>
                  <div className={styles.errors}>{formik.errors.email || (error && 'Неверный логин или пароль')}</div>
                </div>
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
              <div className={styles.main_btn}>
                <Button type="submit" text={'Войти'} style={{ width: '246px' }} variant={'primary'} />
              </div>

              <div className={styles.main_btn}>
                <a href="" onClick={forgotPass} className={styles.main_btn_href}>
                  Забыли пароль?
                </a>
              </div>
            </div>
          </div>
        </form>
      )}
      {isShown && step === 1 && (
        <div>
          <div className={styles.container}>
            <span className={styles.main_closed} onClick={handleClose}>
              <IconSvg width={15} height={15} viewBoxSize="0 0 14 14" path={crossIconPath} />
            </span>
            <div className={styles.main_title} style={{ margin: '60px 0 30px 0 ' }}>
              Введите почту:
            </div>
            <div className={styles.inputs_block}>
              <div>
                <div style={{ display: 'flex' }}>
                  <Input className={styles.input_container} name="email" type="text" onChange={handleEmail} value={email} placeholder="Email" />
                </div>
                <div className={styles.errors_forgot}>{errorSend && 'Неверная почта'}</div>
              </div>
            </div>
            <div className={styles.container_wrapper}>
              <Button
                onClick={submitformikforgot}
                variant={email.length === 0 ? 'disabled' : 'primary'}
                disabled={email.length === 0 || sendLoading}
                text={
                  sendLoading ? <SimpleLoader style={{ position: 'relative', width: '95px', height: '25px' }} loaderColor="white" /> : 'Отправить'
                }
              />
            </div>
          </div>
        </div>
      )}
      {isShown && step === 2 && (
        <div>
          <div className={styles.container}>
            <span className={styles.main_closed} onClick={handleClose}>
              <IconSvg width={15} height={15} viewBoxSize="0 0 14 14" path={crossIconPath} />
            </span>
            <div className={styles.main_title} style={{ margin: '60px 0 30px 0 ' }}>
              Введите код подтверждения, который был выслан на Ваш email:
            </div>
            <div className={styles.inputs_block}>
              <div>
                <div style={{ display: 'flex' }}>
                  <Input
                    className={styles.input_container}
                    name="code"
                    type="text"
                    onChange={handleCode}
                    value={code}
                    placeholder="Код подтверждения"
                  />
                </div>
                <div className={styles.errors_forgot}>{errorCode && 'Неверный код'}</div>
              </div>
            </div>
            <div className={styles.container_wrapper}>
              <Button
                onClick={submitCode}
                variant={code.length === 0 ? 'disabled' : 'primary'}
                disabled={code.length === 0 || codeLoading}
                text={
                  codeLoading ? <SimpleLoader style={{ position: 'relative', width: '95px', height: '25px' }} loaderColor="white" /> : 'Отправить'
                }
              />
            </div>
          </div>
        </div>
      )}
      {isShown && step === 3 && (
        <div>
          <div className={styles.container}>
            <span className={styles.main_closed} onClick={handleClose}>
              <IconSvg width={15} height={15} viewBoxSize="0 0 14 14" path={crossIconPath} />
            </span>
            <div className={styles.main_title} style={{ margin: '60px 0 30px 0 ' }}>
              Введите новый пароль для вашей учетной записи:
            </div>
            <div className={styles.inputs_block}>
              <div>
                <div style={{ display: 'flex' }}>
                  <Input
                    className={styles.input_container}
                    name="newPassword"
                    type="text"
                    onChange={handleNewPassword}
                    value={password}
                    placeholder="Новый пароль"
                  />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex' }}>
                  <Input
                    className={styles.input_container}
                    name="confirmPassword"
                    type="text"
                    onChange={handleNewPasswordC}
                    value={passwordConfirmation}
                    placeholder="Подтвердите пароль"
                  />
                </div>
                <div className={styles.errors_forgot}>{errorReset && 'Пароли не совпадают'}</div>
              </div>
            </div>
            <div className={styles.container_wrapper}>
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
        </div>
      )}
      <Toast position="top-left" ref={toast} />
    </motion.div>
  )
}
