import { ChangeEvent, FC, memo } from 'react'
import { useFormik } from 'formik'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { userDataSchema } from './schemas/index'
import { useFetchProfileDataQuery, useUpdateProfileMutation } from '../../api/profileService'

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

  const { data } = useFetchProfileDataQuery(1)
  const [updateProfile] = useUpdateProfileMutation()

  const formik = useFormik({
    initialValues: {
      avatar: data?.avatar_url,
      city: data?.city,
      description: data?.description,
      sex: data?.sex,
      first_name: data?.user.first_name,
      last_name: data?.user.last_name,
      email: data?.user.email,
      phone_number: data?.user.phone_number,
    },
    enableReinitialize: true,
    validationSchema: userDataSchema,
    onSubmit: values => {
      // const formdata = new FormData()

      // const objToSend = Object.entries(values).map(([key, value]) => {
      //   // formdata.append(key, value || '')
      //   return value || ''
      // })

      // console.log(formdata)

      // Object.entries(values).forEach(([key, value]) => {
      //   if (typeof value !== 'object') formdata.append(key, value || '')
      //   else formdata.append(key, JSON.stringify(value || ''))
      // })

      // updateProfile(values)

      console.log(values)
    },
  })

  const {
    // values: { city, description, sex, email, last_name, first_name, phone_number },
    handleChange,
    handleSubmit,
    touched,
    errors,
  } = formik

  return (
    <form style={{ width: 'calc(100% * 0.6)', marginRight: '26px', marginBottom: '108px' }} className={styles.container} onSubmit={handleSubmit}>
      <h3>Настройка профиля</h3>
      <div className={styles.profile_block}>
        <Input name={'email'} type={'text'} label={'Email:'} value={formik.values.email} onChange={handleChange} />
        {/* {errors.email} */}
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
        <Input name={'first_name'} type={'text'} label={'Имя:'} onChange={handleChange} value={formik.values.first_name} />
      </div>
      <div className={styles.profile_block}>
        <Input name={'last_name'} type={'text'} label={'Фамилия:'} onChange={handleChange} value={formik.values.last_name} />
      </div>
      <div className={styles.profile_block}>
        <Input
          name={'phone_number'}
          type={'text'}
          label={'Телефон:'}
          onChange={handleChange}
          value={formik.values.phone_number}
          placeholder={'Введите номер телефона'}
        />
        {/* {errors.phone_number} */}
      </div>
      <div className={styles.profile_block}>
        <Input name={'city'} type={'text'} label={'Город:'} onChange={handleChange} value={formik.values.city} placeholder={'Введите город'} />
      </div>
      <div className={styles.profile_block}>
        <span className={styles.profile_block_avatarBlock_title}>О себе:</span>
        <textarea
          className={styles.profile_block_textArea}
          onChange={handleChange}
          value={formik.values.description}
          placeholder={
            formik.values.description
              ? formik.values.description
              : 'Опишите вашу карьеру и достижения. Эта информация будет отображена на страницах курсов, в которых вы являетесь преподавателем'
          }
        />
      </div>
      <div className={styles.profile_block}>
        <span className={styles.profile_block_avatarBlock_title}>Пол:</span>
        <SelectInput optionsList={optionsList} />
      </div>
      <div>
        <button
          onClick={() => {
            const objToSend = {
              city: formik.values.city,
              user: {
                lat_name: formik.values.last_name,
                first_name: formik.values.first_name,
                email: formik.values.email,
                phone_number: formik.values.phone_number,
              },
            }
            updateProfile(objToSend)

            console.log(objToSend)
          }}
        >
          Send
        </button>
        <Button text={'Сохранить'} variant={'primary'} disabled={true} />
      </div>
    </form>
  )
})
