import { ChangeEvent, useState } from 'react'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { useAppSelector } from '../../store/hooks'
import { AboutUser } from './AboutUser'
import { selectUser } from 'selectors'
import { notifications } from './config/notif'
import { CheckboxBall } from '../../components/common/CheckboxBall'

import styles from './profile.module.scss'

export const Profile = () => {
  const { user, phone_number, city, aboutMySelf, sex } = useAppSelector(selectUser)
  const { last_name, first_name, email } = user

  const [newPassword, setNewPassword] = useState('')
  const [repeatNewPassword, setRepeatNewPassword] = useState('')

  const [userInfo, setUserInfo] = useState({
    phone: phone_number,
    fullName: first_name + ' ' + last_name,
    email,
    city,
    userDesc: aboutMySelf,
  })

  const onChangeUserInfo = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const target = e.target
    setUserInfo({ ...userInfo, [target.name]: target.value })
  }

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.currentTarget.value)
  }
  const changeRepeatPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setRepeatNewPassword(e.currentTarget.value)
  }


  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <AboutUser sex={sex} />
        <div>
          <form className={styles.container}>
            <h5>Изменить email</h5>
            <Input name={'email'} type={'text'} onChange={onChangeUserInfo} value={''} placeholder={'Новый email адрес'} />
            <div className={styles.container_wrapper}>
              <Button variant={email === userInfo.email ? 'disabled' : 'primary'} text={'Сохранить'} />
            </div>
          </form>
          <form style={{ marginTop: '32px' }} className={styles.container}>
            <h5>Смена пароля</h5>
            <Input name={'Новый пароль'} type={'password'} onChange={e => changePassword(e)} value={''} placeholder={'Новый пароль'} />
            <div className={styles.container_wrapper}>
              <Input
                name={'Повторить новый пароль'}
                placeholder={'Повторить новый пароль'}
                type={'password'}
                onChange={e => changeRepeatPassword(e)}
                value={repeatNewPassword}
              />
            </div>
            <div className={styles.container_wrapper}>
              <Button variant={newPassword.length >= 8 && newPassword === repeatNewPassword ? 'primary' : 'disabled'} text={'Сохранить'} />
            </div>
          </form>
          <div  className={styles.notification}>
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
