import { useFormik } from 'formik'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { AboutUser } from './AboutUser'
import { notifications } from './config/notif'
import { changePasswordSchema } from './schemas/changePasswordSchema'
import { useChangePasswordMutation } from '../../api/profileService'
import { NotificationItem } from './NotificationItem'

import styles from './profile.module.scss'

export const Profile = () => {
  const [changePasswordFunc] = useChangePasswordMutation()

  const changePassword = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: changePasswordSchema,
    onSubmit: (values, { resetForm }) => {
      const { password: new_password1, confirmPassword: new_password2 } = values
      changePasswordFunc({ new_password1, new_password2 })
      resetForm()
    },
  })

  const {
    values: { password, confirmPassword },
    errors,
    handleSubmit: handlePasswordsSubmit,
    handleChange: handlePasswordChnge,
  } = changePassword

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <AboutUser />
        <div>
          <form className={styles.container}>
            <h5 className={styles.profile_block_title}>Изменить email</h5>
            <Input name={'email'} type={'text'} value={''} onChange={() => console.log('заглушка')} placeholder={'Новый email адрес'} />
            <div className={styles.container_wrapper}>
              <Button className={styles.profile_block_btn} variant={'primary'} text={'Сохранить'} />
            </div>
          </form>
          <form style={{ marginTop: '32px' }} className={styles.container} onSubmit={handlePasswordsSubmit}>
            <h5 className={styles.profile_block_title}>Смена пароля</h5>
            <Input name="password" type="text" onChange={handlePasswordChnge} value={password} placeholder="Новый пароль" />
            <div className={styles.container_wrapper}>
              <Input name="confirmPassword" placeholder="Повторить новый пароль" type="text" onChange={handlePasswordChnge} value={confirmPassword} />
            </div>
            <div className={styles.container_wrapper}>
              <Button
                className={styles.profile_block_btn}
                type="submit"
                variant={!errors.password && !errors.confirmPassword ? 'primary' : 'disabled'}
                text={'Сменить пароль'}
              />
            </div>
          </form>
          <div className={styles.notification}>
            <h5 className={styles.profile_block_title}>Уведомления</h5>

            <div className={styles.notification_toggleWrapper}>
              {notifications.map(({ id, info, desc }) => (
                <NotificationItem key={id} id={id} info={info} desc={desc} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
