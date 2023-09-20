import {useEffect, useState} from 'react'
import { useFormik } from 'formik'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { AboutUser } from './AboutUser'
import { notifications } from './config/notif'
import { changePasswordSchema } from './schemas/changePasswordSchema'
import { useChangePasswordMutation, useFetchProfileDataQuery } from '../../api/profileService'
import { NotificationItem } from './NotificationItem'
import { SimpleLoader } from 'components/Loaders/SimpleLoader/index'
import {profileT} from 'types/profileT'
import {useLazyLogoutQuery} from "../../api/userLoginService";
import {useAppDispatch} from '../../store/hooks'
import {auth} from "../../store/redux/users/slice"


import styles from './profile.module.scss'

export const Profile = () => {
  const [changePasswordFunc, { isError, isSuccess }] = useChangePasswordMutation()
  const {data, isFetching, isSuccess: profileIsSuccess} = useFetchProfileDataQuery()
  const [profileData, setProfileData] = useState<profileT>()
  const email = profileData?.user.email
  const dispatch = useAppDispatch()
  const [logout] = useLazyLogoutQuery()
  
  const changePassword = useFormik({
    initialValues: {
      password: '',
      email: email,
      confirmPassword: '',
    },
   // validationSchema: changePasswordSchema,
    onSubmit: (values, { resetForm }) => {
      const { password: new_password, confirmPassword: new_password2} = values
      changePasswordFunc({ new_password, email})
      resetForm()
      
    },
  })
  
  const logOut = async () => {
    await localStorage.clear()
    await logout()
    window.location.reload()

    dispatch(auth(false))
}

  useEffect(() => {
    if (profileIsSuccess) {
        setProfileData(data[0])
    }
}, [profileIsSuccess])

  useEffect(() => {
   isSuccess && changePassword.setSubmitting(false)
  }, [isSuccess])
 
  

  const {
    values: { password, confirmPassword },
    errors,
    isSubmitting,
    handleSubmit: handlePasswordsSubmit,
    handleChange: handlePasswordChange,
  } = changePassword


  const isBtnDisabled = !password || !confirmPassword || Boolean(errors.password) || Boolean(errors.confirmPassword) || isError || isSubmitting || password !== confirmPassword
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
  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <AboutUser />
        <div className={styles.forms_wrapper}>
          <form className={styles.container} onSubmit={handlePasswordsSubmit}>
            <h5 className={styles.profile_block_title}>Смена пароля</h5>
            <Input name="password" type="text" onChange={handlePasswordChange} value={password} placeholder="Новый пароль" />
            <div className={styles.container_wrapper}>
              <Input
                name="confirmPassword"
                placeholder="Повторить новый пароль"
                type="text"
                onChange={handlePasswordChange}
                value={confirmPassword}
              />
            </div>
            <div className={styles.container_wrapper}>
              <Button
                style={{ paddingTop: isSubmitting ? '7px' : '11px', paddingBottom: isSubmitting ? '7px' : '11px' }}
                disabled={isBtnDisabled}
                className={styles.profile_block_btn}
                type="submit"
                variant={isBtnDisabled ? 'disabled' : 'primary'}
                text={isSubmitting ? <SimpleLoader style={{ width: '15px', height: '15px' }} loaderColor="#ffff" /> : 'Сменить пароль'}
                onClick={logOut}
              />
            </div>
          </form>
          {/* <div className={styles.notification}>
            <h5 className={styles.profile_block_title}>Уведомления</h5>

            <div className={styles.notification_toggleWrapper}>
              {notifications.map(({ id, info, desc }) => (
                <NotificationItem key={id} id={id} info={info} desc={desc} />
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
