import { ChangeEvent, FC, memo } from 'react'
import { useFormik } from 'formik'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { userDataSchema } from './schemas/index'

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
  userInfo?: userInfoT
  sex: string
  onChangeAvatar: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeUserInfo?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
const optionsList = ['Выберите пол', 'Мужской', 'Женский']

export const AboutUser: FC<AboutUserPropsT> = memo(({ avatar, onChangeAvatar }) => {
  // const { email, fullName, phone, city, userDesc } = userInfo

  const formik = useFormik({
    initialValues: {
      email: '',
      avatar: '',
      fullName: '',
      phone: '',
      city: '',
      desc: '',
      sex: '',
    },
    validationSchema: userDataSchema,
    onSubmit: values => {
      console.log(values)
    },
  })

  const {
    values: { email, fullName, phone, city, desc, sex },
    handleChange,
    handleSubmit,
    touched,
    errors,
  } = formik

  return (
    <form style={{ width: 'calc(100% * 0.6)', marginRight: '26px', marginBottom: '108px' }} className={styles.container} onSubmit={handleSubmit}>
      <h3>Настройка профиля</h3>
      <div className={styles.profile_block}>
        <Input name={'email'} type={'text'} label={'Email:'} value={email} onChange={handleChange} />
        {errors.email}
      </div>
      <div className={styles.profile_block}>
        <div className={styles.profile_block_avatarBlock}>
          <span className={styles.profile_block_avatarBlock_title}>Аватар:</span>
          {avatar ? (
            <img className={styles.profile_block_avatarBlock_avatar} src={avatar || ''} alt="User Avatar" />
          ) : (
            <div className={styles.profile_block_avatarBlock_avatar} />
          )}
          <input className={styles.profile_block_avatarBlock_input} name={'Avatar'} type={'file'} onChange={onChangeAvatar} />
        </div>
      </div>
      <div className={styles.profile_block}>
        <Input name={'fullName'} type={'text'} label={'Имя и Фамилия:'} onChange={handleChange} value={fullName} />
      </div>
      <div className={styles.profile_block}>
        <Input name={'phone'} type={'text'} label={'Телефон:'} onChange={handleChange} value={phone} placeholder={'Введите номер телефона'} />
        {errors.phone}
      </div>
      <div className={styles.profile_block}>
        <Input name={'city'} type={'text'} label={'Город:'} onChange={handleChange} value={city} placeholder={'Введите город'} />
      </div>
      <div className={styles.profile_block}>
        <span className={styles.profile_block_avatarBlock_title}>О себе:</span>
        <textarea
          className={styles.profile_block_textArea}
          onChange={handleChange}
          placeholder={
            desc
              ? desc
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
    </form>
  )
})
