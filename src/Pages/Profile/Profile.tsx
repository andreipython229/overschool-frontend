import React, { useEffect, useState, FormEvent, useRef } from 'react'
import { useFormik } from 'formik'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { AboutUser } from './AboutUser'
import { notifications } from './config/notif'
import { useChangePasswordMutation, useFetchProfileDataQuery, useUpdateProfileMutation, useConfirmEmailMutation } from '../../api/profileService'
import { NotificationItem } from './NotificationItem'
import { SimpleLoader } from 'components/Loaders/SimpleLoader/index'
import { profileT } from 'types/profileT'
import { useLazyLogoutQuery } from '../../api/userLoginService'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { auth, logoutState } from '../../store/redux/users/slice'
import { validateEmail } from 'utils/validateEmail'
import { useFetchNotificationsQuery } from 'api/tgNotificationsServices'

import { motion } from 'framer-motion'
import { authSelector, selectUser } from '../../selectors'

import styles from './profile.module.scss'
import { IconSvg } from '../../components/common/IconSvg/IconSvg'
import { crossIconPath } from '../../config/commonSvgIconsPath'
import { CheckboxBall } from '../../components/common/CheckboxBall'
import { useBoolean } from '@/customHooks'
import { SetupNotificationTelegramAdmin } from '../../components/Modal/ProfileModalTelegramNotification/index'
import { Portal } from 'components/Modal/Portal'
import { NotificationsIconPath, FilterIconPath } from '../../assets/Icons/svgIconPath'
import { clearUserProfile } from 'store/redux/users/profileSlice'

// Хук для определения мобильной версии (<=600px)
function useIsMobile(breakpoint = 600) {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoint])

  return isMobile
}

type notifForStudentAndTeacher = {
  id: number
  info: string
  desc: string
  toggleType: string
}

export const Profile = () => {
  const isMobile = useIsMobile(600)
  const [changePasswordFunc, { isError, isSuccess }] = useChangePasswordMutation()
  const [changeEmailFunc] = useUpdateProfileMutation()
  const [confirmEmail] = useConfirmEmailMutation()
  const { data, isSuccess: profileIsSuccess } = useFetchProfileDataQuery()
  const [profileData, setProfileData] = useState<profileT>()
  const email = profileData?.user.email
  const dispatch = useAppDispatch()
  const [logout] = useLazyLogoutQuery()
  const [error, setError] = useState<string>('')
  const [isOpen, setOpen] = useState(false)
  const [newEmail, setNewEmail] = useState<string>('')
  const [tokenError, setTokenError] = useState<string>('')
  const { data: notificationsResponseData } = useFetchNotificationsQuery()
  const [notificationsData, setNotificatonsData] = useState<notifForStudentAndTeacher[]>([])
  const { role: userRole } = useAppSelector(selectUser)
  const restrictedEmails = ['admin@coursehub.ru', 'teacher@coursehub.ru', 'student@coursehub.ru']
  const [isRestrictedUser, setIsRestrictedUser] = useState(false)

  const [referralLink, setReferralLink] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [isActiveNotification, { onToggle: toggleActive }] = useBoolean(false)

  const [isOpenModalTelegram, { onToggle }] = useBoolean()
  const [handleSubmitAboutUser, setHandleSubmitAboutUser] = useState(false)
  const notifForStudentAndTeacher = notifications.slice(0, 2)
  const notifForAdmin = notifications.slice(1, 3)

  useEffect(() => {
    if (userRole === 1 || userRole === 2) {
      setNotificatonsData(notifForStudentAndTeacher)
    } else if (userRole === 6) {
      setNotificatonsData(notifForAdmin)
    } else {
      setNotificatonsData(notificationsData)
    }
  }, [])

  const changePassword = useFormik({
    initialValues: {
      new_password: '',
      email: email,
      new_password_again: '',
    },
    // validationSchema: changePasswordSchema,
    onSubmit: (values, { resetForm }) => {
      const { new_password: new_password, new_password_again: new_password2 } = values
      changePasswordFunc({ new_password, new_password_again })
      resetForm()
    },
  })

  const logOut = async () => {
    await logout()
      .unwrap()
      .then(() => {
        dispatch(clearUserProfile())
        dispatch(logoutState())
      })
    await localStorage.clear()
    window.location.reload()
  }

  useEffect(() => {
    if (profileIsSuccess) {
      setProfileData(data[0])
      const userEmail = data[0]?.user?.email
      if (userEmail && restrictedEmails.includes(userEmail)) {
        setIsRestrictedUser(true)
      } else {
        setIsRestrictedUser(false)
      }
    }
  }, [profileIsSuccess])

  useEffect(() => {
    isSuccess && changePassword.setSubmitting(false)
  }, [isSuccess])

  const {
    values: { new_password, new_password_again },
    errors,
    isSubmitting,
    handleSubmit: handlePasswordsSubmit,
    handleChange: handlePasswordChange,
  } = changePassword

  const isBtnDisabled =
    !new_password ||
    !new_password_again ||
    Boolean(errors.new_password) ||
    Boolean(errors.new_password_again) ||
    isError ||
    isSubmitting ||
    new_password !== new_password_again
  /*const isEmailBtnDisabled = !email
    const email_edit = (val: any) => {
      if (!val.data) {
        if (email == "") return;
        setEmail(email.slice(0, -1))
        return
      }
     setEmail(email+val.data)
    }
  */
  const changeEmail = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values, { resetForm }) => {
      if (validateEmail(values.email)) {
        setError('')
        const emailData = { user: values }
        await changeEmailFunc({ userInfo: emailData, id: profileData?.profile_id })
          .unwrap()
          .then(async (data: any) => {
            if (data.profile_id) {
              setOpen(true)
            }
            setNewEmail(values.email)
            resetForm()
          })
          .catch((response: any) => {
            if (response.status === 400) {
              setError(response.data)
            }
          })
      } else {
        setError('Некорректный email')
      }
    },
  })

  const sendToken = useFormik({
    initialValues: {
      token: '',
    },
    onSubmit: async values => {
      const formData = new FormData()
      formData.append('token', values.token)
      formData.append('email', newEmail)
      await confirmEmail(formData)
        .unwrap()
        .then(() => {
          setOpen(false)
          window.location.reload()
        })
        .catch((response: any) => {
          setTokenError(response.data)
        })
    },
  })

  const handleClose = () => {
    setOpen(false)
  }

  function isToggleType(toggleType: string): toggleType is 'homework_notifications' | 'messages_notifications' | 'completed_courses_notifications' {
    return toggleType === 'homework_notifications' || toggleType === 'messages_notifications' || toggleType === 'completed_courses_notifications'
  }

  // console.log(notifications.slice(1, 3));

  return (
    <motion.div
      className={styles.wrapper}
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
        delay: 0.1,
        ease: 'easeInOut',
        duration: 0.5,
      }}
    >
      <div className={styles.bg}>
        <div className={styles.bg_wrap1}></div>
      </div>
      <div className={styles.bg}>
        <div className={styles.bg_wrap2}></div>
      </div>
      <div className={styles.bg}>
        <div className={styles.bg_wrap3}></div>
      </div>
      <div className={styles.bg}>
        <div className={styles.bg_wrap4}></div>
      </div>
      <div className={styles.profile}>
        <AboutUser handleSubmitAboutUser={handleSubmitAboutUser} />
        <div className={styles.forms_wrapper}>
          {notificationsResponseData && notificationsResponseData[0] ? (
            <div className={styles.notification}>
              <h5 className={styles.profile_block_title}>Уведомления</h5>
              <div className={styles.notification_toggleWrapper}>
                {notificationsData.map(({ id, info, desc, toggleType }) => {
                  if (isToggleType(toggleType)) {
                    return (
                      <NotificationItem
                        key={id}
                        id={id}
                        info={info}
                        desc={desc}
                        initialStates={{
                          id: notificationsResponseData[0].id,
                          homework_notifications: Boolean(notificationsResponseData[0].homework_notifications),
                          messages_notifications: Boolean(notificationsResponseData[0].messages_notifications),
                          completed_courses_notifications: Boolean(notificationsResponseData[0].completed_courses_notifications),
                          tg_user: notificationsResponseData[0].tg_user,
                          user_role: userRole,
                        }}
                        toggleType={toggleType}
                      />
                    )
                  }
                })}
              </div>
            </div>
          ) : (
            <form className={styles.container}>
              <div className={styles.container_notification_toggle} data-ison={isActiveNotification}>
                <div style={{ display: 'flex', gap: '25px', justifyContent: 'center' }}>
                  {isActiveNotification ? (
                    <IconSvg
                      styles={{ cursor: 'pointer' }}
                      onPointerDown={onToggle}
                      viewBoxSize="0 0 28 28"
                      height={24}
                      width={24}
                      path={FilterIconPath}
                    />
                  ) : (
                    <IconSvg viewBoxSize="0 0 28 28" height={24} width={24} path={FilterIconPath} />
                  )}
                  <IconSvg viewBoxSize="0 0 24 24" height={24} width={24} path={NotificationsIconPath} />
                  <span style={{ fontWeight: '200' }}>
                    {isActiveNotification ? (
                      <h5 style={{ color: 'white', width: '234px', whiteSpace: 'nowrap', marginTop: '3px' }}>Уведомления включены</h5>
                    ) : (
                      <h5 style={{ color: 'black', width: '234px', whiteSpace: 'nowrap', marginTop: '3px' }}>Уведомления выключены</h5>
                    )}
                  </span>
                  {!isActiveNotification ? (
                    <a onClick={() => window.open('https://t.me/overschool_news_bot', '_blank')}>
                      <CheckboxBall toggleChecked={toggleActive} isChecked={isActiveNotification} />
                    </a>
                  ) : (
                    <CheckboxBall toggleChecked={toggleActive} isChecked={isActiveNotification} />
                  )}
                </div>
              </div>
            </form>
          )}

          {!isRestrictedUser && (
            <>
              <form className={styles.container} onSubmit={handlePasswordsSubmit}>
                <h5 className={styles.profile_block_title}>Смена пароля:</h5>
                <div>
                  <Input
                    name=""
                    type="text"
                    variant="teacherInput"
                    onChange={event => setOldPassword(event.target.value)}
                    value={oldPassword}
                    placeholder="Старый пароль"
                  />
                </div>
                <div className={styles.container_wrapper}>
                  <Input
                    name="new_password"
                    type="text"
                    variant="teacherInput"
                    onChange={handlePasswordChange}
                    value={new_password}
                    placeholder="Введите новый пароль"
                  />
                </div>
                <div className={styles.container_wrapper}>
                  <Input
                    name="new_password_again"
                    variant="teacherInput"
                    placeholder="Повторить новый пароль"
                    type="text"
                    onChange={handlePasswordChange}
                    value={new_password_again}
                  />
                </div>
                <div className={styles.container_wrapper}>
                  <Button
                    style={{
                      paddingTop: isSubmitting ? '7px' : '11px',
                      paddingBottom: isSubmitting ? '7px' : '11px',
                    }}
                    disabled={isBtnDisabled}
                    className={styles.profile_block_btn}
                    type="submit"
                    variant={isBtnDisabled ? 'newPrimary' : 'newPrimary'}
                    text={isSubmitting ? <SimpleLoader style={{ width: '15px', height: '15px' }} loaderColor="#ffff" /> : 'Сохранить'}
                    onClick={logOut}
                  />
                </div>
              </form>

              <form className={styles.container} onSubmit={changeEmail.handleSubmit}>
                <h5 className={styles.profile_block_title}>Email:</h5>
                <Input
                  name="email"
                  variant="teacherInput"
                  type="text"
                  id={'email-change'}
                  onChange={changeEmail.handleChange}
                  onInput={() => setError('')}
                  value={changeEmail.values.email}
                  placeholder="Данные пользователя"
                />
                {error && <span className={styles.container_error}>{error}</span>}
                <div className={styles.container_wrapper}>
                  <Button
                    style={{
                      paddingTop: changeEmail.isSubmitting ? '7px' : '11px',
                      paddingBottom: changeEmail.isSubmitting ? '7px' : '11px',
                    }}
                    disabled={!changeEmail.values.email}
                    className={styles.profile_block_btn}
                    type="submit"
                    variant={!changeEmail.values.email ? 'newPrimary' : 'newPrimary'}
                    text={changeEmail.isSubmitting ? <SimpleLoader style={{ width: '15px', height: '15px' }} loaderColor="#ffff" /> : 'Сохранить'}
                  />
                </div>
              </form>
              <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="delete" onClick={logOut} className={styles.profile_block_delete} text={'Выйти из аккаунта'} />
                  <Button
                    onClick={() => setHandleSubmitAboutUser(true)}
                    // type="submit"
                    style={{ paddingTop: '11px', marginLeft: '11px', paddingBottom: '11px' }}
                    className={styles.profile_block_btn}
                    text={'Сохранить'}
                    variant={'newPrimary'}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {isOpen && (
          <div className={styles.modal}>
            <div>
              <div className={styles.modal_closed} onClick={handleClose}>
                <IconSvg width={30} height={30} viewBoxSize="0 0 64 64" path={crossIconPath} />
              </div>
              <form className={styles.container} onSubmit={sendToken.handleSubmit}>
                <h5 className={styles.profile_block_title}>Введите токен подтверждения, который был выслан на Ваш новый email:</h5>
                <Input name="token" type="text" onChange={sendToken.handleChange} value={sendToken.values.token} placeholder="Токен подтверждения" />
                {tokenError && <span className={styles.container_error}>{tokenError}</span>}
                <div className={styles.container_wrapper}>
                  <Button
                    style={{
                      paddingTop: sendToken.isSubmitting ? '7px' : '11px',
                      paddingBottom: sendToken.isSubmitting ? '7px' : '11px',
                    }}
                    disabled={!sendToken.values.token}
                    className={styles.profile_block_btn}
                    type="submit"
                    variant={!sendToken.values.token ? 'disabled' : 'primary'}
                    text={sendToken.isSubmitting ? <SimpleLoader style={{ width: '15px', height: '15px' }} loaderColor="#ffff" /> : 'Отправить'}
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <div>
        {isOpenModalTelegram && (
          <Portal closeModal={onToggle}>
            <SetupNotificationTelegramAdmin setShowModal={onToggle} />
          </Portal>
        )}
      </div>
      {userRole === 6 && (
        <div className={styles.container}>
          <h5 className={styles.profile_block_title}>Реферальная ссылка:</h5>
          <div className={styles.referralRow}>
            {isMobile ? (
              <div className={styles.referralInputWrapper}>
                <Input
                  name=""
                  type="text"
                  onChange={event => setReferralLink(event.target.value)}
                  value={referralLink}
                  placeholder="Введите ссылку"
                  disabled={!isRestrictedUser}
                />
              </div>
            ) : (
              <Input
                name=""
                type="text"
                onChange={event => setReferralLink(event.target.value)}
                value={referralLink}
                placeholder="Введите ссылку"
                disabled={!isRestrictedUser}
              />
            )}
            <Button style={{ fontSize: '12px', height: '43px' }} variant={'newPrimary'} text={'Скопировать'} />
            <Button style={{ fontSize: '12px' }} variant={'emptyInside'} text={'Партнеры'} />
          </div>
        </div>
      )}
    </motion.div>
  )
}
