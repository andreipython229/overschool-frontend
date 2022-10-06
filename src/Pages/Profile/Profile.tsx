import { useFormik } from 'formik'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { AboutUser } from './AboutUser'
import { notifications } from './config/notif'
import { CheckboxBall } from '../../components/common/CheckboxBall'
import { changePasswordSchema } from './schemas/changePasswordSchema'
import { useChangePasswordMutation } from '../../api/profileService'

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
            <h5>Изменить email</h5>
            <Input name={'email'} type={'text'} value={''} placeholder={'Новый email адрес'} />
            <div className={styles.container_wrapper}>
              <Button variant={'primary'} text={'Сохранить'} />
            </div>
          </form>
          <form style={{ marginTop: '32px' }} className={styles.container} onSubmit={handlePasswordsSubmit}>
            <h5>Смена пароля</h5>
            <Input name="password" type="text" onChange={handlePasswordChnge} value={password} placeholder="Новый пароль" />
            <div className={styles.container_wrapper}>
              <Input name="confirmPassword" placeholder="Повторить новый пароль" type="text" onChange={handlePasswordChnge} value={confirmPassword} />
            </div>
            <div className={styles.container_wrapper}>
              <Button type="submit" variant={!errors.password && !errors.confirmPassword ? 'primary' : 'disabled'} text={'Сохранить'} />
            </div>
          </form>
          <div className={styles.notification}>
            <h5>Уведомления</h5>

            <div className={styles.notification_toggleWrapper}>
              {notifications.map(({ id, info, desc }) => (
                <div key={id} className={styles.notification_toggleWrapper_toggleBlock}>
                  <div className={styles.notification_toggleWrapper_toggleBlock_text}>
                    <span className={styles.notification_toggleWrapper_toggleBlock_text_header}>{info}</span>
                    <p className={styles.notification_toggleWrapper_toggleBlock_text_desc}>{desc}</p>
                  </div>
                  <div className={styles.notification_toggleWrapper_toggleBlock_checkboxWrapper}>
                    <CheckboxBall />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
