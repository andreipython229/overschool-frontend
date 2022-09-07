import { ChangeEvent, FC, memo } from 'react'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { SelectInput } from 'components/common/SelectInput/SelectInput'

import styles from './profile.module.scss'

type userInfoT = {
  fullName: string
  email: string
  phone: string
  city: string
  userDesc: string
}

type AboutUserPropsT = {
  avatar: string | null
  userInfo: userInfoT
  sex: string
  onChangeAvatar: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeUserInfo: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
const optionsList = ['Выберите пол', 'Мужской', 'Женский']

export const AboutUser: FC<AboutUserPropsT> = memo(({ userInfo, avatar, onChangeAvatar, onChangeUserInfo }) => {
  const { email, fullName, phone, city, userDesc } = userInfo

  return (
    <div style={{ width: 'calc(100% * 0.6)', marginRight: '26px', marginBottom: '108px' }} className={styles.container}>
      <h3>Настройка профиля</h3>
      <div className={styles.profile_block}>
        <Input name={'email'} type={'text'} label={'Email:'} value={email} onChange={onChangeUserInfo} />
      </div>
      <div className={styles.profile_block}>
        <div className={styles.profile_block_avatarBlock}>
          <span className={styles.profile_block_avatarBlock_title}>Аватар:</span>
          {avatar ? (
            <img className={styles.profile_block_avatarBlock_avatar} src={avatar} alt="User Avatar" />
          ) : (
            <div className={styles.profile_block_avatarBlock_avatar} />
          )}
          <input className={styles.profile_block_avatarBlock_input} name={'Avatar'} type={'file'} onChange={onChangeAvatar} />
        </div>
      </div>
      <div className={styles.profile_block}>
        <Input name={'fullName'} type={'text'} label={'Имя и Фамилия:'} onChange={onChangeUserInfo} value={fullName} />
      </div>
      <div className={styles.profile_block}>
        <Input name={'phone'} type={'text'} label={'Телефон:'} onChange={onChangeUserInfo} value={phone} placeholder={'Введите номер телефона'} />
      </div>
      <div className={styles.profile_block}>
        <Input name={'city'} type={'text'} label={'Город:'} onChange={onChangeUserInfo} value={city} placeholder={'Введите город'} />
      </div>
      <div className={styles.profile_block}>
        <span className={styles.profile_block_avatarBlock_title}>О себе:</span>
        <textarea
          className={styles.profile_block_textArea}
          onChange={onChangeUserInfo}
          placeholder={
            userDesc
              ? userDesc
              : 'Опишите вашу карьеру и достижения. Эта информация будет отображена на страницах курсов, в которых вы являетесь преподавателем'
          }
        />
      </div>
      <div className={styles.profile_block}>
        <span className={styles.profile_block_avatarBlock_title}>Пол:</span>
        <SelectInput optionsList={optionsList} />
      </div>
      <div>
        <Button text={'Сохранить'} variant={'primary'} disabled={true} />
      </div>
    </div>
  )
})
