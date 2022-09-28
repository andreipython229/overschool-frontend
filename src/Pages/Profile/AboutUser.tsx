import { ChangeEvent, FC, memo, useState } from 'react'
import { useFormik } from 'formik'

import { Input } from 'components/common/Input/Input/Input'
import { Button } from 'components/common/Button/Button'
import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { userDataSchema } from './schemas'
import { useFetchProfileDataQuery, useUpdateProfileMutation } from '../../api/profileService'
import { AboutUserPropsT } from '../pageTypes'

import styles from './profile.module.scss'

// const optionsList = ['Женский', 'Mужской']

export const AboutUser: FC<AboutUserPropsT> = memo(() => {
  const [avatarFile, setAvatarFile] = useState<File | Blob>()
  const [avatarUrl, setAvatarUrl] = useState<string>()
  const [sex, setSex] = useState<string | number>('Ж')

  const { data } = useFetchProfileDataQuery(1)

  const [updateProfile] = useUpdateProfileMutation()

  const formik = useFormik({
    initialValues: {
      avatar: data?.avatar || '',
      avatar_url: avatarUrl || data?.avatar_url,
      city: data?.city,
      description: data?.description,
      sex: data?.sex || sex,
      first_name: data?.user.first_name,
      last_name: data?.user.last_name,
      email: data?.user.email,
      phone_number: data?.user.phone_number,
    },
    enableReinitialize: true,
    validationSchema: userDataSchema,
    onSubmit: values => {
      const { avatar, avatar_url, city, description, sex, ...rest } = values

      const formData = new FormData()

      const objToSend = {
        city,
        description,
        // sex,
        user: { ...rest },
      }

      // const newFormData = new FormData()

      // Object.entries(objToSend).forEach(([key, value]) => {
      //   if (typeof value !== 'object') newFormData.append(key, value)
      //   else newFormData.append(key, JSON.stringify(value))
      // })

      avatarFile && formData.append('avatar', avatarFile)

      avatarFile && updateProfile(formData)
      updateProfile(objToSend)
    },
  })

  const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0])
      setAvatarUrl(url)
      setAvatarFile(e.target.files[0])
    }
  }

  const {
    values: { city, description, email, last_name, first_name, phone_number, avatar_url },
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
        {/* {errors.email} */}
      </div>
      <div className={styles.profile_block}>
        <div className={styles.profile_block_avatarBlock}>
          <span className={styles.profile_block_avatarBlock_title}>Аватар:</span>
          {avatar_url ? (
            <img className={styles.profile_block_avatarBlock_avatar} src={avatar_url} alt="User Avatar" />
          ) : (
            <div className={styles.profile_block_avatarBlock_avatar} />
          )}
          <input className={styles.profile_block_avatarBlock_input} value={''} name={'avatar'} type={'file'} onChange={onChangeAvatar} />
        </div>
      </div>
      <div className={styles.profile_block}>
        <Input name={'first_name'} type={'text'} label={'Имя:'} onChange={handleChange} value={first_name} />
      </div>
      <div className={styles.profile_block}>
        <Input name={'last_name'} type={'text'} label={'Фамилия:'} onChange={handleChange} value={last_name} />
      </div>
      <div className={styles.profile_block}>
        <Input
          name={'phone_number'}
          type={'text'}
          label={'Телефон:'}
          onChange={handleChange}
          value={phone_number}
          placeholder={'Введите номер телефона'}
        />
        {/* {errors.phone_number} */}
      </div>
      <div className={styles.profile_block}>
        <Input name={'city'} type={'text'} label={'Город:'} onChange={handleChange} value={city} placeholder={'Введите город'} />
      </div>
      <div className={styles.profile_block}>
        <span className={styles.profile_block_avatarBlock_title}>О себе:</span>
        <textarea
          className={styles.profile_block_textArea}
          onChange={handleChange}
          value={description}
          name="description"
          placeholder={
            description
              ? description
              : 'Опишите вашу карьеру и достижения. Эта информация будет отображена на страницах курсов, в которых вы являетесь преподавателем'
          }
        />
      </div>
      <div className={styles.profile_block}>
        <span className={styles.profile_block_avatarBlock_title}>Пол:</span>
        {/* <SelectInput optionsList={optionsList} setSelectedValue={setSex}/> */}
        {/* <select onChange={handleChange} value={formik.values.sex} name="sex" id="sex">
         <option defaultValue={''}> </option>
         <option value={'М'}>Мужской</option>
         <option value={'Ж'}>Женский</option>
        </select> */}
      </div>
      <div>
        <Button type="submit" text={'Сохранить'} variant={'primary'} />
      </div>
    </form>
  )
})
